const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { bacaKontak, findContact } = require("./utils/contacts");

const port = 8080;

// view enigne
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.sendFile(`./index.html`, {root:__dirname})

  res.render("index", { layout: "layout/main-layout", nama: "Indra Maulana", title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layout/main-layout", title: "About" });
});

app.get("/contact", (req, res) => {
  const contacts = bacaKontak();
  console.log(contacts);
  res.render("contact", { layout: "layout/main-layout", title: "Contact", contacts });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", { layout: "layout/main-layout", title: "Halaman Detail", contact });
});

app.use("/", (req, res) => {
  res.send(`<h1>404</h1>`);
});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});
