const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");
const forcast = require("./utils/forcast");

//console.log(__dirname);

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Bibek",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Bibek",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});
//help page setup
app.get("/help", (req, res) => {
  res.render("help", {
    paragraph: "This is help page. Save me i am stuck.",
    title: "Help",
    name: "Bibek",
  });
});

//root domain
// app.get("", (req, res) => {
//   res.send("<h1>Weather</>");
// });

//weather page
app.get("/weather", (req, res) => {
  //res.send("View Weather");
  if (!req.query.address) {
    return res.send({ error: "Error, Supply the address you donut!! " });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forcastData,
        location: location,
        address: req.query.address,
      });
    });
  });

  // res.send({
  //   forcast: "Its raining ",
  //   location: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Bibek",
    message: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Bibek",
    title: "404 error",
    message: "Page not found",
  });
});

//404 handler
app.get("*", (req, res) => {
  res.send("My god type a valid url");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
