import React from 'react';
import './LiquidChrome.css';

export const LiquidChrome = ({
  baseColor = [1, 0.902, 0],
  ...props
}: any) => {
  return (
    <div className="liquidChrome-container" {...props}>
      <div className="liquid-blob" />
    </div>
  );
};

export default LiquidChrome;
