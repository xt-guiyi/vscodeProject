<template>
    <ul id="tooltip" class="tooltip" >
      <li 
        v-for="(item, index) in list" 
        :key="index" 
      >
        <a href="#" @click="trigger(item)" :class=" item.disable ? 'disable-style' : ''">{{item.name}}</a>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'toltip',
  data() {
    return {
      list: []
    }
  },
  methods: {
    trigger(item) {
      if(typeof item.func == 'function') item.func(item)
    }
  }
}
</script>

<style lang="scss" scoped>
  #tooltip{
    min-width: 100px;
    text-align: center;
    display: inline-block;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 3px 0 #c8c8c8;
    z-index: 1000;
    display: none;
    li {
      display: flex;
      flex-direction: column;
      flex: auto;
      a {
        padding: 5px;
        font-size: 12px;
      }
      a:hover {
        background-color: skyblue;
      }
    }

    .disable-style {
      color: #787878!important;
      cursor: default;
      &:hover {
        background-color: white!important;
      }
    }
  }
  
</style>