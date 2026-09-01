'use client';
import React, { useEffect, useRef } from 'react';

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 480;
      }
    };
    window.addEventListener('resize', handleResize);

    const nodes = [
      { id: 'customer', label: 'Buyer Intent', x: 0.12, y: 0.35, color: '#7C5CFF' },
      { id: 'agent', label: 'AI Commerce Agent', x: 0.30, y: 0.65, color: '#F5A623' },
      { id: 'catalog', label: 'Merchant Catalog', x: 0.50, y: 0.25, color: '#20C997' },
      { id: 'rec', label: 'Recommendation NPU', x: 0.65, y: 0.70, color: '#FFB84D' },
      { id: 'cart', label: 'Autonomous Cart', x: 0.80, y: 0.35, color: '#7C5CFF' },
      { id: 'gateway', label: 'Razorpay Sandbox', x: 0.90, y: 0.65, color: '#20C997' },
    ];

    const particles = [
      { fromIdx: 0, toIdx: 1, progress: 0.1, speed: 0.008, color: '#7C5CFF' },
      { fromIdx: 1, toIdx: 2, progress: 0.4, speed: 0.009, color: '#F5A623' },
      { fromIdx: 2, toIdx: 3, progress: 0.7, speed: 0.007, color: '#20C997' },
      { fromIdx: 3, toIdx: 4, progress: 0.2, speed: 0.010, color: '#FFB84D' },
      { fromIdx: 4, toIdx: 5, progress: 0.6, speed: 0.008, color: '#20C997' },
    ];

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length - 1; i++) {
        const n1 = nodes[i];
        const n2 = nodes[i + 1];
        const x1 = n1.x * width;
        const y1 = n1.y * height + Math.sin(time + i) * 6;
        const x2 = n2.x * width;
        const y2 = n2.y * height + Math.sin(time + i + 1) * 6;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, n1.color + '44');
        grad.addColorStop(1, n2.color + '44');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const n1 = nodes[p.fromIdx];
        const n2 = nodes[p.toIdx];
        const x1 = n1.x * width;
        const y1 = n1.y * height + Math.sin(time + p.fromIdx) * 6;
        const x2 = n2.x * width;
        const y2 = n2.y * height + Math.sin(time + p.toIdx) * 6;

        const curX = x1 + (x2 - x1) * p.progress;
        const curY = y1 + (y2 - y1) * p.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      nodes.forEach((n, idx) => {
        const nx = n.x * width;
        const ny = n.y * height + Math.sin(time + idx) * 6;

        ctx.beginPath();
        ctx.arc(nx, ny, 20, 0, Math.PI * 2);
        ctx.fillStyle = n.color + '22';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.font = '11px Poppins, sans-serif';
        ctx.fillStyle = '#E5E5E5';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, nx, ny + 26);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center">
      <div className="absolute top-4 left-6 flex items-center space-x-2 text-xs font-mono text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-accent-amber animate-ping" />
        <span>3D Autonomous Commerce Flow (Live Node Telemetry)</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
