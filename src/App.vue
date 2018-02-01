<template>
  <div id="app">
    <meeting-document></meeting-document>
    <meeting-wrap></meeting-wrap>
    <open-wft></open-wft>
    <!--<router-view/>-->
  </div>
</template>

<script>
  import MeetingDocument from 'components/meetingDocument'
  import MeetingWrap from 'components/meetingWrap'
  import OpenWft from 'components/openWFT'

  export default {
    name: 'App',
    components: {
      MeetingDocument,
      MeetingWrap,
      OpenWft
    }
  }
</script>

<style lang="scss">
  @import "./common/scss/index";

  #app {
    overflow: hidden;
  }
</style>
