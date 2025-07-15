const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5002;

// Morse code map
const morseMap = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
  5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  ' ': '/' // Use slash for space in morse
};

const reverseMorseMap = Object.fromEntries(
  Object.entries(morseMap).map(([letter, code]) => [code, letter])
);

// Convert text to morse
function textToMorse(text) {
  return text.toUpperCase()
    .split('')
    .map(char => morseMap[char] || '?')
    .join(' ');
}

// Convert morse to text
function morseToText(morse) {
  return morse
    .trim()
    .split(/\s+/) // support multiple spaces
    .map(code => reverseMorseMap[code] || '?')
    .join('');
}

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint
app.post('/convert', (req, res) => {
  const { text, morse } = req.body;

  console.log('[morse-service] Incoming request:', req.body);

  if (text && typeof text === 'string') {
    const morseResult = textToMorse(text);
    console.log('[morse-service] Text ➡ Morse:', morseResult);
    return res.json({ morse: morseResult });
  }

  if (morse && typeof morse === 'string') {
    const textResult = morseToText(morse);
    console.log('[morse-service] Morse ➡ Text:', textResult);
    return res.json({ text: textResult });
  }

  res.status(400).json({ error: 'Provide either text or morse field in request.' });
});

// Start the server
app.listen(PORT, () => console.log(`Morse service running on port ${PORT}`));
