import React from 'react';

const PacDotIcon = ({ color }) => (
  <svg height="20" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="2" fill={color} fillRule="evenodd" />
  </svg>
);

const PacDot = ({ color }) => <PacDotIcon color={color} />;

export default PacDot;
