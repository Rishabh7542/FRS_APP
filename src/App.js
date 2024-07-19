import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ParticlesBg from 'particles-bg';
import './App.css';

const MODEL_ID = 'face-detection';
let dummyBoxes = [];

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
      box: {},
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // User made function
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  // User made function
  detectFaceLocation = (faceRegion) => {
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      topRow: faceRegion.top_row * height,
      leftCol: faceRegion.left_col * width,
      bottomRow: height - (faceRegion.bottom_row * height),
      rightCol: width - (faceRegion.right_col * width),
    };
  }

  // User made function
  displayFaceBox = (boxCoordinates) => {
    this.setState({ box: boxCoordinates });
    // this.setState(prevState => ({
    //   boxes: [...prevState.boxes, this.state.box]
    // }));
    dummyBoxes.push({boxCoordinates});
  }



  // User made function
  onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input });
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => {
        if (result) {
          // Process the result from Clarifai API
          const regions = result.outputs[0].data.regions;
          regions.forEach(region => {
            // console.log(region.region_info.bounding_box);
            this.displayFaceBox(this.detectFaceLocation(region.region_info.bounding_box));
          });

          console.log('up',dummyBoxes);
          this.setState({boxes: dummyBoxes});
  
          // Update entry count
          return fetch('http://localhost:3001/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          });
        } else {
          throw new Error('No result from Clarifai API');
        }
      })
      .then(response => response.json())
      .then(entryCount => {
        // Update user entries count
        this.setState(Object.assign(this.state.user, { entries: entryCount }));
      })
      .catch(error => console.error('error', error));
  }

  
  /*onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json(),{
        if(response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                  // sending request body to the server
                id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(entryCount => {
            // We are changing user object so we use
            // Object.assign(target object, what we want to extend it with)
            this.setState(Object.assign(this.state.user, {entries: entryCount}))
          })
        }
      })
        
      
        
      
      .then(result => {
        // console.log(result); //
        // face-detection
        const regions = result.outputs[0].data.regions;
        // console.log(regions);

        // for(let i=0;i<regions.length;i++){
        //   console.log(i);
        //   this.displayFaceBox(this.detectFaceLocation(regions[i].region_info.bounding_box));
        // }

        regions.forEach(region => {
          console.log(region.region_info.bounding_box);
          this.displayFaceBox(this.detectFaceLocation(region.region_info.bounding_box));
        })

               // general-image-recognition
        ------------------------------------------
        // const regions = result.outputs[0].data.regions;
        // regions.forEach(region => {
        //   region.data.concepts.forEach(concept => {
        //     console.log(concept.name);
        //     if (concept.name === 'Human face') {
        //       console.log(region); //
        //       cnt++;
        //       this.displayFaceBox(this.detectFaceLocation(region.region_info.bounding_box));
        //     }
        //   });
        // });
        // console.log(cnt);
      })
      .catch(error => console.log('error', error));
  }*/



  // componentDidMount() {            -----> We do not need it in our app
  //   fetch('http://localhost:3001/')
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // }

  onRouteChange = (routeName) => {
    if(routeName === 'signout'){
      this.setState({isSignedIn: false});
    }
    else if(routeName === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({ route: routeName });
  }

  loadUserData = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg num={150} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {(this.state.route === 'home') ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} boxes={this.state.boxes}/>
          </div> :
          (
            (this.state.route === 'signin') 
            ? <SignIn loadUserData={this.loadUserData} onRouteChange={this.onRouteChange} /> :
              <Register loadUserData={this.loadUserData} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;


