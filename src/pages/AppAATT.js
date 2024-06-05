
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react"; 
import {Chart as ChartJS} from 'chart.js/auto'
//import {GetStepPauseFlag1,GetStepOneFlag1,GetRecipeEnd1,ClearRecipeEnd1} from './pages/processing';
//import {UpdateChamberTableAAChart} from './pages/processing';
//import {onClick} from  './pages/processing';
import {GetStepPauseFlag1,GetStepOneFlag1,GetRecipeEnd1,ClearRecipeEnd1} from './processing';
import {UpdateChamberTableAAChart} from './processing';
import {onClickStart} from  './processing';
import './App.css';
var zero = 1;
var FlagPrerun =false;
var RepeatRunning = false;
var FlagFirstRun =false;
var scan = false;
var FlagStepOneStart =false;
var FlagRecipeEnd =false;
var deltaIncrease = 0;
var Xindex =0;
var speed = 250;
var FinalchartOptionsFlag = false;
var TempchartOptions ={};
var PreruntimeFlag = false;
var delayBetweenPoints =0;
var labelsIndex = 0;
var RealStart = false;
var redrawTemp = false;
var redrawPressure = false;
var PressureParavalue =0.0;
//var setpointArray =[0,0,0,0];
var TemperatureSetpoint = 0;
var setpointArray =[];
var actualTempArray =[0,0,0,0];
var actualCurrentArray =[];
var TotalTimeProcessParavalueBB = 0;
const ChamberName = "Chamber A";
var countTT = 0;
var countPP = 0;
var chartdataTT = {};
var chartdataPP = {};
var LabesTemp =[];
var FirstTime = false;
var FirstTimePreRun = false;
var RecipeRunning = false;
var chartReference = {};
var finishedscan = false;
var PortNumber =  0; 
var SlotID =  0;   
var PortID ='';
var t1 =0;
var t2=0;
var t3=0;
var t4=0;
const Parameter0 = "Pressure";
const Parameter1 = "Temperature SP";
const Parameter2 = "Index 1 Actual Temp.";
const Parameter3 = "Index 2 Actual Temp.";
const Parameter4 = "Index 3 Actual Temp.";
const Parameter5 = "Index 4 Actual Temp.";
const ParameterBlank = "123";
var firstimeload = false;
let intervalID1;
let intervalID2;
var lablesCount = 100;
      var data = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      var data5 = [];
      let prev = 100;
      let prev1 = 60;
      let prev2 = 70;
      let prev3 = 80;
      let prev4 = 90;
      let prev5 = -100;
      for (let i = 0; i < lablesCount; i++) {
      prev += 5 - Math.random() * 10;
      data.push({x: i, y: prev});
      prev1 += 5 - Math.random() * 10;
      data1.push({x: i, y: prev1});
      prev2 += 5 - Math.random() * 10;
      data2.push({x: i, y: prev2});
      prev3 += 5 - Math.random() * 10;
      data3.push({x: i, y: prev3});
      prev4 += 5 - Math.random() * 10;
      data4.push({x: i, y: prev4});
      prev5 += 5 - Math.random() * 10;
      data5.push({x: i, y: prev5});
      }
      // </block:data>
      const totalDuration = 10000;
      delayBetweenPoints = totalDuration / data.length;
      const initiChardData = (p1,p2,p3,p4,p5,p6,leng) =>
      {
         data = [];
         data1 = [];
         data2 = [];
         data3 = [];
         data4 = [];
         data5 = [];
         prev = p1;
         prev1 = p2;
         prev2 = p3;
         prev3 = p4;
         prev4 = p5;
         prev5 = p6;
         lablesCount = leng;
        for (let i = 0; i < lablesCount; i++) {
        prev += 5 - Math.random() * 10;
        data.push({x: i, y: prev});
        prev1 += 5 - Math.random() * 10;
        data1.push({x: i, y: prev1});
        prev2 += 5 - Math.random() * 10;
        data2.push({x: i, y: prev2});
        prev3 += 5 - Math.random() * 10;
        data3.push({x: i, y: prev3});
        prev4 += 5 - Math.random() * 10;
        data4.push({x: i, y: prev4});
        prev5 += 5 - Math.random() * 10;
        data5.push({x: i, y: prev5});
        }
      }
      const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      //const ctx = document.getElementById('mychart');
      // const previousY = (ctx) => {
      //   console.log('111'+ ctx.index.toString());
      //   console.log('111'+ (ctx.index-1).toString());
      //   //console.log('222'+ ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y.toString());
      //   //ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      //   if(ctx.index === 0 )
      //   {
      //     ctx.chart.scales.y.getPixelForValue(100);
      //    }
      //    else{
      //     ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;        
      //    }
      // }
      var DataLables =[];
      const initi = (count) =>
      {
        DataLables=[];
        for(let i=0;i<count;i++)
        {
          DataLables.push(i.toString());
        }
      }
      initi(lablesCount); 
      
        const chartdataTemperature = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter1,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data,
           },
           {
             type: 'line' ,
             label: Parameter2,
             borderColor: 'blue',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data1,
           },
           {
            type: 'line' ,
            label: Parameter3,
            borderColor: 'grey',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data2,
          },
          {
            type: 'line' ,
            label: Parameter4,
            borderColor: 'pink',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data3,
          },   
          {
            type: 'line' ,
            label: Parameter5,
            borderColor: 'brown',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data4,
          }]                         
        };
        const chartdata11 = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter1,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data,
           },
           {
             type: 'line' ,
             label: Parameter2,
             borderColor: 'blue',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data1,
           },
           {
            type: 'line' ,
            label: Parameter3,
            borderColor: 'grey',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data2,
          },
          {
            type: 'line' ,
            label: Parameter4,
            borderColor: 'pink',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data3,
          },   
          {
            type: 'line' ,
            label: Parameter5,
            borderColor: 'brown',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data4,
          }]                         
        };
        const chartdataPressure = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter0,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data5,
           }          
           ]     
        };
        const chartdata66 = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter0,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data5,
           }          
           ]     
        };
        const chartdata22 = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter1,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data,
           },
           {
             type: 'line' ,
             label: Parameter2,
             borderColor: 'blue',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data1,
           },
           {
            type: 'line' ,
            label: Parameter3,
            borderColor: 'grey',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data2,
          },
          {
            type: 'line' ,
            label: Parameter4,
            borderColor: 'pink',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data3,
          },   
          {
            type: 'line' ,
            label: Parameter5,
            borderColor: 'brown',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: data4,
          }]                         
        };
        
        const options00 = {
        animation:{
          x: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
           
          return ctx.index * delayBetweenPoints;
          }
          },
          y: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted+'x') {
            return 0;
          }
          ctx.yStarted = true;
          
          return ctx.index * delayBetweenPoints;
          }
          }
  
      },
      interaction: {
        intersect: true
      },     
      plugins: {
        legend: true,
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
                speed: 10,
                threshold: 10
            },
            zoom: {
                enabled: true,
                mode: 'y'
            }
         }
      },   
      scales: {
        x: {
          type: 'linear'
        }
      }
    };
    const options11 = {
        responsive: true,
        animation: {
          duration: speed * 1.5,
          easing: 'linear'
        },
        legend: false,
        scales: {
          xAxes: [{
            type: "linear",
            display: true
          }],
          yAxes: [{
            ticks: {
              max: 1,
              min: -1
            }
          }]
        }
      }
      const options22 = {
        
        title:{
          display:true,
          text:'Chamber pressure RF data',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }
const AppAA = ()=> {  
  
  const [DataTemperature,setDataTemperature ] = useState(chartdataTemperature);
  const [chartOptions, setChartOptions] = useState(options22);
  //const [chartOptions2, setChartOptions2] = useState(options00);
  const [dataPressure, setdataPressure] = useState(chartdataPressure); 
  FinalchartOptionsFlag = false;
  const UpdateChartDataRecipeRunning = ()=> {
  
    intervalID1  = setInterval(function () {
       
        UpdateByExternalAA();    
      
        //if( scan || redrawTemp || redrawPressure) { 
        if(FlagRecipeEnd)  
        {
          console.log('111111_FlagPrerun+FlagRecipeEnd'+FlagPrerun +'_'+ FlagRecipeEnd);
        }
        if(FlagPrerun) {
         UpdateAA();
         UpdateChartDataParaAll(PressureParavalue,TemperatureSetpoint,t1,t2,t3,t4);
           

        //  UpdateTemperature(setpointArray,actualTempArray);  
        //  UpdatePressure(PressureParavalue);     
       }    
       
   }, 1000)
   };
   const UpdateChartDataRecipeRunning2 = ()=> {
  
    intervalID1  = setInterval(function () {
       
        UpdateByExternalAA();    
      
        //if( scan || redrawTemp || redrawPressure) { 
        if(FlagRecipeEnd)  
        {
          console.log('111111_FlagPrerun+FlagRecipeEnd'+FlagPrerun +'_'+ FlagRecipeEnd);
        }
        if(FlagPrerun) {
         UpdateAA();
         UpdateChartDataParaAll22(PressureParavalue,TemperatureSetpoint,t1,t2,t3,t4);
           

        //  UpdateTemperature(setpointArray,actualTempArray);  
        //  UpdatePressure(PressureParavalue);     
       }    
       
   }, 1000)
   };
   const UpdateChartRepeat = ()=> {
    
    intervalID2  = setInterval(function () {
       
        //UpdateByExternalAA();    
        FlagPrerun = !GetStepPauseFlag1(); 
        console.log('intervalID1_' + intervalID1);
        if(FlagPrerun ) {  
          console.log('Pre-run Recipe step restart running......................')
          //console.log('intervalID1_' + intervalID1);
          if(!RecipeRunning)
          {
            RecipeRunning = true;
        
            //console.log('Start Recipe re-running @@@@......')
            finishedscan = false;
            clearInterval(intervalID1);
            UpdateChartDataRecipeRunning();
          }
          //clearInterval(intervalID2);   // stop rescan switch to chamber running scan   
         
       }
       if(FlagPrerun && FlagRecipeEnd && FlagStepOneStart) {  
        if(!finishedscan)
        {
          FlagPrerun = false;
          finishedscan = true;
          RecipeEndUpdate();   
        } 
      }        
       
   }, 1000)
   };
  //  const Startclick = () =>{
  //   UpdateChartDataPara();
  // };
  const chart0 = () => {
    setdataPressure(chartdataPressure);
  };
  const chart = () => {
    setDataTemperature(chartdataTemperature);
  };
  const options = (flag) => {
    if(flag)
    {
        TempchartOptions = options22;
      setChartOptions(TempchartOptions);
    }
    else{
        // TempchartOptions = options00;
        // setChartOptions2(TempchartOptions);
    }
  };
//   const updateDataset = () => {
//     setDataTemperature(chartdataTemperature);
//     setChartOptions(options00);
    
//   };
// const onloadtrigger = () => {
//    console.log('load completed');
// };
  const GetInputData = (a,b,lbc) =>
      {
        
        data =[];
        data2 =[];
        for (let i = 0; i < lbc; i++) {
          a += 5 - Math.random() * 10;
          data.push({x: i, y: a});
          b += 5 - Math.random() * 10;
          data2.push({x: i, y: b});
          }
      }
      const GetRealToolInputData = (index,b,xindex) =>
      {
          if(index===0)
          {
             data1.push({x: xindex, y: b});  
          }  
          else if(index===1)  
          {   
             data2.push({x: xindex, y: b});
          }
          else if(index===2)    
          { 
             data3.push({x: xindex, y: b});
          }
          else if(index===3)  
          {   
             data4.push({x: xindex, y: b});
          }
         
      } 
      const GetRealToolInputDataForSetPoint = (a,xindex) => // only one line and assuming all index are same setpoint value
      {
          data.push({x: xindex, y: a});
      }
  const UpdateChartData = (a,b) =>
  {   //lablesCount = 500;   
      GetInputData(a,b,lablesCount);
      initi(lablesCount); 
  }
 
  const UpdateChartinstant = (mode)  =>
  {
    if(mode === 0)
    {
      chartdataTT = {};
      chartdataTT = chartdata11;
    }
    else if(mode === 1)
    {
      chartdataTT = {};
      chartdataTT = chartdata22;
    }   

  }
  const UpdateChartinstantPressure = (mode)  =>
  {
    if(mode === 0)
    {
      chartdataPP = {};  
      chartdataPP = chartdataPressure;
    }
    else if(mode === 1)
    {
      chartdataPP = {};
      chartdataPP = chartdata66;
    }
  }
    
  const updateDataset3 = () => { 
    
    //UpdateChartDataToClear();
    countTT++;
    var mod = countTT  % 2;
    console.log('mod'+mod.toString())   

UpdateChartinstant(mod);
initi(data.length);
chartdataTT.datasets[0].data.splice(0, chartdataTT.datasets[0].data.length);
chartdataTT.datasets[1].data.splice(0, chartdataTT.datasets[1].data.length);
chartdataTT.datasets[2].data.splice(0, chartdataTT.datasets[2].data.length);
chartdataTT.datasets[3].data.splice(0, chartdataTT.datasets[3].data.length);
chartdataTT.datasets[4].data.splice(0, chartdataTT.datasets[4].data.length);


chartdataTT.datasets[0].data = data.slice(0);
chartdataTT.datasets[1].data = data1.splice(0); 
chartdataTT.datasets[2].data = data2.splice(0); 
chartdataTT.datasets[3].data = data3.splice(0); 
chartdataTT.datasets[4].data = data4.splice(0); 

chartdataTT.datasets[0].label = Parameter1 +'_'+ mod.toString();
chartdataTT.datasets[1].label = Parameter2 +'_'+ mod.toString();
chartdataTT.datasets[2].label = Parameter3 +'_'+ mod.toString();
chartdataTT.datasets[3].label = Parameter4 +'_'+ mod.toString();
chartdataTT.datasets[4].label = Parameter5 +'_'+ mod.toString();


chartdataTT.datasets[0].fill = true;  

chartdataTT.labels = DataLables;   
 
setDataTemperature(chartdataTT);
}
const updateTemperature2 = () => { 
    
    //UpdateChartDataToClear();
if(data.length === 0) return;
    countTT++;
    var mod = countTT  % 2;
    console.log('mod'+mod.toString())   

UpdateChartinstant(mod);
initi(data.length);
var Start = 0;

if(LabesTemp.length > 4)
{
  Start = 4;
}
chartdataTT.labels = LabesTemp.slice(Start);    
chartdataTT.datasets[0].data = [];
chartdataTT.datasets[1].data = [];
chartdataTT.datasets[2].data = [];
chartdataTT.datasets[3].data = [];
chartdataTT.datasets[4].data = [];


chartdataTT.datasets[0].data = data.slice(Start);
chartdataTT.datasets[1].data = data1.splice(Start); 
chartdataTT.datasets[2].data = data2.splice(Start); 
chartdataTT.datasets[3].data = data3.splice(Start); 
chartdataTT.datasets[4].data = data4.splice(Start); 

chartdataTT.datasets[0].label = Parameter1 +'_'+ mod.toString();
chartdataTT.datasets[1].label = Parameter2 +'_'+ mod.toString();
chartdataTT.datasets[2].label = Parameter3 +'_'+ mod.toString();
chartdataTT.datasets[3].label = Parameter4 +'_'+ mod.toString();
chartdataTT.datasets[4].label = Parameter5 +'_'+ mod.toString();


chartdataTT.datasets[0].fill = true;  
 
if(data.length === 4)
{
  delayBetweenPoints = 100;
}
if(data.length > 4) 
{
  delayBetweenPoints = totalDuration / data.length;
}
 
console.log(delayBetweenPoints);
setDataTemperature(chartdataTT);
// if(FinalchartOptionsFlag)
// {
//     TempchartOptions = options00;
//     setChartOptions2(TempchartOptions);
// }
// else
// {
//     TempchartOptions = options22;
//     setChartOptions(TempchartOptions);  
// }
//options();
}
const updateDatasetPressure2 = () => { 
    if(data5.length === 0) return;
    countPP++;
    var mod = countPP  % 2;
    //console.log('mod'+mod.toString())
   
   
    UpdateChartinstantPressure(mod);
    
    var Start = 0;

    if(LabesTemp.length > 4)
    {
      Start = 4;
    }
    chartdataPP.labels = LabesTemp.slice(Start);
    chartdataPP.datasets[0].data = [];
    chartdataPP.datasets[0].data = data5.slice(Start);
    //chartdataPP.datasets[0].label = Parameter0 +'_'+ mod.toString();
    chartdataPP.datasets[0].fill = true;
    if(data5.length === 4)
    {
      delayBetweenPoints = 100;
    }
    if(data5.length > 4) 
    {
      delayBetweenPoints = totalDuration / data5.length;
    }
    console.log(delayBetweenPoints);
    setdataPressure(chartdataPP); 
    // if(FinalchartOptionsFlag === true)
    // {
    //     TempchartOptions = options00;
    //     setChartOptions2(TempchartOptions);
    // }
    // else
    // {
    //     TempchartOptions = options22;
    //     setChartOptions(TempchartOptions);  
    // }
    //options();
  }
 
  const onButtonClick = () => {
    if(!FirstTime)
    {
      
       InitateUpdateRawData(0,0,0,0,0,0);
       FinalchartOptionsFlag = false; 
       updateDatasetPressure2();     
       updateTemperature2();
       document.getElementById("UpdateBtn").innerHTML = 'idle';
       FirstTime = true;
    }
   
    clearInterval(intervalID1); 
    UpdateChartDataRecipeRunning();
    RecipeRunning = true;
    
    labelsIndex = 0;        
    console.log("click the first")
  };
  // const onConClickStart = () =>
  // {
  //   onButtonClick3();
  // }
  const onButtonClick3 = () => {
    if(!FirstTime)
    {
       
      FirstTime = true;  
      Initiate();
      UpdateChartDataRecipeRunning2();   
    //  //InitateUpdateRawData(0,0,0);
    //  updateDatasetPressureReset();
    //   DataLables = chartdataPressure.labels.slice(0);
    //   data5 =  chartdataPressure.datasets[0].data.slice(0);
    //   setdataPressure({
    //     labels: DataLables,  
    //         datasets: [{
    //          type: 'line' ,
    //          label: Parameter0,
    //          borderColor: 'red',
    //          borderWidth: 1,
    //          lineTension: 0,      
    //          radius: 0,
    //          fill: false,
    //          data: data5,
    //        }          
    //        ]     
    //  });
    //   updateTemperatureFinallyReset();
    //   DataLables = chartdataTemperature.labels.slice(0);
    //   data = chartdataTemperature.datasets[0].data.slice(0);
    //   data1 = chartdataTemperature.datasets[1].data.slice(0);
    //   data2 = chartdataTemperature.datasets[2].data.slice(0);
    //   data3 = chartdataTemperature.datasets[3].data.slice(0);
    //   data4 = chartdataTemperature.datasets[4].data.slice(0);
 
    //   setDataTemperature({
    //     labels: DataLables,  
    //     datasets: [{
    //      type: 'line' ,
    //      label: Parameter1,
    //      borderColor: 'red',
    //      borderWidth: 1,
    //      radius: 0,
    //      fill: false,
    //      data: data,
    //    },
    //    {
    //      type: 'line' ,
    //      label: Parameter2,
    //      borderColor: 'blue',
    //      borderWidth: 1,
    //      radius: 0,
    //      fill: false,
    //      data: data1,
    //    },
    //    {
    //     type: 'line' ,
    //     label: Parameter3,
    //     borderColor: 'grey',
    //     borderWidth: 1,
    //     radius: 0,
    //     fill: false,
    //     data: data2,
    //   },
    //   {
    //     type: 'line' ,
    //     label: Parameter4,
    //     borderColor: 'pink',
    //     borderWidth: 1,
    //     radius: 0,
    //     fill: false,
    //     data: data3,
    //   },   
    //   {
    //     type: 'line' ,
    //     label: Parameter5,
    //     borderColor: 'brown',
    //     borderWidth: 1,
    //     radius: 0,
    //     fill: false,
    //     data: data4,
    //   }]                     
    //  });
    
    // //else{
    //    document.getElementById("UpdateBtn").innerHTML = 'idle';
    //    //FirstTime = true;      
 
    //     InitateUpdateRawDataOnClick();
        
    //     setDataTemperature({
    //         labels: chartdataTemperature.labels.slice(0),  
    //         datasets: [{
    //          type: 'line' ,
    //          label: Parameter1,
    //          borderColor: 'red',
    //          borderWidth: 1,
    //          radius: 0,
    //          fill: false,
    //          data: chartdataTemperature.datasets[0].data.slice(0)
    //        },
    //        {
    //          type: 'line' ,
    //          label: Parameter2,
    //          borderColor: 'blue',
    //          borderWidth: 1,
    //          radius: 0,
    //          fill: false,
    //          data: chartdataTemperature.datasets[1].data.slice(0)
    //        },
    //        {
    //         type: 'line' ,
    //         label: Parameter3,
    //         borderColor: 'grey',
    //         borderWidth: 1,
    //         radius: 0,
    //         fill: false,
    //         data:chartdataTemperature.datasets[1].data.slice(0)
    //       },
    //       {
    //         type: 'line' ,
    //         label: Parameter4,
    //         borderColor: 'pink',
    //         borderWidth: 1,
    //         radius: 0,
    //         fill: false,
    //         data: chartdataTemperature.datasets[2].data.slice(0)
    //       },   
    //       {
    //         type: 'line' ,
    //         label: Parameter5,
    //         borderColor: 'brown',
    //         borderWidth: 1,
    //         radius: 0,
    //         fill: false,
    //         data:chartdataTemperature.datasets[3].data.slice(0)
    //       }]                     
    //      });
        
         
    //      setdataPressure({
    //        labels:  chartdataPressure.labels.slice(0),  
    //            datasets: [{
    //             type: 'line' ,
    //             label: Parameter0,
    //             borderColor: 'red',
    //             borderWidth: 1,
    //             lineTension: 0,      
    //             radius: 0,
    //             fill: false,
    //             data: chartdataPressure.datasets[0].data.slice(0)
    //           }          
    //           ]     
    //    });
    //}
       //UpdateChartDataRecipeRunning2();   
       
       // console.log("click the second")
    } 
  };
  const Initiate = () => {
    
    labelsIndex = 0;
    FinalchartOptionsFlag = false;
    //options(FinalchartOptionsFlag); 
    updateDatasetPressureReset();
    DataLables = chartdataPressure.labels.slice(0);
    data5 =  chartdataPressure.datasets[0].data.slice(0);
    FinalchartOptionsFlag = false;

    setdataPressure({
      labels: DataLables,  
          datasets: [{
           type: 'line' ,
           label: Parameter0,
           borderColor: 'red',
           borderWidth: 1,
           lineTension: 0,      
           radius: 0,
           fill: false,
           data: data5,
         }          
         ]     
   });
    updateTemperatureFinallyReset();
    DataLables = chartdataTemperature.labels.slice(0);
    data = chartdataTemperature.datasets[0].data.slice(0);
    data1 = chartdataTemperature.datasets[1].data.slice(0);
    data2 = chartdataTemperature.datasets[2].data.slice(0);
    data3 = chartdataTemperature.datasets[3].data.slice(0);
    data4 = chartdataTemperature.datasets[4].data.slice(0);

    setDataTemperature({
      labels: DataLables,  
      datasets: [{
       type: 'line' ,
       label: Parameter1,
       borderColor: 'red',
       borderWidth: 1,
       radius: 0,
       fill: false,
       data: data,
     },
     {
       type: 'line' ,
       label: Parameter2,
       borderColor: 'blue',
       borderWidth: 1,
       radius: 0,
       fill: false,
       data: data1,
     },
     {
      type: 'line' ,
      label: Parameter3,
      borderColor: 'grey',
      borderWidth: 1,
      radius: 0,
      fill: false,
      data: data2,
    },
    {
      type: 'line' ,
      label: Parameter4,
      borderColor: 'pink',
      borderWidth: 1,
      radius: 0,
      fill: false,
      data: data3,
    },   
    {
      type: 'line' ,
      label: Parameter5,
      borderColor: 'brown',
      borderWidth: 1,
      radius: 0,
      fill: false,
      data: data4,
    }]                     
   });
  
 
     document.getElementById("UpdateBtn").innerHTML = 'idle';
    

    //   //InitateUpdateRawDataOnClick();
      
    //   setDataTemperature({
    //       labels: chartdataTemperature.labels.slice(0),  
    //       datasets: [{
    //        type: 'line' ,
    //        label: Parameter1,
    //        borderColor: 'red',
    //        borderWidth: 1,
    //        radius: 0,
    //        fill: false,
    //        data: chartdataTemperature.datasets[0].data.slice(0)
    //      },
    //      {
    //        type: 'line' ,
    //        label: Parameter2,
    //        borderColor: 'blue',
    //        borderWidth: 1,
    //        radius: 0,
    //        fill: false,
    //        data: chartdataTemperature.datasets[1].data.slice(0)
    //      },
    //      {
    //       type: 'line' ,
    //       label: Parameter3,
    //       borderColor: 'grey',
    //       borderWidth: 1,
    //       radius: 0,
    //       fill: false,
    //       data:chartdataTemperature.datasets[1].data.slice(0)
    //     },
    //     {
    //       type: 'line' ,
    //       label: Parameter4,
    //       borderColor: 'pink',
    //       borderWidth: 1,
    //       radius: 0,
    //       fill: false,
    //       data: chartdataTemperature.datasets[2].data.slice(0)
    //     },   
    //     {
    //       type: 'line' ,
    //       label: Parameter5,
    //       borderColor: 'brown',
    //       borderWidth: 1,
    //       radius: 0,
    //       fill: false,
    //       data:chartdataTemperature.datasets[3].data.slice(0)
    //     }]                     
    //    });
      
       
    //    setdataPressure({
    //      labels:  chartdataPressure.labels.slice(0),  
    //          datasets: [{
    //           type: 'line' ,
    //           label: Parameter0,
    //           borderColor: 'red',
    //           borderWidth: 1,
    //           lineTension: 0,      
    //           radius: 0,
    //           fill: false,
    //           data: chartdataPressure.datasets[0].data.slice(0)
    //         }          
    //         ]     
    //  });
     console.log("the first initiate")
  } 
  
  const updateDatasetPressureReset = () => { 
    
    //var prev = 15 - Math.random() * 10;
    var prev = 0;
    chartdataPressure.datasets[0].data = [];
    chartdataPressure.labels =[];
    chartdataPressure.labels.push(labelsIndex++);
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev}); 
   
    
    chartdataPressure.datasets[0].fill = true;
   
    //setdataPressure(chartdataPressure);
  }
  const updateTemperatureFinallyReset = () => { 
     
    
    var prev = 0;
    var prev1 = 0;
    var prev2 = 0;
    var prev3 = 0;
    var prev4 = 0;
 
    chartdataTemperature.labels = [];
    chartdataTemperature.datasets[0].data =[];
    chartdataTemperature.datasets[1].data =[];
    chartdataTemperature.datasets[2].data =[];
    chartdataTemperature.datasets[3].data =[];
    chartdataTemperature.datasets[4].data =[];
 
    chartdataTemperature.labels.push(labelsIndex++);
    chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:prev});
    chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:prev1});
    chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:prev2});
    chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:prev3});
    chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:prev4});
   
    chartdataTemperature.datasets[0].fill = true;
    chartdataTemperature.datasets[1].fill = true;
    chartdataTemperature.datasets[2].fill = true;
    chartdataTemperature.datasets[3].fill = true;
    chartdataTemperature.datasets[4].fill = true;
  
}
const InitateUpdateRawDataOnClick = ()=>
   {   
    var prev = 15 - Math.random() * 10;
    var prev1 = 25 - Math.random() * 10;
    var prev2 = 35 - Math.random() * 10;
    var prev3 = 45 - Math.random() * 10;
    var prev4 = 5 - Math.random() * 10;

    chartdataPressure.labels.push(labelsIndex++); 
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev});   
    chartdataPressure.datasets[0].fill = true;
    chartdataPressure.datasets[0].lineTension = 0.2;

    chartdataTemperature.labels.push(labelsIndex);
    chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:prev});
    chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:prev1});
    chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:prev2});
    chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:prev3});
    chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:prev4});
     prev = 15 - Math.random() * 10;
     prev1 = 25 - Math.random() * 10;
     prev2 = 35 - Math.random() * 10;
     prev3 = 45 - Math.random() * 10;
     prev4 = 5 - Math.random() * 10;

    chartdataPressure.labels.push(labelsIndex++); 
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev});   
    chartdataPressure.datasets[0].fill = true;
    chartdataPressure.datasets[0].lineTension = 0.2;

    chartdataTemperature.labels.push(labelsIndex);
    chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:prev});
    chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:prev1});
    chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:prev2});
    chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:prev3});
    chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:prev4});
    //  prev = 15 - Math.random() * 10;
    //  prev1 = 25 - Math.random() * 10;
    //  prev2 = 35 - Math.random() * 10;
    //  prev3 = 45 - Math.random() * 10;
    //  prev4 = 5 - Math.random() * 10;

    // chartdataPressure.labels.push(labelsIndex++); 
    // chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev});   
    // chartdataPressure.datasets[0].fill = true;
    // chartdataPressure.datasets[0].lineTension = 0.2;

    // chartdataTemperature.labels.push(labelsIndex);
    // chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:prev});
    // chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:prev1});
    // chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:prev2});
    // chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:prev3});
    // chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:prev4});
    //  prev = 15 - Math.random() * 10;
    //  prev1 = 25 - Math.random() * 10;
    //  prev2 = 35 - Math.random() * 10;
    //  prev3 = 45 - Math.random() * 10;
    //  prev4 = 5 - Math.random() * 10;

    // chartdataPressure.labels.push(labelsIndex++); 
    // chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev});   
    // chartdataPressure.datasets[0].fill = true;
    // chartdataPressure.datasets[0].lineTension = 0.2;

    // chartdataTemperature.labels.push(labelsIndex);
    // chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:prev});
    // chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:prev1});
    // chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:prev2});
    // chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:prev3});
    // chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:prev4});
   
    chartdataTemperature.datasets[0].fill = true;
    chartdataTemperature.datasets[1].fill = true;
    chartdataTemperature.datasets[2].fill = true;
    chartdataTemperature.datasets[3].fill = true;
    chartdataTemperature.datasets[4].fill = true;
    chartdataTemperature.datasets[0].lineTension = 0.2;
    chartdataTemperature.datasets[1].lineTension = 0.2;
    chartdataTemperature.datasets[2].lineTension = 0.2;
    chartdataTemperature.datasets[3].lineTension = 0.2;
    chartdataTemperature.datasets[4].lineTension = 0.2;
  
   
   }
  const UpdateByExternalAA = ()=> {
    FlagPrerun = !GetStepPauseFlag1(); 
    FlagStepOneStart = GetStepOneFlag1();
    FlagRecipeEnd = GetRecipeEnd1();      
    scan = FlagPrerun; 
   
   
    // console.log('1_FlagPrerun_' + FlagPrerun);
    // console.log('1_FlagStepOneStart_' + FlagStepOneStart);
    // console.log('1_FlagRecipeEnd_' + FlagRecipeEnd);
   
    if(FlagPrerun || FlagStepOneStart)
    {
      document.getElementById("UpdateBtn").style.backgroundColor='green';
      document.getElementById("UpdateBtn").style.color='white';
      document.getElementById("UpdateBtn").innerHTML = 'Running...';
      if( !RepeatRunning )
      {  
        //for final redraw
        InitateUpdateRawData(0,0,0,0,0,0);
        FinalchartOptionsFlag = false; 
        updateDatasetPressure2();     
        updateTemperature2();
        // for on run step
        updateDatasetPressureReset();
        updateTemperatureFinallyReset();
        if(FirstTimePreRun)
        {
            if(PreruntimeFlag == false )
            {
                Initiate(); 
                PreruntimeFlag = true;
            }
            FirstTimePreRun = false;    
        } 
         
         RepeatRunning = true;
      } 
    }
    else if(!FlagPrerun && !FlagStepOneStart)
    {
      document.getElementById("UpdateBtn").style.backgroundColor='white';
      document.getElementById("UpdateBtn").style.color='black';
      document.getElementById("UpdateBtn").innerHTML = 'idle'; 
      RepeatRunning = false;
    }
    // else if(!FlagPrerun && !FlagRecipeEnd && !FlagStepOneStart)
    // {
    //   document.getElementById("UpdateBtn").style.backgroundColor='white';
    //   document.getElementById("UpdateBtn").style.color='black';
    //   document.getElementById("UpdateBtn").innerHTML = 'idle'; 
    // }
   
   }; 
