<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 监听全局点击事件，隐藏tooltip
window.addEventListener('click', () => {
      const tooltipList = document.querySelectorAll('.tooltip');
      tooltipList.forEach(item => {
        item.style.display = 'none'
      })

})
export default {

}
</script>

<style lang="scss">
</style>
