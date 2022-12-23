<template>
	<view>
		<u-navbar back-text="" title="Biu笔友" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>

		<view class="body">
			<view class="body-head">
				<BiuMingpian :biuXinxi="mingpian" :isBiu="true" :scrollTop="scrollTop" operate="share"
					:self="model.self===1" @operate="handleOpenMenu"></BiuMingpian>
			</view>

			<u-row gutter="16">
				<u-col span="8">
					<view class="body-title">
						<view class="u-f-a">
							<block v-for="(item,index) in titledata" :key="index">
								<view class="u-f-title" style="margin-right: 20rpx;font-size: 32rpx;"
									@click="clickevent(index)">
									<u-image :src="item.icon" width="50rpx" height="50rpx"></u-image>

									<text v-show="item.show" style="margin: auto 20rpx auto 5rpx;">{{item.name}}</text>
								</view>
							</block>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="body-title" v-if="model.self!==1">
						<view class="u-f-title-sixin" @click="tosixin">
							<image :src="sixin.icons[model.priMsgStatus]" mode="aspectFill"
								style="height: 40rpx; width: 49rpx; margin:6% 0%;">
							</image>

							<text style="margin: auto 5rpx;">{{sixin.name}}</text>
						</view>
					</view>
				</u-col>
			</u-row>

			<view class="body-data">
				<view v-show="currIdx===0">
					<view class="jianjie-item" style="border: none;">
						<view class="cell-title-1">{{model.title}}</view>
						<view class="cell-text-1">{{model.introduce}}</view>

						<view style="margin-top: 20rpx; margin-left: -8rpx;">
							<block v-for="(item,index) in model.interests" v-show="model.interests.length>0"
								:key="index">
								<u-tag :text="item.name" size="large" shape="circle" bgColor="#EDEDED"
									borderColor="#EDEDED"></u-tag>
							</block>
						</view>
					</view>

					<view class="jianjie-image-item" style="padding: none;">
						<u-grid :col="3" :border="false">
							<block v-for="(item, index) in model.images" :key="index">
								<u-grid-item :customStyle="customStyle" @click="handlePreImage">
									<image style="width: 190rpx;height:190rpx;border-radius: 8rpx;" mode="aspectFill"
										:src="item"></image>
								</u-grid-item>
							</block>
						</u-grid>
					</view>

					<view class="u-f-a jianjie-item">
						<view>
							<image style="height: 46rpx;width: 46rpx; vertical-align: bottom;" mode="aspectFit"
								:src="iconUrls[0]"></image>
						</view>
						<view class="jianjie-text" @longpress="copy(model.nation+'-'+model.province)">
							{{model.nation+'-'+model.province}}
						</view>
					</view>
					<view class="u-f-a jianjie-item">
						<view>
							<image style="height: 46rpx;width: 46rpx;vertical-align: bottom;" mode="aspectFit"
								:src="iconUrls[1]"></image>
						</view>
						<view class="jianjie-text" @longpress="copy(model.sex)"> {{model.sex}}</view>
					</view>
					<view class="u-f-a jianjie-item">
						<view>
							<image style="height: 46rpx;width: 46rpx;vertical-align: bottom;" mode="aspectFit"
								:src="iconUrls[2]"></image>
						</view>
						<view class="jianjie-text" @longpress="copy(model.age)"> {{model.age}}</view>
					</view>
					<view class="u-f-a jianjie-item" style="border: none!important;">
						<view>
							<image style="height: 46rpx;width: 46rpx;vertical-align: bottom;" mode="aspectFit"
								:src="txfsUrls[model.communicate.value]"></image>
						</view>
						<view v-if="model.friend===1 && model.communicateInfo.communicate === 1" class="jianjie-text"
							@longpress="copy(model.communicateInfo.info.address)">
							{{model.communicateInfo.info.address}}
						</view>
						<view v-else-if="model.friend===1 && model.communicateInfo.communicate === 2"
							class="jianjie-text" @longpress="copy(model.communicateInfo.info.email)">
							{{model.communicateInfo.info.email}}
						</view>
						<view v-else class="jianjie-text" @longpress="copy(model.communicate.tag)">
							{{model.communicate.tag}}
						</view>
					</view>



					<view class="u-f-btn">
						<view class="u-f-ajr" style="margin-right: 30rpx;" v-if="model.self===0">
							<u-button v-if="model.collect===0" shape="circleLeft" :customStyle="btnLeftStyle"
								@click="guanzhu">
								<image style="height: 42rpx;margin-right: 10rpx;" mode="heightFix" :src="btnUrls[0]">
								</image>
								关注
								<!-- {{model.collectTag}} -->
							</u-button>
							<u-button v-else shape="circleLeft" :customStyle="btnLeftStyle" @click="unGuanzhu">
								<image style="height: 42rpx;margin-right: 10rpx;" mode="heightFix" :src="btnUrls[1]">
								</image>
								已关注
								<!-- {{model.collectTag}} -->
							</u-button>

							<u-button v-if="model.friend===1" shape="circleRight" :customStyle="btnRightStyle"
								@click="unHaoyou">
								解除笔友
							</u-button>
							<u-button v-else-if="model.friend===2" shape="circleRight" :customStyle="btnRightStyle"
								@click="wiatfor">
								申请中
							</u-button>
							<!-- <u-button v-else shape="circleRight" :customStyle="btnRightStyle" @click="haoyou"> -->
							<u-button v-else shape="circleRight" :customStyle="btnRightStyle" @click="haoyou">
								申请笔友
							</u-button>
						</view>
					</view>

				</view>

				<view v-show="currIdx===1">
					<block v-for="(item,index) in friendList" :key="index">
						<view style="margin: 10rpx;padding: 10rpx;border-bottom: #EEEEEE 1rpx solid;">
							<TreeHole :isFriend="true" :letter="item" @operate="handleOperate"></TreeHole>
						</view>
					</block>
					<u-loadmore :status="loadStatus2" bgColor="#ffffff" color="#AE9F82">
					</u-loadmore>
				</view>
			</view>



			<u-modal v-model="popup.show" :zoom="false" :showCancelButton="true" :cancelStyle="cancelStyle"
				:confirmStyle="confirmStyle" :title="popup.title" @confirm="applyBiyou">
				<view style="padding: 20rpx 20%; ">
					<u-radio-group :wrap="true" size="36" v-model="popup.value">
						<u-radio labelSize="36" v-for="(item, index) in popup.list" :key="index" :name="item.id">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</u-modal>

			<!-- <u-popup v-model="popup.show" mode="center" width="50%">
				<u-radio-group v-model="popup.value">
					<u-radio v-for="(item, index) in popup.list" :key="index" :name="item.name">
						{{item.name}}
					</u-radio>
				</u-radio-group>

				<view style="margin: 100rpx 10% 0 10%;">
					<u-button shape="circle" size="default" type="primary">确定</u-button>
				</view>

			</u-popup> -->

		</view>

		<u-back-top :scroll-top="scrollTop"></u-back-top>

	</view>
