import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Context as PacmanContext } from '../context/PacmanContext';
import Pacman from './ClassPacman';
import PacDot from './PacDot';
import Ghost from './Ghost';
import Food from './Food';

const StyledPacmanContainer = styled.div`
  position: relative;
  background-color: black;
  height: 520px;
  width: 520px;
`;

const StyledPacDots = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledRow = styled.div`
  height: 20px;
`;

const StyledPellet = styled.span.attrs(({ left, top }) => ({
  style: {
    left: left - 10,
    top: top - 10,
  },
}))`
  position: absolute;
`;

const MAX_SIZE = 520;
const STEP_SIZE = 20;
const NUM_DOTS = MAX_SIZE / STEP_SIZE;

const PacDotRow = ({ y }) => (
  <StyledRow>
    {[...Array(NUM_DOTS)].map((_, x) => (
      // eslint-disable-next-line react/no-array-index-key
      <PacDot key={`${x},${y}`} color="pink" height="20" />
    ))}
  </StyledRow>
);

const getRandomDotPosition = () =>
  Math.round(Math.floor(Math.random() * (MAX_SIZE / STEP_SIZE))) * STEP_SIZE;

const ghosts = ['pink', 'orange', 'red', 'cyan'];

const foods = [
  { top: 20, left: 20 },
  { top: 560, left: 20 },
  { top: 20, left: 480 },
  { top: 560, left: 480 },
];

const pellets = [...Array(8)].map((_, i) => ({
  key: i,
  left: getRandomDotPosition(),
  top: getRandomDotPosition(),
}));

const PacmanContainer = ({ gameOn, setGameWon, setGameLost, setScore }) => {
  const {
    state: {
      position: { left: pacmanLeft, top: pacmanTop },
      huntMode,
    },
    setLeft,
    setTop,
    setHuntMode,
  } = useContext(PacmanContext);
  const [pacmanColor, setPacmanColor] = useState('yellow');

  const didEatPellet = (newLeft, newTop) => {
    // check if pacman is touching any of the foods
    const isTouchingFood = pellets.filter(
      ({ top, left }) =>
        Math.abs(newLeft - left) <= 10 && Math.abs(newTop - top) <= 10,
    ).length;
    if (isTouchingFood) {
      setHuntMode(true);
      setTimeout(() => setHuntMode(false), 15000);
    }
  };

  const isCollision = (ghostLeft, ghostTop) =>
    // check if pacman is touching any of the ghosts
    Math.abs(pacmanLeft - ghostLeft) <= 10 &&
    Math.abs(pacmanTop - ghostTop) <= 10;

  const setPacmanPosition = (left, top) => {
    setLeft(left);
    setTop(top);
  };

  return (
    <StyledPacmanContainer>
      <Pacman
        gameOn={gameOn}
        color={pacmanColor}
        maxSize={MAX_SIZE}
        stepSize={STEP_SIZE}
        setPosition={setPacmanPosition}
        checkIfAteFood={didEatPellet}
      />
      {ghosts.map(ghostColor => (
        <Ghost
          key={ghostColor}
          gameOn={gameOn}
          color={huntMode ? 'blue' : ghostColor}
          maxSize={MAX_SIZE}
          stepSize={STEP_SIZE}
          isCollision={isCollision}
          endGame={setGameLost}
          huntMode={huntMode}
          setScore={setScore}
        />
      ))}
      {pellets.map(({ key, left, top }) => (
        <StyledPellet key={key} left={left} top={top}>
          <PacDot color="pink" height="40" />
        </StyledPellet>
      ))}
      <StyledPacDots>
        {[...Array(NUM_DOTS)].map((_, y) => (
          // eslint-disable-next-line react/no-array-index-key
          <PacDotRow key={y} y={y} />
        ))}
      </StyledPacDots>
    </StyledPacmanContainer>
  );
};

export default PacmanContainer;
