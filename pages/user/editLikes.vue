<template>
	<view>
		<u-navbar back-text="" title="兴趣爱好" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>

		<view class="body">
			<view class="u-f-aj">
				<view class="u-f-a-title">请选择一些您感兴趣的话题</view>
				<view style="color: #CCCCCC;font-weight: normal;">{{tagCount}}/10</view>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===1" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>

			<view class="my-gap">
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===2" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>

			<view class="my-gap">
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===3" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>


			<view class="my-gap">
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===4" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>


			<view class="my-gap">
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===5" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>

			<view class="my-gap">
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
			</view>
			<block v-for="(item, index) in model.interests.list" :key="index">
				<u-tag v-if="item.tag_group===6" :color="colorList[item.checked]" size="max"
					:bgColor="bgColorList[item.checked]" shape="circle" :text="item.name" @click="handleClick(index)"
					:borderColor="bgColorList[item.checked]">
				</u-tag>
			</block>
		</view>

		<view class="u-f-btn">
			<view class="u-f-ajr" style="margin-right: 30rpx;">
				<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">返回
				</u-button>
				<u-button shape="circleRight" :customStyle="btnRightStyle" @click="submit">
					保存
				</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				tagCount: 0,
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
				model: {},
				colorList: ["#394052", "#FFFFFF"],
				bgColorList: ["#F5F5F5", "#AE9F82"],
				btnLeftStyle: {
					'border': '1rpx solid #AE9F82',
					'background-color': '#FFFFFF',
					'color': '#AE9F82 !important',
					'width': '200rpx'
				},
				btnRightStyle: {
					'border': '1rpx solid #AE9F82',
					'background-color': '#AE9F82',
					'color': '#FFFFFF !important',
					'width': '200rpx'
				},
			};
		},
		onLoad(event) {
			let _params = event.params || event.payload;
			try {
				var _detail = JSON.parse(decodeURIComponent(_params));
			} catch (error) {
				var _detail = JSON.parse(_params);
			}
			this.model = _detail;

			this.model.interests.list.map(item => {
				if (item.checked === 1) {
					this.tagCount++
				}
			})
		},
		methods: {
			handleClick(index) {
				if (this.model.interests.list[index].checked === 0) {
					if (this.tagCount === 10) {
						this.$u.toast("最多只能选择10个");
						return
					}
					this.tagCount++
				} else {
					this.tagCount--
				}
				this.model.interests.list[index].checked = this.model.interests.list[index].checked === 1 ? 0 : 1;
			},
			// 提交
			submit() {
				const that = this;

				if (that.tagCount === 0) {
					that.$u.toast("请选择兴趣爱好");
					return
				}

				let _interests = [];
				that.model.interests.list.filter(m => m.checked === 1).map((item) => {
					_interests.push(item.id)
				});

				let _url = "/my/update/info";
				let _params = {
					method: "interest",
					interests: _interests.join(',')
				};
				that.$http.post(_url, _params).then(res => {
					console.info(res);
					if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
					that.$u.toast("后台保存")
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					that.$store.dispatch("setUserinfo", that.model);
					that.goBack()
				})
			},
			cancel() {
				this.goBack()
			},
			goBack() {
				uni.navigateBack({

				})
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../common/form.css";

	.body {
		margin: 20rpx;
		padding: 20rpx;
		margin: 30rpx;
		border: 1px solid rgba(174, 159, 130, 0.11);
		border-radius: 16rpx;
	}

	.my-gap {
		margin: 20rpx 0;
	}
</style>
