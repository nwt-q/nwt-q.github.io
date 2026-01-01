# 极限于连续

解析式子


常见极限类型：

oo/oo：法1 洛必达法则 法二： “抓大头” ： x -> +oo 时 $x << x^2$  $lim x << x^a << a^x$​ 

无穷 - 无穷： 先定型 + 再变型 + 洛必达

$0^0 $  $oo^0型$    

**抬底法**

**夹逼准则**

   ## 洛必达法则

没有条件创造条件，没有需求创造需求。



## 极限的连续

函数的连续









## **1. 间断点类型**

可去间断点

无穷间断点

跳跃间断点

题型： 求可去间断点个数





函数 $f(x)$ 在  $x_0$ 处间断，是指 $f(x)_0$​ 处不满足连续的条件：

- **连续条件**：
  1. $f(x_0)$ 有定义；
  2. $\lim_{x \to x_0} f(x)$ 存在；
  3. $\lim_{x \to x_0} f(x) = f(x_0)$。

不满足任一条件即间断。

**间断点分类**（通常按极限存在与否分）：

- **第一类间断点**（左右极限都存在但不都等于函数值）  
  (1) 可去间断点：左右极限相等，但不等于函数值（或函数无定义）。  
  (2) 跳跃间断点：左右极限存在但不相等。

- **第二类间断点**（至少一侧极限不存在或无穷）  
  例如无穷间断点（极限为 ∞），振荡间断点（如 $\sin\frac{1}{x}$ 在 0 处）。

---

## **2. 易错典题**
$$
lim_{x \to 0} \frac{\sqrt{1+x} - 1}{\arcsin x}
$$

用等价无穷小替换：  
当 $x \to 0$ 时，$\sqrt{1+x} - 1 \sim \frac{x}{2}，\arcsin x \sim x $。  
因此  
$$
frac{\sqrt{1+x} - 1}{\arcsin x} \sim \frac{\frac{x}{2}}{x} = \frac{1}{2}.
$$


极限为 $\frac12$。


$$
\lim_{x \to 0} \frac{\sin 2x \cdot (e^{3x} - 1)}{1 + x^2 - (1 + 3x)}
$$

先化简分母：
$$
1 + x^2 - 1 - 3x = x^2 - 3x = x(x - 3).
$$
分子用等价无穷小：  $\sin 2x \sim 2x，e^{3x} - 1 \sim 3x$。  
所以  
$$
\sin 2x \cdot (e^{3x} - 1) \sim (2x)(3x) = 6x^2.
$$

原极限：
$$
\lim_{x \to 0} \frac{6x^2}{x(x - 3)} = \lim_{x \to 0} \frac{6x}{x - 3} = \frac{0}{-3} = 0.
$$


---

## **3. 连续区间？ \(x\) 的取值范围**
题中仅写“连续区间？\(x\) 的取值范围。” 没有给函数，所以可能是概念题：  
连续区间是函数在其上连续的最大区间（开或闭），需要根据函数定义域和间断点位置确定。



\[
y = \ln\left(x + \sqrt{x^2 + 1}\right) \quad (-\infty, +\infty) \text{ 是（奇函数）}
\]
验证奇偶性：  
\[
f(-x) = \ln\left(-x + \sqrt{x^2 + 1}\right).
\]  
注意到 \(\left(x + \sqrt{x^2 + 1}\right)\left(-x + \sqrt{x^2 + 1}\right) = (\sqrt{x^2+1})^2 - x^2 = 1\)。  
所以 \(-x + \sqrt{x^2 + 1} = \frac{1}{x + \sqrt{x^2 + 1}}\)。  
于是  
\[
f(-x) = \ln\left(\frac{1}{x + \sqrt{x^2 + 1}}\right) = -\ln\left(x + \sqrt{x^2 + 1}\right) = -f(x).
\]  
确实是奇函数。

---

## **4. 无穷小与 0 的关系**
无穷小量是以 0 为极限的变量（或函数），不是常数 0（除非是零函数）。  
常数 0 是特殊的无穷小。


$$
lim_{x \to 2} \frac{x - 2}{\sqrt{x+2} - 2}
$$
令 \( t = x-2 \)，则 \( x = t+2 \)，  
\( \sqrt{x+2} - 2 = \sqrt{t+4} - 2 \)。

用有理化：  
\[
\frac{t}{\sqrt{t+4} - 2} \cdot \frac{\sqrt{t+4} + 2}{\sqrt{t+4} + 2} = \frac{t(\sqrt{t+4} + 2)}{(t+4) - 4} = \frac{t(\sqrt{t+4} + 2)}{t}.
\]  
当 \( t \neq 0 \) 时，原式 \(= \sqrt{t+4} + 2\)。  
\( t \to 0 \) 时，极限 \(= \sqrt{4} + 2 = 2 + 2 = 4\)。



\[
\lim_{x \to \infty} \left( \frac{x - 1}{x + 1} \right)^{2x}
\]
令 \( t = \frac{1}{x} \)，则 \( x = \frac{1}{t} \)，  
原式 =  
\[
\lim_{t \to 0} \left( \frac{\frac{1}{t} - 1}{\frac{1}{t} + 1} \right)^{\frac{2}{t}} = \lim_{t \to 0} \left( \frac{1 - t}{1 + t} \right)^{\frac{2}{t}}.
\]  
记 \( y = \left( \frac{1 - t}{1 + t} \right)^{\frac{2}{t}} \)，取对数：  
\[
\ln y = \frac{2}{t} \ln\left( \frac{1 - t}{1 + t} \right).
\]  
对 \(\ln\left( \frac{1 - t}{1 + t} \right)\) 在 \(t=0\) 展开：  
\[
\frac{1 - t}{1 + t} = 1 - 2t + O(t^2), \quad \ln(1 - 2t + O(t^2)) = -2t + O(t^2).
\]  
所以  
\[
\ln y = \frac{2}{t} \big( -2t + O(t^2) \big) = -4 + O(t) \to -4.
\]  
因此极限 \( y \to e^{-4} \)。

---

## **5. 前置三角函数知识，复习并梳理**
常用结论：  
- \(\sin x \sim x\)，\(\tan x \sim x\)，\(1 - \cos x \sim \frac{x^2}{2}\)。  
- \(\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta\)。  
- \(\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta\)。  
- \(\sin^2 x + \cos^2 x = 1\)，导数：\( (\sin x)' = \cos x\)，\( (\cos x)' = -\sin x\)。  
- \(\sin x = x - \frac{x^3}{6} + o(x^4)\)，\(\cos x = 1 - \frac{x^2}{2} + \frac{x^4}{24} + o(x^4)\)。  
- \(\arcsin x \sim x\)，\(\arctan x \sim x\)。

---

## **6. 关于连续性讨论（极限）**
连续性与极限的关系：  
函数 \(f(x)\) 在 \(x_0\) 连续 ⇔ \(\lim_{x \to x_0} f(x) = f(x_0)\)。  
讨论连续性步骤：  
1. 看 \(f(x_0)\) 是否有定义；  
2. 求 \(\lim_{x \to x_0} f(x)\)，包括左右极限（尤其是分段点）；  
3. 比较极限与函数值
