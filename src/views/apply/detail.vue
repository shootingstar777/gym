<template>
  <div>
    <el-tag type="success">我的申请</el-tag>
    <div class="applyContainer" v-loading="loading">
      <div class="apply_left">
        <div v-if="applyData.length == 0">
          <el-empty></el-empty>
        </div>
        <div v-for="item in applyData" :key="item.id" v-else>
          <div class="applyItem" @click="itemClick(item)">
            <el-tag type="primary">申请id:</el-tag> {{ item.id }}
            <el-tag type="primary">申请时间</el-tag> {{ item.start_time }}
            <el-tag v-if="item.status == 1" type="info">申请中</el-tag>
            <el-tag v-else-if="item.status == 2" type="success">申请完成</el-tag>
            <el-tag v-else-if="item.status == 3" type="info">取消申请中</el-tag>
            <el-tag v-else-if="item.status == 4" type="info">取消申请成功</el-tag>
            <el-tag v-else-if="item.status == 5" type="danger">申请失败</el-tag>
          </div>
        </div>
      </div>
      <el-card class="apply_right">
        <el-empty description="请选择一项申请查看细节" v-if="!selectData"></el-empty>
        <el-descriptions title="申请信息" v-else :column="1" border>
          <el-descriptions-item label="申请id号">{{ selectData.id }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ selectData.user_name }}</el-descriptions-item>
          <el-descriptions-item label="申请场地号">{{ selectData.ground_id }}号场地</el-descriptions-item>
          <el-descriptions-item label="申请时间段" :span="3">{{ selectData.start_end_time_date}}{{selectData.start_end_time}}</el-descriptions-item>
          <el-descriptions-item label="申请创建时间" :span="3">{{ selectData.start_time }}</el-descriptions-item>
          <el-descriptions-item label="申请结束时间" :span="3">{{ selectData.end_time }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ selectData.telephone }}</el-descriptions-item>
          <el-descriptions-item label="申请状态">
            <el-tag v-if="selectData.status == 1" type="info">申请中</el-tag>
            <el-tag v-else-if="selectData.status == 2" type="success">申请完成</el-tag>
            <el-tag v-else-if="selectData.status == 3" type="info">取消申请中</el-tag>
            <el-tag v-else-if="selectData.status == 4" type="info">取消申请成功</el-tag>
            <el-tag v-else-if="selectData.status == 5" type="danger">申请失败</el-tag>

          </el-descriptions-item>

        </el-descriptions>
        <el-button v-if="selectData.status == 1" type="danger" style="float: right;margin-top:10px"
          @click="cancelApply(selectData.id)">取消申请</el-button>
      </el-card>
    </div>

  </div>

</template>

<script>
import { getApplyDetail_, cancelApply_, getPeriodData_ } from '../../network/applyApi'
export default {
  data() {
    return {
      user_id: '',
      applyData: [],
      selectData: '',
      loading: false,
    }
  },
  created() {
    this.getUser()
    //this.getPeriodData()
    this.getApplyDetail()

  },
  methods: {
    /* 获取时间段对应信息 */
   /*  getPeriodData() {
      if (!sessionStorage.getItem('times')) {
        getPeriodData_().then(res => {
          this.times = res.data
          sessionStorage.setItem('times', JSON.stringify(res.data))
        }, err => { console.log(err); })
      } else {
        this.times = JSON.parse(sessionStorage.getItem('times'))

      }
    }, */

    getUser() {
      this.user_id = JSON.parse(sessionStorage.getItem('user')).user_id
    },
    getApplyDetail() {
      this.loading = true
      getApplyDetail_({ user_id: this.user_id }).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.applyData = res.data
          this.loading = false
        }
      }, err => { console.log(err); })
    },
    itemClick(index) {
      console.log(index);
      this.selectData = index
    },
    cancelApply(id) {
      this.loading = true
      cancelApply_({ id: id }).then(res => {
        console.log(res);
        if (res.status == 0) {
          this.$message.success('取消申请已发送')
          this.loading = false
          this.getApplyDetail()
        }
      })
    }
  },

}
</script>

<style>
.applyContainer {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  height: 500px;
}

.apply_left {
  flex: 1;
  margin-right: 50px;
  background-color: rgba(255, 255, 255, .7);
  height: 500px;
  overflow: auto;
  border-radius: 3px;

}

.applyItem {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  padding: 14px 0px;
  cursor: pointer;
}

.applyItem:hover {
  transition: all 0.4s linear;
  background-color: rgba(101, 101, 101, .3);
}

.apply_right {
  flex: 2;
}
</style>