(function(){
"use strict";
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
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
    var ՐՏitr1, ՐՏidx1;
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
        ՐՏitr1 = ՐՏ_Iterable(a);
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            i = ՐՏitr1[ՐՏidx1];
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

(function(){

    var __name__ = "__main__";

    var vscode, tokenizer, tokenTypes, tokenModifiers;
    vscode = require("vscode");
    tokenizer = require("./tokenizer");
    tokenTypes = new Map();
    tokenModifiers = new Map();
    function legend() {
        var tokenTypesLegend, tokenModifiersLegend;
        tokenTypesLegend = [ "comment", "string", "keyword", "number", "regexp", "operator", "namespace", "type", "struct", "class", "interface", "enum", "typeParameter", "function", "method", "macro", "variable", "parameter", "property", "label" ];
        tokenTypesLegend.forEach(function(tokenType, index) {
            tokenTypes.set(tokenType, index);
        });
        tokenModifiersLegend = [ "declaration", "documentation", "readonly", "static", "abstract", "deprecated", "modification", "async", "logical", "class", "function" ];
        tokenModifiersLegend.forEach(function(tm, index) {
            tokenModifiers.set(tm, index);
        });
        return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
    }
    function activate(context) {
        context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({
            language: "rapydscript"
        }, new DocumentSemanticTokensProvider(), legend()));
    }
    class DocumentSemanticTokensProvider {
        provideDocumentSemanticTokens (document, cancelToken) {
            var self = this;
            var tkz, builder, token;
            tkz = new tokenizer.SematicTokenizer(document.getText());
            builder = new vscode.SemanticTokensBuilder();
            while (true) {
                token = tkz.parse_token();
                if (!token) {
                    break;
                }
                if (token.type === "string" && token._value) {
                    self.push_multiline_str(token, builder);
                    continue;
                }
                builder.push(token.line - 1, token.col, token.endpos - token.pos, self._encodeTokenType(token.type), self._encodeTokenModifiers(token.tokenModifiers || []));
            }
            return builder.build();
        }
        push_multiline_str (token, builder) {
            var self = this;
            var lines, col, ln, i;
            lines = token._value.split(/\r\n|\r|\n/);
            col = token.col;
            ln = token.line;
            for (i = 0; i < lines.length; i++) {
                builder.push(ln + i - 1, col, lines[i].length, self._encodeTokenType(token.type), self._encodeTokenModifiers(token.tokenModifiers || []));
                col = 0;
            }
        }
        _encodeTokenType (tokenType) {
            var self = this;
            if (tokenTypes.has(tokenType)) {
                return tokenTypes.get(tokenType);
            } else if (tokenType === "notInLegend") {
                return tokenTypes.size + 2;
            }
            return 0;
        }
        _encodeTokenModifiers (strTokenModifiers) {
            var self = this;
            var result, i, tokenModifier;
            result = 0;
            for (i = 0; i < strTokenModifiers.length; i++) {
                tokenModifier = strTokenModifiers[i];
                if (tokenModifiers.has(tokenModifier)) {
                    result = result | 1 << tokenModifiers.get(tokenModifier);
                } else if (tokenModifier === "notInLegend") {
                    result = result | 1 << tokenModifiers.size + 2;
                }
            }
            return result;
        }
    }
    function deactivate() {
    }
    module.exports = {
        activate: activate,
        deactivate: deactivate
    };
})();
})();
