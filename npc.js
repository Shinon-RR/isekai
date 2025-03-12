const { default: chalk } = require("chalk");
const { items } = require("./items");
// const { items } = require("./items2");
const { sleep, aniprt, br, cl, anitext, anigiv, rand, checkQ, leadingZeros, SetUi, wrtxt } = require("./func");
const { p1, Gdata } = require("./users-data");
const readlineSync = require("readline-sync");
const { quest } = require("./quest");
const fs = require('fs');
// const { Gdata } = require("./G-data");

const npc = {
    shopkeeper: {
        potter: {
            name: "포터",
            char: "potter",
            shopname: "포터의 잡화상점",
            havQ: true,
            Qlist: [quest.main_2],
            list: [items.i0, items.i1, items.i3, items.t0, items.b2, items.b3],
            a: function () { },
            hello() {
                anitext('"아.. 안녕하세요!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나요..!"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"물건을 판매 하시나요?"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"물건 상태가 좋아보여요!"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"어떤 물건이 필요하신가요?"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"감사합니다!"', 0.1, "y", 2);
            },

            istalk() {
                let trand = Math.floor(Math.random() * 100) + 1;
                if (trand < 25) {
                    anitext('"저는 어릴 적 꿈이 용사였어요.."', 0.1, "y", 2);
                    br();
                    anitext('"지금은 이렇게 상점을 운영하고 있지만요.  ', 0.1, "y", 1);
                    anitext('하하하.."', 0.3, "y", 1);
                } else if (trand < 50) {
                    anitext('"웨이든 지역은 과일이 유명해요!"', 0.1, "y", 1);
                    br();
                    anitext('"언젠가 또 놀러가고 싶네요"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"이 상점에는 슬픈 전설이 있어요... "', 0.1, "y", 1);
                    br();
                    anitext('"하지만 ', 0.1, "y", 0.5);
                    anitext('전 전설같은건 믿지 않는답니다."', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"사실 이 가게에는 손님이 적어요"', 0.1, "y", 1);
                    br();
                    anitext('"하하하..."', 0.3, "y", 2);
                } else if (trand < 101) {
                    anitext('"세피로트가 위험해진다는 소문이 들리는데..."', 0.1, "y", 1);
                    br();
                    anitext('"보나마나 장난꾸러기 꼬마가 퍼뜨린 소문이겠죠"', 0.1, "y", 2);
                }
            },
        },
        bichon: {
            name: "비숑",
            char: "bichon",
            shopname: "비숑의 장비상점",
            havQ: false,
            Qlist: [],
            // list: [items.h4, items.a4, items.s4, items.g4, items.p4, items.wa4],
            list: [items.hk0, items.ak0, items.sk0, items.gk0, items.pk0],
            a: function () {
            },
            hello() {
                anitext('"어서오세요!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"안녕히 가세요!"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"전리품 판매라면 저에게!"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"물건 상태가 좋군요!"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"장비가 필요하시군요!"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"매번 감사합니다!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = Math.floor(Math.random() * 100) + 1;
                if (trand < 25) {
                    anitext('"이름이 왜 비숑이냐구요?"', 0.1, "y", 2);
                    br();
                    anitext('"딱 보면 비숑 아닙니까?!  ', 0.1, "y", 1);
                    anitext('하하하!"', 0.3, "y", 1);
                } else if (trand < 50) {
                    anitext('"에덴에선 내가 제일이지!"', 0.1, "y", 1);
                    br();
                    anitext('"최고의 물건만 판매하니 말이야!"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"장비는 전부 직접 만드냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"물론 이 비숑이 직접 만든 장비입니다!"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"이번 연회엔 조금 쉬어야겠어요"', 0.1, "y", 1);
                    br();
                    anitext('"가족들과 축제를 즐겨야 하거든요!"', 0.1, "y", 2);
                } else if (trand < 101) {
                    anitext('"세피로트가 위험해진다구요?"', 0.1, "y", 1);
                    br();
                    anitext('"하하하! 농담도 잘 하시는군요"', 0.1, "y", 2);
                }
            },
        },
        amr: {
            name: "에미르",
            char: "amr",
            shopname: "에미르의 장비상점",
            havQ: false,
            Qlist: [],
            // list: [items.h4, items.a4, items.s4, items.g4, items.p4, items.wa4],
            list: [],
            a: function () {
                this.list = []
                if (p1.class === "archer") {
                    this.list.push(items.h4, items.a4, items.s4, items.g4, items.p4, items.wa4)
                } else if (p1.class === "warrior") {
                    this.list.push(items.h3, items.a3, items.s3, items.g3, items.p3, items.ww3)
                } else if (p1.class === "defender") {
                    this.list.push(items.h2, items.a2, items.s2, items.g2, items.p2, items.wd2)
                } else if (p1.class === "magiccaster") {
                    this.list.push(items.h6, items.a6, items.s6, items.g6, items.p6, items.wm6)
                } else if (p1.class === "rogue") {
                    this.list.push(items.h5, items.a5, items.s5, items.g5, items.p5, items.wr5)
                }
            },
            hello() {
                anitext('"어서오세요!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"안녕히 가세요!"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"판매는 이쪽에서"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"물건 받았습니다~"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"필요하신 장비를 찾아보세요!"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"감사합니다~"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"많은 사람들이 저희 가게를 이용하세요"', 0.1, "y", 2);
                    br();
                    anitext('"그만큼 품질과 기능이 뛰어나다는 의미겠죠!"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"어떤 스타일의 전투를 선호하시나요?"', 0.1, "y", 1);
                    br();
                    anitext('"근접 전투?', 0.1, "y", 0.5);
                    anitext(' 원거리 공격?"', 0.1, "y", 0.5);
                    br();
                    anitext('"아니면 마법 사용에 적합한 장비를 원하시나요?"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"장비를 만들때는 항상 진심입니다."', 0.1, "y", 1);
                    br();
                    anitext('"어느 하나 허투루 만들지 않습니다."', 0.1, "y", 1);
                    br()
                    anitext('"저의 장비로 생명이 좌우되기도 하니까요."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"요즘들어 재료 구하기가 힘드네요.."', 0.1, "y", 1);
                    br();
                    anitext('"무슨 문제라도 생긴걸까요..?"', 0.1, "y", 2);
                } else {
                    anitext('"미라빌리스에서 들여오던 물건이 더 이상 오지 않고 있어요"', 0.1, "y", 1);
                    br();
                    anitext('"벨리알 통행을 금지했다고 하나봐요.."', 0.1, "y", 1);
                    br();
                    anitext('"이거 참.. 곤란하네요"', 0.1, "y", 2);
                }
            },
        },
        spike: {
            name: "스파이크",
            char: "spike",
            shopname: "스파이크의 스크롤상점",
            havQ: true,
            Qlist: [quest.spike_1, quest.main_3],
            list: [],
            // a: function () {
            //     if (p1.class === "warrior") {
            //         this.list.push(items.scw1, items.scw2, items.scw3, items.scw4)
            //     }
            //     if (p1.class === "defender") {
            //         this.list.push(items.scd1, items.scd2, items.scd3, items.scd4)
            //     }
            //     if (p1.class === "magiccaster") {
            //         this.list.push(items.scm1, items.scm2, items.scm3, items.scm4)
            //     }
            //     if (p1.class === "rogue") {
            //         this.list.push(items.scr1, items.scr2, items.scr3, items.scr4)
            //     }
            //     if (p1.class === "archer") {
            //         this.list.push(items.sca1, items.sca2, items.sca3, items.sca4)
            //     }
            // },
            a: function () {
                this.list = []
                if (p1.class === "warrior") {
                    this.list.push(items.scw2, items.scw3, items.scw4)
                }
                if (p1.class === "defender") {
                    this.list.push(items.scd2, items.scd3, items.scd4)
                }
                if (p1.class === "magiccaster") {
                    this.list.push(items.scm2, items.scm3, items.scm4)
                }
                if (p1.class === "rogue") {
                    this.list.push(items.scr2, items.scr3, items.scr4)
                }
                if (p1.class === "archer") {
                    this.list.push(items.sca2, items.sca3, items.sca4)
                }
            },
            hello() {
                anitext('"어서오쇼"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘 가쇼"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"물건을 팔아볼텐가?"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"흥미롭군.."', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"스크롤이 필요하군"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"잘 사용하시게"', 0.1, "y", 2);
            },

            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"스크롤은 어디서 구해오냐고?"', 0.1, "y", 1);
                    br();
                    anitext('"내가 직접 작성해서 팔고있네만.."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"스크롤은 아무나 작성 할 수 있는 물건이 아닐세"', 0.1, "y", 1);
                    br();
                    anitext('"아주 정교하고 고된 작업이니 말이야"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"이 몸도 소싯적엔 말일세.."', 0.1, "y", 1);
                    br();
                    anitext('"자네처럼 모험을 다녔다네"', 0.1, "y", 1);
                    br()
                    anitext('"...나도 늙었구만 그레"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"스크롤은 스킬을 부여하는 물건이지"', 0.1, "y", 1);
                    br();
                    anitext('"스킬을 더욱 강화하고 싶다고?"', 0.1, "y", 1);
                    br();
                    anitext('"그거라면 델리로 가보게나"', 0.1, "y", 2);
                } else {
                    anitext('"카발라 조약이 맺어진 뒤로 세피로트는 안전해졌다네"', 0.1, "y", 1);
                    br();
                    anitext('"이 이야기도 이젠 옛날 이야기지만.."', 0.1, "y", 2);
                }
            },
        },
        pria: {
            name: "프리아",
            char: "pria",
            shopname: "프리아의 가게",
            havQ: false,
            Qlist: [],
            list: [items.i3, items.i6, items.i7, items.i8],
            a: function () { },
            hello() {
                anitext('"어서오세요~!"', 0.08, "y", 2);
            },
            bye() {
                anitext('"조심히 들어가세요~"', 0.08, "y", 2);
            },
            sell_talk() {
                anitext('"판매는 이쪽으로~"', 0.08, "y", 2);
            },
            sell_suc() {
                anitext('"상태가 좋군요!"', 0.08, "y", 2);
            },
            buy_talk() {
                anitext('"싱싱한 수확물이 가득~!"', 0.08, "y", 2);
            },
            buy_suc() {
                anitext('"감사합니다!"', 0.08, "y", 2);
            },

            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"세피로트에서 가장 싱싱한 수확물은 모두 웨이든에서 자라나죠"', 0.08, "y", 2);
                    br();
                    anitext('"싱싱한 수확물을 빠르게 구할 수 있다니"', 0.08, "y", 1);
                    br();
                    anitext('"어머 이건 사야해~"', 0.08, "y", 2);
                } else if (trand <= 50) {
                    anitext('"근처 들판에서 사과가 굴러다니는 모양이에요"', 0.08, "y", 1);
                    br();
                    anitext('"들판에 사과라.. 참 신기한 일이죠"', 0.08, "y", 2);
                } else if (trand <= 75) {
                    anitext('"웨이든 주변은 풍경이 또 죽여줍니다~"', 0.08, "y", 1);
                    br();
                    anitext('"하루 일과가 끝나고 마시는 술은 또', 0.08, "y", 0.5);
                    anitext('..."', 0.5, "y", 2);
                    br();
                    anitext('"크흠.."', 0.08, "y", 2);
                } else if (trand <= 98) {
                    anitext('"웨이든 단구는 야경이 아름답죠"', 0.08, "y", 1);
                    br();
                    anitext('"하지만 위험하니 가급적 가지 마세요"', 0.08, "y", 2);
                } else {
                    anitext('"원래는 리튼에서 벨리알로 통행이 가능했는데"', 0.08, "y", 1);
                    br();
                    anitext('"벨리알에 무슨 일이 생겼는지"', 0.08, "y", 1);
                    br();
                    anitext('"지금은 통행이 막혀버렸지 뭐에요"', 0.08, "y", 1);
                    br();
                    anitext('"덕분에 다른 물건 수입이 어려워졌어요"', 0.08, "y", 2);
                }
            },
        },
        ellesion: {
            name: "엘르시온",
            char: "ellesion",
            shopname: "엘르시온의 팬던트상점",
            havQ: false,
            Qlist: [],
            list: [items.pp0, items.pp1, items.pp2, items.pp3, items.pp4],
            a: function () { },
            hello() {
                anitext('"내 상점에 어서와!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"그대의 모험에 행운이 가득하기를"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"물건을 판매하려고?"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"물건 상태가 좋네!"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"모험에 필요한 팬던트를 골라봐!"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"탁월한 선택이야!"', 0.1, "y", 2);
            },

            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"마력이란 참 신비해"', 0.1, "y", 2);
                    br();
                    anitext('"이렇게 사람들에게 도움이 될 수 있잖아!"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"팬던트는 깃든 마력도 중요하지만"', 0.1, "y", 1);
                    br();
                    anitext('"보기 이뻐야 한다고 생각해."', 0.1, "y", 1);
                    br();
                    anitext('"그야 팬던트는 장신구니까!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"팬던트는 만들기 힘들지만"', 0.1, "y", 1);
                    br();
                    anitext('"재료를 구하기가 더 어려워"', 0.1, "y", 1);
                    br();
                    anitext('"내 실력이 그만큼 뛰어나다는 의미야!"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"작업을 하면서 사람들에게 도움이 된다는게 기뻐"', 0.1, "y", 1);
                    br();
                    anitext('"분명.. 도움이 될 거야..!"', 0.1, "y", 2);
                } else {
                    anitext('"요즈음 재료 수입이 어려워졌어"', 0.1, "y", 1);
                    br();
                    anitext('"그 사람 말로는 악마가 나타나서.. 라던데"', 0.1, "y", 2);
                    br();
                    anitext('"장난이겠지..?"', 0.15, "y", 2);
                }
            },
        },
        wiz: {
            name: "위즈 헤인",
            char: "wiz",
            shopname: "포션샵 위즈",
            havQ: false,
            Qlist: [],
            list: [items.i0, items.i1, items.i2, items.i10, items.i11, items.i4, items.i5],
            a: function () { },
            hello() {
                anitext('"어서오세요"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 다시 만날 수 있기를"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"물건 판매라.."', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"흥미로운 물건이네요"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"어떤 포션이 필요하세요?"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"감사합니다"', 0.1, "y", 2);
            },

            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"여관에서 수면을 취하면 피로가 싹 풀리긴 하죠"', 0.1, "y", 2);
                    br();
                    anitext('"하지만 몬스터와 전투중엔 여관을 이용 할 수 없잖아요?"', 0.1, "y", 1);
                    br();
                    anitext('"그러니 표션은 항상 여유롭게 챙기고 다니세요"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"포션을 만드는 방법이요?"', 0.1, "y", 1);
                    br();
                    anitext('"흠..."', 0.15, "y", 1);
                    br();
                    anitext('"알려드려도 만들진 못할거에요"', 0.1, "y", 1);
                    br();
                    anitext('"게다가 저처럼 대량으로 만드는게 아니라면 효율도 안 나오구요"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"저의 이름이요?"', 0.1, "y", 1);
                    br();
                    anitext('"저의 이름은「위즈 헤인」', 0.1, "y", 0.5);
                    anitext('그냥 헤인으로 불러주세요!"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"저는 제가 하는 일을 사랑해요"', 0.1, "y", 1);
                    br();
                    anitext('"포션의 세계는 아주 심오하고 재미있거든요"', 0.1, "y", 2);
                } else {
                    anitext('"세피로트가 위험해요?"', 0.1, "y", 1);
                    br();
                    anitext('"처음 듣는 이야기네요?"', 0.1, "y", 2);
                    br();
                    anitext('"저는 밖에 자주 안 나가거든요"', 0.1, "y", 1);
                    br();
                    anitext('"...', 0.2, "y", 1);
                    anitext('그럼 용사님이 세피로트를 평화롭게 만들어 주시면 되겠네요!"', 0.1, "y", 2);
                }
            },
        },
        dmr: {
            name: "알렌",
            char: "dmr",
            shopname: "알렌의 장비상점",
            havQ: false,
            Qlist: [],
            // list: [items.h4, items.a4, items.s4, items.g4, items.p4, items.wa4],
            list: [],
            a: function () {
                this.list = []
                if (p1.class === "archer") {
                    this.list.push(items.h7, items.a7, items.s7, items.g7, items.p7, items.wa7)
                } else if (p1.class === "warrior") {
                    this.list.push(items.h8, items.a8, items.s8, items.g8, items.p8, items.ww8)
                } else if (p1.class === "defender") {
                    this.list.push(items.h9, items.a9, items.s9, items.g9, items.p9, items.wd9)
                } else if (p1.class === "rogue") {
                    this.list.push(items.h10, items.a10, items.s10, items.g10, items.p10, items.wr10)
                } else if (p1.class === "magiccaster") {
                    this.list.push(items.h11, items.a11, items.s11, items.g11, items.p11, items.wm11)
                }
            },
            hello() {
                anitext('"어서와!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘가!"', 0.1, "y", 2);
            },
            sell_talk() {
                anitext('"판매는 환영이야~"', 0.1, "y", 2);
            },
            sell_suc() {
                anitext('"오호"', 0.1, "y", 2);
            },
            buy_talk() {
                anitext('"필요한 장비를 골라봐!"', 0.1, "y", 2);
            },
            buy_suc() {
                anitext('"안목이 뛰어나네"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"난 오히려 마을이 조용해서 좋아!"', 0.1, "y", 2);
                    br();
                    anitext('"장비 제작에 집중을 할 수 있거든!"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"에덴에서 파는 장비 중에선 내 장비가 하이엔드야!"', 0.1, "y", 1);
                    br();
                    anitext('"장비의 품질이 ', 0.1, "y", 1);
                    anitext('아주', 0.3, "y", 0.3);
                    anitext(' 뛰어나거든"', 0.1, "y", 1);
                    br();
                    anitext('"내가 좀 대단하잖아?"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"나에겐 델리가 최고의 장소긴 하지"', 0.1, "y", 1);
                    br();
                    anitext('"재료 조달이 귀찮아지긴 하지만"', 0.1, "y", 1);
                    br()
                    anitext('"나만의 루트가 다 있지~"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"제작에 집중을 하다보면 잡 생각이 줄어"', 0.1, "y", 1);
                    br();
                    anitext('"너도 나처럼 「취미」를 가져봐"', 0.1, "y", 2);
                } else {
                    anitext('"가끔은 드라칼을 멸종시켜버리고 싶어."', 0.1, "y", 1);
                    br();
                    anitext('"하지만 드라칼이 있기에 델리가 조용해서 막상 멸종시키긴 아까워"', 0.1, "y", 2);
                    br();
                    anitext('"그럴 힘이 있기나 하냐고?"', 0.1, "y", 1);
                    br();
                    anitext('"내가 재료를 어떻게 수급한다고 생각하는거야?"', 0.1, "y", 2);
                }
            },
        },
        jms: {
            name: "리벨",
            char: "jms",
            shopname: "리벨의 주문서 상점",
            havQ: false,
            Qlist: [],
            // list: [items.h4, items.a4, items.s4, items.g4, items.p4, items.wa4],
            list: [items.tp0, items.tp1, items.tp2],
            a: function () {
            },
            hello() {
                anitext('"어서오세요.."', 0.16, "y", 2);
            },
            bye() {
                anitext('"안녕히 가세요.."', 0.16, "y", 2);
            },
            sell_talk() {
                anitext('"물건 판매 말씀인가요"', 0.16, "y", 2);
            },
            sell_suc() {
                anitext('"흐음.."', 0.16, "y", 2);
            },
            buy_talk() {
                anitext('"필요하신 물건을 찾아보세요"', 0.16, "y", 2);
            },
            buy_suc() {
                anitext('"이 친구도 좋죠."', 0.16, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"마법은 언제나 대가가 따르죠."', 0.16, "y", 2);
                    br();
                    anitext('"밤새 주문서를 연구하다 보니.."', 0.16, "y", 2);
                } else if (trand <= 50) {
                    anitext('"이렇게 마법의 힘으로 주문서를 팔고 있지만"', 0.16, "y", 1);
                    br();
                    anitext('"진정한 마법은 값으로 매길 수 없다고 생각해요."', 0.16, "y", 2);
                } else if (trand <= 75) {
                    anitext('"취미가 뭐냐구요?"', 0.16, "y", 1);
                    br();
                    anitext('"취미라고 부를만한 건 없지만.."', 0.16, "y", 1);
                    br()
                    anitext('"가끔 머리가 아프면 밤하늘의 별을 관찰해요"', 0.16, "y", 2);
                } else if (trand <= 98) {
                    anitext('"주문서를 만들기 위한 재료는 여럿 있지만"', 0.16, "y", 1);
                    br();
                    anitext('"가장 중요한 것은 의지와 마음이죠"', 0.16, "y", 2);
                } else {
                    anitext('"가끔은 드라칼을 멸종시켜버리고 싶어."', 0.16, "y", 1);
                    br();
                    anitext('"하지만 드라칼이 있기에 델리가 조용해서 막상 멸종시키긴 아까워"', 0.16, "y", 2);
                    br();
                    anitext('"그럴 힘이 있기나 하냐고?"', 0.16, "y", 1);
                    br();
                    anitext('"내가 재료를 어떻게 수급한다고 생각하는거야?"', 0.16, "y", 2);
                }
            },
        },
    },
    villager: {
        rumia: {
            name: "루미아",
            char: "rumia",
            havQ: true,
            Qlist: [quest.q1, quest.q2, quest.q3],
            // , quest.q2
            hello() {
                anitext('"부르셨나요?"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나요!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = Math.floor(Math.random() * 100) + 1;
                if (trand < 25) {
                    anitext('"프로토 마을이 처음이라구요?"', 0.1, "y", 2);
                    br();
                    anitext('"확실히 처음보는 얼굴이네요.."', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"다음 행선지를 추천해달라구요?"', 0.1, "y", 1);
                    br();
                    anitext('"흠...', 0.1, "y", 2);
                    anitext('바로 근처에 있는 키보토스는 어떠세요?"', 0.1, "y", 2);
                    br();
                    anitext('"분명 좋은 여행이 될 거에요!"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"마을에 있는 플루토는 이용해 보셨나요?"', 0.1, "y", 1);
                    br();
                    anitext('"그곳에선 여러가지 책을 열람 할 수 있어요!"', 0.1, "y", 1);
                    br();
                    anitext('"아직이라면 한 번 가보는게 어때요?"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"조금 떨어진 동굴에서 이상한 소문이 돌아요"', 0.1, "y", 1);
                    br();
                    anitext('"만약에 갈 예정이시면 꼭 조심하세요!"', 0.1, "y", 2);
                } else if (trand < 101) {
                    anitext('"세피로트가 위험해진다구요..?"', 0.1, "y", 1);
                    br();
                    anitext('"..."', 0.3, "y", 1);
                    br();
                    anitext('"농담도 잘 하시네요ㅎㅎ"', 0.1, "y", 2);
                }
            },
        },
        dummy: {
            name: "더미",
            char: "dummy",
            havQ: true,
            Qlist: [quest.d1, quest.d2],
            hello() {
                anitext('"...!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"...~"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(11)
                if (trand <= 5) {
                    anitext('"...!"', 0.1, "y", 1);
                } else if (trand <= 10) {
                    anitext('"..."', 0.1, "y", 1);
                } else if (trand <= 11) {
                    anitext('(콜록)', 0.1, "y", 1);

                }
            },
        },
        bommy: {
            name: "보미",
            char: "bommy",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"..!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"..~"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(11)
                if (trand <= 5) {
                    anitext('"..!"', 0.1, "y", 1);
                } else if (trand <= 10) {
                    anitext('".."', 0.1, "y", 1);
                } else if (trand <= 11) {
                    anitext('(콜록)', 0.1, "y", 1);

                }
            },
        },
        husu: {
            name: "허수아비",
            char: "null",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"인사"', 0.1, "y", 2);
            },
            bye() {
                anitext('"굿바이"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"1-1"', 0.1, "y", 1);
                    br();
                    anitext('"1-2"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"2-1"', 0.1, "y", 1);
                    br();
                    anitext('"2-2"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"3-1"', 0.1, "y", 1);
                    br();
                    anitext('"3-2"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"4-1"', 0.1, "y", 1);
                    br();
                    anitext('"4-2"', 0.1, "y", 2);
                } else {
                    anitext('"5-1"', 0.1, "y", 1);
                    br();
                    anitext('"5-2"', 0.1, "y", 2);
                }
            },
        },
        cardinals: {
            name: "카디널스",
            char: "cardinals",
            hello() {
                anitext('"안녕"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘가"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"1-1"', 0.1, "y", 1);
                    br();
                    anitext('"1-2"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"2-1"', 0.1, "y", 1);
                    br();
                    anitext('"2-2"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"3-1"', 0.1, "y", 1);
                    br();
                    anitext('"3-2"', 0.1, "y", 2);

                } else if (trand < 98) {
                    anitext('"4-1"', 0.1, "y", 1);
                    br();
                    anitext('"4-2"', 0.1, "y", 2);
                } else {
                    anitext('"5-1"', 0.1, "y", 1);
                    br();
                    anitext('"5-2"', 0.1, "y", 2);
                }
            },
        },
        seia: {
            name: "세이아",
            havQ: true,
            char: "seia",
            Qlist: [quest.q4, quest.main_0,quest.main_1],
            hello() {
                anitext('"..?"', 0.2, "y", 2);
                br()
                anitext('"저를 부르신 건가요.."', 0.2, "y", 2);
            },
            bye() {
                anitext('"더 볼일이 없으시다면 이만.."', 0.2, "y", 2);
            },
            istalk() {
                let trand = Math.floor(Math.random() * 100) + 1;
                if (trand < 25) {
                    anitext('"아..?"', 0.2, "y", 2);
                    br();
                    anitext('"마을에 방문하신 모험가님이신가요.."', 0.2, "y", 1);
                    br();
                    anitext('"으음.. ', 0.4, "y", 0.4);
                    anitext(' 프로토에 오신 걸 환영해요."', 0.2, "y", 1);
                    br();
                    anitext('"늑대 빼고 볼거리가 없는 마을이긴 하지만요."', 0.2, "y", 2);
                } else if (trand < 50) {
                    anitext('"이 마을은 정말로 평화롭답니다.."', 0.2, "y", 1);
                    br();
                    anitext('"다른 지역으로 이동하실 예정이라면 이곳에서 충분히 휴식하시길 바래요."', 0.2, "y", 2);
                } else if (trand < 75) {
                    anitext('"안녕하세요 모험가님.."', 0.2, "y", 1);
                    br();
                    anitext('"지금 마시고 있는게 무엇이냐고요?"', 0.2, "y", 2);
                    br();
                    anitext('"베슬 지역의 찻잎으로 우린 차랍니다.. ', 0.2, "y", 1);
                    anitext('찻잎이 인상깊죠."', 0.2, "y", 1);
                } else if (trand < 98) {
                    anitext('"앗.."', 0.2, "y", 1);
                    br();
                    anitext('"모험가님이시군요.."', 0.2, "y", 2);
                    br();
                    anitext('"늑대들이 주변에 많을텐데 무사히 오시다니 운이 좋으시군요.."', 0.2, "y", 2);
                    br();
                    anitext('"네..?"', 0.3, "y", 1);
                    br();
                    anitext('"늑대를 잡으셨다고요..?"', 0.2, "y", 1);
                    br();
                    anitext('"다치지 않았다니, 천만다행이네요.."', 0.2, "y", 1);
                    br();
                    anitext('"혹여라도 마을을 떠나실땐 황금늑대를 조심하세요.."', 0.2, "y", 2);
                } else if (trand < 100) {
                    anitext('"제 성이 「유리조노」냐고요..?"', 0.2, "y", 1);
                    br();
                    anitext('"제 성은 「유리조노」가 아니에요.."', 0.2, "y", 2);
                    br();
                    anitext('"요즘 유행하는 농담을 제가 이해하지 못하는 걸까요.."', 0.2, "y", 2);
                } else if (trand < 101) {
                    anitext('"【 먹구름 】"', 0.1, "y", 2);
                    br();
                    anitext('"【 먹구름 】이, 그 누구도 감당하지 못할 【 먹구름 】이,', 0.2, "y", 1);
                    anitext(' 다시는 걷혀지지 않을 【 먹구름 】이 몰려오고 있습니다."', 0.2, "y", 1);
                    br();
                    anitext('"아직 끝난 것이 아니니까요."', 0.2, "y", 1);
                    br();
                    anitext('"그 누구보다 당신이 잘 알고 계시듯."', 0.2, "y", 2);
                }
            },
        },
        anthony: {
            name: "앤서니",
            char: "anthony",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"만나서 반가워요!"', 0.05, "y", 2);
            },
            bye() {
                anitext('"다음에 또 볼 수 있기를!"', 0.05, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand < 25) {
                    anitext('"모험가님이시군요!"', 0.05, "y", 1);
                    br();
                    anitext('"혹시..."', 0.05, "y", 0.2);
                    br();
                    anitext('"여행하시면서 본 특이한 동물들은 없었나요?"', 0.05, "y", 2);
                    br();
                    anitext('"어.. 그건 왜 묻냐고요?"', 0.05, "y", 1);
                    br();
                    anitext('"제 책에 적으려고요,', 0.05, "y", 1);
                    anitext(' 최근 따라 이상한 동물들이 많이 생겼던데 모와서 도감을 펴낼까 해요!"', 0.05, "y", 2);

                } else if (trand < 50) {
                    anitext('"모험가님!"', 0.05, "y", 1);
                    br();
                    anitext('"이번에 제가 새로운 동물을 발견했어요!"', 0.05, "y", 2);
                    br();
                    anitext('"그냥 다른 아이들보다 작은 토끼라고요..?"', 0.05, "y", 1);
                    br();
                    anitext('"쳇.. 새로운 종이 아니였다니.."', 0.05, "y", 2);
                } else if (trand < 75) {
                    anitext('"흠..."', 0.05, "y", 1);
                    br();
                    anitext('"저번에 모험가님이 말해주신 울베스 숲의 늑대들에 대해 연구중이에요."', 0.05, "y", 2);
                    br();
                    anitext('"대체 무슨 원리로 소수의 늑대들이 황금색으로 빛나는 걸까요?"', 0.05, "y", 1);
                    br();
                    anitext('"생존에 유리하지도 않을 텐데..."', 0.05, "y", 2);
                } else if (trand < 98) {
                    anitext('"그러니깐 동물이 이런식으로 행동하는 경우 원인은..."', 0.05, "y", 3);
                    br();
                    anitext('"졸고 계신거 아니죠?"', 0.05, "y", 2);
                    br();
                    anitext('"이제부터 흥미로운 내용이 나온다구요!"', 0.05, "y", 2);
                } else if (trand < 101) {
                    anitext('"이건..."', 0.1, "y", 1);
                    br();
                    anitext('"이상해요..."', 0.1, "y", 1);
                    br();
                    anitext('"동물이 이렇게까지 변했다는 이야기는 듣도보도 못했는데..."', 0.05, "y", 2);
                    br();
                    anitext('"무슨 일이냐고요?"', 0.05, "y", 1);
                    br();
                    anitext('"..."', 0.3, "y", 2);
                    br();
                    anitext('"아무것도 아니에요!"', 0.05, "y", 2);
                }
            },
        },
        friedrich: {
            name: "프리드리히",
            char: "friedrich",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘가!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand <= 25) {
                    anitext('"앗.. 날 부른거야?"', 0.1, "y", 2);
                    br();
                    anitext('"음.."', 0.1, "y", 1);
                    br();
                    anitext('"할말이 없네.."', 0.1, "y", 1);
                    br();
                    anitext('"다음에 다시 찾아와 그때는 말할게 있을거야!"', 0.1, "y", 2);
                    br();
                    anitext('"아마도.."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"집 뒤 텃밭에 감자를 심었어!"', 0.1, "y", 1);
                    br();
                    anitext('"근데 몇개 빼고는 싹을 틔우지 못했어.."', 0.1, "y", 1);
                    br();
                    anitext('"뭐가 문제일까.."', 0.1, "y", 2);
                    br();
                    anitext('"잘 자라라고 맥주도 주고 정성껏 돌봐줬는데.."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"감자를 길게 자르고 기름에 튀기는거야!"', 0.1, "y", 1);
                    br();
                    anitext('"그리고 소금을 뿌리는거지.."', 0.1, "y", 1);
                    br();
                    anitext('"마치 감자튀김처럼!"', 0.1, "y", 2);
                    br();
                    anitext('"아.."', 0.1, "y", 1);
                    br();
                    anitext('"그러게 그러면 그냥 감자튀김이잖아.."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"텃밭의 감자가 몇개 자랐어!"', 0.1, "y", 1);
                    br();
                    anitext('"하나씩 이름을 붙여주고 있는데 너도 하나 붙여볼래..?"', 0.1, "y", 2);
                    br();
                    anitext('"..."', 0.1, "y", 3);
                    br();
                    SetUi("yb", "프리드리히", "gb", "friedrich")
                    anitext('"감자도스..?', 0.1, "y", 1);
                    anitext('윌슨?"', 0.1, "y", 2);
                    br();
                    anitext('"무슨 의미의 이름인거야..?"', 0.1, "y", 1);
                    br();
                    anitext('"음.."', 0.1, "y", 2);
                    br();
                    anitext('"감자도스로 하자!"', 0.1, "y", 2);
                } else {
                    anitext('"하이마운트 너머엔 이상한 기운이 돌고있어"', 0.1, "y", 1);
                    br();
                    anitext('"온갓 마물들이 강해져서.."', 0.1, "y", 2);
                    br();
                    anitext('"어쨌든 하이마운트쪽은 가지마.."', 0.1, "y", 2);
                }
            },
        },
        rbt: {
            name: "섀이드",
            char: "rbt",
            havQ: false,
            Qlist: [quest.qt1],
            hello() {
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand <= 25) {
                    anitext('"당신.. 평범한 사람이 아니군"', 0.1, "y", 1);
                    br();
                    anitext('"몬스터를 끌어들이는 기운이 느껴져.."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"칼날소리 평야엔 위험한 몬스터가 출몰한다네"', 0.1, "y", 1);
                    br();
                    anitext('"델리로 향하거든 돌아서 가는게 좋을거야"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"정보가 필요하다면 리튼으로 가보는게 어때"', 0.1, "y", 1);
                    br();
                    anitext('"너가 찾는 정보가 있을지도 모르잖아?"', 0.1, "y", 2);
                } else if (trand <= 99) {
                    anitext('"들판에 토끼가 뛰어다녀"', 0.1, "y", 1);
                    br();
                    anitext('"토끼는 사랑스럽거든"', 0.1, "y", 2);
                    br();
                    anitext('"토끼를 죽인다면 너를..."', 0.01, "r", 0.3);
                } else {
                    anitext('"세피로트에 악마가 나타났어"', 0.1, "y", 1);
                    br();
                    anitext('"..."', 0.1, "y", 2);
                    br();
                    anitext('"위치는 벨리알.."', 0.1, "y", 2);
                }
            },
        },
        himiko: {
            name: "히미코",
            char: "himiko",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"...안녕"', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"말 걸지 말아줄레?"', 0.15, "y", 2);
                    br();
                    anitext('"조용히 있는 게 더 편해"', 0.1, "y", 1);
                    br();
                    anitext('"..."', 0.2, "y", 2);
                } else if (trand <= 50) {
                    anitext('"내가 뭘 선택하든..."', 0.1, "y", 1);
                    br();
                    anitext('"그건 내 자유야."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"너의 기대에 부응할 생각 없어."', 0.1, "y", 1);
                    br();
                    anitext('"그럴 의무도, 이유도 없어"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"내가 뭘 생각하는지 궁금해?"', 0.1, "y", 1);
                    br();
                    anitext('"알아서 어쩌려고"', 0.1, "y", 2);
                } else {
                    anitext('"충고 하나 하지"', 0.1, "y", 1);
                    br();
                    anitext('"이곳에서 멀리 떠나"', 0.1, "y", 1);
                    br();
                    anitext('"그러는 편이 좋을 거야"', 0.1, "y", 2);
                }
            },
        },
        alice: {
            name: "아리스",
            char: "alice",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕하세요!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 만나요!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"웨이든은 정말 살기 좋아요!"', 0.1, "y", 2);
                    br();
                    anitext('"기쁘게 웃는 사람들이 많이 있잖아요!"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"과일 좋아하세요?"', 0.1, "y", 1);
                    br();
                    anitext('"상큼하고!  달콤하고!  새콤하고!"', 0.1, "y", 1);
                    br();
                    anitext('"정말 매력덩어리에요!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"부모님께서 채소도 먹으라고 잔소리 하셔요.."', 0.1, "y", 1);
                    br();
                    anitext('"하지만...', 0.1, "y", 0.5);
                    anitext('저는 과일이 더 좋은걸요.."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"웨스탈리스에는 가보셨나요?"', 0.1, "y", 1);
                    br();
                    anitext('"바다 근처에 있는 마을인데"', 0.1, "y", 1);
                    br();
                    anitext('"오션뷰가 끝내준대요!"', 0.1, "y", 2);
                } else {
                    anitext('"최근에 이상한 일이요?"', 0.1, "y", 1);
                    br();
                    anitext('"어른들이 심각한 표정으로 이야기 하시던데.."', 0.1, "y", 1);
                    br();
                    anitext('"저는 잘 모르겠어요"', 0.1, "y", 2);
                }
            },
        },
        rene: {
            name: "르네",
            char: "rene",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕하신가!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"자네의 여행에 행운이 있길!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"여보게 친구여"', 0.1, "y", 1);
                    br();
                    anitext('"에덴에서 가장 번성한 마을 키보토스에 어서 오게나!"', 0.1, "y", 1);
                    br();
                    anitext('"편안한 여관, 좋은 물건이 가득한 상점 그리고..."', 0.1, "y", 1);
                    br();
                    anitext('"내가 운영하는 주사위 도박장도 있지..."', 0.01, "y", 0.25);
                } else if (trand <= 50) {
                    anitext('"저번에 주사위 게ㅇ..', 0.1, "y", 0.5);
                    anitext('아니아니"', 0.1, "y", 1);
                    SetUi("yb", "르네", "gb", "rene")
                    anitext('"점잖게 동네 친구들과 한 카드 게임을 이겨서"', 0.1, "y", 1);
                    br();
                    anitext('"주점의 모두에게 맥주를 쏜적이 있었지"', 0.1, "y", 1);
                    br();
                    anitext('"일주일만 일찍 왔으면 자네도 마실 수 있었을텐데!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"젠장... 포포 녀석 사기를 친게 분명해!"', 0.1, "y", 1);
                    br();
                    anitext('"그게 아니고서야 6이 3번 연속으로 나올 리가 없잖아?"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"후.. "', 0.1, "y", 1);
                    br();
                    anitext('"너는 이런 도박 하지 마라"', 0.1, "y", 2);
                } else {
                    anitext('"...안좋은 소식이 많이 들려오는군"', 0.1, "y", 1);
                    br();
                    anitext('"여보게 친구 당분간 내 게임장은 문을 닫을거야."', 0.1, "y", 2);
                }
            },
        },
        biki: {
            name: "수니아",
            char: "biki",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"만나서 반가워!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"좋은 하루 보내~"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"안녕! 오늘 서핑 해볼래? ', 0.1, "y", 0.5);
                    anitext('파도가 정말 좋거든!"', 0.1, "y", 2);
                    br();
                    anitext('"서핑이 처음이라구?"', 0.1, "y", 1);
                    br();
                    anitext('"걱정 마! ', 0.1, "y", 0.5);
                    anitext('내가 자세히 가르쳐줄게~"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"더운 날에는 아이스크림이 최고지!"', 0.1, "y", 1);
                    br();
                    anitext('"너는 어떤 맛이 좋아?"', 0.1, "y", 1);
                    br();
                    anitext('"참고로 나는 딸기맛이 좋아~"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"모래 위에 누워서 햇볕을 쬐는 거 어때?"', 0.1, "y", 1);
                    br();
                    anitext('"느긋하게 쉬면 마음이 편해지거든~"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"바다에 뛰어들어볼까? ', 0.1, "y", 0.5);
                    anitext('시원할 거야!"', 0.1, "y", 1);
                    br();
                    anitext('"으음..."', 0.1, "w", 1);
                    br();
                    anitext('"내가 먼저 들어갈게! ', 0.1, "y", 0.5);
                    anitext('따라와, 재밌어!"', 0.1, "y", 2);
                } else {
                    anitext('"저기, ', 0.1, "y", 0.5);
                    anitext('뭔가 이상한 소리가 나지 않았어?"', 0.1, "y", 1);
                    br();
                    anitext('"기분 탓이겠지?"', 0.1, "y", 2);
                }
            },
        },
        watney: {
            name: "와트니",
            char: "watney",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕?"', 0.1, "y", 2);
                br()
                anitext('"저를 부르신 건가요.."', 0.1, "y", 2);
            },
            bye() {
                anitext('"더 볼일이 없으시다면 이만.."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"오늘 날씨가 정말 좋다!"', 0.1, "y", 2);
                    br();
                    anitext('"햇빛이 많이 들어오니까 과일도 더 달콤해질 것 같아."', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"내일 시장에 나갈 과일을 포장해야 해.."', 0.1, "y", 1);
                    br();
                    anitext('"하아.. 벌써부터 한숨밖에 안 나오네"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"과일이 건강에 좋다는 거 알고 있어?"', 0.1, "y", 1);
                    br();
                    anitext('"중요한 영양소가 많이 들어있고 면역력에도 좋아!"', 0.1, "y", 1);
                    br();
                    anitext('"그래서 우리가 이렇게 열심히 일하는 거지"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"과수원에 새가 많이 와."', 0.1, "y", 1);
                    br();
                    anitext('"과일을 먹으러 오는 것 같아."', 0.1, "y", 1);
                    br();
                    anitext('"새들이 안전하게 쉴 수 있게"', 0.1, "y", 0.5);
                    br();
                    anitext('"새집을 만들어줘야겠어!"', 0.1, "y", 2);
                } else if (trand < 101) {
                    anitext('"성이 「마크」냐고?"', 0.1, "y", 1);
                    br();
                    anitext('"감자는 좋아하냐고?"', 0.1, "y", 1);
                    br();
                    anitext('"이상한 이야기네.."', 0.1, "y", 1);
                    br();
                    anitext('"하하하.."', 0.2, "y", 2);
                }
            },
        },
        k: {
            name: "케이",
            char: "k",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"만나서 반갑네."', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나길 비네."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"오늘도 조용하네."', 0.1, "y", 2);
                    br();
                    anitext('"사실.. 오늘만 조용하다는 이야기는 아니지."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"델리에선 외부 소식을 접하기가 힘들어."', 0.1, "y", 1);
                    br();
                    anitext('"통행이 적어서도 있지만."', 0.1, "y", 1);
                    br();
                    anitext('"원래가 고립된 지역이니 말이야."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"고립된 생활이 가끔 힘들 때가 있지."', 0.1, "y", 1);
                    br();
                    anitext('"하지만, ', 0.1, "y", 0.5);
                    anitext('델리를 떠날 이유로 충분하진 않지."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"때로는 이곳의 고요함이 정말 매력적이라고 느껴지지."', 0.1, "y", 1);
                    br();
                    anitext('"사람들 없이도 나 자신을 찾을 수 있으니 말일세."', 0.1, "y", 2);
                } else {
                    anitext('"세피로트가 위험하다는겐가?"', 0.1, "y", 1);
                    br();
                    anitext('"..."', 0.3, "y", 1);
                    br();
                    anitext('"그렇구만.."', 0.1, "y", 2);
                }
            },
        },
        hare: {
            name: "하레",
            char: "hare",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 놀자!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"바다의 파도가 정말 신기해!"', 0.1, "y", 1);
                    br();
                    anitext('"파도가 부서질 때 소리도 너무 좋아!"', 0.1, "y", 1);
                    br();
                    anitext('"다음에 같이 수영하자!"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"조개를 찾으러 가자!"', 0.1, "y", 1);
                    br();
                    anitext('"누가 더 많이 찾나 시합해볼까?"', 0.1, "w", 1);
                    br();
                    anitext('"그래! 내가 이길 거야!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"멋진 모래성을 만들자!"', 0.1, "y", 1);
                    br();
                    anitext('"왕국처럼 멋지게 말이야!"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"해변에 숨겨진 보물이 있을까?"', 0.1, "y", 1);
                    br();
                    anitext('"보물을 찾으면 친구들에게 나눠줄 거야!"', 0.1, "y", 2);
                } else {
                    anitext('"로리..?"', 0.2, "y", 1);
                    br();
                    anitext('"그게 뭐야?"', 0.1, "y", 1);
                    br();
                    anitext('"나처럼 귀여운 사람을 로리라고 해?"', 0.1, "y", 1);
                    br();
                    anitext('"그럼 나는 로리 대장 할레!"', 0.1, "y", 2);
                }
            },
        },
        zef: {
            name: "제프",
            char: "zef",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"..안녕"', 0.1, "y", 2);
            },
            bye() {
                anitext('"..잘가"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"..주변에는 몬스터가 많이 출몰해"', 0.1, "y", 1);
                    br();
                    anitext('"그러니 마을 밖에서는 항상 조심해.."', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"..포션은 많을수록 좋아"', 0.1, "y", 1);
                    br();
                    anitext('"..목숨값보다 저렴하니 말이야"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"..원래는 벨리알까지 통행이 가능했는데"', 0.1, "y", 1);
                    br();
                    anitext('"안전상의 이유로 지금은 통행이 금지됐어"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"..항상 긴장의 끈을 놓지 마"', 0.1, "y", 1);
                    br();
                    anitext('"..언제 어디서나 말이야"', 0.1, "y", 2);
                } else {
                    anitext('"오올 블루?"', 0.1, "y", 1);
                    br();
                    anitext('"..그게 무엇이지?"', 0.1, "y", 2);
                }
            },
        },
        baba: {
            name: "요코",
            char: "baba",
            havQ: true,
            Qlist: [quest.main_7, quest.main_8, quest.main_9],
            hello() {
                anitext('"만나서 반가운거시야!"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘 가거라"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"흐음.. 그대"', 0.1, "y", 1);
                    br();
                    anitext('"고민이 가득한 표정이로고"', 0.1, "y", 2);
                    br();
                    anitext('"서두르지 말고 하나씩 해결하면 잘 풀릴게야"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"인생에서 가장 중요한게 무엇인지 아느냐?"', 0.1, "y", 1);
                    br();
                    anitext('"그것은 「신념」인게야"', 0.1, "y", 1);
                    br();
                    anitext('"그러니 항상 자신을 잃어버리지 말거라!"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"이몸이 귀엽다고 한거시냐?"', 0.1, "y", 1);
                    br();
                    anitext('"이래 보여도 요코는 200년 이상 살아온게야"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"차는 코, 입 중에 무엇으로 먹는지 아느냐?"', 0.1, "y", 1);
                    br();
                    anitext('"정답은 둘 다 인게야!"', 0.1, "y", 1);
                    br();
                    anitext('"「맛」을 느끼며 「향」도 느껴야 하느니라"', 0.1, "y", 2);
                } else {
                    anitext('"불길한 향이 짙어지고 있는게야"', 0.1, "y", 1);
                    br();
                    anitext('"그대는 이미 그게 무엇인지 알고 있는 게로구나.."', 0.1, "y", 2);
                }
            },
        },
        efa: {
            name: "피나",
            char: "efa",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"만나서 반가워요"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나요"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"마법은 자연과 연결되어 있어요."', 0.1, "y", 1);
                    br();
                    anitext('"당신은 마법을 사용할 줄 아나요?"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"자연의 소리를 들어보세요."', 0.1, "y", 1);
                    br();
                    anitext('"바람이 나무 사이를 지나고 있어요. 정말 아름답네요"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"전투에서는 민첩함이 중요해요."', 0.1, "y", 1);
                    br();
                    anitext('"훈련을 게흘리 하지 마세요"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"미래는 우리가 만드는 것이에요."', 0.1, "y", 1);
                    br();
                    anitext('"모두가 서로를 이해할 수 있는 그런 미래."', 0.1, "y", 2);
                } else {
                    anitext(wrtxt(rand(5)), 0.1, "y", 1);
                    br();
                    anitext(wrtxt(rand(10)), 0.1, "y", 2);
                }
            },
        },
        hite: {
            name: "시안",
            char: "hite",
            havQ: true,
            Qlist: [quest.main_10],
            hello() {
                anitext('".."', 0.1, "y", 2);
            },
            bye() {
                anitext('".."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"너도 벨리알에서 피난왔냐?"', 0.1, "y", 1);
                    br();
                    anitext('"벨리알로 향하고 있다고?"', 0.1, "y", 1);
                    br();
                    anitext('"재미 없거든?"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"빈약한 장비로 가는 건"', 0.1, "y", 1);
                    br();
                    anitext('"자살 행위나 마찬가지야."', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"살고싶거든.."', 0.1, "y", 1);
                    br();
                    anitext('"이 마을을 떠나"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"4-1"', 0.1, "y", 1);
                    br();
                    anitext('"4-2"', 0.1, "y", 2);
                } else {
                    anitext('"5-1"', 0.1, "y", 1);
                    br();
                    anitext('"5-2"', 0.1, "y", 2);
                }
            },
        },
        bch: {
            name: "멘마",
            char: "bch",
            havQ: false,
            Qlist: [],
            hello() {
                anitext('"안녕"', 0.1, "y", 2);
            },
            bye() {
                anitext('"잘가"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand < 25) {
                    anitext('"1-1"', 0.1, "y", 1);
                    br();
                    anitext('"1-2"', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"2-1"', 0.1, "y", 1);
                    br();
                    anitext('"2-2"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"3-1"', 0.1, "y", 1);
                    br();
                    anitext('"3-2"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"4-1"', 0.1, "y", 1);
                    br();
                    anitext('"4-2"', 0.1, "y", 2);
                } else {
                    anitext('"5-1"', 0.1, "y", 1);
                    br();
                    anitext('"5-2"', 0.1, "y", 2);
                }
            },
        },

    },
    inn: {
        blank: {
            name: "허수아비",
            char: "null",
            innName: "여관",
            cost: 35,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"인사"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박 35골드"', 0.1, "y", 2);
            },
            payed() {
                anitext('"..."', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"..."', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"1-1"', 0.1, "y", 2);
                    br();
                    anitext('"1-2"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"2-1"', 0.1, "y", 1);
                    br();
                    anitext('"2-2"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"3-1"', 0.1, "y", 1);
                    br();
                    anitext('"3-2 ', 0.1, "y", 0.5);
                    anitext('3-3"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"4-1"', 0.1, "y", 1);
                    br();
                    anitext('"4-2"', 0.3, "y", 2);
                } else {
                    anitext('"5-1"', 0.1, "y", 1);
                    br();
                    anitext('"5-2"', 0.1, "y", 2);
                }
            },
        },
        mido: {
            name: "미도",
            char: "mido",
            innName: "미도의 여관",
            cost: 25,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"어서오세요~  미도의 여관입니다~"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박에 25골드 입니다~"', 0.1, "y", 2);
            },
            payed() {
                anitext('"방은 2층 안쪽방 입니다~"', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"좋은 아침입니다~  불편한 점은 없으셨나요?"', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"이용해 주셔서 감사합니다~"', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"다음 방문을 기다릴게요~"', 0.1, "y", 2);
            },
            hello() {
                anitext('"안녕하세요!"', 0.1, "y", 2);
                br()
                anitext('"만나서 반가워요~"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나요!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand < 25) {
                    anitext('"최근 웨이든 지역의 사과값이 올랐지 뭐에요.."', 0.1, "y", 2);
                    br();
                    anitext('"아, 갑자기 무슨 이야기냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"손님들이 조식에 왜 사과가 없냐고 하도 따져서.."', 0.1, "y", 2);
                } else if (trand < 50) {
                    anitext('"저희 여관은 에덴 전체를 통틀어서 가장 저렴하답니다~"', 0.1, "y", 1);
                    br();
                    anitext('"네?  ', 0.1, "y", 1);
                    anitext('혹시 서비스가 부실하냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"이 가격에 조식까지 제공하는 여관은 세피로트에서 여기밖에 없다구요!"', 0.1, "y", 2);
                } else if (trand < 75) {
                    anitext('"조식 요리는 누가 하냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"요리는 ', 0.1, "y", 0.5);
                    anitext('제 남편이 직접 한답니다~"', 0.1, "y", 2);
                } else if (trand < 98) {
                    anitext('"정말이지... 용돈 받고 흥청망청 써버리는 꼬맹이도 아니고.."', 0.1, "y", 1);
                    br();
                    anitext('"네? ', 0.1, "y", 2);
                    anitext('아.. ', 0.5, "y", 0.5);
                    anitext(' 저희 남편 이야기에요."', 0.1, "y", 2);
                    br();
                    anitext('"글쎄 마을 대장간에서 멋있어 보인단 이유 하나만으로 비싼 칼을 사지 뭐에요."', 0.1, "y", 1);
                    br();
                    anitext('"그런걸 쓸 곳이 어딨다고."', 0.1, "y", 2);
                } else if (trand < 101) {
                    anitext('"예전에 이상한 손님이 다녀갔어요"', 0.1, "y", 1);
                    br();
                    anitext('"수상하게 무언가를 중얼거리다 가셨는데', 0.1, "y", 0.5);
                    anitext('...', 0.5, "y", 0.5);
                    anitext(' 모르겠네요"', 0.1, "y", 2);
                }
            },
        },
        aru: {
            name: "아루",
            char: "aru",
            innName: "아루의 여관",
            cost: 30,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"아우우.. 어서오세요.."', 0.15, "y", 2);
            },
            costInfo() {
                anitext('"으으.. 숙박은 30골드 에요..."', 0.15, "y", 2);
            },
            payed() {
                anitext('"방은.. 이쪽에 있어요.."', 0.15, "y", 2);
            },
            goodMorning() {
                anitext('"안녕히 주무셨어요..?"', 0.15, "y", 2);
            },
            niceBye() {
                anitext('"이용해 주셔서.. 감사합니다.."', 0.15, "y", 2);
            },
            goodBye() {
                anitext('"다음에 또.. 오세요.."', 0.15, "y", 2);
            },
            hello() {
                anitext('"아우우.. 안녕하세요.."', 0.15, "y", 2);
            },
            bye() {
                anitext('"으으.. 그럼 이만.."', 0.15, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand <= 25) {
                    anitext('"머리띠를 했냐구요..?"', 0.15, "y", 1);
                    br();
                    anitext('"진짜 귀에요.. 으으.."', 0.15, "y", 2);
                } else if (trand <= 50) {
                    anitext('"프로토에서.. 오셨다구요..?"', 0.15, "y", 1);
                    br();
                    anitext('"늑대가 많이 나온다던데.. 괜찮으세요..?"', 0.15, "y", 2);
                } else if (trand <= 75) {
                    anitext('"하이마운트에는.. ', 0.15, "y", 0.5);
                    anitext('가지 마세요.."', 0.15, "y", 1);
                    br();
                    anitext('"아주 위험해요.."', 0.15, "y", 2);
                } else if (trand <= 97) {
                    anitext('"늑대랑.. 무슨 관계냐구요..?"', 0.15, "y", 1);
                    br();
                    anitext('"..."', 0.4, "y", 1);
                    br();
                    anitext('"잘.. 모르겠네요.."', 0.15, "y", 2);
                } else if (trand < 101) {
                    anitext('"하이마운트 너머에서.. 흉흉한 소문이 들려와요.."', 0.15, "y", 1);
                    br();
                    anitext('"자꾸.. 사람이 사라지나봐요.."', 0.15, "y", 1);
                    br();
                    anitext('"..."', 0.4, "y", 1);
                }
            },
        },
        rucy: {
            name: "루시",
            char: "rucy",
            innName: "루시의 여관",
            cost: 35,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"어서오세요! 모험가님!"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박에 35골드 에요!"', 0.1, "y", 2);
            },
            payed() {
                anitext('"안쪽으로 안내해드릴게요!"', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"좋은 아침이에요 모험가님!"', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"안전한 여행 되세요!"', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"안녕히 가세요!"', 0.1, "y", 2);
            },
            hello() {
                anitext('"안녕하세요!"', 0.1, "y", 2);
                br()
                anitext('"만나서 반가워요~"', 0.1, "y", 2);
            },
            bye() {
                anitext('"다음에 또 만나요!"', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100)
                if (trand <= 25) {
                    anitext('"최근 키보토스에 통행량이 늘었나봐요!"', 0.1, "y", 2);
                    br();
                    anitext('"무슨 일이라도 생겼나?"', 0.1, "y", 1);
                } else if (trand <= 50) {
                    anitext('"길드는 이용 해보셨나요?"', 0.1, "y", 1);
                    br();
                    anitext('"많은 모험가분들이 이용하는 장소이니"', 0.1, "y", 1);
                    br();
                    anitext('"여유가 있으시면 방문 해보세요!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"오늘 저녁은 특별히 신선한 재료로 만든 스튜가 나와요."', 0.1, "y", 1);
                    br();
                    anitext('"꼭 드셔보세요!', 0.1, "y", 0.5);
                    anitext(' 손님들이 정말 좋아하신답니다."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('""여행 중 어떤 모험을 하셨나요?"', 0.1, "y", 1);
                    br();
                    anitext('"흥미로운 이야기가 있다면 듣고 싶어요!"', 0.1, "y", 2);
                } else {
                    anitext('"손님들 이야기를 가만히 듣고있으면"', 0.1, "y", 1);
                    br();
                    anitext('"악마 이야기가 들려와요"', 0.1, "y", 1);
                    br();
                    anitext('"악마가 있긴 한가요..?"', 0.1, "y", 2);
                }
            },
        },
        ikz: {
            name: "티아라",
            char: "ikz",
            innName: "티아라의 여관",
            cost: 32,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"안녕하세요! ', 0.1, "y", 0.5);
                anitext('여관에 오신 걸 환영해요."', 0.1, "y", 1);
                br()
                anitext('"편안하게 쉬세요!"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박 32골드에요!"', 0.1, "y", 2);
            },
            payed() {
                anitext('"아, 바로 주무시나요?"', 0.1, "y", 1);
                br()
                anitext('"제가 안내해 드릴게요!"', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"아침 식사 준비됐어요!"', 0.1, "y", 1);
                br()
                anitext('"오늘은 특별히 팬케이크를 만들었어요."', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"다음에 또 오세요!"', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"조심히 가세요!"', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"오늘 밤은 별이 정말 잘 보여요."', 0.1, "y", 2);
                    br();
                    anitext('"보러 나가고 싶지만.."', 0.1, "y", 1);
                    br();
                    anitext('"조금 아쉽네요.."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"요리에 비법이 있냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"비밀 재료는 사랑이죠!"', 0.1, "y", 1);
                    br();
                    anitext('"손님들을 위해 정성을 다하거든요."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"손님은 어떤 종류의 음료를 좋아하세요?"', 0.1, "y", 1);
                    br();
                    anitext('"콜라.. 요? ', 0.2, "y", 0.5);
                    anitext('그게 무엇인지는 모르겠지만.."', 0.1, "y", 1);
                    br();
                    anitext('"저도 마셔보고 싶네요..!"', 0.1, "y", 0.5);
                } else if (trand <= 98) {
                    anitext('"손님, 그거 아시나요?"', 0.1, "y", 1);
                    br();
                    anitext('"여관의 창문에서 보이는 일몰은 정말 아름다워요!"', 0.1, "y", 2);
                } else {
                    anitext('"티아라씨?"', 0.1, "w", 1);
                    br();
                    anitext('"..."', 0.2, "y", 1);
                    br();
                    anitext('"아.. 네?"', 0.1, "y", 1);
                    br();
                    anitext('"부르셨나요?"', 0.1, "y", 2);
                    SetUi("yb", this.innName, "bb", this.char)
                    anitext('"무슨 일 있으신가요?"', 0.1, "w", 1);
                    br();
                    anitext('"별 일 없답니다..!"', 0.1, "y", 2);
                    br();
                    anitext('(티아라는 애써 웃음을 보였다.)', 0.1, "c", 2);
                }
            },
        },
        camilla: {
            name: "카밀라",
            char: "camilla",
            innName: "웨이든 여관",
            cost: 40,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"여관에 어서오세요~"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루에 40골드입니다!"', 0.1, "y", 2);
            },
            payed() {
                anitext('"방 안내는 저에게 맡겨주세요!"', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"좋은아침이에요!"', 0.1, "y", 1);
                br()
                anitext('"불편하진 않으셨나요?"', 0.1, "y", 2);
            },
            niceye() {
                anitext('"다음에 또 이용해주세요!"', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"안녕히 가세요!"', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"웨이든의 과일이 그렇게 맛있다고 들었어요."', 0.1, "w", 2);
                    br();
                    anitext('"맞아요. 질 좋은 토지에서 자란 과일들은 정말 특별해요."', 0.1, "y", 2);
                    br();
                    anitext('"직접 맛보시면 감동할 거예요."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"웨이든은 처음이신가요?"', 0.1, "y", 1);
                    br();
                    anitext('"그렇다면 헌트디시나.. 상점가를 둘러보세요!"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"아침 식사는 어떤 걸 원하시나요?"', 0.1, "y", 1);
                    br();
                    anitext('"신선한 과일과 빵, ', 0.1, "y", 0.5);
                    anitext('또는 따뜻한 죽이 준비되어 있어요."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"저는 그림 그리기를 좋아해요."', 0.1, "y", 1);
                    br();
                    anitext('"풍경을 그림에 담으면 아름답거든요!"', 0.1, "y", 2);
                } else {
                    anitext('"곧 있으면 연회가 열릴 시기랍니다!"', 0.1, "y", 1);
                    br();
                    anitext('"하지만 이번 올해에는 연회가 없나봐요.."', 0.1, "y", 1);
                    br();
                    anitext('"아쉽지만.. 내년에는 열리겠죠!"', 0.1, "y", 2);
                }
            },
        },
        luna: {
            name: "루나",
            char: "luna",
            innName: "여관",
            cost: 39,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"여관에 어서오세요."', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박 39골드 입니다."', 0.1, "y", 2);
            },
            payed() {
                anitext('"안쪽으로 안내하겠습니다."', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('".. 일어나셨군요."', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"안녕히 가세요."', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"가시는군요."', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"얼마 전부터 벨리알 통행을 금하고 있습니다."', 0.1, "y", 2);
                    br();
                    anitext('"용무가 있으시다면 다른 길을 찾아보세요"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"소원이 있냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"소원은 이루어지지 않는 법이에요."', 0.1, "y", 1);
                    br();
                    anitext('"그런 건 바라는 게 아니죠.""', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"좋아하는 음식 말인가요.."', 0.1, "y", 1);
                    br();
                    anitext('"특별히 없어요."', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"이런 잡담에 무슨 의미가 있나요?"', 0.1, "y", 1);
                    br();
                    anitext('"할 일이 없으시면 가서 사냥이라도 해보세요."', 0.1, "y", 2);
                } else {
                    anitext('"당신이 누구인지에 대해서는 별로 관심이 없어요."', 0.1, "y", 1);
                    br();
                    anitext('"그러니 저에게도 관심 꺼주세요."', 0.1, "y", 2);
                }
            },
        },
        maya: {
            name: "마야",
            char: "maya",
            innName: "여관",
            cost: 45,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"안녕하세요..?"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"숙박 요금은 45골드에요."', 0.1, "y", 2);
            },
            payed() {
                anitext('"편안한 휴식 되세요"', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"불편하진 않으셨나요?"', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"이용에 감사드립니다."', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"다음에 또 오세요"', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"어떻게 여관을 운영 할 수 있냐구요?"', 0.1, "y", 1);
                    br();
                    anitext('"고립된 마을이라고 아무것도 할 수 없다고 생각하셨나요?"', 0.1, "y", 1);
                    br();
                    anitext('"델리에서도 기본적인 생활은 충분히 할 수 있답니다."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"통행량이 적으니 여관 이용률도 낮은 건 사실이죠"', 0.1, "y", 1);
                    br();
                    anitext('"하지만 없는 건 아닙니다."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"간단한 식재료는 텃밭에서 재배하고 있어요"', 0.1, "y", 1);
                    br();
                    anitext('"그러는편이 ', 0.1, "y", 0.5);
                    anitext('여러면으로 좋거든요"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"마을이 너무 조용한가요?"', 0.1, "y", 1);
                    br();
                    anitext(`"저는 오히려 '시끄럽지 않아서'좋다고 생각해요"`, 0.1, "y", 2);
                } else {
                    anitext('"최근에 이상한 일이요?"', 0.1, "y", 1);
                    br();
                    anitext('"흠.. 저는 잘 모르겠네요"', 0.1, "y", 2);
                }
            },
        },
        amelia: {
            name: "아멜리아",
            char: "amelia",
            innName: "아멜리아의 여관",
            cost: 45,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"어서오세요~"', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"하루 숙박은 45골드 입니다~"', 0.1, "y", 2);
            },
            payed() {
                anitext('"..."', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"..."', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 25) {
                    anitext('"포테인에서 오셨다구요?"', 0.1, "y", 1);
                    br();
                    anitext('"멀리서도 오셨네요.."', 0.1, "y", 2);
                    br();
                    anitext('"네..?"', 0.1, "y", 1);
                    br();
                    anitext('"하이마운트를 건너서 오셨다구요..?"', 0.1, "y", 1);
                    br();
                    anitext('"ㅈ...진짜요??"', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"베셀 지역의 찻잎을 아시나요?"', 0.1, "y", 1);
                    br();
                    anitext('"지금은 국경을 건널 수 없어서 귀한 물건이 되었어요"', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"「귀를 닫고 눈을 뜨다」라는 관용구가 있어요"', 0.1, "y", 1);
                    br();
                    anitext('"이야기를 듣기보다 ', 0.1, "y", 0.5);
                    anitext('직접 눈으로 보아야 한다는 이야기에요"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"최근 미라빌리스에서 노든으로 많은 사람이 넘어왔어요"', 0.1, "y", 1);
                    br();
                    anitext('"피난.. 이라고 하던데.. 다친 사람이 없으면 좋겠네요.."', 0.1, "y", 2);
                } else {
                    anitext('"사람들의 얼굴에 공포가 묻어있어요.."', 0.1, "y", 1);
                    br();
                    anitext('"이럴땐 어떤 행동을 해야 할지.."', 0.1, "y", 1);
                    br();
                    anitext('"정답을 알려주면 좋겠어요.."', 0.1, "y", 2);
                }
            },
        },
        clara: {
            name: "클라라",
            char: "clara",
            innName: "여관",
            cost: 32,
            havQ: false,
            Qlist: [],
            welcome() {
                anitext('"..."', 0.1, "y", 2);
            },
            costInfo() {
                anitext('"32골드 입니다."', 0.1, "y", 2);
            },
            payed() {
                anitext('"...방은 안쪽입니다."', 0.1, "y", 2);
            },
            goodMorning() {
                anitext('"...일어나셨군요"', 0.1, "y", 2);
            },
            niceBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            goodBye() {
                anitext('"..."', 0.1, "y", 2);
            },
            // dlc ㅋㅋ
            hello() {
                anitext('"..."', 0.1, "y", 2);
                br()
                anitext('"..."', 0.1, "y", 2);
            },
            bye() {
                anitext('"..."', 0.1, "y", 2);
            },
            istalk() {
                let trand = rand(100);
                if (trand <= 10) {
                    anitext('"마을 분위기가 왜 이렇냐구요?"', 0.1, "y", 2);
                    br();
                    anitext('"많은 사람들이 벨리알에서 미라빌리스로 피난을 왔습니다."', 0.1, "y", 1);
                    br();
                    anitext('"하하호호 웃으면서 왔을 리 만무하니까요."', 0.1, "y", 2);
                } else if (trand <= 50) {
                    anitext('"..."', 0.1, "y", 1);
                    br();
                    anitext('"부정적인 생각을 멈출 수 없어요.."', 0.1, "y", 1);
                    br();
                    anitext('"하아.."', 0.1, "y", 2);
                } else if (trand <= 75) {
                    anitext('"벨리알으로 통행이 힘들어졌어요"', 0.1, "y", 1);
                    br();
                    anitext('"이유는 여럿 있지만, ', 0.1, "y", 0.5);
                    anitext('악마가 출몰해서.. 겠죠"', 0.1, "y", 2);
                } else if (trand <= 98) {
                    anitext('"때로는 침묵이"', 0.1, "y", 1);
                    br();
                    anitext('"가장 좋은 선택지가 될 수 있습니다."', 0.3, "y", 2);
                } else {
                    anitext('"미라빌리스도 머지않아 위험에 처할 수 있습니다."', 0.1, "y", 1);
                    br();
                    anitext('"다른 마을로 피난이 정답이겠네요"', 0.1, "y", 2);
                }
            },
        },
    }
};

