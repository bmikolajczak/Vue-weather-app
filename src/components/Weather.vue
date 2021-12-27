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
    <div id="chart">

    </div>
</main>
</template>

<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'Weather',
  mounted() {
    this.generateChart();
    console.log('pogoda', this.$store.state.weeklyWeather, typeof this.$store.state.weeklyWeather);
    console.log('przykład-wilgotność', this.$store.state.weeklyWeather[1].humidity);
  },
  methods: {
    generateChart() {
      const h = 300;
      const w = 850;
      const paddingx = 25;
      const paddingy = 20;
      // const weatherArr = [12, 100, 60, 80, 50, 20, 45];
      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
      // console.log('state info', weatherArr);
      // ?Skale
      const x = d3.scaleBand()
        .range([0, w])
        .domain(this.$store.state.weeklyWeather.map((d) => d.dt))
        .padding(0.2);
      svg.append('g')
        .attr('transform', `translate(0,${h})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // const xScale = d3.scaleLinear()
      //   .domain([0, d3.max(this.$store.state.weeklyWeather.dt)])
      //   .range([paddingx, w - paddingx]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.$store.state.weeklyWeather.map((d) => d.humidity))])
        .range([h - paddingy, 0]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(0,${h - paddingy})`)
        .call(xAxis);
      svg.append('g')
        .attr('transform', `translate(${paddingx},0)`)
        .call(yAxis);

      // ? Wykres
      svg
        .selectAll('rect')
        .data(this.$store.state.weeklyWeather)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.dt) + paddingx)
        .attr('y', (d) => yScale(d.humidity) - paddingy)
        .attr('width', 25)
        .attr('height', (d) => h - yScale(d.humidity))
        .attr('fill', 'red');
    },
  },
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

main{
  font-family: 'Montserrat', sans-serif;
  padding: 3rem 1rem;
    #chart{
      width: 100%;
      background-color: $color;
      text-align: center;
      padding: 20px 0;
      border-radius: 1rem;
  }
    #home-btn{
      position: absolute;
      transition: linear 0.2s;
      max-width: 3rem;
      top: 50px;
      left: 30px;
      &:hover{
      transform: translateY(5px) scale(.95);
      background-color: darken(white,30%);
    }
      &:visited{
        color: white;

      }
      i{
        font-size: 2rem;
      }
    }

  h1{
      margin-bottom: 2rem;
    }
  ul{
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    margin-right: 20px;
    // padding: 1.2rem;
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

}
</style>
