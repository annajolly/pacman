import React, { Component } from 'react';
import styled from 'styled-components';
import Pacman from './ClassPacman';
import PacDot from './PacDot';
import Ghost from './Ghost';
import Food from './Food';

const StyledPacmanContainer = styled.div`
  position: relative;
  background-color: black;
  height: 600px;
  width: 600px;
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

const MAX_SIZE = 600;
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
  Math.round(Math.floor(Math.random() * 30)) * 20;

class PacmanContainer extends Component {
  ghosts = ['pink', 'orange', 'red', 'cyan'];

  foods = [
    { top: 20, left: 20 },
    { top: 560, left: 20 },
    { top: 20, left: 560 },
    { top: 560, left: 560 },
  ];

  pellets = [...Array(8)].map((_, i) => ({
    key: i,
    left: getRandomDotPosition(),
    top: getRandomDotPosition(),
  }));

  constructor(props) {
    super(props);
    this.state = {
      pacmanColor: 'yellow',
      pacmanTop: 0,
      pacmanLeft: 0,
      huntMode: false,
    };
  }

  didEatPellet = (pacmanLeft, pacmanTop) => {
    // check if pacman is touching any of the foods
    const isTouchingFood = this.pellets.filter(
      ({ top, left }) =>
        Math.abs(pacmanLeft - left) <= 10 && Math.abs(pacmanTop - top) <= 10,
    ).length;
    if (isTouchingFood) {
      this.setState({ huntMode: true });
      setTimeout(() => this.setState({ huntMode: false }), 15000);
    }
  };

  isCollision = (ghostLeft, ghostTop) => {
    const { pacmanLeft, pacmanTop } = this.state;
    // check if pacman is touching any of the ghosts
    return (
      Math.abs(pacmanLeft - ghostLeft) <= 10 &&
      Math.abs(pacmanTop - ghostTop) <= 10
    );
  };

  setPacmanPosition = (left, top) =>
    this.setState({ pacmanLeft: left, pacmanTop: top });

  render() {
    const { pacmanColor, huntMode } = this.state;
    const { gameOn, setGameWon, setGameLost, setScore } = this.props;
    return (
      <StyledPacmanContainer>
        <Pacman
          gameOn={gameOn}
          color={pacmanColor}
          maxSize={MAX_SIZE}
          stepSize={STEP_SIZE}
          setPosition={this.setPacmanPosition}
          checkIfAteFood={this.didEatPellet}
        />
        {this.ghosts.map(ghostColor => (
          <Ghost
            key={ghostColor}
            gameOn={gameOn}
            color={huntMode ? 'blue' : ghostColor}
            maxSize={MAX_SIZE}
            stepSize={STEP_SIZE}
            isCollision={this.isCollision}
            endGame={setGameLost}
            huntMode={huntMode}
            setScore={setScore}
          />
        ))}
        {this.pellets.map(({ key, left, top }) => (
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
  }
}

export default PacmanContainer;