function shop(name) {

    function scl() {
        SetUi("gb", name.shopname, "bb", name.char)
    }
    let shopchoice;
    scl();
    name.hello()
    let shopi = 1;
    while (shopi === 1) {
        scl();
        let toQ = 0
        let cQ = 0
        if (p1.nowQuest.length > 0) {
            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                if (p1.nowQuest[ii].to === name.char) {
                    toQ = 1
                }
            }
        }
        if (name.Qlist.length > 0) {
            // anitext('"퀘스트 있음"', 0.1, "y", 1);
            // br()
            // npc의 퀘스트 리스트를 도는 for문
            for (let i = 0; i < name.Qlist.length; i++) {
                //레벨제한 조건확인
                if (p1.lv >= name.Qlist[i].needLv) {
                    let ucan = 0
                    if (name.Qlist[i].needQ === "none") {
                        ucan = 1
                    } else {
                        if (p1.clearQuest.length > 0) {
                            for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                    ucan = 1
                                }
                            }
                        }
                    }
                    if (ucan === 1) {
                        if (!name.Qlist[i].repeatable) {
                            if (p1.clearQuest.length > 0) {
                                let inq = 0
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
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
        scl();
        if (cQ === 1 || toQ === 1) {
            plist = ["구매", "판매", "가방 확인", "대화", "퀘스트"];
        } else {
            plist = ["구매", "판매", "가방 확인", "대화"];
        }
        scl();
        shopchoice = readlineSync.keyInSelect(plist, " > ", { cancel: "나가기" }) + 1;
        let inchoice;
        let inchoice2;
        switch (shopchoice) {
            case 1:
                scl();
                name.buy_talk()
                scl();
                let ii = 0;
                while (ii === 0) {
                    let back = 0;
                    let aa = 0;
                    while (aa === 0) {
                        process.stdout.write(chalk.white("0. 뒤로가기    "));
                        for (let i1 = 0; i1 < name.list.length; i1++) {
                            if (i1 % 2 == 1) {
                                br();
                            }
                            process.stdout.write(chalk.white(i1 + 1 + ". " + name.list[i1].itemName + " " + name.list[i1].price + "G    "));
                        }
                        br();
                        inchoice = Number(readlineSync.question(" > "));
                        if (inchoice <= name.list.length && inchoice > 0) {
                            aa++;
                        } else if (inchoice === 0) {
                            back++;
                            aa++;
                            ii++;
                        } else {
                            anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                            scl();
                        }
                    }
                    if (back === 0) {
                        let max
                        // if (p1.gold < name.list[inchoice - 1].price) {

                        // }
                        if (name.list[inchoice - 1].type === "potion" || name.list[inchoice - 1].type === "etc") {
                            max = 100

                        } else {
                            max = 1
                        }
                        scl();
                        anitext(name.list[inchoice - 1].itemName, 0.01, "c", 0.5);
                        anitext("    " + name.list[inchoice - 1].price + "G", 0.01, "y", 1);
                        br();
                        anitext(name.list[inchoice - 1].iteminfo, 0.01, "c", 0.5);
                        br();
                        anitext(name.list[inchoice - 1].itemDesc, 0.01, "c", 0.5);
                        br();
                        anitext("최대 " + max + "개씩 구매 가능", 0.01, "c", 0.5);
                        br();

                        inchoice2 = Number(readlineSync.question("구매 수량 > "));
                        aa = 0;
                        let requ = 0;
                        while (aa === 0) {

                            if (inchoice2 > 0 && inchoice2 <= max) {
                                if (inchoice2 * name.list[inchoice - 1].price > p1.gold) {
                                    anitext("그만큼 사기엔 돈이 모자르다..", 0.1, "c", 3);
                                    requ = 1;
                                } else {
                                    aa++;
                                    if (anigiv(items[name.list[inchoice - 1].itemCode], inchoice2, 0) === 1) {
                                        p1.gold -= inchoice2 * name.list[inchoice - 1].price;
                                        name.buy_suc()
                                    }
                                    scl();
                                }
                            } else if (inchoice2 === 0) {
                                aa++;
                                scl();
                            } else if (inchoice2 > max) {
                                anitext("그러기엔 너무 많은 양이다.", 0.1, "c", 3);
                                requ = 1;
                            } else {
                                anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                requ = 1;
                            }
                            if (requ === 1) {
                                scl();
                                process.stdout.write(chalk.cyan(name.list[inchoice - 1].itemName));
                                process.stdout.write(chalk.yellow("    " + name.list[inchoice - 1].price + "G"));
                                br();
                                process.stdout.write(chalk.cyan(name.list[inchoice - 1].iteminfo));
                                br();
                                process.stdout.write(chalk.cyan(name.list[inchoice - 1].itemDesc));
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
                scl();

                if (p1.inven.length > 0) {
                    name.sell_talk()

                    // if (true) {
                    let bob = 0;
                    let back = 0;
                    let si = 0
                    while (si === 0) {
                        scl();
                        if (p1.inven.length === 0) {
                            break;
                        }
                        bob = 0
                        back = 0
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
                                si++
                            } else {
                                anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                scl();
                            }
                        }
                        if (back === 0) {
                            scl();
                            anitext(p1.inven[inchoice - 1].itemName, 0.01, "c", 0.01);
                            anitext("    " + p1.inven[inchoice - 1].price + "G", 0.01, "y", 0.01);
                            anitext("    " + p1.inven[inchoice - 1].hav + "개 보유", 0.01, "c", 1);
                            br();
                            anitext(p1.inven[inchoice - 1].iteminfo, 0.01, "c", 0.5);
                            br();
                            anitext(p1.inven[inchoice - 1].itemDesc, 0.01, "c", 0.5);
                            br();
                            let countchoice;
                            // 70% 리셀
                            while (bob === 1) {
                                countchoice = Number(readlineSync.question("판매 수량 > "));
                                if (countchoice > 0 && countchoice <= p1.inven[inchoice - 1].hav) {
                                    p1.inven[inchoice - 1].hav -= countchoice
                                    p1.gold += Math.round((p1.inven[inchoice - 1].price * 0.8) * countchoice)
                                    if (p1.inven[inchoice - 1].hav <= 0) {
                                        p1.inven.splice(inchoice - 1, 1);
                                    }
                                    bob++
                                    name.sell_suc()
                                } else if (countchoice === 0) {
                                    bob++
                                    si++
                                } else {
                                    anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                                    scl();
                                    process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].itemName));
                                    process.stdout.write(chalk.yellow("    " + p1.inven[inchoice - 1].price + "G"));
                                    process.stdout.write(chalk.cyan("    " + p1.inven[inchoice - 1].hav + "개 보유"));
                                    br()
                                    process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].iteminfo));
                                    br()
                                    process.stdout.write(chalk.cyan(p1.inven[inchoice - 1].itemDesc));
                                    br()
                                }
                            }
                        }
                    }

                } else {
                    anitext("가방이 비어있다.", 0.01, "c", 1);
                }

                break;
            case 3:
                scl();
                anitext("가방을 확인합니다.", 0.01, "c", 1);
                scl();
                if (p1.inven.length > 0) {
                    // if (true) {
                    for (let i3 = 0; i3 < p1.inven.length; i3++) {

                        anitext(
                            p1.inven[i3].itemName + " " + p1.inven[i3].hav + "개 보유    ",
                            0.01,
                            "c",
                            1
                        );
                        if (i3 % 2 == 1) {
                            br();
                        }
                    }
                    sleep(3);
                } else {
                    anitext("가방이 비어있다.", 0.01, "c", 1);
                }

                break;
            case 4:
                scl();
                name.istalk();

                break;
            case 5:
                checkQ()
                let Qli = []
                let Qnum = []
                let Qhow = []
                let Qid = []
                let minu = 0
                if (name.Qlist.length > 0) {

                    //npc가 들고있는 퀘스트 배열 도는 for문
                    for (let i = 0; i < name.Qlist.length; i++) {
                        if (p1.lv >= name.Qlist[i].needLv) {
                            let how = "[ 수행 가능 ]"
                            let hhow = 0
                            let yesq = -1
                            let nono = 0
                            if (name.Qlist[i].needQ === "none") {
                                yesq = 1
                            } else {
                                //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                        yesq = 1
                                    }
                                }
                            }
                            //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                            if (!name.Qlist[i].repeatable) {
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
                                        nono = 1
                                    }
                                }
                            }
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].id === name.Qlist[i].id) {
                                    if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === name.char) {
                                        how = "[ 완료 가능 ]"
                                        hhow = 2
                                    } else {
                                        how = "[ 진행 중 ]"
                                        hhow = 1
                                    }
                                }
                            }
                            if (yesq === 1 && nono === 0) {
                                Qli.push(name.Qlist[i].name + how)
                                Qnum.push(i)
                                Qhow.push(hhow)
                                Qid.push(name.Qlist[i].id)
                            }
                        }
                    }
                }
                minu = Qnum.length
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === name.char && p1.nowQuest[ii].from !== name.char) {
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
                scl();
                let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                if (Qchoice > -1) {
                    scl()
                    if (Qhow[Qchoice] === 0) {
                        name.Qlist[Qnum[Qchoice]].talk()
                        scl();
                        canuQ(name.Qlist[Qnum[Qchoice]])
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

                    scl();
                }
                break;
            case 0:
                scl();
                name.bye()
                shopi--;
                break;
            default:
                anitext("여기는 에러", 0.1, "c", 2);
        }
    }
}
function inn(name) {
    function scl() {
        SetUi("yb", name.innName, "bb", name.char)
    }
    let innchoice;
    scl();
    name.welcome()
    let shopi = 1;

    while (shopi === 1) {
        let toQ = 0
        let cQ = 0
        if (p1.nowQuest.length > 0) {
            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                if (p1.nowQuest[ii].to === name.char) {
                    toQ = 1
                }
            }
        }
        if (name.Qlist.length > 0) {
            // anitext('"퀘스트 있음"', 0.1, "y", 1);
            // br()
            // npc의 퀘스트 리스트를 도는 for문
            for (let i = 0; i < name.Qlist.length; i++) {
                //레벨제한 조건확인
                if (p1.lv >= name.Qlist[i].needLv) {
                    let ucan = 0
                    if (name.Qlist[i].needQ === "none") {
                        ucan = 1
                    } else {
                        if (p1.clearQuest.length > 0) {
                            for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                    ucan = 1
                                }
                            }
                        }
                    }
                    if (ucan === 1) {
                        if (!name.Qlist[i].repeatable) {
                            if (p1.clearQuest.length > 0) {
                                let inq = 0
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
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
        scl();
        if (cQ === 1 || toQ === 1) {
            plist = ["여관 이용", "주인과 대화", "퀘스트"];
        } else {
            plist = ["여관 이용", "주인과 대화"];
        }
        scl();
        // let list = ["여관 이용", "주인과 대화"];
        innchoice = readlineSync.keyInSelect(plist, " > ", { cancel: "나가기" }) + 1;
        let inchoice;
        let pay = 0
        switch (innchoice) {
            case 1:
                scl();
                name.costInfo()
                scl();
                let ii = 0;
                while (ii === 0) {
                    let back = 0;
                    let aa = 0;
                    while (aa === 0) {
                        process.stdout.write(chalk.white("0. 뒤로가기    1. 돈을 지불한다"));
                        br();
                        inchoice = Number(readlineSync.question(" > "));
                        if (inchoice === 1) {
                            if (p1.gold >= name.cost) {
                                p1.gold -= name.cost
                                aa++;
                                pay = 1
                                ii++
                            } else {
                                anitext("그러기엔 돈이 부족 한 것 같다..", 0.1, "c", 3);
                                scl();
                            }

                        } else if (inchoice === 0) {
                            back++;
                            aa++;
                            ii++;
                        } else {
                            anitext("아쉽게도 그 선택지는 없다..", 0.1, "c", 3);
                            scl();
                        }
                    }
                    if (back === 0) {
                        name.payed()
                        scl();
                        anitext("피곤하니 이만 쉬러가자...", 0.1, "c", 3);
                        scl();
                        anitext("...", 1, "c", 2);
                        p1.zhp += Math.floor(p1.fhp * 0.5)
                        p1.zmp += Math.floor(p1.fmp * 0.5)
                        if (p1.zhp > p1.fhp) { p1.zhp = p1.fhp }
                        if (p1.zmp > p1.fmp) { p1.zmp = p1.fmp }
                        scl();
                        anitext("새가 지저귀는 소리에 눈이 떠졌다.", 0.1, "c", 2);
                        br()
                        anitext("자고 일어나니 기운이 넘친다.", 0.1, "c", 3);
                        scl();
                        name.goodMorning()
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
                        fs.writeFileSync('./savefiles/save_auto.json', save)
                    }
                }
                while (pay === 1) {
                    scl();
                    let plist = ["주인과 대화"];
                    let pachoice = readlineSync.keyInSelect(plist, " > ", { cancel: "나가기" }) + 1;
                    switch (pachoice) {
                        case 1:
                            scl();
                            name.istalk();
                            break;
                        case 0:
                            scl();
                            name.niceBye()
                            shopi--
                            pay = 2
                            break;
                        default:
                            anitext("여기는 에러", 0.1, "c", 2);
                            break;
                    }
                }

                break;

                scl();
                anitext("가방을 확인합니다.", 0.01, "c", 1);
                scl();
                if (p1.inven.length > 0) {
                    // if (true) {
                    for (let i3 = 0; i3 < p1.inven.length; i3++) {

                        anitext(p1.inven[i3].itemName + " " + p1.inven[i3].hav + "개 보유    ", 0.01, "c", 1);
                        if (i3 % 2 == 1) {
                            br();
                        }
                    }
                    sleep(3);
                } else {
                    anitext("가방이 비어있다.", 0.01, "c", 1);
                }

                break;
            case 2:
                scl();
                name.istalk();

                break;
            case 3:
                checkQ()
                let Qli = []
                let Qnum = []
                let Qhow = []
                let Qid = []
                let minu = 0
                if (name.Qlist.length > 0) {

                    //npc가 들고있는 퀘스트 배열 도는 for문
                    for (let i = 0; i < name.Qlist.length; i++) {
                        if (p1.lv >= name.Qlist[i].needLv) {
                            let how = "[ 수행 가능 ]"
                            let hhow = 0
                            let yesq = -1
                            let nono = 0
                            if (name.Qlist[i].needQ === "none") {
                                yesq = 1
                            } else {
                                //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                        yesq = 1
                                    }
                                }
                            }
                            //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                            if (!name.Qlist[i].repeatable) {
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
                                        nono = 1
                                    }
                                }
                            }
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].id === name.Qlist[i].id) {
                                    if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === name.char) {
                                        how = "[ 완료 가능 ]"
                                        hhow = 2
                                    } else {
                                        how = "[ 진행 중 ]"
                                        hhow = 1
                                    }
                                }
                            }
                            if (yesq === 1 && nono === 0) {
                                Qli.push(name.Qlist[i].name + how)
                                Qnum.push(i)
                                Qhow.push(hhow)
                                Qid.push(name.Qlist[i].id)
                            }
                        }
                    }
                }
                minu = Qnum.length
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === name.char && p1.nowQuest[ii].from !== name.char) {
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
                scl();
                let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                if (Qchoice > -1) {
                    scl()
                    if (Qhow[Qchoice] === 0) {
                        name.Qlist[Qnum[Qchoice]].talk()
                        scl();
                        canuQ(name.Qlist[Qnum[Qchoice]])
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

                    scl();
                }
                break;
            case 0:
                scl();
                name.goodBye()
                shopi--;
                break;
            default:
                anitext("여기는 에러", 0.1, "c", 2);
                break;
        }
    }
}
function npctalk(name) {
    Gdata.nowtalk = name.char
    function scl() {
        SetUi("yb", name.name, "gb", name.char)
    }
    checkQ()
    scl();
    name.hello()
    let shopi = 1;
    while (shopi === 1) {
        scl();
        let toQ = 0
        let cQ = 0
        // 출처는 모르지만 완료 위치가 npc일 경우를 확인
        if (p1.nowQuest.length > 0) {
            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                if (p1.nowQuest[ii].to === name.char) {
                    toQ = 1
                }
            }
        }
        if (name.Qlist.length > 0) {
            // anitext('"퀘스트 있음"', 0.1, "y", 1);
            // br()
            // npc의 퀘스트 리스트를 도는 for문
            for (let i = 0; i < name.Qlist.length; i++) {
                //레벨제한 조건확인
                if (p1.lv >= name.Qlist[i].needLv) {
                    let ucan = 0
                    if (name.Qlist[i].needQ === "none") {
                        ucan = 1
                    } else {
                        if (p1.clearQuest.length > 0) {
                            for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                    ucan = 1
                                }
                            }
                        }
                    }
                    if (ucan === 1) {
                        if (!name.Qlist[i].repeatable) {
                            if (p1.clearQuest.length > 0) {
                                let inq = 0
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
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
        scl();
        if (cQ === 1 || toQ === 1) {
            plist = ["대화", "퀘스트"];
        } else {
            plist = ["대화"];
        }

        let pachoice = readlineSync.keyInSelect(plist, " > ", { cancel: "떠나기" }) + 1;
        switch (pachoice) {
            case 1:
                scl();
                name.istalk();
                break;
            case 2:
                checkQ()
                let Qli = []
                let Qnum = []
                let Qhow = []
                let Qid = []
                let minu = 0
                if (name.Qlist.length > 0) {

                    //npc가 들고있는 퀘스트 배열 도는 for문
                    for (let i = 0; i < name.Qlist.length; i++) {
                        if (p1.lv >= name.Qlist[i].needLv) {
                            let how = "[ 수행 가능 ]"
                            let hhow = 0
                            let yesq = -1
                            let nono = 0
                            if (name.Qlist[i].needQ === "none") {
                                yesq = 1
                            } else {
                                //p1.clearQuest 배열을 돌면서 퀘스트 조건 확인하는 for문
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].needQ) {
                                        yesq = 1
                                    }
                                }
                            }
                            //p1.clearQuest 배열을 돌면서 이미 깬 이력이 있으면 못하게 막는 for문
                            if (!name.Qlist[i].repeatable) {
                                for (let ii = 0; ii < p1.clearQuest.length; ii++) {
                                    if (p1.clearQuest[ii].id === name.Qlist[i].id) {
                                        nono = 1
                                    }
                                }
                            }
                            for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                                if (p1.nowQuest[ii].id === name.Qlist[i].id) {
                                    if (p1.nowQuest[ii].clear && p1.nowQuest[ii].to === name.char) {
                                        how = "[ 완료 가능 ]"
                                        hhow = 2
                                    } else {
                                        how = "[ 진행 중 ]"
                                        hhow = 1
                                    }
                                }
                            }
                            if (yesq === 1 && nono === 0) {
                                Qli.push(name.Qlist[i].name + how)
                                Qnum.push(i)
                                Qhow.push(hhow)
                                Qid.push(name.Qlist[i].id)
                            }
                        }
                    }
                }
                minu = Qnum.length
                if (p1.nowQuest.length > 0) {
                    for (let ii = 0; ii < p1.nowQuest.length; ii++) {
                        if (p1.nowQuest[ii].to === name.char && p1.nowQuest[ii].from !== name.char) {
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
                scl();
                let Qchoice = readlineSync.keyInSelect(Qli, " > ", { cancel: "뒤로" });

                if (Qchoice > -1) {
                    scl()
                    if (Qhow[Qchoice] === 0) {
                        name.Qlist[Qnum[Qchoice]].talk()
                        scl();
                        canuQ(name.Qlist[Qnum[Qchoice]])
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

                    scl();
                }
                break;
            case 0:
                scl();
                name.bye()
                shopi--
                break;
            default:
                anitext("여기는 에러", 0.1, "c", 2);
                break;
        }

    }
    Gdata.nowtalk = ""
}
function canuQ(quest) {
    anitext("퀘스트 : " + quest.name, 0.02, "c", 1);
    br()
    anitext(quest.info, 0.02, "c", 1);
    br()
    if (quest.type === "kill" || quest.type === "killtem") {
        for (let i = 0; i < quest.needKill.length; i++) {
            anitext(quest.killtarget[i].name + " : " + quest.nowKill[i] + " / " + quest.needKill[i], 0.02, "c", 0.02);
            br()
        }
    }
    if (quest.type === "tem" || quest.type === "killtem") {
        for (let i = 0; i < quest.needtem.length; i++) {
            anitext(quest.temtarget[i].itemName + " : " + quest.nowtem[i] + " / " + quest.needtem[i], 0.02, "c", 0.02);
            br()
        }
    }
    br()
    anitext("보상 : " + quest.reward, 0.02, "c", 1);
    br()
    let ys = ["[ 수락 ]"]
    let choice = readlineSync.keyInSelect(ys, " > ", { cancel: "[ 거절 ]" }) + 1;
    switch (choice) {
        case 1:
            p1.nowQuest.push(quest)
            anitext("퀘스트를 수락했다.", 0.1, "c", 2);
            break;
        case 0:
            anitext("퀘스트를 거절했다.", 0.1, "c", 2);
            break;

        default:
            break;
    }
}

module.exports = {
    npc,
    shop,
    inn,
    npctalk,
    canuQ
}