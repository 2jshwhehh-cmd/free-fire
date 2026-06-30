import { SlidersHorizontal, X } from 'lucide-react';

export interface FilterState {
  status: 'all' | 'available' | 'sold';
  minEvoGuns: number;
  sortBy: 'newest' | 'cheapest' | 'highest-level' | 'most-evo';
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isActive: boolean;
}

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
] as const;

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'highest-level', label: 'Highest Level' },
  { value: 'most-evo', label: 'Most Evo Guns' },
] as const;

const evoOptions = [0, 1, 2, 3, 4, 5];

export default function FilterPanel({ filters, onChange, onReset, isActive }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground font-orbitron text-sm tracking-wider uppercase">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Filters
        </div>
        {isActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-rajdhani"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <p className="font-orbitron text-xs text-muted-foreground tracking-widest uppercase">Status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, status: opt.value })}
              className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani font-semibold transition-all duration-200 ${
                filters.status === opt.value
                  ? 'bg-primary/20 border border-primary/50 text-primary shadow-glow-sm'
                  : 'glass border border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Min Evo Guns */}
      <div className="space-y-2">
        <p className="font-orbitron text-xs text-muted-foreground tracking-widest uppercase">
          Min Evo Guns
        </p>
        <div className="flex flex-wrap gap-2">
          {evoOptions.map((num) => (
            <button
              key={num}
              onClick={() => onChange({ ...filters, minEvoGuns: num })}
              className={`w-10 h-10 rounded-lg text-sm font-orbitron transition-all duration-200 ${
                filters.minEvoGuns === num
                  ? 'bg-primary/20 border border-primary/50 text-primary shadow-glow-sm'
                  : 'glass border border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground'
              }`}
            >
              {num === 0 ? 'All' : `${num}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort by */}
      <div className="space-y-2">
        <p className="font-orbitron text-xs text-muted-foreground tracking-widest uppercase">Sort By</p>
        <div className="space-y-1.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, sortBy: opt.value })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-rajdhani transition-all duration-200 ${
                filters.sortBy === opt.value
                  ? 'bg-primary/15 border border-primary/40 text-primary'
                  : 'glass border border-white/5 text-muted-foreground hover:border-white/15 hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
