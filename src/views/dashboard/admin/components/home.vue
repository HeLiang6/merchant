<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="24" :lg="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <h3>基本信息:</h3>
        <div class="top-box">
          <div class="boxLeft">
            <p><span>名称：</span>码</p>
            <p><span>商户号：</span>1154317777710460928</p>
          </div>
          <div class="boxRight">
            <p><span>收款到账人：</span>码</p>
            <p><span>收款银行卡：</span>1154317777710460928</p>
          </div>
        </div>
      </div>
    </el-col>
    <!-- <el-col :xs="12" :sm="24" :lg="12" class="card-panel-col">
      <div class="card-panel deal-box" @click="handleSetLineChartData('newVisitis')">
        <div class="deal">
          <h3>交易数据:</h3>
          <div class="block" style="margin-top:3px">
            <span class="demonstration" />
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
          </div>
          <div>
            <el-radio-group v-model="radio" style="margin-top:5px" size="small">
              <el-radio-button label="昨天" />
              <el-radio-button label="3天" />
              <el-radio-button label="7天" />
              <el-radio-button label="15天" />
              <el-radio-button label="30天" />
            </el-radio-group>
          </div>
        </div>
        <div class="deal-box-bottom">
          <ul>
            <li>
              <p>交易金额</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>交易笔数</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>退款金额</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>退款笔数</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>实际营收</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>支付宝交易笔数</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>微信支付交易笔数</p>
              <strong>￥0.26</strong>
            </li>
            <li>
              <p>其他支付交易笔数</p>
              <strong>￥0.26</strong>
            </li>
          </ul>
        </div>
      </div>
    </el-col> -->
    <!-- <Chart /> -->
  </el-row>
</template>

<script>
// import Chart from './chart'
export default {
  data () {
    return {
      radio: '1',
      value1: '',
      value2: '',
      pickerOptions: {}
    }
  },
  component: {
    // Chart
  },
  methods: {
    handleSetLineChartData (type) {
      console.log(type)
      this.$emit('handleSetLineChartData', type)
    },
    handleClick () {
      console.log(this.value2)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.card-panel{
  padding: 1px 20px;
  h3{
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    padding-left: 5px;
  }
  .top-box{
    display: flex;
    .boxLeft{
      width: 250px;
      span{
        display: inline-block;
        width: 50px;
      }
    }
    .boxRight{
      width: 250px;
      span{
        display: inline-block;
        width: 80px;
      }
    }
  }
}
.card-panel-col .deal-box{
  height: 120px;
}
.deal{
  display: flex;
  padding-top: 10px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    h3{
      border: 0;
    }
}
.deal-box-bottom{
  ul{
    display: flex;
    justify-content: space-around;
    padding: 0;
    li{
      width: 12%;
      text-align: center;
      list-style: none;
      height: 40px;
      border-right: 1px solid #ccc;
      p{
        font-size: 10px;
        margin: 0;
        color:#8995A0;
        line-height: 20px;
      }
      strong{
        line-height: 20px;
      }
    }
  }
}
.deal-box-bottom ul li:nth-of-type(8){
  border: 0;
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
