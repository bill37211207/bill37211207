//import React from 'react'; 
import Processdata from "./ChamberProcessData.json"
import AppAA from "./AppAATT.js"
import AppBB from "./AppBBTT.js"
import AppCC from "./AppCCTT.js"
import AppDD from "./AppDDTT.js"
import AppEE from "./AppEETT.js"
import AppFF from "./AppFFTT.js"
//import {TestTable,GetDrawData} from './TestTable.js';
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'
import { isConstructorDeclaration } from "typescript";
//import ChartPara from "./ChartParameter";
//import {onClickStart} from  '../../src/AppAA.js'; //"./AppAA.js"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
var newdata2 = 0;
var newdataTemp = 0;
var newdataTemp2 =0;
var intervalID1;
var intervalID2;
var intervalID3;
var intervalID4;
var intervalID5;
var intervalID6;
var intervalID7;
var intervalID8;


// var newdataTemp =0;
// var newdataTemp2 =0;
// var newdataTemp3 =0;
// var newdataTemp4 =0;
// var newdataTemp5 =0;
// var newdataTemp6 =0;
var isStepOneStart1 = false;
var isStepOneStart2 = false;
var isStepOneStart3 = false;
var isStepOneStart4 = false;
var isStepOneStart5 = false;
var isStepOneStart6 = false;
var isPaused1 = false;
var isPaused2 = false;
var isPaused3 = false;
var isPaused4 = false;
var isPaused5 = false;
var isPaused6 = false;

var isRecipeEnd1 = false;
var isRecipeEnd2 = false;
var isRecipeEnd3 = false;
var isRecipeEnd4 = false;
var isRecipeEnd5 = false;
var isRecipeEnd6 = false;
//var ChamberObject = {};

var ChamberObjectAAChart ={};
var ChamberObjectBBChart ={};
var ChamberObjectCCChart ={};
var ChamberObjectDDChart ={}; 
var ChamberObjectEEChart ={};
var ChamberObjectFFChart ={};
var ChamberObjectAA =  {};
var ChamberObjectBB = {};
var ChamberObjectCC =  {};
var ChamberObjectDD = {};
var ChamberObjectEE =  {};
var ChamberObjectFF =  {};
//var blinking_rows = []; //array to store rows that must blink
var Flash = false;
var FlagPrerun = false; 
var FlagStepOneStart = false;
// var ChamberAObject = new Object();
// var ChamberBObject = new Object();
// var ChamberCObject = new Object();
// var ChamberDObject = new Object();
// var ChamberEObject = new Object();
// var ChamberFObject = new Object();
const ChScrTempSvidTargetData = { Ch:"A",Wafer_ID: "_:_", PortNumber: 1,SlotID:1,Chamber_type: "MBD" ,Recipe_Name : "Recipe_MDB",Step_Name: "Step Purge",StepProcessTime:12,StepTotalProcessTime:2.0,
RecipeProcessTime:45.5,RecipeTotalProcessTime:45.5,Pressure :5E-5,Gas1:300,Gas2:100,DC_power_Sp_Actual_W:"600:598",RF_power_Sp_FW_Rel_W:"500:489:22",Temperature_1_2_3_4_C:"20:20/20:20/20:20/20:20",
UpdateNumber:12345};
 
const ChSCRObjCopyAA = {...ChScrTempSvidTargetData};
const ChSCRObjCopyFF = {...ChScrTempSvidTargetData};
var DCRFSourceSVIDData = { DCPowerSetPoint:0,DCPowerActualPower: 0.0, DCPowerActuaCurrent: 0.0,DCPowerActuaVoltage:0.0,RFPowerSetPoint: 0 ,RFPowerForwardPower :556.0,RFPowerReflectedPower:5.0,RFDCBias: 0.0,RFPowerLoadCapacitor:0.0,RFPowerTuneCapacitor:0.0,Ch:"2",
Recipe:"New_New LTETCH Recipe",Step:"Step3",StepProcessTime:8.94,StepTotalProcessTime:15.0,RecipeProcessTime:25.944,RecipeTotalProcessTime:38.0,LotID:"2A-LX1458677.00_A_02",UpdateNumber:3,PortNumber:1,SlotID:2,Seqence:"ATM_Cycle_B_C_Test",Pressure:1E-06,forelinePressure:0.01}

var ChSCRObj = {LampLife1:145.113,LampLife2:145.113,LampLife3:145.113,LampLife4:145.113,Current_Step:1,Total_Step:2}
var TempTecAry = [{Setpoint:110,ActualOutput:89.0,Initialized:false,HandshakingOK:false,Enabled:false},
  {Setpoint:110,ActualOutput:92.0,Initialized:false,HandshakingOK:false,Enabled:false},
  {Setpoint:110,ActualOutput:89.0,Initialized:false,HandshakingOK:false,Enabled:false},
  {Setpoint:110,ActualOutput:92.0,Initialized:false,HandshakingOK:false,Enabled:false}];
 var TempSraAry =[
  {SCROnStatus:true,SCRMinimumOutputPowerPercentge:0,SCROutputCurrent:0.0,SCRUnderloadPercentage:0,SCROutputPowerPercentageSetpoint:0,SCROutputPowerPercentage:0,Initialized:false,HandshakingOK:false,Enabled:false},
  {SCROnStatus:true,SCRMinimumOutputPowerPercentge:0,SCROutputCurrent:0.0,SCRUnderloadPercentage:0,SCROutputPowerPercentageSetpoint:0,SCROutputPowerPercentage:0,Initialized:false,HandshakingOK:false,Enabled:false},
  {SCROnStatus:true,SCRMinimumOutputPowerPercentge:0,SCROutputCurrent:0.0,SCRUnderloadPercentage:0,SCROutputPowerPercentageSetpoint:0,SCROutputPowerPercentage:0,Initialized:false,HandshakingOK:false,Enabled:false},
  {SCROnStatus:true,SCRMinimumOutputPowerPercentge:0,SCROutputCurrent:0.0,SCRUnderloadPercentage:0,SCROutputPowerPercentageSetpoint:0,SCROutputPowerPercentage:0,Initialized:false,HandshakingOK:false,Enabled:false}];
  var ChSCRObj2 = {Ch:"1",Recipe:"ShortServer Mini-Batch Degas Recipe",Step:"Step",StepProcessTime:7.25,StepTotalProcessTime:20.0,RecipeProcessTime:7.25,RecipeTotalProcessTime:21.0,LotID:"2A-LX1458677.00_A_01",UpdateNumber:46,PortNumber:1,SlotID:1,
  Seqence:"Cycle_Test_A_only",Pressure:3E-07,forelinePressure:0.01};
  var SCRSVIDData = {...ChSCRObj,...TempTecAry,...TempSraAry,...ChSCRObj2};

