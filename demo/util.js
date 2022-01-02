/*
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 12:23:08
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 14:37:10
 */
import { ref, onMounted } from 'vue'

export function generateData(len = 100) {
    let tempArr = new Array(len).fill().map((item, i) => ({
        id: i,
        number: Math.floor(Math.random() * 101) //[1,100]
    }))

    return ref(tempArr)
}

export function useContainerHeight(el) {
    const scrollHeight = ref()
    onMounted(() => {
        scrollHeight.value = el.value.clientHeight
    })
    return {
        scrollHeight
    }
}

export function useScroll(el, size, callback) {
    const start = ref(0)
    const end = ref(10)
    onMounted(() => {
        el.value.addEventListener('scroll', (e) => {
            start.value = Math.floor(e.target.scrollTop / size)
            end.value = start.value + 10
            callback()
        })
    })
    return {
        start,
        end
    }
}