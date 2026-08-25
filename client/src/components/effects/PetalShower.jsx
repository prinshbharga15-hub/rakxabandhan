import React, { useEffect, useRef } from 'react';

const PetalShower = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = width < 768 ? 16 : 28;
    const petals = [];

    // Marigold orange/yellow & Rose pink/crimson colors
    const petalColors = [
      { fill: '#F59E0B', stroke: '#D97706', type: 'marigold' },
      { fill: '#EA580C', stroke: '#C2410C', type: 'marigold' },
      { fill: '#FBBF24', stroke: '#F59E0B', type: 'marigold' },
      { fill: '#E11D48', stroke: '#BE123C', type: 'rose' },
      { fill: '#F43F5E', stroke: '#E11D48', type: 'rose' }
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 6,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        speedY: Math.random() * 0.8 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayAmplitude: Math.random() * 1.5 + 0.8,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.5
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      if (p.color.type === 'marigold') {
        // Oblong marigold petal shape
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
      } else {
        // Curved rose petal shape
        ctx.moveTo(0, -p.size * 0.8);
        ctx.bezierCurveTo(p.size, -p.size * 0.3, p.size * 0.9, p.size * 0.8, 0, p.size * 0.9);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.8, -p.size, -p.size * 0.3, 0, -p.size * 0.8);
      }

      ctx.fillStyle = p.color.fill;
      ctx.fill();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = p.color.stroke;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * p.swayAmplitude;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.9 }}
    />
  );
};

export default PetalShower;
