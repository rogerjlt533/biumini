<template>
	<view>
		<u-navbar back-text="" :title="navtitle" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize"
			:srcleft="srcleft">
		</u-navbar>

		<view style="margin: 20rpx 40rpx;padding: 20rpx;">

			<view class="xinxi-title">
				{{xinxi.title}}
			</view>
			<view class="xinxi-time">
				{{xinxi.showTime}}
			</view>
			<view class="xinxi-content">
				{{xinxi.content}}
			</view>
			<view v-if="xinxi.useFriendApply === 1">
				<view style="color: #808080;font-size: 32rpx; margin-bottom: 40rpx;"
					@longpress="copyBiuInfo(xinxi.friendApply.info)"
					v-if="xinxi.friendApply.allowAuth===0 && xinxi.friendApply.status===1">
					<block v-for="(item, index) in xinxi.friendApply.info" :key="index">
						<view>{{item.name}}：{{item.value}}</view>
					</block>
				</view>

				<view style="background-color: #F7F7F7;">
					<BiuMingpian :biuXinxi="xinxi.friendApply" @link2page="toBiuPage1(xinxi.friendApply)"></BiuMingpian>
				</view>
			</view>

			<!-- <view class="u-f-btn" v-if="xinxi.friendApply.allowAuth===1 && xinxi.friendApply.user !== userInfo.id"> -->
			<view class="u-f-btn" v-if="xinxi.friendApply.allowAuth===1">
				<view class="u-f-ajr" style="margin-right: 30rpx;">
					<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">谢 绝
					</u-button>
					<u-button shape="circleRight" :customStyle="btnRightStyle" @click="confirm">
						加为笔友
					</u-button>
				</view>
			</view>

			<view v-if="xinxi.images.length>0">
				<block v-for="(item,index) in xinxi.images" :key="index">
					<image style="width: 100%;margin: 5rpx 0;" mode="widthFix" :src="item"></image>
				</block>
			</view>

		</view>
	</view>
</template>

<script>
	import BiuMingpian from '../../compoents/home/biu-mingpian.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			BiuMingpian
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		data() {
			return {
				navtitle: '通知',
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
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
				xinxi: {

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
			this.xinxi = _detail;
			console.info("jjjjjjjjjjjj", this.xinxi);
			// console.info("hhhhhhhhhhhh", this.userInfo.id)
			// this.xinxi.content = "";
			this.navtitle = _detail.messageTag

			// if (this.xinxi.readStatus === 0) {
			// 	this.hasReaded(this.xinxi.id)
			// }
		},
		methods: {
			toBiuPage1(record) {
				let _params = {
					...record
					// friend: record.user
				};
				console.info("220107::", _params);
				uni.navigateTo({
					url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
				})
			},
			confirm() {
				if (this.xinxi.friendApply.allowAuth === 0) {
					this.$u.toast("不可重复操作")
				} else {
					this.apiMethod("pass")
				}
			},
			cancel() {
				if (this.xinxi.friendApply.allowAuth === 0) {
					this.$u.toast("不可重复操作")
				} else {
					this.apiMethod("refuse")
				}
			},
			apiMethod(_method) {
				const that = this;
				let _url = "/user/friend/apply";
				let _params = {
					method: _method,
					friend: that.xinxi.friendApply.friend,
					communicate: that.xinxi.useFriendApply
				};
				// console.info(_params)
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						if (_method === 'pass') {
							that.$u.toast("已成为笔友");
							setTimeout(() => {
								uni.navigateBack({

								})
							}, 400)
						} else {
							that.$u.toast("已谢绝申请");
							setTimeout(() => {
								uni.navigateBack({

								})
							}, 400)
						}
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(_result.message)
					}
					console.info(_result)
				}).catch((err) => {
					let msg = err.message;
					console.info("error:", msg)
					// that.$tip.error(msg);
				}).finally(() => {})

			},
			copyBiuInfo(biuInfoObj) {
				let _copyValue = '';
				for (var i = 0; i < biuInfoObj.length; i++) {
					_copyValue += biuInfoObj[i].name + ":" + biuInfoObj[i].value + "\r\n"
				}
				if (!!_copyValue) {
					uni.setClipboardData({
						data: _copyValue, //要被复制的内容
						success: () => { //复制成功的回调函数 
							this.$u.toast("复制成功")
						}
					});
				}
			}
		}
	}
</script>

<style scoped>
	.xinxi-time {
		font-size: 28rpx;
		color: #B3B3B3;
	}

	.xinxi-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #363D50;
	}

	.xinxi-content {
		color: #808080;
		font-size: 28rpx;
		margin: 50rpx 0;
	}
</style>
