# MiniPooWeb backend

# getting started

``` bash
docker-compose up --build -d

npm run db:init # database load
npm run db:drop # database drop
npm start

# open server.http # it's like postman on vscode.
# 모루는건 물어봐
```

# code direcotry structure

### basic dependency flows

| src/index.js => api/v1/* => domains[user, todo, poo] => adapters[db, google, kakao]

### global dependencies

modules/*


# 총평
- 해당 코드는 상당히, 고랭 같거나 자바 같음. 엄청나게 객체지향적인 코드
- 뭔가 상위에서 하위로 객체를 뿌려주는 코드. 타입 제공이 안되면 추론이 불가능해서 겁나 구림
- 호출동시에 실행되는 코드들인 스크립트코드인 만큼, 추론안되는 생 js에서 굳이 의존성을 루트에서부터 주입될 필요성이 있을까 고민되지만.. 어차피 준희 타입스크립트 할거니까 그냥 상위부터 의존성 주입시켜버림.
- 알아서 적응하길 바람.
- 해당 코드 패턴은 가능한 빨리 적응하기 바람
- 일단 따라쟁이가 되어보셈
- ㅎㅎㅎㅎ 아니면 빨리 성장해서 타입스크립트 반영하거나.



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
