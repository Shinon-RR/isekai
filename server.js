// import chalk from "chalk";
// import figlet from "figlet";
// import readlineSync from "readline-sync";
const path = require('path');

const { vil } = require("./vil");
const { default: chalk } = require("chalk");
const figlet = require("figlet");
const readlineSync = require("readline-sync");
let { p1, Gdata } = require("./users-data");
// const { items } = require("./items");
// const { items } = require("./items2.js");
const { npc, shop, inn, npctalk } = require("./npc");
const {
  sleep,
  aniprt,
  br,
  cl,
  anitext,
  rand,
  anigiv,
  checkstat,
  chokihwa,
  wear,
  checkQ,
  ckit,
  SetUi,
  leadingZeros,
} = require("./func");
const {
  monsters,
  fcl,
  fui,
  fight,
  items,
  cart: _cart,
  cjname: _cjname,
  cjmhp: _cjmhp,
  cjhp: _cjhp,
  cjdef: _cjdef,
  cjdmg: _cjdmg,
  cjspd: _cjspd,
  cjhk: _cjhk,
  chwp: _chwp,
  cjj: _cjj,
  cname: _cname,
  cmhp: _cmhp,
  chp: _chp,
  cdef: _cdef,
  cdmg: _cdmg,
  cspd: _cspd,
  chk: _chk,
  cexp: _cexp,
  cgold: _cgold,
  run: _run,
  cjart: _cjart,
  cjtk1: _cjtk1,
  cjtk2: _cjtk2,
  bansa: _bansa,
  ft: _ft,
  chh: _chh,
  yrd: _yrd,
  zip: _zip,
  ygc: _ygc,
  cok: _cok,
  pturn: _pturn,
  mturn: _mturn,
  ptt: _ptt,
  pmhwp: _pmhwp,
  ilvup: _ilvup,
  tsmon: _tsmon,
} = require("./monsters");
// const { Gdata } = require("./G-data");
const { test } = require("./tensterTool");
const { givbuff, buffs } = require("./buffs");
const { givskill, skills } = require("./skills");
const fs = require('fs');
const { quest } = require('./quest');

let tsmon = _tsmon;

const directory = "./savefiles";
const filename = "save-auto.json";
// const content = "Hello, world!";

// const path = require('path');



