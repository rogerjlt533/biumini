<template>
  <view class="u-f-a page-body">
    <view class="cell-tx" @click="link2biu">
      <image :src="biuXinxi.image" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;">
      </image>
    </view>

    <view class="cell-right" @click="link2sx">
      <view class="u-f-aj" style="display: flex;">
        <view :class="(biuXinxi.read_status===0)?'cell-name':'cell-name-read'">{{biuXinxi.name}}</view>
        <view class="cell-time">
          {{biuXinxi.messageTime}}
        </view>
      </view>
      <view class="u-line-1 cell-content" :style="(biuXinxi.read_status===0)?'color:#363D50;':''">
        {{biuXinxi.content}}
      </view>

      <!-- <view v-if="biuXinxi.contentType==='text'" class="u-line-1 cell-content"
				:style="(biuXinxi.read_status===0)?'color:#363D50;':''">
				{{biuXinxi.content}}
			</view>
			<view v-else class="u-line-1 cell-content" :style="(biuXinxi.read_status===0)?'color:#363D50;':''">
			[图片]
			</view> -->
    </view>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: 'SixinCell',
    props: {
      scrollTop: {
        type: Number,
        default: 0
      },
      isBtmLine: {
        type: Boolean,
        default: true
      },
      operate: {
        type: String,
        default: "link"
      },
      biuXinxi: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    computed: {
      ...mapState({
        isLogin: 'isLogin'
      }),
    },
    watch: {
      scrollTop(val) {
        console.info("scrollTop::", val)
      }
    },
    data() {
      return {
        biuImgList: [
          "../../static/treehole/biu/biu-xinjian.png",
          "../../static/treehole/biu/biu-xinjian.png",
          "../../static/treehole/biu/biu-email.png",
          "../../static/treehole/biu/biu-email-and-xj.png",
        ],
        left: 0,
        top: 0,
      }
    },
    methods: {
      link2biu() {
        this.$emit("link2biu")
      },
      link2sx() {
        this.$emit("link2sx")
      },
    }

  }
</script>

<style scoped lang="scss">
  .page-body {
    // margin: 10rpx 0;
    padding: 10rpx 0;
    // border: #F76260 solid 1rpx;
  }

  .cell-right {
    // border: #18B566 solid 1rpx;
    border-bottom: 1rpx solid #F2F2F2;
    width: 80%;
    // margin-top: -20rpx;
    margin-left: 10rpx;
    margin-right: 10rpx;
    // margin-bottom: -20rpx;
    padding-bottom: 30rpx;
  }


  .cell-tx {
    width: 16%;
    margin: -20rpx 10rpx 0 10rpx;
    // border: 1px solid #007AFF;
  }

  .cell-name {
    font-size: 34rpx;
    font-weight: 600;
    color: #363D50;
  }

  .cell-name-read {
    font-size: 34rpx;
    font-weight: 600;
    color: #b3b3b3;
  }

  .cell-time {
    font-size: 30rpx;
    color: #898989;
    margin-right: 10rpx;
  }

  .cell-content {
    // font-size: 26rpx;
    // color: #898989;
    width: 100%;
    font-size: 32rpx;
    color: #8A8A8A;
    font-weight: 300;
    // border: 1px solid #007AFF;
  }
</style>
