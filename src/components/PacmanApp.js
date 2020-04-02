import React, { useState } from 'react';
import styled from 'styled-components';
import PacmanContainer from './PacmanContainer';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
`;

const PacmanApp = () => {
  const [gameOn, setGameOn] = useState(false);

  const handlePlayGame = () => {
    setGameOn(true);
  };

  const handleStopGame = () => {
    setGameOn(false);
  };

  return (
    <StyledApp>
      <header className="App-header">
        <p>PACMAN</p>
      </header>
      <button type="button" onClick={handlePlayGame}>
        PLAY
      </button>
      <button type="button" onClick={handleStopGame}>
        STOP
      </button>
      <PacmanContainer gameOn={gameOn} />
    </StyledApp>
  );
};

export default PacmanApp;
