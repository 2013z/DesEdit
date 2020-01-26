<template>
  <div :id="videoId" v-if="videoId != undefined"></div>
</template>

<script>
import "dplayer/dist/DPlayer.min.css";
import DPlayer from "dplayer";
export default {
  props: ["videoId", "videoSrc"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    let _this = this;
    const dp = new DPlayer({
      container: document.getElementById(_this.videoId),
      video: {
        url: _this.videoSrc
      }
    });
    dp.fullScreen.request("web");
  },
  methods: {},
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped></style>
