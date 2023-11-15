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
  const { text, icon, code } = condition;
  const weatherData = {
    name,
    region,
    country,
    temp_c,
    text,
    icon,
    code,
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

  const iconDiv = document.createElement('div');
  const weatherIcon = document.createElement('img');
  weatherIcon.setAttribute('src', `https:${icon}`);
  weatherIcon.setAttribute('alt', 'weather icon');
  iconDiv.appendChild(weatherIcon);
  iconDiv.setAttribute('id', 'icon-div');

  weatherDisplay.appendChild(location);
  weatherDisplay.appendChild(temperature);
  weatherDisplay.appendChild(condition);
  weatherDisplay.appendChild(iconDiv);

  if (weatherContainer.lastChild.id === 'weather-display') {
    weatherContainer.removeChild(weatherContainer.lastChild);
  }

  weatherContainer.appendChild(weatherDisplay);
};

const fetchWeather = async () => {
  const city = searchBar.value;
  const url = `https://api.weatherapi.com/v1/current.json?key=29c39c47ff36404ba9d124845231211&q=${city}`;

  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  console.log(data);
  const weatherData = processData(data);
  console.log(weatherData);
  displayWeather(weatherData);
  removeBgVideo();
  loadBgVideo(selectBgVideo(weatherData));
};

searchButton.addEventListener('click', () => {
  fetchWeather();
});

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});

const loadBgVideo = (link) => {
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('muted', '');
  video.setAttribute('id', 'bg-video');
  video.setAttribute('src', link);
  document.body.appendChild(video);
};

const removeBgVideo = () => {
  if (document.body.lastChild.id === 'bg-video') {
    document.body.removeChild(document.body.lastChild);
  }
};

const selectBgVideo = (weatherData) => {
  const { code } = weatherData;
  if (code === 1000) {
    return './videos/clear.mp4';
  }
  if (code === 1003) {
    return './videos/partly-cloudy.mp4';
  }
  if (code === 1006 || code === 1009) {
    return './videos/cloudy.mp4';
  }
  if (code === 1030 || code === 1135) {
    return './videos/mist.mp4';
  }
  if (code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189
    || code === 1192 || code === 1195 || code === 1240 || code === 1243 || code === 1246) {
    return './videos/light-rain.mp4';
  }
  if (code === 1066 || code === 1210 || code === 1213 || code === 1216 || code === 1219
    || code === 1222 || code === 1225 || code === 1255 || code === 1258 || code === 1261
    || code === 1264) {
    return './videos/snow.mp4';
  }
  if (code === 1069 || code === 1072 || code === 1204 || code === 1207 || code === 1249
    || code === 1252) {
    return './videos/heavy-rain.mp4';
  }
  if (code === 1087 || code === 1273 || code === 1276) {
    return './videos/thunderstorm.mp4';
  }
  if (code === 1114 || code === 1117 || code === 1210 || code === 1213 || code === 1216
    || code === 1219 || code === 1222 || code === 1225 || code === 1255 || code === 1258
    || code === 1261 || code === 1264) {
    return './videos/sleet.mp4';
  }
  if (code === 1150 || code === 1153 || code === 1168 || code === 1171 || code === 1180
    || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195
    || code === 1240 || code === 1243 || code === 1246) {
    return './videos/drizzle.mp4';
  }
  if (code === 1279 || code === 1282) {
    return './videos/snowstorm.mp4';
  }
  return './videos/default.mp4';
};

loadBgVideo(selectBgVideo(0));
