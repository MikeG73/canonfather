const [easterEggMode, setEasterEggMode] = useState(false);
const handleReflect = () => {
  if (input.trim().toLowerCase() === "yabba daba doooonot") {
    setResponse("🦴 Fred has been summoned.");
    new Audio('/flintstone_alert.mp3').play().catch(() => {});
    setEasterEggMode(true);
    setInput('');
    return;
  }

  if (buttonPhase === 1) return;

  if (buttonPhase === 2) {
    new Audio('/buzzer.mp3').play();
    setResponse('💢⛓️ BUSTED_LOGIC ⛓️💢\n🧠 B.I.D.E.T. CanonEngine[Y3K] 🔒🪠');
    setButtonShake(true);
    setTimeout(() => setButtonShake(false), 500);
    return;
  }

  if (buttonPhase === 3) {
    new Audio('/canonPulse.mp3').play();
  }

  const isValid = validateTruthkey(input);
  const pointsEarned = isValid ? 10 : 0;

  logReflection(input, isValid, pointsEarned);

  if (isValid) {
    const blockNumber = parseInt(localStorage.getItem('canon_block_number'), 10);
    logVaultBlock(blockNumber, input.trim(), '🜂');

    setResponse('🌀 DIGUM recognized. Mint sequence accepted.');
    setCanonPoints(prev => prev + pointsEarned);
    setMintTriggered(true);
    setTimeout(() => setMintTriggered(false), 1200);
  } else {
    setResponse('🧪 Noted AND not Canonblock worthy: ACTIVATION DENIED.');
  }

  setInput('');
  setButtonPhase(2);
};
