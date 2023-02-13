<template>
  <view style="background-color: #f7f7f7;">
    <!-- <u-navbar back-text="" :title="navbarTitle" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize"
			:srcleft="srcleft" ref="navbar" :custom-back="openSearch"> -->
    <u-navbar back-text="" :title="navbarTitle" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize"
      :srcleft="srcleft" ref="navbar">
      <view class="slot-wrap" v-if="showAction">
        <view class="search-wrap" v-if="showAction">
          <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
          <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"
            @search="globalQuery" @custom="globalQuery">
          </u-search>
        </view>
        <!-- <view class="map-wrap" v-if="custom">
					<u-icon name="map" color="#ffffff" size="24"></u-icon>
					<text class="map-wrap-text">轻舟已过万重山</text>
					<u-icon name="arrow-down-fill" color="#ffffff" size="22"></u-icon>
				</view> -->
      </view>
    </u-navbar>

    <!-- <u-sticky :offset-top="height" :enable="sticky.enable" @fixed="fixed" @unfixed="unfixed"> -->
    <view style="background-color: #f7f7f7; margin: 20rpx 10rpx;">
      <block>
        <u-dropdown ref="uDropdown">
          <u-dropdown-item v-model="qMethod" :title="methodList[qMethod].label" :options="methodList">
          </u-dropdown-item>
          <u-dropdown-item v-model="qCommunicate" :title="communicateList[qCommunicateIndex].label"
            :options="communicateList">
          </u-dropdown-item>
          <u-dropdown-item v-model="qSex" :title="sexList[qSexIndex].label" :options="sexList">
          </u-dropdown-item>
          <u-dropdown-item title="年龄" :isSelect="false">
            <view slot="ageRegion">
              <u-gap></u-gap>
              <slider-range :value="rangeValue" :format="format" @change="handleRangeChange">
              </slider-range>
              <view class="u-f-ajc">
                <u-button type="primary" shape="circle" size="mini" :customStyle="btnLeftStyle" @click="queryResetAges">
                  重置</u-button>
                <view style="width: 100rpx;"></view>
                <u-button type="primary" shape="circle" size="mini" :customStyle="btnRightStyle" @click="queryByAges">
                  确定</u-button>
              </view>
              <u-gap></u-gap>
            </view>
          </u-dropdown-item>
        </u-dropdown>
      </block>
    </view>
    <!-- </u-sticky> -->


    <view>
      <view v-if="biuList.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
        <u-divider bgColor="#f7f7f7">暂无数据</u-divider>
        <view style="background-color: #f7f7f7; height: 2000rpx;"></view>
      </view>
      <!-- <list :loadmoreoffset="loadmoreoffset" :pagingEnabled="pagingEnabled" :scrollable="scrollable"
				:enableBackToTop="enablebacktotop" :offsetAccuracy="offsetAccuracy"> -->
      <block v-for="(item, index) in biuList" :key="index">
        <view class="biu-cell">
          <BiuCell :idx="index" :biuInfo="item" @link2page="toBiuPage(item)"></BiuCell>
        </view>
      </block>
    </view>

    <u-back-top :scroll-top="scrollTop"></u-back-top>

  </view>
</template>

