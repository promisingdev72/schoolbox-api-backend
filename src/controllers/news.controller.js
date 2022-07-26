const axios = require("axios");
const { HOST_API, AUTH_TOKEN,NEWS_API } = require("../config/config");

exports.getNewsFeed = (req, res) => {
  const data = [];
  axios({
    url: HOST_API,
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (newsfeed) => {
      await Promise.all(newsfeed.data.map(async (news, index)=>{
        await axios({
          url: `${NEWS_API}/${news.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        .then(async (pernews) => {
          let tmp_pernews = news;
          tmp_pernews['article'] = pernews.data.article.body;
          data.push(tmp_pernews);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
      }))
      res.status(200).send(data);
      // console.log("article",data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
