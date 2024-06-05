import React from 'react'; 
import eventlogsvgrepocom from './eventlogsvgrepocom.svg';
import './App.css';

const EventLogViewer = () => { 
return ( 
	// <div 
	// style={{ 
	// 	display: 'flex', 
	// 	justifyContent: 'Center', 
	// 	alignItems: 'Center', 
	// 	height: '100vh'
	// }} 
	// > 
	// <h1>Event Log Viewer</h1> 
	// </div> 
	<div className="App">
	<header className="App-header">
	  <img src={eventlogsvgrepocom} className="App-logo" alt="eventlogsvgrepocom" />
	   
	  <a
		className="App-link"
		href="http://localhost:8080/Getdata"
		target="_blank"
		rel="noopener noreferrer"
	  >
		event log viewer
	  </a>
	</header>
  </div>
); 
}; 

export default EventLogViewer;
// import React, { Component } from 'react';
// import { Line } from 'react-chartjs-2';
// //import Chart from 'chart.js';
// //var config = {};

// // class Chart extends Component {
// //     constructor() {
// //         super();
// //         this.ctx = document.getElementById(this._rootNodeID).getContext("2d");
// //         this.chart = new Chart(ctx, config);

// //     }


// //     changeHandler(value) {
// //         this.chart.update();
// //     }

// //     render() {
// //         return (
// //             <canvas id={this._rootNodeID}>
// //                 <LineChart value={this.state.value} 
// //                            config={this.config} 
// //                            onChange={this.changeHandler}/>
// //             </canvas>
// //         );
// //     }
// // }


// const line = {
//     labels: [],
//     datasets: [
//         {
//             label: 'My First dataset',
//             fill: false,
//             data: []
//         }
//     ]
// };



// class LineChart extends Component {

//     constructor(props) {
//         super(props);

//         this.props.config = line;
//         setInterval(function(){
//             this.props.config.labels.push(Math.floor(Math.random() * 100));
//             this.props.config.datasets[0].data.push(Math.floor(Math.random() * 100));
//             this.props.changeHandler();
//         }, 3000);

//     }


//     render() {
//         return (
//             <div className="chart">
//                 <Line
//                     data={this.state}
//                     height={5}
//                     width={20}
//                 />
//             </div>
//         )
//     }
// }


// export default LineChart;