import React from 'react'
import YouTube from 'react-youtube'
import './Skills.css'

const Skills = ({ video }) => {

    const videoId = video.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]+)/)[1];
    const opts = {
        height: '390',
        width: '100%',
        marginTop: "10px",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        }
    }
    console.log(video, "video link");

    return (
        <div>
            <div className="skills  m-5" >
                {/* <h2 className='text-header-youtube text-7xl'>Skills</h2> */}

                <>
                    <YouTube videoId={videoId} opts={opts} />
                </>

            </div>
        </div>
    )
}

export default Skills