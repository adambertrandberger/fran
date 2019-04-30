"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = function () {
    var t = function t(_t, e, n, s) {
        for (n = n || {}, s = _t.length; s--; n[_t[s]] = e) {}return n;
    },
        e = [1, 3],
        n = [1, 4],
        s = [1, 5],
        i = [1, 6],
        r = [1, 7],
        h = [1, 8],
        o = [1, 9],
        a = [2, 17],
        c = [1, 12],
        l = [6, 7, 13, 16, 19, 21, 23, 25, 30],
        y = [1, 14],
        u = [1, 20],
        p = [16, 21],
        f = [19, 21],
        g = [1, 48],
        _ = { trace: function trace() {}, yy: {}, symbols_: { error: 2, top: 3, type: 4, annotations: 5, EOF: 6, "~>": 7, IDENT: 8, sum_tail: 9, _: 10, "'": 11, "[": 12, "]": 13, "(": 14, types: 15, ")": 16, "<": 17, named_types: 18, ">": 19, "{": 20, "}": 21, "+": 22, ",": 23, ":": 24, "\\\\": 25, bounds: 26, throws: 27, bound: 28, bound_tail: 29, "<=": 30, $accept: 0, $end: 1 }, terminals_: { 2: "error", 6: "EOF", 7: "~>", 8: "IDENT", 10: "_", 11: "'", 12: "[", 13: "]", 14: "(", 16: ")", 17: "<", 19: ">", 20: "{", 21: "}", 22: "+", 23: ",", 24: ":", 25: "\\\\", 30: "<=" }, productions_: [0, [3, 3], [3, 5], [4, 1], [4, 2], [4, 1], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3], [9, 2], [9, 3], [15, 1], [15, 3], [18, 3], [18, 5], [5, 0], [5, 6], [26, 2], [26, 3], [26, 4], [27, 2], [27, 3], [28, 3], [29, 2], [29, 3]], performAction: function performAction(t, e, n, s, i, r, h) {
            var o = r.length - 1;switch (i) {case 1:
                    return [r[o - 2], r[o - 1]];case 2:
                    return [r[o - 4], r[o - 2], r[o - 1]];case 3:
                    this.$ = new NamedType(r[o]);break;case 4:
                    this.$ = new SumType([r[o - 1]].concat(r[o]));break;case 5:
                    this.$ = new TopType();break;case 6:
                    this.$ = new ParamType(r[o]);break;case 7:
                    this.$ = new ArrayType(r[o - 1]);break;case 8:
                    this.$ = new TupleType(r[o - 1]);break;case 9:
                    this.$ = new TaggedUnionType(m(r[o - 1]));break;case 10:
                    this.$ = new RecordType(m(r[o - 1]));break;case 11:case 13:case 25:
                    this.$ = [r[o]];break;case 12:case 26:
                    this.$ = [r[o - 1]].concat(r[o]);break;case 14:
                    this.$ = [r[o - 2]].concat(r[o]);break;case 15:
                    this.$ = [[r[o - 2], r[o]]];break;case 16:
                    this.$ = [[r[o - 4], r[o - 2]]].concat(r[o]);break;case 17:
                    this.$ = [[], []];break;case 18:
                    this.$ = [r[o - 3], r[o - 1]];break;case 19:
                    this.$ = [];break;case 20:
                    this.$ = [r[o - 1]];break;case 21:
                    this.$ = [r[o - 2]].concat(r[o - 1]);break;case 22:
                    this.$ = [];break;case 23:
                    this.$ = r[o - 1];break;case 24:
                    this.$ = new Constraint(r[o - 2], r[o]);}
        }, table: [{ 3: 1, 4: 2, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o }, { 1: [3] }, { 5: 10, 6: a, 7: [1, 11], 25: c }, t(l, [2, 3], { 9: 13, 22: y }), t(l, [2, 5]), { 8: [1, 15] }, { 4: 16, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o }, { 4: 18, 8: e, 10: n, 11: s, 12: i, 14: r, 15: 17, 17: h, 20: o }, { 8: u, 18: 19 }, { 8: u, 18: 21 }, { 6: [1, 22] }, { 4: 23, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o }, { 14: [1, 24] }, t(l, [2, 4]), { 8: [1, 25] }, t(l, [2, 6]), { 13: [1, 26] }, { 16: [1, 27] }, t(p, [2, 13], { 23: [1, 28] }), { 19: [1, 29] }, { 24: [1, 30] }, { 21: [1, 31] }, { 1: [2, 1] }, { 5: 32, 6: a, 25: c }, { 20: [1, 34], 26: 33 }, t(l, [2, 11], { 9: 35, 22: y }), t(l, [2, 7]), t(l, [2, 8]), { 4: 18, 8: e, 10: n, 11: s, 12: i, 14: r, 15: 36, 17: h, 20: o }, t(l, [2, 9]), { 4: 37, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o }, t(l, [2, 10]), { 6: [1, 38] }, { 23: [1, 39] }, { 4: 42, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o, 21: [1, 40], 28: 41 }, t(l, [2, 12]), t(p, [2, 14]), t(f, [2, 15], { 23: [1, 43] }), { 1: [2, 2] }, { 20: [1, 45], 27: 44 }, { 23: [2, 19] }, { 21: [1, 46], 23: g, 29: 47 }, { 30: [1, 49] }, { 8: u, 18: 50 }, { 16: [1, 51] }, { 4: 18, 8: e, 10: n, 11: s, 12: i, 14: r, 15: 53, 17: h, 20: o, 21: [1, 52] }, { 23: [2, 20] }, { 21: [1, 54] }, { 4: 42, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o, 28: 55 }, { 4: 56, 8: e, 10: n, 11: s, 12: i, 14: r, 17: h, 20: o }, t(f, [2, 16]), { 6: [2, 18] }, { 16: [2, 22] }, { 21: [1, 57] }, { 23: [2, 21] }, { 21: [2, 25], 23: g, 29: 58 }, t([21, 23], [2, 24]), { 16: [2, 23] }, { 21: [2, 26] }], defaultActions: { 22: [2, 1], 38: [2, 2], 40: [2, 19], 46: [2, 20], 51: [2, 18], 52: [2, 22], 54: [2, 21], 57: [2, 23], 58: [2, 26] }, parseError: function parseError(t, e) {
            if (!e.recoverable) {
                var n = new Error(t);throw n.hash = e, n;
            }this.trace(t);
        }, parse: function parse(t) {
            var e = this,
                n = [0],
                s = [null],
                i = [],
                r = this.table,
                h = "",
                o = 0,
                a = 0,
                c = 0,
                l = i.slice.call(arguments, 1),
                y = Object.create(this.lexer),
                u = { yy: {} };for (var p in this.yy) {
                Object.prototype.hasOwnProperty.call(this.yy, p) && (u.yy[p] = this.yy[p]);
            }y.setInput(t, u.yy), u.yy.lexer = y, u.yy.parser = this, void 0 === y.yylloc && (y.yylloc = {});var f = y.yylloc;i.push(f);var g = y.options && y.options.ranges;"function" == typeof u.yy.parseError ? this.parseError = u.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;for (var _, m, d, k, b, x, v, w, $, E = function E() {
                var t;return "number" != typeof (t = y.lex() || 1) && (t = e.symbols_[t] || t), t;
            }, S = {};;) {
                if (d = n[n.length - 1], void 0 === (k = this.defaultActions[d] ? this.defaultActions[d] : (null == _ && (_ = E()), r[d] && r[d][_])) || !k.length || !k[0]) {
                    var I = "";for (x in $ = [], r[d]) {
                        this.terminals_[x] && 2 < x && $.push("'" + this.terminals_[x] + "'");
                    }I = y.showPosition ? "Parse error on line " + (o + 1) + ":\n" + y.showPosition() + "\nExpecting " + $.join(", ") + ", got '" + (this.terminals_[_] || _) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (1 == _ ? "end of input" : "'" + (this.terminals_[_] || _) + "'"), this.parseError(I, { text: y.match, token: this.terminals_[_] || _, line: y.yylineno, loc: f, expected: $ });
                }if (k[0] instanceof Array && 1 < k.length) throw new Error("Parse Error: multiple actions possible at state: " + d + ", token: " + _);switch (k[0]) {case 1:
                        n.push(_), s.push(y.yytext), i.push(y.yylloc), n.push(k[1]), _ = null, m ? (_ = m, m = null) : (a = y.yyleng, h = y.yytext, o = y.yylineno, f = y.yylloc, 0 < c && c--);break;case 2:
                        if (v = this.productions_[k[1]][1], S.$ = s[s.length - v], S._$ = { first_line: i[i.length - (v || 1)].first_line, last_line: i[i.length - 1].last_line, first_column: i[i.length - (v || 1)].first_column, last_column: i[i.length - 1].last_column }, g && (S._$.range = [i[i.length - (v || 1)].range[0], i[i.length - 1].range[1]]), void 0 !== (b = this.performAction.apply(S, [h, a, o, u.yy, k[1], s, i].concat(l)))) return b;v && (n = n.slice(0, -1 * v * 2), s = s.slice(0, -1 * v), i = i.slice(0, -1 * v)), n.push(this.productions_[k[1]][0]), s.push(S.$), i.push(S._$), w = r[n[n.length - 2]][n[n.length - 1]], n.push(w);break;case 3:
                        return !0;}
            }return !0;
        } };function m(t) {
        var e = {};return t.forEach(function (t) {
            if (t[0] in e) throw new Error("Duplicate key in record type.");e[t[0]] = t[1];
        }), e;
    }var d = { EOF: 1, parseError: function parseError(t, e) {
            if (!this.yy.parser) throw new Error(t);this.yy.parser.parseError(t, e);
        }, setInput: function setInput(t, e) {
            return this.yy = e || this.yy || {}, this._input = t, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
        }, input: function input() {
            var t = this._input[0];return this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t, t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t;
        }, unput: function unput(t) {
            var e = t.length,
                n = t.split(/(?:\r\n?|\n)/g);this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e), this.offset -= e;var s = this.match.split(/(?:\r\n?|\n)/g);this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);var i = this.yylloc.range;return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: n ? (n.length === s.length ? this.yylloc.first_column : 0) + s[s.length - n.length].length - n[0].length : this.yylloc.first_column - e }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - e]), this.yyleng = this.yytext.length, this;
        }, more: function more() {
            return this._more = !0, this;
        }, reject: function reject() {
            return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
        }, less: function less(t) {
            this.unput(this.match.slice(t));
        }, pastInput: function pastInput() {
            var t = this.matched.substr(0, this.matched.length - this.match.length);return (20 < t.length ? "..." : "") + t.substr(-20).replace(/\n/g, "");
        }, upcomingInput: function upcomingInput() {
            var t = this.match;return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (20 < t.length ? "..." : "")).replace(/\n/g, "");
        }, showPosition: function showPosition() {
            var t = this.pastInput(),
                e = new Array(t.length + 1).join("-");return t + this.upcomingInput() + "\n" + e + "^";
        }, test_match: function test_match(t, e) {
            var n, s, i;if (this.options.backtrack_lexer && (i = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (i.yylloc.range = this.yylloc.range.slice(0))), (s = t[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += s.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], n = this.performAction.call(this, this.yy, this, e, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;if (this._backtrack) {
                for (var r in i) {
                    this[r] = i[r];
                }return !1;
            }return !1;
        }, next: function next() {
            if (this.done) return this.EOF;var t, e, n, s;this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");for (var i = this._currentRules(), r = 0; r < i.length; r++) {
                if ((n = this._input.match(this.rules[i[r]])) && (!e || n[0].length > e[0].length)) {
                    if (e = n, s = r, this.options.backtrack_lexer) {
                        if (!1 !== (t = this.test_match(n, i[r]))) return t;if (this._backtrack) {
                            e = !1;continue;
                        }return !1;
                    }if (!this.options.flex) break;
                }
            }return e ? !1 !== (t = this.test_match(e, i[s])) && t : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
        }, lex: function lex() {
            var t = this.next();return t || this.lex();
        }, begin: function begin(t) {
            this.conditionStack.push(t);
        }, popState: function popState() {
            return 0 < this.conditionStack.length - 1 ? this.conditionStack.pop() : this.conditionStack[0];
        }, _currentRules: function _currentRules() {
            return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
        }, topState: function topState(t) {
            return 0 <= (t = this.conditionStack.length - 1 - Math.abs(t || 0)) ? this.conditionStack[t] : "INITIAL";
        }, pushState: function pushState(t) {
            this.begin(t);
        }, stateStackSize: function stateStackSize() {
            return this.conditionStack.length;
        }, options: {}, performAction: function performAction(t, e, n, s) {
            switch (n) {case 0:
                    return 7;case 1:
                    return 30;case 2:
                    return 25;case 3:
                    return 10;case 4:
                    return 14;case 5:
                    return 16;case 6:
                    return 17;case 7:
                    return 19;case 8:
                    return 12;case 9:
                    return 13;case 10:
                    return 20;case 11:
                    return 21;case 12:
                    return 23;case 13:
                    return 24;case 14:
                    return 22;case 15:
                    return "'";case 16:
                    return 8;case 17:
                    break;case 18:
                    return 6;case 19:
                    return "INVALID";}
        }, rules: [/^(?:~>)/, /^(?:<=)/, /^(?:\\)/, /^(?:_\b)/, /^(?:\()/, /^(?:\))/, /^(?:<)/, /^(?:>)/, /^(?:\[)/, /^(?:\])/, /^(?:\{)/, /^(?:\})/, /^(?:,)/, /^(?::)/, /^(?:\+)/, /^(?:')/, /^(?:[_a-zA-Z][_a-zA-Z0-9]*)/, /^(?:\s+)/, /^(?:$)/, /^(?:.)/], conditions: { INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], inclusive: !0 } } };function k() {
        this.yy = {};
    }return _.lexer = d, new ((k.prototype = _).Parser = k)();
}();"undefined" != typeof require && "undefined" != typeof exports && (exports.parser = parser, exports.Parser = parser.Parser, exports.parse = function () {
    return parser.parse.apply(parser, arguments);
}, exports.main = function (t) {
    t[1] || (console.log("Usage: " + t[0] + " FILE"), process.exit(1));var e = require("fs").readFileSync(require("path").normalize(t[1]), "utf8");return exports.parser.parse(e);
}, "undefined" != typeof module && require.main === module && exports.main(process.argv.slice(1)));
var numarrows = 0;
var numannotations = 0;
var annotationParseTime = 0;

var typechecks = 0;
var typecheckTime = 0;

var started = void 0;
var typecheck = true;
var benchmark = false;
var displaychecks = false;

function _benchmarkStart(shouldTypecheck) {
    benchmark = true;
    typecheck = shouldTypecheck;

    started = window.performance.now();
}

function _benchmarkResultsOrRun() /* ...arrows */{
    if (benchmark) {
        var elapsed = window.performance.now() - started;

        console.log("Arrows: " + numarrows);
        console.log("Num annotations: " + numannotations);
        console.log("Composition time: " + elapsed + " (" + annotationParseTime + ")");
    } else {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].run();
        }
    }
}

