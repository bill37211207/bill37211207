import React from 'react'; 
import { 
Nav, 
NavLink, 
Bars, 
NavMenu, 
NavBtn, 
NavBtnLink, 
} from './NavbarElements'; 

const Navbar = () => { 
return ( 
	<> 
	<Nav> 
		<Bars />
		<NavMenu>
		<NavLink to='/processing' activestyle> 
			Processing 
		</NavLink> 
		<NavLink to='/eventlogviewer' activestyle> 
			Event Log Viewer 
		</NavLink> 
		<NavLink to='/waferhistoryviewer' activestyle> 
			Wafer History Viewer 
		</NavLink> 
		<NavLink to='/issues' activestyle> 
			Issues 
		</NavLink> 
		<NavLink to='/about' activestyle> 
			About 
		</NavLink>		
		 <NavLink to='/login' activestyle> 
		    login
		</NavLink>  
		<NavLink to='/logout' activestyle> 
		    logout
		</NavLink> 
		{/* <NavLink to='/' activestyle> 
			Home
		</NavLink>  */}
		{/* Second Nav */} 
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */} 
		</NavMenu> 
		{/* <NavBtn> 
		<NavBtnLink to='/register'activeStyle>Sign In</NavBtnLink> 
		</NavBtn>  */}
	</Nav> 
	</> 
); 
}; 

export default Navbar;


