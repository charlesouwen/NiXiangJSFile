(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-af25eed4"], {
    "03f7": function(e, t, r) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return e.getLanguageList.length > 1 ? r("div", {
                staticClass: "inner-language"
            }, e._l(e.getLanguageList, (function(t, i) {
                return r("div", {
                    key: t,
                    staticClass: "language-btn",
                    class: {
                        active: e.curVersion == t,
                        delimiter: 0 != i
                    },
                    style: {
                        "--active-color": e.getLanguageStyle.active,
                        "--auxiliary-color": e.getLanguageStyle.auxiliary
                    },
                    on: {
                        click: function(r) {
                            return e.changeLanguage(t)
                        }
                    }
                }, [e._v(" " + e._s(e._f("getLanguageText")(t)) + " ")])
            }
            )), 0) : e._e()
        }
          , n = []
          , a = r("34cb")
          , o = r("d467")
          , s = {
            name: "InnerLanguage",
            props: {
                baseData: {
                    type: Object,
                    default() {
                        return {}
                    }
                }
            },
            filters: {
                getLanguageText(e) {
                    let t = "";
                    switch (e) {
                    case "chinese":
                        t = "中";
                        break;
                    case "english":
                        t = "En";
                        break
                    }
                    return t
                }
            },
            data() {
                return {
                    mid: "",
                    curVersion: "chinese",
                    langCacheKey: ""
                }
            },
            computed: {
                getTempStyle() {
                    const {temp_style: e} = this.baseData;
                    return e || {}
                },
                getLanguageStyle() {
                    const {language_theme: e} = this.baseData;
                    return e.color || {
                        color: {
                            active: "rgba(0,153,255,1)",
                            auxiliary: "rgba(230,247,255,1)"
                        },
                        title: "",
                        type: ""
                    }
                },
                getLanguageList() {
                    const e = ["chinese", "english"]
                      , {support_languages: t} = this.baseData;
                    return t || e
                }
            },
            created() {
                const {mid: e} = this.getWmQuery;
                this.mid = e,
                this.langCacheKey = `${o["b"]}_${this.mid}`,
                this.getInitLang()
            },
            mounted() {
                const e = a["f"].cookie().get(this.langCacheKey)
                  , t = "zh-CN" == e ? "chinese" : e;
                t && (this.curVersion = t)
            },
            beforeDestroy() {},
            methods: {
                changeLanguage(e) {
                    if (this.curVersion == e)
                        return;
                    this.curVersion = e;
                    const t = "chinese" == e ? "zh-CN" : e;
                    this.$store.commit("setLanguage", t),
                    a["f"].cookie().set(this.langCacheKey, t, new Date(1 * new Date + 2592e6), "/")
                },
                getInitLang() {
                    this.$root.$emit("initPageLanguage")
                }
            }
        }
          , u = s
          , c = (r("49d3"),
        r("0c7c"))
          , l = Object(c["a"])(u, i, n, !1, null, "3fbdb119", null);
        t["a"] = l.exports
    },
    "0669": function(e, t, r) {},
    "0b7b": function(e, t, r) {},
    "18af": function(e, t, r) {
        "use strict";
        var i = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "game-frame",
                style: Object.assign({}, e.theme_color)
            }, [e._t("home", (function() {
                return ["home" === e.pageState ? [r("home", {
                    attrs: {
                        "extend-options": e.getHomeExtension
                    },
                    on: {
                        switchMusic: e.handleSwitchMusic,
                        startGame: e.handleStartGame,
                        jumpPage: e.handleSwitchPage
                    }
                })] : e._e()]
            }
            ), {
                show: "home" === e.pageState,
                switchMusic: e.handleSwitchMusic,
                jumpPage: e.handleSwitchPage
            }), e._t("playground", (function() {
                return ["playground" === e.pageState ? [r("h1", [e._v("游戏互动区")])] : e._e()]
            }
            ), {
                show: "playground" === e.pageState,
                jumpPage: e.handleSwitchPage,
                popupResult: e.handlePopupResult,
                startGame: e.handleStartGame,
                checkRank: e.handleGetRankInfo,
                gameOver: e.handleGameOver,
                switchMusic: e.handleSwitchMusic
            }), e._t("result", (function() {
                return [e.showPopupResult ? [r("result", {
                    on: {
                        jumpPage: e.handleSwitchPage,
                        showShare: e.handleShowShare
                    }
                })] : e._e()]
            }
            ), {
                show: e.showPopupResult,
                jumpPage: e.handleSwitchPage
            }), e._t("rank", (function() {
                return ["rank" === e.pageState ? [r("rank", {
                    attrs: {
                        "extend-options": e.getRankExtension
                    },
                    on: {
                        jumpPage: e.handleSwitchPage,
                        showShare: e.handleShowShare
                    }
                })] : e._e()]
            }
            ), {
                show: "rank" === e.pageState,
                jumpPage: e.handleSwitchPage
            })], 2)
        }
          , n = []
          , a = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "game-home-wrap",
                style: e.getHomeCommonStyle
            }, [e.getIsChangeLangShow ? r("language-switch", {
                attrs: {
                    "base-data": e.getBaseData
                }
            }) : e._e(), e.gameBackImg ? r("div", {
                staticClass: "bg-wrap"
            }, [r("img", {
                staticClass: "home-bg",
                class: {
                    custom: e.getCustomHomeBg
                },
                attrs: {
                    src: e.gameBackImg,
                    alt: ""
                }
            })]) : e._e(), r("div", {
                staticClass: "security-range"
            }, [!e.getCustomHomeBg && e.title ? r("div", {
                staticClass: "title-wrap"
            }, [r("img", {
                attrs: {
                    src: e.title,
                    alt: "游戏标题"
                }
            })]) : r("div"), !e.getCustomHomeBg && e.mainImg ? r("div", {
                staticClass: "main-wrap"
            }, [r("img", {
                attrs: {
                    src: e.mainImg,
                    alt: ""
                }
            })]) : e._e(), r("div", {
                staticClass: "side-wrap"
            }, [e.getIsMusicShow ? r("div", {
                staticClass: "item",
                on: {
                    click: e.handleSwitchMusic
                }
            }, [r("div", {
                staticClass: "icon-wrap"
            }, [1 == e.music_status ? r("wm-icon", {
                staticClass: "roation-music",
                attrs: {
                    size: .65,
                    unit: "rem",
                    name: "WM-yinlekai"
                }
            }) : r("wm-icon", {
                attrs: {
                    size: .65,
                    unit: "rem",
                    name: "WM-yinleguan"
                }
            })], 1), r("div", {
                staticClass: "inner-text"
            }, [e._v(" " + e._s(e.$wm_lang("音乐@-!onlineGame:music")) + " ")])]) : e._e(), r("div", {
                staticClass: "item",
                on: {
                    click: e.handleOpenRulesPopUp
                }
            }, [r("div", {
                staticClass: "icon-wrap"
            }, [r("wm-icon", {
                attrs: {
                    name: "WM-guize2",
                    size: .5,
                    unit: "rem"
                }
            })], 1), r("div", {
                staticClass: "inner-text"
            }, [e._v("规则")])]), e.getIsRankShow ? r("div", {
                staticClass: "item",
                on: {
                    click: e.handleOpenRank
                }
            }, [r("div", {
                staticClass: "icon-wrap"
            }, [r("wm-icon", {
                attrs: {
                    name: "WM-paihang",
                    size: .65,
                    unit: "rem"
                }
            })], 1), r("div", {
                staticClass: "inner-text"
            }, [e._v(" " + e._s(e.$wm_lang("排行榜@-!onlineGame:rankingList")) + " ")])]) : e._e(), e.getIsHidePrize ? e._e() : r("div", {
                staticClass: "item",
                on: {
                    click: e.handleOpenMyPrize
                }
            }, [r("div", {
                staticClass: "icon-wrap"
            }, [r("wm-icon", {
                attrs: {
                    name: "WM-liwu1",
                    size: .65,
                    unit: "rem"
                }
            })], 1), r("div", {
                staticClass: "inner-text"
            }, [e._v(" " + e._s(e.$wm_lang("我的奖品@-!common:myPrize")) + " ")])])]), r("div", {
                staticClass: "main-btn-wrap"
            }, [e.getBaseData.member_item_title && 1 == e.getBaseData.team_mode ? r("div", {
                staticClass: "team-box"
            }, [e._v(" 队名： " + e._s(e.getBaseData.member_item_title) + " ")]) : e._e(), r("div", {
                staticClass: "start-btn",
                on: {
                    click: e.handleStartGame
                }
            }, [-1 != e.getBaseData.surplus_play_num ? r("span", {
                staticClass: "tip surplus-play-num"
            }, [e._v(" x" + e._s(e.getBaseData.surplus_play_num) + " ")]) : e._e(), e.getIsTextStart ? r("div", {
                staticClass: "text-start"
            }, [e._v(" " + e._s(e.$wm_lang("开始游戏@-!onlineGame:start")) + " ")]) : r("img", {
                attrs: {
                    src: e.startBtn,
                    alt: ""
                }
            })]), -1 != e.getBaseData.surplus_play_num ? r("div", {
                staticClass: "game-task",
                on: {
                    click: function(t) {
                        e.is_show_add_game = !0
                    }
                }
            }, [r("img", {
                attrs: {
                    src: e.$require("/resource/onlinegame/task.png"),
                    alt: "领次数"
                }
            }), r("div", {
                staticClass: "text"
            }, [e._v("领次数")])]) : e._e()])]), e.rule_show ? r("rulePopUp", {
                on: {
                    close: function(t) {
                        e.rule_show = !1
                    }
                }
            }) : e._e(), r("prizeBox", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.show_prize,
                    expression: "show_prize"
                }],
                style: {
                    "--color-a": "var()",
                    "--color-b": "var()",
                    "--color-c": "var()",
                    "--color-d": "var()",
                    "--color-a-op1": "var()"
                },
                attrs: {
                    prize_setting: ["online_game"],
                    show_prize: e.show_prize,
                    mid: e.getMiniGame.mid,
                    base_data: e.getBaseData
                },
                on: {
                    close: function(t) {
                        e.show_prize = !1
                    }
                }
            }), r("van-popup", {
                attrs: {
                    "close-on-click-overlay": !1,
                    round: "",
                    position: "bottom"
                },
                model: {
                    value: e.is_show_add_game,
                    callback: function(t) {
                        e.is_show_add_game = t
                    },
                    expression: "is_show_add_game"
                }
            }, [e.is_show_add_game ? r("AddNumPop", {
                attrs: {
                    idOption: e.getIdOption,
                    optionData: e.getBaseData.award_config,
                    gameNum: e.getBaseData.surplus_play_num
                },
                on: {
                    handleCloseAdd: function(t) {
                        e.is_show_add_game = !1
                    },
                    handleOnLoadInit: function(t) {
                        return e.$root.$emit("init")
                    }
                }
            }) : e._e()], 1)], 1)
        }
          , o = []
          , s = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "rule-pop-up-wrap"
            }, [r("div", {
                staticClass: "shade"
            }), r("div", {
                staticClass: "rule-pop-up"
            }, [r("div", {
                staticClass: "result-box-tit"
            }, [e._v(" " + e._s(e.$wm_lang("游戏规则@-!onlineGame:rule")) + " ")]), r("div", {
                staticClass: "content roll-y"
            }, [e.isShowElementIntroduction ? r("div", {
                staticClass: "element-introduction"
            }, e._l(e.getElementIntroductionList, (function(t, i) {
                return r("div", {
                    staticClass: "item"
                }, [r("div", {
                    staticClass: "cover"
                }, [r("img", {
                    attrs: {
                        src: t.cover,
                        alt: ""
                    }
                })]), r("div", {
                    staticClass: "info"
                }, [r("div", {
                    staticClass: "title"
                }, [e._v(e._s(t.title))]), r("div", {
                    staticClass: "detailed"
                }, [r("div", {
                    class: {
                        "scroll-text": t.detailed.length > 13
                    }
                }, [e._v(" " + e._s(t.detailed) + " "), t.detailed.length > 13 ? [e._v(" " + e._s(t.detailed) + " ")] : e._e()], 2)])])])
            }
            )), 0) : e._e(), r("div", {
                staticClass: "rules-content",
                domProps: {
                    innerHTML: e._s(e.rulesContent)
                }
            })]), r("div", {
                staticClass: "bottom-close",
                on: {
                    click: function(t) {
                        return e.$emit("close")
                    }
                }
            }, [r("svg", {
                attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    viewBox: "0 0 54 54",
                    width: "0.54rem",
                    height: "0.54rem"
                }
            }, [r("path", {
                attrs: {
                    "fill-rule": "evenodd",
                    "stroke-width": "2px",
                    fill: "var(--color-a)",
                    d: "M8.999,0.999 L44.999,0.999 C49.418,0.999 52.999,4.581 52.999,8.999 L52.999,44.999 C52.999,49.418 49.418,52.999 44.999,52.999 L8.999,52.999 C4.580,52.999 0.999,49.418 0.999,44.999 L0.999,8.999 C0.999,4.581 4.580,0.999 8.999,0.999 Z"
                }
            }), r("path", {
                attrs: {
                    "fill-rule": "evenodd",
                    fill: "var(--color-c)",
                    d: "M32.656,26.999 L41.141,35.485 C42.703,37.47 42.703,39.579 41.141,41.142 C39.579,42.704 37.46,42.704 35.484,41.142 L26.999,32.656 L18.514,41.142 C16.952,42.704 14.419,42.704 12.857,41.142 C11.295,39.579 11.295,37.47 12.857,35.485 L21.342,26.999 L12.857,18.514 C11.295,16.952 11.295,14.419 12.857,12.857 C14.419,11.295 16.952,11.295 18.514,12.857 L26.999,21.342 L35.484,12.857 C37.46,11.295 39.579,11.295 41.141,12.857 C42.703,14.419 42.703,16.952 41.141,18.514 L32.656,26.999 Z"
                }
            })])])])])
        }
          , u = []
          , c = r("e9e7")
          , l = {
            name: "RulePopUp",
            components: {},
            filters: {},
            mixins: [c["b"]],
            props: {},
            data() {
                return {}
            },
            computed: {
                rulesContent() {
                    return this.getBaseData.role_text
                },
                isShowElementIntroduction() {
                    return this.getElementIntroductionList && this.getElementIntroductionList.length > 0
                }
            },
            watch: {},
            beforeCreate() {},
            created() {},
            beforeMount() {},
            mounted() {},
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {}
        }
          , h = l
          , m = (r("9f6c"),
        r("0c7c"))
          , d = Object(m["a"])(h, s, u, !1, null, "3a62c856", null)
          , p = d.exports
          , g = r("8be7")
          , f = r("d6d2")
          , _ = r("03f7")
          , w = {
            name: "GameHome",
            components: {
                rulePopUp: p,
                prizeBox: g["default"],
                AddNumPop: f["a"],
                languageSwitch: _["a"]
            },
            filters: {},
            mixins: [],
            props: {
                surplusPlayNum: {
                    default: 5
                },
                extendOptions: {
                    type: Object,
                    default() {
                        return {}
                    }
                }
            },
            data() {
                return {
                    rule_show: !1,
                    show_prize: !1,
                    is_show_add_game: !1
                }
            },
            computed: {
                getIsChangeLangShow() {
                    if (!this.getBaseData)
                        return !1;
                    const e = [7, 8]
                      , {support_languages: t, temp_no: r} = this.getBaseData;
                    return !!e.includes(1 * r)
                },
                getIsRankShow() {
                    const {is_hide_ranking: e=0} = this.getBaseData;
                    return 0 == e
                },
                music_status() {
                    return this.$store.state.mini_game.music_status
                },
                getMiniGame() {
                    return this.$store.state.mini_game
                },
                getBaseData() {
                    return this.$store.state.mini_game.base_data
                },
                getTempStyle() {
                    return this.getBaseData.temp_style || {}
                },
                getIdOption() {
                    return {
                        startGameTimer: null,
                        mid: this.getMiniGame.mid,
                        use_type: this.getMiniGame.use_type,
                        game_id: this.getBaseData.game_id,
                        shareId: this.getBaseData.share_task_id
                    }
                },
                getCustomHomeBg() {
                    const {homeBg: e} = this.extendOptions;
                    return e || ""
                },
                gameBackImg() {
                    return this.getCustomHomeBg || this.getBaseData.mobile_bg || this.getTempStyle.mobile_bg
                },
                title() {
                    return this.extendOptions.titleImg || this.getTempStyle.title_img || this.getTempStyle.titleImg
                },
                mainImg() {
                    return this.extendOptions.mainImg || this.getTempStyle.player || this.getTempStyle.innerMid || this.getTempStyle.rake || ""
                },
                startBtn() {
                    return this.extendOptions.startImg || this.getTempStyle.start_game || this.getTempStyle.start_btn || this.getTempStyle.startBtn
                },
                getIsHidePrize() {
                    const {win_type: e, final_win_type: t} = this.getBaseData;
                    return 0 == e && 0 == t
                },
                getGameType() {
                    const {gameType: e=""} = this.extendOptions;
                    return e
                },
                getIsMusicShow() {
                    const {isMusicShow: e=!0} = this.extendOptions;
                    return e
                },
                getIsTextStart() {
                    const {isTextStart: e=!1} = this.extendOptions;
                    return e
                },
                getHomeCommonStyle() {
                    const {commonStyle: e={}} = this.extendOptions;
                    return e
                }
            },
            watch: {},
            beforeCreate() {},
            created() {},
            beforeMount() {},
            mounted() {
                sessionStorage.getItem("show-rules-pop-up") || this.handleOpenRulesPopUp()
            },
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {
                handleSwitchMusic() {
                    this.$emit("switchMusic")
                },
                handleOpenRulesPopUp() {
                    sessionStorage.setItem("show-rules-pop-up", "1"),
                    this.rule_show = !0
                },
                handleOpenRank() {
                    this.$emit("jumpPage", "rank")
                },
                handleOpenMyPrize() {
                    this.show_prize = !0
                },
                handleStartGame() {
                    const {isCheckAuth: e} = this.extendOptions;
                    e && this.$wm_common.checkAuth("user"),
                    0 != this.getBaseData.surplus_play_num ? this.$emit("startGame") : t_warning("已经没有剩余次数")
                }
            }
        }
          , v = w
          , y = (r("6d53"),
        Object(m["a"])(v, a, o, !1, null, "657ff29f", null))
          , b = y.exports
          , k = function() {
            var e = this
              , t = e.$createElement
              , i = e._self._c || t;
            return i("div", {
                staticClass: "game-rank-wrap"
            }, [i("div", {
                staticClass: "result_container"
            }, [i("div", [i("div", {
                staticClass: "rusult-page-bg"
            }), i("prize-box", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.show_prize,
                    expression: "show_prize"
                }],
                style: {
                    "--color-a": "var()",
                    "--color-b": "var()",
                    "--color-c": "var()",
                    "--color-d": "var()",
                    "--color-a-op1": "var()"
                },
                attrs: {
                    prize_setting: e.prize_setting,
                    show_prize: e.show_prize,
                    mid: e.getMiniGame.mid,
                    base_data: e.getBaseData
                },
                on: {
                    close: function(t) {
                        e.show_prize = !1
                    }
                }
            }), e.getIsHidePrize ? e._e() : i("div", {
                staticClass: "start-before-right-fix",
                on: {
                    click: function(t) {
                        e.show_prize = !0
                    }
                }
            }, [e.getIsHidePrize ? e._e() : i("div", {
                staticClass: "start-music",
                on: {
                    click: function(t) {
                        e.show_prize = !0
                    }
                }
            }, [i("div", {
                staticClass: "start-left-top-box"
            }, [i("wm-icon", {
                staticStyle: {
                    color: "var(--color-b)",
                    "margin-top": "0.07rem"
                },
                attrs: {
                    name: "WM-liwu1",
                    size: .65,
                    unit: "rem"
                }
            })], 1), i("div", {
                staticClass: "right-top-font"
            }, [e._v("我的奖品")])])]), i("div", {
                staticClass: "back"
            }, [i("p", {
                staticClass: "text",
                on: {
                    click: e.reload
                }
            }, [i("wm-icon", {
                staticStyle: {
                    color: "var(--color-d)",
                    "margin-right": "0.1rem"
                },
                attrs: {
                    name: "WM-home",
                    size: .32,
                    unit: "rem"
                }
            }), e._v(" " + e._s(e.$wm_lang("返回@-!common:homePage")) + " ")], 1), 0 != e.getBaseData.open_win_time && 1 != e.getBaseData.ranking_win_trigger_mode ? i("p", {
                staticClass: "time"
            }, [e._v(" " + e._s(e.$wm_lang("游戏截止时间@-!common:deadline")) + "：" + e._s(e.getTransformTime(e.getBaseData.open_win_time)) + " ")]) : e._e()]), i("div", {
                staticClass: "title"
            }, [i("div", {
                staticClass: "rank"
            }, [e._v(e._s(e.$wm_lang("名次@-!common:ranking")))]), i("div", {
                staticClass: "name"
            }, [e._v(" " + e._s(0 == e.getBaseData.team_mode ? e.$wm_lang("昵称@-!common:nickname") : e.$wm_lang("组别@-!common:nickname")) + " ")]), i("div", {
                staticClass: "ss"
            }, [e._v(" " + e._s(1 == e.getBaseData.team_mode ? "团队平均分" : e.$wm_lang("游戏得分@-!quiz:score")) + " ")]), i("div", {
                staticClass: "time"
            }, [e._v(" " + e._s(0 == e.getBaseData.team_mode ? e.$wm_lang("时间@-!quiz:elapsedTime") : "组内分数") + " ")])]), i("div", {
                staticClass: "rank-box",
                style: {
                    paddingBottom: !e.getFooterIsHide && e.getFooterBarIsHide ? "30%" : ""
                }
            }, [e._l(e.rank_list, (function(t, n) {
                return i("div", {
                    key: n
                }, [e._t("rankItem", (function() {
                    return [[i("div", {
                        staticClass: "item-li"
                    }, [i("div", {
                        staticClass: "rank item",
                        style: 1 == e.getBaseData.team_mode ? "padding-right: 0.2rem;box-sizing: border-box;" : ""
                    }, [n < 3 ? i("img", {
                        attrs: {
                            src: r("4bfe")("./icon-" + (n + 1) + ".png"),
                            alt: ""
                        }
                    }) : i("span", [e._v(e._s(n + 1))])]), i("div", {
                        staticClass: "name item",
                        style: 1 == e.getBaseData.team_mode ? "padding-right: 0.2rem;box-sizing: border-box;text-align: center;" : ""
                    }, [0 == e.getBaseData.team_mode ? i("div", {
                        staticStyle: {
                            display: "flex",
                            "align-items": "center"
                        }
                    }, [i("img", {
                        attrs: {
                            src: e._f("imgCompression")(t.avatar, {
                                type: "avatar",
                                size: "x-small"
                            }),
                            alt: ""
                        }
                    }), i("span", {
                        directives: [{
                            name: "vmscroll",
                            rawName: "v-vmscroll",
                            value: t.name,
                            expression: "item.name"
                        }],
                        staticStyle: {
                            width: "1.5rem",
                            display: "inline-block",
                            "margin-left": "0.1rem"
                        }
                    })]) : e._e(), 1 == e.getBaseData.team_mode ? i("span", {
                        staticStyle: {
                            "font-size": "0.24rem"
                        }
                    }, [e._v(" " + e._s(t.item_title) + " ")]) : e._e()]), 0 == e.getBaseData.team_mode ? i("div", {
                        staticClass: "ss item"
                    }, ["puzzle" === e.getGameType ? i("span", {
                        staticClass: "score"
                    }, [e._v(" " + e._s(t.score) + e._s(e.$wm_lang("关@-!common:level")) + " | " + e._s(t.asc_score) + e._s(e.$wm_lang("秒@-!common:seconds")) + " ")]) : i("span", {
                        staticClass: "score"
                    }, [e._v(e._s(t.score) + "分")])]) : e._e(), 1 == e.getBaseData.team_mode ? i("div", {
                        staticClass: "ss item",
                        style: 1 == e.getBaseData.team_mode ? "padding-right: 0.2rem;box-sizing: border-box;" : ""
                    }, [e._v(" " + e._s(Math.floor(t.max_score)) + "分 ")]) : e._e(), 1 == e.getBaseData.team_mode ? i("div", {
                        staticClass: "time item",
                        style: 1 == e.getBaseData.team_mode ? "padding-right: 0.2rem;box-sizing: border-box;" : "",
                        on: {
                            click: function(r) {
                                return e.doShowGroupList(t.item_id)
                            }
                        }
                    }, [i("wm-icon", {
                        staticStyle: {
                            color: "var(--color-a)"
                        },
                        attrs: {
                            name: "WM-file-text",
                            size: .48,
                            unit: "rem"
                        }
                    })], 1) : e._e(), 0 == e.getBaseData.team_mode ? i("div", {
                        staticClass: "time item",
                        class: !e.isOutLimitTime && "prize-name",
                        staticStyle: {
                            height: "0.64rem",
                            "line-height": "0.35rem"
                        }
                    }, [e._v(" " + e._s(e._f("timeFormat")(t.max_score_time)) + " ")]) : e._e()])]]
                }
                ), {
                    row: t,
                    index: n
                })], 2)
            }
            )), e.rank_own && e.rank_own.current_rank_no > 0 ? i("div", {
                staticClass: "item-li own",
                style: {
                    bottom: !e.getFooterIsHide && e.getFooterBarIsHide ? "bottom:60px" : ""
                }
            }, [i("div", {
                staticClass: "own-tag"
            }, [e._v("我的成绩")]), 1 == e.getBaseData.team_mode ? i("div", {
                staticClass: "rank-own-item"
            }, [e._v(" 组内排名 "), i("div", {
                staticClass: "rank-own-item-num"
            }, [e._v(" " + e._s(e.rank_own.current_rank_no) + " ")])]) : e._e(), 1 == e.getBaseData.team_mode ? i("div", {
                staticClass: "rank-own-item"
            }, [e._v(" " + e._s(e.$wm_lang("游戏得分@-!quiz:score")) + " "), i("div", {
                staticClass: "rank-own-item-num"
            }, [e._v(e._s(e.rank_own.score))])]) : e._e(), e.rank_own.current_rank_no > 0 && 0 == e.getBaseData.team_mode ? i("div", {
                staticClass: "rank item"
            }, [e.rank_own.current_rank_no <= 3 ? i("img", {
                attrs: {
                    src: r("4bfe")("./icon-" + e.rank_own.current_rank_no + ".png"),
                    alt: ""
                }
            }) : i("span", [e._v(e._s(e.rank_own.current_rank_no))])]) : e._e(), 0 == e.getBaseData.team_mode ? i("div", {
                staticClass: "name item"
            }, [i("img", {
                attrs: {
                    src: e._f("imgCompression")(e.rank_own.avatar, {
                        type: "avatar",
                        size: "x-small"
                    }),
                    alt: ""
                }
            }), e._v(" " + e._s(e.rank_own.name) + " ")]) : e._e(), 0 == e.getBaseData.team_mode ? i("div", {
                staticClass: "ss item"
            }, ["puzzle" === e.getGameType ? i("span", {
                staticClass: "score"
            }, [e._v(" " + e._s(e.rank_own.score) + e._s(e.$wm_lang("关@-!common:level")) + " | " + e._s(e.rank_own.asc_score) + e._s(e.$wm_lang("秒@-!common:seconds")) + " ")]) : i("span", {
                staticClass: "score"
            }, [e._v(e._s(e.rank_own.score) + "分")])]) : e._e(), 1 == e.getBaseData.poster_on_flg ? i("div", {
                staticClass: "time item",
                staticStyle: {
                    "line-height": "1.5",
                    "font-size": "0.2rem"
                },
                on: {
                    click: e.showShare
                }
            }, [i("wm-icon", {
                staticStyle: {
                    color: "var(--color-d)"
                },
                attrs: {
                    name: "WM-share-1",
                    size: .32,
                    unit: "rem"
                }
            }), i("br"), e._v(e._s(e.$wm_lang("炫耀一下@-!common:showOff")) + " ")], 1) : i("div", {
                staticClass: "time item"
            })]) : e._e()], 2)], 1), e.isShowGroupList ? i("div", {
                staticClass: "group-list-pop"
            }, [i("div", {
                staticClass: "group-list-box"
            }, [i("div", {
                staticClass: "title"
            }, [i("div", {
                staticClass: "rank"
            }, [e._v(e._s(e.$wm_lang("名次@-!common:ranking")))]), i("div", {
                staticClass: "name"
            }, [e._v(e._s(e.$wm_lang("昵称@-!common:nickname")))]), i("div", {
                staticClass: "ss"
            }, [e._v("游戏得分")]), i("div", {
                staticClass: "time"
            }, [e._v(e._s(e.$wm_lang("时间@-!quiz:elapsedTime")))])]), i("div", {
                staticClass: "rank-box"
            }, e._l(e.group_rank_list, (function(t, n) {
                return i("div", {
                    key: n,
                    staticClass: "item-li"
                }, [i("div", {
                    staticClass: "rank item"
                }, [n < 3 ? i("img", {
                    attrs: {
                        src: r("4bfe")("./icon-" + (n + 1) + ".png"),
                        alt: ""
                    }
                }) : i("span", [e._v(e._s(n + 1))])]), i("div", {
                    staticClass: "name item"
                }, [i("img", {
                    attrs: {
                        src: e._f("imgCompression")(t.avatar, {
                            type: "avatar",
                            size: "x-small"
                        }),
                        alt: ""
                    }
                }), e._v(" " + e._s(t.name) + " ")]), i("div", {
                    staticClass: "ss item"
                }, [e._v(e._s(t.score) + "分")]), i("div", {
                    staticClass: "time item",
                    class: !e.isOutLimitTime && "prize-name",
                    staticStyle: {
                        height: "0.64rem",
                        "line-height": "0.35rem"
                    }
                }, [e._v(" " + e._s(e._f("timeFormat")(t.max_score_time)) + " ")])])
            }
            )), 0), i("wm-icon", {
                staticClass: "group-close-btn",
                staticStyle: {
                    color: "var(--color-b)"
                },
                attrs: {
                    name: "WM-close",
                    size: .7,
                    unit: "rem"
                },
                on: {
                    click: e.doCloseGroupList
                }
            })], 1)]) : e._e()])])
        }
          , S = []
          , x = r("34cb")
          , C = {
            name: "GameRank",
            components: {
                prizeBox: g["default"]
            },
            filters: {
                timeFormat(e) {
                    return x["f"].date(1e3 * e).format("YYYY.MM.dd HH:mm")
                }
            },
            mixins: [c["b"]],
            props: {
                extendOptions: {
                    type: Object,
                    default() {
                        return {}
                    }
                }
            },
            data() {
                return {
                    group_rank_list: [],
                    prize_setting: ["online_game"],
                    rank_list: [],
                    rank_own: {},
                    show_prize: !1,
                    isShowGroupList: !1,
                    posterOption: {
                        mid: "",
                        use_type: "",
                        select_id: "",
                        poster_value_data: null,
                        sub_type: ""
                    }
                }
            },
            computed: {
                getGameType() {
                    const {gameType: e=""} = this.extendOptions;
                    return e
                },
                getFooterBarIsHide() {
                    return this.$store.state.footer_data.footer_bar_is_hide
                },
                getFooterIsHide() {
                    return this.$store.state.footer_data.footer_is_hide
                },
                isOutLimitTime() {
                    return 0 == this.getBaseData.open_win_time || 0 == this.end_flg
                },
                getIsHidePrize() {
                    return !0
                }
            },
            watch: {},
            beforeCreate() {},
            created() {},
            beforeMount() {},
            mounted() {
                this.getRankListData()
            },
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {
                getRankListData() {
                    let e = "getRankList";
                    1 == this.getBaseData.team_mode && (e = "getTeamRankList");
                    const t = {
                        mid: this.getMiniGame.mid,
                        use_type: 1001,
                        game_id: this.getBaseData.game_id
                    };
                    window.api.mobile_game[e](t).then(e => {
                        0 == e.error_code ? (this.end_flg = e.data.end_flg,
                        this.rank_list = e.data.list || []) : this.$wm_common.handleResCode(e),
                        this.getOwnRank()
                    }
                    )
                },
                doCloseGroupList() {
                    this.isShowGroupList = !1
                },
                doShowGroupList(e) {
                    this.isShowGroupList = !0,
                    this.group_rank_list = [];
                    const {game_id: t} = this.getBaseData
                      , r = {
                        mid: this.$route.query.mid,
                        use_type: 1001,
                        game_id: t,
                        item_id: e
                    };
                    window.api.mobile_game.getRankList(r).then(e => {
                        0 == e.error_code && (this.group_rank_list = e.data.list || [])
                    }
                    )
                },
                getTransformTime(e) {
                    let t = new Date(1e3 * e)
                      , r = t.getFullYear().toString()
                      , i = (t.getMonth() + 1).toString().padStart(2, "0")
                      , n = t.getDate().toString().padStart(2, "0")
                      , a = t.getHours().toString().padStart(2, "0")
                      , o = t.getMinutes().toString().padStart(2, "0");
                    return `${r}.${i}.${n}   ${a}:${o}`
                },
                showShare() {
                    this.$emit("showShare")
                },
                getOwnRank() {
                    const {game_id: e} = this.getBaseData
                      , t = {
                        mid: this.$route.query.mid,
                        use_type: 1001,
                        game_id: e,
                        team_mode: this.getBaseData.team_mode
                    };
                    window.api.mobile_game.getRankInfo(t).then(e => {
                        0 == e.error_code ? (this.rank_own = e.data || {},
                        this.$store.commit("mini_game/SET_OWN_RANK_INFO", e.data)) : this.$wm_common.handleResCode(e)
                    }
                    )
                },
                reload() {
                    this.$emit("jumpPage", "home")
                }
            }
        }
          , $ = C
          , T = (r("f108"),
        Object(m["a"])($, k, S, !1, null, "55ede03e", null))
          , L = T.exports
          , O = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "game-result-wrap"
            }, [r("div", {
                staticClass: "result-box"
            }, [r("div", {
                staticClass: "result-box-tit"
            }, [e._v("游戏结束")]), r("div", {
                staticClass: "result-content"
            }, [r("div", {
                staticClass: "rusult-avatar"
            }, [r("img", {
                attrs: {
                    src: e.getBaseData.avatar,
                    alt: ""
                }
            })]), r("div", {
                staticClass: "result-con-intro"
            }, [e._v(" " + e._s(e.getBaseData.name) + " ")])]), r("div", {
                staticClass: "grown-item"
            }, [r("div", {
                staticClass: "grown-text"
            }, [r("div", [e._v(" " + e._s(e.getBaseData.member_item_title && 1 == e.getBaseData.team_mode ? e.getBaseData.member_item_title : "目前名次") + " ")]), r("span", {
                staticStyle: {
                    "font-weight": "700",
                    "margin-left": "0.1rem",
                    "font-size": "0.96rem"
                }
            }, [e._v(" " + e._s(e.getRankInfo.current_rank_no) + " ")]), e._v("名 ")])]), r("div", {
                staticClass: "prize-grade-item",
                staticStyle: {
                    "margin-bottom": "0.1rem"
                }
            }, [r("div", {
                staticStyle: {
                    color: "var(--color-a)"
                }
            }, [e._v("我的得分")]), r("div", {
                staticStyle: {
                    color: "var(--color-a)",
                    "font-weight": "700"
                }
            }, [e._v(" " + e._s(e.getMyScore) + " ")])]), r("div", {
                staticClass: "result-page-bottom"
            }, [1 != e.getBaseData.is_hide_ranking ? r("div", {
                staticClass: "bottom-btn-left",
                on: {
                    click: e.handleToRank
                }
            }, [e._v(" 查看排行 ")]) : e._e(), 1 == e.getBaseData.poster_on_flg ? r("div", {
                staticClass: "bottom-btn-right",
                on: {
                    click: e.handleDoShare
                }
            }, [e._v(" 炫耀一下 ")]) : e._e()]), r("div", {
                staticClass: "bottom-close",
                on: {
                    click: e.handleToHome
                }
            }, [r("wm-icon", {
                staticStyle: {
                    color: "var(--color-c)",
                    "margin-bottom": "0.05rem"
                },
                attrs: {
                    name: "WM-home",
                    size: .5,
                    unit: "rem"
                }
            })], 1)])])
        }
          , q = []
          , B = {
            name: "GameResult",
            components: {},
            filters: {},
            mixins: [c["b"]],
            props: {},
            data() {
                return {}
            },
            computed: {
                getMyScore() {
                    const {score_config: e={}} = this.getMiniGame;
                    return e.score || 0
                }
            },
            watch: {},
            beforeCreate() {},
            created() {},
            beforeMount() {},
            mounted() {},
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {
                handleToHome() {
                    this.$emit("jumpPage", "home")
                },
                handleToRank() {
                    this.$emit("jumpPage", "rank")
                },
                handleDoShare() {
                    this.showPoster()
                },
                showPoster() {
                    this.$emit("showShare")
                }
            }
        }
          , R = B
          , M = (r("c0f3"),
        Object(m["a"])(R, O, q, !1, null, "62af09ef", null))
          , j = M.exports
          , z = r("d182")
          , I = {
            name: "GameFrame",
            components: {
                home: b,
                rank: L,
                result: j
            },
            filters: {},
            mixins: [c["b"]],
            props: {
                extendOptions: {
                    type: Object,
                    default() {
                        return {}
                    }
                }
            },
            data() {
                return {
                    showPopupResult: !1,
                    prizeResultTimer: null,
                    index_djs: 0,
                    posterOption: {
                        mid: "",
                        use_type: "",
                        select_id: "",
                        poster_value_data: null,
                        sub_type: "",
                        template_id: "",
                        member_id: ""
                    }
                }
            },
            computed: {
                pageState() {
                    return this.$store.state.mini_game.pageState
                },
                getHomeExtension() {
                    const {home: e={}} = this.extendOptions;
                    return e
                },
                getRankExtension() {
                    const {rank: e={}} = this.extendOptions;
                    return e
                }
            },
            watch: {},
            beforeCreate() {},
            created() {
                this.handleInitPoster(),
                window.localStorage.getItem("isShareFriend") && this.handleShowShare()
            },
            beforeMount() {},
            mounted() {
                window.localStorage.removeItem("isShareFriend")
            },
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {
                this.$store.state.mini_game.pageState = "home"
            },
            methods: {
                handleShowShare() {
                    if (this.getRankInfo) {
                        const {score: e, current_rank_no: t, team_rank_no: r, team_score: i, asc_score: n} = this.getRankInfo;
                        this.posterOption.poster_value_data = {
                            online_game_score: e,
                            online_game_rank: t,
                            game_id: this.getBaseData.game_id
                        },
                        r && (this.posterOption.poster_value_data.online_game_team_rank = r),
                        i && (this.posterOption.poster_value_data.online_game_team_score = Math.floor(i)),
                        n && (this.posterOption.poster_value_data.online_game_asc_score = n)
                    } else
                        this.posterOption.poster_value_data = {
                            game_id: this.getBaseData.game_id
                        };
                    const {poster: e=null} = this.getExtensionConfig;
                    e && Object.assign(this.posterOption.poster_value_data, e);
                    const t = {
                        mid: this.getMiniGame.mid,
                        posterData: this.posterOption
                    };
                    this.$wm_common.sharePoster(t)
                },
                handleInitPoster() {
                    this.posterOption.mid = this.getMiniGame.mid;
                    const {poster_config: e={}} = this.getBaseData;
                    this.posterOption = Object.assign(this.posterOption, e)
                },
                handleSwitchMusic() {
                    this.$parent.$emit("toggle", this.music_status ? 0 : 1)
                },
                handlePopupResult() {
                    this.showPopupResult = !0
                },
                handleSwitchPage(e) {
                    this.showPopupResult = !1;
                    const {show_footer_flg: t} = this.getBaseData;
                    switch (e) {
                    case "home":
                        this.$root.$emit("replay"),
                        1 == t && this.$root.$emit("footerShow", !0),
                        this.$store.state.mini_game.pageState = e;
                        break;
                    case "playground":
                    case "rank":
                        this.$root.$emit("footerShow", !1),
                        this.$store.state.mini_game.pageState = e;
                        break;
                    case "result":
                        1 == t && this.$root.$emit("footerShow", !0),
                        this.$store.state.mini_game.pageState = e;
                        break;
                    default:
                        break
                    }
                },
                handleStartGame() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (this.$store.commit("mini_game/SET_RESULT_SCORE", {
                        score: 0
                    }),
                    0 != this.getBaseData.surplus_play_num) {
                        const t = {
                            mid: this.getMiniGame.mid,
                            game_id: this.getBaseData.game_id
                        };
                        window.api.mobile_game.startGame(t).then(t => {
                            const {successCallback: r, failCallback: i} = e;
                            0 == t.error_code ? (this.$store.state.mini_game.result_token = t.data.result_token,
                            r && r(),
                            this.handleSwitchPage("playground")) : (this.$wm_common.handleResCode(t),
                            i && i())
                        }
                        )
                    } else
                        this.handleSwitchPage("home"),
                        t_warning("已经没有剩余次数")
                },
                handleGameOver() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , {score: t=0, asc_time: r=0, action_data: i, extensions: n={}} = e;
                    i && this.handleUploadResultTrace(e),
                    this.$store.commit("mini_game/SET_RESULT_SCORE", {
                        score: t
                    });
                    const a = Date.now()
                      , {token: o, wsq: s, game_id: u} = this.getBaseData
                      , c = `score::${t}${o}timestamp::${a}::${r}`
                      , {gameOverConfig: l={}} = n
                      , {params: h={}, successCallback: m=null} = l
                      , d = {
                        mid: this.getMiniGame.mid,
                        use_type: this.getMiniGame.use_type,
                        score: t,
                        timestamp: a,
                        wsq: s,
                        sign: Object(z["a"])(c),
                        game_id: u,
                        result_token: this.getMiniGame.result_token,
                        ...h
                    }
                    console.log("Token:", o);
                    console.log("Sign:", Object(z["a"])(c));
                    window.api.mobile_game.uploadResult(d).then(e => {
                        this.handleGetRankInfo(),
                        0 == e.error_code ? m && m(e.data) : 2 == e.error_code ? this.handleGetPrizeResultIsReady(n) : window.t_warning(e.msg)
                    }
                    )
                },
                handleUploadResultTrace(e) {
                    let {score: t=0, asc_time: r=0, start_time: i=(new Date).getTime(), action_data: n} = e;
                    const {token: a, game_id: o, temp_no: s} = this.getBaseData;
                    let u = Object(z["a"])(`score::${t}${a}timestamp::100::${r}`);
                    window.api.mobile_game.uploadResultTrace({
                        mid: this.getMiniGame.mid,
                        game_id: o,
                        score: t,
                        asc_time: r,
                        start_time: i,
                        timestamp: (new Date).getTime(),
                        trace_data: JSON.stringify(n),
                        sign: u
                    }).then(e => {
                        0 == e.error_code || t_warning(e.msg || "结果出错")
                    }
                    )
                },
                handleGetRankInfo() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const t = {
                        mid: this.getMiniGame.mid,
                        use_type: this.getMiniGame.use_type,
                        game_id: this.getBaseData.game_id
                    };
                    window.api.mobile_game.getRankInfo(t).then(t => {
                        const {successCallback: r, failCallback: i} = e;
                        0 == t.error_code ? (this.$store.commit("mini_game/SET_OWN_RANK_INFO", t.data),
                        r && r(t.data)) : (i && i(),
                        this.$wm_common.handleResCode(t))
                    }
                    )
                },
                handleGetPrizeResultIsReady() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const {resultReadyConfig: t={}} = e
                      , {params: r={}, successCallback: i=null} = t
                      , n = {
                        mid: this.getMiniGame.mid,
                        use_type: this.getMiniGame.use_type,
                        game_id: this.getBaseData.game_id
                    };
                    this.index_djs++,
                    window.api.mobile_game.getPrizeResultIsReady(n).then(e => {
                        if (0 == e.error_code)
                            if (0 == e.data.is_ready) {
                                if (this.index_djs >= 10)
                                    return clearTimeout(this.prizeResultTimer),
                                    this.prizeResultTimer = null,
                                    void window.t_alert("网络异常，请稍后再试");
                                this.prizeResultTimer = setTimeout(this.handleGetPrizeResultIsReady, 500)
                            } else {
                                clearTimeout(this.prizeResultTimer),
                                this.prizeResultTimer = null;
                                let {batch_id: t} = e.data;
                                t || 0 == t || (t = ""),
                                i && i(Object.assign({}, e.data, {
                                    batch_id: t
                                })),
                                this.$resultpage.init({
                                    mid: this.getMiniGame.mid,
                                    batch_id: t,
                                    temp_no: this.getBaseData.temp_no,
                                    module_type: 22,
                                    type: "tug",
                                    is_winner: !0
                                })
                            }
                        else
                            e.error_code
                    }
                    )
                }
            }
        }
          , D = I
          , E = (r("494e"),
        Object(m["a"])(D, i, n, !1, null, "fb88f4c4", null));
        t["a"] = E.exports
    },
    2433: function(e, t, r) {
        "use strict";
        r("fae4")
    },
    "35eb": function(e, t, r) {
        "use strict";
        r.d(t, "a", (function() {
            return i
        }
        )),
        r.d(t, "b", (function() {
            return Cr
        }
        )),
        r.d(t, "c", (function() {
            return ri
        }
        ));
        var i = {};
        r.r(i),
        r.d(i, "reversed", (function() {
            return ce
        }
        )),
        r.d(i, "mirrored", (function() {
            return le
        }
        )),
        r.d(i, "createReversedEasing", (function() {
            return he
        }
        )),
        r.d(i, "createMirroredEasing", (function() {
            return me
        }
        )),
        r.d(i, "createExpoIn", (function() {
            return de
        }
        )),
        r.d(i, "createBackIn", (function() {
            return pe
        }
        )),
        r.d(i, "createAnticipateEasing", (function() {
            return ge
        }
        )),
        r.d(i, "linear", (function() {
            return fe
        }
        )),
        r.d(i, "easeIn", (function() {
            return _e
        }
        )),
        r.d(i, "easeOut", (function() {
            return we
        }
        )),
        r.d(i, "easeInOut", (function() {
            return ve
        }
        )),
        r.d(i, "circIn", (function() {
            return ye
        }
        )),
        r.d(i, "circOut", (function() {
            return be
        }
        )),
        r.d(i, "circInOut", (function() {
            return ke
        }
        )),
        r.d(i, "backIn", (function() {
            return Se
        }
        )),
        r.d(i, "backOut", (function() {
            return xe
        }
        )),
        r.d(i, "backInOut", (function() {
            return Ce
        }
        )),
        r.d(i, "anticipate", (function() {
            return $e
        }
        )),
        r.d(i, "bounceOut", (function() {
            return Me
        }
        )),
        r.d(i, "bounceIn", (function() {
            return je
        }
        )),
        r.d(i, "bounceInOut", (function() {
            return ze
        }
        )),
        r.d(i, "cubicBezier", (function() {
            return Xe
        }
        ));
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var n = function(e, t) {
            return n = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var r in t)
                    t.hasOwnProperty(r) && (e[r] = t[r])
            }
            ,
            n(e, t)
        };
        function a(e, t) {
            function r() {
                this.constructor = e
            }
            n(e, t),
            e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
            new r)
        }
        var o = function() {
            return o = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r],
                    t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ,
            o.apply(this, arguments)
        };
        function s(e, t) {
            var r = {};
            for (var i in e)
                Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
            if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
                var n = 0;
                for (i = Object.getOwnPropertySymbols(e); n < i.length; n++)
                    t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n]) && (r[i[n]] = e[i[n]])
            }
            return r
        }
        function u() {
            for (var e = 0, t = 0, r = arguments.length; t < r; t++)
                e += arguments[t].length;
            var i = Array(e)
              , n = 0;
            for (t = 0; t < r; t++)
                for (var a = arguments[t], o = 0, s = a.length; o < s; o++,
                n++)
                    i[n] = a[o];
            return i
        }
        var c = function(e, t) {
            return function(r) {
                return Math.max(Math.min(r, t), e)
            }
        }
          , l = function(e) {
            return e % 1 ? Number(e.toFixed(5)) : e
        }
          , h = /(-)?(\d[\d\.]*)/g
          , m = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi
          , d = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i
          , p = {
            test: function(e) {
                return "number" === typeof e
            },
            parse: parseFloat,
            transform: function(e) {
                return e
            }
        }
          , g = o(o({}, p), {
            transform: c(0, 1)
        })
          , f = o(o({}, p), {
            default: 1
        })
          , _ = function(e) {
            return {
                test: function(t) {
                    return "string" === typeof t && t.endsWith(e) && 1 === t.split(" ").length
                },
                parse: parseFloat,
                transform: function(t) {
                    return "" + t + e
                }
            }
        }
          , w = _("deg")
          , v = _("%")
          , y = _("px")
          , b = _("vh")
          , k = _("vw")
          , S = o(o({}, v), {
            parse: function(e) {
                return v.parse(e) / 100
            },
            transform: function(e) {
                return v.transform(100 * e)
            }
        })
          , x = function(e) {
            return e.substring(e.indexOf("(") + 1, e.lastIndexOf(")"))
        }
          , C = c(0, 255)
          , $ = function(e) {
            return void 0 !== e.red
        }
          , T = function(e) {
            return void 0 !== e.hue
        };
        function L(e) {
            return x(e).replace(/(,|\/)/g, " ").split(/ \s*/)
        }
        var O = function(e) {
            return function(t) {
                if ("string" !== typeof t)
                    return t;
                for (var r = {}, i = L(t), n = 0; n < 4; n++)
                    r[e[n]] = void 0 !== i[n] ? parseFloat(i[n]) : 1;
                return r
            }
        }
          , q = function(e) {
            var t = e.red
              , r = e.green
              , i = e.blue
              , n = e.alpha
              , a = void 0 === n ? 1 : n;
            return "rgba(" + t + ", " + r + ", " + i + ", " + a + ")"
        }
          , B = function(e) {
            var t = e.hue
              , r = e.saturation
              , i = e.lightness
              , n = e.alpha
              , a = void 0 === n ? 1 : n;
            return "hsla(" + t + ", " + r + ", " + i + ", " + a + ")"
        }
          , R = o(o({}, p), {
            transform: function(e) {
                return Math.round(C(e))
            }
        });
        function M(e, t) {
            return e.startsWith(t) && d.test(e)
        }
        var j = {
            test: function(e) {
                return "string" === typeof e ? M(e, "rgb") : $(e)
            },
            parse: O(["red", "green", "blue", "alpha"]),
            transform: function(e) {
                var t = e.red
                  , r = e.green
                  , i = e.blue
                  , n = e.alpha
                  , a = void 0 === n ? 1 : n;
                return q({
                    red: R.transform(t),
                    green: R.transform(r),
                    blue: R.transform(i),
                    alpha: l(g.transform(a))
                })
            }
        }
          , z = {
            test: function(e) {
                return "string" === typeof e ? M(e, "hsl") : T(e)
            },
            parse: O(["hue", "saturation", "lightness", "alpha"]),
            transform: function(e) {
                var t = e.hue
                  , r = e.saturation
                  , i = e.lightness
                  , n = e.alpha
                  , a = void 0 === n ? 1 : n;
                return B({
                    hue: Math.round(t),
                    saturation: v.transform(l(r)),
                    lightness: v.transform(l(i)),
                    alpha: l(g.transform(a))
                })
            }
        }
          , I = o(o({}, j), {
            test: function(e) {
                return "string" === typeof e && M(e, "#")
            },
            parse: function(e) {
                var t = ""
                  , r = ""
                  , i = "";
                return e.length > 4 ? (t = e.substr(1, 2),
                r = e.substr(3, 2),
                i = e.substr(5, 2)) : (t = e.substr(1, 1),
                r = e.substr(2, 1),
                i = e.substr(3, 1),
                t += t,
                r += r,
                i += i),
                {
                    red: parseInt(t, 16),
                    green: parseInt(r, 16),
                    blue: parseInt(i, 16),
                    alpha: 1
                }
            }
        })
          , D = {
            test: function(e) {
                return "string" === typeof e && d.test(e) || $(e) || T(e)
            },
            parse: function(e) {
                return j.test(e) ? j.parse(e) : z.test(e) ? z.parse(e) : I.test(e) ? I.parse(e) : e
            },
            transform: function(e) {
                return $(e) ? j.transform(e) : T(e) ? z.transform(e) : e
            }
        }
          , E = "${c}"
          , P = "${n}"
          , G = function(e) {
            return "number" === typeof e ? 0 : e
        }
          , A = {
            test: function(e) {
                if ("string" !== typeof e || !isNaN(e))
                    return !1;
                var t = 0
                  , r = e.match(h)
                  , i = e.match(m);
                return r && (t += r.length),
                i && (t += i.length),
                t > 0
            },
            parse: function(e) {
                var t = e
                  , r = []
                  , i = t.match(m);
                i && (t = t.replace(m, E),
                r.push.apply(r, i.map(D.parse)));
                var n = t.match(h);
                return n && r.push.apply(r, n.map(p.parse)),
                r
            },
            createTransformer: function(e) {
                var t = e
                  , r = 0
                  , i = e.match(m)
                  , n = i ? i.length : 0;
                if (i)
                    for (var a = 0; a < n; a++)
                        t = t.replace(i[a], E),
                        r++;
                var o = t.match(h)
                  , s = o ? o.length : 0;
                if (o)
                    for (a = 0; a < s; a++)
                        t = t.replace(o[a], P),
                        r++;
                return function(e) {
                    for (var i = t, a = 0; a < r; a++)
                        i = i.replace(a < n ? E : P, a < n ? D.transform(e[a]) : l(e[a]));
                    return i
                }
            },
            getAnimatableNone: function(e) {
                var t = A.parse(e)
                  , r = A.createTransformer(e);
                return r(t.map(G))
            }
        }
          , N = function() {};
        var H = 0
          , U = "undefined" !== typeof window && void 0 !== window.requestAnimationFrame ? function(e) {
            return window.requestAnimationFrame(e)
        }
        : function(e) {
            var t = Date.now()
              , r = Math.max(0, 16.7 - (t - H));
            H = t + r,
            setTimeout((function() {
                return e(H)
            }
            ), r)
        }
          , F = function(e) {
            var t = []
              , r = []
              , i = 0
              , n = !1
              , a = 0
              , o = new WeakSet
              , s = new WeakSet
              , u = {
                cancel: function(e) {
                    var t = r.indexOf(e);
                    o.add(e),
                    -1 !== t && r.splice(t, 1)
                },
                process: function(c) {
                    var l, h;
                    if (n = !0,
                    l = [r, t],
                    t = l[0],
                    r = l[1],
                    r.length = 0,
                    i = t.length,
                    i)
                        for (a = 0; a < i; a++)
                            h = t[a],
                            h(c),
                            !0 !== s.has(h) || o.has(h) || (u.schedule(h),
                            e(!0));
                    n = !1
                },
                schedule: function(e, a, u) {
                    void 0 === a && (a = !1),
                    void 0 === u && (u = !1),
                    N("function" === typeof e, "Argument must be a function");
                    var c = u && n
                      , l = c ? t : r;
                    o.delete(e),
                    a && s.add(e),
                    -1 === l.indexOf(e) && (l.push(e),
                    c && (i = t.length))
                }
            };
            return u
        }
          , Y = 40
          , W = 1 / 60 * 1e3
          , X = !0
          , V = !1
          , Z = !1
          , K = {
            delta: 0,
            timestamp: 0
        }
          , J = ["read", "update", "preRender", "render", "postRender"]
          , Q = function(e) {
            return V = e
        }
          , ee = J.reduce((function(e, t) {
            return e[t] = F(Q),
            e
        }
        ), {})
          , te = J.reduce((function(e, t) {
            var r = ee[t];
            return e[t] = function(e, t, i) {
                return void 0 === t && (t = !1),
                void 0 === i && (i = !1),
                V || ae(),
                r.schedule(e, t, i),
                e
            }
            ,
            e
        }
        ), {})
          , re = J.reduce((function(e, t) {
            return e[t] = ee[t].cancel,
            e
        }
        ), {})
          , ie = function(e) {
            return ee[e].process(K)
        }
          , ne = function(e) {
            V = !1,
            K.delta = X ? W : Math.max(Math.min(e - K.timestamp, Y), 1),
            X || (W = K.delta),
            K.timestamp = e,
            Z = !0,
            J.forEach(ie),
            Z = !1,
            V && (X = !1,
            U(ne))
        }
          , ae = function() {
            V = !0,
            X = !0,
            Z || U(ne)
        }
          , oe = function() {
            return K
        }
          , se = te
          , ue = 1.525
          , ce = function(e) {
            return function(t) {
                return 1 - e(1 - t)
            }
        }
          , le = function(e) {
            return function(t) {
                return t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2
            }
        }
          , he = ce
          , me = le
          , de = function(e) {
            return function(t) {
                return Math.pow(t, e)
            }
        }
          , pe = function(e) {
            return function(t) {
                return t * t * ((e + 1) * t - e)
            }
        }
          , ge = function(e) {
            var t = pe(e);
            return function(e) {
                return (e *= 2) < 1 ? .5 * t(e) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
            }
        }
          , fe = function(e) {
            return e
        }
          , _e = de(2)
          , we = ce(_e)
          , ve = le(_e)
          , ye = function(e) {
            return 1 - Math.sin(Math.acos(e))
        }
          , be = ce(ye)
          , ke = le(be)
          , Se = pe(ue)
          , xe = ce(Se)
          , Ce = le(Se)
          , $e = ge(ue)
          , Te = 4 / 11
          , Le = 8 / 11
          , Oe = .9
          , qe = 4356 / 361
          , Be = 35442 / 1805
          , Re = 16061 / 1805
          , Me = function(e) {
            var t = e * e;
            return e < Te ? 7.5625 * t : e < Le ? 9.075 * t - 9.9 * e + 3.4 : e < Oe ? qe * t - Be * e + Re : 10.8 * e * e - 20.52 * e + 10.72
        }
          , je = function(e) {
            return 1 - Me(1 - e)
        }
          , ze = function(e) {
            return e < .5 ? .5 * (1 - Me(1 - 2 * e)) : .5 * Me(2 * e - 1) + .5
        }
          , Ie = 8
          , De = .001
          , Ee = 1e-7
          , Pe = 10
          , Ge = 11
          , Ae = 1 / (Ge - 1)
          , Ne = "undefined" !== typeof Float32Array
          , He = function(e, t) {
            return 1 - 3 * t + 3 * e
        }
          , Ue = function(e, t) {
            return 3 * t - 6 * e
        }
          , Fe = function(e) {
            return 3 * e
        }
          , Ye = function(e, t, r) {
            return 3 * He(t, r) * e * e + 2 * Ue(t, r) * e + Fe(t)
        }
          , We = function(e, t, r) {
            return ((He(t, r) * e + Ue(t, r)) * e + Fe(t)) * e
        };
        function Xe(e, t, r, i) {
            var n = Ne ? new Float32Array(Ge) : new Array(Ge)
              , a = function(t, i, n) {
                var a, o, s = 0;
                do {
                    o = i + (n - i) / 2,
                    a = We(o, e, r) - t,
                    a > 0 ? n = o : i = o
                } while (Math.abs(a) > Ee && ++s < Pe);
                return o
            }
              , o = function(t, i) {
                for (var n, a = 0, o = 0; a < Ie; ++a) {
                    if (o = Ye(i, e, r),
                    0 === o)
                        return i;
                    n = We(i, e, r) - t,
                    i -= n / o
                }
                return i
            }
              , s = function() {
                for (var t = 0; t < Ge; ++t)
                    n[t] = We(t * Ae, e, r)
            }
              , u = function(t) {
                for (var i = 0, s = 1, u = Ge - 1, c = 0, l = 0, h = 0; s !== u && n[s] <= t; ++s)
                    i += Ae;
                return --s,
                c = (t - n[s]) / (n[s + 1] - n[s]),
                l = i + c * Ae,
                h = Ye(l, e, r),
                h >= De ? o(t, l) : 0 === h ? l : a(t, i, i + Ae)
            };
            s();
            var c = function(n) {
                var a;
                return a = e === t && r === i ? n : 0 === n ? 0 : 1 === n ? 1 : We(u(n), t, i),
                a
            };
            return c
        }
        var Ve = function(e) {
            return "number" === typeof e
        }
          , Ze = function(e) {
            return function(t, r, i) {
                return void 0 !== i ? e(t, r, i) : function(i) {
                    return e(t, r, i)
                }
            }
        }
          , Ke = function(e, t, r) {
            return Math.min(Math.max(r, e), t)
        }
          , Je = Ze(Ke)
          , Qe = function(e, t, r) {
            var i = t - e;
            return 0 === i ? 1 : (r - e) / i
        }
          , et = function(e, t, r) {
            return -r * e + r * t + e
        }
          , tt = function() {
            return tt = Object.assign || function(e) {
                for (var t, r = 1, i = arguments.length; r < i; r++)
                    for (var n in t = arguments[r],
                    t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e
            }
            ,
            tt.apply(this, arguments)
        }
          , rt = function(e, t, r) {
            var i = e * e
              , n = t * t;
            return Math.sqrt(Math.max(0, r * (n - i) + i))
        }
          , it = [I, j, z]
          , nt = function(e) {
            return it.find((function(t) {
                return t.test(e)
            }
            ))
        }
          , at = function(e) {
            return "'" + e + "' is not an animatable color. Use the equivalent color code instead."
        }
          , ot = function(e, t) {
            var r = nt(e)
              , i = nt(t);
            N(!!r, at(e)),
            N(!!i, at(t)),
            N(r.transform === i.transform, "Both colors must be hex/RGBA, OR both must be HSLA.");
            var n = r.parse(e)
              , a = i.parse(t)
              , o = tt({}, n)
              , s = r === z ? et : rt;
            return function(e) {
                for (var t in o)
                    "alpha" !== t && (o[t] = s(n[t], a[t], e));
                return o.alpha = et(n.alpha, a.alpha, e),
                r.transform(o)
            }
        }
          , st = function(e, t) {
            return function(r) {
                return t(e(r))
            }
        }
          , ut = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return e.reduce(st)
        };
        function ct(e, t) {
            return Ve(e) ? function(r) {
                return et(e, t, r)
            }
            : D.test(e) ? ot(e, t) : mt(e, t)
        }
        var lt = function(e, t) {
            var r = e.slice()
              , i = r.length
              , n = e.map((function(e, r) {
                return ct(e, t[r])
            }
            ));
            return function(e) {
                for (var t = 0; t < i; t++)
                    r[t] = n[t](e);
                return r
            }
        };
        function ht(e) {
            for (var t = A.parse(e), r = t.length, i = 0, n = 0, a = 0, o = 0; o < r; o++)
                i || "number" === typeof t[o] ? i++ : void 0 !== t[o].hue ? a++ : n++;
            return {
                parsed: t,
                numNumbers: i,
                numRGB: n,
                numHSL: a
            }
        }
        var mt = function(e, t) {
            var r = A.createTransformer(t)
              , i = ht(e)
              , n = ht(t);
            return N(i.numHSL === n.numHSL && i.numRGB === n.numRGB && i.numNumbers >= n.numNumbers, "Complex values '" + e + "' and '" + t + "' too different to mix. Ensure all colors are of the same type."),
            ut(lt(i.parsed, n.parsed), r)
        };
        var dt, pt = function(e) {
            return e
        }, gt = function(e) {
            return void 0 === e && (e = pt),
            Ze((function(t, r, i) {
                var n = r - i
                  , a = -(0 - t + 1) * (0 - e(Math.abs(n)));
                return n <= 0 ? r + a : r - a
            }
            ))
        }, ft = (gt(),
        gt(Math.sqrt),
        function(e, t) {
            return Ve(e) ? e / (1e3 / t) : 0
        }
        ), _t = function(e, t) {
            return t ? e * (1e3 / t) : 0
        }, wt = function(e, t, r) {
            var i = t - e;
            return ((r - e) % i + i) % i + e
        }, vt = (Ze(wt),
        Je(0, 1),
        function(e) {
            var t = e.onRead
              , r = e.onRender
              , i = e.uncachedValues
              , n = void 0 === i ? new Set : i
              , a = e.useCache
              , o = void 0 === a || a;
            return function(e) {
                void 0 === e && (e = {});
                var i = s(e, [])
                  , a = {}
                  , u = []
                  , c = !1;
                function l(e, t) {
                    e.startsWith("--") && (i.hasCSSVariable = !0);
                    var r = a[e];
                    a[e] = t,
                    a[e] !== r && (-1 === u.indexOf(e) && u.push(e),
                    c || (c = !0,
                    se.render(h.render)))
                }
                var h = {
                    get: function(e, r) {
                        void 0 === r && (r = !1);
                        var s = !r && o && !n.has(e) && void 0 !== a[e];
                        return s ? a[e] : t(e, i)
                    },
                    set: function(e, t) {
                        if ("string" === typeof e)
                            l(e, t);
                        else
                            for (var r in e)
                                l(r, e[r]);
                        return this
                    },
                    render: function(e) {
                        return void 0 === e && (e = !1),
                        (c || !0 === e) && (r(a, i, u),
                        c = !1,
                        u.length = 0),
                        this
                    }
                };
                return h
            }
        }
        ), yt = /([a-z])([A-Z])/g, bt = "$1-$2", kt = function(e) {
            return e.replace(yt, bt).toLowerCase()
        }, St = new Map, xt = new Map, Ct = ["Webkit", "Moz", "O", "ms", ""], $t = Ct.length, Tt = "undefined" !== typeof document, Lt = function(e, t) {
            return xt.set(e, kt(t))
        }, Ot = function(e) {
            dt = dt || document.createElement("div");
            for (var t = 0; t < $t; t++) {
                var r = Ct[t]
                  , i = "" === r
                  , n = i ? e : r + e.charAt(0).toUpperCase() + e.slice(1);
                if (n in dt.style || i) {
                    if (i && "clipPath" === e && xt.has(e))
                        return;
                    St.set(e, n),
                    Lt(e, (i ? "" : "-") + kt(n))
                }
            }
        }, qt = function(e) {
            return Lt(e, e)
        }, Bt = function(e, t) {
            void 0 === t && (t = !1);
            var r = t ? xt : St;
            return r.has(e) || (Tt ? Ot(e) : qt(e)),
            r.get(e) || e
        }, Rt = ["", "X", "Y", "Z"], Mt = ["translate", "scale", "rotate", "skew", "transformPerspective"], jt = Mt.reduce((function(e, t) {
            return Rt.reduce((function(e, r) {
                return e.push(t + r),
                e
            }
            ), e)
        }
        ), ["x", "y", "z"]), zt = jt.reduce((function(e, t) {
            return e[t] = !0,
            e
        }
        ), {});
        function It(e) {
            return !0 === zt[e]
        }
        function Dt(e, t) {
            return jt.indexOf(e) - jt.indexOf(t)
        }
        var Et = new Set(["originX", "originY", "originZ"]);
        function Pt(e) {
            return Et.has(e)
        }
        var Gt = o(o({}, p), {
            transform: Math.round
        })
          , At = {
            color: D,
            backgroundColor: D,
            outlineColor: D,
            fill: D,
            stroke: D,
            borderColor: D,
            borderTopColor: D,
            borderRightColor: D,
            borderBottomColor: D,
            borderLeftColor: D,
            borderWidth: y,
            borderTopWidth: y,
            borderRightWidth: y,
            borderBottomWidth: y,
            borderLeftWidth: y,
            borderRadius: y,
            radius: y,
            borderTopLeftRadius: y,
            borderTopRightRadius: y,
            borderBottomRightRadius: y,
            borderBottomLeftRadius: y,
            width: y,
            maxWidth: y,
            height: y,
            maxHeight: y,
            size: y,
            top: y,
            right: y,
            bottom: y,
            left: y,
            padding: y,
            paddingTop: y,
            paddingRight: y,
            paddingBottom: y,
            paddingLeft: y,
            margin: y,
            marginTop: y,
            marginRight: y,
            marginBottom: y,
            marginLeft: y,
            rotate: w,
            rotateX: w,
            rotateY: w,
            rotateZ: w,
            scale: f,
            scaleX: f,
            scaleY: f,
            scaleZ: f,
            skew: w,
            skewX: w,
            skewY: w,
            distance: y,
            translateX: y,
            translateY: y,
            translateZ: y,
            x: y,
            y: y,
            z: y,
            perspective: y,
            opacity: g,
            originX: S,
            originY: S,
            originZ: y,
            zIndex: Gt,
            fillOpacity: g,
            strokeOpacity: g,
            numOctaves: Gt
        }
          , Nt = function(e) {
            return At[e]
        }
          , Ht = function(e, t) {
            return t && "number" === typeof e ? t.transform(e) : e
        }
          , Ut = "scrollLeft"
          , Ft = "scrollTop"
          , Yt = new Set([Ut, Ft])
          , Wt = new Set([Ut, Ft, "transform"])
          , Xt = {
            x: "translateX",
            y: "translateY",
            z: "translateZ"
        };
        function Vt(e) {
            return "function" === typeof e
        }
        function Zt(e, t, r, i, n, a) {
            void 0 === a && (a = !0);
            var o = ""
              , s = !1;
            r.sort(Dt);
            for (var u = r.length, c = 0; c < u; c++) {
                var l = r[c];
                o += (Xt[l] || l) + "(" + t[l] + ") ",
                s = "z" === l || s
            }
            return !s && n ? o += "translateZ(0)" : o = o.trim(),
            Vt(e.transform) ? o = e.transform(t, i ? "" : o) : a && i && (o = "none"),
            o
        }
        function Kt(e, t, r, i, n, a, o, s) {
            void 0 === t && (t = !0),
            void 0 === r && (r = {}),
            void 0 === i && (i = {}),
            void 0 === n && (n = {}),
            void 0 === a && (a = []),
            void 0 === o && (o = !1),
            void 0 === s && (s = !0);
            var u = !0
              , c = !1
              , l = !1;
            for (var h in e) {
                var m = e[h]
                  , d = Nt(h)
                  , p = Ht(m, d);
                It(h) ? (c = !0,
                i[h] = p,
                a.push(h),
                u && (d.default && m !== d.default || !d.default && 0 !== m) && (u = !1)) : Pt(h) ? (n[h] = p,
                l = !0) : Wt.has(h) && Vt(p) || (r[Bt(h, o)] = p)
            }
            return (c || "function" === typeof e.transform) && (r.transform = Zt(e, i, a, u, t, s)),
            l && (r.transformOrigin = (n.originX || "50%") + " " + (n.originY || "50%") + " " + (n.originZ || 0)),
            r
        }
        function Jt(e) {
            var t = void 0 === e ? {} : e
              , r = t.enableHardwareAcceleration
              , i = void 0 === r || r
              , n = t.isDashCase
              , a = void 0 === n || n
              , o = t.allowTransformNone
              , s = void 0 === o || o
              , u = {}
              , c = {}
              , l = {}
              , h = [];
            return function(e) {
                return h.length = 0,
                Kt(e, i, u, c, l, h, a, s),
                u
            }
        }
        function Qt(e, t) {
            var r = t.element
              , i = t.preparseOutput
              , n = Nt(e);
            if (It(e))
                return n && n.default || 0;
            if (Yt.has(e))
                return r[e];
            var a = window.getComputedStyle(r, null).getPropertyValue(Bt(e, !0)) || 0;
            return i && n && n.test(a) && n.parse ? n.parse(a) : a
        }
        function er(e, t, r) {
            var i = t.element
              , n = t.buildStyles
              , a = t.hasCSSVariable;
            if (Object.assign(i.style, n(e)),
            a)
                for (var o = r.length, s = 0; s < o; s++) {
                    var u = r[s];
                    u.startsWith("--") && i.style.setProperty(u, e[u])
                }
            -1 !== r.indexOf(Ut) && (i[Ut] = e[Ut]),
            -1 !== r.indexOf(Ft) && (i[Ft] = e[Ft])
        }
        var tr = vt({
            onRead: Qt,
            onRender: er,
            uncachedValues: Yt
        });
        function rr(e, t) {
            void 0 === t && (t = {});
            var r = t.enableHardwareAcceleration
              , i = t.allowTransformNone
              , n = s(t, ["enableHardwareAcceleration", "allowTransformNone"]);
            return tr(o({
                element: e,
                buildStyles: Jt({
                    enableHardwareAcceleration: r,
                    allowTransformNone: i
                }),
                preparseOutput: !0
            }, n))
        }
        var ir = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues"])
          , nr = .5
          , ar = function() {
            return {
                style: {}
            }
        }
          , or = function(e, t) {
            return y.transform(e * t)
        }
          , sr = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        function ur(e, t, r) {
            return "string" === typeof e ? e : y.transform(t + r * e)
        }
        function cr(e, t, r) {
            return ur(t, e.x, e.width) + " " + ur(r, e.y, e.height)
        }
        var lr = {
            enableHardwareAcceleration: !1,
            isDashCase: !1
        };
        function hr(e, t, r, i, n, a) {
            void 0 === t && (t = sr),
            void 0 === i && (i = Jt(lr)),
            void 0 === n && (n = ar()),
            void 0 === a && (a = !0);
            var o = e.attrX
              , u = e.attrY
              , c = e.originX
              , l = e.originY
              , h = e.pathLength
              , m = e.pathSpacing
              , d = void 0 === m ? 1 : m
              , p = e.pathOffset
              , g = void 0 === p ? 0 : p
              , f = s(e, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"])
              , _ = i(f);
            for (var w in _)
                if ("transform" === w)
                    n.style.transform = _[w];
                else {
                    var v = a && !ir.has(w) ? kt(w) : w;
                    n[v] = _[w]
                }
            return (void 0 !== c || void 0 !== l || _.transform) && (n.style.transformOrigin = cr(t, void 0 !== c ? c : nr, void 0 !== l ? l : nr)),
            void 0 !== o && (n.x = o),
            void 0 !== u && (n.y = u),
            void 0 !== r && void 0 !== h && (n[a ? "stroke-dashoffset" : "strokeDashoffset"] = or(-g, r),
            n[a ? "stroke-dasharray" : "strokeDasharray"] = or(h, r) + " " + or(d, r)),
            n
        }
        function mr(e, t, r) {
            void 0 === r && (r = !0);
            var i = ar()
              , n = Jt(lr);
            return function(a) {
                return hr(a, e, t, n, i, r)
            }
        }
        var dr = function(e) {
            return "function" === typeof e.getBBox ? e.getBBox() : e.getBoundingClientRect()
        }
          , pr = function(e) {
            try {
                return dr(e)
            } catch (t) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        }
          , gr = function(e) {
            return "path" === e.tagName
        }
          , fr = vt({
            onRead: function(e, t) {
                var r = t.element;
                if (e = ir.has(e) ? e : kt(e),
                It(e)) {
                    var i = Nt(e);
                    return i && i.default || 0
                }
                return r.getAttribute(e)
            },
            onRender: function(e, t) {
                var r = t.element
                  , i = t.buildAttrs
                  , n = i(e);
                for (var a in n)
                    "style" === a ? Object.assign(r.style, n.style) : r.setAttribute(a, n[a])
            }
        })
          , _r = function(e) {
            var t = pr(e)
              , r = gr(e) && e.getTotalLength ? e.getTotalLength() : void 0;
            return fr({
                element: e,
                buildAttrs: mr(t, r)
            })
        }
          , wr = vt({
            useCache: !1,
            onRead: function(e) {
                return "scrollTop" === e ? window.pageYOffset : window.pageXOffset
            },
            onRender: function(e) {
                var t = e.scrollTop
                  , r = void 0 === t ? 0 : t
                  , i = e.scrollLeft
                  , n = void 0 === i ? 0 : i;
                return window.scrollTo(n, r)
            }
        })
          , vr = new WeakMap
          , yr = function(e) {
            return e instanceof HTMLElement || "function" === typeof e.click
        }
          , br = function(e) {
            return e instanceof SVGElement || "ownerSVGElement"in e
        }
          , kr = function(e, t) {
            var r;
            return e === window ? r = wr(e) : yr(e) ? r = rr(e, t) : br(e) && (r = _r(e)),
            N(void 0 !== r, "No valid node provided. Node must be HTMLElement, SVGElement or window."),
            vr.set(e, r),
            r
        }
          , Sr = function(e, t) {
            return vr.has(e) ? vr.get(e) : kr(e, t)
        };
        function xr(e, t) {
            var r = "string" === typeof e ? document.querySelector(e) : e;
            return Sr(r, t)
        }
        var Cr = xr
          , $r = function() {
            function e(e) {
                void 0 === e && (e = {}),
                this.props = e
            }
            return e.prototype.applyMiddleware = function(e) {
                return this.create(o(o({}, this.props), {
                    middleware: this.props.middleware ? u([e], this.props.middleware) : [e]
                }))
            }
            ,
            e.prototype.pipe = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = 1 === e.length ? e[0] : ut.apply(void 0, e);
                return this.applyMiddleware((function(e) {
                    return function(t) {
                        return e(r(t))
                    }
                }
                ))
            }
            ,
            e.prototype.while = function(e) {
                return this.applyMiddleware((function(t, r) {
                    return function(i) {
                        return e(i) ? t(i) : r()
                    }
                }
                ))
            }
            ,
            e.prototype.filter = function(e) {
                return this.applyMiddleware((function(t) {
                    return function(r) {
                        return e(r) && t(r)
                    }
                }
                ))
            }
            ,
            e
        }()
          , Tr = function() {
            function e(e, t) {
                var r = this
                  , i = e.middleware
                  , n = e.onComplete;
                this.isActive = !0,
                this.update = function(e) {
                    r.observer.update && r.updateObserver(e)
                }
                ,
                this.complete = function() {
                    r.observer.complete && r.isActive && r.observer.complete(),
                    r.onComplete && r.onComplete(),
                    r.isActive = !1
                }
                ,
                this.error = function(e) {
                    r.observer.error && r.isActive && r.observer.error(e),
                    r.isActive = !1
                }
                ,
                this.observer = t,
                this.updateObserver = function(e) {
                    return t.update(e)
                }
                ,
                this.onComplete = n,
                t.update && i && i.length && i.forEach((function(e) {
                    return r.updateObserver = e(r.updateObserver, r.complete)
                }
                ))
            }
            return e
        }()
          , Lr = function(e, t, r) {
            var i = t.middleware;
            return new Tr({
                middleware: i,
                onComplete: r
            },"function" === typeof e ? {
                update: e
            } : e)
        }
          , Or = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return a(t, e),
            t.prototype.create = function(e) {
                return new t(e)
            }
            ,
            t.prototype.start = function(e) {
                void 0 === e && (e = {});
                var t = !1
                  , r = {
                    stop: function() {}
                }
                  , i = this.props
                  , n = i.init
                  , a = s(i, ["init"])
                  , u = Lr(e, a, (function() {
                    t = !0,
                    r.stop()
                }
                ))
                  , c = n(u);
                return r = c ? o(o({}, r), c) : r,
                e.registerParent && e.registerParent(r),
                t && r.stop(),
                r
            }
            ,
            t
        }($r)
          , qr = function(e) {
            return new Or({
                init: e
            })
        }
          , Br = function(e) {
            var t = e.getCount
              , r = e.getFirst
              , i = e.getOutput
              , n = e.mapApi
              , a = e.setProp
              , o = e.startActions;
            return function(e) {
                return qr((function(s) {
                    var u = s.update
                      , c = s.complete
                      , l = s.error
                      , h = t(e)
                      , m = i()
                      , d = function() {
                        return u(m)
                    }
                      , p = 0
                      , g = o(e, (function(e, t) {
                        var r = !1;
                        return e.start({
                            complete: function() {
                                r || (r = !0,
                                p++,
                                p === h && se.update(c))
                            },
                            error: l,
                            update: function(e) {
                                a(m, t, e),
                                se.update(d, !1, !0)
                            }
                        })
                    }
                    ));
                    return Object.keys(r(g)).reduce((function(e, t) {
                        return e[t] = n(g, t),
                        e
                    }
                    ), {})
                }
                ))
            }
        }
          , Rr = Br({
            getOutput: function() {
                return {}
            },
            getCount: function(e) {
                return Object.keys(e).length
            },
            getFirst: function(e) {
                return e[Object.keys(e)[0]]
            },
            mapApi: function(e, t) {
                return function() {
                    for (var r = [], i = 0; i < arguments.length; i++)
                        r[i] = arguments[i];
                    return Object.keys(e).reduce((function(i, n) {
                        var a;
                        return e[n][t] && (r[0] && void 0 !== r[0][n] ? i[n] = e[n][t](r[0][n]) : i[n] = (a = e[n])[t].apply(a, r)),
                        i
                    }
                    ), {})
                }
            },
            setProp: function(e, t, r) {
                return e[t] = r
            },
            startActions: function(e, t) {
                return Object.keys(e).reduce((function(r, i) {
                    return r[i] = t(e[i], i),
                    r
                }
                ), {})
            }
        })
          , Mr = Br({
            getOutput: function() {
                return []
            },
            getCount: function(e) {
                return e.length
            },
            getFirst: function(e) {
                return e[0]
            },
            mapApi: function(e, t) {
                return function() {
                    for (var r = [], i = 0; i < arguments.length; i++)
                        r[i] = arguments[i];
                    return e.map((function(e, i) {
                        if (e[t])
                            return Array.isArray(r[0]) ? e[t](r[0][i]) : e[t].apply(e, r)
                    }
                    ))
                }
            },
            setProp: function(e, t, r) {
                return e[t] = r
            },
            startActions: function(e, t) {
                return e.map((function(e, r) {
                    return t(e, r)
                }
                ))
            }
        })
          , jr = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return Mr(e)
        }
          , zr = function(e) {
            var t = Object.keys(e)
              , r = function(t, r) {
                return void 0 !== t && !e[r](t)
            }
              , i = function(e) {
                return t.reduce((function(t, i) {
                    return r(e[i], i) && t.push(i),
                    t
                }
                ), [])
            }
              , n = function(e) {
                return e && t.some((function(t) {
                    return r(e[t], t)
                }
                ))
            };
            return {
                getVectorKeys: i,
                testVectorProps: n
            }
        }
          , Ir = [y, v, w, b, k]
          , Dr = function(e) {
            return Ir.find((function(t) {
                return t.test(e)
            }
            ))
        }
          , Er = function(e) {
            return Boolean(Dr(e))
        }
          , Pr = function(e, t) {
            return e(t)
        }
          , Gr = function(e) {
            return function(t, r) {
                return t[r] = t[r][e],
                t
            }
        }
          , Ar = function(e, t, r) {
            var i = r[0]
              , n = t[i].map((function(i, n) {
                var a = r.reduce(Gr(n), o({}, t));
                return Vr(i)(e, a)
            }
            ));
            return jr.apply(void 0, n)
        }
          , Nr = function(e) {
            return function(t, r) {
                return t[r] = t[r][e],
                t
            }
        }
          , Hr = function(e, t, r) {
            var i = r[0]
              , n = Object.keys(t[i]).reduce((function(n, a) {
                var s = r.reduce(Nr(a), o({}, t));
                return n[a] = Vr(t[i][a])(e, s),
                n
            }
            ), {});
            return Rr(n)
        }
          , Ur = function(e, t) {
            var r = t.from
              , i = t.to
              , n = s(t, ["from", "to"])
              , a = Dr(r) || Dr(i)
              , u = a.transform
              , c = a.parse;
            return e(o(o({}, n), {
                from: "string" === typeof r ? c(r) : r,
                to: "string" === typeof i ? c(i) : i
            })).pipe(u)
        }
          , Fr = function(e) {
            return function(t, r) {
                var i = r.from
                  , n = r.to
                  , a = s(r, ["from", "to"]);
                return t(o(o({}, a), {
                    from: 0,
                    to: 1
                })).pipe(e(i, n))
            }
        }
          , Yr = Fr(ot)
          , Wr = Fr(mt)
          , Xr = function(e, t) {
            var r = zr(t)
              , i = r.testVectorProps
              , n = r.getVectorKeys
              , a = function(t) {
                var r = i(t);
                if (!r)
                    return e(t);
                var a = n(t)
                  , o = a[0]
                  , s = t[o];
                return Vr(s)(e, t, a)
            };
            return a
        }
          , Vr = function(e) {
            return "number" === typeof e ? Pr : Array.isArray(e) ? Ar : Er(e) ? Ur : D.test(e) ? Yr : A.test(e) ? Wr : "object" === typeof e ? Hr : Pr
        }
          , Zr = function(e) {
            return void 0 === e && (e = {}),
            qr((function(t) {
                var r = t.complete
                  , i = t.update
                  , n = e.velocity
                  , a = void 0 === n ? 0 : n
                  , o = e.from
                  , s = void 0 === o ? 0 : o
                  , u = e.power
                  , c = void 0 === u ? .8 : u
                  , l = e.timeConstant
                  , h = void 0 === l ? 350 : l
                  , m = e.restDelta
                  , d = void 0 === m ? .5 : m
                  , p = e.modifyTarget
                  , g = 0
                  , f = c * a
                  , _ = s + f
                  , w = "undefined" === typeof p ? _ : p(_);
                w !== _ && (f = w - s);
                var v = se.update((function(e) {
                    var t = e.delta;
                    g += t;
                    var n = -f * Math.exp(-g / h)
                      , a = n > d || n < -d
                      , o = a ? w + n : w;
                    i(o),
                    a || (re.update(v),
                    r())
                }
                ), !0);
                return {
                    stop: function() {
                        return re.update(v)
                    }
                }
            }
            ))
        }
          , Kr = (p.test,
        p.test,
        function(e) {
            return void 0 === e && (e = {}),
            qr((function(t) {
                var r = t.update
                  , i = t.complete
                  , n = e.velocity
                  , a = void 0 === n ? 0 : n
                  , o = e.from
                  , s = void 0 === o ? 0 : o
                  , u = e.to
                  , c = void 0 === u ? 0 : u
                  , l = e.stiffness
                  , h = void 0 === l ? 100 : l
                  , m = e.damping
                  , d = void 0 === m ? 10 : m
                  , p = e.mass
                  , g = void 0 === p ? 1 : p
                  , f = e.restSpeed
                  , _ = void 0 === f ? .01 : f
                  , w = e.restDelta
                  , v = void 0 === w ? .01 : w
                  , y = a ? -a / 1e3 : 0
                  , b = 0
                  , k = c - s
                  , S = s
                  , x = S
                  , C = se.update((function(e) {
                    var t = e.delta;
                    b += t;
                    var n = d / (2 * Math.sqrt(h * g))
                      , o = Math.sqrt(h / g) / 1e3;
                    if (x = S,
                    n < 1) {
                        var s = Math.exp(-n * o * b)
                          , u = o * Math.sqrt(1 - n * n);
                        S = c - s * ((y + n * o * k) / u * Math.sin(u * b) + k * Math.cos(u * b))
                    } else {
                        s = Math.exp(-o * b);
                        S = c - s * (k + (y + o * k) * b)
                    }
                    a = _t(S - x, t);
                    var l = Math.abs(a) <= _
                      , m = Math.abs(c - S) <= v;
                    l && m ? (S = c,
                    r(S),
                    re.update(C),
                    i()) : r(S)
                }
                ), !0);
                return {
                    stop: function() {
                        return re.update(C)
                    }
                }
            }
            ))
        }
        )
          , Jr = (p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        function(e) {
            var t = e.from
              , r = void 0 === t ? 0 : t
              , i = e.velocity
              , n = void 0 === i ? 0 : i
              , a = e.min
              , s = e.max
              , u = e.power
              , c = void 0 === u ? .8 : u
              , l = e.timeConstant
              , h = void 0 === l ? 700 : l
              , m = e.bounceStiffness
              , d = void 0 === m ? 500 : m
              , p = e.bounceDamping
              , g = void 0 === p ? 10 : p
              , f = e.restDelta
              , _ = void 0 === f ? 1 : f
              , w = e.modifyTarget;
            return qr((function(e) {
                var t, i = e.update, u = e.complete, l = r, m = r, p = function(e) {
                    return void 0 !== a && e < a || void 0 !== s && e > s
                }, f = function(e) {
                    return Math.abs(a - e) < Math.abs(s - e) ? a : s
                }, v = function(e, r) {
                    t && t.stop(),
                    t = e.start({
                        update: i,
                        complete: function() {
                            r ? r() : u()
                        }
                    })
                }, y = function(e) {
                    v(Kr(o(o({}, e), {
                        stiffness: d,
                        damping: g,
                        restDelta: _
                    })))
                };
                if (p(r))
                    y({
                        from: r,
                        velocity: n,
                        to: f(r)
                    });
                else {
                    var b = c * n + r;
                    "undefined" !== typeof w && (b = w(b),
                    w = void 0,
                    n = (b - r) / c);
                    var k = Zr({
                        from: r,
                        velocity: n,
                        timeConstant: h,
                        power: c,
                        restDelta: _,
                        modifyTarget: w
                    })
                      , S = void 0;
                    if (p(b)) {
                        var x = f(b)
                          , C = x == a ? -1 : 1;
                        k = k.while((function(e) {
                            return l = m,
                            n = _t(e - l, oe().delta),
                            m = e,
                            x - e * C > 0
                        }
                        )),
                        S = function() {
                            return y({
                                from: m,
                                to: x,
                                velocity: n
                            })
                        }
                    }
                    v(k, S)
                }
                return {
                    stop: function() {
                        return t && t.stop()
                    }
                }
            }
            ))
        }
        )
          , Qr = (p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        function(e) {
            var t = e.from
              , r = void 0 === t ? 0 : t
              , i = e.to
              , n = void 0 === i ? 1 : i
              , a = e.ease
              , o = void 0 === a ? fe : a
              , s = e.reverseEase
              , u = void 0 !== s && s;
            return u && (o = he(o)),
            qr((function(e) {
                var t = e.update;
                return {
                    seek: function(e) {
                        return t(e)
                    }
                }
            }
            )).pipe(o, (function(e) {
                return et(r, n, e)
            }
            ))
        }
        )
          , ei = Xr(Qr, {
            ease: function(e) {
                return "function" === typeof e
            },
            from: p.test,
            to: p.test
        })
          , ti = Je(0, 1)
          , ri = function(e) {
            return void 0 === e && (e = {}),
            qr((function(t) {
                var r, i = t.update, n = t.complete, a = e.duration, o = void 0 === a ? 300 : a, s = e.ease, u = void 0 === s ? we : s, c = e.flip, l = void 0 === c ? 0 : c, h = e.loop, m = void 0 === h ? 0 : h, d = e.yoyo, p = void 0 === d ? 0 : d, g = e.repeatDelay, f = void 0 === g ? 0 : g, _ = e.from, w = void 0 === _ ? 0 : _, v = e.to, y = void 0 === v ? 1 : v, b = e.elapsed, k = void 0 === b ? 0 : b, S = e.flipCount, x = void 0 === S ? 0 : S, C = e.yoyoCount, $ = void 0 === C ? 0 : C, T = e.loopCount, L = void 0 === T ? 0 : T, O = ei({
                    from: w,
                    to: y,
                    ease: u
                }).start(i), q = 0, B = !1, R = function(e) {
                    var t;
                    void 0 === e && (e = !1),
                    t = [y, w],
                    w = t[0],
                    y = t[1],
                    O = ei({
                        from: w,
                        to: y,
                        ease: u,
                        reverseEase: e
                    }).start(i)
                }, M = function() {
                    var e = B && k > o + f;
                    return !!e && (!(!e || m || l || p) || (k = o - (k - f),
                    m && L < m ? (L++,
                    !1) : l && x < l ? (x++,
                    R(),
                    !1) : !(p && $ < p) || ($++,
                    R($ % 2 !== 0),
                    !1)))
                }, j = function() {
                    q = ti(Qe(0, o, k)),
                    O.seek(q)
                }, z = function() {
                    B = !0,
                    r = se.update((function(e) {
                        var t = e.delta;
                        k += t,
                        j(),
                        M() && (re.update(r),
                        n && se.update(n, !1, !0))
                    }
                    ), !0)
                }, I = function() {
                    B = !1,
                    r && re.update(r)
                };
                return z(),
                {
                    isActive: function() {
                        return B
                    },
                    getElapsed: function() {
                        return Je(0, o, k)
                    },
                    getProgress: function() {
                        return q
                    },
                    stop: function() {
                        I()
                    },
                    pause: function() {
                        return I(),
                        this
                    },
                    resume: function() {
                        return B || z(),
                        this
                    },
                    seek: function(e) {
                        return k = et(0, o, e),
                        se.update(j, !1, !0),
                        this
                    },
                    reverse: function() {
                        return R(),
                        this
                    }
                }
            }
            ))
        }
          , ii = function(e) {
            return void 0 === e && (e = {}),
            qr((function(t) {
                var r = t.complete
                  , i = t.update
                  , n = e.acceleration
                  , a = void 0 === n ? 0 : n
                  , o = e.friction
                  , s = void 0 === o ? 0 : o
                  , u = e.velocity
                  , c = void 0 === u ? 0 : u
                  , l = e.springStrength
                  , h = e.to
                  , m = e.restSpeed
                  , d = void 0 === m ? .001 : m
                  , p = e.from
                  , g = void 0 === p ? 0 : p
                  , f = g
                  , _ = se.update((function(e) {
                    var t = e.delta
                      , n = Math.max(t, 16);
                    if (a && (c += ft(a, n)),
                    s && (c *= Math.pow(1 - s, n / 100)),
                    void 0 !== l && void 0 !== h) {
                        var o = h - f;
                        c += o * ft(l, n)
                    }
                    f += ft(c, n),
                    i(f);
                    var u = !1 !== d && (!c || Math.abs(c) <= d);
                    u && (re.update(_),
                    r())
                }
                ), !0);
                return {
                    set: function(e) {
                        return f = e,
                        this
                    },
                    setAcceleration: function(e) {
                        return a = e,
                        this
                    },
                    setFriction: function(e) {
                        return s = e,
                        this
                    },
                    setSpringStrength: function(e) {
                        return l = e,
                        this
                    },
                    setSpringTarget: function(e) {
                        return h = e,
                        this
                    },
                    setVelocity: function(e) {
                        return c = e,
                        this
                    },
                    stop: function() {
                        return re.update(_)
                    }
                }
            }
            ))
        }
          , ni = (p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        p.test,
        function(e, t, r) {
            return qr((function(i) {
                var n = i.update
                  , a = t.split(" ").map((function(t) {
                    return e.addEventListener(t, n, r),
                    t
                }
                ));
                return {
                    stop: function() {
                        return a.forEach((function(t) {
                            return e.removeEventListener(t, n, r)
                        }
                        ))
                    }
                }
            }
            ))
        }
        )
          , ai = function() {
            return {
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                x: 0,
                y: 0
            }
        }
          , oi = function(e, t) {
            return void 0 === t && (t = ai()),
            t.clientX = t.x = e.clientX,
            t.clientY = t.y = e.clientY,
            t.pageX = e.pageX,
            t.pageY = e.pageY,
            t
        }
          , si = [ai()];
        if ("undefined" !== typeof document) {
            var ui = function(e) {
                var t = e.touches;
                !0;
                var r = t.length;
                si.length = 0;
                for (var i = 0; i < r; i++) {
                    var n = t[i];
                    si.push(oi(n))
                }
            };
            ni(document, "touchstart touchmove", {
                passive: !0,
                capture: !0
            }).start(ui)
        }
        var ci = ai();
        if ("undefined" !== typeof document) {
            var li = function(e) {
                !0,
                oi(e, ci)
            };
            ni(document, "mousedown mousemove", !0).start(li)
        }
    },
    "37f8": function(e, t, r) {
        e.exports = r.p + "static/media/tool.e861c108.mp3"
    },
    4356: function(e, t, r) {
        "use strict";
        r("0b7b")
    },
    "494e": function(e, t, r) {
        "use strict";
        r("a2d2")
    },
    "49d3": function(e, t, r) {
        "use strict";
        r("c70f")
    },
    "5fda": function(e, t, r) {},
    "68f5": function(e, t, r) {},
    "6d53": function(e, t, r) {
        "use strict";
        r("d8fc")
    },
    "9f6c": function(e, t, r) {
        "use strict";
        r("0669")
    },
    a2d2: function(e, t, r) {},
    c0f3: function(e, t, r) {
        "use strict";
        r("5fda")
    },
    c50a: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "game-parkour-wrap"
            }, [r("GameFrame", {
                scopedSlots: e._u([{
                    key: "playground",
                    fn: function(t) {
                        var i = t.show
                          , n = t.jumpPage
                          , a = t.popupResult
                          , o = t.startGame
                          , s = t.gameOver
                          , u = t.switchMusic;
                        return [i ? r("playground", {
                            on: {
                                jumpPage: n,
                                popupResult: a,
                                startGame: o,
                                gameOver: s,
                                switchMusic: u
                            }
                        }) : e._e()]
                    }
                }])
            })], 1)
        }
          , n = []
          , a = r("18af")
          , o = (r("e1df"),
        function() {
            var e = this
              , t = e.$createElement
              , r = e._self._c || t;
            return r("div", {
                staticClass: "main-jump-box",
                style: e.getBoxStyle
            }, [e.isCanvasShow ? r("canvas", {
                ref: "page",
                staticClass: "game-page",
                attrs: {
                    id: "main-page-can"
                }
            }) : e._e(), r("div", {
                staticClass: "game-main-top"
            }, [r("div", {
                staticClass: "music-box"
            }, [1 == e.music_status ? r("wm-icon", {
                staticClass: "roation-music",
                staticStyle: {
                    color: "var(--color-b)"
                },
                attrs: {
                    size: .65,
                    unit: "rem",
                    name: "WM-yinlekai"
                },
                on: {
                    click: function(t) {
                        return e.$emit("switchMusic")
                    }
                }
            }) : e._e(), 0 == e.music_status ? r("wm-icon", {
                staticStyle: {
                    color: "var(--color-b)"
                },
                attrs: {
                    size: .65,
                    unit: "rem",
                    name: "WM-yinleguan"
                },
                on: {
                    click: function(t) {
                        return e.$emit("switchMusic")
                    }
                }
            }) : e._e()], 1), r("div", {
                staticClass: "game-top-left"
            }, [r("img", {
                attrs: {
                    src: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/grade_bg.png",
                    alt: "",
                    srcset: ""
                }
            }), r("div", {
                staticClass: "throw-item"
            }, [r("div", {
                staticClass: "border-throw"
            }), 2 == e.getSkinType ? [r("img", {
                attrs: {
                    src: e.getTempStyle.blockList[0].pic,
                    alt: "",
                    srcset: ""
                }
            })] : [r("img", {
                attrs: {
                    src: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block.png",
                    alt: "",
                    srcset: ""
                }
            })]], 2), r("div", {
                staticClass: "left-text",
                class: {
                    skin2: 1 == e.getSkinType
                }
            }, [r("span", {
                staticClass: "left-text-xx",
                class: {
                    skin2: 1 == e.getSkinType
                }
            }, [e._v("x")]), r("span", {
                staticStyle: {
                    "font-size": "0.4rem",
                    "font-weight": "bold"
                }
            }, [e._v(e._s(e.stepNum))])])]), r("div", {
                staticClass: "game-time",
                class: {
                    skin2: 1 == e.getSkinType
                }
            }, [r("img", {
                attrs: {
                    src: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/cultdown_time.png",
                    alt: "",
                    srcset: ""
                }
            }), r("span", {
                staticClass: "cut-down-time",
                staticStyle: {
                    "margin-top": "0.07rem"
                },
                attrs: {
                    id: "downTime"
                }
            }, [e._v(e._s(e.downTime))])]), r("div", {
                staticClass: "game-top-right"
            }, [r("img", {
                attrs: {
                    src: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/grade_bg.png",
                    alt: "",
                    srcset: ""
                }
            }), r("div", {
                staticClass: "count-grade",
                class: {
                    skin2: 1 == e.getSkinType
                }
            }, [r("img", {
                attrs: {
                    src: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/grade_icon.png",
                    alt: "",
                    srcset: ""
                }
            })]), r("div", {
                staticClass: "right-text",
                class: {
                    skin2: 1 == e.getSkinType
                }
            }, [e._v(" " + e._s(e.grade) + " ")])])])])
        }
        )
          , s = []
          , u = (r("13d5"),
        r("22a2"));
        const {devicePixelRatio: c} = window
          , l = u["Ticker"].shared
          , h = new u["Loader"]
          , m = new u["Container"]
          , d = new u["utils"].EventEmitter
          , p = Math.min(2, c);
        let g = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        function f(e) {
            const t = new u["autoDetectRenderer"]({
                view: e,
                antialias: !0,
                backgroundColor: 1514020,
                width: window.innerWidth,
                height: window.innerHeight,
                resolution: 2
            });
            t.plugins.accessibility.destroy(),
            l.add( () => {
                t.render(m)
            }
            ),
            u["DisplayObject"].prototype.align = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const r = {
                    x: 0,
                    y: 0
                }
                  , i = this.getBounds(!1)
                  , n = e.getBounds(!1)
                  , {top: a, left: o, right: s, bottom: u} = t;
                r.y = void 0 !== a ? a - n.top + i.top : void 0 !== u ? i.bottom - n.bottom - u : (i.top + i.bottom - (n.top + n.bottom)) / 2,
                r.x = void 0 !== o ? o - n.left + i.left : void 0 !== s ? i.right - n.right - s : (i.left + i.right - (n.left + n.right)) / 2,
                e.x += r.x / e.parent.scale.x,
                e.y += r.y / e.parent.scale.y
            }
            ,
            t.screen.align = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const r = {
                    x: 0,
                    y: 0
                }
                  , i = e.getBounds(!1)
                  , {top: n, left: a, right: o, bottom: s} = t;
                r.y = void 0 !== n ? n - i.top : void 0 !== s ? this.height - s - i.bottom : (this.height - i.top - i.bottom) / 2,
                r.x = void 0 !== a ? a - i.left : void 0 !== o ? this.width - o - i.right : (this.width - i.left - i.right) / 2,
                e.x += r.x / e.parent.scale.x,
                e.y += r.y / e.parent.scale.y
            }
            ,
            g = t.screen
        }
        let _ = {
            createdRender: f,
            ticker: l,
            loader: h,
            monitor: d,
            screen: g,
            stage: m,
            pixelRatio: p
        };
        var w = _;
        r("d80c");
        const v = {};
        let y = {};
        v.imgList = {
            guide_left: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/guide_left.png",
            guide_right: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/guide_right.png",
            block_change_a: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_a.png",
            block_change_d: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_d.png",
            block_change_f: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_f.png",
            block_change_j: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_j.png",
            block_change_s: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_s.png",
            block_change: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block_p.png",
            block: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/block.png",
            barrier: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
            barrier_3: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
            barrier_4: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
            barrier_1: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier_1.png",
            barrier_2: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier_2.png",
            guide: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/guide.png",
            fake_block: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
            score: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-moon.png",
            bear: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/bear.png",
            bear_shielding: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-cake.png",
            shielding: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-cake.png",
            star: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-moon.png",
            bg: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/background_c.png"
        },
        v.initSource = () => {
            if (!w.loader.resources.guide_left)
                for (let e in v.imgList)
                    w.loader.add(e, v.imgList[e]);
            w.loader.load( (e, t) => {
                y = t
            }
            ),
            v.getTexture = e => y[e].texture,
            v.genSprite = e => new u["Sprite"](y[e].texture),
            v.genMask = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : w.screen.width
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : w.screen.height
                  , r = v.genSprite("mask");
                return r.width = e,
                r.height = t,
                r.alpha = .7,
                r
            }
        }
        ,
        window.pixiUitl = v;
        var b = r("35eb");
        let k = null
          , S = window.pixiUitl;
        const x = [1, 2, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4]
          , C = ["block", "block_change", "block_change_a", "block_change_d", "block_change_f", "block_change_j", "block_change_s"]
          , $ = ["barrier", "barrier_1", "barrier_2", "barrier_3", "barrier_4"]
          , T = {
            SCORE: {
                id: 0,
                bg: "score",
                data: 10
            },
            SHIELDING: {
                id: 1,
                bg: "shielding",
                data: 10
            }
        }
          , L = {
            EMPTY: 0,
            BARRIER: 1,
            TOOL: 2
        };
        class O {
            constructor(e) {
                this.type = L.EMPTY,
                this.sw = 0,
                this.sh = 0,
                this._scale = 1,
                this.container = new u["Container"],
                this.bg = S.genSprite(e),
                this.bg.width = .18 * w.screen.width,
                this.bg.height = .86 * this.bg.width,
                this.container.addChild(this.bg)
            }
            init() {}
            startToFall() {}
            get alpha() {
                return this.container.alpha
            }
            get width() {
                return this.container.width
            }
            get height() {
                return this.container.height
            }
            get x() {
                return this.container.x
            }
            get y() {
                return this.container.y
            }
            set alpha(e) {
                this.container.alpha = e
            }
            set x(e) {
                this.container.x = e
            }
            set y(e) {
                this.container.y = e
            }
            changeWidth(e) {
                this.container.width
            }
            changeHeight(e) {
                this.container.height
            }
            set width(e) {
                this.changeWidth(e)
            }
            set height(e) {
                this.changeHeight(e)
            }
        }
        class q extends O {
            constructor(e) {
                super(e),
                this.type = L.BARRIER,
                this.barrier = new u["Sprite"],
                this.barrier.anchor.set(.5, .5),
                this.barrier.x = this.container.width / 2,
                this.barrier.y = 0,
                this.barrier.width = .18 * w.screen.width,
                this.barrier.height = this.barrier.width,
                this.container.addChild(this.barrier)
            }
            setBarrier(e) {
                return this.barrier.texture = S.getTexture(e),
                this
            }
            hideBarrier() {
                this.barrier.texture = null
            }
        }
        class B extends O {
            constructor(e) {
                super(e),
                this.type = L.TOOL,
                this.tool = new u["Sprite"],
                this.tool.anchor.set(.5, .5),
                this.tool.x = this.container.width / 2,
                this.tool.y = 10,
                this.tool.width = .13 * w.screen.width,
                this.tool.height = this.tool.width,
                this.container.addChild(this.tool),
                this.tag = "",
                this.toolType = null
            }
            setToolType(e) {
                return this.toolType = e,
                this.tool.texture = S.getTexture(e.bg),
                this
            }
            use() {
                Object(b["c"])({
                    from: 1,
                    to: 0,
                    duration: 200
                }).start({
                    update: e => {
                        this.tool.alpha = e
                    }
                    ,
                    complete: () => {
                        this.tool.texture = null,
                        this.tool.alpha = 1
                    }
                })
            }
        }
        class R {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.blockList = [],
                this.top = e
            }
            getBlock(e) {
                return this.blockList[e]
            }
            get length() {
                return this.blockList.length
            }
            setTop(e) {
                this.top = e
            }
            push(e) {
                this.blockList.push(e)
            }
            pushList(e) {
                this.blockList.push(...e)
            }
            animTop() {
                this.blockList.forEach(e => {
                    Object(b["c"])({
                        from: {
                            y: e.y
                        },
                        to: {
                            y: this.top
                        },
                        ease: b["a"].easeIn,
                        duration: 200
                    }).start(t => {
                        e.y = t.y
                    }
                    )
                }
                )
            }
            async show() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50
                  , r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "block";
                if (0 === this.blockList.length)
                    return;
                const i = this.blockList.length % 2
                  , n = -(this.blockList.length - i) / 2 * this.blockList[0].width - this.blockList[0].width * i / 2 + w.screen.width / 2;
                return this.blockList.forEach( (e, t) => {
                    e.y = this.top,
                    e.x = n + e.width * t,
                    e.bg.texture = S.getTexture(r)
                }
                ),
                await window.$util.delay(e),
                Promise.all(this.blockList.map( (e, r) => new Promise(async i => {
                    await window.$util.delay(10 * r),
                    Object(b["c"])({
                        from: 0,
                        to: 1,
                        ease: b["a"].easeIn,
                        duration: t
                    }).start({
                        update: t => {
                            this.blockList.length > 2 ? 3 == this.blockList.length && 2 == r ? (e.alpha = t,
                            1 == e.type && (this.blockList[1].alpha = t)) : 0 == r || 1 == r || 2 == r ? e.noAlpha && 2 == r ? e.alpha = t : e.alpha = 0 : (1 == e.type && (this.blockList[2].alpha = t),
                            e.alpha = t) : 2 == this.blockList.length && e.noAlpha && 0 == r ? e.alpha = 0 : e.alpha = t
                        }
                        ,
                        complete: i
                    })
                }
                )))
            }
        }
        class M {
            constructor() {
                this.blockList = {},
                Object.entries(L).forEach(e => {
                    let[t,r] = e;
                    console.log(t),
                    this.blockList[r] = []
                }
                )
            }
            getBlock(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "block";
                const r = this.blockList[e];
                if (0 !== r.length)
                    return r.shift();
                switch (e) {
                case L.EMPTY:
                    return new O(t);
                case L.BARRIER:
                    return new q(t);
                case L.TOOL:
                    return new B(t);
                default:
                    return null
                }
            }
            recycle(e) {
                e.init(),
                this.blockList[e.type].push(e)
            }
        }
        class j {
            constructor() {
                this.container = new u["Container"],
                this.bearY = 0,
                this.onUid = -1,
                this.bear = S.genSprite("bear"),
                this.shielding = S.genSprite("bear_shielding"),
                this.shielding.anchor.set(.5, .5),
                this.container.addChild(this.bear),
                this.timeoutId = null,
                this.tweenTimeoutId = null,
                this.tweenAction = null,
                this.invincible = !1
            }
            get pivot() {
                return this.container.pivot
            }
            get skew() {
                return this.container.skew
            }
            get x() {
                return this.container.x
            }
            get y() {
                return this.container.y
            }
            set x(e) {
                this.container.x = e
            }
            set y(e) {
                this.container.y = e
            }
            get width() {
                return this.bear.width
            }
            get height() {
                return this.bear.height
            }
            set width(e) {
                this.bear.width = e,
                this.container.width = e
            }
            set height(e) {
                this.bear.height = e,
                this.container.height = e
            }
            showShielding(e) {
                this.invincible = !0,
                clearTimeout(this.timeoutId),
                clearTimeout(this.tweenTimeoutId),
                this.tweenAction && this.tweenAction.stop(),
                this.tweenAction = null,
                this.timeoutId = null,
                this.shielding.alpha = 1,
                this.shielding.parent || (this.shielding.width = this.bear.width + 30,
                this.shielding.height = this.bear.height + 30,
                this.shielding.x = this.container.width / 2,
                this.shielding.y = this.container.height / 2,
                this.container.addChild(this.shielding)),
                this.timeoutId = setTimeout( () => {
                    this.timeoutId = null,
                    this.invincible = !1,
                    this.container.removeChild(this.shielding)
                }
                , e),
                this.tweenTimeoutId = setTimeout( () => {
                    this.tweenAction = Object(b["c"])({
                        from: 1,
                        to: 0,
                        ease: b["a"].easeIn,
                        duration: 100,
                        yoyo: 1 / 0
                    }).start(e => {
                        this.shielding.alpha = e
                    }
                    )
                }
                , Math.max(0, e - 1e3))
            }
        }
        const z = new M;
        let I = null;
        var D = {
            playMusic: () => {}
            ,
            getSeedRandom(e) {
                Math.seed = e,
                Math.seededRandom = function(e, t) {
                    e = e || 1,
                    t = t || 0,
                    Math.seed = (9301 * Math.seed + 49297) % 233280;
                    var r = Math.seed / 233280;
                    return t + r * (e - t)
                }
            },
            randomNum(e, t) {
                return Math.floor(Math.random() * (t - e)) + e
            },
            seedRandomNum(e, t) {
                return Math.floor(Math.seededRandom() * (t - e)) + e
            },
            cultDownStart: () => {}
            ,
            show(e) {
                this.guiding = e && e.guide,
                this.init(e),
                w.monitor.emit("scene:show", "game")
            },
            hide() {
                this.removeAll(),
                w.monitor.emit("scene:hide", "game")
            },
            endGame(e) {
                this.isOver = !0,
                this.showEnd(e)
            },
            removeAll() {
                this.showEnding = !1,
                w.ticker.remove(this.update, this);
                while (this.lineList.length) {
                    const e = this.lineList.pop();
                    e.blockList.forEach(e => {
                        this.container.removeChild(e),
                        z.recycle(e)
                    }
                    )
                }
                this.container.destroy()
            },
            init(e) {
                this.seedNum = this.randomNum(1, 50),
                this.getSeedRandom(this.seedNum),
                this.guideStep = 0,
                this.guideCache = {},
                this.uploadDataList = [],
                this.randomIndex = e.randomIndex || 3,
                this.startTime = (new Date).getTime(),
                this.starting = !1,
                this.startShowEnd = !1,
                this.showEnding = !1,
                this.lockTouch = !1,
                this.blockFallTimer = null,
                this.openChangeColor = void 0 == e.isChangeColor || e.isChangeColor,
                this.addTime = e.addTimeNum || 3,
                this.addScoreNum = e.addScoreNum || 3,
                this.stepNum = 0,
                this.jumpNum = 0,
                this.fallSpeed = 500,
                this.stempAdNum = e.fallStepNum || 10,
                this.reduceTime = e.fallSpeed || 50,
                this.colorIndex = 0,
                this.blockType = "block",
                this.isOver = !1,
                this.lineList = [],
                this.lineNum = 0,
                this.linePos = 0,
                this.lastLineNum = 0,
                this.score = 0,
                this.finishScore = 0,
                this.endSprite = new u["Sprite"],
                this.endSprite.width = .7 * w.screen.width,
                this.endSprite.height = 1.08 * this.endSprite.width,
                this.endSprite.x = (w.screen.width - this.endSprite.width) / 2,
                this.endSprite.y = w.screen.height / 2 - this.endSprite.height / 2 - 200,
                this.firstJump = !0,
                I = z.getBlock(L.EMPTY),
                I.width = w.screen.width / 5,
                this.bear = new j,
                this.bear.width = .15 * w.screen.width,
                this.bear.height = this.bear.width / .69,
                this.bear.pivot.set(.5 * this.bear.width, .8 * this.bear.height),
                this.container = new u["Container"],
                w.stage.addChild(this.container),
                this.container.interactive = !0;
                const t = S.genSprite("bg");
                let r = t.width
                  , i = t.height;
                t.width = w.screen.width,
                t.height = t.width * i / r,
                console.log(t.height, "bg.heightbg.height"),
                t.height,
                this.container.addChild(t),
                this.initBlock(),
                this.leftGuid = S.genSprite("guide_left"),
                this.leftGuid.x = .1 * w.screen.width,
                this.leftGuid.y = .8 * w.screen.height,
                this.leftGuid.scale.x = this.leftGuid.scale.y = .7,
                this.container.addChild(this.leftGuid),
                this.rightGuid = S.genSprite("guide_right"),
                this.rightGuid.x = .7 * w.screen.width,
                this.rightGuid.y = .8 * w.screen.height,
                this.rightGuid.scale.x = this.rightGuid.scale.y = .7,
                this.container.addChild(this.rightGuid),
                !this.guiding && this.listenTouch()
            },
            showGuide(e) {
                if (0 === e) {
                    let e = S.genMask();
                    e.zIndex = 3,
                    e.width = w.screen.width / 2,
                    this.container.addChild(e);
                    let t = S.genSprite("tip_jump");
                    t.zIndex = 3,
                    t.anchor.set(.5, .5),
                    t.x = w.screen.width / 2,
                    t.y = w.screen.height / 2,
                    this.container.addChild(t);
                    let r = S.genSprite("tip_next");
                    r.zIndex = 3,
                    r.anchor.set(.5, .5),
                    r.x = w.screen.width / 2 + 200,
                    r.y = t.y + t.height / 2 + 200,
                    this.container.addChild(r),
                    r.interactive = !0,
                    r.once("tap", () => {
                        this.container.removeChild(r),
                        this.container.removeChild(t),
                        this.container.removeChild(e),
                        this.showGuide(1)
                    }
                    )
                }
                if (1 === e) {
                    this.guideCache.barrier.container.zIndex = 3;
                    let e = S.genSprite("tip_barrier");
                    e.zIndex = 3,
                    e.anchor.set(.5, .5),
                    e.x = w.screen.width / 2,
                    e.y = w.screen.height / 2,
                    this.container.addChild(e);
                    let t = S.genSprite("tip_next");
                    t.zIndex = 3,
                    t.anchor.set(.5, .5),
                    t.x = w.screen.width / 2 + 200,
                    t.y = e.y + e.height / 2 + 200,
                    this.container.addChild(t),
                    t.interactive = !0,
                    t.once("tap", () => {
                        this.guideCache.barrier.container.zIndex = 1,
                        this.container.removeChild(t),
                        this.container.removeChild(e),
                        this.showGuide(2)
                    }
                    )
                }
                if (2 === e) {
                    this.guideCache.star.container.zIndex = 3;
                    let e = S.genSprite("tip_star");
                    e.zIndex = 3,
                    e.anchor.set(.5, .5),
                    e.x = w.screen.width / 2,
                    e.y = w.screen.height / 2,
                    this.container.addChild(e);
                    let t = S.genSprite("tip_next");
                    t.zIndex = 3,
                    t.anchor.set(.5, .5),
                    t.x = w.screen.width / 2 + 200,
                    t.y = e.y + e.height / 2 + 200,
                    this.container.addChild(t),
                    t.interactive = !0,
                    t.once("tap", () => {
                        this.guideCache.star.container.zIndex = 1,
                        this.container.removeChild(t),
                        this.container.removeChild(e),
                        this.showGuide(3)
                    }
                    )
                }
                if (3 === e) {
                    this.guideCache.fake.container.zIndex = 3;
                    let e = S.genSprite("tip_fake");
                    e.zIndex = 3,
                    e.anchor.set(.5, .5),
                    e.x = w.screen.width / 2 + 100,
                    e.y = w.screen.height / 2,
                    this.container.addChild(e);
                    let t = S.genSprite("tip_next");
                    t.zIndex = 3,
                    t.anchor.set(.5, .5),
                    t.x = w.screen.width / 2 + 200,
                    t.y = e.y + e.height / 2 + 200,
                    this.container.addChild(t),
                    t.interactive = !0,
                    t.once("tap", () => {
                        this.guideCache.fake.container.zIndex = 1,
                        this.container.removeChild(t),
                        this.container.removeChild(e),
                        this.showGuide(4)
                    }
                    )
                }
                if (4 === e) {
                    let e = S.genSprite("tip_more");
                    e.zIndex = 3,
                    e.anchor.set(.5, .5),
                    e.x = w.screen.width / 2,
                    e.y = w.screen.height / 2,
                    this.container.addChild(e);
                    let t = S.genSprite("tip_sure");
                    t.zIndex = 3,
                    t.anchor.set(.5, .5),
                    t.x = w.screen.width / 2 + 200,
                    t.y = e.y + e.height / 2 + 200,
                    this.container.addChild(t),
                    t.interactive = !0,
                    t.once("tap", () => {
                        this.container.removeChild(t),
                        this.container.removeChild(e),
                        w.monitor.emit("scene:go", "home")
                    }
                    )
                }
            },
            listenTouch() {
                this.container.on("pointerdown", e => {
                    const {data: t} = e;
                    this.isOver || null !== k && k !== t.identifier || (k = t.identifier)
                }
                ).on("pointerup", e => {
                    const {data: t} = e;
                    if (null === k || k !== t.identifier)
                        return;
                    let r = 0;
                    r = t.global.x < w.screen.width / 2 ? -1 : 1,
                    this.playMusic("jump"),
                    this.jump(r),
                    k = null
                }
                ).on("pointerupoutside", () => {
                    k = null
                }
                )
            },
            async initBlock() {
                for (let r = 0; r < 7; ++r) {
                    const e = this.genLine(r, !1, !0);
                    await e.show(),
                    6 == r && (this.starting = !0)
                }
                let e = this.lineList[0].blockList[0];
                this.bear.onUid = e.uid;
                const t = this.getBearPos(e);
                if (this.bear.x = t.x,
                this.bear.y = t.y,
                this.bear.bearY = t.y,
                this.container.addChild(this.bear.container),
                this.guiding) {
                    let e = S.genMask();
                    e.alpha = 0,
                    e.zIndex = 2,
                    this.container.addChild(e),
                    Object(b["c"])({
                        from: 0,
                        to: .7,
                        duration: 500
                    }).start({
                        update: t => {
                            e.alpha = t
                        }
                        ,
                        complete: () => {
                            this.showGuide(0)
                        }
                    })
                }
            },
            async showCoutDown() {
                let e = S.genMask();
                e.alpha = .5,
                this.container.addChild(e);
                let t = new u["Text"]("3",{
                    fontSize: 100,
                    fill: "red",
                    stroke: "#ccc"
                });
                t.width = t.height = 200,
                t.anchor.set(.5, .5),
                t.x = w.screen.width / 2,
                t.y = w.screen.height / 2;
                const r = () => new Promise(e => {
                    Object(b["c"])({
                        from: 4,
                        to: 0,
                        duration: 1200
                    }).start({
                        update: e => {
                            t.scale.x = t.scale.y = e
                        }
                        ,
                        complete: e
                    })
                }
                );
                this.container.addChild(t),
                await r(),
                t.text = 2,
                t.scale.x = t.scale.y = 1,
                await r(),
                t.text = 1,
                t.scale.x = t.scale.y = 1,
                await r(),
                this.container.removeChild(t),
                Object(b["c"])({
                    from: .5,
                    to: 0,
                    duration: 500
                }).start({
                    update: t => {
                        e.alpha = t
                    }
                    ,
                    complete: () => {
                        this.container.removeChild(e),
                        this.starting = !0
                    }
                })
            },
            getBearPos(e) {
                const t = e.x + e.width / 2
                  , r = e.y + 15 * e._scale;
                return {
                    x: t,
                    y: r
                }
            },
            genLine(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , r = arguments.length > 2 ? arguments[2] : void 0;
                this.lineNum = e,
                e = e < x.length ? x[e] : 1 === this.lastLineNum ? 8 : 4 === this.lastLineNum ? 8 : this.lastLineNum + (Math.seededRandom() < .5 ? -1 : 1),
                this.lastLineNum = e;
                const i = this.lineList.slice(-1)[0] && this.lineList.slice(-1)[0].blockList ? this.lineList.slice(-1)[0].blockList.map(e => e.type) : []
                  , n = new R(.6 * w.screen.height - .65 * I.height * Math.min(this.lineNum, 6));
                n.id = this.stepNum++,
                this.lineList.push(n);
                let a = L.EMPTY
                  , o = L.EMPTY;
                for (let s = 0; s < e; ++s) {
                    let u = null;
                    if (a = L.EMPTY,
                    //t || 1 === e || 2 === e || (i.length > e || 0 === s || s === e - 1 ? i[s] !== L.BARRIER && i[s + 1] !== L.BARRIER && o !== L.BARRIER ? i.length > e && (0 === s || s === e - 1) || (a = Math.seededRandom() < .4 + .005 * this.lineNum ? L.BARRIER : L.EMPTY) : s + 1 === i.length - 1 && i[s + 1] === L.BARRIER && o !== L.BARRIER && (a = Math.seededRandom() < .4 + .005 * this.lineNum ? L.BARRIER : L.EMPTY) : i.length < e && i[s] === L.BARRIER && o !== L.BARRIER && (a = Math.seededRandom() < .4 + .005 * this.lineNum ? L.BARRIER : L.EMPTY)),
                    t || 1 === e || 2 === e || (i.length > e || 0 === s || s === e - 1 ? i[s] !== L.TOOL && i[s + 1] !== L.TOOL && o !== L.TOOL ? i.length > e && (0 === s || s === e - 1) || (a = Math.seededRandom() < .4 + .005 * this.lineNum ? L.TOOL : L.EMPTY) : s + 1 === i.length - 1 && i[s + 1] === L.TOOL && o !== L.TOOL && (a = Math.seededRandom() < .9 + .005 * this.lineNum ? L.TOOL : L.EMPTY) : i.length < e && i[s] === L.TOOL && o !== L.TOOL && (a = Math.seededRandom() < .9 + .005 * this.lineNum ? L.TOOL : L.EMPTY)),
                    a !== L.EMPTY || t || (a = r && 1 == e ? L.EMPTY : Math.seededRandom() < .9 ? L.TOOL : L.EMPTY),
                    L.EMPTY,
                    this.guiding && e > 1)
                        if (this.guideCache.barrier)
                            this.guideCache.star ? (a = L.EMPTY,
                            u = z.getBlock(a)) : (a = L.TOOL,
                            u = z.getBlock(a),
                            u.setToolType(T.SCORE),
                            this.guideCache.star = u);
                        else {
                            e = L.BARRIER,
                            u = z.getBlock(e);
                            let e = $[this.seedRandomNum(0, this.randomIndex)];
                            u.setBarrier(e),
                            this.guideCache.barrier = u
                        }
                    else {
                        o = a,
                        2 == s && i[2] == L.BARRIER && 4 == e ? (a = L.EMPTY,
                        u = z.getBlock(a),
                        u.noAlpha = !0) : u = z.getBlock(a);
                        let t = Math.seededRandom();
                        if (2 == e && 0 == s && t < .5 ? (a = L.BARRIER,
                        u = z.getBlock(a)) : 2 == e && 0 == s && t >= .5 && (u.noAlpha = !0),
                        a === L.BARRIER) {
                            let e = $[this.seedRandomNum(0, this.randomIndex)];
                            u.setBarrier(e)
                        }
                        a === L.TOOL && u.setToolType(T.SHIELDING)
                        //a === L.TOOL && u.setToolType(Math.seededRandom() < .5 ? T.SCORE : T.SHIELDING)
                    }
                    u.width = w.screen.width / 5,
                    u.alpha = 0,
                    this.container.addChildAt(u.container, 1),
                    n.push(u)
                }
                return n
            },
            addScore(e) {
                this.score += e,
                w.monitor.emit("addScore", this.score)
            },
            jumpToNext(e, t) {
                Object(b["c"])({
                    from: {
                        x: this.bear.x,
                        y: this.bear.y
                    },
                    to: {
                        x: e.x,
                        y: e.y
                    },
                    ease: b["a"].linear,
                    duration: 100
                }).start({
                    update: e => {
                        this.bear.x = e.x,
                        this.bear.y = e.y
                    }
                    ,
                    complete: () => {
                        Object(b["c"])({
                            from: this.bear.y,
                            to: t,
                            ease: b["a"].linear,
                            duration: 50
                        }).start({
                            update: e => {
                                this.bear.y = e
                            }
                        })
                    }
                })
            },
            jumpToFall() {
                this.playMusic("obstacle"),
                Object(b["c"])({
                    from: this.bear.y,
                    to: this.bear.y - 100,
                    ease: b["a"].easeIn,
                    duration: 100
                }).start({
                    update: e => {
                        this.bear.y = e
                    }
                    ,
                    complete: () => {
                        Object(b["c"])({
                            from: this.bear.y,
                            to: w.screen.height + 2 * this.bear.height,
                            ease: b["a"].easeIn,
                            duration: 50
                        }).start({
                            update: e => {
                                this.bear.y = e
                            }
                        })
                    }
                })
            },
            fall() {
                Object(b["c"])({
                    from: this.bear.y,
                    to: w.screen.height + 2 * this.bear.height,
                    ease: b["a"].easeIn,
                    duration: 50
                }).start({
                    update: e => {
                        this.bear.y = e
                    }
                })
            },
            startFall(e) {
                e <= 100 && (e = 100),
                clearInterval(this.blockFallTimer),
                this.blockFallTimer = null,
                this.blockFallTimer = setInterval( () => {
                    this.isOver && (clearInterval(this.blockFallTimer),
                    this.blockFallTimer = null);
                    let e = this.lineList.shift();
                    e && e.blockList.forEach(t => {
                        t.noAlpha = !1,
                        t.startToFall(),
                        Object(b["c"])({
                            from: {
                                y: t.y,
                                alpha: 1
                            },
                            to: {
                                y: w.screen.height,
                                alpha: 0
                            },
                            ease: b["a"].easeIn,
                            duration: 200
                        }).start({
                            update: e => {
                                t.y = e.y,
                                0 != t.alpha && (t.alpha = e.alpha)
                            }
                            ,
                            complete: () => {
                                this.container.removeChild(t.container),
                                z.recycle(t)
                            }
                        }),
                        e.id >= this.jumpNum && (this.isOver = !0,
                        this.fall(),
                        window.$util.delay(200).then( () => {
                            this.showEnd(),
                            clearInterval(this.blockFallTimer),
                            this.blockFallTimer = null
                        }
                        ))
                    }
                    )
                }
                , e)
            },
            colorChange(e, t) {
                this.fallSpeed = 500 - 50 * e * t,
                this.startFall(this.fallSpeed),
                this.colorIndex >= C.length - 1 && (this.colorIndex = -1),
                this.openChangeColor ? this.blockType = C[++this.colorIndex] : this.blockType = "block",
                this.lineList.forEach(e => {
                    e.blockList.forEach(e => {
                        e.bg.texture = S.getTexture(this.blockType)
                    }
                    )
                }
                )
            },
            async jump(e) {
                if (!this.starting || this.lockTouch || this.isOver || 0 === e)
                    return;
                this.lockTouch = !0;
                let t = e
                  , r = this.lineList.find(e => e.id == this.jumpNum);
                const i = this.lineList.find(e => e.id == this.jumpNum + 1);
                if (this.jumpNum++,
                w.monitor.emit("addStep", this.jumpNum),
                i.length > r.length && e < 0 ? t += 1 : i.length < r.length && e > 0 && (t -= 1),
                this.linePos += t,
                (this.linePos < 0 || this.linePos === i.length) && (this.uploadDataList.push({
                    p: e,
                    t: (new Date).getTime() - this.startTime,
                    s: 0
                }),
                this.isOver = !0,
                this.playMusic("obstacle")),
                this.bear.skew.y = e < 0 ? 22 : 0,
                this.isOver)
                    this.jumpToFall();
                else {
                    const t = i.blockList[this.linePos]
                      , r = this.getBearPos(t);
                    0 == t.alpha ? (this.uploadDataList.push({
                        p: e,
                        t: (new Date).getTime() - this.startTime,
                        s: 0
                    }),
                    this.isOver = !0) : t.type === L.EMPTY ? (this.finishScore++,
                    this.addScore(1),
                    this.uploadDataList.push({
                        p: e,
                        t: (new Date).getTime() - this.startTime,
                        s: 1
                    })) : t.type === L.TOOL ? this.dealTool(t, e) : t.type === L.FAKE ? (this.finishScore++,
                    this.addScore(1),
                    t.waitToFall = !0,
                    window.$util.delay(500).then( () => {
                        t.fall().then(async () => {
                            this.bear.onUid === t.uid && (this.isOver = !0,
                            this.fall(),
                            await window.$util.delay(200),
                            this.showEnd())
                        }
                        )
                    }
                    )) : t.type === L.BARRIER && (this.playMusic("obstacle"),
                    this.uploadDataList.push({
                        p: e,
                        t: (new Date).getTime() - this.startTime,
                        s: 0
                    }),
                    this.bear.invincible ? t.hideBarrier() : this.isOver = !0),
                    this.jumpToNext(r, this.isOver ? w.screen.height + 2 * this.bear.height : this.bear.bearY),
                    this.bear.onUid = t.uid
                }
                this.lineNum++,
                this.lineList.forEach(e => {
                    e.setTop(e.top + .67 * I.height),
                    e.animTop()
                }
                ),
                this.firstJump && (this.container.removeChild(this.leftGuid),
                this.container.removeChild(this.rightGuid),
                this.cultDownStart()),
                this.firstJump = !1;
                const n = this.genLine(this.lineNum, !1);
                n.show(150, 100, this.blockType),
                this.lockTouch = !1,
                this.isOver && (await window.$util.delay(200),
                this.showEnd())
            },
            dealTool(e, t) {
                switch (e.use(),
                this.playMusic("tool"),
                e.toolType.id) {
                case T.SCORE.id:
                    this.finishScore += e.toolType.data,
                    this.handleAddScore(e.x, e.y, !0),
                    this.uploadDataList.push({
                        p: t,
                        t: (new Date).getTime() - this.startTime,
                        at: this.addTime,
                        s: 0
                    });
                    break;
                case T.SHIELDING.id:
                    this.finishScore += e.toolType.data,
                    this.handleAddScore(e.x, e.y),
                    this.uploadDataList.push({
                        p: t,
                        t: (new Date).getTime() - this.startTime,
                        s: this.addScoreNum
                    });
                    break
                }
            },
            handleAddScore(e, t, r) {
                let i = new u["Text"]("+" + this.addScoreNum,{
                    fontSize: 30,
                    fill: "red",
                    stroke: "#fff",
                    strokeThickness: "2"
                });
                r ? (i.text = `+${this.addTime}s`,
                w.monitor.emit("addTime", this.addTime)) : this.addScore(this.addScoreNum),
                i.x = e + this.bear.width / 2.5,
                i.y = t - this.bear.height / 1.5,
                this.container.addChild(i),
                Object(b["c"])({
                    from: 1,
                    to: 0,
                    duration: 600
                }).start({
                    update: e => {
                        i.alpha = e
                    }
                    ,
                    complete: () => {
                        this.container.removeChild(i)
                    }
                })
            },
            flyStar(e, t, r, i) {
                const n = 360 / r;
                for (let a = 0, o = 0; a < r; ++a,
                o += n) {
                    let r = 100 * (90 === Math.abs(o) ? 0 : Math.cos(o * Math.PI / 180)) + e
                      , n = 100 * (180 === Math.abs(o) ? 0 : Math.sin(o * Math.PI / 180)) + t
                      , a = S.genSprite("score");
                    1 == i && (a = S.genSprite("shielding")),
                    a.x = e,
                    a.y = t,
                    a.scale.x = a.scale.y = .7,
                    this.container.addChild(a),
                    Object(b["c"])({
                        from: {
                            x: e,
                            y: t
                        },
                        to: {
                            x: r,
                            y: n
                        },
                        duration: 200
                    }).start({
                        update: e => {
                            a.x = e.x,
                            a.y = e.y
                        }
                        ,
                        complete: () => {
                            Object(b["c"])({
                                from: {
                                    x: e,
                                    y: t,
                                    scale: .7
                                },
                                to: {
                                    x: this.scoreText.x,
                                    y: this.scoreText.y,
                                    scale: .4
                                },
                                duration: 500 * Math.seededRandom() + 200
                            }).start({
                                update: e => {
                                    a.x = e.x,
                                    a.y = e.y,
                                    a.scale.x = a.scale.y = e.scale
                                }
                                ,
                                complete: () => {
                                    this.addScore(1),
                                    this.container.removeChild(a)
                                }
                            })
                        }
                    })
                }
            },
            async showEnd(e) {
                this.startShowEnd || (this.startShowEnd = !0,
                e && this.uploadDataList.push({
                    p: 0,
                    t: (new Date).getTime() - this.startTime,
                    s: 0,
                    isTimeOut: 1
                }),
                w.monitor.emit("endGame", this.score, this.uploadDataList, this.seedNum))
            },
            update() {
                if (this.showEnding) {
                    let e = document.getElementById("main-page");
                    this.endSprite.texture = u["Texture"].from(e),
                    this.endSprite.texture.update()
                }
            }
        }
          , E = r("e9e7")
          , P = {
            mixins: [E["b"]],
            props: {},
            data() {
                return {
                    isCanvasShow: !0,
                    startTime: "",
                    uploadDataList: {
                        seed: 0,
                        list: []
                    },
                    grade: 0,
                    downTime: 10,
                    countDownTimer: null,
                    mid: 0,
                    use_type: 1001,
                    uploadToken: "",
                    isPoster: !1,
                    stepNum: 0,
                    showTimer: null,
                    posterOption: {
                        mid: "",
                        use_type: "",
                        select_id: "",
                        poster_value_data: null,
                        sub_type: ""
                    }
                }
            },
            components: {},
            watch: {},
            computed: {
                getBoxStyle() {
                    const {mobile_bg: e=""} = this.getBaseData;
                    return {
                        background: `url(${e}) no-repeat center`,
                        backgroundSize: "100%"
                    }
                }
            },
            created() {
                this.mid = this.getWmQuery.mid,
                this.use_type = this.getWmQuery.use_type;
                const {poster_config: e} = this.getBaseData;
                this.posterOption.mid = this.mid,
                this.posterOption = Object.assign(this.posterOption, e)
            },
            mounted() {
                w.createdRender(this.$refs.page),
                this.includeJS("soundData", "", "https://code.createjs.com/1.0.0/soundjs.min.js"),
                D.playMusic = this.soundGo,
                w.monitor.on("addTime", e => {
                    this.downTime += e
                }
                ),
                w.monitor.on("addStep", e => {
                    this.stepNum = e
                }
                ),
                w.monitor.on("addScore", e => {
                    this.grade = e
                }
                ),
                w.monitor.on("endGame", (e, t, r) => {
                    this.grade = e,
                    D.removeAll(),
                    this.uploadDataList.list = t,
                    this.uploadDataList.seed = r,
                    clearInterval(this.countDownTimer),
                    this.countDownTimer = null,
                    this.endGame()
                }
                ),
                this.startGame()
            },
            methods: {
                endGame() {
                    this.isCanvasShow = !1;
                    const e = this.uploadDataList.list.reduce( (e, t) => e + t.s, 0);
                    this.$emit("gameOver", {
                        score: e,
                        asc_time: 0,
                        action_data: this.uploadDataList
                    }),
                    this.$emit("popupResult")
                },
                startGame() {
                    this.isCanvasShow = !0,
                    this.grade = 0,
                    this.stepNum = 0,
                    this.downTime = Number(this.getBaseData.game_time);
                    let e = {
                        randomIndex: this.getTempStyle.obstacleList ? this.getTempStyle.obstacleList.length : 3,
                        addScoreNum: this.getTempStyle.addScoreNum,
                        addTimeNum: this.getTempStyle.addTimeNum,
                        isChangeColor: this.getTempStyle.isChangeColor,
                        fallStepNum: this.getTempStyle.fallStepNum,
                        fallSpeed: this.getTempStyle.fallSpeed
                    };
                    D.cultDownStart = this.countDown,
                    D.show(e),
                    this.startTime = (new Date).getTime()
                },
                countDown() {
                    this.countDownTimer || (this.countDownTimer = setInterval( () => {
                        this.downTime -= 1;
                        let e = (Number(this.getBaseData.game_time) - this.downTime) % (this.getTempStyle.cutdownNum || 5)
                          , t = (Number(this.getBaseData.game_time) - this.downTime) / (this.getTempStyle.cutdownNum || 5);
                        if (0 == e && D.colorChange(this.getTempStyle.fallSpeedQuit || 1, t),
                        this.downTime <= 10) {
                            let e = Object(b["b"])(document.getElementById("downTime"));
                            Object(b["c"])({
                                from: {
                                    scale: 1
                                },
                                to: {
                                    scale: 2.5
                                },
                                duration: 300,
                                ease: b["a"].easeInOut
                            }).start({
                                update: t => {
                                    e.set({
                                        scale: t.scale
                                    })
                                }
                                ,
                                complete: () => {
                                    Object(b["c"])({
                                        from: {
                                            scale: 2.5
                                        },
                                        to: {
                                            scale: 1
                                        },
                                        duration: 300,
                                        ease: b["a"].easeInOut
                                    }).start(e.set)
                                }
                            })
                        }
                        this.downTime <= 0 && (this.downTime = 0,
                        D.endGame(!0),
                        clearInterval(this.countDownTimer),
                        this.countDownTimer = null)
                    }
                    , 1e3))
                },
                soundGo(e) {
                    1 == this.music_status && window.createjs && window.createjs.Sound.play(e)
                },
                includeJS(e, t, i) {
                    if (null != i && !document.getElementById(e)) {
                        var n = document.getElementsByTagName("HEAD").item(0)
                          , a = document.createElement("script");
                        a.type = "text/javascript",
                        a.id = e,
                        a.src = i,
                        n.appendChild(a),
                        a.onload = () => {
                            window.createjs && (window.createjs.Sound.registerSound(r("d82c"), "jump"),
                            window.createjs.Sound.registerSound(r("d09e5"), "obstacle"),
                            window.createjs.Sound.registerSound(r("37f8"), "tool"))
                        }
                    }
                }
            }
        }
          , G = P
          , A = (r("4356"),
        r("0c7c"))
          , N = Object(A["a"])(G, o, s, !1, null, "2ef528f6", null)
          , H = N.exports
          , U = {
            name: "Parkour",
            components: {
                GameFrame: a["a"],
                playground: H
            },
            filters: {},
            extends: E["a"],
            mixins: [E["b"]],
            props: {},
            data() {
                return {
                    defaultObstacleList: [{
                        pic: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png"
                    }, {
                        pic: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier_1.png"
                    }, {
                        pic: "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier_2.png"
                    }]
                }
            },
            computed: {},
            watch: {},
            beforeCreate() {},
            created() {},
            beforeMount() {},
            mounted() {
                if (window.pixiUitl.imgList.bear = this.getTempStyle.bear || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/bear.png",
                window.pixiUitl.imgList.shielding = this.getTempStyle.addScoreTool || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-cake.png",
                window.pixiUitl.imgList.score = this.getTempStyle.addTimeTool || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/tool-moon.png",
                window.pixiUitl.imgList.bg = this.getBaseData.mobile_bg || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/background_c.png",
                this.getTempStyle.obstacleList ? 1 == this.getTempStyle.obstacleList.length ? window.pixiUitl.imgList.barrier = this.getTempStyle.obstacleList[0].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png" : 2 == this.getTempStyle.obstacleList.length ? (window.pixiUitl.imgList.barrier = this.getTempStyle.obstacleList[0].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_1 = this.getTempStyle.obstacleList[1].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png") : 3 == this.getTempStyle.obstacleList.length ? (window.pixiUitl.imgList.barrier = this.getTempStyle.obstacleList[0].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_1 = this.getTempStyle.obstacleList[1].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_2 = this.getTempStyle.obstacleList[2].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png") : 4 == this.getTempStyle.obstacleList.length ? (window.pixiUitl.imgList.barrier = this.getTempStyle.obstacleList[0].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_1 = this.getTempStyle.obstacleList[1].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_2 = this.getTempStyle.obstacleList[2].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_3 = this.getTempStyle.obstacleList[3].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png") : 5 == this.getTempStyle.obstacleList.length && (window.pixiUitl.imgList.barrier = this.getTempStyle.obstacleList[0].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_1 = this.getTempStyle.obstacleList[1].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_2 = this.getTempStyle.obstacleList[2].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_3 = this.getTempStyle.obstacleList[3].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png",
                window.pixiUitl.imgList.barrier_4 = this.getTempStyle.obstacleList[4].pic || "https://res.wmnetwork.cc/front_res/manage/module/game/jump/barrier.png") : this.defaultObstacleList.forEach( (e, t) => {
                    0 == t ? window.pixiUitl.imgList.barrier = e.pic : 1 == t ? window.pixiUitl.imgList.barrier_1 = e.pic : 2 == t && (window.pixiUitl.imgList.barrier_2 = e.pic)
                }
                ),
                this.getBaseData && this.getTempStyle.blockList.length > 0) {
                    const e = ["block", "block_change", "block_change_a", "block_change_d", "block_change_f", "block_change_j", "block_change_s"];
                    this.getTempStyle.blockList.forEach( (t, r) => {
                        r < e.length && (window.pixiUitl.imgList[e[r]] = t.pic)
                    }
                    )
                }
                window.pixiUitl.initSource(),
                console.log("window.pixiUitl.imgList", window.pixiUitl.imgList)
            },
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {
                handleStartGame() {}
            }
        }
          , F = U
          , Y = (r("2433"),
        Object(A["a"])(F, i, n, !1, null, "877eb3f8", null));
        t["default"] = Y.exports
    },
    c70f: function(e, t, r) {},
    d09e5: function(e, t, r) {
        e.exports = r.p + "static/media/obstacle.796a8043.wav"
    },
    d80c: function(e, t) {
        window.$util = {
            delay() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return new Promise(t => {
                    setTimeout(t, e)
                }
                )
            },
            uuid() {
                let e = []
                  , t = "0123456789abcdef";
                for (let r = 0; r < 36; r++)
                    e[r] = t.substr(Math.floor(16 * Math.random()), 1);
                return e[14] = "4",
                e[19] = t.substr(3 & e[19] | 8, 1),
                e[8] = e[13] = e[18] = e[23] = "-",
                e.join("")
            }
        }
    },
    d82c: function(e, t, r) {
        e.exports = r.p + "static/media/jump.60f1dfc5.wav"
    },
    d8fc: function(e, t, r) {},
    e1df: function(e, t, r) {
        "use strict";
        t["a"] = {
            player: $require("/resource/onlinegame/parkour/player.png"),
            gold: $require("/resource/onlinegame/parkour/props1.png"),
            gold_options: {},
            gold_icon: $require("/resource/onlinegame/parkour/gold_icon.png"),
            life: $require("/resource/onlinegame/parkour/props2.png"),
            obstacle: $require("/resource/onlinegame/parkour/obstacle.png"),
            magnetic: $require("/resource/onlinegame/parkour/magnetic.png"),
            shield: $require("/resource/onlinegame/parkour/shield.png"),
            scenery_list: [$require("/resource/onlinegame/parkour/decorate1.png"), $require("/resource/onlinegame/parkour/decorate2.png"), $require("/resource/onlinegame/parkour/decorate3.png")],
            track: $require("/resource/onlinegame/parkour/track.png"),
            back_img: $require("/resource/onlinegame/parkour/game_back.png"),
            strike: $require("/resource/onlinegame/parkour/strike.png"),
            gold_frame: [$require("/resource/onlinegame/parkour/gold/1.png"), $require("/resource/onlinegame/parkour/gold/2.png"), $require("/resource/onlinegame/parkour/gold/3.png"), $require("/resource/onlinegame/parkour/gold/4.png"), $require("/resource/onlinegame/parkour/gold/5.png"), $require("/resource/onlinegame/parkour/gold/6.png"), $require("/resource/onlinegame/parkour/gold/7.png"), $require("/resource/onlinegame/parkour/gold/8.png")],
            gold_take: [$require("/resource/onlinegame/parkour/gold_take/shouji_00003.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00004.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00005.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00006.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00007.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00008.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00009.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00010.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00011.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00012.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00013.png"), $require("/resource/onlinegame/parkour/gold_take/shouji_00014.png")],
            player_frame: [$require("/resource/onlinegame/parkour/player/longzhou_00000.png"), $require("/resource/onlinegame/parkour/player/longzhou_00001.png"), $require("/resource/onlinegame/parkour/player/longzhou_00002.png"), $require("/resource/onlinegame/parkour/player/longzhou_00003.png"), $require("/resource/onlinegame/parkour/player/longzhou_00004.png"), $require("/resource/onlinegame/parkour/player/longzhou_00005.png"), $require("/resource/onlinegame/parkour/player/longzhou_00006.png"), $require("/resource/onlinegame/parkour/player/longzhou_00007.png"), $require("/resource/onlinegame/parkour/player/longzhou_00008.png"), $require("/resource/onlinegame/parkour/player/longzhou_00009.png"), $require("/resource/onlinegame/parkour/player/longzhou_00010.png"), $require("/resource/onlinegame/parkour/player/longzhou_00011.png"), $require("/resource/onlinegame/parkour/player/longzhou_00012.png"), $require("/resource/onlinegame/parkour/player/longzhou_00013.png"), $require("/resource/onlinegame/parkour/player/longzhou_00014.png"), $require("/resource/onlinegame/parkour/player/longzhou_00015.png"), $require("/resource/onlinegame/parkour/player/longzhou_00016.png"), $require("/resource/onlinegame/parkour/player/longzhou_00017.png"), $require("/resource/onlinegame/parkour/player/longzhou_00018.png"), $require("/resource/onlinegame/parkour/player/longzhou_00019.png"), $require("/resource/onlinegame/parkour/player/longzhou_00020.png"), $require("/resource/onlinegame/parkour/player/longzhou_00021.png"), $require("/resource/onlinegame/parkour/player/longzhou_00022.png"), $require("/resource/onlinegame/parkour/player/longzhou_00023.png"), $require("/resource/onlinegame/parkour/player/longzhou_00024.png"), $require("/resource/onlinegame/parkour/player/longzhou_00025.png"), $require("/resource/onlinegame/parkour/player/longzhou_00026.png"), $require("/resource/onlinegame/parkour/player/longzhou_00027.png"), $require("/resource/onlinegame/parkour/player/longzhou_00028.png"), $require("/resource/onlinegame/parkour/player/longzhou_00029.png"), $require("/resource/onlinegame/parkour/player/longzhou_00030.png"), $require("/resource/onlinegame/parkour/player/longzhou_00031.png")],
            player1_frame: [$require("/resource/onlinegame/parkour/player/lh_00.png"), $require("/resource/onlinegame/parkour/player/lh_01.png"), $require("/resource/onlinegame/parkour/player/lh_02.png"), $require("/resource/onlinegame/parkour/player/lh_03.png"), $require("/resource/onlinegame/parkour/player/lh_04.png"), $require("/resource/onlinegame/parkour/player/lh_05.png"), $require("/resource/onlinegame/parkour/player/lh_06.png"), $require("/resource/onlinegame/parkour/player/lh_07.png"), $require("/resource/onlinegame/parkour/player/lh_08.png"), $require("/resource/onlinegame/parkour/player/lh_09.png"), $require("/resource/onlinegame/parkour/player/lh_10.png"), $require("/resource/onlinegame/parkour/player/lh_11.png")],
            player2_frame: [$require("/resource/onlinegame/parkour/player/yu_00_.png"), $require("/resource/onlinegame/parkour/player/yu_01_.png"), $require("/resource/onlinegame/parkour/player/yu_02_.png"), $require("/resource/onlinegame/parkour/player/yu_03_.png"), $require("/resource/onlinegame/parkour/player/yu_04_.png"), $require("/resource/onlinegame/parkour/player/yu_05_.png"), $require("/resource/onlinegame/parkour/player/yu_06_.png"), $require("/resource/onlinegame/parkour/player/yu_07_.png"), $require("/resource/onlinegame/parkour/player/yu_08_.png"), $require("/resource/onlinegame/parkour/player/yu_09_.png"), $require("/resource/onlinegame/parkour/player/yu_10_.png"), $require("/resource/onlinegame/parkour/player/yu_11_.png"), $require("/resource/onlinegame/parkour/player/yu_12_.png"), $require("/resource/onlinegame/parkour/player/yu_13_.png"), $require("/resource/onlinegame/parkour/player/yu_14_.png"), $require("/resource/onlinegame/parkour/player/yu_15_.png"), $require("/resource/onlinegame/parkour/player/yu_16_.png"), $require("/resource/onlinegame/parkour/player/yu_17_.png"), $require("/resource/onlinegame/parkour/player/yu_18_.png"), $require("/resource/onlinegame/parkour/player/yu_19_.png"), $require("/resource/onlinegame/parkour/player/yu_20_.png"), $require("/resource/onlinegame/parkour/player/yu_21_.png")],
            shield_frame: [$require("/resource/onlinegame/parkour/shield/Hd_00000.png"), $require("/resource/onlinegame/parkour/shield/Hd_00001.png"), $require("/resource/onlinegame/parkour/shield/Hd_00002.png"), $require("/resource/onlinegame/parkour/shield/Hd_00003.png"), $require("/resource/onlinegame/parkour/shield/Hd_00004.png"), $require("/resource/onlinegame/parkour/shield/Hd_00005.png"), $require("/resource/onlinegame/parkour/shield/Hd_00006.png"), $require("/resource/onlinegame/parkour/shield/Hd_00007.png"), $require("/resource/onlinegame/parkour/shield/Hd_00008.png"), $require("/resource/onlinegame/parkour/shield/Hd_00009.png"), $require("/resource/onlinegame/parkour/shield/Hd_00010.png"), $require("/resource/onlinegame/parkour/shield/Hd_00011.png"), $require("/resource/onlinegame/parkour/shield/Hd_00012.png")],
            protection_frame: [$require("/resource/onlinegame/parkour/protection/Bhz_00000.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00001.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00002.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00003.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00004.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00005.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00006.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00007.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00008.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00009.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00010.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00011.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00012.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00013.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00014.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00015.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00016.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00017.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00018.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00019.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00020.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00021.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00022.png"), $require("/resource/onlinegame/parkour/protection/Bhz_00023.png")],
            epiphqny_frame: [$require("/resource/onlinegame/parkour/epiphqny/fuh_00000.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00001.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00002.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00003.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00004.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00005.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00006.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00007.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00008.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00009.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00010.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00011.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00012.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00013.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00014.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00015.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00016.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00017.png"), $require("/resource/onlinegame/parkour/epiphqny/fuh_00018.png")],
            prop_sound: $require("/resource/onlinegame/parkour/sound_effect/prop.mp3"),
            obstacle_sound: $require("/resource/onlinegame/parkour/sound_effect/obstacle_sound.mp3"),
            collect_gold: $require("/resource/onlinegame/parkour/sound_effect/collect_gold1.mp3"),
            epiphqny_sound: $require("/resource/onlinegame/parkour/sound_effect/epiphqny.mp3"),
            protection_cover: $require("")
        }
    },
    e9e7: function(e, t, r) {
        "use strict";
        r.d(t, "b", (function() {
            return i
        }
        )),
        r.d(t, "a", (function() {
            return n
        }
        ));
        const i = {
            computed: {
                getMiniGame() {
                    return this.$store.state.mini_game
                },
                getPrizeList() {
                    return this.$store.state.mini_game.prize_list || []
                },
                getAdList() {
                    return this.$store.state.mini_game.ad_list || []
                },
                music_status() {
                    return this.$store.state.mini_game.music_status
                },
                getSkinType() {
                    const {skin_type: e} = this.getBaseData;
                    return e
                },
                getBaseData() {
                    return this.$store.state.mini_game.base_data || {}
                },
                getTempStyle() {
                    return this.getBaseData.temp_style || {}
                },
                theme_color() {
                    const {theme_color: e={}} = this.getBaseData.temp_style
                      , t = {};
                    for (const r in e) {
                        const i = r.includes("color_") ? r.replace("color_", "--color-") : r;
                        t[i] = e[r]
                    }
                    return t
                },
                getRankInfo() {
                    return this.$store.state.mini_game.rank_info
                },
                getExtensionConfig() {
                    return this.getMiniGame.extensionConfig || {}
                },
                getElementIntroductionList() {
                    return this.$store.state.mini_game.element_introduction_list
                }
            }
        }
          , n = {
            name: "GameCommonMethods",
            components: {},
            filters: {},
            mixins: [],
            props: {},
            data() {
                return {
                    _mini_game_is_ajaxing: !1,
                    isAutoPlay: !0,
                    isShowPage: !0,
                    module_type: "22",
                    type: "turn",
                    gameComponent: "",
                    baseData: null,
                    mobileBg: "",
                    prizeList: [],
                    adList: [],
                    isAjaxing: !1,
                    isPosterShow: !1,
                    posterOption: {
                        mid: "",
                        use_type: "",
                        select_id: "",
                        poster_value_data: null,
                        sub_type: "",
                        template_id: "",
                        member_id: ""
                    }
                }
            },
            computed: {
                _mini_game_pageState() {
                    return this.$store.state.mini_game.pageState
                },
                _mini_game_music_status() {
                    return this.$store.state.mini_game.music_status
                },
                _mini_game_base_data() {
                    return this.$store.state.mini_game.base_data || {}
                },
                _mini_game_temp_style() {
                    return this._mini_game_base_data.temp_style || {}
                }
            },
            watch: {},
            beforeCreate() {},
            created() {
                const {mid: e, use_type: t=1001, game_id: r, temp_no: i} = this.getWmQuery;
                e ? t || r ? (this.$store.state.mini_game.mid = e,
                this.$store.state.mini_game.use_type = t,
                this.$store.state.mini_game.game_id = r,
                this.$store.state.mini_game.temp_no = i,
                this.getInitInfo()) : t_warning("未找到有效游戏信息") : t_warning("未找到有效活动")
            },
            beforeMount() {},
            mounted() {},
            beforeUpdate() {},
            updated() {},
            activated() {},
            deactivated() {},
            beforeDestroy() {},
            destroyed() {},
            methods: {
                getInitInfo() {}
            }
        }
    },
    f108: function(e, t, r) {
        "use strict";
        r("68f5")
    },
    fae4: function(e, t, r) {}
}]);
