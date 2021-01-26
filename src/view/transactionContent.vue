<template>
  <div class="transaction-content">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18" :lg="17" class="container">
        <div class="t-a-c title">最新交易 <span class="more" @click="handleTransaction">更多 <i class="el-icon-d-arrow-right
"></i></span></div>
        <table-component
          class="table1"
          :columns="columns"
          :tableData="tableData"
          :stripe="true"
          :total="total1"
          :layout="'prev, pager, next'"
          @handleCurrent="handleCurrent"
        ></table-component>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="center" class="block">
      <el-col :xs="24" :sm="18" :lg="14" class="block-container">
        <div class="t-a-c title">区块 & 账户</div>
        <el-row type="flex" justify="space-around">
          <el-col :xs="12" :sm="12" :lg="11" class="left-table">
            <div class="fr more-tip mb11" @click="handleBlockDetail">更多 <i class="el-icon-d-arrow-right
"></i></div>
            <table-component
            class="block-table1"
            :noborder="true"
            :stripe="false"
            :columns="columnsL"
            :tableData="tableDataL"
            :columnIndex="[0]"
            :total="total2"
            :layout="'prev, pager, next'"
            @handleCurrent="handleCurrent"
          ></table-component>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="11">
            <div class="mb11">&nbsp;</div>
            <table-component
              class="block-table2"
              :noborder="true"
              :stripe="false"
              :columns="columnsR"
              :tableData="tableDataR"
              :columnIndex="[0]"
              :total="total3"
              :layout="'prev, pager, next'"
              @handleCurrent="handleCurrent"
            ></table-component>
          </el-col>
        </el-row>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import Table from '@/view/common/Table'
import {mapState} from 'vuex'
export default {
  name: 'transactionComponent',
  props: ['getSearchCom'],
  components: {
    tableComponent: Table
  },
  data () {
    return {
      current: 0, // 当前页
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
          prop: 'blockAge'
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
          prop: 'contractType'
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
      tableData: []
      // total1: 10,
      // total2: 10,
      // total3: 10,
      // columnsL: [
      //   {
      //     column: '区块',
      //     prop: 'date',
      //     width: 130
      //   },
      //   {
      //     column: '交易',
      //     prop: 'name',
      //     width: 160
      //   },
      //   {
      //     column: '大小',
      //     prop: 'address',
      //     width: 120
      //   }
      // ],
      // columnsR: [
      //   {
      //     column: '账户',
      //     prop: 'date',
      //     width: 130
      //   },
      //   {
      //     column: '总资产',
      //     prop: 'name',
      //     width: 160
      //   },
      //   {
      //     column: '比例',
      //     prop: 'address',
      //     width: 120
      //   }
      // ],
      // tableDataL: [
      //   {
      //     date: '2016-05-02',
      //     name: '大佬1',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ],
      // tableDataR: [
      //   {
      //     date: '2016-05-02',
      //     name: '大佬2',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ]
    }
  },
  created () {
    console.info(this.resultData, 'resultddd')
    if (this.resultData.items instanceof Array) {
      this.resultData.items.map(item => {
        this.tableData.push({
          transactionId: item.transactionId,
          blockNumber: item.blockNumber,
          blockAge: item.blockAge,
          fromAddress: item.fromAddress,
          toAddress: item.toAddress,
          contractType: item.contractType,
          assetAmount: item.assetAmount,
          assetName: item.assetName
        })
      })
    }
    // this.tableData =
  },
  computed: {
    ...mapState([
      'resultData'
    ])
  },
  methods: {
    handleCurrent (num) { // 当前页数据
      console.log(num, this.getSearchCom)
      let getTransactionsByAccount = this.getSearchCom().getBlockNow
      getTransactionsByAccount(num)
    },
    // async getTransactions (page = 1, pageSize = 10) {
    //   await fetch(`/getTransactions`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       nextPage: page
    //     })
    //   }).then(res => {
    //     res.json().then(data => {
    //       if (data.status && data.status === 1) {
    //         console.log(data.result, 'getTransactions')
    //         // this.$store.dispatch('setResultData', data.result)
    //       }
    //     })
    //   })
    // },
    handleBlockDetail () {
      this.$router.push('block')
    },
    handleTransaction () {
      this.$router.push('transaction')
    }
  },
  watch: {
    resultData (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.tableData = []
      this.total1 = this.resultData.totalNum
      if (this.resultData.items instanceof Array) {
        this.resultData.items.map(item => {
          this.tableData.push({
            transactionId: item.transactionId,
            blockNumber: item.blockNumber,
            blockAge: item.blockAge,
            fromAddress: item.fromAddress,
            toAddress: item.toAddress,
            contractType: item.contractType,
            assetAmount: item.assetAmount,
            assetName: item.assetName
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/view/common/less/golbal.less";
.transaction-content {
  .container {
    margin-top: 38px;
    margin-bottom: 45px;
    .table1 {
      margin-top: 9px;
    }
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
  .more {
    position: absolute;
    bottom: 16px;
    right: 0;
    color: #237BE7;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .block {
    background: rgba(197, 210, 228, 0.2);
    .block-container {
      margin-top: 38px;
      margin-bottom: 45px;
      .mb11 {
        margin-bottom: 11px;
      }
      .more-tip {
        font-size: 16px;
        color: #237BE7;
        cursor: pointer;
      }
    }
  }
}
</style>
