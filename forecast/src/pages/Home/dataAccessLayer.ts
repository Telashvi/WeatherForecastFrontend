const apiKey = import.meta.env.VITE_API_KEY;
import axios from 'axios';

export async function gatherLocationKey(location: string): Promise<number | boolean> {
  
  try {
    const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete`, {
      params: {
        q: location,
        apikey: apiKey
      }
    });

    return (response.data[0].Key)
  } catch (error) {
    console.error('Error fetching location data:', error, console.log(error));
    return false;
  }
}


export async function gatherCurrentWeatherData(locationKey: number | boolean) {
  try {
    const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, {
      params: {
        apikey: apiKey,
        language: 'en-us',
        details: false
      }
    });
    return (response.data);
  } catch (error) {
    console.error('Error fetching location data:', error, console.log(error));
    return [];
  }
}

export async function gatherWeatherForecastData(locationKey: number | boolean) {
  try {
    const responseImperial = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, {
      params: {
        apikey: apiKey,
        language: 'en-us',
        details: false,
      }
    });
    const responseMetric = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, {
      params: {
        apikey: apiKey,
        language: 'en-us',
        details: false,
        metric: true
      }
    });
    return ({

      responseImperial: responseImperial.data,
      responseMetric: responseMetric.data
    }
    );
  } catch (error) {
    console.error('Error fetching location data:', error);

    return {

      responseImperial: {},
      responseMetric: {}
    }
  }
}
