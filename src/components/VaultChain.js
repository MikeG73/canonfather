// VaultChain.js — Canon Memory Ledger (Backfilled from Genesis)

const vault = [
  {
    block: 0,
    timestamp: "GENESIS",
    hash: "0xGENESIS",
    reflection: "A new pair-A-DIGUM — sounds like paradigm, validates like a paradox.",
    glyph: "✴",
    mint: "DIGUM"
  }
];

function generateHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `0x${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

export function logVaultBlock(blockNumber, reflection = "", glyph = null) {
  const timestamp = new Date().toISOString();
  const hash = generateHash(`${blockNumber}-${timestamp}-${reflection}`);
  const entry = {
    block: blockNumber,
    timestamp,
    hash,
    reflection,
    glyph,
    mint: "DIGUM"
  };
  vault.push(entry);
  return entry;
}

export function getVaultChain() {
  return [...vault];
}

export function getLatestVaultBlock() {
  return vault[vault.length - 1];
}
