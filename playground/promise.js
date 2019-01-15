//simple promise example1

// var promise = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve("It workedhjhj");
//         resolve();
//     },2000)

// })

// promise.then((message) => {
// console.log(message);
// }
// ,(error)=> {
//     console.log(error);
// })




//example 2

var asyncAdd = (a,b) => {

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(typeof a == 'number' && typeof b == 'number'){
                resolve(a+b);
            }
            else{
                reject("Invalid arguments");
            }
        },1500)
    })
}

//chaining promises -error handling difficaulty
// asyncAdd(4,'5').then((message) => {
//     console.log(message);
//     return asyncAdd(message,10);
// },(error) => {
//     console.log(error);
// }).then((msg) => {
//     console.log(msg);
// },(err) => {
//     console.log(err);
// });

//chaining proomises -crct error handling using catch
asyncAdd(4,'5').then((message) => {
    console.log(message);
    return asyncAdd(message,10);
}).then((msg) => {
    console.log(msg);
}).catch((err) => {
    console.log(err);
});