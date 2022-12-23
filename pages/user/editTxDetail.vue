<template>
  <view>
    <u-navbar back-text="" title="通信详情" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
    </u-navbar>

    <view class="u-edit-b">
      <view class="u-f-aj u-f-a-title">
        <view>通信方式</view>
        <view style="margin-right: 20rpx;font-weight: 400;font-size: 30rpx;">
          <u-input :inputAlign="inputAlign" v-model="model.communicates.tag" type="select"
            @click="tongxinAcitonSheetShow = true"></u-input>
        </view>
      </view>
    </view>
    <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
      <view class="u-f-aj u-f-a-title" style="margin: 10rpx 30rpx;" v-show="model.communicates.value!==2">
        <view style="margin-left: 16rpx;">邮寄信件</view>
        <view style="color: #CCCCCC;font-size: 26rpx!important; margin-right: 20rpx;font-weight: 100;">
          平台将保护您信息安全
        </view>
      </view>
      <view class="u-edit-b" v-show="model.communicates.value!==2">

        <view class="edit-body">

          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*收件人">
            <u-input :inputAlign="inputAlign" placeholder="请输入收件人姓名" v-model="model.username" type="text">
            </u-input>
          </u-form-item>

          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="联系电话">
            <u-input :inputAlign="inputAlign" placeholder="请输入联系电话" v-model="model.phone" type="text">
            </u-input>
          </u-form-item>

          <!-- <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="省市区">
						<u-input :inputAlign="inputAlign" placeholder="" v-model="district" type="select"
							@click="pickerShow=true">
						</u-input>
					</u-form-item> -->

          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*所在地区" :rightIcon="false">
            <u-input :inputAlign="inputAlign" placeholder="请选择所在地区" v-model="model.address" type="text">
            </u-input>
            <image slot="right" :src="mapImg" mode="heightFix" style="height:38rpx;width:38rpx;" @click="toMap">
            </image>
          </u-form-item>
          <!-- <u-input :inputAlign="inputAlign" placeholder="请选择所在地区" v-model="model.district"
						type="text"> -->

          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*详细地址">
            <u-input :inputAlign="inputAlign" placeholder="请输入详细地址" v-model="model.street" type="text">
            </u-input>
          </u-form-item>

          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*邮政编码">
            <u-input :inputAlign="inputAlign" placeholder="请输入邮政编码" v-model="model.zipcode" type="text">
            </u-input>
          </u-form-item>
        </view>
      </view>

      <view class="u-f-aj u-f-a-title" style="margin: 10rpx 30rpx;" v-show="model.communicates.value!==1">
        <view style="margin-left: 16rpx;">E-mail</view>
        <view style="color: #CCCCCC;font-size: 26rpx!important; margin-right: 20rpx;font-weight: 100;">
          平台将保护您信息安全
        </view>
      </view>
      <view class="u-edit-b" v-show="model.communicates.value!==1">
        <view class="edit-body">
          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*邮箱账号" :borderBottom="false">
            <u-input :inputAlign="inputAlign" placeholder="请输入邮箱账号" v-model="model.email" type="text">
            </u-input>
          </u-form-item>
        </view>
      </view>
    </u-form>
    <!-- <u-picker v-model="pickerShow" mode="region" @confirm="pickerConfirm"></u-picker> -->
    <view class="u-f-btn">
      <view class="u-f-ajr" style="margin-right: 30rpx;">
        <u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">返回
        </u-button>
        <u-button shape="circleRight" :customStyle="btnRightStyle" @click="submit">
          保存
        </u-button>
      </view>
    </view>


    <u-action-sheet :list="tongxinList" v-model="tongxinAcitonSheetShow" @click="tongxinAcitonSheetCallback">
    </u-action-sheet>

  </view>
</template>

