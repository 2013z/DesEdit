<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    window.onload = () => {
      // window.location.href =
      //   "localhost:4399/" + window.location.href.substring(8);
      // window.location.origin = "localhost:4399/";
    };
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#app {
}
</style>
