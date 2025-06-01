
"use client";

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  baseVx: number; // Kecepatan x dasar
  baseVy: number; // Kecepatan y dasar
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Gagal mendapatkan konteks 2D dari canvas");
      return;
    }

    const particles: Particle[] = [];
    const particleCount = 120; // Jumlah partikel ditingkatkan
    const colors = ["rgba(148, 0, 211, 0.5)", "rgba(0, 123, 255, 0.5)", "rgba(224, 224, 224, 0.5)"];
    const interactionRadius = 150; // Radius interaksi mouse
    const repulsionStrength = 0.8; // Kekuatan dorongan mouse
    const dampingFactor = 0.96; // Faktor redaman untuk kembali ke kecepatan normal

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const baseVx = Math.random() * 0.5 - 0.25;
        const baseVy = Math.random() * 0.5 - 0.25;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.8 + 1.0, // Sedikit lebih besar
          vx: baseVx,
          vy: baseVy,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
          baseVx,
          baseVy,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const resizeAndInit = () => {
      resizeCanvas();
      initParticles();
    };

    resizeAndInit();
    window.addEventListener('resize', resizeAndInit);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!canvasRef.current || !ctx) {
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;

      particles.forEach(p => {
        // Interaksi mouse
        if (mouseX !== null && mouseY !== null) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (interactionRadius - distance) / interactionRadius * repulsionStrength;
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Kembali ke kecepatan dasar & redaman
        p.vx = p.vx * dampingFactor + p.baseVx * (1 - dampingFactor);
        p.vy = p.vy * dampingFactor + p.baseVy * (1 - dampingFactor);
        
        // Batasi kecepatan maksimum untuk menghindari partikel terbang terlalu cepat
        const maxSpeed = 2;
        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
        }


        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen edges
        if (p.x + p.radius < 0) p.x = canvas.width + p.radius;
        if (p.x - p.radius > canvas.width) p.x = -p.radius;
        if (p.y + p.radius < 0) p.y = canvas.height + p.radius;
        if (p.y - p.radius > canvas.height) p.y = -p.radius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[^,]+(?=\))/, p.alpha.toString());
        ctx.fill();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeAndInit);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default ParticleBackground;
