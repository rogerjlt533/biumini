<template>
	<view class="mingpian u-f-a"
		:style="isBtmLine?'border-bottom:1rpx solid #F2F2F2;margin:10rpx 0; padding: 10rpx 0;':''">
		<view class="mingpian-tx" @click="handleLink">
			<image v-if="isBiu" :src="biuXinxi.image" mode="aspectFill"
				style="width: 120rpx;height: 120rpx;border-radius: 50%;">
			</image>
			<image v-else :src="biuXinxi.image" mode="aspectFill"
				style="width: 80rpx;height: 80rpx;border-radius: 50%;">
			</image>
		</view>

		<view @click="handleLink">
			<view style="display: flex; margin: auto auto 0 10rpx;">
				<view v-if="isBiu">
					<image v-if="!!biuXinxi.communicate" :src="biuImgList[biuXinxi.communicate]" mode="aspectFit"
						style="width: 38rpx;height: 38rpx;">
					</image>
				</view>
				<view v-else>
					<image v-if="!!biuXinxi.communicate" :src="biuImgList[biuXinxi.communicate]" mode="aspectFit"
						style="width: 34rpx;height: 34rpx;">
					</image>
				</view>
				<view v-if="isBiu" class="mingpian-nn" style="font-size: 36rpx;">{{biuXinxi.name}}</view>
				<view v-else class="mingpian-nn">{{biuXinxi.name}}</view>
			</view>
			<view class="mingpian-jj" style="margin: -6rpx auto 0 10rpx;">
				{{biuXinxi.desc}}
			</view>
		</view>
		<view class="mingpian-operate">
			<view class="mingpian-share" v-if="operate==='share'">
				<image :src="pointUrl" mode="aspectFill" style="width: 42rpx;height: 42rpx;" @click="handleOperate">
				</image>
			</view>
			<view class="mingpian-share" v-if="operate==='link'">
				<image :src="arrowRightUrl" mode="heightFix" style="height: 32rpx;" @click="handleLink">
				</image>
			</view>
			<view class="mingpian-share" v-if="operate==='delete'">
				<image :src="deleteUrl" mode="heightFix" style="height: 42rpx;" @click="handleDelete">
				</image>
			</view>

			<!-- <u-image v-if="operate==='link'" :src="arrowRightUrl" width="26.6rpx" height="49.7rpx" @click="handleLink">
			</u-image>
			<u-image v-if="operate==='delete'" :src="deleteUrl" mode="heightFix" height="49.7rpx" @click="handleDelete">
			</u-image> -->
		</view>



		<u-mask :show="showMenu" @click="showMenu = false" :customStyle="customStyle">
			<view class="mingpian-share-menu" :style="'left:'+left+'px;top:'+top+'px;'">
				<u-button open-type="share" @click="handleFenxiang" type="primary" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[0]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						分享</view>
				</u-button>
				<block v-if="!self">
					<u-gap height="1" bg-color="#EDEDED"></u-gap>
					<u-button @click="handleGuanzhu" :customStyle="menuBtnStyle">
						<u-image :src="menuUrl[1]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
						<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
							关注</view>
					</u-button>
					<u-gap height="1" bg-color="#EDEDED"></u-gap>
					<u-button @click="handleJubao" :customStyle="menuBtnStyle">
						<u-image :src="menuUrl[2]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
						<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
							举报</view>
					</u-button>
					<u-gap height="1" bg-color="#EDEDED"></u-gap>
					<u-button @click="handleLahei" :customStyle="menuBtnStyle">
						<u-image :src="menuUrl[3]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
						<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
							拉黑</view>
					</u-button>
				</block>
			</view>
		</u-mask>



	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'BiuMingpian',
		props: {
			scrollTop: {
				type: Number,
				default: 0
			},
			isBtmLine: {
				type: Boolean,
				default: false
			},
			isBiu: {
				type: Boolean,
				default: false
			},
			self: {
				type: Boolean,
				default: false
			},
			operate: {
				type: String,
				default: "link"
			},
			biuXinxi: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		computed: {
			...mapState({
				isLogin: 'isLogin'
			}),
		},
		watch: {
			scrollTop(val) {
				this.showMenu = false
			}
		},
		data() {
			return {
				arrowRightUrl: '../../static/treehole/biu/jiantou-right.png',
				deleteUrl: '../../static/treehole/hmd-delete.png',
				imgSize: '80rpx',
				pointUrl: '../../static/treehole/biu/point.png',
				biuImgList: [
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-email.png",
					"../../static/treehole/biu/biu-email-and-xj.png",
				],
				menuUrl: [
					"../../../static/treehole/biu/sd-share.png",
					"../../../static/treehole/my/wd-unstar.png",
					"../../../static/treehole/biu/sd-jubao.png",
					"../../../static/treehole/biu/biu-lahei.png"
				],
				customStyle: {
					"background-color": "rgba(0, 0, 0, 0.05)",
				},
				showMenu: false,
				left: 0,
				top: 0,
				menuBtnStyle: {
					'padding-left': '10rpx',
					'border': 'none',
					'font-size': '32rpx',
					'color': '#AE9F82',
					'background-color': '#F5F5F5'
				}
			}
		},
		methods: {
			handleLink() {
				this.$emit("link2page")
			},
			handleDelete() {
				this.$emit("delete", this.biuXinxi)
			},
			handleOperate(e) {
				if (!this.showMenu) {
					this.left = Math.ceil(e.detail.x) - 60
					this.top = Math.ceil(e.touches[0].clientY) + 10
				}
				this.showMenu = true
				// this.$emit("operate")
			},
			handleFenxiang() {
				this.showMenu = false
			},
			handleGuanzhu() {
				this.showMenu = false
				this.$emit("operate", "guanzhu")
			},
			handleJubao() {
				if (!this.isLogin) {
					this.$u.toast("未登录")
					this.showMenu = false
				} else {
					let _params = {
						id: this.biuXinxi.id
					}
					uni.navigateTo({
						url: '../../pages/user/userhelp?params=' + encodeURIComponent(JSON.stringify(_params))
					})
				}
			},
			handleLahei() {
				if (!this.isLogin) {
					this.$u.toast("未登录")
					this.showMenu = false
				} else {
					this.showMenu = false
					const that = this
					let _url = "/user/black"
					let _params = {
						relate: that.biuXinxi.id
					}
					that.$http.post(_url, _params).then(res => {
						if (res.data.code === 200) {
							that.$u.toast("拉黑成功")
						} else if (res.data.code === 501) {
							setTimeout(() => {
								uni.hideLoading();
								that.$store.dispatch("Logout")
							}, 800)
						} else {
							that.$u.toast(res.data.message)
						}
					}).catch((err) => {
						let msg = err.message
						that.$tip.error(msg);
					}).finally(() => {})
				}
			}
		},
		onShareAppMessage(res) {
			this.showMenu = false
			return {
				title: "欢迎来到我的树洞",
				path: '/pages/index/index'
				// path: '/packages/shop/StoreDetail/index?id=' + this.detailObj.id + '&shareShow=true'
			}
		}

	}
