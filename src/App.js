import React, {useState, useEffect} from "react";
import axios from 'axios'
import Display from './Display'
import {DatePicker, Spin} from 'antd'
import moment from 'moment'
import styled from 'styled-components'

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
    <AppContainer>
        <HeaderContainer>
            <h1 className="title">{photoDetails.title}</h1>
            <DateContainer>
                <h4>Select your date:</h4>
                <DatePicker defaultValue={moment(`${chosenDate}`, `YYYY-MM-DD`)} onChange={(date, dateString) => setChosenDate(dateString)}/>
            </DateContainer>
        </HeaderContainer>
        {isLoading ? <Spin size='large' /> : <Display media={photoDetails.type} url={photoDetails.url}/>}
        <DisplayDate>{chosenDate}</DisplayDate>
        <ExplanationContainer>{photoDetails.explanation}</ExplanationContainer>
    </AppContainer>
  );
}

export default App;


const AppContainer = styled.div`
    width: 1200px;
    min-height: 100vh
    margin: 0 auto;
    background: white;
    text-align: center;
    margin-top: -15px;
`

const HeaderContainer = styled.nav`
    padding: 50px;
    display: flex;
    background: #9696D4;
    justify-content: space-evenly;
    color: white;
    margin-bottom: 50px;
    h1{
        line-height: 60px;
        color: white;
        font-size: 40px;
    }
`

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    h4{
        color: white;
        text-decoration: underline;
    }
`

const DisplayDate = styled.h4`
    margin-top: 25px;
`

const ExplanationContainer = styled.p`
    padding: 20px;
    color: #9696D4;
    font-weight: bold;
`