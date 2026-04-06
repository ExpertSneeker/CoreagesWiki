#!/bin/bash
# Coreages Wiki 自动更新脚本
# 拉取最新内容并重新构建 VitePress 静态文件

cd "$(dirname "$0")"

echo "[$(date)] 开始更新..."

git pull origin main 2>&1
if [ $? -ne 0 ]; then
    echo "[$(date)] git pull 失败"
    exit 1
fi

npx vitepress build 2>&1
if [ $? -ne 0 ]; then
    echo "[$(date)] 构建失败"
    exit 1
fi

echo "[$(date)] 更新完成"
