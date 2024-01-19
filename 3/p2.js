const target = document.querySelector('#target')

const offset = (ele) => {
    let result = {
        top: 0,
        left: 0,
    }

    const getOffset = (node, init) => {
        if (node.nodeType !== 1) return

        position = window.getComputedStyle(node)['position']

        if (typeof init === 'undefined' && position === 'static') {
            getOffset(node.parentNode)
            return
        }

        result.top = node.offsetTop + result.top - node.scrollTop
        result.left = node.offsetLeft + result.left - node.scrollLeft

        if (position === 'fixed') return

        getOffset(node.parentNode)
    }

    if (window.getComputedStyle(ele)['display'] === 'none') return result

    let position
    getOffset(ele, true)
    return result
}
console.log(offset(target))

function findDomElementYPosition(target) {
    let obj = target
    let currentY = 0
    while (obj) {
        currentY += obj.offsetTop // HTMLElement.offsetTop對於屬性來說，它返回當前元素相對於其offsetParent元素的頂部內邊距的距離。
        if (obj.offsetParent) {
            obj = obj.offsetParent
        } else {
            return currentY
        }
    }
    return currentY
}
console.log(findDomElementYPosition(target))