function _construct(f) {
    if (typecheck) {
        return f();
    } else {
        return new ArrowType(new TopType(), new TopType());
    }
}

function _check(type, value) {
    if (typecheck) {
        var start = window.performance.now();

        type.check(value);

        var elapsed = window.performance.now() - start;
        typechecks++;
        typecheckTime += elapsed;

        if (displaychecks) {
            console.log(typechecks + " checks, " + typecheckTime + "ms");
        }
    }
}

Array.create = function (length, value) {
    var arr = [];
    while (--length >= 0) {
        arr.push(value);
    }

    return arr;
};

Array.copy = function (array) {
    return [].slice.call(array);
};

Array.prototype.unique = function () {
    return this.filter(function (v, i, s) {
        return s.indexOf(v) === i;
    });
};

Function.prototype.lift = function () {
    return new LiftedArrow(this);
};

Number.prototype.lift = function () {
    var value = this.valueOf();

    return new LiftedArrow(function () {
        /* @arrow :: _ ~> Number */
        return value;
    });
};

Boolean.prototype.lift = function () {
    var value = this.valueOf();

    return new LiftedArrow(function () {
        /* @arrow :: _ ~> Bool */
        return value;
    });
};

String.prototype.lift = function () {
    var value = this.valueOf();

    return new LiftedArrow(function () {
        /* @arrow :: _ ~> String */
        return value;
    });
};

var Arrow = function () {
    function Arrow(type) {
        _classCallCheck(this, Arrow);

        numarrows++;
        this.type = type;
    }

    _createClass(Arrow, [{
        key: "call",
        value: function call(x, p, k, h) {
            throw new Error("Call undefined");
        }
    }, {
        key: "equals",
        value: function equals(that) {
            throw new Error("Equals undefined");
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return false;
        }
    }, {
        key: "run",
        value: function run() {
            if (!(this.type.arg instanceof TopType)) {
                throw new Error("Cannot run an arrow that takes arguments");
            }

            var p = new Progress(true);
            this.call(null, p, function () {}, function (err) {
                throw err;
            });
            return p;
        }

        // Combinator constructors

    }, {
        key: "noemit",
        value: function noemit() {
            return Arrow.noemit(this);
        }
    }, {
        key: "seq",
        value: function seq() /* ...arrows */{
            return Arrow.seq([this].concat(Array.copy(arguments)));
        }
    }, {
        key: "any",
        value: function any() /* ...arrows */{
            return Arrow.any([this].concat(Array.copy(arguments)));
        }
    }, {
        key: "all",
        value: function all() /* ...arrows */{
            return Arrow.all([this].concat(Array.copy(arguments)));
        }
    }, {
        key: "try",
        value: function _try(success, failure) {
            return Arrow.try(this, success, failure);
        }

        // Convenience API

    }, {
        key: "named",
        value: function named(name) {
            return new NamedArrow(name, this);
        }
    }, {
        key: "lift",
        value: function lift() {
            return this;
        }
    }, {
        key: "wait",
        value: function wait(duration) {
            return this.seq(new DelayArrow(duration));
        }
    }, {
        key: "after",
        value: function after(duration) {
            return new DelayArrow(duration).seq(this);
        }
    }, {
        key: "triggeredBy",
        value: function triggeredBy(selector, event) {
            return new ElemArrow(selector).seq(new EventArrow(event)).remember().seq(this);
        }
    }, {
        key: "then",
        value: function then(success, failure) {
            if (failure === undefined) {
                return this.seq(success);
            } else {
                return this.try(success, failure);
            }
        }
    }, {
        key: "catch",
        value: function _catch(failure) {
            return this.then(Arrow.id(), failure);
        }

        // Data Routing

    }, {
        key: "split",
        value: function split(n) {
            return this.seq(new SplitArrow(n));
        }
    }, {
        key: "nth",
        value: function nth(n) {
            return this.seq(new NthArrow(n));
        }
    }, {
        key: "fanout",
        value: function fanout() /* ...arrows */{
            return Arrow.fanout([this].concat(Array.copy(arguments)));
        }
    }, {
        key: "tap",
        value: function tap() /* ...functions */{
            var sec = getNonNullElems(Array.copy(arguments)).map(function (a) {
                return a.lift();
            });
            var all = [this].concat(sec);
            var rem = [this].concat(sec.map(function (a) {
                return a.remember();
            }));

            return new NamedArrow("tap(" + all.map(function (a) {
                return a.toString();
            }).join(", ") + ")", Arrow.seq(rem));
        }
    }, {
        key: "on",
        value: function on(name, handler) {
            return new NamedArrow("on(" + name + ", {0})", this.seq(new SplitArrow(2), Arrow.id().all(new EventArrow(name)), handler), [handler]);
        }
    }, {
        key: "remember",
        value: function remember() {
            return new NamedArrow("remember({0})", this.carry().nth(1), [this]);
        }
    }, {
        key: "carry",
        value: function carry() {
            return new NamedArrow("carry({0})", new SplitArrow(2).seq(Arrow.id().all(this)), [this]);
        }

        // Repeating

    }, {
        key: "repeat",
        value: function repeat() {
            var _this = this;

            return new NamedArrow("repeat({0})", Arrow.fix(function (a) {
                return _this.wait(0).seq(Arrow.try(Arrow.repeatTail(), a, Arrow.id()));
            }), [this]);
        }
    }, {
        key: "times",
        value: function times(n) {
            var init = new LiftedArrow(function () {
                /* @arrow :: _ ~> Number */
                return n;
            });

            var rep = new LiftedArrow(function (n, x, y) {
                /* @arrow :: (Number, 'a, 'b) ~> <loop: (Number, 'a, 'a), halt: 'b> */
                return n > 1 ? Arrow.loop([n - 1, x, x]) : Arrow.halt(y);
            });

            var arr = Arrow.seq([Arrow.fanout([init.lift(), Arrow.id(), Arrow.id()]), Arrow.all([Arrow.id(), Arrow.id(), this]).seq(rep).repeat()]);

            return new NamedArrow("times(" + n + ", {0})", arr, [this]);
        }
    }, {
        key: "forever",
        value: function forever() {
            return new NamedArrow("forever({0})", this.seq(Arrow.reptop()).repeat(), [this]);
        }
    }, {
        key: "whileTrue",
        value: function whileTrue() {
            return new NamedArrow("whileTrue({0})", this.carry().seq(Arrow.repcond()).repeat(), [this]);
        }
    }]);

    return Arrow;
}();

