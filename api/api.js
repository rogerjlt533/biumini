import {
  http
} from '@/common/service/service.js'
import configService from '@/common/service/config.service.js';
const apiService = {

  /**
   * 登录
   */
  // login(params) {
  // 	return http.post('/sys/mLogin',params)	
  // },
  /**
   * 退出
   */
  // logout(params) {
  // 	return http.post('/sys/logout',params);
  // },


  /*注销*/
  logoff() {
    return http.post("/user/cancel")
  },

  initUserinfo() {
    return http.post("/my/info")
  },

  getNoticeAuthList() {
    return http.post("/user/notice/auth/list")
  },

  /**
   * 获取文件访问路径
   * @param avatar
   * @param subStr
   * @returns {*}
   */
  getFileAccessHttpUrl(avatar, subStr) {
    if (!subStr) subStr = 'http';
    if (avatar && avatar.startsWith(subStr)) {
      return avatar;
    } else {
      return configService.staticDomainURL + "/" + avatar;
    }
  },

  getMsgTip() {
    return http.post("/user/message/tip")
  },

};

export default apiService;
