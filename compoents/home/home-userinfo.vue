<template>
	<!-- <view style="margin: 20rpx 10rpx;"> -->
	<view>

		<view class=" u-f-a-title u-f-aj" style="margin-right: 40rpx;">
			个人信息
		</view>


		<view class="u-s-f-body">

			<home-user-cell label="用户名/笔名*" :text="model.penName" @click="editPenName">
			</home-user-cell>
			<home-user-cell label="性别" :text="model.sexTag" @click="editSex"></home-user-cell>
			<home-user-cell label="出生年份" :text="model.birthdayYear?model.birthdayYear:''" @click="editBirthdayYear">
			</home-user-cell>
			<home-user-cell label="国家-省(州)" :text="nationState" @click="editNation">
			</home-user-cell>
			<home-user-cell label="通信详情*" :text="model.communicates.tag" @click="editTxDetail"></home-user-cell>
			<home-user-cell label="兴趣爱好" :tagList="model.interests.list" @click="editLikes"></home-user-cell>
			<home-user-cell label="寻友信息*" :isLast="true" :introduce="model.introduce" :title="model.title"
				@click="toPageGrjj">
			</home-user-cell>

		</view>

		<view class="u-f-a-title">匹配设置</view>
		<view class="u-s-f-body">
			<home-user-cell label="匹配性别" :text="model.searchSexes.tag" @click="sexMatchAcitonSheetShow = true">
			</home-user-cell>
			<home-user-cell label="匹配年龄" :text="ageRegionComp" @click="matchAge.selectShow = true"></home-user-cell>
			<home-user-cell label="通信方式匹配" :text="model.searchCommunicates.tag" :isLast="true"
				@click="tongxinMatchAcitonSheetShow = true">
			</home-user-cell>
		</view>

		<u-action-sheet :list="sexList" v-model="sexActionSheetShow" @click="sexActionSheetCallback"
			:safeAreaInsetBottom="safeAreaInsetBottom"></u-action-sheet>
		<!-- <u-action-sheet :list="yearList" v-model="yearActionSheetShow" @click="yearActionSheetCallback"
			:safeAreaInsetBottom="safeAreaInsetBottom"> -->
		<u-select v-model="yearActionSheetShow" :list="yearList" @confirm="yearSelectConfirm"></u-select>
		</u-action-sheet>
		<u-action-sheet :list="sexMatchList" v-model="sexMatchAcitonSheetShow" @click="sexMatchAcitonSheetCallback"
			:safeAreaInsetBottom="safeAreaInsetBottom">
		</u-action-sheet>
		<u-action-sheet :list="tongxinList" v-model="tongxinMatchAcitonSheetShow"
			@click="tongxinMatchAcitonSheetCallback" :safeAreaInsetBottom="safeAreaInsetBottom">
		</u-action-sheet>
		<!-- <u-select mode="single-column" :list="provinceList" v-model="provinceSelectShow"
			@confirm="provinceSelectConfirm">
		</u-select> -->
		<u-picker-nation v-model="provinceSelectShow" mode="region" @confirm="provinceSelectConfirm"
			:areaCode="areaCode">
		</u-picker-nation>
		<!-- <u-picker v-model="pickerShow" mode="region" @confirm="pickerConfirm" :areaCode="areaCode"></u-picker> -->


		<u-select-slider-range cancelText="不限" :defaultValue="defaultValue" v-model="matchAge.selectShow"
			@confirm="matchAgeConfirm" @cancel="cancelAgeConfirm">
		</u-select-slider-range>

	</view>
</template>

