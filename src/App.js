import {useEffect} from 'react';
import './App.css';
import {ChartService} from "./services/ChartService";

const App = () => {
  useEffect(() => {
    const canvas = document.getElementById('c');
    const chartService = new ChartService(canvas);
    chartService.createChart();
  }, [])

  return (
      <canvas id="c" />
  );
}

export default App;
