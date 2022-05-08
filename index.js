const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // get all products
    app.get("/products", async (req, res) => {
      const query = {};

      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // Post a product
    app.post("/products", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne(product);
      console.log(product);
      res.send(result);
    });

    // Update a product

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: updatedProduct,
      };
      const result = await productCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // delete a product

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // getting  a  particular product

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const result = await productCollection.findOne(query);
      res.send(result);
    });

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
