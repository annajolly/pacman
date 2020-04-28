import React, { useState } from 'react';
import styled from 'styled-components';
import PacmanContainer from './PacmanContainer';

const StyledApp = styled.div`
  background: black;
  min-height: 100vh;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.div`
  font-weight: 600;
  font-size: 48px;
  color: blue;
  padding: 12px;
  text-shadow: -4px 0 yellow, 0 4px yellow, 4px 0 yellow, 0 -4px yellow,
    -4px -4px yellow, 4px 4px yellow, -4px 4px yellow, 4px -4px yellow;
  text-align: center;
`;

const StyledButton = styled.button`
  border-radius: 12px;
  background-color: blue;
  color: yellow;
  height: 32px;
  width: 120px;
  margin: 12px;
  margin-bottom: 24px;

  &:focus {
    outline: none;
  }
`;

const StyledScore = styled.span`
  color: yellow;
  padding: 0 24px 12px;
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 410px;
  font-weight: 600;
  font-size: 48px;
  color: yellow;
  text-shadow: -4px 0 blue, 0 4px blue, 4px 0 blue, 0 -4px blue, -4px -4px blue,
    -4px 4px blue, 4px 4px blue, 4px -4px blue;
  z-index: 1;
`;

const PacmanApp = () => {
  const [gameOn, setGameOn] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const winGame = () => {
    setGameWon(true);
    if (score > highScore) {
      setHighScore(score);
    }
    setGameOn(false);
  };

  const loseGame = () => {
    setGameLost(true);
    setGameOn(false);
  };

  const resetGame = () => {
    setGameOn(false);
    setGameWon(false);
    setGameLost(false);
    setScore(0);
  };

  const handlePlayGame = () => {
    setGameOn(true);
  };

  const handleStopGame = () => {
    setGameOn(false);
  };

  return (
    <StyledApp>
      <StyledRow>
        <StyledHeader>PACMAN</StyledHeader>
      </StyledRow>
      <StyledRow>
        <StyledScore>{`Score: ${score}`}</StyledScore>
        <StyledButton type="button" onClick={handlePlayGame}>
          PLAY
        </StyledButton>
        <StyledButton type="button" onClick={handleStopGame}>
          STOP
        </StyledButton>
        <StyledScore>{`High Score: ${highScore}`}</StyledScore>
      </StyledRow>
      <StyledRow>
        <StyledTitle>{gameLost ? 'YOU LOSE' : null}</StyledTitle>
        <StyledTitle>{gameWon ? 'YOU WIN' : null}</StyledTitle>
      </StyledRow>
      <StyledRow>
        <PacmanContainer
          gameOn={gameOn}
          setGameWon={winGame}
          setGameLost={loseGame}
          setScore={setScore}
        />
      </StyledRow>
    </StyledApp>
  );
};

export default PacmanApp;
