const root = document.querySelector('#root'),
    
      city = document.querySelector('#city'),
      popup = document.querySelector('#popup'),
      popupClose = document.querySelector('.popup-close');

const form = document.querySelector('#form'),
      formInput = document.querySelector('#text-input');



const linkApi = 'http://api.weatherstack.com/current?access_key=333b9a3c6d7430cff08ff39f3f94beeb'

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
   try {
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

    render();
   } 
   catch(err) {
     root.innerHTML = `
        <img class ="app-404" src="img/404_animation.gif" alt=""  />
     `
   }
}

const htmlComponent = () => {
    const {
        city,
        weatherIcon,
        temperature,
        weatherDescription,
        observationTime,
        windSpeed,
        humidity,
        cloudcover
    } = storage

    return ` <div class="container">
        <header>
            <div class="city-title" id="city">${city}</div>
        </header>
        <main class="city-info">
            <div class="weather-icon">
                <img src="${weatherIcon}" alt="${weatherDescription}" width="150px" height="150px">
            </div>
            <div class="city-description">
                <span class="weather-temp">${temperature}°</span>
                <span class="weather-description">${weatherDescription}</span>
                <span class="weather-date">${observationTime}</span>
            </div>

            <div class="city-elements">
                <div class="wind element" >
                    <img src="img/icons/wind.png" alt="">
                    <span class="element-speed">${windSpeed} km/h</span>
                    <span class="element-name">Wind</span>
                </div>
                <div class="humidity element" >
                    <img  src="img/icons/humidity.png" alt="">
                    <span class="element-speed">${humidity}%</span>
                    <span class="element-name">humidity</span>
                </div>
                <div class="rain element" >
                    <img src="img/icons/gauge.png" alt="">
                    <span class="element-speed">${cloudcover}%</span>
                    <span class="element-name">Rain</span>
                </div>
            </div>

        </main>
      </div>
    </div>
`
}
const toggleClass = () => {
    popup.classList.toggle("active")
}

popupClose.addEventListener('click', toggleClass)

const render = () => {
    root.innerHTML = htmlComponent();


    const city = document.querySelector('#city')
    city.addEventListener('click', toggleClass)
};

const setInputValue = (e) => {
    storage = {
        ...storage,
        city: e.target.value
    }
}

const submitData = (e) => {
    e.preventDefault();
    getDataApi();

    toggleClass();
}


form.addEventListener('submit', submitData)
formInput.addEventListener('input', setInputValue)
 


getDataApi()