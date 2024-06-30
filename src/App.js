import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';

const MODEL_ID = 'general-image-detection';
let cnt = 0; 

const returnClarifaiRequestOptions = (imageURL) => {
  const PAT = 'e6db3705d2f944d3b2ff4fc58f9723c5';
  const USER_ID = 'rishabh7542';
  const APP_ID = 'my-first-application-s6by7cq';

  // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = imageURL;


  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [{}],
    }
  }

  // User made function
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  detectFaceLocation = (faceRegion) => {
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      topRow : faceRegion.top_row * height,
      leftCol : faceRegion.left_col * width,
      bottomRow : height - (faceRegion.bottom_row * height),
      rightCol : width - (faceRegion.right_col * width),
    };
  }


  displayFaceBox = (boxCoordinates) => {
    this.setState({box: boxCoordinates})
  }
  // User made function
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => {
        const regions = result.outputs[0].data.regions;
        
        regions.forEach(region => {
          region.data.concepts.forEach(concept => {
            console.log(concept.name);
            if (concept.name === 'Window') {
              // console.log(region);
              cnt++;
              this.displayFaceBox(this.detectFaceLocation(region.region_info.bounding_box));
            }
          });
        });
        console.log(cnt);
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <ParticlesBg num={150} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
