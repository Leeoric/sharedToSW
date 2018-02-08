<template>
  <div>
    <hls-player v-if="meetingStatus === 'STARTED'" :options="options"></hls-player>
    <record-player v-else :options="options"></record-player>
  </div>
</template>
<script type="text/ecmascript-6">
  import HlsPlayer from '../../base/player/hlsPlayer'
  import RecordPlayer from '../../base/player/recordPlayer'
  import {mapGetters} from 'vuex'

  export default {
    name: 'player',
    data() {
      return {
//        meetingStatus: 'STARTED',
        meetingStatus: 'ENDED',
        options: {
          //TODO 播放器地址赋值
          src: 'http://www.meng10xian.com/sound.mp3',
//          src: 'http://sk.cri.cn/887.m3u8',
          isLive: false
        }
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'meetingInfo'
      ])
    },
    watch: {
      meetingInfo: function() {
        console.log('player compnents------', this.meetingInfo)
      }
    },
    methods: {
    },
    components: {
      HlsPlayer,
      RecordPlayer
    }
  }
</script>

<style scoped lang="scss">
</style>
