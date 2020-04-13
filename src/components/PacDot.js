import React from 'react';

const PacDotIcon = ({ height, color }) => (
  <svg height={height} viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="2" fill={color} fillRule="evenodd" />
  </svg>
);

const PacDot = ({ color, height }) => (
  <PacDotIcon color={color} height={height} />
);

export default PacDot;
