<template>
	<view style="margin: 10rpx;">
		<view class="u-f-aj">
			<view style="font-size: 28rpx;color: #363D50;">{{comment.title}}</view>
			<view style="font-size: 26rpx;color: #999999;">{{comment.create_time}}</view>
		</view>
		<view class="content">
			{{comment.content}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BiuComment',
		props: {
			comment: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.content {
		color: #8A8A8A;
		font-size: 28rpx;

		word-wrap: break-word;
	}
</style>
