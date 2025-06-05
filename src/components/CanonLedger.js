// CanonLedger.js

const ledger = [];

/**
 * Adds a reflection entry to the ledger.
 * @param {string} phrase - The user's reflection input.
 * @param {boolean} isValid - Whether the reflection passed the truthkey check.
 * @param {number} canonPoints - Canon points awarded.
 */
export function logReflection(phrase, isValid, canonPoints) {
  const entry = {
    timestamp: new Date().toISOString(),
    phrase,
    isValid,
    canonPoints
  };

  ledger.push(entry);
  console.log('[🧾 LEDGER] New entry:', entry);
}

/**
 * Returns the full ledger history.
 * @returns {Array}
 */
export function getLedger() {
  return ledger;
}

/**
 * Clears the entire ledger.
 */
export function resetLedger() {
  ledger.length = 0;
}
