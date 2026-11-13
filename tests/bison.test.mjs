import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server;
let WalkingBison;

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
  ({ WalkingBison } = await server.ssrLoadModule('/src/components/Bison.tsx'));
});

after(async () => {
  await server?.close();
});

test('walking bison has four distinct legs arranged in diagonal gait pairs', () => {
  const html = renderToStaticMarkup(createElement(WalkingBison));
  const legs = [...html.matchAll(/<g data-bison-leg="([^"]+)" class="([^"]+)"/g)]
    .map(([, name, className]) => ({ name, className }));

  assert.deepEqual(legs.map(({ name }) => name), ['far-hind', 'far-fore', 'near-hind', 'near-fore']);
  assert.equal(new Set(legs.map(({ name }) => name)).size, 4);

  // Far-side legs must be painted before the body, near-side legs after it.
  assert.ok(html.indexOf('data-bison-leg="far-hind"') < html.indexOf('data-bison-leg="near-hind"'));
  assert.ok(html.indexOf('data-bison-leg="far-fore"') < html.indexOf('data-bison-leg="near-fore"'));

  // Diagonal pairs share an animation phase; the two pairs move in opposition.
  const byName = Object.fromEntries(legs.map(({ name, className }) => [name, className]));
  assert.equal(byName['far-hind'], byName['near-fore']);
  assert.equal(byName['far-fore'], byName['near-hind']);
  assert.notEqual(byName['far-hind'], byName['far-fore']);

  // Every leg needs a visible limb and hoof, not just an empty animation group.
  for (const segment of html.split('<g data-bison-leg=').slice(1)) {
    const contents = segment.slice(0, segment.indexOf('</g>'));
    assert.ok(contents.includes('<rect'), 'leg must contain a limb');
    assert.ok(contents.includes('<ellipse'), 'leg must contain a hoof');
  }
});