//    const UpdateChart1DataLabelByTotalProcessTimeBB = ()=>
//   {  
//     var TempDataLable = [];
//     chartdata00.labels = [];
//     chartdata00.datasets[0].data =[];
//   }  
//   const ResetDataAll = ()=>
//   {
   
//     chartdataTT ={};
//     data =[];
//     data1 =[];
//     data2 =[];
//     data3 =[];
//     data4 =[]; 
//     data5 =[]; 
    
//   }
  
  const UpdateAA = ()=>{
    document.getElementById('h1CHA').innerHTML =  'Chamber A_' + PortID;
    var ObjectTemp = UpdateChamberTableAAChart();
    var VararrHeaderstr =[];
    var Paravalue =0;
    var Paravalue11 =0;
    //var PressureParavalue =0.0;
    if(Object.keys(ObjectTemp).length !== 0)
    {    
        Object.entries(ObjectTemp).forEach(([key, value]) => {        
           
          if(key==='RecipeTotalProcessTime') 
          {
            TotalTimeProcessParavalueBB =  Math.floor(value);           
          }    
                 
      });
      
      var rowindex = ObjectTemp.Ch;
      
      //console.log(rowindex)
    }
    else{
      return; 
    } 
   
    Object.entries(ObjectTemp).forEach(([key, value]) => {        
     
      if(key==='Pressure') 
      PressureParavalue =  value;
      //console.log(' Pressure insert:'+ PressureParavalue);
      if(key==='TempTecAry') 
      Paravalue =  value;
      //console.log('insert:TempTecAry'+ Paravalue);
      if(key==='TempSraAry') 
      Paravalue11 =  value;
      if(key==='PortNumber') 
      PortNumber =  value;      
      if(key==='SlotID') 
      SlotID =  value; 
      //console.log(' TempSraAry insert:'+ Paravalue11);
    });
    setpointArray =[];
    actualTempArray =[];
    actualCurrentArray =[];
    for (const [key, value] of Object.entries(Paravalue)) {
           
          var temp = value;     
          setpointArray.push(temp.Setpoint);
          //console.log(' setpoint insert:'+ temp.Setpoint);     
          actualTempArray.push(temp.ActualOutput);
          //console.log('TempTecAry insert : '+ temp.ActualOutput);
          
      };
    TemperatureSetpoint = setpointArray[0];
    t1 = actualTempArray[0];
    t2 = actualTempArray[1];
    t3 = actualTempArray[2];
    t4 = actualTempArray[3];
    for (const [key, value] of Object.entries(Paravalue11)) {
            
        var temp = value;
        
          actualCurrentArray.push(temp.SCROutputCurrent);
          //console.log(' SCROutputCurrent insert:'+ temp.SCROutputCurrent);    
      };
      var port ='';
      if(PortNumber === 0) port ='?';
      else if(PortNumber === 1) port ='A';
      else if(PortNumber === 2) port ='B';
      if(port === '?')
      {
        PortID = '??';
      }
      else{
      PortID = port + SlotID.toString();
      }
  }  
 

  const InitateUpdateRawData = (pressure,sp,t1,t2,t3,t4)=>
   {
   
    delayBetweenPoints = totalDuration / lablesCount;
    //console.log('delayBetweenPoints 2'+delayBetweenPoints);   
    data =[];
    data1 =[];
    data2 = [];
    data3 =[];
    data4 = [];
    data5 = [];
    LabesTemp = [];
    labelsIndex = 0;
    for(var i=0;i<4;i++)
    {
      LabesTemp.push(labelsIndex++);     
      data5.push({x: labelsIndex, y:pressure});
      data.push({x: labelsIndex, y: sp});
      data1.push({x: labelsIndex, y: t1}); 
      data2.push({x: labelsIndex, y: t2});
      data3.push({x: labelsIndex, y: t3});
      data4.push({x: labelsIndex, y: t4}); 
    }
   
   }
 // const UpdateTemperature = (sparry,t1arry)=>
 const RecipeEndUpdate = () =>
 {
  //clearInterval(intervalID1); // stop recipe scan
  console.log('labelsIndex 2 ='+labelsIndex);
  console.log('intervalID1 ='+ intervalID1);
  FinalchartOptionsFlag = true;
  updateDatasetPressure2()
  updateTemperature2();
  ClearRecipeEnd1();
  
  InitateUpdateRawData(0,0,0,0,0,0); 
  //redrawTemp = false;
  //redrawPressure = false;
  finishedscan = true;
  RecipeRunning = false;
  finishedscan = false;
  PreruntimeFlag = false;
  FirstTimePreRun = true;
  //clearInterval(intervalID1); // stop recipe scan
  //UpdateChartRepeat(); // rescan
  labelsIndex = 0;
  console.log('End Recipe running !!!')
  //clearInterval(intervalID1); // stop recipe scan
//   FinalchartOptionsFlag = false;
//   options(FinalchartOptionsFlag);         
 }
  const UpdateChartDataParaAll = (pressure,sp,t1,t2,t3,t4)=> 
  {
      if(FlagRecipeEnd === false && FlagPrerun)  //scan = !FlagPrerun
      //if(FlagRecipeEnd === false)  //scan = !FlagPrerun
      {
            //console.log('labelsIndex 1 ='+labelsIndex);
            LabesTemp.push(labelsIndex++);
            data5.push({x: labelsIndex, y: pressure});
            data.push({x: labelsIndex, y: sp});
            data1.push({x: labelsIndex, y: t1}); 
            data2.push({x: labelsIndex, y: t2});
            data3.push({x: labelsIndex, y: t3});
            data4.push({x: labelsIndex, y: t4});
            // if(FlagStepOneStart)
            // {
            //   //delayBetweenPoints = totalDuration / data.length;
            //   if(PreruntimeFlag == false)
            //   {
            //       lablesCount = lablesCount + labelsIndex; 
            //       PreruntimeFlag = true;
            //   }
            // }
            if(data.length >lablesCount-1)
            {
                LabesTemp.shift();
                data5.shift();//pressure
                data.shift();//temp
                data1.shift();
                data2.shift();
                data3.shift();
                data4.shift();       
            }
        
       }
       else
       {
       
        if(FlagRecipeEnd && !FlagStepOneStart)
        {
            if(!finishedscan)
            {
              finishedscan = true;
              RecipeEndUpdate();
            }
         }
       }
   
} 
const UpdateRawDataOnRon = (pressure,sp,t1,t2,t3,t4)=>
   {   
   
    chartdataPressure.labels.push(labelsIndex); 
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:pressure});   
    chartdataPressure.datasets[0].fill = true;
    chartdataPressure.datasets[0].lineTension = 0.2;


    chartdataTemperature.labels.push(labelsIndex);
    chartdataTemperature.datasets[0].data.push({x:labelsIndex,y:sp});
    chartdataTemperature.datasets[1].data.push({x:labelsIndex,y:t1});
    chartdataTemperature.datasets[2].data.push({x:labelsIndex,y:t2});
    chartdataTemperature.datasets[3].data.push({x:labelsIndex,y:t3});
    chartdataTemperature.datasets[4].data.push({x:labelsIndex,y:t4});
    // chartdataTemperature.datasets[0].fill = true;
    // chartdataTemperature.datasets[1].fill = true;
    // chartdataTemperature.datasets[2].fill = true;
    // chartdataTemperature.datasets[3].fill = true;
    // chartdataTemperature.datasets[4].fill = true;
   
   }
