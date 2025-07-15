import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControlLabel,
  Switch
} from '@mui/material';

function ServiceView() {
  const { type } = useParams(); // binary or morse
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [reverse, setReverse] = useState(false);

  const isBinary = type === 'binary';

  const handleConvert = async () => {
    const url = `http://localhost:${isBinary ? '5001' : '5002'}/convert`;

    const body = isBinary
      ? reverse ? { binary: input } : { text: input }
      : reverse ? { morse: input } : { text: input };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setOutput(data.binary || data.morse || data.text || '');
    } catch (err) {
      setOutput('Service unreachable');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isBinary ? 'Binary' : 'Morse'} Service
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={reverse}
              onChange={(e) => setReverse(e.target.checked)}
            />
          }
          label={reverse ? `${type.charAt(0).toUpperCase() + type.slice(1)} ➡ Text` : `Text ➡ ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Input"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <Box textAlign="center" my={2}>
          <Button variant="contained" onClick={handleConvert}>
            Convert
          </Button>
        </Box>

        <TextField
          label="Output"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={output}
          InputProps={{ readOnly: true }}
        />
      </Paper>
    </Container>
  );
}

export default ServiceView;
