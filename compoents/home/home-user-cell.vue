<template>
	<view class="body" :style="isLast?'border:none;':''">
		<view class="cell u-f-aj">
			<view class="cell-title">{{label}}</view>
			<view class="cell-text u-f-a">
				<view style="margin-right: 5rpx; font-size: 32rpx;" @click="toPage">{{text}}</view>
				<view style="padding-left:20rpx;" @click="toPage">
					<u-image v-if="isShowGrjj" :src="arrowRightUrl" mode="heightFix" height="32rpx">
					</u-image>
				</view>
			</view>
		</view>
		<block v-for="(item,index) in tagList" v-if="tagList.length>0" :key="index">
			<u-tag v-if="item.checked===1" :text="item.name" size="large" shape="circle" bgColor="#EDEDED"
				borderColor="#EDEDED"></u-tag>
		</block>
		<u-gap v-if="tagList.length>0"></u-gap>
		<view style="margin-top: 0rpx;" v-if="isShowGrjj">
			<view class="cell-title-1">{{title}}</view>
			<view class="cell-text-1">{{introduce}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			tagList: {
				type: Array,
				default: []
			},
			isShowGrjj: {
				type: Boolean,
				default: true
			},
			isLast: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			introduce: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				arrowRightUrl: "../../../static/treehole/biu/jiantou-right.png"
			}
		},
		methods: {
			toPage() {
				this.$emit("click")
			}
		}
	}
</script>

<style scoped>
	.body {
		border-bottom: 1rpx solid #EEEEEE;
		padding: 10rpx;
		width: 100%;
	}

	.cell {
		padding: 14rpx 0;
		width: 100%;
	}

	.cell-title {
		font-size: 32rpx;
		color: #363D50;
	}

	.cell-text {
		font-size: 32rpx;
		color: #999999;
		/* margin: 10rxp 20rpx 10rpx 0; */
		display: flex;
	}


	.cell-title-1 {
		margin: 10rpx 0;
		font-size: 36rpx;
		/* font-weight: bold; */
		color: #363D50;
	}

	.cell-text-1 {
		font-size: 30rpx;
		color: #8A8A8A;
		margin: 10rxp 20rpx 20rpx 0;
		display: flex;
	}
</style>