// const UpdateChartDataParaAll2 = (pressure,sp,t1,t2,t3,t4)=> {
//     if(typeof(pressure) === 'undefined') return;
//       //if(FlagRecipeEnd === false && FlagStepOneStart)
//       if(FlagRecipeEnd === false && FlagPrerun)   
//       {
//          ////////////////////////////////////////////////final update
//             LabesTemp.push(labelsIndex++);
//             data5.push({x: labelsIndex, y: pressure});
//             data.push({x: labelsIndex, y: sp});
//             data1.push({x: labelsIndex, y: t1}); 
//             data2.push({x: labelsIndex, y: t2});
//             data3.push({x: labelsIndex, y: t3});
//             data4.push({x: labelsIndex, y: t4});
//             if(FlagStepOneStart)
//             {
//               //delayBetweenPoints = totalDuration / data.length;
//               if(PreruntimeFlag == false)
//               {
//                   lablesCount = lablesCount + labelsIndex; 
//                   PreruntimeFlag = true;
//               }
//             }
//             if(data.length >lablesCount-1)
//             {
//                 LabesTemp.shift();
//                 data5.shift();//pressure
//                 data.shift();//temp
//                 data1.shift();
//                 data2.shift();
//                 data3.shift();
//                 data4.shift();       
//             }
//         ////////////////////////////////////////////////on run step update
//         UpdateRawDataOnRon(pressure,sp,t1,t2,t3,t4);
        
