<template>
  <view>
    <u-navbar back-text="" title="意见建议" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
    </u-navbar>


    <view class="m-body">
      <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

        <view class="u-f-a-title">感谢您的意见与建议！</view>
        <view class="u-s-f-body">

          <view class="u-f-a-title-sub" style="margin: 10rpx;">所属类别</view>
          <view style="display: flex; ">
            <u-tag style="margin: 5rpx;" :bgColor="item.selected?'#AE9F82':'#EDEDED'"
              :borderColor="item.selected?'#AE9F82':'#EDEDED'" :color="item.selected?'#FFFFFF':'#363D50'"
              v-for="(item,index) in tag.list" :text="item.title" shape="circle" :key="item.id" size="large"
              mode="plain" @click="clickTag(item)" />
          </view>
          <u-line></u-line>

          <u-form-item :borderBottom="false" :label-position="labelPosition" prop="content">
            <u-input height="300" type="textarea" borderColor="#EDEDED" :border="false" placeholder="请输入您的意见与建议"
              v-model="model.content" />
          </u-form-item>
          <u-line></u-line>


          <u-form-item :borderBottom="false" :label-position="labelPosition">
            <u-upload :action="action" :file-list="fileList" :header="header" width="170" height="170" max-count="9"
              @on-remove="uploadRemove" @on-success="uploadSuccess"></u-upload>

            <!-- <u-upload index="0" @on-success="uploadSuccess" @on-remove="uploadRemove" :form-data="formData"
								max-count="9" :action="action" :file-list="fileList" :show-tips="false" uploadText="上传"
								width="160" height="160" :header="header">
							</u-upload> -->
          </u-form-item>

        </view>
      </u-form>
    </view>

    <u-toast ref="uToast" />

    <view class="u-f-btn">
      <view class="u-f-ajc">
        <!-- 	<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">返回
				</u-button> -->
        <u-button :disabled="disabled" shape="circle" :customStyle="btnRightStyle" @click="submit">
          确定发送
        </u-button>
      </view>
    </view>

  </view>
</template>

<script>
  import configService from '@/common/service/config.service.js';
  export default {
    components: {},
    data() {
      return {
        srcleft: '../../../static/treehole/my/back.png',
        imgsize: 46,
        model: {
          content: ''
        },
        rules: {
          content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          }, ]
        },
        labelPosition: 'top',
        errorType: ['toast'],
        fileList: [],
        header: {
          'token': uni.getStorageSync("token")
        },
        action: configService.apiUrl + '/upload',
        tag: {
          currIdx: 2,
          list: [{
              id: 0,
              title: '服务建议',
              bgcolor: '',
              selected: false
            },
            {
              id: 1,
              title: '意见投诉',
              bgcolor: '',
              selected: false
            },
            {
              id: 2,
              title: '其他',
              selected: true
            },
            {
              id: 3,
              title: '举报',
              selected: false
            }
          ]
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
          'width': '300rpx'
        },
        disabled: false,
        jubaoid: ''
      }
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    onLoad(event) {
      let _params = event.params || event.payload;
      if (!!_params) {
        try {
          var _detail = JSON.parse(decodeURIComponent(_params));
        } catch (error) {
          var _detail = JSON.parse(_params);
        }
        this.jubaoid = _detail.id;
        console.info("this.jubaoid:::", this.jubaoid);
        this.tag.currIdx = 3;
        this.tag.list[2].selected = false;
        this.tag.list[3].selected = true
      } else {
        this.tag.list.splice(3, 1)
      }
    },
    methods: {
      clickTag(item) {
        if (!item.selected) {
          this.tag.list[this.tag.currIdx].selected = false;
          this.tag.list[item.id].selected = true;
          this.tag.currIdx = item.id
        }
      },
      goBack() {
        uni.navigateBack({

        })
      },
      cancel() {
        this.goBack()
      },
      submit() {
        const that = this;

        // that.$http.get("/bigscreen/loaddata").then(res => {
        // 	console.info(res)
        // }).catch((err) => {
        // 	let msg = err.data.message 
        // 	that.$tip.alert(msg);
        // }).finally(() => {})

        that.$refs.uForm.validate(valid => {
          if (valid) {
            let _images = [];
            that.fileList.map((item) => {
              _images.push(item.url)
            });
            let _params = {
              type: that.tag.list[that.tag.currIdx].id + 1,
              relate: that.jubaoid,
              content: that.model.content,
              images: _images.join(",")
            };

            that.disabled = true;

            let _url = "/user/report";
            that.$http.post(_url, _params).then(res => {
              let _result = res.data;
              if (_result.code === 200) {
                that.$refs.uToast.show({
                  title: '感谢您的意见建议',
                  back: true
                })
              } else if (_result.code === 501) {
                setTimeout(() => {
                  uni.hideLoading();
                  that.$store.dispatch("Logout")
                }, 800)
              } else {
                uni.showToast({
                  icon: 'error',
                  title: data.message,
                  duration: 3000
                });
                console.info(url, _result.message)
              }
              // that.$u.toast("发送成功")
            }).catch((err) => {
              let msg = err.message;
              console.info(_url, msg)
              // that.$tip.error(msg);
            }).finally(() => {})

          } else {
            console.log('验证失败');
          }
        });
      },
      /*上传图片 begin*/

      //图片上传成功回调
      uploadSuccess(data, index, lists, name) {
        if (data.code === 200) {
          lists[index].url = data.data.url;
          this.fileList = lists;
          console.log("this.fileList::", this.fileList)
        }
      },
      //删除图片后的回调
      uploadRemove(index, lists, name) {
        this.fileList = lists
      },

      /*上传图片 end*/
    }
  }
</script>

<style>
  @import "../../common/form.css";

  .m-body {
    margin: 20rpx;
    padding: 0 10rpx;
  }

  .u-f-a-title {
    color: #363D50;
    /* color: #FF0000; */
    font-size: 34rpx;
    font-weight: bolder;
    /* padding: 20rpx; */
    margin: 40rpx;
    /* border: 1rpx solid #FF0000; */
  }

  .u-s-f-body {
    margin: 20rpx;
    padding: 10rpx 20rpx;
    border: 1px solid rgba(174, 159, 130, 0.11);
    border-radius: 16rpx;
  }

  .u-f-a-cell-title {
    font-size: 28rpx;
    color: #363D50;
  }
</style>