</template>

<script>
	import BiuMingpian from '../../compoents/home/biu-mingpian.vue';
	import TreeHole from '../../compoents/home/tree-hole.vue';
	import {
		mapState,
		mapActions
	} from 'vuex';

	export default {
		components: {
			BiuMingpian,
			TreeHole
		},
		computed: {
			...mapState({
				userInfo: 'userInfo',
				isLogin: 'isLogin'
			})
		},
		data() {
			return {
				disabled: false,
				scrollTop: 0,
				srcleft: '../../../static/treehole/my/back.png',
				imgsize: 46,
				popup: {
					show: false,
					title: '请选择通信方式',
					value: 1,
					list: [{
							name: '纸邮',
							id: 1
						},
						{
							name: 'E-mail',
							di: 2
						}
					],
				},
				cancelStyle: {
					'border': '1px solid #AE9F82',
					'background-color': '#FFFFFF',
					'border-radius': '30rpx',
					'color': '#AE9F82 !important',
					'width': '200rpx',
					'margin-left': '70rpx'
				},
				confirmStyle: {
					'border': '1px solid #AE9F82',
					'background-color': '#AE9F82',
					'border-radius': '30rpx',
					'color': '#FFFFFF !important',
					'width': '200rpx',
					'margin-right': '70rpx'
				},
				mingpian: {},
				model: {
					nation: '',
					province: '',
					sex: '',
					age: '',
					communicate: {
						tag: ''
					}
				},
				currIdx: 0,
				sixin: {
					name: '私信',
					icons: [
						'../../static/bar-xinxi-0.png',
						'../../static/bar-xinxi-1.png'
					]
				},
				titledata: [{
						name: '笔友简介',
						show: true,
						icon: '../../../static/treehole/biu/biu-jianjie.png',
						url: 'linjian'
					},
					{
						name: '笔友树洞',
						show: false,
						icon: '../../../static/treehole/linjian/biu-shudong.png',
						url: 'wdshudong'
					}
				],
				btnUrls: [
					"../../static/treehole/my/wd-unstar.png",
					"../../static/treehole/my/wd-guanzhu.png"
				],
				iconUrls: [
					"../../static/treehole/biu/biu-address.png",
					"../../static/treehole/biu/biu-sex.png",
					"../../static/treehole/biu/biu-age.png"
				],
				btnLeftStyle: {
					'border': '1rpx solid #AE9F82',
					'background-color': '#FFFFFF',
					'color': '#AE9F82 !important',
					'width': '200rpx',
					'padding': '0'
				},
				btnRightStyle: {
					'border': '1rpx solid #AE9F82',
					'background-color': '#AE9F82',
					'color': '#FFFFFF !important',
					'width': '200rpx'
				},
				btnRightStyleNo: {
					'border': '1rpx solid #AE9F82!important',
					'background-color': '#c0c0c0',
					'color': '#FFFFFF !important',
					'width': '200rpx'
				},
				txfsUrls: [
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-xinjian.png",
					"../../static/treehole/biu/biu-email.png",
					"../../static/treehole/biu/biu-email-and-xj.png"
				],
				customStyle: {
					'margin': '-16rpx 0',
				},
				friendList: [],
				loadStatus2: "loadmore",
				page2: 1,
				ismore2: 1,
				lastid2: ''
			}
		},
		watch: {},
		onLoad(event) {
			let _params = event.params || event.payload;
			try {
				var _detail = JSON.parse(decodeURIComponent(_params));
			} catch (error) {
				var _detail = JSON.parse(_params);
			}
			this.mingpian = _detail;

			this.initData();

			// console.info("this.mingpian:::", _detail.friend)
			//
			this.reLoadData(_detail.friend)
		},
		methods: {
			copy(value) {
				if (this.model.cancelFriend === 1) {
					uni.setClipboardData({
						data: value, //要被复制的内容
						success: () => { //复制成功的回调函数 
							this.$u.toast("复制成功")
						}
					});
				}
			},
			// copy1(value) {
			// 	uni.setClipboardData({
			// 		data: value, //要被复制的内容
			// 		success: () => { //复制成功的回调函数 
			// 			this.$u.toast("复制成功")
			// 		}
			// 	});
			// },
			initData() {
				const that = this;
				let _url = "/user/home";
				let _params = {
					id: that.mingpian.friend
				};
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.mingpian = {
							..._result.data
						};
						// if (!that.mingpian.communicate) {
						that.mingpian.communicate = _result.data.communicate.value;
						// }
						// if (!that.mingpian.image) {
						that.mingpian.image = _result.data.image;
						// }
						that.model = _result.data;
						console.info("_result.data:6.1::", _result.data);
						that.disabled = that.model.allowFriend === 0 ? true : false;
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
			reLoadData(_friend) {
				this.page2 = 1;
				this.loadData({
					method: "friend",
					friend: _friend,
					page: this.page2,
					size: 9999,
					last: ''
				})
			},
			loadData(_params) {
				const that = this;
				let _url = "/hole/note/list";
				// console.info(_url, _params)
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					// console.info(_url, _result.data)
					if (_result.code === 200) {
						if (that.page2 === 1) {
							that.friendList = _result.data.list
						} else {
							that.friendList = that.friendList.concat(_result.data.list)
						}
						that.ismore2 = _result.data.more;
						that.lastid2 = _result.data.last;
						if (that.ismore2 === 1) {
							that.loadStatus2 = 'loadmore'
						} else {
							that.loadStatus2 = 'nomore'
						}
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						console.info("500::", _result.message)
					}
				}).catch((err) => {
					console.info("err::", err);
					let msg = err.message
				}).finally(() => {})
			},
			goBack() {
				uni.navigateBack({

				})
			},
			clickevent(idx) {
				if (idx === this.currIdx) {

				} else {
					this.currIdx = idx;
					this.titledata[0].show = !this.titledata[0].show;
					this.titledata[1].show = !this.titledata[1].show
				}
			},
			handleOpenMenu(_method) {
				if (_method === "guanzhu") {
					if (this.model.collect === 0) {
						this.guanzhu()
					} else {
						this.$u.toast("已关注")
					}
				}
			},
			guanzhu() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					setTimeout(() => {
						uni.reLaunch({
							url: '../home/home'
						})
					}, 600);
					return
				}
				let _url = "/user/collect";
				let _params = {
					method: "collect",
					relate: this.model.id,
				};
				this.apiMethod(_url, _params, 'guanzhu')
			},
			unGuanzhu() {
				let _url = "/user/collect";
				let _params = {
					method: "cancel",
					relate: this.model.id,
				};
				this.apiMethod(_url, _params, 'quguan')
			},
			haoyou() {

				if (!this.isLogin) {
					this.$u.toast("未登录");
					setTimeout(() => {
						uni.reLaunch({
							url: '../home/home'
						})
					}, 600);
					return
				}

				if (this.userInfo.isPenuser !== 1) {
					this.$u.toast("请完善寻友信息");
					setTimeout(() => {
						uni.navigateTo({
							url: '../home/register'
						})
					}, 600);
					return
				}
				if (this.userInfo.searchStatus === 0) {
					this.$u.toast("请开启寻友开关");
					setTimeout(() => {
						uni.reLaunch({
							url: '../home/home'
						})
					}, 600);
					return
				}
				
				if(this.disabled){
					this.$u.toast("该笔友已关闭寻友");
					return
				}

				// this.$u.toast("您点击了：申请笔友")
				let _url = "/user/friend/apply";
				let _params = {
					method: "communicate",
					friend: this.model.id
				};

				console.info(_url, _params);

				const that = this;
				that.$http.post(_url, _params).then(res => {
					if (res.data.code === 200) {
						let _list = res.data.data;
						if (_list.length > 1) {
							that.popup.list = _list;
							that.popup.show = true
						} else if (_list.length === 1) {
							that.popup.value = _list[0].id;

							that.applyBiyou()
						} else {
							that.$u.toast("无匹配的通信方式，暂时不能申请笔友！")
						}
					} else if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else if (res.data.code === 502) {
						// that.$u.toast("注册后可进行笔友申请")
						this.$tip.error('笔友信息未完善');
						setTimeout(() => {
							uni.navigateTo({
								url: '../home/register'
							})
						}, 1000)
					} else {
						that.$u.toast(res.data.message)
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			},
			applyBiyou() {
				let _url = "/user/friend/apply";
				let _params = {
					method: "apply",
					friend: this.model.id,
					communicate: this.popup.value
				};
				this.apiMethod(_url, _params, 'jiahaoyou')
			},
			unHaoyou() {
				uni.showModal({
					title: '提示',
					content: '您确定要解除笔友吗？',
					success: async (res) => {
						if (res.confirm) {
							let _url = "/user/friend/apply";
							let _params = {
								method: "cancel",
								friend: this.model.id
							};
							this.apiMethod(_url, _params, 'shanhaoyou')
						} else if (res.cancel) {}
					}
				});
			},
			wiatfor() {
				// this.$u.toast("申请中，请耐心等待...")
				uni.showModal({
					title: '提示',
					content: '申请中,是否要撤回申请?',
					success: async (res) => {
						if (res.confirm) {
							let _url = "/user/friend/apply";
							let _params = {
								method: "roll",
								friend: this.model.id
							};
							this.apiMethod(_url, _params, 'cancelApply')
						} else if (res.cancel) {}
					}
				});
			},
			apiMethod(_url, _params, _type) {
				console.info(_type, _params);
				const that = this;
				that.$http.post(_url, _params).then(res => {
					if (res.data.code === 200) {
						switch (_type) {
							case "guanzhu":
								that.model.collect = 1;
								break;
							case "quguan":
								that.model.collect = 0;
								break;
							case "jiahaoyou":
								that.model.friend = 2;
								break;
							case "shanhaoyou":
								that.model.friend = 0;
								that.$u.toast("已解除笔友");
								break;
							case "cancelApply":
								that.model.friend = 0;
								that.$u.toast("已撤回申请");
								break;
							default:
								break;
						}
					} else if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						this.$u.toast(res.data.message)
					}
				}).catch((err) => {
					let msg = err.message;
					console.info("apiMethod:", err)
				}).finally(() => {
					// that.goBack()
				})
			},
			handlePreImage() {
				uni.previewImage({
					urls: this.model.images
				})
			},
			handleOperate(_type, _letter_id) {
				console.info("sttttt::", _type);
				console.info("sttttt::", _letter_id);

				if (_type === 'delete') {
					let _url = "/hole/note/remove";
					let _params = {
						id: _letter_id
					};
					const that = this;
					that.$http.post(_url, _params).then(res => {
						if (res.data.code === 200) {
							that.reLoadData(that.mingpian.friend)
						} else if (res.data.code === 501) {
							setTimeout(() => {
								uni.hideLoading();
								that.$store.dispatch("Logout")
							}, 800)
						} else {
							that.$u.toast(res.data.message)
						}
					}).catch((err) => {
						let msg = err.message;
						console.info("handleDelete:", err)
					}).finally(() => {})
				}
			},
			tosixin() {

				if (!this.isLogin) {
					this.$u.toast("未登录");
					setTimeout(() => {
						uni.reLaunch({
							url: '../home/home'
						})
					}, 600);
				} else {
					if (this.model.priMsgStatus === 1) {
						// const _params = this.mingpian;
						const _params = {
							...this.model,
							friend: this.model.id
						}
						uni.navigateTo({
							url: '../../pages/msg/sixin?params=' + encodeURIComponent(JSON.stringify(_params))
						})
					} else {
						this.$u.toast("对方未开启私信")
					}
				}
			}

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style>
	.body {
		margin: 20rpx;
		padding: 10rpx;
	}

	.body-head {
		margin: 40rpx 10rpx;
		margin-left: 0 !important;
	}

	.body-title {
		display: flex;
		margin: 10rpx;
		padding-left: 20rpx;
		/* border: 1px solid #FF0000; */
	}

	.body-data {
		margin-left: -10rpx;
		margin-right: 0 !important;
		/* padding-left: 20rpx; */
		/* border: 1px solid #FF0000; */
	}

	.biu-head-nickname {
		color: #363D50;
		font-size: 32rpx;
		font-weight: 600;
		/* border: 1px solid #FF0000; */
		margin: -8rpx 10rpx;
	}

	.biu-head-age {
		color: #B3B3B3;
		font-size: 28rpx;
		/* border: 1px solid #00FF00; */
		margin: -8rpx 10rpx;
	}

	.jianjie-image-item {
		margin: 10rpx 10rpx 10rpx 30rpx;
		padding: 10rpx;
	}

	.jianjie-item {
		margin: 20rpx 50rpx;
		padding-top: 10rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #DBDBDB;
	}

	.jianjie-text {
		font-size: 32rpx;
		color: #363D50;
		font-weight: 400;
		margin-left: 30rpx;
	}


	.cell-title-1 {
		margin: 10rpx 4rpx;
		font-size: 36rpx;
		/* font-weight: bold; */
		color: #363D50;
	}

	.cell-text-1 {
		font-size: 32rpx;
		color: #8A8A8A;
		margin: 10rxp;
		display: flex;
	}

	.u-f-title-sixin {
		color: #AE9F82;
		font-size: 32rpx;
		border: 1px solid rgba(174, 159, 130, 0.11);
		padding: 15rpx 20rpx;
		/* padding: 15rpx 20rpx 15rpx 20rpx; */
		border-radius: 36rpx;
		display: flex;
	}
</style>
