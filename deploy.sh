#!/usr/bin/env sh

# 發生錯誤時執行終止
set -e

# 建置
npm run build

# 移動到打包資料夾下
cd dist

rm -rf .git

# 如果你要部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:mrmosssir/music-player.git main:gh-pages

cd -
