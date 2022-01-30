# MiniPooWeb backend

# getting started

``` bash
docker-compose up --build -d
```

# code direcotry structure

### basic dependency flows

| src/index.js => api/v1/* => domains[user, todo, poo] => adapters[db, google, kakao]

### global dependencies

modules/*




# tips

### about docker

``` bash
docker image ls
docker rmi ~~~~~~
docker rmi `docker image ls -aq` # 전체 이미지 삭제/원리: -q 하면 \n 된 string이 한줄씩 입력이 되서 그럼

docker container ls
docker container rm ~~~~~~~
docker container rm `docker container ls -aq` # 전체 이미지 삭제/원리: -q 하면 \n 된 string이 한줄씩 입력이 되서 그럼

docker network ls
docker network rm ~~~~~~~~
docker network rm `docker network ls -aq` # 전체 이미지 삭제/원리: -q 하면 \n 된 string이 한줄씩 입력이 되서 그럼

docker volumes ls
docker volumes rm ~~~~~~
docker volumes rm `docker volumes ls -aq` # 전체 이미지 삭제/원리: -q 하면 \n 된 string이 한줄씩 입력이 되서 그럼

docker-compose up -d # -d를 붙이면 daemonize되어 background에서 실행이됨, -d를 안붙이면 터미널에서 안나가는 foreground에서 수행이됨.

docker-compose stop # 해당 docker-compose.yml로 실행한 container를 중지상태로 만든다.

docker-compose start # 해당 docker-compose.yml로 실행한 container를 다시 수행상태로 만든다.

docker-compose down # 해당 docker-compose.yml로 실행한 container들을 전부 제거한다.
```
