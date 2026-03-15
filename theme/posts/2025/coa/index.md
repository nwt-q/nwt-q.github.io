---
title: 计算机组成原理
tags: [组成原理]
categories: [组成原理]
date: 2025-12-10
description: 计算机组成原理
articleGPT: 计算机组成原理
references:
  - title: vitepress-Linux
    url: https://github.com/imsyy/vitepress-theme-curve
---

# 计算机组成原理



# 第一章： 概述

CPI相关计算



# 第二章 数据信息的表示



## 2.1数据表示

进制间的转换

进制转换就是计算每一位在对应位置的贡献，其实本质上这是一种按权展开求和法。位权相乘后默认为10进制。

详细可以查看笔记[进制、权重与计算本质——整理笔记](./NumeralSystem.md)



说到这里其实十进制也是有相关编码方式的下面是对其编码方式的总结：

1. BCD编码

2. BID码

3. DPD码

   

知识点总结：

动态 DRAM 的刷新是以行为单位进行的。

磁盘属于直接存取存储器类型的存储器。

磁盘可以**直接定位到任意磁道/扇区**，但不是随机访问（因有寻道+旋转延迟），属于 **直接存取存储器**

计算机操作的最小单位时间是 时钟周期



主存块号，Cache组数，Cache组号 相关计算

✅【模板】

第 1 步：算主存块号

主存块号=存储单元地址主存块大小

$$
\text{主存块号} = \frac{\text{存储单元地址}}{\text{主存块大小}}
$$

------

第 2 步：算 Cache 组数
$$
\text{组数} = \frac{\text{Cache 行数}}{\text{相联度}}
$$

------

第 3 步：算 Cache 组号
$$
\text{Cache 组号} = \text{主存块号} \bmod \text{组数}
$$
