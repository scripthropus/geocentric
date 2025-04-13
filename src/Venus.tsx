import React from 'react';
import { Circle } from "react-konva"
import { OrbitLine } from './OrbitLine.tsx';

type VenusXY = {
    x: number;
    y: number;
    venusOrbitLine: number[];
}

export const Venus: React.FC<VenusXY> = ({x,y,venusOrbitLine})=>{
    return(
        <>
        <Circle
          x={x}
          y={y}
          radius={30}
          fill="gold"
        />

        <OrbitLine points={venusOrbitLine}/>
        </>
    )
}