//         setDataTemperature({
//             labels: chartdataTemperature.labels.slice(0),  
//             datasets: [{
//              type: 'line' ,
//              label: Parameter1,
//              borderColor: 'red',
//              borderWidth: 1,
//              radius: 0,
//              fill: false,
//              data: chartdataTemperature.datasets[0].data.slice(0)
//            },
//            {
//              type: 'line' ,
//              label: Parameter2,
//              borderColor: 'blue',
//              borderWidth: 1,
//              radius: 0,
//              fill: false,
//              data: chartdataTemperature.datasets[1].data.slice(0)
//            },
//            {
//             type: 'line' ,
//             label: Parameter3,
//             borderColor: 'grey',
//             borderWidth: 1,
//             radius: 0,
//             fill: false,
//             data:chartdataTemperature.datasets[1].data.slice(0)
//           },
//           {
//             type: 'line' ,
//             label: Parameter4,
//             borderColor: 'pink',
//             borderWidth: 1,
//             radius: 0,
//             fill: false,
//             data: chartdataTemperature.datasets[2].data.slice(0)
//           },   
//           {
//             type: 'line' ,
//             label: Parameter5,
//             borderColor: 'brown',
//             borderWidth: 1,
//             radius: 0,
//             fill: false,
//             data:chartdataTemperature.datasets[3].data.slice(0)
//           }]                     
//          });
        
         
//          setdataPressure({
//            labels:  chartdataPressure.labels.slice(0),  
//                datasets: [{
//                 type: 'line' ,
//                 label: Parameter0,
//                 borderColor: 'red',
//                 borderWidth: 1,
//                 lineTension: 0,      
//                 radius: 0,
//                 fill: false,
//                 data: chartdataPressure.datasets[0].data.slice(0)
//               }          
//               ]     
//          });
//        }
//        else{
//         if(FlagRecipeEnd && !FlagStepOneStart)
//         {
//             if(!finishedscan)
//             {
//               finishedscan = true;
//               RecipeEndUpdate();
//               ////// for next run step
//               updateDatasetPressureReset();           
//               updateTemperatureFinallyReset();
//               //////
//             }
//          }
       
    
//        }     

