<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="info" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="分享" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="更新日志" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="修改个人信息" name="account">
                <account :info="info" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserCard from './components/UserCard'
  import Activity from './components/Activity'
  import Timeline from './components/Timeline'
  import Account from './components/Account'
  import { info } from '@/api/profile'
  export default {
    name: 'Profile',
    components: { UserCard, Activity, Timeline, Account },
    computed: {
      ...mapGetters([
        'name',
        'avatar'
      ])
    },
    data() {
      return {
        user: {},
        info: {},
        activeTab: 'activity'
      }
    },

    created() {
      this.getUser()
      this.getRow()
    },
    methods: {
      getUser() {
        this.user = {
          name: this.name,
          // role: this.roles.join(' | '),
          role : 'admin',
          email: 'admin@test.com',
          avatar: this.avatar
        }

        info(this.$store.state.user.id,this.$store.state.user.token).then(res => {
          console.log(res.data)
          this.info = res.data
        })
      },
      // 获取权限
      getRow(){
        console.log(this.$store.state.user)
      }
    }
  }
</script>
