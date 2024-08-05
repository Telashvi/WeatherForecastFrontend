import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks'; 
import '../styles/MainCard.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MainCard() {



    const cityName = useAppSelector((state) => state.someSlice.cityName);
    const currentDegreesSelector = useAppSelector((state) => state.someSlice.CurrentWeatherTemperature)
    const tempChoice = useAppSelector((state) => state.someSlice.tempChoice)
    const weatherText = useAppSelector((state) => state.someSlice.weatherText)
    const locationId = useAppSelector((state) => state.someSlice.key);
    const [currentDegrees, setCurrentDegrees] = useState(0)


    function selectDegreesUnit() {
        if (tempChoice === 'C') {
            setCurrentDegrees(currentDegreesSelector.Metric.Value)
        }
        if (tempChoice === 'F') {
            setCurrentDegrees(currentDegreesSelector.Imperial.Value)
        }
    }
    
    function addToFavorites() {
        const favoritesString = localStorage.getItem('favorites');
        const favorites = favoritesString ? JSON.parse(favoritesString) : [];
    
        favorites.push({cityName,locationId});
    
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    
    useEffect(() => {
        selectDegreesUnit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempChoice, currentDegreesSelector]);


    return (
        <>
            <div className="main-container-MainCard">
                <div>{cityName || 'City Name'}</div>
                <div>{weatherText || "Weather text"}</div>
                <div className="degrees">
                    <div className="degree-sign">°{tempChoice}</div>
                    <div>{currentDegrees.toFixed(1)}</div>
                </div>
                <button className='add-to-fav-btn' onClick={addToFavorites}>Add to favorites</button>
            </div>

        </>

    );
}

export default MainCard;
