console.log("Starting App");

setTimeout(() => {
    console.log("inside callback st1");
}, 2000)

setTimeout(() => {
    console.log("inside callback st2");
}, 0)

console.log("Finishing App");