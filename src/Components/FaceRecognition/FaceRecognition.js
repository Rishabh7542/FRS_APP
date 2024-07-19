import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box, boxes }) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} height='500px' width='auto' />
                <div
                    className='bounding-box'
                    style={{ 
                        top: box.topRow, 
                        bottom: box.bottomRow, 
                        left: box.leftCol, 
                        right: box.rightCol }}
                >
                </div>
                {/* <div
                    className='bounding-box'
                    style={{ 
                        top: boxes[1].boxCoordinates.topRow, 
                        bottom: boxes[1].boxCoordinates.bottomRow, 
                        left: boxes[1].boxCoordinates.leftCol, 
                        right: boxes[1].boxCoordinates.rightCol }}
                >
                </div> */}
            </div>
        </div>
    );
}

export default FaceRecognition;