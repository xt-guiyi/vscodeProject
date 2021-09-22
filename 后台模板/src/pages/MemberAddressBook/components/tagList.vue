<template>
  <div v-if="data">
    <div v-for="(item, index) in data" :key="index" >
      <div 
        class="tag-item-wrap" 
        @mousemove="() => item.isMore = true" 
        @mouseleave="() => item.isMore = false"
      >
        <p class="tag-item pointer" @click="tagDetail(item)">
          <i class="el-icon-collection-tag ml-5"></i>
          <span class="tag-name ml-5">{{ item.tagName }}</span>
          <i  v-show="item.isMore"  class="el-icon-more ml-5 last-i" @click.stop="showPopover($event, item)"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { mapMutations } from 'vuex';
  
export default {
  name: 'tagList',
  props: {
    data: {
      type: [Array, Object]
    }
  },
  methods: {
    tagDetail(item) {
      this.setTagInfo(item)
    },
    
    showPopover(e,item) {
      this.setMoreTagInfo(item)
      const tooltip = document.querySelector('#tooltip-tag');
      createPopper(e.target, tooltip, {
        placement: 'right',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [50, 0],
            },
          },
        ],
      })
      tooltip.style.display = 'inline-block';
    },

    ...mapMutations('addressBook', [
      'setTagInfo',
      'setMoreTagInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .tag-item-wrap {
    display: block;
    &:hover {
      // background: #E0F8F7;
      background-color: rgba($color: #0077ff, $alpha: 0.1);
    }
  }
  .tag-item {
    height: 30px;
    @include fja(flex-start, center);
    .tag-name {
      flex: 0 0 80%;
      @include singleEllipsis;
    }
    .last-i {
      transform: rotate(90deg);
    }
  }

</style>