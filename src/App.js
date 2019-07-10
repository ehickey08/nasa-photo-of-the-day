import React, {useState, useEffect} from "react";
import axios from 'axios'
import "./App.css";
import Display from './Display'
function App() {
    const [photoDetails, setPhotoDetails] = useState({url: '', explanation: '', title: '', media_type: ''})
    const [chosenDate, setChosenDate] = useState('2019-07-10')

    function getPhoto(url, date){
        axios 
            .get(url)
            .then(res => {
                setPhotoDetails({
                    url: res.data.url,
                    explanation: res.data.explanation,
                    title: res.data.title,
                    type: res.data.media_type
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPhoto(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`, chosenDate)
    }, [])

  return (
    <div className="app_container">
        <h1 className="title">{photoDetails.title}</h1>
        <Display media={photoDetails.type} url={photoDetails.url}/>
        <h4>{chosenDate}</h4>
        <p>{photoDetails.explanation}</p>
    </div>
  );
}

export default App;
