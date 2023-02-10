<template>
	<view>
		<u-navbar back-text="" title="林间树洞" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>


		<u-sticky :offset-top="height" :enable="sticky.enable" @fixed="fixed" @unfixed="unfixed">
			<view class="u-f-aj" style="background-color: #FFFFFF; padding: 30rpx;">
				<view class="u-f-a">
					<block v-for="(item,index) in titledata" :key="index">
						<view class="u-f-title" style="margin-right: 20rpx;" @click="clickevent(index)">
							<u-image :src="item.icon" width="50rpx" height="50rpx"></u-image>

							<text v-show="item.show" style="margin: auto 20rpx auto 5rpx;">{{item.name}}</text>
						</view>
					</block>
				</view>
				<view class="th-plus u-f-ajc" @click="send2Treehole">
					<image :src="plusImg" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view>
		</u-sticky>

		<view class="body">
			<view v-show="currIdx===0" style="margin: 10rpx 30rpx;">
				<block v-for="(item,index) in tempList" :key="item.id">
					<view class="foest-hole-cell">
						<!-- <TreeHole :letter="item" @operate="handleOperate" @pinglun="openPinglun(item)"></TreeHole> -->
						<TreeHole :letter="item" :idx="index" @operate="handleOperate" :isLogin="isLogin"
							@handleDianzan="handleDianzan(item)" @link2page="link2page(item, index, 'dtl')"
							@openPinglun="link2page(item, index, 'pinglun')">
						</TreeHole>
					</view>
				</block>
				<u-loadmore :status="loadStatus1" bgColor="#ffffff" color="#CCCCCC">
				</u-loadmore>
			</view>

			<view v-show="currIdx===1">
				<block v-for="(item,index1) in mineList" :key="item.id">
					<view class="foest-hole-cell">
						<TreeHole :isFriend="true" :idx="index1" :letter="item" @operate="handleOperate"
							:isLogin="isLogin" @handleDianzan="handleDianzan(item)"
							@link2page="link2page1(item, index1,'dtl')"
							@openPinglun="link2page1(item, index1,'pinglun')">
						</TreeHole>
					</view>
				</block>
				<u-loadmore :status="loadStatus2" bgColor="#ffffff" color="#CCCCCC">
				</u-loadmore>
			</view>
		</view>


		<u-back-top :scroll-top="scrollTop"></u-back-top>

	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();

	import TreeHole from '../../compoents/home/tree-hole.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			TreeHole
		},
		computed: {
			...mapState({
				isLogin: 'isLogin'
			})
		},
		data() {
			return {
				scrollTop: 0,
				letter: {},
				// showKey: false,
				// focus: false,
				// placeholder: '',
				// content: '',
				srcleft: '../../../static/treehole/title-linjian.png',
				imgsize: 46,
				currIdx: 0,
				sticky: {
					enable: true,
				},
				height: 44,
				statusBarHeight: systemInfo.statusBarHeight,
				plusImg: '../../static/treehole/linjian/plus-white.png',
				customStyle: {
					'margin-bottom': '10rpx'
				},
				titledata: [{
						name: '林间',
						show: true,
						icon: '../../../static/bar-linjian-1.png',
						url: 'linjian'
					},
					{
						name: '我的树洞',
						show: false,
						icon: '../../../static/treehole/linjian/biu-shudong.png',
						url: 'wdshudong'
					}
				],
				tempList: [],
				mineList: [],
				loadStatus1: "loadmore",
				loadStatus2: "loadmore",
				page1: 1,
				ismore1: 1,
				page2: 1,
				ismore2: 1,
				lastid1: '',
				lastid2: '',
				pageSize: 10
			}
		},
		created() {
			let _params = {
				method: "index",
				friend: "",
				page: this.page1,
				size: this.pageSize,
				last: ''
			};
			this.loadData(_params)
		},
		watch: {
			currIdx(val) {
				if (val === 1) {
					if (!this.isLogin) {
						this.$u.toast("未登录");
						setTimeout(() => {
							uni.switchTab({
								url: "../home/home"
							})
						}, 500)
					} else {
						this.reloadData()
					}
				} else {
					this.reloadData()
				}
			}
		},
		methods: {
			// getValue(temporary) {
			// 	console.log(temporary, 'B页面传递的数据')
			// },
			link2page(item, idx, typ) {
				const that = this;
				item = {
					...item,
					typ: typ
				};
				// console.log("link2page--item: " + JSON.stringify(item));
				uni.navigateTo({
					url: "../../pages/forest/letter?params=" + encodeURIComponent(JSON.stringify(item)),
					events: {
						acceptDataFromOpenedPage: function(data) {
							that.tempList[idx].favor_num = data.data.favor_num;
							that.tempList[idx].is_favor = that.tempList[idx].is_favor === 1 ? 0 : 1
						},
						acceptDataFromOpenedPage1: function(data) {
							that.tempList[idx].comment_num = data.data.comment_num;
							that.tempList[idx].is_commented = 1
						}
					}
				})
			},
			link2page1(item, idx, typ) {
				const that = this;
				item = {
					...item,
					typ: typ
				};
				console.log("link2page1--item: " + JSON.stringify(item));
				uni.navigateTo({
					url: "../../pages/forest/letter?params=" + encodeURIComponent(JSON.stringify(item)),
					events: {
						acceptDataFromOpenedPage: function(data) {
							that.mineList[idx].favor_num = data.data.favor_num;
							that.mineList[idx].is_favor = that.mineList[idx].is_favor === 1 ? 0 : 1
						},
						acceptDataFromOpenedPage1: function(data) {
							that.mineList[idx].comment_num = data.data.comment_num;
							that.mineList[idx].is_commented = 1
						}
					}
				})
			},
			handleDianzan(item) {
				if (!this.isLogin) {
					this.$u.toast("请您先登录");
					return
				}
				let _is_favor = item.is_favor;
				let _url = "/hole/note/favor";
				let _params = {
					id: item.id
				};
				const that = this;
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					console.info(_url, _result.data);
					if (res.data.code === 200) {
						item.favor_num = _result.data.favor_num;
						item.is_favor = _is_favor === 1 ? 0 : 1;
						item.favor_images = _result.data.images
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(res.data.message)
					}
				}).catch((err) => {
					let msg = err.message
					// console.info("handleDianzan:", err)
				}).finally(() => {})
			},

			loadData(_params) {
				uni.showLoading({
					mask: true,
					title: "正在加载"
				});
				const that = this;
				let _url = "/hole/note/list";
				console.info("树洞界面begin", that.$u.date(Date.now(), 'yyyy-mm-dd hh:MM:ss'));
				that.$http.post(_url, _params).then(res => {
					console.info("树洞界面end", that.$u.date(Date.now(), 'yyyy-mm-dd hh:MM:ss'));
					let _result = res.data;
					if (_result.code === 200) {
						if (that.currIdx === 0) {
							if (that.page1 === 1) {
								that.tempList = _result.data.list
							} else {
								that.tempList = that.tempList.concat(_result.data.list)
							}
							that.ismore1 = _result.data.more;
							that.lastid1 = _result.data.last;
							if (that.ismore1 === 1) {
								that.loadStatus1 = 'loadmore'
							} else {
								that.loadStatus1 = 'nomore'
							}
						} else {
							if (that.page2 === 1) {
								that.mineList = _result.data.list
							} else {
								that.mineList = that.mineList.concat(_result.data.list)
							}
							that.ismore2 = _result.data.more;
							that.lastid2 = _result.data.last;
							if (that.ismore2 === 1) {
								that.loadStatus2 = 'loadmore'
							} else {
								that.loadStatus2 = 'nomore'
							}
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
				}).finally(() => {
					uni.hideLoading()
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
			send2Treehole() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					setTimeout(() => {
						uni.switchTab({
							url: "../home/home"
						})
					}, 500)
				} else {
					uni.navigateTo({
						url: './write'
					})
				}
			},
			fixed() {
				// this.$u.toast("触发吸顶")
			},
			unfixed() {
				// this.$u.toast("取消吸顶")
			},
			reloadData() {
				this.tempList = [];
				if (this.currIdx === 0) {
					this.page1 = 1
				} else {
					this.page2 = 1
				}
				let _params = {
					method: this.currIdx === 0 ? "index" : "mine",
					friend: "",
					page: this.currIdx === 0 ? this.page1 : this.page2,
					size: this.pageSize,
					last: ''
				};
				this.loadData(_params)
			},
			handleOperate(_method, _data, _idx) {

				let _url;
				let _params;
				switch (_method) {
					case "guanzhu":
						_url = "/user/collect";
						_params = {
							method: "collect",
							relate: _data,
						};
						this.apiMethod(_url, _params, 'guanzhu', _idx);
						break;
					case "jubao":
						if (this.isLogin) {
							let _params = {
								id: _data
							};
							uni.navigateTo({
								url: '../../pages/user/userhelp?params=' + encodeURIComponent(JSON.stringify(
									_params))
							})
						} else {
							uni.navigateTo({
								url: "../home/home"
							})
						}
						break;
					case "lahei":
						if (this.isLogin) {
							_url = "/user/black";
							_params = {
								relate: _data
							};
							this.apiMethod(_url, _params, 'lahei', _idx);
						} else {
							uni.navigateTo({
								url: "../home/home"
							})
						}
						break;
					case "delete":
						_url = "/hole/note/remove";
						_params = {
							id: _data
						};
						this.apiMethod(_url, _params, "delete", _idx);
						break;
					default:
						break;
				}
			},
			apiMethod(_url, _params, _type, _idx) {
				const that = this;
				that.$http.post(_url, _params).then(res => {
					if (res.data.code === 200) {
						if (_type === "delete") {
							// that.reloadData()
							that.mineList.splice(_idx, 1)
						}
						if (_type === "lahei") {
							that.$u.toast("移至黑名单");
							setTimeout(() => {
								// that.reloadData()
								that.tempList.splice(_idx, 1)
							}, 500)
						}
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
					console.info("shenqinghaoyou:", err)
				}).finally(() => {
					// that.goBack()
				})
			},
			popupClose() {
				this.focus = false
			},
			openPinglun(letter) {
				this.letter = letter;
				console.info("===============", letter);
				this.placeholder = "写评论";
				this.showKey = true;
				setTimeout(() => {
					this.focus = true
				}, 300)
			},
			submit() {
				let _url = "/hole/note/comment";
				let _params = {
					method: 'note',
					note: this.letter.id,
					content: this.content
				};

				const that = this;
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.getCommentList({
							note: that.letter.id,
							mine: 1,
							page: 1,
							size: 9999
						});
						that.showKey = false
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
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
			getCommentList(_params) {
				const that = this;
				that.$http.post("/hole/note/comment/list", _params).then(res => {
					let _result = res.data;
					console.info("_result::", _result);
					if (_result.code === 200) {
						that.commentList = _result.data.list;
						that.letter.comment_num++
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
		},
		onLoad() {
			this.height = this.height + this.statusBarHeight - 1
		},
		onPullDownRefresh() {
			this.reloadData();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			const that = this;
			if (that.currIdx === 0) {
				if (that.ismore1 === 0) {
					that.$u.toast("没有更多了");
					return false;
				} else {
					that.page1 += 1
				}
			} else {
				if (that.ismore2 === 0) {
					that.$u.toast("没有更多了");
					return false;
				} else {
					that.page2 += 1
				}
			}

			// if (that.ismore1 === 1) {
			// if (that.currIdx === 0) {
			// 	that.page1 += 1
			// } else {
			// 	that.page2 += 1
			// }

			let _params = {
				method: that.currIdx === 0 ? "index" : "mine",
				friend: "",
				page: that.currIdx === 0 ? that.page1 : that.page2,
				size: that.pageSize,
				last: that.currIdx === 0 ? that.lastid1 : that.lastid2
			};
			that.loadData(_params)
			// } else {
			// 	that.$u.toast("没有更多了")
			// }

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			// this.reloadData()
			console.log(this.temporary,1,'temporarytemporary11')
			console.log(this.mineList,'minlist')
			
			this.mineList.map((item,index)=>{
				if(item.id === this.temporary.id){
					this.$set(this.mineList,index,this.temporary)
				}
			})
			console.log(this.mineList,'sssasa')
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '树洞',
				path: '/pages/forest/forest'
			}
		}
	}
</script>

<style scoped>
	.body {
		margin: 10rpx;
		padding: 10rpx;
	}

	.th-plus {
		width: 100rpx;
		height: 70rpx;
		text-align: center;
		margin-right: 30rpx;
		border: 1px solid #AE9F82;
		background-color: #AE9F82;
		border-radius: 44rpx;
	}

	.foest-hole-cell {
		margin: 10rpx 0;
		padding: 0rpx;
		border-bottom: #EEEEEE 1rpx solid;
	}
</style>
