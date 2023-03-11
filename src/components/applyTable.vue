<template>
  <div>
    <el-card style="z-index:1">
      <div style="display: flex; justify-content: flex-end;margin-bottom: 20px;">
        <el-button type="success" size="mini">可选</el-button>
        <el-button type="info" size="mini">不可选</el-button>
      </div>

      <el-table :data="tableData" border fit fixed height="500px" v-if="tableData" @cell-click="CellClick">
        <el-table-column label="场地号" prop="ground_id" align="center"></el-table-column>
        <el-table-column :index='1' label="8:00-9:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time1_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time1_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="2" label="9:00-10:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time2_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time2_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="3" label="10:00-11:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time3_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time3_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="4" label="11:00-12:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time4_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time4_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="5" label="13:00-14:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time5_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time5_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="6" label="14:00-15:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time6_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time6_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="7" label="15:00-16:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time7_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time7_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="8" label="16:00-17:00" align="center">
          <template slot- scope="scope">
            <el-button :type="scope.row.time8_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time8_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="9" label="17:00-18:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time9_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time9_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="10" label="19:00-20:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time10_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time10_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="11" label="20:00-21:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time11_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time11_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
        <el-table-column :index="12" label="21:00-22:00" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.time12_status == 0 ? 'success' : 'info'"
              :disabled="scope.row.time12_status !== 0 ? true : false"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="申请场地" :visible.sync="dialogFormVisible" v-loading="loading">

        <el-form :model="applyForm" label-width="150px" ref="applyFormRef" :rules="applyFormRules">
          <el-form-item label="申请人:">
            {{ applyForm.user_name }}
          </el-form-item>
          <el-form-item label="申请场地号:" prop="ground_id">
            {{ applyForm.ground_id }}号场地
          </el-form-item>
          <el-form-item label="申请时间段:">
            {{ applyForm.selectDate }} {{ applyForm.start_end_time }}
          </el-form-item>
          <el-form-item label="联系方式:" prop="telephone">
            <el-input size="small" style="width: 200px" prefix-icon="el-icon-phone" prop="telephone"
              :placeholder="applyForm.telephone" v-model="applyForm.telephone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="applyCancel">取 消</el-button>
          <el-button type="primary" @click="applyEnsure">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getEquipmentData_, getPeriodData_, applyGround_, getTomApply_ } from '../network/applyApi'
export default {
  props: ["data", "type", "date"],
  data() {
    return {
      key: 0,
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      applyForm: {
        user_name: '',
        user_id: '',
        ground_id: '',
        telephone: '',
        start_end_time: '',
        status: 1,
        selectDate: '',
        time_id: '',
        date_id: ''
      },
      applyFormRules: {
        telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
          {
            pattern: /^1\d{10}$/,
            message: '电话号码应是以1开头的11位数字',
            trigger: 'blur'
          }
        ],
      },
      times: '',
      /*  date: {
         today: '',
         tomorrow: ''
       } */
    }
  },
  created() {
    this.getApplyUser()
    this.dataInit()
  },
  methods: {
    dataInit() {
      this.tableData = this.$props.data
      this.applyForm.date_id = this.$props.date.id
      this.applyForm.selectDate = this.$props.date.id == 0 ? this.$props.date.today : this.$props.date.tomorrow
    },
    /* 显示申请场地 */
    CellClick(row, column, cell, event) {
      this.applyForm.ground_id = row.ground_id
      this.applyForm.time_id = column.index
      this.applyForm.ground_id = row.id
      this.applyForm.start_end_time = column.label
      this.dialogFormVisible = true

    },
    /* getApply() {
 if(this.applyForm.date_id==0){

 }
    }, */
    /* 获取器材信息 */
    /*   getEquipmentData() {
        getEquipmentData_().then(res => {
          this.equipments = res.data
        }, err => { console.log(err); })
  
      }, */
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

    /* 获取当前时间 */
    /*    getTime(danger) {
         let date = new Date()
         let result = `${date.getMonth() + 1}月${date.getDate() + danger}日 `
         return result
       }, */
    /* 获取当前申请人 */
    getApplyUser() {
      let applyUser = JSON.parse(sessionStorage.getItem('user'))
      this.applyForm.user_id = applyUser.user_id
      this.applyForm.user_name = applyUser.user_name
      this.applyForm.telephone = applyUser.telephone
    },
    /* 取消申请 */
    applyCancel() {
      this.dialogFormVisible = false
      this.$refs.applyFormRef.resetFields()
    },
    /* 确认进行申请 */
    applyEnsure() {
      this.loading = true
      applyGround_(this.applyForm).then(res => {
        if (res.status == 0) {
          this.$message.success(res.message)
          let id=this.applyForm.date_id
          this.$emit('applySuccess', id)
        } else {
          this.$message.error('申请失败！')

        }
        this.loading = false
        this.dialogFormVisible = false

      }, err => { console.log(err); })
    },
    /*   getTomApply() {
        this.applyForm.date_id = 1
        this.applyForm.selectDate = this.getTime(1)
        this.loading = true
        getTomApply_({ type_id: this.$props.type }).then(res => {
          this.this_tableData = res.data
          this.loading = false
        }, err => {
          console.log(err);
        })
      }, */
  }

}
</script>

<style>

</style>