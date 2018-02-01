<template>
  <div>
      <div id="playercontainer" v-if="meetingStatus === 'ENDED'"></div>
      <!--HLS Player-->
      <hls-player v-if="meetingStatus === 'STARTED'" :options="options"></hls-player>
  </div>
</template>
<script type="text/ecmascript-6">
  import HlsPlayer from '../../base/player/hlsPlayer.vue'

  export default {
    name: 'player',
    data () {
      return {
        meetingStatus: 'STARTED',
        options: {
          src: 'http://sk.cri.cn/887.m3u8'
        }
      }
    },
    components: {
      HlsPlayer
    }
  }
</script>

<style scoped lang="scss">
  @import "../../base/player/audioplayer.css";
</style>
