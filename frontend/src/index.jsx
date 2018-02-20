import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};
const getLocation = async () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = {lat:position.coords.latitude, long: position.coords.longitude};
      return location
     
    });
  } else {
    /* geolocation IS NOT available */
  }
  return {};
}
class Weather extends React.Component {
  constructor(props) {
    super(props);
    getLocation();
    this.state = {
      icon: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({ city: weather.city.name });
    this.setState({ icon: weather.list.slice(0, 3).map(item => ([<h2>{item.dt_txt}</h2>, <img src={`/img/${item.weather[0].icon.slice(0, -1)}.svg`} alt="" />])) });
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
