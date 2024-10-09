import type { PanelPosition } from '@/types/settings';

export function setBody(c: string) {
  document.body.className = ` ${c}`;
}

export function getPositionClass(p: PanelPosition) {
  return p === 'bl' // bottom left
    ? ' b l'
    : p === 'bc' // bottom center
      ? ' b c'
      : p === 'cc' // center center
        ? ' cc'
        : p === 'tl' // top left
          ? ' t l'
          : p === 'tr' // top right
            ? ' t r'
            : p === 'tc' // top center
              ? ' t c'
              : ' b r'; // fallback: bottom right
}
