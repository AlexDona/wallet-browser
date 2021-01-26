<template>
  <div class="blcokDetail">
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
          <div class="t-a-c title detail-title"  v-clipboard="">区块详情</div>

          <card-component>
            <template #card>
              <div class="card-title">
                <div>{{tabData.number}} &nbsp;<img v-clipboard="tabData.number" class="img" src="../../assets/icon/spread.png" /></div>
              </div>
              <div class="card-content">
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">结果：</div>
                  <div class="card-list-r">
                    <div>SUCCESS</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">哈希值：</div>
                  <div class="card-list-r">
                    <div>{{tabData.blockID}} &nbsp;<img v-clipboard="tabData.blockID" class="img" src="../../assets/icon/spread.png" /></div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">高度：</div>
                  <div class="card-list-r">
                    <div>{{tabData.number}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">时间：</div>
                  <div class="card-list-r">
                    <div>{{tabData.timeStamp | formatDate}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">交易：</div>
                  <div class="card-list-r">
                    <div>{{tabData.transactions}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">父哈希：</div>
                  <div class="card-list-r">
                    <div>{{tabData.parentHash}} &nbsp;<img v-clipboard="tabData.parentHash" class="img" src="../../assets/icon/spread.png" /></div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">出块者：</div>
                  <div class="card-list-r">
                    <div>{{tabData.witness_address}}</div>
                  </div>
                </div>
<!--                <div class="card-list dif a-i-c">-->
<!--                  <div class="card-list-l">大小：</div>-->
<!--                  <div class="card-list-r">-->
<!--                    <div>{{tabData.blockNumber}}</div>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </template>
          </card-component>

          <tab-component class="tab-component" :tabData="tabData">
            <template #card><div></div></template>
            <template #table>
              <table-component
                @cell-click="handleCell"
                :columns="columns"
                :tableData="tableData.result"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                :total="tableData.total"
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
      blockNum: 0,
      tabData: {
      },
      columns: [
        {
          column: '哈希值',
          prop: 'transactionId'
        },
        {
          column: '状态',
          prop: 'status',
          width: 80
        },
        {
          column: '块龄',
          prop: 'blockAge'
        },
        {
          column: '合约类型',
          prop: 'contractType'
        }
      ],
      tableData: {
        currentPage: 1,
        total: 10,
        result: []
      }
    }
  },
  mounted () {
    this.searchText = this.$route.query.key
    this.getBlockNow()
  },
  methods: {
    handleSize (size) {
      this.getBlockNow(size)
      console.log(size, 'size')
    },
    handleQuery () {
      if (this.searchText.length === 64) {
        this.$router.push({
          path: '/transactionDetail',
          query: {
            key: this.searchText
          }
        })
      } else if (!isNaN(this.searchText)) {
        this.getBlockNow()
      } else if (this.searchText.length === 34) {
        this.$router.push({
          path: '/accountDetail',
          query: {
            key: this.searchText
          }
        })
      } else {
        this.$message.error('格式错误')
      }
    },
    async getBlockNow (pageSize = 10) {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getblockbynum(this.searchText, this.tableData.currentPage, pageSize)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getblockbynum (num, page = 1, pagesize = 10) {
      await fetch(`/wallet/getblockbynum?num=${num}&page=${page}&pagesize=${pagesize}`).then(res => {
        res.json().then(data => {
          console.log(data, 'blocks')
          const tabData = {
            title: '交易',
            status: this.blockNum - data.bloc_header && data.bloc_header.raw_data.number >= 19 ? 1 : 0,
            number: data.block_header && data.block_header.raw_data.number,
            blockID: data.blockID,
            timeStamp: data.block_header && data.block_header.raw_data.timestamp,
            parentHash: data.block_header && data.block_header.raw_data.parentHash,
            transactions: data.transactions.length,
            witness_address: data.block_header && data.block_header.raw_data.witness_address
          }
          this.tabData = tabData
          let tableData = {
            total: 10,
            result: []
          }
          data.transactions.map(item => {
            tableData.result.push({
              transactionId: item.txID,
              status: this.blockNum - (data.block_header && data.block_header.raw_data.number) >= 19 ? 1 : 0,
              blockAge: this.blockNum - (data.block_header && data.block_header.raw_data.number),
              contractType: item.raw_data && item.raw_data.contract[0].type === 'TransferContract' ? '触发智能合约' : item.raw_data.contract[0].type
            })
          })
          this.tableData = tableData
        })
      })
    },
    handleCurrent (num) {
      this.tableData.currentPage = num
      this.getBlockNow()
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
      }
    }
  },
  filters: {
    formatDate (val) {
      return new Date(val).format('yyyy-MM-dd hh:ss')
    },
    formatAmount (val) {
      return val / 1e6
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/view/common/less/golbal.less";
.blcokDetail {
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
      margin-bottom: 63px;
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
