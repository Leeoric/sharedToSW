<template>
	<div class="meeting-header">
    <div class="meeting-title">{{this.meetingInfo.title}}</div>
    <p class="meeting-time">{{this.meetingTime}}</p>
    <p class="meeting-sponsor">
      <span v-for="(item, index) in this.meetingInfo.lecturers" :key="index"> {{item.name}} ({{item.title}}) </span>
    </p>
    <p class="meeting-institution">
      <span v-for="(item, index) in this.meetingInfo.sponsors" :key="index"> {{item.name}} </span>
    </p>
	</div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    name: 'meetingHeader',
    data () {
      return {
        meetingTime: ''
      }
    },
    computed: {
      ...mapGetters([
        'meetingInfo'
      ])
    },
    watch: {
      meetingInfo () {
        this.meetingTime = this.timeHandler(this.meetingInfo.startTime, this.meetingInfo.endTime)
      }
    },
    mounted () {
    },
    methods: {
      timeHandler (st, et) {
        if (!st || !et) {
          return ''
        }
        let stArr = st.split(' ')
        let etArr = et.split(' ')
        let week = new Date(st).getDay()
        let weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天']
        let weekOutPut = new Date(stArr[0]).getTime() === new Date(etArr[0]).getTime() ? weekArr[weekArr.length - 1] : weekArr[week]
        return '' + stArr[0] + ' ' + weekOutPut + ' ' + stArr[1].split(':')[0] + ':' + stArr[1].split(':')[1] + '-' + etArr[1].split(':')[0] + ':' + etArr[1].split(':')[1]
      }
    }
  }
</script>

<style scoped lang="scss">
  .meeting-header {
    font-size: 14px;
    padding: 20px 15px;
    background-color: #fff;
    .meeting-title {
      font-size: 20px;
      color: #000;
    }
    p {
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 0px;
      color: #8f8f94;
    }
  }
</style>
