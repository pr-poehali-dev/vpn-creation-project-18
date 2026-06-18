import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/b3c34fe6-c743-4502-84bf-d2236cf9fa86/files/1e5fc303-be0d-4b29-8d6c-549f88c85c1c.jpg';

const NAV = [
  { id: 'home', label: 'ГЛАВНАЯ' },
  { id: 'servers', label: 'СЕРВЕРЫ' },
  { id: 'pricing', label: 'ЦЕНЫ' },
  { id: 'security', label: 'ЗАЩИТА' },
  { id: 'faq', label: 'FAQ' },
];

const SERVERS = [
  { flag: '🇳🇱', country: 'Нидерланды', ping: 12, load: 18 },
  { flag: '🇩🇪', country: 'Германия', ping: 24, load: 34 },
  { flag: '🇺🇸', country: 'США', ping: 96, load: 52 },
  { flag: '🇯🇵', country: 'Япония', ping: 140, load: 27 },
  { flag: '🇫🇮', country: 'Финляндия', ping: 19, load: 11 },
  { flag: '🇸🇬', country: 'Сингапур', ping: 110, load: 41 },
];

const PLANS = [
  {
    name: 'СТАРТ',
    price: '0',
    period: 'навсегда',
    accent: 'text-secondary',
    btn: 'bg-secondary text-background',
    check: 'text-secondary',
    features: ['1 устройство', '3 сервера', 'Скорость 10 Мбит/с', 'Без логов'],
    cta: 'НАЧАТЬ',
  },
  {
    name: 'ГЕРОЙ',
    price: '249',
    period: '/мес',
    accent: 'text-primary',
    btn: 'bg-primary text-primary-foreground',
    check: 'text-primary',
    best: true,
    features: ['5 устройств', 'Все 60+ серверов', 'Без лимита скорости', 'Без логов', 'Поддержка 24/7'],
    cta: 'ВЫБРАТЬ',
  },
  {
    name: 'БОСС',
    price: '149',
    period: '/мес*',
    accent: 'text-accent',
    btn: 'bg-accent text-accent-foreground',
    check: 'text-accent',
    features: ['10 устройств', 'Все серверы', 'Макс. скорость', 'Приоритет', '*при оплате за год'],
    cta: 'КУПИТЬ',
  },
];

const SECURITY = [
  {
    icon: 'Lock',
    title: 'Шифрование',
    text: 'Все ваши данные превращаются в код, который никто не сможет прочитать. Как сейф для интернета.',
  },
  {
    icon: 'Network',
    title: 'Выбор протокола',
    text: 'Сами решаете: быстрее или надёжнее. Один режим для игр и видео, другой — для максимальной защиты.',
  },
  {
    icon: 'EyeOff',
    title: 'Никаких логов',
    text: 'Мы не храним вашу историю посещений. То, что вы делаете в сети, остаётся только вашим делом.',
  },
  {
    icon: 'Zap',
    title: 'Kill Switch',
    text: 'Если связь с VPN вдруг прервётся — интернет отключится сам, чтобы вас не раскрыли.',
  },
];

const FAQ = [
  {
    q: 'Что такое VPN простыми словами?',
    a: 'Это защищённый туннель в интернете. Он скрывает, кто вы и откуда заходите, а ваши данные становятся невидимыми для посторонних.',
  },
  {
    q: 'Это законно?',
    a: 'Да, использование VPN для защиты личных данных и приватности абсолютно законно в большинстве стран.',
  },
  {
    q: 'Будет ли тормозить интернет?',
    a: 'На тарифе «Герой» скорость без лимита. Выбирайте ближайший сервер — и разницы почти не заметите.',
  },
  {
    q: 'На скольких устройствах работает?',
    a: 'От 1 до 10 устройств в зависимости от тарифа: телефон, ноутбук, планшет, телевизор.',
  },
];

