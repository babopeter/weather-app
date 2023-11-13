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

const fetchWeather = async () => {
  const city = searchBar.value;
  const url = `http://api.weatherapi.com/v1/current.json?key=29c39c47ff36404ba9d124845231211&q=${city}`;

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  console.log(data);
  const weatherData = processData(data);
  console.log(weatherData);
};

searchButton.addEventListener('click', () => {
  fetchWeather();
});
