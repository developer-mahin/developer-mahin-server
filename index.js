const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config()

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.98bxcpw.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    const categoriesCollection = client.db("developer-mahin").collection("categories")
    const detailsCollection = client.db("developer-mahin").collection("projectsDetails")

    try {
        app.get("/categories", async (req, res) => {
            const query = {}
            const result = await categoriesCollection.find(query).toArray()
            res.send(result)
        })

        app.get("/category/:category_name", async (req, res) => {
            const name = req.params.category_name
            const query = { category_name: name }
            const result = await detailsCollection.find(query).toArray()
            res.send(result)
        })

        app.get("/allProjects", async (req, res) => {
            const query = {}
            const result = await detailsCollection.find(query).toArray()
            res.send(result)
        })  

        app.get("/details/:id", async(req,res)=>{
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await detailsCollection.findOne(query)
            res.send(result)
        })

    } catch (error) {
        console.log(error.message);
    }

}

run().catch(err => { err.message })


app.get("/", async (req, res) => {
    res.send("Developer Mahin server is running")
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})