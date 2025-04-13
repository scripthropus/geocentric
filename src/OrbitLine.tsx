import React from 'react';
import { Line } from 'react-konva';

type orbitLineProps = {
  points: number[];
}

export const OrbitLine: React.FC<orbitLineProps> = ({ points }) => {

  return (
    <Line
      points={points}
      stroke="blue"
      strokeWidth={2}
      lineCap="round"
      lineJoin="round"
      tension={0.5}
    />
  );
};