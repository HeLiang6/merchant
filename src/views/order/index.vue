<template>
    <el-container>
        <el-header height="auto">
            <div class="filter-container">
                <div class="filter-top">
                    <p>筛选查询</p>
                    <div>
                        <el-button size="small" @click="getList">查询</el-button>
                        <el-button size="small" @click="reset">重置</el-button>
                    </div>
                </div>
                <el-form ref="search" :inline="true" class="filter-bottom">
                    <el-form-item label="订单编号">
                        <el-input v-model="orderNum"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺id">
                        <el-input v-model="shopID"></el-input>
                    </el-form-item>
                    <el-form-item label="时间范围">
                        <el-date-picker
                                v-model="dateStart"
                                type="date"
                                class="data"
                                placeholder="开始日期时间"
                                value-format="yyyy-MM-dd"
                        />
                        ~
                        <el-date-picker
                                v-model="dateEnd"
                                type="date"
                                class="data"
                                placeholder="结束日期时间"
                                value-format="yyyy-MM-dd"
                        />
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select v-model="status" class="data" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-header>
        <el-main>
            <div class="dataListBox">
                数据列表
            </div>
            <el-table
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;"
            >
                <el-table-column
                        type="selection"
                />
                <el-table-column label="订单编号" min-width="130">
                    <template slot-scope="{row}">
                        <span class="link-type" @click="handleUp(row)">{{ row.order_num }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="60">
                    <template slot-scope="{row}">
                        ￥{{ row.amount/100 |toThousandFilter }}
                    </template>
                </el-table-column>
                <el-table-column label="店铺ID" width="auto" align="center">
                    <template slot-scope="{row}">
                        <span>{{ row.shop_id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" class-name="status-col" min-width="40">
                    <template slot-scope="{row}">
                        <span>{{ row.bank_type |bankType }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" min-width="90" align="center">
                    <template slot-scope="{row}">
                        <span>{{ row.created_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态" class-name="status-col" min-width="40">
                    <template slot-scope="{row}">
                        <span>{{ row.status | PayStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="auto" class-name="small-padding fixed-width">
                    <template slot-scope="{row,$index}">
                        <el-button type="text" class="examine" @click="showModal(row)">查看</el-button>
                        <el-button type="text" class="examine" @click="initOrder(row,$index)">同步</el-button>
                        <el-button v-show="row.status === 'INIT'" type="text" @click="closeOrder(row,$index)">关闭
                        </el-button>
                        <el-button v-show="row.status==='INIT'" type="text" @click="cancelOrder(row,$index)">撤销
                        </el-button>
                        <el-button v-show="row.status === 'SUCCESS'" type="text" @click="refundOrder(row,$index)">退款
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                    layout="total,prev, pager, next, jumper"
                    :background="true"
                    :page.sync="page"
                    :limit.sync="limit"
                    :auto-scroll="false"
                    :total="count"
                    @pagination="getList"/>
        </el-main>
        <detail :data="listData"></detail>
    </el-container>
</template>

<script>
  import { fetchList, orderCancel, orderClose, orderRefund, orderSync } from '@/api/order'
  import Pagination from '@/components/Pagination'
  import Detail from '@/views/order/detail'
  import { Message } from 'element-ui'

  export default {
    name: 'Index',
    components: { Pagination, Detail },
    data () {
      return {
        list: [],
        listData: {},
        listLoading: true,
        status: '',
        dateStart: '',
        dateEnd: '',
        page: 1,
        limit: 10,
        count: 0,
        shopID: '',
        orderNum: '',
        options: [
          {
            value: '',
            label: '全部',
          },
          {
            value: 'SUCCESS',
            label: '已支付',
          },
          {
            value: 'INIT',
            label: '待支付',
          },
          {
            value: 'FAIL',
            label: '支付失败',
          },
          {
            value: 'CANCEL',
            label: '已取消',
          },
          {
            value: 'REFUND',
            label: '已退款',
          },
          {
            value: 'REFUNDING',
            label: '退款中',
          },
          {
            value: 'REFUNDFAIL',
            label: '退款失败',
          },
          {
            value: 'CLOSE',
            label: '已关闭',
          },
        ],
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.listLoading = true
        fetchList({
          page: this.page,
          start_time: this.dateStart,
          end_time: this.dateEnd,
          shop_id: this.shopID,
          order_num: this.orderNum,
          status: this.status,
        }).then(response => {
          console.log(response)
          this.count = response.count
          this.list = response.data
          this.page = response.page
          this.listLoading = false
        })
      },
      reset () {
        this.$refs['search'].resetField()
      },
      initOrder (row, rowIndex) {
        this.listLoading = true
        orderSync(row.order_num).then(res => {
          this.listLoading = false
          const list = this.list
          this.$set(list[rowIndex], 'status', res.status)
          this.$set(list[rowIndex], 'error_msg', res.error_msg)
          this.$set(list[rowIndex], 'user_info', res.user_info)
          this.$set(list[rowIndex], 'refund_time', res.refund_time)
          // this.listData=this.listData
          this.list = list
        }).catch(e => {
          this.listLoading = false
          Message.error(e.message)
        })
      },
      closeOrder (row, rowIndex) {
        this.listLoading = true
        orderClose(row.order_num).then(res => {
          this.listLoading = false
          const list = this.list
          this.$set(list[rowIndex], 'status', res.status)
          this.$set(list[rowIndex], 'error_msg', res.error_msg)
          // this.listData=this.listData
          this.list = list
        }).catch(e => {
          this.listLoading = false
          Message.error(e.message)
        })
      },
      cancelOrder (row, rowIndex) {
        this.listLoading = true
        orderCancel(row.order_num).then(res => {
          this.listLoading = false
          const list = this.list
          this.$set(list[rowIndex], 'status', res.status)
          this.$set(list[rowIndex], 'error_msg', res.error_msg)
          // this.listData=this.listData
          this.list = list
        }).catch(e => {
          this.listLoading = false
          Message.error(e.message)
        })
      },
      refundOrder (row, rowIndex) {
        this.listLoading = true
        orderRefund(row.order_num).then(res => {
          this.listLoading = false
          const list = this.list
          this.$set(list[rowIndex], 'status', res.status)
          this.$set(list[rowIndex], 'error_msg', res.error_msg)
          // this.listData=this.listData
          this.list = list
        }).catch(e => {
          this.listLoading = false
          Message.error(e.message)
        })
      },
      showModal (row) {
        console.log(row)
        this.listData = {}
        setTimeout(() => {
          this.listData = row
        }, 1)
      },
    //   statusChange (val) {
    //       this.status = val
    //       this.getList()
    //   },
    },
  }
</script>

<style scoped>
    .filter-container {
        justify-content: space-between;
        border: 1px solid #f0f0f0;
        margin-bottom: 10px;
        margin-top: 15px;
    }

    .filter-top {
        background: #eee;
        display: flex;
        justify-content: space-between;
        /*padding: 5px;*/
    }

    .filter-top p {
        margin: 0;
        font-size: 14px;
        line-height: 31px;
        color: #606266;
    }

    .filter-bottom {
        padding: 20px 0 0 20px;
        display: flex;
    }

    .dataListBox {
        background: #eee;
        padding: 5px;
        font-size: 14px;
        line-height: 31px;
        color: #606266;

    }
</style>
