const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // db에 넘어가는 비번을 암호화시키는기능
const saltRounds = 10; // 10자리를 이용해서 비번 암호화
const jwt = require("jsonwebtoken");

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
    maxLength: 75,
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

// mongoose에서 가져온 기능
userSchema.pre("save", function (next) {
  var user = this; // userSchema의 user 정보를 가리킨다.
  // 화살표 함수는 bind기능이 없어서 ES5문법으로 정의했다.

  if (user.isModified("password")) {
    // password가 변할때 만 암호화해준다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // 비밀번호를 암호화 시킨다.
      if (err) return next(err); // err가 발생하면 바로 err를 반환한다.

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
      // 1번째 인자는 순수 DB에들어갈 비밀번호
      // 2번째 지정해준 salt : 임의의 텍스트
      // 3번째는 비밀번호를 hash로 변환
    });
  } else {
    next(); // 비밀번호가 아닌 다른것을 할때는 바로 save로 바로 나갈수있게한다.
  }
}); // save하기전에 뭔가를 한다는 의미

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 123456를 암호화해서 암호화된 비밀번호와 비교한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch); // err없음 , isMatch는 true
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this; // 화살표 함수는 bind기능이 없어서 ES5문법으로 정의했다.

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + 'secretToken' = token 두개를 합쳐서 토큰을 만들고 secretToken이 있으면 user._id를 알수있다.
  // ->
  // 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// statics은 Users 모델에서 바로 쓸 수 있는 메소드
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
