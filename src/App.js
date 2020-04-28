import React from 'react';
import { Provider as PacmanProvider } from './context/PacmanContext';
import PacmanApp from './components/PacmanApp';

function App() {
  return (
    <PacmanProvider>
      <PacmanApp />
    </PacmanProvider>
  );
}

export default App;
