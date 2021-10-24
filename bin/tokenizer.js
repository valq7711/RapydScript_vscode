(function(){
"use strict";
var ՐՏ_1;
function cmp(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
function dir(item) {
    var arr;
    arr = [];
    for (var i in item) {
        arr.push(i);
    }
    return arr;
}
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    } else if (typeof arr.has === "function") {
        return arr.has(val);
    }
    return arr.hasOwnProperty(val);
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
function len(obj) {
    var tmp;
    if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
        return (tmp || obj).length;
    }
    if (Set && obj.constructor === Set) {
        return obj.size;
    }
    return Object.keys(obj).length;
}
function ՐՏ_merge(target, source, overwrite) {
    var ՐՏitr8, ՐՏidx8;
    var prop;
    for (var i in source) {
        if (source.hasOwnProperty(i) && (overwrite || typeof target[i] === "undefined")) {
            target[i] = source[i];
        }
    }
    ՐՏitr8 = ՐՏ_Iterable(Object.getOwnPropertyNames(source.prototype));
    for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
        prop = ՐՏitr8[ՐՏidx8];
        if (overwrite || typeof target.prototype[prop] === "undefined") {
            Object.defineProperty(target.prototype, prop, Object.getOwnPropertyDescriptor(source.prototype, prop));
        }
    }
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function ՐՏ_eq(a, b) {
    var ՐՏitr9, ՐՏidx9;
    var i;
    if (a === b) {
        return true;
    }
    if (a === void 0 || b === void 0 || a === null || b === null) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr9 = ՐՏ_Iterable(a);
        for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
            i = ՐՏitr9[ՐՏidx9];
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Set && a.constructor === Set || Map && a.constructor === Map) {
        if (a.size !== b.size) {
            return false;
        }
        for (i of a) {
            if (!b.has(i)) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Date) {
        return a.getTime() === b.getTime();
    } else if (typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    return false;
}
function ՐՏ_def_modules() {
    var modules;
    modules = {};
    function mounter(mod_id) {
        var rs_mod_id, rs_mod;
        rs_mod_id = "ՐՏ:" + mod_id;
        rs_mod = modules[rs_mod_id] = {
            "body": null,
            "exports": null
        };
        rs_mod["export"] = function(prop, get, set) {
            if (!rs_mod["exports"]) {
                rs_mod["exports"] = {};
            }
            Object.defineProperty(rs_mod["exports"], prop, {
                configurable: true,
                enumerable: true,
                get: get,
                set: set
            });
        };
        Object.defineProperty(modules, mod_id, {
            enumerable: true,
            get: function() {
                var mod;
                return (mod = modules[rs_mod_id])["exports"] || mod["body"]();
            },
            set: function(v) {
                modules[rs_mod_id]["exports"] = v;
            }
        });
        return rs_mod;
    }
    Object.defineProperty(modules, "ՐՏ_def", {
        configurable: false,
        enumerable: false,
        value: mounter
    });
    return modules;
}
var ՐՏ_modules = ՐՏ_def_modules();
ՐՏ_modules.ՐՏ_def("utils");
ՐՏ_modules.ՐՏ_def("rs_tokenizer");

ՐՏ_modules["ՐՏ:utils"].body = function(){
    var __name__ = "utils";

    var RAPYD_PREFIX, MAP, colors;
    RAPYD_PREFIX = "ՐՏ";
    function slice(a, start) {
        return Array.prototype.slice.call(a, start || 0);
    }
    function member(name, array) {
        var ՐՏitr1, ՐՏidx1;
        var i;
        ՐՏitr1 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            i = ՐՏitr1[ՐՏidx1];
            if (array[i] === name) {
                return true;
            }
        }
        return false;
    }
    function find_if(func, array) {
        var i;
        for (i = 0; i < len(array); i++) {
            if (func(array[i])) {
                return array[i];
            }
        }
    }
    function repeat_string(str_, i) {
        var d;
        if (i <= 0) {
            return "";
        }
        if (i === 1) {
            return str_;
        }
        d = repeat_string(str_, i >> 1);
        d += d;
        if (i & 1) {
            d += str_;
        }
        return d;
    }
    function DefaultsError(msg, defs) {
        this.msg = msg;
        this.defs = defs;
    }
    class ImportError extends Error {
        constructor (message, filename, readfile_error) {
            super();
            var self = this;
            self.message = message;
            self.filename = filename;
            self.readfile_error = readfile_error;
        }
    }
    class ParseError extends Error {
        constructor (message, line, col, pos, is_eof, filename) {
            super();
            var self = this;
            self.message = message;
            self.line = line;
            self.col = col;
            self.pos = pos;
            self.stack = new Error().stack;
            self.is_eof = is_eof;
            self.filename = filename;
        }
        toString () {
            var self = this;
            return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
        }
    }
    function defaults(args, defs, croak) {
        var ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3;
        var ret, key;
        if (args === true) {
            args = {};
        }
        ret = args || {};
        if (croak) {
            ՐՏitr2 = ՐՏ_Iterable(ret);
            for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
                key = ՐՏitr2[ՐՏidx2];
                if (!(ՐՏ_in(key, defs))) {
                    throw new DefaultsError("`" + key + "` is not a supported option", defs);
                }
            }
        }
        ՐՏitr3 = ՐՏ_Iterable(defs);
        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
            key = ՐՏitr3[ՐՏidx3];
            ret[key] = args && ՐՏ_in(key, args) ? args[key] : defs[key];
        }
        return ret;
    }
    function merge(obj, ext) {
        var ՐՏitr4, ՐՏidx4;
        var key;
        ՐՏitr4 = ՐՏ_Iterable(ext);
        for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
            key = ՐՏitr4[ՐՏidx4];
            obj[key] = ext[key];
        }
        return obj;
    }
    function noop() {
    }
    MAP = function() {
        var skip;
        function MAP(a, f, backwards) {
            var ՐՏitr5, ՐՏidx5;
            var ret, top, i;
            ret = [];
            top = [];
            function doit() {
                var val, is_last;
                val = f(a[i], i);
                is_last = val instanceof Last;
                if (is_last) {
                    val = val.v;
                }
                if (val instanceof AtTop) {
                    val = val.v;
                    if (val instanceof Splice) {
                        top.push.apply(top, backwards ? val.v.slice().reverse() : val.v);
                    } else {
                        top.push(val);
                    }
                } else if (val !== skip) {
                    if (val instanceof Splice) {
                        ret.push.apply(ret, backwards ? val.v.slice().reverse() : val.v);
                    } else {
                        ret.push(val);
                    }
                }
                return is_last;
            }
            if (Array.isArray(a)) {
                if (backwards) {
                    ՐՏitr5 = ՐՏ_Iterable(range(a.length - 1, -1, -1));
                    for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                        i = ՐՏitr5[ՐՏidx5];
                        if (doit()) {
                            break;
                        }
                    }
                    ret.reverse();
                    top.reverse();
                } else {
                    for (i = 0; i < len(a); i++) {
                        if (doit()) {
                            break;
                        }
                    }
                }
            } else {
                for (i in a) {
                    if (a.hasOwnProperty(i)) {
                        if (doit()) {
                            break;
                        }
                    }
                }
            }
            return top.concat(ret);
        }
        MAP.at_top = function(val) {
            return new AtTop(val);
        };
        MAP.splice = function(val) {
            return new Splice(val);
        };
        MAP.last = function(val) {
            return new Last(val);
        };
        skip = MAP.skip = {};
        function AtTop(val) {
            this.v = val;
        }
        function Splice(val) {
            this.v = val;
        }
        function Last(val) {
            this.v = val;
        }
        return MAP;
    }();
    function push_uniq(array, el) {
        if (!(ՐՏ_in(el, array))) {
            array.push(el);
        }
    }
    function string_template(text, props) {
        return text.replace(/\{(.+?)\}/g, function(str_, p) {
            return props[p];
        });
    }
    function remove(array, el) {
        var ՐՏitr6, ՐՏidx6;
        var idx;
        ՐՏitr6 = ՐՏ_Iterable(range(array.length - 1, -1, -1));
        for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
            idx = ՐՏitr6[ՐՏidx6];
            if (array[idx] === el) {
                array.splice(i, 1);
            }
        }
    }
    function mergeSort(array, cmp) {
        if (array.length < 2) {
            return array.slice();
        }
        function merge(a, b) {
            var r, ai, bi, i;
            r = [];
            ai = 0;
            bi = 0;
            i = 0;
            while (ai < a.length && bi < b.length) {
                if (cmp(a[ai], b[bi]) <= 0) {
                    r[i] = a[ai];
                    ++ai;
                } else {
                    r[i] = b[bi];
                    ++bi;
                }
                ++i;
            }
            if (ai < a.length) {
                r.push.apply(r, a.slice(ai));
            }
            if (bi < b.length) {
                r.push.apply(r, b.slice(bi));
            }
            return r;
        }
        function _ms(a) {
            var m, left, right;
            if (a.length <= 1) {
                return a;
            }
            m = Math.floor(a.length / 2);
            left = a.slice(0, m);
            right = a.slice(m);
            left = _ms(left);
            right = _ms(right);
            return ՐՏ_merge(left, right);
        }
        return _ms(array);
    }
    function set_difference(a, b) {
        return a.filter(function(el) {
            return !(ՐՏ_in(el, b));
        });
    }
    function set_intersection(a, b) {
        return a.filter(function(el) {
            return ՐՏ_in(el, b);
        });
    }
    function makePredicate(words) {
        var f, cats, i, skip, j, cat;
        if (!Array.isArray(words)) {
            words = words.split(" ");
        }
        f = "";
        cats = [];
        for (i = 0; i < len(words); i++) {
            skip = false;
            for (j = 0; j < len(cats); j++) {
                if (cats[j][0].length === words[i].length) {
                    cats[j].push(words[i]);
                    skip = true;
                    break;
                }
            }
            if (!skip) {
                cats.push([ words[i] ]);
            }
        }
        function compareTo(arr) {
            var i;
            if (arr.length === 1) {
                return f += "return str === " + JSON.stringify(arr[0]) + ";";
            }
            f += "switch(str){";
            for (i = 0; i < len(arr); i++) {
                f += "case " + JSON.stringify(arr[i]) + ":";
            }
            f += "return true}return false;";
        }
        if (cats.length > 3) {
            cats.sort(function(a, b) {
                return b.length - a.length;
            });
            f += "switch(str.length){";
            for (i = 0; i < len(cats); i++) {
                cat = cats[i];
                f += "case " + cat[0].length + ":";
                compareTo(cat);
            }
            f += "}";
        } else {
            compareTo(words);
        }
        return new Function("str", f);
    }
    function Dictionary() {
        this._values = Object.create(null);
        this._size = 0;
    }
    Dictionary.prototype = {
        set: function(key, val) {
            if (!this.has(key)) {
                ++this._size;
            }
            this._values["$" + key] = val;
            return this;
        },
        add: function(key, val) {
            if (this.has(key)) {
                this.get(key).push(val);
            } else {
                this.set(key, [ val ]);
            }
            return this;
        },
        get: function(key) {
            return this._values["$" + key];
        },
        del_: function(key) {
            if (this.has(key)) {
                --this._size;
                delete this._values["$" + key];
            }
            return this;
        },
        has: function(key) {
            return ՐՏ_in("$" + key, this._values);
        },
        each: function(f) {
            var i;
            for (i in this._values) {
                f(this._values[i], i.substr(1));
            }
        },
        size: function() {
            return this._size;
        },
        map: function(f) {
            var ret, i;
            ret = [];
            for (i in this._values) {
                ret.push(f(this._values[i], i.substr(1)));
            }
            return ret;
        }
    };
    colors = [ "red", "green", "yellow", "blue", "magenta", "cyan", "white" ];
    function ansi(code) {
        code = code || 0;
        return "[" + code + "m";
    }
    function colored(string, color, bold) {
        var prefix;
        prefix = [];
        if (bold) {
            prefix.push(ansi(1));
        }
        if (color) {
            prefix.push(ansi(colors.indexOf(color) + 31));
        }
        return prefix.join("") + string + ansi(0);
    }
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:utils"];
    ՐՏ_mod.export("RAPYD_PREFIX", function(){return RAPYD_PREFIX;}, function(ՐՏ_v){if (typeof RAPYD_PREFIX !== "undefined") {RAPYD_PREFIX = ՐՏ_v;};});
    ՐՏ_mod.export("MAP", function(){return MAP;}, function(ՐՏ_v){if (typeof MAP !== "undefined") {MAP = ՐՏ_v;};});
    ՐՏ_mod.export("colors", function(){return colors;}, function(ՐՏ_v){if (typeof colors !== "undefined") {colors = ՐՏ_v;};});
    ՐՏ_mod.export("slice", function(){return slice;}, function(ՐՏ_v){if (typeof slice !== "undefined") {slice = ՐՏ_v;};});
    ՐՏ_mod.export("member", function(){return member;}, function(ՐՏ_v){if (typeof member !== "undefined") {member = ՐՏ_v;};});
    ՐՏ_mod.export("find_if", function(){return find_if;}, function(ՐՏ_v){if (typeof find_if !== "undefined") {find_if = ՐՏ_v;};});
    ՐՏ_mod.export("repeat_string", function(){return repeat_string;}, function(ՐՏ_v){if (typeof repeat_string !== "undefined") {repeat_string = ՐՏ_v;};});
    ՐՏ_mod.export("DefaultsError", function(){return DefaultsError;}, function(ՐՏ_v){if (typeof DefaultsError !== "undefined") {DefaultsError = ՐՏ_v;};});
    ՐՏ_mod.export("ImportError", function(){return ImportError;}, function(ՐՏ_v){if (typeof ImportError !== "undefined") {ImportError = ՐՏ_v;};});
    ՐՏ_mod.export("ParseError", function(){return ParseError;}, function(ՐՏ_v){if (typeof ParseError !== "undefined") {ParseError = ՐՏ_v;};});
    ՐՏ_mod.export("defaults", function(){return defaults;}, function(ՐՏ_v){if (typeof defaults !== "undefined") {defaults = ՐՏ_v;};});
    ՐՏ_mod.export("merge", function(){return merge;}, function(ՐՏ_v){if (typeof merge !== "undefined") {merge = ՐՏ_v;};});
    ՐՏ_mod.export("noop", function(){return noop;}, function(ՐՏ_v){if (typeof noop !== "undefined") {noop = ՐՏ_v;};});
    ՐՏ_mod.export("push_uniq", function(){return push_uniq;}, function(ՐՏ_v){if (typeof push_uniq !== "undefined") {push_uniq = ՐՏ_v;};});
    ՐՏ_mod.export("string_template", function(){return string_template;}, function(ՐՏ_v){if (typeof string_template !== "undefined") {string_template = ՐՏ_v;};});
    ՐՏ_mod.export("remove", function(){return remove;}, function(ՐՏ_v){if (typeof remove !== "undefined") {remove = ՐՏ_v;};});
    ՐՏ_mod.export("mergeSort", function(){return mergeSort;}, function(ՐՏ_v){if (typeof mergeSort !== "undefined") {mergeSort = ՐՏ_v;};});
    ՐՏ_mod.export("set_difference", function(){return set_difference;}, function(ՐՏ_v){if (typeof set_difference !== "undefined") {set_difference = ՐՏ_v;};});
    ՐՏ_mod.export("set_intersection", function(){return set_intersection;}, function(ՐՏ_v){if (typeof set_intersection !== "undefined") {set_intersection = ՐՏ_v;};});
    ՐՏ_mod.export("makePredicate", function(){return makePredicate;}, function(ՐՏ_v){if (typeof makePredicate !== "undefined") {makePredicate = ՐՏ_v;};});
    ՐՏ_mod.export("Dictionary", function(){return Dictionary;}, function(ՐՏ_v){if (typeof Dictionary !== "undefined") {Dictionary = ՐՏ_v;};});
    ՐՏ_mod.export("ansi", function(){return ansi;}, function(ՐՏ_v){if (typeof ansi !== "undefined") {ansi = ՐՏ_v;};});
    ՐՏ_mod.export("colored", function(){return colored;}, function(ՐՏ_v){if (typeof colored !== "undefined") {colored = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

ՐՏ_modules["ՐՏ:rs_tokenizer"].body = function(){
    var __name__ = "rs_tokenizer";

    var TokenErrorTypes, OPTIONS, ES6_KEYWORDS, COMMON_KEYWORDS, JS_KEYWORDS, JS_KEYWORDS_AUTOFIX, RS_KEYWORDS, KEYWORDS, KEYWORDS_ATOM, RESERVED_WORDS, KEYWORDS_BEFORE_EXPRESSION, ALL_KEYWORDS, ALL_JS_KEYWORDS, IS_ANY_KEYWORD, OPERATOR_CHARS, RE_HEX_NUMBER, RE_OCT_NUMBER, RE_DEC_NUMBER, OPERATORS, OP_MAP, WHITESPACE_CHARS, PUNC_BEFORE_EXPRESSION, PUNC_CHARS, REGEXP_MODIFIERS, UNICODE, IDENTIFIER_PAT, STRING_MODIFIERS, UNARY_POSTFIX, PRECEDENCE, EX_EOF;
    var makePredicate = ՐՏ_modules["utils"].makePredicate;var ParseError = ՐՏ_modules["utils"].ParseError;var defaults = ՐՏ_modules["utils"].defaults;
    TokenErrorTypes = {
        INDENT: "indent",
        INVALID_SYNTAX: "invalid_syntax",
        UNEXPECTED_EOL: "unexpected_eol",
        UNEXPECTED_EOF: "unexpected_eof",
        UNEXPECTED_UNISEQ: "unexpected_uniseq",
        INVALID_IDENTIFIER: "invalid_identifier",
        INVALID_OPERATOR: "invalid_operator"
    };
    OPTIONS = {
        indent_min: 2
    };
    function set_options(opt) {
        OPTIONS = defaults(opt, OPTIONS, true);
    }
    function characters(str_) {
        return str_.split("");
    }
    ES6_KEYWORDS = "async await yield";
    COMMON_KEYWORDS = "break case class const continue debugger default do else " + "finally for if import in new return switch " + "try void while with " + ES6_KEYWORDS;
    JS_KEYWORDS = "enum export extends implements " + "interface let package private protected " + "public static this";
    JS_KEYWORDS_AUTOFIX = "var function instanceof typeof catch delete throw false null true";
    RS_KEYWORDS = "as def del elif except " + "from is nonlocal pass raise til to or and not";
    KEYWORDS = [ RS_KEYWORDS, COMMON_KEYWORDS ].join(" ");
    KEYWORDS_ATOM = "False None True";
    RESERVED_WORDS = [ KEYWORDS_ATOM, KEYWORDS, JS_KEYWORDS ].join(" ");
    KEYWORDS_BEFORE_EXPRESSION = "return new del raise elif else if";
    ALL_KEYWORDS = [ RESERVED_WORDS, JS_KEYWORDS_AUTOFIX ].join(" ");
    ALL_JS_KEYWORDS = [ JS_KEYWORDS, JS_KEYWORDS_AUTOFIX, COMMON_KEYWORDS ].join(" ");
    KEYWORDS = makePredicate(KEYWORDS);
    ES6_KEYWORDS = makePredicate(ES6_KEYWORDS);
    RESERVED_WORDS = makePredicate(RESERVED_WORDS);
    IS_ANY_KEYWORD = makePredicate(ALL_KEYWORDS);
    KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
    KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
    JS_KEYWORDS_AUTOFIX = makePredicate(JS_KEYWORDS_AUTOFIX);
    ALL_JS_KEYWORDS = makePredicate(ALL_JS_KEYWORDS);
    OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^@"));
    RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
    RE_OCT_NUMBER = /^0[0-7]+$/;
    RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
    OPERATORS = makePredicate([ "in", "new", "void", "del", "++", "--", "+", "-", "not", "~", "&", "|", "^", "**", "*", "/", "//", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "is", "!=", "!==", "?", "=", "+=", "-=", "/=", "//=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "and", "or", "til", "to", "@", "->" ]);
    OP_MAP = {
        "or": "||",
        "and": "&&",
        "not": "!",
        "del": "delete",
        "None": "null",
        "is": "==="
    };
    WHITESPACE_CHARS = makePredicate(characters("  \n\r\t\f​᠎             　"));
    PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));
    PUNC_CHARS = makePredicate(characters("[]{}(),;:"));
    REGEXP_MODIFIERS = makePredicate(characters("gmsiy"));
    UNICODE = {
        letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
        space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
        connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
    };
    IDENTIFIER_PAT = /^[a-z_$][_a-z0-9$]*$/i;
    STRING_MODIFIERS = "urfvURFV";
    UNARY_POSTFIX = makePredicate([ "--", "++" ]);
    PRECEDENCE = function(a, ret) {
        var i, b, j;
        for (i = 0; i < a.length; i++) {
            b = a[i];
            for (j = 0; j < b.length; j++) {
                ret[b[j]] = i + 1;
            }
        }
        return ret;
    }([ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "//", "%" ], [ "**" ] ], {});
    function is_letter(code) {
        return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
    }
    function is_digit(code) {
        return code >= 48 && code <= 57;
    }
    function is_alphanumeric_char(code) {
        return is_digit(code) || is_letter(code);
    }
    function is_unicode_combining_mark(ch) {
        return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
    }
    function is_unicode_connector_punctuation(ch) {
        return UNICODE.connector_punctuation.test(ch);
    }
    function is_string_modifier(val) {
        var ՐՏitr7, ՐՏidx7;
        var ch;
        ՐՏitr7 = ՐՏ_Iterable(val);
        for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
            ch = ՐՏitr7[ՐՏidx7];
            if (ՐՏ_in(ch, STRING_MODIFIERS)) {
                return true;
            }
        }
        return false;
    }
    function is_identifier(name) {
        return !RESERVED_WORDS(name) && IDENTIFIER_PAT.test(name);
    }
    function is_identifier_start(code) {
        return code === 36 || code === 95 || is_letter(code);
    }
    function is_identifier_char(ch) {
        var code;
        code = ch.charCodeAt(0);
        return is_identifier_start(code) || is_digit(code) || code === 8204 || code === 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
    }
    function parse_js_number(num) {
        if (RE_HEX_NUMBER.test(num)) {
            return parseInt(num.substr(2), 16);
        } else if (RE_OCT_NUMBER.test(num)) {
            return parseInt(num.substr(1), 8);
        } else if (RE_DEC_NUMBER.test(num)) {
            return parseFloat(num);
        }
    }
    function is_token(token, type, val) {
        var type_subtype, subtype;
        type_subtype = type.split(":");
        type = type_subtype[0];
        subtype = type_subtype[1];
        return token.type === type && (subtype ? token.subtype === subtype : true) && (val === null || val === void 0 || Array.isArray(val) && val.indexOf(token.value) >= 0 || token.value === val);
    }
    var js_error = (ՐՏ_1 = function js_error(message, err_type, filename, line, col, pos, is_eof) {
        var err;
        err = new ParseError(message, line, col, pos, is_eof, filename);
        err.token_error_type = err_type;
        throw err;
    }, Object.defineProperty(ՐՏ_1, "__doc__", {
        value: 'ast.Node.warn("ERROR: {message} [{file}:{line},{col}]", {\n    message: message,\n    file: filename,\n    line: line,\n    col: col\n})'
    }), ՐՏ_1);
    EX_EOF = {};
    function tokenizer($TEXT, filename) {
        var ՐՏ_9, ՐՏ_10, ՐՏ_11;
        var S;
        S = {
            text: $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""),
            filename: filename,
            pos: 0,
            tokpos: 0,
            line: 1,
            tokline: 0,
            col: 0,
            tokcol: 0,
            newline_before: false,
            regex_allowed: false,
            comments_before: [],
            whitespace_before: [],
            newblock: false,
            endblock: false,
            cached_whitespace: "",
            prev: void 0,
            in_scope: [ "block" ],
            comma_expect: false,
            block_expect: false
        };
        function peek() {
            return S.text.charAt(S.pos);
        }
        function prevChar() {
            return S.text.charAt(S.tokpos - 1);
        }
        function next(signal_eof, in_string) {
            var ch;
            ch = S.text.charAt(S.pos);
            ++S.pos;
            if (signal_eof && !ch) {
                throw EX_EOF;
            }
            if (ch === "\n") {
                S.newline_before = S.newline_before || !in_string;
                ++S.line;
                S.col = 0;
            } else {
                ++S.col;
            }
            return ch;
        }
        function find(what, signal_eof) {
            var pos;
            pos = S.text.indexOf(what, S.pos);
            if (signal_eof && pos === -1) {
                throw EX_EOF;
            }
            return pos;
        }
        function start_token() {
            S.tokline = S.line;
            S.tokcol = S.col;
            S.tokpos = S.pos;
        }
        function token(full_type, value, is_comment, keep_newline) {
            var ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5, ՐՏ_6;
            var _full_type, type, subtype, _value, ret, block_expect, i, top_scope;
            _full_type = full_type.split(":");
            type = _full_type[0];
            subtype = _full_type[1];
            _value = null;
            S.regex_allowed = type === "operator" && !UNARY_POSTFIX[value] || type === "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type === "punc" && PUNC_BEFORE_EXPRESSION(value);
            if (type === "operator" && value === "is" && S.text.substr(S.pos).trimLeft().substr(0, 4).trimRight() === "not") {
                next_token();
                value = "!==";
            }
            if (type === "operator" && OP_MAP[value]) {
                _value = value;
                value = OP_MAP[value];
            }
            ret = {
                type: type,
                subtype: subtype,
                value: value,
                _value: _value,
                line: S.tokline,
                col: S.tokcol,
                pos: S.tokpos,
                endpos: S.pos,
                newline_before: S.newline_before,
                comma_expected: S.comma_expect,
                file: filename
            };
            S.comma_expect = false;
            if (!S.block_expect) {
                S.block_expect = (ՐՏ_2 = S.in_scope)[ՐՏ_2.length-1] === "{}" && (S.prev.type === "keyword" && S.prev.value === "def" && (value === "(" || ՐՏ_in(type, [ "name", "string", "num" ]) || full_type === "operator:keyword") || S.prev.type === "name" && ՐՏ_in(S.prev.value, [ "get", "set" ]) && (ՐՏ_in(type, [ "name", "string", "num" ]) || full_type === "operator:keyword")) || (ՐՏ_3 = S.in_scope)[ՐՏ_3.length-1] === "()" && S.prev.type === "keyword" && S.prev.value === "def" && (value === "(" || type === "name");
            } else {
                block_expect = true;
                S.block_expect = false;
            }
            if (!is_comment) {
                ret.comments_before = S.comments_before;
                S.comments_before = [];
                for (i = 0; i < len(ret.comments_before); i++) {
                    ret.newline_before = ret.newline_before || ret.comments_before[i].newline_before;
                }
            }
            if (!keep_newline) {
                S.newline_before = false;
            }
            top_scope = (ՐՏ_4 = S.in_scope)[ՐՏ_4.length-1];
            if (type === "punc") {
                if (value === ":") {
                    if (ՐՏ_in(top_scope, [ "block", "def", "[]" ])) {
                        if (top_scope === "def") {
                            S.in_scope.pop();
                        }
                        if (!S.text.substring(S.pos, find("\n")).trim() || !S.text.substring(S.pos, find("#")).trim()) {
                            S.newblock = true;
                            S.in_scope.push("block");
                        }
                    }
                } else if (value === "[") {
                    if (S.prev && S.prev.type === "name") {
                        S.in_scope.push("[:]");
                    } else {
                        S.in_scope.push("[]");
                    }
                } else if (value === "(") {
                    if (block_expect || S.block_expect) {
                        S.in_scope.push("def");
                        S.block_expect = false;
                    }
                    S.in_scope.push("()");
                } else if (value === "{") {
                    S.in_scope.push("{}");
                } else if (ՐՏ_in(value, [ "]", ")", "}" ])) {
                    if (top_scope[top_scope.length-1] === value) {
                        S.in_scope.pop();
                    } else {
                        console.log("mismatch: " + value);
                    }
                } else if (value === "endblock") {
                    ret.value = "}";
                    ret._value = value;
                    if (ret.comments_before.length && (ՐՏ_5 = ret.comments_before)[ՐՏ_5.length-1].col <= S.col) {
                        S.comments_before = ret.comments_before;
                        ret.comments_before = [];
                    }
                    if (top_scope === "block") {
                        S.in_scope.pop();
                        if (ՐՏ_in((ՐՏ_6 = S.in_scope)[ՐՏ_6.length-1], [ "[]", "{}", "()" ])) {
                            S.comma_expect = true;
                        }
                    } else {
                        console.log("missmatch: " + value);
                    }
                }
            }
            S.prev = ret;
            return S.prev;
        }
        function parse_whitespace() {
            var leading_whitespace, whitespace_exists, ch;
            leading_whitespace = "";
            whitespace_exists = false;
            while (WHITESPACE_CHARS(peek())) {
                whitespace_exists = true;
                ch = next();
                if (ch === "\n") {
                    leading_whitespace = "";
                } else {
                    leading_whitespace += ch;
                }
            }
            if (peek() !== "#") {
                if (!whitespace_exists) {
                    leading_whitespace = S.cached_whitespace;
                } else {
                    S.cached_whitespace = leading_whitespace;
                }
                if (S.newline_before) {
                    return test_indent_token(leading_whitespace);
                }
            }
        }
        function test_indent_token(leading_whitespace) {
            var ՐՏ_7, ՐՏ_8;
            var most_recent;
            most_recent = (ՐՏ_7 = S.whitespace_before)[ՐՏ_7.length-1] || "";
            S.endblock = false;
            if ((ՐՏ_8 = S.in_scope)[ՐՏ_8.length-1] === "block" && leading_whitespace !== most_recent) {
                if ((leading_whitespace.indexOf(" ") === 0 || most_recent.indexOf(" ") === 0) && Math.abs(leading_whitespace.length - most_recent.length) < OPTIONS.indent_min) {
                    TokenizerError("Indentation is too small", TokenErrorTypes.INDENT);
                }
                if (S.newblock && leading_whitespace && leading_whitespace.indexOf(most_recent) === 0) {
                    S.newblock = false;
                    S.whitespace_before.push(leading_whitespace);
                    return 1;
                } else if (most_recent && most_recent.indexOf(leading_whitespace) === 0) {
                    S.endblock = true;
                    S.whitespace_before.pop();
                    return -1;
                } else {
                    TokenizerError("Inconsistent indentation", TokenErrorTypes.INDENT);
                }
            } else {
                return 0;
            }
        }
        function read_while(pred) {
            var ret, i, ch;
            ret = "";
            i = 0;
            while ((ch = peek()) && pred(ch, i)) {
                ++i;
                ret += next();
            }
            return ret;
        }
        function TokenizerError(err, err_type, is_eof) {
            js_error(err, err_type, filename, S.tokline, S.tokcol, S.tokpos, is_eof);
        }
        function read_num(prefix) {
            var has_e, after_e, has_x, has_dot, num, valid;
            has_e = false;
            after_e = false;
            has_x = false;
            has_dot = prefix === ".";
            num = read_while(function(ch, i) {
                var code, tmp_, has_x, has_e, has_dot;
                code = ch.charCodeAt(0);
                tmp_ = code;
                if (tmp_ === 120 || tmp_ === 88) {
                    return has_x ? false : has_x = true;
                } else if (tmp_ === 101 || tmp_ === 69) {
                    return has_x ? true : has_e ? false : has_e = after_e = true;
                } else if (tmp_ === 45) {
                    return after_e || i === 0 && !prefix;
                } else if (tmp_ === 43) {
                    return after_e;
                } else if (tmp_ === 46) {
                    after_e = false;
                    return !has_dot && !has_x && !has_e ? has_dot = true : false;
                }
                return is_alphanumeric_char(code);
            });
            if (prefix) {
                num = prefix + num;
            }
            valid = parse_js_number(num);
            if (!isNaN(valid)) {
                return token("num", valid);
            } else {
                TokenizerError("Invalid syntax: " + num, TokenErrorTypes.INVALID_SYNTAX);
            }
        }
        function read_escaped_char(in_string, digester) {
            var ch, tmp_;
            digester = digester || function(in_str) {
                return next(true, in_str);
            };
            ch = digester(in_string);
            tmp_ = ch.charCodeAt(0);
            if (tmp_ === 110) {
                return "\n";
            } else if (tmp_ === 114) {
                return "\r";
            } else if (tmp_ === 116) {
                return "\t";
            } else if (tmp_ === 98) {
                return "\b";
            } else if (tmp_ === 118) {
                return "";
            } else if (tmp_ === 102) {
                return "\f";
            } else if (tmp_ === 48) {
                return "\0";
            } else if (tmp_ === 120) {
                return String.fromCharCode(hex_bytes(2, digester));
            } else if (tmp_ === 117) {
                return String.fromCharCode(hex_bytes(4, digester));
            } else if (tmp_ === 10) {
                return "";
            } else {
                return ch;
            }
        }
        function hex_bytes(n, digester) {
            var num, i, digit;
            num = 0;
            for (i = 0; i < n; i++) {
                digit = parseInt(digester(), 16);
                if (isNaN(digit)) {
                    TokenizerError("Invalid hex-character pattern in string", TokenErrorTypes.INVALID_SYNTAX);
                }
                num = num << 4 | digit;
            }
            return num;
        }
        
        var read_string = (ՐՏ_9 = function read_string(modifier) {
            var token_type, quote, ret, quote3, i, tmp, quoted_value, find_newlines, tok, ch;
            token_type = "string";
            if (modifier) {
                token_type += ":" + modifier;
            }
            quote = next();
            ret = "";
            if (peek() === quote) {
                next(true);
                if (peek() === quote) {
                    next(true);
                    quote3 = quote + quote + quote;
                    i = find(quote3, true);
                    if (i !== -1) {
                        tmp = S.text.substring(S.pos, i);
                        quoted_value = quote3 + tmp + quote3;
                        S.pos = i + 3;
                        while (tmp.length) {
                            if (tmp[0] === "\\") {
                                tmp = tmp.slice(1);
                                ret += read_escaped_char(true, function() {
                                    var ch;
                                    ch = tmp[0];
                                    tmp = tmp.slice(1);
                                    return ch;
                                });
                            } else {
                                ret += tmp[0];
                                tmp = tmp.slice(1);
                            }
                        }
                        find_newlines = ret.match(/\n/g);
                        if (find_newlines) {
                            S.line += find_newlines.length;
                        }
                        tok = token(token_type, ret);
                        tok._value = quoted_value;
                        return tok;
                    }
                } else {
                    return token(token_type, "");
                }
            }
            while (true) {
                ch = next(true);
                if (ch === "\n") {
                    TokenizerError("End of line while scanning string literal.", TokenErrorTypes.UNEXPECTED_EOL);
                }
                if (ch === "\\") {
                    if (peek() === "\n") {
                        next(true);
                        continue;
                    } else {
                        ch = read_escaped_char(true);
                    }
                } else if (ch === quote) {
                    break;
                }
                ret += ch;
            }
            return token(token_type, ret);
        }, ՐՏ_9 = with_eof_error("Unterminated string constant")(ՐՏ_9), ՐՏ_9);
        function read_line_comment(shebang=false) {
            var i, ret;
            if (!shebang) {
                next();
            }
            i = find("\n");
            if (i === -1) {
                ret = S.text.substr(S.pos);
                S.pos = S.text.length;
            } else {
                ret = S.text.substring(S.pos, i);
                S.pos = i;
            }
            return token(shebang ? "shebang" : "comment:line", ret, true);
        }
        
        var read_multiline_comment = (ՐՏ_10 = function read_multiline_comment() {
            var i, text, a, n;
            next();
            i = find("*/", true);
            text = S.text.substring(S.pos, i);
            a = text.split("\n");
            n = a.length;
            S.pos = i + 2;
            S.line += n - 1;
            if (n > 1) {
                S.col = a[n - 1].length;
            } else {
                S.col += a[n - 1].length;
            }
            S.col += 2;
            S.newline_before = S.newline_before || ՐՏ_in("\n", text);
            return token("comment:multiline", text, true);
        }, ՐՏ_10 = with_eof_error("Unterminated multiline comment")(ՐՏ_10), ՐՏ_10);
        function read_name() {
            var backslash, name, escaped, ch, hex;
            backslash = false;
            name = "";
            escaped = false;
            while ((ch = peek()) !== null) {
                if (!backslash) {
                    if (ch === "\\") {
                        if (S.text.charAt(S.pos + 1) === "\n") {
                            S.pos += 2;
                            continue;
                        } else {
                            escaped = backslash = true;
                            next();
                        }
                    } else if (is_identifier_char(ch)) {
                        name += next();
                    } else {
                        break;
                    }
                } else {
                    if (ch !== "u") {
                        TokenizerError("Expecting UnicodeEscapeSequence -- uXXXX", TokenErrorTypes.UNEXPECTED_UNISEQ);
                    }
                    ch = read_escaped_char();
                    if (!is_identifier_char(ch)) {
                        TokenizerError("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier", TokenErrorTypes.INVALID_IDENTIFIER);
                    }
                    name += ch;
                    backslash = false;
                }
            }
            if (KEYWORDS(name) && escaped) {
                hex = name.charCodeAt(0).toString(16).toUpperCase();
                name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
            }
            return name;
        }
        
        var read_regexp = (ՐՏ_11 = function read_regexp(regexp) {
            var prev_backslash, in_class, verbose_regexp, in_comment, mods, ch;
            prev_backslash = false;
            in_class = false;
            verbose_regexp = false;
            in_comment = false;
            if (peek() === "/") {
                next(true);
                if (peek() === "/") {
                    verbose_regexp = true;
                    next(true);
                } else {
                    mods = read_name();
                    return token("regexp", new RegExp(regexp, mods));
                }
            }
            while (ch = next(true)) {
                if (in_comment) {
                    if (ch === "\n") {
                        in_comment = false;
                    }
                    continue;
                }
                if (prev_backslash) {
                    regexp += "\\" + ch;
                    prev_backslash = false;
                } else if (ch === "[") {
                    in_class = true;
                    regexp += ch;
                } else if (ch === "]" && in_class) {
                    in_class = false;
                    regexp += ch;
                } else if (ch === "/" && !in_class) {
                    if (verbose_regexp) {
                        if (peek() !== "/") {
                            regexp += "\\/";
                            continue;
                        }
                        next(true);
                        if (peek() !== "/") {
                            regexp += "\\/\\/";
                            continue;
                        }
                        next(true);
                    }
                    break;
                } else if (ch === "\\") {
                    prev_backslash = true;
                } else if (verbose_regexp && !in_class && ՐՏ_in(ch, " \n\r\t")) {
                } else if (verbose_regexp && !in_class && ch === "#") {
                    in_comment = true;
                } else {
                    regexp += ch;
                }
            }
            mods = read_name();
            return token("regexp", new RegExp(regexp, mods));
        }, ՐՏ_11 = with_eof_error("Unterminated regular expression")(ՐՏ_11), ՐՏ_11);
        function read_operator(prefix) {
            var op;
            function grow(op) {
                var bigger;
                if (!peek()) {
                    return op;
                }
                bigger = op + peek();
                if (OPERATORS(bigger)) {
                    next();
                    return grow(bigger);
                } else {
                    return op;
                }
            }
            op = grow(prefix || next());
            if (ՐՏ_in(op, [ "++", "--", "===", "!==" ])) {
                TokenizerError("Invalid operator «" + op + "»", TokenErrorTypes.INVALID_OPERATOR);
            } else if (op === "->") {
                return token("punc", op);
            }
            return token("operator:symbol", op);
        }
        function handle_slash() {
            next();
            return S.regex_allowed ? read_regexp("") : read_operator("/");
        }
        function handle_dot() {
            next();
            return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
        }
        function read_word() {
            var word;
            word = read_name();
            return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) && prevChar() !== "." ? token("operator:keyword", word) : token("keyword", word);
        }
        function with_eof_error(eof_error) {
            return function(cont) {
                return function(x) {
                    try {
                        return cont(x);
                    } catch (ՐՏ_Exception) {
                        var ex = ՐՏ_Exception;
                        if (ex === EX_EOF) {
                            TokenizerError(eof_error, TokenErrorTypes.UNEXPECTED_EOF, true);
                        } else {
                            throw ՐՏ_Exception;
                        }
                    }
                };
            };
        }
        function next_token(force_regexp) {
            var indent, ch, code, tmp_, regex_allowed, comment, tok, mods, string_tok;
            if (!(ՐՏ_in(force_regexp, [null, void 0]))) {
                return read_regexp(force_regexp);
            }
            indent = parse_whitespace();
            if (indent === -1) {
                return token("punc", "endblock", false, true);
            }
            start_token();
            ch = peek();
            if (!ch) {
                return token("eof");
            }
            code = ch.charCodeAt(0);
            tmp_ = code;
            if (tmp_ === 34 || tmp_ === 39) {
                return read_string();
            } else if (tmp_ === 35) {
                if (S.pos === 0 && S.text.charAt(1) === "!") {
                    return read_line_comment(true);
                }
                regex_allowed = S.regex_allowed;
                comment = read_line_comment();
                S.comments_before.push(comment);
                S.regex_allowed = regex_allowed;
                return comment;
            } else if (tmp_ === 46) {
                return handle_dot();
            } else if (tmp_ === 47) {
                return handle_slash();
            }
            if (is_digit(code)) {
                return read_num();
            }
            if (PUNC_CHARS(ch)) {
                return token("punc", next());
            }
            if (OPERATOR_CHARS(ch)) {
                return read_operator();
            }
            if (code === 92 && S.text.charAt(S.pos + 1) === "\n") {
                next();
                next();
                S.newline_before = false;
                return next_token();
            }
            if (code === 92 || is_identifier_start(code)) {
                tok = read_word();
                if (ՐՏ_in(peek(), "'\"") && is_string_modifier(tok.value)) {
                    mods = tok.value.toLowerCase();
                    string_tok = read_string(mods);
                    tok.endpos = string_tok.endpos;
                    tok.value = string_tok.value;
                    tok.subtype = string_tok.subtype;
                    tok.type = string_tok.type;
                }
                return tok;
            }
            TokenizerError("Unexpected character «" + ch + "»", TokenErrorTypes.INVALID_SYNTAX);
        }
        next_token.context = function(nc) {
            if (nc) {
                S = nc;
            }
            return S;
        };
        next_token.next = next;
        next_token.peek = peek;
        return next_token;
    }
    var ՐՏ_mod = ՐՏ_modules["ՐՏ:rs_tokenizer"];
    ՐՏ_mod.export("TokenErrorTypes", function(){return TokenErrorTypes;}, function(ՐՏ_v){if (typeof TokenErrorTypes !== "undefined") {TokenErrorTypes = ՐՏ_v;};});
    ՐՏ_mod.export("OPTIONS", function(){return OPTIONS;}, function(ՐՏ_v){if (typeof OPTIONS !== "undefined") {OPTIONS = ՐՏ_v;};});
    ՐՏ_mod.export("ES6_KEYWORDS", function(){return ES6_KEYWORDS;}, function(ՐՏ_v){if (typeof ES6_KEYWORDS !== "undefined") {ES6_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("COMMON_KEYWORDS", function(){return COMMON_KEYWORDS;}, function(ՐՏ_v){if (typeof COMMON_KEYWORDS !== "undefined") {COMMON_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("JS_KEYWORDS", function(){return JS_KEYWORDS;}, function(ՐՏ_v){if (typeof JS_KEYWORDS !== "undefined") {JS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("JS_KEYWORDS_AUTOFIX", function(){return JS_KEYWORDS_AUTOFIX;}, function(ՐՏ_v){if (typeof JS_KEYWORDS_AUTOFIX !== "undefined") {JS_KEYWORDS_AUTOFIX = ՐՏ_v;};});
    ՐՏ_mod.export("RS_KEYWORDS", function(){return RS_KEYWORDS;}, function(ՐՏ_v){if (typeof RS_KEYWORDS !== "undefined") {RS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS", function(){return KEYWORDS;}, function(ՐՏ_v){if (typeof KEYWORDS !== "undefined") {KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS_ATOM", function(){return KEYWORDS_ATOM;}, function(ՐՏ_v){if (typeof KEYWORDS_ATOM !== "undefined") {KEYWORDS_ATOM = ՐՏ_v;};});
    ՐՏ_mod.export("RESERVED_WORDS", function(){return RESERVED_WORDS;}, function(ՐՏ_v){if (typeof RESERVED_WORDS !== "undefined") {RESERVED_WORDS = ՐՏ_v;};});
    ՐՏ_mod.export("KEYWORDS_BEFORE_EXPRESSION", function(){return KEYWORDS_BEFORE_EXPRESSION;}, function(ՐՏ_v){if (typeof KEYWORDS_BEFORE_EXPRESSION !== "undefined") {KEYWORDS_BEFORE_EXPRESSION = ՐՏ_v;};});
    ՐՏ_mod.export("ALL_KEYWORDS", function(){return ALL_KEYWORDS;}, function(ՐՏ_v){if (typeof ALL_KEYWORDS !== "undefined") {ALL_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("ALL_JS_KEYWORDS", function(){return ALL_JS_KEYWORDS;}, function(ՐՏ_v){if (typeof ALL_JS_KEYWORDS !== "undefined") {ALL_JS_KEYWORDS = ՐՏ_v;};});
    ՐՏ_mod.export("IS_ANY_KEYWORD", function(){return IS_ANY_KEYWORD;}, function(ՐՏ_v){if (typeof IS_ANY_KEYWORD !== "undefined") {IS_ANY_KEYWORD = ՐՏ_v;};});
    ՐՏ_mod.export("OPERATOR_CHARS", function(){return OPERATOR_CHARS;}, function(ՐՏ_v){if (typeof OPERATOR_CHARS !== "undefined") {OPERATOR_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("RE_HEX_NUMBER", function(){return RE_HEX_NUMBER;}, function(ՐՏ_v){if (typeof RE_HEX_NUMBER !== "undefined") {RE_HEX_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("RE_OCT_NUMBER", function(){return RE_OCT_NUMBER;}, function(ՐՏ_v){if (typeof RE_OCT_NUMBER !== "undefined") {RE_OCT_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("RE_DEC_NUMBER", function(){return RE_DEC_NUMBER;}, function(ՐՏ_v){if (typeof RE_DEC_NUMBER !== "undefined") {RE_DEC_NUMBER = ՐՏ_v;};});
    ՐՏ_mod.export("OPERATORS", function(){return OPERATORS;}, function(ՐՏ_v){if (typeof OPERATORS !== "undefined") {OPERATORS = ՐՏ_v;};});
    ՐՏ_mod.export("OP_MAP", function(){return OP_MAP;}, function(ՐՏ_v){if (typeof OP_MAP !== "undefined") {OP_MAP = ՐՏ_v;};});
    ՐՏ_mod.export("WHITESPACE_CHARS", function(){return WHITESPACE_CHARS;}, function(ՐՏ_v){if (typeof WHITESPACE_CHARS !== "undefined") {WHITESPACE_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("PUNC_BEFORE_EXPRESSION", function(){return PUNC_BEFORE_EXPRESSION;}, function(ՐՏ_v){if (typeof PUNC_BEFORE_EXPRESSION !== "undefined") {PUNC_BEFORE_EXPRESSION = ՐՏ_v;};});
    ՐՏ_mod.export("PUNC_CHARS", function(){return PUNC_CHARS;}, function(ՐՏ_v){if (typeof PUNC_CHARS !== "undefined") {PUNC_CHARS = ՐՏ_v;};});
    ՐՏ_mod.export("REGEXP_MODIFIERS", function(){return REGEXP_MODIFIERS;}, function(ՐՏ_v){if (typeof REGEXP_MODIFIERS !== "undefined") {REGEXP_MODIFIERS = ՐՏ_v;};});
    ՐՏ_mod.export("UNICODE", function(){return UNICODE;}, function(ՐՏ_v){if (typeof UNICODE !== "undefined") {UNICODE = ՐՏ_v;};});
    ՐՏ_mod.export("IDENTIFIER_PAT", function(){return IDENTIFIER_PAT;}, function(ՐՏ_v){if (typeof IDENTIFIER_PAT !== "undefined") {IDENTIFIER_PAT = ՐՏ_v;};});
    ՐՏ_mod.export("STRING_MODIFIERS", function(){return STRING_MODIFIERS;}, function(ՐՏ_v){if (typeof STRING_MODIFIERS !== "undefined") {STRING_MODIFIERS = ՐՏ_v;};});
    ՐՏ_mod.export("UNARY_POSTFIX", function(){return UNARY_POSTFIX;}, function(ՐՏ_v){if (typeof UNARY_POSTFIX !== "undefined") {UNARY_POSTFIX = ՐՏ_v;};});
    ՐՏ_mod.export("PRECEDENCE", function(){return PRECEDENCE;}, function(ՐՏ_v){if (typeof PRECEDENCE !== "undefined") {PRECEDENCE = ՐՏ_v;};});
    ՐՏ_mod.export("EX_EOF", function(){return EX_EOF;}, function(ՐՏ_v){if (typeof EX_EOF !== "undefined") {EX_EOF = ՐՏ_v;};});
    ՐՏ_mod.export("set_options", function(){return set_options;}, function(ՐՏ_v){if (typeof set_options !== "undefined") {set_options = ՐՏ_v;};});
    ՐՏ_mod.export("characters", function(){return characters;}, function(ՐՏ_v){if (typeof characters !== "undefined") {characters = ՐՏ_v;};});
    ՐՏ_mod.export("is_letter", function(){return is_letter;}, function(ՐՏ_v){if (typeof is_letter !== "undefined") {is_letter = ՐՏ_v;};});
    ՐՏ_mod.export("is_digit", function(){return is_digit;}, function(ՐՏ_v){if (typeof is_digit !== "undefined") {is_digit = ՐՏ_v;};});
    ՐՏ_mod.export("is_alphanumeric_char", function(){return is_alphanumeric_char;}, function(ՐՏ_v){if (typeof is_alphanumeric_char !== "undefined") {is_alphanumeric_char = ՐՏ_v;};});
    ՐՏ_mod.export("is_unicode_combining_mark", function(){return is_unicode_combining_mark;}, function(ՐՏ_v){if (typeof is_unicode_combining_mark !== "undefined") {is_unicode_combining_mark = ՐՏ_v;};});
    ՐՏ_mod.export("is_unicode_connector_punctuation", function(){return is_unicode_connector_punctuation;}, function(ՐՏ_v){if (typeof is_unicode_connector_punctuation !== "undefined") {is_unicode_connector_punctuation = ՐՏ_v;};});
    ՐՏ_mod.export("is_string_modifier", function(){return is_string_modifier;}, function(ՐՏ_v){if (typeof is_string_modifier !== "undefined") {is_string_modifier = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier", function(){return is_identifier;}, function(ՐՏ_v){if (typeof is_identifier !== "undefined") {is_identifier = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier_start", function(){return is_identifier_start;}, function(ՐՏ_v){if (typeof is_identifier_start !== "undefined") {is_identifier_start = ՐՏ_v;};});
    ՐՏ_mod.export("is_identifier_char", function(){return is_identifier_char;}, function(ՐՏ_v){if (typeof is_identifier_char !== "undefined") {is_identifier_char = ՐՏ_v;};});
    ՐՏ_mod.export("parse_js_number", function(){return parse_js_number;}, function(ՐՏ_v){if (typeof parse_js_number !== "undefined") {parse_js_number = ՐՏ_v;};});
    ՐՏ_mod.export("is_token", function(){return is_token;}, function(ՐՏ_v){if (typeof is_token !== "undefined") {is_token = ՐՏ_v;};});
    ՐՏ_mod.export("js_error", function(){return js_error;}, function(ՐՏ_v){if (typeof js_error !== "undefined") {js_error = ՐՏ_v;};});
    ՐՏ_mod.export("tokenizer", function(){return tokenizer;}, function(ՐՏ_v){if (typeof tokenizer !== "undefined") {tokenizer = ՐՏ_v;};});
    ՐՏ_mod.export("defaults", function(){return defaults;}, function(ՐՏ_v){if (typeof defaults !== "undefined") {defaults = ՐՏ_v;};});
    return ՐՏ_mod["exports"];
};

(function(){

    var __name__ = "__main__";

    var tokenizer = ՐՏ_modules["rs_tokenizer"].tokenizer;var TokenErrorTypes = ՐՏ_modules["rs_tokenizer"].TokenErrorTypes;
    var ParseError = ՐՏ_modules["utils"].ParseError;
    class SematicTokenizer {
        constructor (txt) {
            var self = this;
            self.next_token = tokenizer(txt, "current.pyj");
            self.txt = txt;
            self.prev = {};
            self.prev_ret = {};
        }
        process_error (err) {
            var self = this;
            var next_token, ch;
            next_token = self.next_token;
            if (err.token_error_type === TokenErrorTypes.UNEXPECTED_EOF) {
                return;
            }
            if (err.token_error_type === TokenErrorTypes.UNEXPECTED_EOL) {
                return true;
            }
            while (true) {
                ch = next_token.peek();
                if (!ch) {
                    return;
                }
                if (!/^\s$/.test(ch)) {
                    next_token.next();
                    continue;
                }
                return true;
            }
        }
        token (t) {
            var self = this;
            var prev;
            if (ՐՏ_in(t.type, [ "string", "regexp", "comment" ])) {
                return t;
            }
            if (t.type === "operator") {
                if (t.subtype === "keyword") {
                    t.tokenModifiers = [ "logical" ];
                }
                return t;
            }
            if (t.type === "keyword") {
                if (t.value === "def") {
                    t.type = "struct";
                    t.tokenModifiers = [ "function" ];
                } else if (t.value === "class") {
                    t.type = "struct";
                    t.tokenModifiers = [ "class" ];
                }
                return t;
            }
            if (t.type === "num") {
                t.type = "number";
                return t;
            }
            if (t.type === "punc") {
                return;
            }
            if (t.type === "atom") {
                t.type = "variable";
                t.tokenModifiers = [ "readonly" ];
                return t;
            }
            if (t.type === "name") {
                prev = self.prev;
                if (ՐՏ_in(prev.type, [ "keyword", "struct" ])) {
                    if (ՐՏ_in(prev.value, [ "import", "from" ])) {
                        t.type = "namespace";
                        return t;
                    }
                    if (prev.value === "def") {
                        t.type = "function";
                        return t;
                    }
                    if (prev.value === "class") {
                        t.type = "class";
                        return t;
                    }
                }
                if (prev.type === "punc" && prev.value === ".") {
                    t.type = "property";
                    return t;
                }
                if (self.prev_ret.type === "function" || self.prev_ret.type === "parameter" && prev.value !== ":") {
                    t.type = "parameter";
                    return t;
                }
                t.type = "variable";
                return t;
            }
        }
        parse_token () {
            var self = this;
            var ret, i, max, t;
            ret = null;
            i = 0;
            max = 100;
            while (!ret && i < max) {
                try {
                    t = self.next_token();
                    if (t.type === "eof") {
                        return;
                    }
                    ret = self.token(t);
                    self.prev = t;
                } catch (ՐՏ_Exception) {
                    if (ՐՏ_Exception instanceof ParseError) {
                        var err = ՐՏ_Exception;
                        if (self.process_error(err)) {
                            continue;
                        }
                        break;
                    } else {
                        throw ՐՏ_Exception;
                    }
                }
                ++i;
            }
            if (ret.value !== "*") {
                self.prev_ret = ret;
            }
            return ret;
        }
    }
    module.exports = {
        SematicTokenizer: SematicTokenizer
    };
})();
})();
