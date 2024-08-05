export interface TemperatureMetric {
  Value: number;
  Unit: string;
}
export interface TemperatureImperial {
  Value: number;
  Unit: string;
}

export interface CurrentWeatherTemperature {

  Metric: TemperatureMetric;
  Imperial: TemperatureImperial;
}

export interface SomeSliceState {
  cityName: string;
  CurrentWeatherTemperature: CurrentWeatherTemperature;
  weeklyForecast: WeeklyForecast;
  tempChoice: string;
  weatherText: string;
  key: number | boolean;
}

export interface WeeklyForecast {
  responseImperial: responseImperial;
  responseMetric: responseMetric;
}


interface responseImperial {
  DailyForecasts: Array<DailyForecast>
}

interface responseMetric {
  DailyForecasts: Array<DailyForecast>

}



export interface currentWeather {
  WeatherText: string;
  Temperature: CurrentWeatherTemperature | [];
}


interface DailyForecast {
  Date: string;
  Temperature: Temperature;
}

interface Temperature {
  Maximum: Maximum
  Minimum: Minimum
}

interface Maximum {
  Value: number;
  Unit: string;
}

interface Minimum {
  Value: number;
  Unit: string;
}