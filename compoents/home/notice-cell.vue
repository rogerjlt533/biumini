<template>
	<view>
		<view class="send-tip">
			<view class="send-tip-1">
				<u-image :src="tipImaList[notice.communicate]" mode="heightFix" height="40rpx"></u-image>
			</view>
			<view class="send-tip-2">{{notice.label}}</view>
			<view class="send-tip-3">{{notice.logTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NoticeCell',
		props: {
			notice: {
				type: Object,
				default: {}
			},
			communicate: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tipImaList: [
					"../../../static/treehole/biu/biu-email-and-xj.png",
					"../../../static/treehole/biu/wd-biu-yfc-small.png",
					"../../../static/treehole/biu/biu-email.png",
					"../../../static/treehole/biu/biu-email-and-xj.png"
				],
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
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
