import {useState, useRef} from 'react';
import { Stage, Layer, Line, Circle, Text} from 'react-konva';
import { Venus } from './Venus';
import { Mercury } from './Mercury';


export const Demo = () => {
    const centerX = window.innerWidth/2;
    const centerY = window.innerHeight/2;
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [venusPos, setVenusPos] = useState(venusOrbit(0,centerX, centerY));
    const [venusOrbitLine, setVenusOrbitLine] = useState<number[]>(venusPos);
    const [mercuryPos, setMercuryPos] = useState(mercuryOrbit(0,centerX, centerY));
    const [mercuryOrbitLine, setMercuryOrbitLine] = useState<number[]>(mercuryPos);

    const shapeRef = useRef(null);
    const intervalRef = useRef<number | null>(null);

    const handleStart = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
        setTime(prevTime => {
            const newTime = prevTime + 10;
            const newVenusPos = venusOrbit(newTime, centerX, centerY);
            const newMercuryPos = mercuryOrbit(newTime, centerX,centerY);
            setVenusPos(newVenusPos);
            setMercuryPos(newMercuryPos);
            setVenusOrbitLine(prev => [...prev,...newVenusPos])
            setMercuryOrbitLine(prev => [...prev,...newMercuryPos])
            return newTime;
            });
        }, 10);
    }

 function handlePause() {
    if(intervalRef.current){
        clearInterval(intervalRef.current);
    }
        setIsRunning(false);
    }

    function handleReset() {
    if(intervalRef.current){
        clearInterval(intervalRef.current);
    }
        setIsRunning(false);
        setTime(0);
        setVenusPos(venusOrbit(0,centerX, centerY));
    }

    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    const displayTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    

  return (

    <>
    <p>{displayTime}</p>
    <p>{venusPos[0]}, {venusPos[1]}</p>
    <p>{mercuryPos[0]}, {mercuryPos[1]}</p>
        {isRunning ? (
                <button onClick={handlePause}>Pause</button>
            ) : (
                <button onClick={handleStart}>Start</button>
            )}
            <button onClick={handleReset}>Reset</button>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Venus x={venusPos[0]} y={venusPos[1]} venusOrbitLine={venusOrbitLine}/>
        <Mercury x={mercuryPos[0]} y={mercuryPos[1]} mercuryOrbitLine={mercuryOrbitLine}/>
       <Circle
          ref={shapeRef}
          x={centerX}
          y={centerY}
          radius={50}
          fill="#3cb371"
        />
      </Layer>
    </Stage>
    </>
  );
};

function venusOrbit (t: number, centerX:number, centerY:number) :[number, number]{
    const R=150;
    const deferentX = R*Math.cos(t/1000)+centerX;
    const deferentY = R*Math.sin(t/1000)+centerY;

    const r=80;
    const phaseShift = (t / (2000 * Math.PI)) * Math.PI / 2; 
    const epicycleX = r*Math.cos(t/500 + phaseShift)+deferentX;
    const epicycleY = r*Math.sin(t/500 + phaseShift)+deferentY;

    return [epicycleX, epicycleY];
}


function mercuryOrbit (t: number, centerX:number, centerY:number) :[number, number]{
    const R=250;
    const deferentX = R*Math.cos(t/500)+centerX;
    const deferentY = R*Math.sin(t/500)+centerY;

    const r=80;
    const phaseShift = (t / (200 * Math.PI)) * Math.PI / 2; 
    const epicycleX = r*Math.cos(t/100 + phaseShift)+deferentX;
    const epicycleY = r*Math.sin(t/100 + phaseShift)+deferentY;

    return [epicycleX, epicycleY];
}