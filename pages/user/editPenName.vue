<template>
  <view>
    <u-navbar back-text="" title="修改用户名/笔名" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
    </u-navbar>
    <view class="u-edit-b">
      <view class="edit-body">
        <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
          <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="用户名/笔名*" prop="penName"
            :required="true">
            <u-input :inputAlign="inputAlign" placeholder="请输入用户名/笔名" v-model="model.penName" type="text"
              :maxlength="maxlength">
            </u-input>
          </u-form-item>
        </u-form>
      </view>
    </view>

    <view class="u-f-btn">
      <view class="u-f-ajr" style="margin-right: 30rpx;">
        <u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">返回
        </u-button>
        <u-button shape="circleRight" :customStyle="btnRightStyle" @click="submit">
          保存
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapActions
  } from 'vuex';
  export default {
    components: {},
    data() {
      return {
        maxlength: 100,
        srcleft: '../../../static/treehole/my/back.png',
        imgsize: 46,
        inputAlign: 'right',
        labelPosition: 'left',
        errorType: ['message'],
        model: {
          penName: ''
        },
        rules: {
          penName: [{
            required: true,
            message: '请输入笔名',
            trigger: 'blur',
          }, ]
        },
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
        },
      }
    },
    onLoad(event) {
      let _params = event.params || event.payload;
      try {
        var _detail = JSON.parse(decodeURIComponent(_params));
      } catch (error) {
        var _detail = JSON.parse(_params);
      }
      this.model = _detail
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      ...mapActions(['setUserinfo']),
      // 提交
      submit() {
        const that = this;

        if (that.model.penName.length > 10) {
          that.$u.toast("笔名必须10字以内");
          return false
        }

        that.$refs.uForm.validate(valid => {
          if (valid) {
            console.log('验证通过');

            let _url = "/my/update/info";
            let _params = {
              method: "pen_name,nick",
              penName: that.model.penName,
              nick: that.model.penName
            };
            that.$http.post(_url, _params).then(res => {
              let _result = res.data;
              console.info(_result);
              if (_result.code === 200) {
                that.$store.dispatch("setUserinfo", that.model);
                that.goBack();
              } else if (_result.code === 501) {
                setTimeout(() => {
                  uni.hideLoading();
                  that.$store.dispatch("Logout")
                }, 800)
              } else {
                // that.$u.toast(_result.message)
                
                  uni.showToast({
                    icon: 'error',
                    title: data.message,
                    duration: 3000
                  })
              }
            }).catch((err) => {
              let msg = err.message;
              that.$tip.error(msg);
            }).finally(() => {

            })


          } else {
            console.log('验证失败');
          }
        });
      },
      cancel() {
        this.goBack()
      },
      goBack() {
        uni.navigateBack({

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .edit-body {
    margin: 10rpx;
    padding: 10rpx;
  }
</style>
