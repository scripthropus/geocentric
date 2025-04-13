import React from 'react';
import { Circle } from "react-konva"
import { OrbitLine } from './OrbitLine.tsx';

type MercuryXY = {
    x: number;
    y: number;
    mercuryOrbitLine: number[];
}

export const Mercury: React.FC<MercuryXY> = ({x,y,mercuryOrbitLine})=>{
    return(
        <>
        <Circle
          x={x}
          y={y}
          radius={20}
          fill="silver"
        />

        <OrbitLine points={mercuryOrbitLine}/>
        </>
    )
}