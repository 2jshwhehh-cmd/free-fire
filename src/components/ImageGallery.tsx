import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  accountId: string;
}

export default function ImageGallery({ images, accountId }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const safeImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
  ];

  const prev = () => setActiveIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % safeImages.length);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/8 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={safeImages[activeIndex]}
              alt={`Account ${accountId} image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass border border-white/10 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass border border-white/10 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Zoom button */}
          <button
            onClick={() => openLightbox(activeIndex)}
            className="absolute top-3 right-3 p-2 rounded-full glass border border-white/10 text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-sm"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md glass border border-white/10 font-orbitron text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {activeIndex + 1} / {safeImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {safeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIndex
                    ? 'border-primary shadow-glow-sm'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 text-foreground hover:border-primary/50"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.img
              src={safeImages[lightboxIndex]}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {safeImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/10 text-foreground hover:border-primary/50 hover:shadow-glow-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % safeImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/10 text-foreground hover:border-primary/50 hover:shadow-glow-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
