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

async function writeCat(output, read) {
  if (read.startsWith("http")) {
    try {
      website = await axios.get(read);
      fs.writeFile(output, website["data"], "utf8", (err) => {
        if (err) {
          console.log(`Unable to write ${output}:
          Error: ${err}`);
          process.exit(3);
        }
      });
    } catch (err) {
      console.error(`Error fetching ${read}: ${err}`);
      process.exit(2);
    }
  } else {
    fs.readFile(read, "utf8", (err, data) => {
      if (err) {
        console.log("Error: ", err);
        process.exit(1);
      }
      fs.writeFile(output, data, "utf8", (err) => {
        if (err) {
          console.log(`Unable to write ${output}:
          Error: ${err}`);
          process.exit(3);
        }
      });
    });
  }
}

let path = argv[2];

if (path === "--out") {
  let output = argv[3];
  let input = argv[4];
  writeCat(output, input);
} else if (path.startsWith("http")) {
  webCat(path);
} else {
  cat(path);
}
