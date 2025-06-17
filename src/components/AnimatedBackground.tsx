
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-background to-background/80" />
      
      {/* Animated circles that follow mouse with parallax effect */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-lol-blue/5 blur-[80px]"
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-lol-gold/5 blur-[60px]"
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-lol-red/5 blur-[40px]"
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #9AA1A9 1px, transparent 1px), linear-gradient(to bottom, #9AA1A9 1px, transparent 1px)",
          backgroundSize: "40px 40px" 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;