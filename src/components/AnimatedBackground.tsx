import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='fixed inset-0 z-[-1] overflow-hidden'>
      {/* Background gradient */}
      <div className='bg-gradient-radial from-background to-background/80 absolute inset-0' />

      {/* Animated circles that follow mouse with parallax effect */}
      <motion.div
        className='bg-lol-blue/5 absolute h-[600px] w-[600px] rounded-full blur-[80px]'
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />

      <motion.div
        className='bg-lol-gold/5 absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[60px]'
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />

      <motion.div
        className='bg-lol-red/5 absolute bottom-1/3 left-1/3 h-[300px] w-[300px] rounded-full blur-[40px]'
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />

      {/* Grid pattern */}
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage:
            'linear-gradient(to right, #9AA1A9 1px, transparent 1px), linear-gradient(to bottom, #9AA1A9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
