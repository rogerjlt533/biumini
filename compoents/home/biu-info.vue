<template>
	<view class="body">
		<view class="mingpian u-f-a">
			<view class="mingpian-tx">
				<u-image shape="circle" :src="biuXinxi.image" :width="imgSize" :height="imgSize"></u-image>
			</view>
			<view @click="handleLink">
				<view style="display: flex; margin: auto auto 0 10rpx;">
					<view>
						<u-image :src="biuImgList[biuXinxi.communicateInfo.communicate]" mode="heightFix"
							height="34rpx"></u-image>
					</view>
					<view class="mingpian-nn">{{biuXinxi.name}}</view>
				</view>
				<view class="mingpian-jj" style="margin: -4rpx auto 0 10rpx;">
					{{biuXinxi.desc}}
				</view>
			</view>
			<view style="margin: 10rpx 20rpx 10rpx auto;">
				<!-- <u-image :src="deleteUrl" mode="heightFix" height="42rpx" @click="deleteFriend"></u-image> -->
				<u-image :src="sixinUrl[biuXinxi.priMsgStatus]" mode="heightFix" height="42rpx" @click="sixinFriend">
				</u-image>
			</view>
		</view>

		<view class="tongxin">
			<view v-if="biuXinxi.communicateInfo.communicate === 1 || biuXinxi.communicateInfo.communicate === 3">
				<view class="u-f-a-title">通信信息</view>
				<view class="cell-title-1">
					<view class="cell-title">收件人</view>
					<view class="cell-title-sub" @longpress="copy(biuXinxi.communicateInfo.info.name)">
						{{biuXinxi.communicateInfo.info.name}}
					</view>
				</view>
				<view class="cell-title-1">
					<view class="cell-title">联系电话</view>
					<view class="cell-title-sub" @longpress="copy(biuXinxi.communicateInfo.info.phone)">
						{{biuXinxi.communicateInfo.info.phone}}
					</view>
				</view>
				<view class="cell-title-1">
					<view class="cell-title">通信地址</view>
					<view class="cell-title-sub" @longpress="copy(biuXinxi.communicateInfo.info.address)">
						{{biuXinxi.communicateInfo.info.address}}
					</view>
				</view>
				<view class="cell-title-1">
					<view class="cell-title">邮政编码</view>
					<view class="cell-title-sub" @longpress="copy(biuXinxi.communicateInfo.info.zipcode)">
						{{biuXinxi.communicateInfo.info.zipcode}}
					</view>
				</view>
			</view>

			<view v-if="biuXinxi.communicateInfo.communicate === 2 || biuXinxi.communicateInfo.communicate === 3">
				<view class="cell-title-1">
					<view class="cell-title">E-mail</view>
					<view class="cell-title-sub" @longpress="copy(biuXinxi.communicateInfo.info.email)">
						{{biuXinxi.communicateInfo.info.email}}
					</view>
				</view>
			</view>

			<view style="display: flex; margin-top: 20rpx;" @click="link2HisList">
				<view class="u-f-a-title">邮寄通知</view>
				<view class="u-f-ajc" style="margin: auto 20rpx auto auto;">
					<u-image :src="arrowRightUrl" width="26.6rpx" height="49.7rpx"></u-image>
				</view>
			</view>

			<view style="margin-top: 20rpx;">
				<view class="send-tip" v-if="letter.logId">
					<view class="send-tip-1">
						<u-image :src="tipImaList[biuXinxi.communicateInfo.communicate]" mode="heightFix"
							height="40rpx">
						</u-image>
					</view>
					<view class="send-tip-2">{{letter.label}}</view>
					<view class="send-tip-3">{{letter.time}}</view>
				</view>
			</view>

			<view style="margin-top: 20rpx;" class="u-f-ajc">
				<u-button shape="circle" @click="mail2send">
					<image :src="btnImgList[0]" style="height: 29.4rpx; width: 42rpx;margin-right: 10rpx;"
						mode="aspectFit"></image>
					{{biuXinxi.communicateInfo.sendTag}}
				</u-button>
				<view style="width: 40rpx;"></view>
				<u-button shape="circle" type="primary" @click="mail2receive">
					<image :src="btnImgList[1]" style="height: 43.4rpx; width: 42rpx;margin-right: 10rpx;"
						mode="aspectFit"></image>
					{{biuXinxi.communicateInfo.receiveTag}}
				</u-button>
			</view>
		</view>

		<!-- <u-modal v-model="confirm.show" :zoom="false" :showCancelButton="true" :content="confirm.content"
			@confirm="deleteFriend" :cancelStyle="cancelStyle" :confirmStyle="confirmStyle">
		</u-modal> -->

	</view>
