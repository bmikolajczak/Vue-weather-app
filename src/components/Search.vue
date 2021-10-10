<template>
  <main>
    <input type="text" v-model="city"><br>
    <button @click="weatherCall(city)">Show weather</button><br>
    <p>timezone: {{time_zone}}</p>
    <!-- <p>lon: {{lon}}</p>
    <p>lat: {{lat}}</p>-->
    <img :src='image' alt="">
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      city: '',
      api_k: '2ce45a79099d2773aaa4114670bc2637',
      time_zone: '',
      image: '',
    };
  },
  computed: {
    ...mapGetters(['showLon', 'showLat']),
  },
  methods: {
    weatherCall(city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_k}`)
        .then((response) => {
          console.log('pierwszy call', response);
          this.$store.dispatch('assignCityInfo', response.data);

          axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.showLat}&lon=${this.showLon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.api_k}`)
            .then((res) => {
              console.log('koordynaty', res);
              this.$store.dispatch('assignWeather', res.data);
              this.time_zone = res.data.timezone;
              this.image = `http://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`;
            });
        })
        .catch((err) => console.log(err.message));
      this.$router.push({ path: 'weather' });
    },
  },
};
</script>

<style scoped>
main{
    background-color: rosybrown;
}
</style>
