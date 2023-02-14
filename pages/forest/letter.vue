<template>
	<view>
		<u-navbar back-text="" title="树洞信" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize" :srcleft="srcleft"
			ref="navbar">
		</u-navbar>

		<view class="body">
			<view class="u-f-a" style="margin: 10rpx 20rpx;">
				<image :src="letter.image" mode="aspectFill" style="width: 90rpx;height: 90rpx; border-radius: 50%;"
					@click="toBiuPage">
				</image>
				<image :src="letter.mood_emoj" model="aspectFill" @click="toBiuPage"
					style="width: 40rpx;height: 40rpx; margin-left: -30rpx;margin-top: 50rpx;">
				</image>
				<view class="tree-hole-title" @click="toBiuPage">
					<view class="tree-hole-name">{{letter.name}}</view>
					<view class="tree-hole-time">{{letter.create_time}}</view>
				</view>
				<view class="mingpian-operate">
					<view class="mingpian-share">
						<image :src="pointUrl" mode="aspectFill" style="width: 42rpx;height: 42rpx;"
							@click="handleOperate">
						</image>
					</view>
				</view>
			</view>

			<view>
				<!-- <view class="tree-hole-content" @longtap.stop="copy(letter.content)">{{letter.content}}</view> -->
				<view class="tree-hole-content" @longtap.stop="copy(letter.content)">
					<u-parse :html="letter.content"></u-parse>
				</view>

				<view class="letter-images" style="padding: none;">
					<u-grid :col="3" :border="false">
						<block v-for="(item, index) in letter.images" :key="index">
							<u-grid-item :customStyle="customStyleGrid" @click="handlePreImage(index)">
								<image style="width: 200rpx;height:200rpx;border-radius: 8rpx;" mode="aspectFill"
									:src="item"></image>
							</u-grid-item>
						</block>
					</u-grid>
				</view>

				<view class="u-f-aj" style="margin:10rpx;">
					<view class="biu-label">
						{{labelTag}}
					</view>
					<view class="u-f-ajc" v-if="isLogin">
						<view @click="openPinglun" class="u-f-ajc" style="width: 130rpx;">
							<u-image :src="pinglunIcons[letter.is_commented] ||''" mode="heightFix" height="60rpx">
							</u-image>
							<view class="pinglun-dianzan" style="margin-right: 50rpx;">
								{{letter.comment_num}}
							</view>
						</view>
						<view @click="handleDianzan" class="u-f-ajc" style="width: 130rpx;">
							<!-- <u-image :src="dianzanIcons[letter.is_favor]" mode="heightFix" height="60rpx"></u-image> -->
							<u-image v-show="gifCount===0" :src="dianzanIcons[letter.is_favor] ||''" mode="heightFix"
								height="60rpx">
							</u-image>
							<u-image v-show="gifCount>0" :src="gifsrc" mode="heightFix" height="60rpx">
							</u-image>
							<view class="pinglun-dianzan"> {{letter.favor_num}} </view>
						</view>
					</view>
				</view>

				<view class="letter-favor" v-if="isLogin">
					<block v-for="(item,index) in favorImgList" :key="index">
						<image mode="aspectFill"
							style="width: 70rpx;height: 70rpx;border-radius: 50%;margin-left: -14rpx;" :src="item">
						</image>
					</block>
				</view>

				<view class="letter-pinglun" v-if="commentList.length>0 && isLogin">
					<block v-for="(item,index1) in commentList" :key="index1">
						<view class="comment-box-parent" :id="item.comment_id">
							<view class="comment-box" @click.stop="handleReplySub(item,index1)">
								<view class="comment-parent">
									<view class="comment-parent-title">
										<image @click.stop="fromCommentToBiuPage(item)" class="comment-image"
											:src="item.user_image">
										</image>
										{{item.title}}
									</view>
									<view style="font-size: 26rpx;color: #999999;">{{item.create_time}}</view>
								</view>
								<view class="comment-content">
									{{item.content}}
								</view>
							</view>

							<view style="margin-left: 80rpx;">
								<block v-for="(subitem,subidx) in item.subList" :key="subitem.comment_id">
									<view class="comment-box" @click.stop="handleReplySub(subitem, index1)"
										:id="subitem.comment_id">
										<view class="comment-parent">

											<view class="comment-parent-title">
												<image @click.stop="fromCommentToBiuPage(subitem)"
													class="comment-image-sub" :src="subitem.user_image"></image>
												{{subitem.title}}
											</view>
											<view style="font-size: 26rpx;color: #999999;">{{subitem.create_time}}
											</view>
										</view>
										<view class="comment-content">
											{{subitem.content}}
										</view>
									</view>
								</block>
							</view>

							<!-- <view class="open-more" v-if="item.has_children===1" @click.stop="openReply(item, index1)">
							展开更多回复
						</view> -->
						</view>
					</block>
				</view>
				<view v-else>
					<u-divider v-if="isLogin">暂无评论</u-divider>
					<u-divider v-else>登录后看评论</u-divider>
				</view>
			</view>
		</view>

		<u-mask :show="showMenu" @click="showMenu = false" :customStyle="customStyle">
			<view class="mingpian-share-menu" :style="'left:'+left+'px;top:'+top+'px;'">
				<u-button open-type="share" @click="handleFenxiang" type="primary" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[0] ||''" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						分享</view>
				</u-button>
				<u-gap height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.is_collect===1" @click="handleGuanzhu" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[1] ||''" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						关注</view>
				</u-button>
				<u-gap v-if="letter.is_collect===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_report===1" @click="handleJubao" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[2]||''" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						举报</view>
				</u-button>
				<u-gap v-if="letter.allow_report===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_remove===1" @click="handleEdit" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[3]||''" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						编辑</view>
				</u-button>
				<u-gap v-if="letter.allow_remove===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_remove===1" @click="handleDelete" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[4]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						删除</view>
				</u-button>
			</view>
		</u-mask>


		<u-popup v-model="showKey" height="140rpx;" :duration="0" @close="popupClose">
			<view class="u-f-a" style="padding: 10rpx;">
				<view style="margin: 10rpx;width: 100%;">
					<u-input v-model="content" type="text" :focus="focus" :border="true" cursorSpacing=10
						:placeholder="placeholder">
					</u-input>
				</view>
				<view style="width: 170rpx;">
					<u-button type="primary" :disabled="disalbed" @click="submit">确定</u-button>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	// import BiuComment from '../../compoents/home/biu-comment.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			// BiuComment
		},
		computed: {
			...mapState({
				isLogin: 'isLogin'
			}),
			labelTag() {
				if (!this.letter.label_tag) {
					return ''
				} else {
					return '#' + this.letter.label_tag + '#'
				}
			}
		},
		data() {
			return {
				disalbed: false,
				showKey: false,
				focus: false,
				placeholder: '',
				content: '',
				srcleft: '../../../static/treehole/my/back.png',
				imgsize: 46,
				customStyleGrid: {
					'margin': '-16rpx 0',
				},
				letter: {},
				pinglunIcons: [
					"../../../static/treehole/biu/pinglun-0.png",
					"../../../static/treehole/biu/pinglun-1.png",
				],
				dianzanIcons: [
					"../../../static/treehole/biu/dianzan-0.png",
					"../../../static/treehole/biu/dianzan-1.png"
				],
				gif: "http://biuimage.zuosuo.net/baobao.gif",
				gifsrc: "",
				menuUrl: [
					"../../../static/treehole/biu/sd-share.png",
					"../../../static/treehole/my/wd-guanzhu.png",
					"../../../static/treehole/biu/sd-jubao.png",
					"../../../static/treehole/my/wd-bianji.png",
					"../../../static/treehole/biu/biu-lahei.png"
				],
				customStyle: {
					"background-color": "rgba(0, 0, 0, 0.05)",
					'border': '1px solid rgba(174, 159, 130, 0.2)',
					'border-radius': '16rpx',
				},
				favorImgList: [],
				showMenu: false,
				left: 0,
				top: 0,
				// isClickPosition: false,
				pointUrl: '../../static/treehole/biu/point.png',
				menuBtnStyle: {
					'padding-left': '10rpx',
					'border': 'none',
					'font-size': '32rpx',
					'color': '#AE9F82',
					'background-color': '#F5F5F5'
				},
				commentList: [],
				lastid: '',
				replyId: '',
				replyIndex: -1,
				isReply: false,
				pagesize: 9999,
				model: {},
				gifCount: 0,
				dianzanOver: true,
				eventChannel: {}
			}
		},
		onLoad(event) {
			let _params = event.params || event.payload;
			try {
				var _detail = JSON.parse(decodeURIComponent(_params));
			} catch (error) {
				var _detail = JSON.parse(_params);
			}
			this.letter = _detail;
			this.favorImgList = _detail.favor_images;

			this.$nextTick(() => {
				if (_detail.typ === "pinglun") {
					this.showKey = true;
					this.focus = true
				}
			});

			this.getCommentList({
				note: this.letter.id,
				mine: 0,
				page: 1,
				size: this.pagesize
			});

			const that = this;
			let _url = "/user/home";
			that.$http.post(_url, {
				id: that.letter.user
			}).then(res => {
				let _result = res.data;
				if (_result.code === 200) {
					that.model = {
						..._result.data,
						communicate: _result.data.communicate.value
					}
				} else if (_result.code === 501) {
					setTimeout(() => {
						uni.hideLoading();
						that.$store.dispatch("Logout")
					}, 800)
				}
			}).catch((err) => {
				let msg = err.message
			}).finally(() => {
				// console.info("/user/home:5.9::", that.model)
			});


			// #ifdef APP-NVUE
			this.eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			this.eventChannel = this.getOpenerEventChannel();
			// #endif
		},
		onShareAppMessage(res) {
			this.showMenu = false;
			return {
				title: "欢迎来到我的树洞",
				path: '/pages/user/biu'
				// path: '/packages/shop/StoreDetail/index?id=' + this.detailObj.id + '&shareShow=true'
			}
		},
		methods: {
			copy(content) {
				uni.setClipboardData({
					data: content, //要被复制的内容
					success: () => { //复制成功的回调函数 
						this.$u.toast("复制成功")
					}
				});
			},
			toBiuPage() {

				if (this.letter.nick_show === 0) {
					// this.$u.toast("匿名不可访问")
					return
				}
				let _params = {
					...this.model,
					friend: this.model.id
				};
				uni.navigateTo({
					url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
				})
			},
			fromCommentToBiuPage(e) {
				console.log("eeeeeeeeee: " + JSON.stringify(e));
				if (e.is_nickname === 1) {
					// this.$u.toast("匿名不可访问")
					return
				}
				let _params = {
					friend: e.send_userid
				};
				uni.navigateTo({
					url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
				})
			},
			handleDianzan() {
				if (this.dianzanOver) {
					this.dianzanOver = false;
					this.gifCount++;
					if (this.letter.is_favor === 0) {
						this.gifsrc = this.gif + "?" + (new Date().getTime());

						// this.gifOver = false
						this.dianzan()
					} else {
						this.gifCount = 0;
						this.dianzan()
					}
					setTimeout(() => {
						this.dianzanOver = true
					}, 3000)
				} else {
					this.$u.toast("太快了,休息一下吧~")
				}
			},
			dianzan() {
				if (!this.isLogin) {
					this.$u.toast("请您先登录");
					return
				}
				let _url = "/hole/note/favor";
				let _params = {
					id: this.letter.id
				};
				const that = this;
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					console.info("_result::", _result);
					if (res.data.code === 200) {
						that.letter.favor_num = _result.data.favor_num;
						that.letter.is_favor = that.letter.is_favor === 1 ? 0 : 1;
						// if (that.letter.is_favor !== 1) {
						// 	that.gifCount = 0;
						// }
						that.favorImgList = _result.data.images;

						that.eventChannel.emit('acceptDataFromOpenedPage', {
							data: that.letter
						});
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(res.data.message)
					}
				}).catch((err) => {
					let msg = err.message;
					console.info("handleDianzan:", err)
				}).finally(() => {})
			},
			// getCommentList(_params) {
			// 	const that = this;
			// 	that.$http.post("/hole/note/comment/list", _params).then(res => {
			// 		let _result = res.data;
			// 		console.info("_params::", _params);
			// 		console.info("getCommentList::", _result);
			// 		if (_result.code === 200) {
			// 			that.commentList = _result.data.list
			// 		}
			// 	}).catch((err) => {
			// 		let msg = err.message;
			// 		that.$tip.error(msg);
			// 	}).finally(() => {})
			// },
			getCommentList(_params) {

				const that = this;
				that.$http.post("/hole/note/comment/group", _params).then(res => {
					let _result = res.data;
					// console.info("_params::", _params);
					// console.info("/hole/note/comment/group::", JSON.stringify(_result));
					if (_result.code === 200) {
						that.commentList = _result.data.list;

						// const query = uni.createSelectorQuery().in(this);
						// let _id_ = that.commentList[10].comment_id;
						// query.select('#' + _id_).boundingClientRect(data => {
						// 	console.log("得到布局位置信息" + JSON.stringify(data));
						// 	console.log("节点离页面顶部的距离为" + data.top);
						// }).exec();

					} 
					//else if (_result.code === 501) {
					//	setTimeout(() => {
					//		uni.hideLoading();
					//		that.$store.dispatch("Logout")
					//	}, 800)
					//}
				}).catch((err) => {
					let msg = err.message;
					console.info("err::", err);
					that.$tip.error(msg);
				}).finally(() => {})
			},
			popupClose() {
				this.focus = false
			},
			openPinglun() {
				if (!this.isLogin) {
					this.$u.toast("请您先登录");
					return
				}
				if (this.letter.allow_comment === 0) {
					this.$u.toast("作者关闭了评论");

				} else {
					this.isReply = false;
					this.placeholder = "写评论";
					this.showKey = true;
					setTimeout(() => {
						this.focus = true
					}, 300)
				}
			},
			openReply(item, idx) {
				this.getSubList(item.comment_id, idx)
			},
			getSubList(comment_id, idx) {
				const that = this;
				uni.showLoading({
					title: "加载中..."
				});
				that.$http.post("/hole/note/comment/items", {
					comment_id: comment_id
				}).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						// console.info("/hole/note/comment/items::", JSON.stringify(_result.data.list));
						that.commentList[idx].subList = _result.data.list
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleReply(_record) {
				if (!this.isLogin) {
					this.$u.toast("请您先登录");
					return
				}
				if (this.letter.allow_comment === 0) {
					this.$u.toast("作者关闭了评论");

				} else {
					this.isReply = true;
					this.replyId = _record.comment_id;
					this.replyIndex = -1;
					this.placeholder = "回复笔友" + _record.title;
					this.showKey = true;
					setTimeout(() => {
						this.focus = true
					}, 300)
				}
			},
			handleReplySub(_record, index1) {
				if (!this.isLogin) {
					this.$u.toast("请您先登录");
					return
				}
				if (this.letter.allow_comment === 0) {
					this.$u.toast("作者关闭了评论");

				} else {
					this.isReply = true;
					this.replyId = _record.comment_id;
					this.replyIndex = index1;
					this.placeholder = "回复笔友" + _record.title;
					this.showKey = true;
					setTimeout(() => {
						this.focus = true
					}, 300)
				}
			},
			handleOperate(e) {
				if (!this.showMenu) {
					this.left = Math.ceil(e.detail.x) - 60;
					this.top = Math.ceil(e.touches[0].clientY) + 10
				}
				this.showMenu = true
				// this.$u.toast("您点击了：operate")
				// this.$emit("operate")
			},
			handleFenxiang() {
				this.showMenu = false
			},
			handleGuanzhu() {
				this.showMenu = false;
				let _url = "/user/collect";
				let _params = {
					method: "collect",
					relate: this.letter.user,
				};
				const that = this;
				that.$http.post(_url, _params).then(res => {
					if (res.data.code === 200) {
						that.letter.is_collect = 1
					} else if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.$u.toast(res.data.message)
					}
				}).catch((err) => {
					let msg = err.message
				}).finally(() => {})
			},
			handleJubao() {
				this.showMenu = false;
				// let _url = "/user/report"
				// let _params = {
				// 	type: 4,
				// 	relate: this.letter.user,
				// }
				// console.info(_url, _params)

				let _params = {
					id: this.letter.user
				};
				uni.navigateTo({
					url: '../../pages/user/userhelp?params=' + encodeURIComponent(JSON.stringify(_params))
				})

				// const that = this
				// that.$http.post(_url, _params).then(res => {
				// 	if (res.data.code === 200) {
				// 		that.letter.allow_report = 0
				// 	} else {
				// 		that.$u.toast(res.data.message)
				// 	}
				// }).catch((err) => {
				// 	let msg = err.message
				// }).finally(() => {})
			},
			submit() {
				let _url = "/hole/note/comment";

				let _params = {};
				if (!this.isReply) {
					_params = {
						method: 'note',
						note: this.letter.id,
						content: this.content
					}
				} else {
					_params = {
						method: 'comment',
						note: this.letter.id,
						comment: this.replyId,
						content: this.content
					}
				}

				const that = this;
				that.disalbed = true;
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.getCommentList({
							note: that.letter.id,
							mine: 0,
							page: 1,
							size: that.pagesize
						});
						that.content = "";
						that.letter.comment_num++;
						that.letter.is_commented = 1;
						console.info("acceptDataFromOpenedPage1", that.letter.comment_num);
						that.eventChannel.emit('acceptDataFromOpenedPage1', {
							data: {
								'comment_num': that.letter.comment_num,
								'is_commented': that.letter.is_commented
							}
						});
						if (that.replyIndex === -1) {

						} else {
							that.getSubList(that.replyId, that.replyIndex);
							that.replyIndex = -1
						}
						that.showKey = false
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						// that.$u.toast(_result.message)
						console.log(_result);
						uni.showToast({
							icon: 'error',
							title: _result.message,
							duration: 3000
						})
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					that.disalbed = false
				})
			},
			handlePreImage(e) {
				uni.previewImage({
					current: e,
					urls: this.letter.images
				})
			},
			handleEdit() {
				this.showMenu = false;
				uni.navigateTo({
					url: "../../pages/forest/write?params=" + encodeURIComponent(JSON.stringify(this.letter))
				})
			},
			handleDelete() {
				this.showMenu = false;

				let _url = "/hole/note/remove";
				let _params = {
					id: this.letter.id
				};

				const that = this;
				that.$http.post(_url, _params).then(res => {
					if (res.data.code === 200) {
						uni.navigateBack({

						})
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
				}).finally(() => {
					// that.goBack()
				})
			},
		}

	}
