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
  import api from './api/api'
  import {mapMutations} from 'vuex'
  import {HOST, sharedMeetingUrl, params} from './api/config'
  export default {
    name: 'App',
    created() {
      this._getData()
    },
    methods: {
      _getData() {
        const url = HOST + sharedMeetingUrl
        return api.getData(url, 'get', {
          params: params
        }).then((res) => {
          console.log(res)
          this.meetingInfo(res)
        }).catch((e) => {
          console.log(e)
        })
      },
      ...mapMutations({
        meetingInfo: 'SET_MEETING_INFO'
      })
    },
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
    padding-bottom: 90px;
  }
</style>
