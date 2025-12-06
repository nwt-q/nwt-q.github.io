# Java 读取配置文件中的配置信息

在 Java 中读取配置文件的注解**在 Java 中读取配置文件的注解**没有统一的 “单个注解”**，核心取决于你使用的技术栈（如 Spring/Spring Boot、原生 Java 等），不同场景下注解体系不同。以下是最常用的场景和对应注解：

### 一、Spring/Spring Boot（最主流）

Spring Boot 是读取配置文件（`application.properties`/`application.yml`）的核心场景，核心注解如下：

| 注解                       | 作用                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `@Value`                   | 读取单个配置项（支持 SpEL 表达式），直接注入到字段 / 方法参数中 |
| `@ConfigurationProperties` | 批量绑定配置项到 Java 类（支持前缀、类型转换、嵌套属性）     |
| `@PropertySource`          | 加载**自定义配置文件**（非默认的 application.yml/properties） |
| `@Configuration`           | 标记配置类，配合上述注解使用（Spring 上下文加载）            |

#### 1. 基础用法：@Value（单个配置





```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {
    // 读取 application.properties 中的 app.name 配置
    @Value("${app.name:默认名称}") // 冒号后是默认值（配置不存在时使用）
    private String appName;

    // 读取数值类型
    @Value("${app.port:8080}")
    private int appPort;
}
```

#### 2. 进阶用法：@ConfigurationProperties（批量绑定）









#### 3. 加载自定义配置文件：@PropertySource



### 二、原生 Java（无框架）



### 三、其他框架 / 场景



### 核心总结

| 场景                 | 核心注解                             | 备注                   |
| -------------------- | ------------------------------------ | ---------------------- |
| Spring Boot 单个配置 | `@Value`                             | 简单场景首选           |
| Spring Boot 批量配置 | `@ConfigurationProperties`           | 复杂配置、层级配置首选 |
| 加载自定义配置文件   | `@PropertySource` + `@Configuration` | 配合上述注解使用       |
| 原生 Java            | 无注解，用 `Properties` 类手动读取   | 无框架时的基础方案     |

**关键提醒**：

- `@ConfigurationProperties` 需确保类有 `getter/setter`，否则绑定失败；
- `@PropertySource` 默认只支持 `.properties`，加载 `.yml` 需自定义 `PropertySourceFactory`；
- Spring Boot 2.2+ 可通过 `@ConfigurationPropertiesScan` 自动扫描配置类，无需手动加 `@Component`。