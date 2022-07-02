// //
// const one = () => {
//     return new Promise((resolve, reject) => {
//         console.log('as');
//
//     });
//
// }
// const two = () => {
//     return new Promise(resolve => {
//         console.log("Hello");
//         sleep(5000);
//         console.log("World!");
//         resolve("game")
//         console.log('two')
//     });
//
// }
// const three = () => {
//     return new Promise(resolve => {
//         resolve();
//         console.log('Thress')
//     });
// }
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


// one().then((zz) => {
//     console.log(zz);
//     return two()
// }).then(() => {
//     return three()
// }).then(() => {
//     console.log("We did them all")
// })

// one().then(function (value){
//     console.log(value);
// })
//  async function tc(){
//   let response = await one();
//   console.log(response);
//
//  }
//  tc();
// console.log('not waiting');

// function hello(){
//     console.log('hello');
// }
// async function getFile() {
//     let myPromise = new Promise(function(resolve) {
//         let req = new XMLHttpRequest();
//         req.open('GET', "index.php");
//         req.onload = function() {
//             if (req.status == 200) {
//                 resolve(req.response);
//             } else {
//                 resolve("File not Found");
//             }
//         };
//         req.send();
//     });
//     document.getElementById("demo").innerHTML = await myPromise;
//
// }
//
// getFile();

function hello() {
    console.log('hello');
}

async function getFile() {
    let myPromise = new Promise(function (resolve,reject) {
        let req = new XMLHttpRequest();
        req.open('GET', "index.php");
        req.onload = function () {
            if (req.status == 200) {
                console.log(req.status);
                // sleep(5000);
                resolve(req.getAllResponseHeaders());
            } else {
                reject("File not Found");
            }
        };
        req.send();
    });
    try{
        var result = await myPromise;
        document.getElementById("demo").innerText = result;

    }catch (error){

        document.getElementById("demo").innerText = error;

    }

}
getFile();
console.log('getting file')



