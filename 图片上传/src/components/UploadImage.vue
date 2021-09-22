<template>
  <div class="upload-image">
      <div class="upload-title">{{ uploadTitle }}<i v-if="showIcon"></i></div>
      <div class="upload-content" ref="bgImgRef"  v-for="n in imgNumber" :key="n">
        <label :for="`immObj-${currentIndex}-${n}`" class="upload-image" ref="visibilityRef"></label>
        <input
          :id="`immObj-${currentIndex}-${n}`"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif" 
          :data-index="n"
          @change="imageChange"
        >
        <div></div>
      </div>
  </div>
</template>

<script>
import { getFileName } from '@/utils/imageUpload.js'
import  { ossConfig, uploadImage, ImageResolve } from '@/api/uploadImage.js'
export default {
  name: 'UploadImage',
  data() {
    return {
      // 展示图片链接
      showImgUrl:  [],
      // 发送图片链接
      imagUrl: [], 
    }
  },
  created(){
    console.log(this.defaultImageUrl)
  },
  props: {
    uploadTitle: {
      type: String,
      default: '上传标题'
    },
    // 必选图标
    showIcon: {
      type: Boolean,
      default: false
    },
    // 当前项
    currentIndex: {
      type: Number,
      required: true
    },
    // 是否有默认图片
    defaultImageUrl: {
      type: Array,
    },
    defaultStorageImageUrl: {
      type: Array,
    },
    // 是否一个标题对应多个图片展示框
    imgNumber: {
      type: Number,
      default: 1
    },
  },
  computed: {
    
    
  },
  mounted(){
    // 读缓存
    // 有默认图片
    if(this.defaultImageUrl) {
      this.defaultImageUrl.forEach((item,index) => {
        this.$refs.bgImgRef[index].style.backgroundImage = `url(${item})`
        this.$refs.visibilityRef[index].style.opacity = '0'
        this.showImgUrl =  this.defaultImageUrl
      })
    }
    if (this.defaultStorageImageUrl) {
      this.imagUrl = this.defaultStorageImageUrl
    }
  },
  methods: {
    // 上传图片
    imageChange (e) {
    if (e.target !== null) {
      const InputHtml = e.target
      // 获取图片
      const file = InputHtml.files[0]
      if (file.size >= 5000000) return  this.$notify({ type: 'warning', message: '图片应小于5M'})
      // 读图片
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', async (fileReader) => {
        // 为啥要嵌套data...
        let { data } =  await ossConfig()
        // console.log(file)
        let params = data.data
        const formData = new FormData()
        let fileName = getFileName(fileReader.currentTarget.result, params.dir, file.name)
        formData.append('key', fileName)
        formData.append('policy', params.policy)
        formData.append('OSSAccessKeyId', params.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', params.signature)
        formData.append('file', file)
        let imageUrl = await uploadImage(params.domain, formData)
        let  result  = await ImageResolve(params.domain +'/'+ fileName)
        // 展示用图片链接
        this.showImgUrl[e.target.dataset.index - 1 ]= result.data.data
        // 传给后台的图片链接
        this.imagUrl[e.target.dataset.index - 1] = params.domain +'/'+ fileName
        // dom操作
        this.$refs.bgImgRef[e.target.dataset.index - 1].style.backgroundImage = `url(${result.data.data})`
        this.$refs.visibilityRef[e.target.dataset.index - 1].style.opacity = '0'
        // console.log(result)
        // console.log(this.defaultImageUrl)
        // console.log(this.imagUrl, this.showImgUrl,this.$refs)
        this.$emit('chang', this.uploadTitle, this.showImgUrl, this.imagUrl)
      })
    }
  },

  
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
  .upload-image {
    width: inherit;
    height: inherit;
    min-width: 10rem;
    min-height: 5rem;
    display: flex;
    flex-direction: column;
    .upload-title {
      font-size: 1.6rem;
      text-align: left;
      position: relative;
      margin-bottom: 1rem;
      i {
          width: 1rem;
          height: 1rem;
          @include bis('../assets/img/bixuan.png');
          display: inline-block;
        
      }
    }
    .upload-content{
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      border: 1px solid;
      margin: 1rem 0 1rem 0;
      .upload-image {
        width: inherit;
        height: 10rem;
        position: relative;
        &::after {
          content: '';
          width: 5rem;
          border-bottom: 2px solid #BFBFBF;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: calc( 50% - 2.5rem );
        }
        &::before {
          content: '';
          width: 5rem;
          border-bottom: 2px solid #BFBFBF;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: calc( 50% - 2.5rem );
          transform: rotate(-90deg);
        }

      }
      input[type="file"] {
        display: none;
      }
    }
    
  }
</style>