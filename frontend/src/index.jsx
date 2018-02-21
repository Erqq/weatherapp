import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getLocation = async () => {
  if ('geolocation' in navigator) {
    const loc = new Promise((res, rej) => { navigator.geolocation.getCurrentPosition(res, rej); });
    return loc;
  }
  return false;
};

const getLocationWeather = async () => {
  const loc = await getLocation()
  .then(pos => ({ lat: pos.coords.latitude, long: pos.coords.longitude }));
  try {
    const response = await fetch(`${baseURL}/weatherloc?lat=${encodeURIComponent(loc.lat)}&long=${encodeURIComponent(loc.long)}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
    };
  }

  async componentWillMount() {
    const locweather = await getLocationWeather();
    this.setState({ city: locweather.city.name });
    this.setState({ icon: locweather.list.slice(0, 3)
      .map(item => ([<h2>{item.dt_txt}</h2>,
        <h2>{parseFloat(item.main.temp - 273.15).toFixed(1)} C°</h2>,
        <img src={`/img/${item.weather[0].icon.slice(0, -1)}.svg`} alt="" />])) });
  }

  render() {
    const { icon } = this.state;
    const { city } = this.state;
    return (
      <div className="icon">
        <h1>{city}</h1>
        { icon }

      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
