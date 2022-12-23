<template>
  <view>
    <u-navbar back-text="" title="修改头像" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
    </u-navbar>
    <view class="u-edit-b">
      <view class="edit-body">

        <view class="u-f-aj">
          <view>点击头像修改</view>
          <image :src="txUrl" mode="aspectFill" style="width: 110rpx; height: 110rpx;border-radius: 50%"
            @click="selectFile">
          </image>
        </view>


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
        srcleft: '../../../static/treehole/my/back.png',
        imgsize: 46,
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
        model: {},
        txUrl: '',
        /*图片上传begin*/
        fileList: [],
        fileTemp: "",
        fileUrl: "",
        limitType: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
        header: {
          'token': uni.getStorageSync("token")
        },
        action: configService.apiUrl + '/upload',
        /*图片上传end*/
      }
    },
    created() {

    },
    onLoad(event) {
      let _params = event.params || event.payload;
      try {
        var _detail = JSON.parse(decodeURIComponent(_params));
      } catch (error) {
        var _detail = JSON.parse(_params);
      }
      this.model = _detail;
      this.txUrl = this.model.image
    },
    methods: {
      ...mapActions(['setUserinfo']),
      // 提交
      submit() {
        const that = this;

        let _url = "/my/update/info";
        let _params = {
          method: "image",
          image: that.txUrl
        };
        that.$http.post(_url, _params).then(res => {
          if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
          that.$u.toast("修改成功");
          that.model.image = that.txUrl;
          that.$store.dispatch("setUserinfo", that.model);
          setTimeout(() => {
            uni.navigateBack({

            })
          }, 1500)
        }).catch((err) => {
          let msg = err.message;
          that.$tip.error(msg);
        }).finally(() => {
          that.goBack()
        })

      },
      cancel() {
        this.goBack()
      },
      goBack() {
        uni.navigateBack({

        })
      },
      /*照片上传 begin*/
      selectFile() {
        const sizeType = ['original', 'compressed'];
        // const sourceType =  ['album', 'camera'];
        let chooseFile = null;
        const newMaxCount = 1;
        chooseFile = new Promise((resolve, reject) => {
          uni.chooseImage({
            count: 1,
            sourceType: ['album', 'camera'],
            sizeType: ['original', 'compressed'],
            success: resolve,
            fail: reject
          });
        });
        chooseFile.then(res => {
            let file = null;
            res.tempFiles.map((val, index) => {
              // 检查文件后缀是否允许，如果不在this.limitType内，就会返回false
              if (!this.checkFileExt(val)) {

              } else {
                this.fileTemp = val.path
              }
            });
            this.uploadFile();
          })
          .catch(error => {
            console.info("error::", error)
            // this.$emit('on-choose-fail', error);
          });
      },
      uploadFile() {
        if (!this.fileTemp) {
          return;
        }
        uni.showLoading({
          mask: true,
          title: "图片上传中..."
        });
        // console.info("this.action:::", this.action) 
        uni.uploadFile({
          url: this.action,
          filePath: this.fileTemp,
          name: "file",
          header: this.header,
          success: res => {
						uni.hideLoading();
            // 判断是否json字符串，将其转为json格式
            let data = this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
            if (![200, 201, 204].includes(res.statusCode)) {
              this.$u.toast('上传失败，请重试');
              this.fileUrl = ""
            } else if (data.code === 503) {
              uni.showToast({
                icon: 'error',
                title: data.message,
                duration: 3000
              })
            } else {
              // 上传成功 
              console.info("上传成功::", data);
              this.fileUrl = data.data.url;
              this.txUrl = data.data.url
            }
          },
          fail: e => {
						uni.hideLoading();
            this.$u.toast('上传失败，请重试');
            this.fileUrl = ""
          },
          complete: res => {
            // uni.hideLoading();
            // this.uploading = false;
            // this.uploadFile(index + 1);
            // this.$emit('on-change', res, index, this.lists, this.index);
          }
        });
      },
      // 判断文件后缀是否允许
      checkFileExt(file) {
        // 检查是否在允许的后缀中
        let noArrowExt = false;
        // 获取后缀名
        let fileExt = '';
        const reg = /.+\./;
        fileExt = file.path.replace(reg, "").toLowerCase();
        // 使用数组的some方法，只要符合limitType中的一个，就返回true
        noArrowExt = this.limitType.some(ext => {
          // 转为小写
          return ext.toLowerCase() === fileExt;
        });
        if (!noArrowExt) this.$u.toast(`不允许选择${fileExt}格式的文件`);
        return noArrowExt;
      }
      /*照片上传 end*/
    }
  }
</script>

<style scoped lang="scss">
  .edit-body {
    margin: 10rpx;
    padding: 10rpx;
  }
</style>
