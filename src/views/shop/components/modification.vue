<template>
  <div>
    <el-form
      :model="formAdd"
      :rules="rules"
      style="max-height: 100%;padding: 20px 20px 20px 20px;"
    >
      <el-form-item label="店名" class="ipt" prop="shop_name" :label-width="formLabelWidth">
        <el-input v-model="formAdd.shop_name" />
      </el-form-item>
      <el-form :inline="true" class="citybox">
        <el-form-item :label-width="formLabelWidth" prop="provinces" style="margin:0" label="省份">
          <el-select v-model="formAdd.provinces" size="small" value-key="item" placeholder="请选择省份" @change="province">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px" prop="citys" style="margin:0" label="城市">
          <el-select v-model="formAdd.citys" size="small" value-key="item" placeholder="请选择城市" @change="city">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item label="联系电话" class="ipt" prop="mobile_phone" :label-width="formLabelWidth">
        <el-input v-model="formAdd.mobile_phone" autocomplete="off" />
      </el-form-item>
      <el-form :inline="true">
        <el-form-item label-width="120px" size="mini" label="经营类型">
          <el-select v-model="formAdd.micro_biz_type" placeholder="经营类型" @change="micro_biz_typeAdd">
            <el-option
              v-for="item in micro_biz_typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px" size="mini" label="所属行业">
          <el-select v-model="formAdd.one_industry" placeholder="一级行业" @change="one_industryAdd">
            <el-option
              v-for="item in OneOptions"
              :key="item.industry_num"
              :label="item.industry_name"
              :value="item.industry_num"
            />
          </el-select>
          <el-select v-model="formAdd.two_industry" size="mini" placeholder="二级行业" @change="two_industryAdd">
            <el-option
              v-for="item in twoOptions"
              :key="item.industry_num"
              :label="item.industry_name"
              :value="item.industry_name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item label-width="120px" label="创建时间">
        <el-date-picker
          v-model="formAdd.time"
          size="mini"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form :inline="true" class="license_content">

        <el-form-item label-width="130px" label="Logo图片">
          <div class="lable_box">

            <el-upload
              :auto-upload="autoUpload"
              class="avatar-uploader"
              :on-change="handLogo"
              action="#"
              :show-file-list="false"
            >
              <img v-if="formAdd.logo" :src="formAdd.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="img_save" @click="logoImg">
              删除
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-form-item label="联系地址" class="ipt" prop="address" :label-width="formLabelWidth">
        <el-input v-model="formAdd.address" autocomplete="off" @change="addressChangeAdd" />
      </el-form-item>
      <el-form-item label="经度:" :label-width="formLabelWidth">
        <el-input v-model="formAdd.map_lng" :disabled="true" placeholder="经度" autocomplete="off" />
      </el-form-item>
      <el-form-item label="纬度:" :label-width="formLabelWidth">
        <el-input v-model="formAdd.map_lat	" :disabled="true" placeholder="纬度" autocomplete="off" />
      </el-form-item>
      <baidu-map
        class="bmView"
        :scroll-wheel-zoom="true"
        :center="location"
        :zoom="zoom"
        ak="0zNEXG9lw5AcmoGglFclDGYpXieNmQTP"
        @click="getLocationPointAdd"
      >
        <bm-view style="width: 80%; margin-left:120px; height:150px; flex: 1" />
        <bm-local-search :keyword="formAdd.address" :auto-viewport="true" style="display: none" />
      </baidu-map>
      <el-form-item label="排序" prop="shop_name" :label-width="formLabelWidth">
        <el-input v-model="formAdd.sort" style="width:80px" /><span style="color:#ccc;margin-left:30px">1以上整数，越小越靠前</span>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="radio" label="1">启用</el-radio>
        <el-radio v-model="radio" label="2">最高</el-radio>
      </el-form-item>
    </el-form>
    <!-- <div>
      <div class="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="modificationAdd(formAdd)">确 定</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'

