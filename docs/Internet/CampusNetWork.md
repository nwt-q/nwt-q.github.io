# Linux 只有终端界面如何登入校园网

最近一直沉思一个问题， 我一个Linux设备没有浏览器怎么浏览网页登入我的校园网呢？

于是问了一个Linux大佬，以他的经验来说，`curl` 也是一个浏览器😂， 这一言瞬间打破以前的认知，网页的交互其实是数据的交互，而 `curl` 能够请求数据，这样也算是浏览器， 只是别于传统浏览器，不进行页面的渲染但是对于一个终端设备Linux而言足以了



下面是校园网登录请求的接口以此常考成功登录校园网

```bash
curl 'http://192.168.0.101/drcom/login?callback=dr1003&DDDDD=[你的手机号码]&upass=[你的密码]&0MKKey=123456&R1=0&R2=&R3=1&R6=0&para=00&v6ip=&terminal_type=1&lang=zh-cn&jsVersion=4.2&v=3759&lang=zh' \
  -H 'Accept: */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
  -H 'Connection: keep-alive' \
  -H 'DNT: 1' \
  -H 'Referer: http://192.168.0.101/a79.htm' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0' \
  --insecure ;
curl 'http://192.168.0.101:801/eportal/extern/oB3cDT1672886672/OZxMCH1672886693/pc_3.js?v=_1672904711582' \
  -H 'Accept: */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
  -H 'Connection: keep-alive' \
  -H 'DNT: 1' \
  -H 'Referer: http://192.168.0.101/' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0' \
  --insecure
```