var ws = new WebSocket('ws://127.0.0.1:80/Echo')
// window.onload = function() {       
//   setTimeout(function(){
//     onButtonClick();
//   },5000); 
// }
const Processing = ({onClickStart}) =>{
// const onButtonClick = () => {
  
//     //UpdateChartDataPara(); 
//     console.log("click the first")
//     return (<AppAA onClick={onButtonClick}/>)
    
//   };

	return (
	  <div className="wrapper223">	  
		<p id="demo">LPI Robusta 300 wafer Processing Viewer</p>
		
		<div className="wrapper2233">   
    < Refreshprocessdata />
    <AppAA onclick = {onClickStart}/>
    <AppBB /> 
    <AppCC />    
    <AppDD />  
    <AppEE />
    <AppFF />   
  </div>   
  </div>
	 
	);
  }
////////////////////////////////


export default Processing;

function Refreshprocessdata(){ 
	const GetHeadingsWH = () => {
		return Object.keys(Processdata[0]);
		} 
	var vararrstr =[];  
	if(Processdata.length !== 0)
	{        
		Object.entries(Processdata).forEach(([key, value]) => {
			vararrstr.push(value);
		});
	}
  Flash = true;
  ClientSocket();
	return (      
		<TestTable theadData={GetHeadingsWH()} tbodyData={vararrstr} /> 
	);	
}
 function GetDrawData(index) {  
  Flash = true;
	// const SelectChamberData = Processdata.filter(function(item, i, array){  
	//   return (i === index);  
	// });
   
   
   
  // if(SelectChamberData[0].length !== 0)
  // {
	//   Object.entries(SelectChamberData[0]).forEach(([key, value]) => {
	// 	 //console.log(`${key} ${value}`);
	// 	 if(key ==='Ch' && value ==='A')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHA");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber A</h1>';

  //        //el.style.backgroundColor =  'hsl(232, 46%, 88%)';       
  //    }
  //    else if(key ==='Ch' && value ==='B')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHB");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber B</h1>';    
  //    }
  //    else if(key ==='Ch' && value ==='C')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHC");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber C</h1>';    
  //    }
  //    else if(key ==='Ch' && value ==='D')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHD");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber D</h1>';  
  //    }
  //    else if(key ==='Ch' && value ==='E')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHE");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber E</h1>';   
  //    }
  //    else if(key ==='Ch' && value ==='F')
  //    {
	// 	     console.log('chamber :=' + value);
  //        var el = document.getElementById("CHF");
  //        el.className = 'wrapper223Chart1show';
  //        var child = el.children[0];
  //        child.firstChild.innerHTML = '<h1 class="slim">Chamber F</h1>';    
  //    }

	// });	 
  // }
  //ClientSocket();
 // UpdateChart();
};
  function TestTable({theadData, tbodyData,}) { 
   
       return (      
        <table id="people" className="first101">
          <thead>
             <tr>
              {theadData.map(heading => {
                return <th key={heading}>{heading}</th>
              })}
            </tr>
          </thead>
          <tbody>
              {tbodyData.map((row, index) => {
                  return <tr onClick={() => GetDrawData(index)}key={index}>
                      {theadData.map((key, index) => {
						if(key ==='Ch')
						{
                           return <th key={row[key]}>{row[key] }</th>
						}
						else
						{
                           return <td key={row[key]}>{row[key] }</td>
						}
						
                      })}                     
                </tr>;
              })}             
          </tbody>
      </table>     
   ); 
}



//function Clientio2() {

export function ClientSocket()
{
    
  pause1();
  pause2();
  pause3();
  pause4();
  pause5();
  pause6();
    
  //  RecipeEnd1();
  //  RecipeEnd2();
  //  RecipeEnd3();
  //  RecipeEnd4();
  //  RecipeEnd5();
  //  RecipeEnd6();
   Start();
   UpdateAA();
   UpdateBB();
   UpdateCC();
   UpdateDD();
   UpdateEE();
   UpdateFF();
   UpdateFlashRow(); 
   
}
export function ThefirstStartFunction()
{    
  console.log('Socket log')
}

function testJSON(text){
  if (typeof text!=="string"){
      return false;
  }
  try{
      var json = JSON.parse(text);
      return (typeof json === 'object');
  }
  catch (error){
      return false;
  }
}


