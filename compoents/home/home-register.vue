<template>
	<view style="background-color: #F4F4EC; padding-bottom: 200rpx;">
		<u-navbar back-text="" title="注册" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft"
			ref="navbar">
		</u-navbar>

		<view class="u-s-f" style="margin-top: 30rpx;">
			<u-gap></u-gap>
			<view style="text-align: center;">
				<image style="width: 76%;height: 180rpx;" src="../../static/treehole/register-top.png" mode="aspectFit">
				</image>
			</view>

			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

				<view class="uni-flex uni-row">

					<view class="flex-item" style="padding: 26rpx; width: 35%; text-align: right;">
						<!-- <view style="margin: 24rpx;"> -->
						<image :src="txUrl" mode="aspectFill" style="width: 110rpx; height: 110rpx;border-radius: 50%">
						</image>
						<image :src="txCamare" model="aspectFit"
							style="width: 40rpx;height: 40rpx; margin-left: -30rpx;" @click="selectFile">
						</image>
						<!-- </view> -->
					</view>

					<view class="flex-item" style="border: #007AFF 0px solid; width: 65%;">
						<u-form-item :label-position="labelPosition_top" label="笔名/用户名" prop="penName" :required="true">
							<u-input placeholder="朋友请留下您的笔名" v-model="model.penName" type="text" :maxlength="maxlength">
							</u-input>
						</u-form-item>
					</view>
				</view>

				<view style="margin-top: 20rpx;" class="u-f-ajc">
					<u-button shape="circle" type="primary" @click="submit(true)">
						寻找笔友
					</u-button>
					<view style="width: 100rpx;"></view>
					<u-button shape="circle" @click="submit(false)">
						进入树洞
					</u-button>
				</view>

				<view style="text-align: center; margin: 0 -30rpx;">
					<image style="width: 100%;" mode="widthFix" src="http://biuimage.juqihui.cn/login2022329.png">
					</image>
				</view>


				<view class="agreement">
					<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
					<view class="agreement-text">
						您已阅读并同意
						<text class="agreement-xy" @click="handleClickXy(1)">《BIU笔友用户服务协议》</text>
						<text>、</text>
						<text class="agreement-xy" @click="handleClickXy(2)">《BIU隐私权政策》</text>
					</view>
				</view>

			</u-form>



			<!-- <view class="u-f-btn">
				<view class="u-f-ajr" style="margin-right: 50rpx;">
					<u-button shape="circle" :customStyle="btnLeftStyle" @click="preStep">寻找笔友
					</u-button>
					<u-button shape="circle" :customStyle="btnRightStyle" @click="submit">
						进入树洞
					</u-button>
				</view>
			</view> -->

		</view>


		<u-popup v-model="showpopup" mode="center" width="90%" height="90%">
			<view style="background-color: #FFFFFF; padding: 20rpx;">
				<u-parse :html="content"></u-parse>
				<view>
					<u-button type="primary" @click="yhxylook"> 返回 </u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import homeData from '../../compoents/home/home-data.vue';
	import provinces from '../../uview-ui/libs/util/province.js';
	import configService from '@/common/service/config.service.js';
	import test from '@/uview-ui/libs/function/test.js'
	import {
		AQ_CONTENT
	} from "@/common/util/constants"
	import {
		mapState,
		mapActions
	} from 'vuex';

	export default {
		name: 'HomeRegister',
		components: {
			homeData
		},
		computed: {
			...mapState({
				isLogin: 'isLogin',
				userid: 'userid'
			}),
		},
		data() {
			return {
				srcleft: '../../../static/treehole/my/back.png',
				txUrl: '../../static/treehole/biu/touxiang.png',
				txCamare: '../../static/treehole/zhuce-xiangji.png',
				mapImg: '../../static/treehole/zhuce-dingwei.png',
				imgsize: 46,
				model: {
					penName: ''
				},
				pickerShow: false,
				maxlength: 10,
				rules: {
					penName: [{
						required: true,
						message: '请输入笔名',
						trigger: 'blur',
					}]
				},
				yearActionSheetShow: false,
				yearList: [],
				tongxinList: [{
					text: '邮寄信件'
				}, {
					text: 'E-mail'
				}, {
					text: '不限'
				}],
				sexList: [{
					text: '男'
				}, {
					text: '女'
				}, {
					text: '保密'
				}],
				sexMatchList: [{
					text: '男'
				}, {
					text: '女'
				}, {
					text: '不限'
				}],
				labelPosition: 'left',
				labelPosition_top: 'top',
				errorType: ['toast'],
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
					'color': '#363D50',
				},
				colorList: ["#394052", "#FFFFFF"],
				bgColorList: ["#F5F5F5", "#AE9F82"],
				fileList: [],
				fileTemp: "",
				fileUrl: "",
				limitType: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				header: {
					'token': uni.getStorageSync("token")
				},
				action: configService.apiUrl + '/upload',
				check: false,
				agreement: false,
				showpopup: false,
				content: ''
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
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
			// 提交
			submit(isnext) {
				const that = this;

				if (!that.check) {
					that.$u.toast("请勾选协议");
					return
				}
				if (!that.model.penName) {
					that.$u.toast("请输入笔名");
					return
				}

				that.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let _methods = [
							"pen_name",
							"nick",
							"image",
							"match_start_age",
							"match_end_age"
						];
						let _params = that.model;
						_params.method = _methods.join(",");

						_params.nick = that.model.penName;
						_params.image = that.fileUrl;
						_params.startAge = 0;
						_params.endAge = 60;
						_params.source = "hole";
						console.info("register:::", _params);

						that.updateApi(_params, isnext)
					} else {
						console.log('验证失败');
					}
				});


			},
			goBack() {
				uni.navigateBack({

				})
			},
			handleClickXy(idx) {
				if (idx === 1) {
					this.content = AQ_CONTENT[2];
					this.showpopup = true
				} else if (idx === 2) {
					this.content = AQ_CONTENT[1];
					this.showpopup = true
				}
			},
			// 勾选协议
			checkboxChange(e) {
				this.agreement = e.value;
			},
			yhxylook() {
				this.showpopup = false
			},
			updateApi(_params, isnext) {
				const that = this;
				let _url = "/my/update/info";
				that.$http.post(_url, _params).then(res => {
					// console.info(res.data.code);
					if (res.data.code === 200) {
						if (isnext) {
							that.$u.toast("注册成功，继续完善资料");
							uni.navigateTo({
								url: '../../pages/home/register'
							})
						} else {
							that.$u.toast("注册成功");
							uni.reLaunch({
								url: '../../pages/forest/forest'
							})
						}
						let _token = uni.getStorageSync("token");
						that.$store.dispatch("setToken", _token)
					} else if (res.data.code === 501) {
						setTimeout(() => {
						uni.hideLoading();
						that.$store.dispatch("Logout")
						}, 800)
					} else {
						uni.showToast({
							icon: 'error',
							title: res.data.message,
							duration: 3000
						})
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					// that.model.isPenuser = 1
					// that.$store.dispatch("setUserinfo", that.model)
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
	@import "../../common/form.css";

	.agreement {
		display: flex;
		align-items: center;
		margin: 0rpx 20rpx;
		font-size: 30rpx;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}

		.agreement-xy {
			color: #404658;
			text-decoration: underline;
			font-style: italic;
		}
	}


	.touxiang {
		position: absolute;
		left: 0;
		right: 0;
		margin-top: 130rpx;
		margin-left: 50rpx;
	}

	.u-s-f-body {
		padding: 20rpx 20rpx;
		border: 1px solid rgba(174, 159, 130, 0.11);
		border-radius: 16rpx;
	}
</style>
