<template>
	<view class="home-data u-f-a">
		<block v-for="(item,index) in homedata" :key="index">
			<view class="u-f-ajc u-f1 u-f-l">
				<view v-if="isLogin" class="u-f-title" @click="clickevent(index)">
					<image :src="item.icon" style="width:46rpx; height:46rpx" mode="aspectFit">
						</u-image>
						<text v-show="currIdx===index" style="margin: auto 20rpx auto 5rpx;">{{item.name}}</text>
				</view>
				<view v-else class="u-f-title" @click="preLogin">
					<image :src="item.icon" style="width:46rpx; height:46rpx" mode="aspectFit">
						</u-image>
						<text v-show="currIdx===index" style="margin: auto 20rpx auto 5rpx;">{{item.name}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			homedata: Array,
			isLogin: Boolean,
			currIdx: Number
		},
		components: {},
		methods: {
			preLogin() {
				this.$u.toast("请先点击头像登录")
				return
			},
			clickevent(index) {
				this.$emit("click", index)
			}
		}
	}
</script>

<style scoped>
	.home-data {
		padding: 30rpx;
	}

	.home-data>view {
		color: #999999;
	}

	.home-data>view>text {
		color: #343434;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
