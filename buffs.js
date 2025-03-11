const { cl, br, aniprt, anitext } = require("./func");
// const { Gdata } = require("./G-data");
const { p1, Gdata } = require("./users-data");
const buffs = {
    ironbody: {
        buffCode: "ironbody",
        buffName: "아이언 바디",
        buffinfo: "아이언 바디 포션을 사용하여 생긴 버프다.",
        buffDesc: "최대 HP + 50",
        type: "buff",
        char: "blueballpotion",
        max: 1,
        now: 1,
        cal() {
            p1.jbhp += 50;
        },
    },
    defense: {
        buffCode: "defense",
        buffName: "방어",
        buffinfo: "다음 턴 적의 공격을 막는다.",
        buffDesc: "방어 1턴",
        type: "buff",
        char: "defenseposture",
        max: 1,
        now: 1,
        cal() {
        },
    },
    reflection: {
        buffCode: "reflection",
        buffName: "반사",
        buffinfo: " 막는다.",
        buffDesc: "방어 1턴",
        type: "buff",
        char: "reflection",
        max: 1,
        now: 1,
        cal() {
        },
    },
    focus: {
        buffCode: "focus",
        buffName: "집중",
        buffinfo: "정신을 집중한다.",
        buffDesc: "3턴동안 기본 공격이 강해진다.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.dmg += 5
        },
    },
    powerup: {
        buffCode: "powerup",
        buffName: "파워업",
        buffinfo: "파워업 바디 포션을 사용하여 생긴 버프다.",
        buffDesc: "데미지 + 10",
        type: "buff",
        char: "redballpotion",
        max: 1,
        now: 1,
        cal() {
            p1.jbdmg += 10;
        },
    },
    kaspeed: {
        buffCode: "kaspeed",
        buffName: "가벼움",
        buffinfo: "카틀 열매를 먹어 생긴 버프다.",
        buffDesc: "속도 + 10",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.jbspd += 10;
        },
    },
    hide: {
        buffCode: "hide",
        buffName: "은신",
        buffinfo: "몸을 숨길 수 있는 연막을 펼친다.",
        buffDesc: "다음 적의 공격을 피한다.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.jbhwp += 100
        },
    },




    //몬스터가 거는 (디)버프
    weakness: {
        buffCode: "weakness",
        buffName: "나약함",
        buffinfo: "나같은 놈은 못할거야...",
        buffDesc: "전체적인 스탯이 떨어진다.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.jbhwp -= 200
            p1.jbdef -= 15
            p1.jbspd -= 10
            p1.jbdmg -= 10
        },
    },
    demsb: {
        buffCode: "demsb",
        buffName: "속박(악)",
        buffinfo: "사슬이 몸을 감싸 움직일 수 없다",
        buffDesc: "행동 불가.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.jbspd -= 10
        },
    },
    slow: {
        buffCode: "slow",
        buffName: "속도저하",
        buffinfo: "다리에 힘이 풀렸나..?",
        buffDesc: "속도가 하락한다.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.jbspd -= 15
        },
    },
    exhaust: {
        buffCode: "exhaust",
        buffName: "탈진",
        buffinfo: "몸에 힘이 들어가지 않는다..",
        buffDesc: "데미지가 하락한다.",
        type: "buff",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.xdmg -= 0.4
        },
    },
    bleeding: {
        buffCode: "bleeding",
        buffName: "출혈",
        buffinfo: "상처에서 피가 나오고 있다.",
        buffDesc: "매 턴 체력이 감소한다.",
        type: "dmgdbf",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.zhp -= 5
        },
    },
    bleeding2: {
        buffCode: "bleeding2",
        buffName: "출혈(강)",
        buffinfo: "깊은 상처에서 피가 나오고 있다.",
        buffDesc: "매 턴 체력이 10% 감소한다.",
        type: "dmgdbf",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.zhp -= Math.round(p1.zhp*0.1)
        },
    },
    mpoison: {
        buffCode: "mpoison",
        buffName: "중독",
        buffinfo: "온 몸에 독 기운이 돈다.",
        buffDesc: "매 턴 체력이 감소한다.",
        type: "dmgdbf",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.zhp -= Math.round(p1.zhp * 0.05)
        },
    },
    zep_ddo: {
        buffCode: "zep_ddo",
        buffName: "더러움",
        buffinfo: "더럽다.",
        buffDesc: "매 턴 체력이 감소한다.",
        type: "dmgdbf",
        char: "null",
        max: 1,
        now: 1,
        cal() {
            p1.zhp -= 10
        },
    },
}
// 디버프 종류 - 몬스터 강화&약화 Stat / 데미지&상태이상
const debuffs = {
    neutralize: {
        debuffCode: "neutralize",
        debuffName: "무력화",
        type: "bad",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.cok = 0
        },
    },
    wolf_sk: {
        debuffCode: "wolf_sk",
        debuffName: "늑대_신속",
        type: "stat",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.fmspd += 5
        },
    },
    wolf_st: {
        debuffCode: "wolf_st",
        debuffName: "늑대_강화",
        type: "stat",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.fmdmg += 5
        },
    },
    golem_def: {
        debuffCode: "golem_def",
        debuffName: "골렘_경화",
        type: "stat",
        max: 30,
        now: 30,
        cal() {
            Gdata.FMdata.fmdef += 40
        },
    },
    boar_ready: {
        debuffCode: "boar_ready",
        debuffName: "호그_돌격",
        type: "stat",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.fmdmg *= 2
        },
    },
    burn: {
        debuffCode: "burn",
        debuffName: "작열",
        type: "bad",
        max: 0,
        now: 0,
        cal() {
            Gdata.monster.hp -= 25
            if (Gdata.monster.hp < 0) {
                Gdata.monster.hp = 0;
            }
            dui(Gdata.monster.art)
            anitext(Gdata.monster.name + "(은)는 불타오르고 있다.", 0.1, "c", 2);
        },
    },
    moist: {
        debuffCode: "moist",
        debuffName: "수분",
        type: "bad",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.xmdmg = 0.8
            Gdata.FMdata.xmdef = 0.8
            anitext(Gdata.monster.name + "(은)는 젖어 있다.", 0.1, "c", 2);
        },
    },
    poison: {
        debuffCode: "poison",
        debuffName: "중독",
        type: "bad",
        max: 0,
        now: 0,
        cal() {
            Gdata.monster.hp -= Math.round(Gdata.FMdata.maxhp * 0.1)
            if (Gdata.monster.hp < 0) {
                Gdata.monster.hp = 0;
            }
            dui(Gdata.monster.art)
            anitext(Gdata.monster.name + "(은)는 중독되었다.", 0.1, "c", 2);
        },
    },
    shock: {
        debuffCode: "shock",
        debuffName: "감전",
        type: "bad",
        max: 0,
        now: 0,
        cal() {
            Gdata.FMdata.cok = 0
            anitext(Gdata.monster.name + "(은)는 몸이 찌릿거린다.", 0.1, "c", 2);
        },
    },
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
function dmgdbf() {
    for (let i = 0; i < p1.zbuff.length; i++) {
        if (p1.zbuff[i].type === "dmgdbf") {
            p1.zbuff[i].cal()
        }
    }
}


