/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import './styles/Favorites.css'
import { Link, useNavigate } from 'react-router-dom';
import { setCityName, setCurrentKey, setCurrentWeatherTemperature, setWeatherText, setWeeklyForecast } from '../../redux/someSlice';
import { useDispatch } from 'react-redux';
import { gatherCurrentWeatherData, gatherLocationKey, gatherWeatherForecastData } from '../Home/dataAccessLayer';






interface favoriteForArray{
  locationId: number
  cityName: string
  currentDegreesSelector: currentDegreesSelector
}

interface favorite {
  locationId: number
  cityName: string
  currentDegreesSelector: currentDegreesSelector
}

interface currentDegreesSelector {
  Imperial: Unit
  Metric: Unit
}

interface Unit {
  Value: number
  Unit: string
}

function Favorites() {


  const [favoritesData, setFavoritesData] = useState<favorite[]>([])
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    const favoritesString = localStorage.getItem('favorites');
    const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
    getDegreesHandler(favoritesArray)

  }, []);


  async function getDegreesHandler(favoritesArray:favoriteForArray[]) {
    for (const favorite of favoritesArray) {
      const currentWeatherData = await gatherCurrentWeatherData(favorite.locationId)
      favorite.currentDegreesSelector = currentWeatherData[0].Temperature
    }
    setFavoritesData(favoritesArray);
  }


  async function navigateHomeWithData(cityName: string) {
    const locationKey: number | boolean = await gatherLocationKey(cityName);
    const currentWeatherData = await gatherCurrentWeatherData(locationKey)
    const weatherForecastData = await gatherWeatherForecastData(locationKey)
    dispatch(setCurrentWeatherTemperature(currentWeatherData[0].Temperature))
    dispatch(setWeeklyForecast(weatherForecastData))
    dispatch(setCityName(cityName))
    dispatch(setWeatherText(currentWeatherData[0].WeatherText))
    dispatch(setCurrentKey(locationKey))
    navigate('/');
  }
  return (
    <div className='favorites-container'>

      <Link to={'/'} className='to-home-btn'>Home</Link>


      {favoritesData.map((favorite: favorite) => {


        return (
          <div className="favorites-card-container">
            <>
              <div>{favorite.locationId}</div>
              <div>{favorite.cityName}</div>
              <div>Celcius - {favorite.currentDegreesSelector.Metric.Value}</div>
              <div>Fahrenheit - {favorite.currentDegreesSelector.Imperial.Value}</div>
              <button className="to-home-with-data-btn" onClick={() => navigateHomeWithData(favorite.cityName)}>Expand in home</button>
            </>
          </div>
        )
      })}



    </div>

  );
}

export default Favorites;
