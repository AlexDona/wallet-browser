<template>
  <div class="index">
    <transition-group name="component-fade" mode="out-in">
      <banner-component key="banner" :bgUrl="require('@/assets/banner_block.png')" :title="titleText"></banner-component>
      <content-component key="content"></content-component>
    </transition-group>
  </div>
</template>

<script>
import headerComponent from '@/view/common/header'
import footerComponent from '@/view/common/footer'
import BannerComponent from '@/view/common/Banner'
import Content from '@/view/Transaction/content'

export default {
  name: 'index',
  data () {
    return {
      titleText: {
        text1: '交易'
      }
    }
  },
  components: {
    BannerComponent,
    headerComponent,
    footerComponent,
    ContentComponent: Content
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  height: inherit;
}
</style>
