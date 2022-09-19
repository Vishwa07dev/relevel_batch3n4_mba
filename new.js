// let fs = require("fs");

// // Intitializing the readFileLines with the file
// const readFileLines = (filename) =>
//   fs.readFile(filename, (terr, tdata) => {
//     if (terr) {
//       console.log(terr);
//     } else {
//       console.log("--", tdata.toString());
//     }
//   });
// //   function readFile(a,b){
// //     //a does something
// //     if(a!=undefined){
// //         b(obj)
// //     }else{

// //     }
// //   }
// // WSfs.readFile("./tutorialsPoint.txt",());

// // Calling the readFiles function with file name
// let arr = readFileLines("./tutorialsPoint.txt");

// // Printing the response array
// // console.log(arr);
// console.log(1);
// // let myPromise = new Promise(function (reject, Reject) {
// //   setTimeout(function () {
// // let x = 110;
// // if (x <= 10) {
// //   reject("Less than");
// // } else {
// //   Reject("Greater than");
// // }
// //   }, 3000);
// // });
// //
// // myPromise
// //   .then(function (value) {
// // console.log(value);
// //   })
// //   .catch((err) => {
// // console.log(err);
// //   });
// // myPromise.catch(function (err) {
// //   console.log(err);
// // });

// //

// function callback(a, b) {
//   a();
//   b();
// }
// function a(next) {
//   console.log("Alpha");

// }
// function b() {
//   console.log("beta");
// }
// callback(a, b);

// Import events module
// var events = require("events");

// // Create an eventEmitter object
// var eventEmitter = new events.EventEmitter();

// // Create an event handler as follows
// var connectHandler = function connected() {
//   console.log("connection succesful.");

//   // Fire the data_received event
//   eventEmitter.emit("data_received");
// };

// // Bind the connection event with the handler
// eventEmitter.on("connection", connectHandler);

// // Bind the data_received event with the anonymous function
// eventEmitter.on("data_received", function () {
//   console.log("data received succesfully.");
// });

// // Fire the connection event
// eventEmitter.emit("connection");

// console.log("Program Ended.");
// const express = require("express");
// console.log(process.env.NODE_ENV);
// process.stdout.write("Hello World!" + "\n");

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ": " + val);
// });
// console.log(Math.random("successfyl", "failed"));
var myArray = ["Apples", "Bananas", "Pears"];

var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
console.log(randomItem);
