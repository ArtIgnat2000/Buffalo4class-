import { useState } from 'react';

const QUESTIONS = [
  {
    q: 'Кто самый тяжёлый зверь Северной Америки?',
    options: ['🦌 Лось', '🦬 Бизон', '🐻 Гризли', '🐺 Волк'],
    correct: 1,
    fact: 'Бизон весит до 1 тонны — как маленький легковой автомобиль!'
  },
  {
    q: 'Как называют детёныша бизона?',
    options: ['🐶 Бычок', '🐮 Телёнок', '🐕 "Красная собачка"', '🍪 Пирожок'],
    correct: 2,
    fact: 'Малышей зовут "красными собачками" — за их рыжую шёрстку!'
  },
  {
    q: 'С какой скоростью может бежать бизон?',
    options: ['🐢 Как черепаха — 5 км/ч', '🚶 Как человек — 15 км/ч', '🏎️ Как лошадь — 55 км/ч', '🚀 Как машина — 120 км/ч'],
    correct: 2,
    fact: '55 км/ч! Быстрее, чем бежит самый быстрый ученик в классе!'
  },
  {
    q: 'Сколько зубов у бизона?',
    options: ['🦷 12', '🦷 32 (как у тебя!)', '🦷 48', '🦷 0 — они едят траву'],
    correct: 1,
    fact: '32 зуба — столько же, сколько у человека. Только они плоские, для жевания травы.'
  },
  {
    q: 'Что случилось с бизонами в XIX веке?',
    options: [
      'Они улетели на юг 🐦',
      'Их почти всех истребили — осталось всего 541',
      'Они жили в океане 🐋',
      'Ничего не случилось — их было миллионы'
    ],
    correct: 1,
    fact: 'Когда-то было 30-60 миллионов! А в 1889 году осталось всего 541 бизон. Но их спасли!'
  },
  {
    q: 'Чем отличается бизон от буйвола?',
    options: [
      'Бизон больше 🦣',
      'У буйвола нет горба',
      'Это одно и то же 🤷',
      'Бизоны живут в Африке'
    ],
    correct: 1,
    fact: 'Настоящие буйволы живут в Африке и Азии (как в "Короле Льве"!), и у них нет горба на спине.'
  },
];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [finished, setFinished] = useState(false);

  if (finished) {
    const percent = Math.round((score / QUESTIONS.length) * 100);
    let message = '';
    let emoji = '';
    if (percent === 100) { message = 'Ты — эксперт по бизонам!'; emoji = '🏆'; }
    else if (percent >= 80) { message = 'Отличный результат! Бизоны тобой гордятся!'; emoji = '⭐'; }
    else if (percent >= 50) { message = 'Неплохо! Но бизоны ждут, что ты их получше узнаешь!'; emoji = '🙂'; }
    else { message = 'Ничего! Пройди ещё раз — бизоны верят в тебя!'; emoji = '🦬'; }

    return (
      <div className="comic-border bg-white p-8 text-center animate-pop">
        <div className="text-7xl mb-4">{emoji}</div>
        <h3 className="text-3xl font-extrabold text-bison-dark mb-3">Результат</h3>
        <div className="text-5xl font-black text-prairie-600 mb-3">{score} / {QUESTIONS.length} ⭐</div>
        <p className="text-xl text-bison-brown font-bold mb-6">{message}</p>
        <button
          onClick={() => { setStep(0); setScore(0); setSelected(null); setShowFact(false); setFinished(false); }}
          className="btn-paw bg-prairie-500 text-white font-extrabold px-8 py-3 rounded-2xl text-lg hover:bg-prairie-400"
        >
          🦬 Пройти ещё раз
        </button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.correct) setScore(score + 1);
    setTimeout(() => setShowFact(true), 600);
  };

  const handleNext = () => {
    if (step + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
      setSelected(null);
      setShowFact(false);
    }
  };

  return (
    <div className="comic-border bg-white p-6 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-bison-dark text-prairie-200 font-bold px-3 py-1 rounded-full text-sm">
            Вопрос {step + 1} / {QUESTIONS.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-2xl">
          {Array.from({ length: score }).map((_, i) => <span key={i}>⭐</span>)}
        </div>
      </div>

      <div className="w-full bg-prairie-100 rounded-full h-3 mb-6 border-2 border-bison-dark">
        <div
          className="bg-gradient-to-r from-prairie-400 to-prairie-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-extrabold text-bison-dark mb-6 leading-tight">
        {current.q}
      </h3>

      <div className="grid gap-3 mb-5">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correct;
          const isSelected = selected === i;
          let cls = 'comic-border-sm bg-prairie-50 text-bison-dark hover:bg-prairie-100';
          if (selected !== null) {
            if (isCorrect) cls = 'comic-border-sm bg-green-200 text-green-900 border-green-800 shadow-[4px_4px_0_#166534]';
            else if (isSelected) cls = 'comic-border-sm bg-red-200 text-red-900 border-red-800 shadow-[4px_4px_0_#991b1b]';
            else cls = 'comic-border-sm bg-gray-100 text-gray-500 opacity-70';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`text-left p-4 font-bold text-lg transition-all ${cls} ${isSelected && !isCorrect ? 'animate-shake' : ''}`}
            >
              <span className="mr-2 text-2xl">{selected === null ? '▫️' : isCorrect ? '✅' : isSelected ? '❌' : '◾'}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {showFact && (
        <div className="animate-pop bg-prairie-100 border-l-8 border-prairie-500 p-4 rounded-r-xl mb-4">
          <div className="font-extrabold text-prairie-700 mb-1">💡 А вот и факт!</div>
          <div className="text-bison-dark font-medium">{current.fact}</div>
        </div>
      )}

      {showFact && (
        <button
          onClick={handleNext}
          className="btn-paw w-full bg-bison-brown text-white font-extrabold px-8 py-3 rounded-2xl text-lg hover:bg-bison-dark"
        >
          {step + 1 >= QUESTIONS.length ? '🏁 Узнать результат' : 'Дальше →'}
        </button>
      )}
    </div>
  );
}
