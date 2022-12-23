<template>
	<view style="margin-top: 16rpx; padding-top: 10rpx;">
		<view class="u-f-a">
			<block v-if="isFriend">
				<image :src="letter.mood_emoj" mode="aspectFit" style="width: 40rpx;height: 40rpx;margin-left: 20rpx;">
				</image>
				<view style="font-size: 34rpx;font-weight: bolder;color: #363D50; margin-left: 16rpx;">
					{{letter.list_time}}
				</view>
				<image v-if="letter.is_private === 0" :src="lockUrl" mode="heightFix"
					style="height: 26rpx;margin-left: 16rpx;">
				</image>
				<image v-if="letter.nick_show === 0 && letter.is_private === 1" :src="nimingUrl" mode="heightFix"
					style="height: 26rpx;margin-left: 16rpx;"></image>
			</block>
			<block v-else>
				<image :src="letter.image" mode="aspectFill" style="width: 90rpx;height: 90rpx;border-radius: 50%;"
					@click="link2page()">
				</image>
				<image :src="letter.mood_emoj" mode="aspectFit"
					style="width: 40rpx;height: 40rpx; margin-left: -20rpx;margin-top: 50rpx;">
				</image>
				<view class="tree-hole-title" @click="link2page()">
					<view class="tree-hole-name">{{letter.name}}</view>
					<view class="tree-hole-time">{{letter.create_time}}</view>
				</view>
			</block>
			<view class="mingpian-operate">
				<view class="mingpian-share">
					<image :src="pointUrl" mode="aspectFill" style="width: 42rpx;height: 42rpx;" @click="handleOperate">
					</image>
				</view>
			</view>
		</view>

		<view style="margin-top: 16rpx;" :class="isFriend?'friend-hole':'public-hole'">
			<view class="tree-hole-content" @click="link2page()">
				<!-- {{letter.content}} -->
				<u-parse :html="letter.content"></u-parse>
			</view>
			<view style="height: 14rpx;"></view>
			<view v-if="isFriend" class="biu-image">
				<u-grid :col="3" :border="false">
					<block v-for="(item, index) in letter.images" :key="index">
						<u-grid-item :customStyle="customStyleGrid" @click="handlePreImage(index)">
							<image style="width: 170rpx;height:170rpx;border-radius: 8rpx;" mode="aspectFill"
								:src="item">
							</image>
						</u-grid-item>
					</block>
				</u-grid>
			</view>
			<view v-else class="biu-image">
				<u-grid :col="3" :border="false">
					<block v-for="(item, index) in letter.images" :key="index">
						<u-grid-item :customStyle="customStyleGrid" @click="handlePreImage(index)">
							<image style="width: 190rpx;height:190rpx;border-radius: 8rpx;" mode="aspectFill"
								:src="item">
							</image>
						</u-grid-item>
					</block>
				</u-grid>
			</view>

			<view class="u-f-aj" style="margin:10rpx 0;">
				<view class="biu-label" @click="link2page()" v-if="!!labelTag">
					{{labelTag}}
				</view>
				<view v-else></view>
				<view class="u-f-ajc" v-if="isLogin">
					<view class="u-f-ajc" @click="openPinglun" style="width: 130rpx;">
						<u-image :src="pinglunIcons[letter.is_commented]" mode="heightFix" height="60rpx">
						</u-image>
						<view class="pinglun-dianzan" style="margin-right: 50rpx;"> {{letter.comment_num}} </view>
					</view>
					<view class="u-f-ajc" @click="handleDianzan" style="width: 130rpx;">
						<!-- <u-image v-if="letter.is_favor === 0" :src="dianzanIcons[letter.is_favor]" mode="heightFix"
							height="60rpx">
						</u-image> -->
						<u-image v-show="gifCount===0" :src="dianzanIcons[letter.is_favor]" mode="heightFix"
							height="60rpx">
						</u-image>
						<u-image v-show="gifCount>0" :src="gifsrc" mode="heightFix" height="60rpx">
						</u-image>
						<view class="pinglun-dianzan"> {{letter.favor_num}} </view>
					</view>
				</view>
			</view>

		</view>


		<u-mask :show="showMenu" @click="showMenu = false" :customStyle="customStyle">
			<view class="mingpian-share-menu" :style="'left:'+left+'px;top:'+top+'px;'">
				<u-button open-type="share" @click="handleFenxiang" type="primary" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[0]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						分享</view>
				</u-button>
				<u-gap v-if="letter.allow_remove===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_remove===1" @click="handleEdit" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[3]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						编辑</view>
				</u-button>
				<u-gap v-if="letter.is_collect===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.is_collect===1" @click="handleGuanzhu" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[1]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						关注</view>
				</u-button>
				<u-gap v-if="letter.allow_remove===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_remove===1" @click="handleDelete" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[4]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						删除</view>
				</u-button>
				<u-gap v-if="letter.allow_report===1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_report===1" @click="handleJubao" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[2]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						举报</view>
				</u-button>
				<u-gap v-if="letter.allow_remove!==1" height="1" bg-color="#EDEDED"></u-gap>
				<u-button v-if="letter.allow_remove!==1" @click="handleLahei" :customStyle="menuBtnStyle">
					<u-image :src="menuUrl[5]" mode="aspectFit" width="42rpx" height="42rpx"> </u-image>
					<view style="font-size: 30rpx; margin-left: 10rpx;margin-right: -20rpx;">
						拉黑</view>
				</u-button>
			</view>
		</u-mask>


		<u-popup v-model="showKey" height="140rpx;" :duration="0" @close="popupClose">
			<view class="u-f-a" style="padding: 10rpx;">
				<view style="margin: 10rpx;width: 100%;">
					<u-input v-model="content" type="text" :focus="focus" :border="true" cursorSpacing=10
						:placeholder="placeholder" :disabled="disabled">
					</u-input>
				</view>
				<view style="width: 170rpx;">
					<u-button type="primary" :disabled="disabled" @click="submit">确定</u-button>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	export default {
		name: 'TreeHole',
		components: {},
		props: {
			isLogin: {
				type: Boolean,
				default: false
			},
			isFriend: {
				type: Boolean,
				default: false
			},
			letter: {
				type: Object,
				default: {}
			},
			idx: {
				type: Number,
				default: 0
			}
		},
		created() {

			// this.favor.is_favor = this.letter.is_favor;
			// this.favor.favor_num = this.letter.favor_num;
			// this.comment_num = this.letter.comment_num;

			this.getCommentList({
				mine: 1,
				note: this.letter.id,
				page: 1,
				size: this.pageSize
			});


			// this.is_commented = this.letter.is_commented;
			// this.favorImgList = this.letter.favor_images
		},
		computed: {
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
				// gifOver: true,
				gifCount: 0,
				dianzanOver: true,
				disabled: false,
				pageSize: 99,
				comment_num: 0,
				is_commented: 0,
				// favorImgList: [],
				commentList: [],
				showKey: false,
				focus: false,
				placeholder: '',
				content: '',
				lockUrl: '../../static/treehole/biu/biu-lock.png',
				nimingUrl: '../../static/treehole/linjian/biu-niming.png',
				customStyleGrid: {
					'margin': '-20rpx 0',
				},
				pinglunIcons: [
					"../../../static/treehole/biu/pinglun-0.png",
					"../../../static/treehole/biu/pinglun-1.png",
				],
				dianzanIcons: [
					"../../../static/treehole/biu/dianzan-0.png",
					"../../../static/treehole/biu/dianzan-1.png"
				],
				gif: "http://biuimage.juqihui.cn/baobao.gif",
				gifsrc: "",
				menuUrl: [
					"../../../static/treehole/biu/sd-share.png",
					"../../../static/treehole/my/wd-guanzhu.png",
					"../../../static/treehole/biu/sd-jubao.png",
					"../../../static/treehole/my/wd-bianji.png",
					"../../../static/treehole/biu/biu-lahei.png",
					"../../../static/treehole/biu/biu-lahei.png"
				],
				customStyle: {
					"background-color": "rgba(0, 0, 0, 0.05)",
					'border': '1px solid rgba(174, 159, 130, 0.2)',
					'border-radius': '16rpx',
				},
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
				}
			}
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
			// handlePinglun() {
			// 	if (this.letter.allow_comment === 0) {
			// 		this.$u.toast("作者关闭了评论")
			// 		return
			// 	} else {
			// 		this.$emit("pinglun")
			// 	}
			// },
			handleDianzan() {
				if (this.dianzanOver) {
					this.dianzanOver = false;
					this.gifCount++;
					if (this.letter.is_favor === 0) {
						this.gifsrc = this.gif + "?" + (new Date().getTime());

						// this.gifOver = false
						this.$emit("handleDianzan")


					} else {
						this.gifCount = 0;
						this.$emit("handleDianzan")
					}
					setTimeout(() => {
						this.dianzanOver = true
					}, 3000)
				} else {
					this.$u.toast("太快了,休息一下吧~")
				}
			},
			handleOperate(e) {
				if (!this.showMenu) {
					this.left = Math.ceil(e.detail.x) - 60;
					this.top = Math.ceil(e.touches[0].clientY) + 10
				}
				this.showMenu = true
				// console.info("您点击了：operate")
				// this.$emit("operate")
			},
			handleFenxiang() {
				this.showMenu = false;
				this.$emit("operate", "share")
			},
			handleGuanzhu() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					this.showMenu = false;
					return
				}
				this.showMenu = false;
				this.$emit("operate", "guanzhu", this.letter.user, this.idx)
			},
			handleJubao() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					this.showMenu = false;
					return
				}
				this.showMenu = false;
				this.$emit("operate", "jubao", this.letter.user, this.idx)
			},
			handleLahei() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					this.showMenu = false;
					return
				}
				this.showMenu = false;
				this.$emit("operate", "lahei", this.letter.user, this.idx)
			},
			link2page() {
				this.$emit("link2page")
			},
			handleEdit() {
				this.showMenu = false;
				uni.navigateTo({
					url: "../../pages/forest/write?params=" + encodeURIComponent(JSON.stringify(this.letter))
				})
			},
			handleDelete() {
				this.showMenu = false;
				this.$emit("operate", "delete", this.letter.id, this.idx)
			},
			handlePreImage(e) {
				uni.previewImage({
					current: e,
					urls: this.letter.images
				})
			},
			popupClose() {
				this.focus = false
			},
			openPinglun() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					this.showMenu = false;
					return
				}

				if (this.letter.allow_comment === 0) {
					this.$u.toast("对方关闭了评论");

					this.placeholder = "对方关闭了评论";
					this.disabled = true;

					this.showMenu = false;
				} else {

					this.$emit("openPinglun")

					// console.info("========5.9=======", this.letter);
					// this.showKey = true;
					// setTimeout(() => {
					// 	this.focus = true
					// }, 300)
				}
			},
			submit() {
				if (!this.isLogin) {
					this.$u.toast("未登录");
					this.showMenu = false;
					return
				}
				let _url = "/hole/note/comment";
				let _params = {
					method: 'note',
					note: this.letter.id,
					content: this.content
				};

				const that = this;
				that.disabled = true;
				that.$http.post(_url, _params).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						that.letter.comment_num++;
						that.letter.is_commented = 1;
						that.content = '';
						that.getCommentList({
							mine: 1,
							note: that.letter.id,
							page: 1,
							size: that.pageSize
						});
						that.showKey = false
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
					that.disabled = false
				})
			},
			getCommentList(_params) {
				if (!this.isLogin) {
					return
				}
				const that = this;
				that.$http.post("/hole/note/comment/list", _params).then(res => {
					let _result = res.data;
					// console.info("/note/comment/list._result::", _result)
					if (_result.code === 200) {
						that.commentList = _result.data.list
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

<style scoped>
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
		background-color: #EDEDED;
		padding: 10rpx;
		border: 1px solid #F5F5F5;
		border-radius: 30rpx;
	}

	.pinglun-dianzan {
		margin: 6rpx 20rpx auto 20rpx;
	}

	.tree-hole-content {
		font-size: 32rpx;
		color: #8A8A8A;
		font-weight: 300;
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

	.menu-item {
		padding: 10rpx;
		border-top: 1px solid #EDEDED;
		font-size: 32rpx;
		/* height: 80rpx; */
		color: #AE9F82;
	}

	.biu-image {
		margin-left: -12rpx;
		padding-bottom: 16rpx;
	}

	.friend-hole {
		margin-left: 80rpx;
		/* border: 1px solid #FF0000; */
	}

	.public-hole {
		margin-left: 0;
	}

	.letter-favor {
		margin: 30rpx 0 20rpx 20rpx;
	}

	.letter-pinglun {
		background-color: #FAFAFA;
		border: 1rpx solid #FAFAFA;
		border-radius: 16rpx;
		margin: 10rpx 0;
		padding: 10rpx 0;
	}
</style>
