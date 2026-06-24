import { describe, it, expect } from 'vitest';
import { pickMessage } from '../useJochiMessages';
import { jochiMessages } from '@/data/jochi-messages';

describe('pickMessage', () => {
  it('returns the message for the active anchor', () => {
    expect(pickMessage('about', jochiMessages)?.anchor).toBe('about');
  });
  it('returns null for an unknown anchor', () => {
    expect(pickMessage('nope', jochiMessages)).toBeNull();
  });
});