function Start() {
   //var ws = new WebSocket('ws://127.0.0.1:80/Echo')
   if(ws == null) 
   {
      console.log('Socket Null')
      return;
   }
   ws.onopen = () => {
       console.log('open connection')
   }
   
   
   ws.onclose = () => {
       console.log('close connection')
   }
   
   ws.onmessage = event => {
       //console.log("event.data")
       /////////////////////////////////////console.log(event.data)

       //if(event.data.toString().includes("Echo")== false)
        if(testJSON(event.data))
        {
          const arrPerson =JSON.parse(event.data);
          //var newData2 =  arrPerson[0];  // if from test server.js must use this line 
          if(Object.keys(arrPerson).length !== 0) 
          {
            //var ChamberSelect =GetChamberName(ChamberObject.Ch);
            if(arrPerson.Command === 'RecipeEnd' ||arrPerson.Command ==='RecipeStart' ||
              arrPerson.Command ==='StepOneStart' || arrPerson.Command ==='FinishedRecipe')
            {
              if(arrPerson.Command === 'RecipeEnd')
              {
                if(arrPerson.Ch === "1")
                {
                  console.log('chamber A Recipe Step End', arrPerson.Command);
                  //ChamberObjectAA={};                
                  ChamberObjectAA =  ClearSCRObjectAA('A');
                  //UpdateChamberTableAA();
                  
                  pause1();
                  ClearFlash(1);
                  UpdateChamberTableAA();
                }
                else if(arrPerson.Ch === "2")
                {                  
                  console.log('chamber B Recipe Step End', arrPerson.Command);
                  //ChamberObjectBB={}; 
                  pause2();  
                  ClearFlash(2);                              
                  ChamberObjectBB =  ClearDCRFObject('B');
                  UpdateChamberTableBB();
                  
                }
                else if(arrPerson.Ch === "3")
                {
                  console.log('chamber C Recipe Step End', arrPerson.Command); 
                  
                  //ChamberObjectCC={};                
                  ChamberObjectCC =  ClearDCRFObject('C');
                  UpdateChamberTableCC();
                  ClearFlash(3);
                  pause3();
                }
                else if(arrPerson.Ch === "4")
                {
                  console.log('chamber D Recipe Step End', arrPerson.Command); 
                 
                  //ChamberObject={};                
                  ChamberObjectDD =  ClearDCRFObject('D');
                  pause4();
                  ClearFlash(4);                  
                  UpdateChamberTableDD();
                 
                }
                else if(arrPerson.Ch === "5")
                {
                  console.log('chamber E Recipe Step End', arrPerson.Command); 
                  
                  //ChamberObject={};                
                  ChamberObjectEE =  ClearDCRFObject('E');
                  UpdateChamberTableEE();
                  ClearFlash(5);
                  pause5();
                }
                else if(arrPerson.Ch === "6")
                {
                  console.log('chamber F Recipe Step End', arrPerson.Command); 
                 
                  //ChamberObject={};                
                  ChamberObjectFF =  ClearSCRObjectFF('F');
                 
                  pause6();
                  ClearFlash(6);
                  UpdateChamberTableFF();

                  
                }                
              }
              if(arrPerson.Command === 'FinishedRecipe')
              {
                if(arrPerson.Ch === "1")
                {
                  console.log('chamber A FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd1();
                  //ClearFlash(1);
                  //UpdateChamberTableAA();                 
                }
                else if(arrPerson.Ch === "2")
                {                  
                  console.log('chamber B FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd2();                  
                }
                else if(arrPerson.Ch === "3")
                {
                  console.log('chamber C FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd3();                  
                }
                else if(arrPerson.Ch === "4")
                {
                  console.log('chamber D FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd4();                 
                }
                else if(arrPerson.Ch === "5")
                {
                  console.log('chamber E FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd5();                 
                }
                else if(arrPerson.Ch === "6")
                {
                  console.log('chamber F FinishedRecipe Command End', arrPerson.Command);
                  RecipeEnd6();                 
                }                
              }
              else if(arrPerson.Command === 'RecipeStart')
              { 
                if(arrPerson.Ch === "1")
                {
                  console.log('chamber A Recipe Command Start', arrPerson.Command);
                  play1();
                }
                else if(arrPerson.Ch === "2")
                {
                  console.log('chamber B Recipe Command Start', arrPerson.Command);
                  play2();
                  
                }
                else if(arrPerson.Ch === "3")
                {
                  console.log('chamber C Recipe Command Start', arrPerson.Command);                  
                  play3();
                }
                else if(arrPerson.Ch === "4")
                {
                  console.log('chamber D Recipe Command Start', arrPerson.Command);                 
                  play4();
                }
                else if(arrPerson.Ch === "5")
                {
                  console.log('chamber E Recipe Command Start', arrPerson.Command);                  
                  play5();
                }
                else if(arrPerson.Ch === "6")
                {
                  console.log('chamber F Recipe Command Start', arrPerson.Command);                 
                  play6();
                }                
              } 
              // else if(arrPerson.Command === 'RecipeStart')
              // { 
              //   if(arrPerson.Ch === "1")
              //   {
              //     console.log('chamber A Recipe Command Start', arrPerson.Command);
              //     play1();
              //   }
              //   else if(arrPerson.Ch === "2")
              //   {
              //     console.log('chamber B Recipe Command Start', arrPerson.Command);
              //     play2();
                  
              //   }
              //   else if(arrPerson.Ch === "3")
              //   {
              //     console.log('chamber C Recipe Command Start', arrPerson.Command);                  
              //     play3();
              //   }
              //   else if(arrPerson.Ch === "4")
              //   {
              //     console.log('chamber D Recipe Command Start', arrPerson.Command);                 
              //     play4();
              //   }
              //   else if(arrPerson.Ch === "5")
              //   {
              //     console.log('chamber E Recipe Command Start', arrPerson.Command);                  
              //     play5();
              //   }
              //   else if(arrPerson.Ch === "6")
              //   {
              //     console.log('chamber F Recipe Command Start', arrPerson.Command);                 
              //     play6();
              //   }                
              // }  
              else if(arrPerson.Command === 'StepOneStart')
              { 
                if(arrPerson.Ch === "1")
                {
                  console.log('chamber A StepOne Command Start', arrPerson.Command);
                  //if(GetStepOneFlag1()=== false)
                  
                    StepOneStart1();
                  
                  
                }
                else if(arrPerson.Ch === "2")
                {
                  console.log('chamber B StepOne Command Start', arrPerson.Command);
                  StepOneStart2();                  
                  
                }
                else if(arrPerson.Ch === "3")
                {
                  console.log('chamber C StepOne Command Start', arrPerson.Command);                  
                  StepOneStart3();
                }
                else if(arrPerson.Ch === "4")
                {
                  console.log('chamber D StepOne Command Start', arrPerson.Command);                 
                  StepOneStart4();
                }
                else if(arrPerson.Ch === "5")
                {
                  console.log('chamber E Recipe StepOne Command Start', arrPerson.Command);                  
                  StepOneStart5();
                }
                else if(arrPerson.Ch === "6")
                {
                  console.log('chamber F StepOne Command Start', arrPerson.Command);                 
                  StepOneStart6();
                }                
              }              
            }
            else
            {
              // if(arrPerson.Ch === '2' || arrPerson.Ch === '5'||
              //  arrPerson.Ch === '3'||arrPerson.Ch === '4' )
              // { 
              //   DCRFSourceSVIDData = arrPerson;
              //   ChamberObject={};
                
              //   ChamberObject =  ConvertNewObject();
        
              // }
              if(arrPerson.Ch === '1')
              {
                //ChamberObjectAA={};
                SCRSVIDData = arrPerson;
                ChamberObjectAAChart = arrPerson;
                //console.log('Object SCR_A Chamber_Name', SCRSVIDData.Ch);
                //console.log('Object SCR A', SCRSVIDData);

                ChamberObjectAA =  ConvertNewObjectAA(arrPerson);
              }
              else if (arrPerson.Ch === '2')
              {
                //ChamberObjectFF={};
                DCRFSourceSVIDData = arrPerson;
                ChamberObjectBBChart = arrPerson;
                ChamberObjectBB =  ConvertNewObject();
              }
              else if (arrPerson.Ch === '3')
              {
                DCRFSourceSVIDData = arrPerson;
                ChamberObjectCCChart = arrPerson;
                
                ChamberObjectCC =  ConvertNewObject();
              }
              else if (arrPerson.Ch === '4')
              {
                //ChamberObjectFF={};
                DCRFSourceSVIDData = arrPerson;
                ChamberObjectDDChart = arrPerson;
                ChamberObjectDD =  ConvertNewObject();
              }
              else if (arrPerson.Ch === '5')
              {
                DCRFSourceSVIDData = arrPerson;
                ChamberObjectEEChart = arrPerson;
                ChamberObjectEE =  ConvertNewObject();
              }
              else if (arrPerson.Ch === '6')
              {
                SCRSVIDData = arrPerson;
                ChamberObjectFFChart = arrPerson;
                //console.log('Object SCR_F Chamber_Name', SCRSVIDData.Ch);
                //console.log('Object SCR F', SCRSVIDData);

                ChamberObjectFF =  ConvertNewObjectFF(arrPerson);
              }
              //console.log('Object Chamber_Name', ChamberObject.Ch);
            
              //  var ChamberSelect =ChamberObject.Ch;
              // if(ChamberSelect === "A")
              // { 
              //   console.log('chamber A:Update',  ChamberObject);
              //   //ChamberObjectAA = ChamberObject;
              // }
              // else if(ChamberSelect === "B")
              // {                  
              //   console.log('chamber B:Update',  ChamberObject);
                
              //   ChamberObjectBB = ChamberObject;
              // }
              // else if(ChamberSelect === "C")
              // {                  
              //   console.log('chamber C:Update',  ChamberObject); 
              //   ChamberObjectCC = ChamberObject;
              // }
              // else if(ChamberSelect === "D")
              // {                  
              //   console.log('chamber D:Update',  ChamberObject); 
              //   ChamberObjectDD = ChamberObject;
              // }
              // else if(ChamberSelect === "E")
              // {                  
              //   console.log('chamber E:Update',  ChamberObject); 
              //   ChamberObjectEE = ChamberObject;
              // }
              // else if(ChamberSelect === "F")
              // {                  
              //   console.log('chamber F:Update',  ChamberObject); 
              //   //ChamberObjectFF = ChamberObject;
              // }
            }
          }
       }
      }
      ws.addEventListener('open', function (event) {
        console.log('connected');
        ws.send('Echo');
      });
      //UpdateChart();
  
}
function ClearFlash(index)
{
  const mytableWwafer = document.getElementById("people");
  mytableWwafer.rows[index].className = ""; //this makes cells background color normal
  //blinking_rows[blinking_rows.length] =  mytableWwafer.rows[index]; //saving row DOM object into array
  // ClearUpdateObject(index);
}      
// function initWebSocket() {
   
//     ws.addEventListener('open', function (event) {
//      console.log('connected');
//      ws.send('Echo');
//     });
//  }ChamberObject
function GetNewDataAA()
{
 return ChamberObjectAA;
}
function GetNewDataBB()
{
 return ChamberObjectBB;
}
function GetNewDataAAChart()
{
 return ChamberObjectAAChart;
}
function GetNewDataBBChart()
{
 return ChamberObjectBBChart;
}
function GetNewDataCCChart()
{
 return ChamberObjectCCChart;
}
function GetNewDataDDChart()
{
 return ChamberObjectDDChart;
}
function GetNewDataEEChart()
{
 return ChamberObjectEEChart;
}
function GetNewDataFFChart()
{
 return ChamberObjectFFChart;
}
function GetNewDataCC()
{
 return ChamberObjectCC;
}
function GetNewDataDD()
{
 return ChamberObjectDD;
}
function GetNewDataEE()
{
 return ChamberObjectEE;
}
function GetNewDataFF()
{
 return ChamberObjectFF;
}
function ConvertNewObject()
{
  
  ChScrTempSvidTargetData.Ch = GetChamberName(DCRFSourceSVIDData.Ch);
  ChScrTempSvidTargetData.Chamber_type = GetChamberType(DCRFSourceSVIDData.Ch);
  ChScrTempSvidTargetData.Pressure = DCRFSourceSVIDData.Pressure;
  var PotStrin = DCRFSourceSVIDData.PortNumber === 1 ? "A_":"B_"; 
  ChScrTempSvidTargetData.Wafer_ID =  PotStrin + DCRFSourceSVIDData.SlotID.toString();
  var DCSetPoint = DCRFSourceSVIDData.DCPowerSetPoint.toString();
  var RFSetPoint = DCRFSourceSVIDData.RFPowerSetPoint.toString();
  try{
  ChScrTempSvidTargetData.DC_power_Sp_Actual_W = DCSetPoint +'/'+ DCRFSourceSVIDData.DCPowerActualPower.toString();
  ChScrTempSvidTargetData.RF_power_Sp_FW_Rel_W = RFSetPoint +'/'+ DCRFSourceSVIDData.RFPowerForwardPower.toString() + '/'+ DCRFSourceSVIDData.RFPowerReflectedPower.toString();
  }
  catch{
    console.log('DCPowerSetPoint'+ DCRFSourceSVIDData.DCPowerSetPoint);
    console.log('DCPowerActualPower'+ DCRFSourceSVIDData.DCPowerActualPower);
    console.log('RFPowerSetPoint'+ DCRFSourceSVIDData.RFPowerSetPoint);
    console.log('RFPowerForwardPower'+ DCRFSourceSVIDData.RFPowerForwardPower);
    console.log('RFPowerReflectedPower'+ DCRFSourceSVIDData.RFPowerReflectedPower);
  }
  ChScrTempSvidTargetData.PortNumber =  DCRFSourceSVIDData.PortNumber;
  ChScrTempSvidTargetData.SlotID =  DCRFSourceSVIDData.SlotID;
  ChScrTempSvidTargetData.Pressure =  DCRFSourceSVIDData.Pressure;
  ChScrTempSvidTargetData.RecipeProcessTime =  DCRFSourceSVIDData.RecipeProcessTime;
  ChScrTempSvidTargetData.RecipeTotalProcessTime =  DCRFSourceSVIDData.RecipeTotalProcessTime;
  ChScrTempSvidTargetData.StepProcessTime =  DCRFSourceSVIDData.StepProcessTime;
  ChScrTempSvidTargetData.StepTotalProcessTime =  DCRFSourceSVIDData.StepTotalProcessTime;
  ChScrTempSvidTargetData.Recipe_Name =  DCRFSourceSVIDData.Recipe;
  ChScrTempSvidTargetData.Step_Name =  DCRFSourceSVIDData.Step;
  ChScrTempSvidTargetData.Temperature_1_2_3_4_C = '-:-/-:-/-:-/-:-';
  return ChScrTempSvidTargetData;
}
function ClearDCRFObject(chamber)
{
  
  ChScrTempSvidTargetData.Ch =  chamber;
  ChScrTempSvidTargetData.Chamber_type = GetChamberType(DCRFSourceSVIDData.Ch);
  ChScrTempSvidTargetData.Pressure = 0;
  
  ChScrTempSvidTargetData.Wafer_ID = '_:_'; 
 
 
  ChScrTempSvidTargetData.DC_power_Sp_Actual_W = '0/0';
  ChScrTempSvidTargetData.RF_power_Sp_FW_Rel_W = '0/0/0';
  
  ChScrTempSvidTargetData.PortNumber =  0;
  ChScrTempSvidTargetData.SlotID = 0;
 
  ChScrTempSvidTargetData.RecipeProcessTime =  0.0;
  ChScrTempSvidTargetData.RecipeTotalProcessTime =  0.0;
  ChScrTempSvidTargetData.StepProcessTime =  0.0;
  ChScrTempSvidTargetData.StepTotalProcessTime = 0.0;
  ChScrTempSvidTargetData.Recipe_Name = " ";
  ChScrTempSvidTargetData.Step_Name =  " ";
  ChScrTempSvidTargetData.Temperature_1_2_3_4_C = '-:-/-:-/-:-/-:-';
  ChScrTempSvidTargetData.Gas1 =0;
  ChScrTempSvidTargetData.Gas2 =0;
  return ChScrTempSvidTargetData;
}
function ClearSCRObjectFF(chamber)
{  
  ChSCRObjCopyFF.Ch = chamber;
  ChSCRObjCopyFF.Chamber_type = "-";
  ChSCRObjCopyFF.Pressure = 0.0;
  //var PotStrin = ObjectUpdate.PortNumber === 1 ? "A_":"B_"; 
  ChSCRObjCopyFF.Wafer_ID = '_:_';
  
  ChSCRObjCopyFF.DC_power_Sp_Actual_W = '0/0';
  ChSCRObjCopyFF.RF_power_Sp_FW_Rel_W = '0/0/0';
  
  ChSCRObjCopyFF.PortNumber =  0;
  ChSCRObjCopyFF.SlotID =  0;
  
  ChSCRObjCopyFF.RecipeProcessTime = 0.0;
  ChSCRObjCopyFF.RecipeTotalProcessTime = 0.0;
  ChSCRObjCopyFF.StepProcessTime = 0.0;
  ChSCRObjCopyFF.StepTotalProcessTime =  0.0;
  ChSCRObjCopyFF.Recipe_Name =  '-';
  ChSCRObjCopyFF.Step_Name =  '-';
  // var SetpointArry = [];
  // var ActualSetpointArry = [];
  
    var SpTempString ='';
    var ActualTempString ='';
    var CombinTempString ='';
    for(var i=0; i<4;i++)
    {
      SpTempString = '-';
      ActualTempString = '-';
      if(i===3)
      {
        CombinTempString = CombinTempString+ SpTempString +':'+ ActualTempString;
      }
      else
      {
        CombinTempString = CombinTempString + SpTempString +':'+ ActualTempString +'/';
      }
    }
    console.log(CombinTempString);
    ChSCRObjCopyFF.Temperature_1_2_3_4_C = CombinTempString;
    ChSCRObjCopyFF.Gas1 =0;
    ChSCRObjCopyFF.Gas2 =0;
  
    return ChSCRObjCopyFF;
}
function ClearSCRObjectAA(chamber)
{  
  ChSCRObjCopyAA.Ch = chamber;
  ChSCRObjCopyAA.Chamber_type = "-";
  ChSCRObjCopyAA.Pressure = 0.0;
  //var PotStrin = ObjectUpdate.PortNumber === 1 ? "A_":"B_"; 
  ChSCRObjCopyAA.Wafer_ID =  '_:_';  
 
  ChSCRObjCopyAA.DC_power_Sp_Actual_W = '0/0';
  ChSCRObjCopyAA.RF_power_Sp_FW_Rel_W = '0/0/0';
  
  ChSCRObjCopyAA.PortNumber =  0;
  ChSCRObjCopyAA.SlotID =  0;
  
  ChSCRObjCopyAA.RecipeProcessTime = 0.0;
  ChSCRObjCopyAA.RecipeTotalProcessTime = 0.0;
  ChSCRObjCopyAA.StepProcessTime = 0.0;
  ChSCRObjCopyAA.StepTotalProcessTime =  0.0;
  ChSCRObjCopyAA.Recipe_Name =  '-';
  ChSCRObjCopyAA.Step_Name =  '-';
  // var SetpointArry = [];
  // var ActualSetpointArry = [];
 
    var SpTempString ='';
    var ActualTempString ='';
    var CombinTempString ='';
    for(var i=0; i<4;i++)
    {
      SpTempString = '-';
      ActualTempString = '-';
      if(i===3)
      {
        CombinTempString = CombinTempString+ SpTempString +':'+ ActualTempString;
      }
      else
      {
        CombinTempString = CombinTempString + SpTempString +':'+ ActualTempString +'/';
      }
    }
    console.log(CombinTempString);
    ChSCRObjCopyAA.Temperature_1_2_3_4_C = CombinTempString;
    ChSCRObjCopyAA.Gas1 =0;
    ChSCRObjCopyAA.Gas2 =0;
  
    return ChSCRObjCopyAA;
}
function ConvertNewObjectAA(ObjectUpdate)
{
  
  ChSCRObjCopyAA.Ch = GetChamberName(ObjectUpdate.Ch);
  ChSCRObjCopyAA.Chamber_type = GetChamberType(ObjectUpdate.Ch);
  ChSCRObjCopyAA.Pressure = ObjectUpdate.Pressure;
  var PotStrin = ObjectUpdate.PortNumber === 1 ? "A_":"B_"; 
  ChSCRObjCopyAA.Wafer_ID =  PotStrin + ObjectUpdate.SlotID.toString();
  
  ChSCRObjCopyAA.DC_power_Sp_Actual_W = '0/0';
  ChSCRObjCopyAA.RF_power_Sp_FW_Rel_W = '0/0/0';
  
  
  ChSCRObjCopyAA.PortNumber =  ObjectUpdate.PortNumber;
  ChSCRObjCopyAA.SlotID =  ObjectUpdate.SlotID;
  
  ChSCRObjCopyAA.RecipeProcessTime =  ObjectUpdate.RecipeProcessTime;
  ChSCRObjCopyAA.RecipeTotalProcessTime =  ObjectUpdate.RecipeTotalProcessTime;
  ChSCRObjCopyAA.StepProcessTime =  ObjectUpdate.StepProcessTime;
  ChSCRObjCopyAA.StepTotalProcessTime =  ObjectUpdate.StepTotalProcessTime;
  ChSCRObjCopyAA.Recipe_Name =  ObjectUpdate.Recipe;
  ChSCRObjCopyAA.Step_Name =  ObjectUpdate.Step;
  var SetpointArry = [];
  var ActualSetpointArry = [];
   ObjectUpdate.TempTecAry.forEach(function(element)  {
    Object.entries(element).forEach(([key, value]) => {
    if(key === 'Setpoint')
    {
        SetpointArry.push(value);
    }
    else if (key === 'ActualOutput')
    {
      ActualSetpointArry.push(value);
    }
  })
  });
    var SpTempString ='';
    var ActualTempString ='';
    var CombinTempString ='';
    for(var i=0; i<SetpointArry.length;i++)
    {
      SpTempString = SetpointArry[i].toString();
      ActualTempString = ActualSetpointArry[i].toString();
      if(i===SetpointArry.length-1)
      {
        CombinTempString = CombinTempString+ SpTempString +':'+ ActualTempString;
      }
      else
      {
        CombinTempString = CombinTempString + SpTempString +':'+ ActualTempString +'/';
      }
    }
    //console.log(CombinTempString);
    ChSCRObjCopyAA.Temperature_1_2_3_4_C = CombinTempString;
    ChSCRObjCopyAA.Gas1 =0;
    ChSCRObjCopyAA.Gas2 =0;
  
    return ChSCRObjCopyAA;
}
function ConvertNewObjectFF(ObjectUpdate)
{
  
  ChSCRObjCopyFF.Ch = GetChamberName(ObjectUpdate.Ch);
  ChSCRObjCopyFF.Chamber_type = GetChamberType(ObjectUpdate.Ch);
  ChSCRObjCopyFF.Pressure = ObjectUpdate.Pressure;
  var PotStrin = ObjectUpdate.PortNumber === 1 ? "A_":"B_"; 
  ChSCRObjCopyFF.Wafer_ID =  PotStrin + ObjectUpdate.SlotID.toString();
  
 
  ChSCRObjCopyFF.DC_power_Sp_Actual_W = '0/0';
  ChSCRObjCopyFF.RF_power_Sp_FW_Rel_W = '0/0/0';
  
  ChSCRObjCopyFF.PortNumber =  ObjectUpdate.PortNumber;
  ChSCRObjCopyFF.SlotID =  ObjectUpdate.SlotID;
  
  ChSCRObjCopyFF.RecipeProcessTime =  ObjectUpdate.RecipeProcessTime;
  ChSCRObjCopyFF.RecipeTotalProcessTime =  ObjectUpdate.RecipeTotalProcessTime;

  ChSCRObjCopyFF.StepProcessTime =  ObjectUpdate.StepProcessTime;
  ChSCRObjCopyFF.StepTotalProcessTime =  ObjectUpdate.StepTotalProcessTime;
  ChSCRObjCopyFF.Recipe_Name =  ObjectUpdate.Recipe;
  ChSCRObjCopyFF.Step_Name =  ObjectUpdate.Step;
  var SetpointArry = [];
  var ActualSetpointArry = [];
   ObjectUpdate.TempTecAry.forEach(function(element)  {
    Object.entries(element).forEach(([key, value]) => {
    if(key === 'Setpoint')
    {
        SetpointArry.push(value);
    }
    else if (key === 'ActualOutput')
    {
      ActualSetpointArry.push(value);
    }
  })
  });
    var SpTempString ='';
    var ActualTempString ='';
    var CombinTempString ='';
    for(var i=0; i<SetpointArry.length;i++)
    {
      SpTempString = SetpointArry[i].toString();
      ActualTempString = ActualSetpointArry[i].toString();
      if(i===SetpointArry.length-1)
      {
        CombinTempString = CombinTempString+ SpTempString +':'+ ActualTempString;
      }
      else
      {
        CombinTempString = CombinTempString + SpTempString +':'+ ActualTempString +'/';
      }
    }
    console.log(CombinTempString);
    ChSCRObjCopyFF.Temperature_1_2_3_4_C = CombinTempString;
    ChSCRObjCopyFF.Gas1 =0;
    ChSCRObjCopyFF.Gas2 =0;
  
    return ChSCRObjCopyFF;
}
// function ClearUpdateObject(index)
// {  
//   if(index === 1)
//   {
//     ChamberObjectAA = {};
//   }
//   else if(index === 2)
//   {
//     ChamberObjectBB = {};
//   }
//   else if(index === 3)
//   {
//     ChamberObjectCC = {};
//   }
//   else if(index === 4)
//   {
//     ChamberObjectDD = {};
//   }
//   else if(index === 5)
//   {
//     ChamberObjectEE = {};
//   }
//   else if(index === 6)
//   {
//     ChamberObjectFF = {};
//   }  
// }
function GetChamberName(index)
{
  var Chamber ="";
  if(index === '1')
  {
    Chamber = "A";
  }
  else if(index === '2')
  {
    Chamber = "B";
  }
  else if(index === '3')
  {
    Chamber = "C";
  }
  else if(index === '4')
  {
    Chamber = "D";
  }
  else if(index === '5')
  {
    Chamber = "E";
  }
  else if(index === '6')
  {
    Chamber = "F";
  }
  return Chamber;
}
function GetChamberType(index)
{
  var Chamber ="";
  if(index === '1')
  {
    Chamber = "MBD";
  }
  else if(index === '2')
  {
    Chamber = "LTPC";
  }
  else if(index === '3')
  {
    Chamber = "PVD";
  }
  else if(index === '4')
  {
    Chamber = "PVD";
  }
  else if(index === '5')
  {
    Chamber = "LTPC";
  }
  else if(index === '6')
  {
    Chamber = "MBD";
  }
  return Chamber;
}
function GetChamberIndex(chname)
{
  var index = -1;
  if(chname === "A")
  {
    index = 1;
  }
  else if(chname === "B")
  {
    index = 2;
  }
  else if(chname === "C")
  {
    index = 3;
  }
  else if(chname === "D")
  {
    index = 4;
  }
  else if(chname === "E")
  {
    index = 5;
  }
  else if(chname === "F")
  {
    index = 6;
  } 
  return index;
}
export function UpdateChamberTableAA() { 
   
  var ObjectTemp = GetNewDataAA();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
              
          });
          //rowindex = GetChamberIndex(ObjectTemp.Ch);
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          
          //console.log(rowindex)

          if(!isPaused1)
          mytableWwafer.rows[rowindex].className = "blink";  
          else        
          mytableWwafer.rows[rowindex].className = "";  
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
           
      } 
    }
  }
  return ObjectTemp;
}

