import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'purple' | 'blue' | 'cyan' | 'none';
  hover?: boolean;
}

export default function GlassCard({
  className,
  glow = 'none',
  hover = false,
  children,
  ...props
}: GlassCardProps) {
  const glowClass = {
    purple: 'hover:shadow-glow-md hover:border-primary/40',
    blue: 'hover:shadow-glow-blue hover:border-secondary/40',
    cyan: 'hover:shadow-glow-cyan hover:border-accent/40',
    none: '',
  }[glow];

  return (
    <div
      className={cn(
        'glass rounded-xl border border-white/8 transition-all duration-300',
        hover && glowClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
