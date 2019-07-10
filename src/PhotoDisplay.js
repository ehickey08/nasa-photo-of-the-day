import React from 'react'
import styled from 'styled-components'

function PhotoDisplay(props) {
    console.log(props)
    if(props.media==='video')
        return (
            <div className = "video_container">
                <iframe src={`${props.url}controls=1`} width="960px" height="720px"></iframe>
                <DisplayDate>{props.date}</DisplayDate>
                <ExplanationContainer>{props.explanation}</ExplanationContainer>
            </div>
        )
    else
        return(
            <div className="image_container">
                <img src={`${props.url}`} alt="Photo of the Day" />
                <DisplayDate>{props.date}</DisplayDate>
                <ExplanationContainer>{props.explanation}</ExplanationContainer>
            </div>
        )
}

export default PhotoDisplay

const DisplayDate = styled.h4`
    margin-top: 25px;
`

const ExplanationContainer = styled.p`
    padding: 20px;
    color: #9696D4;
    font-weight: bold;
`