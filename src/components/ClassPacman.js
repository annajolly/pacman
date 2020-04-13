/* eslint-disable max-len */
import React, { Component } from 'react';
import styled from 'styled-components';

const getTransformForDirection = direction => {
  if (direction === 'left') return 'none';
  if (direction === 'up') return 'rotate(90deg)';
  if (direction === 'down') return 'rotate(270deg)';
  return 'scaleX(-1)';
};

const StyledPacmanIcon = styled.svg.attrs(({ left, top, direction }) => ({
  style: {
    left,
    top,
    transform: getTransformForDirection(direction),
  },
}))`
  position: absolute;
`;

const PacmanIcon = ({ color, direction, left, top }) => (
  <StyledPacmanIcon
    height="20"
    viewBox="0 0 100 100"
    fill={color}
    direction={direction}
    left={left}
    top={top}
  >
    <path d="M50.17 5.33c-17.88 0-33.31 10.51-40.45 25.69L60 50 15.22 77.82c8.18 10.27 20.8 16.85 34.95 16.85 24.67 0 44.66-20 44.66-44.67S74.84 5.33 50.17 5.33zm4.14 21.28c-1.859 5.55-6.3 9.06-9.919 7.84-3.62-1.21-5.05-6.69-3.2-12.23 1.86-5.54 6.3-9.05 9.92-7.84 3.629 1.22 5.059 6.69 3.199 12.23z" />
  </StyledPacmanIcon>
);

class Pacman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDirection: 'right',
      direction: 'right',
      left: 0,
      top: 0,
      ticking: false, // whether pacman is moving
    };
  }

  componentDidUpdate() {
    const { gameOn } = this.props;
    const { ticking } = this.state;
    if (gameOn && !ticking) {
      // add keypress listener and start moving when play is clicked
      document.addEventListener('keydown', this.handleKeyDown);
      this.interval = setInterval(() => this.tick(), 100);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ticking: true });
    } else if (!gameOn && ticking) {
      // remove keypress listener and stop moving when stop is clicked
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ticking: false });
      document.removeEventListener('keydown', this.handleKeyDown);
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    clearInterval(this.interval);
  }

  // listen for ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  handleKeyDown = event => {
    const { key } = event;

    event.preventDefault();

    if (key === 'ArrowUp') {
      this.setState(prevState => ({
        prevDirection: prevState.direction,
        direction: 'up',
      }));
    } else if (key === 'ArrowDown') {
      this.setState(prevState => ({
        prevDirection: prevState.direction,
        direction: 'down',
      }));
    } else if (key === 'ArrowLeft') {
      this.setState(prevState => ({
        prevDirection: prevState.direction,
        direction: 'left',
      }));
    } else if (key === 'ArrowRight') {
      this.setState(prevState => ({
        prevDirection: prevState.direction,
        direction: 'right',
      }));
    }
  };

  // return true if pacman is not directly in an intersection and cannot yet move in a new direction
  isBlocked() {
    const { prevDirection, left, top } = this.state;
    const isHorizontal = prevDirection === 'left' || prevDirection === 'right';
    return !(isHorizontal ? left % 20 === 0 : top % 20 === 0);
  }

  tick() {
    const { prevDirection, direction } = this.state;
    const { maxSize, stepSize, setPosition, checkIfAteFood } = this.props;

    const directionToUse = this.isBlocked() ? prevDirection : direction;
    const deltaX =
      directionToUse === 'left' ? -10 : directionToUse === 'right' ? 10 : 0;
    const deltaY =
      directionToUse === 'down' ? 10 : directionToUse === 'up' ? -10 : 0;

    let newLeft;
    let newTop;

    this.setState(prevState => {
      newLeft =
        prevState.left + deltaX < 0
          ? maxSize - stepSize
          : prevState.left + deltaX >= maxSize
          ? 0
          : prevState.left + deltaX;
      newTop =
        prevState.top + deltaY < 0
          ? maxSize - stepSize
          : prevState.top + deltaY >= maxSize
          ? 0
          : prevState.top + deltaY;
      return {
        prevDirection: prevState.direction,
        left: newLeft,
        top: newTop,
      };
    });

    setPosition(newLeft, newTop);
    checkIfAteFood(newLeft, newTop);
    this.setState({ prevDirection: direction });
  }

  render() {
    const { direction, left, top } = this.state;
    return (
      <PacmanIcon
        direction={direction}
        left={`${left}px`}
        top={`${top}px`}
        {...this.props}
      />
    );
  }
}

export default Pacman;
