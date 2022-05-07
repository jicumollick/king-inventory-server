const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());
app.use(express.json());

// mongo connection
// DB_USER = dbuser1;
// DB_PASS = m8Dj1cBhKL4codyK;

const uri =
  "mongodb+srv://dbuser1:m8Dj1cBhKL4codyK@cluster0.le9xm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const productCollection = client.db("kingInventory").collection("products");

    app.post("/products", (req, res) => {});

    // console.log(`product inserted with id ${result.insertedId} `);
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("King Inventory Server is running");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
