import type { JochiQA } from '@/data/jochi-knowledge';

/** Lowercases and strips accents/punctuation so matching is forgiving. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Returns the best-matching knowledge entry for a query, or null if none of
 *  the entries' keywords appear in it. Best = most keyword hits. */
export function matchAnswer(query: string, kb: JochiQA[]): JochiQA | null {
  const q = normalize(query);
  if (!q) return null;

  let best: JochiQA | null = null;
  let bestScore = 0;

  for (const entry of kb) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(normalize(kw))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best : null;
}
