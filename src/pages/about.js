import React from 'react'; 
import './Pages.css';  
const About = () => { 
return ( 
	<div 
	style={{ 
		display: 'flex', 
		justifyContent: 'Center', 
		alignItems: 'Center', 
		height: '100vh'
	}} 
	> 
	<h1>This is Web Site  -About. -Protected</h1> 
	</div>

); 
}; 

export default About;
// function Refreshtable_Waferhisstory(){      
        
// 	if(dataWHTemp.length === 0)
// 	{
// 	   if(dataWH.length === 0)  return;
// 	   const GetHeadings = () => {
// 		   return Object.keys(dataWH[0]);
// 		 }
// 		 return (      
// 			 <Table theadData={GetHeadings()} tbodyData={dataWH} show = {showFlag}/> 
// 		 );
		 
// 	}
// 	else
// 	{
// 		   const GetHeadingsWH = () => {
// 		   return Object.keys(dataWH[0]);
// 		   }
// 		   const mytableWH = document.getElementById("people");
// 		   if(mytableWH != null)
// 		   {
// 			   var rowCount = mytableWH.rows.length;      
// 			   for (var i = rowCount - 1; i > 0; i--) {
// 				   mytableWH.deleteRow(i);
// 			   }
			   
// 			   return (                
// 				   <Table theadData={GetHeadingsWH()} tbodyData={dataWHTemp} show = {showFlag}/> 
// 			   );
// 		   }
// 		   else 
// 		   {              
// 			   const mytableWHno = document.getElementById("peopleno");
			   
// 			   if(mytableWHno != null)
// 			   {
// 			   const GetHeadingsWH = () => {
// 			   return Object.keys(dataWH[0]);
// 			   }
			   
// 			   return (      
// 				   <Table theadData={GetHeadingsWH()} tbodyData={dataWHTemp} show = {showFlag}/> 
// 			   );
// 			   }
// 		   }
// 	  }
//   }  
