const express = require("express");
const cors = require("cors");
const axios = require("axios");
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

app.get("/api/express/whatshot", (req, res) => {
  const { page = 1, per_page = 60 } = req.query;
  axios
    .get(
      `https://endeca.search.unbxd.io/b3094e45838bdcf3acf786d57e4ddd98/express_com-u1456154309768/category/cat120002?page=${page}&per_page=${per_page}`
    )
    .then(expressRes => {
      res.json(expressRes.data);
    });
});

app.get("/api/express/product/:id", (req, res) => {
  axios
    .get(`https://www.express.com/api/v2/product/${req.params.id}/detail`)
    .then(expressRes => {
      res.json(expressRes.data);
    });
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
