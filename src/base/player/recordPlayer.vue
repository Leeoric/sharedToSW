<template>
  <div class="record-player" id="playercontainer">
    <audio :src="options.src" id="audioPlayer"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  require('./audioplayer.js')
  export default {
    name: 'recordPlayer',
    props: {
      options: {
        type: Object,
        default () {
          return {
            src: ''
          }
        }
      }
    },
    mounted () {
      $('#audioPlayer').audioPlayer()
    }
  }
</script>

<style lang="scss">
  @import "audioplayer.css";

  .record-player {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    transition: all .5s;
    height: 34px;
    line-height: 34px;
  }
</style>
