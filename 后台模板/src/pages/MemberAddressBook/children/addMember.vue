<template>
  <div class="add-menber-wrap">
    <!-- 头 -->
    <h5 class="fz-24 fw-300">{{isEditor ? '编辑成员' : '添加成员' }}</h5>
    <div class="mt-20" v-if="!isEditor">
      <el-button size="small"  type="primary" @click="save(true)">保存并继续添加</el-button>
      <el-button size="small" @click="save(false)">保存</el-button>
      <el-button size="small" @click="chcanel">取消</el-button>
    </div>
    <div class="mt-20" v-else>
      <el-button size="small" @click="editor">保存</el-button>
      <el-button size="small" @click="chcanel">取消</el-button>
    </div>
    <!-- 表单 -->
    <el-form ref="form" :rules="rules" :model="form" label-width="auto" size="small" class="form mt-20">
      <div class="group">
        <el-form-item label="头像：" label-width="80px" prop="name">
            <el-upload
              class="avatar-uploader"
              :action="domain"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
            >
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="姓名：" label-width="80px" prop="name" class="form-item-style">
            <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="80px" prop="account" class="form-item-style">
          <el-input v-model="form.account" placeholder="企业微信账号，同步到企业微信则必填" :disabled="isEditor"></el-input>
        </el-form-item>
        <el-form-item label="平台id：" label-width="80px"  class="form-item-style">
          <el-input v-model="form.id" placeholder="成员唯一标识，设定以后不支持修改"></el-input>
        </el-form-item>
        <el-form-item label="性别：" label-width="80px" prop="sex" class="form-item-style">
          <el-radio-group v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机：" label-width="80px" prop="phone" class="form-item-style">
          <el-input v-model="form.phone" placeholder="成员通过验证该手机后可以加入企业">
          </el-input>
        </el-form-item>
      </div>
      <!-- <div class="divider"></div> -->
      <div class="divider"></div>
      <div class="group mt-20 mb-20">
        <el-form-item label="部门：" label-width="80px" >
          <department-item v-for="(item, index) in departmentInfoList" :key="index" :data="item" @more="openFileList"/>
          <span class="pointer ml-10" style="color: #0C4C7F;" @click="addDepartment">修改</span>
        </el-form-item>
        <el-form-item label="职务：" label-width="80px" class="form-item-style">
          <el-input v-model="form.duties"></el-input>
        </el-form-item>
        <el-form-item v-if="!isEditor" label="同步到企业微信：" label-width="140px" prop="sync">
            <el-radio-group v-model="form.sync">
              <el-radio :label="1">同步</el-radio>
              <el-radio :label="0">不同步</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getOssJsConfig } from '@/api/common'
