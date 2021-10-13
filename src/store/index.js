import { createStore } from 'vuex';

export default createStore({
  state: {
    lon: '',
    lat: '',
    city: '',
    country: '',
    timezone: '',
    weeklyWeather: '',
    currentWeather: '',

  },
  mutations: {
    assignLon(state, lon) {
      state.lon = lon;
    },
    assignLat(state, lat) {
      state.lat = lat;
    },
    assignCountry(state, country) {
      state.country = country;
    },
    assignCity(state, city) {
      state.city = city;
    },
    assignTimeZone(state, tz) {
      state.timezone = tz;
    },
    assignWeeklyWeather(state, weather) {
      weather.forEach((elem) => {
        const time = new Date(elem.dt * 1000);
        /*eslint-disable */
        elem.dt = time.toLocaleDateString('en-GB', { weekday: 'long' });
        /* eslint-enable */
      });

      state.weeklyWeather = weather;
    },
    assignCurrentWeather(state, cw) {
      const time = new Date(cw.dt * 1000);
      /*eslint-disable */
      cw.dt = time.toLocaleDateString('en-GB', { weekday: 'long' });
      /* eslint-enable */
      state.currentWeather = cw;
    },
    assignTimezone(state, tz) {
      state.timezone = tz;
    },
  },
  getters: {
    showLon: (state) => state.lon,
    showLat: (state) => state.lat,
  },
  actions: {
    assignCityInfo({ commit }, payload) {
      commit('assignLon', payload.coord.lon);
      commit('assignLat', payload.coord.lat);
      commit('assignCountry', payload.sys.country);
      commit('assignCity', payload.name);
    },
    assignWeather({ commit }, payload) {
      // removing first result from daily weather
      // since it's the same as current
      payload.daily.shift();
      commit('assignWeeklyWeather', payload.daily);
      commit('assignCurrentWeather', payload.current);
      commit('assignTimezone', payload.timezone);
    },
  },
});
