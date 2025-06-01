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
    const particleCount = 50;
    const colors = ["rgba(148, 0, 211, 0.6)", "rgba(0, 123, 255, 0.6)", "rgba(224, 224, 224, 0.6)"]; // Primary, Accent, Light Gray

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
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

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Use GSAP ticker for smoother animations if preferred, or stick with requestAnimationFrame
    // gsap.ticker.add(animate);
    animate(); // Start animation

    return () => {
      cancelAnimationFrame(animationFrameId);
      // gsap.ticker.remove(animate);
      window.removeEventListener('resize', () => {
        resizeCanvas();
        initParticles();
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default ParticleBackground;
