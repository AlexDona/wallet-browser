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
          <div class="t-a-c title detail-title">交易详情</div>

          <card-component>
            <template #card>
              <div class="card-title">
                <div>{{tabData.transactionId}} &nbsp;<img v-clipboard="tabData.transactionId" class="img" src="../../assets/icon/spread.png" /></div>
              </div>
              <div class="card-content">
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">结果：</div>
                  <div class="card-list-r">
                    <div>{{tabData.result}}</div>
<!--                    <el-button type="primary">待确认</el-button>-->
<!--                    <div>-->
<!--                      <span>-->
<!--                        123&nbsp;3333-->
<!--                      </span>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                      <div>-->
<!--                        123&nbsp;3333-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div>-->
<!--                      <div>-->
<!--                        123&nbsp;3333-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div>{{232323}} &nbsp;<img class="img" src="../../assets/icon/spread.png" /></div>-->
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">状态：</div>
                  <div class="card-list-r">
                    <el-button :type="tabData.status ? 'success' : 'danger'">{{tabData.status ? '已确认' : '待确认'}}</el-button>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">区块：</div>
                  <div class="card-list-r">
                    <div>{{tabData.blockNumber}}</div>
                  </div>
                </div>
                <div class="card-list dif a-i-c">
                  <div class="card-list-l">时间：</div>
                  <div class="card-list-r">
                    <div>{{tabData.timeStamp | formatDate}}</div>
                  </div>
                </div>
              </div>
            </template>
          </card-component>

          <tab-component class="tab-component" :tabData="tabData">
            <template #card>
              <div class="card-list dif a-i-c">
                <div class="card-list-l">发送人</div>
                <div class="card-list-r">
                  <span>{{tabData.fromAddress || '--'}}</span>&nbsp;<img v-if="tabData.fromAddress" v-clipboard="tabData.fromAddress" class="img" src="../../assets/icon/spread.png" />
                  </div>
              </div>
              <div class="card-list dif a-i-c">
                <div class="card-list-l">接收人</div>
                <div class="card-list-r">
                  <span>{{tabData.toAddress || '--'}}</span>&nbsp;<img v-if="tabData.fromAddress" v-clipboard="tabData.toAddress" class="img" src="../../assets/icon/spread.png" />
                </div>
              </div>
              <div class="card-list dif a-i-c">
                <div class="card-list-l">数额</div>
                <div class="card-list-r">
                  <span>{{tabData.assetAmount | formatAmount}}</span>
                </div>
              </div>
<!--              <div class="card-list dif a-i-c">-->
<!--                <div class="card-list-l">通证ID</div>-->
<!--                <div class="card-list-r">-->
<!--                  <span>{{tabData}}</span>-->
<!--                </div>-->
<!--              </div>-->
              <div class="card-list dif a-i-c">
                <div class="card-list-l">通证</div>
                <div class="card-list-r">
                  <span>{{tabData.assetName || '--'}}</span>
                </div>
              </div>
              <div class="card-list dif a-i-c">
                <div class="card-list-l">消耗带宽</div>
                <div class="card-list-r">
                  <div class="listContent" >
                      <div class="list-item">-----消耗用户冻结/免费带宽：{{tabData.netFee}}带宽</div>
                      <div class="list-item">-----燃烧{{tabData.energyFee}}{{tabData.assetName}}</div>
                  </div>
                </div>
              </div>
            </template>
            <template #table></template>
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
      tabData: {
      },
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
      }
    }
  },
  mounted () {
    if (this.$route.query.key) {
      this.searchText = this.$route.query.key
      this.getBlockNow()
    }
  },
  methods: {
    handleQuery () {
      if (this.searchText.length === 64) {
        this.getBlockNow()
      } else if (!isNaN(this.searchText)) {
        this.$router.push({ // 区块详情
          path: '/blockDetail',
          query: {
            key: this.searchText
          }
        })
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
    async getBlockNow () {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getTransactionsByAccount(this.searchText)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getTransactionsByAccount (address, page = 1, pagesize = 10) {
      await fetch(`/getTransactionInfoById?id=${address}&page=${page}&pagesize=${pagesize}`).then(res => {
        res.json().then(data => {
          if (data.status && data.status === 1) {
            data.result.status = this.blockNum - data.result.blockNumber >= 19 ? 1 : 0
            console.log(data.result, 'nnnnnnnnnn')
            data.result.title = data.result.contractType === 'TransferContract' ? '触发智能合约' : data.result.contractType
            this.tabData = data.result
            // this.$store.dispatch('setResultData', data.result)
            console.info(this.$store.state.resultData, 'state')
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    handleCurrent (num) {
      console.log(num, 'current')
    },
    handleCell (row, column, cell, event) {
      this.$router.push(
        'blockDetail'
      )
      console.log(row, column, cell, event)
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
        margin-bottom: 70px;
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

      /deep/ :global {
        .el-tabs__header {
          margin: 0;
          background: #fff;
          border-radius: 12px 12px 0 0;
          box-shadow: 0px 12px 32px 0px rgba(35, 24, 21, 0.1);
          border: 1px solid #D3DAE2;
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
  }
</style>
