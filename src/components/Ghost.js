/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledIcon = styled.svg.attrs(({ left, top }) => ({
  style: {
    left,
    top,
  },
}))`
  position: absolute;
`;

const GhostIcon = ({ color, left, top }) => (
  <StyledIcon
    height="20"
    viewBox="0 0 34 34"
    fill={color}
    left={left}
    top={top}
  >
    <path d="M6.97 32.99c2.51 0 2.51-2 5.02-2 2.5 0 2.5 2 5.01 2 2.5 0 2.5-2 5.01-2s2.51 2 5.02 2c2.42 0 2.5-1.87 4.77-2 .13 0 .24-.11.24-.24V16.04C32.02 7.737 25.317 1.01 17 1.01c-8.31 0-15.04 6.73-15.04 15.04v14.7c0 .13.11.24.25.24 2.26.13 2.34 2 4.76 2zM22.98 9.98c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM11 9.98c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
  </StyledIcon>
);

const EyesIcon = ({ left, top }) => (
  <StyledIcon
    height="40"
    fill="#FFF"
    viewBox="0 0 100 100"
    left={left}
    top={top}
  >
    <g fill="none" fillRule="evenodd">
      <circle stroke="#FFF" strokeWidth="2" cx="72.5" cy="40" r="10.5" />
      <circle stroke="#FFF" strokeWidth="2" cx="43.5" cy="40" r="10.5" />
      <circle fill="#FFF" cx="76" cy="40" r="5" />
      <circle fill="#FFF" cx="47" cy="40" r="5" />
    </g>
  </StyledIcon>
);

const DIRECTIONS = ['up', 'down', 'left', 'right'];

const randomPosition = steps => Math.floor(Math.random() * steps) * 20;

const randomDirection = () => DIRECTIONS[Math.floor(Math.random() * 4)];

const Ghost = ({
  isCollision,
  endGame,
  gameOn,
  color,
  maxSize,
  stepSize,
  huntMode,
  setScore,
}) => {
  const [direction, setDirection] = useState(randomDirection());
  const [left, setLeft] = useState(randomPosition(maxSize / 20)); // random multiple of 20 between 0 and maxSize
  const [top, setTop] = useState(randomPosition(maxSize / 20));
  const [wasEaten, setWasEaten] = useState(false);

  // return true if ghost is not directly in an intersection and cannot yet move in a new direction
  const isBlocked = () => {
    const isHorizontal = direction === 'left' || direction === 'right';
    return !(isHorizontal ? left % 20 === 0 : top % 20 === 0);
  };

  useEffect(() => {
    const tick = () => {
      let newDirection = direction;
      // change direction randomly
      if (!isBlocked() && Math.random() > 0.9) {
        newDirection = randomDirection();
        setDirection(newDirection);
      }

      const deltaX =
        newDirection === 'left' ? -10 : newDirection === 'right' ? 10 : 0;
      const deltaY =
        newDirection === 'down' ? 10 : newDirection === 'up' ? -10 : 0;

      let newLeft;
      let newTop;

      setLeft(l => {
        newLeft =
          l + deltaX < 0
            ? maxSize - stepSize
            : l + deltaX >= maxSize - stepSize
            ? 0
            : l + deltaX;
        return newLeft;
      });

      setTop(t => {
        newTop =
          t + deltaY < 0
            ? maxSize - stepSize
            : t + deltaY >= maxSize - stepSize
            ? 0
            : t + deltaY;
        return newTop;
      });

      if (isCollision(newLeft, newTop)) {
        if (huntMode && !wasEaten) {
          setWasEaten(true);
          setScore(s => s + 50);
        } else {
          endGame();
        }
      }
    };

    const interval = setInterval(() => {
      if (gameOn) tick();
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [gameOn, huntMode]);

  return wasEaten ? (
    <EyesIcon left={`${left}px`} top={`${top}px`} />
  ) : (
    <GhostIcon color={color} left={`${left}px`} top={`${top}px`} />
  );
};

export default Ghost;
