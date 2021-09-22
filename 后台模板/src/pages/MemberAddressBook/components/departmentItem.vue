<template>
  <div class="fepartment-item" v-if="data">
    <div class="wrap">
      <i class="el-icon-folder ml-5"></i>
    <span class="folder-name ml-5">{{ data.departmentName }}</span>
    <i  class="el-icon-more ml-5 last-i pointer" @click.stop="showPopover($event,data)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'departmentItem',
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  methods: {
    showPopover(event,data) {
      this.$emit('more', [event,data])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin';
  .fepartment-item{
    display: inline-block;
    margin-right: 10px;
    height: 30px;
   
    background-color: #fff;
    border: 1px solid #E4E6E9;
    border-radius: 2px;
    .wrap {
      height: inherit;
      padding: 4px 11px 4px 8px;
      @include fja(flex-start, center);
      .folder-name {
        max-width: 230px;
        @include singleEllipsis;
        display: inline-block;
      }
    }
  }

  .last-i {
    transform: rotate(-90deg);
  }
  
</style>