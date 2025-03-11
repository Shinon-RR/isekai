const readlineSync = require("readline-sync");
const crypto = require("crypto");
const { cl, wrtxt } = require("./func");

function shuffle(n) {
    let array = [];
    for (let i = 1; i <= n; i++) {
        array.push(i);
    }
    let copy = [];
    let i;
    while (n) {
        i = Math.floor(Math.random() * array.length)
        if (i in array) {
            copy.push(array[i])
            delete array[i]
            n--
        }
    }

    const randIndex = Math.floor(Math.random() * array.length);
    return copy[randIndex];

    // return array[0]
    // var copy = [],
    //   n = array.length,
    //   i

    // // While there remain elements to shuffle…
    // while (n) {
    //   // Pick a remaining element…
    //   i = Math.floor(Math.random() * array.length)

    //   // If not already shuffled, move it to the new array.
    //   if (i in array) {
    //     copy.push(array[i])
    //     delete array[i]
    //     n--
    //   }
    // }

    // return copy
}
const rand = n => Math.floor(Math.random() * n) + 1;

// let counter = 0;
// let ngold = 0;
// let suc = 0;
// let bck = 0;
// let lv = 0;
// let maxlv = 99;
// let numb = [];
// let numb2 = [];
// let cnumb = [];
// let cnumb2 = [];
// let pg1 = 0
// let pg2 = 0
// let pg3 = 0
// function setbr() {
//     switch (lv) {
//         case 0:
//             suc = 95
//             bck = 0
//             break;
//         case 1:
//             suc = 90
//             bck = 0
//             break;
//         case 2:
//             suc = 85
//             bck = 0
//             break;
//         case 3:
//             suc = 80
//             bck = 0
//             break;
//         case 4:
//             suc = 75
//             bck = 0
//             break;
//         case 5:
//             suc = 70
//             bck = 0
//             break;
//         case 6:
//             suc = 65
//             bck = 0
//             break;
//         case 7:
//             suc = 60
//             bck = 0
//             break;
//         case 8:
//             suc = 55
//             bck = 0
//             break;
//         case 9:
//             suc = 50
//             bck = 0
//             break;
//         case 10:
//             suc = 50
//             bck = 0
//             break;
//         case 11:
//             suc = 45
//             bck = 0
//             break;
//         case 12:
//             suc = 40
//             bck = 1
//             break;
//         case 13:
//             suc = 35
//             bck = 2
//             break;
//         case 14:
//             suc = 30
//             bck = 3
//             break;
//         case 15:
//             suc = 30
//             bck = 3
//             break;
//         case 16:
//             suc = 30
//             bck = 3
//             break;
//         case 17:
//             suc = 30
//             bck = 3
//             break;
//         case 18:
//             suc = 30
//             bck = 3
//             break;
//         case 19:
//             suc = 30
//             bck = 3
//             break;
//         case 20:
//             suc = 25
//             bck = 7
//             break;
//         case 21:
//             suc = 20
//             bck = 8
//             break;
//         case 22:
//             suc = 15
//             bck = 9
//             break;
//         case 23:
//             suc = 10
//             bck = 10
//             break;
//         case 24:
//             suc = 5
//             bck = 10
//             break;
//         case 25:
//             suc = 5
//             bck = 10
//             break;
//         case 26:
//             suc = 5
//             bck = 10
//             break;
//         case 27:
//             suc = 5
//             bck = 10
//             break;
//         case 28:
//             suc = 5
//             bck = 10
//             break;
//         case 29:
//             suc = 5
//             bck = 10
//             break;

//         default:
//             suc = 1
//             bck = 10
//             break;
//     }
// }
// let mode = Number(readlineSync.question("1. 1~n 횟수 확인 | 2. 강화 평균횟수 구하기\n> "));
// console.log("")
// let count = Number(readlineSync.question("반복 횟수 설정\n> "));
// switch (mode) {
//     case 1:
//         let coc = Number(readlineSync.question("n 설정\n> "));
//         console.log("작동 중...")
//         for (let i = 0; i < count; i++) {
//             numb.push(shuffle(coc))
//             numb2.push(rand(coc))
//         }
//         //임시
//         // numb = [1, 1, 1, 1, 2, 2, 9, 9, 9, 9]
//         // numb2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9,]
//         // for (let i = 0; i < coc; i++) {
//         //     let a = 0
//         //     let r = 0
//         //     let ii = 0
//         //     for (ii = 0; ii < numb.length; ii++) {
//         //         if (numb[ii] === (ii + 1)) {
//         //             a++
//         //         }
//         //         if (numb2[ii] === (ii + 1)) {
//         //             r++
//         //         }
//         //     }
//         //     console.log((i + 1)," : ",a)
//         //     cnumb.push(a)
//         //     cnumb2.push(r)
//         // }
//         // console.clear();
//         // console.log("셔플 함수\n")
//         // for (let i = 0; i < coc; i++) {
//         //     process.stdout.write((i + 1) + " : " + cnumb[i] + "번  ")
//         //     if ((i + 1) % 10 === 0) {
//         //         console.log("")
//         //     }
//         // }
//         // console.log("랜드 함수\n")
//         // for (let i2 = 0; i2 < coc; i2++) {
//         //     process.stdout.write((i2 + 1) + " : " + cnumb2[i2] + "번  ")
//         //     if ((i2 + 1) % 10 === 0) {
//         //         console.log("")
//         //     }
//         // }



