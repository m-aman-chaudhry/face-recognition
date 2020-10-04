import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js';
//import particlesconfig from './particlesconfig.json'
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: "4da8f62bc6f84716842e039e67265bbd",
});


const particlesConfiguration = {
	  particles: { 	
        number: {
        	value: 180,
        	density: {
        		enable: true,
        		value_area: 750
        	}
        },
	  interactivity: {
	  	detect_on: 'canvas',
	  	events: {
	  		onclick: {
	  		enable: true,
	  		mode: 'repulse'
	  		},
	  		onhover:{
	  		enable: true,
	  		mode: 'grab'
	  		},
	  		resize: true
	  	},
	  	modes: {
	  		grab: {
	  			distance: 400,
	  			line_linked: {
	  				opacity: 1
	  			}
	  		},
	  		
	  		repulse: {
	  			distance: 200,
	  			duration: 0.4
	  		}
	  	},
	  }
	},
	retina_detect: true
}

class App extends React.Component {
	constructor() {
		super ();
		this.state = {
			input: '',
			imageUrl: '',
			box: {}
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
 			this.setState({imageUrl: this.state.input})
 				app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
				.then((response) => {
 					console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
					})
					.catch((err) => {
 					console.log(err);
					});
};

    render() {
  	  return (
    	<div className="App">
      		<Particles className='particles'
            	params={particlesConfiguration} 
            />
      		<Navigation />
      		<Logo />
      		<Rank />
      		<ImageLinkForm 
      		 onInputChange={this.onInputChange} 
      		 onButtonSubmit={this.onButtonSubmit}
      		/>
      		<FaceRecognition imageUrl={this.state.imageUrl}/>
    	</div>
  );
  }
}

export default App;