</template>

<script>
	export default {
		name: 'BiuInfo',
		props: {
			biuXinxi: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				// confirm: {
				// 	show: false,
				// 	content: "确定删除笔友吗?"
				// },
				arrowRightUrl: '../../../static/treehole/biu/jiantou-right.png',
				deleteUrl: '../../../static/treehole/hmd-delete.png',
				sixinUrl: [
					'../../../static/bar-xinxi-0.png',	
					'../../../static/bar-xinxi-1.png'
				],
				imgSize: '80rpx',
				biuImgList: [
					"../../../static/treehole/biu/biu-xinjian.png",
					"../../../static/treehole/biu/biu-email-and-xj.png",
					"../../../static/treehole/biu/biu-email.png"
				],
				tipImaList: [
					"../../../static/treehole/biu/wd-biu-yfc-small.png",
					"../../../static/treehole/biu/wd-biu-yfc-small.png",
					"../../../static/treehole/biu/biu-email-and-xj.png",
					"../../../static/treehole/biu/biu-email.png"
				],
				tipImaListIndex: 0,
				btnImgList: [
					"../../static/treehole/biu/wd-biu-yfc-small.png",
					"../../static/treehole/biu/wd-biu-emal-sd.png"
				],
				letter: {
					logId: '',
					time: '',
					label: ''
				},
				// cancelStyle: {
				// 	'border': '1px solid #AE9F82',
				// 	'background-color': '#FFFFFF',
				// 	'border-radius': '30rpx',
				// 	'color': '#AE9F82 !important',
				// 	'width': '200rpx',
				// 	'margin-left': '70rpx'
				// },
				// confirmStyle: {
				// 	'border': '1px solid #AE9F82',
				// 	'background-color': '#AE9F82',
				// 	'border-radius': '30rpx',
				// 	'color': '#FFFFFF !important',
				// 	'width': '200rpx',
				// 	'margin-right': '70rpx'
				// }
			}
		},
		created() {
			this.letter.label = this.biuXinxi.communicateInfo.label;
			this.letter.time = this.biuXinxi.communicateInfo.logTime;
			this.letter.logId = this.biuXinxi.communicateInfo.logId;
			// console.info("createdddddd:::", this.biuXinxi)
		},
		methods: {
			handleLink() {
				this.$emit("link2page")
			},
			copy(value) {
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: () => { //复制成功的回调函数 
						this.$u.toast("复制成功")
					}
				});
			},
			deleteFriend() {
				uni.showModal({
					title: '提示',
					content: '您确定要删除笔友吗？',
					success: async (res) => {
						if (res.confirm) {
							console.info("您确定要删除笔友吗", this.biuXinxi);
							let _params = {
								method: "cancel",
								friend: this.biuXinxi.friend
							};
							this.deleteFriendMethod(_params)
							// this.$u.toast("已经删除笔友!")
						} else if (res.cancel) {}
					}
				});
			},
			sixinFriend() {
				console.info("biuXinxi:4.26..:", this.biuXinxi.priMsgStatus);
				if (this.biuXinxi.priMsgStatus === 1) {
					const _params = this.biuXinxi;
					uni.navigateTo({
						url: '../../pages/msg/sixin?params=' + encodeURIComponent(JSON.stringify(_params))
					})
				} else {
					this.$u.toast("对方未开启私信")
				}

				// uni.showModal({
				// 	title: '提示',
				// 	content: '您确定要删除笔友吗？',
				// 	success: async (res) => {
				// 		if (res.confirm) {
				// 			console.info("您确定要删除笔友吗", this.biuXinxi);
				// 			let _params = {
				// 				method: "cancel",
				// 				friend: this.biuXinxi.friend
				// 			};
				// 			this.deleteFriendMethod(_params)
				// 			// this.$u.toast("已经删除笔友!")
				// 		} else if (res.cancel) {}
				// 	}
				// });
			},
			deleteFriendMethod(_params) {
				const that = this;
				let _url = "/user/friend/apply";
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					console.info(_result)
					if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message;
					console.info("error:", msg)
				}).finally(() => {
					that.$emit("reload")
				})
			},
			link2HisList() {
				uni.navigateTo({
					url: "../../pages/msg/hislist?params=" + encodeURIComponent(JSON.stringify(this.biuXinxi))
				})
			},
			mail2send() {
				uni.showModal({
					title: '提示',
					content: '您确定已发送信件吗？',
					success: async (res) => {
						if (res.confirm) {
							let _params = {
								method: "send",
								friend: this.biuXinxi.id
							};
							this.send7receive(_params)
						} else if (res.cancel) {}
					}
				});
			},
			mail2receive() {
				uni.showModal({
					title: '提示',
					content: '您确定已接收信件吗？',
					success: async (res) => {
						if (res.confirm) {
							let _params = {
								method: "receive",
								friend: this.biuXinxi.id
							};
							this.send7receive(_params)
						} else if (res.cancel) {}
					}
				});
			},
			send7receive(_params) {
				const that = this;
				let _url = "/user/friend/letter";
				uni.showLoading({
					mask: true,
					title: _params.method === "send" ? "正在寄送" : "正在接收"
				});
				// console.info(_url, _params)
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					// console.info(_url, _result)
					uni.hideLoading();
					if (_result.code === 200) {
						that.letter.logId = _result.data.log;
						that.letter.time = _result.data.time;
						that.letter.label = _result.data.label;
						let _success_msg = _params.method === "send" ? "寄送成功" : "接收成功";
						that.$u.toast(_success_msg)
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(_result.message)
					}
				}).catch((err) => {
					uni.hideLoading();
					let msg = err.message;
					console.info("err::", msg)
				}).finally(() => {})
			}
		}

	}
