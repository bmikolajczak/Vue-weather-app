<template>
<main>
  <router-link to="/" id="home-btn"><i class="fas fa-home" ></i></router-link>
  <div class="current-weather">
    <h1> {{city}} / {{country}}</h1>
    <div class="weather">
    <h2>{{currentWeather.temp}}°C</h2>
    <img :src="'http://openweathermap.org/img/wn/'+currentWeather.weather[0].icon+'@2x.png'" alt="">
    <h3>{{currentWeather.weather[0].description}} </h3>
    <p>{{currentWeather.dt}}</p>
    </div>

  </div>

    <ul>
        <li
        v-for="forecast in weeklyWeather"
        :key="forecast.dt"
        >
            <p>{{forecast.dt}}</p>
            <img :src="'http://openweathermap.org/img/wn/'+forecast.weather[0].icon+'@2x.png'" alt=""><br>
            <h3>{{forecast.temp.day}}°C <span class="night-temp">{{forecast.temp.eve}}°C</span></h3>
            <p>{{forecast.weather[0].description}}</p>
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
      'currentWeather',
      'timezone',
    ]),
    calcDate(curDate) {
      const date = new Date(curDate * 1000).toDateString();
      return date;
    },
  },
};
</script>

<style lang="scss">
$text-gray: #0f0568;
$color: #066574a9;
body{
  margin: 0;
}
main{
    font-family: 'Montserrat', sans-serif;
  #home{
          position: absolute;
          top: 5rem;
          left: 3rem;
          i{
            font-size: 4rem;
          }

  padding: 3rem;
  h1{
      margin-bottom: 2rem;
    }
  ul{
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    margin-right: 20px;
    padding: 1.2rem;
    list-style-type: none;
    background-color: $color;
    width: 100%;
    border-radius: 1rem;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      h3{
        margin-right: 0.313rem;
        span{
          color: $text-gray;
          font-size: .95rem;
        }
      }
      img{
        width: 5rem;
      }
      
      }
    }
  }
  .current-weather{
    display: flex;
    flex-direction: column;
    align-items: center;
    .weather{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img{
      width: 7rem;
    }
    #home{
      position: absolute;
      left: 3rem;
      top: 3rem;
      font-size: 2.5rem;
    }
  }
}
</style>
