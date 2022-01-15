const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올수 있게해줌
// app.use(bodyParser.urlencoded({ extended: true }));
// application/json
// app.use(bodyParser.json());

// bodyParser가 express에 내장되면서 안써도 된다/

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올수 있게해줌
app.use(express.urlencoded({ extended: true }));

// application/json
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreateIndex: true, // 더이상 지원되지 않는다고 오류뜸
    //   useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 라고할뻔 ㅋ  ㅋ");
});

app.post("/register", (req, res) => {
  // 회원가입 할때 필요한 정보들을 Client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
