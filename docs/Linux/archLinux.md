# ArchLinux安装教程

下载完镜像并且安装后开始系统分区，先使用下列命令对系统进行分区

```bash
lsblk -p
```

gpt dos sgi sun 分别是什么 ?



```bash
timedatectl set-ntp true
lsblk -pf
```

根据Arch Wiki 需要 3 个分区

```bash
/
/boot 启动分区
/swap 交换分区
```

```bash
cfdisk /dev/sda
mkfs.fat -F 32 /dev/sda1
mkfs.btrfs /dev/sda2
```



创建根分区的子卷

```bash
mount -t btrfs -o compress=zstd /dev/sda2 /mnt
```

创建子卷 其中`@` 为根目录

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@swap
```

取消挂载

```bash
umount /mnt
```



正式挂载

```bash
mount -t btrfs -o subvol=/@,compress=zstd /dev/sda2 /mnt
mount --mkdir -t btrfs -o subvol=/@home,compress=zstd /dev/sda2 /mnt/home
mount --mkdir -t btrfs -o subvol=/@swap,compress=zstd /dev/sda2 /mnt/swap
mount --mkdir  /dev/sda1 /mnt/boot
mount --mkdir /dev/(外部磁盘) /mnt/winboot (x)
```



安装系统

1. 更新密钥

```bash
pacman -Sy archLinux-keyring
```

2. 安装系统

```bash
pacstrap -K /mnt base base-devel linux linux-firmware btrfs-progs
```

ps: 此处可换源



安装些必要软件

```bash
pacstrap /mnt networkmanager vim sudo intel-ucode
```



创建Swap文件

```bash
btrfs filesystem mkswapfile --size 4G --uuid clear /mnt/swap/swapfile
swapon /mnt/swap/swapfile
genfstab -U /mnt > /mnt/etc/fstab
```



进入系统

```bash
arch-chroot /mnt
```

设置主机名

```bash
vim /etc/hostname
```

设置时区

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



同步硬件时间

```bash
hwclock --systohc
```

设置本地化

```bash
vim /etc/locale.gen
vim /etc/locale.conf LANG=en_US.UTF-8
```



设置root密码

```
passwd
```



安装引导程序

```
pacman -S grub efibootmgr os-prober
```



```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=Eri
```



编辑grub源文件

```bash
vim /etc/default/grub
```

amd 用户 sp5100_tcp Inter 用户 iTCO_wdt

```txt
logleve=5 nowatchdog modeprobe.blacklist=iTCO_wdt
```



生成grub配置文件

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```



```bash
reboot
sudo pacman -S git && git clone https://gitee.com/shorinkiwata/shorin-arch-setup.git && cd shorin-arch-setup && sudo bash install.sh
```



安装 `ssh`

```bash
ssh-keygen -R 192.168.150.130
sudo pacman -S openssh
sudo systemctl start sshd    # 启动服务
sudo systemctl enable sshd   # 设置开机自启
sudo systemctl status sshd   # 检查状态
```



