
"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 75; // Jumlah partikel ditingkatkan sedikit
    const colors = ["rgba(148, 0, 211, 0.7)", "rgba(0, 123, 255, 0.7)", "rgba(224, 224, 224, 0.7)"]; // Primary, Accent, Light Gray

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0; 
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 1, // Ukuran partikel sedikit bervariasi
          vx: Math.random() * 0.5 - 0.25, // Kecepatan sedikit lebih lambat
          vy: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3, // Variasi alpha
        });
      }
    };
    
    resizeCanvas();
    initParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.radius < 0 || p.x - p.radius > canvas.width) p.x = p.vx > 0 ? -p.radius : canvas.width + p.radius;
        if (p.y + p.radius < 0 || p.y - p.radius > canvas.height) p.y = p.vy > 0 ? -p.radius : canvas.height + p.radius;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[^,]+(?=\))/, p.alpha.toString()); // Apply alpha
        ctx.fill();
      });

      // Tidak lagi memerlukan animationFrameId karena GSAP ticker akan mengelola loop
    };

    gsap.ticker.add(animate); // Menggunakan GSAP ticker

    return () => {
      gsap.ticker.remove(animate); // Membersihkan GSAP ticker
      window.removeEventListener('resize', () => {
        resizeCanvas();
        initParticles();
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default ParticleBackground;
