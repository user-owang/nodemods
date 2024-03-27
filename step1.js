const fs = require("fs");
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

cat(argv[2]);
