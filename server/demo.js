// let bar;
// function someAsyncFun(callback) {
//   process.nextTick(callback);
// }

// someAsyncFun(() => {
//   console.log(bar);
// });

// bar = 1;
const fs = require("fs");

fs.readFile(__filename, () => {
  process.nextTick(() => console.log("Next tick"));

  setImmediate(() => {
    console.log("immediate");
  });

  setTimeout(() => {
    console.log("timeout");
  }, 0);
});

// process.nextTick(() => console.log("Next tick"));

// setImmediate(() => {
//   console.log("immediate");
// });

// setTimeout(() => {
//   console.log("timeout");
// }, 0);
