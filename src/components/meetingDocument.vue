<template>
  <div class="meeting-document">
    <div class="media-display" id="mediaDisplay">
      <pdf-module></pdf-module>
      <player-module></player-module>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pdfModule from './meetingDocument/pdfBox'
  import playerModule from './meetingDocument/player'

  export default {
    name: 'meetingDocument',
    components: {
      pdfModule, playerModule
    }
  }
</script>

<style scoped lang="scss">

</style>
