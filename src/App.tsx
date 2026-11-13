import { useState, useEffect } from 'react';
import { WalkingBison, BisonFace, PrairieDog, GrassTuft } from './components/Bison';
import { Quiz } from './components/Quiz';
import { FeedGame } from './components/FeedGame';

const NAV = [
  { id: 'home', label: '🏠 Главная', num: '' },
  { id: 'meet', label: '👋 Знакомство', num: '1' },
  { id: 'stats', label: '📏 Размеры', num: '2' },
  { id: 'home-range', label: '🏡 Где живут', num: '3' },
  { id: 'herd', label: '👨‍👩‍👧 Стадо', num: '4' },
  { id: 'powers', label: '💪 Суперсилы', num: '5' },
  { id: 'history', label: '📖 История', num: '6' },
  { id: 'facts', label: '🤯 Вау-факты', num: '7' },
  { id: 'game', label: '🎮 Игра', num: '8' },
  { id: 'quiz', label: '🧠 Викторина', num: '9' },
];

function Section({ children, id, className = '' }: { children: React.ReactNode; id: string; className?: string }) {
  return (
    <section id={id} className={`py-14 md:py-20 px-4 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeader({ num, title, emoji }: { num: string; title: string; emoji: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 flex-wrap">
      <div className="bg-bison-dark text-prairie-200 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-black text-2xl md:text-3xl comic-border-sm shadow-[3px_3px_0_#1f1208]">
        {num}
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-bison-dark text-shadow-fun flex items-center gap-3 flex-wrap">
        <span className="text-4xl md:text-6xl">{emoji}</span>
        {title}
      </h2>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(n.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-prairie-50 text-bison-dark">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-prairie-100 border-b-4 border-bison-dark shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <a href="#home" className="flex items-center gap-2 font-black text-bison-dark">
              <span className="text-2xl">🦬</span>
              <span className="hidden sm:inline text-lg">Бизон Буффало</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-bison-dark text-prairie-200 w-10 h-10 rounded-lg font-black text-xl"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
            <div className="hidden md:flex gap-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={`nav-link px-2 py-1 text-xs font-bold rounded-md ${
                    active === n.id ? 'bg-bison-dark text-prairie-200' : 'text-bison-dark hover:bg-prairie-200'
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden pb-3 grid grid-cols-2 gap-1 animate-slide-up">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-bold rounded-md ${
                    active === n.id ? 'bg-bison-dark text-prairie-200' : 'bg-prairie-200 text-bison-dark'
                  }`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden bg-prairie-sky">
        {/* Sun */}
        <div className="absolute top-8 right-10 md:right-20 animate-sun">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="25" fill="#ffd53e" stroke="#c78716" strokeWidth="3"/>
            {[...Array(12)].map((_, i) => {
              const a = (i * 30) * Math.PI / 180;
              const x1 = 50 + Math.cos(a) * 32;
              const y1 = 50 + Math.sin(a) * 32;
              const x2 = 50 + Math.cos(a) * 45;
              const y2 = 50 + Math.sin(a) * 45;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffd53e" strokeWidth="4" strokeLinecap="round"/>;
            })}
          </svg>
        </div>

        {/* Clouds */}
        <div className="absolute top-16 animate-cloud" style={{ animationDelay: '-10s' }}>
          <Cloud size={120}/>
        </div>
        <div className="absolute top-32 animate-cloud-slow" style={{ animationDelay: '-30s' }}>
          <Cloud size={90}/>
        </div>
        <div className="absolute top-8 animate-cloud-slow" style={{ animationDelay: '-45s' }}>
          <Cloud size={100}/>
        </div>

        {/* Mountains in distance */}
        <svg className="absolute bottom-[45%] w-full" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{height: '20%'}}>
          <path d="M0 200 L0 120 L150 40 L300 100 L450 20 L600 80 L800 30 L1000 90 L1200 50 L1200 200 Z" fill="#8b9eaa" stroke="#1f1208" strokeWidth="2"/>
          <path d="M0 200 L0 150 L200 80 L400 130 L550 70 L750 110 L950 60 L1200 100 L1200 200 Z" fill="#a8bcc7" stroke="#1f1208" strokeWidth="2"/>
        </svg>

        {/* Title card */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
          <div className="inline-block bg-white/90 comic-border px-6 py-4 md:px-10 md:py-6 animate-bounce-in">
            <div className="text-sm md:text-base font-bold text-prairie-700 mb-1">
              🦬 Интерактивный лэпбук для 4 класса
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-bison-dark leading-tight">
              БИЗОН <span className="text-prairie-600">БУФФАЛО</span>
            </h1>
            <div className="text-base md:text-lg font-bold text-bison-brown mt-2">
              Хозяин американских прерий 🇺🇸
            </div>
          </div>
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%]">
          {/* Grass */}
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-b from-grass to-grass-dark"/>
          {/* Grass tufts */}
          <GrassTuft className="bottom-0 left-[5%]" delay={0}/>
          <GrassTuft className="bottom-0 left-[15%]" delay={0.5}/>
          <GrassTuft className="bottom-0 left-[30%]" delay={1}/>
          <GrassTuft className="bottom-0 left-[45%]" delay={0.3}/>
          <GrassTuft className="bottom-0 left-[60%]" delay={0.8}/>
          <GrassTuft className="bottom-0 left-[75%]" delay={0.2}/>
          <GrassTuft className="bottom-0 left-[88%]" delay={0.6}/>

          {/* Prairie dogs */}
          <div className="absolute bottom-[5%] left-[20%]">
            <div className="w-16 h-8 bg-bison-dark rounded-t-full"/>
            <div className="absolute bottom-0 left-0"><PrairieDog/></div>
          </div>
          <div className="absolute bottom-[5%] left-[70%]">
            <div className="w-16 h-8 bg-bison-dark rounded-t-full"/>
            <div className="absolute bottom-0 left-0" style={{animationDelay: '2s'}}>
              <PrairieDog/>
            </div>
          </div>

          {/* Walking bison */}
          <div className="absolute bottom-[15%] left-0 animate-walk">
            <WalkingBison scale={1.1}/>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-bison-dark animate-bob z-20">
          <div className="bg-white/90 comic-border-sm px-4 py-2 font-bold text-sm">
            ↓ Листай вниз!
          </div>
        </div>
      </section>

      {/* MEET THE BISON */}
      <Section id="meet" className="bg-prairie-50 dotted-bg">
        <SectionHeader num="1" emoji="👋" title="Знакомьтесь — Бизон!"/>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="comic-border bg-white p-6 md:p-8 animate-slide-up">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0"><BisonFace size={90} mood="happy"/></div>
              <div>
                <h3 className="text-2xl font-black text-bison-dark mb-2">Кто я?</h3>
                <p className="text-lg font-medium">
                  Привет! Я — <b>бизон</b>, или как меня ещё зовут — <b>американский буффало</b>!
                  Я — самое крупное сухопутное животное Северной Америки.
                </p>
              </div>
            </div>
            <div className="bg-prairie-100 p-4 rounded-xl border-l-4 border-prairie-500">
              <p className="font-bold text-bison-dark">
                💡 <b>Секрет:</b> учёные до сих пор спорят, как меня правильно называть:
                "бизон" или "буффало"? Но я откликаюсь на оба! 😊
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="comic-border-sm bg-yellow-200 p-5 card-fun">
              <h4 className="font-black text-xl text-bison-dark mb-2">🦬 Бизон vs 🐃 Буйвол</h4>
              <p className="font-medium">
                Настоящие <b>буйволы</b> живут в Африке и Азии (помните <b>Капабилу</b> из мультика?).
                У них <b>нет горба</b> на спине, и рога у них гораздо больше.
                А бизоны — это мы, с горбом и косматой шерстью!
              </p>
            </div>
            <div className="comic-border-sm bg-green-200 p-5 card-fun">
              <h4 className="font-black text-xl text-bison-dark mb-2">⏱ Древние звери</h4>
              <p className="font-medium">
                Бизоны живут на Земле уже <b>2 миллиона лет</b>!
                Они застали ещё <b>мамонтов</b> и <b>саблезубых тигров</b>! 🦣
              </p>
            </div>
            <div className="comic-border-sm bg-orange-200 p-5 card-fun">
              <h4 className="font-black text-xl text-bison-dark mb-2">🎬 В кино!</h4>
              <p className="font-medium">
                В мультфильме <b>"Король Лев"</b> бизонов не было — там были
                африканские буйволы. Бизонов чаще показывают в фильмах про дикую природу США! 🎥
                
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🏆', title: 'Крупнейший', text: 'в Северной Америке' },
            { icon: '🦣', title: '2 млн лет', text: 'живут на Земле' },
            { icon: '🗽', title: 'Символ США', text: 'вместе с орлом' },
            { icon: '💨', title: 'Быстрее лошади', text: 'несмотря на вес' },
          ].map((item, i) => (
            <div key={i} className="comic-border-sm bg-white p-4 text-center card-fun">
              <div className="text-5xl mb-2">{item.icon}</div>
              <div className="font-black text-lg text-bison-dark">{item.title}</div>
              <div className="text-sm font-semibold text-bison-brown">{item.text}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <Section id="stats" className="bg-prairie-100">
        <SectionHeader num="2" emoji="📏" title="Супер-размеры!"/>
        <p className="text-lg md:text-xl font-bold mb-6 max-w-3xl">
          Давай сравним бизона с тобой! Наведи курсор или нажми на карточку, чтобы увидеть, насколько он огромный!
        </p>

        <SizeComparison />

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { n: '1 тонна', l: 'вес взрослого бизона', d: 'Как легковой автомобиль или 14 десятилетних школьников!', color: 'bg-red-200' },
            { n: '55 км/ч', l: 'скорость бега', d: 'Быстрее лошади! Догонит даже велосипедиста.', color: 'bg-blue-200' },
            { n: '2 метра', l: 'высота в холке', d: 'Почти как двухметровый баскетболист!', color: 'bg-green-200' },
          ].map((s, i) => (
            <div key={i} className={`comic-border ${s.color} p-5 card-fun`}>
              <div className="text-5xl md:text-6xl font-black text-bison-dark leading-tight">{s.n}</div>
              <div className="font-black text-lg text-bison-dark mt-1">{s.l}</div>
              <div className="text-sm font-semibold text-bison-brown mt-2">{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* HABITAT */}
      <Section id="home-range" className="bg-gradient-to-b from-prairie-50 to-prairie-100">
        <SectionHeader num="3" emoji="🏡" title="Где живут бизоны?"/>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="comic-border bg-white p-6 mb-6">
              <h3 className="text-2xl font-black mb-3">🌎 Адрес бизонов</h3>
              <p className="text-lg font-medium mb-3">
                Большинство бизонов живут в <b>Северной Америке</b>:
                в национальных парках США и Канады. Самый знаменитый парк —
                <b> Йеллоустон</b> 🏔️
              </p>
              <p className="text-lg font-medium">
                Они любят <b>прерии</b> — бескрайние травяные равнины,
                а также леса и холмы.
              </p>
            </div>
            <div className="comic-border-sm bg-sky-100 p-5">
              <h4 className="font-black text-xl mb-2">🗺️ А в России?</h4>
              <p className="font-medium">
                У нас в России живут их близкие родственники — <b>зубры</b>!
                Они очень похожи на бизонов, но чуть стройнее.
              </p>
            </div>
          </div>

          <div className="comic-border bg-gradient-to-br from-sky-200 via-grass/40 to-prairie-200 p-6">
            <svg viewBox="0 0 400 300" className="w-full">
              {/* Simplified North America map */}
              <path d="M80 50 Q60 80 65 140 Q50 200 80 240 Q120 280 180 270 Q240 260 260 220 Q280 180 260 140 Q240 100 200 70 Q150 40 80 50 Z"
                    fill="#d4a574" stroke="#1f1208" strokeWidth="3"/>
              {/* Canada */}
              <path d="M80 50 Q120 30 200 40 Q230 45 260 70 Q220 70 180 80 Q140 75 90 70 Z" fill="#e8d5b0" stroke="#1f1208" strokeWidth="2"/>
              {/* Mountains */}
              <path d="M100 120 L120 90 L140 110 L160 80 L180 115 L200 95 L220 120" stroke="#6b4423" strokeWidth="3" fill="none"/>
              {/* Yellowstone marker */}
              <g>
                <circle cx="150" cy="150" r="8" fill="#e8a723" stroke="#1f1208" strokeWidth="2"/>
                <circle cx="150" cy="150" r="3" fill="#1f1208"/>
                <text x="170" y="155" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#1f1208">Йеллоустон 🏔️</text>
              </g>
              {/* Bison icons scattered */}
              <g>
                <text x="190" y="180" fontSize="24">🦬</text>
                <text x="210" y="200" fontSize="20">🦬</text>
                <text x="170" y="200" fontSize="18">🦬</text>
              </g>
              {/* Compass */}
              <g transform="translate(330,50)">
                <circle r="22" fill="white" stroke="#1f1208" strokeWidth="2"/>
                <polygon points="0,-18 5,0 0,18 -5,0" fill="#c41e3a"/>
                <polygon points="0,-18 5,0 0,0 -5,0" fill="#1f1208"/>
                <text y="-26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1f1208">С</text>
              </g>
              <text x="80" y="100" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#1f1208">🇨🇦 Канада</text>
              <text x="110" y="250" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#1f1208">🇺🇸 США</text>
            </svg>
            <p className="text-center mt-3 font-bold text-bison-brown">
              Когда-то бизоны паслись от Канады до Мексики — на всей территории прерий!
            </p>
          </div>
        </div>
      </Section>

      {/* HERD LIFE */}
      <Section id="herd" className="bg-grass/20">
        <SectionHeader num="4" emoji="👨‍👩‍👧‍👦" title="Жизнь в стаде"/>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-4">
            <div className="comic-border bg-white p-6">
              <h3 className="text-2xl font-black mb-3">🐮 Матриархат</h3>
              <p className="text-lg font-medium">
                Бизоны живут <b>стадами</b>. Главная в стаде — самая опытная
                <b> самка</b> (матриарх). Она ведёт всех к воде и лучшей траве.
                Самцы обычно живут отдельно и приходят в стадо только осенью.
              </p>
            </div>

            <div className="comic-border bg-orange-100 p-6">
              <h3 className="text-2xl font-black mb-3">🐶 "Красные собачки"</h3>
              <p className="text-lg font-medium mb-3">
                Детёныши бизона рождаются <b>рыжими</b> и без горба. За это их
                нежно называют <b>"красными собачками"</b>!
              </p>
              <div className="bg-white/80 p-3 rounded-lg border-2 border-dashed border-orange-400">
                <p className="font-bold">
                  🎯 Факт: уже через <b>3 часа</b> после рождения малыш может
                  бегать! Представь? Человеку на это нужно целый год!
                </p>
              </div>
            </div>

            <div className="comic-border bg-sky-100 p-6">
              <h3 className="text-2xl font-black mb-3">🗣️ Бизоний язык</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-2xl mb-1">💨</div>
                  <div className="font-bold">Храп и фырчанье</div>
                  <div className="text-sm">Так зовут маму</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-2xl mb-1">🔊</div>
                  <div className="font-bold">Громкий рёв</div>
                  <div className="text-sm">Так самцы спорят</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-2xl mb-1">👂</div>
                  <div className="font-bold">Уши торчком</div>
                  <div className="text-sm">Опасность рядом!</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-2xl mb-1">🛁</div>
                  <div className="font-bold">Валяются в пыли</div>
                  <div className="text-sm">Так они купаются!</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="comic-border bg-yellow-200 p-5 card-fun text-center">
              <div className="text-6xl mb-2">👶</div>
              <div className="font-black text-xl">Вес при рождении</div>
              <div className="text-3xl font-black text-prairie-700 my-1">20-30 кг</div>
              <div className="text-sm font-semibold">Как большой мешок картошки!</div>
            </div>
            <div className="comic-border bg-pink-200 p-5 card-fun text-center">
              <div className="text-6xl mb-2">⏱️</div>
              <div className="font-black text-xl">Продолжительность жизни</div>
              <div className="text-3xl font-black text-pink-700 my-1">20-25 лет</div>
              <div className="text-sm font-semibold">В дикой природе</div>
            </div>
            <div className="comic-border bg-blue-200 p-5 card-fun text-center">
              <div className="text-6xl mb-2">👥</div>
              <div className="font-black text-xl">Размер стада</div>
              <div className="text-3xl font-black text-blue-700 my-1">20-1000+</div>
              <div className="text-sm font-semibold">Раньше были стада в миллионы!</div>
            </div>
          </div>
        </div>
      </Section>

      {/* SUPERPOWERS */}
      <Section id="powers" className="bg-prairie-50 notebook-bg">
        <SectionHeader num="5" emoji="💪" title="Суперспособности бизона"/>
        <p className="text-lg md:text-xl font-bold mb-6">
          Нажми на карточку, чтобы перевернуть и узнать секрет! 🃏
        </p>
        <FlipCards />
      </Section>

      {/* HISTORY */}
      <Section id="history" className="bg-gradient-to-b from-orange-100 to-prairie-100">
        <SectionHeader num="6" emoji="📖" title="История: от 60 миллионов до 541 и обратно"/>
        <p className="text-lg md:text-xl font-bold mb-8 max-w-3xl">
          Это самая настоящая история-комикс про спасение бизонов! 🦸
        </p>
        <div className="space-y-6">
          <ComicPanel
            num="1"
            bg="bg-green-100"
            title="🌾 1800 год: Миллионы на прерии"
            text="Представь: на огромных равнинах пасётся 30-60 МИЛЛИОНОВ бизонов! Стада были такие большие, что от одного конца не было видно другого. Когда они бежали — земля дрожала! 🌍"
            big="30-60 МЛН"
          />
          <div className="flex justify-center text-4xl">⬇️</div>
          <ComicPanel
            num="2"
            bg="bg-red-100"
            title="💔 XIX век: Почти исчезли"
            text="На бизонов стали охотиться ради шкур и спорта. В 1889 году осталось всего... 541 бизон на всём свете! Представь? Все бизоны мира могли уместиться в одном школьном зале! 😢"
            big="541 😢"
          />
          <div className="flex justify-center text-4xl">⬇️</div>
          <ComicPanel
            num="3"
            bg="bg-yellow-100"
            title="🦸 1905: Общество спасения"
            text="Но нашлись добрые люди! В 1905 году было создано Общество спасения бизонов. Люди стали охранять их в парках, например в Йеллоустоне."
            big="СПАСЕНИЕ!"
          />
          <div className="flex justify-center text-4xl">⬇️</div>
          <ComicPanel
            num="4"
            bg="bg-blue-100"
            title="🏆 Сейчас: 500 000 бизонов!"
            text="Сегодня в мире снова около полумиллиона бизонов! Они больше не в опасности. Это одна из самых больших историй спасения животных на планете! 🎉"
            big="500 000 🎉"
          />
        </div>

        <div className="mt-8 comic-border bg-white p-6 md:p-8">
          <h3 className="text-2xl font-black mb-3">🌟 Корень слова "buffalo"</h3>
          <p className="text-lg font-medium">
            А знаешь, с чем связано слово "буффало"? В Америке есть город <b>Баффало</b>,
            а в английском языке есть самое <b>длинное предложение</b> из одного слова!
            Попробуй выговорить:
          </p>
          <div className="bg-prairie-100 p-4 rounded-xl mt-3 text-center">
            <p className="text-xl md:text-2xl font-black text-bison-dark break-words">
              "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo."
            </p>
            <p className="text-sm mt-2 text-bison-brown font-semibold">
              Перевод: "Бизоны из Баффало, которых пугают другие бизоны из Баффало, пугают бизонов из Баффало" 😄
            </p>
          </div>
        </div>
      </Section>

      {/* WOW FACTS */}
      <Section id="facts" className="bg-yellow-50">
        <SectionHeader num="7" emoji="🤯" title="Вау-факты, которые тебя удивят"/>
        <div className="grid md:grid-cols-2 gap-5">
          <FactCard
            emoji="🧱"
            num="1"
            title="Снег? Не проблема!"
            text="Зимой бизоны сдвигают снег головой — на целый метр в сторону! — чтобы добраться до травы под ним. У них есть встроенный снегоочиститель на голове!"
          />
          <FactCard
            emoji="🏊"
            num="2"
            title="Пловцы-рекордсмены"
            text="Бизоны отлично плавают! Они могут переплывать широкие реки и даже озёра. И не боятся холодной воды! 💦"
          />
          <FactCard
            emoji="🛁"
            num="3"
            title="Ванна из пыли"
            text="Они обожают валяться в пыли! Это называется «валяние в лужах». Так они сбрасывают старую шерсть и избавляются от насекомых. Пыльная ванна лучше мыла! 🧼"
          />
          <FactCard
            emoji="🤰"
            num="4"
            title="Беременность — 9 месяцев!"
            text="Как у людей! Мама-бизон носит малыша 9 месяцев. И рожает обычно одного детёныша. 👩‍👦"
          />
          <FactCard
            emoji="🌡️"
            num="5"
            title="Зимняя шуба"
            text="Зимой у бизона отрастает супер-густая шерсть, в которой тепло даже в -40°C и снегопад! А весной они её сбрасывают, меняя на лёгкую летнюю. ❄️"
          />
          <FactCard
            emoji="🗣️"
            num="6"
            title="Громкий голос"
            text="Голос бизона — низкий, гулкий рёв, который слышно за 3 километра! Как гром вдалеке. 🔊"
          />
          <FactCard
            emoji="💰"
            num="7"
            title="Деньги из бизона"
            text="У коренных народов Северной Америки (индейцев) не зря было выражение «бизон — это и магазин, и дом, и одежда». Из шкур делали палатки (типи), из рогов — ложки, из костей — инструменты! 🪶"
          />
          <FactCard
            emoji="🔭"
            num="8"
            title="Острое зрение"
            text="У бизона отличное зрение — он видит движение за 2 километра! А слух как у собаки. 👀"
          />
        </div>
      </Section>

      {/* GAME */}
      <Section id="game" className="bg-gradient-to-b from-grass/30 to-prairie-100">
        <SectionHeader num="8" emoji="🎮" title="Игра: Накорми бизона!"/>
        <p className="text-lg md:text-xl font-bold mb-6 max-w-3xl">
          Бизон проголодался! Но не вся еда ему подойдёт. Давай разберёмся, чем можно угостить великана прерий 🦬
        </p>
        <FeedGame />
      </Section>

      {/* QUIZ */}
      <Section id="quiz" className="bg-prairie-100">
        <SectionHeader num="9" emoji="🧠" title="Викторина: проверь себя!"/>
        <p className="text-lg md:text-xl font-bold mb-6 max-w-3xl">
          Сколько звёздочек ты сможешь заработать? Играй один или с одноклассниками! ⭐
        </p>
        <Quiz />
      </Section>

      {/* FOOTER */}
      <footer className="bg-bison-dark text-prairie-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <BisonFace size={100} mood="cool"/>
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-4">Запомни три вещи:</h3>
          <div className="space-y-3 text-lg mb-8 max-w-2xl mx-auto">
            <div className="bg-prairie-800/60 p-4 rounded-xl border-l-4 border-prairie-400 text-left">
              <span className="text-2xl mr-2">🦬</span>
              <b>Бизон — живое ископаемое</b>, которое живёт на Земле уже 2 миллиона лет.
            </div>
            <div className="bg-prairie-800/60 p-4 rounded-xl border-l-4 border-prairie-400 text-left">
              <span className="text-2xl mr-2">❤️</span>
              <b>Люди спасли их</b> от вымирания: с 541 до 500 000!
            </div>
            <div className="bg-prairie-800/60 p-4 rounded-xl border-l-4 border-prairie-400 text-left">
              <span className="text-2xl mr-2">🌿</span>
              <b>Они едят только траву</b>, но быстрее лошади и сильнее многих зверей!
            </div>
          </div>
          <div className="stamp text-prairie-300 mb-4">ИЗУЧЕНО ✅</div>
          <p className="text-prairie-300 font-bold">
            Интерактивный лэпбук для 4 класса • 2026 🦬
          </p>
          <p className="text-prairie-400 text-sm mt-2">
            Создано с любовью к прериям и их могучим хозяевам
          </p>
        </div>
      </footer>
    </div>
  );
}

function Cloud({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
      <g fill="white" stroke="#1f1208" strokeWidth="2">
        <circle cx="25" cy="35" r="18"/>
        <circle cx="50" cy="28" r="22"/>
        <circle cx="75" cy="35" r="18"/>
        <rect x="20" y="35" width="60" height="20" rx="10"/>
      </g>
    </svg>
  );
}

function SizeComparison() {
  const [hover, setHover] = useState<string | null>(null);
  const items = [
    { id: 'weight', label: 'Вес', icon: '⚖️', bison: '1000 кг (1 тонна)', human: '40 кг (ты!)', ratio: '≈ как 25 четвероклассников', bisonColor: 'bg-bison-brown' },
    { id: 'height', label: 'Рост', icon: '📏', bison: '2 метра в холке', human: '1.4 метра', ratio: 'Бизон в полтора раза выше', bisonColor: 'bg-bison-brown' },
    { id: 'speed', label: 'Скорость', icon: '💨', bison: '55 км/ч', human: '15 км/ч (бег)', ratio: 'В 3.5 раза быстрее тебя', bisonColor: 'bg-bison-brown' },
    { id: 'lifespan', label: 'Жизнь', icon: '🎂', bison: '25 лет', human: '~80 лет', ratio: 'Человек живёт в 3 раза дольше', bisonColor: 'bg-bison-brown' },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHover(item.id)}
          onMouseLeave={() => setHover(null)}
          className={`comic-border cursor-pointer transition-all p-4 ${hover === item.id ? 'bg-prairie-300 scale-105' : 'bg-white'} card-fun`}
        >
          <div className="text-center text-4xl mb-2">{item.icon}</div>
          <div className="text-center font-black text-xl mb-3">{item.label}</div>
          <div className="space-y-2">
            <div className={`${item.bisonColor} text-white p-2 rounded-lg text-center font-bold text-sm`}>
              🦬 {item.bison}
            </div>
            <div className="bg-blue-400 text-white p-2 rounded-lg text-center font-bold text-sm">
              🧒 {item.human}
            </div>
          </div>
          {hover === item.id && (
            <div className="mt-3 bg-yellow-200 border-2 border-dashed border-yellow-600 p-2 rounded-lg text-center text-sm font-bold animate-pop">
              💡 {item.ratio}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlipCards() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const cards = [
    {
      icon: '🧱',
      title: 'Супер-голова!',
      back: 'Голова бизона весит 50-70 кг! Это как большой мешок с цементом. Такой головой он толкает снег и отбивается от врагов.'
    },
    {
      icon: '🦘',
      title: 'Ловкач!',
      back: 'Несмотря на тонну веса, бизон легко разворачивается на бегу и резко меняет направление. Обычно он не прыгает через заборы: он их просто обходит или ломает. 🤸'
    },
    {
      icon: '🧥',
      title: 'Двойная шуба',
      back: 'У бизона две шерсти: длинная и грубая сверху (как плащ от дождя), и мягкий тёплый подшёрсток снизу. Теплее любой куртки!'
    },
    {
      icon: '👃',
      title: 'Супер-нос',
      back: 'Нос бизона улавливает запахи за 3 километра! Он может учуять волка или водопой раньше, чем увидит или услышит.'
    },
    {
      icon: '💨',
      title: 'Реактивный бег',
      back: 'Разгон до 55 км/ч за несколько секунд. И это при весе в тонну! А ещё они могут резко менять направление на бегу.'
    },
    {
      icon: '🛡️',
      title: 'Броня на шее',
      back: 'На шее и груди у бизона такая толстая кожа (до 5 см!), что даже волки не могут её прокусить. Природная броня!'
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((c, i) => (
        <div
          key={i}
          onClick={() => setFlipped({ ...flipped, [i]: !flipped[i] })}
          className={`flip-card card-fun cursor-pointer ${flipped[i] ? 'flipped' : ''}`}
          style={{ height: '240px' }}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front comic-border bg-gradient-to-br from-prairie-200 to-prairie-300 p-6 flex flex-col items-center justify-center text-center">
              <div className="text-7xl mb-3">{c.icon}</div>
              <div className="text-2xl font-black text-bison-dark">{c.title}</div>
              <div className="mt-4 text-sm font-bold text-bison-brown">🔄 Нажми!</div>
            </div>
            <div className="flip-card-back comic-border bg-gradient-to-br from-grass to-grass-dark text-white p-5 flex items-center justify-center">
              <p className="text-base md:text-lg font-bold leading-snug text-center">{c.back}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComicPanel({ num, bg, title, text, big }: { num: string; bg: string; title: string; text: string; big: string }) {
  return (
    <div className={`comic-border ${bg} p-6 md:p-8 relative animate-slide-up`}>
      <div className="absolute -top-4 -left-4 w-14 h-14 bg-bison-dark text-prairie-200 rounded-full flex items-center justify-center font-black text-2xl comic-border-sm shadow-[3px_3px_0_#1f1208]">
        {num}
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h3 className="text-2xl md:text-3xl font-black text-bison-dark mb-3">{title}</h3>
          <p className="text-lg font-medium text-bison-dark">{text}</p>
        </div>
        <div className="text-center">
          <div className="inline-block bg-white comic-border-sm px-4 py-3">
            <div className="text-4xl md:text-5xl font-black text-bison-dark leading-tight break-words">{big}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FactCard({ emoji, num, title, text }: { emoji: string; num: string; title: string; text: string }) {
  return (
    <div className="comic-border bg-white p-5 card-fun relative">
      <div className="flex items-start gap-4">
        <div className="text-5xl shrink-0">{emoji}</div>
        <div>
          <div className="inline-block bg-prairie-500 text-white font-black text-xs px-2 py-1 rounded mb-2">ФАКТ {num}</div>
          <h4 className="text-xl font-black text-bison-dark mb-2">{title}</h4>
          <p className="font-medium text-bison-brown text-base leading-snug">{text}</p>
        </div>
      </div>
    </div>
  );
}
