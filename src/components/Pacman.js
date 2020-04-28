/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context as PacmanContext } from '../context/PacmanContext';

const StyledPacmanIcon = styled.svg.attrs(({ top, left }) => ({
  style: {
    top,
    left,
  },
}))`
  position: absolute;
  transform: scaleX(-1);

  ${props =>
    props.direction === 'left' &&
    `
    transform: none;
  `}

  ${props =>
    props.direction === 'up' &&
    `
    transform: rotate(90deg);
  `}

  ${props =>
    props.direction === 'down' &&
    `
    transform: rotate(270deg);
  `}
`;

const PacmanIcon = ({ color, direction, top, left }) => (
  <StyledPacmanIcon
    height="20"
    viewBox="0 0 100 100"
    fill={color}
    direction={direction}
    top={top}
    left={left}
  >
    <path d="M50.17 5.33c-17.88 0-33.31 10.51-40.45 25.69L60 50 15.22 77.82c8.18 10.27 20.8 16.85 34.95 16.85 24.67 0 44.66-20 44.66-44.67S74.84 5.33 50.17 5.33zm4.14 21.28c-1.859 5.55-6.3 9.06-9.919 7.84-3.62-1.21-5.05-6.69-3.2-12.23 1.86-5.54 6.3-9.05 9.92-7.84 3.629 1.22 5.059 6.69 3.199 12.23z" />
  </StyledPacmanIcon>
);

const Pacman = props => {
  const {
    state: {
      position: { left, top },
    },
    setLeft,
    setTop,
  } = useContext(PacmanContext);
  const { gameOn, maxSize, stepSize, setPosition } = props;
  const [prevDirection, setPrevDirection] = useState('right');
  const [direction, setDirection] = useState('right');

  // listen for ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  const handleKeyDown = event => {
    const { key } = event;

    event.preventDefault();

    if (key === 'ArrowUp') {
      setPrevDirection(direction);
      setDirection('up');
    } else if (key === 'ArrowDown') {
      setPrevDirection(direction);
      setDirection('down');
    } else if (key === 'ArrowLeft') {
      setPrevDirection(direction);
      setDirection('left');
    } else if (key === 'ArrowRight') {
      setPrevDirection(direction);
      setDirection('right');
    }
  };

  // return true if pacman is not directly in an intersection and cannot yet move in a new direction
  const isBlocked = () => {
    const isHorizontal = prevDirection === 'left' || prevDirection === 'right';
    return !(isHorizontal ? left % 20 === 0 : top % 20 === 0);
  };

  useEffect(() => {
    const tick = () => {
      const directionToUse = isBlocked() ? prevDirection : direction;
      const deltaX =
        directionToUse === 'left' ? -10 : directionToUse === 'right' ? 10 : 0;
      const deltaY =
        directionToUse === 'down' ? 10 : directionToUse === 'up' ? -10 : 0;
      let newLeft;
      let newTop;

      setLeft(l => {
        newLeft =
          l + deltaX < 0
            ? maxSize - stepSize
            : l + deltaX >= maxSize
            ? 0
            : l + deltaX;
        return newLeft;
      });

      setTop(t => {
        newTop =
          t + deltaY < 0
            ? maxSize - stepSize
            : t + deltaY >= maxSize
            ? 0
            : t + deltaY;
        return newTop;
      });

      setPrevDirection(direction);
      setPosition(newTop, newLeft);
    };

    // add keypress listener and start moving when play is clicked
    document.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => {
      if (gameOn) tick();
    }, 100);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [gameOn, direction]);

  return (
    <PacmanIcon
      direction={direction}
      top={`${top}px`}
      left={`${left}px`}
      {...props}
    />
  );
};

export default Pacman;
