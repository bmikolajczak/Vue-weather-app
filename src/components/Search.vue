<template>
  <input type="text" v-model="city"><br>
  <button @click="weatherCall(city)">Show weather</button>
  <p>lon: {{lon}}</p>
  <p>lat: {{lat}}</p>
  <p>time zone: {{time_zone}}</p>
  <img :src='image' alt="">
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      api_k: '2ce45a79099d2773aaa4114670bc2637',
      lon: '',
      lat: '',
      time_zone: '',
      image: '',
    };
  },
  methods: {
    weatherCall(city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_k}`)
        .then((response) => {
          this.lon = response.data.coord.lon;
          this.lat = response.data.coord.lat;
          axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly&appid=${this.api_k}`)
            .then((res) => {
              console.log('koordynaty', res);
              this.time_zone = res.data.timezone;
              this.image = `http://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`;
            });
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>
