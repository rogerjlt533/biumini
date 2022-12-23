<template>
	<view class="u-select">
		<u-popup :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
			:safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
			<view class="u-select">
				<view class="u-select__header" @touchmove.stop.prevent="">
					<view class="u-select__header__cancel u-select__header__btn" :style="{ color: cancelColor }"
						hover-class="u-hover-class" :hover-stay-time="150" @tap="getResult('cancel')">
						{{cancelText}}
					</view>
					<view class="u-select__header__title">
						{{title}}
					</view>
					<view class="u-select__header__confirm u-select__header__btn" :style="{ color: confirmColor }"
						hover-class="u-hover-class" :hover-stay-time="150" @touchmove.stop=""
						@tap.stop="getResult('confirm')">
						{{confirmText}}
					</view>
				</view>
				<view class="u-select__body">
					<view style="margin: 30rpx 10rpx 0rpx 10rpx;">
						<slider-range :value="rangeValue" :format="format1" @change="handleRangeChange">
						</slider-range>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import sliderRange from '../../../compoents/common/slider-range.vue'

	export default {
		components: {
			sliderRange
		},
		props: {
			// 是否显示边框
			border: {
				type: Boolean,
				default: true
			},
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			// "取消"按钮的颜色
			cancelColor: {
				type: String,
				default: '#B2B2B2'
			},
			// "确定"按钮的颜色
			confirmColor: {
				type: String,
				default: '#AE9F82'
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			},
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 提供的默认选中的下标
			defaultValue: {
				type: Array,
				default () {
					return [0, 60];
				}
			},
			// 自定义value属性名
			valueName: {
				type: String,
				default: 'value'
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: 'label'
			},
			// 自定义多列联动模式的children属性名
			childName: {
				type: String,
				default: 'children'
			},
			// 顶部标题
			title: {
				type: String,
				default: ''
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {
				rangeValue: [20, 30],
			};
		},
		watch: {
			// 在select弹起的时候，重新初始化所有数据
			value: {
				immediate: true,
				handler(val) {
					if (val) setTimeout(() => this.init(), 10);
				}
			},
		},
		computed: {
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			},
		},
		methods: {
			handleRangeChange(e) {
				this.rangeValue = e
			},
			format1(val) {
				return val
			},
			init() {
				this.setSelectValue();
			},
			// 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
			setSelectValue() {
				this.rangeValue = this.defaultValue
			},
			close() {
				this.$emit('input', false);
			},
			// 点击确定或者取消
			getResult(event = null) {
				if (event) this.$emit(event, this.rangeValue);
				this.close();
			},
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-select {

		&__action {
			position: relative;
			line-height: $u-form-item-height;
			height: $u-form-item-height;

			&__icon {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transition: transform .4s;
				transform: translateY(-50%);
				z-index: 1;

				&--reverse {
					transform: rotate(-180deg) translateY(50%);
				}
			}
		}

		&__hader {
			&__title {
				color: $u-content-color;
			}
		}

		&--border {
			border-radius: 6rpx;
			border-radius: 4px;
			border: 1px solid $u-form-item-border-color;
		}

		&__header {
			@include vue-flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			padding: 0 40rpx;
		}

		&__body {
			width: 100%;
			// height: 500rpx;
			overflow: hidden;
			background-color: #fff;

			&__picker-view {
				height: 100%;
				box-sizing: border-box;

				&__item {
					@include vue-flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					color: $u-main-color;
					padding: 0 8rpx;
				}
			}
		}
	}
</style>
