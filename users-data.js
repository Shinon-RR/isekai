const p1 = {
  name: "aris",

  gold: 0,

  class: "warrior",

  //["내 버프 표시", "내 스탯 표시", "적 스탯 표시"];
  mode: [0, 0, 0],

  //장비를 장착하면 오르는 + 스탯 - jb = 장비
  jbhp: 0,
  jbmp: 0,
  jbdmg: 0,
  jbdef: 0,
  jbspd: 0,
  jbhwp: 0,
  jbcri: 0,
  jbbagsize: 0,

  //장비를 장착하면 오르는 * 스탯 - x = 곱하기
  xhp: 1,
  xmp: 1,
  xdmg: 1,
  xdef: 1,
  xspd: 1,
  xcri: 0,

  //최종 스탯 - f = final
  fhp: 0,
  fmp: 0,
  fdmg: 0,
  fdef: 0,
  fspd: 0,
  fhwp: 0,
  fcri: 0,

  //플레이어 기본 스탯
  hp: 150,
  mp: 100,
  dmg: 20,
  def: 5,
  spd: 6,
  hwp: 1,
  cri: 0,
  bsize: 5,

  //턴 시작시 HP, MP 회복
  xhpzen: 1,
  xmpzen: 1,
  hpzen: 2,
  mpzen: 5,

  //기본은 1레벨
  lv: 1,
  exp: 0,
  maxsch: 0,

  //전투중 사용하는 스탯
  zhp: 0,
  zmp: 0,
  zdmg: 0,
  zdef: 0,
  zspd: 0,

  zsj: 0,
  zshi: 0,
  zbuff: [],

  //착용중인 장비
  hat: [],
  armor: [],
  shoes: [],
  gloves: [],
  pendant: [],
  wepon: [],

  bag: [],

  inven: [],
  bagsize: 0,

  maxsk: 9,
  skill: [],
  passi: [],

  //퀘스트
  nowQuest: [],
  clearQuest: [],
};
const Gdata = {
  lastSave: "",
  goout: false,
  nowtalk: "",
  ft: 0,  
  ininv: false,
  finv: false,
  monster:{},
  FMdata:{
    maxhp: 0,

    xmdmg: 0,
    xmdef: 0,
    xmspd: 0,

    fmdmg: 0,
    fmdef: 0,
    fmspd: 0,

    chwp: 0,

    KillMonster: "",
    caldmg: 0,
    mcal: 0,
    dead: false,
    cok: 1,
  },
  nextVil: null,
  invloci: 0,
}



module.exports = {
  p1,
  Gdata
}