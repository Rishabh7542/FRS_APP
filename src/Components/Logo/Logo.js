import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'


const Logo = () => {
    return (
        <div className='absolute ma4' style={{ top: '20px', left: '20px' }}>
            <Tilt className="tilt-container" tiltMaxAngleX={45} tiltMaxAngleY={45} scale={1.1} transitionSpeed={800}>
                <div className="w4 h4 flex items-center justify-center br2 shadow-1 logo-container">
                    <h1 className="white f6 tc"><img alt="Logo" src={brain}/></h1>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;