export function UpdateChamberTableBB() { 
  var ObjectTemp = GetNewDataBB();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
              
          });
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          //rowindex = ObjectTemp.Ch;
          //console.log(rowindex)

          // if(!isPaused2)
          // mytableWwafer.rows[rowindex].className = "blink";  
          // else        
          // mytableWwafer.rows[rowindex].className = "";  
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
      } 
    }
  }
  return ObjectTemp;
}
export function UpdateChamberTableAAChart() { 
  var ObjectTemp = GetNewDataAAChart();
  return ObjectTemp;  
}
export function UpdateChamberTableBBChart() { 
  var ObjectTemp = GetNewDataBBChart();
  return ObjectTemp;  
}
export function UpdateChamberTableCCChart() { 
  var ObjectTemp = GetNewDataCCChart();
  return ObjectTemp;  
}
export function UpdateChamberTableDDChart() { 
  var ObjectTemp = GetNewDataDDChart();
  return ObjectTemp;  
}
export function UpdateChamberTableEEChart() { 
  var ObjectTemp = GetNewDataEEChart();
  return ObjectTemp;  
}
export function UpdateChamberTableFFChart() { 
  var ObjectTemp = GetNewDataFFChart();
  return ObjectTemp;  
}
function UpdateChamberTableCC() { 
  var ObjectTemp = GetNewDataCC();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
             
          });
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          //rowindex = ObjectTemp.Ch;
          //console.log(rowindex)

         /*  if(!isPaused3)
          mytableWwafer.rows[rowindex].className = "blink";  
          else        
          mytableWwafer.rows[rowindex].className = "";   */
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
      } 
    }
  }
}
function UpdateChamberTableDD() { 
  var ObjectTemp = GetNewDataDD();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
              
          });
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          //rowindex = ObjectTemp.Ch;
          //console.log(rowindex)

          // if(!isPaused4)
          // mytableWwafer.rows[rowindex].className = "blink";  
          // else        
          // mytableWwafer.rows[rowindex].className = "";  
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
      } 
    }
  }
}
function UpdateChamberTableEE() { 
  var ObjectTemp = GetNewDataEE();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
              
          });
          //rowindex = GetChamberIndex(ObjectTemp.Ch);
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          //rowindex = ObjectTemp.Ch;
         //console.log(rowindex)

          // if(!isPaused5)
          // mytableWwafer.rows[rowindex].className = "blink";  
          // else        
          // mytableWwafer.rows[rowindex].className = "";  
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
      } 
    }
  }
}
function UpdateChamberTableFF() { 
  var ObjectTemp = GetNewDataFF();
  if(Object.keys(ObjectTemp).length !== 0) 
  {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
      var rowindex = -1;
     
      if(mytableWwafer != null )
      {
       
         var VararrHeaderstr = [];     
       
        if(Object.keys(ObjectTemp).length !== 0)
        {    
            Object.entries(ObjectTemp).forEach(([key, value]) => {        
                        
              VararrHeaderstr.push(value);
              
          });
          rowindex = GetChamberIndex(ObjectTemp.Ch);
          //rowindex = ObjectTemp.Ch;
          ////////////////////////////////////////console.log(rowindex)
          // if(!isPaused6)
          // mytableWwafer.rows[rowindex].className = "blink";  
          // else        
          // mytableWwafer.rows[rowindex].className = "";  
          //blinking_rows[blinking_rows.length] =  mytableWwafer.rows[rowindex]; //saving row DOM object into array
          

          var cellcount = mytableWwafer.rows[rowindex].cells.length;
          if(VararrHeaderstr.length >= cellcount) 
          {
              for(var i =0 ;i< cellcount;i++)
              {
                mytableWwafer.rows[rowindex].cells[i].innerHTML = VararrHeaderstr[i];
              }               
          }
      } 
    }
  }
}
//Running a timer that makes the row blinks every 2 seconds by changing their class
function UpdateFlashRow() {  
  intervalID7  = setInterval(function () {
    if(Flash) {
       
      Scan();
    }
}, 2000)
};
  function Scan()
  {
    if(Flash) 
    {
      
      const mytableWwafer = document.getElementById("people");
      if(mytableWwafer === null) return;      //var matches = document.querySelectorAll("th");
     
     
      if(mytableWwafer != null )
      {
       
         for(var rowindex=1;rowindex< mytableWwafer.rows.length;rowindex++)
         {
          var cellValue = mytableWwafer.rows[rowindex].cells[1].textContent;
          if(cellValue === '_:_') 
          {
            mytableWwafer.rows[rowindex].className = "";  
          }
          else{
            if(rowindex ===1)
            {
              FlagPrerun = !GetStepPauseFlag1(); 
              FlagStepOneStart = GetStepOneFlag1();
            }
            else if(rowindex ===2)
            {
              FlagPrerun = !GetStepPauseFlag2(); 
              FlagStepOneStart = GetStepOneFlag2();
            }
            else if(rowindex ===3)
            {
              FlagPrerun = !GetStepPauseFlag3(); 
              FlagStepOneStart = GetStepOneFlag3();
            }
            else if(rowindex ===4)
            {
              FlagPrerun = !GetStepPauseFlag4(); 
              FlagStepOneStart = GetStepOneFlag4();
            }
            else if(rowindex ===5)
            {
              FlagPrerun = !GetStepPauseFlag5(); 
              FlagStepOneStart = GetStepOneFlag5();
            }
            else if(rowindex ===6)
            {
              FlagPrerun = !GetStepPauseFlag6(); 
              FlagStepOneStart = GetStepOneFlag6();
            }

            if(FlagPrerun || FlagStepOneStart)
            {
              mytableWwafer.rows[rowindex].className = "blink";  
            }
            else if(!FlagPrerun && !FlagStepOneStart)
            {
              mytableWwafer.rows[rowindex].className = "";  
            }          
          }
         }
      } 
  }    
}

