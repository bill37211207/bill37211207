import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS

const ChartTTT = ({ChamberName, data, options})=> {
  const ref = useRef();

 
  return(
  <>
  <div className="header">
    <h1 className="title"  style={{color: "grey"}}>{ChamberName}</h1>
    
  </div>
  <Line  data={data} options={options} redraw={true}/> 
</>
)};
export default ChartTTT;