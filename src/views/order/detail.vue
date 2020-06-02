<template>
    <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="close"
    >
        <div class="app-container">
            <div class="box">
                <div class="dataList">
                    <div>
                        <p class="text">订单信息</p>
                        <el-table
                                :key="1"
                                :data="listData"
                                border
                                fit
                                highlight-current-row
                                style="width: 80%;"
                        >
                            <el-table-column label="订单编号" align="center" min-width="150px">
                                <template slot-scope="{row}">
                                    <span class="link-type">{{ row.order_num }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="创建时间" width="150px" align="center">
                                <template slot-scope="{row}">
                                    <span>{{ row.created_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺ID" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span>{{ row.shop_id }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单状态" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span>{{ row.status | PayStatus }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="退款订单号" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span v-show="row.status==='REFUND'">{{ row.refund_order_num }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="退款时间" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span v-show="row.status==='REFUND'">{{ row.refund_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                                </template>

                            </el-table-column>
                            <el-table-column label="错误信息" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span>{{ row.error_msg }}</span>
                                </template>

                            </el-table-column>

                        </el-table>
                    </div>
                    <div>
                        <p class="text">支付信息</p>
                        <el-table
                                :key="1"
                                :data="listData"
                                border
                                fit
                                highlight-current-row
                                style="width: 98%;"
                        >
                            <el-table-column label="用户信息" align="center" min-width="150px">
                                <template slot-scope="{row}">
                                    <span class="link-type">{{ row.user_info }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="用户id" align="center" min-width="150px">
                                <template slot-scope="{row}">
                                    <span class="link-type">{{ row.openid }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付金额" width="150px" align="center">
                                <template slot-scope="{row}">
                                    <span>￥{{ row.amount/100 | toThousandFilter }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付方式" width="150px" align="center">
                                <template slot-scope="{row}">
                                    <span style="color:red">{{ row.bank_type |bankType }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付时间" width="auto" align="center">
                                <template slot-scope="{row}">
                                    <span style="color:red">{{ row.complete_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
  export default {
    name: 'Detail',
    props: ['data'],
    data () {
      return {
        listData: [],
      }
    },
    computed: {
      dialogVisible () {
        console.log(this.data)
        return this.listData.length > 0
      },
    },
    watch: {
      data (value, oldValue) {
        console.log(oldValue)
        this.listData = []
        this.listData.push(value)
        console.log(11)
      },
    },
    methods: {
      close () {
        this.listData = []
        console.log(this.dialogVisible)
      },
    },
  }
</script>

<style scoped>

</style>
