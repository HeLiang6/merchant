<template>
    <el-form :ref="name" label-width="140px" :rules="rules" :model="$store.state.incoming">
        <el-form-item>
            <el-col :span="4">
                <el-form-item prop="id_card_front_pic">
                    <upload v-model="$store.state.incoming.id_card_front_pic"
tips="身份证正面"
                            url="/file/idCardFront"
                            prop="id_card_front_pic"
@resp="idCardFront"/>
                    <el-input v-model="$store.state.incoming.id_card_front_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="id_card_back_pic">
                    <upload v-model="$store.state.incoming.id_card_back_pic"
tips="身份证反面"
                            url="/file/idCardBack"
                            @resp="idCardBack"/>
                    <el-input v-model="$store.state.incoming.id_card_back_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item>
                    <upload v-model="$store.state.incoming.id_card_hand_pic"
tips="法人手持身份证"
                            url="/file/material"/>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="证件类型" prop="certificate_type">
                    <el-select v-model="$store.state.incoming.certificate_type" placeholder="证件类型">
                        <el-option key="1" value="1" label="身份证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人姓名" prop="certificate_name">
                    <el-input v-model="$store.state.incoming.certificate_name"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号" prop="certificate_code">
                    <el-input v-model="$store.state.incoming.certificate_code"></el-input>
                </el-form-item>
                <el-form-item label="身份证开始时间" prop="certificate_start_date">
                    <el-input v-model="$store.state.incoming.certificate_start_date"></el-input>
                </el-form-item>
                <el-form-item label="身份证到期时间" prop="certificate_end_date">
                    <el-input v-model="$store.state.incoming.certificate_end_date"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="法人联系电话" prop="contact_phone_num">
            <el-col :span="8">
                <el-input v-model="$store.state.incoming.contact_phone_num"></el-input>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
  import upload from '@/views/incoming/upload'

  export default {
    name: 'Legal',
    components: {
      upload,
    },
    props: ['name'],
    data () {
      return {
        rules: {
          certificate_type: [
            {
              required: true, message: '证件类型必须填写', trigger: 'blur',
            },
          ],
          id_card_front_pic: [
            {
              required: true, message: '身份证正面照必须上传',
            }],
          id_card_back_pic: [
            {
              required: true, message: '身份证反面照必须上传',
            }],
          certificate_name: [
            {
              required: true, message: '身份证姓名必须填写', trigger: 'blur',
            },
          ],
          certificate_code: [
            {
              required: true, message: '身份证号必须填写', trigger: 'blur',
            },
          ],
          certificate_start_date: [
            {
              required: true, message: '身份证号开始日期必须填写', trigger: 'blur',
            },
          ],
          certificate_end_date: [
            {
              required: true, message: '身份证号到期时间必须填写', trigger: 'blur',
            },
          ],
          contact_phone_num: [
            {
              required: true, message: '法人联系方式必须填写', trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      idCardFront (response) {
        this.$store.dispatch('incoming/build', { certificate_code: response.num, certificate_name: response.name })
      },
      idCardBack (response) {
        this.$store.dispatch('incoming/build',
          { certificate_start_date: response.start_date, certificate_end_date: response.end_date })
      },
    },
  }
</script>

<style scoped>

</style>
