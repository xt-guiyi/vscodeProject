<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-08 20:58:57
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-08 21:23:21
-->
<template>
<div>
  <div id="table-container">
  <div class="table-main" @click="tableChange">
    <div class="table-items" v-for="( item, index ) of titleSouce" :class="[ index === currentItem - 1? 'active-table' : '' ]" :key="index" :data-key="++index">
      <div class="table-title">{{ item.title }}</div>
    </div>
  </div>
</div>
<slot></slot>
</div>
</template>

<script>
export default {
  name: 'TableChange',
  props: {
    // 数据源
    titleSouce: {
      type: Array,
      required: true
    },
    // 默认项
    defaultItem: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentItem: 1
    }
  },
  created() {
      this.currentItem = this.defaultItem
  },
  methods: {
    tableChange(e) {
        const dom = e.target
        const keyValue = dom.parentNode?.dataset.key ? dom.parentNode.dataset.key : dom.dataset.key
        if (keyValue) {
          this.currentItem = parseInt(keyValue)
        }
        console.log(this.currentItem)
        this.$emit('change', this.currentItem)
    }
  },
  provide: function () {
    return {
      'currentItem': () => this.currentItem
    }
  },
}
</script>

<style lang="scss" scoped>
#table-container {
  height: inherit;
  font-size: 1.8rem;
  text-align: center;
  background-color: #f2f2f2;
  // border-bottom: 1px solid silver;
}
.table-main {
  height: 100%;
  color: #333333;
  display: flex;
  .table-items {
    flex: auto;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    
  }
  .table-items:last-child{
    &::after {
    content: "";
    background-color: #aaaaaa;
    height: 80%;
    width: 2px;
    position: absolute;
    left: 0;
    }
  }
}
.active-table {
  font-weight: 900;
  // 下划线
  // color: #E8514A;
  // &::after {
  //   content: "";
  //   background-color: skyblue;
  //   height: 2px;
  //   width: 100%;
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  // }
}
</style>
