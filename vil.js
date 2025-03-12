const { default: chalk } = require("chalk");
const { rand, ckit, br, anitext, aniprt, checkQ, anigiv, cl, leadingZeros, SetUi, ckitcount, shuffle, wrtxt } = require("./func");
const readlineSync = require("readline-sync");
// const { Gdata } = require("./G-data");
const { monsters, fight, items } = require("./monsters");
const { npc, canuQ } = require("./npc");
const { quest } = require("./quest");
const { p1, Gdata } = require("./users-data");


//지역 데이터
const vil = {
    //마을 데이터

    zep: {
        id: "zep",
        type: "hunt",
        name: "스파르타 zep",
        char: "zep",
        monstersList: [monsters.zep_kh, monsters.zep_yh],
        // 돌발 몬스터 출현 확률
        dolbal: 0,
        near: ["proto"],
        looking(num) {
            let rd = rand(4)
            if (rd === 4) {
                fight(monsters.zep_kh, 1)
            } else if (rd === 3) {
                fight(monsters.zep_yh, 1)
            } else if (rd === 2) {
                fight(monsters.zep_js, 1)
            } else {
                fight(monsters.zep_tg, 1)
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },

    proto: {
        id: "proto",
        type: "vil",
        name: "프로토",
        char: "proto",
        slist: [npc.shopkeeper.potter],
        npcs: [npc.villager.seia, npc.villager.rumia],
        inn: [npc.inn.mido],
        near: ["wolvesFields"],

        specName: "플루토",
        special() {
            Gdata.nowtalk = "plt"
            checkQ()
            anitext('플루토로 향했다.', 0.1, "c", 2);
            function set() {
                SetUi("gb", "플루토", "yb", "plt");
            }

            let loop = true
            while (loop) {
                set();
                let plist = ["책 열람"];
                let blist = [books.test1, books.b0, books.b1];
                let bn = []
                for (let i = 0; i < blist.length; i++) {
                    bn.push(blist[i].name)
                }
                let pac = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pac) {
                    case 1:
                        set();
                        let pac = readlineSync.keyInSelect(bn, " > ", { cancel: "뒤로" });
                        let lop = true
                        let target
                        if (pac === -1) {
                            lop = false
                        } else {
                            target = blist[pac]
                            set();
                            anitext(`${target.name}   ${target.writeby}`, 0.01, "c", 1);
                            br()
                            anitext(`${target.info}`, 0.01, "c", 1);
                            br()
                            let pst = ["읽기"];
                            let pwc = readlineSync.keyInSelect(pst, " > ", { cancel: "뒤로" });
                            if (pwc === 0) {
                                anitext(`${target.name}을(를) 읽기로 하였다.`, 0.1, "c", 2);
                            } else {
                                lop = false
                            }
                        }
                        let nop = 1
                        while (lop) {
                            if (lop) {
                                Setbi(target.lcor, target.name, target.ncor)
                                target.open(nop)
                                sli(target.lcor)
                            }
                            let ct = []
                            let ctc = []
                            if (nop === 1) {
                                ct.push("[  . . .  ]")
                                ctc.push(0)
                            } else {
                                ct.push("[이전 페이지]")
                                ctc.push(1)
                            }
                            if (nop === target.page) {
                                ct.push("[  . . .  ]")
                                ctc.push(0)
                            } else {
                                ct.push("[다음 페이지]")
                                ctc.push(2)
                            }
                            let cct = readlineSync.keyInSelect(ct, " > ", { cancel: "[그만 읽기]" });
                            switch (ctc[cct]) {
                                case 0:
                                    break;
                                case 1:
                                    nop--
                                    break;
                                case 2:
                                    nop++
                                    break;
                                default:
                                    lop = false
                                    break;
                            }

                        }
                        break;
                    default:
                        loop = false
                        break;
                }
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    potain: {
        id: "potain",
        type: "vil",
        name: "포테인",
        char: "potain",
        slist: [npc.shopkeeper.spike],
        npcs: [npc.villager.anthony, npc.villager.friedrich],
        inn: [npc.inn.aru],
        near: ["wolvesForest", "highMount"],

        specName: "별탑",
        special() {
            Gdata.nowtalk = "buta"
            let onname = "별탑"
            checkQ()
            anitext('별탑으로 향했다.', 0.1, "c", 2);

            let loop = true
            while (loop) {
                SetUi("b", onname, "yb", "buta");
                plist = ["스킬 강화",];
                let inchoice;
                let inchoice2;
                let pac = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pac) {
                    case 1:
                        let skl = [];
                        for (let sln = 0; sln < p1.skill.length; sln++) {
                            skl.push("[ " + p1.skill[sln].skillName + " " + p1.skill[sln].skillLv + "/" + p1.skill[sln].skillMaxLv + " ]");
                        }
                        SetUi("b", onname, "yb", "buta");
                        let pcc = readlineSync.keyInSelect(skl, " > ", { cancel: "[ 뒤로 ]" });
                        SetUi("b", onname, "yb", "buta");
                        if (pcc === -1) {
                            break;
                        }
                        anitext(p1.skill[pcc].skillName, 0.01, "c", 0.01);
                        anitext("    Lv." + p1.skill[pcc].skillLv + "/" + p1.skill[pcc].skillMaxLv, 0.01, "y", 0.01);
                        br();
                        anitext(p1.skill[pcc].skillInfo, 0.01, "c", 0.01);
                        let pt = ["스킬 강화"]
                        let cc = readlineSync.keyInSelect(pt, " > ", { cancel: "떠나기" }) + 1;
                        if (cc === 0) {
                            break;
                        } else {
                            if (ckit(items.e22, 1)) {
                                if (p1.skill[pcc].skillLv < p1.skill[pcc].skillMaxLv) {
                                    anigiv(items.e22, -1, 0)
                                    p1.skill[pcc].skillLv++
                                    anitext("스킬을 강화했다.", 0.01, "c", 3);
                                } else {
                                    anitext("더 이상 강화 할 수 없다.", 0.01, "c", 3);
                                }
                            } else {
                                anitext("별의 조각이 부족하다.", 0.01, "c", 3);
                            }
                        }
                        break;

                    default:
                        loop = false
                        break;
                }
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    norden: {
        id: "norden",
        type: "vil",
        name: "노든",
        char: "norden",
        slist: [npc.shopkeeper.jms],
        npcs: [npc.villager.efa, npc.villager.bch],
        inn: [npc.inn.amelia],
        near: ["underMountHill"],

        specName: "국경",
        special() {
            anitext('아직 국경을 건널 수 없다..', 0.1, "c", 2);
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    kivotos: {
        id: "kivotos",
        type: "vil",
        name: "키보토스",
        char: "kivotos",
        slist: [npc.shopkeeper.bichon],
        npcs: [npc.villager.rbt, npc.villager.rene],
        inn: [npc.inn.rucy],
        near: ["luminousRealm", "broadField", "shriekPlains"],

        specName: "길드",
        special() {
            Gdata.nowtalk = "guild"
            let Qlt = [quest.guild_0, quest.guild_1, quest.guild_2, quest.guild_3, quest.main_4, quest.main_5]
            checkQ()
            SetUi("b", "길드", "gb", "guild");
            anitext('"어서오세요 모험가님!"', 0.1, "y", 2);
            let shopi = 1;
            while (shopi === 1) {
                SetUi("b", "길드", "gb", "guild");
                let toQ = 0
                let cQ = 0
                // 출처는 모르지만 완료 위치가 npc일 경우를 확인
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === "guild") {
                            toQ = 1
                        }
                    }
                }
                if (Qlt.length > 0) {
                    // npc의 퀘스트 리스트를 도는 for문
                    for (let i = 0; i < Qlt.length; i++) {
                        //레벨제한 조건확인
                        if (p1.lv >= Qlt[i].needLv) {
                            let ucan = 0
                            if (Qlt[i].needQ === "none") {
                                ucan = 1
                            } else {
                                if (p1.clearQuest.length > 0) {
                                    for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                        if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                            ucan = 1
                                        }
                                    }
                                }
                            }
                            if (ucan === 1) {
                                if (!Qlt[i].repeatable) {
                                    if (p1.clearQuest.length > 0) {
                                        let inq = 0
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                inq = 1
                                            }
                                        }
                                        if (inq === 0) {
                                            cQ = 1
                                        }
                                    } else {
                                        cQ = 1
                                    }
                                } else {
                                    cQ = 1
                                }
                            }
                        }
                    }
                }
                let plist
                SetUi("b", "길드", "gb", "guild");
                if (cQ === 1 || toQ === 1) {
                    plist = ["대화", "길드 퀘스트"];
                } else {
                    plist = ["대화"];
                }
                let pachoice = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pachoice) {
                    case 1:
                        SetUi("b", "길드", "gb", "guild");
                        let trand = rand(5);
                        if (trand === 1) {
                            anitext('"1-1"', 0.1, "y", 2);
                            br();
                            anitext('"1-2"', 0.1, "y", 2);
                        } else if (trand === 2) {
                            anitext('"2-1"', 0.1, "y", 1);
                            br();
                            anitext('"2-2"', 0.1, "y", 2);
                        } else if (trand === 3) {
                            anitext('"3-1"', 0.1, "y", 1);
                            br();
                            anitext('"3-2 ', 0.1, "y", 0.5);
                            anitext('3-3"', 0.1, "y", 2);
                        } else if (trand === 4) {
                            anitext('"4-1"', 0.1, "y", 1);
                            br();
                            anitext('"4-2"', 0.3, "y", 2);
                        } else {
                            anitext('"5-1"', 0.1, "y", 1);
                            br();
                            anitext('"5-2"', 0.1, "y", 2);
                        }
                        break;
                    case 2:
                        checkQ()
                        let Qli = []
                        let Qnum = []
                        let Qhow = []
                        let Qid = []
                        let minu = 0
                        if (Qlt.length > 0) {

                            //npc가 들고있는 퀘스트 배열 도는 for문
                            for (let i = 0; i < Qlt.length; i++) {
                                if (p1.lv >= Qlt[i].needLv) {
                                    let how = "[ 수행 가능 ]"
                                    let hhow = 0
                                    let yesq = -1
                                    let nono = 0
                                    if (Qlt[i].needQ === "none") {
                                        yesq = 1
                                    } else {
                                        //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                                yesq = 1
                                            }
                                        }
                                    }
                                    //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                                    if (!Qlt[i].repeatable) {
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                nono = 1
                                            }
                                        }
                                    }
                                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                        if (p1.nowQuest[ii].id === Qlt[i].id) {
                                            if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === "guild") {
                                                how = "[ 완료 가능 ]"
                                                hhow = 2
                                            } else {
                                                how = "[ 진행 중 ]"
                                                hhow = 1
                                            }
                                        }
                                    }
                                    if (yesq === 1 && nono === 0) {
                                        Qli.push(Qlt[i].name + how)
                                        Qnum.push(i)
                                        Qhow.push(hhow)
                                        Qid.push(Qlt[i].id)
                                    }
                                }
                            }
                        }
                        minu = Qnum.length
                        if (p1.nowQuest.length > 0) {
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].to === "guild" && p1.nowQuest[ii].from !== "guild") {
                                    let hop = "[ 진행 중 ]"
                                    let hhop = 1
                                    if (p1.nowQuest[ii].clear) {
                                        hop = "[ 완료 가능 ]"
                                        hhop = 2
                                    }
                                    Qli.push(p1.nowQuest[ii].name + hop)
                                    Qnum.push(ii)
                                    Qhow.push(hhop)
                                    Qid.push(p1.nowQuest[ii].id)
                                }
                            }
                        }
                        SetUi("b", "길드", "gb", "guild");
                        let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                        if (Qchoice > -1) {
                            SetUi("b", "길드", "gb", "guild")
                            if (Qhow[Qchoice] === 0) {
                                Qlt[Qnum[Qchoice]].talk()
                                SetUi("b", "길드", "gb", "guild");
                                canuQ(Qlt[Qnum[Qchoice]])
                            } else if (Qhow[Qchoice] === 1) {
                                anitext("아직 퀘스트를 완료하지 못했다.", 0.1, "c", 2);
                            } else if (Qhow[Qchoice] === 2) { // 마저 작성해

                                let zero = 0
                                if (Qchoice >= minu) {
                                    zero = minu
                                }
                                for (let iti = 0; iti < p1.nowQuest.length; iti++) {
                                    if (p1.nowQuest[iti].id === Qid[Qchoice]) {
                                        if (p1.nowQuest[iti].complete()) {
                                            let wichi = true
                                            for (let chee = 0; chee < p1.clearQuest.length; chee++) {
                                                if (p1.clearQuest[chee].id === p1.nowQuest[iti].id) {
                                                    p1.clearQuest[chee].clearCount++
                                                    wichi = false
                                                }
                                            }
                                            if (wichi) {
                                                let today = new Date()
                                                var year = (leadingZeros(today.getFullYear(), 4))
                                                var month = (leadingZeros(today.getMonth() + 1, 2))
                                                var date = (leadingZeros(today.getDate(), 2))
                                                var hours = ('0' + today.getHours()).slice(-2);
                                                var minutes = ('0' + today.getMinutes()).slice(-2);

                                                p1.nowQuest[iti].cleardate = year + "년 " + month + "월 " + date + "일 " + hours + '시 ' + minutes + '분'
                                                // p1.nowQuest[Qnum[Qchoice]].clearCount++
                                                p1.clearQuest.push({ ...p1.nowQuest[iti] })
                                            }
                                            p1.nowQuest.splice(iti, 1)
                                        }
                                    }
                                }

                            } else {
                                anitext("여기는 에러", 0.1, "c", 2);
                            }

                            SetUi("b", "길드", "gb", "guild");
                        }
                        break;
                    case 0:
                        SetUi("b", "길드", "gb", "guild");
                        anitext('"행운을 빕니다!"', 0.1, "y", 2);
                        shopi--
                        break;
                    default:
                        anitext("여기는 에러", 0.1, "c", 2);
                        break;
                }

            }
            Gdata.nowtalk = ""

        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    wayden: {
        id: "wayden",
        type: "vil",
        name: "웨이든",
        char: "wayden",
        slist: [npc.shopkeeper.pria, npc.shopkeeper.amr],
        npcs: [npc.villager.alice],
        inn: [npc.inn.camilla],
        near: ["broadField", "waydenTerrace"],

        specName: "헌트디시",
        special() {
            Gdata.nowtalk = "chef"
            let onname = "헌트디시"
            let Qlt = []
            let flt = [items.chefbook, items.i9, items.e21]
            let make = []
            let mqli = []
            // for (let i2 = 0; i2 < Object.keys(items).length; i2++) {
            //     if (items[Object.keys(items)[i2]].type === "food" && items[Object.keys(items)[i2]].craft) {
            //         let target2 = items[Object.keys(items)[i2]]
            //         let sttop = true
            //         let acc = 0
            //         while (sttop) {
            //             acc++
            //             // 1
            //             for (let ckmax = 0; ckmax < target2.need.length; ckmax++) {
            //                 if (ckit(items[target2.need[ckmax]], (target2.needCount[ckmax] * acc))) {
            //                     // anitext("보이면 에러", 0.01, "c", 3);
            //                 } else {
            //                     sttop = false
            //                     acc--
            //                     // anitext("> " + abc + " <", 0.01, "c", 3);
            //                     break
            //                 }
            //             }
            //         }
            //         let how2 = "  [요리 가능]  "
            //         if (acc === 0) {
            //             how2 = "  [재료 부족]  "
            //         }
            //         mqli.push(items[Object.keys(items)[i2]].itemName + how2)
            //         make.push(items[Object.keys(items)[i2]])
            //     }
            // }
            checkQ()
            SetUi("mb", onname, "yb", "chef");
            anitext('"맛있는 요리는 이곳에서!"', 0.1, "y", 2);
            let shopi = 1;
            while (shopi === 1) {
                SetUi("mb", onname, "yb", "chef");
                let toQ = 0
                let cQ = 0
                // 출처는 모르지만 완료 위치가 npc일 경우를 확인
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === "chef") {
                            toQ = 1
                        }
                    }
                }
                if (Qlt.length > 0) {
                    // npc의 퀘스트 리스트를 도는 for문
                    for (let i = 0; i < Qlt.length; i++) {
                        //레벨제한 조건확인
                        if (p1.lv >= Qlt[i].needLv) {
                            let ucan = 0
                            if (Qlt[i].needQ === "none") {
                                ucan = 1
                            } else {
                                if (p1.clearQuest.length > 0) {
                                    for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                        if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                            ucan = 1
                                        }
                                    }
                                }
                            }
                            if (ucan === 1) {
                                if (!Qlt[i].repeatable) {
                                    if (p1.clearQuest.length > 0) {
                                        let inq = 0
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                inq = 1
                                            }
                                        }
                                        if (inq === 0) {
                                            cQ = 1
                                        }
                                    } else {
                                        cQ = 1
                                    }
                                } else {
                                    cQ = 1
                                }
                            }
                        }
                    }
                }
                let plist
                SetUi("mb", onname, "yb", "chef");
                if (cQ === 1 || toQ === 1) {
                    plist = ["음식 구매", "요리", "대화", "퀘스트"];
                } else {
                    plist = ["음식 구매", "요리", "대화"];
                }
                let inchoice;
                let inchoice2;
                let pachoice = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pachoice) {
                    case 1:
                        SetUi("mb", onname, "yb", "chef");
                        anitext('"어떤 메뉴로 하시겠습니까?"', 0.1, "y", 2);
                        SetUi("mb", onname, "yb", "chef");
                        let ii = 0;
                        while (ii === 0) {
                            let back = 0;
                            let aa = 0;
                            while (aa === 0) {
                                process.stdout.write(chalk.white("0. 뒤로가기    "));
                                for (let i1 = 0; i1 < flt.length; i1++) {
                                    if (i1 % 2 == 1) {
                                        br();
                                    }
                                    process.stdout.write(chalk.white(i1 + 1 + ". " + flt[i1].itemName + " " + flt[i1].price + "G    "));
                                }
                                br();
                                inchoice = Number(readlineSync.question(" > "));
                                if (inchoice <= flt.length && inchoice > 0) {
                                    aa++;
                                } else if (inchoice === 0) {
                                    back++;
                                    aa++;
                                    ii++;
                                } else {
                                    anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                    SetUi("mb", onname, "yb", "chef");
                                }
                            }
                            if (back === 0) {
                                let max
                                if (flt[inchoice - 1].type === "potion" || flt[inchoice - 1].type === "etc") {
                                    max = 100
                                } else {
                                    max = 1
                                }
                                SetUi("mb", onname, "yb", "chef");
                                anitext(flt[inchoice - 1].itemName, 0.01, "c", 0.5);
                                anitext("    " + flt[inchoice - 1].price + "G", 0.01, "y", 1);
                                br();
                                anitext(flt[inchoice - 1].iteminfo, 0.01, "c", 0.5);
                                br();
                                anitext(flt[inchoice - 1].itemDesc, 0.01, "c", 0.5);
                                br();
                                anitext("최대 " + max + "개씩 구매 가능", 0.01, "c", 0.5);
                                br();

                                inchoice2 = Number(readlineSync.question("구매 수량 > "));
                                aa = 0;
                                let requ = 0;
                                while (aa === 0) {

                                    if (inchoice2 > 0 && inchoice2 <= max) {
                                        if (inchoice2 * flt[inchoice - 1].price > p1.gold) {
                                            anitext("그만큼 사기엔 돈이 모자르다..", 0.1, "c", 3);
                                            requ = 1;
                                        } else {
                                            aa++;
                                            if (anigiv(items[flt[inchoice - 1].itemCode], inchoice2, 0) === 1) {
                                                p1.gold -= inchoice2 * flt[inchoice - 1].price;
                                                anitext('"맛있게 즐겨주세요!"', 0.1, "y", 2);
                                            }
                                            SetUi("mb", onname, "yb", "chef");
                                        }
                                    } else if (inchoice2 === 0) {
                                        aa++;
                                        SetUi("mb", onname, "yb", "chef");
                                    } else if (inchoice2 > max) {
                                        anitext("그러기엔 너무 많은 양이다.", 0.1, "c", 3);
                                        requ = 1;
                                    } else {
                                        anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                        requ = 1;
                                    }
                                    if (requ === 1) {
                                        SetUi("mb", onname, "yb", "chef");
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].itemName));
                                        process.stdout.write(chalk.yellow("    " + flt[inchoice - 1].price + "G"));
                                        br();
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].iteminfo));
                                        br();
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].itemDesc));
                                        br();
                                        process.stdout.write(chalk.cyan("최대 " + max + "개씩 구매 가능"));
                                        br();
                                        inchoice2 = Number(readlineSync.question("구매 수량 > "));
                                        requ = 0;
                                    }
                                }
                            }
                        }

                        break;
                    case 2:
                        SetUi("mb", onname, "yb", "chef");
                        anitext('"요리는 언제나 즐겁죠!"', 0.1, "y", 2);

                        mqli = []
                        make = []
                        for (let i2 = 0; i2 < Object.keys(items).length; i2++) {
                            if (items[Object.keys(items)[i2]].type === "food" && items[Object.keys(items)[i2]].craft) {
                                let target2 = items[Object.keys(items)[i2]]
                                let sttop = true
                                let acc = 0
                                while (sttop) {
                                    acc++
                                    // 1
                                    for (let ckmax = 0; ckmax < target2.need.length; ckmax++) {
                                        if (ckit(items[target2.need[ckmax]], (target2.needCount[ckmax] * acc))) {
                                            // anitext("보이면 에러", 0.01, "c", 3);
                                        } else {
                                            sttop = false
                                            acc--
                                            // anitext("> " + abc + " <", 0.01, "c", 3);
                                            break
                                        }
                                    }
                                }
                                let how2 = "  [요리 가능]  "
                                if (acc === 0) {
                                    how2 = "  [재료 부족]  "
                                }
                                mqli.push(items[Object.keys(items)[i2]].itemName + how2)
                                make.push(items[Object.keys(items)[i2]])
                            }
                        }

                        let ii2 = 0;
                        while (ii2 === 0) {
                            let back = 0;
                            let aa = 0;
                            while (aa === 0) {
                                SetUi("mb", onname, "yb", "chef");
                                process.stdout.write(chalk.white("0. 뒤로가기    "));
                                for (let i1 = 0; i1 < mqli.length; i1++) {
                                    if (i1 % 2 == 1) {
                                        br();
                                    }
                                    process.stdout.write(chalk.white(i1 + 1 + ". " + mqli[i1]));
                                }
                                br();
                                inchoice = Number(readlineSync.question(" > "));
                                if (inchoice <= mqli.length && inchoice > 0) {
                                    aa++;
                                } else if (inchoice === 0) {
                                    back++;
                                    aa++;
                                    ii2++;
                                } else {
                                    anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                    SetUi("mb", onname, "yb", "chef");
                                }
                            }
                            if (back === 0) {
                                let target = make[inchoice - 1]
                                let stop = true
                                let abc = 0
                                while (stop) {
                                    abc++
                                    // 1
                                    for (let ckmax = 0; ckmax < target.need.length; ckmax++) {
                                        if (ckit(items[target.need[ckmax]], (target.needCount[ckmax] * abc))) {

                                        } else {
                                            stop = false
                                            abc--
                                            break
                                        }
                                    }
                                }
                                SetUi("mb", onname, "yb", target.char);
                                anitext(mqli[inchoice - 1], 0.01, "c", 0.5);
                                br();
                                anitext(target.iteminfo, 0.01, "c", 0.5);
                                br();
                                anitext(target.itemDesc, 0.01, "c", 0.5);
                                br();
                                for (let icic = 0; icic < target.need.length; icic++) {
                                    anitext(items[target.need[icic]].itemName + "  " + ckitcount(items[target.need[icic]]) + " / " + target.needCount[icic], 0.01, "c", 0.05);
                                    br();
                                }
                                br();
                                aa = 0;
                                if (abc >= 1) {
                                    anitext("최대 " + abc + "개 요리 가능", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("요리 수량 > "));
                                } else {
                                    anitext("재료가 부족하다.", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("뒤로 > "));
                                    inchoice2 = 0
                                    aa++
                                }


                                let requ = 0;
                                while (aa === 0) {

                                    if (inchoice2 > 0 && inchoice2 <= abc) {
                                        for (let icic = 0; icic < target.need.length; icic++) {
                                            anigiv(items[target.need[icic]], (target.needCount[icic] * inchoice2 * -1), 0)
                                        }
                                        anigiv(target, inchoice2)
                                        anitext("요리를 만들었다.", 0.1, "c", 3);
                                        aa++;
                                        SetUi("mb", onname, "yb", "chef");
                                    } else if (inchoice2 === 0) {
                                        aa++;
                                        SetUi("mb", onname, "yb", "chef");
                                    } else if (inchoice2 > abc) {
                                        anitext("그러기엔 재료가 부족하다.", 0.1, "c", 3);
                                        requ = 1;
                                    } else {
                                        anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                        requ = 1;
                                    }
                                    if (requ === 1) {
                                        SetUi("mb", onname, "yb", target.char);
                                        process.stdout.write(chalk.cyan(mqli[inchoice - 1]));
                                        br();
                                        process.stdout.write(chalk.cyan(target.iteminfo));
                                        br();
                                        process.stdout.write(chalk.cyan(target.itemDesc));
                                        br();
                                        for (let icic = 0; icic < target.need.length; icic++) {
                                            process.stdout.write(chalk.cyan(items[target.need[icic]].itemName + "  " + ckitcount(items[target.need[icic]]) + " / " + target.needCount[icic]));
                                            br();
                                        }
                                        br();
                                        if (abc >= 1) {
                                            process.stdout.write(chalk.cyan("최대 " + abc + "개 요리 가능"));
                                            br();
                                            inchoice2 = Number(readlineSync.question("요리 수량 > "));
                                        } else {
                                            process.stdout.write(chalk.cyan("재료가 부족하다."));
                                            br();
                                            inchoice2 = Number(readlineSync.question("뒤로 > "));
                                            aa++
                                        }
                                        br();
                                        requ = 0;
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        SetUi("mb", onname, "yb", "chef");
                        let trand = rand(5);
                        if (trand === 1) {
                            anitext('"1-1"', 0.1, "y", 2);
                            br();
                            anitext('"1-2"', 0.1, "y", 2);
                        } else if (trand === 2) {
                            anitext('"2-1"', 0.1, "y", 1);
                            br();
                            anitext('"2-2"', 0.1, "y", 2);
                        } else if (trand === 3) {
                            anitext('"3-1"', 0.1, "y", 1);
                            br();
                            anitext('"3-2 ', 0.1, "y", 0.5);
                            anitext('3-3"', 0.1, "y", 2);
                        } else if (trand === 4) {
                            anitext('"4-1"', 0.1, "y", 1);
                            br();
                            anitext('"4-2"', 0.3, "y", 2);
                        } else {
                            anitext('"5-1"', 0.1, "y", 1);
                            br();
                            anitext('"5-2"', 0.1, "y", 2);
                        }
                        break;
                    case 4:
                        checkQ()
                        let Qli = []
                        let Qnum = []
                        let Qhow = []
                        let Qid = []
                        let minu = 0
                        if (Qlt.length > 0) {

                            //npc가 들고있는 퀘스트 배열 도는 for문
                            for (let i = 0; i < Qlt.length; i++) {
                                if (p1.lv >= Qlt[i].needLv) {
                                    let how = "[ 수행 가능 ]"
                                    let hhow = 0
                                    let yesq = -1
                                    let nono = 0
                                    if (Qlt[i].needQ === "none") {
                                        yesq = 1
                                    } else {
                                        //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                                yesq = 1
                                            }
                                        }
                                    }
                                    //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                                    if (!Qlt[i].repeatable) {
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                nono = 1
                                            }
                                        }
                                    }
                                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                        if (p1.nowQuest[ii].id === Qlt[i].id) {
                                            if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === "chef") {
                                                how = "[ 완료 가능 ]"
                                                hhow = 2
                                            } else {
                                                how = "[ 진행 중 ]"
                                                hhow = 1
                                            }
                                        }
                                    }
                                    if (yesq === 1 && nono === 0) {
                                        Qli.push(Qlt[i].name + how)
                                        Qnum.push(i)
                                        Qhow.push(hhow)
                                        Qid.push(Qlt[i].id)
                                    }
                                }
                            }
                        }
                        minu = Qnum.length
                        if (p1.nowQuest.length > 0) {
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].to === "chef" && p1.nowQuest[ii].from !== "chef") {
                                    let hop = "[ 진행 중 ]"
                                    let hhop = 1
                                    if (p1.nowQuest[ii].clear) {
                                        hop = "[ 완료 가능 ]"
                                        hhop = 2
                                    }
                                    Qli.push(p1.nowQuest[ii].name + hop)
                                    Qnum.push(ii)
                                    Qhow.push(hhop)
                                    Qid.push(p1.nowQuest[ii].id)
                                }
                            }
                        }
                        SetUi("mb", onname, "yb", "chef");
                        let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                        if (Qchoice > -1) {
                            SetUi("mb", onname, "yb", "chef");
                            if (Qhow[Qchoice] === 0) {
                                Qlt[Qnum[Qchoice]].talk()
                                SetUi("mb", onname, "yb", "chef");
                                canuQ(Qlt[Qnum[Qchoice]])
                            } else if (Qhow[Qchoice] === 1) {
                                anitext("아직 퀘스트를 완료하지 못했다.", 0.1, "c", 2);
                            } else if (Qhow[Qchoice] === 2) { // 마저 작성해

                                let zero = 0
                                if (Qchoice >= minu) {
                                    zero = minu
                                }
                                for (let iti = 0; iti < p1.nowQuest.length; iti++) {
                                    if (p1.nowQuest[iti].id === Qid[Qchoice]) {
                                        if (p1.nowQuest[iti].complete()) {
                                            let wichi = true
                                            for (let chee = 0; chee < p1.clearQuest.length; chee++) {
                                                if (p1.clearQuest[chee].id === p1.nowQuest[iti].id) {
                                                    p1.clearQuest[chee].clearCount++
                                                    wichi = false
                                                }
                                            }
                                            if (wichi) {
                                                let today = new Date()
                                                var year = (leadingZeros(today.getFullYear(), 4))
                                                var month = (leadingZeros(today.getMonth() + 1, 2))
                                                var date = (leadingZeros(today.getDate(), 2))
                                                var hours = ('0' + today.getHours()).slice(-2);
                                                var minutes = ('0' + today.getMinutes()).slice(-2);

                                                p1.nowQuest[iti].cleardate = year + "년 " + month + "월 " + date + "일 " + hours + '시 ' + minutes + '분'
                                                // p1.nowQuest[Qnum[Qchoice]].clearCount++
                                                p1.clearQuest.push({ ...p1.nowQuest[iti] })
                                            }
                                            p1.nowQuest.splice(iti, 1)
                                        }
                                    }
                                }

                            } else {
                                anitext("여기는 에러", 0.1, "c", 2);
                            }

                            SetUi("mb", onname, "yb", "chef");
                        }
                        break;
                    case 0:
                        SetUi("mb", onname, "yb", "chef");
                        anitext('"행운을 빕니다!"', 0.1, "y", 2);
                        shopi--
                        break;
                    default:
                        anitext("여기는 에러", 0.1, "c", 2);
                        break;
                }

            }
            Gdata.nowtalk = ""

        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    leeten: {
        id: "leeten",
        type: "vil",
        name: "리튼",
        char: "leeten",
        slist: [npc.shopkeeper.wiz],
        npcs: [npc.villager.baba, npc.villager.zef],
        inn: [npc.inn.luna],
        near: ["leetenCheckpoint", "dracalNest"],

        specName: "대장간",
        special() {
            Gdata.nowtalk = "smith"
            let onname = "대장간"
            let Qlt = []
            let flt = [items.e12, items.e13, items.e14, items.e15, items.e16,]
            let make = []
            let mqli = []
            let canlist = [items.cak0, items.chk0, items.csk0, items.cgk0]

            checkQ()
            SetUi("mb", onname, "yb", "smith");
            anitext('"특수한 장비가 필요한가!"', 0.1, "y", 2);
            let shopi = 1;
            while (shopi === 1) {
                SetUi("mb", onname, "yb", "smith");
                let toQ = 0
                let cQ = 0
                // 출처는 모르지만 완료 위치가 npc일 경우를 확인
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === "smith") {
                            toQ = 1
                        }
                    }
                }
                if (Qlt.length > 0) {
                    // npc의 퀘스트 리스트를 도는 for문
                    for (let i = 0; i < Qlt.length; i++) {
                        //레벨제한 조건확인
                        if (p1.lv >= Qlt[i].needLv) {
                            let ucan = 0
                            if (Qlt[i].needQ === "none") {
                                ucan = 1
                            } else {
                                if (p1.clearQuest.length > 0) {
                                    for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                        if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                            ucan = 1
                                        }
                                    }
                                }
                            }
                            if (ucan === 1) {
                                if (!Qlt[i].repeatable) {
                                    if (p1.clearQuest.length > 0) {
                                        let inq = 0
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                inq = 1
                                            }
                                        }
                                        if (inq === 0) {
                                            cQ = 1
                                        }
                                    } else {
                                        cQ = 1
                                    }
                                } else {
                                    cQ = 1
                                }
                            }
                        }
                    }
                }
                let plist
                SetUi("mb", onname, "yb", "smith");
                if (cQ === 1 || toQ === 1) {
                    plist = ["상점 이용", "장비 제작", "대화", "퀘스트"];
                } else {
                    plist = ["상점 이용", "장비 제작", "대화"];
                }
                let inchoice;
                let inchoice2;
                let pachoice = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pachoice) {
                    case 1:
                        SetUi("mb", onname, "yb", "smith");
                        anitext('"필요한 물건이 있는 모양이군"', 0.1, "y", 2);
                        SetUi("mb", onname, "yb", "smith");
                        let ii = 0;
                        while (ii === 0) {
                            let back = 0;
                            let aa = 0;
                            while (aa === 0) {
                                process.stdout.write(chalk.white("0. 뒤로가기    "));
                                for (let i1 = 0; i1 < flt.length; i1++) {
                                    if (i1 % 2 == 1) {
                                        br();
                                    }
                                    process.stdout.write(chalk.white(i1 + 1 + ". " + flt[i1].itemName + " " + flt[i1].price + "G    "));
                                }
                                br();
                                inchoice = Number(readlineSync.question(" > "));
                                if (inchoice <= flt.length && inchoice > 0) {
                                    aa++;
                                } else if (inchoice === 0) {
                                    back++;
                                    aa++;
                                    ii++;
                                } else {
                                    anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                    SetUi("mb", onname, "yb", "smith");
                                }
                            }
                            if (back === 0) {
                                let max
                                if (flt[inchoice - 1].type === "potion" || flt[inchoice - 1].type === "etc") {
                                    max = 100
                                } else {
                                    max = 1
                                }
                                SetUi("mb", onname, "yb", "smith");
                                anitext(flt[inchoice - 1].itemName, 0.01, "c", 0.5);
                                anitext("    " + flt[inchoice - 1].price + "G", 0.01, "y", 1);
                                br();
                                anitext(flt[inchoice - 1].iteminfo, 0.01, "c", 0.5);
                                br();
                                anitext(flt[inchoice - 1].itemDesc, 0.01, "c", 0.5);
                                br();
                                anitext("최대 " + max + "개씩 구매 가능", 0.01, "c", 0.5);
                                br();

                                inchoice2 = Number(readlineSync.question("구매 수량 > "));
                                aa = 0;
                                let requ = 0;
                                while (aa === 0) {

                                    if (inchoice2 > 0 && inchoice2 <= max) {
                                        if (inchoice2 * flt[inchoice - 1].price > p1.gold) {
                                            anitext("그만큼 사기엔 돈이 모자르다..", 0.1, "c", 3);
                                            requ = 1;
                                        } else {
                                            aa++;
                                            if (anigiv(items[flt[inchoice - 1].itemCode], inchoice2, 0) === 1) {
                                                p1.gold -= inchoice2 * flt[inchoice - 1].price;
                                                anitext('"잘 사용하게나"', 0.1, "y", 2);
                                            }
                                            SetUi("mb", onname, "yb", "smith");
                                        }
                                    } else if (inchoice2 === 0) {
                                        aa++;
                                        SetUi("mb", onname, "yb", "smith");
                                    } else if (inchoice2 > max) {
                                        anitext("그러기엔 너무 많은 양이다.", 0.1, "c", 3);
                                        requ = 1;
                                    } else {
                                        anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                        requ = 1;
                                    }
                                    if (requ === 1) {
                                        SetUi("mb", onname, "yb", "smith");
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].itemName));
                                        process.stdout.write(chalk.yellow("    " + flt[inchoice - 1].price + "G"));
                                        br();
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].iteminfo));
                                        br();
                                        process.stdout.write(chalk.cyan(flt[inchoice - 1].itemDesc));
                                        br();
                                        process.stdout.write(chalk.cyan("최대 " + max + "개씩 구매 가능"));
                                        br();
                                        inchoice2 = Number(readlineSync.question("구매 수량 > "));
                                        requ = 0;
                                    }
                                }
                            }
                        }

                        break;
                    case 2:
                        SetUi("mb", onname, "yb", "smith");
                        anitext('"장비 제작 의뢰인가?"', 0.1, "y", 2);
                        mqli = []
                        make = []
                        for (let i2 = 0; i2 < canlist.length; i2++) {
                            let go = false
                            if (canlist[i2].type === "hat" || canlist[i2].type === "armor" || canlist[i2].type === "shoes" || canlist[i2].type === "gloves" || canlist[i2].type === "pendant" || canlist[i2].type === "wepon") {
                                go = true
                            }
                            if (canlist[i2].craft && go) {
                                let target2 = canlist[i2]
                                let sttop = true
                                let aac = 0
                                while (sttop) {
                                    aac++
                                    // 1
                                    for (let ckmax = 0; ckmax < target2.need.length; ckmax++) {
                                        if (ckit(items[target2.need[ckmax]], (target2.needCount[ckmax] * aac))) {
                                            // anitext("보이면 에러", 0.01, "c", 3);
                                        } else {
                                            sttop = false
                                            aac--
                                            // anitext("> " + abc + " <", 0.01, "c", 3);
                                            break
                                        }
                                    }
                                }
                                let how2 = "  [제작 가능]  "
                                if (aac === 0) {
                                    how2 = "  [재료 부족]  "
                                }
                                mqli.push(canlist[i2].itemName + how2)
                                make.push(canlist[i2])

                            }
                        }
                        let ii2 = 0;
                        while (ii2 === 0) {
                            let back = 0;
                            let aa = 0;
                            while (aa === 0) {
                                SetUi("mb", onname, "yb", "smith");
                                process.stdout.write(chalk.white("0. 뒤로가기    "));
                                for (let i1 = 0; i1 < mqli.length; i1++) {
                                    if (i1 % 2 == 1) {
                                        br();
                                    }
                                    process.stdout.write(chalk.white(i1 + 1 + ". " + mqli[i1]));
                                }
                                br();
                                inchoice = Number(readlineSync.question(" > "));
                                if (inchoice <= mqli.length && inchoice > 0) {
                                    aa++;
                                } else if (inchoice === 0) {
                                    back++;
                                    aa++;
                                    ii2++;
                                } else {
                                    anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                    SetUi("mb", onname, "yb", "smith");
                                }
                            }
                            if (back === 0) {
                                let target = make[inchoice - 1]
                                let stop = true
                                let abc = 0
                                while (stop) {
                                    abc++
                                    // 1
                                    for (let ckmax = 0; ckmax < target.need.length; ckmax++) {
                                        if (ckit(items[target.need[ckmax]], (target.needCount[ckmax] * abc))) {
                                            // anitext("보이면 에러", 0.01, "c", 3);
                                        } else {
                                            stop = false
                                            abc--
                                            // anitext("> " + abc + " <", 0.01, "c", 3);
                                            break
                                        }
                                    }
                                }
                                if (abc >= 1) {
                                    abc = 1
                                }
                                SetUi("mb", onname, "yb", target.char);
                                anitext(mqli[inchoice - 1], 0.01, "c", 0.5);
                                br();
                                anitext(target.iteminfo, 0.01, "c", 0.5);
                                br();
                                anitext(target.itemDesc, 0.01, "c", 0.5);
                                br();
                                for (let icic = 0; icic < target.need.length; icic++) {
                                    anitext(items[target.need[icic]].itemName + "  " + ckitcount(items[target.need[icic]]) + " / " + target.needCount[icic], 0.01, "c", 0.05);
                                    br();
                                }
                                br();
                                aa = 0;
                                if (abc >= 1) {
                                    // anitext(abc + "제작 가능", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("(0.취소 / 1.제작) > "));
                                } else {
                                    anitext("재료가 부족하다.", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("뒤로 > "));
                                    inchoice2 = 0
                                }


                                let requ = 0;
                                while (aa === 0) {

                                    if (inchoice2 === 1) {
                                        for (let icic = 0; icic < target.need.length; icic++) {
                                            anigiv(items[target.need[icic]], (target.needCount[icic] * inchoice2 * -1), 0)
                                        }
                                        anigiv(target, inchoice2)
                                        anitext("징비를 제작했다.", 0.1, "c", 3);
                                        aa++;
                                        SetUi("mb", onname, "yb", "smith");
                                    } else if (inchoice2 === 0) {
                                        aa++;
                                        SetUi("mb", onname, "yb", "smith");
                                    } else {
                                        anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                        requ = 1;
                                    }
                                    if (requ === 1) {
                                        SetUi("mb", onname, "yb", target.char);
                                        process.stdout.write(chalk.cyan(mqli[inchoice - 1]));
                                        br();
                                        process.stdout.write(chalk.cyan(target.iteminfo));
                                        br();
                                        process.stdout.write(chalk.cyan(target.itemDesc));
                                        br();
                                        for (let icic = 0; icic < target.need.length; icic++) {
                                            process.stdout.write(chalk.cyan(items[target.need[icic]].itemName + "  " + ckitcount(items[target.need[icic]]) + " / " + target.needCount[icic]));
                                            br();
                                        }
                                        if (abc >= 1) {
                                            // process.stdout.write(chalk.cyan("제작 가능"))
                                            br();
                                            br();
                                            inchoice2 = Number(readlineSync.question("(0.취소 / 1.제작) > "));
                                        } else {
                                            process.stdout.write(chalk.cyan("재료가 부족하다."))
                                            br();
                                            br();
                                            inchoice2 = Number(readlineSync.question("뒤로 > "));
                                            inchoice2 = 0
                                        }
                                        br();
                                        requ = 0;
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        SetUi("mb", onname, "yb", "smith");
                        let trand = rand(5);
                        if (trand === 1) {
                            anitext('"1-1"', 0.1, "y", 2);
                            br();
                            anitext('"1-2"', 0.1, "y", 2);
                        } else if (trand === 2) {
                            anitext('"2-1"', 0.1, "y", 1);
                            br();
                            anitext('"2-2"', 0.1, "y", 2);
                        } else if (trand === 3) {
                            anitext('"3-1"', 0.1, "y", 1);
                            br();
                            anitext('"3-2 ', 0.1, "y", 0.5);
                            anitext('3-3"', 0.1, "y", 2);
                        } else if (trand === 4) {
                            anitext('"4-1"', 0.1, "y", 1);
                            br();
                            anitext('"4-2"', 0.3, "y", 2);
                        } else {
                            anitext('"5-1"', 0.1, "y", 1);
                            br();
                            anitext('"5-2"', 0.1, "y", 2);
                        }
                        break;
                    case 4:
                        checkQ()
                        let Qli = []
                        let Qnum = []
                        let Qhow = []
                        let Qid = []
                        let minu = 0
                        if (Qlt.length > 0) {

                            //npc가 들고있는 퀘스트 배열 도는 for문
                            for (let i = 0; i < Qlt.length; i++) {
                                if (p1.lv >= Qlt[i].needLv) {
                                    let how = "[ 수행 가능 ]"
                                    let hhow = 0
                                    let yesq = -1
                                    let nono = 0
                                    if (Qlt[i].needQ === "none") {
                                        yesq = 1
                                    } else {
                                        //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].needQ) {
                                                yesq = 1
                                            }
                                        }
                                    }
                                    //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                                    if (!Qlt[i].repeatable) {
                                        for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                            if (p1.clearQuest[ii].id === Qlt[i].id) {
                                                nono = 1
                                            }
                                        }
                                    }
                                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                        if (p1.nowQuest[ii].id === Qlt[i].id) {
                                            if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === "smith") {
                                                how = "[ 완료 가능 ]"
                                                hhow = 2
                                            } else {
                                                how = "[ 진행 중 ]"
                                                hhow = 1
                                            }
                                        }
                                    }
                                    if (yesq === 1 && nono === 0) {
                                        Qli.push(Qlt[i].name + how)
                                        Qnum.push(i)
                                        Qhow.push(hhow)
                                        Qid.push(Qlt[i].id)
                                    }
                                }
                            }
                        }
                        minu = Qnum.length
                        if (p1.nowQuest.length > 0) {
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].to === "smith" && p1.nowQuest[ii].from !== "smith") {
                                    let hop = "[ 진행 중 ]"
                                    let hhop = 1
                                    if (p1.nowQuest[ii].clear) {
                                        hop = "[ 완료 가능 ]"
                                        hhop = 2
                                    }
                                    Qli.push(p1.nowQuest[ii].name + hop)
                                    Qnum.push(ii)
                                    Qhow.push(hhop)
                                    Qid.push(p1.nowQuest[ii].id)
                                }
                            }
                        }
                        SetUi("mb", onname, "yb", "smith");
                        let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                        if (Qchoice > -1) {
                            SetUi("mb", onname, "yb", "smith");
                            if (Qhow[Qchoice] === 0) {
                                Qlt[Qnum[Qchoice]].talk()
                                SetUi("mb", onname, "yb", "smith");
                                canuQ(Qlt[Qnum[Qchoice]])
                            } else if (Qhow[Qchoice] === 1) {
                                anitext("아직 퀘스트를 완료하지 못했다.", 0.1, "c", 2);
                            } else if (Qhow[Qchoice] === 2) { // 마저 작성해

                                let zero = 0
                                if (Qchoice >= minu) {
                                    zero = minu
                                }
                                for (let iti = 0; iti < p1.nowQuest.length; iti++) {
                                    if (p1.nowQuest[iti].id === Qid[Qchoice]) {
                                        if (p1.nowQuest[iti].complete()) {
                                            let wichi = true
                                            for (let chee = 0; chee < p1.clearQuest.length; chee++) {
                                                if (p1.clearQuest[chee].id === p1.nowQuest[iti].id) {
                                                    p1.clearQuest[chee].clearCount++
                                                    wichi = false
                                                }
                                            }
                                            if (wichi) {
                                                let today = new Date()
                                                var year = (leadingZeros(today.getFullYear(), 4))
                                                var month = (leadingZeros(today.getMonth() + 1, 2))
                                                var date = (leadingZeros(today.getDate(), 2))
                                                var hours = ('0' + today.getHours()).slice(-2);
                                                var minutes = ('0' + today.getMinutes()).slice(-2);

                                                p1.nowQuest[iti].cleardate = year + "년 " + month + "월 " + date + "일 " + hours + '시 ' + minutes + '분'
                                                // p1.nowQuest[Qnum[Qchoice]].clearCount++
                                                p1.clearQuest.push({ ...p1.nowQuest[iti] })
                                            }
                                            p1.nowQuest.splice(iti, 1)
                                        }
                                    }
                                }

                            } else {
                                anitext("여기는 에러", 0.1, "c", 2);
                            }

                            SetUi("mb", onname, "yb", "smith");
                        }
                        break;
                    case 0:
                        SetUi("mb", onname, "yb", "smith");
                        anitext('"다음에 또 봅세나!"', 0.1, "y", 2);
                        shopi--
                        break;
                    default:
                        anitext("여기는 에러", 0.1, "c", 2);
                        break;
                }

            }
            Gdata.nowtalk = ""

        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    delly: {
        id: "delly",
        type: "vil",
        name: "델리",
        char: "delly",
        slist: [npc.shopkeeper.dmr],
        npcs: [npc.villager.himiko, npc.villager.k],
        inn: [npc.inn.maya],
        near: ["dellyValley"],

        specName: "제련소",
        special() {
            Gdata.nowtalk = "jrs"
            let onname = "제련소"
            checkQ()
            anitext('제련소로 향했다.', 0.1, "c", 2);
            function set() {
                SetUi("gb", onname, "yb", "jrs");
            }

            let loop = true
            while (loop) {
                set();
                plist = ["장비 강화",];
                let inchoice;
                let inchoice2;
                let pac = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
                switch (pac) {
                    case 1:

                        let skl = [];
                        let foc = [];
                        for (let sln = 0; sln < p1.inven.length; sln++) {
                            if (p1.inven[sln].reinforce) {
                                skl.push("[ " + p1.inven[sln].itemName + " " + p1.inven[sln].itemLv + "/" + p1.inven[sln].itemMaxLv + " ]");
                                foc.push(sln)
                            }
                        }
                        set();
                        if (skl.length === 0) {
                            anitext("강화 할 수 있는 장비가 없다.", 0.01, "c", 3);
                        } else {
                            let jbl = true
                            let pcc = readlineSync.keyInSelect(skl, " > ", { cancel: "[ 뒤로 ]" });
                            while (jbl) {
                                set();
                                if (pcc === -1) {
                                    break;
                                }
                                anitext(p1.inven[foc[pcc]].itemName, 0.01, "c", 0.01);
                                anitext("    단계 : " + p1.inven[foc[pcc]].itemLv + "/" + p1.inven[foc[pcc]].itemMaxLv, 0.01, "y", 0.01);
                                br();
                                anitext(p1.inven[foc[pcc]].iteminfo, 0.01, "c", 0.01);
                                br();
                                anitext(p1.inven[foc[pcc]].itemDesc, 0.01, "c", 0.01);
                                let ngold = 0;
                                let ntem = [];
                                let ntemcount = [];
                                let suc = 0;
                                let bck = 0;
                                function setbr() {
                                    switch (p1.inven[foc[pcc]].itemLv) {
                                        case 0:
                                            suc = 95
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(1)
                                            break;
                                        case 1:
                                            suc = 90
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(1)
                                            break;
                                        case 2:
                                            suc = 85
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(1)
                                            break;
                                        case 3:
                                            suc = 80
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(1)
                                            break;
                                        case 4:
                                            suc = 75
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(1)
                                            break;
                                        case 5:
                                            suc = 70
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(2)
                                            break;
                                        case 6:
                                            suc = 65
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(2)
                                            break;
                                        case 7:
                                            suc = 60
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(2)
                                            break;
                                        case 8:
                                            suc = 55
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(2)
                                            break;
                                        case 9:
                                            suc = 50
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(2)
                                            break;
                                        case 10:
                                            suc = 50
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(3)
                                            break;
                                        case 11:
                                            suc = 45
                                            bck = 0
                                            ntem.push(items.e23)
                                            ntemcount.push(3)
                                            break;
                                        case 12:
                                            suc = 40
                                            bck = 1
                                            ntem.push(items.e23)
                                            ntemcount.push(3)
                                            break;
                                        case 13:
                                            suc = 35
                                            bck = 2
                                            ntem.push(items.e23)
                                            ntemcount.push(3)
                                            break;
                                        case 14:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(3)
                                            break;
                                        case 15:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e1)
                                            ntemcount.push(2)
                                            break;
                                        case 16:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e1)
                                            ntemcount.push(2)
                                            break;
                                        case 17:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e1)
                                            ntemcount.push(2)
                                            break;
                                        case 18:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e1)
                                            ntemcount.push(2)
                                            break;
                                        case 19:
                                            suc = 30
                                            bck = 3
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e1)
                                            ntemcount.push(2)
                                            break;
                                        case 20:
                                            suc = 25
                                            bck = 7
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e6)
                                            ntemcount.push(2)
                                            break;
                                        case 21:
                                            suc = 20
                                            bck = 8
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e6)
                                            ntemcount.push(2)
                                            break;
                                        case 22:
                                            suc = 15
                                            bck = 9
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e6)
                                            ntemcount.push(2)
                                            break;
                                        case 23:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e6)
                                            ntemcount.push(2)
                                            break;
                                        case 24:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(4)
                                            ntem.push(items.e6)
                                            ntemcount.push(2)
                                            break;
                                        case 25:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(10)
                                            ntem.push(items.e6)
                                            ntemcount.push(10)
                                            break;
                                        case 26:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(10)
                                            ntem.push(items.e6)
                                            ntemcount.push(10)
                                            break;
                                        case 27:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(10)
                                            ntem.push(items.e6)
                                            ntemcount.push(10)
                                            break;
                                        case 28:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(10)
                                            ntem.push(items.e6)
                                            ntemcount.push(10)
                                            break;
                                        case 29:
                                            suc = 10
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(10)
                                            ntem.push(items.e6)
                                            ntemcount.push(10)
                                            break;

                                        default:
                                            suc = 1
                                            bck = 10
                                            ntem.push(items.e23)
                                            ntemcount.push(20)
                                            ntem.push(items.e6)
                                            ntemcount.push(20)
                                            break;
                                    }
                                }
                                setbr()

                                br();
                                let canr = ntem.length
                                for (let icic = 0; icic < ntem.length; icic++) {
                                    anitext(ntem[icic].itemName + "  " + ckitcount(ntem[icic]) + " / " + ntemcount[icic], 0.01, "c", 0.05);
                                    br();
                                    if (ntemcount[icic] <= ckitcount(ntem[icic])) {
                                        canr--
                                    }
                                }
                                if (p1.inven[foc[pcc]].itemMaxLv === p1.inven[foc[pcc]].itemLv) {
                                    // anitext("강화 최대치", 0.01, "c", 0.5);
                                    canr = -1
                                } else {
                                    if (p1.inven[foc[pcc]].itemLv <= 10) {
                                        anitext(`강화 확률 ( 성공 ${suc}% )`, 0.01, "c", 0.5);
                                    } else {
                                        anitext(`강화 확률 ( 성공 ${suc}% / 파괴 ${bck}% )`, 0.01, "c", 0.5);
                                        if ((p1.inven[foc[pcc]].itemLv % 5) === 0) {

                                        } else {
                                            br()
                                            anitext(`(실패시 하락)`, 0.01, "c", 0.5);
                                        }
                                    }
                                }
                                aa = 0;
                                if (canr === 0) {
                                    br();
                                    inchoice2 = Number(readlineSync.question("0.취소 / 1.강화 > "));
                                } else if (canr === -1) {
                                    br();
                                    anitext("이 이상 강화 할 수 없다.", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("뒤로 > "));
                                    inchoice2 = 0
                                } else {
                                    br();
                                    anitext("재료가 부족하다.", 0.01, "c", 0.5);
                                    br();
                                    inchoice2 = Number(readlineSync.question("뒤로 > "));
                                    inchoice2 = 0
                                }
                                if (inchoice2 === 0) {
                                    jbl = false
                                    break;
                                } else if (inchoice2 === 1) {
                                    anitext("깡  깡  깡", 0.3, "c", 2);
                                    br()
                                    for (let iz = 0; iz < ntem.length; iz++) {
                                        anigiv(ntem[iz], (ntemcount[iz] * -1), 0)
                                    }
                                    if (rand(100) <= suc) {
                                        p1.inven[foc[pcc]].itemLv++
                                        anitext("장비를 성공적으로 강화했다.", 0.1, "c", 3);
                                    } else {
                                        if (rand(100) <= bck) {
                                            //파괴
                                            anitext("장비가 부셔졌다..", 0.1, "c", 3);
                                            anigiv(p1.inven[foc[pcc]], -1, 0)
                                        } else {
                                            if (p1.inven[foc[pcc]].itemLv <= 10 || (p1.inven[foc[pcc]].itemLv % 5) === 0) {
                                                anitext("강화에 실패했다.", 0.1, "c", 3);
                                            } else {
                                                p1.inven[foc[pcc]].itemLv--
                                                anitext("강화에 실패하여 등급이 하락했다.", 0.1, "c", 3);
                                            }
                                        }
                                    }


                                } else if (inchoice2 === 2 && p1.class === "tenster") {
                                    anitext("개발자 권한으로 강화", 0.1, "c", 2);
                                    p1.inven[foc[pcc]].itemLv++
                                } else if (inchoice2 === 3 && p1.class === "tenster") {
                                    anitext("개발자 권한으로 레벨 조정", 0.1, "c", 2);
                                    inchoice2 = Number(readlineSync.question(" > "));
                                    if (inchoice2 > p1.inven[foc[pcc]].itemMaxLv) {
                                        inchoice2 = p1.inven[foc[pcc]].itemMaxLv
                                    }
                                    p1.inven[foc[pcc]].itemLv = inchoice2
                                } else if (inchoice2 === 4 && p1.class === "tenster") {
                                    let b = 0
                                    let s = 0
                                    let f = 0
                                    let d = 0
                                    anitext("시행 횟수 설정", 0.1, "c", 2);
                                    inchoice = Number(readlineSync.question(" > "));
                                    let icu = 0
                                    for (icu = 0; icu < inchoice; icu++) {
                                        ngold = 0;
                                        ntem = [];
                                        ntemcount = [];
                                        suc = 0;
                                        bck = 0;
                                        setbr()
                                        if (rand(100) <= bck) {
                                            b++
                                            p1.inven[foc[pcc]].itemLv = 0
                                        } else {
                                            if (rand(100) <= suc) {
                                                s++
                                                p1.inven[foc[pcc]].itemLv++
                                            } else {
                                                if (p1.inven[foc[pcc]].itemLv <= 10 || (p1.inven[foc[pcc]].itemLv % 5) === 0) {
                                                    f++
                                                } else {
                                                    d++
                                                    p1.inven[foc[pcc]].itemLv--
                                                }
                                            }
                                        }
                                        if (p1.inven[foc[pcc]].itemMaxLv === p1.inven[foc[pcc]].itemLv) {
                                            break
                                        }
                                    }
                                    anitext(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴`, 0.1, "c", 2);
                                } else if (inchoice2 === 5 && p1.class === "tenster") {
                                    let b = 0
                                    let s = 0
                                    let f = 0
                                    let d = 0
                                    anitext("최대 강화까지 반복", 0.1, "c", 2);
                                    let icu = 0

                                    let loof = true
                                    while (loof) {
                                        ngold = 0;
                                        ntem = [];
                                        ntemcount = [];
                                        suc = 0;
                                        bck = 0;
                                        setbr()
                                        if (rand(100) <= suc) {
                                            s++
                                            p1.inven[foc[pcc]].itemLv++
                                        } else {
                                            if (rand(100) <= bck) {
                                                b++
                                                p1.inven[foc[pcc]].itemLv = 0
                                            } else {
                                                if (p1.inven[foc[pcc]].itemLv <= 10 || (p1.inven[foc[pcc]].itemLv % 5) === 0) {
                                                    f++
                                                } else {
                                                    d++
                                                    p1.inven[foc[pcc]].itemLv--
                                                }
                                            }
                                        }

                                        icu++
                                        if (p1.inven[foc[pcc]].itemMaxLv === p1.inven[foc[pcc]].itemLv) {
                                            loof = false
                                        }
                                        cl()
                                        console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`)
                                    }
                                    cl()
                                    anitext(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`, 0.1, "c", 2);
                                } else if (inchoice2 === 6 && p1.class === "tenster") {
                                    let b = 0
                                    let s = 0
                                    let f = 0
                                    let d = 0
                                    anitext("도착 단계 설정", 0.1, "c", 2);
                                    inchoice = Number(readlineSync.question(" > "));
                                    if (inchoice > p1.inven[foc[pcc]].itemMaxLv) {
                                        inchoice = p1.inven[foc[pcc]].itemMaxLv
                                    }
                                    let icu = 0

                                    let loof = true
                                    while (loof) {
                                        ngold = 0;
                                        ntem = [];
                                        ntemcount = [];
                                        suc = 0;
                                        bck = 0;
                                        setbr()
                                        if (rand(100) <= suc) {
                                            s++
                                            p1.inven[foc[pcc]].itemLv++
                                        } else {
                                            if (rand(100) <= bck) {
                                                b++
                                                p1.inven[foc[pcc]].itemLv = 0
                                            } else {
                                                if (p1.inven[foc[pcc]].itemLv <= 10 || (p1.inven[foc[pcc]].itemLv % 5) === 0) {
                                                    f++
                                                } else {
                                                    d++
                                                    p1.inven[foc[pcc]].itemLv--
                                                }
                                            }
                                        }

                                        icu++
                                        if (inchoice === p1.inven[foc[pcc]].itemLv) {
                                            loof = false
                                        }
                                        cl()
                                        console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`)
                                    }
                                    cl()
                                    anitext(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`, 0.1, "c", 2);
                                    br()
                                    let o = Number(readlineSync.question("결과 확인 > "));
                                } else if (inchoice2 === 7 && p1.class === "tenster") {
                                    let b = 0
                                    let s = 0
                                    let f = 0
                                    let d = 0
                                    p1.inven[foc[pcc]].itemLv = 25
                                    anitext("25부터 트라이 도착 단계 설정", 0.1, "c", 2);
                                    inchoice = Number(readlineSync.question(" > "));
                                    if (inchoice > p1.inven[foc[pcc]].itemMaxLv) {
                                        inchoice = p1.inven[foc[pcc]].itemMaxLv
                                    }
                                    let icu = 0

                                    let loof = true
                                    while (loof) {
                                        ngold = 0;
                                        ntem = [];
                                        ntemcount = [];
                                        suc = 0;
                                        bck = 0;
                                        setbr()
                                        if (rand(100) <= suc) {
                                            s++
                                            p1.inven[foc[pcc]].itemLv++
                                        } else {
                                            if (rand(100) <= bck) {
                                                b++
                                                p1.inven[foc[pcc]].itemLv = 25
                                            } else {
                                                if (p1.inven[foc[pcc]].itemLv <= 10 || (p1.inven[foc[pcc]].itemLv % 5) === 0) {
                                                    f++
                                                } else {
                                                    d++
                                                    p1.inven[foc[pcc]].itemLv--
                                                }
                                            }
                                        }

                                        icu++
                                        if (inchoice === p1.inven[foc[pcc]].itemLv) {
                                            loof = false
                                        }
                                        cl()
                                        console.log(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`)
                                    }
                                    cl()
                                    anitext(`${icu}번 시행 / ${s}번 성공 / ${f}번 실패 / ${d}번 실패 / ${b}번 파괴 (+${p1.inven[foc[pcc]].itemLv})`, 0.1, "c", 2);
                                    br()
                                    let o = Number(readlineSync.question("결과 확인 > "));
                                } else {
                                    anitext("정확히 입력하세요.", 0.1, "c", 2);
                                }
                            }
                        }

                        break;
                    default:
                        loop = false
                        break;
                }
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    mirabilis: {
        id: "mirabilis",
        type: "vil",
        name: "미라빌리스",
        char: "mirabilis",
        slist: [],
        npcs: [npc.villager.hite],
        inn: [npc.inn.clara],
        near: ["daybreakJungle", "heartbeatGrounds"],

        specName: "...",
        special() {

        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    vellir: {
        id: "vellir",
        type: "vil",
        name: "벨리알",
        char: "vellir",
        slist: [],
        npcs: [],
        inn: [],
        near: ["deadLock", "vellir2"],

        specName: "부숴진 터",
        special() {

        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    vellir2: {
        id: "vellir2",
        type: "hunt",
        name: "통행 금지 구역",
        char: "null",
        monstersList: [monsters.vdem],
        // 돌발 몬스터 출현 확률
        dolbal: 100,
        near: ["vellir"],
        looking(num) {
            fight(monsters.vdem, 1)
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 30) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    westallis: {
        id: "westallis",
        type: "vil",
        name: "웨스탈리스",
        char: "westallis",
        slist: [npc.shopkeeper.ellesion],
        npcs: [npc.villager.biki, npc.villager.hare],
        inn: [npc.inn.ikz],
        near: ["broadField", "sunsetSeashore"],

        specName: "주점",
        special() {
            anitext('아직 주점은 닫혀있다.', 0.1, "c", 2);
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },

    // 사냥터
    wolvesFields: {
        id: "wolvesFields",
        type: "hunt",
        name: "울베스ㅤ들판",
        char: "wolvesFields",
        monstersList: [monsters.wolf, monsters.goldwolf],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["proto", "wolvesForest"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 95) {
                    fight(monsters.wolf, 1)
                } else {
                    fight(monsters.goldwolf, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    wolvesForest: {
        id: "wolvesForest2",
        type: "hunt",
        name: "울베스ㅤ숲",
        char: "wolvesForest",
        monstersList: [monsters.wolf, monsters.goldwolf, monsters.goblin_r],
        // 돌발 몬스터 출현 확률
        dolbal: 30,
        near: ["wolvesFields", "potain", "deepForest"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                let rd = rand(100)
                if (rd <= 85) {
                    fight(monsters.wolf, 1.5)
                } else if (rd <= 95) {
                    fight(monsters.goldwolf, 1.5)
                } else {
                    fight(monsters.goblin_r, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    deepForest: {
        id: "deepForest",
        type: "hunt",
        name: "깊은ㅤ숲",
        char: "deepForest",
        monstersList: [monsters.wolf, monsters.goldwolf, monsters.forest_Raiku, monsters.goblin_r, monsters.sunmoon],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["wolvesForest", "batCave", "luminousRealm"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                let rd = rand(100)
                if (rd <= 20) {
                    fight(monsters.wolf, 2)
                } else if (rd <= 25) {
                    fight(monsters.goldwolf, 2)
                } else if (rd <= 70) {
                    fight(monsters.forest_Raiku, 1)
                } else if (rd <= 95) {
                    fight(monsters.goblin_r, 1.5)
                } else {
                    fight(monsters.sunmoon, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    luminousRealm: {
        id: "luminousRealm",
        type: "hunt",
        name: " 빛이 닿는 곳 ",
        char: "luminousRealm",
        monstersList: [monsters.sunmoon, monsters.gsunmoon],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["deepForest", "kivotos"],
        looking(num) {
            if (rand(100) <= 30 || num === 1) {
                let rd = rand(100)
                if (rd <= 85) {
                    fight(monsters.sunmoon, 1.5)
                } else {
                    fight(monsters.gsunmoon, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    broadField: {
        id: "broadField",
        type: "hunt",
        name: "넖은ㅤ들판",
        char: "broadField",
        monstersList: [monsters.apmon, monsters.rabbit, monsters.boar],
        // 돌발 몬스터 출현 확률
        dolbal: 30,
        near: ["kivotos", "westallis", "wayden"],
        looking(num) {
            if (rand(100) <= 60 || num === 1) {
                let r = rand(100)
                if (r <= 30) {
                    fight(monsters.apmon, 1)
                } else if (r <= 60) {
                    fight(monsters.boar, 1)
                } else {
                    fight(monsters.rabbit, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    waydenTerrace: {
        id: "waydenTerrace",
        type: "hunt",
        name: "웨이든ㅤ단구",
        char: "waydenTerrace",
        monstersList: [monsters.cmon, monsters.golemTypeC],
        // 돌발 몬스터 출현 확률
        dolbal: 40,
        near: ["wayden", "leetenCheckpoint"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 70) {
                    fight(monsters.cmon, 1)
                } else {
                    fight(monsters.golemTypeC, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    leetenCheckpoint: {
        id: "leetenCheckpoint",
        type: "hunt",
        name: "리튼ㅤ검문소",
        char: "forest",
        monstersList: [monsters.wolf, monsters.goldwolf],
        // 돌발 몬스터 출현 확률
        dolbal: 0,
        near: ["waydenTerrace", "leeten"],
        looking(num) {
            if (false) {
                // if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 95) {
                    fight(monsters.wolf, 1)
                } else {
                    fight(monsters.goldwolf, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    shriekPlains: {
        id: "shriekPlains",
        type: "hunt",
        name: "칼날소리ㅤ평야",
        char: "forest",
        monstersList: [monsters.bladebird, monsters.reddracal],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["kivotos", "dracalNest"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 98) {
                    fight(monsters.bladebird, 1)
                } else {
                    fight(monsters.reddracal, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 15) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    dracalNest: {
        id: "dracalNest",
        type: "hunt",
        name: "드라칼ㅤ서식지",
        char: "forest",
        monstersList: [monsters.reddracal, monsters.bluedracal, monsters.magentadracal],
        // 돌발 몬스터 출현 확률
        dolbal: 100,
        near: ["shriekPlains", "leeten"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                let r = rand(100)
                if (r <= 45) {
                    fight(monsters.reddracal, 1)
                } else if (r <= 90) {
                    fight(monsters.bluedracal, 1)
                } else {
                    fight(monsters.magentadracal, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 15) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    dellyValley: {
        id: "dellyValley",
        type: "hunt",
        name: "델리ㅤ계곡",
        char: "forest",
        monstersList: [monsters.golemTypeB, monsters.magentadracal],
        // 돌발 몬스터 출현 확률
        dolbal: 30,
        near: ["dracalNest", "delly"],
        looking(num) {
            if (rand(100) <= 60 || num === 1) {
                let r = rand(100)
                if (r <= 30) {
                    fight(monsters.golemTypeB, 1)
                } else if (r <= 95) {
                    fight(monsters.skeleton, rand(3))
                } {
                    fight(monsters.magentadracal, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 15) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    highMount: {
        id: "highMount",
        type: "hunt",
        name: "하이마운트",
        char: "forest",
        monstersList: [monsters.magentadracal],
        // 돌발 몬스터 출현 확률
        dolbal: 100,
        near: ["potain", "underMountHill"],
        looking(num) {
            if (rand(100) <= 20 || num === 1) {
                fight(monsters.magentadracal, 1)
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (ckit(items.z0, 1)) {
                ok = true
            } else {
                br()
                anitext('증표가 없어 통행 할 수 없다.', 0.1, "c", 2);
            }
            return ok
        }
    },
    underMountHill: {
        id: "underMountHill",
        type: "hunt",
        name: "언더마운트ㅤ힐",
        char: "forest",
        monstersList: [monsters.golemTypeB, monsters.boar],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["highMount", "norden", "daybreakJungle"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 30) {
                    fight(monsters.boar, 2)
                } else {
                    fight(monsters.wolf, 15)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    daybreakJungle: {
        id: "daybreakJungle",
        type: "hunt",
        name: "여명의ㅤ우림",
        char: "forest",
        monstersList: [monsters.golemTypeA, monsters.shippo],
        // 돌발 몬스터 출현 확률
        dolbal: 30,
        near: ["underMountHill", "mirabilis"],
        looking(num) {
            let r = rand(100)
            if (rand(100) <= 70 || num === 1) {
                if (r <= 15) {
                    fight(monsters.golemTypeA, 1.5)
                } else if (r <= 65) {
                    fight(monsters.shippo, 1)
                } else {
                    fight(monsters.bhippo, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 10) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    heartbeatGrounds: {
        id: "heartbeatGrounds",
        type: "hunt",
        name: "평온했던ㅤ우림",
        char: "forest",
        monstersList: [monsters.golemTypeC, monsters.trabbit],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["mirabilis", "silentForest"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                let r = rand(100)
                if (r <= 45) {
                    fight(monsters.golemTypeC, 2)
                } else if (r <= 95) {
                    fight(monsters.rzdm, 1)
                } {
                    fight(monsters.trabbit, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    silentForest: {
        id: "silentForest",
        type: "hunt",
        name: "고요한ㅤ숲",
        char: "forest",
        monstersList: [monsters.trabbit],
        // 돌발 몬스터 출현 확률
        dolbal: 10,
        near: ["heartbeatGrounds", "deadLock"],
        looking(num) {
            if (rand(100) <= 10 || num === 1) {
                fight(monsters.trabbit, 1)
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    deadLock: {
        id: "deadLock",
        type: "hunt",
        name: "데드락",
        char: "null",
        monstersList: [monsters.deadog, monsters.goat],
        // 돌발 몬스터 출현 확률
        dolbal: 100,
        near: ["silentForest", "vellir"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 50) {
                    fight(monsters.deadog, 1)
                } else {
                    fight(monsters.goat, 5)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },
    sunsetSeashore: {
        id: "sunsetSeashore",
        type: "hunt",
        name: "일몰ㅤ해변",
        char: "sunsetSeashore",
        monstersList: [monsters.cmon],
        // 돌발 몬스터 출현 확률
        dolbal: 0,
        near: ["westallis"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 95) {
                    fight(monsters.cmon, 2)
                } else {
                    fight(monsters.cmon, 10)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },






    rabbitHole: {
        id: "rabbitHole",
        type: "hunt",
        name: "토끼ㅤ굴",
        char: "null",
        monstersList: [monsters.trabbit, monsters.goat],
        // 돌발 몬스터 출현 확률
        dolbal: 30,
        near: ["batCave"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 95) {
                    fight(monsters.trabbit, 1)
                } else {
                    fight(monsters.goat, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    },

    batCave: {
        type: "hunt",
        name: "박쥐ㅤ동굴",
        char: "cave",
        monstersList: [monsters.bat, monsters.goat],
        // 돌발 몬스터 출현 확률
        dolbal: 20,
        near: ["deepForest"],
        looking(num) {
            if (rand(100) <= 80 || num === 1) {
                if (rand(100) <= 90) {
                    fight(monsters.bat, 1)
                } else {
                    fight(monsters.goat, 1)
                }
            } else {
                anitext("주변을 둘러보았지만, 아무것도 없다.", 0.1, "c", 3);
            }
        },
        check() {
            let ok = false
            // 입장 조건
            if (p1.lv >= 1) {
                ok = true
            } else {
                br()
                anitext('지금 가기엔 너무 위험하다..', 0.1, "c", 2);
            }
            return ok
        }
    }
}
function Setbi(color, name, namecolor) {
    let line
    if (color === "gb") {
        line = chalk.greenBright("─".repeat(60));
    } else if (color === "g") {
        line = chalk.green("─".repeat(60));
    } else if (color === "bb") {
        line = chalk.blueBright("─".repeat(60));
    } else if (color === "b") {
        line = chalk.blue("─".repeat(60));
    } else if (color === "rb") {
        line = chalk.redBright("─".repeat(60));
    } else if (color === "r") {
        line = chalk.red("─".repeat(60));
    } else if (color === "yb") {
        line = chalk.yellowBright("─".repeat(60));
    } else if (color === "y") {
        line = chalk.yellow("─".repeat(60));
    } else if (color === "mb") {
        line = chalk.magentaBright("─".repeat(60));
    } else if (color === "m") {
        line = chalk.magenta("─".repeat(60));
    } else {
        line = chalk.white("─".repeat(60));
    }
    let ne
    if (namecolor === "gb") {
        ne = chalk.greenBright(name);
    } else if (namecolor === "g") {
        ne = chalk.green(name);
    } else if (namecolor === "bb") {
        ne = chalk.blueBright(name);
    } else if (namecolor === "b") {
        ne = chalk.blue(name);
    } else if (namecolor === "rb") {
        ne = chalk.redBright(name);
    } else if (namecolor === "r") {
        ne = chalk.red(name);
    } else if (namecolor === "yb") {
        ne = chalk.yellowBright(name);
    } else if (namecolor === "y") {
        ne = chalk.yellow(name);
    } else if (namecolor === "mb") {
        ne = chalk.magentaBright(name);
    } else if (namecolor === "m") {
        ne = chalk.magenta(name);
    } else {
        ne = chalk.white(name);
    }

    cl();
    console.log(line);
    process.stdout.write(chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사"));
    process.stdout.write(chalk.redBright("  HP : " + p1.zhp + " / " + p1.fhp));
    process.stdout.write(chalk.blueBright("  MP : " + p1.zmp + " / " + p1.fmp));
    process.stdout.write(chalk.yellowBright("  Gold : " + p1.gold));
    br();
    console.log(line);
    process.stdout.write("                     ");
    process.stdout.write(ne);
    br();
    console.log(line);
}
function sli(color) {
    let line
    if (color === "gb") {
        line = chalk.greenBright("─".repeat(60));
    } else if (color === "g") {
        line = chalk.green("─".repeat(60));
    } else if (color === "bb") {
        line = chalk.blueBright("─".repeat(60));
    } else if (color === "b") {
        line = chalk.blue("─".repeat(60));
    } else if (color === "rb") {
        line = chalk.redBright("─".repeat(60));
    } else if (color === "r") {
        line = chalk.red("─".repeat(60));
    } else if (color === "yb") {
        line = chalk.yellowBright("─".repeat(60));
    } else if (color === "y") {
        line = chalk.yellow("─".repeat(60));
    } else if (color === "mb") {
        line = chalk.magentaBright("─".repeat(60));
    } else if (color === "m") {
        line = chalk.magenta("─".repeat(60));
    } else {
        line = chalk.white("─".repeat(60));
    }
    console.log(line);
}
const books = {
    복사용: {
        id: "복사용",
        name: "이름",
        writeby: "저자",
        info: "설명",
        page: 2,
        lcor: "m",
        ncor: "w",
        open(p) {
            if (p === 1) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
            if (p === 2) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
            if (p === 3) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
        }
    },

    test1: {
        id: "test1",
        name: "[Date A Live]",
        writeby: "타치바나 코우시",
        info: "「정령」\n다른 세계에서 나타나는 수수께끼의 소녀.\n그 무구한 힘에 무력으로 맞설 것인가, 사랑을 갖고 대화에 나설 것인가.\n지금 인류의 선택이 시험받는다.\n(개발자가 테스트를 위해 넣은 사심 가늑한 책)",
        page: 7,
        lcor: "m",
        ncor: "w",
        open(p) {
            if (p === 1) {
                console.log(``);
                console.log(`서장  해후 ─restart─`);
                console.log(``);
                console.log(``);
                console.log(`──숨을 삼켰다.`);
                console.log(`눈앞에 펼쳐진 풍경은 너무나도 비현실적이었다.`);
                console.log(`완전히 파괴된 마을.`);
                console.log(`그런 마을 한가운데에 만들어진 거대한 크레이터.`);
                console.log(`하늘을 날고 있는 사람들.`);
                console.log(`마치 꿈이나 환상 같아 보이는 광경이 눈앞에 펼쳐져 있었다.`);
                console.log(`하지만 시도의 눈에는 그런 광경이 들어오지 않았다.`);
                console.log(`──그런 것들보다 훨씬 기묘한 것이 시도의 눈앞에 있었기 때문이다.`);
                console.log(``);
                console.log(`그것은 소녀였다.`);
                console.log(`기묘한 드레스를 입은 소녀가, 그의 앞에 서 있었다.`);
                console.log(``);
            }
            if (p === 2) {
                console.log(`"아──."`);
                console.log(`탄식과 함께 낮은 탄성이 입에서 흘러나왔다.`);
                console.log(`다른 그 어떤 요소도 불순물로 보일 정도로, 눈앞에 있는 소녀의 존재감은 압도적이었다.`);
                console.log(`금속처럼도, 천처럼도 보이는 불가사의한 소재로 만든 드레스도 시도의 시선을 끌었다.`);
                console.log(`그리고 그녀의 다리를 감싸고 있는 빛으로 된 치마 또한 너무나도 아름다웠다.`);
                console.log(`그런 그녀의 어깨와 허리를 희롱하듯 흔들리고 있는 것은 칠흑빛의 긴 머리카락.`);
                console.log(`푸른 하늘을 올려다보고 있는 것은 불가사의한 빛을 띤 두 눈동자.`);
                console.log(`여신조차도 질투를 느낄 정도로 아름다운 얼굴을 살짝 일그러뜨린 채, 입을 다문 그 모습은,`);
                console.log(`시선을,`);
                console.log(`주의를,`);
                console.log(`그리고 마음조차도,`);
                console.log(`──눈 깜짝할 사이에 빼앗았다.`);
                console.log(`그 정도로,`);
                console.log(`너무나도,`);
                console.log(`상상을 초월할 만큼,`);
                console.log(`폭력적일 정도로, 아름다웠다.`);
            }
            if (p === 3) {
                console.log(`"──너, 넌……."`);
                console.log(`망연자실한 표정을 지은 채.`);
                console.log(`시도는 입을 열었다.`);
                console.log(`눈앞에 있는 소녀에게 말을 건다는 것 자체가 불경스러운 짓일지도 모른다고 생각하며.`);
                console.log(`그 소녀는 천천히 시도를 향해 고개를 돌렸다.`);
                console.log(`"……이름……."`);
                console.log(`악기가 자아내는 아름다운 가락 같은 그 목소리가 공기를 떨리게 만들었다.`);
                console.log(`하지만.`);
                console.log(`"──그런 건, 없다."`);
                console.log(`슬픔이 섞인 목소리로 소녀는 말했다.`);
                console.log(`"──."`);
                console.log(`바로 그 순간.`);
                console.log(`두 사람의 시선이 마주쳤고── 그와 동시에 이츠카 시도의 이야기가 시작되었다.`);
                console.log(``);
                console.log(``);
                console.log(``);
            }
            if (p === 4) {
                console.log(``);
                console.log(`제1장  이름 없는 소녀`);
                console.log(``);
                console.log(``);
                console.log(`"아……."`);
                console.log(`갓 잠에서 깨어난 시도의 기분은 최악 그 자체였다.`);
                console.log(`그것도 그럴 것이, 자신의 배와 가슴, 머리를 마구 밟으면서 여동생이 정열적인 삼바 댄스를 추고 있었기 때문이다.`);
                console.log(`일부 특수 취향 소유자 외에는 누구나 다 불쾌함을 느낄 것이다.`);
                console.log(`4월 10일. 월요일.`);
                console.log(`짧디짧은 봄 방학이 끝나고, 개학식이 있는 날 아침. `);
                console.log(`이츠카 시도는 눈을 비비면서 신음 섞인 목소리로 말했다.`);
                console.log(`"코토리여. 나의 귀여운 여동생이여."`);
                console.log(`"오옷?!"`);
                console.log(`그제야 시도가 깨어났다는 사실을 안 여동생── 코토리는 중학교 교복을 휘날리며 시도를 향해 고개를 돌렸다.`);
                console.log(`양쪽으로 나눠 묶은 머리카락을 휘날리며 고개를 돌린 코토리는 도토리처럼 동글동글한 두 눈으로 시도를 바라보았다.`);
                console.log(``);
            }
            if (p === 5) {
                console.log(`참고로 아침부터 자기 오빠를 마구 밟아댄 그녀의 얼굴에는 "아차!"나 "들켰다!" 같은 감정은 전혀 드러나 있지 않았다.`);
                console.log(`그저 시도가 깨어났다는 사실을 솔직하게 기뻐하고 있었다.`);
                console.log(`참고로 시도의 현재 앵글에서는 코토리의 팬티가 보였다.`);
                console.log(`언뜻 보이는 정도가 아니라, 팬티 무늬까지 훤히 보였다.`);
                console.log(`"왜? 나의 귀여운 오빠여~!"`);
                console.log(`코토리는 시도를 밟고 선 채 말했다.`);
                console.log(`참고로 말하자면, 시도는 전혀 귀엽게 생기지 않았다.`);
                console.log(`"무거우니까 좀 내려와."`);
                console.log(`시도가 그렇게 말하자, 코토리는 고개를 끄덕이면서 침대 밑을 향해 점프했다.`);
                console.log(`그 순간, 발판 역할을 한 시도는 마치 정통으로 보디 블로를 맞은 듯한 충격을 받았다.`);
                console.log(`"구프윽!"`);
                console.log(`"아하하하, 구프레! 육전용이다! 아하하하하!"`);
                console.log(`"……."`);
                console.log(`시도는 아무 말 없이 이불을 뒤집어썼다.`);
                console.log(`"아~! 오빠! 왜 또 자려고 하는 거야!"`);
                console.log(`코토리는 시도를 흔들면서 그렇게 외쳤다.`);
            }
            if (p === 6) {
                process.stdout.write(`⠀⠀⠀⠀⠀⠀⣀⠤⠐⠚⠒⠨⢾⠜⠀⢀⣉⣐⣒⡤⠢⠭⠶⠬⠥⠔⠒⣩⡊⠀⣀⣀\n⠙⡍⠐⠂⢤⠜⠀⠀⡄⡀⠀⡀⢐⢌⢋⠒⠠⠄⢀⡀⠀⠀⢀⡠⠄⠂⠁⠀⠀⠀⠀⠀\n⠀⠈⠂⢤⡞⠀⠘⠀⣇⢧⢤⠇⠘⣈⡌⡀⠀⠀⠀⠀⠀⠀⠀⠤⣄⠀⠀⠀⠀⠀⠀⠀\n⠀⣠⠔⠁⠃⡀⡔⣧⣻⡾⠭⣇⠀⡯⣧⠀⠀⠀⠀⠀⡠⠤⠀⠀⡏⠀⠀⠀⠀⣄⣴⠀\n⠈⠉⢀⠆⣦⣡⢹⣟⠏⠀⠉⠁⢸⡀⣮⡐⠒⠒⡒⡩⡢⠃⢀⠜⡸⢀⡤⢤⠤⡛⠸⡪\n⠀⠀⣌⠀⢹⡔⣓⢎⠢⠘⣁⣦⠋⠀⠐⠒⠚⠛⠺⢋⠕⠁⠓⠒⠓⠋⠉⢂⢢⠐⡜⠀\n⠀⢠⢸⠀⢸⠑⠈⠑⠄⠀⢼⠃⠀⢀⣀⡄⠀⠀⠀⡧⣄⣀⣀⣀⣀⣀⣀⣰⢰⢠⠁⠀\n⠀⢸⢸⡄⠸⠀⠀⠀⠀⢰⠁⠀⠁⢒⠜⠁⠀⠀⣀⣉⠁⢀⠔⠲⠶⠒⠾⠾⠬⣁⡀⠀\n⠀⢸⠘⡘⡀⡑⠀⢄⠖⠁⠀⢀⡠⢣⠀⠀⢀⠌⢀⢨⠮⠥⠤⢧⣀⡠⠄⡀⠀⠀⠀⠑\n⠀⠀⠂⠵⠶⠓⡹⠁⠀⠀⠀⡞⢠⡸⠱⡀⣈⠔⠁⠀⠉⣹⣟⣷⣦⣉⠁⠐⠫⣫⣽⢆\n⠀⠀⠀⠀⢠⣊⣀⡀⠀⠀⡼⠗⠚⢊⡉⠵⡛⢣⣠⣰⠙⢶⢤⣽⡲⢮⣕⡄⠀⠀⠀⠀\n⠀⠀⠀⡜⠒⠒⠂⢌⢢⠜⠉⠉⠉⠀⠀⢰⠀⡠⠐⠁⠀⠀⠷⣾⣝⠶⣌⢻⠀⠀⠐⠢\n⡻⡢⠼⡒⠒⠂⡀⠀⢢⠇⠀⠀⠀⠀⢠⡺⢿⠃⠀⠀⠀⠲⡟⠓⠚⠓⠈⡙⠀⠀⡀⠀\n⠉⠑⠛⠅⠶⢠⣚⡠⠁⠀⠀⠀⠀⠀⠈⠢⡈⠀⠀⠀⢀⡷⠀⠀⠀⠀⡰⠁⠀⠀⢈⠟\n⠀⠀⠀⠀⠀⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡧⡀⠤⡀⡼⠅⡀⠀⠀⠔⢀⣑⡖⠈⠁⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠁⠀⠈⠸⠉⠉⠢⡣⠊⠁⠀⠀⠀⠀⠀⠀\n`);
            }
            if (p === 7) {
                console.log(`"10분만……."`);
                console.log(`"안~ 돼~! 빨리 일어나라구~!"`);
                console.log(`잠이 덜 깬 상태에서 머릿속이 셰이크 되고 있던 시도는 갑자기 고통 섞인 신음을 흘렸다.`);
                console.log(`"도, 도망쳐……."`);
                console.log(`"응?"`);
                console.log(`"……나, 실은『10분 더 안 자면 여동생에게 간지럼 지옥 형벌을 가하는 바이러스』, 줄여서 S-바이러스에 감염됐어……."`);
                console.log(`"저, 정말?!"`);
                console.log(`코토리는 우주인이 숨겨놓은 메시지라도 발견한 사람처럼 깜짝 놀랐다.`);
                console.log(`"도망쳐……. 내가 이 바이러스에 지배당하기 전에……."`);
                console.log(`"하, 하지만, 오빠는 어떻게 할 건데?!"`);
                console.log(`"나는 신경 쓰지 마……. 너만 무사하다면……"`);
                console.log(`"그, 그런 소리 하지 마! 오빠!"`);
                console.log(`"크아악!"`);
                console.log(`"꺄아아아아────!"`);
                console.log(`시도가 이불을 걷어차면서 고통에 찬 비명을 지르자, 코토리는 부리나케 도망쳤다.`);
                console.log(`"……하아."`);
            }
        }
    },
    b0: {
        id: "b0",
        name: "[세피로트 - 에덴]",
        writeby: "크루슈",
        info: "세피로트 - 에덴에 있는 마을의 이야기를 담은 서적.\n에덴을 여행하기 전에 읽어두면 유용할 듯 하다.",
        page: 11,
        lcor: "b",
        ncor: "yb",
        open(p) {
            if (p === 1) {
                console.log(``);
                console.log(`에덴의 마을 이야기`);
                console.log(``);
                console.log(`마을 목록`);
                console.log(``);
                console.log(`프로토`);
                console.log(`포테인`);
                console.log(`키보토스`);
                console.log(`웨이든`);
                console.log(`웨스탈리스`);
                console.log(`리튼`);
                console.log(`델리`);
                console.log(`노든`);
                console.log(`미라빌리스`);
                console.log(`벨리알`);
                console.log(``);
            }
            if (p === 2) {
                console.log(``);
                console.log(`프로토 : 가장 오래된 마을`);
                console.log(``);
                console.log(``);
                console.log(`프로토 주변에는 늑대가 여러 개체 확인되었는데,`);
                console.log(`운이 좋다면 특별히 빛나는 늑대도 관찰 할 수 있다고 합니다.`);
                console.log(``);
                console.log(``);
                console.log(`천사 「${wrtxt(3)}」님의 계시로 지식을 보관 할 수 있는 첫번째 도서관, 플루토가 지어졌습니다.`);
                console.log(`도서관에는 여러 지식이 모이며`);
                console.log(`플루토를 이용하기 위해 많은 사람들이 찾아옵니다.`);
                console.log(``);
                console.log(``);
                console.log(`명소 : 플루토 도서관(책 열람)`);
                console.log(`인접한 마을 : 포테인`);
                console.log(``);
            }
            if (p === 3) {
                console.log(``);
                console.log(`포테인 : 감자가 잘 자라는 마을`);
                console.log(``);
                console.log(``);
                console.log(`마을의 이름과 관련이 없는데 관련이 있다고 하는 사람들이 종종 있습니다.`);
                console.log(``);
                console.log(`근처에는 「별탑」이라는 건물이 있는데`);
                console.log(`늦은 밤 별탑에서 보는 밤하늘은 직접 보지 않고서야 설명할 수 없다고 합니다.`);
                console.log(``);
                console.log(`조금 떨어진 노든으로 향하려면 하이마운트를 지나야 합니다.`);
                console.log(`하지만 하이마운트는 위험한 몬스터가 자주 출몰하여 통행량이 많지 않습니다.`);
                console.log(`그래서 보통은 에덴 남쪽으로 수출, 수입이 이루어집니다.`);
                console.log(``);
                console.log(`명소 : 별탑(스킬 레벨업)`);
                console.log(`인접한 마을 : 프로토, 키보트스, 노든`);
                console.log(``);
            }
            if (p === 4) {
                console.log(``);
                console.log(`키보토스 : 에덴에서 가장 통행량이 많은 마을`);
                console.log(``);
                console.log(``);
                console.log(`통행량이 많은 만큼 거래도 활발히 이루어지며`);
                console.log(`그만큼 여러 사람이 모입니다.`);
                console.log(``);
                console.log(`천사 「가브리엘」님의 계시로 마을을 안전하게 만들기 위한, 길드가 지어졌습니다.`);
                console.log(`길드에서는 여러가지 의외를 받을 수 있으며, 자신의 역량을 증진 시킬 수 있습니다.`);
                console.log(``);
                console.log(`칼날소리 평야를 거쳐 가면 델리에 빠르게 도달 할 수 있지만,`);
                console.log(`위험한 몬스터가 서식하고 있어 델리로는 가지 않습니다.`);
                console.log(``);
                console.log(`명소 : 길드(퀘스트 진행)`);
                console.log(`인접한 마을 : 포테인, 웨스탈리스, 웨이든, 델리`);
                console.log(``);
            }
            if (p === 5) {
                console.log(``);
                console.log(`웨이든 : 온갖 음식을 취급하는 마을`);
                console.log(``);
                console.log(``);
                console.log(`웨이든에서 수확하는 과일들은 품질이 아주 뛰어납니다.`);
                console.log(`이는 질 좋은 토지에서 자란 과일이기 때문입니다. `);
                console.log(`에덴에서 판매되는 과일의 대부분은 이곳에서 수확됩니다.`);
                console.log(``);
                console.log(`아주 오래전, 마을 사람들은 몬스터를 잡아먹지 않았습니다.`);
                console.log(`그러나 식량이 부족하던 시절, 몬스터를 요리하여 먹기 시작하였고,`);
                console.log(`몇몇 개체는 의외로 맛이 뛰어나`);
                console.log(`지금까지도 그 풍습이 이어지고 있습니다.`);
                console.log(``);
                console.log(`명소 : 헌트디시(음식 요리)`);
                console.log(`인접한 마을 : 웨스탈리스, 키보토스, 리튼`);
                console.log(``);
            }
            if (p === 6) {
                console.log(``);
                console.log(`웨스탈리스 : 바다가 아름다운 해변 마을`);
                console.log(``);
                console.log(``);
                console.log(`이 마을은 청명한 바다와 환상적인 해변으로 유명합니다.`);
                console.log(`맑고 푸른 바닷물은 햇빛을 받아 반짝이며,`);
                console.log(`해변의 백사장은 부드럽고 고운 모래로 덮여 있습니다.`);
                console.log(`매년 많은 관광객들이 이곳을 찾아와 자연의 아름다움을 만끽합니다.`);
                console.log(``);
                console.log(`마을 주변에는 다양한 해양 생물이 서식하고 있어, 스노클링과 다이빙을 즐기는 이들에게 최적의 장소입니다.`);
                console.log(`또한, 해변 근처에는 신선한 해산물을 판매하는 시장이 열려,`);
                console.log(`현지에서 잡힌 싱싱한 해산물을 맛볼 수 있습니다.`);
                console.log(``);
                console.log(`명소 : ${wrtxt(5)}`);
                console.log(`인접한 마을 : 키보토스, 웨이든`);
                console.log(``);
            }
            if (p === 7) {
                console.log(``);
                console.log(`리튼 : 신비로운 숲 속 마을`);
                console.log(``);
                console.log(``);
                console.log(`리튼은 아름다움과 위험이 공존하는 곳입니다.`);
                console.log(`대장간의 기술을 바탕으로, 몬스터와의 싸움에서 승리하며 새로운 전설을 써 내려가고 있습니다.`);
                console.log(`이곳을 방문하는 이들은 그들의 용기와 희망을 느낄 수 있을 것입니다.`);
                console.log(``);
                console.log(`리튼의 명소 중 하나인 대장간은 마을의 중심부에 위치해 있습니다.`);
                console.log(`이곳에서는 뛰어난 대장장이들이 마법의 금속을 다루어, 아름답고 강력한 무기와 장신구를 제작합니다.`);
                console.log(`하지만 리튼 주변에는 위험한 몬스터들이 출몰하여 마을 사람들의 안전을 위협하고 있습니다.`);
                console.log(`용감한 전사들이 이들을 처치하기 위해 대장간에서 장비를 정비합니다.`);
                console.log(``);
                console.log(`명소 : 대장간(장비 제작)`);
                console.log(`인접한 마을 : 델리, 벨리알`);
                console.log(``);
            }
            if (p === 8) {
                console.log(``);
                console.log(`델리 : 고립된 산속의 마을`);
                console.log(``);
                console.log(``);
                console.log(`델리는 높은 산들에 둘러싸인 신비로운 고립 마을입니다.`);
                console.log(`이곳은 깊은 숲과 흐르는 맑은 강이 어우러져 있으며, 마치 세상의 끝에 숨겨진 보물처럼 느껴집니다.`);
                console.log(`그러나 델리에 가기 위해서는 위험한 드라칼 서식지를 지나야 합니다.`);
                console.log(`드라칼은 강력한 생물로, 그 영역에 들어서는 이들에게 끔찍한 위험을 안겨줍니다.`);
                console.log(``);
                console.log(`델리의 명소 중 하나는 마을의 중심에 위치한 제련소입니다.`);
                console.log(`이곳은 뛰어난 장인들이 모여, 장비를 더욱 강력하게 만드는 작업을 합니다.`);
                console.log(`많은 전사들이 이곳을 찾아와 자신의 무기와 방어구를 강화하며, 그들의 용기를 다시금 다집니다.`);
                console.log(``);
                console.log(`명소 : 제련소(장비 강화)`);
                console.log(`인접한 마을 : 리튼, 키보토스`);
                console.log(``);
            }
            if (p === 9) {
                console.log(``);
                console.log(`노든 : 에덴의 동쪽 끝`);
                console.log(``);
                console.log(``);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(``);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(``);
                console.log(`명소 : 국경`);
                console.log(`인접한 마을 : 포테인, 미라빌리스`);
                console.log(``);
            }
            if (p === 10) {
                console.log(``);
                console.log(`미라빌리스 : ${wrtxt(10 + rand(5))}`);
                console.log(``);
                console.log(``);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(``);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(``);
                console.log(`명소 : ${wrtxt(3)}`);
                console.log(`인접한 마을 : 노든, 벨리알`);
                console.log(``);
            }
            if (p === 11) {
                console.log(``);
                console.log(`벨리알 : ${wrtxt(10 + rand(5))}`);
                console.log(``);
                console.log(``);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(``);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(10))}`);
                console.log(`${wrtxt(20 + rand(5))}`);
                console.log(``);
                console.log(`명소 : ${wrtxt(3)}`);
                console.log(`인접한 마을 : 리튼, 미라빌리스`);
                console.log(``);
            }
        }
    },
    b1: {
        id: "b1",
        name: "[쇼핑 가이드 - 에덴]",
        writeby: "인젤",
        info: "각 마을의 상점들 이야기를 담은 서적.",
        page: 2,
        lcor: "yb",
        ncor: "cb",
        open(p) {
            if (p === 1) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
            if (p === 2) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
            if (p === 3) {
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
                console.log(``);
            }
        }
    },
}
module.exports = { vil }