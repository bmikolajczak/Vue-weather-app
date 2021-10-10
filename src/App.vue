<template>
  <transition mode="in-out"
  enter-active-class="animate__animated animate__fadeInRightBig"
  leave-active-class="animate__animated animate__fadeOutDown"
  >
    <router-view></router-view>
  </transition>
  <!-- <search />
  <weather /> -->

</template>

<script>

export default {
  name: 'App',
  // components: { Search, Weather },

};
</script>

<style >
 /* .fade-enter-from{
 opacity: 0;
}
.fade-enter-active{
  transition: all 0.5s linear;
}
.fade-leave-to{
 transition: all 0.5s linear;
 opacity: 0;
} */
</style>
