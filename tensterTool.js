const { anigiv, br, cl, checklv } = require("./func");
const { items } = require("./items");
const { monsters, fight } = require("./monsters");
const { skills, givskill } = require("./skills");
const { p1, Gdata } = require("./users-data");
const readlineSync = require("readline-sync");
const { vil } = require("./vil");
// const { Gdata } = require("./G-data");

const test = {
    tphone: {
        itemCode: "tphone",
        type: "tool",
        craft: false,
        char: "i3",
        itemName: "개발자의 도구",
        iteminfo: "원하는 몬스터와 전투를 할 수 있고 원하는 아이템을 꺼낼 수 있다.",
        itemDesc: "[사용시 주의사항! : 입력 코드에서 에러 방지가 없음]",
        price: 0,
        hav: 0,
        active() {
            let pi = ["몬스터 소환", "아이템 지급", "돈 지급", "스킬 습득", "레벨 설정", "전투중 표시 설정", "즉시 이동"];
            let loop = true
            while (loop) {
                cl()
                let pe = readlineSync.keyInSelect(pi, " > ", { cancel: "종료" }) + 1;
                switch (pe) {
                    case 1:
                        cl()
                        for (let i = 0; i < Object.keys(monsters).length; i++) {
                            console.log(i + ". " + monsters[Object.keys(monsters)[i]].name)
                        }
                        console.log("몬스터 선택")
                        br()
                        let mchoice = Number(readlineSync.question(" > "));
                        console.log("배율 설정")
                        br()
                        let bchoice = Number(readlineSync.question(" > "));
                        if (bchoice === 0) {
                            break;
                        }
                        fight(monsters[Object.keys(monsters)[mchoice]], bchoice)
                        break;
                    case 2:
                        cl()
                        for (let i2 = 0; i2 < Object.keys(items).length; i2++) {
                            console.log(i2 + ". " + items[Object.keys(items)[i2]].itemName)
                        }
                        console.log("아이템 선택")
                        br()
                        let tchoice = Number(readlineSync.question(" > "));
                        console.log("수량 설정")
                        br()
                        let cchoice = Number(readlineSync.question(" > "));
                        if (cchoice === 0) {
                            break;
                        }
                        anigiv(items[Object.keys(items)[tchoice]], cchoice, 0)
                        break;
                    case 3:
                        cl()
                        console.log("돈 지급 수량")
                        br()
                        let mo = Number(readlineSync.question(" > "));
                        p1.gold += mo
                        break;
                    case 4:
                        cl()
                        for (let i2 = 0; i2 < Object.keys(skills).length; i2++) {
                            console.log(i2 + ". " + skills[Object.keys(skills)[i2]].skillName)
                        }
                        console.log("스킬 선택")
                        br()
                        let skchoice = Number(readlineSync.question(" > "));

                        if (skchoice === -1) {
                            break;
                        }
                        givskill(skills[Object.keys(skills)[skchoice]])
                        break;
                    case 5:
                        cl()
                        console.log("레벨 입력")
                        br()
                        let eo = Number(readlineSync.question(" > "));
                        p1.lv = eo
                        break;
                    case 6:

                        let mi = true
                        while (mi) {
                            let md = [];
                            cl()
                            process.stdout.write("[ 내 버프 표시 : ")
                            if (p1.mode[0] === 1) {
                                process.stdout.write("ON ]")
                                md.push("OFF")
                            } else {
                                process.stdout.write("OFF ]")
                                md.push("ON")
                            }
                            br()
                            process.stdout.write("[ 내 스탯 표시 : ")
                            if (p1.mode[1] === 1) {
                                process.stdout.write("ON ]")
                                md.push("OFF")
                            } else {
                                process.stdout.write("OFF ]")
                                md.push("ON")
                            }
                            br()
                            process.stdout.write("[ 적 스탯 표시 : ")
                            if (p1.mode[2] === 1) {
                                process.stdout.write("ON ]")
                                md.push("OFF")
                            } else {
                                process.stdout.write("OFF ]")
                                md.push("ON")
                            }
                            br()
                            let mc = readlineSync.keyInSelect(md, " > ", { cancel: "뒤로" });
                            if (mc === -1) {
                                mi = false
                                break;
                            } else {
                                let don = 1
                                if (don === 1 && md[mc] === "ON") {
                                    p1.mode[mc] = 1
                                    don--
                                }
                                if (don === 1 && md[mc] === "OFF") {
                                    p1.mode[mc] = 0
                                    don--
                                }
                            }
                        }
                        break;
                    case 7:
                        cl()
                        for (let i2 = 0; i2 < Object.keys(vil).length; i2++) {
                            console.log(i2 + ". " + vil[Object.keys(vil)[i2]].name)
                        }
                        console.log("마을 선택")
                        br()
                        let tchoice2 = Number(readlineSync.question(" > "));
                        Gdata.nextVil = vil[Object.keys(vil)[tchoice2]]
                        loop = false
                        if (Gdata.ininv) {
                            Gdata.ininv = false
                        }
                        if (Gdata.finv) {
                            Gdata.finv = false
                        }
                        Gdata.invloci++

                        break;
                    case 0:
                        loop = false
                        break;
                }
            }

        },
    }
}
module.exports = {
    test
}