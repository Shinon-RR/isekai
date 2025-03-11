const { default: chalk } = require("chalk");
const { vil } = require("./vil");
const { Gdata } = require("./G-data");
const { sleep } = require("./func");


let upline = chalk.yellow("┌────────────────┐");
let uplinew = chalk.white("┌────────────────┐");
let upliner = chalk.redBright("┌────────────────┐");

let uupline = chalk.yellow("┌───────┴┴───────┐");
let uuplinew = chalk.white("┌───────┴┴───────┐");
let uupliner = chalk.redBright("┌───────┴┴───────┐");

let downline = chalk.yellow("└────────────────┘");
let downlinew = chalk.white("└────────────────┘");
let downliner = chalk.redBright("└────────────────┘");

let ddownline = chalk.yellow("└───────┬┬───────┘");
let ddownlinew = chalk.white("└───────┬┬───────┘");
let ddownliner = chalk.redBright("└───────┬┬───────┘");

let line1 = chalk.yellow("│");
let line2 = chalk.yellow("┤");
let line3 = chalk.yellow("├");

let line1w = chalk.white("│");
let line2w = chalk.white("┤");
let line3w = chalk.white("├");

let line1r = chalk.redBright("│");
let line2r = chalk.redBright("┤");
let line3r = chalk.redBright("├");
let spc = "    "
let slc = "────"
let vilblankwwwwwwww = "                  "
let lilblankwwwwwwww = "        ││        "

// 윗줄만 = 11
// 윗줄 + 연결선 = 12

// 정보 + 왼쪽 + 오른쪽 연결 없음 = 21
// 정보 + 왼쪽있고 + 오른쪽 없음 = 22
// 정보 + 왼쪽없고 + 오른쪽 있음 = 23
// 정보 + 왼쪽 + 오른쪽 연결 있음 = 24

// 이름 + 왼쪽 + 오른쪽 연결 없음 = 31
// 이름 + 왼쪽있고 + 오른쪽 없음 = 32
// 이름 + 왼쪽없고 + 오른쪽 있음 = 33
// 이름 + 왼쪽 + 오른쪽 연결 있음 = 34

// 아랫줄만 = 41
// 아랫줄 + 연결선 = 42



