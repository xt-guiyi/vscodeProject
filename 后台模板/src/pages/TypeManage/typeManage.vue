<template>
  <div class="cityManage-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'cityManage',
}
</script>

<style lang="scss" scoped>
.cityManage-wrap {
  height: 100%;
}
.card-height {
  height: inherit;
}

.dialog-select-item {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
    span {
      display: inline-block;
      width: 80px;
    }
}
</style>