function mcstat() {
    Gdata.FMdata.xmdmg = 1
    Gdata.FMdata.xmdef = 1
    Gdata.FMdata.xmspd = 1

    Gdata.FMdata.fmdmg = Gdata.monster.dmg
    Gdata.FMdata.fmdef = Gdata.monster.def
    Gdata.FMdata.fmspd = Gdata.monster.spd

    for (let i = 0; i < Gdata.monster.buf.length; i++) {
        Gdata.monster.buf[i].cal()
    }
    Gdata.FMdata.fmdmg = Math.round(Gdata.FMdata.fmdmg * Gdata.FMdata.xmdmg)
    Gdata.FMdata.fmdef = Math.round(Gdata.FMdata.fmdef * Gdata.FMdata.xmdef)
    Gdata.FMdata.fmspd = Math.round(Gdata.FMdata.fmspd * Gdata.FMdata.xmspd)
}
function givbuff(buf, turn) {
    buf.max = turn
    buf.now = buf.max
    let nsb = true
    for (let i = 0; i < p1.zbuff.length; i++) {
        if (p1.zbuff[i].buffCode === buf.buffCode) {
            nsb = false
            p1.zbuff[i].max = turn
            p1.zbuff[i].now = p1.zbuff[i].max
        }
    }
    if (nsb) {
        p1.zbuff.push({ ...buf })
    }
}
function givdebuff(buf, turn) {
    buf.max = turn + 1
    buf.now = buf.max
    let nsb = true
    for (let i = 0; i < Gdata.monster.buf.length; i++) {
        if (Gdata.monster.buf[i].debuffCode === buf.debuffCode) {
            nsb = false
            Gdata.monster.buf[i].max = turn + 1
            Gdata.monster.buf[i].now = Gdata.monster.buf[i].max
        }
    }
    if (nsb) {
        Gdata.monster.buf.push({ ...buf })
    }
}
function ctbuff() {
    for (let i = (p1.zbuff.length - 1); i >= 0; --i) {
        p1.zbuff[i].now--
        if (p1.zbuff[i].now === 0) {
            p1.zbuff.splice(i, 1)
        }
    }
}
function mctbuff() {

    for (let i = (Gdata.monster.buf.length - 1); i >= 0; --i) {
        Gdata.monster.buf[i].now--
        if (Gdata.monster.buf[i].now === 0) {
            Gdata.monster.buf.splice(i, 1)
        }
    }
}



module.exports = {
    buffs,
    debuffs,
    givbuff,
    givdebuff,
    ctbuff,
    mctbuff,
    mcstat,
    dmgdbf
}