const searchBar = document.createElement('input');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('placeholder', 'Enter a city');
searchBar.setAttribute('id', 'search-bar');

const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'button');
searchButton.setAttribute('id', 'search-button');
searchButton.textContent = 'Search';

const weatherContainer = document.createElement('div');
weatherContainer.setAttribute('id', 'weather-container');

weatherContainer.appendChild(searchBar);
weatherContainer.appendChild(searchButton);
document.body.appendChild(weatherContainer);

const processData = (data) => {
  const { location, current } = data;
  const { name, region, country } = location;
  const { temp_c, condition } = current;
  const { text, icon } = condition;
  const weatherData = {
    name,
    region,
    country,
    temp_c,
    text,
    icon,
  };
  return weatherData;
};

const displayWeather = (weatherData) => {
  const {
    name, region, country, temp_c, text, icon,
  } = weatherData;
  const weatherDisplay = document.createElement('div');
  weatherDisplay.setAttribute('id', 'weather-display');

  const location = document.createElement('h2');
  location.textContent = `${name}, ${region}, ${country}`;

  const temperature = document.createElement('h3');
  temperature.textContent = `${temp_c}°C`;

  const condition = document.createElement('h3');
  condition.textContent = text;

  const weatherIcon = document.createElement('img');
  weatherIcon.setAttribute('src', `https:${icon}`);
  weatherIcon.setAttribute('alt', 'weather icon');

  weatherDisplay.appendChild(location);
  weatherDisplay.appendChild(temperature);
  weatherDisplay.appendChild(condition);
  weatherDisplay.appendChild(weatherIcon);

  if (weatherContainer.lastChild.id === 'weather-display') {
    weatherContainer.removeChild(weatherContainer.lastChild);
  }

  weatherContainer.appendChild(weatherDisplay);
};

const fetchWeather = async () => {
  const city = searchBar.value;
  const url = `http://api.weatherapi.com/v1/current.json?key=29c39c47ff36404ba9d124845231211&q=${city}`;

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  console.log(data);
  const weatherData = processData(data);
  console.log(weatherData);
  displayWeather(weatherData);
};

searchButton.addEventListener('click', () => {
  fetchWeather();
});

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});
