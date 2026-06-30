import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import WhatsAppButton from '@/components/WhatsAppButton';
import { mockAccounts } from '@/lib/mockData';

const faqs = [
  {
    category: 'Buying Process',
    items: [
      {
        q: 'How do I buy an account?',
        a: "It's simple. Browse our marketplace, find an account that suits you, then click the WhatsApp button on the account page. Our team will guide you through the payment and account transfer process step by step.",
      },
      {
        q: 'How do I contact the seller?',
        a: 'All purchases are handled exclusively through WhatsApp. Click the green WhatsApp button on any account listing to open a pre-filled message with account details. Our team responds to every inquiry.',
      },
      {
        q: 'How does the full process work?',
        a: '1. Browse accounts and find what you want. 2. Click WhatsApp button — it auto-fills account details. 3. Confirm the price with our admin. 4. Make payment via your preferred method. 5. Receive account credentials securely.',
      },
    ],
  },
  {
    category: 'Account Details',
    items: [
      {
        q: 'What information is shown for each account?',
        a: "Every listing shows the Account ID, Level, Age, Total Outfits (Shirts, Bottoms, Masks, Heads, Shoes), Number of Evolution Guns, Price, Description, and Status. Multiple images are provided so you can verify the account visually.",
      },
      {
        q: 'Are the images real?',
        a: 'Yes. All images are actual screenshots from the account being listed. We show the in-game profile, outfit collection, and any special items to give you full transparency.',
      },
      {
        q: 'What does "Evo Guns" mean?',
        a: 'Evolution (Evo) Guns are special weapons in Free Fire with unique visual upgrades and enhanced skins. They are rare and highly valued. More Evo Guns = higher account value.',
      },
    ],
  },
  {
    category: 'Availability & Response',
    items: [
      {
        q: 'Are accounts available immediately?',
        a: 'Accounts marked with the green "Available" badge can be purchased immediately. Accounts marked "Sold" are no longer available. Our listing is updated in real-time.',
      },
      {
        q: 'How fast will I get a response?',
        a: 'Our admin team is active from 9 AM to 12 AM (PKT) and typically responds within 2–5 minutes on WhatsApp. Outside those hours, expect a reply first thing in the morning.',
      },
      {
        q: 'What if the account is already sold by the time I contact?',
        a: "On rare occasions an account may sell very quickly. If that happens, our team will immediately suggest similar alternatives from our inventory that match your budget and preferences.",
      },
    ],
  },
  {
    category: 'Safety & Trust',
    items: [
      {
        q: 'Is it safe to buy from ZALID?',
        a: 'ZALID has completed 500+ successful transactions. We verify every account before listing and provide complete transparency. We do not list unverified or stolen accounts.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'Our team will discuss payment options with you on WhatsApp. Common methods include EasyPaisa, JazzCash, bank transfer, and other local payment options.',
      },
    ],
  },
];

interface FaqItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ q, a, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`glass rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-primary/30 shadow-glow-sm' : 'border-white/8'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`font-rajdhani font-semibold text-base transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-foreground'}`}>
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5"
        >
          <p className="font-rajdhani text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
            {a}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>('0-0');
  const toggle = (key: string) => setOpenKey(openKey === key ? null : key);

  const demoAccount = mockAccounts[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 hero-bg">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <SectionTitle
            label="Support"
            title="Frequently Asked"
            highlight="Questions"
            subtitle="Everything you need to know about buying Premium Free Fire accounts from ZALID."
          />
        </div>
      </div>

      {/* FAQ content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        {faqs.map((section, si) => (
          <div key={si} className="mb-12">
            {/* Category heading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <HelpCircle className="w-4 h-4 text-primary" />
              <h2 className="font-orbitron text-sm tracking-widest uppercase text-primary">
                {section.category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            </motion.div>

            <div className="space-y-3">
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                return (
                  <FaqItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                    index={ii}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl border border-primary/20 p-8 text-center shadow-glow-sm"
        >
          <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="font-rajdhani text-muted-foreground mb-6">
            Our team is available on WhatsApp and will answer any question within minutes.
          </p>
          <WhatsAppButton account={demoAccount} size="md" />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