function stopInterval(){
  console.log("stopping the interval...")
  clearInterval(intervalID1); 
}
 function UpdateAA() {

  intervalID1  = setInterval(function () {
    if(!isPaused1) {
       
        UpdateChamberTableAA();
    }   
}, 1000)
};
function UpdateBB() {

  intervalID2  = setInterval(function () {
    if(!isPaused2) {
       
        UpdateChamberTableBB();
    }
}, 1000)
};
function UpdateCC() {

  intervalID3  = setInterval(function () {
    if(!isPaused3) {
       
        UpdateChamberTableCC();
    }
}, 1000)
};
function UpdateDD() {

  intervalID4  = setInterval(function () {
    if(!isPaused4) {
       
        UpdateChamberTableDD();
    }
}, 1000)
};
function UpdateEE() {

  intervalID5  = setInterval(function () {
    if(!isPaused5) {
       
        UpdateChamberTableEE();
    }
}, 1000)
};
function UpdateFF() {

  intervalID6  = setInterval(function () {
    if(!isPaused6) {
       
        UpdateChamberTableFF();
    }
}, 1000)
};


function StepOneStart1(){
  isStepOneStart1 = true;
}
function StepOneStart2(){
  isStepOneStart2 = true;
}
function StepOneStart3(){
  isStepOneStart3 = true;
}
function StepOneStart4(){
  isStepOneStart4 = true;
}
function StepOneStart5(){
  isStepOneStart5 = true;
}
function StepOneStart6(){
  isStepOneStart6 = true;
}
function pause1(){
  isPaused1 = true;
 // isStepOneStart1 = false;
 // isRecipeEnd1 = false;
  //isStepOneStart1 = false;
}
function play1(){ 
  isPaused1 = false;
  isStepOneStart1 = false;
  isRecipeEnd1 = false; 
}
function play2(){
  isPaused2 = false;  
  isStepOneStart2 = false;
  isRecipeEnd2 = false;
}
function pause2(){
  isPaused2 = true;
  //isStepOneStart2 = false;
  //isRecipeEnd2 = false;
}
function play3(){
  isPaused3 = false;
  isStepOneStart3 = false;
  isRecipeEnd3 = false;
}
function pause3(){
  isPaused3 = true;
}
function play4(){
  isPaused4 = false; 
  isStepOneStart4 = false;
  isRecipeEnd4 = false;
}
function pause4(){
  isPaused4 = true;
}
function play5(){
  isPaused5 = false;
  isStepOneStart5 = false;
  isRecipeEnd5 = false;
}
function pause5(){
  isPaused5 = true;
}
function play6(){
  isPaused6 = false;
  isStepOneStart6 = false;
  isRecipeEnd6 = false;
}
function pause6(){
  //isStepOneStart6 = false;
  isPaused6 = true;
}
export function GetStepOneFlag1(){
  return isStepOneStart1;}
