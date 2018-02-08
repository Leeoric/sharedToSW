<template>
	<div class="meeting-wrap">
    <meeting-header></meeting-header>
    <meeting-detail></meeting-detail>
	</div>
</template>
<script type="text/ecmascript-6">
  import MeetingHeader from './meetingDetail/meetingHeader'
  import MeetingDetail from './meetingDetail/meetingDetail'

  export default {
    name: 'meetingWarp',
    components: {
      MeetingHeader, MeetingDetail
    }
  }
</script>

<style scoped lang="scss">
  .meeting-wrap {
    font-size: 14px;
    padding: 5px 0;
    background-color: #fff;
  }
</style>
