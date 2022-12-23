<template>
	<view style="margin-top:16rpx;">
		<view class="u-f-ajc">
			<view style="width: 14%;"
				:class="(xinxi.readStatus===1)?'xinxi-cell-type-read':'xinxi-cell-type-unread'"
				@tap="link2detail">
				{{xinxi.messageTag}}
			</view>
			<view style="width: 86%;"
				:class="(xinxi.readStatus===1)?'xinxi-title-read':'xinxi-title-unread'"
				@tap="link2detail">
				{{xinxi.title}}
			</view>
		</view>

		<view style="margin-left: 14%;margin-top: -6rpx;border-bottom: 1rpx solid #F4F4F4;padding-bottom: 24rpx;">
			<view class="xinxi-time">{{xinxi.showTime}}</view>

			<view>
				<block v-for="(item,index) in xinxi.banners" :key="index">
					<image style="width: 95%;margin: 5rpx 0;" mode="widthFix" :src="item"></image>
				</block>
			</view>

			<view style="background-color: #F7F7F7;" v-if="xinxi.messageType===3001 || xinxi.messageType===3002">
				<!-- <BiuMingpian :biuXinxi="xinxi.friendApply" @link2page="toBiuPage1(xinxi.friendApply)"></BiuMingpian> -->
				<BiuMingpian :biuXinxi="xinxi.friendApply"></BiuMingpian>
			</view>
			<!-- 	<view class="xinxi-content" v-if="msg.messageType===3001 || msg.messageType===3002" @tap="link2detail">
				{{xinxi.content}}</view> -->
			<!-- <view class="xinxi-content" v-if="msg.messageType===3001 || msg.messageType===3002" @tap="link2detail">
				{{msg.content}}
			</view> -->
			<view class="xinxi-content" v-if="!!xinxi.content" @tap="link2detail">
				{{xinxi.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import BiuMingpian from './biu-mingpian.vue'
	export default {
		name: 'XinxiCell',
		components: {
			BiuMingpian
		},
		props: {
			xinxi: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				msg: {
					readStatus: 0
				},
			}
		},
		created() {
			this.msg = {
				readStatus: 0
			};
			this.msg = this.xinxi
		},
		methods: {
			toBiuPage1(_record) {
				const that = this;
				setTimeout(function() {
					that.msg.readStatus = 1
				}, 500);
				_record = {
					..._record,
					id: _record.friend
				};
				uni.navigateTo({
					url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_record))
				})
			},
			link2detail() {
				const that = this;
				setTimeout(function() {
					that.msg.readStatus = 1
				}, 500);
				// this.$emit("link2detail", this.msg)
			},
		}

	}
</script>

<style scoped>
	.xinxi {
		display: flex;
	}

	.xinxi-cell-type-read {
		margin-top: 0rpx;
		font-size: 34rpx;
		color: #8A8A8A;
	}

	.xinxi-cell-type-unread {
		margin-top: 0rpx;
		font-size: 34rpx;
		font-weight: 600;
		color: #363D50;
	}

	.xinxi-title-read {
		font-size: 32rpx;
		color: #8A8A8A;
	}

	.xinxi-title-unread {
		font-size: 32rpx;
		font-weight: 600;
		color: #363D50;
	}

	.xinxi-time {
		color: #B3B3B3;
		font-size: 26rpx;
	}

	.xinxi-content {
		color: #808080;
		font-size: 28rpx;
	}
</style>
