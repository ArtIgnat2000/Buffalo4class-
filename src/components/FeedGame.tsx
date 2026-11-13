import { useState } from 'react';
import { BisonFace } from './Bison';

type Food = {
  emoji: string;
  name: string;
  good: boolean;
  message: string;
};

const FOODS: Food[] = [
  { emoji: '🌿', name: 'Трава', good: true, message: 'Вкусно! Бизоны едят 25 кг травы в день!' },
  { emoji: '🍂', name: 'Листья', good: true, message: 'Ням-ням! И листья идут на десерт!' },
  { emoji: '🌾', name: 'Сено', good: true, message: 'Отличное угощение! Как попкорн для бизона!' },
  { emoji: '🍄', name: 'Грибы', good: true, message: 'Лесной деликатес!' },
  { emoji: '❄️', name: 'Снег', good: false, message: 'Брр! Это не еда! Так бизоны воду пьют зимой.' },
  { emoji: '🍕', name: 'Пицца', good: false, message: 'Эй! Бизоны не едят пиццу! Она для детей 😄' },
  { emoji: '🪨', name: 'Камень', good: false, message: 'Ай! Зубы сломаешь! Бизоны не козы!' },
  { emoji: '🍦', name: 'Мороженое', good: false, message: 'Холодно! И бизоны не любят сладкое.' },
];

export function FeedGame() {
  const [happiness, setHappiness] = useState(50);
  const [message, setMessage] = useState('Покорми бизона! Выбери, что ему дать 👀');
  const [mood, setMood] = useState<'happy' | 'surprised' | 'cool'>('happy');
  const [fedCount, setFedCount] = useState(0);
  const [lastFood, setLastFood] = useState<string | null>(null);
  const [effect, setEffect] = useState<'eat' | 'bad' | null>(null);

  const feed = (food: Food) => {
    setLastFood(food.emoji);
    if (food.good) {
      setHappiness((h) => Math.min(100, h + 12));
      setMood('happy');
      setEffect('eat');
      setMessage(food.message);
      setFedCount((c) => c + 1);
    } else {
      setHappiness((h) => Math.max(0, h - 15));
      setMood('surprised');
      setEffect('bad');
      setMessage(food.message);
    }
    setTimeout(() => setEffect(null), 600);
    setTimeout(() => setMood(happiness > 70 ? 'cool' : 'happy'), 1200);
  };

  const reset = () => {
    setHappiness(50);
    setMessage('Начнём заново! Покорми бизона чем-нибудь вкусным!');
    setMood('happy');
    setFedCount(0);
    setLastFood(null);
  };

  return (
    <div className="comic-border bg-prairie-50 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="text-center">
          <div className={`inline-block relative ${effect === 'eat' ? 'animate-bob' : ''} ${effect === 'bad' ? 'animate-shake' : ''}`}>
            <BisonFace size={180} mood={mood} />
            {lastFood && effect === 'eat' && (
              <div className="absolute top-0 right-0 text-5xl animate-bounce-in">
                {lastFood}
              </div>
            )}
            {effect === 'bad' && (
              <div className="absolute top-2 left-0 text-5xl animate-bounce-in">
                💢
              </div>
            )}
          </div>

          {/* Happiness meter */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-bison-dark">Сытость:</span>
              <span className="font-bold text-prairie-700">{happiness}%</span>
            </div>
            <div className="h-6 bg-prairie-200 rounded-full border-2 border-bison-dark overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${happiness}%`,
                  background: happiness > 70 ? 'linear-gradient(90deg, #78b83a, #4f8520)' : happiness > 30 ? 'linear-gradient(90deg, #e8a723, #c78716)' : 'linear-gradient(90deg, #c78716, #b91c1c)'
                }}
              />
            </div>
            <div className="text-sm mt-1 text-bison-brown font-semibold">
              {happiness > 80 ? '🥰 Бизон счастлив!' : happiness > 50 ? '😊 Неплохо!' : happiness > 25 ? '😐 Проголодался...' : '😫 Срочно накорми!'}
            </div>
          </div>
          <div className="mt-2 text-sm font-bold text-prairie-700">
            Правильных угощений: {fedCount}
          </div>
        </div>

        <div>
          <div className="comic-border-sm bg-white p-4 mb-4 min-h-[80px] flex items-center">
            <p className="text-lg font-bold text-bison-dark text-center w-full">{message}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {FOODS.map((food, i) => (
              <button
                key={i}
                onClick={() => feed(food)}
                className="comic-border-sm bg-yellow-100 hover:bg-yellow-200 p-3 text-3xl md:text-4xl transition-all hover:scale-110 btn-paw"
                title={food.name}
              >
                {food.emoji}
              </button>
            ))}
          </div>
          <button
            onClick={reset}
            className="btn-paw w-full bg-prairie-500 text-white font-extrabold px-6 py-2.5 rounded-xl hover:bg-prairie-400"
          >
            🔄 Начать сначала
          </button>
        </div>
      </div>
    </div>
  );
}