<script>
  import test from '@/uview-ui/libs/function/test.js'
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    components: {},
    computed: {
      // ...mapGetters({
      // 	userInfo: 'userInfo'
      // })
    },
    data() {
      return {
        srcleft: '../../../static/treehole/my/back.png',
        mapImg: '../../static/treehole/zhuce-dingwei.png',
        imgsize: 46,
        inputAlign: 'right',
        labelPosition: 'left',
        errorType: ['message'],
        rules: {
          // username: [{
          // 	required: true,
          // 	message: '请输入真实姓名',
          // 	trigger: 'blur',
          // }],
          // phone: [{
          // 	required: true,
          // 	message: '请输入联系电话',
          // 	trigger: 'blur',
          // }],
          // district: [{
          // 	required: true,
          // 	message: '请选择所在地区',
          // 	trigger: 'change',
          // }],
          // address: [{
          // 	required: true,
          // 	message: '请输入详细地址',
          // 	trigger: 'blur',
          // }],
          // email: [{
          // 	required: true,
          // 	message: '请输入邮箱账号',
          // 	trigger: 'blur',
          // }]
        },
        model: {},
        // pickerShow: false,
        // district: "",
        tongxinList: [{
          text: '邮寄信件'
        }, {
          text: 'E-mail'
        }, {
          text: '不限'
        }],
        tongxinAcitonSheetShow: false,
        btnLeftStyle: {
          'border': '1rpx solid #AE9F82',
          'background-color': '#FFFFFF',
          'color': '#AE9F82 !important',
          'width': '200rpx'
        },
        btnRightStyle: {
          'border': '1rpx solid #AE9F82',
          'background-color': '#AE9F82',
          'color': '#FFFFFF !important',
          'width': '200rpx'
        }
      }
    },
    onLoad(event) {
      let _params = event.params || event.payload;
      try {
        var _detail = JSON.parse(decodeURIComponent(_params));
      } catch (error) {
        var _detail = JSON.parse(_params);
      }
      this.model = _detail;

      // this.district = this.model.province.name + "-" +
      // 	this.model.city.name + "-" +
      // 	this.model.country.name;
      // this.model.district = this.district
    },
    onReady() {
      // this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      tongxinAcitonSheetCallback(index) {
        uni.hideKeyboard();
        this.model.communicates.value = index + 1;
        this.model.communicates.tag = this.tongxinList[index].text;
      },
      customCheck(communicates) {
        if (communicates === 1) {
          if (!this.model.username || !this.model.address || !this.model.zipcode) {
            this.$u.toast("请完善邮寄信息！");
            return false
          }
        }
        if (communicates === 2) {
          if (!this.model.email) {
            this.$u.toast("请填写E-mail地址！");
            return false
          }
        }
        if (communicates === 3) {
          if (!this.model.username || !this.model.address || !this.model.zipcode) {
            this.$u.toast("请完善邮寄信息！");
            return false
          }
          if (!this.model.email) {
            this.$u.toast("请填写E-mail地址！");
            return false
          }
        }
        return true;
      },
      // 提交
      submit() {
        const that = this;
        if (!that.customCheck(that.model.communicates.value)) {
          return
        }

        if (that.model.communicates.value === 1 || that.model.communicates.value === 3) {
          if (!that.model.username) {
            that.$u.toast("请输入真实姓名");
            return
          }
          if (!that.model.phone) {

          } else {
            if (!test.mobile(that.model.phone) && !test.landline(that.model.phone)) {
              that.$u.toast("输入正确的手机号或者座机号");
              return false
            }
          }

          if (!that.model.address) {
            that.$u.toast("请输入详细地址");
            return
          }
          if (!that.model.zipcode) {
            that.$u.toast("请输入邮政编码");
            return
          }
        }
        if (that.model.communicates.value === 2 || that.model.communicates.value === 3) {
          if (!that.model.email) {
            that.$u.toast("请输入E-mail");
            return
          }
          if (!test.email(that.model.email)) {
            that.$u.toast("E-mail格式错误！");
            return false
          }
        }

        let _url = "/my/update/info";
        let _params = {
          method: "username,phone,address,street,email,communicate,zipcode",
          username: that.model.username,
          phone: that.model.phone,
          address: that.model.address,
          street: that.model.street,
          zipcode: that.model.zipcode,
          email: that.model.email,
          communicates: that.model.communicates.value
        };
        // console.info("sunzt::Params::", _params);

        uni.showLoading({
          mask: true,
          title: "正在提交中..."
        });

        that.$http.post(_url, _params).then(res => {
          uni.hideLoading();
          if (res.data.code === 200) {
            that.$store.dispatch("setUserinfo", that.model);
            that.goBack()
          } else if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else if (res.data.code === 503) {
            uni.showToast({
              icon: 'error',
              title: res.data.message,
              duration: 3000
            })
          } else {
            that.$u.toast(res.data.message)
          }
        }).catch((err) => {
          uni.hideLoading();
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {})
        // } else {
        // 	console.log('验证失败');
        // }
        // });
      },
      cancel() {
        this.goBack()
      },
      goBack() {
        uni.navigateBack({

        })
      },
      toMap() {
        const that = this;
        uni.chooseLocation({
          success: function(res) {
            console.log('位置名称：' + res.name);
            console.log('详细地址：' + res.address);
            // console.log(JSON.stringify(res));

            that.model.address = res.address;
            that.model.street = res.name
          }
        });
      },
      // pickerConfirm(e) {
      // 	this.district = e.province.label + '-' + e.city.label + '-' + e.area.label;
      // 	this.model.province.name = e.province.label;
      // 	this.model.city.name = e.city.label;
      // 	this.model.country.name = e.area.label;

      // 	this.model.province.code = e.province.value;
      // 	this.model.city.code = e.city.value;
      // 	this.model.country.code = e.area.value;

      // 	this.model.district = this.district
      // }
    }
  }
</script>

<style scoped lang="scss">
  .edit-body {
    margin: 10rpx;
    padding: 10rpx;
  }
</style>
