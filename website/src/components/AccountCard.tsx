import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, TrendingUp, Clock, BadgeCheck, ShieldOff } from 'lucide-react';
import type { Account } from '@/lib/firebase';

interface AccountCardProps {
  account: Account;
  index?: number;
}

export default function AccountCard({ account, index = 0 }: AccountCardProps) {
  const navigate = useNavigate();
  const isAvailable = account.status === 'available';
  const coverImage = account.images?.[0] || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => navigate(`/account/${account.id}`)}
      className="account-card-hover group cursor-pointer rounded-2xl overflow-hidden border border-white/8 bg-card relative"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={coverImage}
          alt={`Account ${account.id}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-orbitron font-semibold tracking-wider ${
            isAvailable
              ? 'bg-neon-green/15 text-neon-green border border-neon-green/30 shadow-glow-green'
              : 'bg-neon-red/15 text-neon-red border border-neon-red/30 shadow-glow-red'
          }`}
        >
          {isAvailable ? (
            <BadgeCheck className="w-3 h-3" />
          ) : (
            <ShieldOff className="w-3 h-3" />
          )}
          {isAvailable ? 'Available' : 'Sold'}
        </div>

        {/* Evo guns badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-orbitron tracking-wider shadow-glow-sm">
          <Sword className="w-3 h-3" />
          {account.evoGuns} Evo
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* ID */}
        <div className="flex items-center justify-between">
          <span className="font-orbitron text-xs tracking-[0.2em] text-muted-foreground uppercase">
            ID: {account.id}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-secondary mb-0.5">
              <TrendingUp className="w-3 h-3" />
            </div>
            <p className="font-orbitron text-sm font-bold text-foreground">{account.level}</p>
            <p className="font-rajdhani text-xs text-muted-foreground">Level</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-accent mb-0.5">
              <Clock className="w-3 h-3" />
            </div>
            <p className="font-orbitron text-xs font-bold text-foreground truncate">{account.age}</p>
            <p className="font-rajdhani text-xs text-muted-foreground">Age</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
              <Sword className="w-3 h-3" />
            </div>
            <p className="font-orbitron text-sm font-bold text-foreground">{account.evoGuns}</p>
            <p className="font-rajdhani text-xs text-muted-foreground">Evo Guns</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <span className="font-rajdhani text-sm text-muted-foreground">Price</span>
          <span className="font-orbitron text-xl font-bold gradient-text">
            Rs {parseInt(account.price).toLocaleString()}
          </span>
        </div>

        {/* View button */}
        <div className="pt-1">
          <div className="w-full py-2 rounded-lg border border-primary/30 text-primary font-orbitron text-xs tracking-widest uppercase text-center transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/60 group-hover:shadow-glow-sm">
            View Details
          </div>
        </div>
      </div>
    </motion.div>
  );
}
