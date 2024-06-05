//import React from 'react'; 

// const SignUp = () => { 
// return ( 
// 	<div 
// 	// style={{ 
// 	// 	display: 'flex', 
// 	// 	justifyContent: 'Right', 
// 	// 	alignItems: 'Right', 
// 	// 	height: '100vh'
// 	// }} 
// 	> 
	
// 	<h1>Sign Up</h1> 
// 	</div> 
// ); 
// }; 
 
//import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// const SignUp = () =>{

//   return (
// 	<div className="wrapper223">
//      <div className="chartMenu">
//       <p id="demo">LPI Robusta 300 wafer Processing Viewer</p>
// 	  {/* <div className="wrapper2255"></div> */}
//       <div className="wrapper2233">    
// 	<table id="people" className="first101">
// 	<thead>
// 	   <tr>
// 	      <th >Chamber #</th>
// 	      <th >Wafer ID</th>
//           <th >Recipe Name</th>
//           <th >Step Name</th>
//           <th >Step Elapsed Time</th>
// 		  <th >Total Recipe Time</th>		 
// 		  <th >DC power W/Sp Power W</th>		  
// 		  <th >RF power FW/Rel/Sp Power W</th>
// 		  <th >Temperature 1/2/3/4 C</th>				  
// 	  </tr>
// 	</thead>
// 	<tbody>
// 	<tr>
//           <th >A</th>
// 		  <td >A5</td>
//           <td>MDB_Recipe</td>
//           <td>Step_Name</td>
//           <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>
//         <tr>
//           <th >B</th>
// 		  <td >A12</td>
//           <td>LTPC_Recipe</td>
//           <td>Step_Name</td>
// 		  <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>
//         <tr>
//           <th >C</th>
// 		  <td >A11</td>
//           <td>PVD_Recipe</td>
//           <td>Step_Name</td>
// 		  <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>
// 		<tr>
//           <th >D</th>
// 		  <td >A18</td>
//           <td>PVD_Recipe</td>
//           <td>Step_Name</td>
// 		  <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>
// 		<tr>
//           <th >E</th>
// 		  <td >A17</td>
//           <td>LTPC_Recipe</td>
//           <td>Step_Name</td>
// 		  <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>
// 		<tr>
//           <th >F</th>
// 		  <td >__</td>
//           <td>MDB_Recipe</td>
//           <td>Step_Name</td>
// 		  <td>12</td>
// 		  <td>25</td>
// 		  <td>890/1000</td>
// 		  <td>580/12/600</td>
// 		  <td>130/130/130/125</td>
//         </tr>      
// 	</tbody>
// </table>  
// </div>
// </div>   
// </div>
    
//   );
// }

// export default SignUp; 
import React from 'react'; 
import './Pages.css';  

const Register = () => { 
  const submitbysubmitBtn = ()=>  {
    var name = document.getElementById("name").value;
    //var passwd = document.getElementById("passwd").value;
    if (validation()) {
      if(!IsIntheDataBase())
      {
        alert("user name or password is not match !!!");
        return;
      }
      console.log('user:',name +'is loging ok');
      // var x = document.getElementsByName('login');
      //     x[0].submit(); // form submission
      //     alert(" Name : " + name + " \n" +
      //         "password : " + passwd + " \n" +
      //         "Form Name : " + document.getElementById("register").getAttribute("name") + "\n\n" +
      //         "Form Submitted Successfully");      
    }
}
function validation() {
  var name = document.getElementById("name").value;
  var passwd = document.getElementById("passwd").value;
  if (name === "" || passwd === "") {
      alert("Please fill all fields...!!!!!!");
      return false;
  } else {
      return true;
  }
}
function IsIntheDataBase() {
  var name = document.getElementById("name").value;
  var passwd = document.getElementById("passwd").value;
  if (name === "admin" || passwd === "12345") {
      
      return true;
  } else {
      return false;
  }
}
return ( 
  
	//<form id="register" name="register" method="post" action="noaction.html">
  //<form id="login" name="login" method="post" action="#"> 
  <div id="login" name="login">
    <p>
      <label for="name">UserID </label>
        <input type="text" name="name" id="name" placeholder="Name"></input>
    </p>
    <p>
      <label for="passwd">Passwd</label>
        <input type="text" name="passwd" id="passwd" placeholder="passwd"></input>
      
    </p>   
    <p>
      <input type="submit" name="button" id="button" value="Submitbybtn" onClick = {submitbysubmitBtn}>Submit</input>
    </p>
  </div>
//</form>
); 
}; 
// function submit_by_name() {
//   validation();   
// }
// function submit_by_passwd() {
//   validation();  
// }<input type="submit" name="button" id="button" value="Submitbybtn" onclick="submit_by_tag()"/>Submit</input>
 
export default Register;

