<template>
  <div class="pdf-box">
    <!--PPT-PDF展示 B-->
    <div class="pdf-wrap" id="pdfContainer">
      <div class="pdf-container" v-if="hasPDF">
        <div class="pdf-loading" v-show="isLoading">
          <div class="pdf-loading-text">文档加载中...</div>
        </div>
        <div class="pdf-page-num" v-show="handlerDisplay">
          <span>{{currentPage}} / {{pageCount}}</span>
        </div>
        <pdf
          :src="pdfUrl"
          :page="page"
          @num-pages="pageCount = $event"
          @loaded="_onLoaded"
          @progress="_onProgress"
          @error="_onError(errObj = $event)"
          @page-loaded="currentPage = $event"></pdf>
        <div class="pdf-turn-page" v-show="handlerDisplay">
          <div class="pdf-previous" @click="_previousPage">
            <span class="page-pdf"><i class="iconfont icon-xiangzuoxi"></i></span>
          </div>
          <div class="pdf-next" @click="_nextPage">
            <span class="page-pdf"><i class="iconfont icon-xiangyou"></i></span>
          </div>
        </div>
      </div>
      <div class="pdf-empty-box" v-else>
        <img width="100%" src="../../assets/default_ppt.jpg">
      </div>
    </div>
    <!--PPT-PDF展示 E-->
  </div>
</template>
<script type="text/ecmascript-6">
  import pdf from 'vue-pdf'

  export default {
    name: 'sharedMeeting',
    data () {
      return {
        currentPage: 0,
        pageCount: 0,
        page: 1,
        isLoading: true,
        hasPDF: true,
        handlerDisplay: false,
        errObj: {},
        pdfUrl: 'http://180.96.8.44/3CWeb/MeetingDocument/2018-01-26/5a00fb3a-b2e7-43be-89dd-c33b7d849576.pdf'
//        pdfUrl: 'http://180.96.8.44/3CWeb/MeetingDocument/2018-01-29/8938e177-feb2-4437-b794-2d553348e868.pdf'
      }
    },
    computed: {},
    created () {
    },
    methods: {
      _previousPage () {
        this.page > 1 ? this.page-- : this.page = this.pageCount
      },
      _nextPage () {
        this.page < this.pageCount ? this.page++ : this.page = 1
      },
      _onProgress () {
        this.isLoading = true
      },
      _onLoaded () {
        this.isLoading = false
        this.handlerDisplay = this.pageCount > 1
        console.log('ppt加载完成')
      },
      _onError (errObj) {
        this.isLoading = false
        this.hasPDF = false
        console.log(errObj)
      }
    },
    components: {
      pdf
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/scss/variable';

  .pdf-box {
    .pdf-wrap {
      .pdf-container {
        position: relative;
        min-height: 210px;
        .pdf-loading {
          width: 100%;
          height: 210px;
          background: rgba(255, 255, 255, 0.5);
          position: absolute;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          .pdf-loading-text {
          }
        }
        .pdf-page-num {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 2;
          transform: translateX(-50%);
          text-align: center;
          color: #000;
          background: rgba(204, 204, 204, 0.3);
          border-radius: 10px;
          padding: 2px 5px;
          font-size: 14px;
          font-weight: lighter;
          color: #565656;
        }
        .pdf-turn-page {
          .page-pdf {
            position: absolute;
            top: 50%;
            width: 40px;
            height: 40px;
            background: rgba(99, 99, 99, 0.26);
            border-radius: 50%;
            text-align: center;
            line-height: 55px;
            color: rgb(216, 216, 216);
          }
          .pdf-previous {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            span {
              left: 10%;
            }
          }
          .pdf-next {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            span {
              right: 10%;
            }
          }
        }
      }
    }
  }

</style>
