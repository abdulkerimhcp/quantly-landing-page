
import React, { useState, useEffect, useRef } from 'react';
import { Scan, BarChart3, ChevronRight, Download, CheckCircle2, ArrowRight, CreditCard, Wallet, CalendarClock, RefreshCw, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

// --- Yardımcı Komponentler ---

const FloatingFeature = ({ icon: Icon, text, positionClass, delay }: { icon: any, text: string, positionClass: string, delay?: string }) => (
  <div
    className={`absolute hidden lg:flex items-center gap-3 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 py-3 px-5 rounded-2xl shadow-2xl hover:border-emerald-500/50 hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300 z-20 ${positionClass}`}
    style={{ animation: `float 6s ease-in-out infinite`, animationDelay: delay || '0s' }}
  >
    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-emerald-500" />
    </div>
    <span className="font-semibold text-white text-sm whitespace-nowrap tracking-wide">{text}</span>
  </div>
);

const PhoneMockup = () => (
  <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-neutral-800 shadow-2xl shadow-emerald-900/40 overflow-hidden z-10 mx-auto">
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-20"></div>

    {/* Screen Content */}
    <div className="w-full h-full bg-neutral-950 flex flex-col pt-12 px-4 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-neutral-500 text-xs">Toplam Bakiye</div>
          <div className="text-white text-2xl font-bold">₺14,250.00</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800">
          <Wallet className="w-5 h-5 text-emerald-500" />
        </div>
      </div>

      {/* Chart Simulation */}
      <div className="h-32 w-full mb-6 flex items-end justify-between px-2 gap-2">
        {[40, 65, 30, 85, 50, 90, 60].map((h, i) => (
          <div key={i} className="w-full bg-emerald-500 rounded-t-sm opacity-80" style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.4 }}></div>
        ))}
      </div>

      {/* Transaction List Interface */}
      <div className="flex-1 space-y-4 overflow-hidden px-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-white">Son İşlemler</span>
          <span className="text-xs text-emerald-500 cursor-pointer">Tümü</span>
        </div>

        {/* Transactions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg">🎬</div>
              <div>
                <div className="text-sm font-medium text-white">Netflix</div>
                <div className="text-[10px] text-neutral-500">Eğlence & Abonelik</div>
              </div>
            </div>
            <div className="text-sm font-bold text-white">-₺149.99</div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg">☕</div>
              <div>
                <div className="text-sm font-medium text-white">Starbucks</div>
                <div className="text-[10px] text-neutral-500">Yeme & İçme</div>
              </div>
            </div>
            <div className="text-sm font-bold text-white">-₺84.50</div>
          </div>
        </div>

        {/* New Receipt Notification */}
        <div className="mt-4 bg-neutral-900 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-3 relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500"></div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Scan className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-[10px] text-emerald-500 uppercase font-bold">Yeni Fiş Tarandı</div>
            <div className="text-xs font-bold text-white">Migros - ₺342.90</div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-neutral-950/90 backdrop-blur border-t border-neutral-800 flex justify-around items-center px-2">
        <div className="text-emerald-500"><CreditCard size={20} /></div>
        <div className="text-neutral-600 hover:text-white transition-colors"><BarChart3 size={20} /></div>
        <div className="w-12 h-12 -mt-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 text-black font-bold text-xl border-4 border-neutral-950">+</div>
        <div className="text-neutral-600 hover:text-white transition-colors"><Scan size={20} /></div>
        <div className="text-neutral-600 hover:text-white transition-colors"><div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700"></div></div>
      </div>
    </div>
  </div>
);

