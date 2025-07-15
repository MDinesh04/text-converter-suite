const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

function textToBinary(text) {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function binaryToText(binary) {
  return binary
    .trim()
    .split(' ')
    .map(bin => {
      const parsed = parseInt(bin, 2);
      if (isNaN(parsed)) return ''; // skip garbage
      return String.fromCharCode(parsed);
    })
    .join('');
}

app.post('/convert', (req, res) => {
  const { text, binary } = req.body;

  if (text && typeof text === 'string') {
    const binaryResult = textToBinary(text);
    console.log('[binary-service] Text input:', text);
    console.log('[binary-service] Binary output:', binaryResult);
    return res.json({ binary: binaryResult });
  }

  if (binary && typeof binary === 'string') {
    const textResult = binaryToText(binary);
    console.log('[binary-service] Binary input:', binary);
    console.log('[binary-service] Text output:', textResult);
    return res.json({ text: textResult });
  }

  res.status(400).json({ error: 'Provide a valid text or binary string.' });
});

app.listen(PORT, () => console.log(`Binary service running on port ${PORT}`));
