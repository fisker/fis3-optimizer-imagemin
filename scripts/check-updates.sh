#!bin/sh

cd ../packages

for file in ./*
do
  if test -d $file
  then
    cd $file
    ncu -r https://registry.npm.taobao.org
    cd ..
  fi
done
