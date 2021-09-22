<template>
  <div >
    <div>
      <div
        class="folder-item-wrap" 
        :style="{paddingLeft: 20 * layer + 'px'}" 
        :class="currentSelectIndex ? 'folder-item-wrap-active' : ''"
        @mousemove="() => isMore = true" 
        @mouseleave="() => isMore = false"
      >
          <p class="folder-item pointer" @click="openAndHiden($event, data, currentIndex)">
            <i data-name="arrow" :class="!isOpen ? 'el-icon-caret-right' : 'el-icon-caret-bottom'" v-visibility="data.departmentChild == '1'"></i>
            <i class="el-icon-folder ml-5"></i>
            <span class="folder-name ml-5">
              {{ data.departmentName }}
              <i v-if="isShowCheck && isCheck" class="el-icon-check ml-5"></i>
            </span>
            <i v-show="isShowMore && isMore"   class="el-icon-more ml-5 last-i" @click.stop="showPopover($event,data)"></i>
        </p>
      </div>
      <el-collapse-transition>
        <div v-if="isOpen">
          <file-item 
            v-for="(item, index) in data.children ||  children" 
            :key="index"
            :data="item"
            :currentIndex="index"
            :parentIndex="currentIndexChain"
            v-on="$listeners"
          />
        </div>
      </el-collapse-transition>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'fileItem',
  props: {
    // 数据
    data: {
      type: [Array,Object],
      default: () => []
    },
    // 父级索引
    parentIndex: {
      type: String,
      default: null
    },
    // 当前索引
    currentIndex: {
      type: [Number,String],
      default: null
    },
  },
  data(){
    return {
      isOpen: false,
      isMore: false,
      children: [], // 子节点
      secondaryIndex: [], // 辅助函数
      currentIndexChain: '', // 当前索引链
      isCheck: false, // 被选中状态
    }
  },
  computed: {
    currentSelectIndex() {
      return this.selectIndex() === this.currentIndexChain
    }
  },
  inject: [
    'selectIndex',
    'lazy',
    'isShowMore',
    'onlyClickArrow',
    'isShowCheck',
    'checkList'
  ],
  created() {
    // 生成唯一key 父级索引-父级索引-父级索引-父级索引-....-当前索引
    this.currentIndexChain = (this.parentIndex ? this.parentIndex + '-' : '') +   this.currentIndex
    this.layer = this.currentIndexChain.split('-').length
    this.checkList.forEach(item => {
      if( item.departmentId === this.data.departmentId) {
        this.isCheck = true
      }
    })

  },
  watch: {
    data(newval,oldVal) {
      this.secondaryIndex = []
      console.log(newval,newval.children && newval.children.length == 0)
      if(!newval.children) {
        this.isOpen = false
      }
    }
  },

  methods: {
    openAndHiden(event, item) {
      // 如果onlyClickArrow 为true, 且没有点击箭头，直接触发点击事件
      if(this.onlyClickArrow && event.target.dataset.name !== 'arrow') {
        if(this.isShowCheck) this.isCheck = !this.isCheck
        this.$emit('clicked', [this.currentIndexChain,item])
        return
      }
      // 懒加载获取数据, 如果等于true,且没有点击过
      if(this.lazy && !this.secondaryIndex.find(item => item == this.currentIndexChain)) {
        this.secondaryIndex.push(this.currentIndexChain)
        this.lazyLoad(item)
      }
      // 展开收缩文件夹
      this.isOpen = !this.isOpen
      // 如果onlyClickArrow为false, 那么不管点哪里，也应该触发点击事件
      !this.onlyClickArrow && this.$emit('clicked', [this.currentIndexChain,item])
    },

     // 懒加载节点数据
    lazyLoad(item) {
      const  resolve = (data) =>{
        if(!data.length) return
        // this.children.push(...data)
        this.$set(this.data, 'children' , data)
      }
      this.$emit('load', [item, resolve])
    },
    
    showPopover(event, data) {
      this.$emit('moreTop', [event,data])
    },

  }
}
</script>

<style lang="scss" scoped>
  .folder-item-wrap {
    display: block;
    &:hover {
      background-color: rgba($color: #0077ff, $alpha: 0.1);
    }
  }
  .folder-item {
    height: 30px;
    @include fja(flex-start, center);
    .folder-name {
      flex: auto;
      @include singleEllipsis;
    }
    .last-i {
      margin-right: 10px;
      flex: 0 0 20px;
      height: 20px;
      transform: rotate(90deg);
    }
  }

  .folder-item-wrap-active {
    background-color: skyblue!important;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>