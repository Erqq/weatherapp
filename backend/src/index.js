const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const json = require('koa-json');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';
const port = process.env.PORT || 9000;
const app = new Koa();
const options = {
  origin: true,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors()).use(json()).use(bodyParser());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const fetcLocationhWeather = async (lat, long) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${long}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData || {};
});

router.get('/api/weatherloc', async ctx => {
  const location = ctx.query;
  const weatherData = await fetcLocationhWeather(parseFloat(location.lat), parseFloat(location.long));
  ctx.body = weatherData || {};
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
console.log(`App listening on port ${port}`);
