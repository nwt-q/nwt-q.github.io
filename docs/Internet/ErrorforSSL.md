

## 加密后网络变缓慢的原因

你是否还在为网速缓慢而烦恼，检测过很多是否怀疑你的电脑被非法入侵，其实不让加密协议正在拉低你的网速

**如下图所示**

我在访问网站时发现网速突然下降，对于安全高敏感的我而言，此种算是不能容忍的，不能容忍不明不白的网络降速，由此经过我和Deepseek的交流，发现了一个监听网络警报的进程
```powershell
eventvwr.msc
```

进来后发现出现一下错误由此才揭开了网络变慢的罪魁祸首 DNS服务加密协议

![image-20251222141301692](assets/image-20251222141301692.png)

可以发现在加密的过程中出现 

`DNS-over-HTTPS 请求无法从服务器223.5.5.5获取有效的 SSL 证书，模板https://doh.pub/dns-query，原因是：  SSL certificate common name (host name field) is incorrect;。WinHTTP 标志： 0x10`

的错误，这种错误往往是dns服务造成的，在与Deepseek的深入交流中发现最简单直接的方法是更换`DOH`即可 



**错误原因**

这是**DNS-over-HTTPS（DoH）请求的 SSL 证书验证失败错误**，原因是：DoH 服务器（223.5.5.5）返回的 SSL 证书中，**“通用名称（Common Name）” 或 “主题备用名称（SAN）” 不包含当前请求的 DoH 模板域名（https://doh.pub/dns-query）**，导致系统判定证书与目标域名不匹配，验证失败。



**总结**

解决方案： 更换`DOH`即可 