</script>

<style scoped>
	.body {
		margin: 30rpx;
		padding: 10rpx 10rpx;
	}

	.letter-images {
		margin: 10rpx;
		padding: 0rpx;
		/* border-bottom: 1px solid #EEEEEE; */
	}

	.tree-hole-content {
		margin: 20rpx;
		font-size: 32rpx;
		color: #8A8A8A;
	}

	.tree-hole-title {
		margin-left: 30rpx;
	}

	.tree-hole-name {
		font-size: 34rpx;
		font-weight: 600;
		color: #363D50;
		margin-bottom: -10rpx;
		/* border: 1px solid #09BB07; */
	}

	.tree-hole-time {
		font-size: 26rpx;
		color: #8A8A8A;
		margin-top: -10rpx;
		/* border: 1px solid #8A6DE9; */
	}

	.biu-label {
		font-weight: 400;
		font-size: 28rpx;
		color: #363D50;
		margin-left: 10rpx;
		padding: 5rpx;
		border: 1px solid #F5F5F5;
		background-color: #F5F5F5;
		border-radius: 16rpx;
	}

	.pinglun-dianzan {
		margin: 6rpx 10rpx auto 10rpx;
	}

	.mingpian-operate {
		width: 160rpx;
		margin: 10rpx 10rpx 10rpx auto;
	}

	.mingpian-share {
		margin: 0 20rpx 0rpx 20rpx;
		width: 120rpx;
		height: 40rpx;
		text-align: right;
	}

	.mingpian-share-menu-old {
		border: 1px solid #DED3BD;
		background-color: #F5F5F5;
		width: 160rpx;
		margin: 240rpx 40rpx auto auto;
		/* padding: 10rpx; */
		border-radius: 16rpx;
	}

	.mingpian-share-menu {
		border: 1px solid rgba(174, 159, 130, 0.2);
		background-color: #F5F5F5;
		width: 160rpx;
		/* padding: 10rpx; */
		border-radius: 16rpx;
		position: absolute;
	}

	/* .menu-item {
		padding: 10rpx;
		border-top: 1px solid #EDEDED;
		font-size: 32rpx;
		color: #AE9F82;
	} */

	.letter-favor {
		margin: 30rpx 0 20rpx 40rpx;
	}

	.letter-pinglun {
		background-color: #FAFAFA;
		border: 1rpx solid #FAFAFA;
		border-radius: 16rpx;
		margin: 10rpx;
		padding: 10rpx 20rpx;
	}

	.open-more {
		width: auto;
		font-size: 28rpx;
		color: #363D50;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}

	.comment-box-parent {
		border-bottom: 1rpx solid #eeeeee;
		margin: 20rpx auto;
		padding: 10rpx auto;
	}

	.comment-box {
		/* border: 1rpx solid firebrick; */
		margin: 10rpx auto;
	}


	.comment-parent {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.comment-parent-title {
		font-size: 32rpx;
		color: #363D50;
		display: flex;
		align-items: center;
		/* margin-bottom: 6rpx; */
		margin: 10rpx;
	}

	.comment-content {
		margin-left: 80rpx;
		font-size: 32rpx;
	}

	.comment-image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		margin-left: -14rpx;
		margin-right: 10rpx;
	}

	.comment-image-sub {
		width: 58rpx;
		height: 58rpx;
		border-radius: 50%;
		margin-left: -14rpx;
		margin-right: 10rpx;
	}
</style>
