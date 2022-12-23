<template>
	<view>
		<u-navbar back-text="" title="通信历史" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>
		<view class="body" style="margin-top: 20rpx;">

			<view v-if="blackList.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<view v-else>
				<block v-for="(item,index) in blackList" :key="index">
					<view class="biu-item">
						<NoticeCell :communicate="biuXinxi.communicateInfo.communicate" :notice="item"></NoticeCell>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import NoticeCell from '../../compoents/home/notice-cell.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			NoticeCell
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			}),
		},
		data() {
			return {
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
				blackList: [],
				biuXinxi: {}
			}
		},
		created() {},
		onLoad(event) {
			let _params = event.params || event.payload;
			try {
				var _detail = JSON.parse(decodeURIComponent(_params));
			} catch (error) {
				var _detail = JSON.parse(_params);
			}
			this.biuXinxi = _detail
			console.info("biuXinxi.communicateInfo.communicate::", this.biuXinxi.communicateInfo.communicate)
			this.loadData(_detail.id)
		},
		methods: {
			goBack() {
				uni.navigateBack({

				})
			},
			loadData(_id) {
				const that = this
				let _url = "/user/friend/communicate/logs"
				let _params = {
					id: _id
				}
				console.info(_url, _params)
				that.$http.post(_url, _params).then(res => {
					let _result = res.data
					console.info(_url, _result)
					if (_result.code === 200) {
						that.blackList = _result.data
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						console.info(_url, _result.message)
					}
				}).catch((err) => {
					let msg = err.message
					that.$tip.error(msg);
				}).finally(() => {})
			},
			handleDelete(e) {
				console.info("handleDelete:::", e.id)
				const that = this
				let _url = "/user/black/cancel"
				that.$http.post(_url, {
					relate: e.id
				}).then(res => {
					let _result = res.data
					console.info("sunzt::", _result)
					if (_result.code === 200) {
						that.$u.toast("操作成功")
						that.loadData()
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message
					that.$tip.error(msg);
				}).finally(() => {})
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.biu-item {
		margin: 10rpx;
	}
</style>
