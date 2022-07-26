const app = require("./src/app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Server is runnimg on PORT:", PORT);
});
