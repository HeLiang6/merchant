<template>
    <el-form :ref="name" label-width="140px" :model="$store.state.incoming" :rules="rules">
        <el-form-item label="结算类型" prop="account_type">
            <el-radio-group v-model="$store.state.incoming.account_type">
                <el-radio-button label="PUBLIC">对公</el-radio-button>
                <el-radio-button label="PRIVATE">对私</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <transition name="fade" :duration="{ enter: 200, leave: 100 }">
            <el-form-item v-if="$store.state.incoming.account_type==='PUBLIC'">
                <el-col :span="4">
                    <el-form-item prop="account_open_license_pic">
                        <upload v-model="$store.state.incoming.account_open_license_pic"
tips="开户许可证"
                                url="/file/material"/>
                        <el-input v-model="$store.state.incoming.account_open_license_pic" type="hidden"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开户许可证名称" prop="account_open_license_name">

                        <el-input v-model="$store.state.incoming.account_open_license_name"></el-input>

                    </el-form-item>

                    <el-form-item label="开户许可证编号" prop="account_open_license">
                        <el-input v-model="$store.state.incoming.account_open_license"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </transition>
        <transition name="fade" :duration="{ enter: 200, leave: 100 }">
            <div v-if="$store.state.incoming.account_type==='PRIVATE'">
                <el-form-item label="是否法人" prop="is_legal_name_account">
                    <el-radio-group v-model="$store.state.incoming.is_legal_name_account">
                        <el-radio-button label="1">法人</el-radio-button>
                        <el-radio-button label="0">非法人</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                        v-if="$store.state.incoming.is_legal_name_account==='0'">
                    <el-col :span="4">
                        <el-form-item prop="settler_authorization_pic">
                            <upload v-model="$store.state.incoming.settler_authorization_pic"
tips="结算授权书"
                                    url="/file/material"/>
                            <el-input v-model="$store.state.incoming.settler_authorization_pic"
                                      type="hidden"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="settler_certificate_front_pic">
                            <upload v-model="$store.state.incoming.settler_certificate_front_pic"
tips="结算人身份证正面"
                                    url="/file/idCardFront"
                                    @resp="idCardSettleFront"/>
                            <el-input v-model="$store.state.incoming.settler_certificate_front_pic"
                                      type="hidden"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="settler_certificate_back_pic">
                            <upload v-model="$store.state.incoming.settler_certificate_back_pic"
tips="结算人身份证反面"
                                    url="/file/idCardBack"
                                    @resp="idCardSettleBack"/>
                            <el-input v-model="$store.state.incoming.settler_certificate_back_pic"
                                      type="hidden"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <upload v-model="$store.state.incoming.settler_hold_certificate_pic"
tips="法人手持身份证"
                                    url="/file/material"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结算人姓名" prop="settler_name">
                            <el-input v-model="$store.state.incoming.settler_name"></el-input>
                        </el-form-item>
                        <el-form-item label="结算人身份证号" prop="settler_certificate_code">
                            <el-input
                                    v-model="$store.state.incoming.settler_certificate_code"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证开始时间" prop="settler_certificate_start_date">
                            <el-input
                                    v-model="$store.state.incoming.settler_certificate_start_date"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证到期时间" prop="settler_certificate_end_date">
                            <el-input
                                    v-model="$store.state.incoming.settler_certificate_end_date"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="4">
                        <el-form-item prop="bank_card_pic">
                            <upload v-model="$store.state.incoming.bank_card_pic"
tips="银行卡照片"
                                    url="/file/bankCard"
                                    @resp="banCard"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行卡号" prop="bank_account_num">
                            <el-input v-model="$store.state.incoming.bank_account_num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </div>
        </transition>

        <el-form-item label="银行所属地区" prop="areas">
            <el-col :span="5">
                <el-form-item prop="bank_province">
                    <el-select v-model="$store.state.incoming.bank_province"
placeholder="省份"
                               @change="onBankPro">
                        <el-option
                                v-for="item in province"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">{{ item.label }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item prop="bank_city">
                    <el-select v-model="$store.state.incoming.bank_city" placeholder="城市">
                        <el-option
                                v-for="item in bankCity"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">{{ item.label }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="银行名称" prop="bank_name">
            <el-select v-model="$store.state.incoming.bank_name"
filterable
placeholder="可搜索"
                       :loading="bankListLoading"
