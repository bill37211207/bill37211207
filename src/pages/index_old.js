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
 

// export default SignUp; 
import React from 'react'; 
import './Pages.css';  

const Home = () => { 
  const submitbysubmitBtn = ()=>  {
    var name = document.getElementById("name").value;
    var passwdRg = document.getElementById("passwd").value;
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
const submitbyloginBtn = ()=>  {
  var name = document.getElementById("name").value;
  var nameRg = document.getElementById("name").value;
  //var passwd = document.getElementById("passwd").value;
  if (validation()) {
    if(!IsIntheDataBase())
    {
      alert("user name or password is not match !!!");
      return;
    }
    console.log('user:',name +'is login ok');
    console.log('user:',name +'is login ok');

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
 
  
	<form id="login" name="login"  >
    
  <fieldset>
    <p>
      <label for="name">UserID </label>
        <input type="text" name="name" id="name" placeholder="Name" ></input>
    </p>
    <p>
      <label for="passwd">Passwd</label>
        <input type="text" name="passwd" id="passwd" placeholder="passwd"></input>
      
    </p>   
    <p>
      <button name="buttonlogin" id="buttonlogin" type="submit" class="btn btn-primary" onClick = {submitbyloginBtn}>Login</button>
    </p>
    <p>
      <button name="buttonRegist" id="buttonRegist" type="submit" class="btn btn-primary" onClick = {submitbysubmitBtn}>Register</button>
    </p>
  </fieldset>
</form>
); 
};
export default Home;

