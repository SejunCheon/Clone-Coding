const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백제거
    unique: 1, // 하나의 이메일만 존재(중복 X)
  },
  password: {
    type: String,
    maxLength: 15,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  role: {
    // 역할 나누기 ex) 유저 or 관리자
    type: Number,
    default: 0, // 지정하지 않았을 때 임의의 숫자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // 토큰의 유효기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
