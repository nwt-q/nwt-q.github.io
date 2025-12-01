# API 网关文档 - 短链服务

本文档描述了用于短链生成和解码的 API 接口。所有请求都需要通过 `Authorization` Header 进行认证和计费。

## 认证 (Authentication)

所有 API 接口都需要在请求头中包含 `Authorization` 字段，用于用户身份验证和计费扣费。

- **Header Key:** `Authorization`
- **Header Value Format:** `[Your_Secret_Token]` 或 `Bearer [Your_Secret_Token]`
- **示例 Token:** `SECRET_TEST_TOKEN_12345` (用于测试)

每次成功调用将从用户余额中扣除配置的费用 (`0.1` ）。如果外部 API 调用失败或参数错误，费用将自动回滚。

## 1. 小程序短链生成

该接口用于生成微信小程序短链，对应外部服务 `mx.qrurl.net` 的 `type=mpshortlink` 功能。

**请求路径:** `POST /generate-miniprogram-link`

### 请求参数

| 字段       | 类型   | 是否必填 | 描述                 | 示例值               |
| ---------- | ------ | -------- | -------------------- | -------------------- |
| `appid`    | string | 是       | 微信小程序的 AppID。 | `wx6b698b0251caccff` |
| `pagepath` | string | 是       | 小程序页面的路径。   | `pages/index/index`  |

**请求体示例 (JSON):**

```
{
    "appid": "wx6b698b0251caccff",
    "pagepath": "pages/index/index"
}
```

### 响应格式 (200 OK)

| 字段               | 类型   | 描述                                  |
| ------------------ | ------ | ------------------------------------- |
| `code`             | number | 状态码，200 表示成功。                |
| `msg`              | string | 消息提示。                            |
| `miniprogram_link` | string | 生成的小程序短链 (`mp://` 开头)。     |
| `current_balance`  | string | 扣费后的当前账户余额 (保留两位小数)。 |

**成功响应示例:**

```
{
    "code": 200,
    "msg": "小程序短链生成成功，费用已扣除",
    "miniprogram_link": "mp://ilhyu3rfOgfbCYy",
    "current_balance": "19.90"
}
```

## 2. 短链解码

该接口用于将小程序短链解码回其原始的 `appid` 和 `pagepath`。

**请求路径:** `POST /decode-link`

### 请求参数

| 字段   | 类型   | 是否必填 | 描述                   | 示例值                 |
| ------ | ------ | -------- | ---------------------- | ---------------------- |
| `link` | string | 是       | 需要解码的小程序短链。 | `mp://ilhyu3rfOgfbCYy` |

**请求体示例 (JSON):**

```
{
    "link": "mp://ilhyu3rfOgfbCYy"
}
```

### 响应格式 (200 OK)

| 字段              | 类型   | 描述                                  |
| ----------------- | ------ | ------------------------------------- |
| `code`            | number | 状态码，200 表示成功。                |
| `msg`             | string | 消息提示。                            |
| `appid`           | string | 解码得到的小程序 AppID。              |
| `page`            | string | 解码得到的小程序页面路径。            |
| `current_balance` | string | 扣费后的当前账户余额 (保留两位小数)。 |

**成功响应示例:**

```
{
    "code": 200,
    "msg": "短链解码成功，费用已扣除",
    "appid": "wx6b698b0251caccff",
    "page": "pages/index/index",
    "current_balance": "19.80"
}
```

## 3. 通用短链生成

该接口用于生成一个普通的长 URL 短链（使用的是 `c1n.cn` 外部服务）。

**请求路径:** `POST /generate-shortlink`

### 请求参数

| 字段      | 类型   | 是否必填 | 描述               | 示例值                                   |
| --------- | ------ | -------- | ------------------ | ---------------------------------------- |
| `longUrl` | string | 是       | 需要缩短的长 URL。 | `https://www.google.com/search?q=gemini` |

**请求体示例 (JSON):**

```
{
    "longUrl": "[https://www.google.com/search?q=gemini](https://www.google.com/search?q=gemini)"
}
```

### 响应格式 (200 OK)

| 字段              | 类型   | 描述                                  |
| ----------------- | ------ | ------------------------------------- |
| `code`            | number | 状态码，200 表示成功。                |
| `msg`             | string | 消息提示。                            |
| `short_url`       | string | 生成的短链接。                        |
| `current_balance` | string | 扣费后的当前账户余额 (保留两位小数)。 |

**成功响应示例:**

```
{
    "code": 200,
    "msg": "短链生成成功，费用已扣除",
    "short_url": "[https://c1n.cn/xxxxxx](https://c1n.cn/xxxxxx)",
    "current_balance": "19.70"
}
```