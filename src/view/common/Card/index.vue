<template>
  <div class="box-card">
    <slot name="card">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['dataCard'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
  .box-card {
    background: #FFFFFF;
    border: 1px solid #D3DAE2;
    box-shadow: 0px 12px 32px 0px rgba(35, 24, 21, 0.1);
    border-radius: 12px;
    .card-title {
      padding-left: 34px;
      height: 80px;
      line-height: 80px;
      color: #000;
      font-weight: 600;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .img {
        width: 20px;
        cursor: pointer;
      }
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
        }
      }
    }
  }
</style>
