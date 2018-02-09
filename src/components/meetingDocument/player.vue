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
  import {HOST, audioUrl} from '../../api/config'
  import api from '../../api/api'

  export default {
    name: 'player',
    data() {
      return {
//        meetingStatus: 'STARTED',
        meetingStatus: 'ENDED',
        audioId: 0,
        options: {
          src: '',
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
      meetingInfo() {
        console.log(this.meetingInfo.meetingRoom)
        this.meetingStatus = this.meetingInfo.meetingStatus
        this.isLive = this.meetingStatus === 'START'
        console.log('options:------', this.options)
        if (this.isLive) {
          let broadcastAddress = JSON.parse(this.meetingInfo.meetingRoom).broadcastAddress
          this.options.src = this.broadcastUrlfilter(broadcastAddress)
        } else {
          if (this.meetingInfo.meetingStatus === 'PUBLISHED') {
            console.log('直播尚未开始，请届时刷新页面收听')
          } else if (this.meetingInfo.meetingStatus === 'ENDED') {
            if (this.meetingInfo.audioId === 0) {
              console.log('直播已结束，录音正在制作中，请稍后收听')
            } else {
              this.audioId = this.meetingInfo.audioId
              console.log('audioID: ---', this.audioId)
              this.options.src = this.audioId
            }
          }
        }
      }
    },
    methods: {
      broadcastUrlfilter(broadcastAddress) {
        if (broadcastAddress) {
          let broadcastArr = broadcastAddress.split(',')
          let hlsUrlArr = broadcastArr.filter(function (item) {
            return /\.m3u8/.test(item)
          })
          if (hlsUrlArr.length) {
            return hlsUrlArr[0]
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      recordUrl(audioId) {
        const url = HOST + audioUrl
        api.getData(url, 'get', {
          params: {
            audioId: audioId
          }
        }).then((res) => {
          console.log('audio src:------', res)
          this.options.src = this.recordUrl(this.audioId)
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    components: {
      HlsPlayer,
      RecordPlayer
    }
  }
</script>

<style scoped lang="scss">
</style>
