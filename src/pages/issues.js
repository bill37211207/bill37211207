import React from 'react'; 
import chemistryclassinstructionssvgrepocom from './chemistryclassinstructionssvgrepocom.svg';
import './App.css';
const Issues = () => { 
return ( 
	// <div 
	// style={{ 
	// 	display: 'flex', 
	// 	justifyContent: 'Center', 
	// 	alignItems: 'Center', 
	// 	height: '100vh'
	// }} 
	// > 
	// <h1>tools issues records</h1> 
	// <a href="http://localhost:8080/">Visit Wafer history tools!</a>
	// </div> 
	<div className="App">
	<header className="App-header">
	  <img src={chemistryclassinstructionssvgrepocom} className="App-logo" alt="chemistryclassinstructionssvgrepocom" />
	 
	  <a
		className="App-link"
		href="https://reactjs.org"
		target="_blank"
		rel="noopener noreferrer"
	  >
		issues report viewer
	  </a>
	</header>
  </div>
	
); 
}; 

export default Issues;
