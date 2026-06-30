import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  label,
  title,
  highlight,
  subtitle,
  className,
  align = 'center',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', alignClass, className)}
    >
      {label && (
        <span className="inline-flex items-center gap-2 font-orbitron text-xs tracking-[0.3em] uppercase text-primary">
          <span className="w-6 h-px bg-primary" />
          {label}
          <span className="w-6 h-px bg-primary" />
        </span>
      )}

      <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
