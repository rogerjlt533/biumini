<template>
	<view>
		<u-navbar back-text="" :title="title" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft"
			:custom-back="openSearch">
		</u-navbar>

		<u-sticky :offset-top="height" :enable="sticky.enable" @fixed="fixed" @unfixed="unfixed">
			<view class="home-data u-f-a" style="background-color: #FFFFFF;">
				<block v-for="(item,index) in titleList" :key="index">
					<view class="u-f-ajc u-f1 u-f-l">
						<view class="u-f-title-st" @click="clickevent(index)">
							<u-image :src="item.icon" :width="imgsize" :height="imgsize" mode="aspectFit"></u-image>
							<text v-show="currIdx === index" style="margin: auto 16rpx auto 10rpx;">{{item.name}}</text>
							<u-badge v-show="item.hasnew" :isDot="true" :offset="badeg.offset"></u-badge>
						</view>
					</view>
				</block>
			</view>
		</u-sticky>

		<view v-show="currIdx===0" ref="message">
			<view v-if="message_datalist.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<block v-for="(item,index) in message_datalist" :key="index">
				<view style="padding: 5rpx 20rpx;" @click="link2detail(item)" @longpress="longtap(item)">
					<XinxiCell :xinxi="item"></XinxiCell>
				</view>
			</block>
			<u-loadmore v-if="message_datalist.length>0" :status="loadStatus0" bgColor="#ffffff" color="#AE9F82">
			</u-loadmore>
		</view>

		<view v-show="currIdx===1" ref="public">
			<view v-if="public.datalist.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<block v-for="(item,index) in public.datalist" :key="index">
				<view style="padding: 5rpx 20rpx;" @click="link2detail(item)" @longpress="longtap(item)">
					<XinxiCell :xinxi="item"></XinxiCell>
				</view>
			</block>
			<u-loadmore v-if="public.datalist.length>0" :status="loadStatus1" bgColor="#ffffff" color="#AE9F82">
			</u-loadmore>
		</view>

		<view v-show="currIdx===2" ref="notice">
			<view v-if="notice.datalist.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<block v-for="(item,index) in notice.datalist" :key="index">
				<view style="padding: 5rpx 20rpx;" @click="link2detail(item)" @longpress="longtap(item)">
					<XinxiCell :xinxi="item"></XinxiCell>
				</view>
			</block>
			<u-loadmore v-if="notice.datalist.length>0" :status="loadStatus2" bgColor="#ffffff" color="#AE9F82">
			</u-loadmore>
		</view>


		<view v-show="currIdx===3" ref="sixin">
			<view v-if="sixin.datalist.length===0" style="color: #CCCCCC;font-size: 30rpx;text-align: center;">
				<u-divider>暂无数据</u-divider>
			</view>
			<block v-for="(item,index) in sixin.datalist" :key="index">
				<view style="padding: 5rpx 20rpx;" @longpress="longtap_sixin(item)">
					<SixinCell :biuXinxi="item" @link2biu="link2biu(item)" @link2sx="link2sx(item)"></SixinCell>
				</view>
			</block>
			<!-- <u-loadmore v-if="sixin.datalist.length>0" :status="loadStatus3" bgColor="#ffffff" color="#AE9F82">
			</u-loadmore> -->
		</view>

		<u-popup v-model="searchShow" mode="center" height="600rpx" width="90%" duration=0 borderRadius=30>
			<view class="search-body">
				<view v-show="currIdx===0">
					<view class="search-title">分类</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in categroyList1" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="categroyIndex1===index ? colorList[1]:colorList[0]"
								:borderColor="categroyIndex1===index ?bgColorList[1]:bgColorList[0]"
								:bgColor="categroyIndex1===index ?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check1(index)">
							</u-tag>
						</block>
					</view>
					<view class="search-title">状态</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in statusList" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="statusIndex1===index?colorList[1]:colorList[0]"
								:borderColor="statusIndex1===index?bgColorList[1]:bgColorList[0]"
								:bgColor="statusIndex1===index?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check2(index)">
							</u-tag>
						</block>
					</view>
				</view>

				<view v-show="currIdx===1">
					<view class="search-title">分类</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in categroyList2" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="categroyIndex2===index ? colorList[1]:colorList[0]"
								:borderColor="categroyIndex2===index ?bgColorList[1]:bgColorList[0]"
								:bgColor="categroyIndex2===index ?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check1(index)">
							</u-tag>
						</block>
					</view>
					<view class="search-title">状态</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in statusList" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="statusIndex2===index?colorList[1]:colorList[0]"
								:borderColor="statusIndex2===index?bgColorList[1]:bgColorList[0]"
								:bgColor="statusIndex2===index?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check2(index)">
							</u-tag>
						</block>
					</view>
				</view>

				<view v-show="currIdx===2">
					<view class="search-title">分类</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in categroyList3" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="categroyIndex3===index ? colorList[1]:colorList[0]"
								:borderColor="categroyIndex3===index ? bgColorList[1]:bgColorList[0]"
								:bgColor="categroyIndex3===index ? bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check1(index)">
							</u-tag>
						</block>
					</view>
					<view class="search-title">状态</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in statusList" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="statusIndex3===index?colorList[1]:colorList[0]"
								:borderColor="statusIndex3===index?bgColorList[1]:bgColorList[0]"
								:bgColor="statusIndex3===index?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check2(index)">
							</u-tag>
						</block>
					</view>
				</view>

				<view v-show="currIdx===3">
					<view class="search-title">分类</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in categroyList4" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="categroyIndex4===index ? colorList[1]:colorList[0]"
								:borderColor="categroyIndex4===index ? bgColorList[1]:bgColorList[0]"
								:bgColor="categroyIndex4===index ? bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check1(index)">
							</u-tag>
						</block>
					</view>
					<view class="search-title">状态</view>
					<view class="u-f-a" style="margin: 0rpx 40rpx;">
						<block v-for="(item,index) in statusList" :key="index">
							<u-tag :text="item.name" size="bigest"
								:color="statusIndex4===index?colorList[1]:colorList[0]"
								:borderColor="statusIndex4===index?bgColorList[1]:bgColorList[0]"
								:bgColor="statusIndex4===index?bgColorList[1]:bgColorList[0]" shape="circle"
								@click="check2(index)">
							</u-tag>
						</block>
					</view>
				</view>

				<view class="u-f-ajc" style="margin-top: 80rpx;">
					<u-button shape="circle" size="medium" @click="handleReset" :customStyle="rstCustomStyle">重置
					</u-button>
					<view style="width: 20rpx;"></view>
					<u-button shape="circle" size="medium" type="primary" @click="handleSearch">确定</u-button>
				</view>
			</view>
		</u-popup>

		<u-back-top :scroll-top="scrollTop"></u-back-top>

	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();

	import BiuInfo from "../../compoents/home/biu-info.vue";
	import XinxiCell from "../../compoents/home/xinxi-cell.vue";
	import SixinCell from "../../compoents/home/sixin-cell.vue";
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		components: {
			BiuInfo,
			XinxiCell,
			SixinCell
		},
		computed: {
			...mapState({
				isLogin: 'isLogin'
			})
		},
		data() {
			return {
				scrollTop: 0,
				// isRefresh: uni.getStorageSync("isRefresh"),
				searchShow: false,
				rstCustomStyle: {
					'border': '1rpx solid #AE9F82',
					'color': '#AE9F82'
				},
				colorList: ["#363D50", "#FFFFFF"],
				bgColorList: ["#EDEDED", "#AE9F82"],
				categroyIndex1: 0,
				categroyList1: [{
					value: 0,
					name: "全部"
				}, {
					value: 2001,
					name: "评论"
				}, {
					value: 2002,
					name: "抱抱"
				}, {
					value: 2003,
					name: "回复"
				}],
				categroyIndex2: 0,
				categroyList2: [{
					value: 0,
					name: "全部"
				}, {
					value: 1001,
					name: "公告"
				}, {
					value: 1002,
					name: "活动"
				}, {
					value: 1003,
					name: "更新"
				}],
				categroyIndex3: 0,
				categroyList3: [{
					value: 0,
					name: "全部"
				}, {
					value: 3001,
					name: "申请"
				}, {
					value: 3002,
					name: "笔友"
				}, {
					value: 3003,
					name: "寄信"
				}, {
					value: 3004,
					name: "收信"
				}],
				categroyIndex4: 0,
				categroyList4: [{
					value: 2,
					name: "全部"
				}, {
					value: 0,
					name: "陌生人"
				}, {
					value: 1,
					name: "笔友"
				}],
				statusIndex1: 0,
				statusIndex2: 0,
				statusIndex3: 0,
				statusIndex4: 0,
				statusList: [{
					value: 2,
					name: "全部"
				}, {
					value: 1,
					name: "已读"
				}, {
					value: 0,
					name: "未读"
				}],
				badeg: {
					offset: [-2, -2]
				},
				sticky: {
					enable: true,
				},
				height: 44,
				statusBarHeight: systemInfo.statusBarHeight,
				srcleft: '../../../static/treehole/xinxi/xinxi-tip.png',
				imgsize: 46,
				currIdx: 0,
				title: '信息',
				titleList: [{
						name: '信息',
						show: true,
						icon: '../../../static/treehole/xinxi/xinxi-sixin.png',
						hasnew: false
					},
					{
						name: '公告',
						show: false,
						icon: '../../../static/treehole/xinxi/xinxi-gonggao.png',
						hasnew: false
					},
					{
						name: '通知',
						show: false,
						icon: '../../../static/treehole/xinxi/xinxi-tongzhi.png',
						hasnew: false
					},
					{
						name: '私信',
						show: false,
						icon: '../../../static/treehole/xinxi/xinxi-xinxi.png',
						hasnew: false
					}
				],
				// message: {
				// 	datalist: []
				// },
				message_datalist: [],
				public: {
					datalist: []
				},
				notice: {
					datalist: []
				},
				sixin: {
					datalist: []
				},
				page1: 1,
				page2: 1,
				page3: 1,
				page4: 1,
				loadStatus0: "loadmore",
				loadStatus1: "loadmore",
				loadStatus2: "loadmore",
				loadStatus3: "loadmore",
				ismore1: 1,
				ismore2: 1,
				ismore3: 1,
				ismore4: 1,
				lastid1: '',
				lastid2: '',
				lastid3: '',
				lastid4: ''
			}
		},
		watch: {
			// scrollTop(val) {
			// 	this.$refs.uDropdown.close();
			// },
			currIdx(val) {
				switch (val) {
					case 0:
						if (this.message_datalist.length === 0) {
							this.handleSearch()
						}
						break;
					case 1:
						if (this.public.datalist.length === 0) {
							this.handleSearch()
						}
						break;
					case 2:
						if (this.notice.datalist.length === 0) {
							this.handleSearch()
						}
						break;
					case 3:
						if (this.notice.datalist.length === 0) {
							this.handleSearch()
						}
						break;
					default:
						break;
				}
			}
		},
		methods: {
			link2sx(record) {
				// let _params = {
				// 	...record,
				// 	friend: record.id
				// };
				let _params = {
					...record,
					friend: record.id,
					id: record.frient
				};

				_params.communicate = record.communicateInfo.communicate;
				uni.navigateTo({
					url: '../../pages/msg/sixin?params=' + encodeURIComponent(JSON.stringify(_params))
				})
			},
			link2biu(record) {
				let _params = {
					...record,
					friend: record.id,
					id: record.frient
				};

				_params.communicate = record.communicateInfo.communicate;
				uni.navigateTo({
					url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
				})



				// let _params = record;
				// _params.communicate = record.communicateInfo.communicate;
				// console.info("1111111:::::::::", _params)
				// uni.navigateTo({
				// 	url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
				// })
			},
			getBlackList(params) {
				const that = this;
				const _url = "/user/friend/message/users";
				const _param = {
					isFriend: params.sub,
					read: params.read
				};
				that.$http.post(_url, _param).then(res => {
					console.info(res);
					let _result = res.data;
					if (_result.code === 200) {
						console.info("_result.data:5.30:::::", _result.data.list);
						that.sixin.datalist = _result.data.list
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
			//点击图标
			clickevent(idx) {
				this.title = this.titleList[idx].name;
				this.currIdx = idx
			},
			fixed() {
				// this.$u.toast("触发吸顶")
			},
			unfixed() {
				// this.$u.toast("取消吸顶")
			},
			openSearch() {
				// if (this.currIdx !== 3) {
				this.searchShow = true
				// }
			},
			allReaded(_type) {
				const _url = "/user/message/all/read"
				this.$http.post(_url, {
					'type': _type
				}).then(res => {
					if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							this.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {}).finally(() => {})

			},
			handleSearch() {
				this.titleList[this.currIdx].hasnew = false;
				switch (this.currIdx) {
					case 0:
						this.allReaded("message")
						this.loadData({
							type: "message",
							sub: this.categroyList1[this.categroyIndex1].value,
							read: this.statusList[this.statusIndex1].value,
							page: this.page1
						});
						break;
					case 1:
						this.allReaded("public")
						this.loadData({
							type: "public",
							sub: this.categroyList2[this.categroyIndex2].value,
							read: this.statusList[this.statusIndex2].value,
							page: this.page2
						});
						break;
					case 2:
						this.allReaded("notice")
						this.loadData({
							type: "notice",
							sub: this.categroyList3[this.categroyIndex3].value,
							read: this.statusList[this.statusIndex3].value,
							page: this.page3
						});
						break;
					case 3:
						this.allReaded("private")
						this.getBlackList({
							sub: this.categroyList4[this.categroyIndex4].value,
							read: this.statusList[this.statusIndex4].value,
							page: this.page4
						});
						break;
					default:
						break;
				}
				this.searchShow = false;
			},
			handleReset() {
				switch (this.currIdx) {
					case 0:
						this.categroyIndex1 = 0;
						this.statusIndex1 = 0;
						break;
					case 1:
						this.categroyIndex2 = 0;
						this.statusIndex2 = 0;
						break;
					case 2:
						this.categroyIndex3 = 0;
						this.statusIndex3 = 0;
						break;
					case 3:
						this.categroyIndex4 = 2;
						this.statusIndex4 = 0;
						break;
					default:
						break;
				}
				this.searchShow = false;
				this.handleSearch()
			},
			check1(index) {
				switch (this.currIdx) {
					case 0:
						this.categroyIndex1 = index;
						break;
					case 1:
						this.categroyIndex2 = index;
						break;
					case 2:
						this.categroyIndex3 = index;
						break;
					case 3:
						this.categroyIndex4 = index;
						break;
					default:
						break;
				}
			},
			check2(index) {
				switch (this.currIdx) {
					case 0:
						this.statusIndex1 = index;
						break;
					case 1:
						this.statusIndex2 = index;
						break;
					case 2:
						this.statusIndex3 = index;
						break;
					case 3:
						this.statusIndex4 = index;
						break;
					default:
						break;
				}
			},
			loadData(_params) {
				uni.showLoading({
					mask: true,
					title: "正在加载"
				});

				const that = this;
				let _url = "/user/message/list";
				_params = {
					..._params,
					size: 20
				};
				if (_params.page > 1) {
					if (_params.type === 'message') {
						_params = {
							..._params,
							last: that.lastid1
						}
					}
					if (_params.type === 'public') {
						_params = {
							..._params,
							last: that.lastid2
						}
					}
					if (_params.type === 'notice') {
						_params = {
							..._params,
							last: that.lastid3
						}
					}
				}
				// console.info("msg:::_params::", _params)
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						console.info("_result.data:4.25:", _result.data);
						switch (that.currIdx) {
							case 0:
								that.ismore1 = _result.data.more;
								that.lastid1 = _result.data.last;
								// console.info("_result.data:200:", that.page1)
								if (that.page1 === 1) {
									that.message_datalist = [];
									that.message_datalist = _result.data.list
								} else {
									that.message_datalist = that.message_datalist.concat(_result.data.list)
								}
								break;
							case 1:
								that.ismore2 = _result.data.more;
								that.lastid2 = _result.data.last;
								if (that.page2 === 1) {
									that.public.datalist = [];
									that.public.datalist = _result.data.list
								} else {
									that.public.datalist = that.public.datalist.concat(_result.data.list)
								}
								break;
							case 2:
								that.ismore3 = _result.data.more;
								that.lastid3 = _result.data.last;
								if (that.page3 === 1) {
									that.notice.datalist = [];
									that.notice.datalist = _result.data.list
								} else {
									that.notice.datalist = that.notice.datalist.concat(_result.data.list)
								}
								break;
							default:
								break;
						}
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						switch (that.currIdx) {
							case 0:
								that.message_datalist = [];
								break;
							case 1:
								that.public.datalist = [];
								break;
							case 2:
								that.notice.datalist = [];
								break;
							default:
								break;
						}
					}
				}).catch((err) => {
					console.info("err::", err);
					let msg = err.message
					// that.$tip.error(msg);
				}).finally(() => {
					uni.hideLoading()
				})
			},
			hasReaded(id) {
				const that = this;
				let _url = "/user/message/read";
				let _params = {
					id: id
				};
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					console.info(_result);
					if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
					that.getMsgTip()
				}).catch((err) => {
					let msg = err.message;
					console.info("error:", msg)
				}).finally(() => {})
			},
			link2detail(record) {

				if (record.readStatus === 0) {
					this.hasReaded(record.id)
				}

				const that = this;
				if (that.currIdx === 0) {
					let _url = '/hole/note/info';
					that.$http.post(_url, {
						id: record.note
					}).then(res => {
						let _result = res.data;
						if (_result.code === 200) {
							// console.info(_url, _result.data);
							uni.navigateTo({
								url: '../forest/letter?params=' + encodeURIComponent(JSON.stringify(
									_result.data))
							})
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
					}).finally(() => {})

				} else if (that.currIdx === 1) {
					uni.navigateTo({
						url: "./msgdetail?params=" + encodeURIComponent(JSON.stringify(record))
					})
				} else {
					if (record.messageType === 3003 || record.messageType === 3004) {
						uni.setStorageSync("msg_to", 2);
						setTimeout(() => {
							uni.switchTab({
								url: '../home/home'
							})
						}, 500)
					} else {
						uni.navigateTo({
							url: "./msgdetail?params=" + encodeURIComponent(JSON.stringify(record))
						})
					}

				}
			},
			getMsgTip() {
				const that = this;
				let _url = "/user/message/tip";
				that.$http.post(_url, {}).then(res => {
					let _result = res.data;
					console.info(_url, _result.data);
					if (_result.code === 200) {
						if (_result.data.message > 0) {
							that.titleList[0].hasnew = true
						} else {
							that.titleList[0].hasnew = false
						}
						if (_result.data.public > 0) {
							that.titleList[1].hasnew = true
						} else {
							that.titleList[1].hasnew = false
						}
						if (_result.data.notice > 0) {
							that.titleList[2].hasnew = true
						} else {
							that.titleList[2].hasnew = false
						}
						if (_result.data.private > 0) {
							that.titleList[3].hasnew = true
						} else {
							that.titleList[3].hasnew = false
						}

						//5、信息红点：点开底部菜单的信息后消除（不需要挨个点开之后消除）
						uni.hideTabBarRedDot({
							index: 2
						})

						// if (that.titleList[0].hasnew || that.titleList[1].hasnew || that.titleList[2].hasnew ||
						// 	that.titleList[3].hasnew) {
						// 	uni.showTabBarRedDot({
						// 		index: 2
						// 	})
						// } else {
						// 	uni.hideTabBarRedDot({
						// 		index: 2
						// 	})
						// }
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
				}).finally(() => {})
			},
			longtap(item) {
				uni.showModal({
					title: '提示',
					content: '是否删除该消息？',
					success: async (res) => {
						if (res.confirm) {
							const that = this;
							let _url = "/user/message/remove";
							let _params = {
								id: item.id
							};
							// console.info("=========:", _params)
							that.$http.post(_url, {
								id: item.id
							}).then(res => {
								let _result = res.data;
								// console.info(_result)
								if (_result.code === 200) {
									that.page1 = 1;
									that.page2 = 1;
									that.page3 = 1;
									that.getMsgTip();
									that.handleSearch()
								} else if (_result.code === 501) {
									setTimeout(() => {
										uni.hideLoading();
										that.$store.dispatch("Logout")
									}, 800)
								}
							}).catch((err) => {
								let msg = err.message;
								console.info(_url, err)
							}).finally(() => {})
						} else if (res.cancel) {

						}
					}
				});
			},
			longtap_sixin(item) {
				uni.showModal({
					title: '提示',
					content: '是否删除私信记录？',
					success: async (res) => {
						if (res.confirm) {
							const that = this;
							let _url = "/user/friend/message/remove";
							let _params = {
								friend: item.id
							};
							that.$http.post(_url, _params).then(res => {

								console.info(res);
								let _result = res.data;
								if (_result.code === 200) {
									that.page4 = 1;
									that.getMsgTip();
									that.handleSearch()
								} else if (_result.code === 501) {
									setTimeout(() => {
										uni.hideLoading();
										that.$store.dispatch("Logout")
									}, 800)
								} else {}
							}).catch((err) => {
								let msg = err.message;
								console.info(_url, err)
							}).finally(() => {})
						} else if (res.cancel) {

						}
					}
				});
			}
		},
		onPullDownRefresh() {
			this.page1 = 1;
			this.page2 = 1;
			this.page3 = 1;
			this.handleSearch();
			this.getMsgTip();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1200)
		},
		onReachBottom() {
			// console.info("suznttt::msg::", this.ismore1)
			// console.info("suznttt::msg::", this.ismore2)
			// console.info("suznttt::msg::", this.ismore3)
			switch (this.currIdx) {
				case 0:
					if (this.ismore1 === 1) {
						this.page1 += 1;
						this.loadStatus0 = "loading";
						setTimeout(() => {
							this.loadStatus0 = 'loadmore'
						}, 500);
						this.handleSearch();
						this.getMsgTip()
					} else {
						this.loadStatus0 = "nomore";
						this.$u.toast("没有更多了")
					}
					break;
				case 1:
					if (this.ismore2 === 1) {
						this.page2 += 1;
						this.loadStatus1 = "loading";
						setTimeout(() => {
							this.loadStatus1 = 'loadmore'
						}, 500);
						this.handleSearch();
						this.getMsgTip()
					} else {
						this.loadStatus1 = "nomore";
						this.$u.toast("没有更多了")
					}
					break;
				case 2:
					if (this.ismore3 === 1) {
						this.page3 += 1;
						this.loadStatus2 = "loading";
						setTimeout(() => {
							this.loadStatus2 = 'loadmore'
						}, 500);
						this.handleSearch();
						this.getMsgTip()
					} else {
						this.loadStatus2 = "nomore";
						this.$u.toast("没有更多了")
					}
					break;
				default:
					break;
			}
		},
		onLoad() {
			this.height = this.height + this.statusBarHeight - 1
			// uni.setStorageSync("isRefresh", false)

			this.titleList[this.currIdx].hasnew = false;
		},
		mounted() {
			//this.watchsoroll();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.page1 = 1;
			this.page2 = 1;
			this.page3 = 1;
			if (!this.isLogin) {
				this.$u.toast("未登录");
				setTimeout(() => {
					uni.switchTab({
						url: "../home/home"
					})
				}, 500)
			} else {
				this.getMsgTip();
				this.handleSearch()
			}
			if (this.currIdx === 3) {
				this.getBlackList({
					sub: this.categroyList4[this.categroyIndex4].value,
					read: this.statusList[this.statusIndex4].value
				})
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

	.u-f-title-st {
		color: #AE9F82;
		font-size: 28rpx;
		border: 1px solid rgba(174, 159, 130, 0.11);
		padding: 15rpx 15rpx;
		/* padding: 15rpx 20rpx 15rpx 20rpx; */
		border-radius: 36rpx;
		display: flex;
		position: relative;
	}


	.search-body {
		/* margin: 20rpx; */
		padding: 40rxp;
	}

	.search-title {
		padding: 30rpx;
		color: "#999999";
		font-size: 30rpx;
	}
</style>
