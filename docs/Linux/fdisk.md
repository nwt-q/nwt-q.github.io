# Linux文件储存系统

关于储存系统底层原理： [【底层原理】彻底理解Linux文件系统 - 知乎](https://zhuanlan.zhihu.com/p/632638835)

## **完整的新硬盘挂载流程**

### **步骤1：确认硬盘被系统识别**
```bash
# 查看所有块设备，确认 /dev/sdb 存在
lsblk
# 或
sudo fdisk -l

# 应该能看到类似输出：
# Disk /dev/sdb: 1.8T, 2000398934016 bytes ...
```

### **步骤2：查看硬盘当前状态**
```bash
# 查看硬盘是否有现有分区
sudo fdisk -l /dev/sdb

# 如果是全新的硬盘，会显示：
# Disklabel type: dos
# 或者完全没有任何分区信息
```

---

## **情况一：硬盘是全新的，需要分区和格式化**

### **步骤A：创建分区**
```bash
# 进入 fdisk 分区工具
sudo fdisk /dev/sdb
```

#### **fdisk 交互操作：**
```text
命令(输入 m 获取帮助): n    # 创建新分区
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
选择 (默认 p): p             # 选择主分区
分区号 (1-4, 默认 1): 1      # 分区号
第一个扇区 (2048-xxxxxxx, 默认 2048): [回车]  # 使用默认起始扇区
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-xxxxxxx, 默认 xxxxxxx): [回车]  # 使用全部空间

命令(输入 m 获取帮助): p    # 查看分区表确认
命令(输入 m 获取帮助): w    # 写入分区表并退出
```

### **步骤B：创建文件系统（格式化）**
```bash
# 创建 ext4 文件系统（最常用）
sudo mkfs.ext4 /dev/sdb1

# 或者创建 xfs 文件系统（适合大文件）
sudo mkfs.xfs /dev/sdb1

# 显示格式化信息
sudo blkid /dev/sdb1
```

---

## **情况二：硬盘已有分区，只需挂载**

### **查看现有分区**
```bash
# 查看硬盘分区情况
lsblk /dev/sdb
sudo fdisk -l /dev/sdb

# 查看分区文件系统类型
sudo blkid | grep sdb
```

---

## **步骤3：创建挂载点**
```bash
# 创建挂载目录（通常放在 /mnt 或根目录下）
sudo mkdir /mnt/newdisk
# 或者
sudo mkdir /data
```

## **步骤4：临时挂载（重启后失效）**
```bash
# 挂载分区
sudo mount /dev/sdb1 /mnt/newdisk

# 查看是否挂载成功
df -h | grep sdb1
mount | grep sdb1
lsblk /dev/sdb1
```

## **步骤5：设置开机自动挂载**

### **方法A：使用 UUID（推荐）**
```bash
# 1. 获取分区的 UUID
sudo blkid /dev/sdb1
# 输出示例：/dev/sdb1: UUID="a1b2c3d4-e5f6-7890" TYPE="ext4"

# 2. 备份 fstab 文件
sudo cp /etc/fstab /etc/fstab.backup

# 3. 编辑 fstab 文件
sudo nano /etc/fstab
# 或
sudo vi /etc/fstab
```

#### **在 /etc/fstab 中添加一行：**
```text
# 格式：UUID=<UUID> <挂载点> <文件系统类型> <挂载选项> <dump> <fsck>
UUID=a1b2c3d4-e5f6-7890 /mnt/newdisk ext4 defaults 0 2
```

### **方法B：使用设备名（不推荐，可能变化）**
```text
/dev/sdb1 /mnt/newdisk ext4 defaults 0 2
```

### **方法C：使用 LABEL（标签）**
```bash
# 首先给分区设置标签
sudo e2label /dev/sdb1 NEWDISK  # 对于 ext4
# 或
sudo xfs_admin -L NEWDISK /dev/sdb1  # 对于 xfs

# 然后在 fstab 中使用：
LABEL=NEWDISK /mnt/newdisk ext4 defaults 0 2
```

## **步骤6：测试自动挂载配置**
```bash
# 测试 fstab 配置是否正确
sudo mount -a

# 检查是否挂载成功
df -h | grep newdisk
```

## **步骤7：设置权限（可选）**
```bash
# 修改挂载点目录权限
sudo chmod 755 /mnt/newdisk

# 或者更改所有者为当前用户
sudo chown -R $USER:$USER /mnt/newdisk
```

## **验证挂载状态**

```bash
# 验证方法1：查看挂载
df -hT | grep /dev/sdb1

# 验证方法2：查看磁盘使用情况
lsblk -f /dev/sdb

# 验证方法3：测试读写权限
echo "test" | sudo tee /mnt/newdisk/test.txt
sudo cat /mnt/newdisk/test.txt
sudo rm /mnt/newdisk/test.txt
```

---

## **故障排除**

### **问题1：mount: wrong fs type, bad option...**
```bash
# 可能是文件系统类型错误
sudo mount -t ext4 /dev/sdb1 /mnt/newdisk
# 或重新格式化
sudo mkfs.ext4 /dev/sdb1
```

### **问题2：mount: /mnt/newdisk already mounted**
```bash
# 先卸载
sudo umount /mnt/newdisk
# 再重新挂载
sudo mount /dev/sdb1 /mnt/newdisk
```

### **问题3：权限不足**
```bash
# 检查权限
ls -ld /mnt/newdisk
# 更改权限
sudo chmod 777 /mnt/newdisk  # 宽松权限
# 或
sudo chown -R $USER:$USER /mnt/newdisk
```

---

## **重要提示**
1. **数据安全**：操作前备份重要数据
2. **确认设备**：确保操作的是正确的硬盘（/dev/sdb）
3. **使用 UUID**：在 fstab 中使用 UUID 而不是设备名，避免设备名变化导致无法挂载
4. **测试**：配置完 fstab 后务必使用 `sudo mount -a` 测试
5. **查看日志**：有问题时查看系统日志 `sudo dmesg | tail -50`

按照这个流程，你应该能成功将新硬盘挂载到系统上。





::: tip 问题
磁盘创建的原理是什么，比如原先是在~下创建目录这个目录默认挂载到/dev/sda中， 受用mount后是否是挂载到对应的磁盘分区，这样这个文件夹就是使用该设备的储存空间？如果这个设备的储存空间满了是否文件也储存不下？
:::



非常好的问题！你理解的方向是正确的，让我详细解释一下这个原理：

## **一、目录挂载的基本原理**

### **1. 默认情况：所有目录都在根文件系统**
```bash
# 查看当前目录所在的分区
df -h ~
# 输出示例：
文件系统        容量  已用  可用 已用% 挂载点
/dev/sda2       100G   30G   65G   32% /  # 你的家目录实际在根分区
```

默认情况下，你在 `~`（家目录）下创建的任何目录和文件都存储在你**根分区所在的那个物理磁盘**（比如 `/dev/sda2`）上。

### **2. 挂载新分区后的变化**
```bash
# 假设你有一个新分区 /dev/sdb1
sudo mkdir /mnt/newdisk
sudo mount /dev/sdb1 /mnt/newdisk

# 现在 /mnt/newdisk 目录下的所有文件都存储在 /dev/sdb1 分区上
```

---

## **二、挂载的物理意义**

### **图解理解：**
```
物理磁盘布局：
/dev/sda (500GB)
├─ /dev/sda1  100GB  [挂载到 /]
├─ /dev/sda2  200GB  [挂载到 /home]
└─ /dev/sda3  200GB  [未挂载]

/dev/sdb (1TB)
└─ /dev/sdb1  1TB    [挂载到 /data]

# 挂载后的文件系统树：
/
├── home/          # 实际存储在 /dev/sda2
│   └── user/
│       └── Documents/  # 存储在 /dev/sda2
├── data/          # 实际存储在 /dev/sdb1
│   ├── project1/  # 存储在 /dev/sdb1
│   └── backup/    # 存储在 /dev/sdb1
└── var/           # 实际存储在 /dev/sda1
```

### **关键点：**
- **挂载点是一个"入口"**：目录本身不占空间，它只是一个访问点
- **数据存储在对应的分区**：文件实际写入到挂载的分区所在的物理磁盘
- **覆盖原内容**：如果目录已有内容，挂载后原内容会被"遮盖"，卸载后恢复

---

## **三、你的问题详细解答**

### **问题1：`mount` 后文件夹是否使用该设备的储存空间？**

**是的，完全正确！**

```bash
# 实验验证：
# 1. 创建一个测试目录
mkdir ~/test_normal
echo "test" > ~/test_normal/file1.txt

# 2. 查看它在哪个分区
df -h ~/test_normal/file1.txt
# 输出：/dev/sda2 ... /home

# 3. 挂载新分区到这个目录
sudo mount /dev/sdb1 ~/test_normal

# 4. 现在在这个目录创建文件
echo "new test" > ~/test_normal/file2.txt

# 5. 再次查看文件位置
df -h ~/test_normal/file2.txt
# 输出：/dev/sdb1 ... /home/user/test_normal
```

**重要现象：**
- 原来的 `file1.txt` 被"隐藏"了（实际上还在 `/dev/sda2` 上）
- 新创建的 `file2.txt` 存储在 `/dev/sdb1` 上
- 卸载后：`file1.txt` 重新可见，`file2.txt` 暂时不可见

---

## **四、存储空间满的情况**

### **问题2：如果设备的储存空间满了，文件是否也储存不下？**

**是的！每个分区独立管理自己的空间。**

### **示例场景：**
```bash
# 假设：
# /dev/sda2 有 50GB，挂载到 /home
# /dev/sdb1 有 100GB，挂载到 /data

# 情况1：/home 分区满
cd ~
fallocate -l 49G bigfile1.img  # 成功
fallocate -l 2G bigfile2.img   # 失败！空间不足
# 错误：No space left on device

# 情况2：/data 分区空
cd /data
fallocate -l 80G bigfile3.img  # 成功，因为 /data 在另一个分区
```

### **查看各分区使用情况：**
```bash
# 查看所有分区的使用情况
df -h

# 输出示例：
文件系统        容量  已用  可用 已用% 挂载点
/dev/sda1        20G   18G  1.5G   93% /
/dev/sda2       100G   95G     0  100% /home    # 满了！
/dev/sdb1       500G  120G  380G   24% /data    # 还有很多空间
```

---

## **五、空间管理的实际影响**

### **1. 跨分区操作的影响**
```bash
# 从 /home 复制文件到 /data
cp ~/largefile.zip /data/
# 这个操作：
# 1. 读取 /dev/sda2 上的数据
# 2. 写入 /dev/sdb1 上的空间
# 3. 不占用 /home 的额外空间
```

### **2. 符号链接跨分区**
```bash
# 创建符号链接（不占用目标分区空间）
ln -s /data/project ~/project_link

# 通过链接访问文件，实际存储在 /data 分区
ls ~/project_link/file.txt  # 文件在 /dev/sdb1 上
```

### **3. 绑定挂载（Bind Mount）**
```bash
# 将 /data 的一个子目录"映射"到 /home
mkdir ~/my_data
sudo mount --bind /data/projects ~/my_data

# 现在 ~/my_data 中的文件实际存储在 /dev/sdb1
# 但通过家目录访问
```

---

## **六、空间满的后果和解决方法**

### **当分区空间满时：**

#### **现象：**
1. **无法创建新文件**
2. **某些程序崩溃**
3. **系统日志报错**
4. **可能无法登录（如果 /home 或 / 满）**

#### **紧急处理方法：**
```bash
# 1. 找到哪个分区满了
df -h

# 2. 清理空间（示例清理 /home）
# 查找大文件
du -sh ~/* | sort -rh | head -10

# 3. 临时清理
# 清空回收站
rm -rf ~/.local/share/Trash/*
# 删除日志文件
sudo journalctl --vacuum-size=100M
# 清理包缓存
sudo apt clean

# 4. 如果 / 分区满，可能无法执行命令
# 需要从救援模式或Live CD启动
```

#### **长期解决方案：**
```bash
# 1. 扩展分区（如果有未分配空间）
sudo lvextend -L +50G /dev/sda2
sudo resize2fs /dev/sda2

# 2. 添加新磁盘并迁移数据
sudo mkdir /newhome
sudo mount /dev/sdb1 /newhome
sudo rsync -av /home/ /newhome/
# 更新 /etc/fstab，将 /dev/sdb1 挂载到 /home
```

---

## **七、实验验证**

### **创建一个直观的实验：**
```bash
#!/bin/bash
# 实验：理解挂载和空间分配

echo "=== 实验开始 ==="

# 1. 创建两个测试目录
mkdir -p ~/test_dir1 ~/test_dir2

# 2. 查看默认位置
echo "默认位置："
df -h ~/test_dir1
df -h ~/test_dir2

# 3. 创建测试文件
echo "创建测试文件..."
dd if=/dev/zero of=~/test_dir1/file1 bs=1M count=10 2>/dev/null
dd if=/dev/zero of=~/test_dir2/file2 bs=1M count=10 2>/dev/null

# 4. 假设有额外分区 /dev/sdb1，挂载其中一个目录
# sudo mount /dev/sdb1 ~/test_dir2

# 5. 比较空间使用
echo -e "\n空间使用变化："
echo "test_dir1 所在分区："
df -h ~/test_dir1 | tail -1
echo "test_dir2 所在分区："
df -h ~/test_dir2 | tail -1

# 6. 创建大文件测试
echo -e "\n尝试填满空间："
# 这个文件会写入 test_dir1 所在的分区
dd if=/dev/zero of=~/test_dir1/fill_space bs=1M 2>/dev/null &
sleep 2
kill $! 2>/dev/null

echo "=== 实验结束 ==="
```

---

## **八、实际应用场景**

### **场景1：Web服务器**
```bash
# /var/www 目录挂载到大容量磁盘
/dev/sda1  50G  /      # 系统
/dev/sda2  10G  /home  # 用户
/dev/sdb1  1TB  /var/www  # 网站数据

# 这样网站上传的文件不会影响系统运行
```

### **场景2：数据库服务器**
```bash
# 数据库数据目录单独挂载
/dev/sda1  50G  /          # 系统
/dev/sdb1  500G /var/lib/mysql  # 数据库数据
/dev/sdc1  500G /backup    # 备份

# 数据库写满不会导致系统崩溃
```

### **场景3：开发环境**
```bash
# 项目代码放在单独分区
/dev/sda1  100G  /      # 系统和家目录
/dev/sdb1  500G  /projects  # 所有项目代码

# 可以单独备份、快照项目分区
```

---

## **总结回答你的问题：**

### **Q1：`mount` 后文件夹是否使用该设备的储存空间？**
**是的**。`mount` 将一个分区"连接"到一个目录，该目录下所有的文件操作都发生在对应的分区上，使用的是该分区的物理存储空间。

### **Q2：如果该设备的储存空间满了，文件是否也储存不下？**
**是的**。每个分区有独立的存储空间配额。当一个分区满了：
1. 无法在该分区的任何目录下创建新文件
2. 不影响其他分区的使用
3. 即使根分区满，挂载的其他分区可能还有空间

### **关键理解点：**
1. **目录是访问点**，不是存储容器
2. **数据实际存储在物理分区**上
3. **每个分区独立管理自己的空间**
4. **挂载本质是"重定向"**文件访问路径

这就是为什么合理的分区设计对系统稳定性和数据管理如此重要！



优质文章： [主分区、扩展分区和逻辑分区的区别，系统分区、引导分区和启动分区的区别_主分区和扩展分区的区别-CSDN博客](https://blog.csdn.net/buzaikoulan/article/details/44405915)



::: tip 问题
如何对逻辑卷进行扩容？
:::



逻辑卷（LVM）扩容非常灵活！让我详细讲解完整的操作流程：

## **一、LVM 扩容的三种情况**

### **情况概览：**
1. **扩展逻辑卷（LV）** - 已有空闲空间
2. **扩展卷组（VG）** - 添加新物理卷
3. **扩展文件系统** - 扩展LV后的必要步骤

---

## **二、查看当前LVM状态**

### **1. 查看整体结构**
```bash
# 查看物理卷（PV）、卷组（VG）、逻辑卷（LV）
sudo pvs        # 物理卷状态
sudo vgs        # 卷组状态
sudo lvs        # 逻辑卷状态

# 或使用一个命令查看所有
sudo pvdisplay
sudo vgdisplay
sudo lvdisplay
```

### **2. 查看具体信息**
```bash
# 查看详细信息
sudo vgdisplay vg_data
sudo lvdisplay /dev/vg_data/lv_data

# 查看文件系统使用情况
df -hT
lsblk -f
```

### **3. 示例输出**
```bash
# sudo vgs 输出示例：
  VG      #PV #LV #SN Attr   VSize   VFree
  vg_data   1   1   0 wz--n- 100.00g 20.00g  # 还有20G空闲

# sudo lvs 输出示例：
  LV      VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_data vg_data -wi-ao---- 80.00g  # 当前80G，文件系统已用90%
```

---

## **三、情况1：卷组有空间，直接扩展逻辑卷**

### **场景**：VG中还有空闲空间
```bash
# 查看VG空闲空间
sudo vgs vg_data
# 输出：VFree: 20.00g
```

### **步骤1：扩展逻辑卷大小**
```bash
# 扩展逻辑卷（增加10G）
sudo lvextend -L +10G /dev/vg_data/lv_data

# 或扩展到指定大小
sudo lvextend -L 90G /dev/vg_data/lv_data  # 扩展到90G

# 使用所有剩余空间
sudo lvextend -l +100%FREE /dev/vg_data/lv_data
```

### **步骤2：扩展文件系统**
**根据文件系统类型选择相应命令：**

#### **对于 ext2/ext3/ext4：**
```bash
# 方法1：使用 resize2fs（推荐）
sudo resize2fs /dev/vg_data/lv_data

# 方法2：在扩展时一步完成
sudo lvextend -r -L +10G /dev/vg_data/lv_data  # -r 参数自动扩展文件系统
```

#### **对于 XFS：**
```bash
# XFS 必须在挂载状态下扩展
sudo xfs_growfs /mount/point

# 示例：
sudo xfs_growfs /data
# 或
sudo xfs_growfs /dev/vg_data/lv_data
```

#### **对于其他文件系统：**
```bash
# btrfs
sudo btrfs filesystem resize +10G /mount/point
# 或
sudo btrfs filesystem resize max /mount/point

# NTFS（需要安装 ntfs-3g）
sudo ntfsresize --size +10G /dev/vg_data/lv_data
```

---

## **四、情况2：卷组空间不足，需要添加新物理卷**

### **场景**：VG空间已满，需要添加新磁盘

### **步骤1：准备新磁盘/分区**
```bash
# 查看新磁盘
sudo fdisk -l

# 对新磁盘分区（可选）
sudo fdisk /dev/sdb
# 创建Linux LVM分区（类型 8e）

# 或直接使用整个磁盘
```

### **步骤2：创建物理卷**
```bash
# 在新磁盘或分区上创建物理卷
sudo pvcreate /dev/sdb
# 或
sudo pvcreate /dev/sdb1

# 验证
sudo pvs
```

### **步骤3：扩展卷组**
```bash
# 将物理卷添加到现有卷组
sudo vgextend vg_data /dev/sdb

# 验证VG现在有更多空间
sudo vgs vg_data
```

### **步骤4：扩展逻辑卷（同情况1）**
```bash
# 现在VG有了新空间，扩展LV
sudo lvextend -L +50G /dev/vg_data/lv_data

# 扩展文件系统
sudo resize2fs /dev/vg_data/lv_data
```

---

## **五、情况3：缩小逻辑卷（危险操作）**

### **警告**：缩小文件系统有数据丢失风险！

### **步骤1：备份数据**
```bash
# 必须备份！
sudo cp -r /data /data_backup
# 或使用 rsync
sudo rsync -av /data/ /backup/data/
```

### **步骤2：检查文件系统**
```bash
# 对于 ext4
sudo e2fsck -f /dev/vg_data/lv_data

# 对于 XFS（XFS不支持在线缩小）
# 需要备份 → 卸载 → 重新创建
```

### **步骤3：缩小文件系统**
```bash
# ext2/3/4：先缩小文件系统
sudo resize2fs /dev/vg_data/lv_data 70G  # 缩小到70G
```

### **步骤4：缩小逻辑卷**
```bash
# 然后缩小逻辑卷
sudo lvreduce -L 70G /dev/vg_data/lv_data

# 或交互式缩小
sudo lvreduce -L -10G /dev/vg_data/lv_data  # 减小10G
```

---

## **六、完整扩容示例**

### **示例1：完整扩容流程**
```bash
#!/bin/bash
# LVM 扩容完整示例

VG_NAME="vg_data"
LV_NAME="lv_data"
LV_PATH="/dev/${VG_NAME}/${LV_NAME}"
MOUNT_POINT="/data"
NEW_DISK="/dev/sdb"

echo "=== 开始LVM扩容 ==="

# 1. 检查当前状态
echo "1. 当前状态："
sudo vgs $VG_NAME
sudo lvs $VG_NAME
df -h $MOUNT_POINT

# 2. 如果VG有空间
if sudo vgs $VG_NAME | tail -1 | awk '{print $7}' | grep -q "[0-9]"; then
    echo "2. VG有可用空间，直接扩展LV"
    # 扩展逻辑卷（增加20G）
    sudo lvextend -L +20G $LV_PATH
    
    # 扩展文件系统（假设是ext4）
    sudo resize2fs $LV_PATH
else
    echo "2. VG空间不足，添加新磁盘"
    # 创建物理卷
    sudo pvcreate $NEW_DISK
    
    # 扩展卷组
    sudo vgextend $VG_NAME $NEW_DISK
    
    # 扩展逻辑卷
    sudo lvextend -l +100%FREE $LV_PATH
    
    # 扩展文件系统
    sudo resize2fs $LV_PATH
fi

# 3. 验证
echo "3. 扩容后状态："
df -h $MOUNT_POINT
sudo lvs $VG_NAME
```

### **示例2：在线扩容（生产环境）**
```bash
# 生产环境安全扩容脚本
#!/bin/bash

set -e  # 遇到错误立即退出

VG="vg_app"
LV="lv_appdata"
MOUNT="/appdata"
SIZE="+50G"

echo "开始在线扩容..."

# 1. 检查是否挂载
if ! mount | grep -q "$MOUNT"; then
    echo "错误: $MOUNT 未挂载"
    exit 1
fi

# 2. 检查VG空间
FREE_SPACE=$(sudo vgs $VG --units g --noheadings -o vg_free | sed 's/[^0-9.]//g')
if (( $(echo "$FREE_SPACE < 50" | bc -l) )); then
    echo "错误: VG空间不足，需要添加磁盘"
    exit 1
fi

# 3. 扩展逻辑卷（不中断服务）
sudo lvextend -r -L $SIZE /dev/$VG/$LV

# 4. 验证
echo "扩容完成！当前使用情况："
df -h $MOUNT

# 5. 记录日志
logger "LVM扩容: $LV 增加了 $SIZE"
```

---

## **七、文件系统特定的扩容方法**

### **1. ext4 文件系统**
```bash
# 一步完成（推荐）
sudo lvextend -r -L +10G /dev/vg_data/lv_data

# 或分两步
sudo lvextend -L +10G /dev/vg_data/lv_data
sudo resize2fs /dev/vg_data/lv_data

# 检查文件系统
sudo e2fsck -f /dev/vg_data/lv_data
```

### **2. XFS 文件系统**
```bash
# XFS 只能在挂载状态下扩容
sudo lvextend -L +10G /dev/vg_data/lv_data
sudo xfs_growfs /data

# 查看XFS信息
sudo xfs_info /data
```

### **3. btrfs 文件系统**
```bash
# btrfs 支持在线扩容
sudo lvextend -L +10G /dev/vg_data/lv_data
sudo btrfs filesystem resize +10G /data
# 或使用全部空间
sudo btrfs filesystem resize max /data
```

### **4. swap 空间**
```bash
# 如果是swap分区
sudo swapoff /dev/vg_data/lv_swap
sudo lvextend -L +4G /dev/vg_data/lv_swap
sudo mkswap /dev/vg_data/lv_swap
sudo swapon /dev/vg_data/lv_swap
```

---

## **八、高级扩容技巧**

### **1. 使用特定PE数量扩展**
```bash
# 查看PE大小
sudo vgdisplay vg_data | grep "PE Size"

# 使用PE数量扩展（每个PE通常4M）
sudo lvextend -l +256 /dev/vg_data/lv_data  # 扩展256个PE
```

### **2. 扩展到指定百分比**
```bash
# 扩展LV到VG的80%
sudo lvextend -l 80%VG /dev/vg_data/lv_data

# 扩展LV到剩余空间的50%
sudo lvextend -l +50%FREE /dev/vg_data/lv_data
```

### **3. 在线迁移数据（pvmove）**
```bash
# 如果要从旧磁盘迁移到新磁盘
# 添加新磁盘到VG
sudo pvcreate /dev/sdc
sudo vgextend vg_data /dev/sdc

# 将数据从旧磁盘迁移到新磁盘
sudo pvmove /dev/sdb /dev/sdc

# 移除旧磁盘
sudo vgreduce vg_data /dev/sdb
sudo pvremove /dev/sdb
```

---

## **九、故障排除**

### **问题1：resize2fs 失败**
```bash
# 先检查文件系统
sudo e2fsck -f /dev/vg_data/lv_data

# 强制resize
sudo resize2fs -f /dev/vg_data/lv_data
```

### **问题2：XFS无法扩展**
```bash
# 确保文件系统已挂载
mount | grep /data

# 确保有足够的空间
sudo vgs vg_data

# 对于已卸载的XFS，需要挂载后才能扩展
sudo mount /dev/vg_data/lv_data /data
sudo xfs_growfs /data
```

### **问题3：LV正在使用，无法扩展**
```bash
# 检查谁在使用
sudo lsof /data
sudo fuser -m /data

# 如果是数据库，可能需要特殊处理
# MySQL: SET GLOBAL innodb_fast_shutdown=0; 然后重启
```

---

## **十、自动化扩容脚本**

```bash
#!/bin/bash
# 自动化LVM扩容监控和扩展

VG_NAME="vg_data"
LV_NAME="lv_data"
THRESHOLD=80  # 使用率阈值（%）
EXPAND_SIZE="+10G"  # 每次扩展大小

# 获取使用率
USAGE=$(df -h /dev/mapper/${VG_NAME}-${LV_NAME} | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $USAGE -gt $THRESHOLD ]; then
    echo "$(date): 使用率 ${USAGE}% > ${THRESHOLD}%，开始自动扩容"
    
    # 检查VG空间
    VG_FREE=$(sudo vgs $VG_NAME --units g --noheadings -o vg_free | sed 's/[^0-9.]//g')
    
    if (( $(echo "$VG_FREE > 10" | bc -l) )); then
        # 执行扩容
        sudo lvextend -r -L $EXPAND_SIZE /dev/$VG_NAME/$LV_NAME
        echo "$(date): 成功扩容 $EXPAND_SIZE"
        echo "新使用率: $(df -h /dev/mapper/${VG_NAME}-${LV_NAME} | tail -1 | awk '{print $5}')"
    else
        echo "$(date): 错误：VG空间不足，需要添加新磁盘"
        # 发送警报
        echo "VG空间不足，请管理员处理" | mail -s "LVM空间警报" admin@example.com
    fi
fi
```

---

## **十一、最佳实践**

### **1. 操作前检查清单**
```bash
✓ 备份重要数据
✓ 检查VG可用空间：sudo vgs
✓ 检查文件系统类型：lsblk -f
✓ 确认挂载状态：mount | grep <挂载点>
✓ 检查是否有进程占用：lsof <挂载点>
```

### **2. 推荐的扩容顺序**
```markdown
1. **计划阶段**
   - 评估需求：需要多少空间？
   - 检查当前状态：df -h, vgs, lvs
   - 选择扩展方案

2. **准备阶段**
   - 备份数据
   - 通知用户（如果是生产环境）
   - 选择维护窗口

3. **执行阶段**
   - 添加新磁盘（如果需要）
   - 扩展卷组
   - 扩展逻辑卷
   - 扩展文件系统

4. **验证阶段**
   - 检查文件系统：df -h, lsblk
   - 测试读写功能
   - 监控系统稳定性
```

### **3. 监控命令**
```bash
# 实时监控
watch -n 1 'df -h; echo; sudo vgs; echo; sudo lvs'

# 详细监控
while true; do
    clear
    echo "=== 时间: $(date) ==="
    df -h
    echo ""
    sudo vgs
    echo ""
    sudo lvs
    sleep 5
done
```

---

## **总结**

### **核心命令总结：**
```bash
# 扩展逻辑卷
sudo lvextend -L +10G /dev/vg/lv_name

# 扩展卷组
sudo vgextend vg_name /dev/sdb

# 扩展文件系统
sudo resize2fs /dev/vg/lv_name        # ext2/3/4
sudo xfs_growfs /mount/point          # XFS

# 一步完成（推荐）
sudo lvextend -r -L +10G /dev/vg/lv_name
```

### **关键点：**
1. **顺序很重要**：PV → VG → LV → 文件系统
2. **文件系统类型决定命令**：ext4用resize2fs，XFS用xfs_growfs
3. **-r 参数**：lvextend 的 -r 选项可以自动扩展文件系统
4. **在线扩容**：大多数文件系统支持在线扩容，无需卸载
5. **监控**：定期监控使用率，提前规划扩容

### **最简单的一行命令：**
```bash
# 如果VG有空间，这是最常用的扩容命令：
sudo lvextend -r -L +10G /dev/vg_data/lv_data
```

这样你的逻辑卷和文件系统就同时扩展完成了！



::: tip 问题
我现在有一个问题，比如一个挂载点（磁盘）满了，后我再将这个目录的挂载到新的磁盘，我原先储存在这个磁盘的文件是否会跟着迁移还是在这个目录下看不大文件了？

:::

**这是一个非常常见且重要的问题！你的文件不会自动迁移，而是会被"隐藏"！**

让我详细解释这个过程：

## **一、挂载的基本原理回顾**

### **挂载的本质是"覆盖"：**
```bash
# 假设目录 /data 原来在 /dev/sda1 上
# 里面有文件：file1.txt, file2.txt

# 当你挂载新磁盘到 /data 时：
sudo mount /dev/sdb1 /data

# 现在：
# 1. 原 /data 下的 file1.txt, file2.txt 被"隐藏"
# 2. 你看到的是 /dev/sdb1 的内容（可能是空的）
# 3. 创建的新文件会存储在 /dev/sdb1 上
```

---

## **二、实际操作演示**

### **实验1：验证文件被隐藏**
```bash
# 1. 准备测试环境
mkdir -p /tmp/test_old
mkdir -p /tmp/test_mount

# 2. 在旧位置创建文件
echo "我是旧文件" > /tmp/test_old/old_file.txt
ls -la /tmp/test_old/

# 3. 挂载新位置（模拟新磁盘）
sudo mount --bind /tmp/test_mount /tmp/test_old

# 4. 查看现在的内容
ls -la /tmp/test_old/  # 空的！

# 5. 创建新文件
echo "我是新文件" > /tmp/test_old/new_file.txt

# 6. 卸载
sudo umount /tmp/test_old

# 7. 查看原内容
ls -la /tmp/test_old/  # old_file.txt 还在！new_file.txt 不见了！
```

---

## **三、你的场景详细分析**

### **场景：/data 目录满了，挂载新磁盘到 /data**

```bash
# 当前状态：
# /data 目录在 /dev/sda1 上，已满
# 里面有重要数据：database/, backups/, user_files/

# 你的操作：
sudo umount /data  # 先卸载（如果已挂载）
# 或直接
sudo mount /dev/sdb1 /data  # 挂载新磁盘

# 结果：
# 1. /data 现在是空的（显示新磁盘的内容）
# 2. 你的所有旧文件都在 /dev/sda1 上，但无法通过 /data 访问
# 3. 新文件存储在 /dev/sdb1 上
```

---

## **四、正确迁移数据的步骤**

### **方法1：先迁移数据，再挂载（推荐）**

```bash
# 步骤1：挂载新磁盘到临时位置
sudo mkdir /mnt/newdisk
sudo mount /dev/sdb1 /mnt/newdisk

# 步骤2：复制/移动数据
sudo rsync -av --progress /data/ /mnt/newdisk/
# 或使用更安全的 tar
cd /data && sudo tar cf - . | (cd /mnt/newdisk && sudo tar xf -)

# 步骤3：验证数据完整性
sudo diff -r /data /mnt/newdisk | head -20
sudo du -sh /data /mnt/newdisk

# 步骤4：卸载旧磁盘，挂载新磁盘到正确位置
sudo umount /data  # 如果 /data 当前已挂载
sudo umount /mnt/newdisk
sudo mount /dev/sdb1 /data

# 步骤5：验证
ls -la /data/  # 应该看到你的所有文件
df -h /data    # 应该显示新磁盘的空间
```

### **方法2：使用 bind mount 逐步迁移**

```bash
# 步骤1：挂载新磁盘到子目录
sudo mount /dev/sdb1 /data/newspace

# 步骤2：移动部分数据到新位置
sudo mv /data/large_files/* /data/newspace/

# 步骤3：创建符号链接（如果需要保持路径）
sudo ln -sf /data/newspace/large_file.zip /data/large_file.zip

# 步骤4：最终迁移（当旧磁盘有空闲时）
sudo rsync -av /data/ /data/newspace/ --exclude="newspace"
```

---

## **五、更安全的自动化迁移脚本**

```bash
#!/bin/bash
# 安全迁移脚本

OLD_MOUNT="/data"
NEW_DISK="/dev/sdb1"
TEMP_MOUNT="/mnt/temp_new"
LOG_FILE="/var/log/data_migration.log"

echo "=== 开始数据迁移 $(date) ===" | tee -a $LOG_FILE

# 1. 检查旧挂载点
if ! mountpoint -q "$OLD_MOUNT"; then
    echo "错误: $OLD_MOUNT 未挂载" | tee -a $LOG_FILE
    exit 1
fi

# 2. 检查新磁盘
if [ ! -b "$NEW_DISK" ]; then
    echo "错误: 新磁盘 $NEW_DISK 不存在" | tee -a $LOG_FILE
    exit 1
fi

# 3. 创建临时挂载点
sudo mkdir -p "$TEMP_MOUNT"
sudo mount "$NEW_DISK" "$TEMP_MOUNT"

# 4. 记录原始信息
OLD_USAGE=$(df -h "$OLD_MOUNT" | tail -1)
echo "原磁盘使用情况: $OLD_USAGE" | tee -a $LOG_FILE

# 5. 数据迁移（使用rsync，可恢复）
echo "开始数据迁移..." | tee -a $LOG_FILE
sudo rsync -av --progress --stats \
    --log-file="$LOG_FILE" \
    "$OLD_MOUNT/" "$TEMP_MOUNT/"

# 6. 验证数据
echo "验证数据完整性..." | tee -a $LOG_FILE
sudo diff -r "$OLD_MOUNT" "$TEMP_MOUNT" > /tmp/migration_diff.txt 2>&1
DIFF_SIZE=$(wc -l < /tmp/migration_diff.txt)

if [ "$DIFF_SIZE" -gt 0 ]; then
    echo "警告: 发现 $DIFF_SIZE 处差异" | tee -a $LOG_FILE
    echo "查看 /tmp/migration_diff.txt 了解详情"
fi

# 7. 切换挂载
echo "切换挂载点..." | tee -a $LOG_FILE
sudo umount "$OLD_MOUNT"
sudo umount "$TEMP_MOUNT"
sudo mount "$NEW_DISK" "$OLD_MOUNT"

# 8. 验证
echo "迁移完成验证:" | tee -a $LOG_FILE
ls -la "$OLD_MOUNT/" | head -5
df -h "$OLD_MOUNT"

echo "=== 迁移完成 $(date) ===" | tee -a $LOG_FILE
```

---

## **六、LVM的特殊情况（更容易）**

### **如果你使用LVM，迁移更简单：**
```bash
# 1. 将新磁盘加入卷组
sudo pvcreate /dev/sdb
sudo vgextend vg_data /dev/sdb

# 2. 将数据迁移到新磁盘
sudo pvmove /dev/sda1 /dev/sdb

# 3. 从卷组移除旧磁盘
sudo vgreduce vg_data /dev/sda1

# 整个过程在线完成，无需移动文件！
```

---

## **七、常见错误和后果**

### **错误1：直接挂载，丢失文件访问**
```bash
# 错误做法：
sudo mount /dev/sdb1 /data  # 直接挂载

# 结果：
# - 旧文件被隐藏
# - 用户无法访问旧数据
# - 如果写入新数据，旧磁盘空间未释放
```

### **错误2：先删除旧数据**
```bash
# 危险做法：
sudo rm -rf /data/*  # 删除所有数据！
sudo mount /dev/sdb1 /data

# 结果：
# - 数据永久丢失！
# - 无法恢复！
```

### **错误3：忘记修改 /etc/fstab**
```bash
# 迁移后重启，系统可能：
# 1. 自动挂载旧磁盘到 /data
# 2. 或无法挂载 /data
# 3. 导致系统无法启动

# 必须更新 /etc/fstab！
sudo vim /etc/fstab
# 将 /dev/sda1 改为 /dev/sdb1 或使用 UUID
```

---

## **八、特殊情况处理**

### **情况1：无法卸载旧磁盘（有进程在使用）**
```bash
# 查找使用 /data 的进程
sudo lsof /data
sudo fuser -m /data

# 强制结束或通知用户
sudo fuser -k /data  # 强制结束进程（危险！）

# 或使用延迟卸载
sudo umount -l /data
```

### **情况2：需要保持服务运行**
```bash
# 使用 overlayfs 透明迁移
sudo mount -t overlay overlay -o \
lowerdir=/data,upperdir=/mnt/newdisk,workdir=/mnt/work \
/mnt/merged

# 然后逐步迁移
```

### **情况3：磁盘完全满，无法创建临时文件**
```bash
# 先清理一些空间
sudo find /data -name "*.log" -size +100M -delete
sudo journalctl --vacuum-size=100M

# 或使用网络传输
# 在另一台机器上：
nc -l 9999 | tar xf -

# 在本机：
cd /data && tar cf - . | nc <另一台IP> 9999
```

---

## **九、验证迁移成功**

```bash
# 1. 验证挂载点
df -h /data
mount | grep /data

# 2. 验证文件存在
ls -la /data/ | head -10
find /data -name "important_file" -type f

# 3. 验证文件完整性
# 创建校验和
cd /data && sudo find . -type f -exec md5sum {} \; > /tmp/checksums.txt

# 4. 测试读写
echo "test" > /data/test_write.txt
cat /data/test_write.txt
rm /data/test_write.txt

# 5. 验证服务
# 重启相关服务，确保正常工作
sudo systemctl restart nginx  # 如果是Web目录
sudo systemctl restart mysql  # 如果是数据库
```

---

## **十、完整的安全迁移流程**

### **推荐的工作流程：**

```markdown
1. **准备阶段**
   - 备份重要数据（即使要迁移也要备份！）
   - 通知用户维护时间
   - 准备新磁盘并测试

2. **预迁移检查**
   - 检查旧磁盘：`df -h /data`
   - 检查文件系统：`lsblk -f`
   - 记录UUID：`sudo blkid`

3. **数据迁移**
   - 挂载新磁盘到临时位置
   - 使用 rsync/tar 复制数据
   - 验证数据完整性

4. **切换阶段**
   - 停止相关服务
   - 卸载旧磁盘
   - 挂载新磁盘到目标位置
   - 更新 /etc/fstab

5. **验证阶段**
   - 测试文件访问
   - 启动服务测试
   - 监控系统日志

6. **清理阶段**
   - 安全擦除旧磁盘（可选）
   - 更新文档
   - 监控几天确保稳定
```

---

## **总结回答你的问题：**

### **Q：挂载新磁盘到已满的目录，旧文件会怎样？**
**A：旧文件会被"隐藏"，不会自动迁移！**

### **正确做法：**
1. **先挂载新磁盘到临时位置**
2. **复制数据到新磁盘**
3. **卸载旧磁盘**
4. **挂载新磁盘到目标位置**

### **一行式迁移命令（小心使用）：**
```bash
# 快速迁移（假设新磁盘已挂载在 /mnt/new）
sudo rsync -av --delete /data/ /mnt/new/ && \
sudo umount /data && \
sudo mount /dev/sdb1 /data
```

### **最重要的原则：**
**永远不要在数据迁移前直接挂载新磁盘到目标目录！** 这会立即隐藏所有旧数据，可能导致严重的数据访问问题。