const express = require("express");
const cors = require("cors");
const axios = require("axios");
const querystring = require("query-string");
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

function getFilter({ size, color }) {
  let filters = [];

  if (size) {
    if (Array.isArray(size) && size.length > 0) {
      filters.push("size_uFilter:" + size.join("|"));
    } else if (typeof size === "string") {
      filters.push("size_uFilter:" + size);
    }
  }

  if (color) {
    if (Array.isArray(color) && color.length > 0) {
      filters.push("color_uFilter:" + color.join("|"));
    } else if (typeof color === "string") {
      filters.push("color_uFilter:" + color);
    }
  }

  return filters.join(";");
}

app.get("/api/express/whatshot", (req, res) => {
  // sort can be empty string or 'skuLowPrice' or 'skuHighPrice' or 'startDate'
  const { page = 1, per_page = 60, size = [], color = [] } = req.query;
  const sort = req.query.sort || "relevance";

  let query = querystring.stringify({
    page,
    per_page,
    sort
  });

  const filterParam = getFilter(req.query);

  query += "&" + filterParam;

  console.log({ query });

  const searchUrl = `https://endeca.search.unbxd.io/b3094e45838bdcf3acf786d57e4ddd98/express_com-u1456154309768/category/cat120002?${query}`;

  axios.get(searchUrl).then(expressRes => {
    res.json(expressRes.data);
  });
});

app.get("/api/express/product/:id", (req, res) => {
  axios
    .get(`https://www.express.com/api/v2/product/${req.params.id}/detail`)
    .then(expressRes => {
      res.json(expressRes.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
