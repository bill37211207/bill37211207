// //import WebSocket from 'WebSocket';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// import React from 'react'; 
// import ReactDOM from 'react-dom'; 
// import App from './App'; 
// //import Client55 from './Client55'; 
// import Main from './Client_IO_2'; 
// // import index from "./index.css";
// // import { BrowserRouter } from "react-router-dom";
// // import Contact from "./Contact";

// ReactDOM.render( 
// <React.StrictMode>	
// 	<Main/> 
// </React.StrictMode>, 
// document.getElementById('root') 
// ); 

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import ChartProgressive from "./AppA6";
// import AppAA from "./AppAATT";
// import AppBB from "./AppBBTT";
// import AppCC from "./AppCCTT";
// import AppDD from "./AppDDTT";
// import AppEE from "./AppEETT";
// import AppFF from "./AppFFTT";
//import AppGG from "./AppGG";
//import AppMM from "./AppMM";
//import Bargraph from "./AppTest";
import TestChart from "./TestChart";
//import Main from './Client_IO_2'; 
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <App />
     {/* <Bargraph/>    */}
    {/* <AppAA />  */}
    {/* <AppBB /> 
    <AppCC />    
    <AppDD />  
    <AppEE />
    <AppFF />    */}
  </React.StrictMode>
);

reportWebVitals();
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//var i=0;
//var  Rawdata = new Object();
// const WebSocket = require('ws');
// var ws = new WebSocket('ws://localhost:3000');
// //let ws = new WebSocket('ws://localhost:3000')

// //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
// ws.onopen = () => {
//     console.log('open connection')
// }

// //關閉後執行的動作，指定一個 function 會在連結中斷後執行
// ws.onclose = () => {
//     console.log('close connection')
// }
// ws.addEventListener('message', function(e) {
//   var msg = JSON.parse(e.data);
//   console.log(msg)
//   //Rawdata = msg;
// })
// // object GetData()
// // {
// //   return Rawdata;
// // }
// // ws.onmessage = e => {
// //   console.log(e)
// //   var msg = JSON.parse(e.data);
// //   console.log(msg.data)
// // }
 
// const   WebServerConnect = () => {
//   const WebSocket = require('ws');
//   var ws = new WebSocket('ws://10.10.12.36:3005');
//   //let ws = new WebSocket('ws://localhost:3000')
  
//   //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
//   ws.onopen = () => {
     
//       console.log('open connection')
//   }
  
//   //關閉後執行的動作，指定一個 function 會在連結中斷後執行
//   ws.onclose = () => {
//       console.log('close connection')
//   }

//   ws.addEventListener('message', function(e) {
//     var msg = JSON.parse(e.data);
//     console.log(msg)
//     //Rawdata = msg;
//   })
// };
// export default WebServerConnect;
