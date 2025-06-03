// src/utils/truthkey.js

export function validateTruthkey(phrase) {
  const keyPhrases = [
    'digum',
    'pair-a-digum',
    'canon',
    'truth',
    'reflection',
    '🧵',
    '💡',
    '🪞'
  ];

  const lower = phrase.toLowerCase();
  return keyPhrases.some(key => lower.includes(key));
}