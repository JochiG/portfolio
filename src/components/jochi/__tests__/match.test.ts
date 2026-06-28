import { describe, it, expect } from 'vitest';
import { normalize, matchAnswer } from '../match';
import { jochiKnowledge } from '@/data/jochi-knowledge';

describe('normalize', () => {
  it('lowercases and strips accents and punctuation', () => {
    expect(normalize('¿De dónde sale "Jochi"?')).toBe('de donde sale jochi');
  });
});

describe('matchAnswer', () => {
  it('matches a stack question (accent/punctuation insensitive)', () => {
    expect(matchAnswer('¿qué stack manejás?', jochiKnowledge)?.id).toBe('stack');
  });
  it('matches the nickname question', () => {
    expect(matchAnswer('de donde sale jochi', jochiKnowledge)?.id).toBe('apodo');
  });
  it('matches a contact question', () => {
    expect(matchAnswer('como te contacto?', jochiKnowledge)?.id).toBe('contacto');
  });
  it('returns null when nothing matches', () => {
    expect(matchAnswer('contame un chiste', jochiKnowledge)).toBeNull();
  });
});
