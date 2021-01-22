<template>
  <div class="index">
    <section class="container">
      <section class="layout-content">
        <header class="layout-header">
          <header-component></header-component>
        </header>
        <main class="layout-main">
          <router-view></router-view>
        </main>
        <footer-component></footer-component>
      </section>
    </section>
  </div>
</template>

<script>
import headerComponent from '@/view/common/header'
import footerComponent from '@/view/common/footer'

export default {
  name: 'index',
  data () {
    return {
      titleText: {
        text1: '全球领先的',
        text2: '区块链浏览器'
      }
    }
  },
  components: {
    headerComponent,
    footerComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index {
  height: 100vh;
  .container {
    height: inherit;
  }
}
</style>
