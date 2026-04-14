# Spring Boot 启动失败：`Invalid empty profile` 与 `spring.profiles.active`

## 现象

应用启动时报错，日志类似：

```text
APPLICATION FAILED TO START

Failed to bind properties under 'spring.profiles.active' to java.util.Set<java.lang.String>:

    Property: spring.profiles.active
    Value: "
"
    Origin: "spring.profiles.active" from property source "systemProperties"
    Reason: java.lang.IllegalStateException: Invalid empty profile
```

要点：

- 绑定失败的是 **`spring.profiles.active`**。
- **属性来源是 `systemProperties`**（JVM 系统属性），不是 `application.yaml` / `application.properties`。
- 实际传入的值等价于**空或仅空白**（日志里可能显示成奇怪的引号或换行），Spring Boot 不允许“空 profile”，因此抛出 `Invalid empty profile`。

## 容易产生的误解

项目里 `src/main/resources/application.yaml` 已正确配置，例如：

```yaml
spring:
  profiles:
    active: dev
```

若仍出现上述错误，**不一定是 YAML 写错**。Spring Boot 配置有**优先级**：来自 **JVM 系统属性** 或 **环境变量** 的 `spring.profiles.active` 会覆盖 YAML 中的默认值。若外部传入的是“空 profile”，就会失败，且报错会指向 **`systemProperties`** 或对应环境变量源。

## 根因说明（本仓库实例）

在 IntelliJ IDEA 的 **Spring Boot 运行配置** 中，`OrangeSystemApplication` 曾包含：

```xml
<option name="ACTIVE_PROFILES" value="&#10;" />
```

`&#10;` 表示**换行符**。效果等价于在 IDE 的 **Active profiles** 输入框里只按了回车、没有填写 `dev`。IDE 仍会向 JVM 传入 `spring.profiles.active`，值为空白，从而触发 **Invalid empty profile**，并覆盖 `application.yaml` 里的 `active: dev`。

配置文件位置（本仓库）：`.idea/workspace.xml` 中对应 `<configuration name="OrangeSystemApplication" ...>` 节点。

## 解决办法

### 1. 在 IntelliJ 中修正运行配置（推荐日常操作）

1. 打开 **Run | Edit Configurations…**。
2. 选中 **Spring Boot → OrangeSystemApplication**（或你的模块名）。
3. **Active profiles**：
   - 填 **`dev`**（与 YAML 一致），或
   - **完全留空**（不要只留换行），让 `application.yaml` 生效。

保存后重新运行。

### 2. 直接修改 `.idea/workspace.xml`（已与仓库修复方式一致）

删除错误的：

```xml
<option name="ACTIVE_PROFILES" value="&#10;" />
```

或将其改为合法值，例如：

```xml
<option name="ACTIVE_PROFILES" value="dev" />
```

注意：`workspace.xml` 可能被 IDE 再次改写，长期习惯上仍以 **Run Configuration 界面** 为准。

### 3. 命令行 / 脚本 / CI

避免以下写法：

- `-Dspring.profiles.active=`（等号后为空）
- 环境变量 `SPRING_PROFILES_ACTIVE` 被设为空字符串（若走环境变量源，同样可能导致空 profile）

应显式指定，例如：

```bash
-Dspring.profiles.active=dev
```

或设置：

```bash
set SPRING_PROFILES_ACTIVE=dev
```

（Linux/macOS 使用 `export`。）

## 如何自行判断“是谁覆盖了 YAML”

看报错里的 **Origin** / **property source**：

| 来源说明 | 常见含义 |
|----------|----------|
| `systemProperties` | JVM 参数 `-Dspring.profiles.active=...`，常来自 IDE 运行配置或启动脚本 |
| 环境变量相关源 | `SPRING_PROFILES_ACTIVE` 等 |

若为 `systemProperties` 且 Value 为空，优先检查 **IDE 的 Active profiles** 和 **启动命令中的 `-D` 参数**。

## 小结

- **YAML 正常仍可能启动失败**：外部传入的**空** `spring.profiles.active` 优先级更高。
- 本问题典型场景：IDE **Active profiles** 被误设为仅空白/换行，对应 `.idea/workspace.xml` 里 `ACTIVE_PROFILES` 为 `&#10;`。
- **修复**：在 IDE 中填写 `dev` 或清空 Active profiles（无空白占位）；命令行/环境中避免空的 profile 参数。