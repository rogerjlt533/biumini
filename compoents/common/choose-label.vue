<template>
	<view>
		<u-navbar back-text="" title="设置标签" :isBack='true' :custom-back="customBack" :imgwidth="imgsize"
			:imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>
		<view class="body">
			<view>
				<u-tag size="max" bgColor="#F5F5F5" borderColor="#F5F5F5" shape="circle" text="取消标签" @click="cancel">
				</u-tag>
			</view>
			<view class="u-f-a">
				<view class="u-f-a-title">我的标签</view>
				<view style="padding: 10rpx;" @click="canDelete">
					<u-image :src="wdbqImgUrl" mode="heightFix" height="36rpx"></u-image>
				</view>
			</view>
			<view>
				<block v-for="(item, index) in wdList" :key="index">
					<u-tag v-if="index<wdList.length-1" size="max"
						:bgColor="index === wdIdx?bgColorList[1]:bgColorList[0]"
						:color="index === wdIdx?colorList[1]:colorList[0]"
						:borderColor="index === wdIdx?bgColorList[1]:bgColorList[0]" shape="circle" :text="item.tag"
						@click="chooseWd(index)" @close="deleteTag(index)" :closeable="closeable">
						<!-- <u-badge :isOld="false" type="success">
							<view slot="img">
								<image :src="newLabelIcon" style="width: 32rpx;height: 32rpx;" mode="aspectFit">
								</image>
							</view>
						</u-badge> -->
					</u-tag>
					<u-tag v-else iconame="plus" size="max" bgColor="#FAEED6" borderColor="#FAEED6" shape="circle"
						:text="item.tag" @click="addLabel">
					</u-tag>
				</block>
			</view>


			<view class="u-f-a">
				<view class="u-f-a-title">推荐标签</view>
			</view>
			<view>
				<block v-for="(item, index) in xtList" :key="index">
					<!-- <u-tag size="large" :bgColor="index === xtIdx?'#AE9F82':'#F5F5F5'" shape="circle" :text="item.tag"
						@click="chooseXt(index)">
					</u-tag> -->
					<u-tag size="max" :bgColor="index === xtIdx?bgColorList[1]:bgColorList[0]" shape="circle"
						:text="item.tag" @click="chooseXt(index)" :color="index === xtIdx?colorList[1]:colorList[0]"
						:borderColor="index === xtIdx?bgColorList[1]:bgColorList[0]">
					</u-tag>
				</block>
			</view>

			<u-popup v-model="showpopup" mode="top" height="auto" :customStyle="customStyle">
				<view style="margin: 150;padding:10rpx;">
					<u-form>
						<u-form-item>
							<u-input :focus="focus" placeholder="请输入自定义标签" v-model="newLabel" type="text">
							</u-input>
						</u-form-item>
					</u-form>
					<view style="margin: 20rpx;">
						<view class="u-f-ajr" style="margin-right: 30rpx;">
							<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="showpopup=false">返回
							</u-button>
							<u-button shape="circleRight" :customStyle="btnRightStyle" @click="submit">
								保存
							</u-button>
						</view>
					</view>
				</view>
			</u-popup>

		</view>
	</view>
</template>

<script>
	export default {
		name: "ChooseLabel",
		components: {},
		data() {
			return {
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
				newLabelIcon: '../../static/treehole/new.png',
				focus: true,
				wdList: [],
				wdIdx: -1,
				xtList: [],
				xtIdx: -1,
				wdbqImgUrl: '../../../static/treehole/my/wd-bianji.png',
				showpopup: false,
				newLabel: '',
				closeable: false,
				colorList: ["#394052", "#394052"],
				bgColorList: ["#F5F5F5", "#FAEED6"],
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
				customStyle: {
					'margin': '180rpx 20rpx'
				}
			}
		},
		created() {

		},
		methods: {
			canDelete() {
				this.closeable = !this.closeable
			},
			initData() {
				const that = this;
				let _url = "/hole/note/selections";
				that.$http.post(_url, {}).then(res => {
					let _result = res.data;
					console.info("_result::", _result.data);
					if (_result.code === 200) {
						that.xtList = _result.data.recommend_label;
						that.wdList = _result.data.my_label
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					console.info("err::", err);
					let msg = err.message
					// that.$tip.error(msg);
				}).finally(() => {
					that.wdList.push({
						'tag': '添加标签'
					})
				})
			},
			customBack() {
				// const that = this
				// console.info("chooseMoodschooseMoodschooseMoods")
				// that.chooseMoods(3)
				this.showpopup2 = false
			},
			addLabel() {
				this.showpopup = true
			},
			cancel() {
				this.xtIdx = -1;
				this.$emit("cancel")
			},
			chooseXt(idx) {
				this.xtIdx = idx;
				this.wdIdx = -1;

				let _label = {
					...this.xtList[idx],
					idx: idx
				};
				this.$emit("close", _label)
			},
			chooseWd(idx) {
				this.wdIdx = idx;
				this.xtIdx = -1;

				let _label = {
					...this.wdList[idx],
					idx: idx
				};
				this.$emit("close", _label)
			},
			deleteTag(index) {
				let _params = {
					method: 'remove',
					tag: this.wdList[index].tag,
					id: this.wdList[index].id
				};
				console.info("_params::", _params);

				const that = this;
				let _url = "/hole/label/operate";
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.wdList.splice(index, 1);
						that.wdIdx = -1
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(_result.message)
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			},
			submit() {
				if (!this.newLabel) {
					this.$u.toast("请输入自定义标签内容");
					return
				} else if (this.newLabel.length > 10) {
					this.$u.toast("标签不能超过10个字");
					return
				}
				let _params = {
					method: 'add',
					tag: this.newLabel
				};
				console.info("_params::", _params);

				const that = this;
				let _url = "/hole/label/operate";
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.newLabel = '';
						let _newlable = {
							tag: _params.tag,
							id: _result.data.id,
							checked: 0
						};
						that.wdList.unshift(_newlable);
						// that.wdIdx++
						that.wdIdx = -1;
						that.showpopup = false
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						// that.$u.toast(_result.message)
            uni.showToast({
              icon: 'error',
              title: _result.message,
              duration: 3000
            })
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			},
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.body {
		margin: 20rpx;
		padding: 20rpx;
	}
</style>
