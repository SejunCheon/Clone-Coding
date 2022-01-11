const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      // ObjectId가 있으면 하나의 아이디?로 여러가지 유저정보를 가져올 수 있다
      ref: "User", // ObjectId를 타입으로 지정하면 User 모델을 지정해줘여 한다
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRuntime: {
      type: String,
    },
  },
  { timestamp: true }
); // 생성된 시간을 자동으로 처리해준다

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
// 이 모델을 다른곳에서도 사용할 수 있게 exports 해줘야한다
