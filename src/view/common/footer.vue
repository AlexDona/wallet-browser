<template>
  <footer>
    <el-row class="footer" type="flex" justify="center">
      <el-col :xs="24" :sm="18" :lg="16">
        <el-row>
          <el-col :xs="18" :sm="18" :lg="18">
            <el-row>
              <el-col :xs="6" :sm="6" :lg="6">
                <div class="footer-title p28">AT生态</div>
                <div class=" p28">
                  <a class="title-text" href="">官网</a>
                </div>
<!--                <div class=" p28">-->
<!--                  <a class="title-text" href="">钱包</a>-->
<!--                </div>-->
<!--                <div class=" p28">-->
<!--                  <a class="title-text" href="">河图</a>-->
<!--                </div>-->
              </el-col>
<!--              <el-col :xs="6" :sm="6" :lg="6">-->
<!--                <div class="footer-title p28">通证产品</div>-->
<!--                <div class=" p28">-->
<!--                  <a class="title-text" href="">亚洲通</a>-->
<!--                </div>-->
<!--                <div class=" p28">-->
<!--                  <a class="title-text" href="">基建通</a>-->
<!--                </div>-->
<!--              </el-col>-->
            </el-row>
          </el-col>
          <el-col :span="6">
            <div class="footer-title p28">关于我们</div>
            <el-row class="p28 icon-content" justify="flex">
              <el-col :xs="6" :sm="6" :lg="4">
                <a href="https://twitter.com/home?lang=en" target="_blank"><img class="icons" src="@/assets/twitter.png" alt=""/></a>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="4">
                <a href="https://www.instagram.com/adec_info/"  target="_blank"><img class="icons" src="@/assets/instagram.png" alt=""/></a>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="4">
                <a href="https://weibo.com/7508227359/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1" target="_blank"><img class="icons" src="@/assets/weibo.png" alt=""/></a>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="4">
                <a href="https://www.zhihu.com/org/ya-zhou-shu-zi-jing-ji-he-zuo-zu-zhi" target="_blank"><img class="icons" src="@/assets/zhihu.png" alt=""/></a>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="4">
                <a href="https://www.quora.com/profile/ADEC-A" target="_blank"><img class="icons" src="@/assets/quora.png" alt=""/></a>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="4">
                <el-popover
                  placement="top-start"
                  width="120"
                  trigger="hover"
                  >
                  <img class="qrcode" src="@/assets/link_qr.png" alt="">
                  <img slot="reference" class="icons" src="@/assets/weixin.png" alt=""/>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
export default {
  name: 'footerComponent',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~@/view/common/less/golbal.less";

.footer {
  width: 100%;
  height: 250px;
  background: #1A1A1A;
  padding-top: 43px;
  .footer-title {
    color: @template-text-color-light;
    font-size: 20px;
  }
  .icon-content {
    .icons {
      width: 32px;
      height: 32px;
      margin-right: 27px;
      &:hover {
        transform: scale(1.1);
        transition: all 0.45s ease;
      }
    }
    flex-wrap: nowrap;
  }

  .p28 {
    padding-top: 18px;
  }
  .title-text {
    opacity: 0.6;
  }
}
.qrcode {
  width: 150px;
}
</style>
