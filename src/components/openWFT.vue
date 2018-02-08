<template>
  <div class="open-wft">
    <div class="wft-logo">
      <img src="../assets/wfticon.png">
    </div>
    <div class="tips-text">
      <p>Wind金融终端下载</p>
      <p>发现——3C会议平台</p>
    </div>
    <div class="open-wft-href">
      <a type="button" class="mui-btn" href="http://114.80.154.45/UnitedWeb/cmsapp/Sites/3cwxdownload/wxdownload.html">立即打开</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>

<style scoped lang="scss">
  .open-wft {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #eee;
    font-size: 14px;
    padding: 20px 15px;
    background-color: #fff;
    box-shadow: 3px 8px 18px #000;
    div {
      float: left;
      width: 33%;
      height: 100%;
    }
    .wft-logo {
      width: 15%;
      img {
        width: 100%;
      }
    }
    .tips-text {
      width: 55%;
      padding-left: 15px;
      margin-top: 8px;
      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        color: #000;
        margin-top: 5px;
        margin-bottom: 0px;
        &:last-child {
          font-size: 12px;
        }
      }
    }
    .open-wft-href {
      float: right;
      width: 25%;
      margin-top: 11px;
      a {
        border: 1px solid #666;
        border-radius: 3px;
        padding: 2px 5px;
        color: #666;
        padding: 4px;
        width: 100%;
      }
    }
  }
</style>
