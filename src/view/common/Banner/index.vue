<template>
    <el-row class="banner" type="flex" justify="center" :style="{backgroundImage: `url(${bgUrl})`}">
      <el-col :xs="24" :sm="18" :lg="16" class="container">
        <div class="banner-title">
          {{title.text1}}
        </div>
        <div class="banner-title" v-if="title.text2">
          {{title.text2}}
        </div>
        <el-row v-if="search">
          <el-input
            class="search-input"
            popper-class="my-autocomplete"
            v-model="searchText"
            placeholder="请输入区块/交易哈希/账户地址"
          >
            <el-button slot="append" icon="el-icon-search" ref="queryBtn" @click="handleQuery"></el-button>
          </el-input>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import { getDuration } from '@/utils/utils'

export default {
  name: 'bannerComponent',
  props: ['title', 'bgUrl', 'search'],
  components: {
  },
  data () {
    return {
      searchText: '',
      blockNum: '',
      resData: {}
    }
  },
  methods: {
    ...mapActions([
      'setResultData'
    ]),
    async getBlockNow (page = 1) {
      await fetch(`/wallet/getnowblock`).then(res => {
        res.json().then(data => {
          // console.info(data, 'blocknow')
          this.blockNum = data.block_header.raw_data.number
          this.getTransactionsByAccount(this.searchText, page)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getTransactionsByAccount (transactionId, page = 1, pagesize = 10) {
      await fetch(`/getTransactions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: transactionId,
          nextPage: page,
          pageSize: pagesize
        })
      }).then(res => {
        res.json().then(data => {
          if (data.status && data.status === 1) {
            console.log(data.result, 'getTransactions')
            this.resData = data.result
            let newItem = []
            newItem = data.result.items && data.result.items.map(item => {
              const blockAge = this.blockNum - item.blockNumber
              item.blockAge = getDuration(blockAge)
              item.assetAmount = item.assetAmount / 1e6
              return item
            })
            data.result.items = newItem
            console.log(data.result, 'byAccounts')
            this.setResultData(data.result)
            // this.$store.dispatch('setResultData', data.result)
            console.info(this.$store.state.resultData, 'state')
          }
        })
      })
      // await fetch(`/getTransactionsByAccount?account=${address}&page=${page}&pagesize=${pagesize}`).then(res => {
      //   res.json().then(data => {
      //     if (data.status && data.status === 1) {
      //       this.resData = data.result
      //       let newItem = []
      //       newItem = data.result.items && data.result.items.map(item => {
      //         const blockAge = this.blockNum - item.blockNumber
      //         item.blockAge = getDuration(blockAge)
      //         item.assetAmount = item.assetAmount / 1e6
      //         return item
      //       })
      //       data.result.items = newItem
      //       console.log(data.result, 'byAccounts')
      //       this.setResultData(data.result)
      //       // this.$store.dispatch('setResultData', data.result)
      //       console.info(this.$store.state.resultData, 'state')
      //     }
      //   })
      // })
    },
    handleQuery () {
      if (this.searchText.length === 34) {
        console.info(this.searchText, 'searchText')
        this.getBlockNow()
        this.$emit('getSearchCom')
      } else if (this.searchText.length === 64) {
        this.$router.push({
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
      } else {
        this.$message.error('格式错误')
      }
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    }

  }
}
</script>

<style scoped lang="less">
@import "~@/view/common/less/golbal.less";
@banner: banner;
.@{banner} {
  height: 450px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 128px;
  &-title {
    color: @template-text-color-light;
    font-size: 32px;
    font-weight: 500;
    padding-bottom: 10px;
  }
  /deep/.search-input {
    width: 600px;
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
</style>
