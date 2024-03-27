const fs = require("fs");
const process = require("process");
const axios = require("axios");
const argv = process.argv;

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(URL) {
  try {
    website = await axios.get(URL);
    console.log(website["data"]);
  } catch (err) {
    console.error(`Error fetching ${URL}: ${err}`);
    process.exit(2);
  }
}
let path = argv[2];

if (path.startsWith("http")) {
  webCat(path);
} else {
  cat(path);
}
