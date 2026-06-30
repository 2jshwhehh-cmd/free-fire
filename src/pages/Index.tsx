import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Shield, Zap, Users, MessageCircle,
  Search, MousePointer, Phone, Star, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import AccountCard from '@/components/AccountCard';
import GlassCard from '@/components/GlassCard';
import { fetchAccounts, type Account } from '@/lib/firebase';
import { mockAccounts } from '@/lib/mockData';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

// ── Floating particles ──────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
            opacity: 0.2 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// ── Stat ticker ─────────────────────────────────────────────────────
const stats = [
  { label: 'Accounts Listed', value: '200+' },
  { label: 'Happy Buyers', value: '500+' },
  { label: 'Evo Guns Found', value: '1200+' },
  { label: 'Avg Response', value: '<2 min' },
];

// ── Features ────────────────────────────────────────────────────────
const features = [
  {
    icon: Shield,
    title: 'Premium Accounts',
    desc: 'Every account is hand-verified for authenticity. No fakes, no recycled content — only genuine premium Free Fire accounts with full details disclosed.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'Our admin team is active around the clock. Reach out on WhatsApp and expect a reply within minutes, not hours.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Trusted Marketplace',
    desc: 'With over 500 successful transactions and a growing community of gamers, ZALID is the go-to marketplace for serious Free Fire buyers.',
    color: 'cyan',
  },
];

// ── Steps ────────────────────────────────────────────────────────────
const steps = [
  { icon: Search, number: '01', title: 'Browse Accounts', desc: 'Explore our full catalog of premium Free Fire accounts with detailed stats, images, and pricing.' },
  { icon: MousePointer, number: '02', title: 'Select Account', desc: 'Find the perfect account matching your budget, level preference, and desired Evo Gun count.' },
  { icon: Phone, number: '03', title: 'Contact WhatsApp', desc: 'Click the WhatsApp button on any listing and our team will guide you through the safe purchase.' },
];

// ── FAQ preview ──────────────────────────────────────────────────────
const faqPreview = [
  { q: 'How do I buy an account?', a: 'Simply browse the marketplace, click on any account you like, and hit the WhatsApp button. Our team will guide you through the payment and transfer process.' },
  { q: 'Are the accounts safe to buy?', a: 'Yes. All accounts are verified by our team before listing. We provide complete account details so you know exactly what you are buying.' },
  { q: 'How fast will I get a response?', a: 'Our admin team responds within minutes on WhatsApp during active hours (9 AM – 12 AM PKT).' },
];

export default function Index() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchAccounts().then((data) => {
      setAccounts(data.length > 0 ? data.slice(0, 6) : mockAccounts.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg">
        <div className="absolute inset-0 grid-overlay" />
        <Particles />

        {/* Radial glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/6 blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl py-32">
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/25 text-primary font-orbitron text-xs tracking-widest uppercase mb-8 shadow-glow-sm"
          >
            <Star className="w-3.5 h-3.5 fill-primary" />
            Pakistan's #1 Free Fire Marketplace
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6"
          >
            Premium{' '}
            <span className="gradient-text glow-text-purple">
              Free Fire
            </span>
            <br />
            <span className="text-foreground/90">Accounts</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-rajdhani text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover rare Elite Pass bundles, Evolution Guns, and top-ranked accounts.
            Browse, select, and contact us on WhatsApp — no sign-up required.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/accounts"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-orbitron text-sm tracking-widest uppercase shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 animate-glow-pulse"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-foreground font-orbitron text-sm tracking-widest uppercase hover:border-primary/40 transition-all duration-300 hover:shadow-glow-sm"
            >
              How It Works
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-xl border border-white/8 p-4 text-center">
                <p className="font-orbitron text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="font-rajdhani text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-orbitron text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── FEATURED ACCOUNTS ────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle
              label="Listings"
              title="Featured"
              highlight="Accounts"
              subtitle="Hand-picked premium Free Fire accounts available right now."
              align="left"
            />
            <Link
              to="/accounts"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl glass border border-primary/30 text-primary font-orbitron text-xs tracking-widest uppercase hover:bg-primary/10 hover:shadow-glow-sm transition-all duration-300 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl glass border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((acc, i) => (
                <AccountCard key={acc.id} account={acc} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY ZALID ────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <SectionTitle
            label="Why Choose Us"
            title="Why"
            highlight={SITE_NAME}
            subtitle="We're not just a listing page — we're your trusted partner in finding the perfect Free Fire account."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              const borderClass = { purple: 'group-hover:border-primary/50 group-hover:shadow-glow-md', blue: 'group-hover:border-secondary/50 group-hover:shadow-glow-blue', cyan: 'group-hover:border-accent/50 group-hover:shadow-glow-cyan' }[feat.color];
              const iconClass = { purple: 'text-primary bg-primary/10', blue: 'text-secondary bg-secondary/10', cyan: 'text-accent bg-accent/10' }[feat.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className={`group glass rounded-2xl border border-white/8 p-8 transition-all duration-300 ${borderClass}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${iconClass}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-foreground mb-3">{feat.title}</h3>
                  <p className="font-rajdhani text-muted-foreground leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <SectionTitle
            label="Process"
            title="How It"
            highlight="Works"
            subtitle="Three simple steps to claim your premium Free Fire account."
            className="mb-16"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-primary opacity-30" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl glass neon-border-purple flex items-center justify-center shadow-glow-sm animate-glow-pulse">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center font-orbitron text-xs text-white">
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-orbitron text-xs text-primary tracking-widest mb-2">{step.number}</span>
                  <h3 className="font-orbitron text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="font-rajdhani text-muted-foreground max-w-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle
            label="FAQ"
            title="Common"
            highlight="Questions"
            className="mb-12"
          />

          <div className="space-y-3">
            {faqPreview.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-xl border border-white/8 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-rajdhani font-semibold text-foreground hover:text-primary transition-colors duration-200"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5"
                  >
                    <p className="font-rajdhani text-muted-foreground leading-relaxed border-t border-white/5 pt-4">{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-primary font-orbitron text-xs tracking-widest uppercase hover:text-primary/80 transition-colors group"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(155,51,255,0.15) 0%, rgba(37,99,235,0.12) 50%, rgba(0,229,255,0.08) 100%)' }}
          >
            <div className="absolute inset-0 neon-border-purple rounded-3xl" />
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <div className="relative z-10">
              <h2 className="font-orbitron text-3xl md:text-4xl font-black text-foreground mb-4">
                Ready to find your{' '}
                <span className="gradient-text">dream account?</span>
              </h2>
              <p className="font-rajdhani text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Browse our full catalog or contact us directly on WhatsApp — we're here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/accounts"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-orbitron text-sm tracking-widest uppercase shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                >
                  Browse All Accounts
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/923001234567`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] font-orbitron text-sm tracking-widest uppercase hover:bg-[#25D366]/25 transition-all duration-300 hover:shadow-glow-green"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
