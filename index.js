const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
//회원가입 관련 정보 가져오기위해
const { User } = require("./models/User");

//bodyParser 사용하기 위해 작성
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Worlds mam!");
});

//회원가입 ROUTE
app.post("/register", async (req, res) => {
  //회원가입시 필요한 정보들을 클라이언트에서 가져오면 그것들을 DB에 넣어준다
  console.log("req.body", req.body);

  const user = new User(req.body);

  //save()는 mongoDB에서 가져옴
  //회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  await user
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
