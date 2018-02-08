<template>
  <div class="player-container">
    <div class="audio-box">
      <audio width="0px" height="0px" playsinline webkit-playsinlin ref="media"
             @progress="onProgress"
             @loadstart="onLoadStart"
             @error="onError"
             @canplay="onCanplay"
             @canplaythrough="onCanplaythrough"
             @loadeddata="onLoadeddata"
             @loadedmetadata="onLoadedmetadata"
             @play="onPlay"
             @pause="onPause"
             @playing="onPlaying"
             @stalled="onStalled"
             @waiting="onWaiting">
        <source :src="options.src" type="application/x-mpegURL">
      </audio>
      <div class="player-button player-play"
           @click="beginPlay">
        <i class="iconfont icon-iconbofangqizanting font-size-control" ref="btnImg"></i>
      </div>
      <div ref="playInfo" class="player-button player-info">按下播放按钮以播放</div>
      <div class="player-button player-refrash"
           @click="reload">
        <i class="iconfont icon-tubiaolunkuo- font-size-control"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  const TIPS = {
    PLAY: {
      KEY: 1001,
      STYLES: 'iconfont icon-iconbofangqibofang font-size-control',
      WORDS: '开始播放...',
      LOG: ''
    },
    PAUSE: {
      KEY: 1002,
      STYLES: 'iconfont icon-iconbofangqizanting font-size-control',
      WORDS: '已暂停',
      LOG: ''
    },
    ABORT: {
      KEY: 1003,
      STYLES: 'iconfont icon-tingzhi font-size-control',
      WORDS: '停止加载',
      LOG: ''
    },
    LOADSTART: {
      KEY: 1004,
      STYLES: '',
      WORDS: '正在连接，请稍候...',
      LOG: '开始请求数据...loadstart'
    },
    ERROR: {
      KEY: 1005,
      STYLES: 'iconfont icon-iconbofangqizanting font-size-control',
      WORDS: '',
      LOG: ''
    },
    CANPLAY: {
      KEY: 1006,
      STYLES: 'iconfont icon-iconbofangqizanting font-size-control',
      WORDS: '准备就绪，请按下播放按钮以播放',
      LOG: '可以播放音频/视频canplay'
    },
    CANPLAYTHROUGH: {
      KEY: 1007,
      STYLES: '',
      WORDS: '准备就绪，请按下播放按钮以播放',
      LOG: '可在不因缓冲而停顿的情况下进行播放canplaythrough'
    },
    LOADEDDATA: {
      KEY: 1008,
      STYLES: '',
      WORDS: '',
      LOG: '已加载音频/视频的当前帧loadeddata'
    },
    LOADEDMETADATA: {
      KEY: 1008,
      STYLES: '',
      WORDS: '',
      LOG: '已加载音频/视频的元数据loadedmetadata'
    },
    PLAYING: {
      KEY: 1009,
      STYLES: 'iconfont icon-iconbofangqibofang font-size-control',
      WORDS: '正在播放...',
      LOG: '音频/视频在已因缓冲而暂停或停止后已就绪playing'
    },
    STALLED: {
      KEY: 1010,
      STYLES: '',
      WORDS: '',
      LOG: '尝试获取媒体数据，但数据不可用。stalled'
    },
    WAITING: {
      KEY: 1011,
      STYLES: 'iconfont icon-tingzhi font-size-control',
      WORDS: '已停止',
      LOG: '由于需要缓冲下一帧而停止waiting'
    }
  }

  export default {
    name: 'audioplayer',
    props: {
      options: {
        type: Object,
        default () {
          return {
            src: '',
            isLive: {
              type: Boolean,
              default: false
            }
          }
        }
      }
    },
    data () {
      return {
        isPlay: false,
        isFirstPlay: 0,
        status: '',
        readyStatus: 0
      }
    },
    created () {
      console.log('src', this.options.src)
    },
    watch: {
      status: function () {
        console.log('status has changed: ---', this.status)
        switch (this.status) {
          case 'play':
            this.$refs.btnImg.className = TIPS.PLAY.STYLES
            this.$refs.playInfo.innerText = TIPS.PLAY.WORDS
            this.readyStatus = this.$refs.media.readyState
            break
          case 'pause':
            this.$refs.media.pause()
            this.$refs.btnImg.className = TIPS.PAUSE.STYLES
            this.$refs.playInfo.innerText = TIPS.PAUSE.WORDS
            this.readyStatus = this.$refs.media.readyState
            break
          case 'abort':
            this.$refs.btnImg.className = TIPS.ABORT.STYLES
            this.$refs.playInfo.innerText = TIPS.ABORT.WORDS
            break
          case 'loadstart':
            console.log(TIPS.LOADSTART.LOG, new Date())
//            this.$refs.playInfo.innerText = TIPS.LOADSTART.WORDS
            break
          case 'error':
            console.log('error', new Date())
            //Media.error.code; //1.用户终止 2.网络错误 3.解码错误 4.URL无效
            if (this.$refs.media.error.code === 1) {
              this.$refs.playInfo.innerText = '已停止播放'
            } else if (this.$refs.media.error.code === 2) {
              this.$refs.playInfo.innerText = '网络错误，请检查您的网络连接'
            } else if (this.$refs.media.error.code === 3) {
              this.$refs.playInfo.innerText = '解码错误,请尝试重新播放'
            } else if (this.$refs.media.error.code === 4) {
              this.$refs.playInfo.innerText = 'URL无效'
            }
            this.$refs.btnImg.className = TIPS.ERROR.STYLES
            break
          case 'canplay':
            console.log(TIPS.CANPLAY.LOG, new Date())
            this.$refs.btnImg.className = TIPS.CANPLAY.STYLES
            this.$refs.playInfo.innerText = TIPS.CANPLAY.WORDS
            this.$refs.isPlay = false
            break
          case 'canplaythrough':
            console.log(TIPS.CANPLAYTHROUGH.LOG, new Date())
//            this.$refs.btnImg.className = TIPS.CANPLAY.STYLES
//            this.$refs.playInfo.innerText = TIPS.CANPLAY.WORDS
//							that.isPlay = false;
            break
          case 'loadeddata':
            console.log(TIPS.LOADEDDATA.LOG, new Date())
            this.isPlay = false
//	                        that.playInfo.innerText = '已加载媒体当前帧';
            break
          case 'loadedmetadata':
            console.log(TIPS.LOADEDMETADATA.LOG, new Date())
            this.isPlay = false
//	                        that.playInfo.innerText = '已加载媒体元数据';
            break
          case 'playing':
            console.log(TIPS.PLAYING.LOG, new Date())
            this.$refs.playInfo.innerText = TIPS.PLAYING.WORDS
            this.isPlay = true
            this.$refs.btnImg.className = TIPS.PLAYING.STYLES

//	                        this.$refs.btnImg.src = 'images/playerImg/player_pause.png'
            break
          case 'stalled':
            console.log(TIPS.STALLED.LOG, new Date())
            //that.playInfo.innerText = '正在缓冲...'
            break
          case 'waiting':
            console.log(TIPS.WAITING.LOG, new Date())
            this.$refs.playInfo.innerText = TIPS.WAITING.WORDS
            this.$refs.btnImg.className = TIPS.WAITING.STYLES
            this.isPlay = false
            break
          default:
        }
      },
      readyStatus: function () {
        console.log('readyStatus has changed: ---', this.readyStatus)
        switch (this.readyStatus) {
          case 0:
            this.$refs.playInfo.innerText = '媒体错误，请点击右侧按钮刷新'
            this.$refs.btnImg.className = 'iconfont icon-iconbofangqizanting font-size-control'
            this.isPlay = false
            console.log('media.readyState === 0, 没有关于音频/视频是否就绪的信息', '没有直播流')
            break
          case 1:
            this.$refs.playInfo.innerText = '初始化完成，流媒体就绪'
            this.isPlay = false
            console.log('media.readyState === 1, 音频/视频以初始化')
            break
          case 2:
            this.$refs.playInfo.innerText = '无音频流'
            this.isPlay = false
//            this.$refs.btnImg.className = 'iconfont icon-iconbofangqizanting font-size-control'
            console.log('media.readyState === 2, 数据已经可以播放(当前位置已经加载) 但没有数据能播放下一帧的内容')
            break
          case 3:
//							that.playInfo.innerText = '缓冲中...';
            this.isPlay = false
            this.$refs.btnImg.className = 'iconfont icon-iconbofangqizanting font-size-control'
            console.log('media.readyState === 3, 当前及至少下一帧的数据是可用的(换句话来说至少有两帧的数据)')
            break
          case 4:
//							that.playInfo.innerText = '正在直播中...';
            console.log('media.readyState === 4, 可用数据足以开始播放-如果网速得到保障 那么视频可以一直播放到底')
            break
          default:
        }
      }
    },
    methods: {
      reload () {
        this.$refs.media.load()
      },
      beginPlay () {
        if (!this.isPlay) {
          if (this.isFirstPlay === 0) {
            console.debug('第一次播放，先load再play...')
            this.$refs.media.load()
            this.$refs.media.play()
          } else {
            console.debug('不是第一次播放，直接play...')
            this.$refs.media.play()
          }
          this.isFirstPlay++
        } else {
          console.debug('暂停。。。')
          this.$refs.media.pause()
        }
        this.isPlay = !this.isPlay
      },
      onProgress () {
        //客户端正在请求数据
        this.readyStatus = this.$refs.media.readyState
      },
      onLoadStart () {
        //客户端开始请求数据
        this.status = 'loadstart'
      },
      onError () {
        //当音频/视频的加载已放弃时(客户端主动终止下载（不是因为错误引起）)
        this.status = 'error'
        this.readyStatus = this.$refs.media.readyState
      },
      onCanplay () {
        //当浏览器可以播放音频/视频时
        this.status = 'canplay'
      },
      onCanplaythrough () {
        //当浏览器可在不因缓冲而停顿的情况下进行播放时
        this.status = 'canplaythrough'
      },
      onLoadeddata () {
        //当浏览器已加载音频/视频的当前帧时
        this.status = 'loadeddata'
      },
      onLoadedmetadata () {
        //当浏览器已加载音频/视频的元数据时
        this.status = 'loadedmetadata'
      },
      onPlay () {
        //当音频/视频已开始或不再暂停时
        console.log('音频/视频已开始或不再暂停play', new Date())
        this.status = 'play'
      },
      onPause () {
        //当音频/视频暂停时
        console.log('音频/视频已暂停pause', new Date())
        this.status = 'pause'
      },
      onPlaying () {
        //当音频/视频在已因缓冲而暂停或停止后已就绪时
        this.status = 'playing'
        this.readyStatus = this.$refs.media.readyState
      },
      onStalled () {
        //当浏览器尝试获取媒体数据，但数据不可用时
        this.status = 'stalled'
        this.readyStatus = this.$refs.media.readyState
      },
      onWaiting () {
        //当视频由于需要缓冲下一帧而停止
        this.status = 'waiting'
        this.readyStatus = this.$refs.media.readyState
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable";

  .player-container {
    border-top: 1px solid #ccc;/*no*/
    border-bottom: 1px solid #ccc;/*no*/
    box-sizing: border-box;
    transition: all .5s;
    .audio-box {
      width: 100%;
      height: 32px;
      position: relative;
      border-left: none;
      border-right: none;
      box-sizing: border-box;
      background: linear-gradient(top , rgb(241, 241, 241) , rgb(231, 232, 234) 51% , rgb(222, 223, 227) 100%);
      audio {
        display: none;
        position: relative;
        z-index: -1;
      }
    }
    .player-button {
      display: inline-block;
      width: 55px;
      height: 50px;
      line-height: 50px;
      z-index: 9999;
    }
    .player-play {
      position: absolute;
      left: 10px;
      top: -9px;
      cursor: pointer;
    }
    .player-info {
      position: absolute;
      left: 55px;
      top: 0;
      width: 270px;
      height: 32px;
      line-height: 32px;
      font-size: $font-size-medium;
      font-weight: lighter;
      color: #a0a0a0;
      text-align: left;
      font-family: $font-family;
    }
    .player-refrash {
      position: absolute;
      right: -20px;
      top: -9px;
      cursor: pointer;
      i {
        font-size: $font-size-large;
      }
    }
    .font-size-control {
      font-size: 24px;
      line-height: inherit;
      color: #808080;
      display: inline-block;
    }
  }
</style>
