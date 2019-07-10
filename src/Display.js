import React from 'react'

function Display(props) {
    console.log(props)
    if(props.media==='video')
        return (
            <div className = "video_container">
                <iframe src={`${props.url}controls=1`} width="960px" height="720px"></iframe>
            </div>
        )
    else
        return(
            <div className="image_container">
                <img src={`${props.url}`} alt="Photo of the Day" />
            </div>
        )
}

export default Display
