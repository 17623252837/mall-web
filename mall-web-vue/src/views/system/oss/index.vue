<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="接口地址" align="center">
          <template slot-scope="scope">{{scope.row.endpoint}}</template>
        </el-table-column>
        <el-table-column label="key" align="center">
          <template slot-scope="scope">{{scope.row.accessKeyId}}</template>
        </el-table-column>
        <el-table-column label="secret" align="center">
          <template slot-scope="scope">{{scope.row.accessKeySecret}}</template>
        </el-table-column>
        <el-table-column label="文件夹名" width="160" align="center">
          <template slot-scope="scope">{{scope.row.bucketName}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.ossState">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="oss"
               ref="ossForm"
               label-width="150px" size="small">
        <el-form-item label="接口地址：">
          <el-input v-model="oss.endpoint" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="key：">
          <el-input v-model="oss.accessKeyId" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="secret：">
          <el-input v-model="oss.accessKeySecret" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="文件夹名：">
          <el-input v-model="oss.bucketName"  style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="oss.ossState">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createAdmin,updateAdmin,updateStatus,deleteAdmin,getRoleByAdmin,allocRole} from '@/api/login';
  import {formatDate} from '@/utils/date';

  import {page, save ,deleteOne} from "@/api/ossApi";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  const defaultAdmin = {
    id: null,
    endpoint: null,
    accessKeyId: null,
    accessKeySecret: null,
    bucketName: null,
    ossState: 1
  };
  export default {
    name: 'ossList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        oss: Object.assign({}, defaultAdmin),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds:[],
        allRoleList:[],
        allocAdminId:null
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.oss = Object.assign({},defaultAdmin);
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          save(row,this.$store.state.user.token).then(res => {
            this.$message({
              type: 'success',
              message: '更改成功!'
            });
            this.getList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOne(row.id,this.$store.state.user.token).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          })
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.oss = Object.assign({},row);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            save(this.oss,this.$store.state.user.token).then(res => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
              this.getList();
              this.dialogVisible =false;
            })
          } else {
            save(this.oss,this.$store.state.user.token).then(res => {
              this.$message({
                type: 'success',
                message: '增加成功!'
              });
              this.getList();
              this.dialogVisible =false;
            })
          }
        })
      },
      getList() {
        this.listLoading = true;
        page(this.listQuery,this.$store.state.user.token).then(res => {
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
        })
      },
    }
  }
</script>
<style></style>


