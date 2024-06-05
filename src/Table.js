import './Table.css';
import dataPara from "./parameter.json"
//import { GetParabyCount} from './App';
var StepDataTemp = null;
var StepKeyDataTemp = null;
 var GetParaMeterByCount = null;
function GetDrawData(index) {
  var count =0;
 const mapStepData = StepDataTemp.filter(function(item, i, array){ 
 if( i<index ){
   count = count + parseInt(item.component_count);
 }
 else{
   //count = count + parseInt(item.component_count);
   return (i === index);  
 }
 
 }); 
if(mapStepData[0].length !== 0)
{
    var ParameterCount = parseInt(mapStepData[0].component_count); 
    var index2 = count;
    var MaxIndex = index2 +ParameterCount;
    var StartIndex = index2 -1;
      GetParaMeterByCount = dataPara.filter(function(item, i,array){ 
      return(i>StartIndex && i<MaxIndex);   
    //return(index-1 < MaxIndex); 
          
    }); 
}
}
function showtableWH({show}) {
  var x = document.getElementById("people");
  if(x === null) return;
  if(show)
  {
      x.style.display = "block";
  }
  else{
      x.style.display = "none";
  }
  
}
export default function Table({theadData, tbodyData,show}) {
  StepDataTemp = tbodyData;
  StepKeyDataTemp = theadData;
  console.log(theadData)
  console.log(tbodyData)
  if( show ) 
  {
    return (      
      <table id="people" className="first100">
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
                         return <td key={row[key]}>{row[key] }</td>
                    })}                     
              </tr>;
            })}             
        </tbody>
    </table>     
    );
  }
  else
  { 
    return (      
        <table id="peopleno" className="first100">
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
                           return <td key={row[key]}>{row[key] }</td>
                      })}                     
                </tr>;
              })}             
          </tbody>
      </table>     
   );
   } 
  } 
  

   