const EventEmitter = require("events");

const myEmitter = new EventEmitter();

// listener

myEmitter.on("birthday", (gift) => {
  console.log(`I'll send a ${gift}`);
});

myEmitter.on("birthday", () => {
  console.log("Happy birthday");
});

myEmitter.emit("birthday", "watch");
