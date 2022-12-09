// function displayresult() {
//     console.log('Hi hi');
// }
//
// function abc(a, b, callback) {
//     callback();
//
// }
//
// abc(4, 5, displayresult);
// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//         currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }
//
//  function  randomReadFile (x) {
//     return new Promise((resolve, reject) => {
//         if (x == 2) {
//             resolve("yes");
//         } else {
//             reject("no")
//         }
//     });
//
// }


// async function test(){
//     try {
//         let random = await randomReadFile(2);
//         console.log(random);
//     } catch (error) {
//         console.log(error);
//     }
// }
// test();


// console.log('earlier');
// random.then((value) => {
//     console.log(value);
// }, (error) => {
//     console.log(error);
// })


async function getFile() {
    let myPromise = new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', "index.php");
        req.onload = function () {
            if (req.status == 200) {
                console.log(req.status);
                // sleep(5000);
                resolve(req.getAllResponseHeaders());
            } else {
                reject("File not Foundjjj");
            }
        };
        req.send();
    });

    try {
        var result = await myPromise;
        document.getElementById("demo").innerText = result;
    } catch (error) {
        document.getElementById("demo").innerText = error;
    }
}


// getFile();
// console.log('getting file')

var countries = [
    {
        id: 1,
        name: "usa"

    },
    {
        id: 2,
        name: "pakistan"
    },
    {
        id: 2,
        name: "france"
    }

]
var name = countries.map(country=>{
   return country.name;
})
document.write(name)



