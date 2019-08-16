const express = require("express");
const cors = require("cors");
const data = require("./data/products.json");

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use("/images", express.static("images"));

app.get("/api/products", (req, res) => {
  res.json({
    products: data.products.map(product => {
      return {
        ...product,
        images: {
          small: `/images/${product.sku}_2.jpg`,
          large: `/images/${product.sku}_1.jpg`
        }
      };
    })
  });
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
