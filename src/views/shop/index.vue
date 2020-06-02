<template>
  <div
    class="app-container"
  >    <div class="top">
         <p>筛选查询</p>
         <div>
           <el-button size="small" @click="search">查询</el-button>
           <el-button size="small" @click="reset">重置</el-button>
         </div>
       </div>
    <div class="tab_header_bar">
      <!--公司-->
      <el-form :inline="true">
        <el-input
          v-model="searchForm.name"
          placeholder="店铺ID/名称"
          size="small"
          class="formItem block"
          @keyup.enter.native="search"
        />
        <!--省份/城市-->
        <!-- <el-form-item label-width="50px" style="margin:0" label="省份">

          <el-select v-model="provinces" size="small" value-key="item" placeholder="请选择省份" @change="province">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="50px" style="margin:0" label="城市">
          <el-select v-model="citys" size="small" value-key="item" placeholder="请选择城市" @change="city">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
      <!--按钮-->
      <!-- <el-button
        type="primary"
        size="small"
        @click="search"
      >查询</el-button>
      <el-button
        type="primary"
        size="small"
        @click="newMemberOpen"
      >新增</el-button> -->
      </el-form>
    </div>
    <div class="dataListBox">
      数据列表
      <div>
        <el-button size="small" @click="clickAdd">新增</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :border="bd"
      element-loading-text="拼命加载中"
      :data="tableData"
      style="width: 100%"
      :cell-style="{'text-align':'center'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
      />
      <el-table-column
        width="160%"
        prop="id"
        label="店铺id"
      />
      <el-table-column
        width="100%"
        prop="logo"
        label="店铺logo"
      >
        <template slot-scope="scope">
          <img :src="scope.row.logo" alt="" width="25px" @click="setIndustryCategory(scope.row)">
        </template>
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="门店名称"
        width="150%"
        align="center"
      />
      <el-table-column
        width="80%"
        prop="province"
        label="二维码"
      >
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" width="25px" @mouseenter="mouseenterImg" @click="setIndustryCategory(scope.row)">
          <div v-if="isImg" class="imgbox">
            <div class="img-top">
              <h3>店铺收款码</h3>
              <span @click="handleDelete">X</span>
            </div>
            <img :src="scope.row.image" alt="" @mouseenter="mouseenterImg" @click="setIndustryCategory(scope.row)">
            <p><a :href="scope.row.image">图片下载</a></p>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="80%"
        prop="province"
        label="省份"
      />
      <el-table-column
        width="70%"
        prop="city"
        label="城市"
      /> -->
      <el-table-column
        width="50%"
        prop="sort"
        label="排序"
      />
      <el-table-column
        width="80%"
        prop="micro_biz_type"
        label="经营类型"
        align="center"
      />
      <el-table-column
        width="80%"
        label="状态"
        align="center"
        prop="status"
      >
        <template>
          <!-- <template v-if="scope.row.status===1">启用</template>
          <template v-else-if="scope.row.status===2">注销</template> -->
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="auto"
        align="center"
      >
        <template slot-scope="scope">
          <span
            class="operation"
            @click="compileClick(scope.row)"
          >编辑
          </span>
          <span
            class="operation"
            @click="rooterDeatil(scope.row)"
          >详情</span>
          <span
            class="operation"
            @click="rooterDeatil(scope.row)"
          >删除</span>
          <!-- <el-button
            type="text"
            @click="hornConfig(scope.row)"
          >云喇叭管理</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog
      title="编辑门店信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        style="max-height: 100%;padding: 20px 20px 20px 20px;"
      >
        <el-form-item label="店名" class="ipt" size="mini" prop="shop_name" :label-width="formLabelWidth">
          <el-input v-model="form.shop_name" />
        </el-form-item>
        <el-form :inline="true" class="citybox">
          <el-form-item :label-width="formLabelWidth" prop="provinces" label="省份">
            <el-select v-model="form.provinces" size="mini" value-key="item" placeholder="请选择省份" @change="province">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="80px" prop="citys" label="城市">
            <el-select v-model="form.citys" size="mini" value-key="item" placeholder="请选择城市" @change="city">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form-item label="联系电话" size="mini" class="ipt" prop="mobile_phone" :label-width="formLabelWidth">
          <el-input v-model="form.mobile_phone" autocomplete="off" />
        </el-form-item>
        <el-form :inline="true">
          <el-form-item label-width="120px" size="mini" label="经营类型">
            <el-select v-model="form.micro_biz_type" placeholder="经营类型" @change="micro_biz_type">
              <el-option
                v-for="item in micro_biz_typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px" label="所属行业">
            <el-select v-model="form.one_industry" placeholder="一级行业" @change="one_industryAdd">
              <el-option
                v-for="item in OneOptions"
                :key="item.industry_num"
                :label="item.industry_name"
                :value="item.industry_num"
              />
            </el-select>
            <el-select v-model="form.two_industry" placeholder="二级行业" @change="two_industryAdd">
              <el-option
                v-for="item in twoOptions"
                :key="item.industry_num"
                :label="item.industry_name"
                :value="item.industry_name"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form-item size="mini" label-width="120px" label="创建时间">
          <el-date-picker
            v-model="form.time"
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
                <img v-if="form.logo" :src="form.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div class="img_save" @click="logoImg">
                删除
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form-item label="联系地址" size="mini" class="ipt" prop="address" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" @change="addressChangeAdd" />
        </el-form-item>
        <el-form :inline="true" class="commonality-img">
          <el-form-item label="经度:" label-width="120px">
            <el-input v-model="form.map_lng" :disabled="true" placeholder="经度" autocomplete="off" />
          </el-form-item>
          <el-form-item label="纬度:" style="width:250px" label-width="50px">
            <el-input v-model="form.map_lat	" :disabled="true" placeholder="纬度" autocomplete="off" />
          </el-form-item>

        </el-form>
        <baidu-map
          class="bmView"
          :scroll-wheel-zoom="true"
          :center="location"
          :zoom="zoom"
          ak="0zNEXG9lw5AcmoGglFclDGYpXieNmQTP"
          @click="getLocationPointAdd"
        >
          <bm-view style="width: 80%; margin-left:120px; height:150px; flex: 1" />
          <bm-local-search :keyword="form.address" :auto-viewport="true" style="display: none" />
        </baidu-map>
        <el-form-item label="排序" prop="shop_name" :label-width="formLabelWidth">
          <el-input v-model="form.sort" size="mini" style="width:80px" /><span style="color:#ccc;margin-left:30px">1以上整数，越小越靠前</span>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="form.status" label="OPEN">启用</el-radio>
          <el-radio v-model="form.status" label="CLOSE">最高</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearClick">取 消</el-button>
        <el-button type="primary" @click="compile('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      title="新增门店信息"
      :visible.sync="dialogVisibleAdd"
      width="60%"
      :lock-scroll="false"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form
        ref="newAddref"
        :model="formAdd"
        :rules="rules"
        style="max-height: 100%;padding: 20px 20px 20px 20px;"
      >
        <el-form-item label="店名" size="mini" class="ipt" prop="shop_name" :label-width="formLabelWidth">
          <el-input v-model="formAdd.shop_name" />
        </el-form-item>
        <el-form :inline="true" class="citybox">
          <el-form-item :label-width="formLabelWidth" prop="provinces" label="省份">
            <el-select v-model="formAdd.provinces" size="mini" value-key="item" placeholder="请选择省份" @change="province">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label-width="80px" prop="citys" label="城市">
            <el-select v-model="formAdd.citys" size="mini" value-key="item" placeholder="请选择城市" @change="city">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-form-item label="联系电话" size="mini" class="ipt" prop="mobile_phone" :label-width="formLabelWidth">
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
        <el-form-item label-width="120px" size="mini" label="创建时间">
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
                :on-change="handLogoAdd"
                action="#"
                :show-file-list="false"
              >
                <img v-if="formAdd.logo" :src="formAdd.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div class="img_save" @click="logoImgAdd">
                删除
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form-item label="联系地址" size="mini" class="ipt" prop="address" :label-width="formLabelWidth">
          <el-input v-model="formAdd.address" autocomplete="off" @change="addressChangeAdd" />
        </el-form-item>
        <el-form :inline="true" class="commonality-img">
          <el-form-item label="经度:" label-width="120px">
            <el-input v-model="formAdd.map_lng" :disabled="true" placeholder="经度" autocomplete="off" />
          </el-form-item>
          <el-form-item label="纬度:" style="width:250px" label-width="50px">
            <el-input v-model="formAdd.map_lat	" :disabled="true" placeholder="纬度" autocomplete="off" />
          </el-form-item>

        </el-form>
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
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="formAdd.sort" size="mini" style="width:80px" /><span style="color:#ccc;margin-left:30px">1以上整数，越小越靠前</span>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="formAdd.status" label="OPEN">启用</el-radio>
          <el-radio v-model="formAdd.status" label="CLOSE">最高</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="newAdd('newAddref')">确 定</el-button>
      </span>
    </el-dialog>
    <div class="bottom">
      <div class="bottom-left">
        <el-checkbox v-model="checkval" @change="handleCheck(tableData)">全选</el-checkbox>
        <el-button class="save" size="mini">批量删除</el-button>                   </div>
      <div class="block">
        <el-pagination
          :page-size="10"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchId } from '@/api/article'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