<script>
  let systemInfo = uni.getSystemInfoSync();

  import BiuCell from '../../compoents/home/biu-cell.vue'
  import sliderRange from '../../compoents/common/slider-range.vue'
  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    components: {
      BiuCell,
      sliderRange
    },
    computed: {
      ...mapState({
        isLogin: 'isLogin',
        isAuth: 'isAuth'
      }),
    },
    data() {
      return {
        navbarTitle: 'Biu笔友',
        keyword: '',
        showAction: false,
        scrollTop: 0,
        srcleft: '../../../static/treehole/title-xinquan.png',
        imgsize: 46,
        rangeValue: [0, 60],
        sticky: {
          enable: true,
        },
        height: 44,
        statusBarHeight: systemInfo.statusBarHeight,
        btnLeftStyle: {
          'border': '1rpx solid #AE9F82',
          'background-color': '#FFFFFF',
          'color': '#AE9F82 !important',
          'width': '200rpx',
        },
        btnRightStyle: {
          'border': '1rpx solid #AE9F82',
          'background-color': '#AE9F82',
          'color': '#FFFFFF !important',
          'width': '200rpx',
        },
        loadStatus: "loadmore",
        qMethod: 0, //如果用户完成笔友注册就默认是1，否则就是0
        qCommunicate: 0,
        qCommunicateIndex: 2,
        qSex: 0,
        qSexIndex: 2,
        qAge: "",
        page: 1,
        pageSize: 10,
        methodList: [{
          label: '综合信息',
          value: 0,
        }, {
          label: '系统推荐',
          value: 1,
        }],
        communicateList: [{
            label: '邮寄信件',
            value: 1,
          },
          {
            label: 'E-mail',
            value: 2,
          },
          {
            label: '不限',
            value: 0,
          },
        ],
        sexList: [{
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
          {
            label: '不限',
            value: 0,
          },
        ],
        biuList: [],
        ismore: 1
      }
    },
    methods: {
      openSearch() {
        this.showAction = true
      },
      handleRangeChange(e) {
        this.rangeValue = e
      },
      queryResetAges() {
        this.$refs.uDropdown.close();
        this.rangeValue = [0, 60];
        this.qAge = this.rangeValue[0] + "," + this.rangeValue[1];
        this.loadData();
      },
      queryByAges() {
        this.$refs.uDropdown.close();
        this.qAge = this.rangeValue[0] + "," + this.rangeValue[1];
        this.loadData();
      },
      format(val) {
        return val
      },
      fixed() {
        // this.$u.toast("触发吸顶")
      },
      unfixed() {
        // this.$u.toast("取消吸顶")
      },
      userRead(_relate) {
        //无需关注返回，硬调接口
        const that = this;
        let _url = "/user/read";
        that.$http.post(_url, {
          relate: _relate
        }).then(res => {
          // let _result = res.data
          // if (_result.code === 200) {
          // 	that.$tip.success(msg);
          // }
          if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							// that.$store.dispatch("Logout")
						}, 800)
					}
        }).catch((err) => {
          // let msg = err.message
          // that.$tip.error(msg);
        }).finally(() => {})
      },
      toBiuPage(item) {
        let _params = {
          ...item,
          friend: item.id
        };
        this.userRead(item.id);
        uni.navigateTo({
          url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
        })
      },
      reloadData() {
        this.page = 1;
        this.loadData()
      },
      resetParam() {
        // console.info(" this.isLogin:::", this.isLogin)
        this.qMethod = this.isLogin ? 1 : 0;
        // this.qMethod = 0
        this.qCommunicate = 0;
        this.qAge = '';
        this.qSex = 0
      },
      loadData() {
        uni.showLoading({
          mask: true,
          title: "正在加载"
        });
        let _params = {
          method: this.qMethod,
          last: this.page === 1 ? "" : this.biuList[this.biuList.length - 1].id,
          communicate: this.qCommunicate,
          age: this.qAge,
          sex: this.qSex,
          page: this.page,
          size: this.pageSize
        };
        // console.info("_params:/user/list:", _params)

        const that = this;
        let _url = "/user/list";
        that.$http.post(_url, _params).then(res => {
          let _result = res.data;
          // console.info(_url, _result.data);
          if (_result.code === 200) {
            if (that.page === 1) {
              that.biuList = _result.data.list
            } else {
              that.biuList = that.biuList.concat(_result.data.list)
            }
            that.ismore = _result.data.more
          } else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
        }).catch((err) => {
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {
          uni.hideLoading()
        })
      },
      globalQuery() {
        // console.info(this.keyword)
        this.showAction = false
      }
    },
    watch: {
      showAction(val) {
        if (!val) {
          this.navbarTitle = 'Biu笔友'
        } else {
          this.navbarTitle = ''
        }
      },
      qMethod(val) {
        this.reloadData()
      },
      qCommunicate(val) {
        if (val === 0) {
          this.qCommunicateIndex = 2
        } else if (val === 1) {
          this.qCommunicateIndex = 0
        } else if (val === 2) {
          this.qCommunicateIndex = 1
        }
        this.reloadData()
      },
      qSex(val) {
        if (val === 0) {
          this.qSexIndex = 2
        } else if (val === 1) {
          this.qSexIndex = 0
        } else if (val === 2) {
          this.qSexIndex = 1
        }
        this.reloadData()
      },
      scrollTop(val) {
        this.$refs.uDropdown.close();
      },
      isAuth(val) {
        this.resetParam();
        this.reloadData()
      }
    },
    created() {
      let _token = uni.getStorageSync("token");
      if (!!_token) {
        this.$store.dispatch("setToken", _token)
      }
      if (!this.isAuth) {
        // uni.switchTab({
        // 	url: '../home/home'
        // })
        // } else {
        // console.info("sunztttt::---11111111111")
        // this.resetParam()
        // this.reloadData()
      }
      this.resetParam();
      this.reloadData()
    },
    onLoad() {
      console.info("sunztttt::---");
      this.height = this.height + this.statusBarHeight - 1
    },
    onPullDownRefresh() {
      this.resetParam();
      this.reloadData();
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1200)
    },
    onReachBottom() {
      const that = this;
      if (that.ismore === 1) {
        that.page += 1;
        that.loadData();
        that.loadStatus = "loading";
        setTimeout(() => {
          that.loadStatus = 'loadmore'
        }, 500)
      } else {
        // that.$u.toast("没有更多了")
        that.loadStatus = "nomore"
      }

    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onShow() {
      // if (!this.isAuth) {
      // 	this.resetParam()
      // this.reloadData()
      // 	setTimeout(() => {
      // 		uni.stopPullDownRefresh()
      // 	}, 1200)
      // }
    },
    onShareAppMessage(res) {
      if (res.from === 'button') { // 来自页面内分享按钮
        console.log(res.target)
      }
      return {
        title: '笔友',
        path: '/pages/index/index'
      }
    }

  }
</script>

<style scoped>
  .u-dropdown {
    border: 1rpx solid #F5F5F5;
    border-radius: 30rpx;
    background-color: #FF3333;
  }

  .biu-cell {
    margin: 30rpx;
    padding: 20rpx;
    border: 2rpx solid rgba(186, 174, 152, 0.1);
    border-radius: 16rpx;
    background-color: #FFFFFF;
  }
</style>
