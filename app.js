const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ToDoList";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB connected");
    })
    .catch((error) => {
        console.error(error);
    });

const itemSchema = new mongoose.Schema({
    itemname: String,
});

const customlistSchema = new mongoose.Schema({
    name: String,
    itemlist: [itemSchema]
});

const Item = mongoose.model("Item", itemSchema);

const List = mongoose.model("List", customlistSchema);

app.get("/", async (req, res) => {
    const itemsfound = await Item.find({});
    res.render("index", { listTitle: "Today's General List", newItems: itemsfound });
});

app.get("/:customlist", async (req, res) => {
    let customlistname = req.params.customlist;
    customlistname = _.kebabCase(customlistname);
    customlistname = _.capitalize(customlistname);
    customlistname = _.replace(customlistname, '-', ' ');
    try {

        let listfound = await List.findOne({ name: customlistname });

        if (!listfound) {
            await List.create({ name: customlistname, itemlist: [] });
            res.redirect("/" + customlistname);
        }
        else {
            res.render("index", { listTitle: listfound.name, newItems: listfound.itemlist });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", async function (req, res) {
    let incomingitem = req.body.newItems;
    if (incomingitem === "") {
        res.send(`<script>alert("Oops! You didn't write anything. Try again"); window.location.href = "/";</script>`);
    } else {
        try {

            if (req.body.addbtn === "Today's General List") {
                await Item.create({ itemname: incomingitem });
                res.redirect("/");
            } else {
                let listfound = await List.findOne({ name: req.body.addbtn });
                listfound.itemlist.push({ itemname: incomingitem });
                await listfound.save();
                res.redirect("/" + req.body.addbtn);

            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
});

app.post("/delete", async (req, res) => {
    const deleteBtnValue = req.body.deletebtn;
    const [itemId, listTitle] = deleteBtnValue.split('|');

    try {
        if (listTitle === "Today's General List") {
            await Item.deleteOne({ _id: itemId });
            res.redirect("/");
        }
        else {
            await List.updateOne(
                { name: listTitle },
                { $pull: { itemlist: { _id: itemId } } }
            );
            res.redirect("/" + listTitle);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