<script>
	import HomeUserCell from './home-user-cell.vue';
	import provinces from '../../uview-ui/libs/util/province.js';

	import {
		mapState,
		mapActions
	} from 'vuex';

	export default {
		name: 'HomeUserinfo',
		components: {
			HomeUserCell
		},
		props: {
			isLogin: {
				type: Boolean,
				default: false
			},
			userdata: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			...mapState({
				model: 'userInfo'
			}),
			nationState: {
				get() {
					return this.model.nation.name + "-" + this.model.province.name
				},
				set() {}
			},
			// getAgeRegion() {
			// 	if (this.model.startAge === 0 && this.model.endAge === 120) {
			// 		return "不限"
			// 	} else {
			// 		return this.model.startAge + "岁 ~ " + this.model.endAge + "岁"
			// 	}
			// }
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
				areaCode: ['1', "11"],
				defaultValue: [],
				isShowGrjj: true,
				arrowRightUrl: "../../../static/treehole/my/wd-bianji.png",
				matchAge: {
					value: '',
					selectShow: false
				},
				safeAreaInsetBottom: false,
				sexActionSheetShow: false,
				sexList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				sexMatchAcitonSheetShow: false,
				sexMatchList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '不限'
					}
				],
				tongxinMatchAcitonSheetShow: false,
				tongxinList: [{
						text: '邮寄信件'
					},
					{
						text: 'E-mail'
					},
					{
						text: '不限'
					}
				],
				searchAge: '',
				yearActionSheetShow: false,
				yearList: [],
				provinceSelectShow: false,
				provinceList: provinces,
			}
		},
		created() {
			this.initSelectList();
			this.defaultValue.push(this.model.startAge);
			this.defaultValue.push(this.model.endAge);
			// console.info(this.defaultValue)
			this.matchAge.value = this.model.startAge + "," + this.model.endAge;

			this.areaCode = [!!this.model.nation.code ? this.model.nation.code : "1", !!this.model.province.code ? this
				.model.province.code : "11", ''
			];
			console.info(this.areaCode)

		},
		methods: {
			initSelectList() {
				//出生年
				var _date = new Date();
				var _year = Number(_date.getFullYear());
				this.yearList = [];
				for (var i = _year - 1; i > 1950; i--) {
					let _temp = {
						'label': i.toString(),
						'value': i.toString()
					};
					this.yearList.push(_temp)
				}
			},
			goBack() {
				uni.navigateBack({

				})
			},
			handleClick() {
				this.$emit("switchEdit")
			},
			toPageGrjj() {
				uni.navigateTo({
					url: "../../pages/user/gerenjianjie?params=" + encodeURIComponent(JSON.stringify(this.model))
				})
			},
			editPenName() {
				uni.navigateTo({
					url: "../../pages/user/editPenName?params=" + encodeURIComponent(JSON.stringify(this.model))
				})
			},
			editTxDetail() {
				uni.navigateTo({
					url: "../../pages/user/editTxDetail?params=" + encodeURIComponent(JSON.stringify(this.model))
				})
			},
			editLikes() {
				uni.navigateTo({
					url: "../../pages/user/editLikes?params=" + encodeURIComponent(JSON.stringify(this.model))
				})
			},
			editSex() {
				this.sexActionSheetShow = true
			},
			editBirthdayYear() {
				this.yearActionSheetShow = true
			},
			editNation() {
				this.provinceSelectShow = true
			},
			//slider-range  confirm
			matchAgeConfirm(e) {
				if (this.model.startAge !== e[0] || this.model.endAge !== e[1]) {
					this.matchAge.value = e[0] + "," + e[1];
					this.model.startAge = e[0];
					this.model.endAge = e[1];

					let _params = {
						method: "match_start_age, match_end_age",
						startAge: e[0],
						endAge: e[1]
					};
					this.updateApi(_params)
				}
			},
			cancelAgeConfirm() {
				let e = [0, 60];
				this.matchAge.value = e[0] + "," + e[1];
				this.model.startAge = e[0];
				this.model.endAge = e[1];
				this.defaultValue = e;

				let _params = {
					method: "match_start_age, match_end_age",
					startAge: e[0],
					endAge: e[1]
				};
				this.updateApi(_params)
			},
			// 点击actionSheet回调
			sexActionSheetCallback(index) {
				uni.hideKeyboard();
				if (this.model.sexTag !== this.sexList[index].text) {
					let _params = {
						method: "sex",
						sex: index === 2 ? 0 : index + 1
					};
					this.updateApi(_params)
				}
				this.model.sex = index === 2 ? 0 : index + 1;
				this.model.sexTag = this.sexList[index].text;
			},
			yearSelectConfirm(e) {
				console.info(e[0].value);
				// uni.hideKeyboard();
				if (this.model.birthdayYear !== e[0].value) {
					let _params = {
						method: "birthday_year",
						birthdayYear: e[0].value
					};
					this.updateApi(_params)
				}
				this.model.birthdayYear = e[0].value;
			},
			// yearSelectCancel() {
			// 	let _params = {
			// 		method: "birthday_year",
			// 		birthdayYear: '0'
			// 	};
			// 	this.updateApi(_params)
			// 	this.model.birthdayYear = '保密';
			// },
			// 选择province回调
			provinceSelectConfirm(e) {
				// console.info("sunzttt::", e)
				this.model.nation = {};
				this.model.province = {};

				this.model.nation.code = e.province.value;
				this.model.nation.name = e.province.label;

				this.model.province.code = e.city.value;
				this.model.province.name = e.city.label;

				let _params = {
					method: "nation, province",
					nation: this.model.nation.code,
					province: this.model.province.code
				};
				this.updateApi(_params)
			},
			// provinceSelectCancel() {
			// 	this.model.province = {};
			// 	this.model.province.code = '';
			// 	this.model.province.name = '保密';
			// 	let _params = {
			// 		method: "province",
			// 		province: this.model.province.code
			// 	};
			// 	this.updateApi(_params)
			// },
			tongxinMatchAcitonSheetCallback(index) {
				uni.hideKeyboard();
				if (this.model.searchCommunicates.value !== (index + 1)) {
					this.model.searchCommunicates.value = index + 1;
					this.model.searchCommunicates.tag = this.tongxinList[index].text;
					let _params = {
						method: "search_communicate",
						search_communicates: index + 1
					};
					this.updateApi(_params)
				}
			},
			sexMatchAcitonSheetCallback(index) {
				uni.hideKeyboard();
				if (this.model.birthdayYear.value !== (index + 1)) {
					this.model.searchSexes.value = index + 1;
					this.model.searchSexes.tag = this.sexMatchList[index].text;
					let _params = {
						method: "search_sex",
						search_sexes: index + 1
					};
					this.updateApi(_params)
				}
			},
			updateApi(_params) {
				const that = this;
				let _url = "/my/update/info";
				that.$http.post(_url, _params).then(res => {
					console.info(res);
					if (res.data.code === 501) {
						setTimeout(() => {
							uni.hideLoading();
							that.$store.dispatch("Logout")
						}, 800)
					}
					that.areaCode = [_params.nation, _params.province, '']

				}).catch((err) => {
					let msg = err.message;
					that.$tip.error(msg);
				}).finally(() => {
					that.$store.dispatch("setUserinfo", that.model)
				})
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
</style>
