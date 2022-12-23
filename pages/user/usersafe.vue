<template>
	<view>
		<u-navbar back-text="" title="安全提示" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>

		<view class="body">
			<view class="u-f-a aq-cell" @click="handleShow(1)">
				<!-- <image :src="iconList[0]" style="width: 32rpx;height:32rpx;" mode="aspectFit"></image> -->
				<view class="aq-text">安全提示</view>
				<view style="margin: auto 10rpx auto auto;">
					<u-icon name="arrow-right" size="26" color="#c0c4cc"></u-icon>
				</view>
			</view>
			<view class="u-f-a aq-cell" @click="handleShow(2)">
				<!-- <image :src="iconList[1]" style="width: 32rpx;height:32rpx;" mode="aspectFit"></image> -->
				<view class="aq-text">隐私条款</view>
				<view style="margin: auto 10rpx auto auto;">
					<u-icon name="arrow-right" size="26" color="#c0c4cc"></u-icon>
				</view>
			</view>
			<view class="u-f-a aq-cell" @click="handleShow(3)">
				<!-- <image :src="iconList[2]" style="width: 32rpx;height:32rpx;" mode="aspectFit"></image> -->
				<view class="aq-text">用户协议</view>
				<view style="margin: auto 10rpx auto auto;">
					<u-icon name="arrow-right" size="26" color="#c0c4cc"></u-icon>
				</view>
			</view>
		</view>


		<u-popup v-model="showpopup" mode="center" width="90%" height="90%">
			<view style="background-color: #FFFFFF; padding: 20rpx;">
				<u-parse :html="content"></u-parse>
				<view style="margin: 30rpx 20%;">
					<u-button type="primary" shape="circle" @click="showpopup = false"> 知道了 </u-button>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		AQ_CONTENT
	} from "@/common/util/constants"
	export default {
		components: {},
		data() {
			return {
				srcleft: '../../../static/treehole/my/back.png',
				imgsize: 46,
				iconList: [
					"../../static/treehole/my/aq-tishi.png",
					"../../static/treehole/my/aq-yinsi.png",
					"../../static/treehole/my/aq-xieyi.png"
				],
				showpopup: false,
				content: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({

				})
			},
			handleShow(idx) {
				switch (idx) {
					case 1:
						this.content = AQ_CONTENT[0]
						break;
					case 2:
						this.content = AQ_CONTENT[1]
						break;
					case 3:
						this.content = AQ_CONTENT[2]
						break;
					default:
						break;
				}
				this.showpopup = true
			}
		}
	}
</script>

<style scoped>
	@import "../../common/form.css";

	.body {
		margin: 20rpx;
		padding: 20rpx;
	}

	.aq-cell {
		margin: 20rpx 10rpx;
		padding: 10rpx;
		border-bottom: 1rpx solid #F4F4F4;
	}

	.aq-text {
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 20rpx;
		color: #363D50;
	}
</style>
