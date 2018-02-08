<template>
  <div class="meeting-detail">
    <div class="meeting-detail-block" v-if="this.meetingInfo.description">
      <div class="meeting-detial-column-title">
        <span>会议简介</span>
      </div>
      <div class="meeting-detial-content">
        <p v-html="this.meetingInfo.description"></p>
      </div>
    </div>
    <div class="meeting-detail-block" v-if="this.meetingInfo.lecturers">
      <div class="meeting-detial-column-title">
        <span>主讲人简介</span>
      </div>
      <div class="meeting-detial-content">
        <p v-for="(item, index) in this.meetingInfo.lecturers" :key="index">
          <span>{{item.name}}</span>
          <span>{{item.description}}</span>
        </p>
      </div>
    </div>
    <div class="meeting-detail-block" v-if="this.meetingInfo.agenda">
      <div class="meeting-detial-column-title">
        <span>会议议程</span>
      </div>
      <div class="meeting-detial-content">
        <p v-html="this.meetingInfo.agenda"></p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    name: 'meetingDetail',
    data() {
      return {}
    },
    props: {
      meetingDetail: {
        type: Object,
        default() {
          return {
            meetingDetail: {}
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'meetingInfo'
      ])
    }
  }
</script>

<style scoped lang="scss">
  $meeting-detail-font-color: #8f8f94;

  .meeting-detail {
    .meeting-detail-block {
      p {
        color: $meeting-detail-font-color;
      }
    }
    .meeting-detial-column-title {
      padding: 10px 0;
      color: #000;
      font-size: 16px;
      background: #fff;
      border-top: 1px solid #eee;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-left: 5px solid #5470b5;
        text-indent: 12px;
      }
    }
    .meeting-detial-content {
      padding: 10px 15px;
      p {
        span {
          &:first-child {
            font-weight: bold;
            color: #000;
          }
        }
      }
    }
  }
</style>
