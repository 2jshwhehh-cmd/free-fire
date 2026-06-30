import { Link } from 'react-router-dom';
import { Zap, MessageCircle, Shield, Star } from 'lucide-react';
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 mt-32">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-primary opacity-50" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-orbitron text-2xl font-black tracking-[0.2em] gradient-text">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground font-rajdhani text-sm leading-relaxed max-w-xs">
              The most trusted premium Free Fire account marketplace. Browse, contact, and own your dream account.
            </p>
            <div className="flex items-center gap-2 text-neon-green font-rajdhani text-sm">
              <Shield className="w-4 h-4" />
              <span>Trusted Marketplace</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-orbitron text-xs tracking-widest uppercase text-muted-foreground mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Marketplace', href: '/accounts' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-rajdhani text-muted-foreground hover:text-foreground transition-colors duration-200 hover:text-primary flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron text-xs tracking-widest uppercase text-muted-foreground mb-5">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="text-muted-foreground font-rajdhani text-sm">
                All purchases are handled directly via WhatsApp. Contact us to buy any account.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass neon-border-purple text-foreground font-rajdhani font-semibold text-sm hover:shadow-glow-sm transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-neon-green group-hover:scale-110 transition-transform" />
                Contact on WhatsApp
              </a>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                ))}
                <span className="text-muted-foreground font-rajdhani text-xs ml-1">Trusted by 500+ buyers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-rajdhani text-muted-foreground text-sm">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-rajdhani text-muted-foreground text-xs">
            This is not affiliated with Free Fire / Garena. Browse-only marketplace.
          </p>
        </div>
      </div>
    </footer>
  );
}
