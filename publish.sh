# nginx配置更新
# scp -P 1688 mazhiwen.conf root@139.199.35.182:/etc/nginx/conf.d
# service nginx restart



scp -P 1688 -r dist/* root@139.199.35.182:/usr/share/nginx/mazhiwen/
