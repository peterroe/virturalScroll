<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 12:19:59
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 13:47:26
-->
<template>
    <VirtualListVue />
</template>

<script setup>
import VirtualListVue from './VirtualList.vue';
import Add from '../lib/index.js'
</script>

<style>
html {
  height: 100%;
}
body {
    height: 100%;
    margin: 0;
}
#app {
    height: 100%;
}
</style>