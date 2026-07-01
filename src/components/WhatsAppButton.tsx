import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import type { Account } from '@/lib/firebase';

interface WhatsAppButtonProps {
  account: Account;
  currentUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function WhatsAppButton({
  account,
  currentUrl,
  size = 'lg',
  className = '',
}: WhatsAppButtonProps) {
  const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');

  const message = `Hello ZALID Team,

I want to buy this Free Fire account.

Account ID: ${account.id}
Level: ${account.level}
Price: Rs ${account.price}

Product Link: ${url}`;

  const encodedMessage = encodeURIComponent(message);
  const dealerNumber = account.dealerWhatsApp || WHATSAPP_NUMBER;

const whatsappUrl = `https://wa.me/${dealerNumber}?text=${encodedMessage}`;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2.5',
    lg: 'px-8 py-4 text-lg gap-3',
  }[size];

  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }[size];

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl font-rajdhani font-bold tracking-wide transition-all duration-300 cursor-pointer
        bg-[#25D366] hover:bg-[#20BD5C] text-white shadow-glow-green hover:shadow-[0_0_30px_rgba(37,211,102,0.5),0_0_60px_rgba(37,211,102,0.2)] hover:scale-105
        ${sizeClasses} ${className}`}
    >
      <MessageCircle className={`${iconSizes} fill-white/20`} />
      Contact on WhatsApp
    </a>
  );
}
