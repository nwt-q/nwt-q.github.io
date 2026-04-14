---
title: Redis 分布式锁
tags: [Redis ， 分布式锁]
categories: [Redis]
date: 2026-4-6
description: Nginx 动态分离
articleGPT: Nginx 动态分离
references:
  - title: Java
    url: https://github.com/imsyy/vitepress-theme-curve
---





[158、缓存-分布式锁-分布式锁原理与使用_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1np4y1C7Yf?p=158)



netty





## Redis 分布式锁



缓存中间键







## 缓存击穿







## 锁的时序性







## 分布式锁



占锁： 所有服务都去同一个地方占锁



设置过期时间和加锁是同步的， 使用原子命令占锁



删锁也会出现问题 解决方案使用lua脚本



**加锁确保原子性， 解锁原子性**





## Redission

分布锁和同步锁





