<template>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

</template>

<script>

export default {
  name: 'App',
  // components: { Search, Weather },

};
</script>

<style >
 .fade-enter-from{
 opacity: 0;
}
.fade-enter-active{
  transition: all 0.5s linear;
}
.fade-leave-to{
 transition: all 0.5s linear;
 opacity: 0;
}
</style>
