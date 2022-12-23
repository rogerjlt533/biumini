<template>
  <view>
    <view v-if="!isLogin">
      <HomeLogin @wxlogin="wxlogin()"></HomeLogin>
    </view>

    <view v-else>
      <view v-if="!!userInfo.penName">
        <u-navbar back-text="" title="我的" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft"
          :custom-back="aboutus">
        </u-navbar>

        <!-- 已登陆 -->
        <view class="home-islogin u-f-a">
          <image :src="userInfo.image" mode="aspectFill" style="width: 140rpx;height: 140rpx;" lazy-load>
          </image>

          <image :src="txCamare" model="aspectFit"
            style="width: 50rpx;height: 50rpx; margin-left: -50rpx;margin-top: 90rpx;" @click="handleChangeTx">
          </image>
          <view class="u-f1" @click="findfriend">
            <view class="nickname">{{userInfo.penName}}</view>
            <view class="nickname-sub">ID: {{userInfo.cardno}}</view>
          </view>
          <view v-show="isLogin">
            <!-- <view v-if="!isBiu">
						<u-button shape="circle" @click="toRegister">注册笔友</u-button>
					</view> -->
            <view @click="clickSwitchChecked">
              <u-switch size="54" :disabled="!isAuth" v-model="switchChecked" @change="switchChange" :text="switchText">
              </u-switch>
            </view>
          </view>
        </view>

        <!-- 数据 -->
        <u-sticky :offset-top="height" :enable="sticky.enable" @fixed="fixed" @unfixed="unfixed">
          <view style="background-color: #FFFFFF;">
            <homeData :currIdx="currIdx" :homedata="homedata" :isLogin="isLogin" @click="shiftPage">
            </homeData>
          </view>
        </u-sticky>

        <!-- 个人信息 -->
        <view v-show="currIdx===0" class="home-list">
          <block>
            <HomeUserinfo :isLogin="isLogin" @switchEdit="switchEdit"></HomeUserinfo>
          </block>
        </view>
        <!-- 关注 -->
        <view v-show="currIdx===1">

          <view v-if="guanzhuList.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
            <u-divider>暂无数据</u-divider>
          </view>
          <view class="home-list-content" v-else>
            <block v-for="(item,index) in guanzhuList" :key="index">
              <view :class="index!== guanzhuList.length-1? 'biu-item': 'biu-item-last'">
                <BiuMingpian :isBtmLine="false" :biuXinxi="item" @link2page="toBiuPage1(item)">
                </BiuMingpian>
              </view>
            </block>
          </view>
        </view>
        <!-- 笔友 -->
        <view v-show="currIdx===2">

          <view v-if="biuList.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
            <u-divider>暂无数据</u-divider>
          </view>

          <view class="home-list" v-else>
            <block v-for="(item,index1) in biuList" :key="index1">
              <view style="margin-bottom: 30rpx;">
                <BiuInfo :biuXinxi="item" @link2page.stop="toBiuPage(item)" @reload.stop="reLoadBiuInfo">
                </BiuInfo>
              </view>
            </block>
          </view>
        </view>
        <!-- 设置 -->
        <view v-show="currIdx===3" class="home-list">
          <view style="border: 1px solid rgba(174, 159, 130, 0.11);border-radius: 16rpx;margin: 20rpx;padding:20rpx;">
            <block v-for="(item,index) in homelist" :key="index">
              <homeList :item="item" :index="index" :isLogin="isLogin" :isLast="index===5">
              </homeList>
            </block>
          </view>
          <view style="margin: 30rpx;">
            <view style="margin: 20rpx 30% 0 30%; ">
              <u-button shape="circle" type="primary" @click="logout">退出登录</u-button>
            </view>
            <view class="u-f-ajc home-setting-btn" @click="zhuxiao">
              帐户注销
            </view>
          </view>
        </view>
      </view>

      <view v-else>
        <HomeRegister></HomeRegister>
      </view>
    </view>
  </view>
</template>