function openiv() {
  checkstat();
  let invchoice;
  let list = ["내 정보", "장비", "스킬", "가방", "퀘스트", "세이브", "타이틀로"];
  let invi = 0;
  Gdata.finv = true
  while (Gdata.finv) {
    SetUi("yb", "내 가방", "bb", p1.bag[0].char)
    invchoice = readlineSync.keyInSelect(list, " > ", { cancel: "나가기" }) + 1;
    switch (invchoice) {
      case 1:
        checkstat();
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)
        process.stdout.write(chalk.greenBright("Lv : " + p1.lv + " ( " + p1.exp + " / " + p1.lv * 10 + " )"));
        br();
        process.stdout.write(chalk.cyanBright(" 버프 : "));
        for (let bi = 0; bi < p1.zbuff.length; bi++) {
          process.stdout.write(chalk.cyanBright("[" + p1.zbuff[bi].buffName + " " + p1.zbuff[bi].now + "] "));
        }
        br();
        process.stdout.write(chalk.cyanBright("이름 : " + p1.name));
        process.stdout.write(chalk.cyanBright("       직업 : " + p1.class));
        br();
        process.stdout.write(chalk.redBright("HP : " + p1.zhp + " / " + p1.fhp));
        process.stdout.write(chalk.blueBright("       MP : " + p1.zmp + " / " + p1.fmp));
        br();
        process.stdout.write(chalk.cyanBright("데미지 : " + p1.fdmg));
        process.stdout.write(chalk.cyanBright("       방어력 : " + p1.fdef));
        br();
        process.stdout.write(chalk.cyanBright("스피드 : " + p1.fspd));
        process.stdout.write(chalk.cyanBright("       회피 : " + p1.fhwp));
        br();
        sleep(5);

        break;
      case 2:
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)
        process.stdout.write(chalk.cyanBright("투구 : "));
        if (p1.hat.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.hat[0].itemName));
        }

        process.stdout.write(chalk.cyanBright("       갑옷 : "));
        if (p1.armor.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.armor[0].itemName));
        }
        br();
        process.stdout.write(chalk.cyanBright("신발 : "));
        if (p1.shoes.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.shoes[0].itemName));
        }

        process.stdout.write(chalk.cyanBright("       장갑 : "));
        if (p1.gloves.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.gloves[0].itemName));
        }
        br();
        process.stdout.write(chalk.cyanBright("장신구 : "));
        if (p1.pendant.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.pendant[0].itemName));
        }

        process.stdout.write(chalk.cyanBright("       무기 : "));
        if (p1.wepon.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.wepon[0].itemName));
        }

        br();
        process.stdout.write(chalk.cyanBright("가방 : "));
        if (p1.bag.length === 0) {
          process.stdout.write(chalk.cyanBright("비어있음"));
        } else {
          process.stdout.write(chalk.cyanBright(p1.bag[0].itemName));
        }

        sleep(5);
        break;
      case 3:
        let sktr = true;
        if (p1.skill.length === 0 && p1.passi.length === 0) {
          sktr = false;
          anitext("배운 스킬이 없다.", 0.01, "c", 1);
        }
        while (sktr) {
          SetUi("yb", "내 가방", "bb", p1.bag[0].char)
          let skl = [];
          for (let sln = 0; sln < p1.skill.length; sln++) {
            skl.push("[ " + p1.skill[sln].skillName + " ]");
          }
          let actln = p1.skill.length
          for (let sln = 0; sln < p1.passi.length; sln++) {
            skl.push("[ " + p1.passi[sln].skillName + " ]");
          }
          let sklc = readlineSync.keyInSelect(skl, " > ", { cancel: "뒤로" });
          if (sklc === -1) {
            sktr = false;
          } else {
            if (sklc < actln) {
              SetUi("yb", "내 가방", "bb", p1.skill[sklc].skillIcon)
              anitext(p1.skill[sklc].skillName, 0.01, "c", 0.01);
              let cansl = ["정보"];
              for (let cli = 0; cli < p1.skill[sklc].can.length; cli++) {
                if (p1.skill[sklc].can[cli] === Gdata.nextVil.type) {
                  cansl.push("사용");
                }
              }
              let keey = readlineSync.keyInSelect(cansl, " > ", { cancel: "뒤로" });
              switch (keey) {
                case 0:
                  SetUi("yb", "내 가방", "bb", p1.skill[sklc].skillIcon)
                  anitext(p1.skill[sklc].skillName, 0.01, "c", 0.01);
                  anitext("    Lv." + p1.skill[sklc].skillLv + " ", 0.01, "y", 0.01);
                  br();
                  anitext(p1.skill[sklc].skillInfo, 0.01, "c", 3);
                  break;
                case 1:
                  SetUi("yb", "내 가방", "bb", Gdata.nextVil.char)
                  p1.skill[sklc].active(Gdata.nextVil.type);
                  Gdata.finv = false
                  sktr = false;
                  break;
                default:
                  // sktr = false;
                  break;
              }
            } else {
              sklc -= actln
              SetUi("yb", "내 가방", "bb", p1.passi[sklc].skillIcon)
              anitext(p1.passi[sklc].skillName, 0.01, "c", 0.01);
              let cansl = ["정보"];
              for (let cli = 0; cli < p1.passi[sklc].can.length; cli++) {
                if (p1.passi[sklc].can[cli] === Gdata.nextVil.type) {
                  cansl.push("사용");
                }
              }
              let keey = readlineSync.keyInSelect(cansl, " > ", { cancel: "뒤로" });
              // anitext(keey + "이게???", 0.1, "c", 2);
              switch (keey) {
                case 0:
                  SetUi("yb", "내 가방", "bb", p1.passi[sklc].skillIcon)
                  anitext(p1.passi[sklc].skillName, 0.01, "c", 0.01);
                  anitext("    Lv." + p1.passi[sklc].skillLv + " ", 0.01, "y", 0.01);
                  br();
                  anitext(p1.passi[sklc].skillInfo, 0.01, "c", 3);
                  break;
                case 1:
                  SetUi("yb", "내 가방", "bb", Gdata.nextVil.char)
                  p1.passi[sklc].active(Gdata.nextVil.type);
                  Gdata.finv = false
                  sktr = false;
                  break;
                default:
                  // sktr = false;
                  break;
              }
            }

          }
        }
        break;
      case 4:
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)

        if (p1.inven.length > 0) {
          anitext("가방을 확인합니다.", 0.1, "c", 1);

          // if (true) {
          let bob = 0;
          let back = 0;
          let si = 0;
          Gdata.ininv = true
          let inchoice;
          while (Gdata.ininv) {
            SetUi("yb", "내 가방", "bb", p1.bag[0].char)
            if (p1.inven.length === 0) {
              break;
            }
            bob = 0;
            back = 0;
            while (bob === 0) {
              let i3;
              for (i3 = 0; i3 < p1.inven.length; i3++) {
                process.stdout.write(chalk.white(i3 + 1 + ". " + p1.inven[i3].itemName + " * " + p1.inven[i3].hav + "    "));
                if (i3 % 2 === 1) {
                  br();
                }
              }
              if (i3 % 2 === 1) {
                // process.stdout.write(chalk.white(i3 + "뭐냐.."));
                br();
              }
              inchoice = Number(readlineSync.question(" > "));
              if (inchoice <= p1.inven.length && inchoice > 0) {
                bob++;
              } else if (inchoice === 0) {
                back++;
                bob++;
                Gdata.ininv = false;
              } else {
                anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                SetUi("yb", "내 가방", "bb", p1.bag[0].char)
              }
            }
            if (back === 0) {
              SetUi("yb", "내 가방", "bb", p1.inven[inchoice - 1].char)
              anitext(p1.inven[inchoice - 1].itemName, 0.01, "c", 0.01);
              if (p1.inven[inchoice - 1].reinforce) {
                anitext("    단계 : " + p1.inven[inchoice - 1].itemLv + "/" + p1.inven[inchoice - 1].itemMaxLv, 0.01, "y", 0.01);
              }
              br();
              anitext(p1.inven[inchoice - 1].price + "G", 0.01, "y", 0.01);
              anitext("    " + p1.inven[inchoice - 1].hav + "개 보유", 0.01, "c", 1);
              br();
              anitext(p1.inven[inchoice - 1].iteminfo, 0.01, "c", 0.5);
              br();
              anitext(p1.inven[inchoice - 1].itemDesc, 0.01, "c", 0.5);
              br();
              anitext("0. 뒤로  1. 사용", 0.01, "c", 0.5);
              br();
              let countchoice;
              while (bob === 1) {
                countchoice = Number(readlineSync.question("> "));

                if (countchoice === 1) {
                  if (p1.inven[inchoice - 1].type === "potion" || p1.inven[inchoice - 1].type === "food" || p1.inven[inchoice - 1].type === "etc" || p1.inven[inchoice - 1].type === "tool" || p1.inven[inchoice - 1].type === "scroll") {
                    p1.inven[inchoice - 1].active();
                  } else {
                    wear(p1.inven[inchoice - 1]);
                  }
                  bob++;
                } else if (countchoice === 0) {
                  bob++;
                  Gdata.ininv = false;
                } else {
                  anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                  SetUi("yb", "내 가방", "bb", p1.bag[0].char)
                  process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].itemName));
                  process.stdout.write(chalk.yellow("    " + p1.inven[inchoice - 1].price + "G"));
                  process.stdout.write(chalk.cyan("    " + p1.inven[inchoice - 1].hav + "개 보유"));
                  br();
                  process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].iteminfo));
                  br();
                  process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].itemDesc));
                  br();
                  process.stdout.write(chalk.cyan("0. 뒤로  1. 사용"));
                  br();
                }
              }
            }
          }
        } else {
          anitext("가방이 비어있다.", 0.01, "c", 1);
        }

        break;
      case 5:
        SetUi("yb", "내 가방", "bb", "que")
        let list2 = ["진행중인 퀘스트"];
        let inch =
          readlineSync.keyInSelect(list2, " > ", { cancel: "완료한 퀘스트" }) +
          1;
        switch (inch) {
          case 1:
            checkQ();
            SetUi("yb", "내 가방", "bb", "que")
            if (p1.nowQuest.length > 0) {
              let qi = 0;
              while (qi === 0) {
                let quli = [];
                for (let qu = 0; qu < p1.nowQuest.length; qu++) {
                  let how = " [ 진행 중 ]";
                  if (p1.nowQuest[qu].clear) {
                    how = " [ 완료 가능 ]";
                  }
                  quli.push(p1.nowQuest[qu].name + how);
                }
                let Qcho = readlineSync.keyInSelect(quli, " > ", {
                  cancel: "뒤로",
                });
                let quest = p1.nowQuest[Qcho];
                SetUi("yb", "내 가방", "bb", "que")
                if (Qcho > -1) {
                  anitext("퀘스트 : " + quest.name, 0.02, "c", 0.02);
                  if (quest.clear) {
                    anitext(" [ 완료 가능 ]", 0.02, "c", 1);
                  } else {
                    anitext(" [ 진행 중 ]", 0.02, "c", 1);
                  }
                  br();
                  anitext(quest.info, 0.02, "c", 1);
                  br();
                  // anitext(quest.nowKill + " / " + quest.needKill, 0.02, "c", 1);
                  if (quest.type === "kill" || quest.type === "killtem") {
                    for (let i = 0; i < quest.needKill.length; i++) {
                      anitext(
                        quest.killtarget[i].name +
                        " : " +
                        quest.nowKill[i] +
                        " / " +
                        quest.needKill[i],
                        0.02,
                        "c",
                        0.02
                      );
                      br();
                    }
                  }
                  if (quest.type === "tem" || quest.type === "killtem") {
                    for (let i = 0; i < quest.needtem.length; i++) {
                      anitext(
                        quest.temtarget[i].itemName +
                        " : " +
                        quest.nowtem[i] +
                        " / " +
                        quest.needtem[i],
                        0.02,
                        "c",
                        0.02
                      );
                      br();
                    }
                  }
                  br();
                  anitext("보상 : " + quest.reward, 0.02, "c", 5);
                  br();
                  SetUi("yb", "내 가방", "bb", "que")
                } else {
                  qi++;
                }
              }
            } else {
              anitext("진행중인 퀘스트가 없습니다.", 0.1, "c", 3);
              break;
            }
            Gdata.finv = false
            break;
          case 0:
            checkQ();
            SetUi("yb", "내 가방", "bb", "cque")
            if (p1.clearQuest.length > 0) {
              let qi = 0;
              while (qi === 0) {
                let quli = [];
                for (let qu = 0; qu < p1.clearQuest.length; qu++) {
                  quli.push(p1.clearQuest[qu].name + "[ 완료 ]");
                }
                let Qcho = readlineSync.keyInSelect(quli, " > ", {
                  cancel: "뒤로",
                });
                let quest = p1.clearQuest[Qcho];
                SetUi("yb", "내 가방", "bb", "cque")
                if (Qcho > -1) {
                  anitext("퀘스트 : " + quest.name + "  ", 0.02, "c", 0.02);
                  if (quest.repeatable) {
                    anitext(quest.clearCount + "회 ", 0.02, "c", 0.02);
                  }
                  anitext("완료", 0.02, "c", 1);
                  br();
                  anitext("완료일자 : " + quest.cleardate, 0.02, "c", 1);

                  br();
                  anitext(quest.info, 0.02, "c", 1);
                  br();

                  if (quest.type === "kill" || quest.type === "killtem") {
                    for (let i = 0; i < quest.needKill.length; i++) {
                      anitext(quest.killtarget[i].name + " : " + quest.needKill[i] + " / " + quest.needKill[i], 0.02, "c", 0.02);
                      br();
                    }
                  }
                  if (quest.type === "tem" || quest.type === "killtem") {
                    for (let i = 0; i < quest.needtem.length; i++) {
                      anitext(quest.temtarget[i].itemName + " : " + quest.needtem[i] + " / " + quest.needtem[i], 0.02, "c", 0.02);
                      br();
                    }
                  }
                  br();
                  anitext("보상 : " + quest.reward, 0.02, "c", 5);
                  br();
                  SetUi("yb", "내 가방", "bb", "cque")
                } else {
                  qi++;
                }
              }
            } else {
              anitext("완료한 퀘스트가 없습니다.", 0.1, "c", 3);
              break;
            }
            Gdata.finv = false

            break;

          default:
            console.log("error : 선택지 외 항목");
            break;
        }

        break;
      case 6:
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)
        // let today = new Date()
        // var year = (leadingZeros(today.getFullYear(), 4))
        // var month = (leadingZeros(today.getMonth() + 1, 2))
        // var date = (leadingZeros(today.getDate(), 2))
        // var hours = ('0' + today.getHours()).slice(-2);
        // var minutes = ('0' + today.getMinutes()).slice(-2);
        // Gdata.lastSave = year + "년 " + month + "월 " + date + "일 " + hours + '시 ' + minutes + '분'
        // const gameDatas = {
        //   p1,
        //   Gdata
        // }
        // let save_auto = JSON.stringify(gameDatas)
        // fs.writeFileSync('./savefiles/save_auto.json', save_auto)



        let wti = true
        while (wti) {
          SetUi("yb", "내 가방", "bb", p1.bag[0].char)
          let svli = []
          let svy = []
          let mid1
          if (fs.existsSync("./savefiles/save_auto.json")) {
            mid1 = fs.readFileSync("./savefiles/save_auto.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}] (자동저장) < 가급적 여기엔 저장 하지 마세요..`)
            svy.push(true)
          } else {
            svli.push('[비어있음] (자동저장) < 가급적 여기엔 저장 하지 마세요..')
            svy.push(false)
          }
          if (fs.existsSync("./savefiles/save_1.json")) {
            mid1 = fs.readFileSync("./savefiles/save_1.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
            svy.push(true)
          } else {
            svli.push('[비어있음]')
            svy.push(false)
          }
          if (fs.existsSync("./savefiles/save_2.json")) {
            mid1 = fs.readFileSync("./savefiles/save_2.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
            svy.push(true)
          } else {
            svli.push('[비어있음]')
            svy.push(false)
          }
          if (fs.existsSync("./savefiles/save_3.json")) {
            mid1 = fs.readFileSync("./savefiles/save_3.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
            svy.push(true)
          } else {
            svli.push('[비어있음]')
            svy.push(false)
          }
          if (fs.existsSync("./savefiles/save_4.json")) {
            mid1 = fs.readFileSync("./savefiles/save_4.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
            svy.push(true)
          } else {
            svli.push('[비어있음]')
            svy.push(false)
          }
          if (fs.existsSync("./savefiles/save_5.json")) {
            mid1 = fs.readFileSync("./savefiles/save_5.json", 'utf-8')
            mid1 = JSON.parse(mid1)
            svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
            svy.push(true)
          } else {
            svli.push('[비어있음]')
            svy.push(false)
          }
          anitext("저장 슬롯을 선택해주세요!", 0.1, "c", 1);
          let svc = readlineSync.keyInSelect(svli, " > ", { cancel: "취소" });
          if (svc >= 0) {
            SetUi("yb", "내 가방", "bb", p1.bag[0].char)
            if (svy[svc]) {
              wti = false
              anitext((svc + 1) + "슬롯에 데이터가 이미 있어요!", 0.1, "c", 1);
              br()
              anitext("그래도 저장 하시겠습니까?", 0.1, "c", 1);
            } else {
              anitext("저장 하시겠습니까?", 0.1, "c", 1);
            }
            let cnli = ["예"]
            let scvc = readlineSync.keyInSelect(cnli, " > ", { cancel: "아니요" });
            if (scvc === 0) {
              let today = new Date()
              var year = (leadingZeros(today.getFullYear(), 4))
              var month = (leadingZeros(today.getMonth() + 1, 2))
              var date = (leadingZeros(today.getDate(), 2))
              var hours = ('0' + today.getHours()).slice(-2);
              var minutes = ('0' + today.getMinutes()).slice(-2);
              Gdata.lastSave = year + "년 " + month + "월 " + date + "일 " + hours + '시 ' + minutes + '분'
              const gameDatas = {
                p1,
                Gdata
              }
              let save = JSON.stringify(gameDatas)

              switch (svc) {
                case 0:
                  fs.writeFileSync('./savefiles/save_auto.json', save)
                  break;
                case 1:
                  fs.writeFileSync('./savefiles/save_1.json', save)
                  break;
                case 2:
                  fs.writeFileSync('./savefiles/save_2.json', save)
                  break;
                case 3:
                  fs.writeFileSync('./savefiles/save_3.json', save)
                  break;
                case 4:
                  fs.writeFileSync('./savefiles/save_4.json', save)
                  break;
                case 5:
                  fs.writeFileSync('./savefiles/save_5.json', save)
                  break;
                default:
                  break;
              }
              anitext("저장 완료", 0.1, "c", 3);
              wti = false
            }
          } else {
            wti = false
          }
        }






        // while (true) {

        // }
        break;
      case 7:
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)
        Gdata.goout = true
        Gdata.finv = false
        break;
      case 0:
        SetUi("yb", "내 가방", "bb", p1.bag[0].char)
        // anitext("인벤닫기", 0.1, "y", 3);
        Gdata.finv = false
        break;
      default:
        anitext("여기는 에러", 0.1, "c", 2);
    }
  }
}

// 로비 화면을 출력하는 함수

function displayLobby() {
  let c1 = chalk.blueBright;
  let c2 = chalk.cyanBright;
  console.clear();
  const line = chalk.magenta("─".repeat(70));

  // 타이틀 텍스트
  // console.log(
  //   chalk.cyan(
  //     figlet.textSync("Isekai like", {
  //       font: "ANSI Shadow",
  //       horizontalLayout: "default",
  //       verticalLayout: "default",
  //     })
  //   )
  // );
  // console.log("😊")
  console.log(
    c1("██") +
    c2("╗") +
    c1("███████") +
    c2("╗") +
    c1("███████") +
    c2("╗") +
    c1("██") +
    c2("╗  ") +
    c1("██") +
    c2("╗ ") +
    c1("█████") +
    c2("╗ ") +
    c1("██") +
    c2("╗    ") +
    c1("██") +
    c2("╗     ") +
    c1("██") +
    c2("╗") +
    c1("██") +
    c2("╗  ") +
    c1("██") +
    c2("╗") +
    c1("███████") +
    c2("╗")
  );
  console.log(
    c1("██") +
    c2("║") +
    c1("██") +
    c2("╔════╝") +
    c1("██") +
    c2("╔════╝") +
    c1("██") +
    c2("║ ") +
    c1("██") +
    c2("╔╝") +
    c1("██") +
    c2("╔══") +
    c1("██") +
    c2("╗") +
    c1("██") +
    c2("║    ") +
    c1("██") +
    c2("║     ") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("║ ") +
    c1("██") +
    c2("╔╝") +
    c1("██") +
    c2("╔════╝")
  );
  console.log(
    c1("██") +
    c2("║") +
    c1("███████") +
    c2("╗") +
    c1("█████") +
    c2("╗  ") +
    c1("█████") +
    c2("╔╝ ") +
    c1("███████") +
    c2("║") +
    c1("██") +
    c2("║    ") +
    c1("██") +
    c2("║     ") +
    c1("██") +
    c2("║") +
    c1("█████") +
    c2("╔╝ ") +
    c1("█████") +
    c2("╗")
  );
  console.log(
    c1("██") +
    c2("║╚════") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("╔══╝  ") +
    c1("██") +
    c2("╔═") +
    c1("██") +
    c2("╗ ") +
    c1("██") +
    c2("╔══") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("║    ") +
    c1("██") +
    c2("║     ") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("╔═") +
    c1("██") +
    c2("╗ ") +
    c1("██") +
    c2("╔══╝")
  );
  console.log(
    c1("██") +
    c2("║") +
    c1("███████") +
    c2("║") +
    c1("███████") +
    c2("╗") +
    c1("██") +
    c2("║  ") +
    c1("██") +
    c2("╗") +
    c1("██") +
    c2("║  ") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("║    ") +
    c1("███████") +
    c2("╗") +
    c1("██") +
    c2("║") +
    c1("██") +
    c2("║  ") +
    c1("██") +
    c2("╗") +
    c1("███████") +
    c2("╗")
  );
  console.log(
    c2("╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝    ╚══════╝╚═╝╚═╝  ╚═╝╚══════╝")
  );

  // 상단 경계선

  // console.log(line);
  // console.log("값 표시");
  // let one = [0,1]
  // let two = 0

  // givskill(skills.shielddash)
  // console.log(p1.skill)
  // console.log(p1.skill[one[two]].skillIcon)

  console.log(line);

  // 게임 이름
  // console.log(chalk.yellowBright.bold("I-L 게임에 오신것을 환영합니다!"));
  // console.log(chalk.green("옵션을 선택해주세요."));
  // chalkAnimation.neon("test")

  // 옵션들
  // console.log(chalk.blue("1.") + chalk.white(" 새로운 게임 시작"));
  // console.log(chalk.blue("2.") + chalk.white(" 오늘 점심 뭐 먹지?"));
  // console.log(chalk.blue("3.") + chalk.white(" 테스팅 메뉴"));
  // console.log(chalk.blue("4.") + chalk.white(" 종료"));

  // 하단 경계선
  // console.log(line);

  // 하단 설명
  // console.log(chalk.gray("1-4 사이의 수를 입력한 뒤 엔터를 누르세요."));
}

let ln;
let n;

//메인
Gdata.nextVil = vil.wayden
function handleUserInput() {
  let bachoice = ["새로운 게임 시작", "이어서 하기(미완)", "테스팅 메뉴"];
  let choice = readlineSync.keyInSelect(bachoice, " > ", { cancel: "종료" }) + 1;
  console.log(choice);
  // const choice = readlineSync.question(" > ");

  switch (choice) {
    case 1:
      console.log(chalk.green("게임을 시작합니다."));
      nextVil = vil.proto;
      fgame();
      // igame();
      break;
    case 2:

      console.log(chalk.yellow("이어하기"));
      sleep(3)
      let wti = true
      while (wti) {
        cl()
        displayLobby()
        let svli = []
        let svy = []
        let mid1
        if (fs.existsSync("./savefiles/save_auto.json")) {
          mid1 = fs.readFileSync("./savefiles/save_auto.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}] (자동저장)`)
          svy.push(true)
        } else {
          svli.push('[비어있음] (자동저장)')
          svy.push(false)
        }
        if (fs.existsSync("./savefiles/save_1.json")) {
          mid1 = fs.readFileSync("./savefiles/save_1.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
          svy.push(true)
        } else {
          svli.push('[비어있음]')
          svy.push(false)
        }
        if (fs.existsSync("./savefiles/save_2.json")) {
          mid1 = fs.readFileSync("./savefiles/save_2.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
          svy.push(true)
        } else {
          svli.push('[비어있음]')
          svy.push(false)
        }
        if (fs.existsSync("./savefiles/save_3.json")) {
          mid1 = fs.readFileSync("./savefiles/save_3.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
          svy.push(true)
        } else {
          svli.push('[비어있음]')
          svy.push(false)
        }
        if (fs.existsSync("./savefiles/save_4.json")) {
          mid1 = fs.readFileSync("./savefiles/save_4.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
          svy.push(true)
        } else {
          svli.push('[비어있음]')
          svy.push(false)
        }
        if (fs.existsSync("./savefiles/save_5.json")) {
          mid1 = fs.readFileSync("./savefiles/save_5.json", 'utf-8')
          mid1 = JSON.parse(mid1)
          svli.push(`[${mid1.Gdata.lastSave} | Lv.${mid1.p1.lv} ${mid1.p1.name}용사 | ${mid1.p1.class}]`)
          svy.push(true)
        } else {
          svli.push('[비어있음]')
          svy.push(false)
        }
        let svc = readlineSync.keyInSelect(svli, " > ", { cancel: "종료" });
        if (svc >= 0) {
          if (svy[svc]) {
            wti = false
            switch (svc) {
              case 0:
                gameDatas = fs.readFileSync("./savefiles/save_auto.json", 'utf-8')
                break;
              case 1:
                gameDatas = fs.readFileSync("./savefiles/save_1.json", 'utf-8')
                break;
              case 2:
                gameDatas = fs.readFileSync("./savefiles/save_2.json", 'utf-8')
                break;
              case 3:
                gameDatas = fs.readFileSync("./savefiles/save_3.json", 'utf-8')
                break;
              case 4:
                gameDatas = fs.readFileSync("./savefiles/save_4.json", 'utf-8')
                break;
              case 5:
                gameDatas = fs.readFileSync("./savefiles/save_5.json", 'utf-8')
                break;
              default:
                break;
            }
            gameDatas = JSON.parse(gameDatas)
            p1.name = gameDatas.p1.name
            p1.gold = gameDatas.p1.gold
            p1.class = gameDatas.p1.class
            p1.lv = gameDatas.p1.lv
            p1.exp = gameDatas.p1.exp
            // 버프 가져오기
            for (let i = 0; i < gameDatas.p1.zbuff.length; i++) {
              for (let ii = 0; ii < Object.keys(buffs).length; ii++) {
                if (buffs[Object.keys(buffs)[ii]].buffCode === gameDatas.p1.zbuff[i].buffCode) {
                  let on = p1.zbuff.length
                  p1.zbuff.push({ ...buffs[Object.keys(buffs)[ii]] });
                  p1.zbuff[on].max = gameDatas.p1.zbuff[i].max
                  p1.zbuff[on].now = gameDatas.p1.zbuff[i].now
                }
              }
            }

            // 장비들
            for (let i = 0; i < gameDatas.p1.hat.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.hat[i].itemCode) {
                  let on = p1.hat.length
                  p1.hat.push({ ...items[Object.keys(items)[ii]] });
                  p1.hat[on].hav = gameDatas.p1.hat[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.armor.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.armor[i].itemCode) {
                  let on = p1.armor.length
                  p1.armor.push({ ...items[Object.keys(items)[ii]] });
                  p1.armor[on].hav = gameDatas.p1.armor[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.shoes.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.shoes[i].itemCode) {
                  let on = p1.shoes.length
                  p1.shoes.push({ ...items[Object.keys(items)[ii]] });
                  p1.shoes[on].hav = gameDatas.p1.shoes[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.gloves.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.gloves[i].itemCode) {
                  let on = p1.gloves.length
                  p1.gloves.push({ ...items[Object.keys(items)[ii]] });
                  p1.gloves[on].hav = gameDatas.p1.gloves[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.pendant.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.pendant[i].itemCode) {
                  let on = p1.pendant.length
                  p1.pendant.push({ ...items[Object.keys(items)[ii]] });
                  p1.pendant[on].hav = gameDatas.p1.pendant[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.wepon.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.wepon[i].itemCode) {
                  let on = p1.wepon.length
                  p1.wepon.push({ ...items[Object.keys(items)[ii]] });
                  p1.wepon[on].hav = gameDatas.p1.wepon[i].hav
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.bag.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.bag[i].itemCode) {
                  let on = p1.bag.length
                  p1.bag.push({ ...items[Object.keys(items)[ii]] });
                  p1.bag[on].hav = gameDatas.p1.bag[i].hav
                }
              }
            }

            // 인벤
            for (let i = 0; i < gameDatas.p1.inven.length; i++) {
              if (test.tphone.itemCode === gameDatas.p1.inven[i].itemCode) {
                let on = p1.inven.length
                p1.inven.push({ ...test.tphone });
                p1.inven[on].hav = gameDatas.p1.inven[i].hav
              }
            }
            for (let i = 0; i < gameDatas.p1.inven.length; i++) {
              for (let ii = 0; ii < Object.keys(items).length; ii++) {
                if (items[Object.keys(items)[ii]].itemCode === gameDatas.p1.inven[i].itemCode) {
                  gameDatas.p1.inven[i].active = items[Object.keys(items)[ii]].active
                  p1.inven.push(gameDatas.p1.inven[i])
                }
              }
            }


            // 스킬
            for (let i = 0; i < gameDatas.p1.skill.length; i++) {
              for (let ii = 0; ii < Object.keys(skills).length; ii++) {
                if (skills[Object.keys(skills)[ii]].id === gameDatas.p1.skill[i].id) {
                  let on = p1.skill.length
                  p1.skill.push({ ...skills[Object.keys(skills)[ii]] });
                  p1.skill[on].skillLv = gameDatas.p1.skill[i].skillLv
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.passi.length; i++) {
              for (let ii = 0; ii < Object.keys(skills).length; ii++) {
                if (skills[Object.keys(skills)[ii]].id === gameDatas.p1.passi[i].id) {
                  let on = p1.passi.length
                  p1.passi.push({ ...skills[Object.keys(skills)[ii]] });
                  p1.passi[on].skillLv = gameDatas.p1.passi[i].skillLv
                }
              }
            }
            // 퀘스트
            for (let i = 0; i < gameDatas.p1.nowQuest.length; i++) {
              for (let ii = 0; ii < Object.keys(quest).length; ii++) {
                if (quest[Object.keys(quest)[ii]].id === gameDatas.p1.nowQuest[i].id) {
                  gameDatas.p1.nowQuest[i].talk = quest[Object.keys(quest)[ii]].talk
                  gameDatas.p1.nowQuest[i].complete = quest[Object.keys(quest)[ii]].complete
                  p1.nowQuest.push(gameDatas.p1.nowQuest[i])
                }
              }
            }
            for (let i = 0; i < gameDatas.p1.clearQuest.length; i++) {
              for (let ii = 0; ii < Object.keys(quest).length; ii++) {
                if (quest[Object.keys(quest)[ii]].id === gameDatas.p1.clearQuest[i].id) {
                  gameDatas.p1.clearQuest[i].talk = quest[Object.keys(quest)[ii]].talk
                  gameDatas.p1.clearQuest[i].complete = quest[Object.keys(quest)[ii]].complete
                  p1.clearQuest.push(gameDatas.p1.clearQuest[i])
                }
              }
            }



            for (let i = 0; i < Object.keys(vil).length; i++) {
              if (vil[Object.keys(vil)[i]].id === gameDatas.Gdata.nextVil.id) {
                Gdata.nextVil = vil[Object.keys(vil)[i]]
              }
            }
            Gdata.goout = false
            Gdata.ft = 0
            Gdata.ininv = false
            Gdata.finv = false
            Gdata.invloci = 0
            
            igame()
          } else {
            console.log(chalk.yellow("비어있어요!"));
          }
        } else {
          wti = false
        }
      }
      break;
    case 3:
      console.log(chalk.blue("테스팅 돌입"));
      sleep(2);
      cl();
      checkstat();

      anitext("플레이어 골드 설정", 0.01, "b", 0.01);
      br();
      let choiceg = readlineSync.question(" > ");
      p1.gold = Number(choiceg);

      cl();
      anitext("플레이어 레벨 설정", 0.01, "b", 0.01);
      br();
      let choice4 = readlineSync.question(" > ");
      ln = Number(choice4);
      p1.lv = ln;
      anitext(p1.lv + "레벨 설정", 0.01, "b", 0.01);
      // p1.lv = 1

      cl();
      anitext("(고르는 무기에 따라 직업이 결정됩니다.)", 0.01, "b", 0.01);
      br();
      anitext("(1.검 2.방패 3.지팡이 4.단도 5.활)", 0.01, "b", 0.01);
      br();
      anigiv(items.b1, 1, 0);
      wear(p1.inven[0]);
      checkstat();
      for (let i = 0; i === 0;) {
        const choice12 = readlineSync.question(" > ");
        switch (choice12) {
          case "1":
            p1.class = "warrior";
            anigiv(items.ww1, 1, 0);
            wear(p1.inven[0]);
            givskill(skills.psiw);
            givskill(skills.downstrike);
            i++;
            break;

          case "2":
            p1.class = "defender";
            anigiv(items.wd1, 1, 0);
            wear(p1.inven[0]);
            givskill(skills.psid);
            givskill(skills.shielddash);
            i++;
            break;
          case "3":
            p1.class = "magiccaster";
            anigiv(items.wm1, 1, 0);
            wear(p1.inven[0]);
            givskill(skills.psim);
            givskill(skills.fireball);
            i++;
            break;
          case "4":
            p1.class = "rogue";
            anigiv(items.wr1, 1, 0);
            wear(p1.inven[0]);
            givskill(skills.psir);
            givskill(skills.sneakattack);
            i++;
            break;
          case "5":
            p1.class = "archer";
            anigiv(items.wa1, 1, 0);
            wear(p1.inven[0]);
            givskill(skills.psia);
            givskill(skills.headshot);
            i++;
            break;
          case "1324":
            anitext("개발자 모드 돌입", 0.1, "c", 1);
            p1.maxsk = 100
            anigiv(items.b3, 1, 0);
            wear(p1.inven[0]);
            anigiv(items.b1, -1, 0);
            anigiv(test.tphone, 1, 0);
            anigiv(items.t0, 1, 0);
            anigiv(items.tp0, 1, 0);
            anigiv(items.tst1, 1, 0);
            anigiv(items.tst2, 1, 0);
            anigiv(items.e23, 1000, 0);
            anigiv(items.e6, 1000, 0);
            anigiv(items.e1, 1000, 0);
            givskill(skills.psit);
            givskill(skills.ttkillmonster);
            givskill(skills.ttavoid);
            givskill(skills.ttheal);
            givskill(skills.tteffect);
            givskill(skills.ttsu);
            p1.class = "tenster";
            i++;
            break;
          default:
            anitext(p1.name + "용사는 이해하지 못했다.", 0.1, "c", 2);
            cl();
            console.log(chalk.blue("(고르는 무기에 따라 직업이 결정됩니다.)"));
            console.log(chalk.blue("(1.검 2.방패 3.지팡이 4.단도 5.활)"));
        }
      }
      checkstat();
      chokihwa();
      cl();

      igame();
      break;
    case 0:
      console.log(chalk.red("게임을 종료합니다."));
      // 게임 종료 로직을 구현
      process.exit(0); // 게임 종료
      break;
    default:
      console.log(chalk.red("올바른 선택을 하세요."));
      handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}




// 마을 함수


function locate(vilname) {
  Gdata.goout = false
  checkstat()
  function vcl() {
    cl();
    const line = chalk.cyanBright("─".repeat(60));
    console.log(line);
    process.stdout.write(chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사"));
    process.stdout.write(chalk.redBright("  HP : " + p1.zhp + " / " + p1.fhp));
    process.stdout.write(chalk.blueBright("  MP : " + p1.zmp + " / " + p1.fmp));
    process.stdout.write(chalk.yellowBright("  Gold : " + p1.gold));
    br();
    console.log(line);
    process.stdout.write(chalk.blueBright("                       "));
    process.stdout.write(chalk.blueBright(vilname.name + " 마을"));
    br();
    console.log(line);
    aniprt(vilname.char);
    console.log(line);
  }
  function hcl() {
    cl();
    const line = chalk.yellowBright("─".repeat(60));
    console.log(line);
    process.stdout.write(
      chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사")
    );
    process.stdout.write(chalk.redBright("  HP : " + p1.zhp + " / " + p1.fhp));
    process.stdout.write(chalk.blueBright("  MP : " + p1.zmp + " / " + p1.fmp));
    process.stdout.write(chalk.yellowBright("  Gold : " + p1.gold));
    br();
    console.log(line);
    process.stdout.write(chalk.blueBright("                       "));
    process.stdout.write(chalk.redBright(vilname.name));
    br();
    console.log(line);
    aniprt(vilname.char);
    console.log(line);
  }
  let loeli = [];
  for (let i = 0; i < vilname.near.length; i++) {
    loeli.push(vil[vilname.near[i]].name);
  }
  let scho;
  Gdata.invloci = 0

  if (vilname.type === "vil") {
    let losli = [];
    let lonli = [];
    for (let i = 0; i < vilname.slist.length; i++) {
      losli.push(vilname.slist[i].shopname);
    }
    for (let i = 0; i < vilname.npcs.length; i++) {
      lonli.push(vilname.npcs[i].name);
    }

    let cholist = ["가방", "상점", "NPC대화", "여관", vilname.specName];

    // let loci = 0;
    Gdata.invloci = 0
    while (Gdata.invloci === 0 && !Gdata.goout) {
      vcl();
      let locho =
        readlineSync.keyInSelect(cholist, " > ", { cancel: "다른 지역으로" }) +
        1;
      switch (locho) {
        case 1:
          openiv();
          break;
        case 2:
          vcl();
          scho = readlineSync.keyInSelect(losli, " > ", { cancel: "마을로" });
          if (scho === -1) {
            vcl();
            anitext("마을로 돌아가자.", 0.1, "c", 2);
          } else {
            vilname.slist[scho].a();
            shop(vilname.slist[scho]);
          }

          break;
        case 3:
          vcl();
          scho = readlineSync.keyInSelect(lonli, " > ", { cancel: "마을로" });
          if (scho === -1) {
            vcl();
            anitext("마을로 돌아가자.", 0.1, "c", 2);
          } else {
            npctalk(vilname.npcs[scho]);
          }
          break;
        case 4:
          inn(vilname.inn[0]);
          break;
        case 5:
          cl();
          vilname.special()
          break;
        case 0:
          vcl();
          scho = readlineSync.keyInSelect(loeli, " > ", {
            cancel: "이전 마을로",
          });
          if (scho === -1) {
            vcl();
            anitext("돌아가자.", 0.1, "c", 2);
          } else {
            vcl();
            if (vil[vilname.near[scho]].check()) {
              anitext(loeli[scho] + "(으)로 떠납니다.", 0.1, "c", 2);
              Gdata.nextVil = vil[vilname.near[scho]];
              Gdata.invloci++;
            }
          }
          break;
        default:
          anitext("여기는 에러", 0.1, "c", 2);
          break;
      }
    }
  }
  if (vilname.type === "hunt") {
    hcl();

    if (rand(100) <= vilname.dolbal) {
      vilname.looking(1);
    }
    if (Gdata.FMdata.dead) {
      Gdata.invloci = 1
    }

    let cholist = ["가방", "탐험"];

    while (Gdata.invloci === 0 && !Gdata.goout) {
      hcl();
      let locho =
        readlineSync.keyInSelect(cholist, " > ", { cancel: "다른 지역으로" }) +
        1;
      switch (locho) {
        case 1:
          openiv();
          break;
        case 2:
          hcl();
          anitext(vilname.name + "(을)를 탐험하기로 하였다.", 0.1, "c", 3);
          br();
          vilname.looking(0);
          if (Gdata.FMdata.dead) {
            Gdata.invloci = 1
          }
          break;
        case 3:
          hcl();
          break;
        case 0:
          hcl();
          scho = readlineSync.keyInSelect(loeli, " > ", { cancel: "돌아가기" });
          if (scho === -1) {
            hcl();
            anitext("돌아가자.", 0.1, "c", 2);
          } else {
            hcl();
            if (vil[vilname.near[scho]].check()) {
              anitext(loeli[scho] + "(으)로 떠납니다.", 0.1, "c", 2);
              Gdata.nextVil = vil[vilname.near[scho]];
              Gdata.invloci++;
            }
          }
          break;

        default:
          anitext("여기는 에러", 0.1, "c", 2);
          break;
      }
    }
  }
}


function mcl(char) {
  cl();
  const line = chalk.cyanBright("─".repeat(60));
  console.log(line);
  process.stdout.write(
    chalk.cyanBright(" Lv." + p1.lv + " " + p1.name + "용사 ")
  );
  process.stdout.write(chalk.redBright("     HP : " + p1.zhp + " / " + p1.fhp));
  process.stdout.write(
    chalk.blueBright("     MP : " + p1.zmp + " / " + p1.fmp)
  );
  br();
  console.log(line);
  aniprt(char);
  console.log(line);
}

function fgame() {
  sleep(1);
  cl();
  anitext("...", 1, "w", 1);
  br();
  anitext("Detecting language...", 0.3, "g", 1);
  br();
  anitext("Language detected : Korean", 0.1, "b", 3);
  cl();
  aniprt("code");
  anitext("안녕하세요! ", 0.1, "c", 1);
  anitext("제 소개를 먼저 할게요.", 0.1, "c", 1);
  br();
  anitext("저는 앞으로 당신의 게임 진행을 도와드릴", 0.1, "c", 0.1);
  br();
  anitext("Reads Scenarios and Helps For Play Game Code", 0.02, "b", 1);
  br();
  anitext("어...", 0.1, "c", 1);
  anitext("그냥 코드씨 라고 불러주세요!", 0.1, "c", 2);
  cl();
  aniprt("code");
  anitext("아무튼!", 0.1, "y", 1);
  br();
  anitext("게임 설명이나 마저 하겠습니다.", 0.15, "c", 2);
  cl();
  aniprt("code");
  anitext("제가 하는 말에 앞 뒤에는", 0.1, "c", 0.1);
  anitext('""', 0.1, "w", 0.1);
  anitext("특수문자가 뜨지 않습니다.", 0.1, "c", 1);
  br();
  anitext("반대로 게임 속 등장인물의 대사에는", 0.1, "c", 0.1);
  anitext('""', 0.1, "w", 0.1);
  anitext("특수문자가 표시됩니다.", 0.1, "c", 1);
  br();
  anitext("이제", 0.1, "c", 0.1);
  anitext(" y ", 0.1, "y", 0.1);
  anitext("를 입력하면 프롤로그를 진행합니다.", 0.1, "c", 0.1);
  br();
  anitext("넘기려면", 0.1, "c", 0.1);
  anitext(" n ", 0.1, "y", 0.1);
  anitext("을 입력하면 프롤로그를 스킵합니다.", 0.1, "c", 0.1);
  //입력문
  let skip = 0;
  for (var i = 0; i === 0;) {
    br();
    const mchoice = readlineSync.question(" > ");
    switch (mchoice) {
      case "y":
        anitext("재미있게 감상 해주세요.", 0.1, "c", 1);
        i++;
        break;
      case "n":
        // anitext('미구현', 0.1, 'c', 1);
        anitext("나의 이름은..?", 0.3, "w", 0.5);
        //입력문
        for (var i = 0; i === 0;) {
          const mchoice = readlineSync.question(" > ");
          switch (mchoice) {
            default:
              p1.name = mchoice;
              i++;
          }
        }
        skip = 1;
        i++;
        break;
      default:
        anitext("다시 입력하세요", 0.1, "c", 1);
        cl();
    }
  }
  if (skip === 0) {
    cl();
    anitext("Chapter : Prologue", 0.2, "g", 1);
    br();
    br();
    //텍스트 그림 넣을레?
    anitext("어느 화창한 오후", 0.1, "c", 1);
    br();
    anitext("방구석 겜창인 ", 0.1, "c", 0.5);
    anitext("오늘의 주인공이 있습니다. ", 0.1, "c", 0.1);
    br();
    anitext("이벤트를 달리느라 ", 0.1, "c", 0.3);
    br();
    anitext("오늘 하루도 잠을 안 자고 ", 0.1, "c", 0.3);
    br();
    anitext("게임만 하는군요", 0.2, "c", 1);
    cl();
    anitext('"이벤트 다 달렸다.."', 0.2, "w", 0.1);
    br();
    anitext("(꼬르륵)", 0.1, "w", 2);
    br();
    anitext('"아, ', 0.2, "w", 0.5);
    anitext('점심 뭐 먹지.."', 0.1, "w", 1);
    br();
    anitext("아무리 인간 말종이지만 ", 0.1, "c", 0.3);
    anitext("꼴에 배꼽시계는 정상작동 하는군요", 0.1, "c", 1.5);
    br();
    anitext('"아-', 0.3, "w", 0.5);
    anitext("맞다", 0.3, "w", 0.5);
    anitext(' 편의점에서 빵 콜라보 했지.."', 0.1, "w", 1);
    br();
    anitext("당신은 빵을 사기 위해 ", 0.05, "c", 0.5);
    anitext("편의점으로 향합니다.", 0.1, "c", 1);
    cl();
    anitext("(2시간 뒤)", 0.1, "b", 1);
    br();
    anitext(
      "10군데가 넘는 편의점을 다니고 11번째 편의점에 도착합니다.",
      0.1,
      "c",
      1
    );
    br();
    anitext("이런, ", 0.1, "c", 0.5);
    anitext("이번 편의점에도 빵이 품절이군요", 0.1, "c", 0.5);
    br();
    anitext('"...', 0.4, "w", 1);
    anitext("하아..", 0.1, "w", 1);
    anitext('벌써 몇 번째 편의점이야"', 0.1, "w", 1);
    br();
    anitext('"하나쯤은 있을법 한데 X발"', 0.1, "w", 1);
    br();
    anitext("다른 편의점으로 가야겠네요.", 0.1, "c", 2);
    cl();
    anitext("아쉬운 마음을 뒤로 한 채 ", 0.1, "c", 0.5);
    anitext("다른 편의점으로 가던 당신은", 0.1, "c", 1.5);
    br();
    anitext("피로에 쩔어", 0.1, "c", 0.3);
    anitext(" 신호등을 건너던 도중", 0.1, "c", 0.3);
    br();
    anitext("(철푸덕)", 0.1, "w", 0.3);
    br();
    anitext("바닥에 곤두박질칩니다", 0.1, "c", 2);
    br();
    anitext('"...아', 0.4, "w", 0.5);
    anitext('...마지막으로 잔게 언제였더라..."', 0.2, "w", 0.3);
    br();
    anitext("(빠아앙~!)", 0.1, "c", 1);

    cl();
    aniprt("kkk")
    sleep(3);
    cl();
    anitext("...", 0.5, "c", 1);
    anitext("트럭에 치여 사망합니다.", 0.1, "c", 1);
    cl();
    anitext("눈 앞이 캄캄합니다.", 0.1, "c", 3);
    cl();
    anitext('"..님..."', 0.2, "w", 1);
    br();
    anitext("어둠속에서 누군가의 목소리가 들려옵니다.", 0.1, "c", 3);
    cl();
    anitext('"용사...', 0.2, "w", 0.5);
    anitext(' 어나세요..."', 0.2, "w", 1);
    cl();
    aniprt("mio");
    anitext('"깨어나세요', 0.2, "w", 0.3);
    anitext(' 용사님"', 0.2, "w", 1);
    br();
    anitext("눈을 떠보니", 0.1, "c", 0.3);
    anitext(" 아름다운 미모의 여성이", 0.1, "c", 0.3);
    anitext(" 당신에게 말을 건넵니다.", 0.1, "c", 0.3);
    cl();
    aniprt("mio");
    anitext('"아, 정신이 드셨나요?"', 0.1, "w", 1);
    br();
    anitext('"여긴.. ', 0.3, "w", 0.5);
    anitext('어..디죠?"', 0.2, "w", 1);
    br();
    anitext('"이곳은 이계입니다."', 0.1, "w", 1);
    br();
    anitext('"이계..?"', 0.3, "w", 2);
    cl();
    aniprt("mio");
    anitext(
      "오타쿠처럼 게임만 하다 죽어서 그런지 헛것이 보이는 느낌이네요",
      0.1,
      "c",
      0.5
    );
    anitext(" 하!하!하!", 0.5, "c", 1);
    cl();
    aniprt("mio");
    anitext('"정신이 온전하신 상태가 아니군요.."', 0.1, "w", 2);
    br();
    anitext('"저의 이름은 아인"', 0.1, "w", 1);
    br();
    anitext('"용사님의 이름은 무엇인가요?"', 0.1, "w", 1);
    cl();
    anitext('"나의 이름은..?', 0.4, "w", 0.5);
    //입력문
    for (var i = 0; i === 0;) {
      const choice1 = readlineSync.question(" > ");
      switch (choice1) {
        default:
          p1.name = choice1;
          i++;
      }
    }
    anitext('입니다."', 0.1, "w", 1);
    cl();
    aniprt("mio");
    anitext('"' + p1.name + '용사님..."', 0.1, "w", 1);
    br();
    anitext('"이계 세피로트는 지금 위기에 처해있습니다."', 0.1, "w", 1);
    br();
    anitext('"' + p1.name + '용사님의 도움이 필요합니다."', 0.1, "w", 1);
    br();
    anitext('"부디.. 세피로트를 구원해주세요"', 0.1, "w", 1);
    cl();
    aniprt("mio");
    anitext("뭔지 모를 소리만 늘어놓는 이상한 사람이군요", 0.1, "c", 1);
    br();
    anitext('"네..?!"', 0.1, "w", 1);
    br();
    anitext('"무운을 빕니다."', 0.1, "w", 1);
    br();
    anitext('"아니 잠ㄲ.."', 0.1, "w", 1);
  }
  cl();
  anitext("당신은 빛에 휩싸이기 시작합니다.", 0.1, "c", 2);
  br();
  anitext(
    "■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n".repeat(20),
    0.001,
    "c",
    2
  );
  cl();
  anitext("눈을 떠보니 하늘이 보입니다.", 0.1, "c", 1);
  br();
  anitext(p1.name + "용사님 누워계시군요..?", 0.2, "c", 1);
  anitext("(크흠)", 0.1, "c", 1);
  br();
  anitext("정말 아름다운 날입니다.", 0.1, "c", 1);
  br();
  anitext("새들은 지저귀고, 꽃들은 피어나고...", 0.1, "c", 2);
  br();
  anitext("(벌떡 일어난다)", 0.1, "w", 0.5);
  br();
  anitext('"이게 뭐야;;"', 0.1, "w", 1);
  br();
  anitext("어찌된 일인지 모르겠지만 우선 일어나기로 합니다.", 0.1, "c", 2);
  cl();
  anitext("!!!", 0.1, "c", 1);
  br();
  aniprt("wolf");
  anitext("늑대가 나타났습니다.", 0.1, "c", 0.4);
  br();
  anitext('"갑자기?!"', 0.1, "w", 2);
  br();
  cl();
  anitext("그러자 눈 앞에 무기가 생겨나기 시작합니다.", 0.1, "c", 1);
  br();
  anitext("위기에 처한 당신은 우선 무기를 고르기로 합니다.", 0.1, "c", 1);
  cl();
  anitext("(고르는 무기에 따라 직업이 결정됩니다.)", 0.01, "b", 0.01);
  br();
  anitext("(1.검 2.방패 3.지팡이 4.단도 5.활)", 0.01, "b", 0.01);
  br();
  checkstat();
  // console.log(p1.bagsize)
  anigiv(items.b1, 1, 0);
  wear(p1.inven[0]);
  checkstat();
  for (let i = 0; i === 0;) {
    const choice12 = readlineSync.question(" > ");
    switch (choice12) {
      case "1":
        anitext("검을 집어들자 나머지 무기가 사라집니다.", 0.1, "c", 1);
        p1.class = "warrior";
        anigiv(items.ww1, 1, 0);
        wear(p1.inven[0]);
        givskill(skills.psiw);
        givskill(skills.downstrike);
        i++;
        break;

      case "2":
        anitext("방패를 집어들자 나머지 무기가 사라집니다.", 0.1, "c", 1);
        p1.class = "defender";
        anigiv(items.wd1, 1, 0);
        wear(p1.inven[0]);
        givskill(skills.psid);
        givskill(skills.shielddash);
        i++;
        break;
      case "3":
        anitext("지팡이를 집어들자 나머지 무기가 사라집니다.", 0.1, "c", 1);
        p1.class = "magiccaster";
        anigiv(items.wm1, 1, 0);
        wear(p1.inven[0]);
        givskill(skills.psim);
        givskill(skills.fireball);
        i++;
        break;
      case "4":
        anitext("단도를 집어들자 나머지 무기가 사라집니다.", 0.1, "c", 1);
        p1.class = "rogue";
        anigiv(items.wr1, 1, 0);
        wear(p1.inven[0]);
        givskill(skills.psir);
        givskill(skills.sneakattack);
        i++;
        break;
      case "5":
        anitext("활을 집어들자 나머지 무기가 사라집니다.", 0.1, "c", 1);
        p1.class = "archer";
        anigiv(items.wa1, 1, 0);
        wear(p1.inven[0]);
        givskill(skills.psia);
        givskill(skills.headshot);
        i++;
        break;
      case "1324":
        anitext("당신.. 개발자군요?", 0.1, "c", 1);
        anigiv(test.tphone, 1, 0);
        anigiv(items.t0, 1, 0);
        givskill(skills.psit);
        givskill(skills.ttkillmonster);
        givskill(skills.ttavoid);
        givskill(skills.ttheal);
        givskill(skills.tteffect);
        givskill(skills.ttsu);
        p1.class = "tenster";
        i++;
        break;
      default:
        anitext(p1.name + "용사는 이해하지 못했다.", 0.1, "c", 2);
        cl();
        console.log(chalk.blue("(고르는 무기에 따라 직업이 결정됩니다.)"));
        console.log(chalk.blue("(1.검 2.방패 3.지팡이 4.단도 5.활)"));
    }
  }
  sleep(5);
  checkstat();
  chokihwa();
  fight(monsters.wolf, 1);
  mcl("null");
  anitext('"도대체 뭐였던거야..."', 0.1, "w", 1);
  br();
  anitext("늑대입니다.", 0.1, "c", 1);
  br();
  anitext('"아직도 뭐가 뭔지 모르겠어.."', 0.2, "w", 2);
  br();
  mcl("wolvesForest");
  anitext(p1.name + "용사는 주변을 둘러보기로 합니다.", 0.1, "c", 2);
  br();
  anitext("마을로 갈 수 있는 길이 있는 모양입니다.", 0.1, "c", 1);
  mcl("wolvesForest");
  anitext('"이쪽으로 가면 마을이 나오려나.."', 0.1, "w", 1);
  br();
  anitext(
    "그렇게 " + p1.name + "용사는 길을 따라 걷기 시작합니다.",
    0.1,
    "c",
    1
  );
  igame();
}
function igame() {
  while (!Gdata.goout || gend === 0) {
    if (!Gdata.FMdata.dead) {
      locate(Gdata.nextVil);
    } else {
      cl()
      anitext("아...", 0.1, "c", 1);
      br();
      anitext("용사님...", 0.1, "c", 4);
      gend = 1;
      Gdata.goout = true
    }
  }
}
let gend = 0;
// 게임 실행

// 게임 시작 함수
function start() {
  Gdata.goout = false
  displayLobby();
  handleUserInput();
  gend = 0;
}
while (true) {
  start();
}
