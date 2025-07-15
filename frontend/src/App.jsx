import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ServiceView from './ServiceView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:type" element={<ServiceView />} />
      </Routes>
    </Router>
  );
}

export default App;
