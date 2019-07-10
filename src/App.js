import React, {useState, useEffect} from "react";
import axios from 'axios'
import "./App.css";
import Display from './Display'
import {DatePicker, Spin} from 'antd'
import moment from 'moment'

function App() {
    const [photoDetails, setPhotoDetails] = useState({url: '', explanation: '', title: '', media_type: ''})
    const [chosenDate, setChosenDate] = useState('2019-07-10')
    const [isLoading, setIsLoading] = useState(true)

    function getPhoto(url, date){
        axios 
            .get(`${url}&date=${date}`)
            .then(res => {
                setPhotoDetails({
                    url: res.data.url,
                    explanation: res.data.explanation,
                    title: res.data.title,
                    type: res.data.media_type
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPhoto(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`, chosenDate)
    }, [chosenDate])

  return (
    <div className="app_container">
        <h1 className="title">{photoDetails.title}</h1>
        <DatePicker defaultValue={moment(`${chosenDate}`, `YYYY-MM-DD`)} onChange={(date, dateString) => setChosenDate(dateString)}/>
        {isLoading ? <Spin size='large' /> : <Display media={photoDetails.type} url={photoDetails.url}/>}
        <h4>{chosenDate}</h4>
        <p>{photoDetails.explanation}</p>
    </div>
  );
}

export default App;
