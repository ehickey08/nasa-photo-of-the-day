import React from 'react'

function RoverDisplay(props) {
    return (
        <div>
            {typeof(props.photos)==='string' && props.photos}
            {typeof(props.photos)==='object' && props.photos.map(photo => {
                return <img src={`${photo.img_src}`} />
            })}
        </div>
    )
}

export default RoverDisplay
