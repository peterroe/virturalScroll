<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 12:21:45
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 14:24:53
-->
<template>
	<div ref="containerRef" style="height:100%" class="container">
		<div ref="backgroundRef" class="background"></div>
		<div ref="listRef" class="list">
			<div 
				class="item"
				v-for="(item,index) in visibleData"
				:key="index"
				:data-no="index"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	generateData,
	useContainerHeight,
	useScroll
} from './util.js'
import { ref,computed, onMounted, onUpdated } from 'vue'

//get random data
let data = generateData()
//estimatedItemSize
const estimatedItemSize = ref(200)

const containerRef = ref(null)
const { scrollHeight } = useContainerHeight(containerRef)


const _data = computed(() => {
	return data.value.map((it, i) => {
		return {
			no: i,
			...it
		}
	})
})


const _posData = computed(() => {
	return data.value.map((it, index) => ({
		index,
		height: estimatedItemSize.value,
		top: index * estimatedItemSize.value,
		bottom: (index + 1) * estimatedItemSize.value
	}))
})

const backgroundRef = ref()
onMounted(() => {
	backgroundRef.value.style.height = _posData.value[_posData.value.length - 1].bottom + 'px'
})

// const visiableCount = computed(() => {
// 	console.log('visiableCount',scrollHeight.value ,estimatedItemSize.value)
// 	return Math.ceil( scrollHeight.value / estimatedItemSize.value)
// })
const { start, end } = useScroll(containerRef,() => {
	setStartOffset()
})
const listRef = ref()
const setStartOffset = () => {
	const startOffset = start.value >= 1 ? _posData.value[start.value].top : 0
	listRef.value.style.transform = `translate3d(0, ${startOffset}px, 0)`
}
// const updateItemsSize = () => {
// 	const { children } = listRef.value
// 	console.log(children)
// 	for(let node of children) {
// 		const { height } = node.getBoundingClientRect()
// 		const index = node.dataset.no
// 		const oldHeight = _posData.value[index].height
// 		const dValue = oldHeight - height
// 		console.log("插值：",dValue)
// 	}
// }
const visibleData = computed(() => {
	return data.value.slice(start.value, end.value)
})


onUpdated(() => {
	console.log("update",_posData.value)
	// updateItemsSize()
	const height = _posData.value[_posData.value.length - 1].bottom
	backgroundRef.value.style.height = height + 'px'
	// setStartOffset()
})
</script>


<style lang="stylus">
.container
	position relative
	overflow auto
	-webkit-overflow-scrolling: touch;
.background
	position absolute
	left: 0;
	top: 0;
	right: 0;
	z-index: -1;
.list 
	position absolute
	left: 0;
	right: 0;
	top: 0;
.item
	background-color skyblue
	height 200px
</style>