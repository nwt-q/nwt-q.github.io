## title: 葵花码/小程序码生成接口

# 小程序码生成与计费代理接口

::: tip 关于接口

请求地址随机分配一个独立的通道

:::


```
POST /generate-qr
```

这是一个代理接口，负责对外部小程序码生成 API 进行认证、计费、扣款以及结果缓存。每次成功调用（无论是生成还是命中缓存）都会从用户余额中扣除固定费用。

## 认证 (Authorization)

接口使用 **Token** 进行认证。您的私有 API Key 必须放在 `Authorization` 请求头中。

| 字段            | 类型          | 描述                       |
| --------------- | ------------- | -------------------------- |
| `Authorization` | Header String | 格式：`[您的 API Token]`。 |

**示例:** `Authorization: SECRET_TEST_TOKEN`

## 费用与计费

- **计费模式:** 每次调用成功（包括缓存命中）都会扣除 **0.1** 单位的费用。
- **退款:** 若外部 API 调用失败、网络错误或参数错误，系统会自动回滚扣除的费用。回滚后的余额会在响应中返回。

## 请求 (Request)

| 字段           | 类型          | 是否必需 | 描述                                                         |
| -------------- | ------------- | -------- | ------------------------------------------------------------ |
| `Content-Type` | Header String | 是       | 必须设置为 `application/json`。                              |
| `appid`        | String        | 是       | 小程序的 AppID。                                             |
| `pagepath`     | String        | 是       | 小程序页面的路径，例如 `pages/index/index`。                 |
| `type`         | String        | 是       | 指定生成的小程序码类型。这是动态参数，需根据外部 API 要求填写，例如：`wxcode` (默认类型) 或 `wxcode_a` 等。 |

**请求示例 (cURL)**

```
curl -X POST https://code.jxoj.top/generate-qr\
  -H "Authorization: Bearer SECRET_TEST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "appid": "wx6b698132322112",
      "pagepath": "pages/index/index",
      "type": "wxcode"
  }'
```

## 响应 (Response)

### 状态码 200: 成功

| 字段              | 类型   | 描述                                                     |
| ----------------- | ------ | -------------------------------------------------------- |
| `code`            | Number | 200，表示成功。                                          |
| `msg`             | String | 成功消息。如果命中缓存，可能会显示。                     |
| `qrcode_url`      | String | 生成或缓存的小程序码图片 URL。                           |
| `current_balance` | String | **用户的最新余额**（扣费后的精确到小数点后两位的余额）。 |

**响应示例**

```json
{
  "code": 200,
  "msg": "葵花码生成成功",
  "qrcode_url": "http://mx.qrurl.net/api/img/wxacode?sid=251111Ok67Bc",
  "current_balance": "19.30"
}
```

错误响应

| 状态码  | 字段                               | 描述                                                         |
| ------- | ---------------------------------- | ------------------------------------------------------------ |
| **401** | `msg`                              | 认证失败：Token 无效或缺失。                                 |
| **402** | `msg`, `current_balance`           | 支付失败：用户余额不足。                                     |
| **400** | `msg`, `current_balance`           | 参数错误：缺少 `appid`, `pagepath`, 或 `type`。费用已回滚。  |
| **502** | `msg`, `detail`, `current_balance` | 外部 API 返回错误。`detail` 字段包含外部 API 响应详情。费用已回滚。 |
| **500** | `msg`, `current_balance`           | 内部服务或网络连接错误（例如调用外部 API 超时）。费用已回滚。 |