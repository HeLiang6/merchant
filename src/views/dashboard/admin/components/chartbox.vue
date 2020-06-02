<template>
  <div>
    <div class="chart-top">
      <p>订单及销售统计</p>
      <div>
        <ul class="list">
          <li><el-button @click="week">本周</el-button></li>
          <li><el-button @click="month">本月</el-button></li>
          <li><el-button @click="year">本年</el-button></li>
        </ul>
      </div>
    </div>
    <div class="order-box">
      <div class="chart-left">
        <ul>
          <li>
            <span>本周订单总数</span>
            <p>{{ order.week_num }}</p>
          </li>
          <li>
            <span>本月订单总数</span>
            <p>{{ order.month_num }}</p>
          </li>
          <li>
            <span>本年订单总数</span>
            <p>{{ order.year_num }}</p>
          </li>
        </ul>
      </div>
      <div id="mixedChart" />
    </div>
    <div class="order-box">
      <div class="chart-left">
        <ul>
          <li>
            <span>本周销售总额</span>
            <p>{{ order.week_money }}</p>
          </li>
          <li>
            <span>本月销售总额</span>
            <p>{{ order.month_money }}</p>
          </li>
          <li>
            <span>本年销售总额</span>
            <p>{{ order.year_money }}</p>
          </li>
        </ul>
      </div>
      <div id="market" />
    </div>

  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legendScroll'
import { order, orderList } from '../api/index'
export default {
  name: 'Chart',
  data () {
    return {
      order: {
        month_money: '',
        month_num: '',
        week_money: '',
        week_num: '',
        year_money: '',
        year_num: ''
      },
      num_static: '',
      money_static: '',
      time: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },
  created () {
    order().then(res => {
      this.order = res
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      // 基于准备好的dom，初始化echarts实例
      const mixedChart = echarts.init(document.getElementById('mixedChart'))
      const marketChart = echarts.init(document.getElementById('market'))
      // 绘制图表
      const option = {
        title: {
          text: '近一周订单统计'
        },
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.num_static,
          type: 'line'
        }]
      }
      const market = {
        title: {
          text: 'Click to Add Points'
        },
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.money_static,
          type: 'line'
        }]
      }
      mixedChart.setOption(option)
      marketChart.setOption(market)
    },
    week () {
      const val = { timeType: 'week' }
      this.time = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      orderList(val).then(res => {
        this.num_static = res.num_static
        this.money_static = res.money_static
        this.initCharts()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    month () {
      const val = { timeType: 'month' }
      var day = new Date(2016, 2, 0)
      var daycount = day.getDate()
      var arr = []
      console.log(daycount)
      for (let a = 1; a <= daycount; a++) {
        arr.push(a + '号')
      }
      this.time = arr
      console.log(this.time)

      orderList(val).then(res => {
        this.num_static = res.num_static
        this.money_static = res.money_static
        this.initCharts()
      }).catch(err => {
        console.log(err)
      })
    },
    year () {
      const val = { timeType: 'year' }
      this.time = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      orderList(val).then(res => {
        this.num_static = res.num_static
        this.money_static = res.money_static
        this.initCharts()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
    #mixedChart{
        width: 100%;
        height: 300px;
    }
    #market{
        width: 100%;
        height: 300px;
    }
    ul li{
  list-style: none;
}
.chart-top{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  line-height: 20px;
}
.chart-top p{
  font-size: 16px;
  margin-left: 20px;
  color: #666;
  font-weight: 500;
}
.list li{
  float: left;
  margin-right: 20px;
  cursor:pointer
}
.chart-left{
  width: 200px;
  border-right: 1px solid #f0f0f0;
}
.chart-left ul{
  padding: 0;
}
.chart-left ul li{
  text-align: center;
  margin-bottom: 20px;
}
.chart-left ul li span{
  color: #ccc;
  font-size: 14px;
}
.chart-left ul li p{
  font-size: 20px;
  font-weight: 600;
}
.order-box{
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}
</style>
