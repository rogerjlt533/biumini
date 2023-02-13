<template>
	<view class="body">
		<view class="head" style="padding:170rpx 0 20rpx 0">
			<u-image :src="src" mode="widthFix"></u-image>
		</view>

		<view style="margin: 0rpx auto 100rpx;">
			<view style="margin: 20rpx 30% 0 30%;">
				<u-button shape="circle" type="primary" @click="wxlogin()">授权登录</u-button>
			</view>
			<view class="u-f-ajc home-setting-btn" @click="goBack()">
				暂不登录
			</view>
		</view>

		<view class="u-f-btn">
			<view class="title-1">
				登录获取更多功能
			</view>
		</view>
	</view>
</template>

<script>
	import configService from '@/common/service/config.service.js';
	export default {
		name: 'HomeLogin',
		data() {
			return {
				src: configService.imgUrl + '/login.png'
			}
		},
		methods: {
			wxlogin() {
				this.$emit("wxlogin")
			},
			goBack() {
				// this.$emit("goBack")
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		height: 100%;
	}

	.head {
		// height: 595rpx;
		// background-image: url('http://127.0.0.1:9001/qdyard/files/20211119/login.png') no-repeat;
		// background-size: 595rpx 595rpx;
		// background-position: center center;
	}

	.title-1 {
		font-size: 32rpx;
		font-weight: 300;
		color: #999999;
		margin: 10rpx;

	}

	.home-setting-btn {
		color: #B3B3B3;
		border-bottom: 1rpx solid #B3B3B3;
		margin: 20rpx 40%;
		font-size: 30rpx;
	}
</style>