import { bank, modification, province, one_industry, two_industry, Logo, fetchAdd } from './api'

export default {
  name: 'SelectExcel',
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch
  },

  data () {
    var phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不为空'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号码有误，请重填!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      dialogVisibleAdd: false,
      location: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 12.8,
      count: 0,
      listLoading: true,
      img: '',
      imageUrl: '',
      isImg: false,
      formLabelWidth: '120px',
      checkval: false,
      // 分页信息
      currentPage: 1,
      pageSize: 10,
      searchForm: {
        name: '',
        status: ''
      },
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
        province: '',
        city: '',
        sort: '', // 排序
        status: 'OPEN'
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
      },
      tableData: [],
      dialogFormVisible: false,
      newly: false, // 新增
      ID: '',
      form: {
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
        province: '',
        city: '',
        sort: '' // 排序
      },
      // 行业选择
      OneOptions: [],
      twoOptions: [],
      provinceList: '', // 省
      cityList: '', // 城市
      provinces: '',
      citys: '',
      bd: true
    }
  },
  created () {
    this.fetchData()
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

    // 修改行业
    one_industry (val) {
      let obj = {}
      obj = this.OneOptions.find((item) => {
        return item.industry_num === val
      })
      this.form.one_industry = obj.industry_name
    },
    two_industry (val) {
      let obj = {}
      obj = this.OneOptions.find((item) => {
        return item.industry_num === val
      })
      this.form.two_industry = obj.industry_name
    },
    fetchData () {
      fetchId({}).then(response => {
        // this.tableData = response.data
        // let id = response.data[0].id
        console.log(response)
        const data = []
        this.count = response.count
        response.data.forEach(element => {
          element['image'] = 'https://cs-test.duofubao.net/qrCode/256/' + element.id
          data.push(element)
        })
        this.tableData = data
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    openEditDialog (val) {
      this.ID = val.id
      this.form = val
      this.dialogFormVisible = true
    },
    setIndustryCategory (data) {
      console.log(data)
    },
    handleDelete () {
      this.isImg = false
    },
    compileClick (val) {
      this.dialogVisible = true
      console.log(val)
      this.form = val
    },
    // 确定修改
    compile (formName) {
      console.log(formName)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          modification(this.form.id, this.form).then(res => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogVisible = false
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message({
            showClose: true,
            message: '内容不符合规范',
            type: 'error'
          })
          return false
        }
      })
      console.log(this.ID)
    },
    // modification(val) {

    // this.dialogFormVisible = false
    //      modification(this.ID, this.form).then(res => {
    // console.log(res)
    // }).catch(err => {
    // console.log(err)
    // })
    // },
    search () {
      // 搜索
      fetchId({}).then(response => {
        const data = []
        response.data.forEach(element => {
          element['image'] = 'https://cs-test.duofubao.net/qrCode/256/' + element.id
          data.push(element)
        })
        this.tableData = data.filter(item => item.shop_name.indexOf(this.searchForm.name) !== -1 && item.id.indexOf(this.searchForm.name) !== -1)
        console.log(this.tableData)
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 重置
    reset () {
      this.searchForm.name = ''
      this.fetchData()
    },
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
    // 类型
    micro_biz_typeAdd (val) {
      let obj = {}
      obj = this.micro_biz_typeList.find(item => {
        return item.value === val
      })
      this.formAdd.micro_biz_type = obj.label
      console.log(this.formAdd.micro_biz_type)
    },
    micro_biz_type (val) {
      let obj = {}
      obj = this.micro_biz_typeList.find(item => {
        return item.value === val
      })
      this.form.micro_biz_type = obj.label
      console.log(this.formAdd.micro_biz_type)
    },
    clearClick () {
      this.dialogVisible = false
      this.fetchData()
    },
    // 行业
    two_industryAdd (val) {
      // obj = this.OneOptions.find((item) => {
      //   console.log(item);
      //   console.log(val);
      //   return item.industry_num === val
      // })
      this.formAdd.two_industry = val
      console.log(this.formAdd.two_industry)
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
    // 全选
    handleCheck (rows) {
      console.log(rows)

      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
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
          this.form.logo = res.image_url
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
    handLogoAdd (file) {
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
      this.form.logo = ''
      console.log(1)
    },
    logoImgAdd () {
      this.formAdd.logo = ''
    },
    // 分页器
    // 一页几个
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
      // this.changetableData(val, this.currentPage)
    },
    // 第几页
    handleCurrentChange (val) {
      console.log(val)
      this.currentPage = val
      this.checkval = false
      this.changetableData(val, this.pageSize)
    },
    changetableData (page, current) {
      console.log(this.tableData)
      const data = []
      fetchId({ page }).then(res => {
        res.data.forEach(element => {
          element['image'] = 'https://cs-test.duofubao.net/qrCode/256/' + element.id
          data.push(element)
        })
        this.tableData = data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      return this.tableData.filter((item, index) => {
        index >= page * (current - 1) && index < page * (current)
      })
    },
    getLocationPoint () {
      // this.formAdd.map_lng = e.point.lng
      // this.formAdd.map_lat = e.point.lat
      console.log(this.formAdd.map_lat)

      const geoCoder = new BMap.Geocoder()
      geoCoder.getPoint(this.form.address, point => {
        this.form.map_lng = point.lng
        this.form.map_lat = point.lat
      })
    },

    // 获取省
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
    mouseenterImg () {
      this.isImg = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 新增
    clickAdd () {
      this.dialogVisibleAdd = true
      this.formAdd = {
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
        province: '',
        city: '',
        sort: '', // 排序
        status: 'OPEN'
      }
    },
    // 新增提交
    newAdd (add) {
      console.log(add)
      this.$refs[add].validate((valid) => {
        if (valid) {
          fetchAdd(this.formAdd).then(res => {
            console.log(res)
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
            this.dialogVisibleAdd = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
}
.el-table th>.cell{
  text-align: center;
}
.ipt{
  width: 350px;
}
.formItem {
  display: inline-block;
  width: 150px;
  max-width: 100%;
}
.boxImg{
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -128px;
  margin-top: -128px;
  z-index: 10;
}
.boxImg p{
  position: absolute;
  top: -20px;
  right: 0px;
  color: skyblue;
  font-size: 20px;
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.top{
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: #eee;;
  color: #666;
  padding: 0 10px;
    line-height: 40px;

}
.top p{
  font-size: 16px;
  margin: 0;
}
.tab_header_bar{
  padding:15px 30px;
  line-height: 40px;
  border: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.formItem{
  margin-right: 80px;
}
.bottom{
  display: flex;
  justify-content: space-between;
  background: #eee;
  margin-top: 20px;
    padding: 10px;

}
.bottom-left{
  line-height: 10px;
}
.save{
  margin-left: 30px;
}
.dataListBox{
    background: #eee;
    padding: 5px;
      font-size: 14px;
  line-height: 31px;
  color: #606266;
display: flex;
justify-content: space-between;
}
.imgbox{
  width: 300px;
  height: 370px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -150px -150px;
  background: #fff;
  border: 1px solid #cccccc;
  z-index: 10;
}
.img-top{
  position: relative;
}
.img-top h3{
  text-align: center;
}
.img-top span{
  position: absolute;
  right: 20px;
  top: 0;
  cursor: pointer;
}
.operation{
  font-size: 10px;
  width: 30%;
  margin: 0;
  float: left;
  cursor: pointer;
  color: #409EFF;
}
.img_save {
  text-align: center;
  background: #f4f4f5;
  color: skyblue;
  cursor: pointer;
}
.commonality-img{
  display: flex;
  justify-content: space-between;
}
.el-form-item{
  margin-bottom: 14px;
}
</style>
