const { render } = require("ejs");
const { urlencoded, response } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const { bacaKontak, findContact, addContact } = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const bodyParser = require("body-parser");

const port = 8080;

// view enigne
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

// Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Contact",
    layout: "layout/main-layout",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "No hape salah").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // addContact(req.body);
    // res.redirect("/contact");
  }
);

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
