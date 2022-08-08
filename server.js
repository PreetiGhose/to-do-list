const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/newlistDB", {
  useNewUrlParser: true,
});

const ListSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ListSchema);

app.get("/", (req, res) => {
  Item.find({}, (err, foundItem) => {
    res.json({
      data: foundItem,
    });
  });
});

app.post("/delete", (req, res) => {
  const newItemId = req.body;
  console.log(newItemId);
  Item.findByIdAndRemove(newItemId._id, function (err) {
    if (!err) {
      console.log("this item is deleted");
    }
  });
  res.redirect("/");
});

app.post("/", (req, res) => {
  const newItem = req.body;

  const item = new Item({ name: req.body.itemName });
  item.save().then(() => console.log("new item added"));
  console.log(Item);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
