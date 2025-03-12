const { p1, Gdata } = require("./users-data");
const { sleep, aniprt, br, cl, anitext, anigiv, checkstat } = require("./func");
// let { Gdata } = require("./G-data");
const { givbuff, buffs } = require("./buffs");
const { givskill, skills } = require("./skills");
const readlineSync = require("readline-sync");
let { vil: _vil } = require("./vil");

let vil = null;
function ck() {
  __vil = !_vil ? require("./vil") : _vil;
  let { vil: vil2 } = __vil;
  vil = vil2;
}

// function pot(what, how) {

// }
const items = {
  i0: {
    itemCode: "i0",
    type: "potion",
    craft: false,
    char: "redballpotion",
    itemName: "빨간 HP 포션",
    iteminfo: "세피로트 대륙의 생명초로 만든 포션, 전문 연금술사들이 보통 제작한다.",
    itemDesc: "HP를 20회복하는 포션",
    price: 40,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      p1.zhp += 20;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 20의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i1: {
    itemCode: "i1",
    type: "potion",
    craft: false,
    char: "blueballpotion",
    itemName: "파란 MP 포션",
    iteminfo: "미네랄에서 추출한 마소를 담아 만든 포션이다.",
    itemDesc: "MP를 20회복하는 포션",
    price: 50,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      p1.zmp += 20;
      if (p1.zmp > p1.fmp) {
        p1.zmp = p1.fmp;
      }
      anitext(p1.name + "용사는 20의 MP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i2: {
    itemCode: "i2",
    type: "potion",
    craft: false,
    char: "redballpotion",
    itemName: "하급 만능 포션",
    iteminfo: "연금술사 가문중 가장 뛰어나다는 위즈 가문에서 생산하는 만능 포션, 저가형인듯 하다.",
    itemDesc: "HP와 MP를 30회복하는 포션",
    price: 150,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 30;
      p1.zmp += 30;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      if (p1.zmp > p1.fmp) {
        p1.zmp = p1.fmp;
      }
      anitext(p1.name + "용사는 30의 HP, MP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i3: {
    itemCode: "i3",
    type: "potion",
    craft: false,
    char: "i3",
    itemName: "빨간 사과",
    iteminfo: "웨이든 지역에서만 나오는 질 좋은 사과.",
    itemDesc: "HP를 5회복하는 아이템 (맛있다)",
    price: 10,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 5;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 5의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i4: {
    itemCode: "i4",
    type: "potion",
    craft: false,
    char: "blueballpotion",
    itemName: "아이언 바디 포션",
    iteminfo: "먹는 순간 몸과 마음이 든든해지는 포션이다.",
    itemDesc: "2턴동안 최대 HP를 50증가시키는 포션",
    price: 100,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      givbuff(buffs.ironbody, 2)
      checkstat()
      p1.zhp += 50;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사의 최대 HP가 50증가했다!", 0.1, "c", 0.5);
    },
  },
  i5: {
    itemCode: "i5",
    type: "potion",
    craft: false,
    char: "redballpotion",
    itemName: "파워업 포션",
    iteminfo: "먹으면 강해지는 포션이다.",
    itemDesc: "3턴동안 최대 데미지를 10증가시키는 포션",
    price: 100,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      givbuff(buffs.powerup, 3)
      checkstat()
      anitext(p1.name + "용사가 강해졌다!", 0.1, "c", 0.5);
    },
  },
  i6: {
    itemCode: "i6",
    type: "potion",
    craft: false,
    char: "i6",
    itemName: "청사과",
    iteminfo: "빨간 사과랑 비슷하지만 조금 더 새콤하다.",
    itemDesc: "MP를 5회복하는 아이템",
    price: 15,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zmp += 5;
      if (p1.zmp > p1.fmp) {
        p1.zmp = p1.fmp;
      }
      anitext(p1.name + "용사는 5의 MP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i7: {
    itemCode: "i7",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "오로콘 열매",
    iteminfo: "돌기가 있고 먹으면 단 맛이 일품인 열매다.",
    itemDesc: "HP를 15회복하는 아이템 (엄청 맛있다)",
    price: 30,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 15;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 15의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i8: {
    itemCode: "i8",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "카틀 열매",
    iteminfo: "조금 시큼하지만 먹으면 몸이 가벼워진다.",
    itemDesc: "3턴동안 속도를 10증가시키는 아이템",
    price: 40,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      givbuff(buffs.kaspeed, 3)
      checkstat()
      anitext("몸이 가벼워졌다!", 0.1, "c", 0.5);
    },
  },
  i9: {
    itemCode: "i9",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "스테이크",
    iteminfo: "스테이크의 정석.",
    itemDesc: "HP를 100회복하는 아이템 (엄청 맛있다)",
    price: 200,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 100;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 100의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i10: {
    itemCode: "i10",
    type: "potion",
    craft: false,
    char: "redballpotion",
    itemName: "상급 HP 포션",
    iteminfo: "위즈 가문에서 생산하는 상급 포션, 훨씬 높은 순도를 자랑한다.",
    itemDesc: "HP를 200회복하는 포션",
    price: 300,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      p1.zhp += 200;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 200의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  i11: {
    itemCode: "i11",
    type: "potion",
    craft: false,
    char: "blueballpotion",
    itemName: "상급 MP 포션",
    iteminfo: "위즈 가문에서 생산하는 상급 포션, 훨씬 높은 순도를 자랑한다.",
    itemDesc: "MP를 200회복하는 포션",
    price: 300,
    hav: 0,
    active() {
      anigiv(this, -1, 0)
      p1.zmp += 200;
      if (p1.zmp > p1.fmp) {
        p1.zmp = p1.fmp;
      }
      anitext(p1.name + "용사는 200의 MP를 회복했다!", 0.1, "c", 0.5);
    },
  },


  tp0: {
    itemCode: "tp0",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "프로토 귀환 주문서",
    iteminfo: "급하게 이동이 필요하다면..",
    itemDesc: "프로토로 귀환한다.(전투중 사용 불가능)",
    price: 300,
    hav: 0,
    active() {
      if (Gdata.ft === 1) {
        anitext("지금은 사용 할 수 없다...", 0.1, "c", 0.5);
      }else{
        ck()
        anigiv(this, -1, 0)
        Gdata.nextVil = vil.proto
        anitext("프로토로 이동한다.", 0.1, "c", 2);
        if (Gdata.ininv) {
          Gdata.ininv = false
        }
        if (Gdata.finv) {
          Gdata.finv = false
        }
        Gdata.invloci++
        
      }
    },
  },
  tp1: {
    itemCode: "tp1",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "리튼 귀환 주문서",
    iteminfo: "급하게 이동이 필요하다면..",
    itemDesc: "리튼으로 귀환한다.(전투중 사용 불가능)",
    price: 300,
    hav: 0,
    active() {
      if (Gdata.ft === 1) {
        anitext("지금은 사용 할 수 없다...", 0.1, "c", 0.5);
      }else{
        ck()
        anigiv(this, -1, 0)
        Gdata.nextVil = vil.leeten
        anitext("리튼으로 이동한다.", 0.1, "c", 2);
        if (Gdata.ininv) {
          Gdata.ininv = false
        }
        if (Gdata.finv) {
          Gdata.finv = false
        }
        Gdata.invloci++
        
      }
    },
  },
  tp2: {
    itemCode: "tp2",
    type: "potion",
    craft: false,
    char: "null",
    itemName: "노든 귀환 주문서",
    iteminfo: "급하게 이동이 필요하다면..",
    itemDesc: "노든으로 귀환한다.(전투중 사용 불가능)",
    price: 300,
    hav: 0,
    active() {
      if (Gdata.ft === 1) {
        anitext("지금은 사용 할 수 없다...", 0.1, "c", 0.5);
      }else{
        ck()
        anigiv(this, -1, 0)
        Gdata.nextVil = vil.norden
        anitext("노든으로 이동한다.", 0.1, "c", 2);
        if (Gdata.ininv) {
          Gdata.ininv = false
        }
        if (Gdata.finv) {
          Gdata.finv = false
        }
        Gdata.invloci++
        
      }
    },
  },



  chefbook: {
    itemCode: "chefbook",
    type: "scroll",
    craft: false,
    char: "null",
    itemName: "모험의 지식",
    iteminfo: "몬스터 해체 등 여러가지 모험의 지식이 담긴 책이다.",
    itemDesc: "패시브 스킬 - [" + skills.pcook.skillName + "] 습득",
    price: 400,
    hav: 0,
    active() {
      let ok = false
      if (skills.pcook.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.pcook.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.pcook.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.pcook)
          anitext(skills.pcook.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scw1: {
    itemCode: "scw1",
    type: "scroll",
    craft: false,
    char: skills.downstrike.skillIcon,
    itemName: "[" + skills.downstrike.skillName + "] 스크롤",
    iteminfo: "[" + skills.downstrike.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.downstrike.skillName + "] 습득 (필요 Lv " + skills.downstrike.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.downstrike.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.downstrike.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.downstrike.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.downstrike)
          anitext(skills.downstrike.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scw2: {
    itemCode: "scw2",
    type: "scroll",
    craft: false,
    char: skills.bulldozer.skillIcon,
    itemName: "[" + skills.bulldozer.skillName + "] 스크롤",
    iteminfo: "[" + skills.bulldozer.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.bulldozer.skillName + "] 습득 (필요 Lv " + skills.bulldozer.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.bulldozer.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.bulldozer.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.bulldozer.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.bulldozer)
          anitext(skills.bulldozer.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scw3: {
    itemCode: "scw3",
    type: "scroll",
    craft: false,
    char: skills.whirlwind.skillIcon,
    itemName: "[" + skills.whirlwind.skillName + "] 스크롤",
    iteminfo: "[" + skills.whirlwind.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.whirlwind.skillName + "] 습득 (필요 Lv " + skills.whirlwind.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.whirlwind.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.whirlwind.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.whirlwind.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.whirlwind)
          anitext(skills.whirlwind.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scw4: {
    itemCode: "scw4",
    type: "scroll",
    craft: false,
    char: skills.defenseposture.skillIcon,
    itemName: "[" + skills.defenseposture.skillName + "] 스크롤",
    iteminfo: "[" + skills.defenseposture.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.defenseposture.skillName + "] 습득 (필요 Lv " + skills.defenseposture.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.defenseposture.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.defenseposture.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.defenseposture.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.defenseposture)
          anitext(skills.defenseposture.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scw5: {
    itemCode: "scw5",
    type: "scroll",
    craft: false,
    char: skills.ultimatesword.skillIcon,
    itemName: "[" + skills.ultimatesword.skillName + "] 스크롤",
    iteminfo: "[" + skills.ultimatesword.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.ultimatesword.skillName + "] 습득 (필요 Lv " + skills.ultimatesword.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.ultimatesword.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.ultimatesword.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.ultimatesword.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.ultimatesword)
          anitext(skills.ultimatesword.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },

  scd1: {
    itemCode: "scd1",
    type: "scroll",
    craft: false,
    char: skills.shielddash.skillIcon,
    itemName: "[" + skills.shielddash.skillName + "] 스크롤",
    iteminfo: "[" + skills.shielddash.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.shielddash.skillName + "] 습득 (필요 Lv " + skills.shielddash.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.shielddash.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.shielddash.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.shielddash.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.shielddash)
          anitext(skills.shielddash.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scd2: {
    itemCode: "scd2",
    type: "scroll",
    craft: false,
    char: skills.protect.skillIcon,
    itemName: "[" + skills.protect.skillName + "] 스크롤",
    iteminfo: "[" + skills.protect.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.protect.skillName + "] 습득 (필요 Lv " + skills.protect.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.protect.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.protect.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.protect.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.protect)
          anitext(skills.protect.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scd3: {
    itemCode: "scd3",
    type: "scroll",
    craft: false,
    char: skills.riotsuppression.skillIcon,
    itemName: "[" + skills.riotsuppression.skillName + "] 스크롤",
    iteminfo: "[" + skills.riotsuppression.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.riotsuppression.skillName + "] 습득 (필요 Lv " + skills.riotsuppression.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.riotsuppression.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.riotsuppression.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.riotsuppression.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.riotsuppression)
          anitext(skills.riotsuppression.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scd4: {
    itemCode: "scd4",
    type: "scroll",
    craft: false,
    char: skills.reflection.skillIcon,
    itemName: "[" + skills.reflection.skillName + "] 스크롤",
    iteminfo: "[" + skills.reflection.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.reflection.skillName + "] 습득 (필요 Lv " + skills.reflection.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.reflection.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.reflection.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.reflection.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.reflection)
          anitext(skills.reflection.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scd5: {
    itemCode: "scd5",
    type: "scroll",
    craft: false,
    char: skills.ultimateprotect.skillIcon,
    itemName: "[" + skills.ultimateprotect.skillName + "] 스크롤",
    iteminfo: "[" + skills.ultimateprotect.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.ultimateprotect.skillName + "] 습득 (필요 Lv " + skills.ultimateprotect.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.ultimateprotect.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.ultimateprotect.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.ultimateprotect.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.ultimateprotect)
          anitext(skills.ultimateprotect.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },

  scm1: {
    itemCode: "scm1",
    type: "scroll",
    craft: false,
    char: skills.fireball.skillIcon,
    itemName: "[" + skills.fireball.skillName + "] 스크롤",
    iteminfo: "[" + skills.fireball.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.fireball.skillName + "] 습득 (필요 Lv " + skills.fireball.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.fireball.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.fireball.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.fireball.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.fireball)
          anitext(skills.fireball.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scm2: {
    itemCode: "scm2",
    type: "scroll",
    craft: false,
    char: skills.watercannon.skillIcon,
    itemName: "[" + skills.watercannon.skillName + "] 스크롤",
    iteminfo: "[" + skills.watercannon.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.watercannon.skillName + "] 습득 (필요 Lv " + skills.watercannon.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.watercannon.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.watercannon.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.watercannon.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.watercannon)
          anitext(skills.watercannon.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scm3: {
    itemCode: "scm3",
    type: "scroll",
    craft: false,
    char: skills.poisonshard.skillIcon,
    itemName: "[" + skills.poisonshard.skillName + "] 스크롤",
    iteminfo: "[" + skills.poisonshard.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.poisonshard.skillName + "] 습득 (필요 Lv " + skills.poisonshard.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.poisonshard.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.poisonshard.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.poisonshard.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.poisonshard)
          anitext(skills.poisonshard.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scm4: {
    itemCode: "scm4",
    type: "scroll",
    craft: false,
    char: skills.lightning.skillIcon,
    itemName: "[" + skills.lightning.skillName + "] 스크롤",
    iteminfo: "[" + skills.lightning.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.lightning.skillName + "] 습득 (필요 Lv " + skills.lightning.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.lightning.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.lightning.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.lightning.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.lightning)
          anitext(skills.lightning.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scm5: {
    itemCode: "scm5",
    type: "scroll",
    craft: false,
    char: skills.ultimatedispel.skillIcon,
    itemName: "[" + skills.ultimatedispel.skillName + "] 스크롤",
    iteminfo: "[" + skills.ultimatedispel.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.ultimatedispel.skillName + "] 습득 (필요 Lv " + skills.ultimatedispel.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.ultimatedispel.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.ultimatedispel.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.ultimatedispel.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.ultimatedispel)
          anitext(skills.ultimatedispel.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },

  scr1: {
    itemCode: "scr1",
    type: "scroll",
    craft: false,
    char: skills.sneakattack.skillIcon,
    itemName: "[" + skills.sneakattack.skillName + "] 스크롤",
    iteminfo: "[" + skills.sneakattack.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.sneakattack.skillName + "] 습득 (필요 Lv " + skills.sneakattack.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.sneakattack.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.sneakattack.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.sneakattack.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.sneakattack)
          anitext(skills.sneakattack.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scr2: {
    itemCode: "scr2",
    type: "scroll",
    craft: false,
    char: skills.darkhide.skillIcon,
    itemName: "[" + skills.darkhide.skillName + "] 스크롤",
    iteminfo: "[" + skills.darkhide.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.darkhide.skillName + "] 습득 (필요 Lv " + skills.darkhide.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.darkhide.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.darkhide.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.darkhide.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.darkhide)
          anitext(skills.darkhide.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scr3: {
    itemCode: "scr3",
    type: "scroll",
    craft: false,
    char: skills.weaknessattacks.skillIcon,
    itemName: "[" + skills.weaknessattacks.skillName + "] 스크롤",
    iteminfo: "[" + skills.weaknessattacks.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.weaknessattacks.skillName + "] 습득 (필요 Lv " + skills.weaknessattacks.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.weaknessattacks.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.weaknessattacks.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.weaknessattacks.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.weaknessattacks)
          anitext(skills.weaknessattacks.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scr4: {
    itemCode: "scr4",
    type: "scroll",
    craft: false,
    char: skills.chainatk.skillIcon,
    itemName: "[" + skills.chainatk.skillName + "] 스크롤",
    iteminfo: "[" + skills.chainatk.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.chainatk.skillName + "] 습득 (필요 Lv " + skills.chainatk.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.chainatk.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.chainatk.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.chainatk.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.chainatk)
          anitext(skills.chainatk.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  scr5: {
    itemCode: "scr5",
    type: "scroll",
    craft: false,
    char: skills.ultimatekiller.skillIcon,
    itemName: "[" + skills.ultimatekiller.skillName + "] 스크롤",
    iteminfo: "[" + skills.ultimatekiller.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.ultimatekiller.skillName + "] 습득 (필요 Lv " + skills.ultimatekiller.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.ultimatekiller.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.ultimatekiller.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.ultimatekiller.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.ultimatekiller)
          anitext(skills.ultimatekiller.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },

  sca1: {
    itemCode: "sca1",
    type: "scroll",
    craft: false,
    char: skills.headshot.skillIcon,
    itemName: "[" + skills.headshot.skillName + "] 스크롤",
    iteminfo: "[" + skills.headshot.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.headshot.skillName + "] 습득 (필요 Lv " + skills.headshot.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.headshot.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.headshot.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.headshot.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.headshot)
          anitext(skills.headshot.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  sca2: {
    itemCode: "sca2",
    type: "scroll",
    craft: false,
    char: skills.focusing.skillIcon,
    itemName: "[" + skills.focusing.skillName + "] 스크롤",
    iteminfo: "[" + skills.focusing.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.focusing.skillName + "] 습득 (필요 Lv " + skills.focusing.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.focusing.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.focusing.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.focusing.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.focusing)
          anitext(skills.focusing.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  sca3: {
    itemCode: "sca3",
    type: "scroll",
    craft: false,
    char: skills.rapidshot.skillIcon,
    itemName: "[" + skills.rapidshot.skillName + "] 스크롤",
    iteminfo: "[" + skills.rapidshot.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.rapidshot.skillName + "] 습득 (필요 Lv " + skills.rapidshot.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.rapidshot.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.rapidshot.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.rapidshot.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.rapidshot)
          anitext(skills.rapidshot.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  sca4: {
    itemCode: "sca4",
    type: "scroll",
    craft: false,
    char: skills.robinarrow.skillIcon,
    itemName: "[" + skills.robinarrow.skillName + "] 스크롤",
    iteminfo: "[" + skills.robinarrow.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.robinarrow.skillName + "] 습득 (필요 Lv " + skills.robinarrow.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.robinarrow.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.robinarrow.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.robinarrow.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.robinarrow)
          anitext(skills.robinarrow.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },
  sca5: {
    itemCode: "sca5",
    type: "scroll",
    craft: false,
    char: skills.ultimatearcher.skillIcon,
    itemName: "[" + skills.ultimatearcher.skillName + "] 스크롤",
    iteminfo: "[" + skills.ultimatearcher.skillName + "] 스킬을 습득 할 수 있는 스크롤이다.",
    itemDesc: "스킬 - [" + skills.ultimatearcher.skillName + "] 습득 (필요 Lv " + skills.ultimatearcher.needLv + ")",
    price: 100,
    hav: 0,
    active() {
      let ok = false
      if (skills.ultimatearcher.skillType === "active" && p1.skill.length < p1.maxsk) {
        ok = true
      }
      if (skills.ultimatearcher.skillType === "passive" && p1.passi.length < p1.maxsk) {
        ok = true
      }
      if (ok) {
        if (p1.lv >= skills.ultimatearcher.needLv) {
          anigiv(this, -1, 0)
          givskill(skills.ultimatearcher)
          anitext(skills.ultimatearcher.skillName + "(을)를 습득했다.", 0.1, "c", 2);
        } else {
          anitext("레벨이 부족합니다.", 0.1, "c", 2);
        }
      } else {
        anitext("더 이상 배울 수 없다.", 0.1, "c", 2);
      }

    },
  },



  //잡템
  e0: {
    itemCode: "e0",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "늑대의 가죽",
    iteminfo: "흔한 숲늑대의 가죽입니다. 질기고 품질이 좋지 않아 몇몇 사람들을 제외하곤 찾지 않습니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 20,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e1: {
    itemCode: "e1",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "하급 마석",
    iteminfo: "마물의 마력이 담긴 돌 (石), 전문 업자가 아니면 다루기 힘듭니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 150,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e2: {
    itemCode: "e2",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "흡혈 박쥐의 송곳니",
    iteminfo: "흡혈박쥐의 가장 날카롭고 예리한 이빨입니다. 취급에 주의합시다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 40,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e3: {
    itemCode: "e3",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "드라칼의 발톱",
    iteminfo: "웬만한 강철보다 단단하다. 이 점은 장점이자 단점이다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 5000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e4: {
    itemCode: "e4",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "해품달의 가죽",
    iteminfo: "해품달의 가죽입니다. 위협적이고 잘 도망다녀 포획하기 어려워 귀한 재료입니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 2000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e5: {
    itemCode: "e4",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "빛나는 해품달의 가죽",
    iteminfo: "빛이 나는 해품달의 가죽입니다. 안 그래도 만나기 힘든 빛나는 해품달의 가죽 그야말로 최고급 재료입니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 8000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e6: {
    itemCode: "e6",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "중급 마석",
    iteminfo: "마물의 마력이 담긴 돌 (石), 전문 업자가 아니면 다루기 힘듭니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 500,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e7: {
    itemCode: "e7",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "거대한 뼈",
    iteminfo: "골렘 TypeB가 뽑아 던지던 뼈 입니다. 상당히 구하기 어렵습니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 380,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e8: {
    itemCode: "e8",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "단단한 철판",
    iteminfo: "골렘의 외피? 마력이 느껴지는 무겁고 단단한 전리품 입니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e9: {
    itemCode: "e9",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "라이쿠의 가시",
    iteminfo: "라이쿠의 등에 박혀있던 가시입니다. 독이 있어 주의가 필요합니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e10: {
    itemCode: "e10",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "칼날수리의 고기",
    iteminfo: "칼날수리를 잡아서 나온 고기입니다. 생으로는 먹을 수 없습니다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e11: {
    itemCode: "e11",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "질긴 늑대고기",
    iteminfo: "아주 질긴 늑대의 고기다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e12: {
    itemCode: "e12",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "흉갑 형판",
    iteminfo: "흉갑 제작에 필요한 재료다.",
    itemDesc: "장비 제작 재료",
    price: 150,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e13: {
    itemCode: "e13",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "투구 형판",
    iteminfo: "투구 제작에 필요한 재료다.",
    itemDesc: "장비 제작 재료",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e14: {
    itemCode: "e14",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "부츠 형판",
    iteminfo: "부츠 제작에 필요한 재료다.",
    itemDesc: "장비 제작 재료",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e15: {
    itemCode: "e15",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "장갑 형판",
    iteminfo: "장갑 제작에 필요한 재료다.",
    itemDesc: "장비 제작 재료",
    price: 80,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e16: {
    itemCode: "e16",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "무기 형판",
    iteminfo: "무기 제작에 필요한 재료다.",
    itemDesc: "장비 제작 재료",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e17: {
    itemCode: "e17",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "해품달의 뒷다리살",
    iteminfo: "아주 연하고 품질이 좋아 어떤 방식으로 요리를 해도 녹는 맛이 일품이다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e18: {
    itemCode: "e18",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "박쥐고기",
    iteminfo: "온 몸에 모든 세포들이 먹지 말라고 말하고 있다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e19: {
    itemCode: "e19",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "바알의 마구",
    iteminfo: "바알을 처치하고 나온 무언가.",
    itemDesc: "보스 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e20: {
    itemCode: "e20",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "토끼고기",
    iteminfo: "먹어본 사람에 따르면 담백한 닭고기같은 맛이 난다고 한다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e21: {
    itemCode: "e21",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "훈연칩",
    iteminfo: "훈제 요리에 사용하는 나무 조각.",
    itemDesc: "재료",
    price: 20,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e22: {
    itemCode: "e22",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "별의 조각",
    iteminfo: "스킬 강화에 사용하는 재료이다.",
    itemDesc: "재료",
    price: 2000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e23: {
    itemCode: "e23",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "강화석",
    iteminfo: "장비 강화에 사용하는 재료이다.",
    itemDesc: "재료",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  e24: {
    itemCode: "e24",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "뼈다귀",
    iteminfo: "스켈레톤을 잡고나서 주운 뼈.. 이다.  안전하겠지..?",
    itemDesc: "몬스터의 드랍 아이템",
    price: 45,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e25: {
    itemCode: "e25",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "리자드맨 꼬리",
    iteminfo: "근육이 발달했는지 아주 튼튼하다. 보고 있으면 조금 징그럽다..",
    itemDesc: "몬스터의 드랍 아이템",
    price: 70,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e26: {
    itemCode: "e26",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "호그의 엄니",
    iteminfo: "뾰족하다. 찔리고 아팠던 이유가 충분히 납득이 간다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 150,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e27: {
    itemCode: "e27",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "피그미의 연육",
    iteminfo: "요리해서 먹으면 입에서 녹는다는 피그미의 살점이다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 130,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e28: {
    itemCode: "e28",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "피그미의 가죽",
    iteminfo: "매우 튼튼하다.. 이거 재단 가능한 건 맞는 거지..?",
    itemDesc: "몬스터의 드랍 아이템",
    price: 140,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  e29: {
    itemCode: "e29",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "베헤모스의 송곳니",
    iteminfo: "어중간한 날붙이로는 흠집조차 낼 수 없는 강도를 지녔다.",
    itemDesc: "몬스터의 드랍 아이템",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    }
  },
  

  // 조합의 세계를 펼쳐!
  f0: {
    itemCode: "f0",
    type: "food",
    craft: true,
    char: "meet",
    need: ["e10"],
    needCount: [1],
    itemName: "칼날수리 스테이크",
    iteminfo: "칼날수리 저도 참 좋아하는데요. 제가 한 번 먹어보겠습니다.",
    itemDesc: "HP를 50회복하는 요리",
    price: 100,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 50;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 50의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  f1: {
    itemCode: "f1",
    type: "food",
    craft: true,
    char: "meet",
    need: ["e17", "e21"],
    needCount: [1, 2],
    itemName: "해품달 훈제 구이",
    iteminfo: "이미 훌륭한 고기에 엄청난 향을 입혀 익힌 천상의 음식.",
    itemDesc: "HP를 150회복하는 요리",
    price: 300,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 150;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 150의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },
  f2: {
    itemCode: "f2",
    type: "food",
    craft: true,
    char: "meet",
    need: ["e20"],
    needCount: [1],
    itemName: "토끼 구이",
    iteminfo: "귀여웠던 토끼, 슬프게 맛있다.",
    itemDesc: "HP를 30회복하는 요리",
    price: 60,
    hav: 0,

    active() {
      anigiv(this, -1, 0)
      p1.zhp += 30;
      if (p1.zhp > p1.fhp) {
        p1.zhp = p1.fhp;
      }
      anitext(p1.name + "용사는 30의 HP를 회복했다!", 0.1, "c", 0.5);
    },
  },




  z0: {
    itemCode: "z0",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "강인함의 증표",
    iteminfo: "나는 강인하다. 뭐던간에 해낼 수 있다.",
    itemDesc: "하이마운트 출입을 가능하게 한다.",
    price: 0,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },
  z1: {
    itemCode: "z1",
    type: "etc",
    craft: false,
    char: "null",
    itemName: "뭐시기의 증표",
    iteminfo: "어쩌구.",
    itemDesc: "뭐시기 출입을 가능하게 한다.",
    price: 0,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },
  },

  t0: {
    itemCode: "t0",
    type: "tool",
    craft: false,
    char: "null",
    itemName: "에덴 지도",
    iteminfo: "에덴에서 사용 할 수 있는 지도.",
    itemDesc: "도구",
    price: 50,
    hav: 0,

    active() {
      if (Gdata.ft === 1) {
        anitext("사용 할 수 없다...", 0.1, "c", 0.5);
      } else {
        cl()
        aniprt("eden")
        let clm = readlineSync.question("(지도를 닫으려면 아무 키나 입력)");
      }
    },
  },

  //장비를 아이템으로?---------------------------------------------------------------------------------------------------장비

  //제작 장비

  cak0: {
    itemCode: "cak0",
    class: "all",
    type: "armor",
    craft: true,
    reinforce: false,
    need: ["e12", "e8", "e6"],
    needCount: [1, 5, 2],
    char: "null",
    itemName: "마강판 흉갑",
    iteminfo: "골렘으로(?) 만든 흉갑.",
    itemDesc: "착용시 방어력 + 30, 체력 + 200",
    price: 1000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 30;
      p1.jbhp += 200;
    },
  },
  chk0: {
    itemCode: "chk0",
    class: "all",
    type: "hat",
    craft: true,
    reinforce: false,
    need: ["e13", "e8", "e6"],
    needCount: [1, 3, 2],
    char: "null",
    itemName: "마강판 투구",
    iteminfo: "골렘으로(?) 만든 투구.",
    itemDesc: "착용시 방어력 + 20, 체력 + 100",
    price: 800,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20;
      p1.jbhp += 200;
    },
  },
  csk0: {
    itemCode: "csk0",
    class: "all",
    type: "shoes",
    craft: true,
    reinforce: false,
    need: ["e14", "e8", "e6"],
    needCount: [1, 3, 3],
    char: "null",
    itemName: "마강판 부츠",
    iteminfo: "골렘으로(?) 만든 부츠.",
    itemDesc: "착용시 방어력 + 15, 스피드 + 20, 체력 + 100",
    price: 800,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 20
      p1.jbdef += 15;
      p1.jbhp += 100;
    },
  },
  cgk0: {
    itemCode: "cgk0",
    class: "all",
    type: "gloves",
    craft: true,
    reinforce: false,
    need: ["e15", "e8", "e6"],
    needCount: [1, 4, 2],
    char: "null",
    itemName: "마강판 글러브",
    iteminfo: "골렘으로(?) 만든 글러브.",
    itemDesc: "착용시 방어력 + 10, 크리티컬 확률 + 30%, 체력 + 100",
    price: 1000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 30;
      p1.jbdef += 10;
      p1.jbhp += 100;
    },
  },


  hk0: {
    itemCode: "hk0",
    class: "all",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "가죽 투구",
    iteminfo: "가볍고 질긴 투구.",
    itemDesc: "착용시 방어력 + 2, 데미지 + 3",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 2;
      p1.jbdmg += 3;
    },
  },
  hktt0: {
    itemCode: "hktt0",
    class: "all",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "테스트 투구☆",
    iteminfo: "가볍고 질긴 투구.",
    temlv: 1,
    itemDesc: "착용시 아이템 레벨에 비례하여 방여력과 데미지가 상승한다.",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 1 + (this.temlv * 2);
      p1.jbdmg += 3;
    },
  },
  ak0: {
    itemCode: "ak0",
    class: "all",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "가죽 흉갑",
    iteminfo: "가볍고 질긴 흉갑.",
    itemDesc: "착용시 방어력 + 5, 체력 + 50",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 5;
      p1.jbhp += 50;
    },
  },
  sk0: {
    itemCode: "sk0",
    class: "all",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "가죽 부츠",
    iteminfo: "가볍고 질긴 부츠.",
    itemDesc: "착용시 스피드 + 5",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 5;
    },
  },
  gk0: {
    itemCode: "gk0",
    class: "all",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "가죽 장갑",
    iteminfo: "가볍고 질긴 장갑",
    itemDesc: "착용시 치명타 확률 + 10%",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 10;
    },
  },
  pk0: {
    itemCode: "pk0",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "초보자의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 회피율 + 10%",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhwp += 10;
    },
  },

  //아처 사냥꾼 시리즈
  h4: {
    itemCode: "h4",
    class: "archer",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "사냥꾼의 모자",
    iteminfo: "가벼운 모자입니다. 나뭇잎으로 덮여 있어 위장에도 도움이 될듯 합니다.",
    itemDesc: "착용시 스피드 + 5, 방어력 + 10, 회피율 + 5%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 5;
      p1.jbdef += 10;
      p1.jbhwp += 5;
    },
  },
  a4: {
    itemCode: "a4",
    class: "archer",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "사냥꾼의 조끼",
    iteminfo: "가볍고 많은 화살을 찰 수 있게 화살 보관용 띠가 달려 있습니다.",
    itemDesc: "착용시 스피드 + 10, 방어력 + 10, 체력 + 200",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10;
      p1.jbdef += 10;
      p1.jbhp += 200;
    },
  },
  s4: {
    itemCode: "s4",
    class: "archer",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "사냥꾼의 가죽 장화",
    iteminfo: "여러 험난한 지형을 편하게 다닐 수 있도록 밑창이 튼튼하게 되어있습니다.",
    itemDesc: "착용시 방어력 + 5, 스피드 + 15",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 5;
      p1.jbspd += 15;
    },
  },
  g4: {
    itemCode: "g4",
    class: "archer",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "사냥꾼의 장갑",
    iteminfo: "활시위를 당길 시 미끄러지지 않게 고무와 비슷한 재질로 안쪽이 덮여 있습니다.",
    itemDesc: "착용시 치명타 확률 + 20%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 20;
    },
  },
  p4: {
    itemCode: "p4",
    class: "archer",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "사냥꾼의 배지",
    iteminfo: "왠진 모르겠지만 착용만 해도 활을 잘 맞출 수 있을듯한 자신감이 듭니다.",
    itemDesc: "착용시 스피드 + 10, 데미지 + 10",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10;
      p1.jbdmg += 10;
    },
  },
  wa4: {
    itemCode: "wa4",
    class: "archer",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "리커브 보우",
    iteminfo: "독특한 설계로 인해 일반 활보다 더 많은 에너지를 담아 화살을 발사할 수 있습니다.",
    itemDesc: "착용시 데미지 + 20",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 20;
    },
  },

  h7: {
    itemCode: "h7",
    class: "archer",
    type: "hat",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "사수의 헬름",
    iteminfo: "자신을 보호하면서 공격에 방해되지 않는 그야말로 사수의 장비",
    itemDesc: "착용시 스피드, 방어력, 회피율을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10 + (this.itemLv * 5);
      p1.jbdef += 20 + (this.itemLv * 5);
      p1.jbhwp += 5;
    },
  },
  a7: {
    itemCode: "a7",
    class: "archer",
    type: "armor",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "사수의 갑옷",
    iteminfo: "빠른 장전을 위해 가동을 방해받지 않기 좋다",
    itemDesc: "착용시 스피드, 방어력, 체력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 20 + (this.itemLv * 5);
      p1.jbdef += 20;
      p1.jbhp += 300 + (this.itemLv * 50);
    },
  },
  s7: {
    itemCode: "s7",
    class: "archer",
    type: "shoes",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "사수의 부츠",
    iteminfo: "어떤 상황에서도 최고의 자세를 유지하기에 큰 도움을 준다.",
    itemDesc: "착용시 방어력, 스피드를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10;
      p1.jbspd += 30 + (this.itemLv * 10);
    },
  },
  g7: {
    itemCode: "g7",
    class: "archer",
    type: "gloves",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "사수의 장갑",
    iteminfo: "분명히 손을 보호하지만 장비하지 않은 느낌을 선사한다.",
    itemDesc: "착용시 치명타 확률을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 30 + (this.itemLv * 1);
      p1.jbspd += (this.itemLv * 5)
    },
  },
  p7: {
    itemCode: "p7",
    class: "archer",
    type: "pendant",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "사수의 팬던트",
    iteminfo: "착용자를 진정시키는 팬던트. 고도의 집중을 필요로 하는 상황에서 딱이다.",
    itemDesc: "착용시 스피드, 데미지를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 25 + (this.itemLv * 5);
      p1.jbdmg += 15;
    },
  },
  wa7: {
    itemCode: "wa7",
    class: "archer",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "배틀 크로스 보우",
    iteminfo: "발사 자체에 필요한 시간을 획기적으로 줄일 수 있는 무기",
    itemDesc: "착용시 데미지를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 35 + (this.itemLv * 5);
      p1.jbspd += (this.itemLv * 5)
    },
  },

  tst1: {
    itemCode: "tst1",
    class: "all",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 99,
    char: "null",
    itemName: "나무 몽둥이",
    iteminfo: "강화를 연습하자.",
    itemDesc: "99까지 강화 테스트를 위한 장비",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5 + (this.itemLv * 10);;
    },
  },
  tst2: {
    itemCode: "tst2",
    class: "all",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 30,
    char: "null",
    itemName: "그냥 검",
    iteminfo: "강화를 연습하자.",
    itemDesc: "30까지 강화 테스트를 위한 장비",
    price: 100,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5 + (this.itemLv * 10);;
    },
  },

  //워리어 기사 시리즈
  h3: {
    itemCode: "h3",
    class: "warrior",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 투구",
    iteminfo: "답답한 중세 투구가 아닌, 이 세계의 방식으로 새롭게 해석된 세련된 금속 투구.",
    itemDesc: "착용시 방어력 + 10, 체력 + 100",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10;
      p1.jbhp += 100;
    },
  },
  a3: {
    itemCode: "a3",
    class: "warrior",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 흉갑",
    iteminfo: "이동시 절그럭 소리가 나는것을 제외하면 불편하지 않은 금속 흉갑.",
    itemDesc: "착용시 방어력 + 20, 체력 + 200",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20;
      p1.jbhp += 200;
    },
  },
  s3: {
    itemCode: "s3",
    class: "warrior",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 신발",
    iteminfo: "당신의 발을 편안하게 감싸는 금속 신발.",
    itemDesc: "착용시 방어력 + 5, 스피드 + 15",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 5;
      p1.jbspd += 15
    },
  },
  g3: {
    itemCode: "g3",
    class: "warrior",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 건틀릿",
    iteminfo: "당신의 손목을 보호해줄 튼튼한 금속 건틀릿",
    itemDesc: "착용시 데미지 + 5, 치명타 확률 + 15",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5;
      p1.jbcri += 15;
    },
  },
  p3: {
    itemCode: "p3",
    class: "warrior",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 훈장",
    iteminfo: "과거 한 기사가 수여받은 긍지가 담긴 훈장. 이제는 상점 구석의 골동품 신세지만, 그 안에 서려있는 빛은 누구도 무시할 수 없습니다.",
    itemDesc: "착용시 스피드 + 5, 데미지 + 5, 방어력 + 5, 체력 + 50, 회피율 + 5%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 5;
      p1.jbdmg += 5;
      p1.jbdef += 5;
      p1.jbhp += 50;
      p1.jbhwp += 5;
    },
  },
  ww3: {
    itemCode: "ww3",
    class: "warrior",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "기사의 검",
    iteminfo: "적당히 사용감 있는 양손 검입니다. 밸런스가 적절하게 맞춰져 있습니다.",
    itemDesc: "착용시 데미지 + 20",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 20;
    },
  },

  h8: {
    itemCode: "h8",
    class: "warrior",
    type: "hat",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "광전사의 투구",
    iteminfo: "상대가 사람이라면 틀림없이 공포에 떨었을 투구. 사람이라면 말이야",
    itemDesc: "착용시 방어력, 체력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20 + (this.itemLv * 10);
      p1.jbhp += 10 + (this.itemLv * 6);
    },
  },
  a8: {
    itemCode: "a8",
    class: "warrior",
    type: "armor",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "광전사의 갑옷",
    iteminfo: "그야말로 「광인」이라는 단어가 어울리는 생김새의 갑옷",
    itemDesc: "착용시 체력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhp += 150 + (this.itemLv * 75);
    },
  },
  s8: {
    itemCode: "s8",
    class: "warrior",
    type: "shoes",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "광전사의 신발",
    iteminfo: "어떤 동작이라도 부담이 가능한 탄탄한 신발",
    itemDesc: "착용시 방어력, 스피드를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10;
      p1.jbspd += 30 + (this.itemLv * 10);
    },
  },
  g8: {
    itemCode: "g8",
    class: "warrior",
    type: "gloves",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "광전사의 장갑",
    iteminfo: "검을 절대로 흘리게 하지 않겠다는 장인 정신이 느껴지는 장갑",
    itemDesc: "착용시 치명타 확률을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 15 + (this.itemLv * 3);
      p1.jbdmg += (this.itemLv * 5)
    },
  },
  p8: {
    itemCode: "p8",
    class: "warrior",
    type: "pendant",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "광전사의 반지",
    iteminfo: "악을 처리하겠다는 전사의 마음가짐이 담겨있는 반지.",
    itemDesc: "착용시 데미지를 증폭시킨다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdmg += 0.2 + (this.itemLv * 0.1);
      p1.jbdmg += 15;
    },
  },
  ww8: {
    itemCode: "ww8",
    class: "warrior",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "스워드 오브 매드니스",
    iteminfo: "보기만 해도 전투의 열기를 느낄 수 있는 무시무시한 무기",
    itemDesc: "착용시 데미지를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 30 + (this.itemLv * 10);
    },
  },

  //쉴드어태커 강철 시리즈
  h2: {
    itemCode: "h2",
    class: "defender",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강철 투구",
    iteminfo: "아주 단단한 금속 투구.",
    itemDesc: "착용시 방어력 + 15, 체력 + 50",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 15;
      p1.jbhp += 50;
    },
  },
  a2: {
    itemCode: "a3",
    class: "defender",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강철 갑옷",
    iteminfo: "적의 공격이 무섭지 않을 수준의 단단한 갑옷.",
    itemDesc: "착용시 방어력 + 35, 체력 + 100",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 35;
      p1.jbhp += 100;
    },
  },
  s2: {
    itemCode: "s3",
    class: "defender",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강철 부츠",
    iteminfo: "단단함이 장점이자 단점인 부츠.",
    itemDesc: "착용시 방어력 + 15, 스피드 + 5",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 15;
      p1.jbspd += 5
    },
  },
  g2: {
    itemCode: "g3",
    class: "defender",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강철 건틀릿",
    iteminfo: "손 마저 든든하게 감싸주는 강철 건틀릿",
    itemDesc: "착용시 데미지 + 10, 치명타 확률 + 10",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 10;
      p1.jbcri += 10;
    },
  },
  p2: {
    itemCode: "p3",
    class: "defender",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "믿음의 부적",
    iteminfo: "나는 단단하다. 믿어 의심치 않는다.",
    itemDesc: "방어력 + 10%, 체력 + 50",
    price: 500,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdef += 0.1;
      p1.jbhp += 50;
    },
  },
  wd2: {
    itemCode: "wd2",
    class: "defender",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강철 방패",
    iteminfo: "가벼운 마력을 띄우고 있는 강철 방패.",
    itemDesc: "착용시 방어력 + 10, 방어력 + 10%",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10;
      p1.xdef += 0.1;
    },
  },

  h9: {
    itemCode: "h9",
    class: "defender",
    type: "hat",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 헬름",
    iteminfo: "머리를 완벽하게 보호하며 가벼운 헬름",
    itemDesc: "착용시 스피드, 방어력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 15
      p1.jbdef += 15 + (this.itemLv * 6);
    },
  },
  a9: {
    itemCode: "a9",
    class: "defender",
    type: "armor",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 갑옷",
    iteminfo: "일반적인 금속보다 훨씬 강하고 내구성이 뛰어나, 강한 충격에도 잘 견디는 갑옷",
    itemDesc: "착용시 방어력, 체력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20 + (this.itemLv * 5);
      p1.jbhp += 300 + (this.itemLv * 50);
    },
  },
  s9: {
    itemCode: "s9",
    class: "defender",
    type: "shoes",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 부츠",
    iteminfo: "적의 공격에도 밀리지 않는 신비한 부츠",
    itemDesc: "착용시 방어력, 스피드를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10 + (this.itemLv * 5);
      p1.jbspd += 20 
    },
  },
  g9: {
    itemCode: "g9",
    class: "defender",
    type: "gloves",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 장갑",
    iteminfo: "미스릴의 특성 덕분에 착용감이 뛰어나고, 전투 중 손의 피로를 최소화한다",
    itemDesc: "착용시 치명타 확률을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 20 + (this.itemLv * 1);
    },
  },
  p9: {
    itemCode: "p9",
    class: "defender",
    type: "pendant",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "견고한 반지",
    iteminfo: "반지가 견고해서 어디에 쓰지..?",
    itemDesc: "착용시 방여력을 증폭시킨다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdef += 0.1 + (this.itemLv * 0.1)
    },
  },
  wd9: {
    itemCode: "wd9",
    class: "defender",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 빅쉴드",
    iteminfo: "방어 능력을 극대화하는 소재와 생김새를 하고있다.",
    itemDesc: "착용시 방어력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 35 + (this.itemLv * 5);
      p1.jbspd += (this.itemLv * 5)
    },
  },

  //로그 검은 시리즈
  h5: {
    itemCode: "h5",
    class: "rogue",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "검은 마스크",
    iteminfo: "가볍고 마력 처리가 된 천 마스크.",
    itemDesc: "착용시 회피율 + 5%, 스피드 + 10",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhwp += 5;
      p1.jbspd += 10;
    },
  },
  a5: {
    itemCode: "a3",
    class: "rogue",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "검은 후드",
    iteminfo: "가볍고 단단해 적의 공격을 피하기 좋은 후드.",
    itemDesc: "착용시 회피율 + 5%, 방어력 + 10, 체력 + 200",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhwp += 5;
      p1.jbdef += 10;
      p1.jbhp += 200;
    },
  },
  s5: {
    itemCode: "s3",
    class: "rogue",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "검은 부츠",
    iteminfo: "빠르게 뛰어 다녀도 소리가 크지 않은 신발.",
    itemDesc: "착용시 회피율 + 5%, 스피드 + 15",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhwp += 5;
      p1.jbspd += 15;
    },
  },
  g5: {
    itemCode: "g3",
    class: "rogue",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "검은 장갑",
    iteminfo: "무기를 잡기 편해져 전투에서 유리한 장갑.",
    itemDesc: "착용시 회피율 + 5%, 치명타 확률 + 20",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbhwp += 5;
      p1.jbcri += 20;
    },
  },
  p5: {
    itemCode: "p5",
    class: "rogue",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "검은 팬던트",
    iteminfo: "검은 기운이 감도는 팬던트.",
    itemDesc: "착용시 스피드 +10, 회피율 + 10%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10;
      p1.jbhwp += 10;
    },
  },
  wr5: {
    itemCode: "ww3",
    class: "rogue",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "날카로운 단도",
    iteminfo: "아주 날카로워 적을 베어내기 쉬운 단도.",
    itemDesc: "착용시 데미지 + 40",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 40;
    },
  },

  h10: {
    itemCode: "h10",
    class: "rogue",
    type: "hat",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "강탈자의 투구",
    iteminfo: "험난한 움직임에도 불편하지 않은 투구",
    itemDesc: "착용시 스피드, 방어력, 회피율을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10 + (this.itemLv * 5);
      p1.jbdef += 20 + (this.itemLv * 5);
      p1.jbhwp += 5;
    },
  },
  a10: {
    itemCode: "a10",
    class: "rogue",
    type: "armor",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "강탈자의 갑옷",
    iteminfo: "부드럽고 질기고 단단하고 편안한 모자란 면이 없는 갑옷",
    itemDesc: "착용시 스피드, 방어력, 체력, 회피율을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 10 + (this.itemLv * 5);
      p1.jbdef += 20;
      p1.jbhp += 300 + (this.itemLv * 50);
      p1.jbhwp += 5
    },
  },
  s10: {
    itemCode: "s10",
    class: "rogue",
    type: "shoes",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "강탈자의 신발",
    iteminfo: "험하게 착지해도 소리를 최소한으로 낼 수 있는 신발",
    itemDesc: "착용시 방어력, 스피드, 회피율을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 10;
      p1.jbspd += 30 + (this.itemLv * 10);
      p1.jbhwp += 5
    },
  },
  g10: {
    itemCode: "g10",
    class: "rogue",
    type: "gloves",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "강탈자의 장갑",
    iteminfo: "최상의 그립을 선사하는 장갑",
    itemDesc: "착용시 치명타 확률, 회피율을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 30 + (this.itemLv * 2);
      p1.jbhwp += 5
    },
  },
  p10: {
    itemCode: "p10",
    class: "rogue",
    type: "pendant",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "강탈자의 팬던트",
    iteminfo: "착용자를 진정시키는 팬던트. 고도의 집중을 필요로 하는 상황에서 딱이다.",
    itemDesc: "착용시 데미지, 회피율를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 25 + (this.itemLv * 5);
      p1.jbhwp += 10;
    },
  },
  wr10: {
    itemCode: "wr10",
    class: "rogue",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "미스릴 나이프",
    iteminfo: "적은 힘으로도 질긴 가죽을 베어내는 날카로운 나이프.",
    itemDesc: "착용시 데미지를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 20 + (this.itemLv * 10);
    },
  },

  //매직캐스터  시리즈
  h6: {
    itemCode: "h6",
    class: "magiccaster",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력의 고깔 모자",
    iteminfo: "마력을 제어하기 쉬워지는 모자.",
    itemDesc: "착용시 마나 + 20, 마나 증가량 + 10",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbmp += 20
      p1.mpzen += 10
    },
  },
  a6: {
    itemCode: "a6",
    class: "magiccaster",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력의 로브",
    iteminfo: "마법을 쓰기의 최적인 로브",
    itemDesc: "착용시 방어력 + 20, 체력 + 200, 마나 + 20",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20;
      p1.jbhp += 200;
      p1.jbmp += 20
    },
  },
  s6: {
    itemCode: "s6",
    class: "magiccaster",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력의 신발",
    iteminfo: "가죽이지만 마력이 깃든 신발.",
    itemDesc: "착용시 방어력 + 5, 스피드 + 15, 마나 + 10",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbmp += 10
      p1.jbdef += 5;
      p1.jbspd += 15
    },
  },
  g6: {
    itemCode: "g6",
    class: "magiccaster",
    type: "gloves",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력의 글로브",
    iteminfo: "마법을 쓰기 수월해지는 글로브.",
    itemDesc: "착용시 데미지 + 5, 치명타 확률 + 15, 마나 + 10",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbmp += 10
      p1.jbdmg += 5;
      p1.jbcri += 15;
    },
  },
  p6: {
    itemCode: "p6",
    class: "magiccaster",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력의 팬던트",
    iteminfo: "고위 마법사가 된 기분을 느끼게 해주는 팬던트.",
    itemDesc: "착용시 데미지 + 5, 마나 + 50, 회피율 + 15%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5;
      p1.jbmp += 50;
      p1.jbhwp += 15;
    },
  },
  wm6: {
    itemCode: "wm6",
    class: "magiccaster",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "마력이 깃든 토파즈 스태프",
    iteminfo: "마력을 증폭시키는 무서운 스태프.",
    itemDesc: "착용시 데미지 + 20%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdmg += 0.2;
    },
  },

  h11: {
    itemCode: "h11",
    class: "magiccaster",
    type: "hat",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "수정의 서클릿",
    iteminfo: "주문 시전에 아주 큰 도움을 주는 마도구",
    itemDesc: "착용시 마나, 스피드, 방어력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbmp += 100 + (this.itemLv * 5);
      p1.jbspd += 10 + (this.itemLv * 5);
      p1.jbdef += 20 + (this.itemLv * 5);
    },
  },
  a11: {
    itemCode: "a11",
    class: "magiccaster",
    type: "armor",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "수정의 로브",
    iteminfo: "마력의 순환을 도와주는 로브",
    itemDesc: "착용시 데미지, 방어력, 체력을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 20 + (this.itemLv * 5);
      p1.jbdef += 20;
      p1.jbhp += 300 + (this.itemLv * 50);
    },
  },
  s11: {
    itemCode: "s11",
    class: "magiccaster",
    type: "shoes",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "수정의 부츠",
    iteminfo: "지면의 영향을 최소한으로 받게 해주는 부츠",
    itemDesc: "착용시 방어력, 스피드를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 20;
      p1.jbspd += 20 + (this.itemLv * 10);
    },
  },
  g11: {
    itemCode: "g11",
    class: "magiccaster",
    type: "gloves",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "수정의 글로브",
    iteminfo: "심오한 주문이 묻어있어 공격을 쉽게 해준다",
    itemDesc: "착용시 데미지, 치명타 확률을 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbcri += 30 + (this.itemLv * 1);
      p1.jbdmg += 10 + (this.itemLv * 5)
    },
  },
  p11: {
    itemCode: "p11",
    class: "magiccaster",
    type: "pendant",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 20,
    char: "null",
    itemName: "수정의 팬던트",
    iteminfo: "수정에 뭐가 담겨있길레.. 이리 위화감이..",
    itemDesc: "착용시 모든 스탯을 올려준다. (강화 가능)",
    price: 750,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 5 + (this.itemLv * 5);
      p1.jbdmg += 5 + (this.itemLv * 5);
      p1.jbhp += 5 + (this.itemLv * 5);
      p1.jbmp += 5 + (this.itemLv * 5);
      p1.jbhwp += 5 + (this.itemLv * 5);
      p1.mpzen += 5
    },
  },
  wm11: {
    itemCode: "wm11",
    class: "magiccaster",
    type: "wepon",
    craft: false,
    reinforce: true,
    itemLv: 0,
    itemMaxLv: 10,
    char: "null",
    itemName: "적수정 스태프",
    iteminfo: "대충 마력을 보내도 일단 마법이 나가는 신비한 스태프",
    itemDesc: "착용시 데미지를 올려준다. (강화 가능)",
    price: 550,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 55 + (this.itemLv * 5);
    },
  },

  // 자아앙시이인구우우
  pp0: {
    itemCode: "pp0",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "분노의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 데미지 + 20%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdmg += 0.2;
    },
  },
  pp1: {
    itemCode: "pp1",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "순속의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 스피드 + 20%",
    price: 200,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xspd += 0.2;
    },
  },
  pp2: {
    itemCode: "pp2",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "강인함의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 체력,방어력 + 20%",
    price: 300,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xdef += 0.2;
      p1.xhp += 0.1;
    },
  },
  pp3: {
    itemCode: "pp3",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "냉정함의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 치명타 확률 + 25%",
    price: 400,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.cri += 25;
    },
  },
  pp4: {
    itemCode: "pp4",
    class: "all",
    type: "pendant",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "정령의 팬던트",
    iteminfo: "가벼운 마력 처리가 된 팬던트.",
    itemDesc: "착용시 마나 + 20%, 마나 증가량 + 10",
    price: 400,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xmp += 0.2;
      p1.mpzen += 10
    },
  },




  ww1: {
    itemCode: "ww1",
    class: "warrior",
    type: "wepon",
    craft: false,
    reinforce: false,
    itemName: "나무 검",
    iteminfo: "어째선지 눈 앞에 나타난 무기다.",
    itemDesc: "착용시 데미지 + 5",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5;
    },
  },
  wd1: {
    itemCode: "wd1",
    class: "defender",
    type: "wepon",
    craft: false,
    reinforce: false,
    itemName: "나무 방패",
    iteminfo: "어째선지 눈 앞에 나타난 무기(?)다.",
    itemDesc: "착용시 방어력 + 5",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 5;
    },
  },
  wm1: {
    itemCode: "wm1",
    class: "magiccaster",
    type: "wepon",
    craft: false,
    reinforce: false,
    itemName: "나무 스태프",
    iteminfo: "어째선지 눈 앞에 나타난 무기다.",
    itemDesc: "착용시 데미지 + 5, 마나 + 10",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 5;
      p1.jbmp += 10;
    },
  },
  wr1: {
    itemCode: "wr1",
    class: "rogue",
    type: "wepon",
    craft: false,
    reinforce: false,
    itemName: "나무 단도",
    iteminfo: "어째선지 눈 앞에 나타난 무기다.",
    itemDesc: "착용시 스피드 + 5",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbspd += 5;
    },
  },
  wa1: {
    itemCode: "wa1",
    class: "archer",
    type: "wepon",
    craft: false,
    reinforce: false,
    itemName: "나무 활",
    iteminfo: "어째선지 눈 앞에 나타난 무기다.",
    itemDesc: "착용시 데미지 + 7",
    price: 50,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 7;
    },
  },
  wt1: {
    itemCode: "wt1",
    class: "all",
    type: "wepon",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "공용 맨손",
    iteminfo: "주먹을 불끈 쥐었다.",
    itemDesc: "착용시 데미지 + 1",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdmg += 1;
    },
  },










  //가방 시리즈
  b1: {
    itemCode: "b1",
    class: "all",
    type: "bag",
    craft: false,
    reinforce: false,
    char: "bag1",
    itemName: "작은 주머니",
    iteminfo: "어째선지 들고있던 주머니다.",
    itemDesc: "가방 용량 + 10",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbbagsize += 10
    },
  },
  b2: {
    itemCode: "b2",
    class: "all",
    type: "bag",
    craft: false,
    reinforce: false,
    char: "bag2",
    itemName: "가방",
    iteminfo: "모험가들의 기본 사양.",
    itemDesc: "가방 용량 + 20",
    price: 500,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbbagsize += 20
    },
  },
  b3: {
    itemCode: "b3",
    class: "all",
    type: "bag",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "신비한 가방",
    iteminfo: "신비한 주문이 발린 가벼운 가방.",
    itemDesc: "가방 용량 + 40",
    price: 1000,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbbagsize += 40
    },
  },

  //개발자 아이템
  th1: {
    itemCode: "th1",
    class: "tenster",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 모자",
    iteminfo: "테스팅을 위한 모자입니다.",
    itemDesc: "착용시 방어력 + 2",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 2;
    },
  },
  ta1: {
    itemCode: "ta1",
    class: "tenster",
    type: "armor",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 갑옷",
    iteminfo: "테스팅을 위한 갑옷입니다.",
    itemDesc: "착용시 HP 2배",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.xhp += 2;
    },
  },
  ts1: {
    itemCode: "ts1",
    class: "tenster",
    type: "shoes",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 신발",
    iteminfo: "테스팅을 위한 모자입니다.",
    itemDesc: "착용시 방어력 + 2",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 2;
    },
  },
  tg1: {
    itemCode: "th1",
    class: "tenster",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 모자",
    iteminfo: "테스팅을 위한 모자입니다.",
    itemDesc: "착용시 방어력 + 2",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 2;
    },
  },
  tp1: {
    itemCode: "th1",
    class: "tenster",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 모자",
    iteminfo: "테스팅을 위한 모자입니다.",
    itemDesc: "착용시 방어력 + 2",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 2;
    },
  },
  tw1: {
    itemCode: "th1",
    class: "tenster",
    type: "hat",
    craft: false,
    reinforce: false,
    char: "null",
    itemName: "텐스터의 모자",
    iteminfo: "테스팅을 위한 모자입니다.",
    itemDesc: "착용시 방어력 + 2",
    price: 10,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbdef += 2;
    },
  },
  tb0: {
    itemCode: "tb0",
    class: "tenster",
    type: "bag",
    craft: false,
    reinforce: false,
    char: "bag1",
    itemName: "개발자의 사차원 주머니",
    iteminfo: "둥글고 파란 로봇이 생각나는 아이템이다.",
    itemDesc: "가방 용량 + 1000",
    price: 0,
    hav: 0,

    active() {
      anitext("사용 할 수 없다...", 0.1, "c", 0.5);
    },

    cal() {
      p1.jbbagsize += 1000
    },
  },

};

module.exports = {
  items
}