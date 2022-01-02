<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 12:21:45
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 14:36:20
-->
<template>
	<div ref="containerRef" style="height:100%" class="container">
		<div ref="backgroundRef" class="background"></div>
		<div ref="listRef" class="list">
			<div 
				class="item"
				v-for="item in visibleData"
				:key="item.id"
				:data-no="item.id"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	generateData,
	useScroll
} from './util.js'
import { ref,computed, onMounted } from 'vue'

let data = generateData()
//estimatedItemSize
const estimatedItemSize = ref(200)


const backgroundRef = ref()
onMounted(() => {
	backgroundRef.value.style.height = data.value.length * estimatedItemSize.value + 'px'
})

const containerRef = ref(null)
const { start, end } = useScroll(containerRef, estimatedItemSize.value, () => {
	setStartOffset()
})

const listRef = ref()
const setStartOffset = () => {
	const startOffset = start.value * estimatedItemSize.value
	listRef.value.style.transform = `translate3d(0, ${startOffset}px, 0)`
}

const visibleData = computed(() => {
	return data.value.slice(start.value, end.value)
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