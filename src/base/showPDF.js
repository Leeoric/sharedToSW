import PDFJS from 'pdfjs'
/* eslint-disable */
export function showPdf(dom, url) {
  // The workerSrc property shall be specified.
  PDFJS.workerSrc = '../js/build/pdf.worker.js'

  var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    //					scale = 2,
    //        scale = 0.5,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d')

  var pdfContainer = document.getElementById('pdfContainer')
  if (pdfContainer.classList.contains("mui-hidden")) {
    pdfContainer.classList.remove("mui-hidden")
  }
  //console.log(pdfContainer.offsetWidth)
  //console.log(pdfContainer.offsetHeight)
  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param num Page number.
   */
  function renderPage(num) {
    pageRendering = true
    num = num || pageNum
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function (page) {
      //console.log(page.getViewport().viewBox)

      //scale 等于PDF容器的宽度除以pdf的宽度
      let scale = pdfContainer.offsetWidth / page.getViewport().viewBox[2] * 2

      var viewport = page.getViewport(scale)
      // console.log('viewport:', viewport)
      // console.log('viewport height: ' + viewport.height)
      // console.log('viewport width: ' + viewport.width)

      canvas.height = viewport.height
      canvas.width = viewport.width

      canvas.style.width = viewport.width / 2 + 'px'
      canvas.style.height = viewport.height / 2 + 'px'

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      }
      var renderTask = page.render(renderContext)

      // Wait for rendering to finish
      renderTask.promise.then(function () {
        pageRendering = false
        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pageNumPending)
          pageNumPending = null
        }
      })
    })
    // Update page counters
    document.getElementById('page_num').textContent = pageNum
  }

  // $('#mediaDisplay').on('click', '#fullScreen', function () {
  //   if(self.isFullScreen) {
  //     exitFullscreen()
  //     $('#pdfContainer').removeClass('fullscreen-media-display').addClass('normalscreen-media-display')
  //     $('.pdf-fullscreen').removeClass('pdf-fullscreen-btn').addClass('pdf-normalscreen-btn')
  //     renderPage()
  //   } else {
  //     requestFullscreen(document.querySelector('#pdfContainer'))
  //     $('#pdfContainer').removeClass('normalscreen-media-display').addClass('fullscreen-media-display')
  //     $('.pdf-fullscreen').removeClass('pdf-normalscreen-btn').addClass('pdf-fullscreen-btn')
  //     renderPage()
  //   }
  //   self.isFullScreen = !self.isFullScreen
  // })


  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   */
  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num
    } else {
      renderPage(num)
    }
  }

  /**
   * Displays previous page.
   */
  function onPrevPage() {
    if (pageNum <= 1) {
      return
    }
    pageNum--
    queueRenderPage(pageNum)
  }

  document.getElementById('prev').addEventListener('click', onPrevPage)

  /**
   * Displays next page.
   */
  function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
      return
    }
    pageNum++
    queueRenderPage(pageNum)
  }

  document.getElementById('next').addEventListener('click', onNextPage)

  /**
   * Asynchronously downloads PDF.
   */
  PDFJS.getDocument(url).then(function (pdfDoc_) {
    pdfDoc = pdfDoc_
    document.getElementById('page_count').textContent = pdfDoc.numPages

    // Initial/first page rendering
    renderPage(pageNum)
  })

  document.querySelector('.pdf-container').addEventListener("swipeleft", function (e) {
    console.log(e.detail.deltaX)
    //document.querySelector('#the-canvas').style.left = e.detail.deltaX + 'px'
    if (Math.abs(e.detail.deltaX) > 30) {
      onNextPage()
      //document.querySelector('#the-canvas').style.left = '0px'
    }
  })
  document.querySelector('.pdf-container').addEventListener("swiperight", function (e) {
    console.log(e.detail.deltaX)
    //document.querySelector('#the-canvas').style.left = e.detail.deltaX + 'px'
    if (Math.abs(e.detail.deltaX) > 30) {
      onPrevPage()
      //document.querySelector('#the-canvas').style.left = '0px'
    }
    //
  })

  /**
   * standard requestFullscreen
   * @param {DOM} elem (in webkit just DOM，but it must be DOM element in Firefox)
   */
  // function requestFullscreen(elem) {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen()
  //   }
  //   else if (elem.webkitRequestFullScreen) {
  //     // it can not contain params in this method at Safari
  //     elem.webkitRequestFullScreen()
  //   }
  //   else if (elem.mozRequestFullScreen) {
  //     elem.mozRequestFullScreen()
  //   }
  // }

  /**
   * standard exitFullscreen
   */
  // function exitFullscreen() {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen()
  //   }
  //   else if (document.webkitCancelFullScreen) {
  //     document.webkitCancelFullScreen()
  //   }
  //   else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen()
  //   }
  // }
}
