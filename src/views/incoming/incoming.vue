<template>
    <el-container>
        <el-main>
            <el-collapse>
                <el-collapse-item v-show="true">
                    <template slot="title">
                        <span style="font-family: 'Microsoft YaHei';font-size: 16px">商户信息</span> <i
                            class="header-icon el-icon-house"></i>
                    </template>
                    <company></company>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <span style="font-family: 'Microsoft YaHei';font-size: 16px"> 法人/负责人信息</span> <i
                            class="header-icon el-icon-s-custom"></i>
                    </template>
                    <legal ref="legal" name="legal"></legal>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <span style="font-family: 'Microsoft YaHei';font-size: 16px">结算信息</span> <i
                            class="header-icon el-icon-bank-card"></i>
                    </template>
                    <settler ref="settler" name="settler"></settler>
                </el-collapse-item>
                <el-collapse-item title="微信开发配置" name="4">
                    <template slot="title">
                        <span style="font-family: 'Microsoft YaHei';font-size: 16px">微信开发配置</span> <i
                            class="header-icon el-icon-s-tools"></i>
                    </template>
                    <we-chat></we-chat>
                </el-collapse-item>
            </el-collapse>
            <el-button @click="save">保存</el-button>
            <el-button @click="submit">提交</el-button>
        </el-main>
    </el-container>
</template>

<script>
  import company from '@/views/incoming/company'
  import settler from '@/views/incoming/settler'
  import legal from '@/views/incoming/legal'
  import WeChat from '@/views/incoming/wechat'
  import { gain } from '@/api/incoming'
  import { Message } from 'element-ui'

  export default {
    components: {
      company,
      settler,
      legal,
      WeChat,
    },
    created () {
      gain().then(resp => {
        this.$store.dispatch('incoming/build', resp.data)
      })
    },
    methods: {
      save () {
        this.$store.dispatch('incoming/save')
      },
      submit () {
        this.$refs['legal'].$refs['legal'].validate((valid) => {
          if (valid) {
            this.$refs['settler'].$refs['settler'].validate(valid => {
              if (valid) {
                this.$store.dispatch('incoming/submit')
              } else {
                Message.error('请填写参数')
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
