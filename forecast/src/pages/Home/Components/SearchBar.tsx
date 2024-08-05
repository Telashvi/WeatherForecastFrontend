import { useRef } from "react";
import { gatherCurrentWeatherData, gatherLocationKey, gatherWeatherForecastData } from "../dataAccessLayer";
import '../styles/SearchBar.css'
import { useDispatch } from "react-redux";
import { setCityName, setCurrentKey, setCurrentWeatherTemperature, setTempChoice, setWeatherText, setWeeklyForecast } from "../../../redux/someSlice";
import { useAppSelector } from "../../../redux/hooks";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
function SearchBar() {

    const cityName = useAppSelector((state) => state.someSlice.cityName);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()
    async function handleSearch() {
        if (searchInputRef.current) {
            const locationKey: number | boolean = await gatherLocationKey(searchInputRef.current.value);
            if (locationKey === false) {
                notify()
                return
            }
            const currentWeatherData = await gatherCurrentWeatherData(locationKey)
            const weatherForecastData = await gatherWeatherForecastData(locationKey)
            dispatch(setCurrentWeatherTemperature(currentWeatherData[0].Temperature))
            dispatch(setWeeklyForecast(weatherForecastData))
            dispatch(setCityName(searchInputRef.current.value))
            dispatch(setWeatherText(currentWeatherData[0].WeatherText))
            dispatch(setCurrentKey(locationKey))
        }
    }

    function tempPickerHandler(choice: string) {
        dispatch(setTempChoice(choice))
    }

    function notify() {
        toast('This city does not exists');
    }

    return (
        <>
            <div className="main-container-SearchBar">
                <input
                    placeholder="Enter city name"
                    ref={searchInputRef}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {cityName !== '' && <div className="temp-picker">
                <button onClick={() => tempPickerHandler('C')}>Celcius</button>
                <button onClick={() => tempPickerHandler('F')}>Farenheit</button>
                <Link to="/favorites" className="to-favorites-btn">Favorites</Link>

            </div>}
            <Toaster />
        </>

    )
}

export default SearchBar;