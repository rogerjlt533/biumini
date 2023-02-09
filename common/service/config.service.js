// let BASE_URL = 'http://192.168.1.111:8088/api'
// let BASE_URL = 'http://biuserver.juqihui.cn/api';
let BASE_URL = 'https://biuapi.zuosuo.net/api';
// let BASE_URL = 'https://biuapi.juqihui.cn/api';


// let image_url = 'http://biuimage.juqihui.cn/';
let image_url = 'http://biuimage.zuosuo.cn/';

let staticDomainURL = BASE_URL + '/sys/common/static';

const configService = {
  apiUrl: BASE_URL,
  imgUrl: image_url,
  staticDomainURL: staticDomainURL
};

export default configService
