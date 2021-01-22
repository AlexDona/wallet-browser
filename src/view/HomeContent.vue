<template>
    <div>
      <transition-group name="component-fade" mode="out-in">
        <banner-component @getSearchCom="getSearchCom" ref="queryBtn" key="'banner'" :bgUrl="require('../assets/banner.gif')" :title="titleText" :search="true"></banner-component>
        <transaction-component key="transaction" :getSearchCom="getSearchCom"></transaction-component>
      </transition-group>
    </div>
</template>

<script>
import bannerComponent from '@/view/common/Banner'
import transactionComponent from './transactionContent'
export default {
  name: 'homeContent',
  data () {
    return {
      titleText: {
        text1: '全球领先的',
        text2: '区块链浏览器'
      },
      searchText: ''
    }
  },
  components: {
    bannerComponent,
    transactionComponent
  },
  mounted () {
    this.getSearchCom().getBlockNow()
  },
  methods: {
    getSearchCom () {
      let searchCom = this.$refs['queryBtn']
      this.searchText = searchCom.searchText
      console.log(this.$refs['queryBtn'], 'refs')
      return {
        getBlockNow: searchCom.getBlockNow,
        searchText: searchCom.searchText
      }
      // return this.$refs['queryBtn'].handleQuery()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.layout-content {
  position: relative;
}
.layout-main {
  min-height: 80vh;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
