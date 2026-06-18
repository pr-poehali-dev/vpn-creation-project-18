import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SERVERS = [
  { flag: '🇳🇱', country: 'Нидерланды', city: 'Амстердам', ping: 12, load: 18 },
  { flag: '🇩🇪', country: 'Германия', city: 'Франкфурт', ping: 24, load: 34 },
  { flag: '🇫🇮', country: 'Финляндия', city: 'Хельсинки', ping: 19, load: 11 },
  { flag: '🇺🇸', country: 'США', city: 'Нью-Йорк', ping: 96, load: 52 },
  { flag: '🇯🇵', country: 'Япония', city: 'Токио', ping: 140, load: 27 },
  { flag: '🇸🇬', country: 'Сингапур', city: 'Сингапур', ping: 110, load: 41 },
];

type Status = 'disconnected' | 'connecting' | 'connected';

const AppDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [status, setStatus] = useState<Status>('disconnected');
  const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
  const [showServers, setShowServers] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [connectedTime, setConnectedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('vpn_user');
    if (!stored) { navigate('/login'); return; }
    setUser(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    if (status === 'connected') {
      timerRef.current = setInterval(() => setConnectedTime(t => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setConnectedTime(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const toggle = () => {
    if (status === 'disconnected') {
      setStatus('connecting');
      setTimeout(() => setStatus('connected'), 2000);
    } else if (status === 'connected') {
      setStatus('disconnected');
    }
  };

  const logout = () => {
    localStorage.removeItem('vpn_user');
    navigate('/');
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const statusColor = {
    disconnected: 'text-muted-foreground',
    connecting: 'text-accent',
    connected: 'text-secondary',
  }[status];

  const statusLabel = {
    disconnected: 'НЕ ПОДКЛЮЧЕНО',
    connecting: 'ПОДКЛЮЧЕНИЕ...',
    connected: 'ПОДКЛЮЧЕНО',
  }[status];

  const btnColor = {
    disconnected: 'border-muted-foreground/50',
    connecting: 'border-accent',
    connected: 'border-secondary',
  }[status];

  const btnGlow = {
    disconnected: 'none',
    connecting: '0 0 30px hsl(var(--accent)/0.3), 0 0 60px hsl(var(--accent)/0.1)',
    connected: '0 0 40px hsl(var(--secondary)/0.4), 0 0 80px hsl(var(--secondary)/0.15)',
  }[status];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(rgba(120,150,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,200,0.04) 1px,transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* TOP BAR */}
      <header className="border-b-4 border-muted px-4 py-4 flex items-center justify-between">
        <div className="font-pixel text-secondary text-sm flex items-center gap-2">
          <span className="text-primary">▶</span> PIXEL VPN
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowServers(false); }}
            className={`flex items-center gap-2 px-3 py-2 border-2 transition-colors font-pixel text-[9px] ${showProfile ? 'border-primary text-primary' : 'border-muted text-muted-foreground hover:border-secondary hover:text-secondary'}`}
          >
            <Icon name="User" size={14} />
            {user?.name?.toUpperCase() || 'ПРОФИЛЬ'}
          </button>
        </div>
      </header>

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className="absolute top-20 right-4 z-50 bg-card border-4 border-primary w-64 p-5"
          style={{ boxShadow: '6px 6px 0 0 #05070d' }}
        >
          <div className="mb-4">
            <p className="font-pixel text-[9px] text-muted-foreground mb-1">АККАУНТ</p>
            <p className="font-mono-pixel text-xl text-foreground">{user?.email}</p>
          </div>
          <div className="mb-4 border-t-2 border-muted pt-4">
            <p className="font-pixel text-[9px] text-muted-foreground mb-1">ТАРИФ</p>
            <p className="font-mono-pixel text-xl text-secondary">Пробный · 7 дней</p>
          </div>
          <button
            onClick={logout}
            className="w-full font-pixel text-[9px] py-3 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="LogOut" size={13} /> ВЫЙТИ
          </button>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 gap-8">

        {/* STATUS */}
        <div className="text-center">
          <div className={`font-pixel text-xs ${statusColor} flex items-center justify-center gap-2 mb-2`}>
            <span className={`inline-block w-2 h-2 ${status === 'connected' ? 'bg-secondary animate-pulse' : status === 'connecting' ? 'bg-accent animate-blink' : 'bg-muted-foreground'}`} />
            {statusLabel}
          </div>
          {status === 'connected' && (
            <div className="font-mono-pixel text-3xl text-secondary">{formatTime(connectedTime)}</div>
          )}
        </div>

        {/* BIG POWER BUTTON */}
        <div className="relative flex items-center justify-center">
          {status === 'connected' && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-10 bg-secondary scale-110" />
          )}
          <button
            onClick={toggle}
            disabled={status === 'connecting'}
            className={`relative w-44 h-44 rounded-full border-8 flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed ${btnColor} bg-card hover:brightness-110 active:scale-95`}
            style={{ boxShadow: btnGlow }}
          >
            <div className={`transition-all duration-300 ${status === 'connecting' ? 'animate-spin' : ''}`}>
              <Icon
                name={status === 'connecting' ? 'Loader' : 'Power'}
                size={64}
                className={statusColor}
              />
            </div>
          </button>
        </div>

        {/* PING / IP INFO */}
        {status === 'connected' && (
          <div className="flex gap-6 text-center animate-fade-in">
            <div>
              <p className="font-pixel text-[8px] text-muted-foreground mb-1">ПИНГ</p>
              <p className="font-mono-pixel text-2xl text-secondary">{selectedServer.ping} ms</p>
            </div>
            <div className="w-px bg-muted" />
            <div>
              <p className="font-pixel text-[8px] text-muted-foreground mb-1">НАГРУЗКА</p>
              <p className="font-mono-pixel text-2xl text-secondary">{selectedServer.load}%</p>
            </div>
            <div className="w-px bg-muted" />
            <div>
              <p className="font-pixel text-[8px] text-muted-foreground mb-1">ПРОТОКОЛ</p>
              <p className="font-mono-pixel text-2xl text-secondary">WG</p>
            </div>
          </div>
        )}

        {/* SERVER SELECTOR */}
        <div className="w-full max-w-sm">
          <button
            onClick={() => { setShowServers(!showServers); setShowProfile(false); }}
            className={`w-full flex items-center justify-between px-5 py-4 bg-card border-4 transition-colors ${showServers ? 'border-primary' : 'border-muted hover:border-secondary'}`}
            style={{ boxShadow: '4px 4px 0 0 #05070d' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedServer.flag}</span>
              <div className="text-left">
                <p className="font-pixel text-[9px] text-foreground">{selectedServer.country}</p>
                <p className="font-mono-pixel text-lg text-muted-foreground">{selectedServer.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono-pixel text-xl text-secondary">{selectedServer.ping} ms</span>
              <Icon name={showServers ? 'ChevronUp' : 'ChevronDown'} size={18} className="text-muted-foreground" />
            </div>
          </button>

          {showServers && (
            <div className="bg-card border-4 border-primary border-t-0 w-full"
              style={{ boxShadow: '4px 4px 0 0 #05070d' }}
            >
              {SERVERS.map((s) => (
                <button
                  key={s.country}
                  onClick={() => { setSelectedServer(s); setShowServers(false); }}
                  className={`w-full flex items-center justify-between px-5 py-3 transition-colors border-b-2 border-muted last:border-0 ${selectedServer.country === s.country ? 'bg-muted' : 'hover:bg-muted/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.flag}</span>
                    <div className="text-left">
                      <p className="font-pixel text-[9px] text-foreground">{s.country}</p>
                      <p className="font-mono-pixel text-lg text-muted-foreground">{s.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-pixel text-xl text-secondary">{s.ping} ms</span>
                    {selectedServer.country === s.country && (
                      <Icon name="Check" size={14} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="font-pixel text-[8px] text-muted-foreground text-center">
          {status === 'disconnected' ? 'Нажмите кнопку для подключения' :
           status === 'connecting' ? `Подключение к ${selectedServer.country}...` :
           `Вы защищены · ${selectedServer.country}`}
        </p>
      </main>
    </div>
  );
};

export default AppDashboard;
