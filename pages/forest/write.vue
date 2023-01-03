<template>
	<view>
		<u-navbar back-text="" title="写给树洞的信" :isBack='true' :imgwidth="imgsize" :imgheight="imgsize"
			:srcleft="srcleft">
		</u-navbar>
		<view class="u-edit-b" style="border: none!important;">
			<view class="edit-body">

				<!-- <u-input placeholder="把开心和不开心说出来会缓解很多奥~" v-model="model.content" type="textarea" :height="200"
					:auto-height="true" :customStyle="customStyle" maxlength="512"></u-input> -->
				<!-- <u-input placeholder="把开心和不开心说出来会缓解很多奥~" v-model="model.content" type="textarea" :height="200"
					:auto-height="true" :customStyle="customStyle"></u-input> -->

				<editor id="editor" class="ql-container" placeholder="把开心和不开心说出来会缓解很多奥" @ready="onEditorReady"
					@blur="getContents"></editor>


				<view style="height: 20rpx;"></view>

				<u-upload :action="action" :file-list="fileList" :header="header" width="160" height="160" max-count="9"
					@on-remove="uploadRemove" @on-success="uploadSuccess" @on-error="uploadError"></u-upload>

				<view class="u-f-a">
					<u-tag display="flex" size="large" bgColor="#F5F5F5" shape="circle" :text="label.tag" mode="plain"
						borderColor="#EDEDED" @tap="chooseLabel">
						<view slot="img" style="width: 38rpx;height: 38rpx;margin-right: 10rpx;">
							<image :src="label.url" mode="aspectFit" style="width: 38rpx;height: 38rpx;" />
						</view>
					</u-tag>
					<u-tag display="flex" size="large" bgColor="#F5F5F5" shape="circle" :text="moods.title" mode="plain"
						borderColor="#EDEDED" @tap="chooseMoods">
						<view slot="img" style="width: 38rpx;height: 38rpx;margin-right: 10rpx;">
							<image :src="moods.url" mode="aspectFit" style="width: 38rpx;height: 38rpx;" />
						</view>
					</u-tag>
				</view>
			</view>
			<view class="u-f-aj" style="margin: 20rpx; padding-bottom: 20rpx;border-bottom: 1rpx solid #CCCCCC;">
				<view>
					<view class="cell-title">{{functitle[0].name}}</view>
					<view class="cell-title-sub">{{functitle[0].desc}}</view>
				</view>
				<view>
					<!-- <switch :checked="switchChecked1" color="#AE9F82" @change="switchChange1"
						style="transform:scale(0.8)" /> -->
					<u-switch size="54" v-model="switchChecked1" @change="switchChange1" :text="switchText1">
					</u-switch>
				</view>
			</view>
			<view class="u-f-aj" style="margin: 20rpx; padding-bottom: 20rpx; border-bottom: 1rpx solid #CCCCCC;">
				<view>
					<view class="cell-title">{{functitle[1].name}}</view>
					<view class="cell-title-sub">{{functitle[1].desc}}</view>
				</view>
				<view>
					<!-- <switch :checked="switchChecked2" color="#AE9F82" @change="switchChange2"
						style="transform:scale(0.8)" /> -->
					<u-switch size="54" v-model="switchChecked2" @change="switchChange2" :text="switchText2"
						:disabled="!switchChecked1">
					</u-switch>
				</view>
			</view>
		</view>

		<view class="u-f-btn">
			<view class="u-f-ajr" style="margin-right: 30rpx;">
				<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="cancel">取 消
				</u-button>
				<u-button shape="circleRight" :customStyle="btnRightStyle" :disabled="enableBtn2" @click="submit">
					投入树洞
				</u-button>
			</view>
		</view>


		<u-popup v-model="showpopup1" mode="center" width="100%" height="100%">
			<ChooseMoods @close="closemoods" ref="moods"></ChooseMoods>
		</u-popup>

		<u-popup v-model="showpopup2" mode="center" width="100%" height="100%">
			<ChooseLabel @cancel="cancelLabel" @close="closelabel" ref="label"></ChooseLabel>
		</u-popup>


	</view>

</template>

