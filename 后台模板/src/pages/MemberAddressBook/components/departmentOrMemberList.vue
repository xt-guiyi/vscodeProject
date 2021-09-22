<template>
  <div class="department-or-member-list">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index"
        class="list-item"
      >
            <i class="el-icon-folder ml-5"></i>
            <span class="item-name ml-5">
              {{ item.departmentName }}
            </span>
            <i class="el-icon-close ml-5 pointer" @click.stop="deleted($event,item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'departmentOrMemberList',
  props: {
    data: {
      type: [Object,Array],
      default: () => {}
    }
  },
  methods: {
    deleted(event, item) {
      this.$emit('deleted',item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-item {
    height: 30px;
    display: flex;
    align-items: center;
    .item-name {
      flex: 0 0 75%;
    }
  }
</style>