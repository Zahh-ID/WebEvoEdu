
"use client";

import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap'; // GSAP ticker tidak lagi digunakan di sini

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
  const animationFrameIdRef = useRef<number | null>(null); // Untuk menyimpan ID frame animasi

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Gagal mendapatkan konteks 2D dari canvas");
        return;
    }

    const particles: Particle[] = [];
    const particleCount = 85; // Jumlah partikel sedikit ditingkatkan dari sebelumnya
    const colors = ["rgba(148, 0, 211, 0.6)", "rgba(0, 123, 255, 0.6)", "rgba(224, 224, 224, 0.6)"];

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
          radius: Math.random() * 2.5 + 0.8,
          vx: Math.random() * 0.4 - 0.2,
          vy: Math.random() * 0.4 - 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.2,
        });
      }
    };

    const resizeAndInit = () => {
        resizeCanvas();
        initParticles();
    };
    
    resizeAndInit(); // Panggil sekali saat setup
    window.addEventListener('resize', resizeAndInit);

    const animate = () => {
      if (!canvasRef.current || !ctx) {
          console.error("Canvas atau context tidak tersedia dalam loop animasi");
          if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
          }
          return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.radius < 0) p.x = canvas.width + p.radius;
        if (p.x - p.radius > canvas.width) p.x = -p.radius;
        if (p.y + p.radius < 0) p.y = canvas.height + p.radius;
        if (p.y - p.radius > canvas.height) p.y = -p.radius;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Menggunakan properti alpha yang disimpan di objek partikel
        ctx.fillStyle = p.color.replace(/[^,]+(?=\))/, p.alpha.toString());
        ctx.fill();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate(); // Mulai loop animasi

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeAndInit);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default ParticleBackground;
