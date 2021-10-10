import { createStore } from 'vuex';

export default createStore({
  state: {
    lon: '',
    lat: '',
    city: '',
    country: '',
    timezone: '',
    weeklyWeather: '',

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
      state.weeklyWeather = weather;
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
      commit('assignWeeklyWeather', payload.daily);
    },
  },
});
