<template>
  <div class="transactionDetail">
    <transition-group name="component-fade" mode="out-in">
      <el-row type="flex" key="content" justify="center">
        <el-col :xs="24" :sm="18" :lg="17" class="container">
          <el-input
            class="search-input"
            popper-class="my-autocomplete"
            v-model="searchText"
            placeholder="请输入区块/交易哈希/账户地址"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleQuery"></el-button>
          </el-input>
          <div class="t-a-c title detail-title"  v-clipboard="">账户详情</div>

          <card-component>
            <template #card>
              <div class="card-title">
                <div>{{cardData.address}} &nbsp;<img v-clipboard="cardData.address" class="img" src="../../assets/icon/spread.png" /></div>
              </div>
              <div class="card-content">
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">总资产：</div>
                  <div class="card-list-r">
                    <div>{{cardData.balance | formatAmount}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c" v-if="cardData.account_resource">
                  <div class="card-list-l">锁仓数量：</div>
                  <div class="card-list-r">
                    <div>{{cardData.account_resource.frozen_balance_for_energy && cardData.account_resource.frozen_balance_for_energy.frozen_balance | formatAmount}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">交易次数：</div>
                  <div class="card-list-r">
                    <div>{{tabData.result.length}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c" v-if="cardData.create_time">
                  <div class="card-list-l">创建时间：</div>
                  <div class="card-list-r">
                    <div>{{cardData.create_time | formatDate}}</div>
                  </div>
                </div>
              </div>
            </template>
          </card-component>

          <tab-component class="tab-component" :tabData="tabData">
            <template #table>
              <table-component
                @cell-click="handleCell"
                :columns="columns"
                :tableData="tabData.result"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                :total="tabData.total"
                :layout="'prev, pager, next, sizes, jumper'"
                @handleSize="handleSize"
                @handleCurrent="handleCurrent"
              ></table-component>
            </template>
          </tab-component>
        </el-col>
      </el-row>
    </transition-group>
  </div>
</template>

<script>
import headerComponent from '@/view/common/header'
import footerComponent from '@/view/common/footer'
import cardComponent from '@/view/common/Card'
import tabComponent from '@/view/common/Tab'
import tableComponent from '@/view/common/Table'
import { getDuration } from '@/utils/utils'
export default {
  name: 'blockDetail',
  components: {
    headerComponent,
    footerComponent,
    cardComponent,
    tabComponent,
    tableComponent
  },
  data () {
    return {
      searchText: '',
      activeName: 'first',
      dataCard: {
        title: '0x9c932ce3cm.0x9c932ce3cm.0x9c932ce3cm',
        img: true,
        dataList: [
          {
            text: '结果：',
            value: 'SUCCESS'
          },
          {
            text: '状态：',
            btn: true,
            status: 0
          },
          {
            text: '区块：',
            value: '2478901'
          },
          {
            text: '时间',
            value: '2020-10-21 13:50:31'
          }
        ]
      },
      columns: [
        {
          column: '交易哈希',
          prop: 'transactionId',
          width: 160
        },
        {
          column: '区块',
          prop: 'blockNumber',
          width: 160
        },
        {
          column: '块龄',
          prop: 'blockAge',
          width: 180
        },
        {
          column: '发送人',
          prop: 'fromAddress',
          width: 180
        },
        {
          column: '接收人',
          prop: 'toAddress',
          width: 180
        },
        {
          column: '交易类型',
          prop: 'contractType'
        },
        {
          column: '状态',
          prop: 'status',
          width: 80
        },
        {
          column: '结果',
          prop: 'result',
          width: 80
        },
        {
          column: '数额',
          prop: 'assetAmount',
          width: 120
        },
        {
          column: '通证',
          prop: 'assetName',
          width: 80
        }
      ],
      cardData: {},
      tabData: {
        currentPage: 1,
        total: 10,
        pageSize: 10
      }
    }
  },
  mounted () {
    console.log('nice')
    this.init()
  },
  methods: {
    init () {
      this.searchText = this.$route.query.key
      this.handleQuery()
    },
    handleQuery () {
      if (this.searchText.length === 64) {
        this.$router.push({ // 区块详情
          path: '/transactionDetail',
          query: {
            key: this.searchText
          }
        })
      } else if (!isNaN(this.searchText)) {
        this.$router.push({ // 区块详情
          path: '/blockDetail',
          query: {
            key: this.searchText
          }
        })
      } else if (this.searchText.length === 34) {
        this.getBlockNow()
      } else {
        this.$message.error('格式错误')
      }
    },
    async getBlockNow () {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getAccount(this.searchText)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getAccount (address) {
      await fetch(`/wallet/getaccount`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: this.searchText,
          visible: true
        })
      }).then(res => {
        res.json().then(data => {
          console.info(data, 'account')
          this.cardData = data
          this.getTransactions(address)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getTransactions (address) {
      await fetch(`/getTransactions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: address && address.length === 34 ? address : null,
          transactionId: address && address.length === 64 ? address : null,
          blockNumber: address && isNaN(+address) === 'number' ? address : null,
          nextPage: this.tabData.currentPage,
          pageSize: this.tabData.pageSize
        })
      }).then(res => {
        res.json().then(data => {
          if (data.status && data.status === 1) {
            // console.log(data.result, 'getTransactions')
            this.resData = data.result
            let newItem = []
            newItem = data.result.items && data.result.items.map(item => {
              const blockAge = this.blockNum - item.blockNumber
              item.blockAge = getDuration(blockAge)
              item.assetAmount = item.assetAmount / 1e6
              item.status = this.blockNum - item.blockNumber >= 19 ? 1 : 0
              return item
            })
            data.result.items = newItem
            this.tabData = {
              title: '交易',
              result: newItem,
              currentPage: data.result.currentPage,
              total: data.result.totalNum,
              pageSize: this.tabData.pageSize
            }
            console.log(newItem, 'accountDetail')
            // this.$store.dispatch('setResultData', data.result)
            console.info(this.$store.state.resultData, 'state')
          }
        })
      })
    },
    handleCurrent (num) {
      console.log(num, 'current')
    },
    handleCell (row, column, cell, event) {
      if (column.property === 'transactionId' && row[column.property]) {
        if (this.$route.path === '/transactionDetail') {
          this.$route.query.key = row[column.property + 'Backup']
          this.init()
        } else {
          this.$router.push({ // 交易详情
            path: '/transactionDetail',
            query: {
              key: row[column.property + 'Backup']
            }
          })
        }
      } else if (column.property === 'blockNumber' && row[column.property]) {
        if (this.$route.path === '/blockDetail') {
          this.$route.query.key = row[column.property + 'Backup'] ? row[column.property + 'Backup'] : row[column.property]
          this.init()
        } else {
          this.$router.push({ // 区块详情
            path: '/blockDetail',
            query: {
              key: row[column.property + 'Backup'] ? row[column.property + 'Backup'] : row[column.property]
            }
          })
        }
      } else if ((column.property === 'fromAddress' || column.property === 'toAddress') && row[column.property]) { // 账户详情
        if (this.$route.path === '/accountDetail') {
          this.$route.query.key = row[column.property + 'Backup']
          this.init()
        } else {
          this.$router.push({
            path: '/accountDetail',
            query: {
              key: row[column.property + 'Backup']
            }
          })
        }
      }
      console.log(row, column, cell, event)
    },
    handleSize (size) {
      this.tabData.pageSize = size
      this.getTransactions(this.searchText)
      console.log(size, 'size')
    }
  },
  filters: {
    formatDate (val) {
      return new Date(val).format('yyyy-MM-dd hh:ss')
    },
    formatAmount (val) {
      if (!isNaN(val)) {
        return val / 1e6
      } else {
        return '--'
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/view/common/less/golbal.less";
  .transactionDetail {
    height: 100%;
    background: rgba(203, 211, 223, 0.21);
    .container {
      margin-top: 89px;
      .detail-title {
        margin-top: 66px;
      }
      .title {
        position: relative;
        font-size: 20px;
        font-weight: 300;

        &::after {
          display: block;
          margin: 20px auto;
          content: "";
          border-radius: 1px;
          width: 32px;
          border: 2px solid #237BE7;
        }
      }
      .tab-component {
        margin-top: 63px;
      }

      /deep/.search-input {
        margin-top: 20px;
        .el-input__inner {
          height: 40px;
        }
        .el-input-group__append {
          background: #237BE7;
          border: none;
          color: @template-text-color-light;
        }
      }
    }
  }
</style>
