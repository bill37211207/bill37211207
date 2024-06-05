import React from 'react'; 
import './App.css'; 
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages'; 
//import {IsIntheDataBase} from './pages/index'; 
import About from './pages/about'; 
import Processing from './pages/processing'; 
//import Eventlogviewer from './pages/eventlogviewer'
//import {ClientSocket} from './pages/events'; 
import EventLogViewer from './pages/eventlogviewer'; 
import WaferHistoryViewer from './pages/waferhistoryviewer'; 
import Issues from './pages/issues'; 
import Register from './pages/register'; 
import Login from './pages/login'; 
import Logout from './pages/logout'; 
import ProtectedRoutes from "./utils/ProtectedRoutes";
window.onload = function() { 
	
    setTimeout(function(){
		onClickStart();
    },8000); 
} 
const Permission = {
	User: "User",
	Admin: "Admin",
  };
 
const user = { login: true, permission: ["Admin"] };
var userTemp = { login: false, permission: ["User"] };
const date = new Date();
console.log(date); 
var userArray = [];
userArray.push({name:'admin',passwd:'12345'});
userArray.push({name:'user',passwd:'12345'});
function IsIntheDataBase(name,passwd) {   
  
    var result = userArray.some(function(item, index, array){
      return (item.name === name && item.passwd ===passwd );
      
    });
    console.log(result); 
    return result;
   }
   var loginok = false;
   var logoutok = false;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        passwd : '',
        logvalue : ''
        
    };
}
handleCallback = (childData,childData2,childData3) => {
    // Update the name in the component's state
    this.setState({ name: childData ,passwd:childData2,logvalue:childData3}); 
};
// validation = () =>{
//   var name = document.getElementById("myname").value;
//   var passwd = document.getElementById("mypasswd").value;
//   if (name === "" || passwd === "") {
//       alert("Please fill all fields...!!!!!!");
//       return false;
//   } else {
//       return true;
//   }
// }

render()
{
    //const { name,passwd ,logvalue} = this.state;
    const { name,passwd ,logvalue} = this.state;
    //if (this.validation())
    if(name !== "" || passwd !== "")   
    {
      if(logvalue === 'Login')
      {
        if(IsIntheDataBase(name,passwd))
        {
          userTemp.login= true;
          if(name === 'admin')
          userTemp.permission = ["Admin"];
          else if( name === 'user')
          userTemp.permission = ["User"];
          console.log('user or admin is login ok') 
          if(!loginok)
          {
             alert("user or admin is login ok");
             loginok = true;
             logoutok = false;
             var elementsForm = document.getElementById("login");
             elementsForm.style.visibility = 'hidden';
          }
          
          
         // var el = document.querySelector(".myclassLogin");
         var elements = document.querySelectorAll("input[name=myLogin]");
           
          
          console.log(elements[0].value); 
          elements[0].value= 'Logout';
          console.log(elements[0].value); 
          
          // var el = document.querySelector("#mylogin");
          
          if( elements[0].value   === "login" ||  elements[0].value  === "Login") 
          {
            elements[0].value= 'Logout';
          }
          else 
          {
            elements[0].value= 'Login';
            
          }
          // changeText.addEventListener("click", function() {
          // changeText.textContent = "Logout";
          // });
        }
      }
      else if(logvalue === 'Logout') 
      {
        if(IsIntheDataBase(name,passwd))
        {  
          userTemp.login= false;
          if(name === 'admin')
          userTemp.permission = ["Admin"];
          else if( name === 'user')
          userTemp.permission = ["User"];
          console.log('user or admin is logout ok')
          if(!logoutok)
          {
             alert("user or admin is logout ok");
             logoutok = true;
             loginok = false;
             var elementsFormt = document.getElementById("logout");
             elementsFormt.style.visibility = 'hidden';
          }
          
          // const changeText = document.getElementsByName("myLgoin");
          // changeText.changeText = "Login";
          // changeText.addEventListener("click", function() {
          // changeText.textContent = "Login";
          // });        
        }
        else{
          userTemp = { login: false, permission: ["User"] };
          console.log('verify not ok can not logout!') 
        }
      }   
    }
    // if(name !== "" || passwd !== "")     
    // {
    //   if(logvalue === 'Login')
    //   {
    //     if(name === 'Admin' && passwd === '12345')
    //     {
    //       userTemp.login= true;
    //       userTemp.permission = ["Admin"];
    //       console.log('user is :Admin and verify ok') 
    //     }
    //     else if( name !== 'Admin' && passwd === '56789')
    //     {
    //       userTemp = { login: true, permission: ["User"] };
    //       console.log('user is :User and verify ok') 
    //     } 
    //     else
    //     {
    //       userTemp = { login: false, permission: ["User"] };
    //       console.log('user is :verify not ok can not login!') 
    //     } 
    //   }
    //   else if(logvalue === 'Logout')      
    //   {
    //     if(name === 'Admin' && passwd === '12345')
    //     {
    //       userTemp.login= false;
    //       userTemp.permission = ["Admin"];
    //       console.log('Admin is :log out ok') 
    //     }
    //     else if( name !== 'Admin' && passwd === '56789')
    //     {
    //       userTemp = { login: false, permission: ["User"] };
    //       console.log('user is : logout ok') 
    //     } 
    //     else
    //     {          
    //       console.log('user is :verify not ok can not logout!') 
    //     } 
    //   }
    //}

return (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home parentCallback={this.handleCallback}/>} /> */}
        <Route path="/" element={<Home/>} /> 
        <Route path="/login" element={ <Login parentCallback={this.handleCallback} /> } />
        <Route path="/logout" element={ <Logout parentCallback={this.handleCallback}/> } />

        <Route element={<ProtectedRoutes user={userTemp} />}>
          <Route path="/processing" element={<Processing />} />
          <Route path="/eventlogviewer" element={<EventLogViewer />} />
          <Route path="/waferhistoryviewer" element={<WaferHistoryViewer />} />
          <Route path="/issues" element={<Issues />} />             
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </div>
);  
}
}
  



export default App; 

export function onClickStart()
{   
	const date = new Date();
    console.log(date); 
    console.log('Socket log end')
}