Gdata.nextVil = vil.dellyValley
function wn(vname, wh) {
    let cn = ""
    let dn = ""
    if (wh >= 31 && wh <= 34) {
        if (vname.name.length === 10) {
            cn = "" + vname.name + ""
        }else if (vname.name.length === 9) {
            cn = " " + vname.name + " "
        } else if (vname.name.length === 8) {
            cn = "" + vname.name + ""
        } else if (vname.name.length === 7) {
            cn = " " + vname.name + " "
        } else if (vname.name.length === 6) {
            cn = "ㅤ" + vname.name + "ㅤ"
        } else if (vname.name.length === 5) {
            cn = " ㅤ" + vname.name + "ㅤ "
        } else if (vname.name.length === 4) {
            cn = "ㅤㅤ" + vname.name + "ㅤㅤ"
        } else if (vname.name.length === 3) {
            cn = " ㅤㅤ" + vname.name + "ㅤㅤ "
        } else if (vname.name.length === 2) {
            cn = "ㅤㅤㅤ" + vname.name + "ㅤㅤㅤ"
        } else if (vname.name.length === 1) {
            cn = " ㅤㅤㅤ" + vname.name + "ㅤㅤㅤ "
        }
    }
    if (wh >= 21 && wh <= 24) {
        if (vname.type === "hunt") {
            cn = " ㅤㅤ사냥터ㅤㅤ "
        } else if (vname.type === "vil") {
            cn = "ㅤㅤㅤ마을ㅤㅤㅤ"
        }
    }
    if (vname.id === Gdata.nextVil.id && vname.type === "vil") {
        if (wh === 11) {
            dn = (upline)
        } else if (wh === 12) {
            dn = (uupline)
        } else if (wh === 21) {
            dn = (line1 + cn + line1)
        } else if (wh === 22) {
            dn = (line2 + cn + line1)
        } else if (wh === 23) {
            dn = (line1 + cn + line3)
        } else if (wh === 24) {
            dn = (line2 + cn + line3)
        } else if (wh === 31) {
            dn = (line1 + cn + line1)
        } else if (wh === 32) {
            dn = (line2 + cn + line1)
        } else if (wh === 33) {
            dn = (line1 + cn + line3)
        } else if (wh === 34) {
            dn = (line2 + cn + line3)
        } else if (wh === 41) {
            dn = (downline)
        } else if (wh === 42) {
            dn = (ddownline)
        }
    } else if (vname.id === Gdata.nextVil.id && vname.type === "hunt") {
        if (wh === 11) {
            dn = (upliner)
        } else if (wh === 12) {
            dn = (uupliner)
        } else if (wh === 21) {
            dn = (line1r + cn + line1r)
        } else if (wh === 22) {
            dn = (line2r + cn + line1r)
        } else if (wh === 23) {
            dn = (line1r + cn + line3r)
        } else if (wh === 24) {
            dn = (line2r + cn + line3r)
        } else if (wh === 31) {
            dn = (line1r + cn + line1r)
        } else if (wh === 32) {
            dn = (line2r + cn + line1r)
        } else if (wh === 33) {
            dn = (line1r + cn + line3r)
        } else if (wh === 34) {
            dn = (line2r + cn + line3r)
        } else if (wh === 41) {
            dn = (downliner)
        } else if (wh === 42) {
            dn = (ddownliner)
        }
    } else {
        if (wh === 11) {
            dn = (uplinew)
        } else if (wh === 12) {
            dn = (uuplinew)
        } else if (wh === 21) {
            dn = (line1w + cn + line1w)
        } else if (wh === 22) {
            dn = (line2w + cn + line1w)
        } else if (wh === 23) {
            dn = (line1w + cn + line3w)
        } else if (wh === 24) {
            dn = (line2w + cn + line3w)
        } else if (wh === 31) {
            dn = (line1w + cn + line1w)
        } else if (wh === 32) {
            dn = (line2w + cn + line1w)
        } else if (wh === 33) {
            dn = (line1w + cn + line3w)
        } else if (wh === 34) {
            dn = (line2w + cn + line3w)
        } else if (wh === 41) {
            dn = (downlinew)
        } else if (wh === 42) {
            dn = (ddownlinew)
        }
    }
    return dn
}

