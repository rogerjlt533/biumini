<template>
	<view>
		<u-navbar back-text="" title="此刻的心情" :isBack='true' :custom-back="customBack" :imgwidth="imgsize"
			:imgheight="imgsize" :srcleft="srcleft">
		</u-navbar>
		<view style="margin: 10rpx;padding: 10rpx;">
			<u-tag size="max" bgColor="#F5F5F5" shape="circle" :text="cancelTag.title" borderColor="#F5F5F5"
				@click="chooseMoods(0)">
			</u-tag>
		</view>
		<u-grid :col="4" :border="false">
			<u-grid-item :customStyle="customStyle" v-for="(item, index) in wdList" :key="index" v-if="index>0">
				<u-tag display="flex" size="default" :bgColor="index === currIdx?'#FAEED6':'#F5F5F5'" shape="circle"
					:text="item.title" mode="plain" borderColor="#EDEDED" @click="chooseMoods(index)">
					<view slot="img" style="width: 38rpx;height: 38rpx;margin-right: 10rpx;">
						<image :src="item.url" mode="aspectFit" style="width: 38rpx;height: 38rpx;" />
					</view>
				</u-tag>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name: "ChooseMoods",
		components: {},
		data() {
			return {
				imgsize: 46,
				srcleft: '../../../static/treehole/my/back.png',
				cancelTag: {
					'url': '../../static/error.png',
					'title': '取消心情',
					'code': 'cancel',
					'checked': false
				},
				wdList: [{
					'url': '../../static/error.png',
					'title': '取消心情',
					'code': 'cancel',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-kaixin.png',
					'title': '开心',
					'code': 'happy',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-kiss.png',
					'title': 'kiss',
					'code': 'kiss',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-kuku.png',
					'title': '哭哭',
					'code': 'cry',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-kouzhao.png',
					'title': '口罩',
					'code': 'mask',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-shengbing.png',
					'title': '生病',
					'code': 'ill',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-yiwen.png',
					'title': '疑问',
					'code': 'doubt',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-ganga.png',
					'title': '尴尬',
					'code': 'awkward',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-aile.png',
					'title': '爱了',
					'code': 'love',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-ku.png',
					'title': '酷',
					'code': 'cool',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-shoushang.png',
					'title': '受伤',
					'code': 'injured',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-shuijiao.png',
					'title': '睡觉',
					'code': 'sleep',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-papa.png',
					'title': '怕怕',
					'code': 'fear',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-jianxiao.png',
					'title': '奸笑',
					'code': 'smirk',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-outu.png',
					'title': '呕吐',
					'code': 'vomit',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-tushe.png',
					'title': '吐舌',
					'code': 'spit',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-zhenjing.png',
					'title': '震惊',
					'code': 'shock',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-mogui.png',
					'title': '魔鬼',
					'code': 'monster',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-mengbi.png',
					'title': '懵B',
					'code': 'dull',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-yunle.png',
					'title': '晕了',
					'code': 'halo',
					'checked': false
				}, {
					'url': '../../static/treehole/bq/bq-haoqi.png',
					'title': '好气',
					'code': 'angry',
					'checked': false
				}],
				wdbqImgUrl: '../../static/treehole/my/wd-bianji.png',
				customStyle: {
					padding: '10rpx 0'
				},
				currIdx: 0
			}
		},
		onLoad(event) {
			// this.wdList[this.currIdx].checked = true
		},
		methods: {
			customBack() {
				// const that = this
				// console.info("chooseMoodschooseMoodschooseMoods")
				// that.chooseMoods(3)
				// this.$emit("close", _moods)
				this.showpopup1 = false
			},
			chooseMoods(idx) {
				// this.wdList[this.currIdx].checked = false
				// this.wdList[idx].checked = true
				this.currIdx = idx

				let _moods = {
					...this.wdList[idx],
					idx: idx
				}
				this.$emit("close", _moods)
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
</style>
