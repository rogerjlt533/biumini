<template>
  <view class="home-big" :style="isLast?'border:none!important;':''">
    <view class="home-list-item u-f-aj u-f-a" hover-stay-time="50" hover-start-time="5" @tap="clickevent(isLogin)">
      <view class="u-f-a">
        <!-- <view v-if="item.icon" class="icon iconfont" :class="['icon-'+item.icon]"></view> -->
        <view>
          <view class="cell-title">{{item.name}}</view>
          <view class="cell-title-sub">{{item.desc}}</view>
        </view>
      </view>
      <view v-if="item.type == 'navigateTo'" class="icon iconfont icon-jinru" style="color:#A9A9A9;font-size: 44rpx;"
        @click="clickevent(isLogin)">
      </view>
      <view v-else-if="item.urls==='pinglun'">
        <u-switch size="54" v-model="commentChecked" @change="switchChange($event, item.urls)" :text="switchText">
        </u-switch>
      </view>
      <view v-else-if="item.urls==='priMsgStatus'">
        <u-switch size="54" v-model="sixinChecked" @change="switchChange($event, item.urls)" :text="switchText">
        </u-switch>
      </view>
      <view v-else-if="item.urls==='subscribeMessage'">
        <u-switch size="54" v-model="gzhChecked" @change="switchChange($event, item.urls)" :text="switchText">
        </u-switch>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    components: {},
    props: {
      isLast: {
        type: Boolean,
        default: false
      },
      item: Object,
      isLogin: Boolean
    },
    computed: {
      ...mapState({
        userInfo: 'userInfo'
      }),
    },
    created() {
      this.commentChecked = this.userInfo.commentStatus === 1 ? true : false;
      this.sixinChecked = this.userInfo.priMsgStatus === 1 ? true : false;
      // this.gzhChecked = this.userInfo.gzhChecked === 1 ? true : false;
    },
    watch: {
      userInfo(val) {
        this.commentChecked = val.commentStatus === 1 ? true : false;
        this.sixinChecked = val.priMsgStatus === 1 ? true : false;
        // this.gzhChecked = val.gzhChecked === 1 ? true : false;
      },
    },
    data() {
      return {
        commentChecked: true,
        sixinChecked: true,
        gzhChecked: false,
        switchText: ['已关闭', '已开启'],
        istab: true
      }
    },
    methods: {
      switchChange(e, urls) {
        let that = this;
        let _params = {};
        let _status = e ? 1 : 0;
        let _userInfo = that.userInfo;
        if (urls === 'pinglun') {
          //type=comment 树洞的评论开关 
          _params = {
            type: "comment",
            status: _status
          };
          _userInfo.commentStatus = _status
        } else if (urls === 'priMsgStatus') {
          //type=priMsgStatus  私信开关 
          _params = {
            type: "private_msg",
            status: _status
          };
          _userInfo.priMsgStatus = _status
        } else if (urls === 'subscribeMessage') {
           
        }
        /*request begin*/
        let _url = "/my/update/status";
        console.info(_url, _params);
        that.$http.post(_url, _params).then(res => {
          let _result = res.data;
          if (_result.code === 200) {
            that.$store.dispatch("setUserinfo", _userInfo)
          } else if (_result.code === 501) {
            setTimeout(() => {
              uni.hideLoading();
              that.$store.dispatch("Logout")
            }, 800)
          } else {
            // that.$u.toast(_url + _result.message)
            console.info(_url + _result.message)
          }
        }).catch((err) => {
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {})
        /*request end*/
      },
      clickevent(isLogin) {
        if (!isLogin) {
          this.$u.toast("请先点击头像登录");
          return
        }

        switch (this.item.type) {
          case 'navigateTo':
            if (this.item.urls) {
              uni.navigateTo({
                url: this.item.urls
              })
            }
            break;
          case 'clear':
            uni.showModal({
              title: '提示',
              content: '是否清除缓存？',
              success: function(res) {
                if (res.confirm) {
                  uni.clearStorage();
                  uni.showToast({
                    title: '清除成功',
                    duration: 1000
                  });
                }
              }
            });
            break;
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../common/form.css";

  .home-big {
    padding: 20rpx;
    /* border-bottom: 1rpx solid #F40000; */
    border-bottom: 1rpx solid #F4F4F4;
  }

  .home-list-item {
    position: relative;
  }

  .home-list-item>view {
    font-size: 32rpx;
  }

  .home-list-item>view:nth-child(1)>view {
    margin-right: 15rpx;
  }
</style>
