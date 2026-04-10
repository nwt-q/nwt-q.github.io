---
title: Milvus 向量数据库
tags: [transform,向量数据库，Milvus]
categories: [Milvus]
date: 2026-3-23
description: RAG文本检索增强
articleGPT: RAG文本检索增强
references:
  - title: Java
    url: https://github.com/imsyy/vitepress-theme-curve
---


## Milvus向量数据库

结构化数据与非结构化数据





非结构化数据





嵌入向量

做相似度检索， 离不开距离





### Collection 和 Field



IVF_FLAT：是基于倒排索引方法

1. 聚类
2. 倒排索引

IVF_SQ8： 在IVF基础商增加量化



HNSW 图索引



attu





Milvus数据的增删查改



分区检索



过滤检索



范围检索





向量检索





稠密检索

稀疏检索





RRFRanker排序器



加权排序器


总结：
加权排序器：注意不同检索器的度量不同，值域不一致，加权计算的时候可能有问题。需要归一化处理。



需要先删表再删库





## MySQL 问答系统

高频问答数据的缓存





## Python日志记录简介与应用





## BM25算法概述

BM25（BestMatching25）是一种信息检索领域的排名算法，用于计算查询（Query）与文档（Document）之间的相关性得分。它改进了传统的TF-IDF算法，引I入文档长度归一化和词频饱和机制，使检索结果更准确。



BM25原理



衡量一个词的稀有程度



引入长度归一化和词频





##  Redis在RAG中的应用









##  基于MySQL的FQA问答系统实现



jieba分词：文本预处理













