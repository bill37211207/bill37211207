 
import React from 'react'; 
import './Pages.css';  

 
class Login extends React.Component {
	// Function triggered when the form is submitted
	onTrigger = (event) => {
		// Call the parent callback function
		this.props.parentCallback(
			event.target.myname.value,
            event.target.mypasswd.value,
			event.target.myLogin.value
	 
		);
		event.preventDefault();
	};
    
      render() {
		 
		return (
			<div>
				<form id="login" onSubmit={this.onTrigger}>
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
					<input className='myclassLogin' id = 'mylogin' name="myLogin" type="submit" value=  'Login' />
					 
					<br></br>
					<br></br>
				</form>
			</div>
		);
	}
}
export default Login;


 
 
 

