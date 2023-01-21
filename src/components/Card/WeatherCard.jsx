import React, { useEffect, useState } from 'react'
import './weathercard.css'
import { Card, Image, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Graph from '../Graph/Graph';
import { Progress } from 'semantic-ui-react'
import img1 from '../../assets/main.jpg'
import Clear from '../../assets/Clear.jpg'
import Clouds from '../../assets/Clouds.jpg'
import Drizzle from '../../assets/Drizzle.jpg'
import Rain from '../../assets/Rain.jpg'
import Snow from '../../assets/Snow.jpg'
import Thunderstorm from '../../assets/Thunderstorm.jpg'


function WeatherCard() {
  const [temp, setTemp] = useState(null);
  const [search, setSearch] = useState("Pune");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      const response = await fetch(url);
      const resInJson = await response.json();
      // console.log(resInJson);
      setTemp(resInJson.main);
      setWeather(resInJson.weather);
      console.log(resInJson.weather);
    };
    fetchApi();
  }, [search])

  function getMainImage(status) {
    if (weather[0].main === 'Rain') {
      return Rain;
    }
    if (weather[0].main === 'Clear') {
      return Clear;
    }
    if (weather[0].main === 'Clouds') {
      return Clouds;
    }
    if (weather[0].main === 'Drizzle') {
      return Drizzle;
    }
    if (weather[0].main === 'Snow') {
      return Snow;
    }
    if (weather[0].main === 'Thunderstorm') {
      return Thunderstorm;
    }
    return img1;

  }
  return (
    <>
      <div className="heading">
        <h1>Weather App</h1>
      </div>

      <div className="main">
        <Card id="main-card">
          {!temp ? (<Image src={img1} wrapped ui={false} />) : (<Image src={getMainImage(weather[0].main)} wrapped ui={false} />)}
          <Card.Content id="card">
            <Input type='search' className='search' placeholder='Search City...' onChange={(event) => { setSearch(event.target.value) }} />
            <Card.Header className='header'>{search}</Card.Header>
            <div>
              {!temp ? (<p><b>City not found</b></p>) : (
                <>
                  <div className="weather">
                    <p>Weather: {weather[0].main}</p>
                    <div id="icon"><img src={"http://openweathermap.org/img/w/" + weather[0].icon + ".png"} alt="" /></div>
                  </div>
                  <div id="card-meta">
                    <span className='minTemp'><b>Temperature: {temp.temp} <span>&#176;</span> C</b></span>
                    <Progress value={Math.trunc(temp.temp)} total='100' progress='percent' size='small' color='yellow' className='minTemp' label='Temperature' />

                  </div>
                  <div className='press-humi'>
                    <p>Humidity:</p>
                    <Progress value={Math.trunc(temp.humidity)} total='100' progress='percent' className="humidity" size='small' color='yellow' label='Humidity' />
                  </div>
                  <div className="min-max-temp">
                    <p className="min-temp">Min temp: {temp.temp_min} <span>&#176;</span> C</p>
                    <p className="max-temp">Max temp: {temp.temp_max}<span>&#176;</span> C</p>
                  </div>
                </>
              )}
            </div>

          </Card.Content>

        </Card>
        <Graph src={search} id="main-graph" />
      </div>

    </>
  )
}

export default WeatherCard