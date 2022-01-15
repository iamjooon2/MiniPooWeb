const express = require('express'); //노드 모듈 가져오기
const app = express();
const port = 5000;

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Hello World!'); //hello world 출력
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
