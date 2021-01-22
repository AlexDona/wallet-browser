<template>
  <div class="index">
    <transition-group name="component-fade" mode="out-in">
      <banner-component key="banner" :bgUrl="require('@/assets/banner_block.png')" :title="titleText"></banner-component>
      <block-component key="block"></block-component>
    </transition-group>
  </div>
</template>

<script>
import headerComponent from '@/view/common/header'
import footerComponent from '@/view/common/footer'
import BannerComponent from '@/view/common/Banner'
import Block from './block'

export default {
  name: 'index',
  data () {
    return {
      titleText: {
        text1: '区块'
      }
    }
  },
  components: {
    BannerComponent,
    BlockComponent: Block,
    headerComponent,
    footerComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  height: inherit;
}
</style>
