<template>
  <el-tabs class="tab-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="tabData.title" name="first">
      <div class="card-content">
        <slot name="card"></slot>
        <slot name="table"></slot>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'index',
  props: ['tabData'],
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  filters: {
  }
}
</script>

<style scoped lang="less">
  .tab-card {
    background: #FFFFFF;
    border: 1px solid #D3DAE2;
    box-shadow: 0px 12px 32px 0px rgba(35, 24, 21, 0.1);
    border-radius: 12px;
    /deep/ :global {
      .el-tabs__header {
        margin: 0;
        background: #fff;
        border-radius: 12px 12px 0 0;
        box-shadow: 0px 12px 32px 0px rgba(35, 24, 21, 0.1);
      }
      .el-tabs__active-bar {
        height: 0;
      }
      .el-tabs__item.is-active {
        height: unset;
        color: #237BE7;
        padding: 14px 39px;
        border-bottom: 4px solid #237BE7;
      }
      .table.el-table {
        border-radius: 0 0 7px 7px;
        border: none !important;
        .cell {
          text-align: center;
        }
      }
      .pagination {
        padding-right: 30px;
      }
    }

    .card-title {
      padding-left: 34px;
      height: 80px;
      line-height: 80px;
      font-weight: 600;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .card-content {
      .card-list {
        padding-left: 34px;
        height: 60px;
        line-height: 60px;
        &:nth-of-type(2n+1) {
          background: rgba(57, 74, 111, 0.05);
        }
        .card-list-l {
          min-width: 100px;
          font-size: 16px;
          font-weight: 400;
          color: #999999;
        }
        .card-list-r {
          color: #333333;
          .img {
            width: 20px;
            cursor: pointer;
          }
          .listContent {
            .list-item {
              height: unset;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
</style>
