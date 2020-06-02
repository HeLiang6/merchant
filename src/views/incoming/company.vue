<template>
    <el-form label-width="140px" label-position="right" :rules="rules" :model="$store.state.incoming">
        <el-form-item>
            <el-col :span="4">
                <el-form-item prop="shop_door_pic">
                    <upload v-model="$store.state.incoming.shop_door_pic"
tips="门头照"
                            url="/file/material"/>
                    <el-input v-model="$store.state.incoming.shop_door_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="shop_inside_pic">
                    <upload v-model="$store.state.incoming.shop_inside_pic"
tips="店内照"
                            url="/file/material"/>
                    <el-input v-model="$store.state.incoming.shop_inside_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="shop_outside_pic">
                    <upload v-model="$store.state.incoming.shop_outside_pic"
tips="店外照"
                            url="/file/material"/>
                    <el-input v-model="$store.state.incoming.shop_outside_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="shop_cashier_desk_pic">
                    <upload v-model="$store.state.incoming.shop_cashier_desk_pic"
tips="收银台照"
                            url="/file/material"/>
                    <el-input v-model="$store.state.incoming.shop_cashier_desk_pic" type="hidden"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="商户类型" prop="customer_type">
            <el-radio-group v-model="$store.state.incoming.customer_type">
                <el-radio-button label="COMPANY">企业</el-radio-button>
                <el-radio-button label="INDIVIDUALBISS">个体商户</el-radio-button>
                <el-radio-button label="PERSON">自然人</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="商户全称" prop="full_name">
            <el-col :span="5">
                <el-input v-model="$store.state.incoming.full_name"/>
            </el-col>
            <el-col :span="8">
                <el-form-item label="商户简称" prop="short_name">
                    <el-input v-model="$store.state.incoming.short_name"/>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="商户联系人" prop="link_man">
            <el-col :span="5">
                <el-input v-model="$store.state.incoming.link_man"/>
            </el-col>
            <el-col :span="8">
                <el-form-item label="商户联系电话" prop="link_phone">
                    <el-input v-model="$store.state.incoming.link_phone"/>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="地区" prop="areas">
            <el-col :span="5">
                <el-form-item>
                    <el-select v-model="$store.state.incoming.province"
placeholder="省份"
                               @change="onprovince">
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
                <el-form-item>
                    <el-select v-model="$store.state.incoming.city"
placeholder="城市"
                               @change="oncity">
                        <el-option
                                v-for="item in city"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">{{ item.label }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item>
                    <el-select v-model="$store.state.incoming.area" placeholder="区">
                        <el-option
                                v-for="item in area"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">{{ item.label }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="详细地址" prop="district">
            <el-input v-model="$store.state.incoming.district"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
            <el-input v-model="$store.state.incoming.email"></el-input>
        </el-form-item>
        <transition name="fade" :duration="{ enter: 1200, leave: 100 }">
            <el-form-item v-if="$store.state.incoming.customer_type!=='PERSON'" label="营业执照" prop="license_pic">
                <el-col :span="4">
                    <upload v-model="$store.state.incoming.license_pic"
tips="营业执照"
                            url="/file/license"
@resp="licenseRsp"/>
                    <el-input v-model="$store.state.incoming.license_pic" type="hidden"></el-input>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="营业执照全称" prop="license_name">
                        <el-input v-model="$store.state.incoming.license_name"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照号码" prop="license">
                        <el-input v-model="$store.state.incoming.license"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照注册地址" prop="postal_address">
                        <el-input v-model="$store.state.incoming.postal_address"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照开始时间" prop="license_start">
                        <el-input v-model="$store.state.incoming.license_start"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照结束时间" prop="license_end">
                        <el-input v-model="$store.state.incoming.license_end"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </transition>
    </el-form>
</template>

<script>
  import { area, city, province } from '@/api/incoming'
  import upload from '@/views/incoming/upload'

  export default {
    name: 'Company',
    components: {
      upload,
    },
    data () {
      const person = (message) => (rule, value, callback) => {
        if (this.$store.state.incoming.customer_type !== 'PERSON') {
          if (value === '') {
            return callback(new Error(message))
          }
        }
        return callback()
      }
      const areas = (rule, value, callback) => {
        if (this.$store.state.incoming.province === '' || this.$store.state.incoming.city === '' ||
          this.$store.state.incoming.area === '') {
          if (value === '') {
            return callback(new Error('地区必须填写'))
          }
        }
        return callback()
      }
      return {
        province: [],
        area: [],
        city: [],
        rules: {
          shop_door_pic: [
            { required: true, message: '门头照必须上传' },
          ],
          shop_inside_pic: [
            { required: true, message: '店内照必须上传' },
          ],
          shop_outside_pic: [
            { required: true, message: '店外照必须上传' },
          ],
          shop_cashier_desk_pic: [
            { required: true, message: '收银台照必须上传' },
          ],
          customer_type: [
            { required: true, message: '商户类型必须填写' },
          ],
          full_name: [
            { required: true, message: '商户全称必须填写' },
          ],
          short_name: [
            { required: true, message: '商户简称必须填写' },
          ],
          link_man: [
            { required: true, message: '商户联系人必须填写' },
          ],
          link_phone: [
            { required: true, message: '商户联系电话必须填写' },
          ],
          district: [
            { required: true, message: '商户详细地址必须填写' },
          ],
          license_name: [
            { required: true, validator: person('营业执照名称必须填写') },
          ],

          license_pic: [
            { required: true, validator: person('营业执照必须上传') },
          ],
          license: [
            { required: true, validator: person('营业执照号必须填写') },
          ],
          postal_address: [
            { required: true, validator: person('营业执照注册地址必须填写') },
          ],
          license_start: [
            { required: true, validator: person('营业执照注册时间必须填写') },
          ],
          license_end: [
            { required: true, validator: person('营业执照到期时间必须填写') },
          ],
          areas: [
            { required: true, validator: areas },
          ],
        },
      }
    },
    async mounted () {
      const provinces = await province()
      for (const provincesKey in provinces) {
        this.province.push({ label: provinces[provincesKey].name, value: provinces[provincesKey].id })
      }
      if (this.$store.state.incoming.province !== '') {
        const cities = await city(this.$store.state.incoming.province)
        for (const citiesKey in cities) {
          this.city.push({ label: cities[citiesKey].name, value: cities[citiesKey].id })
        }
      }

      if (this.$store.state.incoming.city !== '') {
        const areas = await area(this.$store.state.incoming.city)
        for (const areaKey in areas) {
          this.area.push({ label: areas[areaKey].name, value: areas[areaKey].id })
        }
      }
    },

    methods: {
      licenseRsp (response) {
        this.$store.dispatch('incoming/build', {
          license: response.reg_num,
          license_end: response.end_date,
          license_start: response.start_date,
          license_name: response.name,
          postal_address: response.address,
        })
      },
      onprovince (value) {
        this.city = []
        this.area = []
        this.$store.state.incoming.city = ''
        this.$store.state.incoming.area = ''
        city(value).then(res => {
          for (const resKey in res) {
            this.city.push({ label: res[resKey].name, value: res[resKey].id })
          }
        })
      },
      oncity (value) {
        this.area = []
        this.$store.state.incoming.area = ''
        area(value).then(res => {
          for (const resKey in res) {
            this.area.push({ label: res[resKey].name, value: res[resKey].id })
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
