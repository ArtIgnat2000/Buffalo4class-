# Бизон Буффало 🦬 — интерактивный лэпбук для 4 класса

Одностраничный сайт-лэпбук о бизонах Северной Америки для учеников 4 класса:
знакомство с бизоном, размеры, места обитания, жизнь в стаде, суперспособности,
история спасения вида, вау-факты, игра «Накорми бизона» и викторина.

Сделан на React 19 + Vite + Tailwind CSS 4. Сборка — один самодостаточный
`dist/index.html` (все JS/CSS инлайнятся через `vite-plugin-singlefile`).

## Запуск локально

```bash
npm ci
npm run dev        # dev-сервер
```

## Сборка

```bash
npm run build      # → dist/index.html (один файл)
npm run preview    # предпросмотр собранной версии
npm run typecheck  # проверка типов TypeScript
```

## Структура

```
index.html          # вход Vite
src/main.tsx        # точка входа React
src/App.tsx         # секции лэпбука
src/components/     # Bison (SVG-иллюстрации), FeedGame (игра), Quiz (викторина)
src/index.css       # Tailwind + кастомные анимации и «комикс»-стили
src/lib/utils.ts    # cn() — clsx + tailwind-merge
legacy/             # старая версия — статичная 3-слайдовая презентация
```

## Деплой

GitHub Pages (build type: workflow). Workflow `.github/workflows/deploy.yml`
собирает проект и публикует `dist/` при каждом пуше в `main`
(или вручную через workflow_dispatch).
