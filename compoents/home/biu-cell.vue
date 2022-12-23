<template>
	<view>
		<view class="u-f-a" @click="handleClick">
			<view class="biu-icon">
				<image mode="aspectFit" style="width: 40rpx;height: 40rpx;" :src="txfsUrls[biuInfo.communicate]">
				</image>
			</view>
			<view :class="biuInfo.isRead?'biu-title-read':'biu-title'">{{biuInfo.title}}</view>
		</view>

		<view class="biu-content" @click="handleClick">
			{{biuInfo.introduce}}
		</view>

		<view class="biu-image">
			<u-grid :col="3" :border="false">
				<block v-for="(item, index) in biuInfo.images" :key="index">
					<u-grid-item :customStyle="customStyle" @click="handlePreImage(index)">
						<image style="width: 190rpx;height:190rpx;border-radius: 8rpx;" mode="aspectFill" :src="item">
						</image>
					</u-grid-item>
				</block>
			</u-grid>
		</view>

		<view class="biu-tag" @click="handleClick">
			<block v-for="(item,index) in biuInfo.interests" v-show="biuInfo.interests.length>0" :key="index">
				<u-tag :text="item.name" size="large" shape="circle" bgColor="#EDEDED" borderColor="#EDEDED"></u-tag>
			</block>
		</view>

		<view class="u-f-aj biu-footer" @click="handleClick">
			<view>{{biuInfo.desc}}</view>
			<veiw>{{biuInfo.sortTime}}</veiw>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'BiuCell',
		props: {
			idx: {
				type: Number,
				default: 0
			},
			biuInfo: {
				type: Object,
				default: {}
			}
		},
		created() {

		},
		data() {
			return {
				customStyle: {
					'margin': '-16rpx 0'
				},
				txfsUrls: [
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-email.png",
					"../../static/treehole/biu/biu-email-and-xj.png"
				]
			}
		},
		methods: {
			handleClick() {
				this.$emit("link2page", this.biuInfo.id)
			},
			handlePreImage(e) {
				// console.log(e);
				uni.previewImage({
					current: e,
					urls: this.biuInfo.images
				})
			}
		}

	}
</script>

<style scoped>
	.biu-icon {
		margin-top: 0 !important;
		margin-bottom: auto;
		width: 60rpx;
		padding-top: 16rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.biu-title {
		font-size: 36rpx;
		/* font-weight: bold; */
		margin-top: 4rpx !important;
		color: #363D50;
	}

	.biu-title-read {
		font-size: 36rpx;
		/* font-weight: bold; */
		margin-top: 4rpx !important;
		color: #8A8A8A;
	}

	.biu-content {
		margin-left: 60rpx;
		margin-top: 10rpx;
		/* border-bottom: 1rpx solid #CCCCCC; */
		padding-bottom: 16rpx;
		color: #8A8A8A;
		font-size: 32rpx;
	}

	.biu-image {
		margin-left: 56rpx;
		padding-bottom: 0rpx;
	}

	.biu-tag {
		margin-left: 54rpx;
		padding-bottom: 0rpx;
	}

	.biu-footer {
		font-size: 28rpx;
		margin: 0rpx 20rpx;
		margin-left: 60rpx !important;
		margin-bottom: 10rpx !important;
		color: #B3B3B3;
	}
</style>
