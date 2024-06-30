import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} height='500px' width='auto'/>
                <div className='bounding-box' style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}>

                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;