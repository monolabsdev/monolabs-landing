"use client";

import React, { createContext, useContext, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";

// Animation Context
const AnimationContext = createContext({});

export const useAnimations = () => useContext(AnimationContext);

// Animation Provider Component
export const AnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const animations = {
    // Fade in from bottom
    fadeInUp: {
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 60 },
    },

    // Fade in from top
    fadeInDown: {
      initial: { opacity: 0, y: -60 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -60 },
    },

    // Simple fade
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    // Scale fade
    scaleFadeIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },

    // Slide from left
    slideInLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },

    // Slide from right
    slideInRight: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
  };

  const transitions = {
    smooth: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
    spring: { type: "spring", stiffness: 100, damping: 20 },
    snappy: { duration: 0.4, ease: "easeOut" },
    slow: { duration: 1.2, ease: "easeInOut" },
  };

  return (
    <AnimationContext.Provider value={{ animations, transitions }}>
      {children}
    </AnimationContext.Provider>
  );
};

// Fade In Component
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  amount?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
  amount = 0.3,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directions[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }
      }
      transition={{
        duration,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax Component (Apple-style)
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "vertical" | "horizontal";
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = "vertical",
  className,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={direction === "vertical" ? { y } : { x }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax Text Component (for text with parallax effect)
interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 0.3,
  className,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.4]
  );

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Scale on Scroll Component (Apple-style zoom effect)
interface ScaleOnScrollProps {
  children: React.ReactNode;
  scaleStart?: number;
  scaleEnd?: number;
  className?: string;
}

export const ScaleOnScroll: React.FC<ScaleOnScrollProps> = ({
  children,
  scaleStart = 0.8,
  scaleEnd = 1,
  className,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleStart, scaleEnd, scaleStart]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Stagger Container Component
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
}) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item Component (use inside StaggerContainer)
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
}) => {
  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};
