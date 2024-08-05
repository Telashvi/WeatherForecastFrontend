/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchBar from "./Components/SearchBar";
import MainCard from './Components/MainCard';
import './styles/Home.css'
import ForecastCard from './Components/ForecastCard';
import { useAppSelector } from "../../redux/hooks";

function Home() {
  const cityName = useAppSelector((state) => state.someSlice.cityName);


  return (
    <>
      
      <div className="main-container">
        <SearchBar />
        {cityName !== '' && <MainCard />}
      </div>


      {cityName !== '' && (
        <div className="forecast-cards-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <ForecastCard index={index} />
          ))}
        </div>
      )}

    </>

  );
}

export default Home;
