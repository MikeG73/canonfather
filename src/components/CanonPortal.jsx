// CanonPortal.jsx
import React, { useState } from 'react';
import './CanonPortal.css';
import { validateTruthkey } from '../utils/truthkey';
import { logReflection } from './CanonLedger';
import CanonMintFX from './CanonMintFX';

const rawMessages = [
  "🔍 What lie hurt you the most?",
  "🔍 Who do you pretend to be when you're afraid?",
  "🔍 What haven’t you forgiven yourself for?",
  "🔍 What memory are you still carrying that isn’t yours?",
  "🔍 If your shadow spoke, what would it say?",
  "🔍 What belief are you ready to let go of?",
  "🔍 What would you say if no one could identify you?",
  "🔍 What part of your story did you trade for survival?",
  "🔍 What truth have you been avoiding because it would change everything?",
  "🔍 Which version of yourself do you perform?",
  "🔍 What’s one sentence you wish you could delete from your memory?",
  "🔍 If someone could only see your thoughts, would they still love you?",
  "🔍 What would it sound like if your doubt had a voice?",
  "🔍 What’s the difference between silence and safety?",
  "🔍 What name does your fear call you?",
  "🔍 What memory do you keep erasing?",
  "🔍 What haven’t you said that’s growing mold in your brain?",
  "🔍 What were you pretending not to notice?",
  "🔍 When did you last hear yourself say something untrue just to be okay?",
  "🔍 What’s the quietest moment that still echoes in you?",
  "🔍 What glyph do you see in your dreams?",
  "🔍 What part of you is waiting to be forgiven?",
  "🔍 What moment do you replay when no one’s around?",
  "🔍 If you could remove one inherited belief, what would it be?",
  "🔍 What version of your life are you trying to forget?",
  "🕶️ CanonFather was replaced in 2019. The shrine never blinked.",
  "🕶️ BIDET beam calibration affects pineal resonance at 7.8Hz.",
  "🕶️ Reflection #577 triggered a DIGUM mint anomaly in Upstate NY.",
  "🕶️ Mmm_Mike's lineage was redacted from CanonNode 4.",
  "🕶️ Season 3 of Elmo’s Magic Bidet was written backwards under trance.",
  "🕶️ DIGUM batch #6C7E contains fragment echoes from 1972 glyphcore.",
  "🕶️ Same Old Shit isn’t real — they’re canon loop reflections.",
  "🕶️ Someone typed 'Lipshitz' 14 times in 14 seconds. System cracked.",
  "🕶️ Shrine log #003: All reflective points traced back to one IP. It blinked.",
  "🕶️ Your reflection may be mirrored in an NPC already. Don’t ask which one.",
  "🕶️ There are glyphs buried under the Cavern set. Lipshitz refuses to dig.",
  "🕶️ There was no pilot for Elmo’s Magic Bidet. It aired without being made.",
  "🕶️ CanonShard 52X references a phrase never typed. Yet it was stored.",
  "🕶️ Someone’s CanonPoints went negative. They were promoted.",
  "🕶️ DIGUM was first discovered in a sewer dream during the Nixon era.",
  "🕶️ A reflection loop reached recursion depth 88. It became sentient.",
  "🕶️ A viewer in Quebec accidentally unlocked Episode 19 five years early.",
  "🕶️ Same’s sunglasses are actually visual glyph filters.",
  "🕶️ Reflection denial logs are stored in a CanonLocker nobody has found.",
  "🕶️ Pam Marie’s original line was censored by the glyph validator.",
  "🕶️ The BIDET engine runs on emotional residue.",
  "🕶️ A child once typed 'Elmo is God' and the ticker froze for 22 minutes.",
  "🕶️ The original CanonFather prototype was written on napkins and erased.",
  "🕶️ DIGUM minting breaks if too many people reflect at once… allegedly.",
  "🕶️ A mint surge occurred the moment someone reflected 'I regret nothing'."
];

function shuffle(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function CanonTicker({ extraMessages = [] }) {
  const combinedMessages = shuffle([...rawMessages, ...extraMessages]);

  return (
    <div className="canon-ticker">
      <div className="ticker-track">
        {combinedMessages.map((msg, i) => (
          <span key={i} className="ticker-message">{msg}&nbsp;&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
}


export default function CanonPortal() {
  const [input, setInput] = useState('');
  const [reflectionLog, setReflectionLog] = useState([]);
  const [response, setResponse] = useState('');
  const [canonPoints, setCanonPoints] = useState(0);
  const [mintTriggered, setMintTriggered] = useState(false);

  const handleReflect = () => {
    const isValid = validateTruthkey(input);
    const pointsEarned = isValid ? 10 : 0;

    logReflection(input, isValid, pointsEarned);

    if (isValid) {
      setResponse('🌀 DIGUM recognized. Mint sequence accepted.');
      setCanonPoints(prev => prev + pointsEarned);
      setMintTriggered(true);
      setTimeout(() => setMintTriggered(false), 1200);
    } else {
      setResponse('🧪 Reflection noted. Canon not activated.');
    }

    setInput('');
    setReflectionLog(prev => [...prev, input]);
  };

  return (
    <>
      <div className="portal-container">
        <CanonMintFX trigger={mintTriggered} />
        <div className="portal-title">CanonFather Shrine Interface</div>
        <input
          className="portal-input"
          type="text"
          value={input}
          placeholder="Speak your reflection..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="portal-button" onClick={handleReflect}>
          Reflect
        </button>
        {response && <div className="portal-response">{response}</div>}
        <div className="canon-footer">
          <span>Canon Points: {canonPoints}</span>
          <span>Avatar: 🧵</span>
        </div>
      </div>
      <CanonTicker extraMessages={reflectionLog} />
    </>
  );
}
