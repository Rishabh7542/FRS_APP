import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <div >
            <p className='f3'>
                {'Magic Brain'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5 focus-outline'>
                    <input className='f4 pa2 w-70 center br2 hover-bg-light-gray' placeholder="Enter Image Url" type='text' onChange={onInputChange}/>
                    <button className='w-30 grow br2 f4 link ph3 pv2 dib white bg-light-purple pointer' onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;