<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :lg="17" class="container">
      <el-input
        class="search-input"
        popper-class="my-autocomplete"
        v-model="searchText"
        placeholder="请输入区块/交易哈希/账户地址"
        >
        <el-button slot="append" icon="el-icon-search" @click="handleQuery"></el-button>
      </el-input>
      <table-component
        :columns="columns"
        :tableData="tableData.items"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="tableData.total"
        :layout="'prev, pager, next, sizes, jumper'"
        @handleSize="handleSize"
        @handleCurrent="handleCurrent"
        @cell-click="handleCell"
      ></table-component>
    </el-col>
  </el-row>
</template>

<script>
import Table from '@/view/common/Table'
import { getDuration } from '@/utils/utils'
export default {
  name: 'transactionContent',
  components: {
    tableComponent: Table
  },
  data () {
    return {
      searchText: '',
      blockNum: 0,
      columns: [
        {
          column: '交易哈希',
          prop: 'transactionId'
        },
        {
          column: '区块',
          prop: 'blockNumber',
          width: 80
        },
        {
          column: '块龄',
          prop: 'blockAge',
          width: 80
        },
        {
          column: '发送人',
          prop: 'fromAddress'
        },
        {
          column: '接受人',
          prop: 'toAddress'
        },
        {
          column: '交易类型',
          prop: 'contractType',
          width: 80
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
      tableData: {
        total: 10,
        currentPage: 1,
        pageSize: 10,
        items: []
      }
    }
  },
  mounted () {
    this.searchText = this.$route.query.key
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.getBlockNow()
      if (this.searchText) {
        console.info(this.searchText, 'searchText')
      }
    },
    handleSize (size) {
      this.getBlockNow(this.tableData.currentPage, size)
      console.log(size, 'size')
    },
    async getBlockNow (page, size) {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getTransactionsByAccount(this.searchText, page, size)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getTransactionsByAccount (address, page = 1, pagesize = 10) {
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
          nextPage: page,
          pageSize: pagesize
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
            this.tableData = {
              currentPage: data.result.currentPage,
              total: data.result.totalNum,
              items: data.result.items,
              pageSize: pagesize
            }
            console.log(data.result, 'byAccounts')
            // this.$store.dispatch('setResultData', data.result)
            console.info(this.$store.state.resultData, 'state')
          }
        })
      })
      // await fetch(`/getTransactionInfoById?id=${address}&page=${page}&pagesize=${pagesize}`).then(res => {
      //   console.log(res, 'res')
      //   res.json().then(data => {
      //     if (data.status && data.status === 1) {
      //       this.resData = data.result
      //       let newItem = []
      //       newItem = data.result.items && data.result.items.map(item => {
      //         item.blockAge = this.blockNum - item.blockNumber
      //         item.assetAmount = item.assetAmount / 1e6
      //         return item
      //       })
      //       data.result.items = newItem
      //       this.toatal = data.result.totalNum
      //       // console.log(data.result, 'nnnnnnnnnn')
      //       // this.$store.dispatch('setResultData', data.result)
      //       console.info(this.$store.state.resultData, 'state')
      //     } else {
      //       this.$message.error(data.msg)
      //     }
      //   })
      // })
    },
    handleCurrent (num) {
      this.getBlockNow(num, this.tableData.pageSize)
      console.log(num, 'current')
    },
    handleCell (row, column, cell, event) {
      if (column.label === '交易哈希') {
        this.$router.push('transactionDetail')
      }
      console.log(row, column, cell, event)
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/view/common/less/golbal.less";
    .container {
      margin-top: 37px;
      /deep/.search-input {
        margin-top: 20px;
        margin-bottom: 45px;
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
</style>