</script>

<style scoped>
	.mingpian {
		margin: 10rpx;
		/* padding: 10rpx; */
		/* background-color: #F7F7F7; */
		display: flex;
	}

	.mingpian-tx {
		margin: 10rpx 20rpx;
	}

	.mingpian-nn {
		color: #363D50;
		font-size: 32rpx;
		font-weight: 600;
		/* border: 1px solid #FF0000; */
		margin-top: -10rpx;
		margin-left: 10rpx;
	}

	.mingpian-jj {
		color: #B3B3B3;
		font-size: 28rpx;
		/* border: 1px solid #00FF00; */
		/* margin: -8rpx 10rpx; */
	}

	.mingpian-operate {
		width: 160rpx;
		margin: 10rpx 10rpx 10rpx auto;
	}

	.mingpian-share {
		margin: 0 20rpx 0rpx 20rpx;
		width: 120rpx;
		height: 40rpx;
		text-align: right;
	}

	.mingpian-share-menu {
		border: 1px solid rgba(174, 159, 130, 0.2);
		background-color: #F5F5F5;
		width: 160rpx;
		/* padding: 10rpx; */
		border-radius: 16rpx;
		position: absolute;
	}

	.menu-item {
		padding: 10rpx;
		border-top: 1px solid #EDEDED;
		font-size: 32rpx;
		/* height: 80rpx; */
		color: #AE9F82;
	}
</style>
