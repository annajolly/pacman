import React, { Component } from 'react';
import styled from 'styled-components';

const StyledGhostIcon = styled.svg.attrs(({ top, left }) => ({
  style: {
    top,
    left,
  },
}))`
  position: absolute;
`;

// const StyledGhostIcon = styled.svg`
//   position: absolute;
//   top: ${props => props.top};
//   left: ${props => props.left};
// `;

const GhostIcon = ({ color, top, left }) => (
  <StyledGhostIcon
    height="20"
    viewBox="0 0 34 34"
    fill={color}
    top={top}
    left={left}
  >
    <path d="M6.97 32.99c2.51 0 2.51-2 5.02-2 2.5 0 2.5 2 5.01 2 2.5 0 2.5-2 5.01-2s2.51 2 5.02 2c2.42 0 2.5-1.87 4.77-2 .13 0 .24-.11.24-.24V16.04C32.02 7.737 25.317 1.01 17 1.01c-8.31 0-15.04 6.73-15.04 15.04v14.7c0 .13.11.24.25.24 2.26.13 2.34 2 4.76 2zM22.98 9.98c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM11 9.98c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
  </StyledGhostIcon>
);

const DIRECTIONS = ['up', 'down', 'left', 'right'];

const randomPosition = steps => Math.floor(Math.random() * steps) * 20;

const randomDirection = () => DIRECTIONS[Math.floor(Math.random() * 4)];

class Ghost extends Component {
  constructor(props) {
    super(props);
    const dir = randomDirection();
    this.state = {
      direction: dir,
      top: randomPosition(props.maxSize / 20),
      left: randomPosition(props.maxSize / 20),
      ticking: false, // whether pacman is moving
    };
  }

  componentDidUpdate() {
    const { gameOn } = this.props;
    const { ticking } = this.state;
    if (gameOn && !ticking) {
      // add keypress listener and start moving when play is clicked
      this.interval = setInterval(() => this.tick(), 100);
      this.setState({ ticking: true });
    } else if (!gameOn && ticking) {
      // remove keypress listener and stop moving when stop is clicked
      this.setState({ ticking: false });
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // return true if pacman is not directly in an intersection and cannot yet move in a new direction
  isBlocked() {
    const { direction, left, top } = this.state;
    const isHorizontal = direction === 'left' || direction === 'right';
    return !(isHorizontal ? left % 20 === 0 : top % 20 === 0);
  }

  tick() {
    const { direction } = this.state;
    const { maxSize, stepSize } = this.props;

    const directionToUse = this.isBlocked()
      ? direction
      : Math.random() > 0.9
      ? randomDirection()
      : direction;

    const deltaX =
      directionToUse === 'left' ? -10 : directionToUse === 'right' ? 10 : 0;
    const deltaY =
      directionToUse === 'down' ? 10 : directionToUse === 'up' ? -10 : 0;

    this.setState(prevState => ({
      direction: directionToUse,
      left:
        prevState.left + deltaX < 0
          ? maxSize - stepSize
          : prevState.left + deltaX >= maxSize
          ? 0
          : prevState.left + deltaX,
      top:
        prevState.top + deltaY < 0
          ? maxSize - stepSize
          : prevState.top + deltaY >= maxSize
          ? 0
          : prevState.top + deltaY,
    }));
  }

  render() {
    const { top, left } = this.state;
    return <GhostIcon top={`${top}px`} left={`${left}px`} {...this.props} />;
  }
}

export default Ghost;
