
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react"; 
import {Chart as ChartJS} from 'chart.js/auto'
import {GetStepPauseFlag4,GetStepOneFlag4,GetRecipeEnd4,ClearRecipeEnd4} from './processing';
import {UpdateChamberTableDDChart} from './processing';
import './App.css';
var zero = 1;
var FlagStepPause1 =false;
var FlagFirstRun =false;
var scan = false;
var mod = 1;
var FlagPrerun =false;
var FirstTime = false;
var intervalID1 =0;
var RepeatRunning = false;
var speed = 250;
//var LoadCompleterd = false;
var FlagStepOneStart =false;
var FlagRecipeEnd =false;
var firstimeload = false;
var deltaIncrease = 0;
var Xindex =0;
var labelsIndex = 0;
var RealStart = false;
var redrawRF = false;
var redrawPressure = false;
var pressureValue = 0.0;
var LabesTemp = [];
var RFSetPoint = 0 ;
var RFActualValue = 0;
var DCSetPoint = 0 ;
var DCActualPowerValue = 0;
var actualCurrentArray =[];
var TotalTimeProcessParavalueBB = 0;
const ChamberName = "Chamber A";
var PortNumber = 0;
var PortID = '';
var SlotID =0;
var countTT = 0;
var countMM = 0;
var countPP = 0;
 
