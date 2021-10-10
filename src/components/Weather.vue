<template>
<main>
    <p>cit: {{city}}</p>
    <p>coun: {{country}}</p>
    <p>lon: {{lon}}</p>
    <p>lat: {{lat}}</p>
    <img :src='image' alt="">
    <ul>
        <li
        v-for="forecast in weeklyWeather"
        :key="forecast.dt"
        >
            {{forecast.weather[0].description}}<br>
            <img :src="'http://openweathermap.org/img/wn/'+forecast.weather[0].icon+'@2x.png'" alt="">
        </li>
    </ul>
</main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Weather',
  computed: {
    ...mapState([
      'lon',
      'lat',
      'city',
      'country',
      'weeklyWeather',
    ]),
  },
};
</script>

<style >
main{
  /* $color: rgb(6,66,77); */
  background-color: purple;
}
</style>
