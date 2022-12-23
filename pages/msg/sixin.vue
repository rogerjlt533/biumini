<template>
	<view>
		<u-navbar back-text="" :title="ajax.loadText" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize"
			:srcleft="srcleft">
		</u-navbar>

		<u-sticky :offset-top="height" :enable="sticky.enable" @fixed="fixed" @unfixed="unfixed">
			<view>
				<u-notice-bar bgColor="#FFFFFF" color="#898989" fontSize="26" mode="horizontal" :list="listtip">
				</u-notice-bar>
			</view>
		</u-sticky>

		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index">
					<view v-show="!!item.messageTime" style="color: #808080; text-align: center;margin-bottom: -20rpx;">
						{{formatMssageTime(item, index)}}
					</view>
					<view class="item flex_col" :class=" item.is_self === 1 ? 'push':'pull' " :id="`msg-${item.disc}`"
						@longtap="withdraw(item,index)">
						<image :src="item.image" mode="aspectFill" class="pic" @click="link2biu(item)"></image>
						<block v-if="item.contentType==='text'">

							<view class="content">{{item.content}}</view>
						</block>
						<block v-else>
							<view class="content_img">
								<!-- <image :src="item.images[0]"
									:style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image> -->

								<u-image @click="handlePreImage(item.content)" :src="item.content" mode="aspectFill"
									width="400rpx" height="500rpx">
								</u-image>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>


		<view class="szt-comment">
			<!-- <view class="szt-comment-info"> -->
			<view class="u-f-a" style="padding: 0rpx;">


				<!-- <textarea :show-confirm-bar="showconfirmbar" v-model="content" :placeholder="placeholder"
					auto-height="true" :cursor-spacing="8"/> -->
				<view style="margin: 6rpx;width: 100%;">
					<u-input :disabled="userInfo.priMsgStatus===0 || biu.priMsgStatus===0" v-model="content" type="text"
						:border="true" cursorSpacing=10 :placeholder="placeholder">
					</u-input>
				</view>
				<view>
					<image :src="picIcon" mode="aspectFill"
						style="width: 75rpx; height: 75rpx; margin-left: 8rpx; margin-right: 12rpx;"
						@click="chooseImage"></image>
				</view>
				<view style="width: 180rpx;">
					<u-button type="primary" @click="send"
						:disabled="userInfo.priMsgStatus===0 || biu.priMsgStatus===0">发送
					</u-button>
				</view>
				<!-- <view @click.stop="send" class="szt-comment-submit">
					确定
				</view> -->
			</view>
		</view>


	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	import {
		mapState
	} from 'vuex';
	import test from '@/uview-ui/libs/function/test.js'
	import configService from '@/common/service/config.service.js';
	import {
		AQ_CONTENT
	} from "@/common/util/constants"
	export default {
		computed: {
			...mapState({
				userInfo: 'userInfo'
			}),
		},
		data() {
			return {
				showconfirmbar: false,
				placeholder: '发信息...',
				statusBarHeight: systemInfo.statusBarHeight,
				sticky: {
					enable: true,
				},
				height: 44,
				listtip: ["让手书温暖你最熟悉的陌生人"],
				srcleft: '../../../static/treehole/my/back.png',
				picIcon: '../../static/treehole/xinxi/sixin-pic.png',
				imgsize: 46,
				talkList: [],
				ajax: {
					rows: 20, //每页数量
					page: 1, //页码
					flag: true, // 请求开关
					loading: true, // 加载中
					loadText: '正在获取消息',
					more: 1
				},
				limitType: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				header: {
					'token': uni.getStorageSync("token")
				},
				action: configService.apiUrl + '/upload',
				content: '',
				biu: {
					priMsgStatus: 0
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getHistoryMsg();
			});
		},
		onLoad(event) {
			this.height = this.height + this.statusBarHeight - 1;

			let _params = event.params || event.payload;
			try {
				var _detail = JSON.parse(decodeURIComponent(_params));
			} catch (error) {
				var _detail = JSON.parse(_params);
			}
			this.biu = _detail;
			// console.info("sixin::onload:6.1:", this.biu.priMsgStatus);
			// console.info("sixin::onload:6.1:", this.userInfo.priMsgStatus)
		},
		onPullDownRefresh() {
			this.getFirstMsg();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onPageScroll(e) {
			if (e.scrollTop < 5) {
				this.getHistoryMsg();
			}
		},
		methods: {
			formatMssageTime(record, idx) {
				if (idx === 0) {
					return record.messageTime
				} else {
					if (this.talkList[idx].messageTime === this.talkList[idx - 1].messageTime) {
						return ""
					} else {
						return record.messageTime
					}
				}
			},
			getFirstMsg() {

				uni.showLoading({
					mask: true,
					title: "正在加载"
				});
				this.ajax.page = 1;
				/*szt*/
				const that = this;
				const _url = "/user/friend/message/list";
				that.$http.post(_url, {
					friend: that.biu.friend,
					page: that.ajax.page,
					size: that.ajax.rows,
					read: 2
				}).then(res => {
					let _result = res.data;
					console.info("历史信息111::", _result.data.list);
					if (_result.code === 200) {
						that.ajax.more = _result.data.more;
						data = _result.data.list;
						data.reverse();
						// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
						let selector = '';

						selector = `#msg-${data[data.length-1].disc}`;

						// 将获取到的消息数据合并到消息数组中
						that.talkList = [...data, ...that.talkList];

						// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
						that.$nextTick(() => {
							// 设置当前滚动的位置
							that.setPageScrollTo(selector);

							that.hideLoadTips(true);

							if (_result.data.more === 0) {
								// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
								// 可在此处编写无更多消息数据时的逻辑
							} else {
								that.ajax.page++;

								// 延迟 200ms ，以保证设置窗口滚动已完成
								setTimeout(() => {
									that.ajax.flag = true;
								}, 200)
							}
						})
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
				}).catch((err) => {
					let msg = err.message
				}).finally(() => {
					uni.hideLoading()
				});
				/*szt end*/
			},
			goBack() {
				uni.navigateBack({

				})
			},
			fixed() {
				// this.$u.toast("触发吸顶")
			},
			unfixed() {
				// this.$u.toast("取消吸顶")
			},
			// 获取历史消息
			getHistoryMsg() {
				const that = this;
				if (!that.ajax.flag) {
					return; //
				}

				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async () => {
					that.hideLoadTips();
					that.ajax.flag = false;
					let data = [];

					/*szt*/
					let params = {
						friend: that.biu.friend,
						page: that.ajax.page,
						size: that.ajax.rows,
						read: 2
					};
					// console.info("历史信息2params222::", params);
					const _url = "/user/friend/message/list";
					that.$http.post(_url, params).then(res => {
						let _result = res.data;
						// console.info("历史信息2222::", _result);
						if (_result.code === 200) {
							that.ajax.more = _result.data.more;
							data = _result.data.list;
							data.reverse();


							// 将获取到的消息数据合并到消息数组中
							that.talkList = [...data, ...that.talkList];

							// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
							let selector = '';

							if (that.ajax.page > 1) {
								// 非第一页，则取历史消息数据的第一条信息元素
								selector = `#msg-${that.talkList[0].disc}`;
								// console.log(1111111111111);
							} else {
								// 第一页，则取当前消息数据的最后一条信息元素
								selector = `#msg-${data[data.length-1].disc}`;
								// console.log(2222222222222);
							}
							// console.log(selector);

							that.$nextTick(() => {
								uni.pageScrollTo({
									scrollTop: 2000000, //滚动到页面的目标位置（单位px）
									duration: 0 //滚动动画的时长，默认300ms，单位 ms
								});
							})

							// // 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
							// that.$nextTick(() => {

							//   // 设置当前滚动的位置
							//   that.setPageScrollTo(selector);

							//   that.hideLoadTips(true);

							//   if (data.length < that.ajax.rows) {
							//     // 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							//     // 可在此处编写无更多消息数据时的逻辑
							//   } else {
							//     that.ajax.page++;

							//     // 延迟 200ms ，以保证设置窗口滚动已完成
							//     setTimeout(() => {
							//       that.ajax.flag = true;
							//     }, 200)
							//   }
							// })
						} else if (_result.code === 501) {
							setTimeout(() => {
								uni.hideLoading();
								that.$store.dispatch("Logout")
							}, 800)
						}
					}).catch((err) => {
						let msg = err.message
					}).finally(() => {});
					/*szt end*/
				};
				get();
			},
			// 设置页面滚动位置
			setPageScrollTo(selector) {
				const that = this;
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
						// scrollTop: res.top - 30, // -30 为多显示出大半个消息的高度，示意上面还有信息。
						scrollTop: that.height, // -30 为多显示出大半个消息的高度，示意上面还有信息。
						duration: 0
					});
				}).exec();
			},
			handlePreImage(_url) {
				uni.previewImage({
					urls: [_url]
				})
			},
			// 隐藏加载提示
			hideLoadTips(flag) {
				// if (flag) {
				// 	this.ajax.loadText = this.biu.name;
				// 	setTimeout(() => {
				// 		// this.ajax.loading = false;
				// 	}, 300);
				// } else {
				// 	// this.ajax.loading = true;
				// 	this.ajax.loadText = '正在获取消息';
				// }
				this.ajax.loadText = this.biu.name;
			},
			chooseImage() {

				if (this.userInfo.priMsgStatus === 0) {
					this.$u.toast("请开启私信开关");
					return false
				}
				if (this.biu.priMsgStatus === 0) {
					this.$u.toast("对方已关闭私信");
					return false
				}

				let chooseFile = null;
				chooseFile = new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						sourceType: ['album', 'camera'],
						sizeType: ['original', 'compressed'],
						success: resolve,
						fail: reject
					});
				});
				chooseFile.then(res => {
						let file = null;
						res.tempFiles.map((val, index) => {
							// 检查文件后缀是否允许，如果不在this.limitType内，就会返回false
							if (!this.checkFileExt(val)) {

							} else {
								this.fileTemp = val.path
							}
						});
						this.uploadFile();
					})
					.catch(error => {
						console.info("error::", error)
						// this.$emit('on-choose-fail', error);
					});
			},
			uploadFile() {
				if (!this.fileTemp) {
					return;
				}
				// console.info("this.action:::", this.action) 
				uni.showLoading({
					mask: true,
					title: "图片上传中..."
				});
				const that = this;
				uni.uploadFile({
					url: that.action,
					filePath: that.fileTemp,
					name: "file",
					header: that.header,
					success: res => {

						uni.hideLoading();

						// 判断是否json字符串，将其转为json格式
						let data = that.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
						if (![200, 201, 204].includes(res.statusCode)) {
							that.$u.toast('上传失败，请重试');
							that.fileUrl = ""
						} else if (data.code === 503) {
							uni.showToast({
								icon: 'error',
								title: data.message,
								duration: 3000
							})
						} else {
							// 上传成功 
							console.info("上传成功::", data);

							that.send_img(data.data.url)
						}
					},
					fail: e => {
						uni.hideLoading();
						that.$u.toast('上传失败，请重试');
						that.fileUrl = ""
					},
					complete: res => {
						// uni.hideLoading();
						// this.uploading = false;
						// this.uploadFile(index + 1);
						// this.$emit('on-change', res, index, this.lists, this.index);

					}
				});
			},
			// 判断文件后缀是否允许
			checkFileExt(file) {
				// 检查是否在允许的后缀中
				let noArrowExt = false;
				// 获取后缀名
				let fileExt = '';
				const reg = /.+\./;
				fileExt = file.path.replace(reg, "").toLowerCase();
				// 使用数组的some方法，只要符合limitType中的一个，就返回true
				noArrowExt = this.limitType.some(ext => {
					// 转为小写
					return ext.toLowerCase() === fileExt;
				});
				if (!noArrowExt) this.$u.toast(`不允许选择${fileExt}格式的文件`);
				return noArrowExt;
			},
			// 发送图片
			send_img(_imgUrl) {
				// uni.showLoading({
				// 	title: '正在发送'
				// });
				// setTimeout(() => {
				// uni.hideLoading();

				// 将当前发送信息 添加到消息列表。
				let data = {
					'friend': this.biu.friend,
					'images': _imgUrl,
					'content': '',
					'contentType': 'image'
				};
				console.info("requestParam::", data);
				const that = this;
				const _url = '/user/friend/message/send';
				that.$http.post(_url, data).then(res => {
					let _result = res.data;
					if (_result.code === 200) {
						data = {
							...data,
							content: _imgUrl,
							id: new Date().getTime(),
							is_self: 1,
							image: that.userInfo.image
						};
						that.talkList.push(data);
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						// that.$u.toast(_result.message)

						uni.showToast({
							icon: 'error',
							title: data.message,
							duration: 3000
						})
					}
				}).catch((err) => {
					that.$u.toast(err.message)
				}).finally(() => {
					that.$nextTick(() => {
						// 清空内容框中的内容
						that.content = '';
						uni.pageScrollTo({
							scrollTop: 999999, // 设置一个超大值，以保证滚动条滚动到底部
							duration: 0
						});
					})
				});
				// }, 1000);
			},
			// 发送信息
			send() {
				if (!this.content) {
					uni.showToast({
						title: '请输入有效的内容',
						icon: 'none'
					});
					return;
				}

				uni.showLoading({
					title: '正在发送'
				});
				setTimeout(() => {
					uni.hideLoading();

					// 将当前发送信息 添加到消息列表。
					let data = {
						'friend': this.biu.friend,
						'images': '',
						'content': this.content,
						'contentType': 'text',
						'messageTime': '刚刚'
					};
					console.info("requestParam::", data);
					const that = this;
					const _url = '/user/friend/message/send';
					that.$http.post(_url, data).then(res => {
						let _result = res.data;
						console.info("_result:::::::::", _result);
						if (_result.code === 200) {
							data = {
								...data,
								id: new Date().getTime(),
								is_self: 1,
								image: that.userInfo.image
							};
							that.talkList.push(data);
						} else if (_result.code === 501) {
							setTimeout(() => {
								uni.hideLoading();
								that.$store.dispatch("Logout")
							}, 800)
						} else {
							that.$u.toast(_result.message)
						}
					}).catch((err) => {
						that.$u.toast(err.message)
					}).finally(() => {
						that.$nextTick(() => {
							// 清空内容框中的内容
							that.content = '';
							uni.pageScrollTo({
								scrollTop: 999999, // 设置一个超大值，以保证滚动条滚动到底部
								duration: 0
							});
						})
					});
				}, 1000);
			},
			//点击头像，跳转biu信息页
			link2biu(record) {
				console.info("sixin::2::biu::", record);
				if (record.is_self === 1) {
					let _params = {
						friend: record.id
					};
					uni.navigateTo({
						url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
					})
				} else {
					let _params = {
						...this.biu
					};
					// _params.communicate = record.communicateInfo.communicate;
					uni.navigateTo({
						url: "../user/biu?params=" + encodeURIComponent(JSON.stringify(_params))
					})
				}
			},
			//撤回
			withdraw(record, index) {
				// console.log("record: " + JSON.stringify(record));
				const that = this;
				if (!!record.is_self) {
					uni.showModal({
						title: '提示',
						content: '是否撤回消息？',
						success: function(res) {
							if (res.confirm) {
								//调接口
								let _url = "/user/friend/message/cancel";

								that.$http.post(_url, {
									messageId: record.messageId
								}).then(res => {
									let _result = res.data;
									console.info("_result:::::::::", res);
									if (_result.code === 200) {
										that.talkList.splice(index, 1)
									} else if (_result.code === 501) {
										setTimeout(() => {
											uni.hideLoading();
											that.$store.dispatch("Logout")
										}, 800)
									} else {
										that.$u.toast(_result.message)
									}
								}).catch((err) => {
									that.$u.toast(err.message)
								}).finally(() => {

								});
							}
						}
					});
				} else {
					uni.setClipboardData({
						data: record.content, //要被复制的内容
						success: () => { //复制成功的回调函数 
							this.$u.toast("复制成功")
						}
					});
				}
			},
			copy() {
				uni.setClipboardData({
					data: 'record.content', //要被复制的内容
					success: () => { //复制成功的回调函数 
						this.$u.toast("复制成功")
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "../../common/sixin-list.scss";


	.szt-comment {
		font-size: 30rpx;
		z-index: 999;
		position: fixed;
		bottom: 0;
		z-index: 100;
		width: 100%;
		background-color: white;
		padding: 8rpx;
		border-top: 1px solid #d4d4d4;
		// border: 1px solid firebrick;
	}

	.szt-comment-info {
		font-size: 30rpx;
		position: relative;
	}

	.szt-comment-info textarea {
		width: 84%;
		display: inline-block;
		background-color: rgba(232, 232, 232, 0.57);
		padding: 10rpx;
		font-size: 30rpx;
	}

	.szt-comment-submit {
		position: absolute;
		bottom: 0;
		width: 120rpx;
		height: 70rpx;
		display: inline-block;
		color: #FFFFFF;
		margin-top: 10rpx;
		font-weight: bold;
		padding: 10rpx 4%;
		background-color: #AE9F82;
		border-radius: 10rpx;
		border: 1rpx solid #AE9F82;
	}



	.box-1 {
		z-index: 0;
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;

		/* 兼容iPhoneX */
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);

		.content {
			margin: 8rpx 0;
			font-size: 30rpx;
		}

		.content_img {
			justify-content: flex-end;
			margin: 8rpx 26rpx;
			// border: 1px solid fuchsia;
			padding-top: 0 !important;
		}
	}

	.box-2 {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;

		/* 兼容iPhoneX */
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		>view {
			padding: 0 20rpx;
			height: 100rpx;
		}

		.content {
			background-color: #fff;
			margin-right: 20rpx;
			height: 80rpx;
			padding: 0 20rpx;
			border-radius: 10rpx;
			font-size: 32rpx;
		}

		.send {
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;

			&:active {
				background-color: #5fc496;
			}
		}
	}

	.talk-list {
		height: auto !important;
		padding-bottom: 20rpx;

		/* 消息项，基础类 */
		.item {
			padding: 20rpx 20rpx 0 20rpx;
			align-items: flex-start;
			align-content: flex-start;
			color: #333;

			.pic {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}

			.content {
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}

			/* 收到的消息 */
			&.pull {
				.content {
					color: #353E4F;
					margin-left: 32rpx;
					background-color: #F5F5F5;

					&::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}

			/* 发出的消息 */
			&.push {
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;

				.content {
					color: #FFFFFB;
					margin-right: 32rpx;
					background-color: #B7AC98;

					&::after {
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #B7AC98;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>
