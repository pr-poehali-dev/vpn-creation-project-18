import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const PLANS = [
  {
    name: 'СТАРТ',
    price: 'Бесплатно',
    period: '7 дней',
    accent: 'text-secondary',
    border: 'border-muted hover:border-secondary',
    features: ['1 устройство', '3 сервера', 'Полная скорость', 'Без логов'],
  },
  {
    name: 'ГЕРОЙ',
    price: '249 ₽',
    period: '/месяц',
    best: true,
    accent: 'text-primary',
    border: 'border-primary',
    features: ['5 устройств', 'Все 60+ серверов', 'Без лимита скорости', 'Поддержка 24/7'],
  },
  {
    name: 'БОСС',
    price: '149 ₽',
    period: '/мес · при оплате за год',
    accent: 'text-accent',
    border: 'border-muted hover:border-accent',
    features: ['10 устройств', 'Все серверы', 'Макс. скорость', 'Приоритет'],
  },
];

const Auth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'auth' | 'plan'>('auth');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Заполните все поля'); return; }
    if (mode === 'register' && !name) { setError('Введите имя'); return; }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('vpn_user', JSON.stringify({ email, name: name || email.split('@')[0] }));
      setLoading(false);
      if (mode === 'register') {
        setStep('plan');
      } else {
        navigate('/app');
      }
    }, 1200);
  };

  const choosePlan = (planName: string) => {
    const stored = localStorage.getItem('vpn_user');
    if (stored) {
      const u = JSON.parse(stored);
      localStorage.setItem('vpn_user', JSON.stringify({ ...u, plan: planName }));
    }
    navigate('/app');
  };

  if (step === 'plan') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12"
        style={{
          backgroundImage: 'linear-gradient(rgba(120,150,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,200,0.04) 1px,transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <div className="font-pixel text-secondary text-lg mb-3">
              <span className="text-primary">▶</span> PIXEL VPN
            </div>
            <h2 className="font-pixel text-lg text-foreground mb-3">ВЫБЕРИТЕ ТАРИФ</h2>
            <p className="font-mono-pixel text-xl text-muted-foreground">
              Начните с бесплатного — перейдите на платный в любой момент
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative bg-card border-4 p-6 flex flex-col transition-colors ${p.border}`}
                style={{ boxShadow: p.best ? '6px 6px 0 0 #05070d' : '4px 4px 0 0 #05070d' }}
              >
                {p.best && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-pixel text-[8px] bg-primary text-primary-foreground px-3 py-2 whitespace-nowrap">
                    ★ ПОПУЛЯРНЫЙ ★
                  </span>
                )}
                <h3 className={`font-pixel text-sm ${p.accent} mb-3`}>{p.name}</h3>
                <div className="mb-4">
                  <span className="font-pixel text-xl text-foreground">{p.price}</span>
                  <span className="font-mono-pixel text-lg text-muted-foreground ml-1">{p.period}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-mono-pixel text-lg">
                      <Icon name="Check" size={15} className={p.accent} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choosePlan(p.name)}
                  className={`font-pixel text-[10px] py-3 transition-all hover:brightness-110 ${p.best ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-secondary hover:text-background'}`}
                  style={{ boxShadow: '3px 3px 0 0 #05070d' }}
                >
                  ВЫБРАТЬ
                </button>
              </div>
            ))}
          </div>

          <p className="font-mono-pixel text-lg text-center text-muted-foreground mt-8">
            Без привязки карты · Отмена в любой момент
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(120,150,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,200,0.04) 1px,transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 font-pixel text-[10px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <Icon name="ArrowLeft" size={14} /> НА ГЛАВНУЮ
      </button>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-pixel text-secondary text-lg mb-2">
            <span className="text-primary">▶</span> PIXEL VPN
          </div>
          <p className="font-mono-pixel text-xl text-muted-foreground">
            {mode === 'login' ? 'Вход в аккаунт' : 'Создать аккаунт'}
          </p>
        </div>

        <div className="bg-card border-4 border-muted p-8"
          style={{ boxShadow: '6px 6px 0 0 #05070d' }}
        >
          <div className="flex mb-6 border-4 border-muted">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 font-pixel text-[9px] py-3 transition-colors ${mode === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              ВХОД
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 font-pixel text-[9px] py-3 transition-colors ${mode === 'register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              РЕГИСТРАЦИЯ
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="font-pixel text-[9px] text-muted-foreground block mb-2">ИМЯ</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван"
                  className="w-full bg-background border-4 border-muted focus:border-primary outline-none px-4 py-3 font-mono-pixel text-xl text-foreground placeholder:text-muted-foreground transition-colors"
                />
              </div>
            )}
            <div>
              <label className="font-pixel text-[9px] text-muted-foreground block mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-background border-4 border-muted focus:border-primary outline-none px-4 py-3 font-mono-pixel text-xl text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
            <div>
              <label className="font-pixel text-[9px] text-muted-foreground block mb-2">ПАРОЛЬ</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border-4 border-muted focus:border-primary outline-none px-4 py-3 font-mono-pixel text-xl text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>

            {error && (
              <p className="font-pixel text-[9px] text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-pixel text-[10px] bg-primary text-primary-foreground py-4 mt-2 hover:brightness-110 disabled:opacity-60 transition-all"
              style={{ boxShadow: loading ? 'none' : '4px 4px 0 0 #05070d' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="Loader" size={14} className="animate-spin" />
                  {mode === 'login' ? 'ВХОДИМ...' : 'СОЗДАЁМ АККАУНТ...'}
                </span>
              ) : mode === 'login' ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ'}
            </button>
          </form>
        </div>

        <p className="font-mono-pixel text-lg text-center text-muted-foreground mt-6">
          {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-secondary hover:text-foreground transition-colors underline"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
