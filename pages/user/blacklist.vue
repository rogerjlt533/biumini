<template>
	<view>
		<u-navbar back-text="" title="黑名单" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>
		<view class="body" style="margin-top: 60rpx;">
			<!-- <view>
				<u-notice-bar mode="horizontal" :list="listtip"></u-notice-bar>
			</view> -->
			<view v-if="blackList.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<view class="u-s-f-body" v-else>
				<block v-for="(item,index) in blackList" :key="index">
					<view :class="index!== blackList.length-1? 'biu-item': 'biu-item-last'">
						<BiuMingpian :biuXinxi="item" operate="delete" @delete="handleDelete"></BiuMingpian>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import BiuMingpian from '../../compoents/home/biu-mingpian.vue';
	export default {
		components: {
			BiuMingpian
		},
		data() {
			return {
				listtip: ['平台每日私信仅限3条呦~让手书温暖你最熟悉的陌生人'],
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
				blackList: [],
			}
		},
		created() {
			this.loadData()
		},
		methods: {
			goBack() {
				uni.navigateBack({

				})
			},
			loadData() {
				const that = this;
				let _url = "/user/black/list";
				that.$http.post(_url).then(res => {
					let _result = res.data;
					// console.info("sunzt::", _result)
					if (_result.code === 200) {
						that.blackList = _result.data
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			},
			handleDelete(e) {
				console.info("handleDelete:::", e.id);
				const that = this;
				let _url = "/user/black/cancel";
				that.$http.post(_url, {
					relate: e.id
				}).then(res => {
					let _result = res.data;
					console.info("sunzt::", _result);
					if (_result.code === 200) {
						that.$u.toast("操作成功");
						that.loadData()
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.biu-item {
		border-bottom: 1px solid #CCCCCC;
	}

	.biu-item-last {}
</style>
