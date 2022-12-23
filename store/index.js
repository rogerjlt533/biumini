import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO
} from "@/common/util/constants"
import configService from '@/common/service/config.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false, //用于判断是否注册已经是合法的笔友
    isAuth: false, //用于判断，是否已经取得微信授权，也就是说是否获得了token
    token: '',
    userInfo: {
      isPenuser: -1
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      console.log("==>token111111", token);
      if (token === '') {
        state.isLogin = false;
        state.isAuth = false;
        state.userInfo = {
          isPenuser: -1
        };
        uni.setStorageSync("token", token);
      } else {
        api.initUserinfo().then(response => {
          if (response.data.code === 200) {
            state.isLogin = true;
            const result = response.data;
            state.userInfo = result.data;
            if (state.userInfo.isPenuser === 1) {
              state.isAuth = true
            } else {
              state.isAuth = false
            }
            console.info("======SET_TOKEN======", state.userInfo);
            /*未读消息*/
            api.getMsgTip().then(res => {
              let _result = res.data;
              // console.info("============1111======", _result.data)
              if (_result.code === 200) {
                if (_result.data.message > 0 ||
                  _result.data.public > 0 ||
                  _result.data.private > 0 ||
                  _result.data.notice > 0) {
                  uni.showTabBarRedDot({
                    index: 2
                  })
                } else {
                  uni.hideTabBarRedDot({
                    index: 2
                  })
                }
              }
            }).catch((err) => {
              uni.hideTabBarRedDot({
                index: 2
              })
            }).finally(() => {})

            /*未读消息*/
          } else {
            state.token = '';
            state.isLogin = false;
            state.isAuth = false;
          }
        }).catch(error => {
          uni.hideTabBarRedDot({
            index: 2
          })
          // console.log("catch==>response", response)
        })
      }
    },
    // SET_AVATAR: (state, avatar) => {
    // 	state.avatar = avatar
    // },
    setUserinfo(state, data) {
      state.isLogin = true;
      state.userInfo = data
    },
    // setNickname(state, data) {
    // 	state.nickName = data.nickName
    // 	state.avatarUrl = data.avatarUrl
    // 	//补充
    // 	state.userInfo.nick = data.nickName
    // 	state.userInfo.image = data.avatarUrl
    // },
  },
  actions: {
    setToken(context, data) {
      uni.setStorageSync("token", data);
      context.commit('SET_TOKEN', data)
    },
    // setNickname(context, data) {
    // 	context.commit('setNickname', data)
    // },
    setUserinfo(context, data) {
      context.commit('setUserinfo', data)
    },
    mRegister(context, result) {
      const userInfo = result.userInfo;
      uni.setStorageSync(ACCESS_TOKEN, result.token);
      uni.setStorageSync(USER_INFO, userInfo);
      context.commit('SET_TOKEN', result.token);
      console.info("store.js::", result)
    },
    initUserinfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api.initUserinfo().then(response => {
          if (response.data.code === 200) {
            const result = response.data.result;
            // console.info("initUserinfo::", result)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          // console.log("catch===>response", response)
          reject(error)
        })
      })
    },
    Logoff({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api.logoff().then(response => {
          if (response.data.code === 200) {
            commit('SET_TOKEN', '');
            uni.switchTab({
              url: '/pages/index/index'
            })
          } else {
            resolve(response)
          }
        }).catch(error => {
          console.log("catch===>response", response);
          reject(error)
        })
      })
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '');
        console.info("exiting......");
        uni.switchTab({
          url: '/pages/index/index'
        })
      })
    },

  },
  getters: {
    token: state => state.token,
    userid: state => {
      state.userid = uni.getStorageSync(USER_INFO).id;
      return state.userid
    },
    userInfo: state => state.userInfo
  }
})
