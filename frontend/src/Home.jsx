import { useNavigate } from 'react-router-dom';
import { Button, Box, Container, Typography } from '@mui/material';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Choose a Conversion Service
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/service/binary')}>
          Binary Service
        </Button>
        <Button variant="outlined" onClick={() => navigate('/service/morse')}>
          Morse Service
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
