<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2021-04-19 11:05:18
 * @LastEditors: 小熊熊
 * @LastEditTime: 2021-04-19 11:11:47
-->
<template>
  <div>
    <file-item 
      v-for="(item, index) in fileData" 
      :key="index" 
      :data="item" 
      :currentIndex="index"
      @moreTop="moreTop"
      @clicked="changeSelectIndex"
      @load="load" 
    />
  </div>
</template>

<script>
import fileItem from './fileItem'
export default {
  name: 'fileTree',
  components: {
    fileItem
  },
  props: {
    // 数据
    fileData: {
      type: [Array,Object],
      default: () => []
    },
    // 是否懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 懒加载函数
    load: {
      type: Function,
      default: () => {}
    },
    // 是否显示更多图标
    isShowMore: {
      type: Boolean,
      default: true
    },
    // 点击更多图标事件
    moreTop: {
      type: Function,
      default: () => {}
    },
    // 只允许通过点击箭头进行展开和隐藏，为true时，click事件将不会发生
    onlyClickArrow: {
      type: Boolean,
      default: false
    },
    // 是否显示选择状态
    isShowSelectStatus: {
      type: Boolean,
      default: true
    },
    // 是否被选中后显示对勾(只在onlyClickArrow为true时生效)
    isShowCheck: {
      type: Boolean,
      default: false
    },
    // 默认选择对勾，索引列表
    checkList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      index: '', // 当前索引链
    }
  },
  provide() {
    return {
      selectIndex: () => this.index,
      lazy: this.lazy,
      isShowMore: this.isShowMore,
      onlyClickArrow: this.onlyClickArrow,
      isShowCheck: this.isShowCheck,
      checkList: this.checkList
    }
  },
  created() {
  },
  watch: {
    fileData(newval, oldVal) {
      console.log(newval,'我看看')
    }
  },
  methods: {
    changeSelectIndex([index, item]) {
      if(this.isShowSelectStatus)  this.index = index
      this.$emit('click', item)
    },
  }
}
</script>

<style lang="scss">
  
</style>