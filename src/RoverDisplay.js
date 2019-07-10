import React from 'react'
import styled from 'styled-components'

function RoverDisplay(props) {
    return (
        <ImageContainer>
            {typeof(props.photos)==='string' && <h1>{props.photos}</h1>}
            {typeof(props.photos)==='object' && props.photos.map(photo => {
                return <img src={`${photo.img_src}`} />
            })}
        </ImageContainer>
    )
}

export default RoverDisplay

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    h1{
        text-align: center;
    }
    img{
        border-radius: 15px;
        width: 22%;
        padding: 5px 0;
    }    
`