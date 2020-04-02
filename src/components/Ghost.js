import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const StyledGhostIcon = styled.svg`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
`;

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

const Ghost = ({ gameOn, color, maxSize }) => {
  const [tickInterval, setTickInterval] = useState();
  const [ticking, setTicking] = useState(false);
  const intervalRef = useRef(null);
  const [direction, setDirection] = useState(randomDirection());
  const [top, setTop] = useState(randomPosition(maxSize / 20)); // random multiple of 20 between 0 and maxSize
  const [left, setLeft] = useState(randomPosition(maxSize / 20));

  console.log(left);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      tick();
    }, 100);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  // return true if ghost is not directly in an intersection and cannot yet move in a new direction
  const isBlocked = () => {
    const isHorizontal = direction === 'left' || direction === 'right';
    return !(isHorizontal ? left % 20 === 0 : top % 20 === 0);
  };

  const tick = () => {
    console.log('tick');
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

    console.log(
      left + deltaX < 0 ? maxSize : left + deltaX > maxSize ? 0 : left + deltaX,
    );

    setLeft(
      left + deltaX < 0 ? maxSize : left + deltaX > maxSize ? 0 : left + deltaX,
    );

    setTop(
      top + deltaY < 0 ? maxSize : top + deltaY > maxSize ? 0 : top + deltaY,
    );
  };

  // if (delay !== null) {
  //   const id = setInterval(tick, delay);
  //   return () => clearInterval(id);
  // }

  useEffect(() => {
    if (gameOn) {
      start();
    } else {
      stop();
    }
  }, [gameOn]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (gameOn) tick();
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (gameOn && !ticking) {
  //     // start moving when play is clicked
  //     setTickInterval(setInterval(() => tick(), 100));
  //     setTicking(true);
  //   } else if (!gameOn && ticking) {
  //     // stop moving when stop is clicked
  //     setTicking(false);
  //     clearInterval(tickInterval);
  //   }
  //   return () => clearInterval(tickInterval);
  // }, [gameOn]);

  return <GhostIcon color={color} top={`${top}px`} left={`${left}px`} />;
};

export default Ghost;