// Unary combinators


Arrow.noemit = function (arrow) {
    return new NoEmitCombinator(arrow);
};

// N-ary combinators
Arrow.seq = function (arrows) {
    return new SeqCombinator(arrows);
};
Arrow.any = function (arrows) {
    return new AnyCombinator(arrows);
};
Arrow.all = function (arrows) {
    return new AllCombinator(arrows);
};
Arrow.try = function (a, s, f) {
    return new TryCombinator(a, s, f);
};
Arrow.fanout = function (arrows) {
    arrows = getNonNullArrows(arrows);
    var result = new SplitArrow(arrows.length).seq(Arrow.all(arrows));
    return new NamedArrow("fanout(" + arrows.map(function (a) {
        return a.toString();
    }).join(", ") + ")", result, arrows);
};

// Convenience
Arrow.repeat = function (a) {
    return a.repeat();
};
Arrow.bind = function (event, a) {
    return new NamedArrow("bind(" + event + ", {0})", Arrow.seq([new SplitArrow(2), Arrow.id().all(new EventArrow(event)), a]), [a]);
};
Arrow.catch = function (a, f) {
    return Arrow.try(a, Arrow.id(), f);
};
Arrow.db = function (f, db) {
    return new QueryArrow(f, db);
};

// Built-ins
Arrow.id = function () {
    return new LiftedArrow(function (x) {
        /* @arrow :: 'a ~> 'a */
        return x;
    }).named("id");
};

Arrow.log = function () {
    return new LiftedArrow(function (x) {
        /* @arrow :: 'a ~> 'a */
        console.log(x);
        return x;
    }).named("log");
};

Arrow.throwFalse = function () {
    return new LiftedArrow(function (x) {
        /* @arrow :: Bool ~> _ \ ({}, {Bool}) */
        if (x) {
            throw x;
        }
    }).named("throwFalse");
};

// Repetition helpers
Arrow.reptop = function () {
    return new LiftedArrow(function (x) {
        /* @arrow :: _ ~> <loop: _, halt: _> */
        return Arrow.loop(null);
    });
};

Arrow.repcond = function () {
    return new LiftedArrow(function (x, f) {
        /* @arrow :: ('a, Bool) ~> <loop: 'a, halt: _> */
        return f ? Arrow.loop(x) : Arrow.halt(null);
    });
};

Arrow.repeatTail = function () {
    return new LiftedArrow(function (x) {
        /* @arrow :: <loop: 'a, halt: 'b> ~> 'a \ ({}, {'b}) */
        if (x.hasTag("loop")) {
            return x.value();
        } else {
            throw x.value();
        }
    });
};

var TaggedValue = function () {
    function TaggedValue(tag, val) {
        _classCallCheck(this, TaggedValue);

        this.tag = tag;
        this.val = val;
    }

    _createClass(TaggedValue, [{
        key: "hasTag",
        value: function hasTag(tag) {
            return tag == this.tag;
        }
    }, {
        key: "value",
        value: function value() {
            return this.val;
        }
    }]);

    return TaggedValue;
}();

// Utility Constructors


Arrow.loop = function (x) {
    return new TaggedValue("loop", x);
};
Arrow.halt = function (x) {
    return new TaggedValue("halt", x);
};

var _cancelerId = 0;

var Progress = function () {
    function Progress(canEmit) {
        _classCallCheck(this, Progress);

        this.canEmit = canEmit;
        this.cancelers = {};
        this.observers = [];
    }

    _createClass(Progress, [{
        key: "addObserver",
        value: function addObserver(observer) {
            this.observers.push(observer);
        }
    }, {
        key: "addCanceler",
        value: function addCanceler(canceler) {
            var id = _cancelerId++;
            this.cancelers[id] = canceler;
            return id;
        }
    }, {
        key: "advance",
        value: function advance(cancelerId) {
            if (cancelerId != null) {
                this.cancelers[cancelerId] = null;
            }

            while (this.observers.length > 0) {
                var observer = this.observers.pop();

                if (this.canEmit) {
                    observer();
                }
            }
        }
    }, {
        key: "cancel",
        value: function cancel() {
            for (var id in this.cancelers) {
                if (this.cancelers[id] != null) {
                    this.cancelers[id]();
                }
            }

            this.cancelers = {};
        }
    }]);

    return Progress;
}();

var annotationCache = {};

var LiftedArrow = function (_Arrow) {
    _inherits(LiftedArrow, _Arrow);

    function LiftedArrow(f) {
        _classCallCheck(this, LiftedArrow);

        if (!(f instanceof Function)) {
            throw new Error("Cannot lift non-function");
        }

        var _this2 = _possibleConstructorReturn(this, (LiftedArrow.__proto__ || Object.getPrototypeOf(LiftedArrow)).call(this, _construct(function () {
            var start = window.performance.now();

            var s = f.toString();
            var i = s.indexOf("/*");
            var j = s.indexOf("*/", i + 1);
            var c = s.substring(i + 2, j);

            var parsed = annotationCache[c];

            if (annotationCache[c] === undefined) {
                var comment = void 0;

                try {
                    comment = c.match(/\@arrow :: (.*)\n?/)[1];
                } catch (err) {
                    if (typecheck) {
                        console.warn("Function being lifted does not contain an @arrow annotation");
                    }

                    comment = "_ ~> _";
                }

                try {
                    // jison exports the parser name like this
                    parsed = parser.parse(comment);
                } catch (err) {
                    throw new ComposeError("Function being lifted does not contain a parseable @arrow annotation.\n" + err.message + "\n");
                }

                annotationCache[c] = parsed;
            }

            var elapsed = window.performance.now() - start;
            numannotations++;
            annotationParseTime += elapsed;

            var arg = parsed[0];
            var out = parsed[1];
            var ncs = new ConstraintSet([]).addAll(parsed[2][0]);

            return new ArrowType(arg, out, ncs, parsed[2][1]).sanitize();
        })));

        _this2.f = f;
        return _this2;
    }

    _createClass(LiftedArrow, [{
        key: "toString",
        value: function toString() {
            return "lift :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var result = void 0;

            try {
                // If the function has more than one parameter and we have
                // an array argument, spread the elements. Else, just call
                // the function with a single argument.

                if (x && x.constructor === Array && this.f.length > 1) {
                    result = this.f.apply(null, x);
                } else {
                    result = this.f(x);
                }


            } catch (err) {
                return h(err);
            }

            k(result);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof LiftedArrow && this.f === that.f;
        }
    }]);

    return LiftedArrow;
}(Arrow);

var ElemArrow = function (_LiftedArrow) {
    _inherits(ElemArrow, _LiftedArrow);

    function ElemArrow(selector) {
        _classCallCheck(this, ElemArrow);

        var _this3 = _possibleConstructorReturn(this, (ElemArrow.__proto__ || Object.getPrototypeOf(ElemArrow)).call(this, function () {
            /* @arrow :: _ ~> Elem */
            return $(selector);
        }));

        _this3.selector = selector;
        return _this3;
    }

    _createClass(ElemArrow, [{
        key: "toString",
        value: function toString() {
            return "elem :: " + this.type.toString();
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof ElemArrow && this.selector === that.selector;
        }
    }]);

    return ElemArrow;
}(LiftedArrow);

//
// Simple Asynchronous Arrow Implementation
//

var SimpleAsyncArrow = function (_Arrow2) {
    _inherits(SimpleAsyncArrow, _Arrow2);

    function SimpleAsyncArrow() {
        _classCallCheck(this, SimpleAsyncArrow);

        return _possibleConstructorReturn(this, (SimpleAsyncArrow.__proto__ || Object.getPrototypeOf(SimpleAsyncArrow)).apply(this, arguments));
    }

    _createClass(SimpleAsyncArrow, [{
        key: "isAsync",
        value: function isAsync() {
            return true;
        }
    }]);

    return SimpleAsyncArrow;
}(Arrow);

// Simple Asynchronous Arrow that takes in a config object

var SimpleConfigBasedAsyncArrow = function (_SimpleAsyncArrow) {
    _inherits(SimpleConfigBasedAsyncArrow, _SimpleAsyncArrow);

    function SimpleConfigBasedAsyncArrow(f, errorType) {
        _classCallCheck(this, SimpleConfigBasedAsyncArrow);

        if (!(f instanceof Function)) {
            throw new Error("Cannot use non-function as configuration value");
        }

        var _this5 = _possibleConstructorReturn(this, (SimpleConfigBasedAsyncArrow.__proto__ || Object.getPrototypeOf(SimpleConfigBasedAsyncArrow)).call(this, _construct(function () {
            var start = window.performance.now();

            var s = f.toString();
            var i = s.indexOf("/*");
            var j = s.indexOf("*/", i + 1);
            var c = s.substring(i + 2, j);

            var ncs = new ConstraintSet([]);
            var err = [new NamedType(errorType)];

            var conf = void 0;
            var resp = void 0;

            if (annotationCache[c] !== undefined) {
                conf = annotationCache[c][0];
                resp = annotationCache[c][1];
            } else {
                try {
                    // jison exports the parser name like this
                    conf = parser.parse(c.match(/\@conf :: (.*)\n?/)[1]);

                    ncs = ncs.addAll(conf[1][0]);
                    err = err.concat(conf[1][1]);
                } catch (err) {
                    throw new ComposeError("Config does not contain a parseable @conf annotation.\n" + err.message + "\n");
                }

                try {
                    // jison exports the parser name like this
                    resp = parser.parse(c.match(/\@resp :: (.*)\n?/)[1]);

                    ncs = ncs.addAll(resp[1][0]);
                    err = err.concat(resp[1][1]);
                } catch (err) {
                    throw new ComposeError("Config does not contain a parseable @resp annotation.\n" + err.message + "\n");
                }

                annotationCache[c] = [conf, resp];
            }

            var elapsed = window.performance.now() - start;
            numannotations++;
            annotationParseTime += elapsed;

            return new ArrowType(conf[0], resp[0], ncs, err).sanitize();
        })));

        _this5.c = f;
        return _this5;
    }

    return SimpleConfigBasedAsyncArrow;
}(SimpleAsyncArrow);

