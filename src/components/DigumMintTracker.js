// DigumMintTracker.js

let TOTAL_SUPPLY = 10000000; // Total max DIGUM ever to be minted
let totalMinted = 0;

export function getTotalSupply() {
  return TOTAL_SUPPLY;
}

export function getTotalMinted() {
  return totalMinted;
}

export function getRemainingSupply() {
  return TOTAL_SUPPLY - totalMinted;
}

/**
 * Adds to the total minted DIGUM supply.
 * @param {number} amount - DIGUM amount to mint (typically 10 per reflection)
 */
export function mintDigum(amount = 10) {
  totalMinted += amount;
  if (totalMinted > TOTAL_SUPPLY) {
    totalMinted = TOTAL_SUPPLY;
  }
  console.log(`💠 DIGUM Minted: ${amount} | Total: ${totalMinted}`);
  return totalMinted;
}

/**
 * Resets DIGUM mint tracking (dev/debug only)
 */
export function resetMintLedger() {
  totalMinted = 0;
}