sleep(2)
console.log("┌" + "─".repeat(136) + "┐")
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${vilblankwwwwwwww}  에덴 지도 ${vilblankwwwwwwww}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.proto, 11)}${spc}${wn(vil.wolvesFields, 11)}${spc}${wn(vil.wolvesForest, 11)}${spc}${wn(vil.potain, 11)}${spc}${wn(vil.highMount, 11)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.proto, 23)}${slc}${wn(vil.wolvesFields, 24)}${slc}${wn(vil.wolvesForest, 24)}${slc}${wn(vil.potain, 24)}${slc}${wn(vil.highMount, 22)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.proto, 33)}${slc}${wn(vil.wolvesFields, 34)}${slc}${wn(vil.wolvesForest, 34)}${slc}${wn(vil.potain, 34)}${slc}${wn(vil.highMount, 32)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.proto, 41)}${spc}${wn(vil.wolvesFields, 41)}${spc}${wn(vil.wolvesForest, 42)}${spc}${wn(vil.potain, 41)}${spc}${wn(vil.highMount, 42)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.batCave, 11)}${spc}${wn(vil.deepForest, 12)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.underMountHill, 12)}${spc}${wn(vil.norden, 11)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.batCave, 23)}${slc}${wn(vil.deepForest, 22)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.underMountHill, 23)}${slc}${wn(vil.norden, 22)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.batCave, 33)}${slc}${wn(vil.deepForest, 32)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.underMountHill, 33)}${slc}${wn(vil.norden, 32)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.batCave, 41)}${spc}${wn(vil.deepForest, 42)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.underMountHill, 42)}${spc}${wn(vil.norden, 41)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${wn(vil.luminousRealm, 12)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.daybreakJungle, 12)}${spc}${wn(vil.mirabilis, 11)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${wn(vil.luminousRealm, 21)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.daybreakJungle, 23)}${slc}${wn(vil.mirabilis, 22)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${wn(vil.luminousRealm, 31)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.daybreakJungle, 33)}${slc}${wn(vil.mirabilis, 32)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${wn(vil.luminousRealm, 42)}${spc}${vilblankwwwwwwww}${spc}${wn(vil.daybreakJungle, 41)}${spc}${wn(vil.mirabilis, 42)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.westallis, 11)}${spc}${wn(vil.broadField, 11)}${spc}${wn(vil.kivotos, 12)}${spc}${wn(vil.dellyValley, 11)}${spc}${wn(vil.delly, 11)}${spc}${wn(vil.heartbeatGrounds, 12)}${spc}│`)
console.log(`│${spc}${wn(vil.westallis, 23)}${slc}${wn(vil.broadField, 24)}${slc}${wn(vil.kivotos, 22)}${spc}${wn(vil.dellyValley, 23)}${slc}${wn(vil.delly, 22)}${spc}${wn(vil.heartbeatGrounds, 21)}${spc}│`)
console.log(`│${spc}${wn(vil.westallis, 33)}${slc}${wn(vil.broadField, 34)}${slc}${wn(vil.kivotos, 32)}${spc}${wn(vil.dellyValley, 33)}${slc}${wn(vil.delly, 32)}${spc}${wn(vil.heartbeatGrounds, 31)}${spc}│`)
console.log(`│${spc}${wn(vil.westallis, 42)}${spc}${wn(vil.broadField, 42)}${spc}${wn(vil.kivotos, 42)}${spc}${wn(vil.dellyValley, 42)}${spc}${wn(vil.delly, 41)}${spc}${wn(vil.heartbeatGrounds, 42)}${spc}│`)
console.log(`│${spc}${lilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${wn(vil.sunsetSeashore, 12)}${spc}${wn(vil.wayden, 12)}${spc}${wn(vil.shriekPlains, 12)}${spc}${wn(vil.dracalNest, 12)}${spc}${wn(vil.deadLock, 11)}${spc}${wn(vil.silentForest, 12)}${spc}│`)
console.log(`│${spc}${wn(vil.sunsetSeashore, 21)}${spc}${wn(vil.wayden, 21)}${spc}${wn(vil.shriekPlains, 23)}${slc}${wn(vil.dracalNest, 22)}${spc}${wn(vil.deadLock, 23)}${slc}${wn(vil.silentForest, 22)}${spc}│`)
console.log(`│${spc}${wn(vil.sunsetSeashore, 31)}${spc}${wn(vil.wayden, 31)}${spc}${wn(vil.shriekPlains, 33)}${slc}${wn(vil.dracalNest, 32)}${spc}${wn(vil.deadLock, 33)}${slc}${wn(vil.silentForest, 32)}${spc}│`)
console.log(`│${spc}${wn(vil.sunsetSeashore, 41)}${spc}${wn(vil.wayden, 42)}${spc}${wn(vil.shriekPlains, 41)}${spc}${wn(vil.dracalNest, 42)}${spc}${wn(vil.deadLock, 42)}${spc}${wn(vil.silentForest, 41)}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${lilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.waydenTerrace, 12)}${spc}${wn(vil.leetenCheckpoint, 11)}${spc}${wn(vil.leeten, 12)}${spc}${wn(vil.vellir, 12)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.waydenTerrace, 23)}${slc}${wn(vil.leetenCheckpoint, 23)}${slc}${wn(vil.leeten, 24)}${slc}${wn(vil.vellir, 22)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.waydenTerrace, 33)}${slc}${wn(vil.leetenCheckpoint, 33)}${slc}${wn(vil.leeten, 34)}${slc}${wn(vil.vellir, 32)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${wn(vil.waydenTerrace, 41)}${spc}${wn(vil.leetenCheckpoint, 41)}${spc}${wn(vil.leeten, 41)}${spc}${wn(vil.vellir, 41)}${spc}${vilblankwwwwwwww}${spc}│`)
console.log(`│${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}${vilblankwwwwwwww}${spc}│`)
console.log("└" + "─".repeat(136) + "┘")