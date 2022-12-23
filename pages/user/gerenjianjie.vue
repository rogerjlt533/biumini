<template>
  <view>
    <u-navbar back-text="" title="寻友信息" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
    </u-navbar>
    <view class="u-edit-b">
      <view class="edit-body">
        <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
          <u-form-item :label-width="labelWidth" :label-position="labelPosition" prop="title">
            <u-input placeholder="请输入寻友标题*" v-model="model.title" type="text" @input="titleInput"
              :customStyle="customStyleTitle">
            </u-input>
            <view style="text-align: right;color: #CCCCCC;">{{titleWords}}/20</view>
          </u-form-item>
          <u-form-item :label-width="labelWidth" :label-position="labelPosition" prop="introduce">
            <u-input placeholder="请输入寻友详情（例如：平时的喜好、学习的专业、对未来的期盼、当下你想说的话……）" v-model="model.introduce" type="textarea"
              :height="height" @input="introduceInput">
            </u-input>
            <view style="text-align: right;color: #CCCCCC;">{{introduceWords}}/200</view>
          </u-form-item>

          <u-form-item :label-position="labelPosition">
            <u-upload :action="action" :file-list="fileList" :header="header" width="180" height="180" max-count="9"
              @on-remove="uploadRemove" @on-success="uploadSuccess" @on-error="uploadError"></u-upload>

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
  import configService from '@/common/service/config.service.js';
  export default {
    components: {},
    data() {
      return {
        titleWords: 0,
        introduceWords: 0,
        height: 200,
        srcleft: '../../../static/treehole/my/back.png',
        imgsize: 46,
        labelWidth: 180,
        labelPosition: 'top',
        errorType: ['toast'],
        model: {},
        header: {
          'token': uni.getStorageSync("token")
        },
        fileList: [],
        action: configService.apiUrl + '/upload',
        rules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          }],
          introduce: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }]
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
        customStyleTitle: {
          'font-size': '36rpx',
          'color': '#363D50'
        }
      }
    },
    created() {
      // if (this.model.images.length > 0) {
      // 	this.model.images.map((item) => {
      // 		let _temp = {
      // 			url: item
      // 		}
      // 		this.fileList.push(_temp)
      // 	})
      // }
    },
    onLoad(event) {
      let _params = event.params || event.payload;
      try {
        var _detail = JSON.parse(decodeURIComponent(_params));
      } catch (error) {
        var _detail = JSON.parse(_params);
      }
      this.model = _detail;
      if (this.model.title) {
        this.titleWords = this.model.title.length
      }
      if (this.model.introduce) {
        this.introduceWords = this.model.introduce.length
      }

      if (this.model.images.length > 0) {
        this.model.images.map((item) => {
          let _temp = {
            url: item
          };
          this.fileList.push(_temp)
        })
      }
    },
    onReady() {
      this.$refs.uForm.setRules(this.rules);
    },
    methods: {
      titleInput(e) {
        this.titleWords = e.length
      },
      introduceInput(e) {
        this.introduceWords = e.length
      },
      // 提交
      submit() {
        const that = this;

        if (that.titleWords > 20) {
          that.$u.toast("寻友标题不能超过20个字");
          return
        }
        if (that.introduceWords > 200) {
          that.$u.toast("寻友详情不能超过200个字");
          return
        }

        that.$refs.uForm.validate(valid => {
          if (valid) {

            let _images = [];
            that.fileList.map((item) => {
              _images.push(item.url)
            });

            let _url = "/my/update/info";
            let _params = {
              method: "title, introduce, images",
              title: that.model.title,
              introduce: that.model.introduce,
              images: _images.join(",")
            };

            if (_params.images.indexOf("wxfile://") > -1) {
              that.$u.toast("图片正在上传，请稍后");
              return false
            }
            console.info('=======:', that.fileList);

            that.$http.post(_url, _params).then(res => {
              let _result = res.data;
              if (_result.code === 200) {
                that.model.images = _images;
                that.$store.dispatch("setUserinfo", that.model);
                that.goBack()
              } else if (_result.code === 501) {
                setTimeout(() => {
                  uni.hideLoading();
                  that.$store.dispatch("Logout")
                }, 800)
              } else {
                that.$u.toast(_result.message)
              }
            }).catch((err) => {
              let msg = err.message;
              that.$tip.error(msg);
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
      //返回失败
      uploadError(data, index, lists, name){
        console.log("data: " + JSON.stringify(data));
        console.log("index: " + JSON.stringify(index));
        console.log("lists: " + JSON.stringify(lists));
        console.log("name: " + JSON.stringify(name));
      },
      //删除图片后的回调
      uploadRemove(index, lists, name) {
        this.fileList = lists
      },
      /*上传图片 end*/
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

<style>
  .edit-body {
    margin: 10rpx;
    padding: 10rpx;
  }
</style>