import { bank, province, one_industry, two_industry, Logo } from '../api'
export default {
  name: 'New',
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch
  },

  data () {
    var phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('电话不为空'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填!'))
      } else {
        callback()
      }
    }
    return {
      location: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 12.8,

      provinceList: '',
      cityList: '',
      OneOptions: [],
      twoOptions: [],
      micro_biz_typeList: [{
        value: 1,
        label: '流动经营/便民服务'
      }, {
        value: 2,
        label: '线上商品/服务交易'
      }, {
        value: 3,
        label: '门店场所'
      }
      ],
      formLabelWidth: '120px',
      radio: '1',
      autoUpload: false,

      formAdd: {// 商户添加
        time: '', // 创建时间
        shop_name: '',
        one_industry: '',
        two_industry: '',
        map_lng: '',
        map_lat: '',
        address: '',
        mobile_phone: '',
        logo: '',
        micro_biz_type: '',
        sort: ''
      },

      rules: { // 表单验证
        shop_name: [
          { required: true, message: '请输入店名', trigger: 'blur' }
        ],
        mobile_phone: [
          { validator: phone, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        citys: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        provinces: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ]
      }

    }
  },
  created () {
    this.One()
  },
  mounted () {
    bank()
      .then(res => {
        this.provinceList = res
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  methods: {
    One () {
      one_industry().then(res => {
        console.log(res)
        this.OneOptions = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取坐标
    addressChangeAdd () {
      this.getLocationPointAdd()
    },
    getLocationPointAdd () {
      // this.formAdd.map_lng = e.point.lng
      // this.formAdd.map_lat = e.point.lat
      console.log(this.formAdd.map_lat)

      const geoCoder = new BMap.Geocoder()
      geoCoder.getPoint(this.formAdd.address, point => {
        this.formAdd.map_lng = point.lng
        this.formAdd.map_lat = point.lat
      })
    },
    province (val) {
      let obj = {}
      obj = this.provinceList.find(item => {
        return item.id === val
      })
      this.provinces = obj.name
      console.log(this.provinces)

      province(val)
        .then(res => {
          console.log(res)

          this.cityList = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取城市
    city (val) {
      let obj = {}
      obj = this.cityList.find(item => {
        return item.id === val
      })
      this.city = obj.name
      console.log(this.city)
    },
    // 类型
    micro_biz_typeAdd (val) {
      let obj = {}
      obj = this.micro_biz_typeList.find(item => {
        return item.value === val
      })
      this.formAdd.micro_biz_type = obj.label
      console.log(this.formAdd.micro_biz_type)
    },
    // 行业
    two_industryAdd (val) {
      let obj = {}
      obj = this.OneOptions.find((item) => {
        return item.industry_num === val
      })
      this.formAdd.two_industry = obj.industry_name
    },
    one_industryAdd (val) {
      let obj = {}
      obj = this.OneOptions.find((item) => {
        return item.industry_num === val
      })
      this.formAdd.one_industry = obj.industry_name
      console.log(this.formAdd.one_industry)
      two_industry(val).then(res => {
        console.log(res)
        this.twoOptions = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    beforeAvatarUpload (file) {
      console.log(file)

      const isimg =
        file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt2M = file.raw.size / 1024 / 1024 < 0.5
      console.log(isimg)

      if (!isimg) {
        this.$message.error('上传头像图片只能是 JPG/PNg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过500K!')
        return false
      }
      return isimg && isLt2M
    },

    // logo上传
    handLogo (file) {
      if (this.beforeAvatarUpload(file)) {
        const formData = new FormData()
        formData.append('image', file.raw)
        console.log(file)
        Logo(formData).then(res => {
          console.log(res)
          this.formAdd.logo = res.image_url
        })
          .catch(err => {
            console.log(err)
          })
        // Img(formData)
        //   .then(res => {
        //     this.formAdd.log = res.image_url
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      }
    },
    logoImg () {
      this.formAdd.logo = ''
    },
    // 确定
    modificationAdd (formName) {
      console.log(formName)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // fetchAdd(this.formAdd).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 取消
    cancel () {

    }

  }
}
</script>

<style scoped>
.el-form-item{
    margin-bottom: 18px;
}
.citybox{
    margin-bottom: 10px;
}
.ipt{
  width: 400px;
}
.footer{
width:200px;
margin:0 auto;
display: flex;
justify-content: space-around;
margin-bottom: 30px;
}
.avatar-uploader {
  height: 177px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.img_save {
  text-align: center;
  background: #f4f4f5;
  color: skyblue;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