var AjaxArrow = function (_SimpleConfigBasedAsy) {
    _inherits(AjaxArrow, _SimpleConfigBasedAsy);

    function AjaxArrow(f) {
        _classCallCheck(this, AjaxArrow);

        return _possibleConstructorReturn(this, (AjaxArrow.__proto__ || Object.getPrototypeOf(AjaxArrow)).call(this, f, "AjaxError"));
    }

    _createClass(AjaxArrow, [{
        key: "toString",
        value: function toString() {
            return "ajax :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var _this7 = this;

            // If the function has more than one parameter and we have
            // an array argument, spread the elements. Else, just call
            // the function with a single argument.

            // TODO - wrap this in try

            var conf = void 0;
            if (x && x.constructor === Array && this.c.length > 1) {
                conf = this.c.apply(null, x);
            } else {
                conf = this.c(x);
            }

            var abort = false;

            var cancel = function cancel() {
                abort = true;
            };

            var fail = h;
            var succ = function succ(x) {

                k(x);
            };

            $.ajax($.extend(conf, {
                success: function success(x, status, xhr) {
                    if (!abort) {
                        p.advance(cancelerId);succ(x);
                    }
                },
                error: function error(xhr, status, x) {
                    if (!abort) {
                        p.advance(cancelerId);fail(x);
                    }
                }
            }));

            var cancelerId = p.addCanceler(cancel);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            // TODO - deep comparison of objects
            return that instanceof AjaxArrow && this.c === that.c;
        }
    }]);

    return AjaxArrow;
}(SimpleConfigBasedAsyncArrow);

var QueryArrow = function (_SimpleConfigBasedAsy2) {
    _inherits(QueryArrow, _SimpleConfigBasedAsy2);

    function QueryArrow(f, db) {
        _classCallCheck(this, QueryArrow);

        var _this8 = _possibleConstructorReturn(this, (QueryArrow.__proto__ || Object.getPrototypeOf(QueryArrow)).call(this, f, "QueryError"));

        _this8.db = db;
        return _this8;
    }

    _createClass(QueryArrow, [{
        key: "toString",
        value: function toString() {
            return "query :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var _this9 = this;

            var conf = void 0;
            if (x && x.constructor === Array && this.c.length > 1) {
                conf = this.c.apply(null, x);
            } else {
                conf = this.c(x);
            }

            var abort = false;

            var cancel = function cancel() {
                abort = true;
            };

            var fail = h;
            var succ = function succ(x) {

                k(x);
            };

            this.db.query(conf.query, conf.param, function (err, rows) {
                if (err) {
                    if (!abort) {
                        p.advance(cancelerId);
                        fail(err);
                    }
                } else {
                    if (!abort) {
                        p.advance(cancelerId);
                        succ(rows);
                    }
                }
            });

            var cancelerId = p.addCanceler(cancel);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            // TODO - deep comparison of objects
            return that instanceof QueryArrow && this.c === that.c;
        }
    }]);

    return QueryArrow;
}(SimpleConfigBasedAsyncArrow);

var EventArrow = function (_SimpleAsyncArrow2) {
    _inherits(EventArrow, _SimpleAsyncArrow2);

    function EventArrow(name) {
        _classCallCheck(this, EventArrow);

        var _this10 = _possibleConstructorReturn(this, (EventArrow.__proto__ || Object.getPrototypeOf(EventArrow)).call(this, _construct(function () {
            return new ArrowType(new NamedType("Elem"), new NamedType("Event"));
        })));
        // Elem ~> Event


        _this10.name = name;
        return _this10;
    }

    _createClass(EventArrow, [{
        key: "toString",
        value: function toString() {
            return "event(" + this.name + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var _this11 = this;

            var abort = false;

            var cancel = function cancel() {
                abort = true;
                x.off(_this11.name, runner);
            };

            var runner = function runner(ev) {
                if (!abort) {
                    cancel();
                    p.advance(cancelerId);
                    k(ev);
                }
            };

            x.on(this.name, runner);
            var cancelerId = p.addCanceler(cancel);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof EventArrow && this.name === that.name;
        }
    }]);

    return EventArrow;
}(SimpleAsyncArrow);

var DynamicDelayArrow = function (_SimpleAsyncArrow3) {
    _inherits(DynamicDelayArrow, _SimpleAsyncArrow3);

    function DynamicDelayArrow() {
        _classCallCheck(this, DynamicDelayArrow);

        // Number ~> _
        return _possibleConstructorReturn(this, (DynamicDelayArrow.__proto__ || Object.getPrototypeOf(DynamicDelayArrow)).call(this, _construct(function () {
            return new ArrowType(new NamedType("Number"), new TopType());
        })));
    }

    _createClass(DynamicDelayArrow, [{
        key: "toString",
        value: function toString() {
            return "delay :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var cancel = function cancel() {
                return clearTimeout(timer);
            };
            var runner = function runner() {
                p.advance(cancelerId);
                k();
            };

            var timer = setTimeout(runner, x);
            var cancelerId = p.addCanceler(cancel);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof DynamicDelayArrow;
        }
    }]);

    return DynamicDelayArrow;
}(SimpleAsyncArrow);

var DelayArrow = function (_SimpleAsyncArrow4) {
    _inherits(DelayArrow, _SimpleAsyncArrow4);

    function DelayArrow(duration) {
        _classCallCheck(this, DelayArrow);

        var _this13 = _possibleConstructorReturn(this, (DelayArrow.__proto__ || Object.getPrototypeOf(DelayArrow)).call(this, _construct(function () {
            var alpha = ParamType.fresh();
            return new ArrowType(alpha, alpha);
        })));
        // "a ~> "a


        _this13.duration = duration;
        return _this13;
    }

    _createClass(DelayArrow, [{
        key: "toString",
        value: function toString() {
            return "delay(" + this.duration + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var cancel = function cancel() {
                return clearTimeout(timer);
            };
            var runner = function runner() {
                p.advance(cancelerId);
                k(x);
            };

            var timer = setTimeout(runner, this.duration);
            var cancelerId = p.addCanceler(cancel);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof Delay && this.duration === that.duration;
        }
    }]);

    return DelayArrow;
}(SimpleAsyncArrow);

//
// Simple (Generalized) Arrows
//

var SplitArrow = function (_Arrow3) {
    _inherits(SplitArrow, _Arrow3);

    function SplitArrow(n) {
        _classCallCheck(this, SplitArrow);

        var _this14 = _possibleConstructorReturn(this, (SplitArrow.__proto__ || Object.getPrototypeOf(SplitArrow)).call(this, _construct(function () {
            var arg = ParamType.fresh();
            var out = Array.create(n, arg);

            return new ArrowType(arg, new TupleType(out));
        })));

        _this14.n = n;
        return _this14;
    }

    _createClass(SplitArrow, [{
        key: "toString",
        value: function toString() {
            return "split(" + this.n + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            // TODO - clone values
            k(Array.create(this.n, x));
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof SplitArrow && this.n === that.n;
        }
    }]);

    return SplitArrow;
}(Arrow);

var NthArrow = function (_Arrow4) {
    _inherits(NthArrow, _Arrow4);

    function NthArrow(n) {
        _classCallCheck(this, NthArrow);

        var _this15 = _possibleConstructorReturn(this, (NthArrow.__proto__ || Object.getPrototypeOf(NthArrow)).call(this, _construct(function () {
            var arg = Array.create(n).map(function () {
                return ParamType.fresh();
            });
            var out = arg[n - 1];

            return new ArrowType(new TupleType(arg), out);
        })));

        _this15.n = n;
        return _this15;
    }

    _createClass(NthArrow, [{
        key: "toString",
        value: function toString() {
            return "nth(" + this.n + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            k(x[this.n - 1]);
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return that instanceof NthArrow && this.n === that.n;
        }
    }]);

    return NthArrow;
}(Arrow);

var ComposeError = function (_Error) {
    _inherits(ComposeError, _Error);

    function ComposeError(message) {
        _classCallCheck(this, ComposeError);

        var _this16 = _possibleConstructorReturn(this, (ComposeError.__proto__ || Object.getPrototypeOf(ComposeError)).call(this));

        _this16.message = message;
        return _this16;
    }

    _createClass(ComposeError, [{
        key: "toString",
        value: function toString() {
            return this.message;
        }
    }]);

    return ComposeError;
}(Error);

var Combinator = function (_Arrow5) {
    _inherits(Combinator, _Arrow5);

    function Combinator(type, arrows) {
        _classCallCheck(this, Combinator);

        var _this17 = _possibleConstructorReturn(this, (Combinator.__proto__ || Object.getPrototypeOf(Combinator)).call(this, type));

        _this17.arrows = arrows;
        return _this17;
    }

    _createClass(Combinator, [{
        key: "toString",
        value: function toString() {
            return this.constructor.name + "(" + this.arrows.map(function (a) {
                return a.toString();
            }).join(", ") + ") :: " + this.type.toString();
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return this.arrows.some(function (a) {
                return a.isAsync();
            });
        }
    }, {
        key: "equals",
        value: function equals(that) {
            if (this.constructor === that.constructor) {
                return this.arrows.length === that.arrows.length && this.arrows.every(function (a, i) {
                    return a.equals(that.arrows[i]);
                });
            }

            return false;
        }
    }]);

    return Combinator;
}(Arrow);

var NamedArrow = function (_Combinator) {
    _inherits(NamedArrow, _Combinator);

    function NamedArrow(name, a, args) {
        _classCallCheck(this, NamedArrow);

        ensureArrow(a);

        var _this18 = _possibleConstructorReturn(this, (NamedArrow.__proto__ || Object.getPrototypeOf(NamedArrow)).call(this, _construct(function () {
            return a.type;
        }), [a]));

        _this18.name = format(name, (args || []).map(function (a) {
            return a.toString();
        }));
        return _this18;
    }

    _createClass(NamedArrow, [{
        key: "toString",
        value: function toString() {
            return this.name + " :: " + this.arrows[0].type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            this.arrows[0].call(x, p, k, h);
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return this.arrows[0].isAsync();
        }
    }]);

    return NamedArrow;
}(Combinator);

var NoEmitCombinator = function (_Combinator2) {
    _inherits(NoEmitCombinator, _Combinator2);

    function NoEmitCombinator(a) {
        _classCallCheck(this, NoEmitCombinator);

        ensureArrow(a);

        return _possibleConstructorReturn(this, (NoEmitCombinator.__proto__ || Object.getPrototypeOf(NoEmitCombinator)).call(this, _construct(function () {
            return a.type;
        }), [a]));
    }

    _createClass(NoEmitCombinator, [{
        key: "toString",
        value: function toString() {
            return "noemit(" + this.arrows[0].toString() + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var quiet = new Progress(false);
            p.addCanceler(function () {
                return quiet.cancel();
            });

            this.arrows[0].call(x, quiet, function (z) {
                p.advance();

                setTimeout(function () {
                    k(z);
                }, 0);
            }, h);
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return true;
        }
    }]);

    return NoEmitCombinator;
}(Combinator);

