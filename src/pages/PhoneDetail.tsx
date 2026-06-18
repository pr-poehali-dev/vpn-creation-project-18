import { useParams, useNavigate } from 'react-router-dom';
import { PHONES, CATEGORIES } from '@/data/phones';
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

export default function PhoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const phone = PHONES.find(p => p.id === id);

  if (!phone) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-xl font-semibold mb-2">Телефон не найден</p>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">На главную</button>
      </div>
    </div>
  );

  const similar = PHONES.filter(p =>
    p.id !== phone.id && p.categories.some(c => phone.categories.includes(c))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm">Назад</span>
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-sm">{phone.brand} {phone.model}</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="bg-card border border-border rounded-2xl flex items-center justify-center p-8 min-h-72">
            <img
              src={phone.image}
              alt={`${phone.brand} ${phone.model}`}
              className="max-h-72 object-contain"
              onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300/1e2030/6b7280?text=📱'; }}
            />
          </div>

          {/* Main info */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              {phone.categories.map(cat => (
                <span key={cat} className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {CATEGORIES.find(c => c.value === cat)?.icon} {cat}
                </span>
              ))}
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">{phone.brand}</p>
              <h1 className="text-3xl font-bold">{phone.model}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">{phone.price.toLocaleString('ru-RU')} ₽</span>
              <div className="flex items-center gap-1 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1.5 rounded-full">
                <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-sm">{phone.rating}</span>
              </div>
            </div>

            {/* Score bars */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              {Object.entries(phone.scores).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-20 shrink-0">{SCORE_LABELS[key]}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, backgroundColor: SCORE_COLORS[key] }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">{val}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(`/compare?ids=${phone.id}`)}
              className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 font-medium text-sm hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="GitCompare" size={16} />
              Добавить в сравнение
            </button>
          </div>
        </div>

        {/* SPECS */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-5">Характеристики</h2>
          <div className="grid sm:grid-cols-2 gap-0 divide-y divide-border sm:divide-y-0">
            {Object.entries(phone.specs).map(([key, val], i) => {
              const labels: Record<string, string> = {
                display: 'Экран', chip: 'Процессор', ram: 'Оперативная память',
                storage: 'Память', battery: 'Аккумулятор', camera: 'Камера',
                os: 'Операционная система', weight: 'Вес', charging: 'Зарядка',
              };
              return (
                <div key={key} className={`flex justify-between gap-4 py-3 px-2 ${i % 2 === 0 ? 'sm:border-r sm:border-border sm:pr-6' : 'sm:pl-6'}`}>
                  <span className="text-muted-foreground text-sm shrink-0">{labels[key] || key}</span>
                  <span className="text-sm text-right font-medium">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROS / CONS */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-accent">
              <Icon name="ThumbsUp" size={18} /> Плюсы
            </h3>
            <ul className="space-y-2">
              {phone.pros.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Icon name="Check" size={15} className="text-accent mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-destructive">
              <Icon name="ThumbsDown" size={18} /> Минусы
            </h3>
            <ul className="space-y-2">
              {phone.cons.map(c => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <Icon name="X" size={15} className="text-destructive mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SIMILAR */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5">Похожие телефоны</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/phone/${p.id}`)}
                  className="bg-card border border-border rounded-xl p-4 card-hover cursor-pointer"
                >
                  <div className="bg-secondary/30 rounded-lg flex items-center justify-center h-28 mb-3">
                    <img src={p.image} alt={p.model} className="h-full object-contain p-2"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100/1e2030/6b7280?text=📱'; }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                  <p className="font-semibold text-sm">{p.model}</p>
                  <p className="text-primary font-bold mt-1">{p.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
