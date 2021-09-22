<!--
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-12-21 16:19:04
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-12-22 14:17:03
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    // 解决软键盘弹起问题
    // 获取原始窗口的高度
    let Height = document.body.clientHeight;
    let app = document.querySelector('#app')
    console.log(app)
    window.onresize = function(){
      console.log(Height, '我被触发了')
      app.style.height = Height + 'px';
    }; 
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  position: relative;
}


</style>
