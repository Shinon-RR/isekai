const chalk = require("chalk");
const { p1, Gdata } = require("./users-data");
const { sleep, aniprt, br, cl, anitext, rand, anigiv, checkstat, checklv, checkQ, ckit, cksk } = require("./func");
const readlineSync = require("readline-sync");
// const { items } = require("./items2");
const { items } = require("./items");
// let { ft} = require("./G-data");
// let { Gdata } = require("./G-data");
const { ctbuff, buffs, mcstat, mctbuff, givdebuff, debuffs, givbuff, dmgdbf } = require("./buffs");
const { skills, checkbuff } = require("./skills");

// const { fui , fcl , cart } = require("./server");

// KillMonster


//전투 부분
function fight(mon, baesu) {
  Gdata.monster = {}
  Gdata.monster = { ...mon }
  Gdata.monster.hp = Math.round(Gdata.monster.hp * baesu)
  Gdata.monster.dmg = Math.round(Gdata.monster.dmg * baesu)
  Gdata.monster.def = Math.round(Gdata.monster.def * baesu)
  Gdata.FMdata.maxhp = Gdata.monster.hp
  checkstat()
  for (let si = 0; si < p1.skill.length; si++) {
    if (p1.skill[si].yesCo) {
      p1.skill[si].used = p1.skill[i].maxUse
    }
  }

  yrd = 0;
  zip = 0;
  pturn = 0;
  mturn = 0;
  Gdata.ft = 1;
  pmhwp = 0;
  var psk = 0;
  Gdata.FMdata.mcal = 0;
  Gdata.FMdata.caldmg = 0;
  var turn = 0;
  var fturn = 0;


  //적에게 가하는 데미지 계산 부분
  function caca() {
    if (Gdata.FMdata.caldmg !== 0) {
      if (Gdata.chwp === 1) {
        Gdata.chwp = 0;
        fui(Gdata.monster.art);
        anitext(Gdata.monster.name + "(은)는 공격을 피했다!", 0.1, "c", 2);
        Gdata.FMdata.caldmg = 0
        return 0
      } else {
        br();
        if (rand(100) <= p1.cri) {
          Gdata.FMdata.caldmg *= 2;
          anitext("크리티컬!", 0.1, "c", 1);
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
        fui(Gdata.monster.art);

        anitext(Gdata.monster.name + "(은)는 " + Gdata.FMdata.caldmg + "의 데미지를 입었다!", 0.1, "c", 2);
        Gdata.FMdata.caldmg = 0
        return 1
      }
    } else {
      return 0
    }
  }
  function pturnend() {
    cjj = 0;
    turn++;
    pturn = 0;
    mctbuff()
  }
  function ckdead() {
    if (p1.zhp <= 0) {
      fui(Gdata.monster.art);
      anitext("크윽...", 0.1, "w", 2);
      br();
      anitext(p1.name + "용사는 쓰러졌다.", 0.1, "c", 3);
      cl();
      dea = true
      pturn = 0;
      mturn = 0;
      Gdata.ft = 0;
      Gdata.FMdata.cok = 0;
      Gdata.FMdata.dead = true
    }
  }

  //적이 죽으면 끝나는 반복문---------------------------------------------------
  while (Gdata.ft === 1) {
    //몬스터 첫 조우
    while (turn === 0) {
      fui(Gdata.monster.art);
      anitext(Gdata.monster.name + "(이)가 출현했다!", 0.01, "c", 1);
      br();
      anitext(Gdata.monster.tk1, 0.1, "w", 4);
      br();
      turn++;
    }

    //스피드 빠르면 선공
    if (p1.zsj === 1) {
      pturn = 1;
      ptt = 1;
      fturn = 1;
    } else {
      if (fturn === 0 && Gdata.fmspd <= p1.zspd) {
        pturn = 1;
        ptt = 1;
        fturn = 1;
      } else {
        mturn = 1;
        fturn = 2;
      }
    }

    //몬스터 턴
    while (mturn === 1) {
      Gdata.FMdata.mcal = 0;
      if (fturn === 2) {
        fturn = 0;
        ptt = 1;
        pturn = 1;
      }
      Gdata.FMdata.cok = 1
      mcstat()
      fui(Gdata.monster.art);


      if (Gdata.monster.hp <= 0) {
        Gdata.monster.hp = 0;
        fui(Gdata.monster.art);
        anitext(Gdata.monster.tk2, 0.1, "w", 2);
        br();
        anitext(Gdata.monster.name + "(을)를 물리쳤다!", 0.01, "c", 3);
        cl();
        pturn = 0;
        mturn = 0;
        Gdata.ft = 0;
        Gdata.FMdata.cok = 0;
      }

      //공격
      if (Gdata.FMdata.cok === 1) {
        Gdata.monster.atk();
      }
      mturn = 0;
      ckdead()
      ctbuff()
    }

    //플레이어 턴
    while (pturn === 1) {
      checkstat()

      Gdata.FMdata.caldmg = 0;
      if (fturn === 1) {
        fturn = 0;
        mturn = 1;
      }

      //턴 시작하고 최초 1회 실행
      while (ptt === 1) {
        dmgdbf()
        ckdead()
        ptt = 0;
        cjj = 0;
        p1.zmp += p1.mpzen * p1.xmpzen;
        if (p1.zmp >= p1.fmp) {
          p1.zmp = p1.fmp;
        }
        // p1.zhp += p1.hpzen * p1.xhpzen;
        // if (p1.zhp >= p1.fhp) {
        //   p1.zhp = p1.fhp;
        // }
        // anitext((p1.mpzen * p1.xmpzen) + "mp 회복" + (p1.hpzen * p1.xhpzen) + "mp 회복", 0.01, "c", 1);
      }

      fui(Gdata.monster.art);
      console.log(chalk.cyan("1.기본공격 2.스킬 3.인벤토리 4.도망"));
      anitext(p1.name + "용사의 행동은?", 0.01, "c", 0.1);
      const fchoice = readlineSync.question(" > ");
      switch (fchoice) {
        case "1":
          //기본공격
          fui("platk");
          if (p1.class === "warrior") {
            anitext(p1.name + "용사의 검 휘두르기!", 0.1, "c", 2);
            Gdata.FMdata.caldmg = p1.zdmg;
          }
          if (p1.class === "defender") {
            anitext(p1.name + "용사의 방패공격!", 0.1, "c", 2);
            Gdata.FMdata.caldmg = p1.zdef;
          }
          if (p1.class === "magiccaster") {
            anitext(p1.name + "용사의 지팡이 공격!", 0.1, "c", 1);
            anitext("(물리)", 0.1, "c", 1);
            Gdata.FMdata.caldmg = p1.zdmg * 0.5;
          }
          if (p1.class === "rogue") {
            anitext(p1.name + "용사의 암살!", 0.1, "c", 2);
            Gdata.FMdata.caldmg = p1.zdmg;
          }
          if (p1.class === "archer") {
            if (checkbuff(buffs.focus)) {
              anitext(p1.name + "용사의 집중사격!", 0.1, "c", 2);
              Gdata.FMdata.caldmg = p1.zdmg * 1.3;
            } else {
              anitext(p1.name + "용사의 사격!", 0.1, "c", 2);
              Gdata.FMdata.caldmg = p1.zdmg;
            }
          }
          if (p1.class === "tenster") {
            anitext(p1.name + "개발자의 평타", 0.1, "c", 2);
            Gdata.FMdata.caldmg = p1.zdmg * 1;
          }
          caca();
          pturnend();
          break;
        case "2":
          fui(Gdata.monster.art);
          psk = 1;
          while (psk === 1) {
            if (p1.skill.length === 0) {
              anitext("스킬이 없다.", 0.01, "c", 1);
            } else {
              let Sli = []
              let Snum = []
              for (let si = 0; si < p1.skill.length; si++) {
                for (let sci = 0; sci < p1.skill[si].can.length; sci++) {
                  if (p1.skill[si].can[sci] === "fsk") {
                    Sli.push("[" + p1.skill[si].skillName + " - " + p1.skill[si].reqMana + "]")
                    Snum.push(si)
                  }
                }
              }
              let Sch = readlineSync.keyInSelect(Sli, " > ", { cancel: "뒤로" });
              if (Sch >= 0) {
                if (p1.skill[Snum[Sch]].reqMana <= p1.zmp) {
                  if (p1.skill[Snum[Sch]].yesCo) {
                    if (p1.skill[Snum[Sch]].used > 0) {
                      p1.skill[Snum[Sch]].used--
                      Gdata.FMdata.caldmg = 0
                      p1.zmp -= p1.skill[Snum[Sch]].reqMana
                      fui(p1.skill[Snum[Sch]].skillIcon);
                      p1.skill[Snum[Sch]].active("fsk")
                      pturnend();
                      psk--
                    } else {
                      anitext("(더는 사용 할 수 없다.)", 0.1, "w", 2);
                    }
                  } else {
                    Gdata.FMdata.caldmg = 0
                    p1.zmp -= p1.skill[Snum[Sch]].reqMana
                    fui(p1.skill[Snum[Sch]].skillIcon);
                    p1.skill[Snum[Sch]].active("fsk")
                    pturnend();
                    psk--
                  }
                } else {
                  anitext("(숨이 턱 막힌다...)", 0.1, "w", 2);
                }
              } else {
                psk--
              }
            }
          }
          break;
        case "3":
          //인벤토리
          fui(Gdata.monster.art);
          anitext("인벤토리를 열었다.", 0.01, "c", 1);
          fui(Gdata.monster.art);

          if (p1.inven.length > 0) {
            anitext("0. 뒤로가기", 0.01, "c", 0.1);
            br();
            for (let i = 0; i < p1.inven.length; i++) {
              anitext(i + 1 + ". " + p1.inven[i].itemName + " " + p1.inven[i].hav + "개 보유", 0.01, "c", 0.1);
              br();
            }
            psk = 1;
            while (psk === 1) {
              anitext("사용할 아이템은?", 0.01, "c", 0.1);
              let fchoice = readlineSync.question(" > ");
              if (fchoice === "0") {
                psk = 0;
              } else {
                if (fchoice <= p1.inven.length && fchoice >= 1) {
                  fui(Gdata.monster.art);
                  p1.inven[fchoice - 1].active();
                  psk = 0;
                } else {
                  fui(Gdata.monster.art);
                  anitext(p1.name + "용사는 이해하지 못했다.", 0.1, "c", 2);
                }
              }
            }
          } else {
            anitext("인벤토리가 비어있다.", 0.01, "c", 1);
          }

          // br()
          // anitext("내 스탯 HP:" + p1.zhp + "/MP:" + p1.zmp + "/DMG:" + p1.zdmg + "/DEF:" + p1.zdef + "/SPD:" + p1.zspd, 0.1, 'c', 2);
          // turn++
          // pturn = 0
          break;
        case "4":
          //도망
          fui(Gdata.monster.art);
          if (p1.zspd > Gdata.monster.spd) {
            anitext(Gdata.monster.name + "(으)로부터 도망쳤다.", 0.1, "c", 3);
            run = 1;
            pturn = 0;
            Gdata.ft = 0;
          } else {
            anitext("도망칠 수 없다..", 0.1, "c", 3);
          }
          break;
        default:
          anitext("다시 입력하세요", 0.01, "c", 1);
      }
      if (Gdata.monster.hp <= 0) {
        fui(Gdata.monster.art);
        anitext(Gdata.monster.tk2, 0.1, "w", 2);
        br();
        anitext(Gdata.monster.name + "(을)를 물리쳤다!", 0.01, "c", 3);
        cl();
        pturn = 0;
        mturn = 0;
        Gdata.ft = 0;
        Gdata.FMdata.cok = 0;
      }
      ckdead()
    }
  }
  fui(Gdata.monster.art);
  if (run === 0 && p1.zhp > 0) {
    p1.exp += Math.round(Gdata.monster.exp * baesu);
    p1.gold += Math.round(Gdata.monster.gold * baesu);
    anitext(Math.round(Gdata.monster.gold * baesu) + "골드와 " + Math.round(Gdata.monster.exp * baesu) + "경험치를 획득했다.", 0.1, "c", 2);
    Gdata.FMdata.KillMonster = Gdata.monster.art
    Gdata.monster.tem()
    checklv()

    // 퀘스트 체크
    checkQ()

    Gdata.FMdata.KillMonster = ""
  } else {
    run = 0;
  }

}




var cjj = 0;

var cmhp = 0;
Gdata.monster.hp = cmhp;
var cjhk = "";
var yrd = 0;
var zip = 0;
var pturn = 0;
var mturn = 0;
var bansa = 0
Gdata.ft = 0;
var pmhwp = 0;
var run = 0;

var chh = 0;

var ptt = 0;


let tsmon = "";



//청소+ui띄우기
function fui(ccart) {
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
    process.stdout.write(chalk.red(" 데미지 : " + Gdata.monster.dmg));
    process.stdout.write(chalk.red(" 방여력 : " + Gdata.monster.def));
    process.stdout.write(chalk.red(" 스피드 : " + Gdata.monster.spd));
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
  process.stdout.write(chalk.cyanBright(" " + Gdata.monster.name + " "));
  for (let bi = 0; bi < Gdata.monster.buf.length; bi++) {
    process.stdout.write(chalk.cyanBright(" [" + Gdata.monster.buf[bi].debuffName + " " + Gdata.monster.buf[bi].now + "]"));
  }
  br();

  //상태이상 띄우기
  // if (chk === "silence") {
  //   process.stdout.write(chalk.white("[침묵]"));
  // }
  // if (chk === "burn") {
  //   process.stdout.write(chalk.red("[작열]"));
  // }
  // if (chk === "moist") {
  //   process.stdout.write(chalk.blueBright("[수분]"));
  // }
  // if (chk === "shock") {
  //   process.stdout.write(chalk.yellowBright("[감전]"));
  // }
  // if (chk === "poison") {
  //   process.stdout.write(chalk.magentaBright("[중독]"));
  // }
  // if (chk === "neutralize") {
  //   process.stdout.write(chalk.gray("[무력화]"));
  // }
  process.stdout.write(chalk.redBright(" HP : " + Gdata.monster.hp + " / " + Gdata.FMdata.maxhp));
  br();
  // process.stdout.write(chalk.cyanBright(" 버프 : "));

  console.log(line);
  aniprt(ccart);
  console.log(line);
}


function mzcaca(dmg) {
  let dr = false
  if (checkbuff(buffs.defense)) {
    fui(Gdata.monster.art);
    anitext(p1.name + "용사는 적의 공격을 막아냈다!", 0.1, "c", 2);
  } else {
    if (rand(100) <= p1.fhwp || checkbuff(buffs.hide)) {
      pmhwp = 0;
      fui(Gdata.monster.art);
      anitext(p1.name + "용사는 적의 공격을 회피했다!", 0.1, "c", 2);
    } else {
      dr = true
      if (dmg <= 0) {
        dmg = 1;
      }
      dmg = Math.round(dmg)
      p1.zhp -= dmg;
      if (p1.zhp < 0) {
        p1.zhp = 0;
      }
      fui(Gdata.monster.art);
      anitext(p1.name + "용사는 " + dmg + "의 피해를 입었다!", 0.1, "c", 2);
      if (checkbuff(buffs.reflection) && p1.zhp > 0) {
        Gdata.monster.hp -= dmg
        if (Gdata.monster.hp <= 0) {
          Gdata.monster.hp = 0
        }

        fui(Gdata.monster.art);
        anitext(Gdata.monster.name + "(은)는 반사 피해를 입었다!", 0.1, "c", 2);
      }
      if (chh === 1 && p1.zhp > 0 && Gdata.monster.hp > 0) {
        chh = 0;
        Gdata.monster.hp += dmg;
        if (Gdata.monster.hp > Gdata.FMdata.maxhp) {
          Gdata.monster.hp = Gdata.FMdata.maxhp;
        }

        fui(Gdata.monster.art);
        anitext(Gdata.monster.name + "(은)는 체력을 " + dmg + "회복했다!", 0.1, "c", 2);
      }
    }
  }
  return dr
}

const monsters = {
  복사용: {
    name: "이름",
    art: "그림",
    hp: 80,
    spd: 5,
    dmg: 15,
    def: 10,
    buf: [],
    tk1: '"조우"',
    tk2: '"사망"',
    exp: 10,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e0, rand(3), 1)
      }
      if (20 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 60) {
        //몬스터 기본공격
        anitext("늑대의 깨물기!", 0.1, "c", 1);
        fui("w.q");
        anitext('"아그작"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 90) {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("늑대의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = (Gdata.FMdata.fmdmg - p1.zdef) * 2;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("늑대의 울부짖기!", 0.1, "c", 0.5);
        fui("w.r");
        anitext('"아우울!"', 0.1, "w", 2);
        br();
        givdebuff(debuffs.wolf_sk, 2)
        anitext("늑대가 빨라졌다!", 0.1, "c", 2);
      }
    },
  },
  wolf: {
    name: "늑대",
    art: "wolf",
    hp: 80,
    spd: 5,
    dmg: 20,
    def: 10,
    buf: [],
    tk1: '"으르릉"',
    tk2: '"깨갱"',
    exp: 10,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e0, rand(3), 1)
      }
      if (20 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (50 >= rand(100)) {
          anigiv(items.e11, 1, 1)
        }
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 60) {
        //몬스터 기본공격
        anitext("늑대의 깨물기!", 0.1, "c", 1);
        fui("w.q");
        anitext('"아그작"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 90) {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("늑대의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = (Gdata.FMdata.fmdmg - p1.zdef) * 2;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("늑대의 울부짖기!", 0.1, "c", 0.5);
        fui("w.r");
        anitext('"아우울!"', 0.1, "w", 2);
        br();
        givdebuff(debuffs.wolf_sk, 2)
        anitext("늑대가 빨라졌다!", 0.1, "c", 2);
      }
    },
  },
  goldwolf: {
    name: "황금늑대",
    art: "gwolf",
    hp: 200,
    spd: 50,
    dmg: 40,
    def: 10,
    buf: [],
    tk1: '"크르르릉"',
    tk2: '"깨갱"',

    exp: 100,
    gold: 100,

    tem() {
      if (60 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e0, rand(3), 1)
      }
      if (20 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e1, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (50 >= rand(100)) {
          anigiv(items.e11, 1, 1)
        }
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 50) {
        //몬스터 기본공격
        anitext("황금늑대의 깨물기!", 0.1, "c", 1);
        fui("w.q");
        anitext('"아그작"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 90) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("황금늑대의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg * 2 - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("늑대의 울부짖기!", 0.1, "c", 0.5);
        fui("w.r");
        anitext('"아우울!"', 0.1, "w", 2);
        givdebuff(debuffs.wolf_st, 2)
        br();
        anitext("늑대가 강해졌다!", 0.1, "c", 2);
      }
    },
  },
  goblin_r: {
    name: "단검 고블린",
    art: "goblin.1",
    hp: 160,
    spd: 15,
    dmg: 25,
    def: 20,
    buf: [],
    tk1: '"끼에엑!"',
    tk2: '"끄으윽..."',
    exp: 20,
    gold: 40,

    tem() {
      if (50 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 60) {
        //몬스터 기본공격
        anitext("고블린이 뛰어온다!", 0.1, "c", 1);
        fui("goblin.w");
        anitext('"키이에에!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          if (rand(100) <= 30) {
            givbuff(buffs.bleeding, 3)
            br()
            anitext("상처에서 출혈이..!", 0.1, "c", 1);
          }
        }
      } else {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("고블린의 검 투척!", 0.1, "c", 1);
        fui("goblin.r");
        anitext('"..."', 0.1, "w", 2);
        Gdata.FMdata.mcal = (Gdata.FMdata.fmdmg * 1.5) - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      }
    },
  },
  forest_Raiku: {
    name: "숲의 라이쿠",
    art: "forest_Raiku",
    hp: 200,
    spd: 15,
    dmg: 35,
    def: 30,
    buf: [],
    tk1: '"..."',
    tk2: '"크으으..."',
    exp: 30,
    gold: 30,

    tem() {
      if (50 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
      if (30 >= rand(100)) {
        anigiv(items.e9, rand(3), 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 60) {
        //몬스터 기본공격
        anitext("라이쿠가 돌진한다!", 0.1, "c", 1);
        fui("forest_Raiku.q");
        anitext('"크으으으아!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal)

      } else {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("가시가 날라온다!", 0.1, "c", 1);
        fui("forest_Raiku.w");
        anitext('"..."', 0.1, "w", 2);
        Gdata.FMdata.mcal = (Gdata.FMdata.fmdmg * 1.5) - p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          if (rand(100) <= 30) {
            givbuff(buffs.mpoison, 3)
            br()
            anitext("몸에 독 기운이 돌기 시작했다!", 0.1, "c", 1);
          }
        }
      }
    },
  },
  sunmoon: {
    name: "해품달",
    art: "sunmoon",
    hp: 50,
    spd: 5,
    dmg: 50,
    def: 5,
    buf: [],
    tk1: '"히으..?"',
    tk2: '"흐으으..."',
    exp: 30,
    gold: 10,

    tem() {
      if (30 >= rand(100)) {
        anigiv(items.e4, 1, 1)
      }
      if (50 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (30 >= rand(100)) {
          anigiv(items.e17, 2, 1)
        }
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 60) {
        //몬스터 기본공격
        anitext("해품달이 걸어온다!", 0.1, "c", 1);
        fui("sunmoon.q");
        anitext('"하아악!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          if (rand(100) <= 80) {
            givbuff(buffs.bleeding, 4)
            br()
            anitext("상처에서 출혈이..!", 0.1, "c", 1);
          }
        }
      } else {
        fui(Gdata.monster.art);
        anitext("해품달이 도망쳤다!", 0.1, "c", 0.5);
        br();
        anitext('"히이익!"', 0.1, "w", 3);
        cl();
        run = 1;
        pturn = 0;
        Gdata.ft = 0;
      }
    },
  },
  gsunmoon: {
    name: "빛나는 해품달",
    art: "gsunmoon",
    hp: 30,
    spd: 15,
    dmg: 100,
    def: 20,
    buf: [],
    tk1: '"히으..?"',
    tk2: '"흐으으..."',
    exp: 30,
    gold: 10,

    tem() {
      if (30 >= rand(100)) {
        anigiv(items.e5, 1, 1)
      }
      if (50 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (30 >= rand(100)) {
          anigiv(items.e17, 2, 1)
        }
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 80) {
        //몬스터 기본공격
        anitext("해품달이 걸어온다!", 0.1, "c", 1);
        fui("sunmoon.q");
        anitext('"하아악!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          if (rand(100) <= 80) {
            givbuff(buffs.mpoison, 4)
            br()
            anitext("몸에 독 기운이 돌기 시작했다!", 0.1, "c", 1);
          }
        }
      } else {
        fui(Gdata.monster.art);
        anitext("해품달이 도망쳤다!", 0.1, "c", 0.5);
        br();
        anitext('"히이익!"', 0.1, "w", 3);
        cl();
        run = 1;
        pturn = 0;
        Gdata.ft = 0;
      }
    },
  },
  bat: {
    name: "흡혈박쥐",
    art: "bat",
    hp: 50,
    spd: 30,
    dmg: 10,
    def: 0,
    buf: [],
    tk1: '"찍!"',
    tk2: '"찌익!"',
    exp: 15,
    gold: 20,

    tem() {
      if (60 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e2, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (50 >= rand(100)) {
          anigiv(items.e18, 1, 1)
        }
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 40) {
        //몬스터 기본공격
        anitext("흡혈박쥐의 발톱 할퀴기!", 0.1, "c", 1);
        fui("w.w");
        anitext('"찍찍!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 80) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("흡혈박쥐의 흡혈!", 0.1, "c", 0.5);
        fui("w.q");
        anitext('"찍찍!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        chh = 1;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("흡혈박쥐가 도망쳤다!", 0.1, "c", 0.5);
        br();
        anitext("(퍼덕퍼덕)", 0.1, "w", 3);
        cl();
        run = 1;
        pturn = 0;
        Gdata.ft = 0;
      }
    },
  },
  goat: {
    name: "불길한 염소",
    art: "gwolf",
    hp: 130,
    spd: 13,
    dmg: 30,
    def: 66,
    buf: [],
    ftk: "무언가 이상한 기운의 염소가 당신을 주시합니다.",
    tk1: '"메에-"',
    tk2: '"어린양이여 난 다시 돌아올 것이다."',

    exp: 44,
    gold: 44,

    tem() {
      if (60 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 30) {
        //몬스터 기본공격
        fui("pm5");
        anitext("염소가 지긋이 쳐다봅니다.", 0.1, "c", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 90) {
        //몬스터 1스킬
        fui("pm5");
        anitext("당신의 시야와 정신을 날카롭게 헤집습니다.", 0.1, "c", 2);
        Gdata.chwp = 1;
      } else if (crd < 100) {
        //몬스터 2스킬
        fui("pa2");
        anitext("불길한 염소가 당신을 조종하여 자신의 무기로 자신을 공격하게 합니다.", 0.1, "c", 0.5);
        Gdata.FMdata.mcal = p1.zdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
        // anitext('어딜 공격하는 거죠?', 0.1, 'c', 2);
      }
    },
  },
  trabbit: {
    name: "대토",
    art: "trabbit",
    hp: 1000,
    spd: 200,
    dmg: 9999,
    def: 0,
    buf: [],
    tk1: '"..."',
    tk2: '"끼익!"',
    exp: 999,
    gold: 999,


    tem() {
      if (60 >= Math.floor(Math.random() * 100) + 1) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      fui(Gdata.monster.art);
      //몬스터 기본공격
      anitext("대토의 공격!", 0.1, "c", 0.5);
      fui(Gdata.monster.art);
      anitext('"..!"', 0.1, "w", 0.5);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef
      mzcaca(Gdata.FMdata.mcal);
    },
  },
  rabbit: {
    name: "토끼",
    art: "rabbit",
    hp: 20,
    spd: 20,
    dmg: 5,
    def: 0,
    buf: [],
    tk1: '"..?"',
    tk2: '"끼익!"',
    exp: 10,
    gold: 5,


    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (80 >= rand(100)) {
          anigiv(items.e20, 2, 1)
        }
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("토끼가 도망쳤다!", 0.1, "c", 0.5);
      cl();
      run = 1;
      pturn = 0;
      Gdata.ft = 0;
    },
  },
  reddracal: {
    name: "레드 드라칼",
    art: "reddracal",
    hp: 845,
    spd: 20,
    dmg: 155,
    def: 100,
    buf: [],
    tk1: '"쿠오오오오오"',
    tk2: '"크어어어어어"',
    exp: 490,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e3, 1, 1)
      }
      if (80 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 40) {
        anitext("레드 드라칼의 브래스!", 0.1, "c", 1);
        fui("reddracal.brass");
        anitext('(화르륵)', 0.1, "r", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg * 1.5 - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 90) {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("레드 드라칼의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("레드 드라칼의 포효!", 0.1, "c", 0.5);
        fui("reddracal.howl");
        anitext('"쿠우우오오오아아아"', 0.1, "w", 2);
        br();
        givbuff(buffs.weakness, 4)
        anitext("(오한이 느껴진다)", 0.1, "c", 2);
      }
    },
  },
  bluedracal: {
    name: "블루 드라칼",
    art: "bluedracal",
    hp: 900,
    spd: 10,
    dmg: 100,
    def: 155,
    buf: [],
    tk1: '"쿠오오오오오"',
    tk2: '"크어어어어어"',
    exp: 600,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e3, 1, 1)
      }
      if (80 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 40) {
        anitext("블루 드라칼의 브래스!", 0.1, "c", 1);
        fui("bluedracal.brass");
        anitext('(화르륵)', 0.1, "r", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg * 1.5 - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 80) {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("블루 드라칼의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("블루 드라칼의 포효!", 0.1, "c", 0.5);
        fui("bluedracal.howl");
        anitext('"쿠우우오오오아아아"', 0.1, "w", 2);
        br();
        givbuff(buffs.weakness, 4)
        anitext("(오한이 느껴진다)", 0.1, "c", 2);
      }
    },
  },
  magentadracal: {
    name: "마젠타 드라칼",
    art: "magentadracal",
    hp: 1000,
    spd: 50,
    dmg: 200,
    def: 200,
    buf: [],
    tk1: '"쿠오오오오오"',
    tk2: '"크어어어어어"',
    exp: 800,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e3, 1, 1)
      }
      if (80 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 40) {
        anitext("마젠타 드라칼의 브래스!", 0.1, "c", 1);
        fui("magentadracal.brass");
        anitext('(화르륵)', 0.1, "r", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg * 1.5 - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 80) {
        // } else if (false) {
        //몬스터 1스킬
        fui(Gdata.monster.art);
        anitext("마젠타 드라칼의 할퀴기!", 0.1, "c", 0.5);
        fui("w.w");
        anitext('"크아앙"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("마젠타 드라칼의 포효!", 0.1, "c", 0.5);
        fui("magentaracal.howl");
        anitext('"쿠우우오오오아아아"', 0.1, "w", 2);
        br();
        givbuff(buffs.weakness, 4)
        anitext("(오한이 느껴진다)", 0.1, "c", 2);
      }
    },
  },
  apmon: {
    name: "수상한 사과",
    art: "apmon",
    hp: 10,
    spd: 30,
    dmg: 50,
    def: 5,
    buf: [],
    tk1: '"으히히!"',
    tk2: '(썩은 사과 냄새가 난다)',
    exp: 30,
    gold: 10,

    tem() {
      anigiv(items.i3, 1, 1)
      if (30 >= rand(100)) {
        anigiv(items.e4, 1, 1)
      }
      if (50 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("사과가 날라온다!", 0.1, "c", 1);
      fui("platk");
      anitext('"낄낄낄!"', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        if (rand(100) <= 80) {
          givbuff(buffs.mpoison, 4)
          br()
          anitext("몸에 독 기운이 감돈다..", 0.1, "c", 1);
        }
      }

    },
  },
  golemTypeA: {
    name: "골렘 TypeA",
    art: "golem-a",
    hp: 1000,
    spd: 50,
    dmg: 100,
    def: 10,
    buf: [{ ...debuffs.golem_def }],
    tk1: '"..."',
    tk2: '"내가 겨우 이런녀석에게......"',
    exp: 300,
    gold: 30,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e8, rand(3), 1)
      }
      if (40 >= rand(100)) {
        anigiv(items.e6, 3, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 70) {
        anitext("골렘이 눈 앞에서 사라졌다!", 0.1, "c", 1);
        fui("golem-a.dash");
        anitext('"..."', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        fui(Gdata.monster.art);
        anitext("골렘이 가속한다!", 0.1, "c", 0.5);
        fui("golem-a.atk");
        anitext('"..."', 0.1, "w", 2);
        br();
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg
        if (mzcaca(Gdata.FMdata.mcal)) {
          givbuff(buffs.bleeding2, 5)
          br()
          anitext("상처가 깊다...", 0.1, "c", 2);
        }
      }
    },
  },
  golemTypeB: {
    name: "골렘 TypeB",
    art: "golem-b",
    hp: 800,
    spd: 10,
    dmg: 80,
    def: 40,
    buf: [{ ...debuffs.golem_def }],
    tk1: '"..."',
    tk2: '"..."',
    exp: 400,
    gold: 30,
    bone: 8,

    tem() {
      if (this.bone > 0) {
        anigiv(items.e7, this.bone, 1)
      }
      if (60 >= rand(100)) {
        anigiv(items.e8, rand(3), 1)
      }
      if (40 >= rand(100)) {
        anigiv(items.e6, 3, 1)
      }
    },

    atk() {
      if (this.bone > 0) {
        let crd = rand(100)
        fui(Gdata.monster.art);
        if (crd < 70) {
          this.bone--
          anitext("골렘이 뼈를 뽑아 던진다!", 0.1, "c", 1);
          fui("golem-b.atk");
          anitext('"..."', 0.1, "w", 2);
          Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
          mzcaca(Gdata.FMdata.mcal);
        } else if (crd < 100) {
          fui(Gdata.monster.art);
          anitext("골렘이 분노했다!", 0.1, "c", 0.5);
          fui("golem-b.dash");
          anitext('"크으으아!!"', 0.1, "w", 2);
          br();
          Gdata.FMdata.mcal = Gdata.FMdata.fmdmg
          if (mzcaca(Gdata.FMdata.mcal)) {
            givbuff(buffs.slow, 5)
            br()
            anitext("다리가 후덜거린다..", 0.1, "c", 2);
          }
        }
      } else {
        this.zhp = 0
        fui(Gdata.monster.art);
        anitext("골렘이 무너졌다!", 0.1, "c", 1);
      }
    },
  },
  golemTypeC: {
    name: "골렘 TypeC",
    art: "golem-c",
    hp: 500,
    spd: 20,
    dmg: 200,
    def: 5,
    buf: [{ ...debuffs.golem_def }],
    tk1: '"!!!"',
    tk2: '(위잉...)',
    exp: 300,
    gold: 30,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e8, rand(3), 1)
      }
      if (40 >= rand(100)) {
        anigiv(items.e6, 3, 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 30) {
        anitext("골렘이 위협적인 공격을 가한다!", 0.1, "c", 1);
        fui("golem-c.atk");
        anitext('"..."', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        fui(Gdata.monster.art);
        anitext("골렘이 돌진한다!", 0.1, "c", 0.5);
        fui("golem-c.dash");
        anitext('"...', 0.1, "w", 2);
        br();
        Gdata.FMdata.mcal = (Gdata.monster.hp / 2)
        if (mzcaca(Gdata.FMdata.mcal)) {
          givbuff(buffs.exhaust, 2)
          br()
          anitext("힘이 빠진다..", 0.1, "c", 2);
        }
      }
    },
  },
  cmon: {
    name: "쉘 스파이더",
    art: "cmon",
    hp: 200,
    spd: 10,
    dmg: 50,
    def: 30,
    buf: [],
    tk1: '"크르르"',
    tk2: '"..."',
    exp: 50,
    gold: 30,

    tem() {
      if (30 >= rand(100)) {
        // anigiv(items.e4, 1, 1)
      }
      if (50 >= rand(100)) {
        anigiv(items.e1, 3, 1)
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("쉘 스파이더가 공격한다!", 0.1, "c", 1);
      fui("cmon.at");
      anitext('"키악!"', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        if (rand(100) <= 80) {
          givbuff(buffs.mpoison, 4)
          br()
          anitext("몸에 독 기운이 감돈다..", 0.1, "c", 1);
        }
      }

    },
  },
  bladebird: {
    name: "칼날수리",
    art: "bladebird",
    hp: 500,
    spd: 30,
    dmg: 70,
    def: 40,
    buf: [],
    tk1: '"키아악!!!"',
    tk2: '"키이이.."',
    exp: 200,
    gold: 50,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e6, 1, 1)
      }
      if (80 >= rand(100)) {
        anigiv(items.e10, rand(5), 1)
      }
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (crd < 30) {
        anitext("칼날수리가 날아온다!", 0.1, "c", 1);
        fui("bladebird.dash");
        anitext('"키아아아!!"', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg * 1.5 - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 80) {
        fui(Gdata.monster.art);
        anitext("칼날수리의 공격!", 0.1, "c", 0.5);
        fui("bladebird.atk");
        anitext('(칼날 소리가 들린다..)', 0.1, "c", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd <= 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext("칼날수리가 울부짖는다!", 0.1, "c", 0.5);
        fui(Gdata.monster.art);
        anitext('"크아아아아아!!!"', 0.1, "w", 2);
        br();
        givbuff(buffs.slow, 3)
        anitext("다리가 떨려온다..", 0.1, "c", 2);
      }
    },
  },
  vdem: {
    name: "바알",
    art: "vdem",
    hp: 5000,
    spd: 50,
    dmg: 500,
    def: 200,
    buf: [],
    tk1: '"으하하하하!!"',
    tk2: '"내 죽음은 헛되지 않으리!"',
    exp: 666,
    gold: 66,
    sb: 2,

    tem() {
      anigiv(items.e19, 1, 1)
    },

    atk() {
      let crd = rand(100)
      fui(Gdata.monster.art);
      if (this.sb > 0 && this.hp <= (Gdata.FMdata.maxhp * 0.5) && crd < 30) {
        //몬스터 기본공격
        anitext('"나에게서 도망칠 수는 없다!"', 0.1, "r", 1);
        fui("vdem.sb");
        anitext('"크아아!"', 0.1, "r", 2);
        Gdata.FMdata.mcal = p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          givbuff(buffs.demsb, rand(2))
        }
      } else if (crd < 60) {
        //몬스터 기본공격
        anitext('"필멸자여, 덤벼라!"', 0.1, "r", 1);
        fui("vdem.atk");
        anitext('"크아아!"', 0.1, "r", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      } else if (crd < 100) {
        //몬스터 2스킬
        fui(Gdata.monster.art);
        anitext('"으아아아아아아!"', 0.03, "r", 0.5);
        fui("vdem.sk");
        anitext('"대학살이다!"', 0.15, "r", 2);
        Gdata.FMdata.mcal = (Gdata.FMdata.fmdmg * 1.2) - p1.zdef;
        if (mzcaca(Gdata.FMdata.mcal)) {
          givbuff(buffs.slow, rand(2))
        }
      }
    },
  },
  deadog: {
    name: "헬파이어 크리쳐",
    art: "deadog",
    hp: 1000,
    spd: 20,
    dmg: 500,
    def: 5,
    buf: [],
    tk1: '"크르르"',
    tk2: '"...크헝"',
    exp: 300,
    gold: 444,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e6, 3, 1)
      }

    },

    atk() {
      fui(Gdata.monster.art);
      anitext("헬파이어 크리쳐가 무섭게 달려온다!", 0.1, "c", 1);
      fui("d.q");
      anitext('"크아앙!"', 0.1, "r", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        givbuff(buffs.bleeding2, 2)
      }
    },
  },
  skeleton: {
    name: "스켈레톤",
    art: "skeleton",
    hp: 200,
    spd: 5,
    dmg: 70,
    def: 10,
    buf: [],
    tk1: '(삐그덕 삐그덕)',
    tk2: '(뼈 무너지는 소리)',
    exp: 50,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e24, rand(10), 1)
      }
      if (20 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("스켈레톤이 공격을 가한다!", 0.1, "c", 1);
      fui("sk.at");
      anitext('..!', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      mzcaca(Gdata.FMdata.mcal);

    },
  },
  rzdm: {
    name: "리자드맨",
    art: "rzdm",
    hp: 200,
    spd: 30,
    dmg: 80,
    def: 10,
    buf: [],
    tk1: '"크으아!"',
    tk2: '"으그윽.."',
    exp: 50,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e25, 1, 1)
      }
      if (20 >= rand(100)) {
        anigiv(items.e1, 1, 1)
      }
    },

    atk() {
      let crd = rand(100)
      if (crd <= 60) {
        fui(Gdata.monster.art);
        anitext("리자드맨이 검을 휘두른다!", 0.1, "c", 1);
        fui("rzdm.at");
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        anitext('"크오!"', 0.1, "w", 2);
        mzcaca(Gdata.FMdata.mcal);
      } else {
        fui(Gdata.monster.art);
        anitext("방심한 틈을 타 리자드맨이 꼬리를 휘두른다!", 0.1, "c", 1);
        fui("rzdm.tail");
        anitext('..!', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - (p1.zdef * 0.5);
        mzcaca(Gdata.FMdata.mcal);
      }
    },
  },
  boar: {
    name: "와일드 호그",
    art: "boar",
    hp: 500,
    spd: 30,
    dmg: 80,
    def: 10,
    buf: [],
    red: 0,
    tk1: '"크으아!"',
    tk2: '"으그윽.."',
    exp: 50,
    gold: 10,

    tem() {
      if (50 >= rand(100)) {
        anigiv(items.e26, rand(2), 1)
      }
      if (20 >= rand(100)) {
        anigiv(items.e6, 1, 1)
      }
    },
    atk() {
      let crd = rand(100)
      if (crd <= 30 && this.red === 0) {
        this.red = 1
        anitext("호그는 돌격을 준비한다!", 0.1, "c", 1);
        givdebuff(debuffs.boar_ready, 1)
        fui(Gdata.monster.art);
        anitext('"크으!"', 0.1, "w", 2);
      } else {
        fui(Gdata.monster.art);
        if (this.red === 1) {
          this.red = 0
          anitext("호그가 엄청난 기세로 돌격한다!", 0.1, "c", 1);
        } else {
          anitext("호그가 돌격한다!", 0.1, "c", 1);
        }
        fui("platk");
        anitext('쿠오오!', 0.1, "w", 2);
        Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
        mzcaca(Gdata.FMdata.mcal);
      }
    },
  },
  shippo: {
    name: "피그미",
    art: "shippo",
    hp: 100,
    spd: 20,
    dmg: 60,
    def: 45,
    buf: [],
    tk1: '"끄응?"',
    tk2: '"끄으으.."',
    exp: 20,
    gold: 10,

    tem() {
      if (60 >= rand(100)) {
        anigiv(items.e28, 1, 1)
      }
      if (10 >= rand(100)) {
        anigiv(items.e6, 1, 1)
      }
      if (cksk(skills.pcook, 1)) {
        if (30 >= rand(100)) {
          anigiv(items.e27, 2, 1)
        }
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("피그미가 뛰어온다!", 0.1, "c", 1);
      fui("platk");
      anitext('(덥석)', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      mzcaca(Gdata.FMdata.mcal);
    },
  },
  bhippo: {
    name: "베헤모스",
    art: "bhippo",
    hp: 650,
    spd: 30,
    dmg: 120,
    def: 60,
    buf: [],
    tk1: '"끄어엉"',
    tk2: '"꺼어어어.."',
    exp: 50,
    gold: 10,

    tem() {
      if (40 >= rand(100)) {
        anigiv(items.e29, rand(2), 1)
      }
      if (20 >= rand(100)) {
        anigiv(items.e6, 1, 1)
      }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("베헤모스가 무섭게 달려온다!", 0.1, "c", 1);
      fui("platk");
      anitext('"꾸우오"', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      mzcaca(Gdata.FMdata.mcal);
    },
  },



  zep_kh: {
    name: "이광호",
    art: "zep.kh",
    hp: 250,
    spd: 15,
    dmg: 60,
    def: 20,
    buf: [],
    tk1: '"안녕하십니까 용사님."',
    tk2: '"아, 사실 저는 죽지 않습니다."',
    exp: 10,
    gold: 10,

    tem() {
    },

    atk() {
      fui("zep.kh.back");
      anitext("튜터는 뒤를 돌아 자세를 잡는다!", 0.1, "c", 2);
      fui("zep.kh.ddo");
      anitext('"이것도 피해보세요!"', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        if (rand(100) <= 80) {
          givbuff(buffs.zep_ddo, 3)
          br()
          anitext("온 몸에 똥이 묻었다..", 0.1, "c", 1);
        }
        p1.zmp -= Math.round(p1.zmp * 0.5)
        fui(Gdata.monster.art);
        anitext("이상한 기운이 마나를 감소시킨다..", 0.1, "c", 1);

      }

    },
  },
  zep_yh: {
    name: "정영훈",
    art: "zep.yh",
    hp: 250,
    spd: 10,
    dmg: 50,
    def: 20,
    buf: [],
    tk1: '"안녕하세요. 저의 개그를 들으십시오"',
    tk2: '"사망"',
    exp: 10,
    gold: 10,
    bs: 0,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      if (this.bs === 0 && this.hp <= (Gdata.FMdata.maxhp * 0.5)) {
        this.bs = 1
        this.art = "zep.yh.bs"
        Gdata.FMdata.fmdmg *= 1.5
        fui(Gdata.monster.art);
        anitext('"비상! 비상!"', 0.1, "w", 2);
      } else {
        let crd = rand(100)
        fui(Gdata.monster.art);
        if (crd < 80) {
          anitext("튜터는 개그를 준비한다.", 0.1, "c", 2);
          fui(Gdata.monster.art);
          let co = rand(10)
          let answer = ""
          switch (co) {
            case 1:
              anitext('"슈퍼주니어가 사는 동네는?"', 0.1, "w", 2);
              answer = "링딩동"
              break;
            case 2:
              anitext('"달에서 사는 사람들이 쓰는 언어는?"', 0.1, "w", 2);
              answer = "문어"
              break;
            case 3:
              anitext('"용이 깜짝! 놀라면?"', 0.1, "w", 2);
              answer = "띠용"
              break;
            case 4:
              anitext('"화장실에서 방금 나온 사람은?"', 0.1, "w", 2);
              answer = "일본 사람"
              break;
            case 5:
              anitext('"네 명이 오줌을 싸면?"', 0.1, "w", 2);
              answer = "포뇨"
              break;
            case 6:
              anitext('"가장 폭력적인 동물은?"', 0.1, "w", 2);
              answer = "팬다"
              break;
            case 7:
              anitext('"기름을 추출하는데 걸리는 시간은?"', 0.1, "w", 2);
              answer = "오일"
              break;
            case 8:
              anitext('"할아버지가 좋아하는 돈은?"', 0.1, "w", 2);
              answer = "할머니"
              break;
            case 9:
              anitext('"소가 불에 타면??"', 0.1, "w", 2);
              answer = "탄소"
              break;
            case 10:
              anitext('"물고기가 싫어하는 물은??"', 0.1, "w", 2);
              answer = "그물"
              break;
            default:
              break;
          }
          let ans = readlineSync.question(" > ");
          if (ans === answer) {
            anitext('"칫...', 0.1, "w", 1);
            anitext('정답입니다."', 0.1, "w", 2);
          } else {
            anitext('"삐빅."', 0.1, "w", 1);
            br()
            anitext('"정답은 [ ' + answer + ' ]입니다."', 0.1, "w", 2);
            Gdata.FMdata.mcal = Gdata.FMdata.fmdmg;
            mzcaca(Gdata.FMdata.mcal);
          }
        } else {
          fui(Gdata.monster.art);
          anitext('"아재개그를 더 치려면 체력이 있어야 겠네요"', 0.1, "w", 2);
          this.hp += 50
          if (this.hp > Gdata.FMdata.maxhp) {
            this.hp = Gdata.FMdata.maxhp
          }
          fui(Gdata.monster.art);
          anitext("튜터는 체력을 회복했다", 0.1, "c", 1);
        }
      }

    },
  },
  zep_js: {
    name: "변정섭",
    art: "zep.js",
    hp: 250,
    spd: 10,
    dmg: 50,
    def: 20,
    buf: [],
    tk1: '"그동안 CS공부는 열심히 하셨습니까?"',
    tk2: '"생각보다 똑똑하시군요..."',
    exp: 10,
    gold: 10,
    bs: 0,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      if (this.bs === 0 && this.hp <= (Gdata.FMdata.maxhp * 0.5)) {
        this.bs = 1
        this.art = "zep.js.bs"
        Gdata.FMdata.fmdmg *= 1.5
        fui(Gdata.monster.art);
        anitext('"문제를 더 어렵게 해볼까요?"', 0.1, "w", 2);
      } else {
        let crd = rand(100)
        fui(Gdata.monster.art);
        if (crd < 80) {
          anitext("튜터는 문제를 준비한다.", 0.1, "c", 2);
          fui(Gdata.monster.art);
          let co = rand(10)
          let answer = 0
          let li = []
          if (this.bs === 1) {
            //어려운 문제
            switch (co) {
              case 1:
                anitext('"JavaScript에서 이벤트 버블링(Event Bubbling)이란 무엇인가요?"', 0.1, "w", 2);
                li = ["이벤트가 가장 안쪽의 요소에서 바깥쪽 요소로 전파되는 현상", "이벤트가 바깥쪽 요소에서 안쪽 요소로 전파되는 현상", "이벤트가 동시에 여러 요소에서 발생하는 현상", "이벤트가 특정 요소에서만 발생하고 전파되지 않는 현상"]
                answer = 1
                break;
              case 2:
                anitext('"HTTP 상태 코드 404는 무엇을 의미하나요?"', 0.1, "w", 2);
                li = ["요청 성공", "서버 오류", "페이지를 찾을 수 없음", "권한 없음"]
                answer = 3
                break;
              case 3:
                anitext('"JavaScript에서 `typeof null`의 결과는 무엇인가요?"', 0.1, "w", 2);
                li = [`"null"`, `"object"`, `"undefined"`, `"number"`]
                answer = 2
                break;
              case 4:
                anitext('"JavaScript에서 비동기 작업을 처리하는 방법이 아닌 것은?"', 0.1, "w", 2);
                li = ["Promises", "async/await", "callbacks", "for loops"]
                answer = 4
                break;
              case 5:
                anitext('"브라우저에서 사용자 데이터를 저장하는 방법 중 페이지를 닫아도 데이터가 유지되는 것은?"', 0.1, "w", 2);
                li = ["localStorage", "sessionStorage", "html", "javascript"]
                answer = 1
                break;
              default:
                break;
            }
          } else {
            switch (co) {
              case 1:
                anitext('"IP 주소의 의미는 무엇인가요?"', 0.1, "w", 2);
                li = ["Information Provider 주소", "Internet Protocol 주소", "Internet Provider 주소", "Internal Process 주소"]
                answer = 2
                break;
              case 2:
                anitext('"HTML은 무엇의 약자인가요?"', 0.1, "w", 2);
                li = ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Mode Language", "Home Tool Management Language"]
                answer = 1
                break;
              case 3:
                anitext('"JavaScript에서 변수를 선언하는 키워드가 아닌 것은?"', 0.1, "w", 2);
                li = ["var", "let", "const", "variable"]
                answer = 4
                break;
              case 4:
                anitext('"JavaScript에서 배열의 끝에 새 요소를 추가하는 메소드는?"', 0.1, "w", 2);
                li = ["add()", "append()", "push()", "insert()"]
                answer = 3
                break;
              case 5:
                anitext('"JavaScript에서 조건문을 작성할 때 사용하는 키워드는?"', 0.1, "w", 2);
                li = ["check", "if", "condition", "when"]
                answer = 2
                break;
              default:
                break;
            }
          }
          let ans = readlineSync.keyInSelect(li, " > ", { cancel: "포기" }) + 1;
          if (ans === answer) {
            anitext('"오오..', 0.1, "w", 0.5);
            anitext('정답입니다."', 0.1, "w", 2);
          } else {
            anitext('"이런.."', 0.1, "w", 1);
            br()
            anitext('"정답은 [ ' + li[answer - 1] + ' ]입니다."', 0.1, "w", 2);
            Gdata.FMdata.mcal = Gdata.FMdata.fmdmg;
            mzcaca(Gdata.FMdata.mcal);
          }
        } else {
          fui(Gdata.monster.art);
          anitext('"문제를 더 내려면 체력이 있어야 겠네요"', 0.1, "w", 2);
          this.hp += 50
          if (this.hp > Gdata.FMdata.maxhp) {
            this.hp = Gdata.FMdata.maxhp
          }
          fui(Gdata.monster.art);
          anitext("튜터는 체력을 회복했다", 0.1, "c", 1);
        }
      }

    },
  },
  zep_tg: {
    name: "손태권",
    art: "zep.tg",
    hp: 250,
    spd: 15,
    dmg: 60,
    def: 20,
    buf: [],
    tk1: '"안녕하세요, 여러분!"',
    tk2: '"여러분, 오늘도 고생 많으셨습니다!\n오늘 푹쉬시고 웃는얼굴로 내일 만나요~!\n편안한 밤 보내시길 바랍니다."',
    exp: 10,
    gold: 10,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("매니저는 맨션을 준비한다!", 0.1, "c", 2);
      fui("zep.tg.alt");
      anitext('[☀️입실 안내] @channel', 0.01, "w", 1);
      br()
      anitext('"안녕하세요, 여러분! 좋은 아침입니다 😊"', 0.1, "w", 2);
      br()
      anitext('"오늘도 화이팅! 우리 모두 힘내봅시다! 💪⭐"', 0.1, "w", 1);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        anitext("정신적 데미지를 입었다.", 0.1, "c", 1);
        if (rand(100) <= 70) {
          givbuff(buffs.exhaust, 2)
          br()
          anitext("아침부터 기운이 빠진다..", 0.1, "c", 1);
        }
      }
    },
  },
  zep_sw: {
    name: "하승우",
    art: "zep.sw",
    hp: 250,
    spd: 15,
    dmg: 50,
    def: 20,
    buf: [],
    tk1: '"console.log("hello, World!");"',
    tk2: '"break;"',
    exp: 10,
    gold: 10,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("튜터는 코드를 작성한다.", 0.1, "c", 2);
      fui("zep.sw.at");
      anitext(`akt(${p1.name}, ${Gdata.FMdata.fmdmg})`, 0.01, "w", 1);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg;
      if (mzcaca(Gdata.FMdata.mcal)) {
        anitext("공격을 받지 않았는데 몸이 찢기는 고통이다.", 0.1, "c", 1);
      }
    },
  },
  zep_jw: {
    name: "진우원",
    art: "zep.jw",
    hp: 250,
    spd: 15,
    dmg: 70,
    def: 20,
    buf: [],
    tk1: '"저를 쓰러트리셔야 합니다."',
    tk2: '"저를 이기시다니.. 강하시군요"',
    exp: 10,
    gold: 10,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      fui("zep.jw.of");
      anitext("튜터는 썬글라스를 벗었다!", 0.1, "c", 2);
      fui("zep.jw.at");
      anitext('"절 이기긴 힘들겁니다."', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      mzcaca(Gdata.FMdata.mcal)
    },
  },
  zep_tt: {
    name: "김창민",
    art: "zep.tt",
    hp: 250,
    spd: 15,
    dmg: 80,
    def: 0,
    buf: [],
    tk1: '"쉽게는 못 이기십니다."',
    tk2: '"크윽.."',
    exp: 10,
    gold: 10,

    tem() {
      // if (60 >= rand(100)) {
      //   anigiv(items.e0, rand(3), 1)
      // }
      // if (20 >= Math.floor(Math.random() * 100) + 1) {
      //   anigiv(items.e1, 1, 1)
      // }
    },

    atk() {
      fui(Gdata.monster.art);
      anitext("튜터는 확성기를 준비한다!", 0.1, "c", 2);
      fui("zep.tt.at");
      anitext('"널 사랑해!!!"', 0.1, "w", 2);
      Gdata.FMdata.mcal = Gdata.FMdata.fmdmg - p1.zdef;
      if (mzcaca(Gdata.FMdata.mcal)) {
        if (rand(100) <= 80) {
          givbuff(buffs.bleeding, 3)
          br()
          anitext("고막이 찢어져서 피가 흐른다!", 0.1, "c", 1);
        }
      }
    },
  },
};

module.exports = {
  fight,
  monsters,
  fui,
  cjhk,
  cjj,
  cmhp,
  run,
  bansa,
  chh,
  yrd,
  zip,
  pturn,
  mturn,
  ptt,
  pmhwp,
  tsmon,
  items
}