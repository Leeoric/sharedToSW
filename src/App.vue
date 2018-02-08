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
  import { mapMutations } from 'vuex'

  //  const HOST = 'http://10.102.16.202:8080'

  export default {
    name: 'App',
    created() {
      this._getData()
    },
    methods: {
      _getData() {
        const url = '/api/3CWeb/getEncryptSharedMeeting.json'
        return api.getData(url, 'get', {
          params: {
            meetingId: '0d5bf7ba8ec3eec3',
            channel: 'sw',
            openId: 'sw',
            name: 'name'
          }
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