@change="bankChange"
@focus="bankLoad">
                <el-option v-for="item in bankList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">{{ item.label }}
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="银行分行名称" prop="bank_branch_name">
            <el-select v-model="$store.state.incoming.bank_branch_name" filterable placeholder="可搜索">
                <el-option v-for="item in bankBranch"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">{{ item.label }}
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="银行预留手机" prop="phone">
            <el-input v-model="$store.state.incoming.phone"></el-input>
        </el-form-item>
        <el-form-item label="结算方式" prop="settle_type">
            <el-radio-group v-model="$store.state.incoming.settle_type">
                <el-radio-button label="D1">D1</el-radio-button>
                <el-radio-button label="T1">T1</el-radio-button>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<script>
  import { bank, bank_branch, city, province } from '@/api/incoming'
  import upload from '@/views/incoming/upload'

  export default {
    name: 'Settler',
    components: {
      upload,
    },
    props: ['name'],
    data () {
      const pub = (message) => (rule, value, callback) => {
        if (this.$store.state.incoming.account_type === 'PUBLIC') {
          if (value === '') {
            return callback(new Error(message))
          }
        }
        return callback()
      }
      const pri_legal = (message, is_legal) => {
        console.log(message, is_legal)
        return (rule, value, callback) => {
          if (this.$store.state.incoming.account_type === 'PRIVATE' &&
            this.$store.state.incoming.is_legal_name_account === is_legal) {
            if (value === '') {
              return callback(new Error(message))
            }
          }
          return callback()
        }
      }
      const areas = (rule, value, callback) => {
        if (this.$store.state.incoming.bank_province === '' ||
          this.$store.state.incoming.bank_city === '') {
          if (value === '') {
            return callback(new Error('银行地区必须填写'))
          }
        }
        return callback()
      }
      return {
        province: [],
        bankList: [],
        bankBranch: [],
        bankCity: [],
        bankListLoading: true,

        rules: {
          account_type: [
            { required: true, message: '结算类型必须填写' },
          ],
          account_open_license_pic: [
            { validator: pub('开户许可证照片必须上传'), required: true },
          ],
          account_open_license_name: [
            { required: true, validator: pub('开户许可证名称必须填写') },
          ],
          account_open_license: [
            { required: true, validator: pub('开户许可证号必须填写') },
          ],
          is_legal_name_account: [
            {
              required: true, message: '是否法人必须填写',
            },
          ],
          settler_authorization_pic: [
            {
              required: true, validator: pri_legal('结算授权书必须上传', '0'),
            },
          ],
          settler_certificate_front_pic: [
            {
              required: true, validator: pri_legal('结算人身份证正面必须上传', '0'),
            },
          ],
          settler_certificate_back_pic: [
            {
              required: true, validator: pri_legal('结算人身份证反面必须上传', '0'),
            },
          ],
          settler_hold_certificate_pic: [
            {
              required: true, validator: pri_legal('结算人手持身份证必须上传', '0'), trigger: 'blur',
            },
          ],
          settler_name: [
            {
              required: true, validator: pri_legal('结算人姓名必须填写', '0'),
            },
          ],
          settler_certificate_code: [
            {
              required: true, validator: pri_legal('结算人身份证号必须填写', '0'),
            },
          ],
          settler_certificate_start_date: [
            {
              required: true, validator: pri_legal('结算人身份证开始时间必须填写', '0'),
            },
          ],
          settler_certificate_end_date: [
            {
              required: true, validator: pri_legal('结算人身份证到期时间必须填写', '0'),
            },
          ],
          bank_card_pic: [
            { required: true, message: '银行卡必须上传', trigger: 'blur' },
          ],
          bank_account_num: [
            { required: true, message: '银行卡号必须填写', trigger: 'blur' },
          ],
          bank_province: [
            { required: true, message: '银行地区必须填写', trigger: 'change' },
          ],
          areas: [
            { required: true, validator: areas },
          ],
          bank_city: [
            { required: true, message: '银行地区必须填写', trigger: 'change' },
          ],
          bank_name: [
            { required: true, message: '银行名称必须填写', trigger: 'blur' },
          ],
          bank_branch_name: [
            { required: true, message: '银行支行名称必须填写', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '银行预留手机必须填写', trigger: 'blur' },
          ],
        },
      }
    },
    async mounted () {
      const provinces = await province()
      for (const provincesKey in provinces) {
        this.province.push({ label: provinces[provincesKey].name, value: provinces[provincesKey].id })
      }

      if (this.$store.state.incoming.bank_name !== '') {
        this.bankListLoading = true
        // 银行列表
        bank().then(res => {
          let obj = {}
          res.find(item => {
            obj = {
              value: item.inst_out_code,
              label: item.bank_name,
            }
            this.bankList.push(obj)
            this.bankListLoading = false
          })
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.$store.state.incoming.bank_name !== '') {
        const bank = await bank_branch(this.$store.state.incoming.bank_name)
        for (const areaKey in bank) {
          this.bankBranch.push({ label: bank[areaKey].bank_name, value: bank[areaKey].inst_out_code })
        }
      }
      if (this.$store.state.incoming.bank_province !== '') {
 city(this.$store.state.incoming.bank_province).then(res => {
          for (const resKey in res) {
            this.bankCity.push({ label: res[resKey].name, value: res[resKey].id })
          }
        })
}
    },
    methods: {
      idCardSettleFront (response) {
        console.log(response)
        this.$store.dispatch('incoming/build', { settler_certificate_code: response.num, settler_name: response.name })
      },
      idCardSettleBack (response) {
        console.log(response)
        this.$store.dispatch('incoming/build',
          { settler_certificate_start_date: response.start_date, settler_certificate_end_date: response.end_date })
      },
      banCard (response) {
        this.$store.dispatch('incoming/build', { bank_account_num: response.bank_card })
      },
      bankChange (value) {
        this.bankBranch = []
        this.$store.state.incoming.bank_branch_name = ''
        bank_branch(value).then(res => {
          for (const resKey in res) {
            this.bankBranch.push({ label: res[resKey].bank_name, value: res[resKey].inst_out_code })
          }
        })
      },
      onBankPro (value) {
        this.bankCity = []
        this.$store.state.incoming.bank_city = ''
        city(value).then(res => {
          for (const resKey in res) {
            this.bankCity.push({ label: res[resKey].name, value: res[resKey].id })
          }
        })
      },
      bankLoad () {
        if (this.bankList.length === 0) {
          this.bankListLoading = true
          bank().then(res => {
            let obj = {}
            res.find(item => {
              obj = {
                value: item.inst_out_code,
                label: item.bank_name,
              }
              this.bankList.push(obj)
            })
            this.bankListLoading = false
          }).catch(err => {
            console.log(err)
          })
        }
      },
    },
  }
</script>

<style scoped>

</style>
