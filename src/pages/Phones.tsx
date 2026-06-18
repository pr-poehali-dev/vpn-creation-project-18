import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PHONES, CATEGORIES, PRICE_SEGMENTS, type Category, type PriceSegment } from '@/data/phones';
import Icon from '@/components/ui/icon';

const SCORE_LABELS: Record<string, string> = {
  camera: 'Камера',
  battery: 'Батарея',
  performance: 'Скорость',
  display: 'Экран',
  value: 'Цена/кач.',
};

const SCORE_COLORS: Record<string, string> = {
  camera: '#3b82f6',
  battery: '#10b981',
  performance: '#8b5cf6',
  display: '#f59e0b',
  value: '#ef4444',
};

const SORT_OPTIONS = [
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'camera', label: 'По камере' },
  { value: 'battery', label: 'По батарее' },
  { value: 'performance', label: 'По скорости' },
];

export default function Phones() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | 'все'>('все');
  const [priceSegment, setPriceSegment] = useState<PriceSegment | 'все'>('все');
  const [sort, setSort] = useState('rating');
  const [search, setSearch] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = PHONES;
    if (search) list = list.filter(p =>
      `${p.brand} ${p.model}`.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'все') list = list.filter(p => p.categories.includes(category));
    if (priceSegment !== 'все') list = list.filter(p => p.priceSegment === priceSegment);

    return [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'camera') return b.scores.camera - a.scores.camera;
      if (sort === 'battery') return b.scores.battery - a.scores.battery;
      if (sort === 'performance') return b.scores.performance - a.scores.performance;
      return 0;
    });
  }, [category, priceSegment, sort, search]);

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-xl shrink-0">
            <span className="text-primary">📱</span>
            <span>PhoneSearch</span>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="iPhone, Samsung, Xiaomi..."
              className="w-full bg-muted border border-border rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
          {compareList.length > 0 && (
            <button
              onClick={() => navigate(`/compare?ids=${compareList.join(',')}`)}
              className="shrink-0 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
            >
              <Icon name="GitCompare" size={15} />
              Сравнить {compareList.length}
            </button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* HERO */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Выбери свой телефон</h1>
          <p className="text-muted-foreground">
            {PHONES.length} моделей с реальными характеристиками и оценками
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 flex-wrap mb-4">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* FILTERS ROW */}
        <div className="flex gap-3 flex-wrap items-center mb-8">
          <select
            value={priceSegment}
            onChange={e => setPriceSegment(e.target.value as PriceSegment | 'все')}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary cursor-pointer"
          >
            {PRICE_SEGMENTS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary cursor-pointer"
          >
            {SORT_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground ml-auto">
            Найдено: <span className="text-foreground font-medium">{filtered.length}</span>
          </span>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Ничего не найдено</p>
            <button onClick={() => { setSearch(''); setCategory('все'); setPriceSegment('все'); }}
              className="mt-4 text-primary hover:underline text-sm">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((phone, i) => {
              const inCompare = compareList.includes(phone.id);
              return (
                <div
                  key={phone.id}
                  className={`bg-card border rounded-xl overflow-hidden card-hover cursor-pointer animate-fade-up ${inCompare ? 'border-primary' : 'border-border'}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => navigate(`/phone/${phone.id}`)}
                >
                  {/* Image */}
                  <div className="relative bg-secondary/30 flex items-center justify-center h-44 p-4">
                    <img
                      src={phone.image}
                      alt={`${phone.brand} ${phone.model}`}
                      className="h-full object-contain"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/1e2030/6b7280?text=📱'; }}
                    />
                    {/* Category badges */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {phone.categories.slice(0, 2).map(cat => (
                        <span key={cat} className="badge-category bg-background/80 text-foreground backdrop-blur">
                          {CATEGORIES.find(c => c.value === cat)?.icon} {cat}
                        </span>
                      ))}
                    </div>
                    {/* Compare toggle */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleCompare(phone.id); }}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        inCompare ? 'bg-primary text-primary-foreground' : 'bg-background/80 text-muted-foreground hover:text-foreground backdrop-blur'
                      }`}
                      title={inCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
                    >
                      <Icon name={inCompare ? 'Check' : 'Plus'} size={13} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-0.5">{phone.brand}</p>
                    <h3 className="font-semibold text-base mb-1">{phone.model}</h3>
                    <p className="text-primary font-bold text-lg mb-3">
                      {phone.price.toLocaleString('ru-RU')} ₽
                    </p>

                    {/* Score bars */}
                    <div className="space-y-1.5">
                      {Object.entries(phone.scores).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-16 shrink-0">{SCORE_LABELS[key]}</span>
                          <div className="score-bar flex-1">
                            <div
                              className="score-fill"
                              style={{ width: `${val}%`, backgroundColor: SCORE_COLORS[key] }}
                            />
                          </div>
                          <span className="text-xs font-medium w-6 text-right">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-sm">{phone.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{phone.specs.battery}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMPARE BAR */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-primary p-4 z-50">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {compareList.map(id => {
                const p = PHONES.find(x => x.id === id);
                return p ? (
                  <div key={id} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                    <span className="text-sm font-medium">{p.brand} {p.model}</span>
                    <button onClick={() => toggleCompare(id)} className="text-muted-foreground hover:text-foreground">
                      <Icon name="X" size={13} />
                    </button>
                  </div>
                ) : null;
              })}
              {compareList.length < 3 && (
                <span className="text-sm text-muted-foreground">+ ещё {3 - compareList.length} для сравнения</span>
              )}
            </div>
            <button
              onClick={() => navigate(`/compare?ids=${compareList.join(',')}`)}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Icon name="GitCompare" size={15} />
              Сравнить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