export function GetStepOneFlag2(){
    return isStepOneStart2;}
export function GetStepOneFlag3(){
  return isStepOneStart3;}
export function GetStepOneFlag4(){
    return isStepOneStart4;}
export function GetStepOneFlag5(){
      return isStepOneStart5;}
export function GetStepOneFlag6(){
        return isStepOneStart6;}
    
  

export function GetStepPauseFlag1(){
  return isPaused1;}

export function GetStepPauseFlag2(){
  return isPaused2;
}
export function GetStepPauseFlag3(){
  return isPaused3;
}
export function GetStepPauseFlag4(){
  return isPaused4;
}
export function GetStepPauseFlag5(){
  return isPaused5;
}
export function GetStepPauseFlag6(){
  return isPaused6;
}
function RecipeEnd1(){
  isRecipeEnd1 = true;
 // isPaused1 = true;// step stop
  isStepOneStart1 = false;
}
export function ClearRecipeEnd1(){
  isPaused1 = true;
  isStepOneStart1 = false;
  isRecipeEnd1 = false;
}
export function ClearRecipeEnd2(){
  isPaused2 = true;
  isStepOneStart2 = false;
  isRecipeEnd2 = false;
}
export function ClearRecipeEnd3(){
  isPaused3 = true;
  isStepOneStart3 = false;
  isRecipeEnd3 = false;
}
export function ClearRecipeEnd4(){
  isPaused4 = true;
  isStepOneStart4 = false;
  isRecipeEnd4 = false;
}
export function ClearRecipeEnd5(){
  isPaused5 = true;
  isStepOneStart5 = false;
  isRecipeEnd5 = false;
}
export function ClearRecipeEnd6(){
  isPaused6 = true;
  isStepOneStart6 = false;
  isRecipeEnd6 = false;
}
function RecipeEnd2(){
  isRecipeEnd2 = true;
  isPaused2 = true;// step stop
  isStepOneStart2 = false;
}
function RecipeEnd3(){
  isRecipeEnd3 = true;
  isPaused3 = true;// step stop
  isStepOneStart3 = false;
}
function RecipeEnd4(){
  isRecipeEnd4 = true;
  isPaused4 = true;// step stop
  isStepOneStart4 = false;
}
function RecipeEnd5(){
  isRecipeEnd5 = true;
  isPaused5 = true;// step stop
  isStepOneStart5 = false;
}
function RecipeEnd6(){
  isRecipeEnd6 = true;
 // isPaused6 = true;// step stop
  isStepOneStart6 = false;
}
export function GetRecipeEnd1(){
  return isRecipeEnd1;
}
export function GetRecipeEnd2(){
  return isRecipeEnd2;
}
export function GetRecipeEnd3(){
  return isRecipeEnd3;
}
export function GetRecipeEnd4(){
  return isRecipeEnd4;
}
export function GetRecipeEnd5(){
  return isRecipeEnd5;
}
export function GetRecipeEnd6(){
  return isRecipeEnd6;
}
///////////////////////////////////////////chart 

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['11', '22', '33', '44', '55', '66', '77'];
var labelsdata1 =  ['1', '2', '3', '4', '5', '6', '7'];
var labelsdata2 = [118, 12, 6, 89, 12, 83, 39,77,12,66];
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      //data: labelsdata1,
      data: labels.map(() => faker.datatype.number({ min: -0, max: 50 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      //data: labelsdata2,
      data: labels.map(() => faker.datatype.number({ min: -0, max: 50 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function ChartPara() {
  return <Line options={options} data={data} />;
}

function UpdateChart() {

  intervalID8  = setInterval(function () {
    if(Flash) {
      adddata();
      // data.datasets.data[0] = labels.map(() => Math.floor((Math.random() * 50) + 10)),
      // data.datasets.data[1] = labels.map(() => Math.floor((Math.random() * 50) + 10))
    }
}, 1000)
};
var zero = 7;
function adddata(){

   var value = Math.floor((Math.random() * 10) + 1);
      // data.labels.push(zero);
      // data.labels.splice(0, 1);
      data.datasets[0].data.splice(0, 1);
      data.datasets[0].data.push(value);
      data.datasets[1].data.splice(0, 1);
      data.datasets[1].data.push(value);
      <Line options={options} data={data} />;
  zero++;
}
// function adddata44() {

// intervalID4  = setInterval(function () {
//   if(!isPaused4)
//   {
//     newdata4 = GetNewData4();
//     console.log('invoking 4 :' + newdata4)

//     var labelvalue = myChart4.data.labels.pop();
//     Temp_444 = myChart4.data.labels;
//     Temp_4444.push(labelvalue);
//     Temp_4444.push(...Temp_444);
//     console.log(Temp_4444);



//     myChart4.data.datasets[0].data.pop();
//     Temp_4 = myChart4.data.datasets[0].data;

//     Temp_44.push(newdata4);
//     Temp_44.push(...Temp_4);

//     console.log(Temp_44);

//     //myChart.data.datasets[0].data[0] = Math.floor(Math.random() * 100);
//     //myChart.data.datasets[0].data.push(Math.floor(Math.random() * 100))
//     myChart4.data.labels = Temp_4444;
//     myChart4.data.datasets[0].data = Temp_44;
//     myChart4.update('none');

//     Temp_4 = [];
//     Temp_44 = [];
//     Temp_444 =[];
//     Temp_4444 = [];
//   }
// }, 1000)

// };


//    setInterval(function(){
//    adddata();
//     },1000);
//     var option = {
//       showLines: true
//   };
//   var myLineChart = Chart.Line(canvas,{
//       data:data,
//     options:option
//   });

