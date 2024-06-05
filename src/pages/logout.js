 
import React from 'react'; 
import './Pages.css';  

 
class Logout extends React.Component {
	// Function triggered when the form is submitted
	onTrigger = (event) => {
		// Call the parent callback function
		this.props.parentCallback(
			event.target.myname.value,
            event.target.mypasswd.value,
            event.target.myLogout.value
		);
		event.preventDefault();
	};
    // validation() {
    //     var name = document.getElementById("myname").value;
    //     var passwd = document.getElementById("mypasswd").value;
    //     if (name === "" || passwd === "") {
    //         alert("Please fill all fields...!!!!!!");
    //         return false;
    //     } else {
    //         return true;
    //     }
    //   }
      render() {
		return (
			<div>
				<form id="logout" onSubmit={this.onTrigger}>
					<input
						type="text"
						name="myname"
						placeholder="Enter Name"
					/>
					<br></br>
					<br></br>
                    <input
						type="text"
						name="mypasswd"
						placeholder="Enter passwd"
					/>
					<br></br>
					<br></br>
					<input name="myLogout" type="submit" value="Logout" />
					<br></br>
					<br></br>
				</form>
			</div>
		);
	}
}
export default Logout
// 	render() {
// 		return (
// 			<div>
//                     <form id="login" name="login" onSubmit={this.submitbysubmitBtn} >
                    
//                     <fieldset>
//                     <p>
//                         <label for="name">UserID </label>
//                         <input type="text" name="name" id="name" placeholder="Name" ></input>
//                     </p>
//                     <p>
//                         <label for="passwd">Passwd</label>
//                         <input type="text" name="passwd" id="passwd" placeholder="passwd"></input>
                        
//                     </p>   
//                     <p>
//                         <button name="button" id="button" type="submit" class="btn btn-primary" onClick = {submitbysubmitBtn}>Login</button>
//                     </p>
//                     <p>
//                         <button name="buttonRegist" id="buttonRegist" type="submit" class="btn btn-primary" onClick = {submitbysubmitBtn}>Register</button>
//                     </p>
//                     </fieldset>
//                 </form>
                
// 			</div>
// 		);
// 	}
// }

 
 
 

