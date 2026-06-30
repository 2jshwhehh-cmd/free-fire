import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, TrendingUp, Clock, Sword, Shirt, ShirtIcon,
  Glasses, HardHat, BadgeCheck, ShieldOff, Tag,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import WhatsAppButton from '@/components/WhatsAppButton';
import GlassCard from '@/components/GlassCard';
import { fetchAccount, type Account } from '@/lib/firebase';
import { mockAccounts } from '@/lib/mockData';

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: 'purple' | 'blue' | 'cyan' | 'green';
}

function StatItem({ icon: Icon, label, value, accent = 'purple' }: StatItemProps) {
  const colorMap = {
    purple: 'text-primary bg-primary/10',
    blue: 'text-secondary bg-secondary/10',
    cyan: 'text-accent bg-accent/10',
    green: 'text-neon-green bg-neon-green/10',
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/5 hover:border-white/10 transition-all duration-200">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[accent]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="font-orbitron text-xs text-muted-foreground leading-none mb-1">{label}</p>
        <p className="font-orbitron font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function AccountDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchAccount(id).then((data) => {
      if (data) {
        setAccount(data);
      } else {
        // Fall back to mock data
        const found = mockAccounts.find((a) => a.id === id);
        setAccount(found || null);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-orbitron text-sm text-muted-foreground tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="font-orbitron text-2xl gradient-text mb-4">Account Not Found</h2>
          <p className="font-rajdhani text-muted-foreground mb-6">This account may have been sold or removed.</p>
          <Link
            to="/accounts"
            className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-orbitron text-sm tracking-widest uppercase shadow-glow-sm"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = account.status === 'available';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 container mx-auto px-4">
        <div className="flex items-center gap-2 font-rajdhani text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/accounts" className="hover:text-foreground transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-primary font-semibold">{account.id}</span>
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-rajdhani text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left: Image gallery */}
          <div>
            <ImageGallery images={account.images} accountId={account.id} />
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {/* Status */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-orbitron font-semibold tracking-wider ${
                    isAvailable
                      ? 'bg-neon-green/15 text-neon-green border border-neon-green/30 shadow-glow-green'
                      : 'bg-neon-red/15 text-neon-red border border-neon-red/30 shadow-glow-red'
                  }`}
                >
                  {isAvailable ? <BadgeCheck className="w-3 h-3" /> : <ShieldOff className="w-3 h-3" />}
                  {isAvailable ? 'Available' : 'Sold'}
                </span>

                {/* Evo guns */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-orbitron tracking-wider shadow-glow-sm">
                  <Sword className="w-3 h-3" />
                  {account.evoGuns} Evo Guns
                </span>
              </div>

              <h1 className="font-orbitron text-3xl md:text-4xl font-black text-foreground mb-1">
                Account <span className="gradient-text">#{account.id}</span>
              </h1>
              <p className="font-rajdhani text-muted-foreground">Level {account.level} · {account.age} old</p>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="glass rounded-2xl border border-primary/20 p-5 shadow-glow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-orbitron text-xs text-muted-foreground tracking-widest uppercase mb-1">Price</p>
                  <p className="font-orbitron text-4xl font-black gradient-text">
                    Rs {parseInt(account.price).toLocaleString()}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-primary/40" />
              </div>
            </motion.div>

            {/* WhatsApp button */}
            {isAvailable && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <WhatsAppButton account={account} size="lg" className="w-full" />
              </motion.div>
            )}

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-orbitron text-sm tracking-widest uppercase text-muted-foreground mb-3">
                Account Stats
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <StatItem icon={TrendingUp} label="Level" value={account.level} accent="purple" />
                <StatItem icon={Clock} label="Age" value={account.age} accent="blue" />
                <StatItem icon={Sword} label="Evo Guns" value={account.evoGuns} accent="purple" />
                <StatItem icon={Shirt} label="Total Shirts" value={account.totalShirts} accent="cyan" />
                <StatItem icon={ShirtIcon} label="Total Bottoms" value={account.totalBottom} accent="blue" />
                <StatItem icon={Glasses} label="Total Masks" value={account.totalMask} accent="cyan" />
                <StatItem icon={HardHat} label="Total Heads" value={account.totalHead} accent="purple" />
                <StatItem icon={TrendingUp} label="Total Shoes" value={account.totalShoes} accent="blue" />
              </div>
            </motion.div>

            {/* Description */}
            {account.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard className="p-5">
                  <h3 className="font-orbitron text-sm tracking-widest uppercase text-muted-foreground mb-3">Description</h3>
                  <p className="font-rajdhani text-foreground/80 leading-relaxed">{account.description}</p>
                </GlassCard>
              </motion.div>
            )}

            {/* Bottom CTA if sold */}
            {!isAvailable && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl border border-white/8 p-5 text-center"
              >
                <p className="font-rajdhani text-muted-foreground mb-3">
                  This account has been sold. Check our marketplace for more available accounts.
                </p>
                <Link
                  to="/accounts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-orbitron text-xs tracking-widest uppercase shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Browse Available Accounts
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
