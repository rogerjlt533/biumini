<template>
	<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
		<view class="u-datetime-picker">
			<view class="u-picker-header" @touchmove.stop.prevent="">
				<view class="u-btn-picker u-btn-picker--tips" 
					:style="{ color: cancelColor }" 
					hover-class="u-opacity" 
					:hover-stay-time="150" 
					@tap="getResult('cancel')"
				>{{cancelText}}</view>
				<view class="u-picker__title">{{ title }}</view>
				<view
					class="u-btn-picker u-btn-picker--primary"
					:style="{ color: moving ? cancelColor : confirmColor }"
					hover-class="u-opacity"
					:hover-stay-time="150"
					@touchmove.stop=""
					@tap.stop="getResult('confirm')"
				>
					{{confirmText}}
				</view>
			</view>
			<view class="u-picker-body">
				<picker-view v-if="mode == 'region'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset && params.province">
						<view class="u-column-item" v-for="(item, index) in provinces" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.city">
						<view class="u-column-item" v-for="(item, index) in citys" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.area">
						<view class="u-column-item" v-for="(item, index) in areas" :key="index">
							<view class="u-line-1">{{ item.label }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'time'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset && params.year">
						<view class="u-column-item" v-for="(item, index) in years" :key="index">
							{{ item }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.month">
						<view class="u-column-item" v-for="(item, index) in months" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.day">
						<view class="u-column-item" v-for="(item, index) in days" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.hour">
						<view class="u-column-item" v-for="(item, index) in hours" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.minute">
						<view class="u-column-item" v-for="(item, index) in minutes" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.second">
						<view class="u-column-item" v-for="(item, index) in seconds" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">???</text>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'selector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset">
						<view class="u-column-item" v-for="(item, index) in range" :key="index">
							<view class="u-line-1">{{ getItemValue(item, 'selector') }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else-if="mode == 'multiSelector'" :value="valueArr" @change="change" class="u-picker-view" @pickstart="pickstart" @pickend="pickend">
					<picker-view-column v-if="!reset" v-for="(item, index) in range" :key="index">
						<view class="u-column-item" v-for="(item1, index1) in item" :key="index1">
							<view class="u-line-1">{{ getItemValue(item1, 'multiSelector') }}</view>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import provinces from '../../libs/util/nation.js';
import citys from '../../libs/util/state.js';
import areas from '../../libs/util/nation.js';

/**
 * picker picker???????????????
 * @description ???????????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????
 * @tutorial https://www.uviewui.com/components/picker.html
 * @property {Object} params ???????????????????????????????????????
 * @property {String} mode ???????????????region-???????????????time-?????????????????????time???
 * @property {String Number} start-year ????????????????????????mode=time??????????????????1950???
 * @property {String Number} end-year ????????????????????????mode=time??????????????????2050???
 * @property {Boolean} safe-area-inset-bottom ??????????????????????????????????????????false???
 * @property {Boolean} show-time-tag ????????????????????????????????????????????????????????????
 * @property {String} cancel-color ??????????????????????????????#606266???
 * @property {String} confirm-color ??????????????????????????????#2979ff???
 * @property {String} default-time ????????????????????????mode=time?????????
 * @property {String} confirm-text ?????????????????????
 * @property {String} cancel-text ?????????????????????
 * @property {String} default-region ???????????????????????????????????????mode=region?????????
 * @property {String} default-code ???????????????????????????????????????mode=region?????????
 * @property {Boolean} mask-close-able ????????????????????????????????????Picker?????????true???
 * @property {String Number} z-index ????????????z-index????????????1075???
 * @property {Array} default-selector ?????????????????????????????????????????????range????????????????????????
 * @property {Array} range ???????????????????????????mode=selector???mode=multiSelector?????????
 * @property {String} range-key ???range????????????????????????????????????Object????????????key?????????????????????????????????
 * @event {Function} confirm ?????????????????????????????????????????????
 * @event {Function} cancel ?????????????????????????????????????????????
 * @example <u-picker v-model="show" mode="time"></u-picker>
 */
export default {
	name: 'u-picker-nation',
	props: {
		// picker????????????????????????
		params: {
			type: Object,
			default() {
				return {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: true,
					city: true,
					area: false,
					timestamp: true,
				};
			}
		},
		// ???mode=selector??????mode=multiSelector?????????????????????
		range: {
			type: Array,
			default() {
				return [];
			}
		},
		// ???mode=selector??????mode=multiSelector????????????????????????????????????
		defaultSelector: {
			type: Array,
			default() {
				return [0];
			}
		},
		// ??? range ????????? Array???Object??? ???????????? range-key ????????? Object ??? key ?????????????????????????????????
		rangeKey: {
			type: String,
			default: ''
		},
		// ???????????????region-???????????????time-???????????????selector-???????????????multiSelector-????????????
		mode: {
			type: String,
			default: 'time'
		},
		// ??????????????????
		startYear: {
			type: [String, Number],
			default: 1950
		},
		// ??????????????????
		endYear: {
			type: [String, Number],
			default: 2050
		},
		// "??????"???????????????
		cancelColor: {
			type: String,
			default: '#606266'
		},
		// "??????"???????????????
		confirmColor: {
			type: String,
			default: '#AE9F82'
		},
		// ????????????????????????2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
		defaultTime: {
			type: String,
			default: ''
		},
		// ????????????????????????????????????["?????????", "????????????", "????????????"]
		defaultRegion: {
			type: Array,
			default() {
				return [];
			}
		},
		// ????????????????????????????????????????????????????????????
		showTimeTag: {
			type: Boolean,
			default: true
		},
		// ??????????????????????????????defaultRegion???areaCode???????????????areaCode?????????????????????["13", "1303", "130304"]
		areaCode: {
			type: Array,
			default() {
				return [];
			}
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: false
		},
		// ????????????????????????????????????Picker
		maskCloseAble: {
			type: Boolean,
			default: true
		},
		// ????????????????????????????????????????????????
		value: {
			type: Boolean,
			default: false
		},
		// ?????????z-index???
		zIndex: {
			type: [String, Number],
			default: 0
		},
		// ????????????
		title: {
			type: String,
			default: ''
		},
		// ?????????????????????
		cancelText: {
			type: String,
			default: '??????'
		},
		// ?????????????????????
		confirmText: {
			type: String,
			default: '??????'
		}
	},
	data() {
		return {
			years: [],
			months: [],
			days: [],
			hours: [],
			minutes: [],
			seconds: [],
			year: 0,
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			reset: false,
			startDate: '',
			endDate: '',
			valueArr: [],
			provinces: provinces,
			citys: citys[0],
			areas: areas[0][0],
			province: 0,
			city: 0,
			area: 0,
			moving: false // ????????????????????????????????????????????????????????????????????????????????????????????????
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		propsChange() {
			// ????????????????????????????????????????????????
			return `${this.mode}-${this.defaultTime}-${this.startYear}-${this.endYear}-${this.defaultRegion}-${this.areaCode}`;
		},
		regionChange() {
			// ????????????????????????????????????????????????
			return `${this.province}-${this.city}`;
		},
		yearAndMonth() {
			return `${this.year}-${this.month}`;
		},
		uZIndex() {
			// ?????????????????????z-index??????????????????
			return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
		}
	},
	watch: {
		propsChange() {
			this.reset = true;
			setTimeout(() => this.init(), 10);
		},
		// ????????????????????????????????????picker???????????????????????????this.citys???this.areas
		regionChange(val) {
			this.citys = citys[this.province];
			this.areas = areas[this.province][this.city];
		},
		// watch???????????????????????????????????????????????????????????????????????????????????????
		// ??????????????????30???31??????????????????2??????29????????????2???28???
		yearAndMonth(val) {
			if (this.params.year) this.setDays();
		},
		// ?????????QQ????????????????????????????????????(??????????????????????????????????????????)????????????????????????????????????????????????
		value(n) {
			if (n) {
				this.reset = true;
				setTimeout(() => this.init(), 10);
			}
		}
	},
	methods: {
		// ???????????????????????????????????????????????????????????????
		pickstart() {
			// #ifdef MP-WEIXIN
			this.moving = true;
			// #endif
		},
		// ??????????????????
		pickend() {
			// #ifdef MP-WEIXIN
			this.moving = false;
			// #endif
		},
		// ???????????????????????????????????????????????????????????????
		getItemValue(item, mode) {
			// ??????(2020-05-25)uni-app??????????????????????????????????????????v-if???false????????????????????????????????????
			// ????????????????????????????????????getItemValue????????????????????????????????????????????????
			if (this.mode == mode) {
				return typeof item == 'object' ? item[this.rangeKey] : item;
			}
		},
		// ??????10?????????0???????????????????????????????????????
		formatNumber(num) {
			return +num < 10 ? '0' + num : String(num);
		},
		// ?????????????????????
		generateArray: function(start, end) {
			// ????????????????????????????????????end-year????????????????????????????????????end+1??????????????????????????????????????????
			start = Number(start);
			end = Number(end);
			end = end > start ? end : start;
			// ???????????????????????????????????????????????????
			return [...Array(end + 1).keys()].slice(start);
		},
		getIndex: function(arr, val) {
			let index = arr.indexOf(val);
			// ??????index???-1(????????????index???)???~(-1)=-(-1)-1=0????????????????????????
			return ~index ? index : 0;
		},
		//??????????????????
		initTimeValue() {
			// ?????????????????????IE?????????(uni??????????????????)???????????????????????????"-"????????????
			let fdate = this.defaultTime.replace(/\-/g, '/');
			fdate = fdate && fdate.indexOf('/') == -1 ? `2020/01/01 ${fdate}` : fdate;
			let time = null;
			if (fdate) time = new Date(fdate);
			else time = new Date();
			// ????????????????????????
			this.year = time.getFullYear();
			this.month = Number(time.getMonth()) + 1;
			this.day = time.getDate();
			this.hour = time.getHours();
			this.minute = time.getMinutes();
			this.second = time.getSeconds();
		},
		init() {
			this.valueArr = [];
			this.reset = false;
			if (this.mode == 'time') {
				this.initTimeValue();
				if (this.params.year) {
					this.valueArr.push(0);
					this.setYears();
				}
				if (this.params.month) {
					this.valueArr.push(0);
					this.setMonths();
				}
				if (this.params.day) {
					this.valueArr.push(0);
					this.setDays();
				}
				if (this.params.hour) {
					this.valueArr.push(0);
					this.setHours();
				}
				if (this.params.minute) {
					this.valueArr.push(0);
					this.setMinutes();
				}
				if (this.params.second) {
					this.valueArr.push(0);
					this.setSeconds();
				}
			} else if (this.mode == 'region') {
				if (this.params.province) {
					this.valueArr.push(0);
					this.setProvinces();
				}
				if (this.params.city) {
					this.valueArr.push(0);
					this.setCitys();
				}
				if (this.params.area) {
					this.valueArr.push(0);
					this.setAreas();
				}
			} else if (this.mode == 'selector') {
				this.valueArr = this.defaultSelector;
			} else if (this.mode == 'multiSelector') {
				this.valueArr = this.defaultSelector;
				this.multiSelectorValue = this.defaultSelector;
			}
			this.$forceUpdate();
		},
		// ??????picker???????????????
		setYears() {
			// ??????????????????
			this.years = this.generateArray(this.startYear, this.endYear);
			// ??????this.valueArr??????????????????????????????picker?????????????????????
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
		},
		setMonths() {
			this.months = this.generateArray(1, 12);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
		},
		setDays() {
			let totalDays = new Date(this.year, this.month, 0).getDate();
			this.days = this.generateArray(1, totalDays);
			let index = 0;
			// ????????????????????????setMonths()??????this.valueArr.splice(this.valueArr.length - 1, xxx)??????
			// ??????this.month???this.year?????????????????????watch??????this.setDays()?????????this.valueArr.length????????????
			if (this.params.year && this.params.month) index = 2;
			else if (this.params.month) index = 1;
			else if (this.params.year) index = 1;
			else index = 0;
			// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
			// ??????????????????3???31???????????????2???????????????????????????29???????????????day????????????31????????????????????????????????????29(picker-column???1??????)
			if(this.day > this.days.length) this.day = this.days.length;
			this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
		},
		setHours() {
			this.hours = this.generateArray(0, 23);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
		},
		setMinutes() {
			this.minutes = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
		},
		setSeconds() {
			this.seconds = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
		},
		setProvinces() {
			// ??????????????????province??????
			if (!this.params.province) return;
			let tmp = '';
			let useCode = false;
			// ?????????????????????defaultRegion???areaCode???????????????areaCode??????
			if (this.areaCode.length) {
				tmp = this.areaCode[0];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[0];
			else tmp = 0;
			// ????????????????????????
			provinces.map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.province = tmp;
			this.provinces = provinces;
			// ????????????????????????
			this.valueArr.splice(0, 1, this.province);
		},
		setCitys() {
			if (!this.params.city) return;
			let tmp = '';
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[1];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[1];
			else tmp = 0;
			citys[this.province].map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.city = tmp;
			this.citys = citys[this.province];
			this.valueArr.splice(1, 1, this.city);
		},
		setAreas() {
			if (!this.params.area) return;
			let tmp = '';
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[2];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[2];
			else tmp = 0;
			areas[this.province][this.city].map((v, k) => {
				if (useCode ? v.value == tmp : v.label == tmp) {
					tmp = k;
				}
			});
			this.area = tmp;
			this.areas = areas[this.province][this.city];
			this.valueArr.splice(2, 1, this.area);
		},
		close() {
			this.$emit('input', false);
		},
		// ????????????picker????????????
		change(e) {
			this.valueArr = e.detail.value;
			let i = 0;
			if (this.mode == 'time') {
				// ????????????i++????????????this.valueArr????????????????????????????????????????????????this.params?????????????????????
				// ??????if?????????i??????1?????????????????????????????????
				if (this.params.year) this.year = this.years[this.valueArr[i++]];
				if (this.params.month) this.month = this.months[this.valueArr[i++]];
				if (this.params.day) this.day = this.days[this.valueArr[i++]];
				if (this.params.hour) this.hour = this.hours[this.valueArr[i++]];
				if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]];
				if (this.params.second) this.second = this.seconds[this.valueArr[i++]];
			} else if (this.mode == 'region') {
				if (this.params.province) this.province = this.valueArr[i++];
				if (this.params.city) this.city = this.valueArr[i++];
				if (this.params.area) this.area = this.valueArr[i++];
			} else if (this.mode == 'multiSelector') {
				let index = null;
				// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
				this.defaultSelector.map((val, idx) => {
					if (val != e.detail.value[idx]) index = idx;
				});
				// ?????????????????????????????????????????????????????????????????????
				if (index != null) {
					this.$emit('columnchange', {
						column: index,
						index: e.detail.value[index]
					});
				}
			}
		},
		// ????????????????????????
		getResult(event = null) {
			// #ifdef MP-WEIXIN
			if (this.moving) return;
			// #endif
			let result = {};
			// ??????????????????this.params???????????????true?????????
			if (this.mode == 'time') {
				if (this.params.year) result.year = this.formatNumber(this.year || 0);
				if (this.params.month) result.month = this.formatNumber(this.month || 0);
				if (this.params.day) result.day = this.formatNumber(this.day || 0);
				if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
				if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
				if (this.params.second) result.second = this.formatNumber(this.second || 0);
				if (this.params.timestamp) result.timestamp = this.getTimestamp();
			} else if (this.mode == 'region') {
				if (this.params.province) result.province = provinces[this.province];
				if (this.params.city) result.city = citys[this.province][this.city];
				if (this.params.area) result.area = areas[this.province][this.city][this.area];
			} else if (this.mode == 'selector') {
				result = this.valueArr;
			} else if (this.mode == 'multiSelector') {
				result = this.valueArr;
			}
			if (event) this.$emit(event, result);
			this.close();
		},
		// ???????????????
		getTimestamp() {
			// yyyy-mm-dd???????????????????????????iOS???????????????"/"???????????????????????????
			let time = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second;
			return new Date(time).getTime() / 1000;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-datetime-picker {
	position: relative;
	z-index: 999;
}

.u-picker-view {
	height: 100%;
	box-sizing: border-box;
}

.u-picker-header {
	width: 100%;
	height: 90rpx;
	padding: 0 40rpx;
	@include vue-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 30rpx;
	background: #fff;
	position: relative;
}

.u-picker-header::after {
	content: '';
	position: absolute;
	border-bottom: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.u-picker__title {
	color: $u-content-color;
}

.u-picker-body {
	width: 100%;
	height: 500rpx;
	overflow: hidden;
	background-color: #fff;
}

.u-column-item {
	@include vue-flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: $u-main-color;
	padding: 0 8rpx;
}

.u-text {
	font-size: 24rpx;
	padding-left: 8rpx;
}

.u-btn-picker {
	padding: 16rpx;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
}

.u-opacity {
	opacity: 0.5;
}

.u-btn-picker--primary {
	color: $u-type-primary;
}

.u-btn-picker--tips {
	color: $u-tips-color;
}
</style>
