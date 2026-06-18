import { useSearchParams, useNavigate } from 'react-router-dom';
import { PHONES } from '@/data/phones';
import Icon from '@/components/ui/icon';

const SCORE_LABELS: Record<string, string> = {
  camera: '📷 Камера',
  battery: '🔋 Батарея',
  performance: '⚡ Скорость',
  display: '🖥 Экран',
  value: '💰 Цена/кач.',
};

const SPEC_LABELS: Record<string, string> = {
  display: 'Экран', chip: 'Процессор', ram: 'ОЗУ', storage: 'Память',
  battery: 'Аккумулятор', camera: 'Камера', os: 'ОС', weight: 'Вес', charging: 'Зарядка',
};

export default function Compare() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ids = (params.get('ids') || '').split(',').filter(Boolean).slice(0, 3);
  const phones = ids.map(id => PHONES.find(p => p.id === id)).filter(Boolean) as typeof PHONES;

  if (phones.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-5xl mb-4">📊</p>
          <p className="text-xl font-semibold mb-2">Нет телефонов для сравнения</p>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">Выбрать телефоны</button>
        </div>
      </div>
    );
  }

  const getBest = (key: keyof typeof phones[0]['scores']) =>
    Math.max(...phones.map(p => p.scores[key]));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm">Назад к каталогу</span>
          </button>
          <span className="font-bold ml-2">Сравнение</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl overflow-x-auto">
        {/* PHONE CARDS */}
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(${phones.length}, 1fr)` }}>
          <div />
          {phones.map(phone => (
            <div key={phone.id} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="bg-secondary/30 rounded-lg flex items-center justify-center h-32 mb-3">
                <img src={phone.image} alt={phone.model} className="h-full object-contain p-2"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100/1e2030/6b7280?text=📱'; }} />
              </div>
              <p className="text-xs text-muted-foreground">{phone.brand}</p>
              <p className="font-bold text-sm">{phone.model}</p>
              <p className="text-primary font-bold mt-1">{phone.price.toLocaleString('ru-RU')} ₽</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{phone.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* SCORES */}
        <div className="bg-card border border-border rounded-xl mb-6 overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <h3 className="font-bold">Оценки</h3>
          </div>
          {(Object.keys(SCORE_LABELS) as Array<keyof typeof phones[0]['scores']>).map((key, i) => {
            const best = getBest(key);
            return (
              <div
                key={key}
                className={`grid gap-4 px-5 py-4 items-center ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}
                style={{ gridTemplateColumns: `200px repeat(${phones.length}, 1fr)` }}
              >
                <span className="text-sm text-muted-foreground">{SCORE_LABELS[key]}</span>
                {phones.map(phone => {
                  const val = phone.scores[key];
                  const isBest = val === best;
                  return (
                    <div key={phone.id} className="text-center">
                      <div className={`text-lg font-bold ${isBest ? 'text-accent' : 'text-foreground'}`}>
                        {val}
                      </div>
                      <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${val}%`,
                            backgroundColor: isBest ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* SPECS */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <h3 className="font-bold">Характеристики</h3>
          </div>
          {(Object.keys(SPEC_LABELS) as Array<keyof typeof phones[0]['specs']>).map((key, i) => (
            <div
              key={key}
              className={`grid gap-4 px-5 py-4 items-start ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}
              style={{ gridTemplateColumns: `200px repeat(${phones.length}, 1fr)` }}
            >
              <span className="text-sm text-muted-foreground pt-0.5">{SPEC_LABELS[key]}</span>
              {phones.map(phone => (
                <span key={phone.id} className="text-sm font-medium text-center">{phone.specs[key]}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
