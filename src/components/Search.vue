<template>
  <main>
    <h1>Check the weather for your city!</h1>
    <div class="input-div">
      <input type="text" v-model="city" placeholder="enter a city name"
      @keyup.enter="weatherCall(city)">
      <button @click="weatherCall(city)">Search <i class="fas fa-search"></i></button>
    </div>

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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@300;400&display=swap');
$font-head: 'Oswald';
$font-para: 'Monserrat';
$color: rgba(77, 52, 6, 0.568);

body{
  margin: 0;
}
main{
  background: linear-gradient($color, $color), url("https://images.pexels.com/photos/96414/pexels-photo-96414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1280&w=1920");
  background-position:center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  color: white;
  >*{
    width: 60%;
  }
  h1{
    text-align: center;
    font-family: $font-head, sans-serif;
    font-weight: 400;
    font-size: 4rem;
    margin-bottom: 4rem;
  }
}
.input-div{
  font-family: $font-para, sans-serif;
  display: flex ;
  justify-content: center;

  > input{
    font-size: 1rem;
    margin-right: 1rem;
    width: 15rem;
    padding: 0.3rem;
    border: none;
    border-radius: 1rem;
  }
  button{
    @extend input;
    width: unset;
    padding: 0.4rem;
    i{
      margin-left: 0.8rem;
    }
  }
}
</style>
