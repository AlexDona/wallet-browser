<template>
  <div class="table">
    <el-table
      :class="['table', noborder ?'no-border': null]"
      :cell-style="cellStyle"
      :data="tableData"
      :stripe="stripe"
      @cell-mouse-enter="handleHover"
      @cell-click="handleCell"
      empty-text="暂无数据"
      style="width: 100%">
      <el-table-column
        :prop="item.prop"
        v-for="(item, index) in columns"
        :label="item.column"
        :key="index"
        :width="item.width">
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      :layout=layout
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      @size-change="handleSize"
      @current-change="handleCurrent"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'transactionContent',
  props:
    // ['columns', 'tableData', 'total', 'stripe', 'noborder', 'layout']
    {
      columns: {
        type: Array
      },
      tableData: {
        type: Array
      },
      total: {
        type: Number
      },
      stripe: {
        type: Boolean
      },
      noborder: {
        type: Boolean
      },
      layout: {
      }
    },
  data () {
    return {
      current: 0 // 当前页
    }
  },
  methods: {
    handleSize (size) {
      this.$emit('handleSize', size)
    },
    handleCurrent (num) {
      this.$emit('handleCurrent', num)
      console.log('current', num)
    },
    handleCell (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
      console.log(row[column.property + 'Backup'], 'ddd')
      if (column.property === 'transactionId' && row[column.property]) {
        this.$router.push({ // 交易详情
          path: '/transactionDetail',
          query: {
            key: row[column.property + 'Backup']
          }
        })
      } else if (column.property === 'blockNumber' && row[column.property]) {
        this.$router.push({ // 区块详情
          path: '/blockDetail',
          query: {
            key: row[column.property + 'Backup'] ? row[column.property + 'Backup'] : row[column.property]
          }
        })
      } else if ((column.property === 'fromAddress' || column.property === 'toAddress') && row[column.property]) { // 账户详情
        this.$router.push({
          path: '/accountDetail',
          query: {
            key: row[column.property + 'Backup']
          }
        })
      }
    },
    handleHover (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
      // const a = document.createElement('a')
      console.log(event.target.innerText, row)
    },
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(this.$props.columnIndex)
      // console.log(this.columnIndex, 'columnIndex')
      // console.log(row, column, rowIndex, columnIndex, 'sss')
      Object.entries(row).map(item => {
        if (item[1] && item[1].toString().length >= 17 && !item[0].includes('Backup') && (item[0] === 'transactionId' || item[0] === 'toAddress' || item[0] === 'fromAddress')) {
          let str = item[1].toString()
          row[item[0]] = str.substr(0, 5) + '***' + str.substr(-5)
          row[item[0] + 'Backup'] = item[1]
        }
      })

      if (column.property === 'transactionId' || column.property === 'blockNumber' || column.property === 'toAddress' || column.property === 'fromAddress') {
        return {
          'color': '#237BE7',
          'cursor': 'pointer'
        }
      }
      if (column.property === 'status') {
        if (row[column.property]) {
          row[column.property] = '已确认'
          return {
            color: 'green'
          }
        } else {
          row[column.property] = '待确认'
          return {
            color: 'coral'
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/view/common/less/golbal.less";
.table {
  width: 100%;
  margin-bottom: 45px;
  .title {
    font-size: 20px;
    font-weight: 300;
    &::after {
      display: block;
      margin: 20px auto;
      content: "";
      width: 32px;
      border: 2px solid #237BE7;
    }
  }
  .table.el-table {
    border: 1px solid #d3d3d3;
    border-radius: 7px;
  }
  /deep/:global {
    .el-table {
      thead {
        color: #333;
        font-weight: 600;
      }
      .el-table__header-wrapper {
        width: 100%;
        table {
          width: inherit !important;
        }
      }
      th {
        height: 80px;
      }
      .el-table__body-wrapper {
        width: 100%;
        table {
          width: inherit !important;
        }
      }
    }
    .pagination {
      text-align: right;
      margin-top: 30px;
      li {
        border-radius: 4px;
        border: 1px solid #dddde2;
        background: @template-text-color-light;
      }
      button {
        border-radius: 4px;
        border: 1px solid #dddde2;
        background: @template-text-color-light;
      }
    }
  }
  .no-border {
    border: none!important;
  }
}
</style>
