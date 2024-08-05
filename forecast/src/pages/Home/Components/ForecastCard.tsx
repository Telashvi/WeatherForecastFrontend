import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import '../styles/ForecastCard.css';
import { CiSun } from 'react-icons/ci';
import { BiMoon } from 'react-icons/bi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars



interface MyComponentProps {
    index: number
}

interface minMaxTemps {
    Maximum: Maximum;
    Minimum: Minimum;
}

interface Maximum {
    Value: number;
}

interface Minimum {
    Value: number;
}

function ForecastCard(props: MyComponentProps) {
    const weeklyForecast = useAppSelector((state) => state.someSlice.weeklyForecast)
    const tempChoice = useAppSelector((state) => state.someSlice.tempChoice)


    const [dayName, setDayName] = useState('')
    const [temps, setTemps] = useState({ Maximum: { Value: 0 }, Minimum: { Value: 0 } })

    function getDayName(dateString: string) {
        const dayName = new Date(dateString)
            .toLocaleDateString('en-US', { weekday: 'long' });
        setDayName(dayName)
    }


    function getDayTemp(metricTemp: minMaxTemps, imperialTemp: minMaxTemps) {
        if (tempChoice === 'C') setTemps(metricTemp)
        if (tempChoice === 'F') setTemps(imperialTemp)

    }




    useEffect(() => {
        getDayName(weeklyForecast.responseImperial.DailyForecasts[props.index].Date)
        getDayTemp(weeklyForecast.responseMetric.DailyForecasts[props.index].Temperature,
            weeklyForecast.responseImperial.DailyForecasts[props.index].Temperature
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempChoice])
    return (
        <div className="main-container-ForecastCard">
            <div>{dayName}</div>
            <div className='day-night-degrees-container'>
                <div className="degrees">
                    <div className="degree-sign" >°</div>
                    <div id="max-temp">{temps.Maximum.Value.toFixed(1)}</div>
                </div>
                <div className='degrees-seperator'>/</div>
                <div className="degrees">
                    <div className="degree-sign">°</div>
                    <div>{temps.Minimum.Value.toFixed(1)}</div>
                </div>

            </div>
            <div className='day-night-symbols'>

                <CiSun />
                <BiMoon />
            </div>
        </div>
    );
}

export default ForecastCard;
