const fs = require("fs");

// reading text async

fs.readFile("./texts/read.txt", (err, data) => {
  if (err) {
    throw Error("Error reading text");
  } else {
    console.log(data);
  }
  // writing text asynchonously
  fs.writeFile("./texts/read2.txt", data, "utf-8", (err) => {
    if (err) {
      throw Error("Error writing data");
    }
  });
});

console.log("testing asynchonous");
