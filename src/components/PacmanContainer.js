import React, { Component } from 'react';
import styled from 'styled-components';
import Pacman from './Pacman';
import PacDot from './PacDot';
import Ghost from './ClassGhost';

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

const MAX_SIZE = 600;
const STEP_SIZE = 20;
const NUM_DOTS = MAX_SIZE / STEP_SIZE;

const PacDotRow = ({ y }) => (
  <StyledRow>
    {[...Array(NUM_DOTS)].map((_, x) => (
      // eslint-disable-next-line react/no-array-index-key
      <PacDot key={`${x},${y}`} color="pink" />
    ))}
  </StyledRow>
);

class PacmanContainer extends Component {
  ghosts = ['pink', 'orange', 'red', 'cyan'];

  constructor(props) {
    super(props);
    this.state = {
      pacmanColor: 'yellow',
    };
  }

  render() {
    const { pacmanColor } = this.state;
    const { gameOn } = this.props;
    return (
      <>
        <StyledPacmanContainer>
          <Pacman
            gameOn={gameOn}
            color={pacmanColor}
            maxSize={MAX_SIZE}
            stepSize={STEP_SIZE}
          />
          {this.ghosts.map(ghostColor => (
            <Ghost
              key={ghostColor}
              gameOn={gameOn}
              color={ghostColor}
              maxSize={MAX_SIZE}
              stepSize={STEP_SIZE}
            />
          ))}
          <StyledPacDots>
            {[...Array(NUM_DOTS)].map((_, y) => (
              // eslint-disable-next-line react/no-array-index-key
              <PacDotRow key={y} y={y} />
            ))}
          </StyledPacDots>
        </StyledPacmanContainer>
      </>
    );
  }
}

export default PacmanContainer;
