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
        :stripe="true"
        :columns="columns"
        :tableData="tableData.result"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="tableData.total"
        :layout="'prev, pager, next, sizes, jumper'"
        @handleSize="handleSize"
        @handleCurrent="handleCurrent"
      ></table-component>
    </el-col>
  </el-row>
</template>

<script>
import Table from '@/view/common/Table'
import { getDuration } from '@/utils/utils'
export default {
  name: 'Block',
  components: {
    tableComponent: Table
  },
  data () {
    return {
      searchText: '',
      columns: [
        {
          column: '高度',
          prop: 'blockNumber'
        },
        {
          column: '块龄',
          prop: 'blockAge'
        },
        {
          column: '状态',
          prop: 'status',
          width: 80
        },
        {
          column: '交易',
          prop: 'transactionId'
        },
        {
          column: '出块者',
          prop: 'witness_address'
        }
        // {
        //   column: '字节',
        //   prop: 'bytes',
        //   width: 120
        // }
      ],
      tableData: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
        result: []
      },
      total: 100
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.getBlockNow()
    },
    async getBlockNow () {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getTransactions(this.searchText)
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
          nextPage: this.tableData.currentPage,
          pageSize: this.tableData.pageSize
        })
      }).then(res => {
        res.json().then(async data => {
          this.tableData.result = []
          if (data.status && data.status === 1) {
            this.tableData.total = data.result.totalNum
            let newItem = []
            data.result.items && data.result.items.forEach((item, index) => {
              this.getblockbynum(item.blockNumber, item, newItem)
              // const data = this.getblockbynum(item.blockNumber, item, newItem)
              // const blockAge = this.blockNum - item.blockNumber
              // item.blockAge = getDuration(blockAge)
              // item.assetAmount = item.assetAmount / 1e6
              // item.status = this.blockNum - item.blockNumber >= 19 ? 1 : 0
              // item.witness_address = data
              // return item
            })
            // data.result.items = newItem
            // let newResult = {
            //   result: newItem
            // }
            // Object.assign(newResult, this.tableData.result)
            // this.tableData.result = newItem
          }
        })
      }).catch(err => {
        this.$message.error(err)
      })
    },
    async getblockbynum (num, item, newItem) {
      const data = await fetch(`/wallet/getblockbynum?num=${num}`).then(res => res.json())
      const blockAge = this.blockNum - item.blockNumber
      item.blockAge = getDuration(blockAge)
      item.assetAmount = item.assetAmount / 1e6
      item.status = this.blockNum - item.blockNumber >= 19 ? 1 : 0
      item.witness_address = data.block_header.raw_data && data.block_header.raw_data.witness_address
      newItem.push(item)
      let newResult = {
        result: newItem
      }
      Object.assign(newResult, this.tableData.result)
      this.tableData.result = newItem
    },
    handleCurrent (num) {
      this.tableData.currentPage = num
      this.getTransactions(this.searchText)
    },
    handleSize (size) {
      this.tableData.pageSize = size
      this.getTransactions(this.searchText)
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
    margin-bottom: 47px;
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