//         // 숫자의 개수를 세는 함수
//         function countNumbers(arr, n) {
//             const count = {};
//             for (let i = 1; i <= n; i++) {
//                 count[i] = 0; // 초기화
//             }

//             arr.forEach(num => {
//                 if (count[num] !== undefined) {
//                     count[num]++;
//                 }
//             });

//             return count;
//         }

//         // 예시 사용
//         console.log("셔플 함수\n")
//         console.log("숫자 개수:", countNumbers(numb, coc));
        


//         console.log("랜드 함수\n")
//         console.log("숫자 개수:", countNumbers(numb2, coc));
//         break;
//     case 2:
//         inchoice = Number(readlineSync.question("도착 단계 설정 > "));
//         if (inchoice > maxlv) {
//             inchoice = maxlv
//         }
//         console.log("크립토 함수")
//         for (let i2 = 0; i2 < count; i2++) {
//             lv = 0
//             let b = 0
//             let s = 0
//             let f = 0
//             let d = 0
//             let icu = 0

//             let loof = true
//             while (loof) {
//                 ngold = 0;
//                 ntem = [];
//                 ntemcount = [];
//                 suc = 0;
//                 bck = 0;
//                 setbr()
//                 if (crypto.randomInt(100) <= suc) {
//                     s++
//                     lv++
//                 } else {
//                     if (crypto.randomInt(100) <= bck) {
//                         b++
//                         lv = 0
//                     } else {
//                         if (lv <= 10 || (lv % 5) === 0) {
//                             f++
//                         } else {
//                             d++
//                             lv--
//                         }
//                     }
//                 }

//                 icu++
//                 if (inchoice === lv) {
//                     loof = false
//                 }
//             }            
//             console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 하락 / ${b}번 파괴 (+${lv})`);
//             pg3 += icu
//         }
//         console.log("총합 : " + pg3 + "   평균 : " + Math.round(pg3 / count))
//         // console.log("랜드 함수")
//         // for (let i2 = 0; i2 < count; i2++) {
//         //     lv = 0
//         //     let b = 0
//         //     let s = 0
//         //     let f = 0
//         //     let d = 0
//         //     let icu = 0

//         //     let loof = true
//         //     while (loof) {
//         //         ngold = 0;
//         //         ntem = [];
//         //         ntemcount = [];
//         //         suc = 0;
//         //         bck = 0;
//         //         setbr()
//         //         if (rand(100) <= suc) {
//         //             s++
//         //             lv++
//         //         } else {
//         //             if (rand(100) <= bck) {
//         //                 b++
//         //                 lv = 0
//         //             } else {
//         //                 if (lv <= 10 || (lv % 5) === 0) {
//         //                     f++
//         //                 } else {
//         //                     d++
//         //                     lv--
//         //                 }
//         //             }
//         //         }

//         //         icu++
//         //         if (inchoice === lv) {
//         //             loof = false
//         //         }
//         //     }            
//         //     console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 하락 / ${b}번 파괴 (+${lv})`);
//         //     pg2 += icu
//         // }
//         // console.log("총합 : " + pg2 + "   평균 : " + Math.round(pg2 / count))
//         // console.log("셔플 함수")
//         // for (let i22 = 0; i22 < count; i22++) {
//         //     lv = 0
//         //     let b = 0
//         //     let s = 0
//         //     let f = 0
//         //     let d = 0
//         //     let icu = 0

//         //     let loof = true
//         //     while (loof) {
//         //         ngold = 0;
//         //         ntem = [];
//         //         ntemcount = [];
//         //         suc = 0;
//         //         bck = 0;
//         //         setbr()
//         //         if (shuffle(100) <= suc) {
//         //             s++
//         //             lv++
//         //         } else {
//         //             if (shuffle(100) <= bck) {
//         //                 b++
//         //                 lv = 0
//         //             } else {
//         //                 if (lv <= 10 || (lv % 5) === 0) {
//         //                     f++
//         //                 } else {
//         //                     d++
//         //                     lv--
//         //                 }
//         //             }
//         //         }

//         //         icu++
//         //         if (inchoice === lv) {
//         //             loof = false
//         //         }
//         //     }
//         //     console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 하락 / ${b}번 파괴 (+${lv})`);
//         //     pg1 += icu
//         // }
//         // console.log("총합 : " + pg1 + "   평균 : " + Math.round(pg1 / count))
       
        
        

//     default:
//         break;
// }
// setbr()
// while (true) {
//     console.log("test")
//     result = shuffle(100);
//     console.log(result)
//     if (result == 1) {
//         console.log("counter: ", counter)
//         break;
//     }
//     counter++;
// }
let pst = ["ck"]

while (true) {
    cl()
    console.log(wrtxt(5))    
    let pwc = readlineSync.keyInSelect(pst, "\n확인 > ", { cancel: "뒤로" });
    
}