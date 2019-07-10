import React, {useState, useEffect} from "react";
import {Route, NavLink} from 'react-router-dom'
import axios from 'axios'
import PhotoDisplay from './PhotoDisplay'
import RoverDisplay from './RoverDisplay'
import {DatePicker, Spin} from 'antd'
import moment from 'moment'
import styled from 'styled-components'

function App() {
    const [photoDetails, setPhotoDetails] = useState({url: '', explanation: '', title: '', media_type: ''})
    const [chosenDate, setChosenDate] = useState('2019-07-10')
    const [isLoading, setIsLoading] = useState(true)
    const [desiredInfo, setDesiredInfo] = useState('photo')
    const [roverPhotos, setRoverPhotos] = useState()

    function getPhoto(url, date){
        setIsLoading(true)
        axios 
            .get(`${url}&date=${date}`)
            .then(res => {
                setPhotoDetails({
                    url: res.data.url,
                    explanation: res.data.explanation,
                    title: res.data.title,
                    media_type: res.data.media_type
                })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    function getRover(url){
        setIsLoading(true)
        axios 
            .get(`${url}`)
            .then(res => {
                if(res.data.photos.length>0)
                    setRoverPhotos(res.data.photos)
                else
                    setRoverPhotos('Choose another date. No photos from today!')
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if(desiredInfo === 'photo')
            getPhoto(`https://api.nasa.gov/planetary/apod?api_key=sWPlYahrNBC3rjRxIqNGEWbx5NcCutRclrvHkS7O`, chosenDate)
        else if(desiredInfo === 'mars')
            getRover(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${chosenDate}&api_key=sWPlYahrNBC3rjRxIqNGEWbx5NcCutRclrvHkS7O`)
    }, [chosenDate, desiredInfo])

  return (
    <AppContainer>
        <HeaderContainer>
            <div>
                {desiredInfo==='photo' ? <h1 className="title">{photoDetails.title}</h1> : <h1>Photos from Curiosity</h1>}
                <DateContainer>
                    <h4>Select your date:</h4>
                    <DatePicker defaultValue={moment(`${chosenDate}`, `YYYY-MM-DD`)} onChange={(date, dateString) => setChosenDate(dateString)}/>
                </DateContainer>
            </div>
            <NavContainer>
                <NavLink to="/photoOfDay" onClick={() => setDesiredInfo('photo')}>Photo of the Day!</NavLink>
                <NavLink to="/MarsRover" onClick = {() => setDesiredInfo('mars')}>Mars Rover Photo</NavLink>
            </NavContainer>
        </HeaderContainer>
        {isLoading && <Spin size='large' />} 
        <Route path="/photoOfDay" render={(props) => <PhotoDisplay {...props} media={photoDetails.media_type} url={photoDetails.url} date={chosenDate} explanation={photoDetails.explanation} />} />
        <Route path="/MarsRover" render={(props) => <RoverDisplay {...props} photos={roverPhotos} />} />
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

const NavContainer = styled.div`
    text-decoration: none;
    a{
        color: white;
        &:hover{
            color: white;
            text-decoration: underline
        }
    }
`

const HeaderContainer = styled.nav`
    padding: 50px;
    background: #9696D4;
    margin-bottom: 50px;
    display: flex;
    flex-direction:column;

    div{
        color: white;
        justify-content: space-evenly;
        display: flex;
    }
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