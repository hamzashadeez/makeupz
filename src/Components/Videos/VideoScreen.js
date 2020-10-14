import React from 'react'
import Video from './Video'
import './style.css'

const VideoScreen = () => {
    return (
        <div className='Video_screen'>
            <div className='alerting'>
                <h6>Videos a cikin harshen Hausa suna nan take ba da dadewa ba </h6>
            </div>
            <Video src={'https://www.youtube.com/embed/Urhco0_M7iE'} title='Easy Makeup for Beginners' />
            <Video src={"https://www.youtube.com/embed/-k9ZpHLxMoI"} title='Makeup #1'/>
            <Video src={"https://www.youtube.com/embed/Jgpkddk2n60"} title='DETAILED UPDATED EYEBROW TUTORIAL'/>
        </div>
    )
}

export default VideoScreen
