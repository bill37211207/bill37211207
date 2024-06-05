 
// import React from 'react'; 
// import './Pages.css';  
// var userArray = [];
// userArray.push({name:'admin',passwd:'12345'});
// userArray.push({name:'user',passwd:'12345'});
// export function IsIntheDataBase(name,passwd) {   
//   //var flag = false;
//   var result = userArray.some(function(item, index, array){
//     return (item.name === name && item.passwd ===passwd );
    
//   });
//   console.log(result); 
//   return result;
//  }
// class Home extends React.Component {
	  
//     submitbysubmitBtn = (event)=>  {
//       this.props.parentCallback(
// 			event.target.myname.value,
//       event.target.mypasswd.value,
// 			event.target.myregist.value
// 		);
// 		event.preventDefault();
//     }
       
//     submitbyloginBtn = (event)=>  {
//       this.props.parentCallback(
// 			event.target.myname.value,
//       event.target.mypasswd.value,
// 			event.target.myLgoin.value
// 		);
// 		event.preventDefault();
//     }    
      
//   render() {
// 		return (
//       <div>
//                 <form id="login" name="login"  >
                
//                 <fieldset>
//                 <p>
//                     <label for="name">UserID </label>
//                     <input type="text" name="myname" id="myname" placeholder="Name" required></input>
//                 </p>
//                 <p>
//                     <label for="passwd">Passwd</label>
//                     <input type="text" name="mypasswd" id="mypasswd" placeholder="passwd" required></input>
                    
//                 </p>   
//                 <p>
//                     <button name="mylogin" id="mylogin" type="submit" class="btn btn-primary" onClick = {this.submitbyloginBtn}>Login</button>
//                 </p>
//                 <p>
//                     <button name="myregist" id="myregist" type="submit" class="btn btn-primary" onClick = {this.submitbysubmitBtn}>Register</button>
//                 </p>
//                 </fieldset>
//             </form>
//      </div>
			 
// 		);
// 	}
// }

// export default Home;

 
import React from 'react'; 
import './Pages.css';  

 
// //import React from 'react'; 

const Home = () => { 
return ( 
	<div 
	style={{ 
		display: 'flex', 
		justifyContent: 'Right', 
		alignItems: 'Right', 
		height: '100vh',
	}} 
	> 
	<div  id="picture"><h1>LPI Robusta 300mm</h1></div>
	 
	<div>
         <img src='images/pexelspixabay38544.jpg' display = {'left'}  width={'90%'}  height = {'80%'} alt='Home' />
    </div>
	</div> 
); 
}; 
export default Home;

 
 
 


 
 
 