// --- Ana Komponentler ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-black font-bold">Q</div>
          <span className="text-xl font-bold tracking-tight text-white">Quantly</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#ozellikler" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#nasil-calisir" className="hover:text-white transition-colors">Nasıl Çalışır</a>
          <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full transition-all backdrop-blur-sm border border-white/10">
            Giriş Yap
          </button>
          <button className="gradient-btn text-white px-5 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 font-semibold">
            İndir
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] -z-10 opacity-60"></div>

      {/* Hero Text Content (Centered) */}
      <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up z-20 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Yeni Nesil Finans
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
          Harcamalarınızı Yönetmenin <br />
          <span className="text-emerald-500">En Akıllı Yolu: Quantly</span>
        </h1>

        <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Fişlerinizi tarayın, harcamalarınızı otomatik kategorize edin. Finansal özgürlüğünüzü karmaşık tablolarla uğraşmadan geri kazanın.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-all hover:scale-105 shadow-lg shadow-white/5 group">
            <span className="text-2xl"></span>
            <div className="text-left leading-tight">
              <div className="text-[10px] font-medium uppercase text-neutral-500">Download on the</div>
              <div className="text-sm">App Store</div>
            </div>
          </button>
          <button className="flex items-center justify-center gap-3 bg-neutral-900 text-white border border-neutral-800 px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all hover:scale-105 group">
            <span className="text-2xl">▶</span>
            <div className="text-left leading-tight">
              <div className="text-[10px] font-medium uppercase text-neutral-400">Get it on</div>
              <div className="text-sm">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      {/* Center Phone Mockup with Orbiting Features */}
      <div className="relative w-full max-w-[1200px] flex justify-center items-center mt-8">
        {/* Decorative Orbit Rings */}
        <div className="absolute w-[600px] h-[600px] border border-neutral-800/60 rounded-full animate-[spin_60s_linear_infinite] hidden lg:block"></div>
        <div className="absolute w-[800px] h-[800px] border border-neutral-800/40 rounded-full animate-[spin_40s_linear_infinite] hidden lg:block"></div>

        {/* The Phone */}
        <PhoneMockup />

        {/* Orbiting Feature Cards (Only on Desktop) */}
        {/* Left Side */}
        <FloatingFeature
          icon={Scan}
          text="Belge Tarama"
          positionClass="top-10 left-[10%] lg:left-[15%] xl:left-[22%]"
          delay="0s"
        />
        <FloatingFeature
          icon={CalendarClock}
          text="Planlı Harcamalar"
          positionClass="top-[45%] left-[2%] lg:left-[8%] xl:left-[15%]"
          delay="1.5s"
        />
        <FloatingFeature
          icon={RefreshCw}
          text="Abonelikler"
          positionClass="bottom-20 left-[10%] lg:left-[15%] xl:left-[22%]"
          delay="3s"
        />

        {/* Right Side */}
        <FloatingFeature
          icon={CreditCard}
          text="Taksit Takibi"
          positionClass="top-10 right-[10%] lg:right-[15%] xl:right-[22%]"
          delay="0.5s"
        />
        <FloatingFeature
          icon={Wallet}
          text="Bütçe Takibi"
          positionClass="top-[45%] right-[2%] lg:right-[8%] xl:right-[15%]"
          delay="2s"
        />
        <FloatingFeature
          icon={BarChart3}
          text="Anlamlı Grafikler"
          positionClass="bottom-20 right-[10%] lg:right-[15%] xl:right-[22%]"
          delay="4s"
        />
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [showTranscript, setShowTranscript] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isScrubbing, setIsScrubbing] = useState(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      if (dur > 0) {
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val); // Update slider immediately
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur > 0) {
        const newTime = (val / 100) * dur;
        videoRef.current.currentTime = newTime;
        setCurrentTime(formatTime(newTime));
      }
    }
  };

  const handleScrubStart = () => setIsScrubbing(true);
  const handleScrubEnd = () => setIsScrubbing(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) setVolume(0);
      else setVolume(1);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quantly'yi <span className="text-emerald-500">Aksiyon Halinde Görün</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Akıllı fiş tarama, anlık analizler ve yapay zeka öngörüleriyle finansal yönetim deneyimini yeniden tanımlıyoruz.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_60px_rgba(16,185,129,0.1)] group bg-black aspect-video mb-8">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-close-up-1744-large.mp4" type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>

          {/* Center Play Button Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={togglePlay}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/90 flex items-center justify-center backdrop-blur-sm shadow-xl cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-black fill-current ml-1" />
            </div>
          </div>

          {/* Custom Controls Bar */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            {/* Progress Bar Container */}
            <div className="group/progress relative w-full h-4 mb-2 cursor-pointer flex items-center">
              {/* Track Background */}
              <div className="absolute left-0 right-0 h-1 bg-neutral-600/50 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Buffered/Filled Track */}
                <div
                  className="h-full bg-emerald-500 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Thumb (visible on hover or drag) */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>

              {/* Input Range (Hidden but interactive) */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                onMouseDown={handleScrubStart}
                onMouseUp={handleScrubEnd}
                onTouchStart={handleScrubStart}
                onTouchEnd={handleScrubEnd}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-emerald-500 transition-colors">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>

                <div className="flex items-center gap-2 group/volume">
                  <button onClick={toggleMute} className="hover:text-emerald-500 transition-colors">
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 h-1 accent-emerald-500 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="text-xs font-medium text-neutral-400 font-mono">
                  {currentTime} / {duration}
                </div>
              </div>

              <button onClick={handleFullscreen} className="hover:text-emerald-500 transition-colors">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-emerald-500/30 rounded-br-2xl pointer-events-none"></div>
        </div>

        {/* Transcript Toggle */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="group flex items-center gap-2 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors px-4 py-2 rounded-full hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20"
          >
            <span>{showTranscript ? 'Transkripti Gizle' : 'Video Transkriptini Oku'}</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showTranscript ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>

          {showTranscript && (
            <div className="w-full mt-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 text-left animate-[fadeIn_0.5s_ease-out]">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Video Akışı
              </h4>
              <div className="space-y-4 text-neutral-400 text-sm leading-relaxed border-l-2 border-neutral-800 pl-4 md:pl-6 ml-1">
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-neutral-800 border-2 border-black"></span>
                  <p><span className="text-emerald-500 font-mono font-bold mr-2">0:00</span> Kullanıcı Quantly uygulamasını açar, güvenli giriş yapar.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-neutral-800 border-2 border-black"></span>
                  <p><span className="text-emerald-500 font-mono font-bold mr-2">0:05</span> Ana ekran görüntülenir: Toplam varlıklar ve son harcamalar özetlenir.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                  <p className="text-white"><span className="text-emerald-500 font-mono font-bold mr-2">0:12</span> 'Belge Tara' butonuna tıklanır. Kamera açılır ve bir restoran fişi taranır.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-neutral-800 border-2 border-black"></span>
                  <p><span className="text-emerald-500 font-mono font-bold mr-2">0:18</span> Yapay zeka fişi işler: Tarih, toplam tutar ve kategori (Yeme & İçme) otomatik belirlenir.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-neutral-800 border-2 border-black"></span>
                  <p><span className="text-emerald-500 font-mono font-bold mr-2">0:25</span> Anlık bildirim: "Bu ay restoran harcamalarınız bütçenizin %70'ine ulaştı."</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[33px] md:-left-[41px] top-1 w-3 h-3 rounded-full bg-neutral-800 border-2 border-black"></span>
                  <p><span className="text-emerald-500 font-mono font-bold mr-2">0:32</span> Analiz ekranında aylık harcama dağılımı grafiklerle incelenir.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="glass-card p-8 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-2 bg-neutral-900/50 border-neutral-800 h-full">
    <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
      <Icon className="w-7 h-7 text-emerald-500" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-neutral-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="ozellikler" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Neden <span className="text-emerald-500">Quantly?</span></h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Finansal alışkanlıklarınızı değiştirecek özelliklerle tanışın.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Scan}
            title="Belge & Fiş Tarama"
            description="Fiş ve faturalarınızı saniyeler içinde tarayıp dijitalleştirin. Kaybolan fiş derdine son."
          />
          <FeatureCard
            icon={CalendarClock}
            title="Planlı Harcamalar"
            description="Gelecek ödemelerinizi ve faturalarınızı önceden planlayın, son ödeme tarihlerini kaçırmayın."
          />
          <FeatureCard
            icon={RefreshCw}
            title="Abonelik Yönetimi"
            description="Netflix, Spotify gibi düzenli ödemelerinizi tek bir yerden takip edin ve gereksizleri iptal edin."
          />
          <FeatureCard
            icon={CreditCard}
            title="Taksit Takibi"
            description="Kredi kartı taksitlerinizi ve kalan borçlarınızı kolayca izleyin, bütçenizi ona göre ayarlayın."
          />
          <FeatureCard
            icon={Wallet}
            title="Bütçe Takibi"
            description="Harcama limitleri belirleyin, kategori bazlı bütçeler oluşturun ve hedeflerinize ulaşın."
          />
          <FeatureCard
            icon={BarChart3}
            title="Anlamlı Grafikler"
            description="Paranızın nereye gittiğini detaylı ve anlaşılır grafiklerle analiz ederek tasarruf fırsatlarını görün."
          />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "İndir ve Üye Ol", desc: "Uygulamayı mağazadan ücretsiz indir ve saniyeler içinde hesabını oluştur." },
    { title: "Harcamanı Ekle", desc: "İster manuel ekle, ister fişinin fotoğrafını çek. Yapay zeka gerisini halletsin." },
    { title: "Kontrolü Ele Al", desc: "Bütçeni aşma, tasarruf hedeflerine ulaş ve finansal özgürlüğün tadını çıkar." }
  ];

  return (
    <section id="nasil-calisir" className="py-32 px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Nasıl Çalışır?</h2>
          <p className="text-neutral-400">3 basit adımda finansal hayatınızı düzene sokun.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent -z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-black border-4 border-neutral-800 flex items-center justify-center text-3xl font-bold text-neutral-500 mb-8 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all shadow-xl">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="gradient-btn px-10 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/20 transition-all hover:-translate-y-1 inline-flex items-center gap-2">
            Hemen Başla <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-black border-t border-neutral-900 text-sm text-neutral-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-black text-xs font-bold">Q</div>
          <span className="text-neutral-200 font-semibold">Quantly</span>
        </div>

        <div className="flex gap-8">
          <a href="#" className="hover:text-emerald-500 transition-colors">Gizlilik Politikası</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Kullanım Şartları</a>
          <a href="mailto:support@quantlyapp.com" className="hover:text-emerald-500 transition-colors">İletişim</a>
        </div>

        <div>
          © 2026 Quantly. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default App;
