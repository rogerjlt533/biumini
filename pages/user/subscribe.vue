<template>
	<view>
		<u-navbar back-text="" title="消息通知设置" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>
		<view style="margin-top: -100rpx;margin-bottom: -30rpx;">
			<image :src="src" mode="widthFix" style="width: 100%;"></image>
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
				src: configService.imgUrl + 'subscribe.jpg',
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style>
	.userabout-header {
		padding: 40rpx 0;
	}

	.userabout-header>image {
		width: 65%;
		margin-top: 50rpx;
		margin-bottom: 30rpx;
	}

	.userabout-header>view {
		color: #CCCCCC;
	}
</style>
