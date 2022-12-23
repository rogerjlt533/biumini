<script>
	export default {
		onLaunch: function() {

			uni.setStorageSync("msg_to", 0)
			// console.log('sunzttt')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<style>
	@import './common/uni.css';
	/*引入图标库*/
	@import './common/icon.css';
	@import './common/flexCoomn.css';
</style>