</script>

<style scoped>
	.body {
		margin: 5rpx;
		border: 1rpx solid rgba(186, 174, 152, 0.1);
		border-radius: 12rpx;
	}

	.tongxin {
		margin: 10rpx;
		padding: 10rpx;
	}

	.mingpian {
		margin: 10rpx;
		padding: 10rpx;
		/* background-color: #F7F7F7; */
		display: flex;
	}

	.mingpian-tx {
		margin: 10rpx;
	}

	.mingpian-nn {
		color: #363D50;
		font-size: 32rpx;
		font-weight: 600;
		margin: -8rpx 10rpx;
	}

	.mingpian-jj {
		color: #B3B3B3;
		font-size: 28rpx;
		/* margin: -8rpx 10rpx; */
	}

	.cell-title-1 {
		/* padding: 10rpx; */
		margin-left: 20rpx;
		margin-top: 17rpx;
		padding-bottom: 20rpx;
		/* border: 1rpx solid #FF0000; */
		border-bottom: 1rpx solid #F2F2F2;
	}


	.cell-title {
		font-size: 32rpx;
		margin-bottom: 5rpx;
		color: #363D50;
	}

	.cell-title-sub {
		font-size: 30rpx;
		color: #B3B3B3;
	}

	.send-tip {
		display: flex;
		background-color: #F7F7F7;
		padding: 16rpx;
		width: 100%;
	}

	.send-tip-1 {
		margin: auto 10rpx;
	}

	.send-tip-2 {
		margin: 20rpx 5rpx;
		font-size: 30rpx;
	}

	.send-tip-3 {
		margin: 20rpx 5rpx 20rpx auto;
		font-size: 30rpx;
	}
</style>
