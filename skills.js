const { default: chalk } = require("chalk")
const { givdebuff, debuffs, givbuff, buffs } = require("./buffs")
const { rand, anitext, br, cl, aniprt } = require("./func")
// const { Gdata } = require("./G-data")
const { p1, Gdata } = require("./users-data")

function dui(ccart) {
    cl()
    const line = chalk.yellowBright("─".repeat(60));

    if (p1.mode[0] === 1) {
        console.log(line);
        process.stdout.write(chalk.cyanBright(" 버프 : "));
        for (let bi = 0; bi < p1.zbuff.length; bi++) {
            process.stdout.write(chalk.cyanBright(" [" + p1.zbuff[bi].buffName + p1.zbuff[bi].now + "]"));
        }
        br()
    }
    if (p1.mode[1] === 1) {
        console.log(line);
        process.stdout.write(chalk.cyanBright(" 데미지 : " + p1.zdmg));
        process.stdout.write(chalk.cyanBright(" 방여력 : " + p1.zdef));
        process.stdout.write(chalk.cyanBright(" 스피드 : " + p1.zspd));
        process.stdout.write(chalk.cyanBright(" 회피 : " + p1.fhwp));
        br()
    }
    if (p1.mode[2] === 1) {
        console.log(line);
        process.stdout.write(chalk.red(" 데미지 : " + Gdata.FMdata.fmdmg));
        process.stdout.write(chalk.red(" 방여력 : " + Gdata.FMdata.fmdef));
        process.stdout.write(chalk.red(" 스피드 : " + Gdata.FMdata.fmspd));
        br()
    }

    console.log(line);
    process.stdout.write(chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사 "));
    // process.stdout.write(chalk.cyanBright(" 버프 : "));
    for (let bi = 0; bi < p1.zbuff.length; bi++) {
        process.stdout.write(chalk.cyanBright(" [" + p1.zbuff[bi].buffName + " " + p1.zbuff[bi].now + "]"));
    }
    br();
    process.stdout.write(chalk.redBright(" HP : " + p1.zhp + " / " + p1.fhp));
    process.stdout.write(chalk.blueBright("     MP : " + p1.zmp + " / " + p1.fmp));
    br();
    console.log(line);
    process.stdout.write(chalk.cyanBright(" 몬스터 " + Gdata.monster.name + " "));
    for (let bi = 0; bi < Gdata.monster.buf.length; bi++) {
        process.stdout.write(chalk.cyanBright(" [" + Gdata.monster.buf[bi].debuffName + " " + Gdata.monster.buf[bi].now + "]"));
    }
    br();
    process.stdout.write(chalk.redBright(" HP : " + Gdata.monster.hp + " / " + Gdata.FMdata.maxhp));
    br();
    console.log(line);
    aniprt(ccart);
    console.log(line);
}


const skills = {
    // 복사용
    null: {
        id: "null",
        skillName: "null",
        skillInfo: "null",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 20,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("null", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= 30) {
                    givdebuff(debuffs.neutralize)
                    anitext(Gdata.monster.name + "(은)는 무력화 되었다!", 0.1, "c", 2);
                }
            }
        }
    },

    psiw: {
        id: "psiw",
        skillName: "워리어의 기본",
        skillInfo: "기초 스탯이 상승한다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.xhp += 0.5;
            p1.jbdmg += 10;
            p1.jbdef += 5;
            p1.xhpzen += 0.5;
        },
        active(how) {
        },
        after(how) {
        }
    },
    psid: {
        id: "psid",
        skillName: "디펜더의 기본",
        skillInfo: "방어력이 상승한다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.jbdef += p1.lv + p1.dmg;
        },
        active(how) {
        },
        after(how) {
        }
    },
    psim: {
        id: "psim",
        skillName: "매직캐스터의 기본",
        skillInfo: "다른 직업보다 마나를 2배 효율적으로 사용 할 수 있다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.xmp++;
            p1.xmpzen++;
        },
        active(how) {
        },
        after(how) {
        }
    },
    psir: {
        id: "psir",
        skillName: "로그의 기본",
        skillInfo: "최대 채력이 절반으로 줄지만 회피 확률이 늘어난다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.xspd += 0.5;
            p1.xhp -= 0.5;
            p1.jbhwp += 35;
        },
        active(how) {
        },
        after(how) {
        }
    },
    psia: {
        id: "psia",
        skillName: "아처의 기본",
        skillInfo: "항상 선재공격을 할 수 있고 데미지가 1.2배 늘어난다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.xdmg += 0.2;
            p1.zsj = 1;
        },
        active(how) {
        },
        after(how) {
        }
    },
    psit: {
        id: "psit",
        skillName: "개발자의 기본",
        skillInfo: "이걸 읽기는 하려나..",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.jbdmg += 5
            p1.jbhp += 100
            p1.jbmp += 100
        },
        active(how) {
        },
        after(how) {
        }
    },
    pcook: {
        id: "pcook",
        skillName: "모험가의 생존법",
        skillInfo: "몬스터의 가죽과 살을 분리 할 수 있다.",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.jbdmg += 5
        },
        active(how) {
        },
        after(how) {
        }
    },
    padv: {
        id: "padv",
        skillName: "C등급 모험가",
        skillInfo: "길드의 일원. 여러 퀘스트를 완료하여 등급을 올릴 수 있다. (등급비례 데미지 상승)",
        skillIcon: "null",
        skillType: "passive",
        can: [],
        reqMana: 0,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 1,
        cal() {
            p1.jbdmg += 5
        },
        active(how) {
        },
        after(how) {
        }
    },


    ttkillmonster: {
        id: "ttkillmonster",
        skillName: "몬스터 처치",
        skillInfo: "몬스터를 처치한다.",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 1,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("죽어", 0.1, "c", 2);
                Gdata.monster.hp = 0
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    ttavoid: {
        id: "ttavoid",
        skillName: "공격 무시",
        skillInfo: "다음 적의 공격을 무시한다.",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 1,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("때려봐", 0.1, "c", 2);
                givbuff(buffs.hide, 1)
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    ttheal: {
        id: "ttheal",
        skillName: "회복",
        skillInfo: "체력과 마나를 최대치로 회복합니다.",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk", "vil", "hunt"],
        reqMana: 1,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("회복", 0.1, "c", 2);
                p1.zhp = p1.fhp
                p1.zmp = p1.fmp
            } else {
                anitext("회복", 0.1, "c", 2);
                p1.zhp = p1.fhp
                p1.zmp = p1.fmp
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    tteffect: {
        id: "tteffect",
        skillName: "효과적용",
        skillInfo: "적에게 효과를 적용합니다.",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 1,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("어떤 디버프가 좋으려나..", 0.1, "c", 2);
                cl()
                for (let i = 0; i < Object.keys(debuffs).length; i++) {
                    console.log(i + ". " + debuffs[Object.keys(debuffs)[i]].debuffName)
                }
                console.log("디버프 선택")
                br()
                let dchoice = Number(readlineSync.question(" > "));
                console.log("지속 턴 설정")
                br()
                let bchoice = Number(readlineSync.question(" > "));
                givdebuff(debuffs[Object.keys(debuffs)[dchoice]], bchoice)
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    ttsu: {
        id: "ttsu",
        skillName: "자살",
        skillInfo: "죽으면 무슨 일이 생길까?",
        skillIcon: "null",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 1,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("내가 없어져볼게", 0.1, "c", 2);
                p1.zhp = 0
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },



    // 원래 전사가 쓰던 스킬들
    downstrike: {
        id: "downstrike",
        skillName: "내려찍기",
        skillInfo: "적에게 공격력비례 피해를 입힌다.",
        skillIcon: "downstrike",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 10,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("세피로트를 위하여!", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
        }
    },
    bulldozer: {
        id: "bulldozer",
        skillName: "불도저",
        skillInfo: "적에게 공격력비례 피해를 입힌다.",
        skillIcon: "bulldozer",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 20,
        needLv: 5,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("돌격!", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.5 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {

        }
    },
    whirlwind: {
        id: "whirlwind",
        skillName: "휠윈드",
        skillInfo: "적에게 공격력비례 피해를 입힌다.",
        skillIcon: "whirlwind",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 30,
        needLv: 10,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("진형을 무너뜨려라!", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.9 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
        }
    },
    defenseposture: {
        id: "defenseposture",
        skillName: "방어태세",
        skillInfo: "null",
        skillIcon: "defenseposture",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 0,
        needLv: 15,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("확고한 의지로!", 0.1, "c", 2);
                br()
                if (rand(100) <= 60) {
                    anitext(p1.name + "용사는 태세를 전환했다!", 0.1, "c", 2);
                    givbuff(buffs.defense, 1)
                } else {
                    anitext("실패했다..", 0.1, "c", 2);
                }
            }
        },
        after(how) {
        }
    },
    ultimatesword: {
        id: "ultimatesword",
        skillName: "얼티밋 스워드",
        skillInfo: "적에게 적 최대체력 50%의 피해를 입힌다.",
        skillIcon: "ultimatesword",
        skillType: "active",
        yesCo: true,
        maxUse: 1,
        used: 1,
        can: ["fsk"],
        reqMana: 100,
        needLv: 20,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("대의를 위해!", 0.3, "c", 2);
                Gdata.FMdata.caldmg = Gdata.monster.hp * (0.49 + (this.skillLv * 0.01))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
        }
    },


    shielddash: {
        id: "shielddash",
        skillName: "쉴드대쉬",
        skillInfo: "적에게 방어력비례 피해를 입힌다.\n(30% 무력화)-적 행동불능",
        skillIcon: "shielddash",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 10,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("방패로 맞아보긴 처음이지?", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdef * (1.3 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= 30) {
                    // if (true){
                    givdebuff(debuffs.neutralize, 1)
                    br()
                    anitext(Gdata.monster.name + "(은)는 무력화 되었다!", 0.1, "c", 2);
                }
            }
        }
    },
    protect: {
        id: "protect",
        skillName: "방어",
        skillInfo: "다음턴 적의 공격을 막아낸다.",
        skillIcon: "protect",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 10,
        needLv: 5,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("뭐든지 막아보이겠어!", 0.1, "c", 2);
                givbuff(buffs.defense, 1)
            }
        },
        after(how) {
        }
    },
    riotsuppression: {
        id: "riotsuppression",
        skillName: "폭동 진압",
        skillInfo: "당신은 방패를 들고 방어를 하는것에 회이감이 들어\n방패를 던져 상대를 제압해보기로 하였습니다.",
        skillIcon: "riotsuppression",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 30,
        needLv: 10,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("아 모르겠고 어떻게든 되겠지", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdef * (1.4 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
        }
    },
    reflection: {
        id: "reflection",
        skillName: "반사",
        skillInfo: "null",
        skillIcon: "reflection",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 10,
        needLv: 15,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("null", 0.1, "c", 2);
                givbuff(buffs.reflection, 1)
            }
        },
        after(how) {
        }
    },
    ultimateprotect: {
        id: "ultimateprotect",
        skillName: "얼티밋 프로텍트",
        skillInfo: "3턴동안 적을 무력화 합니다.",
        skillIcon: "ultimateprotect",
        skillType: "active",
        yesCo: true,
        maxUse: 1,
        used: 1,
        can: ["fsk"],
        reqMana: 100,
        needLv: 20,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("전투는 이렇게 하는 거다!", 0.3, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                // if (rand(100) <= 30){
                if (true) {
                    givdebuff(debuffs.neutralize, 3)
                    br()
                    anitext(Gdata.monster.name + "(은)는 무력화 되었다!", 0.1, "c", 2);
                }
            }
        }
    },

    fireball: {
        id: "fireballl",
        skillName: "파이어볼",
        skillInfo: "(속성공격:불) 작열 - 매 턴 적에게 25 피해를 입힌다.",
        skillIcon: "fireball",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 30,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        cans: false,
        active(how) {
            if (how === "fsk") {
                this.cans = true
                anitext("가랏, 파이어볼!", 0.1, "c", 2);
                if (checkdebuff(debuffs.moist)) {
                    this.cans = false
                    deldebuff(debuffs.moist)
                    br()
                    anitext(Gdata.monster.name + "의 수분이 증발했다!", 0.1, "c", 2);
                    Gdata.FMdata.caldmg = p1.zdmg * (0.7 + (this.skillLv * 0.1))
                } else if (checkdebuff(debuffs.poison)) {
                    deldebuff(debuffs.poison)
                    br()
                    anitext(Gdata.monster.name + "의 중독이 사라졌다!", 0.1, "c", 2);
                    Gdata.FMdata.caldmg = p1.zdmg * (1.4 + (this.skillLv * 0.1))
                } else {
                    Gdata.FMdata.caldmg = p1.zdmg * (1 + (this.skillLv * 0.1))
                }
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= 50 && this.cans) {
                    givdebuff(debuffs.burn, 2)
                }
            }
        }
    },
    watercannon: {
        id: "watercannon",
        skillName: "워터 캐논",
        skillInfo: "(속성공격:물) 수분 - 적의 데미지,방어력이 20% 하락한다.",
        skillIcon: "watercannon",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 50,
        needLv: 5,
        skillLv: 0,
        skillMaxLv: 10,
        cans: false,
        active(how) {
            if (how === "fsk") {
                this.cans = true
                anitext("엘 시하!", 0.1, "c", 2);
                if (checkdebuff(debuffs.burn)) {
                    // this.cans = false
                    deldebuff(debuffs.moist)
                    br()
                    anitext(Gdata.monster.name + "의 불이 꺼졌다!", 0.1, "c", 2);
                    Gdata.FMdata.caldmg = 0
                } else if (checkdebuff(debuffs.poison)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (0.9 + (this.skillLv * 0.1))
                } else if (checkdebuff(debuffs.shock)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (1 + (this.skillLv * 0.1))
                } else {
                    Gdata.FMdata.caldmg = p1.zdmg * (0.7 + (this.skillLv * 0.1))
                }
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                // if (rand(100) <= 30){
                if (rand(100) <= 50 && this.cans) {
                    givdebuff(debuffs.moist, 2)
                }
            }
        }
    },
    poisonshard: {
        id: "poisonshard",
        skillName: "포이즌 샤드",
        skillInfo: "(속성공격:독) 중독 - 매 턴 적에게 적 최대체력의 0.1배 피해를 입힌다.",
        skillIcon: "poisonshard",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 70,
        needLv: 10,
        skillLv: 0,
        skillMaxLv: 10,
        cans: false,
        active(how) {
            if (how === "fsk") {
                anitext("그거 좀 따끔할거야!", 0.1, "c", 2);
                if (checkdebuff(debuffs.burn)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                } else if (checkdebuff(debuffs.moist)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (1.2 + (this.skillLv * 0.1))
                } else {
                    Gdata.FMdata.caldmg = p1.zdmg * (1 + (this.skillLv * 0.1))
                }
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= 30 || checkdebuff(debuffs.moist)) {
                    givdebuff(debuffs.poison, 2)
                }
            }
        }
    },
    lightning: {
        id: "lightning",
        skillName: "라이트닝",
        skillInfo: "(속성공격:번개) 감전 - 적 행동 불가.",
        skillIcon: "lightning",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 70,
        needLv: 15,
        skillLv: 0,
        skillMaxLv: 10,
        cans: false,
        active(how) {
            if (how === "fsk") {
                anitext("<뇌정이여>, <자색 빛 번개의 충격으로써>, <때려눕혀라>", 0.1, "c", 2);
                if (checkdebuff(debuffs.burn) || checkdebuff(debuffs.poison)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (1 + (this.skillLv * 0.1))
                } else if (checkdebuff(debuffs.moist)) {
                    Gdata.FMdata.caldmg = p1.zdmg * (1.8 + (this.skillLv * 0.1))
                } else {
                    Gdata.FMdata.caldmg = p1.zdmg * (1.5 + (this.skillLv * 0.1))
                }
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= 30 || checkdebuff(debuffs.moist)) {
                    givdebuff(debuffs.shock, 1)
                }
            }
        }
    },
    ultimatedispel: {
        id: "ultimatedispel",
        skillName: "얼티밋 디스펠",
        skillInfo: '적에게 적용된 "모든" 효과를 제거하고 제거한 수에 비례한 데미지를 준다.',
        skillIcon: "ultimatedispel",
        skillType: "active",
        yesCo: true,
        maxUse: 1,
        used: 1,
        can: ["fsk"],
        reqMana: 200,
        needLv: 20,
        skillLv: 0,
        skillMaxLv: 10,
        cans: false,
        active(how) {
            if (how === "fsk") {
                anitext("정화의 빛으로!", 0.3, "c", 2);
                Gdata.FMdata.caldmg = (p1.zdmg * (1.8 + (this.skillLv * 0.1))) * Gdata.monster.buf.length
                Gdata.monster.buf = []
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },

    sneakattack: {
        id: "sneakattack",
        skillName: "암습",
        skillInfo: "적에게 공격력의 1.5배 피해를 입힌다.(5% 적 즉사)",
        skillIcon: "sneakattack",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 20,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("뒤를 조심해", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.4 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (rand(100) <= (5 + (this.skillLv * 1))) {
                    Gdata.monster.hp = 0
                    dui(Gdata.monster.art)
                    anitext(Gdata.monster.name + "(은)는 암살당했다.", 0.1, "c", 2);
                }
            }
        }
    },
    darkhide: {
        id: "darkhide",
        skillName: "연막",
        skillInfo: "몸을 숨길 수 있는 연막을 펼친다.",
        skillIcon: "darkhide",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 20,
        needLv: 5,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("필연은 막을 수 없지.", 0.1, "c", 2);
                givbuff(buffs.hide, 1)
            }
        },
        after(how) {
        }
    },
    weaknessattacks: {
        id: "weaknessattacks",
        skillName: "약점 공격",
        skillInfo: "null",
        skillIcon: "weaknessattacks",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 40,
        needLv: 10,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("항상 주의해", 0.1, "c", 2);
                Gdata.FMdata.caldmg = (Gdata.monster.hp * (0.2 + (this.skillLv * 0.02))) + p1.zdmg
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    chainatk: {
        id: "chainatk",
        skillName: "연격",
        skillInfo: "(연격 확률 40%, 반복 가능)",
        skillIcon: "chainatk",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 50,
        needLv: 15,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("단도는 많을수록 좋지.", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
                let nope = true
                let count = 1
                while (nope) {
                    if (rand(100) <= (40 + (this.skillLv * 1))) {
                        count++
                        Gdata.FMdata.caldmg = p1.zdmg * (1.3 + (this.skillLv * 0.1))
                        if (scaca() === 1) {
                            this.after("fsk")
                        }
                    } else {
                        nope = false
                    }
                }
                dui(Gdata.monster.art);
                anitext(count + "번 공격했다.", 0.1, "c", 2);
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        },
    },
    ultimatekiller: {
        id: "ultimatekiller",
        skillName: "얼티밋 킬러",
        skillInfo: "(처형 - 적 현제 체력이 자신의 공격력 * 2 보다 낮으면 즉사)",
        skillIcon: "ultimatekiller",
        skillType: "active",
        yesCo: true,
        maxUse: 1,
        used: 1,
        can: ["fsk"],
        reqMana: 200,
        needLv: 20,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("슬슬 마무리하지.", 0.3, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (2 + (this.skillLv * 0.05))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
                if (Gdata.monster.hp < (p1.zdmg * 2)) {
                    Gdata.monster.hp = 0
                    dui(Gdata.monster.art)
                    anitext(Gdata.monster.name + "(은)는 처형당했다.", 0.1, "c", 2);
                }
            }
        }
    },

    headshot: {
        id: "headshot",
        skillName: "헤드샷",
        skillInfo: "적에게 공격력 비례 피해를 입힌다.",
        skillIcon: "headshot",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 30,
        needLv: 1,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("너에게 닿기를..!", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.7 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    focusing: {
        id: "focusing",
        skillName: "집중",
        skillInfo: "3턴동안 기본공격의 데미지 증가",
        skillIcon: "focusing",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 10,
        needLv: 5,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("...", 0.1, "c", 2);
                givbuff(buffs.focus, 3)
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    rapidshot: {
        id: "rapidshot",
        skillName: "속사",
        skillInfo: "적에게 공격력 + 속도 비례 피해를 입힌다.",
        skillIcon: "rapidshot",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 50,
        needLv: 10,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("...놓치지 않아", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (1.8 + (this.skillLv * (p1.zspd * 0.1)))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    robinarrow: {
        id: "robinarrow",
        skillName: "로빈애로우",
        skillInfo: "적에게 공격력 + 속도 비례 피해를 입힌다.",
        skillIcon: "robinarrow",
        skillType: "active",
        yesCo: false,
        can: ["fsk"],
        reqMana: 40,
        needLv: 15,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("빗나가지 않아.", 0.1, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg + (p1.zspd * (this.skillLv * 2.4))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
    ultimatearcher: {
        id: "ultimatearcher",
        skillName: "얼티밋 궁수",
        skillInfo: "적에게 아주 강력한 피해를 입힌다.",
        skillIcon: "ultimatearcher",
        skillType: "active",
        yesCo: true,
        maxUse: 1,
        used: 1,
        can: ["fsk"],
        reqMana: 100,
        needLv: 20,
        skillLv: 0,
        skillMaxLv: 10,
        active(how) {
            if (how === "fsk") {
                anitext("사악을 분쇄하는 정의의 일격!", 0.3, "c", 2);
                Gdata.FMdata.caldmg = p1.zdmg * (5 + (this.skillLv * 0.1))
                if (scaca() === 1) {
                    this.after("fsk")
                }
            }
        },
        after(how) {
            if (how === "fsk") {
            }
        }
    },
}

function checkdebuff(debuf) {
    let yes = false
    for (let i = 0; i < Gdata.monster.buf.length; i++) {
        if (Gdata.monster.buf[i].debuffCode === debuf.debuffCode) {
            yes = true
        }
    }
    return yes
}
function checkbuff(buf) {
    let yes = false
    for (let i = 0; i < p1.zbuff.length; i++) {
        if (p1.zbuff[i].buffCode === buf.buffCode) {
            yes = true
        }
    }
    return yes
}

function deldebuff(buf) {
    for (let i = (Gdata.monster.buf.length - 1); i >= 0; --i) {
        if (Gdata.monster.buf[i].buffCode === buf.buffCode) {
            Gdata.monster.buf.splice(i, 1)
        }
    }
}

function dui(ccart) {
    cl()
    const line = chalk.yellowBright("─".repeat(60));

    if (p1.mode[0] === 1) {
        console.log(line);
        process.stdout.write(chalk.cyanBright(" 버프 : "));
        for (let bi = 0; bi < p1.zbuff.length; bi++) {
            process.stdout.write(chalk.cyanBright(" [" + p1.zbuff[bi].buffName + p1.zbuff[bi].now + "]"));
        }
        br()
    }
    if (p1.mode[1] === 1) {
        console.log(line);
        process.stdout.write(chalk.cyanBright(" 데미지 : " + p1.zdmg));
        process.stdout.write(chalk.cyanBright(" 방여력 : " + p1.zdef));
        process.stdout.write(chalk.cyanBright(" 스피드 : " + p1.zspd));
        process.stdout.write(chalk.cyanBright(" 회피 : " + p1.fhwp));
        br()
    }
    if (p1.mode[2] === 1) {
        console.log(line);
        process.stdout.write(chalk.red(" 데미지 : " + Gdata.FMdata.fmdmg));
        process.stdout.write(chalk.red(" 방여력 : " + Gdata.FMdata.fmdef));
        process.stdout.write(chalk.red(" 스피드 : " + Gdata.FMdata.fmspd));
        br()
    }

    console.log(line);
    process.stdout.write(chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사 "));
    for (let bi = 0; bi < p1.zbuff.length; bi++) {
        process.stdout.write(chalk.cyanBright(" [" + p1.zbuff[bi].buffName + " " + p1.zbuff[bi].now + "]"));
    }
    br();
    process.stdout.write(chalk.redBright(" HP : " + p1.zhp + " / " + p1.fhp));
    process.stdout.write(chalk.blueBright("     MP : " + p1.zmp + " / " + p1.fmp));
    br();
    console.log(line);
    process.stdout.write(chalk.cyanBright(" " + Gdata.monster.name + " "));
    for (let bi = 0; bi < Gdata.monster.buf.length; bi++) {
        process.stdout.write(chalk.cyanBright(" [" + Gdata.monster.buf[bi].debuffName + " " + Gdata.monster.buf[bi].now + "]"));
    }
    br();
    process.stdout.write(chalk.redBright(" HP : " + Gdata.monster.hp + " / " + Gdata.FMdata.maxhp));
    br();
    console.log(line);
    aniprt(ccart);
    console.log(line);
}

function scaca() {
    if (Gdata.FMdata.caldmg !== 0) {
        if (Gdata.chwp === 1) {
            Gdata.chwp = 0;
            dui(Gdata.monster.art);
            anitext(Gdata.monster.name + "(은)는 공격을 피했다!", 0.1, "c", 2);
            Gdata.FMdata.caldmg = 0
            return 0
        } else {
            br();
            if (rand(100) <= p1.cri) {
                Gdata.FMdata.caldmg *= 2;
                anitext("크리티컬!", 0.1, "c", 0.5);
            }


            Gdata.FMdata.caldmg -= Gdata.FMdata.fmdef;
            if (Gdata.FMdata.caldmg < 0) {
                Gdata.FMdata.caldmg = 1;
            }
            Gdata.FMdata.caldmg = Math.round(Gdata.FMdata.caldmg);
            Gdata.monster.hp -= Gdata.FMdata.caldmg;
            if (Gdata.monster.hp < 0) {
                Gdata.monster.hp = 0;
            }
            dui(Gdata.monster.art);

            anitext(Gdata.monster.name + "(은)는 " + Gdata.FMdata.caldmg + "의 데미지를 입었다!", 0.1, "c", 2);
            Gdata.FMdata.caldmg = 0
            return 1
        }
    } else {
        return 0
    }
}


function givskill(sk) {
    let ok = false
    if (sk.skillType === "passive") {
        if (p1.passi.length < p1.maxsk) {
            if (p1.passi.length !== 0) {
                let dupe = 0
                for (let i = 0; i < p1.passi.length; i++) {
                    if (p1.passi[i].id === sk.id) {
                        anitext("이미 배운 스킬임 ㅇㅇ..", 0.1, "c", 2);
                        dupe = 1
                    }
                }
                if (dupe === 0) {
                    ok = true
                }
            } else {
                ok = true
            }
        }
        if (ok) {
            p1.passi.push({ ...sk })
        }
    } else if (sk.skillType === "active") {
        if (p1.skill.length < p1.maxsk) {
            if (p1.skill.length !== 0) {
                let dupe = 0
                for (let i = 0; i < p1.skill.length; i++) {
                    if (p1.skill[i].id === sk.id) {
                        anitext("이미 배운 스킬임 ㅇㅇ..", 0.1, "c", 2);
                        dupe = 1
                    }
                }
                if (dupe === 0) {
                    ok = true
                }
            } else {
                ok = true
            }
        }
        if (ok) {
            p1.skill.push({ ...sk })
        }
    }

}
module.exports = {
    skills,
    givskill,
    checkbuff,
}