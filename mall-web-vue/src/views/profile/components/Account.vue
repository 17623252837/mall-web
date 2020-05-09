<template>
  <el-form>
    <el-input v-model="info.id" type="hidden" />
    <el-form-item label="用户名">
      <el-input v-model.trim="info.nickName" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="info.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import  { update } from '@/api/profile'
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      console.log(this.info)

      const data = this.info;
      update(this.info,this.$store.state.user.token).then(res => {
       // this.$store.dispatch("setinfo")
        this.$store.dispatch("user/getInfo",data);
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>