//   }
const UpdateChartDataParaAll22 = (pressure,sp,t1,t2,t3,t4)=> 
{
    if(FlagRecipeEnd === false && FlagPrerun)  //scan = !FlagPrerun    
    {
          //this is final update purose
          LabesTemp.push(labelsIndex++);
          data5.push({x: labelsIndex, y: pressure});
          data.push({x: labelsIndex, y: sp});
          data1.push({x: labelsIndex, y: t1}); 
          data2.push({x: labelsIndex, y: t2});
          data3.push({x: labelsIndex, y: t3});
          data4.push({x: labelsIndex, y: t4});
        //   if(FlagStepOneStart)
        //   {
        //     //delayBetweenPoints = totalDuration / data.length;
        //     if(PreruntimeFlag == false)
        //     {
        //         lablesCount = lablesCount + labelsIndex; 
        //         PreruntimeFlag = true;
        //     }
        //   }
          if(data.length >lablesCount-1)
          {
              LabesTemp.shift();
              data5.shift();//pressure
              data.shift();//temp
              data1.shift();
              data2.shift();
              data3.shift();
              data4.shift();       
          }
          //////////////////////////////////////////////onrun step///////////////////////
        //   FinalchartOptionsFlag = false;
        //   options(FinalchartOptionsFlag); 
        // if(PreruntimeFlag == false )
        // {
        //     Initiate(); 
        //     PreruntimeFlag = true;
        // }        
        UpdateRawDataOnRon(pressure,sp,t1,t2,t3,t4); 
        
          setDataTemperature({
            labels: chartdataTemperature.labels.slice(0),  
            datasets: [{
             type: 'line' ,
             label: Parameter1,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: chartdataTemperature.datasets[0].data.slice(0)
           },
           {
             type: 'line' ,
             label: Parameter2,
             borderColor: 'blue',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: chartdataTemperature.datasets[1].data.slice(0)
           },
           {
            type: 'line' ,
            label: Parameter3,
            borderColor: 'grey',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data:chartdataTemperature.datasets[1].data.slice(0)
          },
          {
            type: 'line' ,
            label: Parameter4,
            borderColor: 'pink',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data: chartdataTemperature.datasets[2].data.slice(0)
          },   
          {
            type: 'line' ,
            label: Parameter5,
            borderColor: 'brown',
            borderWidth: 1,
            radius: 0,
            fill: false,
            data:chartdataTemperature.datasets[3].data.slice(0)
          }]                     
         });
        
         
         setdataPressure({
           labels:  chartdataPressure.labels.slice(0),  
               datasets: [{
                type: 'line' ,
                label: Parameter0,
                borderColor: 'red',
                borderWidth: 1,
                lineTension: 0,      
                radius: 0,
                fill: false,
                data: chartdataPressure.datasets[0].data.slice(0)
              }          
              ]     
         });        
     }
     else
     {
     
      if(FlagRecipeEnd && !FlagStepOneStart)
      {
          if(!finishedscan)
          {
            finishedscan = true;
            RecipeEndUpdate();          
          }
       }
     }
 
} 
   
  useEffect(() => {
    chart();   
    chart0();
    options(FinalchartOptionsFlag);
  }, []);
 
 
  return (
    
    
     
    <div id ='CHA' className="wrapper223Chart2">
      <h1 id = 'h1CHA' >Chamber A_ {PortID}</h1>
      <div>
          <button id = 'UpdateBtn' onClick={onButtonClick3}>Update!</button> 
           
        {/* <Line data={DataTemperature} options={TempchartOptions} /> */}
        <Line data={DataTemperature} options={chartOptions} />   
        <Line data={dataPressure} options={chartOptions} />      
      </div>
    </div> 
    
 
 
  );
};

export default AppAA;
// export function  onConClickStart() 
// {
//   //onButtonClick3();
//   console.log('start here')
// }


   