var chartdataRFRF = {};
var chartdataPP = {};
var chartdataMM = {};
var RFSetPoint =0;
var countSimulate=0;
var redrawDC = false; 
var RandomSimulate=0;
var RandomSimulate2=0;
var RandomSimulate3=0;
var RFActualValue =0;
var chartReference = {};
const Parameter0 = "Pressure";
const Parameter1 = "DC SetPoint";
const Parameter2 = "DC Actual Power";
const Parameter3 = "Gas SetPoint";
const Parameter4 = "Gas Actual Reading";
const Parameter5 = "Temp.";
const ParameterBlank = "123";
var lablesCount = 500;
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
      // </block:data>
      const totalDuration = 10000;
      var delayBetweenPoints = totalDuration / data.length;
      //console.log('delayBetweenPoints'+delayBetweenPoints);
      //const ctx = document.getElementById('mychart');
      const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
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
      
       
        const chartdataMFC = {        
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
           }
        ]            
        };
        const chartdataRF = {        
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
           }
        ]                    
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
        const chartdata55 = {        
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
           }]
                    
        };
        const chartdata33 = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter3,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data3,
           },
           {
             type: 'line' ,
             label: Parameter4,
             borderColor: 'blue',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data4,
           }]
                    
        };
        const chartdata44 = {        
          labels: DataLables,  
            datasets: [{
             type: 'line' ,
             label: Parameter3,
             borderColor: 'red',
             borderWidth: 1,
             radius: 0,
             fill: false,
             data: data3,
           },
           {
             type: 'line' ,
             label: Parameter4,
             borderColor: 'blue',
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
        legend: true
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
     
const AppDD = () => {  
  //const [state,setState] = useState(dataTemp55)
  const [DataRF, setDataRF] = useState(chartdataRF);
  const [chartOptions, setChartOptions] = useState(options00);
  const [dataPressure, setdataPressure] = useState(chartdataPressure); 
  const [dataMFC, setdataMFC] = useState({datasets:[]}); 
  const UpdateChartDataPara = ()=> {
    
    var intervalID8  = setInterval(function () {
       
        UpdateByExternalAA();    
      
        if( scan || redrawDC || redrawPressure) {       
          UpdateDD();        
         UpdateDCReading(DCSetPoint,DCActualPowerValue);  
         UpdatePressure(pressureValue); 
         
         
       }    
       
   }, 1000)
   };
 
   const UpdateChartDataRecipeRunning = ()=> {
    
    intervalID1  = setInterval(function () {
       
        UpdateByExternalAA();    
      
        if( scan || redrawDC || redrawPressure) {       
         UpdateDD();      
         UpdateChartDataParaAll(pressureValue,DCSetPoint,DCActualPowerValue);       
       }    
       
   }, 1000)
   };
   const UpdateChartDataRecipeRunning2 = ()=> {
    
    var intervalID1  = setInterval(function () {
       
        UpdateByExternalAA();    
      
        if( scan || redrawRF || redrawPressure) {       
         UpdateDD();      
         UpdateChartDataParaAll2(pressureValue,DCSetPoint,DCActualPowerValue);
      
       }    
       
   }, 1000)
   };
   
   const InitateUpdateRawData = (pressure,DCSp,DCvalue)=>
   {
    //console.log('lablesCount='+lablesCount);
    initiChardData(50,55,75,885,95,-105,lablesCount);
    initi(lablesCount); 
    delayBetweenPoints = totalDuration / lablesCount;
    console.log('delayBetweenPoints 2'+delayBetweenPoints);   
    data5 =[];
    data1 =[];
    data2 = [];
    LabesTemp = [];
    labelsIndex = 0;
    LabesTemp.push(labelsIndex++);
    data5.push({x:labelsIndex,y:pressure});  
    data1.push({x:labelsIndex,y:DCSp});
    data2.push({x:labelsIndex,y:DCvalue});
   
   }
   const UpdateChartDataParaAll = (pressure,DCSp,DCvalue)=> {
    if(typeof(pressure) === 'undefined') return;

      if(FlagRecipeEnd === false && FlagStepOneStart)
      {
        LabesTemp.push(labelsIndex++);
        data5.push({x:labelsIndex,y:pressure});  
        data1.push({x:labelsIndex,y:DCSp});
        data2.push({x:labelsIndex,y:DCvalue});
       
        if(data5.length >lablesCount)
        {
          LabesTemp.shift();
          data5.shift();
          data1.shift();
          data2.shift();         
          //updateDatasetPressure2();
          //updateRFFinally2();
        }
       }
       else{
        if(redrawPressure === true && !FlagStepOneStart && FlagRecipeEnd)//     FlagStartPlayAA) 
        {
          
          updateDatasetPressure2();
          updateRFFinally2();
          ClearRecipeEnd4();
          redrawPressure = false;
          redrawDC = false;
       
          InitateUpdateRawData(0,0,0);
        }        

       }     
   // }
  }
  const UpdateChartDataParaAll2 = (pressure,DCSp,DCvalue)=> {
    if(typeof(pressure) === 'undefined') return;
      if(FlagRecipeEnd === false && FlagStepOneStart)
    { 
        LabesTemp.push(labelsIndex++);
        data5.push({x:labelsIndex,y:pressure});  
        data1.push({x:labelsIndex,y:DCSp});
        data2.push({x:labelsIndex,y:DCvalue});
       
        if(data5.length >lablesCount)
        {
          LabesTemp.shift();
          data5.shift();
          data1.shift();
          data2.shift();
        }
        ////////////////////////////////////////////////
        UpdateRawDataOnRon(pressure,DCSp,DCvalue);
        //DataLables = chartdataRF.labels.slice(0);
        //data = chartdataRF.datasets[0].data.slice(0);
        //data1 = chartdataRF.datasets[1].data.slice(0);
        setDataRF({
          labels: chartdataRF.labels.slice(0),  
          datasets: [{
           type: 'line' ,
           label: Parameter1,
           borderColor: 'red',
           borderWidth: 1,
           radius: 0,
           fill: false,
           data: chartdataRF.datasets[0].data.slice(0)
         },
         {
           type: 'line' ,
           label: Parameter2,
           borderColor: 'blue',
           borderWidth: 1,
           radius: 0,
           fill: false,
           data: chartdataRF.datasets[1].data.slice(0)
         }]});
         //DataLables = chartdataPressure.labels.slice(0);
         //data5 =  chartdataPressure.datasets[0].data.slice(0);
         setdataPressure({
           labels: chartdataPressure.labels.slice(0),  
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
       else{
          if(redrawPressure === true && !FlagStepOneStart && FlagRecipeEnd)//     FlagStartPlayAA) 
          {
            updateDatasetPressure2();
            updateRFFinally2();
            ClearRecipeEnd4();
            redrawPressure = false;
            redrawRF = false; 
            InitateUpdateRawData(0,0,0);
            updateDatasetPressureReset();           
            updateRFFinallyReset();
          }
       }     

  }
const UpdateChartDataParaAll22 = (pressure,DCSp,DCvalue)=> {
    if(typeof(pressure) === 'undefined') return;     
   
      if(FlagRecipeEnd === false && FlagStepOneStart)
      {
        LabesTemp.push(labelsIndex++);
        data5.push({x:labelsIndex,y:pressure});  
        data1.push({x:labelsIndex,y:DCSp});
        data2.push({x:labelsIndex,y:DCvalue});
       
        if(data5.length >lablesCount)
        {
          LabesTemp.shift();
          data5.shift();
          data1.shift();
          data2.shift();
          //updateDatasetPressure2();
          //updateRFFinally2();
        }
       }
       else{
        if(redrawPressure === true && !FlagStepOneStart && FlagRecipeEnd)//     FlagStartPlayAA) 
        {
          
          updateDatasetPressure2();
          updateRFFinally2();
          ClearRecipeEnd4();
          redrawPressure = false;
          redrawDC = false;  
          //FirstTime = false;        
          //TotalTimeProcessParavalueBB = 0;   
          InitateUpdateRawData(0,0,0);       
        }        

       }     
   // }
  }
   const UpdateChartDataPara3 = ()=> {
    //UpdateByExternalAA();
    RandomSimulate += 5 - Math.random() * 10;
    RandomSimulate2 += 5 - Math.random() * 10;
    RandomSimulate3 += 5 - Math.random() * 10;
    if(!FirstTime)
    { 
       var max = 30;
       var min = 15;
       var lablesCountTemp = Math.floor(Math.random() * max ) + min;
       initiChardData(50,55,75,885,95,-105,lablesCountTemp);
       initi(lablesCount); 
       delayBetweenPoints = totalDuration / lablesCount;
       console.log(delayBetweenPoints);
       //updateRFFinally()
       data5 =[];
       data1 =[];
       data2 = [];
       LabesTemp = [];
       data5.push(RandomSimulate);
       data1.push(RandomSimulate2);
       data2.push(RandomSimulate3);
       LabesTemp.push(countSimulate++);
       updateDatasetPressure2();
       updateRFFinally2();
       FirstTime = true;
    }
    else
    {
      data5.push(RandomSimulate);
      data1.push(RandomSimulate2);
      data2.push(RandomSimulate3);
      LabesTemp.push(countSimulate++);
      if(data5.length >lablesCount)
      {
        LabesTemp.shift();
        data5.shift();
        data1.shift();
        data2.shift();
        updateDatasetPressure2();
        updateRFFinally2();
        redrawRF = false;
        redrawPressure = false; 
      }    
    }
  };
  const chart0 = () => {
    setdataPressure(chartdataPressure); 
  };
  const chart1 = () => {
    setDataRF(chartdataRF);// RF power
  }; 
  const chart2 = () =>
  {
    setdataMFC(chartdata33);
  }
  const options = () => {
    setChartOptions(options00);
  };
  
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
 
  const UpdateChartinstantRF = (mode)  =>
   {
    if(mode === 0)
    {
      //chartdataRF = {};
      chartdataRFRF ={};
      chartdataRFRF = chartdata11;
    }
    else if(mode === 1)
    {
      //chartdataRF = {};
      chartdataRFRF = {};
      chartdataRFRF = chartdata22;
    }
    
    //else if(mode === 2)
    //{
      // chartdataRFRF = {};
      // chartdataRFRF = chartdata11;

    //}
     
    //  if (Object.keys(chartdataRFRF).length === 0)
    //  {   
      
    //   chartdataRFRF = chartdata11;
    //  }

  }
  const UpdateChartinstant = (mode)  =>
  {
    if(mode === 0)
    {
      chartdataMM = {};
      chartdataMM = chartdata33;
    }
    else if(mode === 1)
    {
      chartdataMM = {};
      chartdataMM = chartdata11;
    }
    //else if(mode === 2)
    //{
      // chartdataMM = {};
      // chartdataMM = chartdataRF;

    //}

  }
  const UpdateChartinstantPressure = (mode)  =>
  {
    if(mode === 0)
    {
      chartdataPP = {};  
      chartdataPP = chartdata55;
    }
    else if(mode === 1)
    {
      chartdataPP = {};
      chartdataPP = chartdata66;
    }
    // if(Object.keys(chartdataPP).length=== 0)
    // {   
    //     chartdataPP = chartdataPressure;
    // }
    
  }
  
  const updateRFFinally = () => { 
//     data1.forEach(v => {     
//       console.log(`${v.x}: x`);
//       console.log(`${v.y}: y`);
//   });
//   data2.forEach(v => {     
//     console.log(`${v.x}: x`);
//     console.log(`${v.y}: y`);
// });
    //UpdateChartDataToClear();

    countTT++;
    var mod = countTT  % 2;
    //console.log('mod=============>'+mod.toString())
   

      UpdateChartinstantRF(mod);
      initi(data.length);
      // chartdataRFRF.datasets[0].data.splice(0, chartdataRFRF.datasets[0].data.length);
      // chartdataRFRF.datasets[1].data.splice(0, chartdataRFRF.datasets[1].data.length);
      chartdataRFRF.datasets[0].data =[];
      chartdataRFRF.datasets[1].data =[];
      chartdataRFRF.datasets[0].data = data1.slice(0);
      chartdataRFRF.datasets[1].data = data2.slice(0); 


      chartdataRFRF.datasets[0].label = Parameter1 +'_'+ mod.toString();
      chartdataRFRF.datasets[1].label = Parameter2 +'_'+ mod.toString();



      chartdataRFRF.datasets[0].fill = true;  
      //chartdataRFRF.datasets[1].fill = false; 
      //chartdataRFRF.datasets[0].borderColor = 'red'; 
      //chartdataRFRF.datasets[1].borderColor = 'green'; 
      chartdataRFRF.labels = DataLables;    
      setDataRF(chartdataRFRF);
  }
  const updateMFCFinally = () => { 
   
    
        countMM++;
        var mod = countMM  % 2;
        //console.log('mod'+mod.toString())
       
    
          UpdateChartinstantMFC(mod);
          initi(data.length);
          chartdataMM.datasets[0].data.splice(0, chartdataMM.datasets[0].data.length);
          chartdataMM.datasets[1].data.splice(0, chartdataMM.datasets[1].data.length);
    
          chartdataMM.datasets[0].data = data3.slice(0);
          chartdataMM.datasets[1].data = data4.slice(0); 
    
    
          chartdataMM.datasets[0].label = Parameter3 +'_'+ mod.toString();
          chartdataMM.datasets[1].label = Parameter4 +'_'+ mod.toString();
    
    
    
          chartdataMM.datasets[0].fill = true;  
          //chartdataMM.datasets[1].fill = false; 
          //chartdataMM.datasets[0].borderColor = 'red'; 
          //chartdataMM.datasets[1].borderColor = 'green'; 
          chartdataMM.labels = DataLables;    
          setdataMFC(chartdataMM);
      }
  const UpdateChartinstantMFC = (mode)  =>
  {
    //  if(Object.keys(chartdataMM).length === 0)
    //  {   
    //   chartdataMM = {};
    //   chartdataMM = chartdataMFC;
    //  }
     if(mode === 0)
     {
      chartdataMM = {};  
      chartdataMM = chartdata33;
     }
     else if(mode === 1)
     {
      chartdataMM = {};
      chartdataMM = chartdata44;
     }

  } 



  const updateDatasetPressure = () => { 
    // data5.forEach(v => {     
    //       console.log(`${v.x}: x`);
    //       console.log(`${v.y}: y`);
    //   });
   
    countPP++;
    var mod = countPP  % 2;
    //console.log('mod'+mod.toString())
   
   
    UpdateChartinstantPressure(mod);
    initi(data.length);
    //chartdataPP.datasets[0].data.splice(0, chartdataPP.datasets[0].data.length);
    chartdataPP.datasets[0].data = [];
    chartdataPP.datasets[0].data = data5.slice(0);
    chartdataPP.datasets[0].label = Parameter0 +'_'+ mod.toString();
    chartdataPP.datasets[0].fill = true;
    chartdataPP.labels = DataLables;    
    setdataPressure(chartdataPP);
  }
  const updateMFCFinally2 = () => {
    countMM++;
    var mod = countMM  % 2;
    //console.log('mod'+mod.toString())
   

      UpdateChartinstantMFC(mod);
      initi(data.length);

      chartdataMM.labels = LabesTemp;
      chartdataMM.datasets[0].data =[];
      chartdataMM.datasets[1].data =[];
      chartdataMM.datasets[0].data = data3.slice(0);
      chartdataMM.datasets[1].data = data4.slice(0); 
      chartdataMM.datasets[0].label = Parameter1 +'_'+ mod.toString();
      chartdataMM.datasets[1].label = Parameter2 +'_'+ mod.toString();
      chartdataMM.datasets[0].fill = true;
      setdataMFC(chartdataMM);


  }
  const updateRFFinally2 = () => { 
       if(data1.length === 0) return;
        countTT++;
        var mod = countTT  % 2;
        //console.log('mod ===>'+mod.toString())
        UpdateChartinstantRF(mod);
        
        chartdataRFRF.labels = LabesTemp;
        chartdataRFRF.datasets[0].data =[];
        chartdataRFRF.datasets[1].data =[];
        chartdataRFRF.datasets[0].data = data1.slice(0);
        chartdataRFRF.datasets[1].data = data2.slice(0); 
        chartdataRFRF.datasets[0].label = Parameter1 +'_'+ mod.toString();
        chartdataRFRF.datasets[1].label = Parameter2 +'_'+ mod.toString();
        chartdataRFRF.datasets[0].fill = true;
        setDataRF(chartdataRFRF);
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
  const updateRFFinallyReset = () => { 
     
      // var prev = 15 - Math.random() * 10;
      // var prev1 = 25 - Math.random() * 10;
      var prev = 0;
      var prev1 = 0;
      chartdataRF.labels = [];
      chartdataRF.datasets[0].data =[];
      chartdataRF.datasets[1].data =[];
      chartdataRF.labels.push(labelsIndex++);
      chartdataRF.datasets[0].data.push({x:labelsIndex,y:prev});
      chartdataRF.datasets[1].data.push({x:labelsIndex,y:prev1});
     
      chartdataRF.datasets[0].fill = true;
    
}
const InitateUpdateRawDataOnClick = ()=>
   {   
    var prev = 15 - Math.random() * 10;
    var prev1 = 25 - Math.random() * 10;
    var prev2 = 35 - Math.random() * 10;

    chartdataPressure.labels.push(labelsIndex++); 
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:prev});   
    chartdataPressure.datasets[0].fill = true;
    chartdataPressure.datasets[0].lineTension = 0.2;

    chartdataRF.labels.push(labelsIndex);   
    chartdataRF.datasets[0].data.push({x:labelsIndex,y:prev1}); 
    chartdataRF.datasets[1].data.push({x:labelsIndex,y:prev2});  
 
    chartdataRF.datasets[0].fill = true;
    chartdataRF.datasets[0].lineTension = 0.2;
    chartdataRF.datasets[1].lineTension = 0.2;
   
   }
   const UpdateRawDataOnRon = (pressure,DCSp,DCvalue)=>
   {   
    // var prev = 15 - Math.random() * 10;
    // var prev1 = 25 - Math.random() * 10;
    // var prev2 = 35 - Math.random() * 10;

    chartdataPressure.labels.push(labelsIndex); 
    chartdataPressure.datasets[0].data.push({x:labelsIndex,y:pressure});   
    chartdataPressure.datasets[0].fill = true;
    chartdataPressure.datasets[0].lineTension = 0.2;

    chartdataRF.labels.push(labelsIndex);   
    chartdataRF.datasets[0].data.push({x:labelsIndex,y:DCSp}); 
    chartdataRF.datasets[1].data.push({x:labelsIndex,y:DCvalue});  
 
    chartdataRF.datasets[0].fill = true;
    chartdataRF.datasets[0].lineTension = 0.2;
    chartdataRF.datasets[1].lineTension = 0.2;
   
   }
  const updateDatasetPressure2 = () => { 
    if(data5.length === 0) return;
    countPP++;
    var mod = countPP  % 2;
    //console.log('mod'+mod.toString())
   
   
    UpdateChartinstantPressure(mod);
    

    chartdataPP.labels = LabesTemp;
    chartdataPP.datasets[0].data = [];
    chartdataPP.datasets[0].data = data5.slice(0);
    chartdataPP.datasets[0].label = Parameter0 +'_'+ mod.toString();
    chartdataPP.datasets[0].fill = true;
   
    setdataPressure(chartdataPP);
  }
  const onButtonClick = () => {
    if(!FirstTime)
    {
      
      InitateUpdateRawData(0,0,0);
      updateDatasetPressure2();
      updateRFFinally2();
       
       document.getElementById("UpdateBtn4").innerHTML = 'idle';
       FirstTime = true;
    }
   
    clearInterval(intervalID1); 
  
    UpdateChartDataRecipeRunning();   
    labelsIndex = 0;   
    console.log("click the first")
  };
  const onButtonClick3 = () => {
    if(!FirstTime)
    {
      labelsIndex = 0;
     //InitateUpdateRawData(0,0,0);
     updateDatasetPressureReset();
      DataLables = chartdataPressure.labels.slice(0);
      data5 =  chartdataPressure.datasets[0].data.slice(0);
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
    })
    updateRFFinallyReset();
      DataLables = chartdataRF.labels.slice(0);
      data = chartdataRF.datasets[0].data.slice(0);
      data1 = chartdataRF.datasets[1].data.slice(0);
      setDataRF({
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
       }
    ]});
       document.getElementById("UpdateBtn4").innerHTML = 'idle';
       FirstTime = true;
       //UpdateChartDataRecipeRunning();   
       
       console.log("click the first")
    }
    else{
      InitateUpdateRawDataOnClick();
        DataLables = chartdataRF.labels.slice(0);
        data = chartdataRF.datasets[0].data.slice(0);
        data1 = chartdataRF.datasets[1].data.slice(0);
        setDataRF({
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
         }]});
         DataLables = chartdataPressure.labels.slice(0);
         data5 =  chartdataPressure.datasets[0].data.slice(0);
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
       
        UpdateChartDataRecipeRunning2();   
       
        console.log("click the second")
    }
  };
  const onButtonClick5 = () => {
    if(!FirstTime)
    {
      labelsIndex = 0;
     //InitateUpdateRawData(0,0,0);
     updateDatasetPressureReset();
      DataLables = chartdataPressure.labels.slice(0);
      data5 =  chartdataPressure.datasets[0].data.slice(0);
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
    })
    updateRFFinallyReset();
      DataLables = chartdataRF.labels.slice(0);
      data = chartdataRF.datasets[0].data.slice(0);
      data1 = chartdataRF.datasets[1].data.slice(0);
      setDataRF({
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
       }
    ]});
       document.getElementById("UpdateBtn2").innerHTML = 'idle';
       FirstTime = true;
       //UpdateChartDataRecipeRunning();   
       
       //console.log("click the first")
    
    
      //InitateUpdateRawDataOnClick();
        DataLables = chartdataRF.labels.slice(0);
        data = chartdataRF.datasets[0].data.slice(0);
        data1 = chartdataRF.datasets[1].data.slice(0);
        setDataRF({
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
         }]});
         DataLables = chartdataPressure.labels.slice(0);
         data5 =  chartdataPressure.datasets[0].data.slice(0);
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
       
        UpdateChartDataRecipeRunning2();   
       
        console.log("click the second")
    }
  };
  const UpdateByExternalAA = ()=> {
    FlagStepPause1 = GetStepPauseFlag4(); 
    FlagStepOneStart = GetStepOneFlag4();
    FlagRecipeEnd = GetRecipeEnd4();
    scan = !FlagRecipeEnd;
    FlagPrerun =!FlagStepPause1;
      
    if(FlagPrerun || FlagStepOneStart)
    {
      document.getElementById("UpdateBtn4").style.backgroundColor='green';
      document.getElementById("UpdateBtn4").style.color='white';
      document.getElementById("UpdateBtn4").innerHTML = 'Running...';
      if( !RepeatRunning )
      {  
        
         InitateUpdateRawData(0,0,0);
         updateDatasetPressure2();
         updateRFFinally2();
         RepeatRunning = true;
      } 
    }
    else if(!FlagPrerun && !FlagRecipeEnd && !FlagStepOneStart)
    {
      document.getElementById("UpdateBtn4").style.backgroundColor='white';
      document.getElementById("UpdateBtn4").style.color='black';
      document.getElementById("UpdateBtn4").innerHTML = 'idle'; 
      RepeatRunning = false;
    }  
   }; 
  
  const UpdateDD = ()=>{
    document.getElementById('h1CHD').innerHTML =  'Chamber D_' + PortID;
    var ObjectTemp = UpdateChamberTableDDChart();
    var VararrHeaderstr =[];
    //RFSetPoint =0;
    //RFActualValue =0;
    var PressureParavalue =0.0;
    if(Object.keys(ObjectTemp).length !== 0)
    {    
        Object.entries(ObjectTemp).forEach(([key, value]) => {        
          // if(key==='RFPowerSetPoint') 
          // Paravalue =  value;   
         
          if(key==='RecipeTotalProcessTime') 
          {
            
            if(TotalTimeProcessParavalueBB === 0)
            {
              TotalTimeProcessParavalueBB =  Math.floor(value);
              lablesCount = TotalTimeProcessParavalueBB;
              Xindex = 0;
              TotalTimeProcessParavalueBB = 0;  
              
              redrawRF = true;  
              redrawPressure = true;
            }                 
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
      pressureValue =  value;      
      if(key==='RFPowerSetPoint') 
      RFSetPoint =  value;
      if(key==='DCPowerSetPoint') 
      DCSetPoint =  value;
      //console.log('insert:RFPowerSetPoint_'+ RFSetPoint);
      if(key==='DCPowerActualPower') 
      DCActualPowerValue =  value;
      if(key==='PortNumber') 
      PortNumber =  value;      
      if(key==='SlotID') 
      SlotID =  value; 
      //console.log(' RFPowerForwardPower insert:_'+ RFActualValue);
     
      //console.log(' Pressure insert:_'+ PressureParavalue);
    });
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

  
  
  const UpdatePressure = (pressureValue)=>{
      if(typeof(pressureValue) === 'undefined') return;    
    
      if(FlagRecipeEnd === false && FlagStepOneStart)
      { 
          data5.push({x: Xindex, y: pressureValue});    
          var temp  =  chartdataPressure.labels.slice(-1);  
          var zero = 0;
          if(Object.assign(temp).length !== 0)
          {
           zero =  parseInt(temp[0]);
          }
          zero++;    
          //dataTempLables.push(zero.toString());   // add the last one  
          chartdataPP.labels.push(zero.toString());
          chartdataPP.datasets[0].data.push({x: zero, y: pressureValue});
          
          if(  chartdataPP.labels.length>500)
          {
            chartdataPP.labels.shift();
            chartdataPP.datasets[0].data.shift();
            
          }
          //data2.push({x: Xindex, y: rf});      
          //labelsIndex++;   
          setdataPressure(chartdataPP);
      }
      else
      {
          //console.log("duration end [ms] = " + timespan.toString());
          
          if(redrawPressure === true && !FlagStepOneStart && FlagRecipeEnd)//     FlagStartPlayAA) 
          {
            
            updateDatasetPressure();
            ClearRecipeEnd4();
            redrawPressure = false;
            TotalTimeProcessParavalueBB = 0;          
          }
      }
  } 
 const UpdateDCReading = (sp,dc)=>
  {

    if(typeof(sp) === 'undefined') return;    
    
      if(FlagRecipeEnd === false && FlagStepOneStart)
      {   
         
          //if(PressureParavalue.length === 4 && t1arry.length ===4)
          
            console.log(' DC Setpoint : = '+ sp.toString());
          
            data1.push({x: Xindex, y: sp});
            data2.push({x: Xindex, y: dc});      
            Xindex++;   // no need  
                  
      }
      else
      {
          //console.log("duration end [ms] = " + timespan.toString());
          
          if(redrawDC === true && !FlagStepOneStart && FlagRecipeEnd)//     FlagStartPlayAA) 
          {
            
            //updateDCFinally();
            updateRFFinally2()
           // ClearRecipeEnd1();
           // redrawPressure = false;
            redrawDC = false;
            //TotalTimeProcessParavalueBB = 0;          
          }
      }
  }
  
  useEffect(() => {
    setdataPressure(chartdataPressure); 
    setDataRF(chartdataRF);// RF power
    //chart2();
    setChartOptions(options00);
  },[] );
   
  return (
    <div id ='CHD' className="wrapper223Chart2">
      <h1 id = 'h1CHD' >Chamber D_ {PortID}</h1>
      <div>
      <button id = 'UpdateBtn4' onClick={onButtonClick5}>Update!</button> 
        <Line data={DataRF} options={options00} />   
        <Line data={dataPressure} options={options00}  />      
        {/* <Line data={dataMFC} options={options00}  />       */}
      </div>
    </div>
  );
};

export default AppDD;