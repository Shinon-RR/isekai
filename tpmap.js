const { sleep, aniprt, br, cl, anitext, anigiv, checkstat } = require("./func");
const { p1, Gdata } = require("./users-data");

const scr = {
    tp0: {
        itemCode: "tp0",
        type: "potion",
        craft: false,
        char: "null",
        itemName: "프로토 귀환 주문서",
        iteminfo: "테스팅.",
        itemDesc: "프로토로 귀환한다.(전투중 사용 불가능)",
        price: 300,
        hav: 0,
        active() {
            if (Gdata.ft === 1) {
                anitext("지금은 사용 할 수 없다...", 0.1, "c", 0.5);
            } else {
                anigiv(this, -1, 0)
                Gdata.nextVil = vil
            }
            p1.zmp += 200;
            if (p1.zmp > p1.fmp) {
                p1.zmp = p1.fmp;
            }
            anitext(p1.name + "용사는 200의 MP를 회복했다!", 0.1, "c", 0.5);
        },
    },

}
module.exports = {
    scr
  }