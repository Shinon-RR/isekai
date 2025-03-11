const { checklv, anitext, br, anigiv, ckslot } = require("./func")
// const { Gdata } = require("./G-data")

// const { items } = require("./items2")
const { items } = require("./items.js")
const { monsters } = require("./monsters")
const { p1, Gdata } = require("./users-data")

const quest = {

    복붙용: {
        id: "아이디",
        type: "tem",
        // 반복 가능 여부
        repeatable: false,
        name: "퀘 이름",
        info: "퀘스트의 설명을\n작성하자.",
        reward: "보상을 작성하자",
        killtarget: [],
        needKill: [],
        nowKill: [],
        temtarget: [items.e1],
        needtem: [10],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "지급인물",
        to: "완료위치",
        // 필요한 선행 퀘 아이디를 작성하자
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"1-1"', 0.1, "y", 2);
            br()
            anitext('"1-2"', 0.1, "y", 1);
            br()
            anitext('"1-3"', 0.1, "y", 1);
            br()
            anitext('"1-4"', 0.1, "y", 1);
            br()
            anitext('"1-5"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            if (ckslot(1)) {
                for (let gi = 0; gi < this.temtarget.length; gi++) {
                    anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
                }
                anitext('"!"', 0.1, "y", 2);
                anigiv(items.i3, 1, 0)
                p1.exp += 0
                p1.gold += 0
                this.clear = true
                this.clearCount++
                checklv()
            } else {
                anitext('가방에 공간이 없다..', 0.1, "c", 2);
                ok = false
            }
            return ok
        },
    },

    q1: {
        id: "q1",
        type: "kill",
        repeatable: false,
        name: "늑대 퇴치",
        info: "최근 늑대가 과하게 출몰하는 모양이다.\n퀘스트를 완료하고 루미아에게 돌아가자.",
        reward: "경험치 + 50, 골드 + 50",
        killtarget: [monsters.wolf],
        needKill: [2],
        nowKill: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "rumia",
        to: "rumia",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"일거리를 달라구요?"', 0.1, "y", 2);
            br()
            anitext('"어..."', 0.1, "y", 1);
            br()
            anitext('"보통은 모험가 길드에 가면 일거리가 있긴 한데..."', 0.1, "y", 1);
            br()
            anitext('"그럼 작은 일거리를 하나 드려볼게요!"', 0.1, "y", 2);
            br()
        },
        complete() {
            anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
            br()
            anitext('"작지만 보상을 드릴게요"', 0.1, "y", 2);
            br()
            this.clear = true
            this.clearCount++
            p1.exp += 50
            p1.gold += 50
            checklv()
            let ok = true
            return ok
        },
    },
    q2: {
        id: "q2",
        type: "kill",
        repeatable: true,
        name: "황금 늑대 퇴치",
        info: "위험한 황금 늑대를 처치해야한다.\n황금늑대를 잡고 루미아에게 돌아가자.",
        reward: "경험치 + 300, 골드 + 100",
        killtarget: [monsters.goldwolf],
        needKill: [1],
        nowKill: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "rumia",
        to: "rumia",
        needQ: "q1",
        needLv: 1,
        talk() {
            anitext('"일거리를 더 달라구요?"', 0.1, "y", 2);
            br()
            anitext('"흠..."', 0.1, "y", 1);
            br()
            anitext('"그럼 황금 늑대좀 잡아주세요!"', 0.1, "y", 2);
            br()
        },
        complete() {
            anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
            br()
            anitext('"작지만 보상을 드릴게요"', 0.1, "y", 2);
            br()
            this.clear = true
            this.clearCount++
            p1.exp += 300
            p1.gold += 100
            checklv()
            let ok = true
            return ok
        },
    },
    q3: {
        id: "q3",
        type: "tem",
        repeatable: false,
        name: "사과 배달",
        info: "웨이든 지역의 사과 배달을 해야 한다.\n사과를 구해서 세이아에게 가자.",
        reward: "경험치 + 10, 골드 + 10",
        temtarget: [items.i3],
        needtem: [1],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "rumia",
        to: "seia",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"어..."', 0.1, "y", 2);
            br()
            anitext('"간단한 심부름도 괜찮으신가요?"', 0.1, "y", 1);
            br()
            anitext('"그럼 제 친구 세이아가 마침 사과가 필요하다고 했는데"', 0.1, "y", 1);
            br()
            anitext('"사과를 하나만 구해서 가져다 주세요."', 0.1, "y", 2);
            br()
        },
        complete() {
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                // anitext(this.temtarget[gi].itemName + "아이템" + (-1 * this.needtem[gi]) + "적용\n", 0.01, "c", 0.1);
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"무슨 일이신가요 모험가님..?"', 0.2, "y", 2);
            br()
            anitext('"사과라니.."', 0.2, "y", 1);
            br()
            anitext('"필요하긴 했지만 어떻게..?"', 0.2, "y", 1);
            br()
            anitext('"아 루미아씨가 보냈군요"', 0.2, "y", 1);
            br()
            anitext('"감사합니다 모험가님"', 0.2, "y", 2);
            br()
            this.clear = true
            this.clearCount++
            p1.exp += 10
            p1.gold += 10
            checklv()
            let ok = true
            return ok
        },
    },
    q4: {
        id: "q4",
        type: "talk",
        repeatable: false,
        name: "세이아의 전언",
        info: "세이아가 감사 인사를 전해 달라고 한다.\n루미아에게 가자.",
        reward: "경험치 + 20, 골드 + 20",
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "seia",
        to: "rumia",
        needQ: "q3",
        needLv: 1,
        talk() {
            anitext('"저기.. 모험가님"', 0.2, "y", 2);
            br()
            anitext('"혹시 저에게 사과를 보내준 루미아에게"', 0.2, "y", 1);
            br()
            anitext('"감사 인사를 전해주실 수 있으신가요..?"', 0.2, "y", 2);
            br()
        },
        complete() {
            anitext('"세이아가 사과는 잘 받았나요?"', 0.1, "y", 2);
            br()
            anitext('"그렇군요!"', 0.1, "y", 1);
            br()
            anitext('"아, 세이아에게서 전언이요?"', 0.1, "y", 2);
            br()
            anitext('"세이아가 고맙다고 전해달래"', 0.1, "w", 2);
            br()
            anitext('"수고하셨습니다 모험가님!"', 0.1, "y", 2);
            br()
            this.clear = true
            this.clearCount++
            p1.exp += 20
            p1.gold += 20
            checklv()
            let ok = true
            return ok
        },
    },
    qt1: {
        id: "qt1",
        type: "talk",
        repeatable: false,
        name: "테스팅",
        info: "테스트용.\n길드로 가자.",
        reward: "경험치 + 20, 골드 + 20",
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "rbt",
        to: "guild",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"길드로 가"', 0.1, "y", 2);
            br()
        },
        complete() {
            anitext('"수고"', 0.1, "y", 2);
            br()
            this.clear = true
            this.clearCount++
            p1.exp += 20
            p1.gold += 20
            checklv()
            let ok = true
            return ok
        },
    },
    d1: {
        id: "d1",
        type: "tem",
        repeatable: true,
        name: "사과 퀘스트 반복 테스트",
        info: "사과를 배달해야 한다.\n사과를 구해서 더미에게 가자.",
        reward: "경험치 + 10, 골드 + 10",
        temtarget: [items.i3],
        needtem: [1],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "aru",
        to: "aru",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"..ㅋ"', 0.1, "y", 2);
        },
        complete() {
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"!!!"', 0.2, "y", 2);
            this.clear = true
            this.clearCount++
            p1.exp += 10
            p1.gold += 10
            checklv()
            let ok = true
            return ok
        },
    },
    d2: {
        id: "d2",
        type: "killtem",
        repeatable: false,
        name: "늑대, 박쥐 퇴치",
        info: "퀘스트 테스팅을 위하여\n늑대와 박쥐를 2마리씩잡고\n전리품을 얻어\n보미에게 가자.",
        reward: "경험치 + 100, 골드 + 50",
        killtarget: [monsters.wolf, monsters.bat],
        needKill: [2, 2],
        nowKill: [0, 0],
        temtarget: [items.e0, items.e2],
        needtem: [1, 1],
        nowtem: [0, 0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "dummy",
        to: "bommy",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"..."', 0.1, "y", 2);
        },
        complete() {
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"!"', 0.1, "y", 2);
            this.clear = true
            this.clearCount++
            p1.exp += 100
            p1.gold += 50
            checklv()
            let ok = true
            return ok
        },
    },
    aru_1: {
        id: "aru_1",
        type: "tem",
        repeatable: false,
        name: "테스트 사과 배달",
        info: "퀘스트 테스팅을 위하여\n사과를 얻고 아루에게 가자.",
        reward: "경험치 + 100, 골드 + 50",
        killtarget: [],
        needKill: [],
        nowKill: [],
        temtarget: [items.i3],
        needtem: [1],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "aru",
        to: "aru",
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"..."', 0.1, "y", 2);
        },
        complete() {
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"!"', 0.1, "y", 2);
            this.clear = true
            this.clearCount++
            p1.exp += 100
            p1.gold += 50
            checklv()
            let ok = true
            return ok
        },
    },
    spike_1: {
        id: "spike_1",
        type: "tem",
        repeatable: false,
        name: "얼티밋 모험가",
        info: "더욱 강력한 스킬을 얻을 수 있는 모양이다.\n재료를 구해 스파이크에게 가자.",
        reward: "얼티밋 스킬 스크롤",
        killtarget: [],
        needKill: [],
        nowKill: [],
        temtarget: [items.e1, items.e6],
        needtem: [10, 10],
        nowtem: [0, 0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "spike",
        to: "spike",
        needQ: "none",
        needLv: 10,
        talk() {
            anitext('"강력한 스킬을 얻을 수 있냐고?"', 0.1, "y", 2);
            br()
            anitext('"흠..."', 0.1, "y", 1);
            br()
            anitext('"방법이 있긴 한데..."', 0.1, "y", 1);
            br()
            anitext('"지금은 재료가 없다네"', 0.1, "y", 1);
            br()
            anitext('"자네가 재료를 구해온다면 기꺼이 작성해 드리지"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            if (ckslot(1)) {
                for (let gi = 0; gi < this.temtarget.length; gi++) {
                    anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
                }
                if (p1.class === "warrior") {
                    anigiv(items.scw5, 1, 0)
                } else if (p1.class === "defender") {
                    anigiv(items.scd5, 1, 0)
                } else if (p1.class === "magiccaster") {
                    anigiv(items.scm5, 1, 0)
                } else if (p1.class === "rogue") {
                    anigiv(items.scr5, 1, 0)
                } else if (p1.class === "archer") {
                    anigiv(items.sca5, 1, 0)
                } else if (p1.class === "tenster") {
                    anitext('개발자는 보상 없음 ㅋ', 0.1, "c", 2);
                } else {
                    anitext('err - 기본 직업이 아님', 0.1, "c", 2);
                    ok = false
                }
                anitext('"구하기 힘들었을텐데.."', 0.1, "y", 1);
                br()
                anitext('"잠시만 기다려주게.."', 0.1, "y", 1);
                br()
                anitext('"내 금방 작성해 오리다."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.5, "y", 2);
                this.clear = true
                this.clearCount++
                checklv()
            } else {
                anitext('가방에 공간이 없다..', 0.1, "c", 2);
                ok = false
            }
            return ok
        },
    },

    guild_0: {
        id: "guild_0",
        type: "killtem",
        // 반복 가능 여부
        repeatable: true,
        name: "해품달 사냥",
        info: '"빛이 닿는 곳"을 탐험하여 해품달을 사냥하고\n가죽을 들고 길드로 향하자.',
        reward: "5000골드, 겸험치 100",
        killtarget: [monsters.sunmoon],
        needKill: [1],
        nowKill: [0],
        temtarget: [items.e4],
        needtem: [2],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "guild",
        to: "guild",
        // 필요한 선행 퀘 아이디를 작성하자
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"퀘스트를 수락 하시나요?"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
            p1.exp += 100
            p1.gold += 5000
            this.clear = true
            this.clearCount++
            checklv()
            return ok
        },
    },
    guild_1: {
        id: "guild_1",
        type: "killtem",
        // 반복 가능 여부
        repeatable: true,
        name: "숲의 라이쿠 토벌",
        info: '"깊은 숲"을 탐험하여 숲의 라이쿠를 토벌하고\n라이쿠의 가시를 들고 길드로 향하자.',
        reward: "1000골드, 겸험치 50",
        killtarget: [monsters.forest_Raiku],
        needKill: [2],
        nowKill: [0],
        temtarget: [items.e9],
        needtem: [2],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "guild",
        to: "guild",
        // 필요한 선행 퀘 아이디를 작성하자
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"퀘스트를 수락 하시나요?"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
            anigiv(items.i3, 1, 0)
            p1.exp += 50
            p1.gold += 1000
            this.clear = true
            this.clearCount++
            checklv()
            return ok
        },
    },
    guild_2: {
        id: "guild_2",
        type: "kill",
        // 반복 가능 여부
        repeatable: false,
        name: "마력의 잠식",
        info: '인근 지역에서 골렘이 출몰한다고 한다\n종류별로 골렘을 처치하고 길드로 향하자.',
        reward: "강인함의 증표",
        killtarget: [monsters.golemTypeA,monsters.golemTypeB,monsters.golemTypeC],
        needKill: [1,1,1],
        nowKill: [0,0,0],
        temtarget: [],
        needtem: [],
        nowtem: [],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "guild",
        to: "guild",
        // 필요한 선행 퀘 아이디를 작성하자
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"퀘스트를 수락 하시나요?"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            if (ckslot(1)) {
                for (let gi = 0; gi < this.temtarget.length; gi++) {
                    anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
                }
                anigiv(items.z0, 1, 0)
                anitext('"힘드셨을텐데.."', 0.1, "y", 1);
                br()
                anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
                this.clear = true
                this.clearCount++
                checklv()
            } else {
                anitext('가방에 공간이 없다..', 0.1, "c", 2);
                ok = false
            }
            return ok
        },
    },
    guild_3: {
        id: "guild_3",
        type: "killtem",
        // 반복 가능 여부
        repeatable: true,
        name: "소란스러운 평야",
        info: '"칼날소리 평야"을 탐험하여 칼날수리를 토벌하고\n칼날수리의 고기를 들고 길드로 향하자.',
        reward: "1000골드, 겸험치 50",
        killtarget: [monsters.bladebird],
        needKill: [2],
        nowKill: [0],
        temtarget: [items.e10],
        needtem: [2],
        nowtem: [0],
        clear: false,
        cleardate: "",
        clearCount: 0,
        from: "guild",
        to: "guild",
        // 필요한 선행 퀘 아이디를 작성하자
        needQ: "none",
        needLv: 1,
        talk() {
            anitext('"퀘스트를 수락 하시나요?"', 0.1, "y", 2);
        },
        complete() {
            let ok = true
            for (let gi = 0; gi < this.temtarget.length; gi++) {
                anigiv(this.temtarget[gi], (-1 * this.needtem[gi]), 0)
            }
            anitext('"수고하셨어요 모험가님!"', 0.1, "y", 2);
            anigiv(items.i3, 1, 0)
            p1.exp += 50
            p1.gold += 1000
            this.clear = true
            this.clearCount++
            checklv()
            return ok
        },
    },
}


module.exports = {
    quest
}