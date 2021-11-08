import Vue from 'vue'
const has = Vue.directive('has', {
    inserted: function(el, binding) {
        const permissions = JSON.parse(localStorage.getItem('permissions')) // 指令列表
        if (hasd(binding.value, permissions)) {
            el.parentNode.removeChild(el) // 调用元素父级删除，有时候父元素未渲染出来可以把bind换成inserted
        }
    }
})

function hasd(value, permissions) {
    let isExist = true
    if (
        permissions === undefined ||
        permissions === null ||
        permissions.length === 0
    ) {
        return true
    }
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i] === value) {
            isExist = false
            break
        }
    }
    return isExist
}
export { has }