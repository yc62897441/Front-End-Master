const window.performance = { 
    memory: {
        usedJSHeapSize,
        totalJSHeapSize,
        jsHeapSizeLimit
    },
 
    navigation: {
        // 頁面重定向跳轉到當前頁面的次數
        redirectCount,
        // 以哪種方式進入頁面
        // 0 正常跳轉進入
        // 1 window.location.reload() 重新刷新
        // 2 通過瀏覽器歷史記錄，以及前進後退進入
        // 255 其他方式進入
        type,         
    },
 
    timing: {
        // 等於前一個頁面 unload 時間，如果沒有前一個頁面，則等於 fetchStart 時間
        navigationStart,
        // 前一個頁面 unload 時間，如果沒有前一個頁面或者前一個頁面與當前頁面不同域，則值為 0
        unloadEventStart,
        // 前一個頁面 unload 事件綁定的回調函數執行完畢的時間
        unloadEventEnd,
        redirectStart,
        redirectEnd,
        // 檢查緩存前，準備請求第一個資源的時間
        fetchStart,
        // 域名查詢開始的時間
        domainLookupStart,
        // 域名查詢結束的時間
        domainLookupEnd,
        // HTTP（TCP） 開始建立連接的時間	        connectStart,
        // HTTP（TCP）建立連接結束的時間
        connectEnd,
        secureConnectionStart,
        // 連接建立完成後，請求文檔開始的時間
        requestStart,
        // 連接建立完成後，文檔開始返回並收到內容的時間
        responseStart,
        // 最後一個字節返回並收到內容的時間
        responseEnd,
        // Document.readyState 值為 loading 的時間
        domLoading,
        // Document.readyState 值為 interactive
        domInteractive,
        // DOMContentLoaded 事件開始時間
        domContentLoadedEventStart,
        // DOMContentLoaded 事件結束時間
        domContentLoadedEventEnd,
        // Document.readyState 值為 complete 的時間	        domComplete,
        // load 事件開始的時間
        loadEventStart,
        // load 事件結束的時間
        loadEventEnd
    }
}

const calcTime = () => {
    let times = {}
    let t = window.performance.timing
      
    // 重定向時間
    times.redirectTime = t.redirectEnd - t.redirectStart
      
    // DNS 查詢耗時
    times.dnsTime = t.domainLookupEnd - t.domainLookupStart
      
    // TCP 建立連接完成握手的時間
    connect = t.connectEnd - t.connectStart
      
    // TTFB 讀取頁面第一個字節的時間
    times.ttfbTime = t.responseStart - t.navigationStart
      
    // DNS 緩存時間
    times.appcacheTime = t.domainLookupStart - t.fetchStart
      
    // 卸載頁面的時間
    times.unloadTime = t.unloadEventEnd - t.unloadEventStart
      
    // TCP 連接耗時
    times.tcpTime = t.connectEnd - t.connectStart
      
    // request 請求耗時
    times.reqTime = t.responseEnd - t.responseStart
      
    // 解析 DOM 樹耗時
    times.analysisTime = t.domComplete - t.domInteractive
      
    // 白屏時間
    times.blankTime = t.domLoading - t.fetchStart
      
    // domReadyTime 即用戶可交互時間
    times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart
      
    // 用戶等待頁面完全可用的時間
    times.loadPage = t.loadEventEnd - t.navigationStart

    return times
}


const getOffsetTop = ele => {
    let offsetTop = ele.offsetTop
    if (ele.offsetParent !== null) {
        offsetTop += getOffsetTop(ele.offsetParent)
    }
    return offsetTop
}

const win = window
const firstScreenHeight = win.screen.height
let firstScreenImgs = []
let isFindLastImg = false
let allImgLoaded = false
let collect = []

const t = setInterval(() => {
    let i, img
    if (isFindLastImg) {
        if (firstScreenImgs.length) {
            for (i = 0; i < firstScreenImgs.length; i++) {
                img = firstScreenImgs[i]
                if (!img.complete) {
                    allImgLoaded = false
                    break
                } else {
                    allImgLoaded = true
                }
            }
        } else {
            allImgLoaded = true
        }
        if (allImgLoaded) {
            collect.push({
                firstScreenLoaded: startTime - Date.now()
            })
            clearInterval(t)
        }
    } else {
        var imgs = body.querySelector('img')
        for (i = 0; i < imgs.length; i++) {
            img = imgs[i]
            let imgOffsetTop = getOffsetTop(img)
            if (imgOffsetTop > firstScreenHeight) {
                isFindLastImg = true
                break
            } else if (imgOffsetTop <= firstScreenHeight 
            && !img.hasPushed) {
                img.hasPushed = 1
                firstScreenImgs.push(img)
            }
        }
    }
}, 0)

const doc = document
doc.addEventListener('DOMContentLoaded', () => {
    const imgs = body.querySelector('img')
    if (!imgs.length) {
        isFindLastImg = true
    }
})

win.addEventListener('load', () => {
    allImgLoaded = true
    isFindLastImg = true
    if (t) {
        clearInterval(t)
    }
})


(function logFirstScreen() {
    let images = document.getElementsByTagName('img')
    let iLen = images.length
    let curMax = 0
    let inScreenLen = 0
    
    // 圖片的加載回調
    function imageBack() {
        this.removeEventListener
        && this.removeEventListener('load', imageBack, !1)
        if (++curMax === inScreenLen) {
            // 所有在首屏的圖片均已加載完成的話，發送日誌
            log()
        }   
    } 
    // 對於所有的位於指定區域的圖片，綁定回調事件
    for (var s = 0; s < iLen; s++) {
        var img = images[s]
        var offset = {
            top: 0
        }
        var curImg = img
        while (curImg.offsetParent) {
            offset.top += curImg.offsetTop
            curImg = curImg.offsetParent
        }
        // 判斷圖片在不在首屏
        if (document.documentElement.clientHeight < offset.top) {
            continue
        }
        // 圖片還沒有加載完成的話
        if (!img.complete) {
            inScreenLen++
            img.addEventListener('load', imageBack, !1)
        }
    }
    // 如果首屏沒有圖片的話，直接發送日誌
    if (inScreenLen === 0) {
        log()
    }
    // 發送日誌進行統計
    function log () {
        window.logInfo.firstScreen = +new Date() - window.performance.timing.navigationStart
        console.log('首屏時間：', +new Date() - window.performance.timing.navigationStart)
    }
})()


















