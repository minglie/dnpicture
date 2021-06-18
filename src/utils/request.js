let request = (params) => {
  uni.showLoading({
    title: '加载中',
  });

  return new Promise((reslove, reject) => {
    wx.request({
      ...params,
      success(res) {
        reslove(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};

export default request;



const get = async (api, params = {}, headers) => {
  const res = await request({
    url: api,
    data: params,
    header: headers || {},
    method: "GET"
  });
  return res;
};

const post = async (api, params = {}, headers) => {
  const res = request({
    url: api,
    data: params,
    header: headers || {},
    method: "POST"
  });
  return res;
};

//将ajax请求挂到全局对象M上
M.request = {}
M.request.get = get;
M.request.post = post;
M.request.reqByReq = async (url, req) => {
  if (req.method == "get") {
    let result = await get(url, req.params, req.headers)
    return result;
  }
  if (req.method == "post") {
    let result = await post(url, req.params, req.headers)
    return result;
  }
};