const Index = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b-4 border-primary">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4">
          <div
            className="font-pixel text-secondary text-sm md:text-base text-glow-cyan cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('home')}
          >
            <span className="text-primary">▶</span> PIXEL VPN
          </div>
          <ul className="hidden md:flex gap-6">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`font-pixel text-[10px] transition-colors hover:text-accent ${
                    activeNav === n.id ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo('pricing')}
            className="font-pixel text-[10px] bg-primary text-primary-foreground px-4 py-3 pixel-shadow-cyan hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            СТАРТ
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative scanlines">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block font-mono-pixel text-2xl text-accent bg-muted px-3 py-1">
              ★ LEVEL UP YOUR PRIVACY ★
            </div>
            <h1 className="font-pixel text-2xl md:text-4xl leading-relaxed text-glow-pink text-primary">
              ЗАЩИТА<br />
              <span className="text-secondary text-glow-cyan">В СТИЛЕ</span><br />
              16 БИТ
            </h1>
            <p className="font-mono-pixel text-2xl text-foreground/80 max-w-md">
              Спрячь свой интернет за пиксельным щитом. Никаких логов, никаких глаз — только ты и сеть.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('pricing')}
                className="font-pixel text-xs bg-primary text-primary-foreground px-6 py-4 pixel-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                ИГРАТЬ ▶
              </button>
              <button
                onClick={() => scrollTo('security')}
                className="font-pixel text-xs bg-muted text-secondary px-6 py-4 border-4 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
              >
                КАК ЭТО РАБОТАЕТ
              </button>
            </div>
            <div className="font-pixel text-[10px] text-muted-foreground flex items-center gap-2">
              <span className="text-secondary animate-blink">●</span> 1 042 384 игрока онлайн
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="animate-float-pixel">
              <img
                src={HERO_IMG}
                alt="Пиксельный щит VPN"
                className="pixelated w-full max-w-sm border-4 border-secondary pixel-shadow animate-pulse-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVERS */}
      <section id="servers" className="py-20 bg-card border-y-4 border-primary">
        <div className="container mx-auto px-4">
          <SectionTitle pre="// SELECT" main="СЕРВЕРЫ" color="secondary" />
          <p className="font-mono-pixel text-2xl text-center text-foreground/70 mb-12">
            60+ точек по всему миру. Выбери ближайшую — и вперёд!
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVERS.map((s) => (
              <div
                key={s.country}
                className="bg-background border-4 border-muted p-5 hover:border-secondary transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl pixelated">{s.flag}</span>
                  <span className="font-pixel text-[8px] text-secondary border-2 border-secondary px-2 py-1">
                    ONLINE
                  </span>
                </div>
                <h3 className="font-pixel text-xs mb-4 group-hover:text-accent transition-colors">
                  {s.country}
                </h3>
                <div className="space-y-2 font-mono-pixel text-xl">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PING</span>
                    <span className="text-secondary">{s.ping} ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">LOAD</span>
                    <div className="flex-1 h-3 bg-muted border-2 border-background">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${s.load}%` }}
                      />
                    </div>
                    <span className="text-accent">{s.load}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle pre="// INSERT COIN" main="ЦЕНЫ" color="primary" />
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative bg-card border-4 p-8 flex flex-col ${
                  p.best ? 'border-primary md:-translate-y-4' : 'border-muted'
                }`}
                style={{
                  boxShadow: p.best
                    ? '8px 8px 0 0 #0a0820, 14px 14px 0 0 hsl(var(--primary))'
                    : '6px 6px 0 0 #0a0820',
                }}
              >
                {p.best && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-pixel text-[8px] bg-accent text-accent-foreground px-3 py-2 whitespace-nowrap">
                    ★ ВЫБОР ИГРОКОВ ★
                  </span>
                )}
                <h3 className={`font-pixel text-lg ${p.accent} mb-4`}>{p.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-pixel text-3xl">{p.price}</span>
                  <span className="font-mono-pixel text-xl text-muted-foreground mb-1">
                    ₽ {p.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-mono-pixel text-xl">
                      <Icon name="Check" size={18} className={`${p.check} mt-1 shrink-0`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`font-pixel text-xs py-4 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                    p.best ? 'bg-primary text-primary-foreground pixel-shadow-cyan' : p.btn
                  }`}
                  style={
                    !p.best ? { boxShadow: '6px 6px 0 0 #0a0820' } : undefined
                  }
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="py-20 bg-card border-y-4 border-secondary">
        <div className="container mx-auto px-4">
          <SectionTitle pre="// SHIELD" main="ЗАЩИТА" color="secondary" />
          <p className="font-mono-pixel text-2xl text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Объясняем простыми словами, как мы прячем тебя от посторонних глаз.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SECURITY.map((s) => (
              <div
                key={s.title}
                className="bg-background border-4 border-muted p-6 flex gap-5 hover:border-primary transition-colors"
              >
                <div className="shrink-0 w-14 h-14 bg-primary flex items-center justify-center border-4 border-background">
                  <Icon name={s.icon} size={28} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-pixel text-xs text-secondary mb-3">{s.title}</h3>
                  <p className="font-mono-pixel text-xl text-foreground/80 leading-snug">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle pre="// HELP" main="ВОПРОСЫ" color="accent" />
          <div className="mt-12 space-y-4">
            {FAQ.map((f, i) => (
              <div key={i} className="bg-card border-4 border-muted">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-pixel text-[11px] leading-relaxed text-foreground">
                    {f.q}
                  </span>
                  <Icon
                    name={openFaq === i ? 'Minus' : 'Plus'}
                    size={22}
                    className="text-accent shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <p className="font-mono-pixel text-xl text-foreground/80 px-5 pb-5 leading-snug animate-accordion-down">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary scanlines">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="font-pixel text-xl md:text-2xl text-primary-foreground leading-relaxed">
            ГОТОВ НАЖАТЬ START?
          </h2>
          <p className="font-mono-pixel text-2xl text-primary-foreground/90 max-w-md mx-auto">
            Подключайся за 30 секунд. Первый уровень — бесплатно.
          </p>
          <button
            onClick={() => scrollTo('pricing')}
            className="font-pixel text-sm bg-background text-secondary px-8 py-5 border-4 border-background hover:bg-secondary hover:text-background transition-all"
            style={{ boxShadow: '8px 8px 0 0 #0a0820' }}
          >
            PRESS START ▶
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t-4 border-primary bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-pixel text-secondary text-xs">
            <span className="text-primary">▶</span> PIXEL VPN
          </div>
          <p className="font-mono-pixel text-lg text-muted-foreground">
            © 2026 PIXEL VPN. GAME OVER? NEVER.
          </p>
          <div className="flex gap-4">
            {['Send', 'Github', 'Twitter'].map((ic) => (
              <button
                key={ic}
                className="w-10 h-10 bg-muted border-2 border-secondary flex items-center justify-center hover:bg-secondary hover:text-background transition-colors"
              >
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

const COLOR_MAP: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
};

const SectionTitle = ({
  pre,
  main,
  color,
}: {
  pre: string;
  main: string;
  color: string;
}) => (
  <div className="text-center mb-4">
    <div className={`font-mono-pixel text-xl ${COLOR_MAP[color]} mb-2`}>{pre}</div>
    <h2 className={`font-pixel text-2xl md:text-3xl ${COLOR_MAP[color]} inline-block`}>
      {main}
      <span className="text-accent animate-blink">_</span>
    </h2>
  </div>
);

export default Index;