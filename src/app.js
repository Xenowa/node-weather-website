require("dotenv").config()
// ==============
// Module Imports
// ==============
const path = require("path")

const express = require("express")
const app = express()
const hbs = require("hbs")

// Define paths for express config
const staticPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticPath))

//HOME Page
app.get("/", (req, res) => {
    res.render("index", {
        title: "About me",
        name: "Xenowa"
    })
    console.log("User is at home page")
})

// HELP Page
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help message here",
        helpMessage: "Help me please!"
    })
    console.log("User is at help page")
})

// ABOUT Page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About message here",
        number: 1122334455,
        team: "Random team"
    })
    console.log("User is at about page")
})

// Requiring APIs
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Weather Page
app.get("/weather", (req, res) => {
    const searchItem = req.query.search

    if (!searchItem) {
        return res.send({
            error: "No Search terms are provided!"
        })
    }

    geoCode(searchItem, (error, data) => {
        if (error) {
            return res.send(error)
        }

        console.log(data);

        forecast(data.latitude, data.longitude, (errormsg, response) => {
            if (errormsg) {
                return res.send(errormsg)
            }

            res.send({
                location: searchItem,
                forecast: response
            })
        })
    })
})

// Products Page
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide a query"
        })
    }

    res.send({
        products: []
    })
})

// For users who are accessing sub parts of /help url, customizing 404 page
app.get("/help/*", (req, res) => {
    res.render("helpError", {
        title: "There are no resources in the help route!"
    })
})

// 404 Error page (* = match anything which is not defined)
app.get("*", (req, res) => {
    res.render("error", {
        title: "Resource error!"
    })
})

// Deployment port finder
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Listening on port 3000...")
})