var SeqCombinator = function (_Combinator3) {
    _inherits(SeqCombinator, _Combinator3);

    function SeqCombinator(arrows) {
        _classCallCheck(this, SeqCombinator);

        arrows = getNonNullArrows(arrows);

        return _possibleConstructorReturn(this, (SeqCombinator.__proto__ || Object.getPrototypeOf(SeqCombinator)).call(this, _construct(function () {
            var sty = sanitizeTypes(arrows);

            try {
                var len = sty.length - 1;

                var arg = sty[0].arg;
                var out = sty[len].out;
                var ncs = new ConstraintSet([]);
                var err = sty[0].errors;

                sty.forEach(function (t, i) {
                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);

                    if (i != 0) {
                        ncs = ncs.add(new Constraint(sty[i - 1].out, t.arg));
                    }
                });

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                var message = void 0;
                var location = getLocation(err.stack);

                if (location) {
                    message = "Unable to seq arrows at: " + location;
                } else {
                    message = "Unable to seq arrows";
                }

                throw new ComposeError(message + "\n\tInput => Seq(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows));
    }

    _createClass(SeqCombinator, [{
        key: "toString",
        value: function toString() {
            return "seq(" + this.arrows.map(function (a) {
                return a.toString();
            }).join(", ") + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var i = 0;
            var arrows = this.arrows;
            var rec = function rec(y) {
                if (i >= arrows.length - 1) {
                    arrows[i].call(y, p, k, h);
                } else {
                    arrows[i++].call(y, p, rec, h);
                }
            };

            rec(x);
        }
    }]);

    return SeqCombinator;
}(Combinator);

var AllCombinator = function (_Combinator4) {
    _inherits(AllCombinator, _Combinator4);

    function AllCombinator(arrows) {
        _classCallCheck(this, AllCombinator);

        arrows = getNonNullArrows(arrows);

        return _possibleConstructorReturn(this, (AllCombinator.__proto__ || Object.getPrototypeOf(AllCombinator)).call(this, _construct(function () {
            var sty = sanitizeTypes(arrows);

            try {
                var arg = [];
                var out = [];
                var ncs = new ConstraintSet([]);
                var err = [];

                sty.forEach(function (t, i) {
                    arg.push(t.arg);
                    out.push(t.out);

                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);
                });

                return new ArrowType(new TupleType(arg), new TupleType(out), ncs, err);
            } catch (err) {
                var message = void 0;
                var location = getLocation(err.stack);

                if (location) {
                    message = "Unable to all arrows at: " + location;
                } else {
                    message = "Unable to all arrows";
                }

                throw new ComposeError(message + "\n\tInput => All(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows));
    }

    _createClass(AllCombinator, [{
        key: "toString",
        value: function toString() {
            return "all(" + this.arrows.map(function (a) {
                return a.toString();
            }).join(", ") + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var _this22 = this;

            var numFinished = 0;
            var callResults = this.arrows.map(function (x) {
                return null;
            });

            this.arrows.forEach(function (a, i) {
                a.call(x[i], p, function (y) {
                    callResults[i] = y;

                    // Once results array is finished, continue
                    if (++numFinished == _this22.arrows.length) {
                        k(callResults);
                    }
                }, h);
            });
        }
    }]);

    return AllCombinator;
}(Combinator);

var AnyCombinator = function (_Combinator5) {
    _inherits(AnyCombinator, _Combinator5);

    function AnyCombinator(arrows) {
        _classCallCheck(this, AnyCombinator);

        arrows = getNonNullArrows(arrows);

        return _possibleConstructorReturn(this, (AnyCombinator.__proto__ || Object.getPrototypeOf(AnyCombinator)).call(this, _construct(function () {
            var sty = sanitizeTypes(arrows);

            try {
                var arg = ParamType.fresh();
                var out = ParamType.fresh();
                var ncs = new ConstraintSet([]);
                var err = [];

                sty.forEach(function (t, i) {
                    ncs = ncs.concat(t.constraints);
                    err = err.concat(t.errors);

                    ncs = ncs.add(new Constraint(arg, t.arg));
                    ncs = ncs.add(new Constraint(t.out, out));
                });

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                var message = void 0;
                var location = getLocation(err.stack);

                if (location) {
                    message = "Unable to any arrows at: " + location;
                } else {
                    message = "Unable to any arrows";
                }

                throw new ComposeError(message + "\n\tInput => Any(" + sty.join(", ") + ")\n\tError => " + err);
            }
        }), arrows));
    }

    _createClass(AnyCombinator, [{
        key: "toString",
        value: function toString() {
            return "any(" + this.arrows.map(function (a) {
                return a.toString();
            }).join(", ") + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            // Note: This must be done at execution time instead of construction
            // time because a recursive arrow may present itself as falsely async.

            if (!this.arrows.every(function (a) {
                return a.isAsync();
            })) {
                throw new Error("Any combinator requires asynchronous arrow arguments");
            }

            var progress = this.arrows.map(function () {
                return new Progress(true);
            });

            // If combinator is canceled, cancel all children
            p.addCanceler(function () {
                return progress.forEach(function (p) {
                    return p.cancel();
                });
            });

            this.arrows.forEach(function (a, i) {
                // When arrow[i] progresses, cancel others
                progress[i].addObserver(function () {
                    p.advance();

                    progress.forEach(function (p, j) {
                        if (j != i) {
                            p.cancel();
                        }
                    });
                });

                // TODO - clone value
                // Kick off execution synchronously
                a.call(x, progress[i], k, h);
            });
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return true;
        }
    }]);

    return AnyCombinator;
}(Combinator);

var TryCombinator = function (_Combinator6) {
    _inherits(TryCombinator, _Combinator6);

    function TryCombinator(a, s, f) {
        _classCallCheck(this, TryCombinator);

        return _possibleConstructorReturn(this, (TryCombinator.__proto__ || Object.getPrototypeOf(TryCombinator)).call(this, _construct(function () {
            var sta = sanitizeTypes([a])[0];
            var sts = sanitizeTypes([s])[0];
            var stf = sanitizeTypes([f])[0];

            try {
                var arg = sta.arg;
                var out = ParamType.fresh();
                var ncs = new ConstraintSet([]);
                var err = [];

                ncs = ncs.concat(sta.constraints);
                ncs = ncs.concat(sts.constraints);
                ncs = ncs.concat(stf.constraints);
                ncs = ncs.add(new Constraint(sta.out, sts.arg));
                ncs = ncs.add(new Constraint(sts.out, out));
                ncs = ncs.add(new Constraint(stf.out, out));

                sta.errors.forEach(function (e, i) {
                    ncs = ncs.add(new Constraint(e, stf.arg));
                });

                err = err.concat(sts.errors);
                err = err.concat(stf.errors);

                return new ArrowType(arg, out, ncs, err);
            } catch (err) {
                var message = void 0;
                var location = getLocation(err.stack);

                if (location) {
                    message = "Unable to try arrows at: " + location;
                } else {
                    message = "Unable to try arrows";
                }

                throw new ComposeError(message + "\n\tInput => Try(" + [sta, sts, stf].join(", ") + ")\n\tError => " + err);
            }
        }), [a, s, f]));
    }

    _createClass(TryCombinator, [{
        key: "toString",
        value: function toString() {
            return "try(" + this.arrows.map(function (a) {
                return a.toString();
            }).join(", ") + ") :: " + this.type.toString();
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            var _this25 = this;

            // Invoke original error callback "h" if either
            // callback creates an error value. This allows
            // nesting of error callbacks.

            var branch = new Progress(true);
            p.addCanceler(function () {
                return branch.cancel();
            });
            branch.addObserver(function () {
                return p.advance();
            });

            this.arrows[0].call(x, branch, function (y) {
                return _this25.arrows[1].call(y, p, k, h);
            }, function (z) {
                branch.cancel();
                _this25.arrows[2].call(z, p, k, h);
            });
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            return (this.arrows[0].isAsync() || this.arrows[1].isAsync()) && this.arrows[2].isAsync();
        }
    }]);

    return TryCombinator;
}(Combinator);

//
// Fix-Point Combinator
//

Arrow.fix = function (ctor) {
    var arg = ParamType.fresh(true);
    var out = ParamType.fresh(true);

    var p = new ProxyArrow(arg, out);
    var a = ctor(p);
    p.freeze(a);

    if (!(a instanceof Arrow)) {
        throw new Error("Fix constructor must return an arrow");
    }

    var t = a.type.toString();

    var map = {};
    descendants(arg).forEach(function (d) {
        return map[d.id] = arg;
    });
    descendants(out).forEach(function (d) {
        return map[d.id] = out;
    });

    arg.noreduce = false;
    out.noreduce = false;
    a.type.substitute(map);

    a.type.constraints = a.type.constraints.add(new Constraint(a.type.arg, arg));
    a.type.constraints = a.type.constraints.add(new Constraint(arg, a.type.arg));
    a.type.constraints = a.type.constraints.add(new Constraint(a.type.out, out));
    a.type.constraints = a.type.constraints.add(new Constraint(out, a.type.out));

    try {
        a.type.resolve();
    } catch (err) {
        var message = void 0;
        var location = getLocation(err.stack);

        if (location) {
            message = "Unable to fix arrow at: " + location;
        } else {
            message = "Unable to fix arrow";
        }

        throw new ComposeError(message + "\n\tInput => Fix(" + t + ")\n\tError => " + err);
    }

    return a;
};

var ProxyArrow = function (_Arrow6) {
    _inherits(ProxyArrow, _Arrow6);

    function ProxyArrow(arg, out) {
        _classCallCheck(this, ProxyArrow);

        var _this26 = _possibleConstructorReturn(this, (ProxyArrow.__proto__ || Object.getPrototypeOf(ProxyArrow)).call(this, _construct(function () {
            return new ArrowType(arg, out);
        })));

        _this26.arrow = null;
        return _this26;
    }

    _createClass(ProxyArrow, [{
        key: "toString",
        value: function toString() {
            if (this.arrow != null) {
                return "omega :: " + this.arrow.type.toString();
            }

            return "omega :: ???";
        }
    }, {
        key: "freeze",
        value: function freeze(arrow) {
            this.arrow = arrow;
        }
    }, {
        key: "call",
        value: function call(x, p, k, h) {
            return this.ensureFrozen(function (a) {
                return a.call(x, p, k, h);
            });
        }
    }, {
        key: "equals",
        value: function equals(that) {
            return this.ensureFrozen(function (a) {
                return a.equals(that);
            });
        }
    }, {
        key: "isAsync",
        value: function isAsync() {
            if (this._isAsync === undefined) {
                this._isAsync = false;
                this._isAsync = this.ensureFrozen(function (a) {
                    return a.isAsync();
                });
            }
            return this._isAsync;
        }
    }, {
        key: "ensureFrozen",
        value: function ensureFrozen(f) {
            if (this.arrow != null) {
                return f(this.arrow);
            }

            throw new Error("Proxy not frozen");
        }
    }]);

    return ProxyArrow;
}(Arrow);

function getNonNullArrows(arrows) {
    var filtered = getNonNullElems(arrows);
    filtered.forEach(ensureArrow);
    return filtered;
}

function getNonNullElems(arrows) {
    var filtered = arrows.filter(function (a) {
        return a != null;
    });
    if (filtered.length == 0) {
        throw new ComposeError("Combinator contains no non-null arguments.");
    }

    return filtered;
}

function ensureArrow(arrow) {
    if (!(arrow instanceof Arrow)) {
        throw new ComposeError("Passed non-arrow (" + JSON.stringify(arrow) + ") to combinator");
    }
}

function descendants(param) {
    var children = [param];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = param.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = descendants(child)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var descendant = _step2.value;

                    children.push(descendant);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return children;
}

function format(format, args) {
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
}

var Type = function () {
    function Type() {
        _classCallCheck(this, Type);
    }

    _createClass(Type, [{
        key: "equals",
        value: function equals(that) {
            throw new Error("Equals undefined");
        }
    }, {
        key: "check",
        value: function check(value) {
            throw new TypeClash(this, value);
        }
    }, {
        key: "isParam",
        value: function isParam() {
            return false;
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            return true;
        }
    }, {
        key: "harvest",
        value: function harvest() {
            return [];
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            return this;
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            return this;
        }
    }]);

    return Type;
}();

var uniqid = 0;

var ParamType = function (_Type) {
    _inherits(ParamType, _Type);

    _createClass(ParamType, null, [{
        key: "fresh",
        value: function fresh(noreduce) {
            return new ParamType(++uniqid, noreduce || false);
        }
    }]);

    function ParamType(id, noreduce) {
        _classCallCheck(this, ParamType);

        var _this27 = _possibleConstructorReturn(this, (ParamType.__proto__ || Object.getPrototypeOf(ParamType)).call(this));

        _this27.id = id;
        _this27.noreduce = noreduce;
        _this27.children = [];
        return _this27;
    }

    _createClass(ParamType, [{
        key: "equals",
        value: function equals(that) {
            return that instanceof ParamType && this.id === that.id;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "'" + this.id;
        }
    }, {
        key: "check",
        value: function check(value) {}
    }, {
        key: "isParam",
        value: function isParam() {
            return true;
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            return false;
        }
    }, {
        key: "harvest",
        value: function harvest() {
            return [this];
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            return this.id in map ? map[this.id] : this;
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            if (!(this.id in map)) {
                var p = ParamType.fresh(this.noreduce);
                this.children.push(p);
                map[this.id] = p;
            }

            return map[this.id];
        }
    }]);

    return ParamType;
}(Type);

var TopType = function (_Type2) {
    _inherits(TopType, _Type2);

    function TopType() {
        _classCallCheck(this, TopType);

        return _possibleConstructorReturn(this, (TopType.__proto__ || Object.getPrototypeOf(TopType)).apply(this, arguments));
    }

    _createClass(TopType, [{
        key: "equals",
        value: function equals(that) {
            return that instanceof TopType;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "_";
        }
    }, {
        key: "check",
        value: function check(value) {}
    }]);

    return TopType;
}(Type);

var runtimeCheckers = {
    "Bool": function Bool(v) {
        return v === true || v === false;
    },
    "Number": function Number(v) {
        return typeof v == "number";
    },
    "String": function String(v) {
        return typeof v == "string";
    },
    "Elem": function Elem(v) {
        return v instanceof jQuery;
    },
    "Event": function Event(v) {
        return false;
    } // TODO
};

function checkNamedType(name, value) {
    var checker = runtimeCheckers[name];

    if (checker) {
        return checker(value);
    } else {
        throw new Error("Named type \"" + name + "\" does not have an associated checker.");
    }
}

var NamedType = function (_Type3) {
    _inherits(NamedType, _Type3);

    function NamedType(name) {
        _classCallCheck(this, NamedType);

        var _this29 = _possibleConstructorReturn(this, (NamedType.__proto__ || Object.getPrototypeOf(NamedType)).call(this));

        _this29.names = [name];
        return _this29;
    }

    _createClass(NamedType, [{
        key: "equals",
        value: function equals(that) {
            return that instanceof NamedType && this.names[0] === that.names[0];
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.names[0];
        }
    }, {
        key: "check",
        value: function check(value) {
            if (!checkNamedType(this.names[0], value)) {
                _get(NamedType.prototype.__proto__ || Object.getPrototypeOf(NamedType.prototype), "check", this).call(this, value);
            }
        }
    }]);

    return NamedType;
}(Type);

var SumType = function (_Type4) {
    _inherits(SumType, _Type4);

    function SumType(names) {
        _classCallCheck(this, SumType);

        var _this30 = _possibleConstructorReturn(this, (SumType.__proto__ || Object.getPrototypeOf(SumType)).call(this));

        _this30.names = names.unique().sort();
        return _this30;
    }

    _createClass(SumType, [{
        key: "equals",
        value: function equals(that) {
            if (that instanceof SumType) {
                return this.names.length === that.names.length && this.names.every(function (n, i) {
                    return n === that.names[i];
                });
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.names.join("+");
        }
    }, {
        key: "check",
        value: function check(value) {
            if (!this.names.some(function (name) {
                return checkNamedType(name, value);
            })) {
                _get(SumType.prototype.__proto__ || Object.getPrototypeOf(SumType.prototype), "check", this).call(this, value);
            }
        }
    }]);

    return SumType;
}(Type);

var TaggedUnionType = function (_Type5) {
    _inherits(TaggedUnionType, _Type5);

    function TaggedUnionType(map) {
        _classCallCheck(this, TaggedUnionType);

        var _this31 = _possibleConstructorReturn(this, (TaggedUnionType.__proto__ || Object.getPrototypeOf(TaggedUnionType)).call(this));

        _this31.vals = map;
        _this31.keys = Object.keys(map).sort();
        return _this31;
    }

    _createClass(TaggedUnionType, [{
        key: "equals",
        value: function equals(that) {
            var _this32 = this;

            if (that instanceof TaggedUnionType) {
                return this.keys.length === that.keys.length && this.keys.every(function (k) {
                    return _this32.vals[k].equals(that.vals[k]);
                });
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            var _this33 = this;

            return "<" + this.keys.map(function (k) {
                return k + ": " + _this33.vals[k].toString();
            }).join(", ") + ">";
        }
    }, {
        key: "check",
        value: function check(value) {
            try {
                for (var key in this.keys) {
                    if (value.hasTag(key)) {
                        return this.vals[key].check(value.value());
                    }
                }

                return false;
            } catch (err) {
                _get(TaggedUnionType.prototype.__proto__ || Object.getPrototypeOf(TaggedUnionType.prototype), "check", this).call(this, value);
            }
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            var _this34 = this;

            return this.keys.every(function (k) {
                return _this34.vals[k].isConcrete();
            });
        }
    }, {
        key: "harvest",
        value: function harvest() {
            var _this35 = this;

            return this.keys.reduce(function (acc, k) {
                return acc.concat(_this35.vals[k].harvest());
            }, []);
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            var _this36 = this;

            var vals = {};
            this.keys.forEach(function (k) {
                vals[k] = _this36.vals[k].substitute(map);
            });

            return new TaggedUnionType(vals);
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            var _this37 = this;

            var vals = {};
            this.keys.forEach(function (k) {
                vals[k] = _this37.vals[k].sanitize(map);
            });

            return new TaggedUnionType(vals);
        }
    }]);

    return TaggedUnionType;
}(Type);

var ArrayType = function (_Type6) {
    _inherits(ArrayType, _Type6);

    function ArrayType(type) {
        _classCallCheck(this, ArrayType);

        var _this38 = _possibleConstructorReturn(this, (ArrayType.__proto__ || Object.getPrototypeOf(ArrayType)).call(this));

        _this38.type = type;
        return _this38;
    }

    _createClass(ArrayType, [{
        key: "equals",
        value: function equals(that) {
            if (that instanceof ArrayType) {
                return this.type.equals(that.type);
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "[" + this.type.toString() + "]";
        }
    }, {
        key: "check",
        value: function check(value) {
            var _this39 = this;

            if (value && value.constructor === Array) {
                value.forEach(function (v) {
                    return _this39.type.check(v);
                });
            } else {
                _get(ArrayType.prototype.__proto__ || Object.getPrototypeOf(ArrayType.prototype), "check", this).call(this, value);
            }
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            return this.type.isConcrete();
        }
    }, {
        key: "harvest",
        value: function harvest() {
            return this.type.harvest();
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            return new ArrayType(this.type.substitute(map));
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            return new ArrayType(this.type.sanitize(map));
        }
    }]);

    return ArrayType;
}(Type);

var TupleType = function (_Type7) {
    _inherits(TupleType, _Type7);

    function TupleType(types) {
        _classCallCheck(this, TupleType);

        var _this40 = _possibleConstructorReturn(this, (TupleType.__proto__ || Object.getPrototypeOf(TupleType)).call(this));

        _this40.types = types;
        return _this40;
    }

    _createClass(TupleType, [{
        key: "equals",
        value: function equals(that) {
            if (that instanceof TupleType) {
                return this.types.length === that.types.length && this.types.every(function (t, i) {
                    return t.equals(that.types[i]);
                });
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.types.map(function (t) {
                return t.toString();
            }).join(", ") + ")";
        }
    }, {
        key: "check",
        value: function check(value) {
            var _this41 = this;

            if (value && value.constructor === Array) {
                value.forEach(function (v, i) {
                    return _this41.types[i].check(v);
                });
            } else {
                _get(TupleType.prototype.__proto__ || Object.getPrototypeOf(TupleType.prototype), "check", this).call(this, value);
            }
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            return this.types.every(function (t) {
                return t.isConcrete();
            });
        }
    }, {
        key: "harvest",
        value: function harvest() {
            return this.types.reduce(function (acc, t) {
                return acc.concat(t.harvest());
            }, []);
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            return new TupleType(this.types.map(function (t) {
                return t.substitute(map);
            }));
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            return new TupleType(this.types.map(function (t) {
                return t.sanitize(map);
            }));
        }
    }]);

    return TupleType;
}(Type);

var RecordType = function (_Type8) {
    _inherits(RecordType, _Type8);

    function RecordType(map) {
        _classCallCheck(this, RecordType);

        var _this42 = _possibleConstructorReturn(this, (RecordType.__proto__ || Object.getPrototypeOf(RecordType)).call(this));

        _this42.vals = map;
        _this42.keys = Object.keys(map).sort();
        return _this42;
    }

    _createClass(RecordType, [{
        key: "equals",
        value: function equals(that) {
            var _this43 = this;

            if (that instanceof RecordType) {
                return this.keys.length === that.keys.length && this.keys.every(function (k) {
                    return _this43.vals[k].equals(that.vals[k]);
                });
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            var _this44 = this;

            return "{" + this.keys.map(function (k) {
                return k + ": " + _this44.vals[k].toString();
            }).join(", ") + "}";
        }
    }, {
        key: "check",
        value: function check(value) {
            var _this45 = this;

            try {
                this.keys.forEach(function (k) {
                    _this45.vals[k].check(value[k]);
                });
            } catch (err) {
                _get(RecordType.prototype.__proto__ || Object.getPrototypeOf(RecordType.prototype), "check", this).call(this, value);
            }
        }
    }, {
        key: "isConcrete",
        value: function isConcrete() {
            var _this46 = this;

            return this.keys.every(function (k) {
                return _this46.vals[k].isConcrete();
            });
        }
    }, {
        key: "harvest",
        value: function harvest() {
            var _this47 = this;

            return this.keys.reduce(function (acc, k) {
                return acc.concat(_this47.vals[k].harvest());
            }, []);
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            var _this48 = this;

            var vals = {};
            this.keys.forEach(function (k) {
                vals[k] = _this48.vals[k].substitute(map);
            });

            return new RecordType(vals);
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            var _this49 = this;

            var vals = {};
            this.keys.forEach(function (k) {
                vals[k] = _this49.vals[k].sanitize(map);
            });

            return new RecordType(vals);
        }
    }]);

    return RecordType;
}(Type);

var TypeClash = function (_Error2) {
    _inherits(TypeClash, _Error2);

    function TypeClash(type, value) {
        _classCallCheck(this, TypeClash);

        var _this50 = _possibleConstructorReturn(this, (TypeClash.__proto__ || Object.getPrototypeOf(TypeClash)).call(this));

        _this50.type = type;
        _this50.value = value;
        return _this50;
    }

    _createClass(TypeClash, [{
        key: "toString",
        value: function toString() {
            return "Runtime type assertion failure: Expected " + this.type.toString() + "\", got \"" + JSON.stringify(this.value) + "\".";
        }
    }]);

    return TypeClash;
}(Error);

var Constraint = function () {
    function Constraint(lower, upper) {
        _classCallCheck(this, Constraint);

        this.lower = lower;
        this.upper = upper;
    }

    _createClass(Constraint, [{
        key: "equals",
        value: function equals(that) {
            if (that instanceof Constraint) {
                return this.lower.equals(that.lower) && this.upper.equals(that.upper);
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.lower.toString() + " <= " + this.upper.toString();
        }
    }, {
        key: "isUseless",
        value: function isUseless() {
            return this.lower.equals(this.upper) || this.upper instanceof TopType;
        }
    }, {
        key: "isConsistent",
        value: function isConsistent() {
            var a = this.lower;
            var b = this.upper;

            if (hasNames(a) && hasNames(b)) {
                return a.names.every(function (t1) {
                    return b.names.some(function (t2) {
                        return t1 == t2;
                    });
                });
            }

            if (a instanceof ArrayType && b instanceof ArrayType) return true;
            if (a instanceof TupleType && b instanceof TupleType) return b.types.length <= a.types.length;
            if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) return a.keys.every(function (k) {
                return b.keys.indexOf(k) >= 0;
            });
            if (a instanceof RecordType && b instanceof RecordType) return b.keys.every(function (k) {
                return a.keys.indexOf(k) >= 0;
            });

            return b instanceof TopType || a.isParam() || b.isParam();
        }
    }, {
        key: "unary",
        value: function unary() {
            var _this51 = this;

            if (this.lower instanceof ArrayType && this.upper instanceof ArrayType) {
                return [new Constraint(this.lower.type, this.upper.type)];
            }

            if (this.lower instanceof TupleType && this.upper instanceof TupleType) {
                return this.upper.types.filter(function (t, i) {
                    return i < _this51.lower.types.length;
                }).map(function (t, i) {
                    return new Constraint(_this51.lower.types[i], t);
                });
            }

            if (this.lower instanceof TaggedUnionType && this.upper instanceof TaggedUnionType) {
                return this.lower.keys.filter(function (k) {
                    return _this51.upper.keys.indexOf(k) >= 0;
                }).map(function (k) {
                    return new Constraint(_this51.lower.vals[k], _this51.upper.vals[k]);
                });
            }

            if (this.lower instanceof RecordType && this.upper instanceof RecordType) {
                return this.upper.keys.filter(function (k) {
                    return _this51.lower.keys.indexOf(k) >= 0;
                }).map(function (k) {
                    return new Constraint(_this51.lower.vals[k], _this51.upper.vals[k]);
                });
            }

            return [];
        }
    }, {
        key: "binary",
        value: function binary(that) {
            if (this.upper.equals(that.lower)) {
                return [new Constraint(this.lower, that.upper)];
            }

            if (this.lower.equals(that.upper)) {
                return [new Constraint(that.lower, this.upper)];
            }

            return [];
        }
    }]);

    return Constraint;
}();

var ConstraintSet = function () {
    function ConstraintSet(constraints) {
        _classCallCheck(this, ConstraintSet);

        this.constraints = constraints.filter(function (c) {
            return !c.isUseless();
        });
        var inconsistent = constraints.filter(function (c) {
            return !c.isConsistent();
        });

        if (inconsistent.length != 0) {
            throw new Error("Inconsistent constraints: [" + inconsistent.map(function (c) {
                return c.toString();
            }).join(", ") + "]");
        }
    }

    _createClass(ConstraintSet, [{
        key: "equals",
        value: function equals(that) {
            if (this.constraints.length == that.constraints.length) {
                for (var i = 0; i < this.constraints.length; i++) {
                    if (!this.contains(this.constraints[i])) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }
    }, {
        key: "contains",
        value: function contains(constraint) {
            for (var i = 0; i < this.constraints.length; i++) {
                if (this.constraints[i].equals(constraint)) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "{" + this.constraints.map(function (c) {
                return c.toString();
            }).join(", ") + "}";
        }
    }, {
        key: "add",
        value: function add(constraint) {
            if (this.constraints.some(function (c) {
                return c.equals(constraint);
            })) {
                return this;
            }

            return new ConstraintSet(this.constraints.concat([constraint]));
        }
    }, {
        key: "addAll",
        value: function addAll(constraints) {
            return constraints.reduce(function (set, c) {
                return set.add(c);
            }, this);
        }
    }, {
        key: "concat",
        value: function concat(cs) {
            return this.addAll(cs.constraints);
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            return new ConstraintSet(this.constraints.map(function (c) {
                return new Constraint(c.lower.substitute(map), c.upper.substitute(map));
            }));
        }
    }, {
        key: "sanitize",
        value: function sanitize(map) {
            return new ConstraintSet(this.constraints.map(function (c) {
                return new Constraint(c.lower.sanitize(map), c.upper.sanitize(map));
            }));
        }
    }]);

    return ConstraintSet;
}();

//
// Arrow Type
//

var ArrowType = function () {
    function ArrowType(arg, out, constraints, errors) {
        var _this52 = this;

        _classCallCheck(this, ArrowType);

        this.arg = arg;
        this.out = out;
        this.constraints = constraints || new ConstraintSet([]);
        this.errors = [];

        var _loop = function _loop(type) {
            if (!_this52.errors.some(function (e) {
                return e.equals(type);
            })) {
                _this52.errors.push(type);
            }
        };

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = (errors || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var type = _step3.value;

                _loop(type);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.resolve();
    }

    _createClass(ArrowType, [{
        key: "toString",
        value: function toString() {
            var type = this.arg.toString() + " ~> " + this.out.toString();

            if (this.constraints.constraints.length > 0 || this.errors.length > 0) {
                type += " \\ (";
                type += this.constraints.toString();
                type += ", {";
                type += this.errors.map(function (t) {
                    return t.toString();
                }).join(", ");
                type += "})";
            }

            return type;
        }
    }, {
        key: "resolve",
        value: function resolve() {
            var initial = this.constraints;

            while (true) {
                this.constraints = this.closure();
                this.constraints = this.mergeConcreteBounds();

                var map = this.collectBounds();

                if (Object.getOwnPropertyNames(map).length === 0) {
                    break;
                }

                this.substitute(map);
            }

            var cs = this.prune();

            if (cs.constraints.length === this.constraints.constraints.length || initial.equals(cs)) {
                return;
            }

            this.constraints = cs;
            this.resolve();
        }
    }, {
        key: "substitute",
        value: function substitute(map) {
            this.arg = this.arg.substitute(map);
            this.out = this.out.substitute(map);
            this.constraints = this.constraints.substitute(map);
            this.errors = this.errors.map(function (e) {
                return e.substitute(map);
            });
        }

        /**
         * Add the result of unary and binary closure rules on each constraint in
         * the set until no new constraints are produced (a fixed point reached).
         */

    }, {
        key: "closure",
        value: function closure() {
            var cs = [];
            var wl = Array.copy(this.constraints.constraints);

            var _loop2 = function _loop2() {
                var w = wl.pop();

                if (!cs.some(function (c) {
                    return c.equals(w);
                })) {
                    w.unary().forEach(function (c) {
                        return wl.push(c);
                    });

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = cs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var c = _step4.value;

                            w.binary(c).forEach(function (c) {
                                return wl.push(c);
                            });
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    cs.push(w);
                }
            };

            while (wl.length > 0) {
                _loop2();
            }

            return new ConstraintSet(cs);
        }

        /**
         * Replace multiple constraints which upper bound or lower bound a param
         * type with the lub or glb, respectively, of the concrete bound.
         */

    }, {
        key: "mergeConcreteBounds",
        value: function mergeConcreteBounds() {
            var idmap = {};
            var lower = {};
            var upper = {};
            var other = [];

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.constraints.constraints[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var c = _step5.value;

                    var _a = c.lower;
                    var b = c.upper;

                    if (_a.isParam()) idmap[_a.id] = _a;
                    if (b.isParam()) idmap[b.id] = b;

                    if (_a.isParam() && b.isConcrete()) {
                        lower[_a.id] = _a.id in lower ? glb(lower[_a.id], b) : b;
                    } else if (b.isParam() && _a.isConcrete()) {
                        upper[b.id] = b.id in upper ? lub(upper[b.id], _a) : _a;
                    } else {
                        other.push(c);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (lower.length === 0 && upper.length === 0) {
                return null;
            }

            Object.keys(lower).forEach(function (id) {
                return other.push(new Constraint(idmap[id], lower[id]));
            });
            Object.keys(upper).forEach(function (id) {
                return other.push(new Constraint(upper[id], idmap[id]));
            });

            return new ConstraintSet(other);
        }

        /**
         * Create a substitution map. A param type p can be replaced by type t iff
         * one of the following hold:
         *
         *    - t <= p and p <= t
         *    - p^- <= t (and t is sole upper bound of p)
         *    - t <= p^+ (and t is sole lower bound of p)
         */

    }, {
        key: "collectBounds",
        value: function collectBounds() {
            var map = {};

            function addToMap(p, t) {
                map[p.id] = t.isParam() && t.id in map ? map[t.id] : t;
            }

            var cs = this.constraints.constraints;
            var lowerParam = cs.filter(function (c) {
                return c.lower.isParam() && !c.lower.noreduce;
            });
            var upperParam = cs.filter(function (c) {
                return c.upper.isParam() && !c.upper.noreduce;
            });

            lowerParam.forEach(function (c1) {
                upperParam.forEach(function (c2) {
                    if (c1.lower.equals(c2.upper) && c1.upper.equals(c2.lower)) {
                        addToMap(c1.lower, c1.upper);
                    }
                });
            });

            var _polarity = this.polarity(),
                _polarity2 = _slicedToArray(_polarity, 2),
                n = _polarity2[0],
                p = _polarity2[1];

            var negVar = n.filter(function (v) {
                return !p.some(function (x) {
                    return x.equals(v);
                });
            }); // negative-only params
            var posVar = p.filter(function (v) {
                return !n.some(function (x) {
                    return x.equals(v);
                });
            }); // positive-only params

            // Replace negative variables by their sole upper bound, if it exists
            negVar.map(function (p) {
                return cs.filter(function (c) {
                    return c.lower === p;
                });
            }).filter(function (cs) {
                return cs.length === 1;
            }).forEach(function (c) {
                addToMap(c[0].lower, c[0].upper);
            });

            // Replace positive variables by their sole lower bound, if it exists
            posVar.map(function (p) {
                return cs.filter(function (c) {
                    return c.upper === p;
                });
            }).filter(function (cs) {
                return cs.length === 1;
            }).forEach(function (c) {
                addToMap(c[0].upper, c[0].lower);
            });

            return map;
        }

        /**
         * Remove all constraints which are in one of the following forms:
         *
         *    - t <= t where neither are params
         *    - a <= b and (a or b) is not in the arrow type
         *    - t <= p^-
         *    - p^+ <= t
         */

    }, {
        key: "prune",
        value: function prune() {
            var _polarity3 = this.polarity(),
                _polarity4 = _slicedToArray(_polarity3, 2),
                n = _polarity4[0],
                p = _polarity4[1];

            var params = this.arg.harvest().concat(this.out.harvest()).concat(this.errors);

            return new ConstraintSet(this.constraints.constraints.filter(function (c) {
                // Keep no-reduce parameters
                if (c.lower.isParam() && c.lower.noreduce) return true;
                if (c.upper.isParam() && c.upper.noreduce) return true;

                // Remove non-parameter constraints
                if (!c.lower.isParam() && !c.upper.isParam()) return false;

                // Remove unknown type variables
                if (c.lower.isParam() && c.upper.isParam() && !params.some(function (p) {
                    return p.equals(c.lower);
                })) return false;
                if (c.lower.isParam() && c.upper.isParam() && !params.some(function (p) {
                    return p.equals(c.upper);
                })) return false;

                // Remove constraints with useless polarity
                if (c.lower.isParam() && !n.some(function (p) {
                    return p.equals(c.lower);
                })) return false;
                if (c.upper.isParam() && !p.some(function (p) {
                    return p.equals(c.upper);
                })) return false;

                return true;
            }));
        }

        /**
         * Determine which variables in arg and out have negative or positive position. This algorithm uses
         * dumb iteration and may be improved by the use of a worklist. The return value fo this function is
         * a pair [n, p] where n is the set of negative variables and p is the set of positive variables. If
         * a variable is both negative and positive it exists in both sets. If a variable is unreachable by
         * arg or out then it will be absent from both lists.
         */

    }, {
        key: "polarity",
        value: function polarity() {
            var neg = this.arg.harvest();
            var pos = this.out.harvest().concat(this.errors);

            var changed = true;
            var negDefs = this.constraints.constraints.filter(function (c) {
                return c.lower.isParam();
            }).map(function (c) {
                return [c.lower, c.upper.harvest()];
            });
            var posDefs = this.constraints.constraints.filter(function (c) {
                return c.upper.isParam();
            }).map(function (c) {
                return [c.upper, c.lower.harvest()];
            });

            while (changed) {
                changed = false;

                var extraNeg = negDefs.filter(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        a = _ref2[0],
                        b = _ref2[1];

                    return neg.some(function (p) {
                        return p === a;
                    });
                }).reduce(function (c, _ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        a = _ref4[0],
                        b = _ref4[1];

                    return c.concat(b);
                }, []).filter(function (x) {
                    return !neg.some(function (p) {
                        return p === x;
                    });
                });
                var extraPos = posDefs.filter(function (_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2),
                        a = _ref6[0],
                        b = _ref6[1];

                    return pos.some(function (p) {
                        return p === a;
                    });
                }).reduce(function (c, _ref7) {
                    var _ref8 = _slicedToArray(_ref7, 2),
                        a = _ref8[0],
                        b = _ref8[1];

                    return c.concat(b);
                }, []).filter(function (x) {
                    return !pos.some(function (p) {
                        return p === x;
                    });
                });

                if (extraNeg.length > 0 || extraPos.length > 0) {
                    changed = true;
                    neg = neg.concat(extraNeg);
                    pos = pos.concat(extraPos);
                }
            }

            return [neg, pos];
        }
    }, {
        key: "sanitize",
        value: function sanitize() {
            var map = {};
            var arg = this.arg.sanitize(map);
            var out = this.out.sanitize(map);
            var constraints = this.constraints.sanitize(map);
            var errors = this.errors.map(function (e) {
                return e.sanitize(map);
            });

            return new ArrowType(arg, out, constraints, errors);
        }
    }]);

    return ArrowType;
}();

//
// Type Utilities
//

function sanitizeTypes(arrows) {
    return arrows.map(function (a) {
        return a.type;
    }).map(function (t) {
        return t.sanitize();
    });
}

function lub(a, b) {
    if (a.equals(b)) {
        return a;
    }

    if (hasNames(a) && hasNames(b)) {
        var na = a.names;
        var nb = b.names;
        return createNamedType(na.concat(nb.filter(function (n) {
            return na.indexOf(n) < 0;
        })));
    }

    if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) {
        var map = {};
        b.keys.filter(function (k) {
            return a.keys.indexOf(k) >= 0;
        }).forEach(function (k) {
            map[k] = lub(a.vals[k], b.vals[k]);
        });

        return new TaggedUnionType(map);
    }

    if (a instanceof ArrayType && b instanceof ArrayType) {
        return new ArrayType(lub(a.type, b.type));
    }

    if (a instanceof TupleType && b instanceof TupleType) {
        return new TupleType(a.types.length < b.types.length ? a.types.map(function (t, i) {
            return lub(t, b.types[i]);
        }) : b.types.map(function (t, i) {
            return lub(t, a.types[i]);
        }));
    }

    if (a instanceof RecordType && b instanceof RecordType) {
        var _map = {};
        a.keys.filter(function (k) {
            return b.keys.indexOf(k) >= 0;
        }).forEach(function (k) {
            _map[k] = lub(a.vals[k], b.vals[k]);
        });

        return new RecordType(_map);
    }

    return new TopType();
}

function glb(a, b) {
    if (a.equals(b)) {
        return a;
    }

    if (a instanceof TopType) return b;
    if (b instanceof TopType) return a;

    if (hasNames(a) && hasNames(b)) {
        var names = a.names.filter(function (t1) {
            return b.names.some(function (t2) {
                return t1 == t2;
            });
        });
        if (names.length > 0) {
            return createNamedType(names);
        }
    }

    if (a instanceof ArrayType && b instanceof ArrayType) {
        return new ArrayType(glb(a.type, b.type));
    }

    if (a instanceof TupleType && b instanceof TupleType) {
        return new TupleType(a.types.length < b.types.length ? b.types.map(function (t, i) {
            return i >= a.types.length ? t : glb(t, a.types[i]);
        }) : a.types.map(function (t, i) {
            return i >= b.types.length ? t : glb(t, b.types[i]);
        }));
    }

    if (a instanceof TaggedUnionType && b instanceof TaggedUnionType) {
        var map = {};
        a.keys.forEach(function (k) {
            map[k] = k in map ? glb(map[k], a.vals[k]) : a.vals[k];
        });
        b.keys.forEach(function (k) {
            map[k] = k in map ? glb(map[k], b.vals[k]) : b.vals[k];
        });

        return new RecordType(map);
    }

    if (a instanceof RecordType && b instanceof RecordType) {
        var _map2 = {};
        a.keys.forEach(function (k) {
            _map2[k] = k in _map2 ? glb(_map2[k], a.vals[k]) : a.vals[k];
        });
        b.keys.forEach(function (k) {
            _map2[k] = k in _map2 ? glb(_map2[k], b.vals[k]) : b.vals[k];
        });

        return new RecordType(_map2);
    }

    throw new Error("No greatest lower bound of \"" + a.toString() + "\" and \"" + b.toString() + "\".");
}

function hasNames(t) {
    return t instanceof NamedType || t instanceof SumType;
}

function createNamedType(names) {
    if (names.length == 1) {
        return new NamedType(names[0]);
    }

    return new SumType(names);
}

function getLocation(stack) {
    var r = new RegExp(/(?:https?|file):\/\/(.+):(\d+):\d+/g);

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = stack.match(r)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var match = _step6.value;

            var parts = new RegExp(/(?:https?|file):\/\/(.+):(\d+):\d+/g).exec(match);

            if (!parts[1].endsWith("arrows.js")) {
                return parts[1] + ":" + parts[2];
            }
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return "";
}
