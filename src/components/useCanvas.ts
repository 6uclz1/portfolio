import { makeNoise2D, makeNoise3D } from 'open-simplex-noise'; // パーリンノイズ生成ライブラリを使用

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

export const useCanvas = (canvas: HTMLCanvasElement) => {
  let particles: Particle[] = [];
  let animationFrameId: number;
  const ctx = canvas.getContext('2d');
  const noise2D = makeNoise2D(Date.now()); // 一意のシード値でノイズ関数を生成
  const noise3D = makeNoise3D(Date.now()); // 一意のシード値でノイズ関数を生成

  const noise = (x: number, y: number) => {
    const scale =  0.005; // ノイズのスケールを調整
    return noise3D(x * scale, y * scale, noise2D(10,11) * 0.005);
  };

  const initCanvas = () => {
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    particles = Array(4150).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      color: `rgba(200, 200, 200, 0.3)`
    }));
  };

  const updateParticle = (particle: Particle) => {
    const angle = noise(particle.x, particle.y) * Math.random() * Math.PI * 2;
    particle.vx = Math.cos(angle) * 2;
    particle.vy = Math.sin(angle) * 2;

    particle.x += particle.vx;
    particle.y += particle.vy;

    // Screen wrapping
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;
  };

  const drawParticles = () => {
    if (!ctx) return;

    // Semi-transparent white background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      updateParticle(particle);

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Connect nearby particles
    //   particles.forEach(other => {
    //     const dx = particle.x - other.x;
    //     const dy = particle.y - other.y;
    //     const distance = Math.sqrt(dx * dx + dy * dy);

    //     if (distance < 250) {
    //       ctx.beginPath();
    //       ctx.moveTo(particle.x, particle.y);
    //       ctx.lineTo(other.x, other.y);
    //       ctx.strokeStyle = `rgba(200, 200, 200, ${(100 - distance) / 500})`;
    //       ctx.stroke();
    //     }
    //   });
    });

    animationFrameId = requestAnimationFrame(drawParticles);
  };

  const startAnimation = () => {
    initCanvas();
    drawParticles();

    window.addEventListener('resize', initCanvas);
  };

  const cleanup = () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', initCanvas);
  };

  return { startAnimation, cleanup };
};
