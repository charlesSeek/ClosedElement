import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/main_layout';

const App = () =>{
		return(
			<div>
				<MainLayout/>
			</div>
		)
}
Meteor.startup(()=>{
	ReactDOM.render(<App/>,document.querySelector('.container'));
})