import { addUser, editUser } from '@/api/addressBook'
import { channelId } from '@/config/env'
import { phoneExp } from '@/config/regExp'
import { getFileName } from '@/utils/imageUpload'
import departmentItem from '../components/departmentItem.vue'
import { mapState, mapMutations } from 'vuex';
export default {
  components: { departmentItem },
  name: 'addMenber',
  data() {
    const validateAccount =  (rule, value, callback) => {
      if (value == '' && this.form.sync === 1) {
        callback(new Error('同步到企业微信，必须填写企业微信账号'))
      } else {
        callback()
      }
    }
    const validatePhone =  (rule, value, callback) => {
      if (phoneExp.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号'))
      }
    }
    return {
      form: {
          name: '',
          imageUrl: '', // 图片链接
          account:'',
          id: '',
          sex: '',
          phone: '',
          duties: '',
          sync: 0,
      },
      rules:  {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
        ],
        account: [
          { required: true, validator: validateAccount, message: '', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请填写性别', trigger: 'blur' },
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' },
        ],
        sync: [
          { required: true, message: '必须填写', trigger: 'blur' },
        ],
      },
      domain: '', // 上传域名
      uploadData: {}, // 上传信息
      fileName: '', // 文件名
      // departmentInfoList: [], // 部门信息列表
      isEditor: false, // 是否是编辑模式
      wgUserId: '', // 网格用户id, 编辑模式时，会用到
      defaultEditorform: '', // 编辑默认用户信息， 用于对比是否修改过数据
      defaultEditorDepartmentInfo: [] // 编辑默认用户部门信息， 用于对比是否修改过数据
    } 
  },
  created() {
    // this.departmentInfoList.push(this.departmentInfo)
    this.setDepartmentInfoList([this.departmentInfo])
    console.log(this.departmentInfo,23)
  },
  beforeRouteEnter (to, from, next) {
    console.log(to,from)
    if(from.name === 'userDetail' || from.path === '/') {
        next(vm => {
        // 进行编辑操作时
        console.log(vm.addressUserInfo,Object.keys(vm.addressUserInfo).length,32)
        if(Object.keys(vm.addressUserInfo).length) {
          vm.isEditor = true
          vm.wgUserId = vm.addressUserInfo.wgUserId
          // vm.departmentInfoList = vm.addressUserInfo.departmenInfo.list
          vm.setDepartmentInfoList(vm.addressUserInfo.departmenInfo.list)
          console.log(vm.departmentInfoList)
          vm.form = {
            name: vm.addressUserInfo.userName,
            imageUrl: vm.addressUserInfo.userAvatar,
            account: vm.addressUserInfo.qywxUserId,
            id: vm.addressUserInfo.bdwUserId,
            sex: vm.addressUserInfo.userSex,
            phone: vm.addressUserInfo.userPhone,
            duties: vm.addressUserInfo.positionName,
            sync: 0
          }
          vm.defaultEditorform = { ...vm.form}
          vm.defaultEditorDepartmentInfo = [ ...vm.addressUserInfo.departmenInfo.list ]
        }
      })
    }else {
      next()
    }
  },
  computed: {
    // 部门id列表
    departmentIdList() {
      return this.departmentInfoList.map(item => item.departmentId)
    },
    ...mapState('addressBook',['departmentInfo', 'addressUserInfo','departmentInfoList']),
    ...mapState('user',['userInfo'])
  },
  methods: {
    // 创建用户api
    async addUser() {
      const result = await addUser({
        qywxUserId: this.form.account,
        name: this.form.name,
        avatar: this.form.imageUrl,
        bdwUserId: this.form.id,
        sex: this.form.sex,
        position: this.form.duties,
        phone: this.form.phone,
        sync: this.form.sync,
        departmentIds: this.departmentIdList,
      })
      if(result.data.code == '0') {
        this.$message.success('创建成功')
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },

    // 编辑用户api
    async editUser() {
      const result = await editUser({
        wgUserId: this.wgUserId,
        name: this.form.name,
        avatar: this.form.imageUrl,
        bdwUserId: this.form.id,
        sex: this.form.sex,
        position: this.form.duties,
        phone: this.form.phone,
        departmentIds: this.departmentIdList,
      })
      console.log(result,1)
      if(result.data.code == '0') {
        this.$message.success('编辑成功')
        return true
      }else {
        this.$message.error(result.data.msg)
        return false
      }
    },

    // 返回
    chcanel() {
      this.$router.back()
    },

    // 保存
    save(next) {
      this.$refs.form.validate()
      .then(async () => {
        const result = await this.addUser()
        if(result) {
          if(!next) return this.$router.push({name: 'oneMain'})
          this.form = {
            name: '',
            imageUrl: '',
            account:'',
            id: '',
            sex: '',
            phone: '',
            duties: '',
            sync: 0
          }
        }
      })
      .catch(error =>  console.log(error))
    },

    // 编辑
    editor() {
      this.$refs.form.validate()
      .then(async () => {
        if(this.diff()) {
          const result = await this.editUser()
          result &&  this.$router.push({name: 'userDetail',  query: { wgUserId: this.wgUserId}})
        }else {
          this.$message.info('没有修改信息')
        }
      })
      .catch(error =>  console.log(error))
    },

    // 是否修改过
    diff() {
      let diff = false
      // 表单
      for (const key in this.defaultEditorform) {
          if (Object.hasOwnProperty.call(this.defaultEditorform, key)) {
            if(this.defaultEditorform[key] !== this.form[key])  diff = true
          }
      }
      // 部门信息
      let defaultDepartIdList = this.defaultEditorDepartmentInfo.map(item => item.departmentId)
      this.departmentIdList.forEach(id => {
        console.log(defaultDepartIdList.includes(id))
          if(!defaultDepartIdList.includes(id)) diff = true
      })
      return diff
    },

    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log(this.domain + this.fileName)
        this.form.imageUrl = this.domain + '/' + this.fileName + '?x-oss-process=image/resize,h_60,w_60'
    },

    // 上传失败
    handleAvatarError(err) {
      this.$message.error('上传失败')
    },

    // 上传前
    async beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 8
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 8MB!')
      // 取oss配置
      const result = await getOssJsConfig({
        type: 1,
        channelId
      })
      if(result.data.code == '0') {
        const data = result.data.data
        this.fileName = getFileName(file, data.dir)
        this.domain = data.domain
        this.uploadData = {
          key: this.fileName,
          policy: data.policy,
          signature: data.signature,
          OSSAccessKeyId: data.accessid,
          success_action_status: "200"
        }
      }
      return isLt2M;
    },

    // 打开Tooltip
    openFileList([event,data]) {
      const tooltipList = [
        {
          name: '删除',
          func: (item) => this.deleteDepartment(item,data)
        }
      ]
      // 显示位置 右边， 偏差 下： 35  右：10
      const option = {
        placement: 'right',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [35, 10],
            },
          },
        ],
      }
      this.$tooltip(event.target, tooltipList,option)
    },

    // 删除部门
    deleteDepartment(selectItem,data) {
      const f =  this.departmentInfoList.filter(item =>  !item == data)
      this.departmentInfoList = f
    },

    // 添加新部门
    addDepartment() {
      this.setAddDepartmentOrTagDialog({
        isShow: true,
        title: '修改部门',
        describe: '已选择的部门',
        defaultDepartmentInfo: this.departmentInfoList
      })
    },

    ...mapMutations('addressBook', [
      'setAddDepartmentOrTagDialog',
      'setDepartmentInfoList'
    ])
  }
}
</script>

<style lang="scss">
  .form {

    .group {
      .form-item-style {
        width: 460px;
      }
      
      .avatar-uploader {
        & .el-upload {
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        & .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        .avatar {
          width: 60px;
          height: 60px;
          display: block;
        }
      }
    }

    .divider {
      border-top: 1px dashed silver;
    }

    .el-select .el-input {
      width: 100px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
</style>