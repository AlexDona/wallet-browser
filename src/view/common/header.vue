<template>
  <header>
    <el-row class="header-container" type="flex" justify="center">
      <el-col :xs="1" :sm="1" :lg="1" class="dif">
        <div class="logo a-s-c"></div>
      </el-col>
      <el-col :xs="24" :sm="18" :lg="16" class="container">
        <el-menu :default-active="activeIndex" class="el-menu-header" router mode="horizontal" @select="handleSelect">
          <template v-for="route in $router.options.routes[0].children">
            <el-menu-item v-if="route.name !== 404 && route.type !== 'child'" :index="route.path" :key="route.path">{{route.name}}</el-menu-item>
          </template>
<!--          <el-menu-item index="3">区块</el-menu-item>-->
<!--          <el-menu-item index="4">交易</el-menu-item>-->
<!--          <el-menu-item index="3">账户</el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
    <div class="container">

    </div>
  </header>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'headerContent',
  data () {
    return {
      // activeIndex: this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect () {
      this.$nextTick(() => {
        // this.activeIndex = this.$route.path.replace('/', '')
        console.log('e', this.$route)
      })
    },
    handleCommand (command) {
      this.setLang(command)
      console.log(this.$store.state.lang)
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path.replace('/', '')
    }
  }
  // watch: {
  //   '$route': (val) => {
  //     this.activeIndex = this.$route.path.replace('/', '')
  //     this.activeIndex = val.path.replace('/', '')
  //     console.log(this.activeIndex, 'val')
  //   },
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "~@/view/common/less/golbal.less";

.header-container {
  background: rgba(15,35,86, 0.5);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  .el-menu-header {
    background: transparent;
    margin-left: 130px;
    &.el-menu--horizontal {
      border-color: transparent;
    }
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      color: @template-text-color-light;
      padding: 0;
      margin-right: 120px;
      &.is-active {
        border-color: @template-text-color-light;
      }
      &:hover {
        color: #fff;
        background: transparent;
      }
    }
  }
  .logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("~@/assets/logo.png") center no-repeat;
    background-size: cover;
  }
  .container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
