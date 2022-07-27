

const linkApi = 'http://api.weatherstack.com/current?access_key=558e440c9ad8a11d427897d483ecf686'

let storage = {
    city: 'London',
    weatherIcon: 1,
    temperature: 20,
    weatherDescription: 'Sunny',
    observationTime: "12:08 PM",
    windSpeed: '13 km/h',
    humidity: '49%',
    cloudcover: 80
}

const getDataApi = async () => {
    const response = await fetch(`${linkApi}&query=${storage.city}`)
    const data = await response.json();
    console.log(data);

    const {
        current: {
            weather_icons: weatherIcon, 
            temperature,
            weather_descriptions: weatherDescription,
            observation_time: observationTime,
            wind_speed: windSpeed,
            humidity,
            cloudcover

        },
    } = data
    

    storage = {
        ...storage,
        weatherIcon: weatherIcon[0],
        temperature,
        weatherDescription: weatherDescription[0],
        observationTime,
        windSpeed,
        humidity,
        cloudcover
    }
} 

getDataApi()