<script>
	import configService from '@/common/service/config.service.js';
	import ChooseMoods from '@/compoents/common/choose-moods.vue';
	import ChooseLabel from '@/compoents/common/choose-label.vue';
	export default {
		components: {
			ChooseMoods,
			ChooseLabel
		},
		data() {
			return {
				srcleft: '../../../static/treehole/my/back.png',
				imgsize: 46,
				showpopup1: false,
				moodsIdx: 0,
				showpopup2: false,
				customStyle: {
					"color": "#666666",
					"font-size": "30rpx"
				},
				functitle: [{
					name: '谁可以看',
					desc: '是否公开显示在林间'
				}, {
					name: '显示笔名',
					desc: '是否在林间显示笔名'
				}],
				switchChecked1: true,
				switchText1: ['私 密 ', ' 公 开'],
				switchChecked2: true,
				switchText2: ['匿 名 ', ' 显 示'],
				header: {
					'token': uni.getStorageSync("token")
				},
				fileList: [],
				action: configService.apiUrl + '/upload',
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
				customStyleTitle: {
					'font-size': '32rpx',
					'color': '#363D50',
					'font-weight': 'bolder',
				},
				label: {
					tag: '请选择标签',
					checked: false,
					url: '../../static/treehole/cike-biaoqian.png'
				},
				moods: {
					title: '此刻的心情',
					url: '../../static/treehole/cike-xinqing.png'
				},
				model: {
					content: ""
				},
				enableBtn2: false
			}
		},
		computed: {

		},
		created() {
			// this.model.images.map((item) => {
			// 	let _temp = {
			// 		url: item
			// 	}
			// 	this.fileList.push(_temp)
			// })
		},
		onLoad(event) {
			let _params = event.params || event.payload;
			if (!!_params) {
				try {
					var _detail = JSON.parse(decodeURIComponent(_params));
				} catch (error) {
					var _detail = JSON.parse(_params);
				}
				console.info("onLoad:::", _detail);
				this.model.id = _detail.id;
				this.model.content = _detail.content;
				if (!!_detail.label_tag) {
					this.label.tag = _detail.label_tag;
					this.label.checked = true
				}
				if (!!_detail.mood_code) {
					this.moods.title = _detail.mood_tag;
					this.moods.code = _detail.mood_code;
					this.moods.url = _detail.mood_emoj
				}
				this.switchChecked1 = _detail.is_private === 0 ? false : true;
				this.switchChecked2 = _detail.nick_show === 0 ? false : true;
				_detail.images.map((item) => {
					let _temp = {
						url: item
					};
					this.fileList.push(_temp)
				})
			}
		},
		methods: {
			cancelLabel() {
				this.label.tag = '请选择标签';
				this.label.checked = false;
				this.showpopup2 = false
			},
			closelabel(record) {
				this.label.tag = record.tag;
				this.label.id = record.id;
				this.label.checked = true;
				this.showpopup2 = false
			},
			closemoods(record) {
				this.moodsIdx = record.idx;
				if (record.code === 'cancel') {
					this.moods.title = '此刻的心情';
					this.moods.url = '../../static/treehole/cike-xinqing.png';
					this.moods.code = ''
				} else {
					this.moods.title = record.title;
					this.moods.url = record.url;
					this.moods.code = record.code
				}
				this.showpopup1 = false
			},
			switchChange1(e) {
				console.info("switchChange1::", e);
				this.switchChecked1 = e;
				if (!e) {
					this.switchChecked2 = false
				}
			},
			switchChange2(e) {
				console.info("switchChange2::", e);
				this.switchChecked2 = e
			},
			chooseLabel() {
				this.$refs.label.title = this.label.title;
				this.$refs.label.initData();
				this.showpopup2 = true
			},
			chooseMoods() {
				this.$refs.moods.currIdx = this.moodsIdx;
				this.showpopup1 = true
			},
			// 提交
			submit() {
				const that = this;

				let _images = [];
				that.fileList.map((item) => {
					_images.push(item.url)
				});

				let _url = "/hole/note/create";
				let _params = {
					content: that.model.content,
					isSelf: that.switchChecked1 ? 1 : 0,
					nick: that.switchChecked2 ? 1 : 0,
					label: that.label.checked ? that.label.id : "",
					mood: that.moods.code,
					images: _images.join(",")
				};

				if (_params.images.indexOf("wxfile://") > -1) {
					that.$u.toast("图片正在上传，请稍后");
					return false
				}

				if (!that.model.id) {
					_params = {
						..._params,
						method: 'create'
					}
				} else {
					_url = "/hole/note/edit";
					_params = {
						..._params,
						method: 'edit',
						id: that.model.id
					}
				}
				console.info(_url, _params);

				uni.showLoading({
					mask: true,
					title: '正在提交'
				});
				that.enableBtn2 = true;
				that.$http.post(_url, _params).then(res => {
					uni.hideLoading()
					let _result = res.data;
					// console.info(_result)
					if (_result.code === 200) {
						that.$u.toast("发送成功");
						setTimeout(() => {
							that.goBack()
						}, 1000)
					} else if (_result.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						that.enableBtn2 = false;
						uni.showToast({
							icon: 'error',
							title: _result.message,
							duration: 3000
						})
					}
				}).catch((err) => {
					uni.hideLoading()
					that.enableBtn2 = false;
					let msg = err.message;
					// console.log('====:',msg);
					that.$tip.error(msg);
				})
			},
			/*上传图片 begin*/
			//图片上传成功回调
			uploadSuccess(data, index, lists, name) {
				if (data.code === 200) {
					lists[index].url = data.data.url;
					this.fileList = lists;
					console.log("this.fileList::", this.fileList)
				}
			},
			uploadError(err, index, lists) {
				// console.log('err');
				// console.log(err);
				// console.log(index);
				// console.log(lists);
			},
			//删除图片后的回调
			uploadRemove(index, lists, name) {
				this.fileList = lists
			},
			/*上传图片 end*/
			cancel() {
				this.goBack()
			},
			goBack() {
				uni.navigateBack({

				})
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			// 失去焦点时，获取富文本的内容
			getContents() {
				let _this = this
				this.editorCtx.getContents({
					success(res) {
						_this.model.content = res.html;
					}
				})
			},
		}
	}
</script>

<style>
	@import "../../common/form.css";

	.edit-body {
		margin: 10rpx;
		padding: 30rpx 10rpx;
	}

	#editor {
		width: 100%;
		height: 225px;
		background-color: #f9f9f9;
		padding: 5px;
	}
</style>
