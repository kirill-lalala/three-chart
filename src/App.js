import { useEffect, useRef } from 'react';
import { chartService as chartData } from "./services/ChartService";

import './App.css';

const App = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        chartData.createChart(canvasRef.current);
    }, [])

    return (
        <>
            <div className="buttonsWrap">
                <button onClick={() => chartData.onPlusZoomClick()} className="button"> + </button>
                <button onClick={() => chartData.onMinusZoomClick()} className="button"> - </button>
            </div>
            <canvas ref={canvasRef}/>
        </>
  );
}

export default App;
