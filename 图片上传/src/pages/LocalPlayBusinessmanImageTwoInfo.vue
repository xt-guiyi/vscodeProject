<template >
  <div class="businessman-image-info">
    <div class="header">
      <van-icon name="arrow-left" @click="back" />
      <h5>请填写商户图片信息：</h5>
    </div>
    <div class="write-BusinessmanImageInfo">
      <upload-image 
        class="upload-item"
        v-for="(item, index) in UploadImageInfo" 
        :key="index" 
        :defaultImageUrl="item.defaultImageUrl" 
        :defaultStorageImageUrl="item.defaultStorageImageUrl" 
        :currentIndex="index" 
        :uploadTitle="item.title" 
        :showIcon="item.showIcon" 
        :imgNumber="item.imgNumber"  
        @chang="getImageurl"/>
    </div>
    <div class="footer"  >
      <van-button  color="#02A7F0" block @click="confirm">确认</van-button>
    </div>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage'
export default {
  name: 'LocalPlayBusinessmanImageInfo',
  data() {
    return {
      UploadImageInfo: [
        { title: '调查表', showIcon: true, imgNumber: 2},
        { title: '协议', showIcon: true, imgNumber: 3},
      ],
      ImageType: new Map([
        [ '调查表', 'survey'],
        [ '协议', 'agreement'],
      ]),
      showTwoImageObj: {},
      imagTwoeObj:  {},
    }
  },
  components: {
    UploadImage
  },
  created(){
    // 拿缓存
    this.showTwoImageObj = JSON.parse(sessionStorage.getItem('showTwoImageObj')) || {}
    this.imagTwoeObj = JSON.parse(sessionStorage.getItem('businessmanTwoImageInfo')) || {}
      console.log(this.imagTwoeObj)
    // 有
    if(Object.keys(this.showTwoImageObj).length !== 0){
      this.UploadImageInfo.forEach(item => {
        if(this.ImageType.has(item.title)) {
          item['defaultImageUrl'] = this.showTwoImageObj[this.ImageType.get(item.title)]
        }
      });
    }

    if(Object.keys(this.imagTwoeObj).length !== 0) {
      this.UploadImageInfo.forEach(item => {
        if(this.ImageType.has(item.title)) {
          item['defaultStorageImageUrl'] = this.imagTwoeObj[this.ImageType.get(item.title)]
        }
      });
    }
  },
  methods: {
    async back(){
      if(Object.keys(this.showTwoImageObj).length && !sessionStorage.getItem('businessmanTwoImageInfo')) {
            try {
              let confirm = await this.$dialog.confirm({
                message: '是否返回？所填内容将不会保存。',
              })
              if (confirm === 'confirm') {
                  this.$router.push({name: 'LocalPlayWriteMaterial'})
              }
            } catch (error) {
              return
            }
          }else { 
            this.$router.push({name: 'LocalPlayWriteMaterial'})
          }
    },

    // 拿url
    getImageurl(title, showImgUrl, imgUrl){
      // console.log(title, showImgUrl, imgUrl)
      if(this.ImageType.has(title)) {
        // 用来显示的图片链接
        this.showTwoImageObj[this.ImageType.get(title)] = showImgUrl
        this.imagTwoeObj[this.ImageType.get(title)] = imgUrl
        console.log(this.imagTwoeObj)

      }
    },
    
    confirm(){
      console.log(this.imagTwoeObj, this.UploadImageInfo.length)
      // 判断
      if(
        this.imagTwoeObj &&
        this.imagTwoeObj['survey']?.length === 2 &&
        this.imagTwoeObj['agreement']?.length  === 3 
      ) {
         // 缓存
        sessionStorage.setItem('showTwoImageObj', JSON.stringify(this.showTwoImageObj))   
        sessionStorage.setItem('businessmanTwoImageInfo', JSON.stringify(this.imagTwoeObj))
        // 提示成功
        this.$notify({ type: 'success', message: '上传成功'})
        // 跳转
        this.$router.push({name: 'LocalPlayWriteMaterial'})
      }else {
        this.$notify({ type: 'warning', message: '请上传剩余图片'})
      }
    },
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
  .businessman-image-info {
    height: 100vh;
    position: relative;
    .header {
      position: relative;
      i {
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        display: inline-block;
        font-size: 1.6rem;
        background: #000;
        opacity: .3;
        color: white;
        border-radius: 100%;
        @include pz(absolute, calc( 50% - 1.1rem ), 1rem);
      }
      h5 {
        width: 90vw;
        font-size: 1.8rem;
        height: 5rem;
        line-height: 5rem;
        margin: 0 auto;
        text-align: left;
        text-indent: 3.4rem;
      }
    }
    
    .write-BusinessmanImageInfo {
      width: 90vw;
      margin: 0 auto;
      padding-top: 1rem;
      .upload-item {
        margin-bottom: 2rem;
      }
    }
    .footer {
      width: 70vw;
      margin: 0 auto;
      padding: 2rem 0 2rem 0;
      // position: absolute;
      // bottom: 4rem;
      // left: calc( 50% - 35vw );
    }
  }
</style>