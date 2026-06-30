import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Grid3X3, LayoutList } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccountCard from '@/components/AccountCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel, { type FilterState } from '@/components/FilterPanel';
import SectionTitle from '@/components/SectionTitle';
import { fetchAccounts, type Account } from '@/lib/firebase';
import { mockAccounts } from '@/lib/mockData';

const DEFAULT_FILTERS: FilterState = {
  status: 'all',
  minEvoGuns: 0,
  sortBy: 'newest',
};

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetchAccounts().then((data) => {
      setAccounts(data.length > 0 ? data : mockAccounts);
      setLoading(false);
    });
  }, []);

  const isFilterActive =
    filters.status !== 'all' || filters.minEvoGuns !== 0 || filters.sortBy !== 'newest';

  const filtered = useMemo(() => {
    let list = [...accounts];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          a.level.toLowerCase().includes(q),
      );
    }

    // Status
    if (filters.status !== 'all') {
      list = list.filter((a) => a.status === filters.status);
    }

    // Min evo guns
    if (filters.minEvoGuns > 0) {
      list = list.filter((a) => parseInt(a.evoGuns) >= filters.minEvoGuns);
    }

    // Sort
    list.sort((a, b) => {
      switch (filters.sortBy) {
        case 'cheapest': return parseInt(a.price) - parseInt(b.price);
        case 'highest-level': return parseInt(b.level) - parseInt(a.level);
        case 'most-evo': return parseInt(b.evoGuns) - parseInt(a.evoGuns);
        default: return 0;
      }
    });

    return list;
  }, [accounts, search, filters]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page header */}
      <div className="relative pt-32 pb-16 hero-bg">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            label="Marketplace"
            title="Browse All"
            highlight="Accounts"
            subtitle={`${accounts.length} premium Free Fire accounts available`}
            align="left"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border font-orbitron text-sm tracking-wider transition-all duration-200 ${
              isFilterActive
                ? 'border-primary/50 text-primary bg-primary/10 shadow-glow-sm'
                : 'glass border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground'
            }`}
          >
            {filtersOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
            {filtersOpen ? 'Close' : 'Filters'}
            {isFilterActive && <span className="w-2 h-2 rounded-full bg-primary" />}
          </button>

          {/* Results count */}
          <div className="glass border border-white/8 px-4 py-3 rounded-xl flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            <span className="font-orbitron text-sm text-muted-foreground">
              {filtered.length} <span className="text-foreground">results</span>
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar filters (desktop) ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass rounded-2xl border border-white/8 p-6 sticky top-24">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(DEFAULT_FILTERS)}
                isActive={isFilterActive}
              />
            </div>
          </aside>

          {/* ── Mobile filter drawer ── */}
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full mb-4"
            >
              <div className="glass rounded-2xl border border-white/8 p-5">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onReset={() => setFilters(DEFAULT_FILTERS)}
                  isActive={isFilterActive}
                />
              </div>
            </motion.div>
          )}

          {/* ── Grid ── */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 rounded-2xl glass border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <LayoutList className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h3 className="font-orbitron text-xl text-foreground mb-2">No accounts found</h3>
                <p className="font-rajdhani text-muted-foreground">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(''); setFilters(DEFAULT_FILTERS); }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-primary/15 border border-primary/30 text-primary font-orbitron text-xs tracking-widest uppercase hover:bg-primary/25 transition-all"
                >
                  Clear All
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((acc, i) => (
                  <AccountCard key={acc.id} account={acc} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
