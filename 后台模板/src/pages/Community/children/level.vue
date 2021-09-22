<template>
	<div class="level-wrap" style="position: relative;">
		<el-card class="box-card">
			<div class="top-button">
				<el-button-group>
					<el-button :type="getNum==1?'primary':''" @click="changeLevel(1)">层级一</el-button>
					<el-button :type="getNum==2?'primary':''" @click="changeLevel(2)">层级二</el-button>
					<el-button :type="getNum==3?'primary':''" @click="changeLevel(3)">层级三</el-button>
				</el-button-group>
			</div>
			<div class="bottom mt-10">
				<span>姓名搜索： </span>
				<el-input size="mini" placeholder="请输入内容" v-model="getName" class="bottom-input">
				</el-input>
				<el-button
					style="padding: 5px 15px;margin-left: 10px;font-size: 12px;background-color: rgba(76, 123, 204, 1);color: #FFF;"
					@click="userSearch">查询</el-button>
			</div>
				<div class="head">
					<h5 class="title">{{level}}</h5>
					<div class="head-buttom">
						<el-button 
							size='mini' 
              v-if="getNum==1" 
              @click="addRobot"
            >添加小宁机器人</el-button>
						<el-button
							size='mini'  
              @click="addMember"
            >{{getNum !== 2 ? '添加新成员' : '添加标签'}}</el-button>
            <el-button 
              v-if="getNum==2"
              size='mini'  
              @click="tagToMember"
            >通过标签添加成员</el-button>
					</div>

				</div>
			<div class="box_bottom">
				
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="bdWuserId" label="平台ID" width="180">
					</el-table-column>
					<el-table-column prop="wgUserId" label="网格ID">
					</el-table-column>
					<el-table-column prop="userName" label="真实姓名">
					</el-table-column>
					<el-table-column prop="departmentStr" label="部门">
					</el-table-column>
					<el-table-column prop="roleName" label="角色">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="statusUpdate(scope.$index, scope.row)">
								{{scope.row.userStatus==0?'禁用':'启用'}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</div>
        <div class="box_bottom_page mt-20">
          <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage">
          </el-pagination>
		</div>
		
		</el-card>
    <!-- 添加部门 -->
    <el-dialog width="40%"  :title="addMemberDialog.title"  :visible="addMemberDialog.isShow" @close="closeDialog"  center>
      <div>
        <add-member ref="addMemberRef" :leave="getNum" :communityId="communityId" v-if="addMemberDialog.isShow"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmAddMemberDialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加成员 -->
    <el-dialog width="40%"  title="通过标签添加成员"  :visible="isShowTagaddMemberDialog" @close="closeDialog"  center>
      <div>
          <div class="tag-add-member-group-item">
            <span class=" tag-add-member-group-item-span">标签:</span>
            <el-select v-model="currentTag" placeholder="请选择标签">
              <el-option
                v-for="item in currentLeveltagList"
                :key="item.tagId"
                :label="item.tagName"
                :value="item.tagId">
              </el-option>
            </el-select>
          </div>
          <div class="tag-add-member-group-item">
            <span class=" tag-add-member-group-item-span">添加成员:</span>
            <el-select v-model="currentMember" placeholder="请选择成员添加到标签">
              <el-option
                v-for="item in currentLevelMemberList"
                :key="item.wgUserId"
                :label="item.userName"
                :value="item.wgUserId">
              </el-option>
            </el-select>
          </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmTagToMemberDialog">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
	import { 
    userSearch,
    addRobot, 
    levelList, 
    statusUpdate,
    getCommunityLevelTag,
    authorizedUserList,
    addUserTwoLevel
  } from '@/api/level'
  import addMember from '../components/addMember.vue'
	export default {
		data() {
			return {
				Robot: '',
				UserNum: '',
				communityName: '',
				communityId: '',
				administratorsNum: '',
				createTime: '',
				wgNum: '',
				getNum: 1,
				getName: '',
				page: 1,
				cityCode: 421200,
				total: 0,
				level:'一级部门',
				tableData: [],
        isShowTagaddMemberDialog: false,
        currentLeveltagList: [],
        currentTag: '',
        currentMember: '',
        currentLevelMemberList: []
			};
		},
		created() {
			this.init()
			this.levelList()
		},
		computed: {
			...mapState('neighbourhoodManage', [
				'addMemberDialog'
			])
		},
		mounted() {

		},
		methods: {
			// 初始化数据
			init() {
				// console.log(this.$route.query);
				let obj = this.$route.query;
				this.Robot = obj.Robot;
				this.UserNum = obj.UserNum;
				this.communityName = obj.communityName;
				this.communityId = obj.communityId;
				this.administratorsNum = obj.administratorsNum;
				this.createTime = obj.createTime;
				this.wgNum = obj.wgNum;
				this.page=1
			},
			// 更改层级
			changeLevel(num) {
				
				this.getNum = num;
				if (num == 1) {
					this.level = '一级部门'
				} else if (num == 2) {
					this.level = '二级部门'
				} else {
					this.level = '三级部门'
				}
				this.levelList()
				this.page=1
			},

			// 用户搜索
			async userSearch() {
				if (!this.getName) {
					this.$message({
						showClose: true,
						message: '请输入关键字',
						type: 'warning'
					});
					return
				}
				let params = {
					communityId:this.communityId,
					userName: this.getName,
					level:this.getNum
				}
				let res = await userSearch(params)
				if (res.data.code == 0) {
					this.page=1
					var data = res.data
					this.total = data.total
					this.tableData = data.data.list
				} else if (res.data.code == 1004) {

					this.$message({
						showClose: true,
						message: res.data.msg,
						type: 'warning'
					});
				}
			},


			// 获取层级列表
			async levelList() {
				this.page=1
				let params = {
					communityId: this.communityId,
					level: this.getNum,
					page: this.page
				}
				// console.log(params)
				let res = await levelList(params)
				if (res.data.code == 0) {
					var data = res.data
					// console.log(data)
					this.total = data.data.total
					this.tableData = data.data.list
				}
				// console.log(this.total)
			},
			// 管理员状态更新
			async statusUpdate(index, el) {
				let time = new Date().getFullYear()
				let params = {
					appId: 1,
					time: time,
					wgUserId: el.wgUserId,
				}
				var res = await statusUpdate(params)
				if (res.data.code == 0) {
					var data = res.data
					console.log(data)
					this.total = data.total

					if(this.getName){
						this.userSearch()
					}else{
						this.levelList()
					}
					
				} else {
					this.$message({
						showClose: true,
						message: res.data.msg,
						type: 'warning'
					});
				}
			},

			// 添加小宁机器人
			async addRobot() {
				let params = {
					communityId: this.communityId,
				}
				console.log(params)
				let res = await addRobot(params)
				if (res.data.code == 0) {
					this.$message({
						showClose: true,
						message: res.data.msg,
						type: 'warning'
					});
				} else {
					this.$message({
						showClose: true,
						message: res.data.msg,
						type: 'warning'
					});
				}
			},
			// 分页
			changePage(e) {
				this.page = e
				this.levelList()
			},

			// 添加新成员
			addMember() {
				const title = new Map([
					[1, '添加成员到一级部门'],
					[2, '添加标签到二级部门'],
					[3, '添加成员到人大代表'],
				])
				this.setAddMemberDialog({
					isShow: true,
					title: title.get(this.getNum)
				})
      },
      // 当前当前层级已存在的标签 api
      async getCommunityLevelTag() {
        const result = await getCommunityLevelTag({
          communityId: this.communityId,
          level: this.getNum
        })
        if(result.data.code == '0') {
          this.currentLeveltagList =  result.data.data.list
        }
      },

      // 获取当前层级联系人列表 api
      async authorizedUserList() {
        const result = await authorizedUserList({
          communityId: this.communityId
        })
        if(result.data.code === 0) {
          console.log(result.data,11)
          this.currentLevelMemberList =  result.data.data.list
        }
      },

      // 通过标签添加用户 api
      async addUserTwoLevel() {
        const result = await addUserTwoLevel({
          communityId: this.communityId,
          wgUserId: this.currentMember,
          levelId: this.getNum,
          tagId: this.currentTag
        })
        if(result.data.code === 0) {
          this.$message.success('添加成功')
          return true
        }else {
          this.$message.error(result.data.msg)
          return false
        }
      },


      //  关闭对话框
      closeDialog() {
        this.currentTag = ''
        this.currentMember = ''
        this.cancelDialog()
      },

      // 取消对话框
      cancelDialog() {
        this.isShowTagaddMemberDialog = false
        this.setAddMemberDialog({
          isShow: false
        })
      },

      // 打开通过标签添加成员对话框
      tagToMember() {
        this.getCommunityLevelTag()
        this.authorizedUserList()
        this.isShowTagaddMemberDialog = true
      },

      // 确认添加成员或者标签按钮
      async confirmAddMemberDialog() {
        const result = await this.$refs.addMemberRef.confirm()
        console.log(result, this.$refs.addMemberRef.confirm)
        result && this.setAddMemberDialog({
          isShow: false,
        })
        this.page = 1
        this.levelList()
      },

      // 确认通过标签添加成员按钮
      async confirmTagToMemberDialog() {
        if(this.currentMember && this.currentTag) {
          const result =  await this.addUserTwoLevel()
          if(result) this.isShowTagaddMemberDialog = false
        }else {
          this.$message.info('请填写完整')
        }
        this.page = 1
        this.levelList()
      },

      ...mapMutations('neighbourhoodManage', [
            'setAddMemberDialog'
          ])
		},
		components: {
			addMember
		}
	};
</script>

<style scoped lang='scss'>
	.level-wrap {
		height: 100%;
	}

    .box-card {
        background-color: #FFF;
        height: 100%;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

	.bottom {
		display: flex;
    align-items: center;
    height: 40px;
    span {
      color: silver;
      font-size: 14px;
      margin-right: 5px;
    }
    .bottom-input {
      width: 150px;
    }

	}

  .head {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .title {
      height: 100%;
      line-height: 40px;
    }
    .head-buttom {
      height: 100%;
      line-height: 40px;
    }
    
  }

  

	el-table {
		padding: 0 20px;
	}


	.box_bottom_page {
		@include fja(center, center);
	}
  .tag-add-member-group-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .tag-add-member-group-item-span {
      flex: 0 0 80px;
    }
    
  }
  
  .box_bottom {
    .box_bottom_page {
      @include fja(center, center);
    }
    /deep/ {
      .is-leaf {
        background: #409eff;
        color: #fff;
      }
    }
  }

  
</style>