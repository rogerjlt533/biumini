<template>
	<view>
		<u-navbar :borderBottom="false" back-text="" title="完善笔友信息" :isBack='false' :imgwidth="imgsize"
			:imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>

		<!-- <view class="customHead" v-show="currIdx===0">
			<view class="touxiang">
				<image :src="txUrl" mode="aspectFill" style="width: 110rpx; height: 110rpx;border-radius: 50%"></image>
				<image :src="txCamare" model="aspectFit" style="width: 40rpx;height: 40rpx; margin-left: -30rpx;"
					@click="selectFile">
				</image>
			</view>
		</view> -->

		<view class="u-s-f" style="margin-top: 0px;">

			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">

				<view v-show="currIdx===0">
					<view class="u-f-a-title">
						<view class="u-f-a-title">个人信息</view>
					</view>
					<view class="u-s-f-body">
						<!-- <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="笔名" prop="penName"
							:required="true">
							<u-input :inputAlign="inputAlign" placeholder="请输入笔名" v-model="model.penName" type="text"
								:maxlength="maxlength">
							</u-input>
						</u-form-item> -->
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="性别">
							<u-input :inputAlign="inputAlign" placeholder="请选择性别" :select-open="sexAcitonSheetShow"
								v-model="model.sexTag" type="select" @click="sexAcitonSheetShow = true">
							</u-input>
						</u-form-item>
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="出生年份">
							<u-input :inputAlign="inputAlign" placeholder="请选择出生年份" v-model="model.birthdayYear"
								type="select" @click="editBirthdayYear">
							</u-input>
						</u-form-item>
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="国家-省(州)">
							<u-input :inputAlign="inputAlign" placeholder="请选择国家-省(州)" v-model="nationState"
								type="select" @click="provinceSelectShow = true"></u-input>
						</u-form-item>
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="通信方式"
							prop="communicatesTag" :required="true">
							<u-input :inputAlign="inputAlign" placeholder="请选择通信方式"
								:select-open="tongxinAcitonSheetShow" v-model="model.communicatesTag" type="select"
								@click="tongxinAcitonSheetShow = true"></u-input>
						</u-form-item>
					</view>
					<!-- <view class="agreement">
						<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
						<view class="agreement-text">
							您已阅读并同意
							<text class="agreement-xy" @click="handleClickXy(1)">《BIU笔友用户服务协议》</text>
							<text>、</text>
							<text class="agreement-xy" @click="handleClickXy(2)">《BIU隐私权政策》</text>
						</view>
					</view> -->
				</view>
				<view v-show="currIdx===1">
					<view class="u-f-aj u-f-a-title" v-if="model.communicates===1 || model.communicates===3">
						<view class="u-f-a-title">邮寄信件</view>
						<view style="color: #CCCCCC;font-size: 26rpx!important; margin-right: 20rpx;font-weight: 100;">
							平台将保护您信息安全
						</view>
					</view>
					<view class="u-s-f-body" v-if="model.communicates===1 || model.communicates===3">
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*收件人">
							<u-input :inputAlign="inputAlign" placeholder="请输入收件人姓名" v-model="model.username"
								type="text"></u-input>
						</u-form-item>

						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="联系电话">
							<u-input :inputAlign="inputAlign" placeholder="请输入联系电话" v-model="model.phone" type="text">
							</u-input>
						</u-form-item>

						<!-- <u-form-item :label-width="labelWidth" :label-position="labelPosition" label="省市区"
							:rightIcon="false">
							<u-input :inputAlign="inputAlign" placeholder="请选择省市区" v-model="model.district"
								type="select" @click="pickerShow=true">
							</u-input>
						</u-form-item> -->


						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*所在地区"
							:rightIcon="false">
							<u-input :inputAlign="inputAlign" placeholder="请选择所在地区" v-model="model.address" type="text">
							</u-input>
							<image slot="right" :src="mapImg" mode="heightFix" style="height:38rpx;" @click="toMap">
							</image>
						</u-form-item>
						<!-- <u-input :inputAlign="inputAlign" placeholder="请选择所在地区" v-model="model.district"
							type="text"> -->

						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*详细地址">
							<u-input :inputAlign="inputAlign" placeholder="请输入详细地址" v-model="model.street" type="text">
							</u-input>
						</u-form-item>
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="*邮政编码">
							<u-input :inputAlign="inputAlign" placeholder="请输入邮政编码" v-model="model.zipcode" type="text">
							</u-input>
						</u-form-item>
					</view>
					<view class="u-f-aj u-f-a-title" v-if="model.communicates===2 || model.communicates===3">
						<view class="u-f-a-title">E-mail</view>
						<view style="color: #CCCCCC;font-size: 26rpx!important; margin-right: 20rpx;font-weight: 100;">
							平台将保护您信息安全
						</view>
					</view>
					<view class="u-s-f-body" v-if="model.communicates===2 || model.communicates===3">
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="邮箱账号">
							<u-input :inputAlign="inputAlign" placeholder="请输入邮箱账号" v-model="model.email" type="text">
							</u-input>
						</u-form-item>
					</view>
				</view>
				<view v-show="currIdx===2">
					<view class="u-f-aj u-f-a-title">
						<view class="u-f-a-title">寻友信息</view>
					</view>
					<view class="u-s-f-body">
						<u-form-item :label-width="labelWidth" :label-position="labelPosition_top">
							<u-input placeholder="请输入寻友标题*" v-model="model.title" type="text" @input="titleInput"
								:customStyle="customStyleTitle">
							</u-input>
							<view style="text-align: right;color: #CCCCCC;">{{titleWords}}/20</view>
						</u-form-item>
						<u-form-item :label-width="labelWidth" :label-position="labelPosition_top">
							<u-input placeholder="请输入寻友详情（例如：平时的喜好、学习的专业、对未来的期盼、当下你想说的话……）" v-model="model.introduce"
								type="textarea" :height="height" @input="introduceInput">
							</u-input>
							<view style="text-align: right;color: #CCCCCC;">{{introduceWords}}/200</view>
						</u-form-item>



						<u-form-item :label-position="labelPosition">
							<u-upload :action="action" :file-list="fileList" :header="header" width="160" height="160"
								max-count="9" @on-remove="uploadRemove" @on-success="uploadSuccess"></u-upload>

						</u-form-item>

					</view>
				</view>
				<view v-show="currIdx===3">
					<view class="u-f-aj u-f-a-title">
						<view class="u-f-a-title">请选择一些您感兴趣的话题</view>
						<view style="color: #CCCCCC;font-weight: normal;">{{tagCount}}/10</view>
					</view>
					<view class="u-s-f-body">
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===1" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>


						<view class="my-gap">
							<u-gap height="1" bg-color="#EDEDED"></u-gap>
						</view>
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===2" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>


						<view class="my-gap">
							<u-gap height="1" bg-color="#EDEDED"></u-gap>
						</view>
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===3" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>


						<view class="my-gap">
							<u-gap height="1" bg-color="#EDEDED"></u-gap>
						</view>
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===4" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>


						<view class="my-gap">
							<u-gap height="1" bg-color="#EDEDED"></u-gap>
						</view>
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===5" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>


						<view class="my-gap">
							<u-gap height="1" bg-color="#EDEDED"></u-gap>
						</view>
						<block v-for="(item, index) in model.interests.list" :key="index">
							<u-tag v-if="item.tag_group===6" :color="colorList[item.checked]" size="max"
								:bgColor="bgColorList[item.checked]" :borderColor="bgColorList[item.checked]"
								shape="circle" :text="item.name" @click="handleClick(index)">
							</u-tag>
						</block>
					</view>
				</view>
				<view v-show="currIdx===4">
					<view class="u-f-aj u-f-a-title">
						<view class="u-f-a-title">笔友匹配设置</view>
					</view>
					<view class="u-s-f-body">
						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="匹配性别">
							<u-input :inputAlign="inputAlign" placeholder="请选择" :select-open="sexMatchAcitonSheetShow"
								v-model="model.searchSexesTag" type="select" @click="sexMatchAcitonSheetShow = true">
							</u-input>
						</u-form-item>

						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="匹配年龄">
							<u-input :inputAlign="inputAlign" placeholder="请选择" type="select" v-model="ageRegionComp"
								:select-open="matchAge.selectShow" @click="matchAge.selectShow = true"></u-input>
						</u-form-item>

						<u-form-item :label-width="labelWidth" :label-position="labelPosition" label="匹配通讯方式">
							<u-input :inputAlign="inputAlign" placeholder="请选择" type="select"
								v-model="model.searchCommunicatesTag" :select-open="tongxinMatchAcitonSheetShow"
								@click="tongxinMatchAcitonSheetShow = true"></u-input>
						</u-form-item>
					</view>
				</view>

			</u-form>


			<view class="u-f-btn">
				<view style="color: #B3B3B3;">
					{{currIdx+1}}/5 注册进度
				</view>
				<view class="u-f-ajr" style="margin-right: 50rpx;">
					<u-button shape="circleLeft" :customStyle="btnLeftStyle" @click="preStep">上一步
					</u-button>
					<u-button shape="circleRight" :customStyle="btnRightStyle" @click="submit">
						{{btnRightTitles[currIdx]}}
					</u-button>
				</view>
			</view>

		</view>

		<!-- <u-picker v-model="pickerShow" mode="region" @confirm="pickerConfirm" :areaCode="areaCode"></u-picker> -->
		<!-- <u-select mode="single-column" :list="provinceList" v-model="provinceSelectShow"
			@confirm="provinceSelectConfirm"></u-select> -->

		<u-picker-nation v-model="provinceSelectShow" mode="region" @confirm="provinceSelectConfirm"
			:areaCode="areaCode">
		</u-picker-nation>

		<u-action-sheet :list="tongxinList" v-model="tongxinAcitonSheetShow" @click="tongxinAcitonSheetCallback">
		</u-action-sheet>
		<u-select v-model="yearActionSheetShow" :list="yearList" @confirm="yearSelectConfirm"></u-select>
		</u-action-sheet>
		<u-action-sheet :list="sexList" v-model="sexAcitonSheetShow" @click="sexAcitonSheetCallback"></u-action-sheet>

		<u-action-sheet :list="sexMatchList" v-model="sexMatchAcitonSheetShow" @click="sexMatchAcitonSheetCallback">
		</u-action-sheet>
		<u-action-sheet :list="tongxinList" v-model="tongxinMatchAcitonSheetShow"
			@click="tongxinMatchAcitonSheetCallback">
		</u-action-sheet>
		<u-select-slider-range cancelText="不限" :defaultValue="defaultValue" v-model="matchAge.selectShow"
			@confirm="matchAgeConfirm" @cancel="cancelAgeConfirm">
		</u-select-slider-range>


		<u-popup v-model="showpopup" mode="center" width="90%" height="90%">
			<view style="background-color: #FFFFFF; padding: 20rpx;">
				<u-parse :html="content"></u-parse>
				<view>
					<u-button type="primary" @click="yhxylook"> 返回 </u-button>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import homeData from '../../compoents/home/home-data.vue';
	import provinces from '../../uview-ui/libs/util/province.js';
	import configService from '@/common/service/config.service.js';
	import test from '@/uview-ui/libs/function/test.js'
	import {
		AQ_CONTENT
	} from "@/common/util/constants"
	import {
		mapState,
		mapActions
	} from 'vuex';

	export default {
		name: 'HomeRegister',
		components: {
			homeData
		},
		computed: {
			...mapState({
				isLogin: 'isLogin',
				userid: 'userid',
				userInfo: 'userInfo'
			}),
			nationState: {
				get() {
					return this.model.nationTag + "-" + this.model.provinceTag
				},
				set() {}
			},
			ageRegionComp: {
				get() {
					if (this.model.startAge === 0 && this.model.endAge === 60) {
						return "不限"
					} else {
						return this.model.startAge + "岁 ~ " + this.model.endAge + "岁"
					}
				},
				set() {

				}
			}
		},
		data() {
			return {
				interests: [],
				areaCode: ['1', "11"],
				defaultValue: [0, 60],
				titleWords: 0,
				introduceWords: 0,
				tagCount: 0,
				height: 300,
				registerHeadImage: '../../static/treehole/register-head.png',
				srcleft: '../../../static/treehole/my/back.png',
				txUrl: '../../static/treehole/biu/touxiang.png',
				txCamare: '../../static/treehole/zhuce-xiangji.png',
				mapImg: '../../static/treehole/zhuce-dingwei.png',
				imgsize: 46,
				currIdx: 0,
				btnRightTitles: ["下一步", "下一步", "下一步", "下一步", "提交"],
				matchAge: {
					value: '',
					selectShow: false
				},
				model: {
					sex: '0',
					birthdayYear: '',
					nation: '',
					nationTag: '',
					province: '',
					provinceTag: "",
					communicates: '',
					username: '',
					phone: '',
					district: "",
					city: '',
					country: '',
					address: '',
					street: '',
					email: '',
					title: '',
					introduce: '',
					images: '',
					interests: {
						list: []
					},
					searchSexes: 3,
					searchSexesTag: '不限',
					searchCommunicates: 3,
					searchCommunicatesTag: '不限',
					startAge: 0,
					endAge: 60
				},
				pickerShow: false,
				maxlength: 10,
				inputAlign: 'right',
				rules: {
					sexTag: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					communicatesTag: [{
						required: true,
						message: '请选择通讯方式',
						trigger: 'change'
					}],
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur',
					}],
					introduce: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}]
				},
				yearActionSheetShow: false,
				yearList: [],
				tongxinList: [{
					text: '邮寄信件'
				}, {
					text: 'E-mail'
				}, {
					text: '不限'
				}],
				sexList: [{
					text: '男'
				}, {
					text: '女'
				}, {
					text: '保密'
				}],
				sexMatchList: [{
					text: '男'
				}, {
					text: '女'
				}, {
					text: '不限'
				}],
				provinceSelectShow: false,
				provinceList: provinces,
				labelWidth: 200,
				sexAcitonSheetShow: false,
				// yearAcitonSheetShow: false,
				tongxinAcitonSheetShow: false,
				tongxinMatchAcitonSheetShow: false,
				sexMatchAcitonSheetShow: false,
				labelPosition: 'left',
				labelPosition_top: 'top',
				errorType: ['toast'],
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
					'font-size': '36rpx',
					'color': '#363D50',
				},
				colorList: ["#394052", "#FFFFFF"],
				bgColorList: ["#F5F5F5", "#AE9F82"],
				fileList: [],
				fileTemp: "",
				fileUrl: "",
				limitType: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'],
				header: {
					'token': uni.getStorageSync("token")
				},
				action: configService.apiUrl + '/upload',
				check: false,
				agreement: false,
				showpopup: false,
				content: ''
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {

			this.model.sexTag = this.sexList[this.userInfo.sex === 0 ? 2 : this.userInfo.sex - 1].text;
			this.model.searchSexes = this.userInfo.searchSexes.value;
			this.model.searchSexesTag = this.userInfo.searchSexes.tag;

			if (this.userInfo.images.length > 0) {
				this.userInfo.images.map((item) => {
					let _temp = {
						url: item
					};
					this.fileList.push(_temp)
				})
			}
			if (this.userInfo.interests.list.length > 0) {
				this.userInfo.interests.list.map((item) => {
					if (item.checked === 1) {
						this.tagCount++
					}
				})
			}

			this.model = {
				...this.model,
				sex: this.userInfo.sex,
				birthdayYear: this.userInfo.birthdayYear,
				nation: this.userInfo.nation.code,
				nationTag: this.userInfo.nation.name,
				province: this.userInfo.province.code,
				provinceTag: this.userInfo.province.name,
				communicates: this.userInfo.communicates.value,
				communicatesTag: this.userInfo.communicates.tag,
				username: this.userInfo.username,
				phone: this.userInfo.phone,
				address: this.userInfo.address,
				street: this.userInfo.street,
				email: this.userInfo.email,
				zipcode: this.userInfo.zipcode,
				title: this.userInfo.title,
				introduce: this.userInfo.introduce,
				images: this.userInfo.images,
				interests: this.userInfo.interests,
				searchCommunicates: this.userInfo.searchCommunicates.value,
				searchCommunicatesTag: this.userInfo.searchCommunicates.tag,
				startAge: this.userInfo.startAge,
				endAge: this.userInfo.endAge
			};

			this.areaCode = [!!this.model.nation ? this.model.nation : "1", !!this.model.province ? this.model.province :
				"11", ''
			]
		},
		created() {
			this.initSelectList()
		},
		methods: {
			toMap() {
				const that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						// console.log(JSON.stringify(res));

						that.model.address = res.address;
						that.model.street = res.name
					}
				});
			},
			titleInput(e) {
				this.titleWords = e.length
			},
			introduceInput(e) {
				this.introduceWords = e.length
			},
			initSelectList() {
				//出生年
				var _date = new Date();
				var _year = Number(_date.getFullYear()) - 1;
				this.yearList = [];
				for (var i = _year; i > 1950; i--) {
					let _temp = {
						'label': i.toString(),
						'value': i.toString()
					};
					this.yearList.push(_temp)
				}
				//兴趣爱好列表
				const that = this;
				that.$http.post("/my/info").then(res => {
					if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
					that.interests = res.data.data.interests.list
					that.model.interests.list = res.data.data.interests.list
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {})
			},
			//slider-range  confirm
			matchAgeConfirm(e) {
				// console.info(e)
				this.matchAge.value = e[0] + "," + e[1];
				this.model.startAge = e[0];
				this.model.endAge = e[1];
				this.defaultValue = e
			},
			cancelAgeConfirm() {
				let e = [0, 60];
				this.matchAge.value = e[0] + "," + e[1];
				this.model.startAge = e[0];
				this.model.endAge = e[1];
				this.defaultValue = e
			},
			// 点击actionSheet回调
			sexAcitonSheetCallback(index) {
				uni.hideKeyboard();
				this.model.sexTag = this.sexList[index].text;

				this.model.sex = index === 2 ? 0 : index + 1;
			},
			editBirthdayYear() {
				this.yearActionSheetShow = true
			},
			provinceAcitonSheetCallback(index) {
				uni.hideKeyboard();
				this.model.province = this.provinceList[index].text;
			},
			yearSelectConfirm(e) {
				uni.hideKeyboard();
				this.model.birthdayYear = e[0].value
			},
			yearSelectCancel() {
				uni.hideKeyboard();
				this.model.birthdayYear = ''
			},
			tongxinAcitonSheetCallback(index) {
				uni.hideKeyboard();
				this.model.communicates = index + 1;
				this.model.communicatesTag = this.tongxinList[index].text;
			},
			tongxinMatchAcitonSheetCallback(index) {
				uni.hideKeyboard();
				this.model.searchCommunicates = index + 1;
				this.model.searchCommunicatesTag = this.tongxinList[index].text;
			},
			sexMatchAcitonSheetCallback(index) {
				uni.hideKeyboard();
				this.model.searchSexes = index + 1;
				this.model.searchSexesTag = this.sexMatchList[index].text;
			},
			preStep() {
				if (this.currIdx > 0) {
					this.currIdx--
				} else {
					this.$u.toast("已经是第一页了")
				}
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
			//删除图片后的回调
			uploadRemove(index, lists, name) {
				this.fileList = lists
			},
			/*上传图片 end*/
			customCheck(communicates) {
				if (communicates === 1) {
					if (!this.model.username || !this.model.street || !this.model.address || !this.model.zipcode) {
						this.$u.toast("请完善邮寄信息！");
						return false
					}
				}
				if (communicates === 2) {
					if (!this.model.email) {
						this.$u.toast("请填写E-mail地址！");
						return false
					}
				}
				if (communicates === 3) {
					if (!this.model.username || !this.model.street || !this.model.address || !this.model.zipcode) {
						this.$u.toast("请完善邮寄信息！");
						return false
					}
					if (!this.model.email) {
						this.$u.toast("请填写E-mail地址！");
						return false
					}
				}
				return true;
			},
			// 提交
			submit() {
				const that = this;

				if (that.currIdx === 4) {

					// if (!that.fileUrl) {
					// 	that.$u.toast("请上传头像")
					// 	that.currIdx = 0
					// 	return
					// }
					if (!that.customCheck(that.model.communicates)) {
						return
					}

					that.$refs.uForm.validate(valid => {
						if (valid) {
							console.log('验证通过');

							let _interests = [];
							that.model.interests.list.filter(m => m.checked === 1).map((item) => {
								_interests.push(item.id)
							});
							console.log("-----------:", _interests);
							let _images = [];
							that.fileList.map((item) => {
								_images.push(item.url)
							});
							let _methods = [
								"sex",
								"birthday_year",
								"nation",
								"province",
								"username",
								"phone",
								"city",
								"country",
								"address",
								"street",
								"zipcode",
								"email",
								"communicate",
								"title",
								"introduce",
								"interest",
								"images",
								"interest",
								"search_sex",
								"search_communicate",
								"match_start_age",
								"match_end_age"
							];
							let _params = that.model;
							_params.method = _methods.join(",");
							_params.interests = _interests.join(",");
							_params.images = _images.join(",");

							console.info("register:::", _params);

							that.updateApi(_params)
						} else {
							console.log('验证失败');
						}
					});
				} else {
					if (that.currIdx === 0) {
						// if (!that.check) {
						// 	that.$u.toast("请勾选协议");
						// 	return
						// }
						// if (!that.model.penName) {
						// 	that.$u.toast("请输入笔名");
						// 	return
						// }
						if (!that.model.communicates) {
							that.$u.toast("请选择通信方式");
							return
						}
					}
					if (that.currIdx === 1) {
						if (that.model.communicates === 1 || that.model.communicates === 3) {
							if (!that.model.username) {
								that.$u.toast("请输入真实姓名");
								return
							}
							if (!that.model.phone) {} else {
								if (!test.mobile(that.model.phone) && !test.landline(that.model.phone)) {
									that.$u.toast("输入手机号或者座机号");
									return false
								}
							}


							if (!that.model.street) {
								that.$u.toast("请选择所在地区");
								return
							}
							if (!that.model.address) {
								that.$u.toast("请输入详细地址");
								return
							}
							if (!that.model.zipcode) {
								that.$u.toast("请输入邮政编码");
								return
							}
						}
						if (that.model.communicates === 2 || that.model.communicates === 3) {
							if (!that.model.email) {
								that.$u.toast("请输入E-mail");
								return
							}
							if (!test.email(that.model.email)) {
								that.$u.toast("E-mail格式错误！");
								return false
							}
						}
					}
					if (that.currIdx === 2) {
						if (!that.model.title) {
							that.$u.toast("请输入寻友标题");
							return
						}
						if (!that.model.introduce) {
							that.$u.toast("请输入寻友详情");
							return
						}
						if (that.titleWords > 20) {
							that.$u.toast("寻友标题不能超过20个字");
							return
						}
						if (that.introduceWords > 200) {
							that.$u.toast("寻友详情不能超过200个字");
							return
						}
					}
					if (that.currIdx === 3) {
						if (that.tagCount === 0) {
							that.$u.toast("请选择兴趣爱好");
							return
						}
					}
					that.currIdx++
				}

			},
			goBack() {
				uni.navigateBack({

				})
			},
			handleClickXy(idx) {
				if (idx === 1) {
					this.content = AQ_CONTENT[2];
					this.showpopup = true
				} else if (idx === 2) {
					this.content = AQ_CONTENT[1];
					this.showpopup = true
				}
			},
			// 勾选协议
			checkboxChange(e) {
				this.agreement = e.value;
			},
			yhxylook() {
				this.showpopup = false
			},
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
			// 选择province回调
			provinceSelectConfirm(e) {

				this.model.nation = {};
				this.model.province = {};

				this.model.nation = e.province.value;
				this.model.nationTag = e.province.label;

				this.model.province = e.city.value;
				this.model.provinceTag = e.city.label;

				this.areaCode = [this.model.nation, this.model.province, '']

			},
			provinceSelectCancel() {
				this.model.nation = {};
				this.model.nationTag = '';
				this.model.province = {};
				this.model.provinceTag = '';
				this.model.district = "";
			},
			// pickerConfirm(e) {
			// this.areaCode = [e.province.value, e.city.value, e.area.value];
			// console.info(this.areaCode);
			// this.model.district = e.province.label + '-' + e.city.label + '-' + e.area.label;
			// this.model.province = e.province.value;
			// this.model.city = e.city.value;
			// this.model.country = e.area.value;
			// },
			updateApi(_params) {

				uni.showLoading({
					mask: true,
					title: "信息提交中..."
				});

				const that = this;
				let _url = "/my/update/info";
				that.$http.post(_url, _params).then(res => {
					uni.hideLoading()

					console.info(res);
					if (res.data.code === 200) {
						that.$u.toast("提交成功");
						uni.reLaunch({
							url: '../index/index'
						});
						// let _token = uni.getStorageSync("token");
						// that.$store.dispatch("setToken", _token)
					} else if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					} else {
						uni.showToast({
							icon: 'error',
							title: res.data.message,
							duration: 3000
						})
						that.model.interests = {
							list: that.interests
						}
					}
				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					// that.model.isPenuser = 1
					// that.$store.dispatch("setUserinfo", that.model)
					console.info(that.model)
				})
			},
			/*照片上传 begin*/
			selectFile() {
				const sizeType = ['original', 'compressed'];
				// const sourceType =  ['album', 'camera'];
				let chooseFile = null;
				const newMaxCount = 1;
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
			async uploadFile() {
				if (!this.fileTemp) {
					return;
				}
				// console.info("this.action:::", this.action) 
				uni.uploadFile({
					url: this.action,
					filePath: this.fileTemp,
					name: "file",
					header: this.header,
					success: res => {
						// 判断是否json字符串，将其转为json格式
						let data = this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res
							.data;
						if (![200, 201, 204].includes(res.statusCode)) {
							this.$u.toast('上传失败，请重试');
							this.fileUrl = ""
						} else {
							// 上传成功 
							console.info("上传成功::", data);
							this.fileUrl = data.data.url;
							this.txUrl = data.data.url
						}
					},
					fail: e => {
						this.$u.toast('上传失败，请重试');
						this.fileUrl = ""
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
			}
			/*照片上传 end*/

		}
	}
</script>

<style scoped lang="scss">
	@import "../../common/form.css";

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 20rpx;
		font-size: 30rpx;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}

		.agreement-xy {
			color: #404658;
			text-decoration: underline;
			font-style: italic;
		}
	}

	.customHead {
		background-image: url(../../static/treehole/register-head.png);
		// background-position: center center;
		background-size: 750rpx 200rpx;
		// border: 1rpx solid #FF0000;
		/*固定位置*/
		left: 0;
		right: 0;
		height: 200rpx;
		margin-top: -100rpx;
		position: absolute;

	}

	.touxiang {
		position: absolute;
		left: 0;
		right: 0;
		margin-top: 130rpx;
		margin-left: 50rpx;
	}

	.u-s-f-body {
		padding: 20rpx 20rpx;
		border: 1px solid rgba(174, 159, 130, 0.11);
		border-radius: 16rpx;
	}

	.my-gap {
		margin: 20rpx 0;
	}
</style>
