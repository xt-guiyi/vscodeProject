<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 21:15:07
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-25 17:19:13
-->

<template>
<div v-if="show">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'TablePane',
  inject: ['currentItem'],
  props: {
    activeKey: {
      type: Number,
      default: 1
    }
  },
  computed: {
    show(){
      return this.currentItem() === this.activeKey
    }
  },
}
</script>