<script>
  let systemInfo = uni.getSystemInfoSync();

  import homeList from '../../compoents/home/home-list.vue';
  import homeData from '../../compoents/home/home-data.vue';
  import HomeUserinfo from '../../compoents/home/home-userinfo.vue';
  import BiuMingpian from '../../compoents/home/biu-mingpian.vue';
  import BiuInfo from "../../compoents/home/biu-info.vue";
  import HomeLogin from "../../compoents/home/home-login.vue";
  import HomeRegister from "../../compoents/home/home-register.vue";
  import api from "@/api/api"

  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    components: {
      homeList,
      homeData,
      HomeUserinfo,
      BiuMingpian,
      BiuInfo,
      HomeLogin,
      HomeRegister
    },
    computed: {
      ...mapState({
        isAuth: 'isAuth',
        isLogin: 'isLogin',
        userInfo: 'userInfo'
      }),
      // homedata() {
      // 	let _idx = uni.getStorageSync("msg_to")
      // 	return 
      // }
    },
    data() {
      return {
        txCamare: '../../static/treehole/zhuce-xiangji.png',
        switchChecked: true,
        switchText: ['已暂停', '寻友中'],
        sticky: {
          enable: true,
        },
        srcleft: '../../../static/treehole/my/wd-top-left.png',
        imgsize: 46,
        isInfoEdit: false,
        guanzhuList: [],
        biuList: [],
        homedata: [{
            name: '信息',
            icon: '../../static/treehole/my/wd-xinxi.png',
            url: 'usersetinfo'
          },
          {
            name: '关注',
            icon: '../../static/treehole/my/wd-guanzhu.png',
            url: 'guanzhu'
          },
          {
            name: '笔友',
            icon: '../../static/treehole/my/wd-biu.png',
            url: 'biyou'
          },
          {
            name: '设置',
            icon: '../../static/treehole/my/wd-shezhi.png',
            url: 'setting'
          }
        ],
        homelist: [{
            name: '评论开关',
            desc: '树洞评论功能开关',
            type: 'switch',
            urls: 'pinglun'
          },
          {
            name: '私信开关',
            desc: '站内私信功能开关',
            type: 'switch',
            urls: 'priMsgStatus'
          },
          {
            name: '订阅消息',
            desc: '订阅消息提示开关',
            type: 'navigateTo',
            urls: '../../pages/user/subscribe'
          },
          {
            name: '意见建议',
            desc: '程序功能意见建议',
            type: 'navigateTo',
            urls: '../../pages/user/userhelp'
          },
          {
            name: '关于我们',
            desc: '团队简介、联系我们',
            type: 'navigateTo',
            urls: '../../pages/user/userabout'
          },
          {
            name: '安全提示',
            desc: '安全提示、服务条款、隐私政策',
            type: 'navigateTo',
            urls: '../../pages/user/usersafe'
          },
          {
            name: '黑名单',
            desc: '加入黑名单用户无法查看您的信息',
            type: 'navigateTo',
            urls: '../../pages/user/blacklist'
          }
        ],
        currIdx: uni.getStorageSync("msg_to"),
        height: 44,
        statusBarHeight: systemInfo.statusBarHeight,
      }
    },
    watch: {
      userInfo(val) {
        this.switchChecked = this.userInfo.searchStatus === 1 ? true : false;
      },
      currIdx(val) {
        if (val === 1) {
          const that = this;
          let _url = "/user/collect/list";
          that.$http.post(_url).then(res => {
            let _result = res.data;
            console.info("sunzt:guanzhuList:", _result);
            if (_result.code === 200) {
              that.guanzhuList = _result.data
            } else if (_result.code === 501) {
              console.log("val 1")
              setTimeout(() => {
                uni.hideLoading();
                that.$store.dispatch("Logout")
              }, 800)
            }
          }).catch((err) => {
            let msg = err.message;
            that.$tip.error(msg);
          }).finally(() => {})

        } else if (val === 2) {
          const that = this;
          let _url = "/user/friend/list";
          that.$http.post(_url).then(res => {
            let _result = res.data;
            if (_result.code === 200) {
              that.biuList = _result.data
            } else if (_result.code === 501) {
              console.log("val 2")
              setTimeout(() => {
                uni.hideLoading();
                that.$store.dispatch("Logout")
              }, 800)
            }
          }).catch((err) => {
            let msg = err.message;
            that.$tip.error(msg);
          }).finally(() => {
            // console.info(_url, that.biuList)
          })
        }
      }
    },
    created() {

      api.getNoticeAuthList().then(result => {
        const res = result.data;
        if (res.code === 200) {
          let _tempIds = [];
          for (var i = 0; i < res.data.length; i++) {
            _tempIds.push(res.data[i].value)
          }
          uni.setStorageSync("_tempIds_", _tempIds);
          console.log(uni.getStorageSync("_tempIds_"));
          // uni.requestSubscribeMessage({
          //   tmplIds:  uni.getStorageSync("_tempIds_"),
          //   success(res) {
          //     if (res.errMsg === 'requestSubscribeMessage:ok') {
          //       console.log('订阅成功');
          //     }
          //   },
          //   fail(res) {
          //     console.log("res: " + JSON.stringify(res));
          //     console.log('订阅失败');
          //   }
          // })
        }
      }).catch((err) => {}).finally(() => {})
    },
    onShow() {
      this.currIdx = uni.getStorageSync("msg_to");
      this.reLoadBiuInfo()
    },
    onLoad() {
      console.info("isAuth::", this.isAuth);
      console.info("userInfo.isPenuser::", this.userInfo.isPenuser);

      this.height = this.height + this.statusBarHeight - 1;
      this.switchChecked = this.userInfo.searchStatus === 1 ? true : false;
    },
    methods: {
      ...mapActions(['setUserinfo', 'setToken']),
      reLoadBiuInfo() {
        const that = this;
        let _url = "/user/friend/list";
        that.$http.post(_url).then(res => {
          let _result = res.data;
          if (_result.code === 200) {
            that.biuList = _result.data
          } else if (_result.code === 501) {
            console.log("val 3")
/*  					setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)   */
					}
        }).catch((err) => {
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {})
      },
      wxlogin() {
        uni.showLoading({
          mask: true,
          title: '正在授权登录'
        });
        const that = this;
        uni.login({
          provider: 'weixin',
          success: (res) => {
            let _params = {
              'code': res.code
            };
            that.$http.post("/login/wechat/code", _params).then(res => {
              let _result = res.data;

              if (_result.code === 200) {
                that.$store.dispatch("setToken", _result.data.token)
              }
            }).catch((err) => {
              let msg = "请求出现错误，请稍后再试";
              that.$u.toast(msg)
            }).finally(() => {
              setTimeout(() => {
                uni.hideLoading()
              }, 1000);
            })
          },
          fail: (err) => {
            console.log('login fail:', err);
          }
        });

        that.$nextTick(() => {
          uni.requestSubscribeMessage({
            tmplIds: uni.getStorageSync("_tempIds_"),
            success(res) {
              if (res.errMsg === 'requestSubscribeMessage:ok') {
                console.log('订阅成功');
              }
            },
            fail(res) {
              console.log("res: " + JSON.stringify(res));
              console.log('订阅失败');
            }
          })
        })


      },
      fixed() {
        // this.$u.toast("触发吸顶")
      },
      unfixed() {
        // this.$u.toast("取消吸顶")
      },
      shiftPage(idx) {
        // if (!this.homedata[idx].show) {
        // this.homedata[this.currIdx].show = false;
        // this.homedata[idx].show = true;
        this.currIdx = idx;
        uni.setStorageSync("msg_to", idx)
        // }
      },
      switchEdit() {
        this.isInfoEdit = true;
      },
      clickSwitchChecked() {
        if (!this.isAuth) {
          this.$tip.error('笔友信息未完善');
          setTimeout(() => {
            uni.navigateTo({
              url: '../home/register'
            })
          }, 1000)
        }
      },
      switchChange(e) {
        let that = this;
        let _params = {
          type: "search",
          status: (e ? 1 : 0)
        };
        that.userInfo.searchStatus = _params.status;
        /*request begin*/
        let _url = "/my/update/status";
        that.$http.post(_url, _params).then(res => {
          let _result = res.data;
          if (_result.code === 200) {
            that.$store.dispatch("setUserinfo", that.userInfo)
          } else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
            console.info("res::", res)
          }
        }).catch((err) => {
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {})
        /*request end*/
      },
      zhuxiao() {

        uni.showModal({
          title: '帐户注销',
          content: '请谨慎选择，注销后数据将无法找回！！！',
          success: async (res) => {
            if (res.confirm) {
              uni.showLoading({
                mask: true,
                title: '正在注销'
              });
              setTimeout(() => {
                uni.hideLoading();
                this.$store.dispatch("Logoff")
              }, 800)
            } else if (res.cancel) {

            }
          }
        });




      },
      logout() {
        uni.showLoading({
          mask: true,
          title: '正在退出'
        });
        setTimeout(() => {
          uni.hideLoading();
          this.$store.dispatch("Logout")
        }, 800)
      },
      toBiuPage(record) {
        let _params = record;
        _params.communicate = record.communicateInfo.communicate;
        uni.navigateTo({
          url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
        })
      },
      toBiuPage1(record) {
        let _params = {
          ...record,
          friend: record.id
        };

        uni.navigateTo({
          url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
        })
      },
      handleChangeTx() {
        uni.navigateTo({
          url: "../../pages/user/editTx?params=" + encodeURIComponent(JSON.stringify(this.userInfo))
        })
      },
      aboutus() {
        uni.navigateTo({
          url: "../user/userabout"
        })
      },
      findfriend() {
        let _biu = {
          ...this.userInfo,
          friend: this.userInfo.id,
          name: this.userInfo.penName
        };
        uni.navigateTo({
          url: "../../pages/user/biu?params=" + encodeURIComponent(JSON.stringify(_biu))
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../common/form.css";

  .home-list {
    padding: 20rpx 20rpx;
  }

  .home-islogin {
    margin: 30rpx 10rpx;
    padding: 20rpx 40rpx;
  }

  .home-islogin>image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
    flex-shrink: 0;
    margin-right: 15rpx;
  }

  /* .home-islogin>view:first-of-type>view:nth-child(1) {
		font-size: 32rpx;
	} */

  .home-islogin>view:first-of-type>view:nth-child(2) {
    color: #929292;
  }

  .home-islogin>view:last-of-type {
    height: 100%;
  }

  .biu-item {
    border-bottom: 1px solid #F4F4F4;
    padding: 16rpx 0;
  }

  .biu-item-last {
    padding: 16rpx 0;
  }

  .home-list-content {
    border: 1rpx solid rgba(186, 174, 152, 0.1);
    border-radius: 12rpx;
    padding: 20rpx 40rpx;
    margin: 30rpx;
  }

  .home-setting-btn {
    color: #B3B3B3;
    border-bottom: 1rpx solid #B3B3B3;
    margin: 10rpx 40%;
    font-size: 30rpx;
  }

  .nickname {
    font-size: 38rpx;
    font-weight: bolder;
    color: #363D50;
  }

  .nickname-sub {
    font-size: 32rpx;
    color: #B3B3B3;
  }
</style>
