"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // bin/live-reload.js
  var init_live_reload = __esm({
    "bin/live-reload.js"() {
      "use strict";
      new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());
    }
  });

  // node_modules/.pnpm/@barba+core@2.10.0/node_modules/@barba/core/dist/barba.umd.js
  var require_barba_umd = __commonJS({
    "node_modules/.pnpm/@barba+core@2.10.0/node_modules/@barba/core/dist/barba.umd.js"(exports, module) {
      init_live_reload();
      !function(t, n) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t || self).barba = n();
      }(exports, function() {
        function t(t2, n2) {
          for (var r2 = 0; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t2, "symbol" == typeof (e2 = function(t3, n3) {
              if ("object" != typeof t3 || null === t3)
                return t3;
              var r3 = t3[Symbol.toPrimitive];
              if (void 0 !== r3) {
                var i3 = r3.call(t3, "string");
                if ("object" != typeof i3)
                  return i3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return String(t3);
            }(i2.key)) ? e2 : String(e2), i2);
          }
          var e2;
        }
        function n(n2, r2, i2) {
          return r2 && t(n2.prototype, r2), i2 && t(n2, i2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
        }
        function r() {
          return r = Object.assign ? Object.assign.bind() : function(t2) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var r2 = arguments[n2];
              for (var i2 in r2)
                Object.prototype.hasOwnProperty.call(r2, i2) && (t2[i2] = r2[i2]);
            }
            return t2;
          }, r.apply(this, arguments);
        }
        function i(t2, n2) {
          t2.prototype = Object.create(n2.prototype), t2.prototype.constructor = t2, o(t2, n2);
        }
        function e(t2) {
          return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          }, e(t2);
        }
        function o(t2, n2) {
          return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, n3) {
            return t3.__proto__ = n3, t3;
          }, o(t2, n2);
        }
        function u() {
          if ("undefined" == typeof Reflect || !Reflect.construct)
            return false;
          if (Reflect.construct.sham)
            return false;
          if ("function" == typeof Proxy)
            return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (t2) {
            return false;
          }
        }
        function s(t2, n2, r2) {
          return s = u() ? Reflect.construct.bind() : function(t3, n3, r3) {
            var i2 = [null];
            i2.push.apply(i2, n3);
            var e2 = new (Function.bind.apply(t3, i2))();
            return r3 && o(e2, r3.prototype), e2;
          }, s.apply(null, arguments);
        }
        function f(t2) {
          var n2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return f = function(t3) {
            if (null === t3 || -1 === Function.toString.call(t3).indexOf("[native code]"))
              return t3;
            if ("function" != typeof t3)
              throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== n2) {
              if (n2.has(t3))
                return n2.get(t3);
              n2.set(t3, r2);
            }
            function r2() {
              return s(t3, arguments, e(this).constructor);
            }
            return r2.prototype = Object.create(t3.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }), o(r2, t3);
          }, f(t2);
        }
        function c(t2) {
          if (void 0 === t2)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        }
        var a, h = function() {
          this.before = void 0, this.beforeLeave = void 0, this.leave = void 0, this.afterLeave = void 0, this.beforeEnter = void 0, this.enter = void 0, this.afterEnter = void 0, this.after = void 0;
        };
        !function(t2) {
          t2[t2.off = 0] = "off", t2[t2.error = 1] = "error", t2[t2.warning = 2] = "warning", t2[t2.info = 3] = "info", t2[t2.debug = 4] = "debug";
        }(a || (a = {}));
        var v = a.off, d = /* @__PURE__ */ function() {
          function t2(t3) {
            this.t = void 0, this.t = t3;
          }
          t2.getLevel = function() {
            return v;
          }, t2.setLevel = function(t3) {
            return v = a[t3];
          };
          var n2 = t2.prototype;
          return n2.error = function() {
            this.i(console.error, a.error, [].slice.call(arguments));
          }, n2.warn = function() {
            this.i(console.warn, a.warning, [].slice.call(arguments));
          }, n2.info = function() {
            this.i(console.info, a.info, [].slice.call(arguments));
          }, n2.debug = function() {
            this.i(console.log, a.debug, [].slice.call(arguments));
          }, n2.i = function(n3, r2, i2) {
            r2 <= t2.getLevel() && n3.apply(console, ["[" + this.t + "] "].concat(i2));
          }, t2;
        }();
        function l(t2) {
          return t2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function p(t2) {
          return t2 && t2.sensitive ? "" : "i";
        }
        var m = { container: "container", history: "history", namespace: "namespace", prefix: "data-barba", prevent: "prevent", wrapper: "wrapper" }, w = /* @__PURE__ */ function() {
          function t2() {
            this.o = m, this.u = void 0, this.h = { after: null, before: null, parent: null };
          }
          var n2 = t2.prototype;
          return n2.toString = function(t3) {
            return t3.outerHTML;
          }, n2.toDocument = function(t3) {
            return this.u || (this.u = new DOMParser()), this.u.parseFromString(t3, "text/html");
          }, n2.toElement = function(t3) {
            var n3 = document.createElement("div");
            return n3.innerHTML = t3, n3;
          }, n2.getHtml = function(t3) {
            return void 0 === t3 && (t3 = document), this.toString(t3.documentElement);
          }, n2.getWrapper = function(t3) {
            return void 0 === t3 && (t3 = document), t3.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
          }, n2.getContainer = function(t3) {
            return void 0 === t3 && (t3 = document), t3.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
          }, n2.removeContainer = function(t3) {
            document.body.contains(t3) && (this.v(t3), t3.parentNode.removeChild(t3));
          }, n2.addContainer = function(t3, n3) {
            var r2 = this.getContainer() || this.h.before;
            r2 ? this.l(t3, r2) : this.h.after ? this.h.after.parentNode.insertBefore(t3, this.h.after) : this.h.parent ? this.h.parent.appendChild(t3) : n3.appendChild(t3);
          }, n2.getSibling = function() {
            return this.h;
          }, n2.getNamespace = function(t3) {
            void 0 === t3 && (t3 = document);
            var n3 = t3.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return n3 ? n3.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
          }, n2.getHref = function(t3) {
            if (t3.tagName && "a" === t3.tagName.toLowerCase()) {
              if ("string" == typeof t3.href)
                return t3.href;
              var n3 = t3.getAttribute("href") || t3.getAttribute("xlink:href");
              if (n3)
                return this.resolveUrl(n3.baseVal || n3);
            }
            return null;
          }, n2.resolveUrl = function() {
            var t3 = [].slice.call(arguments).length;
            if (0 === t3)
              throw new Error("resolveUrl requires at least one argument; got none.");
            var n3 = document.createElement("base");
            if (n3.href = arguments[0], 1 === t3)
              return n3.href;
            var r2 = document.getElementsByTagName("head")[0];
            r2.insertBefore(n3, r2.firstChild);
            for (var i2, e2 = document.createElement("a"), o2 = 1; o2 < t3; o2++)
              e2.href = arguments[o2], n3.href = i2 = e2.href;
            return r2.removeChild(n3), i2;
          }, n2.l = function(t3, n3) {
            n3.parentNode.insertBefore(t3, n3.nextSibling);
          }, n2.v = function(t3) {
            return this.h = { after: t3.nextElementSibling, before: t3.previousElementSibling, parent: t3.parentElement }, this.h;
          }, t2;
        }(), b = new w(), y = /* @__PURE__ */ function() {
          function t2() {
            this.p = void 0, this.m = [], this.P = -1;
          }
          var i2 = t2.prototype;
          return i2.init = function(t3, n2) {
            this.p = "barba";
            var r2 = { data: {}, ns: n2, scroll: { x: window.scrollX, y: window.scrollY }, url: t3 };
            this.P = 0, this.m.push(r2);
            var i3 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history && window.history.replaceState(i3, "", t3);
          }, i2.change = function(t3, n2, r2) {
            if (r2 && r2.state) {
              var i3 = r2.state, e2 = i3.index;
              n2 = this.g(this.P - e2), this.replace(i3.states), this.P = e2;
            } else
              this.add(t3, n2);
            return n2;
          }, i2.add = function(t3, n2, r2, i3) {
            var e2 = null != r2 ? r2 : this.R(n2), o2 = { data: null != i3 ? i3 : {}, ns: "tmp", scroll: { x: window.scrollX, y: window.scrollY }, url: t3 };
            switch (e2) {
              case "push":
                this.P = this.size, this.m.push(o2);
                break;
              case "replace":
                this.set(this.P, o2);
            }
            var u2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            switch (e2) {
              case "push":
                window.history && window.history.pushState(u2, "", t3);
                break;
              case "replace":
                window.history && window.history.replaceState(u2, "", t3);
            }
          }, i2.store = function(t3, n2) {
            var i3 = n2 || this.P, e2 = this.get(i3);
            e2.data = r({}, e2.data, t3), this.set(i3, e2);
            var o2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history.replaceState(o2, "");
          }, i2.update = function(t3, n2) {
            var i3 = n2 || this.P, e2 = r({}, this.get(i3), t3);
            this.set(i3, e2);
          }, i2.remove = function(t3) {
            t3 ? this.m.splice(t3, 1) : this.m.pop(), this.P--;
          }, i2.clear = function() {
            this.m = [], this.P = -1;
          }, i2.replace = function(t3) {
            this.m = t3;
          }, i2.get = function(t3) {
            return this.m[t3];
          }, i2.set = function(t3, n2) {
            return this.m[t3] = n2;
          }, i2.R = function(t3) {
            var n2 = "push", r2 = t3, i3 = m.prefix + "-" + m.history;
            return r2.hasAttribute && r2.hasAttribute(i3) && (n2 = r2.getAttribute(i3)), n2;
          }, i2.g = function(t3) {
            return Math.abs(t3) > 1 ? t3 > 0 ? "forward" : "back" : 0 === t3 ? "popstate" : t3 > 0 ? "back" : "forward";
          }, n(t2, [{ key: "current", get: function() {
            return this.m[this.P];
          } }, { key: "previous", get: function() {
            return this.P < 1 ? null : this.m[this.P - 1];
          } }, { key: "size", get: function() {
            return this.m.length;
          } }]), t2;
        }(), P = new y(), g = function(t2, n2) {
          try {
            var r2 = function() {
              if (!n2.next.html)
                return Promise.resolve(t2).then(function(t3) {
                  var r3 = n2.next;
                  if (t3) {
                    var i2 = b.toElement(t3.html);
                    r3.namespace = b.getNamespace(i2), r3.container = b.getContainer(i2), r3.url = t3.url, r3.html = t3.html, P.update({ ns: r3.namespace });
                    var e2 = b.toDocument(t3.html);
                    document.title = e2.title;
                  }
                });
            }();
            return Promise.resolve(r2 && r2.then ? r2.then(function() {
            }) : void 0);
          } catch (t3) {
            return Promise.reject(t3);
          }
        }, E = function t2(n2, r2, i2) {
          return n2 instanceof RegExp ? function(t3, n3) {
            if (!n3)
              return t3;
            for (var r3 = /\((?:\?<(.*?)>)?(?!\?)/g, i3 = 0, e2 = r3.exec(t3.source); e2; )
              n3.push({ name: e2[1] || i3++, prefix: "", suffix: "", modifier: "", pattern: "" }), e2 = r3.exec(t3.source);
            return t3;
          }(n2, r2) : Array.isArray(n2) ? function(n3, r3, i3) {
            var e2 = n3.map(function(n4) {
              return t2(n4, r3, i3).source;
            });
            return new RegExp("(?:".concat(e2.join("|"), ")"), p(i3));
          }(n2, r2, i2) : function(t3, n3, r3) {
            return function(t4, n4, r4) {
              void 0 === r4 && (r4 = {});
              for (var i3 = r4.strict, e2 = void 0 !== i3 && i3, o2 = r4.start, u2 = void 0 === o2 || o2, s2 = r4.end, f2 = void 0 === s2 || s2, c2 = r4.encode, a2 = void 0 === c2 ? function(t5) {
                return t5;
              } : c2, h2 = r4.delimiter, v2 = void 0 === h2 ? "/#?" : h2, d2 = r4.endsWith, m2 = "[".concat(l(void 0 === d2 ? "" : d2), "]|$"), w2 = "[".concat(l(v2), "]"), b2 = u2 ? "^" : "", y2 = 0, P2 = t4; y2 < P2.length; y2++) {
                var g2 = P2[y2];
                if ("string" == typeof g2)
                  b2 += l(a2(g2));
                else {
                  var E2 = l(a2(g2.prefix)), x2 = l(a2(g2.suffix));
                  if (g2.pattern)
                    if (n4 && n4.push(g2), E2 || x2)
                      if ("+" === g2.modifier || "*" === g2.modifier) {
                        var R2 = "*" === g2.modifier ? "?" : "";
                        b2 += "(?:".concat(E2, "((?:").concat(g2.pattern, ")(?:").concat(x2).concat(E2, "(?:").concat(g2.pattern, "))*)").concat(x2, ")").concat(R2);
                      } else
                        b2 += "(?:".concat(E2, "(").concat(g2.pattern, ")").concat(x2, ")").concat(g2.modifier);
                    else
                      b2 += "+" === g2.modifier || "*" === g2.modifier ? "((?:".concat(g2.pattern, ")").concat(g2.modifier, ")") : "(".concat(g2.pattern, ")").concat(g2.modifier);
                  else
                    b2 += "(?:".concat(E2).concat(x2, ")").concat(g2.modifier);
                }
              }
              if (f2)
                e2 || (b2 += "".concat(w2, "?")), b2 += r4.endsWith ? "(?=".concat(m2, ")") : "$";
              else {
                var k2 = t4[t4.length - 1], O2 = "string" == typeof k2 ? w2.indexOf(k2[k2.length - 1]) > -1 : void 0 === k2;
                e2 || (b2 += "(?:".concat(w2, "(?=").concat(m2, "))?")), O2 || (b2 += "(?=".concat(w2, "|").concat(m2, ")"));
              }
              return new RegExp(b2, p(r4));
            }(function(t4, n4) {
              void 0 === n4 && (n4 = {});
              for (var r4 = function(t5) {
                for (var n5 = [], r5 = 0; r5 < t5.length; ) {
                  var i4 = t5[r5];
                  if ("*" !== i4 && "+" !== i4 && "?" !== i4)
                    if ("\\" !== i4)
                      if ("{" !== i4)
                        if ("}" !== i4)
                          if (":" !== i4)
                            if ("(" !== i4)
                              n5.push({ type: "CHAR", index: r5, value: t5[r5++] });
                            else {
                              var e3 = 1, o3 = "";
                              if ("?" === t5[s3 = r5 + 1])
                                throw new TypeError('Pattern cannot start with "?" at '.concat(s3));
                              for (; s3 < t5.length; )
                                if ("\\" !== t5[s3]) {
                                  if (")" === t5[s3]) {
                                    if (0 == --e3) {
                                      s3++;
                                      break;
                                    }
                                  } else if ("(" === t5[s3] && (e3++, "?" !== t5[s3 + 1]))
                                    throw new TypeError("Capturing groups are not allowed at ".concat(s3));
                                  o3 += t5[s3++];
                                } else
                                  o3 += t5[s3++] + t5[s3++];
                              if (e3)
                                throw new TypeError("Unbalanced pattern at ".concat(r5));
                              if (!o3)
                                throw new TypeError("Missing pattern at ".concat(r5));
                              n5.push({ type: "PATTERN", index: r5, value: o3 }), r5 = s3;
                            }
                          else {
                            for (var u3 = "", s3 = r5 + 1; s3 < t5.length; ) {
                              var f3 = t5.charCodeAt(s3);
                              if (!(f3 >= 48 && f3 <= 57 || f3 >= 65 && f3 <= 90 || f3 >= 97 && f3 <= 122 || 95 === f3))
                                break;
                              u3 += t5[s3++];
                            }
                            if (!u3)
                              throw new TypeError("Missing parameter name at ".concat(r5));
                            n5.push({ type: "NAME", index: r5, value: u3 }), r5 = s3;
                          }
                        else
                          n5.push({ type: "CLOSE", index: r5, value: t5[r5++] });
                      else
                        n5.push({ type: "OPEN", index: r5, value: t5[r5++] });
                    else
                      n5.push({ type: "ESCAPED_CHAR", index: r5++, value: t5[r5++] });
                  else
                    n5.push({ type: "MODIFIER", index: r5, value: t5[r5++] });
                }
                return n5.push({ type: "END", index: r5, value: "" }), n5;
              }(t4), i3 = n4.prefixes, e2 = void 0 === i3 ? "./" : i3, o2 = "[^".concat(l(n4.delimiter || "/#?"), "]+?"), u2 = [], s2 = 0, f2 = 0, c2 = "", a2 = function(t5) {
                if (f2 < r4.length && r4[f2].type === t5)
                  return r4[f2++].value;
              }, h2 = function(t5) {
                var n5 = a2(t5);
                if (void 0 !== n5)
                  return n5;
                var i4 = r4[f2], e3 = i4.index;
                throw new TypeError("Unexpected ".concat(i4.type, " at ").concat(e3, ", expected ").concat(t5));
              }, v2 = function() {
                for (var t5, n5 = ""; t5 = a2("CHAR") || a2("ESCAPED_CHAR"); )
                  n5 += t5;
                return n5;
              }; f2 < r4.length; ) {
                var d2 = a2("CHAR"), p2 = a2("NAME"), m2 = a2("PATTERN");
                if (p2 || m2)
                  -1 === e2.indexOf(b2 = d2 || "") && (c2 += b2, b2 = ""), c2 && (u2.push(c2), c2 = ""), u2.push({ name: p2 || s2++, prefix: b2, suffix: "", pattern: m2 || o2, modifier: a2("MODIFIER") || "" });
                else {
                  var w2 = d2 || a2("ESCAPED_CHAR");
                  if (w2)
                    c2 += w2;
                  else if (c2 && (u2.push(c2), c2 = ""), a2("OPEN")) {
                    var b2 = v2(), y2 = a2("NAME") || "", P2 = a2("PATTERN") || "", g2 = v2();
                    h2("CLOSE"), u2.push({ name: y2 || (P2 ? s2++ : ""), pattern: y2 && !P2 ? o2 : P2, prefix: b2, suffix: g2, modifier: a2("MODIFIER") || "" });
                  } else
                    h2("END");
                }
              }
              return u2;
            }(t3, r3), n3, r3);
          }(n2, r2, i2);
        }, x = { __proto__: null, update: g, nextTick: function() {
          return new Promise(function(t2) {
            window.requestAnimationFrame(t2);
          });
        }, pathToRegexp: E }, R = function() {
          return window.location.origin;
        }, k = function(t2) {
          return void 0 === t2 && (t2 = window.location.href), O(t2).port;
        }, O = function(t2) {
          var n2, r2 = t2.match(/:\d+/);
          if (null === r2)
            /^http/.test(t2) && (n2 = 80), /^https/.test(t2) && (n2 = 443);
          else {
            var i2 = r2[0].substring(1);
            n2 = parseInt(i2, 10);
          }
          var e2, o2 = t2.replace(R(), ""), u2 = {}, s2 = o2.indexOf("#");
          s2 >= 0 && (e2 = o2.slice(s2 + 1), o2 = o2.slice(0, s2));
          var f2 = o2.indexOf("?");
          return f2 >= 0 && (u2 = T(o2.slice(f2 + 1)), o2 = o2.slice(0, f2)), { hash: e2, path: o2, port: n2, query: u2 };
        }, T = function(t2) {
          return t2.split("&").reduce(function(t3, n2) {
            var r2 = n2.split("=");
            return t3[r2[0]] = r2[1], t3;
          }, {});
        }, A = function(t2) {
          return void 0 === t2 && (t2 = window.location.href), t2.replace(/(\/#.*|\/|#.*)$/, "");
        }, j = { __proto__: null, getHref: function() {
          return window.location.href;
        }, getAbsoluteHref: function(t2, n2) {
          return void 0 === n2 && (n2 = document.baseURI), new URL(t2, n2).href;
        }, getOrigin: R, getPort: k, getPath: function(t2) {
          return void 0 === t2 && (t2 = window.location.href), O(t2).path;
        }, getQuery: function(t2, n2) {
          return void 0 === n2 && (n2 = false), n2 ? JSON.stringify(O(t2).query) : O(t2).query;
        }, getHash: function(t2) {
          return O(t2).hash;
        }, parse: O, parseQuery: T, clean: A };
        function M(t2, n2, i2, e2, o2) {
          return void 0 === n2 && (n2 = 2e3), new Promise(function(u2, s2) {
            var f2 = new XMLHttpRequest();
            f2.onreadystatechange = function() {
              if (f2.readyState === XMLHttpRequest.DONE) {
                if (200 === f2.status) {
                  var n3 = "" !== f2.responseURL && f2.responseURL !== t2 ? f2.responseURL : t2;
                  u2({ html: f2.responseText, url: r({ href: n3 }, O(n3)) }), e2.update(t2, { status: "fulfilled", target: n3 });
                } else if (f2.status) {
                  var o3 = { status: f2.status, statusText: f2.statusText };
                  i2(t2, o3), s2(o3), e2.update(t2, { status: "rejected" });
                }
              }
            }, f2.ontimeout = function() {
              var r2 = new Error("Timeout error [" + n2 + "]");
              i2(t2, r2), s2(r2), e2.update(t2, { status: "rejected" });
            }, f2.onerror = function() {
              var n3 = new Error("Fetch error");
              i2(t2, n3), s2(n3), e2.update(t2, { status: "rejected" });
            }, f2.open("GET", t2), f2.timeout = n2, f2.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), f2.setRequestHeader("x-barba", "yes"), o2.all().forEach(function(t3, n3) {
              f2.setRequestHeader(n3, t3);
            }), f2.send();
          });
        }
        function N(t2) {
          return !!t2 && ("object" == typeof t2 || "function" == typeof t2) && "function" == typeof t2.then;
        }
        function S(t2, n2) {
          return void 0 === n2 && (n2 = {}), function() {
            var r2 = arguments, i2 = false, e2 = new Promise(function(e3, o2) {
              n2.async = function() {
                return i2 = true, function(t3, n3) {
                  t3 ? o2(t3) : e3(n3);
                };
              };
              var u2 = t2.apply(n2, [].slice.call(r2));
              i2 || (N(u2) ? u2.then(e3, o2) : e3(u2));
            });
            return e2;
          };
        }
        var C = /* @__PURE__ */ function(t2) {
          function n2() {
            var n3;
            return (n3 = t2.call(this) || this).logger = new d("@barba/core"), n3.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], n3.registered = /* @__PURE__ */ new Map(), n3.init(), n3;
          }
          i(n2, t2);
          var r2 = n2.prototype;
          return r2.init = function() {
            var t3 = this;
            this.registered.clear(), this.all.forEach(function(n3) {
              t3[n3] || (t3[n3] = function(r3, i2) {
                t3.registered.has(n3) || t3.registered.set(n3, /* @__PURE__ */ new Set()), t3.registered.get(n3).add({ ctx: i2 || {}, fn: r3 });
              });
            });
          }, r2.do = function(t3) {
            var n3 = arguments, r3 = this;
            if (this.registered.has(t3)) {
              var i2 = Promise.resolve();
              return this.registered.get(t3).forEach(function(t4) {
                i2 = i2.then(function() {
                  return S(t4.fn, t4.ctx).apply(void 0, [].slice.call(n3, 1));
                });
              }), i2.catch(function(n4) {
                r3.logger.debug("Hook error [" + t3 + "]"), r3.logger.error(n4);
              });
            }
            return Promise.resolve();
          }, r2.clear = function() {
            var t3 = this;
            this.all.forEach(function(n3) {
              delete t3[n3];
            }), this.init();
          }, r2.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var t3 = [];
            this.registered.forEach(function(n3, r3) {
              return t3.push(r3);
            }), this.logger.info("Registered hooks: " + t3.join(","));
          }, n2;
        }(h), L = new C(), H = /* @__PURE__ */ function() {
          function t2(t3) {
            if (this.k = void 0, this.O = [], "boolean" == typeof t3)
              this.k = t3;
            else {
              var n2 = Array.isArray(t3) ? t3 : [t3];
              this.O = n2.map(function(t4) {
                return E(t4);
              });
            }
          }
          return t2.prototype.checkHref = function(t3) {
            if ("boolean" == typeof this.k)
              return this.k;
            var n2 = O(t3).path;
            return this.O.some(function(t4) {
              return null !== t4.exec(n2);
            });
          }, t2;
        }(), _ = /* @__PURE__ */ function(t2) {
          function n2(n3) {
            var r2;
            return (r2 = t2.call(this, n3) || this).T = /* @__PURE__ */ new Map(), r2;
          }
          i(n2, t2);
          var e2 = n2.prototype;
          return e2.set = function(t3, n3, r2, i2, e3) {
            return this.T.set(t3, { action: r2, request: n3, status: i2, target: null != e3 ? e3 : t3 }), { action: r2, request: n3, status: i2, target: e3 };
          }, e2.get = function(t3) {
            return this.T.get(t3);
          }, e2.getRequest = function(t3) {
            return this.T.get(t3).request;
          }, e2.getAction = function(t3) {
            return this.T.get(t3).action;
          }, e2.getStatus = function(t3) {
            return this.T.get(t3).status;
          }, e2.getTarget = function(t3) {
            return this.T.get(t3).target;
          }, e2.has = function(t3) {
            return !this.checkHref(t3) && this.T.has(t3);
          }, e2.delete = function(t3) {
            return this.T.delete(t3);
          }, e2.update = function(t3, n3) {
            var i2 = r({}, this.T.get(t3), n3);
            return this.T.set(t3, i2), i2;
          }, n2;
        }(H), D = /* @__PURE__ */ function() {
          function t2() {
            this.A = /* @__PURE__ */ new Map();
          }
          var n2 = t2.prototype;
          return n2.set = function(t3, n3) {
            return this.A.set(t3, n3), { name: n3 };
          }, n2.get = function(t3) {
            return this.A.get(t3);
          }, n2.all = function() {
            return this.A;
          }, n2.has = function(t3) {
            return this.A.has(t3);
          }, n2.delete = function(t3) {
            return this.A.delete(t3);
          }, n2.clear = function() {
            return this.A.clear();
          }, t2;
        }(), B = function() {
          return !window.history.pushState;
        }, q = function(t2) {
          return !t2.el || !t2.href;
        }, F = function(t2) {
          var n2 = t2.event;
          return n2.which > 1 || n2.metaKey || n2.ctrlKey || n2.shiftKey || n2.altKey;
        }, I = function(t2) {
          var n2 = t2.el;
          return n2.hasAttribute("target") && "_blank" === n2.target;
        }, U = function(t2) {
          var n2 = t2.el;
          return void 0 !== n2.protocol && window.location.protocol !== n2.protocol || void 0 !== n2.hostname && window.location.hostname !== n2.hostname;
        }, $2 = function(t2) {
          var n2 = t2.el;
          return void 0 !== n2.port && k() !== k(n2.href);
        }, Q = function(t2) {
          var n2 = t2.el;
          return n2.getAttribute && "string" == typeof n2.getAttribute("download");
        }, X = function(t2) {
          return t2.el.hasAttribute(m.prefix + "-" + m.prevent);
        }, z = function(t2) {
          return Boolean(t2.el.closest("[" + m.prefix + "-" + m.prevent + '="all"]'));
        }, G = function(t2) {
          var n2 = t2.href;
          return A(n2) === A() && k(n2) === k();
        }, J = /* @__PURE__ */ function(t2) {
          function n2(n3) {
            var r3;
            return (r3 = t2.call(this, n3) || this).suite = [], r3.tests = /* @__PURE__ */ new Map(), r3.init(), r3;
          }
          i(n2, t2);
          var r2 = n2.prototype;
          return r2.init = function() {
            this.add("pushState", B), this.add("exists", q), this.add("newTab", F), this.add("blank", I), this.add("corsDomain", U), this.add("corsPort", $2), this.add("download", Q), this.add("preventSelf", X), this.add("preventAll", z), this.add("sameUrl", G, false);
          }, r2.add = function(t3, n3, r3) {
            void 0 === r3 && (r3 = true), this.tests.set(t3, n3), r3 && this.suite.push(t3);
          }, r2.run = function(t3, n3, r3, i2) {
            return this.tests.get(t3)({ el: n3, event: r3, href: i2 });
          }, r2.checkLink = function(t3, n3, r3) {
            var i2 = this;
            return this.suite.some(function(e2) {
              return i2.run(e2, t3, n3, r3);
            });
          }, n2;
        }(H), W = /* @__PURE__ */ function(t2) {
          function n2(r2, i2) {
            var e2;
            return void 0 === i2 && (i2 = "Barba error"), (e2 = t2.call.apply(t2, [this].concat([].slice.call(arguments, 2))) || this).error = void 0, e2.label = void 0, e2.error = r2, e2.label = i2, Error.captureStackTrace && Error.captureStackTrace(c(e2), n2), e2.name = "BarbaError", e2;
          }
          return i(n2, t2), n2;
        }(/* @__PURE__ */ f(Error)), K = /* @__PURE__ */ function() {
          function t2(t3) {
            void 0 === t3 && (t3 = []), this.logger = new d("@barba/core"), this.all = [], this.page = [], this.once = [], this.j = [{ name: "namespace", type: "strings" }, { name: "custom", type: "function" }], t3 && (this.all = this.all.concat(t3)), this.update();
          }
          var n2 = t2.prototype;
          return n2.add = function(t3, n3) {
            "rule" === t3 ? this.j.splice(n3.position || 0, 0, n3.value) : this.all.push(n3), this.update();
          }, n2.resolve = function(t3, n3) {
            var r2 = this;
            void 0 === n3 && (n3 = {});
            var i2 = n3.once ? this.once : this.page;
            i2 = i2.filter(n3.self ? function(t4) {
              return t4.name && "self" === t4.name;
            } : function(t4) {
              return !t4.name || "self" !== t4.name;
            });
            var e2 = /* @__PURE__ */ new Map(), o2 = i2.find(function(i3) {
              var o3 = true, u3 = {};
              return n3.self && "self" === i3.name ? (e2.set(i3, u3), true) : (r2.j.reverse().forEach(function(n4) {
                o3 && (o3 = r2.M(i3, n4, t3, u3), i3.from && i3.to && (o3 = r2.M(i3, n4, t3, u3, "from") && r2.M(i3, n4, t3, u3, "to")), i3.from && !i3.to && (o3 = r2.M(i3, n4, t3, u3, "from")), !i3.from && i3.to && (o3 = r2.M(i3, n4, t3, u3, "to")));
              }), e2.set(i3, u3), o3);
            }), u2 = e2.get(o2), s2 = [];
            if (s2.push(n3.once ? "once" : "page"), n3.self && s2.push("self"), u2) {
              var f2, c2 = [o2];
              Object.keys(u2).length > 0 && c2.push(u2), (f2 = this.logger).info.apply(f2, ["Transition found [" + s2.join(",") + "]"].concat(c2));
            } else
              this.logger.info("No transition found [" + s2.join(",") + "]");
            return o2;
          }, n2.update = function() {
            var t3 = this;
            this.all = this.all.map(function(n3) {
              return t3.N(n3);
            }).sort(function(t4, n3) {
              return t4.priority - n3.priority;
            }).reverse().map(function(t4) {
              return delete t4.priority, t4;
            }), this.page = this.all.filter(function(t4) {
              return void 0 !== t4.leave || void 0 !== t4.enter;
            }), this.once = this.all.filter(function(t4) {
              return void 0 !== t4.once;
            });
          }, n2.M = function(t3, n3, r2, i2, e2) {
            var o2 = true, u2 = false, s2 = t3, f2 = n3.name, c2 = f2, a2 = f2, h2 = f2, v2 = e2 ? s2[e2] : s2, d2 = "to" === e2 ? r2.next : r2.current;
            if (e2 ? v2 && v2[f2] : v2[f2]) {
              switch (n3.type) {
                case "strings":
                default:
                  var l2 = Array.isArray(v2[c2]) ? v2[c2] : [v2[c2]];
                  d2[c2] && -1 !== l2.indexOf(d2[c2]) && (u2 = true), -1 === l2.indexOf(d2[c2]) && (o2 = false);
                  break;
                case "object":
                  var p2 = Array.isArray(v2[a2]) ? v2[a2] : [v2[a2]];
                  d2[a2] ? (d2[a2].name && -1 !== p2.indexOf(d2[a2].name) && (u2 = true), -1 === p2.indexOf(d2[a2].name) && (o2 = false)) : o2 = false;
                  break;
                case "function":
                  v2[h2](r2) ? u2 = true : o2 = false;
              }
              u2 && (e2 ? (i2[e2] = i2[e2] || {}, i2[e2][f2] = s2[e2][f2]) : i2[f2] = s2[f2]);
            }
            return o2;
          }, n2.S = function(t3, n3, r2) {
            var i2 = 0;
            return (t3[n3] || t3.from && t3.from[n3] || t3.to && t3.to[n3]) && (i2 += Math.pow(10, r2), t3.from && t3.from[n3] && (i2 += 1), t3.to && t3.to[n3] && (i2 += 2)), i2;
          }, n2.N = function(t3) {
            var n3 = this;
            t3.priority = 0;
            var r2 = 0;
            return this.j.forEach(function(i2, e2) {
              r2 += n3.S(t3, i2.name, e2 + 1);
            }), t3.priority = r2, t3;
          }, t2;
        }();
        function V(t2, n2) {
          try {
            var r2 = t2();
          } catch (t3) {
            return n2(t3);
          }
          return r2 && r2.then ? r2.then(void 0, n2) : r2;
        }
        var Y = /* @__PURE__ */ function() {
          function t2(t3) {
            void 0 === t3 && (t3 = []), this.logger = new d("@barba/core"), this.store = void 0, this.C = false, this.store = new K(t3);
          }
          var r2 = t2.prototype;
          return r2.get = function(t3, n2) {
            return this.store.resolve(t3, n2);
          }, r2.doOnce = function(t3) {
            var n2 = t3.data, r3 = t3.transition;
            try {
              var i2 = function() {
                e2.C = false;
              }, e2 = this, o2 = r3 || {};
              e2.C = true;
              var u2 = V(function() {
                return Promise.resolve(e2.L("beforeOnce", n2, o2)).then(function() {
                  return Promise.resolve(e2.once(n2, o2)).then(function() {
                    return Promise.resolve(e2.L("afterOnce", n2, o2)).then(function() {
                    });
                  });
                });
              }, function(t4) {
                e2.C = false, e2.logger.debug("Transition error [before/after/once]"), e2.logger.error(t4);
              });
              return Promise.resolve(u2 && u2.then ? u2.then(i2) : i2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.doPage = function(t3) {
            var n2 = t3.data, r3 = t3.transition, i2 = t3.page, e2 = t3.wrapper;
            try {
              var o2 = function(t4) {
                u2.C = false;
              }, u2 = this, s2 = r3 || {}, f2 = true === s2.sync || false;
              u2.C = true;
              var c2 = V(function() {
                function t4() {
                  return Promise.resolve(u2.L("before", n2, s2)).then(function() {
                    function t5(t6) {
                      return Promise.resolve(u2.remove(n2)).then(function() {
                        return Promise.resolve(u2.L("after", n2, s2)).then(function() {
                        });
                      });
                    }
                    var r5 = function() {
                      if (f2)
                        return V(function() {
                          return Promise.resolve(u2.add(n2, e2)).then(function() {
                            return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                              return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                                return Promise.resolve(Promise.all([u2.leave(n2, s2), u2.enter(n2, s2)])).then(function() {
                                  return Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                                    return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                    });
                                  });
                                });
                              });
                            });
                          });
                        }, function(t7) {
                          if (u2.H(t7))
                            throw new W(t7, "Transition error [sync]");
                        });
                      var t6 = function(t7) {
                        return V(function() {
                          var t8 = function() {
                            if (false !== r6)
                              return Promise.resolve(u2.add(n2, e2)).then(function() {
                                return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                                  return Promise.resolve(u2.enter(n2, s2, r6)).then(function() {
                                    return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                    });
                                  });
                                });
                              });
                          }();
                          if (t8 && t8.then)
                            return t8.then(function() {
                            });
                        }, function(t8) {
                          if (u2.H(t8))
                            throw new W(t8, "Transition error [before/after/enter]");
                        });
                      }, r6 = false, o3 = V(function() {
                        return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                          return Promise.resolve(Promise.all([u2.leave(n2, s2), g(i2, n2)]).then(function(t7) {
                            return t7[0];
                          })).then(function(t7) {
                            return r6 = t7, Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                            });
                          });
                        });
                      }, function(t7) {
                        if (u2.H(t7))
                          throw new W(t7, "Transition error [before/after/leave]");
                      });
                      return o3 && o3.then ? o3.then(t6) : t6();
                    }();
                    return r5 && r5.then ? r5.then(t5) : t5();
                  });
                }
                var r4 = function() {
                  if (f2)
                    return Promise.resolve(g(i2, n2)).then(function() {
                    });
                }();
                return r4 && r4.then ? r4.then(t4) : t4();
              }, function(t4) {
                if (u2.C = false, t4.name && "BarbaError" === t4.name)
                  throw u2.logger.debug(t4.label), u2.logger.error(t4.error), t4;
                throw u2.logger.debug("Transition error [page]"), u2.logger.error(t4), t4;
              });
              return Promise.resolve(c2 && c2.then ? c2.then(o2) : o2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.once = function(t3, n2) {
            try {
              return Promise.resolve(L.do("once", t3, n2)).then(function() {
                return n2.once ? S(n2.once, n2)(t3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.leave = function(t3, n2) {
            try {
              return Promise.resolve(L.do("leave", t3, n2)).then(function() {
                return n2.leave ? S(n2.leave, n2)(t3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.enter = function(t3, n2, r3) {
            try {
              return Promise.resolve(L.do("enter", t3, n2)).then(function() {
                return n2.enter ? S(n2.enter, n2)(t3, r3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.add = function(t3, n2) {
            try {
              return b.addContainer(t3.next.container, n2), L.do("nextAdded", t3), Promise.resolve();
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.remove = function(t3) {
            try {
              return b.removeContainer(t3.current.container), L.do("currentRemoved", t3), Promise.resolve();
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.H = function(t3) {
            return t3.message ? !/Timeout error|Fetch error/.test(t3.message) : !t3.status;
          }, r2.L = function(t3, n2, r3) {
            try {
              return Promise.resolve(L.do(t3, n2, r3)).then(function() {
                return r3[t3] ? S(r3[t3], r3)(n2) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, n(t2, [{ key: "isRunning", get: function() {
            return this.C;
          }, set: function(t3) {
            this.C = t3;
          } }, { key: "hasOnce", get: function() {
            return this.store.once.length > 0;
          } }, { key: "hasSelf", get: function() {
            return this.store.all.some(function(t3) {
              return "self" === t3.name;
            });
          } }, { key: "shouldWait", get: function() {
            return this.store.all.some(function(t3) {
              return t3.to && !t3.to.route || t3.sync;
            });
          } }]), t2;
        }(), Z = /* @__PURE__ */ function() {
          function t2(t3) {
            var n2 = this;
            this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = /* @__PURE__ */ new Map(), 0 !== t3.length && (t3.forEach(function(t4) {
              n2.byNamespace.set(t4.namespace, t4);
            }), this.names.forEach(function(t4) {
              L[t4](n2._(t4));
            }));
          }
          return t2.prototype._ = function(t3) {
            var n2 = this;
            return function(r2) {
              var i2 = t3.match(/enter/i) ? r2.next : r2.current, e2 = n2.byNamespace.get(i2.namespace);
              return e2 && e2[t3] ? S(e2[t3], e2)(r2) : Promise.resolve();
            };
          }, t2;
        }();
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t2) {
          var n2 = this;
          do {
            if (n2.matches(t2))
              return n2;
            n2 = n2.parentElement || n2.parentNode;
          } while (null !== n2 && 1 === n2.nodeType);
          return null;
        });
        var tt = { container: null, html: "", namespace: "", url: { hash: "", href: "", path: "", port: null, query: {} } }, nt = /* @__PURE__ */ function() {
          function t2() {
            this.version = "2.10.0", this.schemaPage = tt, this.Logger = d, this.logger = new d("@barba/core"), this.plugins = [], this.timeout = void 0, this.cacheIgnore = void 0, this.cacheFirstPage = void 0, this.prefetchIgnore = void 0, this.preventRunning = void 0, this.hooks = L, this.cache = void 0, this.headers = void 0, this.prevent = void 0, this.transitions = void 0, this.views = void 0, this.dom = b, this.helpers = x, this.history = P, this.request = M, this.url = j, this.D = void 0, this.B = void 0, this.q = void 0, this.F = void 0;
          }
          var i2 = t2.prototype;
          return i2.use = function(t3, n2) {
            var r2 = this.plugins;
            r2.indexOf(t3) > -1 ? this.logger.warn("Plugin [" + t3.name + "] already installed.") : "function" == typeof t3.install ? (t3.install(this, n2), r2.push(t3)) : this.logger.warn("Plugin [" + t3.name + '] has no "install" method.');
          }, i2.init = function(t3) {
            var n2 = void 0 === t3 ? {} : t3, i3 = n2.transitions, e2 = void 0 === i3 ? [] : i3, o2 = n2.views, u2 = void 0 === o2 ? [] : o2, s2 = n2.schema, f2 = void 0 === s2 ? m : s2, c2 = n2.requestError, a2 = n2.timeout, h2 = void 0 === a2 ? 2e3 : a2, v2 = n2.cacheIgnore, l2 = void 0 !== v2 && v2, p2 = n2.cacheFirstPage, w2 = void 0 !== p2 && p2, b2 = n2.prefetchIgnore, y2 = void 0 !== b2 && b2, P2 = n2.preventRunning, g2 = void 0 !== P2 && P2, E2 = n2.prevent, x2 = void 0 === E2 ? null : E2, R2 = n2.debug, k2 = n2.logLevel;
            if (d.setLevel(true === (void 0 !== R2 && R2) ? "debug" : void 0 === k2 ? "off" : k2), this.logger.info(this.version), Object.keys(f2).forEach(function(t4) {
              m[t4] && (m[t4] = f2[t4]);
            }), this.B = c2, this.timeout = h2, this.cacheIgnore = l2, this.cacheFirstPage = w2, this.prefetchIgnore = y2, this.preventRunning = g2, this.q = this.dom.getWrapper(), !this.q)
              throw new Error("[@barba/core] No Barba wrapper found");
            this.I();
            var O2 = this.data.current;
            if (!O2.container)
              throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new _(l2), this.headers = new D(), this.prevent = new J(y2), this.transitions = new Y(e2), this.views = new Z(u2), null !== x2) {
              if ("function" != typeof x2)
                throw new Error("[@barba/core] Prevent should be a function");
              this.prevent.add("preventCustom", x2);
            }
            this.history.init(O2.url.href, O2.namespace), w2 && this.cache.set(O2.url.href, Promise.resolve({ html: O2.html, url: O2.url }), "init", "fulfilled"), this.U = this.U.bind(this), this.$ = this.$.bind(this), this.X = this.X.bind(this), this.G(), this.plugins.forEach(function(t4) {
              return t4.init();
            });
            var T2 = this.data;
            T2.trigger = "barba", T2.next = T2.current, T2.current = r({}, this.schemaPage), this.hooks.do("ready", T2), this.once(T2), this.I();
          }, i2.destroy = function() {
            this.I(), this.J(), this.history.clear(), this.hooks.clear(), this.plugins = [];
          }, i2.force = function(t3) {
            window.location.assign(t3);
          }, i2.go = function(t3, n2, r2) {
            var i3;
            if (void 0 === n2 && (n2 = "barba"), this.F = null, this.transitions.isRunning)
              this.force(t3);
            else if (!(i3 = "popstate" === n2 ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t3) && this.url.getQuery(this.history.current.url, true) === this.url.getQuery(t3, true) : this.prevent.run("sameUrl", null, null, t3)) || this.transitions.hasSelf)
              return n2 = this.history.change(this.cache.has(t3) ? this.cache.get(t3).target : t3, n2, r2), r2 && (r2.stopPropagation(), r2.preventDefault()), this.page(t3, n2, null != r2 ? r2 : void 0, i3);
          }, i2.once = function(t3) {
            try {
              var n2 = this;
              return Promise.resolve(n2.hooks.do("beforeEnter", t3)).then(function() {
                function r2() {
                  return Promise.resolve(n2.hooks.do("afterEnter", t3)).then(function() {
                  });
                }
                var i3 = function() {
                  if (n2.transitions.hasOnce) {
                    var r3 = n2.transitions.get(t3, { once: true });
                    return Promise.resolve(n2.transitions.doOnce({ transition: r3, data: t3 })).then(function() {
                    });
                  }
                }();
                return i3 && i3.then ? i3.then(r2) : r2();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, i2.page = function(t3, n2, i3, e2) {
            try {
              var o2, u2 = function() {
                var t4 = s2.data;
                return Promise.resolve(s2.hooks.do("page", t4)).then(function() {
                  var n3 = function(n4, r2) {
                    try {
                      var i4 = (u3 = s2.transitions.get(t4, { once: false, self: e2 }), Promise.resolve(s2.transitions.doPage({ data: t4, page: o2, transition: u3, wrapper: s2.q })).then(function() {
                        s2.I();
                      }));
                    } catch (t5) {
                      return r2();
                    }
                    var u3;
                    return i4 && i4.then ? i4.then(void 0, r2) : i4;
                  }(0, function() {
                    0 === d.getLevel() && s2.force(t4.next.url.href);
                  });
                  if (n3 && n3.then)
                    return n3.then(function() {
                    });
                });
              }, s2 = this;
              if (s2.data.next.url = r({ href: t3 }, s2.url.parse(t3)), s2.data.trigger = n2, s2.data.event = i3, s2.cache.has(t3))
                o2 = s2.cache.update(t3, { action: "click" }).request;
              else {
                var f2 = s2.request(t3, s2.timeout, s2.onRequestError.bind(s2, n2), s2.cache, s2.headers);
                f2.then(function(r2) {
                  r2.url.href !== t3 && s2.history.add(r2.url.href, n2, "replace");
                }), o2 = s2.cache.set(t3, f2, "click", "pending").request;
              }
              var c2 = function() {
                if (s2.transitions.shouldWait)
                  return Promise.resolve(g(o2, s2.data)).then(function() {
                  });
              }();
              return Promise.resolve(c2 && c2.then ? c2.then(u2) : u2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, i2.onRequestError = function(t3) {
            this.transitions.isRunning = false;
            var n2 = [].slice.call(arguments, 1), r2 = n2[0], i3 = n2[1], e2 = this.cache.getAction(r2);
            return this.cache.delete(r2), this.B && false === this.B(t3, e2, r2, i3) || "click" === e2 && this.force(r2), false;
          }, i2.prefetch = function(t3) {
            var n2 = this;
            t3 = this.url.getAbsoluteHref(t3), this.cache.has(t3) || this.cache.set(t3, this.request(t3, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(t4) {
              n2.logger.error(t4);
            }), "prefetch", "pending");
          }, i2.G = function() {
            true !== this.prefetchIgnore && (document.addEventListener("mouseover", this.U), document.addEventListener("touchstart", this.U)), document.addEventListener("click", this.$), window.addEventListener("popstate", this.X);
          }, i2.J = function() {
            true !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.U), document.removeEventListener("touchstart", this.U)), document.removeEventListener("click", this.$), window.removeEventListener("popstate", this.X);
          }, i2.U = function(t3) {
            var n2 = this, r2 = this.W(t3);
            if (r2) {
              var i3 = this.url.getAbsoluteHref(this.dom.getHref(r2));
              this.prevent.checkHref(i3) || this.cache.has(i3) || this.cache.set(i3, this.request(i3, this.timeout, this.onRequestError.bind(this, r2), this.cache, this.headers).catch(function(t4) {
                n2.logger.error(t4);
              }), "enter", "pending");
            }
          }, i2.$ = function(t3) {
            this.F = t3;
            var n2 = this.W(t3);
            if (n2)
              return this.transitions.isRunning && this.preventRunning ? (t3.preventDefault(), void t3.stopPropagation()) : void this.go(this.dom.getHref(n2), n2, t3);
          }, i2.X = function(t3) {
            this.F && !this.W(this.F) || this.go(this.url.getHref(), "popstate", t3);
          }, i2.W = function(t3) {
            for (var n2 = t3.target; n2 && !this.dom.getHref(n2); )
              n2 = n2.parentNode;
            if (n2 && !this.prevent.checkLink(n2, t3, this.dom.getHref(n2)))
              return n2;
          }, i2.I = function() {
            var t3 = this.url.getHref(), n2 = { container: this.dom.getContainer(), html: this.dom.getHtml(), namespace: this.dom.getNamespace(), url: r({ href: t3 }, this.url.parse(t3)) };
            this.D = { current: n2, event: void 0, next: r({}, this.schemaPage), trigger: void 0 }, this.hooks.do("reset", this.data);
          }, n(t2, [{ key: "data", get: function() {
            return this.D;
          } }, { key: "wrapper", get: function() {
            return this.q;
          } }]), t2;
        }();
        return new nt();
      });
    }
  });

  // src/index.ts
  init_live_reload();
  var import_core = __toESM(require_barba_umd(), 1);

  // node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/webflow/index.js
  init_live_reload();

  // node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/webflow/getSiteId.js
  init_live_reload();
  var getSiteId = (page = document) => page.documentElement.getAttribute("data-wf-site");

  // node_modules/.pnpm/@finsweet+ts-utils@0.40.0/node_modules/@finsweet/ts-utils/dist/webflow/restartWebflow.js
  init_live_reload();
  var restartWebflow = async (modules) => {
    const { Webflow } = window;
    if (!Webflow || !("destroy" in Webflow) || !("ready" in Webflow) || !("require" in Webflow))
      return;
    if (modules && !modules.length)
      return;
    if (!modules) {
      Webflow.destroy();
      Webflow.ready();
    }
    if (!modules || modules.includes("ix2")) {
      const ix2 = Webflow.require("ix2");
      if (ix2) {
        const { store, actions } = ix2;
        const { eventState } = store.getState().ixSession;
        const stateEntries = Object.entries(eventState);
        if (!modules)
          ix2.destroy();
        ix2.init();
        await Promise.all(stateEntries.map((state) => store.dispatch(actions.eventStateChanged(...state))));
      }
    }
    if (!modules || modules.includes("commerce")) {
      const commerce = Webflow.require("commerce");
      const siteId = getSiteId();
      if (commerce && siteId) {
        commerce.destroy();
        commerce.init({ siteId, apiUrl: "https://render.webflow.com" });
      }
    }
    if (modules?.includes("lightbox"))
      Webflow.require("lightbox")?.ready();
    if (modules?.includes("slider")) {
      const slider = Webflow.require("slider");
      if (slider) {
        slider.redraw();
        slider.ready();
      }
    }
    if (modules?.includes("tabs"))
      Webflow.require("tabs")?.redraw();
    return new Promise((resolve) => Webflow.push(() => resolve(void 0)));
  };

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/index.js
  init_live_reload();

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/gsap-core.js
  init_live_reload();
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  };
  var _defaults = {
    duration: 0.5,
    overwrite: false,
    delay: 0
  };
  var _suppressOverwrites;
  var _reverting;
  var _context;
  var _bigNum = 1e8;
  var _tinyNum = 1 / _bigNum;
  var _2PI = Math.PI * 2;
  var _HALF_PI = _2PI / 4;
  var _gsID = 0;
  var _sqrt = Math.sqrt;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _isString = function _isString2(value) {
    return typeof value === "string";
  };
  var _isFunction = function _isFunction2(value) {
    return typeof value === "function";
  };
  var _isNumber = function _isNumber2(value) {
    return typeof value === "number";
  };
  var _isUndefined = function _isUndefined2(value) {
    return typeof value === "undefined";
  };
  var _isObject = function _isObject2(value) {
    return typeof value === "object";
  };
  var _isNotFalse = function _isNotFalse2(value) {
    return value !== false;
  };
  var _windowExists = function _windowExists2() {
    return typeof window !== "undefined";
  };
  var _isFuncOrString = function _isFuncOrString2(value) {
    return _isFunction(value) || _isString(value);
  };
  var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
  };
  var _isArray = Array.isArray;
  var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
  var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
  var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
  var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
  var _relExp = /[+-]=-?[.\d]+/;
  var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
  var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
  var _globalTimeline;
  var _win;
  var _coreInitted;
  var _doc;
  var _globals = {};
  var _installScope = {};
  var _coreReady;
  var _install = function _install2(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  };
  var _missingPlugin = function _missingPlugin2(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  };
  var _warn = function _warn2(message, suppress) {
    return !suppress && console.warn(message);
  };
  var _addGlobal = function _addGlobal2(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  };
  var _emptyFunc = function _emptyFunc2() {
    return 0;
  };
  var _startAtRevertConfig = {
    suppressEvents: true,
    isStart: true,
    kill: false
  };
  var _revertConfigNoKill = {
    suppressEvents: true,
    kill: false
  };
  var _revertConfig = {
    suppressEvents: true
  };
  var _reservedProps = {};
  var _lazyTweens = [];
  var _lazyLookup = {};
  var _lastRenderedFrame;
  var _plugins = {};
  var _effects = {};
  var _nextGCFrame = 30;
  var _harnessPlugins = [];
  var _callbackNames = "";
  var _harness = function _harness2(targets) {
    var target = targets[0], harnessPlugin, i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);
    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;
      while (i-- && !_harnessPlugins[i].targetTest(target)) {
      }
      harnessPlugin = _harnessPlugins[i];
    }
    i = targets.length;
    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }
    return targets;
  };
  var _getCache = function _getCache2(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  };
  var _getProperty = function _getProperty2(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  };
  var _forEachName = function _forEachName2(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  };
  var _round = function _round2(value) {
    return Math.round(value * 1e5) / 1e5 || 0;
  };
  var _roundPrecise = function _roundPrecise2(value) {
    return Math.round(value * 1e7) / 1e7 || 0;
  };
  var _parseRelative = function _parseRelative2(start, value) {
    var operator = value.charAt(0), end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  };
  var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
    var l = toFind.length, i = 0;
    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
    }
    return i < l;
  };
  var _lazyRender = function _lazyRender2() {
    var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
    _lazyLookup = {};
    _lazyTweens.length = 0;
    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  };
  var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
    _lazyTweens.length && !_reverting && _lazyRender();
    animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
    _lazyTweens.length && !_reverting && _lazyRender();
  };
  var _numericIfPossible = function _numericIfPossible2(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  };
  var _passThrough = function _passThrough2(p) {
    return p;
  };
  var _setDefaults = function _setDefaults2(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || (obj[p] = defaults2[p]);
    }
    return obj;
  };
  var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
    return function(obj, defaults2) {
      for (var p in defaults2) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
      }
    };
  };
  var _merge = function _merge2(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }
    return base;
  };
  var _mergeDeep = function _mergeDeep2(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }
    return base;
  };
  var _copyExcluding = function _copyExcluding2(obj, excluding) {
    var copy = {}, p;
    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }
    return copy;
  };
  var _inheritDefaults = function _inheritDefaults2(vars) {
    var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }
    return vars;
  };
  var _arraysMatch = function _arraysMatch2(a1, a2) {
    var i = a1.length, match = i === a2.length;
    while (match && i-- && a1[i] === a2[i]) {
    }
    return i < 0;
  };
  var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = parent[lastProp], t;
    if (sortBy) {
      t = child[sortBy];
      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }
    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }
    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  };
  var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }
    if (lastProp === void 0) {
      lastProp = "_last";
    }
    var prev = child._prev, next = child._next;
    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }
    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }
    child._next = child._prev = child.parent = null;
  };
  var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
    child._act = 0;
  };
  var _uncache = function _uncache2(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;
      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }
    return animation;
  };
  var _recacheAncestors = function _recacheAncestors2(animation) {
    var parent = animation.parent;
    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }
    return animation;
  };
  var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
    return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
  };
  var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
  };
  var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  };
  var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  };
  var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  };
  var _setEnd = function _setEnd2(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  };
  var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
    var parent = animation._dp;
    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
      _setEnd(animation);
      parent._dirty || _uncache(parent, animation);
    }
    return animation;
  };
  var _postAddChecks = function _postAddChecks2(timeline2, child) {
    var t;
    if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
      t = _parentToChildTotalTime(timeline2.rawTime(), child);
      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }
    if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
      if (timeline2._dur < timeline2.duration()) {
        t = timeline2;
        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }
      timeline2._zTime = -_tinyNum;
    }
  };
  var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
    _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
    _isFromOrFromStart(child) || (timeline2._recent = child);
    skipChecks || _postAddChecks(timeline2, child);
    timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
    return timeline2;
  };
  var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  };
  var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
    _initTween(tween, time, tTime);
    if (!tween._initted) {
      return 1;
    }
    if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);
      tween._lazy = [tTime, suppressEvents];
      return 1;
    }
  };
  var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
  };
  var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  };
  var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }
    if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
        return;
      }
      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);
        if (!suppressEvents && !_reverting) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  };
  var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
    var child;
    if (time > prevTime) {
      child = animation._first;
      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }
        child = child._next;
      }
    } else {
      child = animation._last;
      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }
        child = child._prev;
      }
    }
  };
  var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
    animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  };
  var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  };
  var _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  };
  var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
    var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
    if (_isString(position) && (isNaN(position) || position in labels)) {
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");
      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }
      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }
      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }
      return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }
    return position == null ? clippedDuration : +position;
  };
  var _createTweenType = function _createTweenType2(type, params, timeline2) {
    var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline2;
    if (type) {
      irVars = vars;
      parent = timeline2;
      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }
      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }
    return new Tween(params[0], vars, params[varsIndex + 1]);
  };
  var _conditionalReturn = function _conditionalReturn2(value, func) {
    return value || value === 0 ? func(value) : func;
  };
  var _clamp = function _clamp2(min, max, value) {
    return value < min ? min : value > max ? max : value;
  };
  var getUnit = function getUnit2(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  };
  var clamp = function clamp2(min, max, value) {
    return _conditionalReturn(value, function(v) {
      return _clamp(min, max, v);
    });
  };
  var _slice = [].slice;
  var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  };
  var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }
    return ar.forEach(function(value) {
      var _accumulator;
      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  };
  var toArray = function toArray2(value, scope, leaveStrings) {
    return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  };
  var selector = function selector2(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function(v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  };
  var shuffle = function shuffle2(a) {
    return a.sort(function() {
      return 0.5 - Math.random();
    });
  };
  var distribute = function distribute2(v) {
    if (_isFunction(v)) {
      return v;
    }
    var vars = _isObject(v) ? v : {
      each: v
    }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
    if (_isString(from)) {
      ratioX = ratioY = {
        center: 0.5,
        edges: 0.5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }
    return function(i, target, a) {
      var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
        if (!wrapAt) {
          max = -_bigNum;
          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
          }
          wrapAt < l && wrapAt--;
        }
        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
        originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;
        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }
        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }
      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  };
  var _roundModifier = function _roundModifier2(v) {
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
    return function(raw) {
      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  };
  var snap = function snap2(snapTo, value) {
    var isArray = _isArray(snapTo), radius, is2D;
    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;
      if (snapTo.values) {
        snapTo = toArray(snapTo.values);
        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }
    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function(raw) {
      var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }
        if (dx < min) {
          min = dx;
          closest = i;
        }
      }
      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  };
  var random = function random2(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  };
  var pipe = function pipe2() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }
    return function(value) {
      return functions.reduce(function(v, f) {
        return f(v);
      }, value);
    };
  };
  var unitize = function unitize2(func, unit) {
    return function(value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  };
  var normalize = function normalize2(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  };
  var _wrapArray = function _wrapArray2(a, wrapper, value) {
    return _conditionalReturn(value, function(index) {
      return a[~~wrapper(index)];
    });
  };
  var wrap = function wrap2(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
      return (range + (value2 - min) % range) % range + min;
    });
  };
  var wrapYoyo = function wrapYoyo2(min, max, value) {
    var range = max - min, total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
      value2 = (total + (value2 - min) % total) % total || 0;
      return min + (value2 > range ? total - value2 : value2);
    });
  };
  var _replaceRandom = function _replaceRandom2(value) {
    var prev = 0, s = "", i, nums, end, isArray;
    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }
    return s + value.substr(prev, value.length - prev);
  };
  var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin, outRange = outMax - outMin;
    return _conditionalReturn(value, function(value2) {
      return outMin + ((value2 - inMin) / inRange * outRange || 0);
    });
  };
  var interpolate = function interpolate2(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function(p2) {
      return (1 - p2) * start + p2 * end;
    };
    if (!func) {
      var isString = _isString(start), master = {}, p, i, interpolators, l, il;
      progress === true && (mutate = 1) && (progress = null);
      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;
        for (i = 1; i < l; i++) {
          interpolators.push(interpolate2(start[i - 1], start[i]));
        }
        l--;
        func = function func2(p2) {
          p2 *= l;
          var i2 = Math.min(il, ~~p2);
          return interpolators[i2](p2 - i2);
        };
        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }
      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }
        func = function func2(p2) {
          return _renderPropTweens(p2, master) || (isString ? start.p : start);
        };
      }
    }
    return _conditionalReturn(progress, func);
  };
  var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
    var labels = timeline2.labels, min = _bigNum, p, distance, label;
    for (p in labels) {
      distance = labels[p] - fromTime;
      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }
    return label;
  };
  var _callback = function _callback2(animation, type, executeLazyFirst) {
    var v = animation.vars, callback = v[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
    if (!callback) {
      return;
    }
    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    context3 && (_context = context3);
    result = params ? callback.apply(scope, params) : callback.call(scope);
    _context = prevContext;
    return result;
  };
  var _interrupt = function _interrupt2(animation) {
    _removeFromParent(animation);
    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  };
  var _quickTween;
  var _registerPluginQueue = [];
  var _createPlugin = function _createPlugin2(config3) {
    if (!config3)
      return;
    config3 = !config3.name && config3["default"] || config3;
    if (_windowExists() || config3.headless) {
      var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
        this._props = [];
      } : config3, instanceDefaults = {
        init: _emptyFunc,
        render: _renderPropTweens,
        add: _addPropTween,
        kill: _killPropTweensOf,
        modifier: _addPluginModifier,
        rawVars: 0
      }, statics = {
        targetTest: 0,
        get: 0,
        getSetter: _getSetter,
        aliases: {},
        register: 0
      };
      _wake();
      if (config3 !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config3.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config3.register && config3.register(gsap, Plugin, PropTween);
    } else {
      _registerPluginQueue.push(config3);
    }
  };
  var _255 = 255;
  var _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  };
  var _hue = function _hue2(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
  };
  var splitColor = function splitColor2(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }
        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);
        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }
      a = a.map(Number);
    }
    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = ~~(h + 0.5);
      a[1] = ~~(s * 100 + 0.5);
      a[2] = ~~(l * 100 + 0.5);
    }
    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  };
  var _colorOrderData = function _colorOrderData2(v) {
    var values = [], c = [], i = -1;
    v.split(_colorExp).forEach(function(v2) {
      var a = v2.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  };
  var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
    var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
    if (!colors) {
      return s;
    }
    colors = colors.map(function(color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });
    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;
      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }
    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }
    return result + shell[l];
  };
  var _colorExp = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }
    return new RegExp(s + ")", "gi");
  }();
  var _hslExp = /hsl[a]?\(/;
  var _colorStringFilter = function _colorStringFilter2(a) {
    var combined = a.join(" "), toHSL;
    _colorExp.lastIndex = 0;
    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  };
  var _tickerActive;
  var _ticker = function() {
    var _getTime2 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime2(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id2, _req, _raf, _self, _delta, _i, _tick = function _tick2(v) {
      var elapsed = _getTime2() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
      (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;
      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1e3;
        _self.time = time = time / 1e3;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }
      manual || (_id2 = _req(_tick2));
      if (dispatch) {
        for (_i = 0; _i < _listeners2.length; _i++) {
          _listeners2[_i](time, _delta, frame, v);
        }
      }
    };
    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1e3 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
            _registerPluginQueue.forEach(_createPlugin);
          }
          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
          _id2 && _self.sleep();
          _req = _raf || function(f) {
            return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
          };
          _tickerActive = 1;
          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? cancelAnimationFrame : clearTimeout)(_id2);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || Infinity;
        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
      },
      fps: function fps(_fps) {
        _gap = 1e3 / (_fps || 240);
        _nextTime = _self.time * 1e3 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function(t, d, f, v) {
          callback(t, d, f, v);
          _self.remove(func);
        } : callback;
        _self.remove(callback);
        _listeners2[prioritize ? "unshift" : "push"](func);
        _wake();
        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners2.indexOf(callback)) && _listeners2.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners2
    };
    return _self;
  }();
  var _wake = function _wake2() {
    return !_tickerActive && _ticker.wake();
  };
  var _easeMap = {};
  var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
  var _quotesExp = /["']/g;
  var _parseObjectInString = function _parseObjectInString2(value) {
    var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }
    return obj;
  };
  var _valueInParentheses = function _valueInParentheses2(value) {
    var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  };
  var _configEaseFromString = function _configEaseFromString2(name) {
    var split = (name + "").split("("), ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  };
  var _invertEase = function _invertEase2(ease) {
    return function(p) {
      return 1 - ease(1 - p);
    };
  };
  var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
    var child = timeline2._first, ease;
    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase2(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase2(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }
      child = child._next;
    }
  };
  var _parseEase = function _parseEase2(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  };
  var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut2(p) {
        return 1 - easeIn(1 - p);
      };
    }
    if (easeInOut === void 0) {
      easeInOut = function easeInOut2(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }
    var ease = {
      easeIn,
      easeOut,
      easeInOut
    }, lowercaseName;
    _forEachName(names, function(name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });
    return ease;
  };
  var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
    return function(p) {
      return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
    };
  };
  var _configElastic = function _configElastic2(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    p2 = _2PI / p2;
    ease.config = function(amplitude2, period2) {
      return _configElastic2(type, amplitude2, period2);
    };
    return ease;
  };
  var _configBack = function _configBack2(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }
    var easeOut = function easeOut2(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);
    ease.config = function(overshoot2) {
      return _configBack2(type, overshoot2);
    };
    return ease;
  };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function(p) {
      return Math.pow(p, power);
    } : function(p) {
      return p;
    }, function(p) {
      return 1 - Math.pow(1 - p, power);
    }, function(p) {
      return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function(n, c) {
    var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
    };
    _insertEase("Bounce", function(p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function(p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });
  _insertEase("Circ", function(p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function(p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
      return function(p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache2(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = /* @__PURE__ */ function() {
    function Animation2(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation2.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value, suppressEvents) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config3) {
      if (config3 === void 0) {
        config3 = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config3;
      if (this._initted || this._startAt) {
        this.timeline && this.timeline.revert(config3);
        this.totalTime(-0.01, config3.suppressEvents);
      }
      this.data !== "nested" && config3.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this, time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (Math.abs(animation._ts) || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp, start = this._start, rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self2 = this;
      return new Promise(function(resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
          var _then = self2.then;
          self2.then = null;
          _isFunction(f) && (f = f(self2)) && (f.then || f === self2) && (self2.then = _then);
          resolve(f);
          self2.then = _then;
        };
        if (self2._initted && self2.totalProgress() === 1 && self2._ts >= 0 || !self2._tTime && self2._ts < 0) {
          _resolve();
        } else {
          self2._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill2() {
      _interrupt(this);
    };
    return Animation2;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = /* @__PURE__ */ function(_Animation) {
    _inheritsLoose(Timeline2, _Animation);
    function Timeline2(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline2.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render4(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -1e-4;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && time && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
          if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
            if (!this._lock) {
              (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
              if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
              }
            }
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function(obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [], child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById2(id) {
      var animations = this.getChildren(1, 1, 1), i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
      var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first, labels = this.labels, p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first, next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0, self2 = this, child = self2._last, prevStart = _bigNum, prev, start, parent;
      if (arguments.length) {
        return self2.timeScale((self2._repeat < 0 ? self2.duration() : self2.totalDuration()) / (self2.reversed() ? -value : value));
      }
      if (self2._dirty) {
        parent = self2.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self2._sort && child._ts && !self2._lock) {
            self2._lock = 1;
            _addToTimeline(self2, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self2._dp || parent && parent.smoothChildTiming) {
              self2._start += start / self2._ts;
              self2._time -= start;
              self2._tTime -= start;
            }
            self2.shiftChildren(-start, false, -Infinity);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self2, self2 === _globalTimeline && self2._time > max ? self2._time : max, 1, 1);
        self2._dirty = 0;
      }
      return self2._tDur;
    };
    Timeline2.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) {
          if (_config.autoSleep && _ticker._listeners.length < 2) {
            while (child && !child._ts) {
              child = child._next;
            }
            child || _ticker.sleep();
          }
        }
      }
    };
    return Timeline2;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }
    startNums = start.match(_complexStringNumExp) || [];
    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }
      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;
    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }
    this._pt = pt;
    return pt;
  };
  var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
        if (pt || pt === 0) {
          end = pt;
        }
      }
    }
    if (!optional || parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }
      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  };
  var _processVars = function _processVars2(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }
    var copy = {}, p;
    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }
    return copy;
  };
  var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;
    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;
        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }
    return plugin;
  };
  var _overwritingTween;
  var _forceAllPropTweens;
  var _initTween = function _initTween2(tween, time, tTime) {
    var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }
    tween._from = !tl && !!vars.runBackwards;
    if (!tl || keyframes && !vars.stagger) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      if (prevStartAt) {
        prevStartAt._zTime < 0 && prevStartAt.progress(1);
        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
        prevStartAt._lazy = 0;
      }
      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent,
          immediateRender: true,
          lazy: !prevStartAt && _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate && function() {
            return _callback(tween, "onUpdate");
          },
          stagger: 0
        }, startAt)));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
        if (immediateRender) {
          if (dur && time <= 0 && tTime <= 0) {
            time && (tween._zTime = time);
            return;
          }
        }
      } else if (runBackwards && dur) {
        if (!prevStartAt) {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
            immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent
            //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);
          _removeFromParent(tween._startAt = Tween.set(targets, p));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
          tween._zTime = time;
          if (!immediateRender) {
            _initTween2(tween._startAt, _tinyNum, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }
      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);
        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
          plugin._props.forEach(function(name) {
            ptLookup[name] = pt;
          });
          plugin.priority && (hasPriority = 1);
        }
        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }
        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;
          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
          overwritten = !tween.parent;
          _overwritingTween = 0;
        }
        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }
      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
    keyframes && time <= 0 && tl.render(_bigNum, true, true);
  };
  var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;
      while (i--) {
        pt = lookup[i][property];
        if (pt && pt.d && pt.d._pt) {
          pt = pt.d._pt;
          while (pt && pt.p !== property && pt.fp !== property) {
            pt = pt._next;
          }
        }
        if (!pt) {
          _forceAllPropTweens = 1;
          tween.vars[property] = "+=0";
          _initTween(tween, time);
          _forceAllPropTweens = 0;
          return skipRecursion ? _warn(property + " not eligible for reset") : 1;
        }
        ptCache.push(pt);
      }
    }
    i = ptCache.length;
    while (i--) {
      rootPT = ptCache[i];
      pt = rootPT._pt || rootPT;
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
    }
  };
  var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
    if (!propertyAliases) {
      return vars;
    }
    copy = _merge({}, vars);
    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;
        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }
    return copy;
  };
  var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut", p, a;
    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []);
      obj.forEach(function(value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  };
  var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  };
  var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
  var _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = /* @__PURE__ */ function(_Animation2) {
    _inheritsLoose(Tween2, _Animation2);
    function Tween2(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults2 || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0, a, kf, v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function(frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function(a2, b) {
                return a2.t - b.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween2.prototype;
    _proto3.render = function render4(totalTime, suppressEvents, force) {
      var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
        time = tTime;
        timeline2 = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === _roundPrecise(tTime / cycleDuration)) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted && iteration === prevIteration) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock && this._time !== cycleDuration && this._initted) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (time && !prevTime && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
        return this.resetTo(property, value, start, startIsRelative, 1);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill2(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function(name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween2.to = function to(targets, vars) {
      return new Tween2(targets, vars, arguments[2]);
    };
    Tween2.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween2(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween2.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween2(targets, vars);
    };
    Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween2;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
    Tween[name] = function() {
      var tl = new Timeline(), params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain2(target, property, value) {
    return target[property] = value;
  };
  var _setterFunc = function _setterFunc2(target, property, value) {
    return target[property](value);
  };
  var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
    return target[property](data.fp, value);
  };
  var _setterAttribute = function _setterAttribute2(target, property, value) {
    return target.setAttribute(property, value);
  };
  var _getSetter = function _getSetter2(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  };
  var _renderPlain = function _renderPlain2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
  };
  var _renderBoolean = function _renderBoolean2(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  };
  var _renderComplexString = function _renderComplexString2(ratio, data) {
    var pt = data._pt, s = "";
    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
        pt = pt._next;
      }
      s += data.c;
    }
    data.set(data.t, data.p, s, data);
  };
  var _renderPropTweens = function _renderPropTweens2(ratio, data) {
    var pt = data._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  };
  var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
    var pt = this._pt, next;
    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  };
  var _killPropTweensOf = function _killPropTweensOf2(property) {
    var pt = this._pt, hasNonDependentRemaining, next;
    while (pt) {
      next = pt._next;
      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }
      pt = next;
    }
    return !hasNonDependentRemaining;
  };
  var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  };
  var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
    var pt = parent._pt, next, pt2, first, last;
    while (pt) {
      next = pt._next;
      pt2 = first;
      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }
      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }
      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }
      pt = next;
    }
    parent._pt = first;
  };
  var PropTween = /* @__PURE__ */ function() {
    function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween2.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween2;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [];
  var _listeners = {};
  var _emptyArray = [];
  var _lastMediaTime = 0;
  var _contextID = 0;
  var _dispatch = function _dispatch2(type) {
    return (_listeners[type] || _emptyArray).map(function(f) {
      return f();
    });
  };
  var _onMediaChange = function _onMediaChange2() {
    var time = Date.now(), matches = [];
    if (time - _lastMediaTime > 2) {
      _dispatch("matchMediaInit");
      _media.forEach(function(c) {
        var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
        for (p in queries) {
          match = _win.matchMedia(queries[p]).matches;
          match && (anyMatch = 1);
          if (match !== conditions[p]) {
            conditions[p] = match;
            toggled = 1;
          }
        }
        if (toggled) {
          c.revert();
          anyMatch && matches.push(c);
        }
      });
      _dispatch("matchMediaRevert");
      matches.forEach(function(c) {
        return c.onMatch(c, function(func) {
          return c.add(null, func);
        });
      });
      _lastMediaTime = time;
      _dispatch("matchMedia");
    }
  };
  var Context = /* @__PURE__ */ function() {
    function Context2(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      this.id = _contextID++;
      func && this.add(func);
    }
    var _proto5 = Context2.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self2 = this, f = function f2() {
        var prev = _context, prevSelector = self2.selector, result;
        prev && prev !== self2 && prev.data.push(self2);
        scope && (self2.selector = selector(scope));
        _context = self2;
        result = func.apply(self2, arguments);
        _isFunction(result) && self2._r.push(result);
        _context = prev;
        self2.selector = prevSelector;
        self2.isReverted = false;
        return result;
      };
      self2.last = f;
      return name === _isFunction ? f(self2, function(func2) {
        return self2.add(null, func2);
      }) : name ? self2[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function(e) {
        return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill2(revert, matchMedia2) {
      var _this4 = this;
      if (revert) {
        (function() {
          var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
          while (i2--) {
            t = _this4.data[i2];
            if (t.data === "isFlip") {
              t.revert();
              t.getChildren(true, true, false).forEach(function(tween) {
                return tweens.splice(tweens.indexOf(tween), 1);
              });
            }
          }
          tweens.map(function(t2) {
            return {
              g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
              t: t2
            };
          }).sort(function(a, b) {
            return b.g - a.g || -Infinity;
          }).forEach(function(o) {
            return o.t.revert(revert);
          });
          i2 = _this4.data.length;
          while (i2--) {
            t = _this4.data[i2];
            if (t instanceof Timeline) {
              if (t.data !== "nested") {
                t.scrollTrigger && t.scrollTrigger.revert();
                t.kill();
              }
            } else {
              !(t instanceof Tween) && t.revert && t.revert(revert);
            }
          }
          _this4._r.forEach(function(f) {
            return f(revert, _this4);
          });
          _this4.isReverted = true;
        })();
      } else {
        this.data.forEach(function(e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia2) {
        var i = _media.length;
        while (i--) {
          _media[i].id === this.id && _media.splice(i, 1);
        }
      }
    };
    _proto5.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    return Context2;
  }();
  var MatchMedia = /* @__PURE__ */ function() {
    function MatchMedia2(scope) {
      this.contexts = [];
      this.scope = scope;
      _context && _context.data.push(this);
    }
    var _proto6 = MatchMedia2.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
      _context && !context3.selector && (context3.selector = _context.selector);
      this.contexts.push(context3);
      func = context3.add("onMatch", func);
      context3.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context3) < 0 && _media.push(context3);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context3, function(f) {
        return context3.add(null, f);
      });
      return this;
    };
    _proto6.revert = function revert(config3) {
      this.kill(config3 || {});
    };
    _proto6.kill = function kill2(revert) {
      this.contexts.forEach(function(c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia2;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function(config3) {
        return _createPlugin(config3);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function(property2, unit2, uncache2) {
        return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function(t) {
          return gsap.quickSetter(t, property, unit);
        }), l = setters.length;
        return function(value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
        var p2 = new Plugin();
        _quickTween._pt = 0;
        p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p2.render(1, p2);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);
      return Plugin ? setter : function(value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _merge22;
      var tween = gsap.to(target, _merge((_merge22 = {}, _merge22[property] = "+=0.1", _merge22.paused = true, _merge22), vars || {})), func = function func2(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config2(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function(pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function(targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults2), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function(targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars), child, next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function(c) {
        var cond = c.conditions, found, p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type], i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap,
      wrapYoyo,
      distribute,
      random,
      snap,
      normalize,
      getUnit,
      clamp,
      splitColor,
      toArray,
      selector,
      mapRange,
      pipe,
      unitize,
      interpolate,
      shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween,
      globals: _addGlobal,
      Tween,
      Timeline,
      Animation,
      getCache: _getCache,
      _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context2(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
    var pt = plugin._pt;
    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }
    return pt;
  };
  var _addModifiers = function _addModifiers2(tween, modifiers) {
    var targets = tween._targets, p, i, pt;
    for (p in modifiers) {
      i = targets.length;
      while (i--) {
        pt = tween._ptLookup[i][p];
        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }
          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  };
  var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
    return {
      name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init5(target, vars, tween) {
        tween._onInit = function(tween2) {
          var temp, p;
          if (_isString(vars)) {
            temp = {};
            _forEachName(vars, function(name2) {
              return temp[name2] = 1;
            });
            vars = temp;
          }
          if (modifier) {
            temp = {};
            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }
            vars = temp;
          }
          _addModifiers(tween2, vars);
        };
      }
    };
  };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    init: function init2(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.12.5";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0;
  var Power1 = _easeMap.Power1;
  var Power2 = _easeMap.Power2;
  var Power3 = _easeMap.Power3;
  var Power4 = _easeMap.Power4;
  var Linear = _easeMap.Linear;
  var Quad = _easeMap.Quad;
  var Cubic = _easeMap.Cubic;
  var Quart = _easeMap.Quart;
  var Quint = _easeMap.Quint;
  var Strong = _easeMap.Strong;
  var Elastic = _easeMap.Elastic;
  var Back = _easeMap.Back;
  var SteppedEase = _easeMap.SteppedEase;
  var Bounce = _easeMap.Bounce;
  var Sine = _easeMap.Sine;
  var Expo = _easeMap.Expo;
  var Circ = _easeMap.Circ;

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/CSSPlugin.js
  init_live_reload();
  var _win2;
  var _doc2;
  var _docElement;
  var _pluginInitted;
  var _tempDiv;
  var _tempDivStyler;
  var _recentSetterPlugin;
  var _reverting2;
  var _windowExists3 = function _windowExists4() {
    return typeof window !== "undefined";
  };
  var _transformProps = {};
  var _RAD2DEG = 180 / Math.PI;
  var _DEG2RAD = Math.PI / 180;
  var _atan2 = Math.atan2;
  var _bigNum2 = 1e8;
  var _capsExp = /([A-Z])/g;
  var _horizontalExp = /(left|right|width|margin|padding|x)/i;
  var _complexExp = /[\s,\(]\S/;
  var _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  };
  var _renderCSSProp = function _renderCSSProp2(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
  };
  var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
  };
  var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
  };
  var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  };
  var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  };
  var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
    return target.style[property] = value;
  };
  var _setterCSSProp = function _setterCSSProp2(target, property, value) {
    return target.style.setProperty(property, value);
  };
  var _setterTransform = function _setterTransform2(target, property, value) {
    return target._gsap[property] = value;
  };
  var _setterScale = function _setterScale2(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  };
  var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  };
  var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  };
  var _transformProp = "transform";
  var _transformOriginProp = _transformProp + "Origin";
  var _saveStyle = function _saveStyle2(property, isNotCSS) {
    var _this = this;
    var target = this.target, style = target.style, cache = target._gsap;
    if (property in _transformProps && style) {
      this.tfm = this.tfm || {};
      if (property !== "transform") {
        property = _propertyAliases[property] || property;
        ~property.indexOf(",") ? property.split(",").forEach(function(a) {
          return _this.tfm[a] = _get(target, a);
        }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
        property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
      } else {
        return _propertyAliases.transform.split(",").forEach(function(p) {
          return _saveStyle2.call(_this, p, isNotCSS);
        });
      }
      if (this.props.indexOf(_transformProp) >= 0) {
        return;
      }
      if (cache.svg) {
        this.svgo = target.getAttribute("data-svg-origin");
        this.props.push(_transformOriginProp, isNotCSS, "");
      }
      property = _transformProp;
    }
    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
  };
  var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
    if (style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _revertStyle = function _revertStyle2() {
    var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
    for (i = 0; i < props.length; i += 3) {
      props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
    }
    if (this.tfm) {
      for (p in this.tfm) {
        cache[p] = this.tfm[p];
      }
      if (cache.svg) {
        cache.renderTransform();
        target.setAttribute("data-svg-origin", this.svgo || "");
      }
      i = _reverting2();
      if ((!i || !i.isStart) && !style[_transformProp]) {
        _removeIndependentTransforms(style);
        if (cache.zOrigin && style[_transformOriginProp]) {
          style[_transformOriginProp] += " " + cache.zOrigin + "px";
          cache.zOrigin = 0;
          cache.renderTransform();
        }
        cache.uncache = 1;
      }
    }
  };
  var _getStyleSaver = function _getStyleSaver2(target, properties) {
    var saver = {
      target,
      props: [],
      revert: _revertStyle,
      save: _saveStyle
    };
    target._gsap || gsap.core.getCache(target);
    properties && properties.split(",").forEach(function(p) {
      return saver.save(p);
    });
    return saver;
  };
  var _supports3D;
  var _createElement = function _createElement2(type, ns) {
    var e = _doc2.createElementNS ? _doc2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
    return e && e.style ? e : _doc2.createElement(type);
  };
  var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
  };
  var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
  var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
    var e = element || _tempDiv, s = e.style, i = 5;
    if (property in s && !preferPrefix) {
      return property;
    }
    property = property.charAt(0).toUpperCase() + property.substr(1);
    while (i-- && !(_prefixes[i] + property in s)) {
    }
    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  };
  var _initCore = function _initCore2() {
    if (_windowExists3() && window.document) {
      _win2 = window;
      _doc2 = _win2.document;
      _docElement = _doc2.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _reverting2 = gsap.core.reverting;
      _pluginInitted = 1;
    }
  };
  var _getBBoxHack = function _getBBoxHack2(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
    _docElement.appendChild(svg);
    svg.appendChild(this);
    this.style.display = "block";
    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox;
        this.getBBox = _getBBoxHack2;
      } catch (e) {
      }
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }
    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }
    _docElement.removeChild(svg);
    this.style.cssText = oldCSS;
    return bbox;
  };
  var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
    var i = attributesArray.length;
    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  };
  var _getBBox = function _getBBox2(target) {
    var bounds;
    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }
    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  };
  var _isSVG = function _isSVG2(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  };
  var _removeProperty = function _removeProperty2(target, property) {
    if (property) {
      var style = target.style, first2Chars;
      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }
      if (style.removeProperty) {
        first2Chars = property.substr(0, 2);
        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }
        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  };
  var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;
    plugin._props.push(property);
    return pt;
  };
  var _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  };
  var _nonStandardLayouts = {
    grid: 1,
    flex: 1
  };
  var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
    var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }
    curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);
    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }
    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }
    if (!parent || parent === _doc2 || !parent.appendChild) {
      parent = _doc2.body;
    }
    cache = parent._gsap;
    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
      return _round(curValue / cache.width * amount);
    } else {
      if (toPercent && (property === "height" || property === "width")) {
        var v = target.style[property];
        target.style[property] = amount + unit;
        px = target[measureProperty];
        v ? target.style[property] = v : _removeProperty(target, property);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
      }
      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }
    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  };
  var _get = function _get2(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();
    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];
      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }
    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];
      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }
    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  };
  var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }
    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";
    if (end === "auto") {
      startValue = target.style[prop];
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
    }
    a = [start, end];
    _colorStringFilter(a);
    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];
    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }
        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;
          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;
            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }
          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }
    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  };
  var _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  };
  var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
    var split = value.split(" "), x = split[0], y = split[1] || "50%";
    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }
    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  };
  var _renderClearProps = function _renderClearProps2(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;
        while (--i > -1) {
          prop = props[i];
          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }
          _removeProperty(target, prop);
        }
      }
      if (clearTransforms) {
        _removeProperty(target, _transformProp);
        if (cache) {
          cache.svg && target.removeAttribute("transform");
          _parseTransform(target, 1);
          cache.uncache = 1;
          _removeIndependentTransforms(style);
        }
      }
    }
  };
  var _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;
        plugin._props.push(property);
        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */
  };
  var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
  var _rotationalProperties = {};
  var _isNullTransform = function _isNullTransform2(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  };
  var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
    var matrixString = _getComputedProperty(target, _transformProp);
    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  };
  var _getMatrix = function _getMatrix2(target, force2D) {
    var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;
      if (!parent || !target.offsetParent) {
        addedToDOM = 1;
        nextSibling = target.nextElementSibling;
        _docElement.appendChild(target);
      }
      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");
      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }
    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  };
  var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }
    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }
    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";
    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }
    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  };
  var _parseTransform = function _parseTransform2(target, uncache) {
    var cache = target._gsap || new GSCache(target);
    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }
    var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    if (cs.translate) {
      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
        style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
      }
      style.scale = style.rotate = style.translate = "none";
    }
    matrix = _getMatrix(target, cache.svg);
    if (cache.svg) {
      if (cache.uncache) {
        t2 = target.getBBox();
        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
        t1 = "";
      } else {
        t1 = !uncache && target.getAttribute("data-svg-origin");
      }
      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }
    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;
    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];
      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }
        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }
        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;
        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }
        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }
        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }
      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }
    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }
    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;
    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }
    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  };
  var _firstTwoOnly = function _firstTwoOnly2(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  };
  var _addPxTranslate = function _addPxTranslate2(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  };
  var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;
    _renderCSSTransforms(ratio, cache);
  };
  var _zeroDeg = "0deg";
  var _zeroPx = "0px";
  var _endParenthesis = ") ";
  var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
    var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }
    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }
    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }
    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }
    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }
    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }
    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }
    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }
    target.style[_transformProp] = transforms || "translate(0, 0)";
  };
  var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
    var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);
    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }
    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;
      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;
        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }
      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }
    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }
    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }
    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }
    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  };
  var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
    var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
    if (isString) {
      direction = endValue.split("_")[1];
      if (direction === "short") {
        change %= cap;
        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }
      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
      }
    }
    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";
    plugin._props.push(property);
    return pt;
  };
  var _assign = function _assign2(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }
    return target;
  };
  var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      _removeProperty(target, _transformProp);
      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }
    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];
      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;
        plugin._props.push(p);
      }
    }
    _assign(endCache, startCache);
  };
  _forEachName("padding,margin,Width,Radius", function(name, index) {
    var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
      return index < 2 ? name + side : "border" + side + name;
    });
    _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function(prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function(prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init3(target, vars, tween, index, targets) {
      var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = typeof endValue;
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render2(ratio, data) {
      if (data.tween._time || !_reverting2()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty,
      _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function(positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function(name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function(name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/index.js
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
  var TweenMaxWithCSS = gsapWithCSS.core.Tween;

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/Draggable.js
  init_live_reload();

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/utils/matrix.js
  init_live_reload();
  var _doc3;
  var _win3;
  var _docElement2;
  var _body;
  var _divContainer;
  var _svgContainer;
  var _identityMatrix;
  var _gEl;
  var _transformProp2 = "transform";
  var _transformOriginProp2 = _transformProp2 + "Origin";
  var _hasOffsetBug;
  var _setDoc = function _setDoc2(element) {
    var doc = element.ownerDocument || element;
    if (!(_transformProp2 in element.style) && "msTransform" in element.style) {
      _transformProp2 = "msTransform";
      _transformOriginProp2 = _transformProp2 + "Origin";
    }
    while (doc.parentNode && (doc = doc.parentNode)) {
    }
    _win3 = window;
    _identityMatrix = new Matrix2D();
    if (doc) {
      _doc3 = doc;
      _docElement2 = doc.documentElement;
      _body = doc.body;
      _gEl = _doc3.createElementNS("http://www.w3.org/2000/svg", "g");
      _gEl.style.transform = "none";
      var d1 = doc.createElement("div"), d2 = doc.createElement("div"), root = doc && (doc.body || doc.firstElementChild);
      if (root && root.appendChild) {
        root.appendChild(d1);
        d1.appendChild(d2);
        d1.setAttribute("style", "position:static;transform:translate3d(0,0,1px)");
        _hasOffsetBug = d2.offsetParent !== d1;
        root.removeChild(d1);
      }
    }
    return doc;
  };
  var _forceNonZeroScale = function _forceNonZeroScale2(e) {
    var a, cache;
    while (e && e !== _body) {
      cache = e._gsap;
      cache && cache.uncache && cache.get(e, "x");
      if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
        cache.scaleX = cache.scaleY = 1e-4;
        cache.renderTransform(1, cache);
        a ? a.push(cache) : a = [cache];
      }
      e = e.parentNode;
    }
    return a;
  };
  var _svgTemps = [];
  var _divTemps = [];
  var _getDocScrollTop = function _getDocScrollTop2() {
    return _win3.pageYOffset || _doc3.scrollTop || _docElement2.scrollTop || _body.scrollTop || 0;
  };
  var _getDocScrollLeft = function _getDocScrollLeft2() {
    return _win3.pageXOffset || _doc3.scrollLeft || _docElement2.scrollLeft || _body.scrollLeft || 0;
  };
  var _svgOwner = function _svgOwner2(element) {
    return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
  };
  var _isFixed = function _isFixed2(element) {
    if (_win3.getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      return _isFixed2(element);
    }
  };
  var _createSibling = function _createSibling2(element, i) {
    if (element.parentNode && (_doc3 || _setDoc(element))) {
      var svg = _svgOwner(element), ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", type = svg ? i ? "rect" : "g" : "div", x = i !== 2 ? 0 : 100, y = i === 3 ? 100 : 0, css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", e = _doc3.createElementNS ? _doc3.createElementNS(ns.replace(/^https/, "http"), type) : _doc3.createElement(type);
      if (i) {
        if (!svg) {
          if (!_divContainer) {
            _divContainer = _createSibling2(element);
            _divContainer.style.cssText = css;
          }
          e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
          _divContainer.appendChild(e);
        } else {
          _svgContainer || (_svgContainer = _createSibling2(element));
          e.setAttribute("width", 0.01);
          e.setAttribute("height", 0.01);
          e.setAttribute("transform", "translate(" + x + "," + y + ")");
          _svgContainer.appendChild(e);
        }
      }
      return e;
    }
    throw "Need document and parent.";
  };
  var _consolidate = function _consolidate2(m) {
    var c = new Matrix2D(), i = 0;
    for (; i < m.numberOfItems; i++) {
      c.multiply(m.getItem(i).matrix);
    }
    return c;
  };
  var _getCTM = function _getCTM2(svg) {
    var m = svg.getCTM(), transform;
    if (!m) {
      transform = svg.style[_transformProp2];
      svg.style[_transformProp2] = "none";
      svg.appendChild(_gEl);
      m = _gEl.getCTM();
      svg.removeChild(_gEl);
      transform ? svg.style[_transformProp2] = transform : svg.style.removeProperty(_transformProp2.replace(/([A-Z])/g, "-$1").toLowerCase());
    }
    return m || _identityMatrix.clone();
  };
  var _placeSiblings = function _placeSiblings2(element, adjustGOffset) {
    var svg = _svgOwner(element), isRootSVG = element === svg, siblings = svg ? _svgTemps : _divTemps, parent = element.parentNode, container, m, b, x, y, cs;
    if (element === _win3) {
      return element;
    }
    siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
    container = svg ? _svgContainer : _divContainer;
    if (svg) {
      if (isRootSVG) {
        b = _getCTM(element);
        x = -b.e / b.a;
        y = -b.f / b.d;
        m = _identityMatrix;
      } else if (element.getBBox) {
        b = element.getBBox();
        m = element.transform ? element.transform.baseVal : {};
        m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix;
        x = m.a * b.x + m.c * b.y;
        y = m.b * b.x + m.d * b.y;
      } else {
        m = new Matrix2D();
        x = y = 0;
      }
      if (adjustGOffset && element.tagName.toLowerCase() === "g") {
        x = y = 0;
      }
      (isRootSVG ? svg : parent).appendChild(container);
      container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    } else {
      x = y = 0;
      if (_hasOffsetBug) {
        m = element.offsetParent;
        b = element;
        while (b && (b = b.parentNode) && b !== m && b.parentNode) {
          if ((_win3.getComputedStyle(b)[_transformProp2] + "").length > 4) {
            x = b.offsetLeft;
            y = b.offsetTop;
            b = 0;
          }
        }
      }
      cs = _win3.getComputedStyle(element);
      if (cs.position !== "absolute" && cs.position !== "fixed") {
        m = element.offsetParent;
        while (parent && parent !== m) {
          x += parent.scrollLeft || 0;
          y += parent.scrollTop || 0;
          parent = parent.parentNode;
        }
      }
      b = container.style;
      b.top = element.offsetTop - y + "px";
      b.left = element.offsetLeft - x + "px";
      b[_transformProp2] = cs[_transformProp2];
      b[_transformOriginProp2] = cs[_transformOriginProp2];
      b.position = cs.position === "fixed" ? "fixed" : "absolute";
      element.parentNode.appendChild(container);
    }
    return container;
  };
  var _setMatrix = function _setMatrix2(m, a, b, c, d, e, f) {
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    return m;
  };
  var Matrix2D = /* @__PURE__ */ function() {
    function Matrix2D2(a, b, c, d, e, f) {
      if (a === void 0) {
        a = 1;
      }
      if (b === void 0) {
        b = 0;
      }
      if (c === void 0) {
        c = 0;
      }
      if (d === void 0) {
        d = 1;
      }
      if (e === void 0) {
        e = 0;
      }
      if (f === void 0) {
        f = 0;
      }
      _setMatrix(this, a, b, c, d, e, f);
    }
    var _proto = Matrix2D2.prototype;
    _proto.inverse = function inverse() {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, determinant = a * d - b * c || 1e-10;
      return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
    };
    _proto.multiply = function multiply(matrix) {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f, a2 = matrix.a, b2 = matrix.c, c2 = matrix.b, d2 = matrix.d, e2 = matrix.e, f2 = matrix.f;
      return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
    };
    _proto.clone = function clone() {
      return new Matrix2D2(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    _proto.equals = function equals(matrix) {
      var a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
    };
    _proto.apply = function apply(point, decoratee) {
      if (decoratee === void 0) {
        decoratee = {};
      }
      var x = point.x, y = point.y, a = this.a, b = this.b, c = this.c, d = this.d, e = this.e, f = this.f;
      decoratee.x = x * a + y * c + e || 0;
      decoratee.y = x * b + y * d + f || 0;
      return decoratee;
    };
    return Matrix2D2;
  }();
  function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
    if (!element || !element.parentNode || (_doc3 || _setDoc(element)).documentElement === element) {
      return new Matrix2D();
    }
    var zeroScales = _forceNonZeroScale(element), svg = _svgOwner(element), temps = svg ? _svgTemps : _divTemps, container = _placeSiblings(element, adjustGOffset), b1 = temps[0].getBoundingClientRect(), b2 = temps[1].getBoundingClientRect(), b3 = temps[2].getBoundingClientRect(), parent = container.parentNode, isFixed = !includeScrollInFixed && _isFixed(element), m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
    parent.removeChild(container);
    if (zeroScales) {
      b1 = zeroScales.length;
      while (b1--) {
        b2 = zeroScales[b1];
        b2.scaleX = b2.scaleY = 0;
        b2.renderTransform(1, b2);
      }
    }
    return inverse ? m.inverse() : m;
  }

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/Draggable.js
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _inheritsLoose2(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var gsap2;
  var _win4;
  var _doc4;
  var _docElement3;
  var _body2;
  var _tempDiv2;
  var _placeholderDiv;
  var _coreInitted2;
  var _checkPrefix;
  var _toArray;
  var _supportsPassive;
  var _isTouchDevice;
  var _touchEventLookup;
  var _isMultiTouching;
  var _isAndroid;
  var InertiaPlugin;
  var _defaultCursor;
  var _supportsPointer;
  var _context2;
  var _getStyleSaver3;
  var _dragCount = 0;
  var _windowExists5 = function _windowExists6() {
    return typeof window !== "undefined";
  };
  var _getGSAP = function _getGSAP2() {
    return gsap2 || _windowExists5() && (gsap2 = window.gsap) && gsap2.registerPlugin && gsap2;
  };
  var _isFunction3 = function _isFunction4(value) {
    return typeof value === "function";
  };
  var _isObject3 = function _isObject4(value) {
    return typeof value === "object";
  };
  var _isUndefined3 = function _isUndefined4(value) {
    return typeof value === "undefined";
  };
  var _emptyFunc3 = function _emptyFunc4() {
    return false;
  };
  var _transformProp3 = "transform";
  var _transformOriginProp3 = "transformOrigin";
  var _round3 = function _round4(value) {
    return Math.round(value * 1e4) / 1e4;
  };
  var _isArray2 = Array.isArray;
  var _createElement3 = function _createElement4(type, ns) {
    var e = _doc4.createElementNS ? _doc4.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc4.createElement(type);
    return e.style ? e : _doc4.createElement(type);
  };
  var _RAD2DEG2 = 180 / Math.PI;
  var _bigNum3 = 1e20;
  var _identityMatrix2 = new Matrix2D();
  var _getTime = Date.now || function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
  var _renderQueue = [];
  var _lookup = {};
  var _lookupCount = 0;
  var _clickableTagExp = /^(?:a|input|textarea|button|select)$/i;
  var _lastDragTime = 0;
  var _temp1 = {};
  var _windowProxy = {};
  var _copy = function _copy2(obj, factor) {
    var copy = {}, p;
    for (p in obj) {
      copy[p] = factor ? obj[p] * factor : obj[p];
    }
    return copy;
  };
  var _extend = function _extend2(obj, defaults2) {
    for (var p in defaults2) {
      if (!(p in obj)) {
        obj[p] = defaults2[p];
      }
    }
    return obj;
  };
  var _setTouchActionForAllDescendants = function _setTouchActionForAllDescendants2(elements, value) {
    var i = elements.length, children;
    while (i--) {
      value ? elements[i].style.touchAction = value : elements[i].style.removeProperty("touch-action");
      children = elements[i].children;
      children && children.length && _setTouchActionForAllDescendants2(children, value);
    }
  };
  var _renderQueueTick = function _renderQueueTick2() {
    return _renderQueue.forEach(function(func) {
      return func();
    });
  };
  var _addToRenderQueue = function _addToRenderQueue2(func) {
    _renderQueue.push(func);
    if (_renderQueue.length === 1) {
      gsap2.ticker.add(_renderQueueTick);
    }
  };
  var _renderQueueTimeout = function _renderQueueTimeout2() {
    return !_renderQueue.length && gsap2.ticker.remove(_renderQueueTick);
  };
  var _removeFromRenderQueue = function _removeFromRenderQueue2(func) {
    var i = _renderQueue.length;
    while (i--) {
      if (_renderQueue[i] === func) {
        _renderQueue.splice(i, 1);
      }
    }
    gsap2.to(_renderQueueTimeout, {
      overwrite: true,
      delay: 15,
      duration: 0,
      onComplete: _renderQueueTimeout,
      data: "_draggable"
    });
  };
  var _setDefaults3 = function _setDefaults4(obj, defaults2) {
    for (var p in defaults2) {
      if (!(p in obj)) {
        obj[p] = defaults2[p];
      }
    }
    return obj;
  };
  var _addListener = function _addListener2(element, type, func, capture) {
    if (element.addEventListener) {
      var touchType = _touchEventLookup[type];
      capture = capture || (_supportsPassive ? {
        passive: false
      } : null);
      element.addEventListener(touchType || type, func, capture);
      touchType && type !== touchType && element.addEventListener(type, func, capture);
    }
  };
  var _removeListener = function _removeListener2(element, type, func, capture) {
    if (element.removeEventListener) {
      var touchType = _touchEventLookup[type];
      element.removeEventListener(touchType || type, func, capture);
      touchType && type !== touchType && element.removeEventListener(type, func, capture);
    }
  };
  var _preventDefault = function _preventDefault2(event) {
    event.preventDefault && event.preventDefault();
    event.preventManipulation && event.preventManipulation();
  };
  var _hasTouchID = function _hasTouchID2(list, ID) {
    var i = list.length;
    while (i--) {
      if (list[i].identifier === ID) {
        return true;
      }
    }
  };
  var _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd2(event) {
    _isMultiTouching = event.touches && _dragCount < event.touches.length;
    _removeListener(event.target, "touchend", _onMultiTouchDocumentEnd2);
  };
  var _onMultiTouchDocument = function _onMultiTouchDocument2(event) {
    _isMultiTouching = event.touches && _dragCount < event.touches.length;
    _addListener(event.target, "touchend", _onMultiTouchDocumentEnd);
  };
  var _getDocScrollTop3 = function _getDocScrollTop4(doc) {
    return _win4.pageYOffset || doc.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
  };
  var _getDocScrollLeft3 = function _getDocScrollLeft4(doc) {
    return _win4.pageXOffset || doc.scrollLeft || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
  };
  var _addScrollListener = function _addScrollListener2(e, callback) {
    _addListener(e, "scroll", callback);
    if (!_isRoot(e.parentNode)) {
      _addScrollListener2(e.parentNode, callback);
    }
  };
  var _removeScrollListener = function _removeScrollListener2(e, callback) {
    _removeListener(e, "scroll", callback);
    if (!_isRoot(e.parentNode)) {
      _removeScrollListener2(e.parentNode, callback);
    }
  };
  var _isRoot = function _isRoot2(e) {
    return !!(!e || e === _docElement3 || e.nodeType === 9 || e === _doc4.body || e === _win4 || !e.nodeType || !e.parentNode);
  };
  var _getMaxScroll = function _getMaxScroll2(element, axis) {
    var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
    return Math.max(0, _isRoot(element) ? Math.max(_docElement3[scroll], _body2[scroll]) - (_win4["inner" + dim] || _docElement3[client] || _body2[client]) : element[scroll] - element[client]);
  };
  var _recordMaxScrolls = function _recordMaxScrolls2(e, skipCurrent) {
    var x = _getMaxScroll(e, "x"), y = _getMaxScroll(e, "y");
    if (_isRoot(e)) {
      e = _windowProxy;
    } else {
      _recordMaxScrolls2(e.parentNode, skipCurrent);
    }
    e._gsMaxScrollX = x;
    e._gsMaxScrollY = y;
    if (!skipCurrent) {
      e._gsScrollX = e.scrollLeft || 0;
      e._gsScrollY = e.scrollTop || 0;
    }
  };
  var _setStyle = function _setStyle2(element, property, value) {
    var style = element.style;
    if (!style) {
      return;
    }
    if (_isUndefined3(style[property])) {
      property = _checkPrefix(property, element) || property;
    }
    if (value == null) {
      style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
    } else {
      style[property] = value;
    }
  };
  var _getComputedStyle = function _getComputedStyle2(element) {
    return _win4.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
  };
  var _tempRect = {};
  var _parseRect = function _parseRect2(e) {
    if (e === _win4) {
      _tempRect.left = _tempRect.top = 0;
      _tempRect.width = _tempRect.right = _docElement3.clientWidth || e.innerWidth || _body2.clientWidth || 0;
      _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement3.clientHeight ? _docElement3.clientHeight : e.innerHeight || _body2.clientHeight || 0;
      return _tempRect;
    }
    var doc = e.ownerDocument || _doc4, r = !_isUndefined3(e.pageX) ? {
      left: e.pageX - _getDocScrollLeft3(doc),
      top: e.pageY - _getDocScrollTop3(doc),
      right: e.pageX - _getDocScrollLeft3(doc) + 1,
      bottom: e.pageY - _getDocScrollTop3(doc) + 1
    } : !e.nodeType && !_isUndefined3(e.left) && !_isUndefined3(e.top) ? e : _toArray(e)[0].getBoundingClientRect();
    if (_isUndefined3(r.right) && !_isUndefined3(r.width)) {
      r.right = r.left + r.width;
      r.bottom = r.top + r.height;
    } else if (_isUndefined3(r.width)) {
      r = {
        width: r.right - r.left,
        height: r.bottom - r.top,
        right: r.right,
        left: r.left,
        bottom: r.bottom,
        top: r.top
      };
    }
    return r;
  };
  var _dispatchEvent = function _dispatchEvent2(target, type, callbackName) {
    var vars = target.vars, callback = vars[callbackName], listeners = target._listeners[type], result;
    if (_isFunction3(callback)) {
      result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
    }
    if (listeners && target.dispatchEvent(type) === false) {
      result = false;
    }
    return result;
  };
  var _getBounds = function _getBounds2(target, context3) {
    var e = _toArray(target)[0], top, left, offset;
    if (!e.nodeType && e !== _win4) {
      if (!_isUndefined3(target.left)) {
        offset = {
          x: 0,
          y: 0
        };
        return {
          left: target.left - offset.x,
          top: target.top - offset.y,
          width: target.width,
          height: target.height
        };
      }
      left = target.min || target.minX || target.minRotation || 0;
      top = target.min || target.minY || 0;
      return {
        left,
        top,
        width: (target.max || target.maxX || target.maxRotation || 0) - left,
        height: (target.max || target.maxY || 0) - top
      };
    }
    return _getElementBounds(e, context3);
  };
  var _point1 = {};
  var _getElementBounds = function _getElementBounds2(element, context3) {
    context3 = _toArray(context3)[0];
    var isSVG = element.getBBox && element.ownerSVGElement, doc = element.ownerDocument || _doc4, left, right, top, bottom, matrix, p1, p2, p3, p4, bbox, width, height, cs;
    if (element === _win4) {
      top = _getDocScrollTop3(doc);
      left = _getDocScrollLeft3(doc);
      right = left + (doc.documentElement.clientWidth || element.innerWidth || doc.body.clientWidth || 0);
      bottom = top + ((element.innerHeight || 0) - 20 < doc.documentElement.clientHeight ? doc.documentElement.clientHeight : element.innerHeight || doc.body.clientHeight || 0);
    } else if (context3 === _win4 || _isUndefined3(context3)) {
      return element.getBoundingClientRect();
    } else {
      left = top = 0;
      if (isSVG) {
        bbox = element.getBBox();
        width = bbox.width;
        height = bbox.height;
      } else {
        if (element.viewBox && (bbox = element.viewBox.baseVal)) {
          left = bbox.x || 0;
          top = bbox.y || 0;
          width = bbox.width;
          height = bbox.height;
        }
        if (!width) {
          cs = _getComputedStyle(element);
          bbox = cs.boxSizing === "border-box";
          width = (parseFloat(cs.width) || element.clientWidth || 0) + (bbox ? 0 : parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
          height = (parseFloat(cs.height) || element.clientHeight || 0) + (bbox ? 0 : parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
        }
      }
      right = width;
      bottom = height;
    }
    if (element === context3) {
      return {
        left,
        top,
        width: right - left,
        height: bottom - top
      };
    }
    matrix = getGlobalMatrix(context3, true).multiply(getGlobalMatrix(element));
    p1 = matrix.apply({
      x: left,
      y: top
    });
    p2 = matrix.apply({
      x: right,
      y: top
    });
    p3 = matrix.apply({
      x: right,
      y: bottom
    });
    p4 = matrix.apply({
      x: left,
      y: bottom
    });
    left = Math.min(p1.x, p2.x, p3.x, p4.x);
    top = Math.min(p1.y, p2.y, p3.y, p4.y);
    return {
      left,
      top,
      width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
      height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
    };
  };
  var _parseInertia = function _parseInertia2(draggable, snap3, max, min, factor, forceZeroVelocity) {
    var vars = {}, a, i, l;
    if (snap3) {
      if (factor !== 1 && snap3 instanceof Array) {
        vars.end = a = [];
        l = snap3.length;
        if (_isObject3(snap3[0])) {
          for (i = 0; i < l; i++) {
            a[i] = _copy(snap3[i], factor);
          }
        } else {
          for (i = 0; i < l; i++) {
            a[i] = snap3[i] * factor;
          }
        }
        max += 1.1;
        min -= 1.1;
      } else if (_isFunction3(snap3)) {
        vars.end = function(value) {
          var result = snap3.call(draggable, value), copy, p;
          if (factor !== 1) {
            if (_isObject3(result)) {
              copy = {};
              for (p in result) {
                copy[p] = result[p] * factor;
              }
              result = copy;
            } else {
              result *= factor;
            }
          }
          return result;
        };
      } else {
        vars.end = snap3;
      }
    }
    if (max || max === 0) {
      vars.max = max;
    }
    if (min || min === 0) {
      vars.min = min;
    }
    if (forceZeroVelocity) {
      vars.velocity = 0;
    }
    return vars;
  };
  var _isClickable = function _isClickable2(element) {
    var data;
    return !element || !element.getAttribute || element === _body2 ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (_clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable2(element.parentNode);
  };
  var _setSelectable = function _setSelectable2(elements, selectable) {
    var i = elements.length, e;
    while (i--) {
      e = elements[i];
      e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc3;
      gsap2.set(e, {
        lazy: true,
        userSelect: selectable ? "text" : "none"
      });
    }
  };
  var _isFixed3 = function _isFixed4(element) {
    if (_getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      return _isFixed4(element);
    }
  };
  var _supports3D2;
  var _addPaddingBR;
  var ScrollProxy = function ScrollProxy2(element, vars) {
    element = gsap2.utils.toArray(element)[0];
    vars = vars || {};
    var content = document.createElement("div"), style = content.style, node = element.firstChild, offsetTop = 0, offsetLeft = 0, prevTop = element.scrollTop, prevLeft = element.scrollLeft, scrollWidth = element.scrollWidth, scrollHeight = element.scrollHeight, extraPadRight = 0, maxLeft = 0, maxTop = 0, elementWidth, elementHeight, contentHeight, nextNode, transformStart, transformEnd;
    if (_supports3D2 && vars.force3D !== false) {
      transformStart = "translate3d(";
      transformEnd = "px,0px)";
    } else if (_transformProp3) {
      transformStart = "translate(";
      transformEnd = "px)";
    }
    this.scrollTop = function(value, force) {
      if (!arguments.length) {
        return -this.top();
      }
      this.top(-value, force);
    };
    this.scrollLeft = function(value, force) {
      if (!arguments.length) {
        return -this.left();
      }
      this.left(-value, force);
    };
    this.left = function(value, force) {
      if (!arguments.length) {
        return -(element.scrollLeft + offsetLeft);
      }
      var dif = element.scrollLeft - prevLeft, oldOffset = offsetLeft;
      if ((dif > 2 || dif < -2) && !force) {
        prevLeft = element.scrollLeft;
        gsap2.killTweensOf(this, {
          left: 1,
          scrollLeft: 1
        });
        this.left(-prevLeft);
        if (vars.onKill) {
          vars.onKill();
        }
        return;
      }
      value = -value;
      if (value < 0) {
        offsetLeft = value - 0.5 | 0;
        value = 0;
      } else if (value > maxLeft) {
        offsetLeft = value - maxLeft | 0;
        value = maxLeft;
      } else {
        offsetLeft = 0;
      }
      if (offsetLeft || oldOffset) {
        if (!this._skip) {
          style[_transformProp3] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
        }
        if (offsetLeft + extraPadRight >= 0) {
          style.paddingRight = offsetLeft + extraPadRight + "px";
        }
      }
      element.scrollLeft = value | 0;
      prevLeft = element.scrollLeft;
    };
    this.top = function(value, force) {
      if (!arguments.length) {
        return -(element.scrollTop + offsetTop);
      }
      var dif = element.scrollTop - prevTop, oldOffset = offsetTop;
      if ((dif > 2 || dif < -2) && !force) {
        prevTop = element.scrollTop;
        gsap2.killTweensOf(this, {
          top: 1,
          scrollTop: 1
        });
        this.top(-prevTop);
        if (vars.onKill) {
          vars.onKill();
        }
        return;
      }
      value = -value;
      if (value < 0) {
        offsetTop = value - 0.5 | 0;
        value = 0;
      } else if (value > maxTop) {
        offsetTop = value - maxTop | 0;
        value = maxTop;
      } else {
        offsetTop = 0;
      }
      if (offsetTop || oldOffset) {
        if (!this._skip) {
          style[_transformProp3] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
        }
      }
      element.scrollTop = value | 0;
      prevTop = element.scrollTop;
    };
    this.maxScrollTop = function() {
      return maxTop;
    };
    this.maxScrollLeft = function() {
      return maxLeft;
    };
    this.disable = function() {
      node = content.firstChild;
      while (node) {
        nextNode = node.nextSibling;
        element.appendChild(node);
        node = nextNode;
      }
      if (element === content.parentNode) {
        element.removeChild(content);
      }
    };
    this.enable = function() {
      node = element.firstChild;
      if (node === content) {
        return;
      }
      while (node) {
        nextNode = node.nextSibling;
        content.appendChild(node);
        node = nextNode;
      }
      element.appendChild(content);
      this.calibrate();
    };
    this.calibrate = function(force) {
      var widthMatches = element.clientWidth === elementWidth, cs, x, y;
      prevTop = element.scrollTop;
      prevLeft = element.scrollLeft;
      if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
        return;
      }
      if (offsetTop || offsetLeft) {
        x = this.left();
        y = this.top();
        this.left(-element.scrollLeft);
        this.top(-element.scrollTop);
      }
      cs = _getComputedStyle(element);
      if (!widthMatches || force) {
        style.display = "block";
        style.width = "auto";
        style.paddingRight = "0px";
        extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth);
        if (extraPadRight) {
          extraPadRight += parseFloat(cs.paddingLeft) + (_addPaddingBR ? parseFloat(cs.paddingRight) : 0);
        }
      }
      style.display = "inline-block";
      style.position = "relative";
      style.overflow = "visible";
      style.verticalAlign = "top";
      style.boxSizing = "content-box";
      style.width = "100%";
      style.paddingRight = extraPadRight + "px";
      if (_addPaddingBR) {
        style.paddingBottom = cs.paddingBottom;
      }
      elementWidth = element.clientWidth;
      elementHeight = element.clientHeight;
      scrollWidth = element.scrollWidth;
      scrollHeight = element.scrollHeight;
      maxLeft = element.scrollWidth - elementWidth;
      maxTop = element.scrollHeight - elementHeight;
      contentHeight = content.offsetHeight;
      style.display = "block";
      if (x || y) {
        this.left(x);
        this.top(y);
      }
    };
    this.content = content;
    this.element = element;
    this._skip = false;
    this.enable();
  };
  var _initCore3 = function _initCore4(required) {
    if (_windowExists5() && document.body) {
      var nav = window && window.navigator;
      _win4 = window;
      _doc4 = document;
      _docElement3 = _doc4.documentElement;
      _body2 = _doc4.body;
      _tempDiv2 = _createElement3("div");
      _supportsPointer = !!window.PointerEvent;
      _placeholderDiv = _createElement3("div");
      _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
      _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
      _isAndroid = nav && nav.userAgent.toLowerCase().indexOf("android") !== -1;
      _isTouchDevice = "ontouchstart" in _docElement3 && "orientation" in _win4 || nav && (nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0);
      _addPaddingBR = function() {
        var div = _createElement3("div"), child = _createElement3("div"), childStyle = child.style, parent = _body2, val;
        childStyle.display = "inline-block";
        childStyle.position = "relative";
        div.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
        div.appendChild(child);
        parent.appendChild(div);
        val = child.offsetHeight + 18 > div.scrollHeight;
        parent.removeChild(div);
        return val;
      }();
      _touchEventLookup = function(types) {
        var standard = types.split(","), converted = ("onpointerdown" in _tempDiv2 ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _tempDiv2 ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","), obj = {}, i = 4;
        while (--i > -1) {
          obj[standard[i]] = converted[i];
          obj[converted[i]] = standard[i];
        }
        try {
          _docElement3.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function get() {
              _supportsPassive = 1;
            }
          }));
        } catch (e) {
        }
        return obj;
      }("touchstart,touchmove,touchend,touchcancel");
      _addListener(_doc4, "touchcancel", _emptyFunc3);
      _addListener(_win4, "touchmove", _emptyFunc3);
      _body2 && _body2.addEventListener("touchstart", _emptyFunc3);
      _addListener(_doc4, "contextmenu", function() {
        for (var p in _lookup) {
          if (_lookup[p].isPressed) {
            _lookup[p].endDrag();
          }
        }
      });
      gsap2 = _coreInitted2 = _getGSAP();
    }
    if (gsap2) {
      InertiaPlugin = gsap2.plugins.inertia;
      _context2 = gsap2.core.context || function() {
      };
      _checkPrefix = gsap2.utils.checkPrefix;
      _transformProp3 = _checkPrefix(_transformProp3);
      _transformOriginProp3 = _checkPrefix(_transformOriginProp3);
      _toArray = gsap2.utils.toArray;
      _getStyleSaver3 = gsap2.core.getStyleSaver;
      _supports3D2 = !!_checkPrefix("perspective");
    } else if (required) {
      console.warn("Please gsap.registerPlugin(Draggable)");
    }
  };
  var EventDispatcher = /* @__PURE__ */ function() {
    function EventDispatcher2(target) {
      this._listeners = {};
      this.target = target || this;
    }
    var _proto = EventDispatcher2.prototype;
    _proto.addEventListener = function addEventListener2(type, callback) {
      var list = this._listeners[type] || (this._listeners[type] = []);
      if (!~list.indexOf(callback)) {
        list.push(callback);
      }
    };
    _proto.removeEventListener = function removeEventListener2(type, callback) {
      var list = this._listeners[type], i = list && list.indexOf(callback);
      i >= 0 && list.splice(i, 1);
    };
    _proto.dispatchEvent = function dispatchEvent(type) {
      var _this = this;
      var result;
      (this._listeners[type] || []).forEach(function(callback) {
        return callback.call(_this, {
          type,
          target: _this.target
        }) === false && (result = false);
      });
      return result;
    };
    return EventDispatcher2;
  }();
  var Draggable = /* @__PURE__ */ function(_EventDispatcher) {
    _inheritsLoose2(Draggable2, _EventDispatcher);
    function Draggable2(target, vars) {
      var _this2;
      _this2 = _EventDispatcher.call(this) || this;
      _coreInitted2 || _initCore3(1);
      target = _toArray(target)[0];
      _this2.styles = _getStyleSaver3 && _getStyleSaver3(target, "transform,left,top");
      if (!InertiaPlugin) {
        InertiaPlugin = gsap2.plugins.inertia;
      }
      _this2.vars = vars = _copy(vars || {});
      _this2.target = target;
      _this2.x = _this2.y = _this2.rotation = 0;
      _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
      _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
      _this2.lockAxis = vars.lockAxis;
      _this2.autoScroll = vars.autoScroll || 0;
      _this2.lockedAxis = null;
      _this2.allowEventDefault = !!vars.allowEventDefault;
      gsap2.getProperty(target, "x");
      var type = (vars.type || "x,y").toLowerCase(), xyMode = ~type.indexOf("x") || ~type.indexOf("y"), rotationMode = type.indexOf("rotation") !== -1, xProp = rotationMode ? "rotation" : xyMode ? "x" : "left", yProp = xyMode ? "y" : "top", allowX = !!(~type.indexOf("x") || ~type.indexOf("left") || type === "scroll"), allowY = !!(~type.indexOf("y") || ~type.indexOf("top") || type === "scroll"), minimumMovement = vars.minimumMovement || 2, self2 = _assertThisInitialized2(_this2), triggers = _toArray(vars.trigger || vars.handle || target), killProps = {}, dragEndTime = 0, checkAutoScrollBounds = false, autoScrollMarginTop = vars.autoScrollMarginTop || 40, autoScrollMarginRight = vars.autoScrollMarginRight || 40, autoScrollMarginBottom = vars.autoScrollMarginBottom || 40, autoScrollMarginLeft = vars.autoScrollMarginLeft || 40, isClickable = vars.clickableTest || _isClickable, clickTime = 0, gsCache = target._gsap || gsap2.core.getCache(target), isFixed = _isFixed3(target), getPropAsNum = function getPropAsNum2(property, unit) {
        return parseFloat(gsCache.get(target, property, unit));
      }, ownerDoc = target.ownerDocument || _doc4, enabled, scrollProxy, startPointerX, startPointerY, startElementX, startElementY, hasBounds, hasDragCallback, hasMoveCallback, maxX, minX, maxY, minY, touch, touchID, rotationOrigin, dirty, old, snapX, snapY, snapXY, isClicking, touchEventTarget, matrix, interrupted, allowNativeTouchScrolling, touchDragAxis, isDispatching, clickDispatch, trustedClickDispatch, isPreventingDefault, innerMatrix, dragged, onContextMenu = function onContextMenu2(e) {
        _preventDefault(e);
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        return false;
      }, render4 = function render5(suppressEvents) {
        if (self2.autoScroll && self2.isDragging && (checkAutoScrollBounds || dirty)) {
          var e = target, autoScrollFactor = self2.autoScroll * 15, parent, isRoot, rect, pointerX, pointerY, changeX, changeY, gap;
          checkAutoScrollBounds = false;
          _windowProxy.scrollTop = _win4.pageYOffset != null ? _win4.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
          _windowProxy.scrollLeft = _win4.pageXOffset != null ? _win4.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
          pointerX = self2.pointerX - _windowProxy.scrollLeft;
          pointerY = self2.pointerY - _windowProxy.scrollTop;
          while (e && !isRoot) {
            isRoot = _isRoot(e.parentNode);
            parent = isRoot ? _windowProxy : e.parentNode;
            rect = isRoot ? {
              bottom: Math.max(_docElement3.clientHeight, _win4.innerHeight || 0),
              right: Math.max(_docElement3.clientWidth, _win4.innerWidth || 0),
              left: 0,
              top: 0
            } : parent.getBoundingClientRect();
            changeX = changeY = 0;
            if (allowY) {
              gap = parent._gsMaxScrollY - parent.scrollTop;
              if (gap < 0) {
                changeY = gap;
              } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
                checkAutoScrollBounds = true;
                changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
              } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
                checkAutoScrollBounds = true;
                changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
              }
              if (changeY) {
                parent.scrollTop += changeY;
              }
            }
            if (allowX) {
              gap = parent._gsMaxScrollX - parent.scrollLeft;
              if (gap < 0) {
                changeX = gap;
              } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
                checkAutoScrollBounds = true;
                changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
              } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
                checkAutoScrollBounds = true;
                changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
              }
              if (changeX) {
                parent.scrollLeft += changeX;
              }
            }
            if (isRoot && (changeX || changeY)) {
              _win4.scrollTo(parent.scrollLeft, parent.scrollTop);
              setPointerPosition(self2.pointerX + changeX, self2.pointerY + changeY);
            }
            e = parent;
          }
        }
        if (dirty) {
          var x = self2.x, y = self2.y;
          if (rotationMode) {
            self2.deltaX = x - parseFloat(gsCache.rotation);
            self2.rotation = x;
            gsCache.rotation = x + "deg";
            gsCache.renderTransform(1, gsCache);
          } else {
            if (scrollProxy) {
              if (allowY) {
                self2.deltaY = y - scrollProxy.top();
                scrollProxy.top(y);
              }
              if (allowX) {
                self2.deltaX = x - scrollProxy.left();
                scrollProxy.left(x);
              }
            } else if (xyMode) {
              if (allowY) {
                self2.deltaY = y - parseFloat(gsCache.y);
                gsCache.y = y + "px";
              }
              if (allowX) {
                self2.deltaX = x - parseFloat(gsCache.x);
                gsCache.x = x + "px";
              }
              gsCache.renderTransform(1, gsCache);
            } else {
              if (allowY) {
                self2.deltaY = y - parseFloat(target.style.top || 0);
                target.style.top = y + "px";
              }
              if (allowX) {
                self2.deltaX = x - parseFloat(target.style.left || 0);
                target.style.left = x + "px";
              }
            }
          }
          if (hasDragCallback && !suppressEvents && !isDispatching) {
            isDispatching = true;
            if (_dispatchEvent(self2, "drag", "onDrag") === false) {
              if (allowX) {
                self2.x -= self2.deltaX;
              }
              if (allowY) {
                self2.y -= self2.deltaY;
              }
              render5(true);
            }
            isDispatching = false;
          }
        }
        dirty = false;
      }, syncXY = function syncXY2(skipOnUpdate, skipSnap) {
        var x = self2.x, y = self2.y, snappedValue, cs;
        if (!target._gsap) {
          gsCache = gsap2.core.getCache(target);
        }
        gsCache.uncache && gsap2.getProperty(target, "x");
        if (xyMode) {
          self2.x = parseFloat(gsCache.x);
          self2.y = parseFloat(gsCache.y);
        } else if (rotationMode) {
          self2.x = self2.rotation = parseFloat(gsCache.rotation);
        } else if (scrollProxy) {
          self2.y = scrollProxy.top();
          self2.x = scrollProxy.left();
        } else {
          self2.y = parseFloat(target.style.top || (cs = _getComputedStyle(target)) && cs.top) || 0;
          self2.x = parseFloat(target.style.left || (cs || {}).left) || 0;
        }
        if ((snapX || snapY || snapXY) && !skipSnap && (self2.isDragging || self2.isThrowing)) {
          if (snapXY) {
            _temp1.x = self2.x;
            _temp1.y = self2.y;
            snappedValue = snapXY(_temp1);
            if (snappedValue.x !== self2.x) {
              self2.x = snappedValue.x;
              dirty = true;
            }
            if (snappedValue.y !== self2.y) {
              self2.y = snappedValue.y;
              dirty = true;
            }
          }
          if (snapX) {
            snappedValue = snapX(self2.x);
            if (snappedValue !== self2.x) {
              self2.x = snappedValue;
              if (rotationMode) {
                self2.rotation = snappedValue;
              }
              dirty = true;
            }
          }
          if (snapY) {
            snappedValue = snapY(self2.y);
            if (snappedValue !== self2.y) {
              self2.y = snappedValue;
            }
            dirty = true;
          }
        }
        dirty && render4(true);
        if (!skipOnUpdate) {
          self2.deltaX = self2.x - x;
          self2.deltaY = self2.y - y;
          _dispatchEvent(self2, "throwupdate", "onThrowUpdate");
        }
      }, buildSnapFunc = function buildSnapFunc2(snap3, min, max, factor) {
        if (min == null) {
          min = -_bigNum3;
        }
        if (max == null) {
          max = _bigNum3;
        }
        if (_isFunction3(snap3)) {
          return function(n) {
            var edgeTolerance = !self2.isPressed ? 1 : 1 - self2.edgeResistance;
            return snap3.call(self2, (n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor) * factor;
          };
        }
        if (_isArray2(snap3)) {
          return function(n) {
            var i = snap3.length, closest = 0, absDif = _bigNum3, val, dif;
            while (--i > -1) {
              val = snap3[i];
              dif = val - n;
              if (dif < 0) {
                dif = -dif;
              }
              if (dif < absDif && val >= min && val <= max) {
                closest = i;
                absDif = dif;
              }
            }
            return snap3[closest];
          };
        }
        return isNaN(snap3) ? function(n) {
          return n;
        } : function() {
          return snap3 * factor;
        };
      }, buildPointSnapFunc = function buildPointSnapFunc2(snap3, minX2, maxX2, minY2, maxY2, radius, factor) {
        radius = radius && radius < _bigNum3 ? radius * radius : _bigNum3;
        if (_isFunction3(snap3)) {
          return function(point) {
            var edgeTolerance = !self2.isPressed ? 1 : 1 - self2.edgeResistance, x = point.x, y = point.y, result, dx, dy;
            point.x = x = x > maxX2 ? maxX2 + (x - maxX2) * edgeTolerance : x < minX2 ? minX2 + (x - minX2) * edgeTolerance : x;
            point.y = y = y > maxY2 ? maxY2 + (y - maxY2) * edgeTolerance : y < minY2 ? minY2 + (y - minY2) * edgeTolerance : y;
            result = snap3.call(self2, point);
            if (result !== point) {
              point.x = result.x;
              point.y = result.y;
            }
            if (factor !== 1) {
              point.x *= factor;
              point.y *= factor;
            }
            if (radius < _bigNum3) {
              dx = point.x - x;
              dy = point.y - y;
              if (dx * dx + dy * dy > radius) {
                point.x = x;
                point.y = y;
              }
            }
            return point;
          };
        }
        if (_isArray2(snap3)) {
          return function(p) {
            var i = snap3.length, closest = 0, minDist = _bigNum3, x, y, point, dist;
            while (--i > -1) {
              point = snap3[i];
              x = point.x - p.x;
              y = point.y - p.y;
              dist = x * x + y * y;
              if (dist < minDist) {
                closest = i;
                minDist = dist;
              }
            }
            return minDist <= radius ? snap3[closest] : p;
          };
        }
        return function(n) {
          return n;
        };
      }, calculateBounds = function calculateBounds2() {
        var bounds, targetBounds, snap3, snapIsRaw;
        hasBounds = false;
        if (scrollProxy) {
          scrollProxy.calibrate();
          self2.minX = minX = -scrollProxy.maxScrollLeft();
          self2.minY = minY = -scrollProxy.maxScrollTop();
          self2.maxX = maxX = self2.maxY = maxY = 0;
          hasBounds = true;
        } else if (!!vars.bounds) {
          bounds = _getBounds(vars.bounds, target.parentNode);
          if (rotationMode) {
            self2.minX = minX = bounds.left;
            self2.maxX = maxX = bounds.left + bounds.width;
            self2.minY = minY = self2.maxY = maxY = 0;
          } else if (!_isUndefined3(vars.bounds.maxX) || !_isUndefined3(vars.bounds.maxY)) {
            bounds = vars.bounds;
            self2.minX = minX = bounds.minX;
            self2.minY = minY = bounds.minY;
            self2.maxX = maxX = bounds.maxX;
            self2.maxY = maxY = bounds.maxY;
          } else {
            targetBounds = _getBounds(target, target.parentNode);
            self2.minX = minX = Math.round(getPropAsNum(xProp, "px") + bounds.left - targetBounds.left);
            self2.minY = minY = Math.round(getPropAsNum(yProp, "px") + bounds.top - targetBounds.top);
            self2.maxX = maxX = Math.round(minX + (bounds.width - targetBounds.width));
            self2.maxY = maxY = Math.round(minY + (bounds.height - targetBounds.height));
          }
          if (minX > maxX) {
            self2.minX = maxX;
            self2.maxX = maxX = minX;
            minX = self2.minX;
          }
          if (minY > maxY) {
            self2.minY = maxY;
            self2.maxY = maxY = minY;
            minY = self2.minY;
          }
          if (rotationMode) {
            self2.minRotation = minX;
            self2.maxRotation = maxX;
          }
          hasBounds = true;
        }
        if (vars.liveSnap) {
          snap3 = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
          snapIsRaw = _isArray2(snap3) || _isFunction3(snap3);
          if (rotationMode) {
            snapX = buildSnapFunc(snapIsRaw ? snap3 : snap3.rotation, minX, maxX, 1);
            snapY = null;
          } else {
            if (snap3.points) {
              snapXY = buildPointSnapFunc(snapIsRaw ? snap3 : snap3.points, minX, maxX, minY, maxY, snap3.radius, scrollProxy ? -1 : 1);
            } else {
              if (allowX) {
                snapX = buildSnapFunc(snapIsRaw ? snap3 : snap3.x || snap3.left || snap3.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
              }
              if (allowY) {
                snapY = buildSnapFunc(snapIsRaw ? snap3 : snap3.y || snap3.top || snap3.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
              }
            }
          }
        }
      }, onThrowComplete = function onThrowComplete2() {
        self2.isThrowing = false;
        _dispatchEvent(self2, "throwcomplete", "onThrowComplete");
      }, onThrowInterrupt = function onThrowInterrupt2() {
        self2.isThrowing = false;
      }, animate = function animate2(inertia, forceZeroVelocity) {
        var snap3, snapIsRaw, tween, overshootTolerance;
        if (inertia && InertiaPlugin) {
          if (inertia === true) {
            snap3 = vars.snap || vars.liveSnap || {};
            snapIsRaw = _isArray2(snap3) || _isFunction3(snap3);
            inertia = {
              resistance: (vars.throwResistance || vars.resistance || 1e3) / (rotationMode ? 10 : 1)
            };
            if (rotationMode) {
              inertia.rotation = _parseInertia(self2, snapIsRaw ? snap3 : snap3.rotation, maxX, minX, 1, forceZeroVelocity);
            } else {
              if (allowX) {
                inertia[xProp] = _parseInertia(self2, snapIsRaw ? snap3 : snap3.points || snap3.x || snap3.left, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self2.lockedAxis === "x");
              }
              if (allowY) {
                inertia[yProp] = _parseInertia(self2, snapIsRaw ? snap3 : snap3.points || snap3.y || snap3.top, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self2.lockedAxis === "y");
              }
              if (snap3.points || _isArray2(snap3) && _isObject3(snap3[0])) {
                inertia.linkedProps = xProp + "," + yProp;
                inertia.radius = snap3.radius;
              }
            }
          }
          self2.isThrowing = true;
          overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self2.edgeResistance + 0.2;
          if (!inertia.duration) {
            inertia.duration = {
              max: Math.max(vars.minDuration || 0, "maxDuration" in vars ? vars.maxDuration : 2),
              min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject3(inertia) && inertia.resistance > 1e3 ? 0 : 0.5,
              overshoot: overshootTolerance
            };
          }
          self2.tween = tween = gsap2.to(scrollProxy || target, {
            inertia,
            data: "_draggable",
            inherit: false,
            onComplete: onThrowComplete,
            onInterrupt: onThrowInterrupt,
            onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
            onUpdateParams: vars.fastMode ? [self2, "onthrowupdate", "onThrowUpdate"] : snap3 && snap3.radius ? [false, true] : []
          });
          if (!vars.fastMode) {
            if (scrollProxy) {
              scrollProxy._skip = true;
            }
            tween.render(1e9, true, true);
            syncXY(true, true);
            self2.endX = self2.x;
            self2.endY = self2.y;
            if (rotationMode) {
              self2.endRotation = self2.x;
            }
            tween.play(0);
            syncXY(true, true);
            if (scrollProxy) {
              scrollProxy._skip = false;
            }
          }
        } else if (hasBounds) {
          self2.applyBounds();
        }
      }, updateMatrix = function updateMatrix2(shiftStart) {
        var start = matrix, p;
        matrix = getGlobalMatrix(target.parentNode, true);
        if (shiftStart && self2.isPressed && !matrix.equals(start || new Matrix2D())) {
          p = start.inverse().apply({
            x: startPointerX,
            y: startPointerY
          });
          matrix.apply(p, p);
          startPointerX = p.x;
          startPointerY = p.y;
        }
        if (matrix.equals(_identityMatrix2)) {
          matrix = null;
        }
      }, recordStartPositions = function recordStartPositions2() {
        var edgeTolerance = 1 - self2.edgeResistance, offsetX = isFixed ? _getDocScrollLeft3(ownerDoc) : 0, offsetY = isFixed ? _getDocScrollTop3(ownerDoc) : 0, parsedOrigin, x, y;
        if (xyMode) {
          gsCache.x = getPropAsNum(xProp, "px") + "px";
          gsCache.y = getPropAsNum(yProp, "px") + "px";
          gsCache.renderTransform();
        }
        updateMatrix(false);
        _point1.x = self2.pointerX - offsetX;
        _point1.y = self2.pointerY - offsetY;
        matrix && matrix.apply(_point1, _point1);
        startPointerX = _point1.x;
        startPointerY = _point1.y;
        if (dirty) {
          setPointerPosition(self2.pointerX, self2.pointerY);
          render4(true);
        }
        innerMatrix = getGlobalMatrix(target);
        if (scrollProxy) {
          calculateBounds();
          startElementY = scrollProxy.top();
          startElementX = scrollProxy.left();
        } else {
          if (isTweening2()) {
            syncXY(true, true);
            calculateBounds();
          } else {
            self2.applyBounds();
          }
          if (rotationMode) {
            parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle(target)[_transformOriginProp3] || "0 0").split(" ");
            rotationOrigin = self2.rotationOrigin = getGlobalMatrix(target).apply({
              x: parseFloat(parsedOrigin[0]) || 0,
              y: parseFloat(parsedOrigin[1]) || 0
            });
            syncXY(true, true);
            x = self2.pointerX - rotationOrigin.x - offsetX;
            y = rotationOrigin.y - self2.pointerY + offsetY;
            startElementX = self2.x;
            startElementY = self2.y = Math.atan2(y, x) * _RAD2DEG2;
          } else {
            startElementY = getPropAsNum(yProp, "px");
            startElementX = getPropAsNum(xProp, "px");
          }
        }
        if (hasBounds && edgeTolerance) {
          if (startElementX > maxX) {
            startElementX = maxX + (startElementX - maxX) / edgeTolerance;
          } else if (startElementX < minX) {
            startElementX = minX - (minX - startElementX) / edgeTolerance;
          }
          if (!rotationMode) {
            if (startElementY > maxY) {
              startElementY = maxY + (startElementY - maxY) / edgeTolerance;
            } else if (startElementY < minY) {
              startElementY = minY - (minY - startElementY) / edgeTolerance;
            }
          }
        }
        self2.startX = startElementX = _round3(startElementX);
        self2.startY = startElementY = _round3(startElementY);
      }, isTweening2 = function isTweening3() {
        return self2.tween && self2.tween.isActive();
      }, removePlaceholder = function removePlaceholder2() {
        if (_placeholderDiv.parentNode && !isTweening2() && !self2.isDragging) {
          _placeholderDiv.parentNode.removeChild(_placeholderDiv);
        }
      }, onPress = function onPress2(e, force) {
        var i;
        if (!enabled || self2.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self2.pointerEvent.type]) {
          isPreventingDefault && e && enabled && _preventDefault(e);
          return;
        }
        interrupted = isTweening2();
        dragged = false;
        self2.pointerEvent = e;
        if (_touchEventLookup[e.type]) {
          touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : ownerDoc;
          _addListener(touchEventTarget, "touchend", onRelease);
          _addListener(touchEventTarget, "touchmove", onMove);
          _addListener(touchEventTarget, "touchcancel", onRelease);
          _addListener(ownerDoc, "touchstart", _onMultiTouchDocument);
        } else {
          touchEventTarget = null;
          _addListener(ownerDoc, "mousemove", onMove);
        }
        touchDragAxis = null;
        if (!_supportsPointer || !touchEventTarget) {
          _addListener(ownerDoc, "mouseup", onRelease);
          e && e.target && _addListener(e.target, "mouseup", onRelease);
        }
        isClicking = isClickable.call(self2, e.target) && vars.dragClickables === false && !force;
        if (isClicking) {
          _addListener(e.target, "change", onRelease);
          _dispatchEvent(self2, "pressInit", "onPressInit");
          _dispatchEvent(self2, "press", "onPress");
          _setSelectable(triggers, true);
          isPreventingDefault = false;
          return;
        }
        allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self2.vars.allowNativeTouchScrolling === false || self2.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x";
        isPreventingDefault = !allowNativeTouchScrolling && !self2.allowEventDefault;
        if (isPreventingDefault) {
          _preventDefault(e);
          _addListener(_win4, "touchforcechange", _preventDefault);
        }
        if (e.changedTouches) {
          e = touch = e.changedTouches[0];
          touchID = e.identifier;
        } else if (e.pointerId) {
          touchID = e.pointerId;
        } else {
          touch = touchID = null;
        }
        _dragCount++;
        _addToRenderQueue(render4);
        startPointerY = self2.pointerY = e.pageY;
        startPointerX = self2.pointerX = e.pageX;
        _dispatchEvent(self2, "pressInit", "onPressInit");
        if (allowNativeTouchScrolling || self2.autoScroll) {
          _recordMaxScrolls(target.parentNode);
        }
        if (target.parentNode && self2.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
          _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
          target.parentNode.appendChild(_placeholderDiv);
        }
        recordStartPositions();
        self2.tween && self2.tween.kill();
        self2.isThrowing = false;
        gsap2.killTweensOf(scrollProxy || target, killProps, true);
        scrollProxy && gsap2.killTweensOf(target, {
          scrollTo: 1
        }, true);
        self2.tween = self2.lockedAxis = null;
        if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
          target.style.zIndex = Draggable2.zIndex++;
        }
        self2.isPressed = true;
        hasDragCallback = !!(vars.onDrag || self2._listeners.drag);
        hasMoveCallback = !!(vars.onMove || self2._listeners.move);
        if (vars.cursor !== false || vars.activeCursor) {
          i = triggers.length;
          while (--i > -1) {
            gsap2.set(triggers[i], {
              cursor: vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor)
            });
          }
        }
        _dispatchEvent(self2, "press", "onPress");
      }, onMove = function onMove2(e) {
        var originalEvent = e, touches, pointerX, pointerY, i, dx, dy;
        if (!enabled || _isMultiTouching || !self2.isPressed || !e) {
          isPreventingDefault && e && enabled && _preventDefault(e);
          return;
        }
        self2.pointerEvent = e;
        touches = e.changedTouches;
        if (touches) {
          e = touches[0];
          if (e !== touch && e.identifier !== touchID) {
            i = touches.length;
            while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {
            }
            if (i < 0) {
              return;
            }
          }
        } else if (e.pointerId && touchID && e.pointerId !== touchID) {
          return;
        }
        if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
          _point1.x = e.pageX - (isFixed ? _getDocScrollLeft3(ownerDoc) : 0);
          _point1.y = e.pageY - (isFixed ? _getDocScrollTop3(ownerDoc) : 0);
          matrix && matrix.apply(_point1, _point1);
          pointerX = _point1.x;
          pointerY = _point1.y;
          dx = Math.abs(pointerX - startPointerX);
          dy = Math.abs(pointerY - startPointerY);
          if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            touchDragAxis = dx > dy && allowX ? "x" : "y";
            if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
              _addListener(_win4, "touchforcechange", _preventDefault);
            }
            if (self2.vars.lockAxisOnTouchScroll !== false && allowX && allowY) {
              self2.lockedAxis = touchDragAxis === "x" ? "y" : "x";
              _isFunction3(self2.vars.onLockAxis) && self2.vars.onLockAxis.call(self2, originalEvent);
            }
            if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
              onRelease(originalEvent);
              return;
            }
          }
        }
        if (!self2.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
          _preventDefault(originalEvent);
          isPreventingDefault = true;
        } else if (isPreventingDefault) {
          isPreventingDefault = false;
        }
        if (self2.autoScroll) {
          checkAutoScrollBounds = true;
        }
        setPointerPosition(e.pageX, e.pageY, hasMoveCallback);
      }, setPointerPosition = function setPointerPosition2(pointerX, pointerY, invokeOnMove) {
        var dragTolerance = 1 - self2.dragResistance, edgeTolerance = 1 - self2.edgeResistance, prevPointerX = self2.pointerX, prevPointerY = self2.pointerY, prevStartElementY = startElementY, prevX = self2.x, prevY = self2.y, prevEndX = self2.endX, prevEndY = self2.endY, prevEndRotation = self2.endRotation, prevDirty = dirty, xChange, yChange, x, y, dif, temp;
        self2.pointerX = pointerX;
        self2.pointerY = pointerY;
        if (isFixed) {
          pointerX -= _getDocScrollLeft3(ownerDoc);
          pointerY -= _getDocScrollTop3(ownerDoc);
        }
        if (rotationMode) {
          y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG2;
          dif = self2.y - y;
          if (dif > 180) {
            startElementY -= 360;
            self2.y = y;
          } else if (dif < -180) {
            startElementY += 360;
            self2.y = y;
          }
          if (self2.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
            self2.y = y;
            x = startElementX + (startElementY - y) * dragTolerance;
          } else {
            x = startElementX;
          }
        } else {
          if (matrix) {
            temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
            pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
            pointerX = temp;
          }
          yChange = pointerY - startPointerY;
          xChange = pointerX - startPointerX;
          if (yChange < minimumMovement && yChange > -minimumMovement) {
            yChange = 0;
          }
          if (xChange < minimumMovement && xChange > -minimumMovement) {
            xChange = 0;
          }
          if ((self2.lockAxis || self2.lockedAxis) && (xChange || yChange)) {
            temp = self2.lockedAxis;
            if (!temp) {
              self2.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;
              if (temp && _isFunction3(self2.vars.onLockAxis)) {
                self2.vars.onLockAxis.call(self2, self2.pointerEvent);
              }
            }
            if (temp === "y") {
              yChange = 0;
            } else if (temp === "x") {
              xChange = 0;
            }
          }
          x = _round3(startElementX + xChange * dragTolerance);
          y = _round3(startElementY + yChange * dragTolerance);
        }
        if ((snapX || snapY || snapXY) && (self2.x !== x || self2.y !== y && !rotationMode)) {
          if (snapXY) {
            _temp1.x = x;
            _temp1.y = y;
            temp = snapXY(_temp1);
            x = _round3(temp.x);
            y = _round3(temp.y);
          }
          if (snapX) {
            x = _round3(snapX(x));
          }
          if (snapY) {
            y = _round3(snapY(y));
          }
        }
        if (hasBounds) {
          if (x > maxX) {
            x = maxX + Math.round((x - maxX) * edgeTolerance);
          } else if (x < minX) {
            x = minX + Math.round((x - minX) * edgeTolerance);
          }
          if (!rotationMode) {
            if (y > maxY) {
              y = Math.round(maxY + (y - maxY) * edgeTolerance);
            } else if (y < minY) {
              y = Math.round(minY + (y - minY) * edgeTolerance);
            }
          }
        }
        if (self2.x !== x || self2.y !== y && !rotationMode) {
          if (rotationMode) {
            self2.endRotation = self2.x = self2.endX = x;
            dirty = true;
          } else {
            if (allowY) {
              self2.y = self2.endY = y;
              dirty = true;
            }
            if (allowX) {
              self2.x = self2.endX = x;
              dirty = true;
            }
          }
          if (!invokeOnMove || _dispatchEvent(self2, "move", "onMove") !== false) {
            if (!self2.isDragging && self2.isPressed) {
              self2.isDragging = dragged = true;
              _dispatchEvent(self2, "dragstart", "onDragStart");
            }
          } else {
            self2.pointerX = prevPointerX;
            self2.pointerY = prevPointerY;
            startElementY = prevStartElementY;
            self2.x = prevX;
            self2.y = prevY;
            self2.endX = prevEndX;
            self2.endY = prevEndY;
            self2.endRotation = prevEndRotation;
            dirty = prevDirty;
          }
        }
      }, onRelease = function onRelease2(e, force) {
        if (!enabled || !self2.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID && e.target !== target || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
          isPreventingDefault && e && enabled && _preventDefault(e);
          return;
        }
        self2.isPressed = false;
        var originalEvent = e, wasDragging = self2.isDragging, isContextMenuRelease = self2.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2), placeholderDelayedCall = gsap2.delayedCall(1e-3, removePlaceholder), touches, i, syntheticEvent, eventTarget, syntheticClick;
        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchend", onRelease2);
          _removeListener(touchEventTarget, "touchmove", onMove);
          _removeListener(touchEventTarget, "touchcancel", onRelease2);
          _removeListener(ownerDoc, "touchstart", _onMultiTouchDocument);
        } else {
          _removeListener(ownerDoc, "mousemove", onMove);
        }
        _removeListener(_win4, "touchforcechange", _preventDefault);
        if (!_supportsPointer || !touchEventTarget) {
          _removeListener(ownerDoc, "mouseup", onRelease2);
          e && e.target && _removeListener(e.target, "mouseup", onRelease2);
        }
        dirty = false;
        if (wasDragging) {
          dragEndTime = _lastDragTime = _getTime();
          self2.isDragging = false;
        }
        _removeFromRenderQueue(render4);
        if (isClicking && !isContextMenuRelease) {
          if (e) {
            _removeListener(e.target, "change", onRelease2);
            self2.pointerEvent = originalEvent;
          }
          _setSelectable(triggers, false);
          _dispatchEvent(self2, "release", "onRelease");
          _dispatchEvent(self2, "click", "onClick");
          isClicking = false;
          return;
        }
        i = triggers.length;
        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
        }
        _dragCount--;
        if (e) {
          touches = e.changedTouches;
          if (touches) {
            e = touches[0];
            if (e !== touch && e.identifier !== touchID) {
              i = touches.length;
              while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {
              }
              if (i < 0 && !force) {
                return;
              }
            }
          }
          self2.pointerEvent = originalEvent;
          self2.pointerX = e.pageX;
          self2.pointerY = e.pageY;
        }
        if (isContextMenuRelease && originalEvent) {
          _preventDefault(originalEvent);
          isPreventingDefault = true;
          _dispatchEvent(self2, "release", "onRelease");
        } else if (originalEvent && !wasDragging) {
          isPreventingDefault = false;
          if (interrupted && (vars.snap || vars.bounds)) {
            animate(vars.inertia || vars.throwProps);
          }
          _dispatchEvent(self2, "release", "onRelease");
          if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
            _dispatchEvent(self2, "click", "onClick");
            if (_getTime() - clickTime < 300) {
              _dispatchEvent(self2, "doubleclick", "onDoubleClick");
            }
            eventTarget = originalEvent.target || target;
            clickTime = _getTime();
            syntheticClick = function syntheticClick2() {
              if (clickTime !== clickDispatch && self2.enabled() && !self2.isPressed && !originalEvent.defaultPrevented) {
                if (eventTarget.click) {
                  eventTarget.click();
                } else if (ownerDoc.createEvent) {
                  syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win4, 1, self2.pointerEvent.screenX, self2.pointerEvent.screenY, self2.pointerX, self2.pointerY, false, false, false, false, 0, null);
                  eventTarget.dispatchEvent(syntheticEvent);
                }
              }
            };
            if (!_isAndroid && !originalEvent.defaultPrevented) {
              gsap2.delayedCall(0.05, syntheticClick);
            }
          }
        } else {
          animate(vars.inertia || vars.throwProps);
          if (!self2.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self2, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
            isPreventingDefault = true;
            _preventDefault(originalEvent);
          } else {
            isPreventingDefault = false;
          }
          _dispatchEvent(self2, "release", "onRelease");
        }
        isTweening2() && placeholderDelayedCall.duration(self2.tween.duration());
        wasDragging && _dispatchEvent(self2, "dragend", "onDragEnd");
        return true;
      }, updateScroll = function updateScroll2(e) {
        if (e && self2.isDragging && !scrollProxy) {
          var parent = e.target || target.parentNode, deltaX = parent.scrollLeft - parent._gsScrollX, deltaY = parent.scrollTop - parent._gsScrollY;
          if (deltaX || deltaY) {
            if (matrix) {
              startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
              startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
            } else {
              startPointerX -= deltaX;
              startPointerY -= deltaY;
            }
            parent._gsScrollX += deltaX;
            parent._gsScrollY += deltaY;
            setPointerPosition(self2.pointerX, self2.pointerY);
          }
        }
      }, onClick = function onClick2(e) {
        var time = _getTime(), recentlyClicked = time - clickTime < 100, recentlyDragged = time - dragEndTime < 50, alreadyDispatched = recentlyClicked && clickDispatch === clickTime, defaultPrevented = self2.pointerEvent && self2.pointerEvent.defaultPrevented, alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime, trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched;
        if ((alreadyDispatched || recentlyDragged && self2.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        if (recentlyClicked && !(self2.pointerEvent && self2.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
          if (trusted && alreadyDispatched) {
            trustedClickDispatch = clickTime;
          }
          clickDispatch = clickTime;
          return;
        }
        if (self2.isPressed || recentlyDragged || recentlyClicked) {
          if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
            _preventDefault(e);
          }
        }
        if (!recentlyClicked && !recentlyDragged && !dragged) {
          e && e.target && (self2.pointerEvent = e);
          _dispatchEvent(self2, "click", "onClick");
        }
      }, localizePoint = function localizePoint2(p) {
        return matrix ? {
          x: p.x * matrix.a + p.y * matrix.c + matrix.e,
          y: p.x * matrix.b + p.y * matrix.d + matrix.f
        } : {
          x: p.x,
          y: p.y
        };
      };
      old = Draggable2.get(target);
      old && old.kill();
      _this2.startDrag = function(event, align) {
        var r1, r2, p1, p2;
        onPress(event || self2.pointerEvent, true);
        if (align && !self2.hitTest(event || self2.pointerEvent)) {
          r1 = _parseRect(event || self2.pointerEvent);
          r2 = _parseRect(target);
          p1 = localizePoint({
            x: r1.left + r1.width / 2,
            y: r1.top + r1.height / 2
          });
          p2 = localizePoint({
            x: r2.left + r2.width / 2,
            y: r2.top + r2.height / 2
          });
          startPointerX -= p1.x - p2.x;
          startPointerY -= p1.y - p2.y;
        }
        if (!self2.isDragging) {
          self2.isDragging = dragged = true;
          _dispatchEvent(self2, "dragstart", "onDragStart");
        }
      };
      _this2.drag = onMove;
      _this2.endDrag = function(e) {
        return onRelease(e || self2.pointerEvent, true);
      };
      _this2.timeSinceDrag = function() {
        return self2.isDragging ? 0 : (_getTime() - dragEndTime) / 1e3;
      };
      _this2.timeSinceClick = function() {
        return (_getTime() - clickTime) / 1e3;
      };
      _this2.hitTest = function(target2, threshold) {
        return Draggable2.hitTest(self2.target, target2, threshold);
      };
      _this2.getDirection = function(from, diagonalThreshold) {
        var mode = from === "velocity" && InertiaPlugin ? from : _isObject3(from) && !rotationMode ? "element" : "start", xChange, yChange, ratio, direction, r1, r2;
        if (mode === "element") {
          r1 = _parseRect(self2.target);
          r2 = _parseRect(from);
        }
        xChange = mode === "start" ? self2.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);
        if (rotationMode) {
          return xChange < 0 ? "counter-clockwise" : "clockwise";
        } else {
          diagonalThreshold = diagonalThreshold || 2;
          yChange = mode === "start" ? self2.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
          ratio = Math.abs(xChange / yChange);
          direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";
          if (ratio < diagonalThreshold) {
            if (direction !== "") {
              direction += "-";
            }
            direction += yChange < 0 ? "up" : "down";
          }
        }
        return direction;
      };
      _this2.applyBounds = function(newBounds, sticky) {
        var x, y, forceZeroVelocity, e, parent, isRoot;
        if (newBounds && vars.bounds !== newBounds) {
          vars.bounds = newBounds;
          return self2.update(true, sticky);
        }
        syncXY(true);
        calculateBounds();
        if (hasBounds && !isTweening2()) {
          x = self2.x;
          y = self2.y;
          if (x > maxX) {
            x = maxX;
          } else if (x < minX) {
            x = minX;
          }
          if (y > maxY) {
            y = maxY;
          } else if (y < minY) {
            y = minY;
          }
          if (self2.x !== x || self2.y !== y) {
            forceZeroVelocity = true;
            self2.x = self2.endX = x;
            if (rotationMode) {
              self2.endRotation = x;
            } else {
              self2.y = self2.endY = y;
            }
            dirty = true;
            render4(true);
            if (self2.autoScroll && !self2.isDragging) {
              _recordMaxScrolls(target.parentNode);
              e = target;
              _windowProxy.scrollTop = _win4.pageYOffset != null ? _win4.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
              _windowProxy.scrollLeft = _win4.pageXOffset != null ? _win4.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
              while (e && !isRoot) {
                isRoot = _isRoot(e.parentNode);
                parent = isRoot ? _windowProxy : e.parentNode;
                if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                  parent.scrollTop = parent._gsMaxScrollY;
                }
                if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                  parent.scrollLeft = parent._gsMaxScrollX;
                }
                e = parent;
              }
            }
          }
          if (self2.isThrowing && (forceZeroVelocity || self2.endX > maxX || self2.endX < minX || self2.endY > maxY || self2.endY < minY)) {
            animate(vars.inertia || vars.throwProps, forceZeroVelocity);
          }
        }
        return self2;
      };
      _this2.update = function(applyBounds, sticky, ignoreExternalChanges) {
        if (sticky && self2.isPressed) {
          var m = getGlobalMatrix(target), p = innerMatrix.apply({
            x: self2.x - startElementX,
            y: self2.y - startElementY
          }), m2 = getGlobalMatrix(target.parentNode, true);
          m2.apply({
            x: m.e - p.x,
            y: m.f - p.y
          }, p);
          self2.x -= p.x - m2.e;
          self2.y -= p.y - m2.f;
          render4(true);
          recordStartPositions();
        }
        var x = self2.x, y = self2.y;
        updateMatrix(!sticky);
        if (applyBounds) {
          self2.applyBounds();
        } else {
          dirty && ignoreExternalChanges && render4(true);
          syncXY(true);
        }
        if (sticky) {
          setPointerPosition(self2.pointerX, self2.pointerY);
          dirty && render4(true);
        }
        if (self2.isPressed && !sticky && (allowX && Math.abs(x - self2.x) > 0.01 || allowY && Math.abs(y - self2.y) > 0.01 && !rotationMode)) {
          recordStartPositions();
        }
        if (self2.autoScroll) {
          _recordMaxScrolls(target.parentNode, self2.isDragging);
          checkAutoScrollBounds = self2.isDragging;
          render4(true);
          _removeScrollListener(target, updateScroll);
          _addScrollListener(target, updateScroll);
        }
        return self2;
      };
      _this2.enable = function(type2) {
        var setVars = {
          lazy: true
        }, id, i, trigger;
        if (vars.cursor !== false) {
          setVars.cursor = vars.cursor || _defaultCursor;
        }
        if (gsap2.utils.checkPrefix("touchCallout")) {
          setVars.touchCallout = "none";
        }
        if (type2 !== "soft") {
          _setTouchActionForAllDescendants(triggers, allowX === allowY ? "none" : vars.allowNativeTouchScrolling && target.scrollHeight === target.clientHeight === (target.scrollWidth === target.clientHeight) || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x");
          i = triggers.length;
          while (--i > -1) {
            trigger = triggers[i];
            _supportsPointer || _addListener(trigger, "mousedown", onPress);
            _addListener(trigger, "touchstart", onPress);
            _addListener(trigger, "click", onClick, true);
            gsap2.set(trigger, setVars);
            if (trigger.getBBox && trigger.ownerSVGElement && allowX !== allowY) {
              gsap2.set(trigger.ownerSVGElement, {
                touchAction: vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"
              });
            }
            vars.allowContextMenu || _addListener(trigger, "contextmenu", onContextMenu);
          }
          _setSelectable(triggers, false);
        }
        _addScrollListener(target, updateScroll);
        enabled = true;
        if (InertiaPlugin && type2 !== "soft") {
          InertiaPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
        }
        target._gsDragID = id = "d" + _lookupCount++;
        _lookup[id] = self2;
        if (scrollProxy) {
          scrollProxy.enable();
          scrollProxy.element._gsDragID = id;
        }
        (vars.bounds || rotationMode) && recordStartPositions();
        vars.bounds && self2.applyBounds();
        return self2;
      };
      _this2.disable = function(type2) {
        var dragging = self2.isDragging, i = triggers.length, trigger;
        while (--i > -1) {
          _setStyle(triggers[i], "cursor", null);
        }
        if (type2 !== "soft") {
          _setTouchActionForAllDescendants(triggers, null);
          i = triggers.length;
          while (--i > -1) {
            trigger = triggers[i];
            _setStyle(trigger, "touchCallout", null);
            _removeListener(trigger, "mousedown", onPress);
            _removeListener(trigger, "touchstart", onPress);
            _removeListener(trigger, "click", onClick, true);
            _removeListener(trigger, "contextmenu", onContextMenu);
          }
          _setSelectable(triggers, true);
          if (touchEventTarget) {
            _removeListener(touchEventTarget, "touchcancel", onRelease);
            _removeListener(touchEventTarget, "touchend", onRelease);
            _removeListener(touchEventTarget, "touchmove", onMove);
          }
          _removeListener(ownerDoc, "mouseup", onRelease);
          _removeListener(ownerDoc, "mousemove", onMove);
        }
        _removeScrollListener(target, updateScroll);
        enabled = false;
        if (InertiaPlugin && type2 !== "soft") {
          InertiaPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
          self2.tween && self2.tween.kill();
        }
        scrollProxy && scrollProxy.disable();
        _removeFromRenderQueue(render4);
        self2.isDragging = self2.isPressed = isClicking = false;
        dragging && _dispatchEvent(self2, "dragend", "onDragEnd");
        return self2;
      };
      _this2.enabled = function(value, type2) {
        return arguments.length ? value ? self2.enable(type2) : self2.disable(type2) : enabled;
      };
      _this2.kill = function() {
        self2.isThrowing = false;
        self2.tween && self2.tween.kill();
        self2.disable();
        gsap2.set(triggers, {
          clearProps: "userSelect"
        });
        delete _lookup[target._gsDragID];
        return self2;
      };
      _this2.revert = function() {
        this.kill();
        this.styles && this.styles.revert();
      };
      if (~type.indexOf("scroll")) {
        scrollProxy = _this2.scrollProxy = new ScrollProxy(target, _extend({
          onKill: function onKill() {
            self2.isPressed && onRelease(null);
          }
        }, vars));
        target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
        target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
        target = scrollProxy.content;
      }
      if (rotationMode) {
        killProps.rotation = 1;
      } else {
        if (allowX) {
          killProps[xProp] = 1;
        }
        if (allowY) {
          killProps[yProp] = 1;
        }
      }
      gsCache.force3D = "force3D" in vars ? vars.force3D : true;
      _context2(_assertThisInitialized2(_this2));
      _this2.enable();
      return _this2;
    }
    Draggable2.register = function register2(core) {
      gsap2 = core;
      _initCore3();
    };
    Draggable2.create = function create(targets, vars) {
      _coreInitted2 || _initCore3(true);
      return _toArray(targets).map(function(target) {
        return new Draggable2(target, vars);
      });
    };
    Draggable2.get = function get(target) {
      return _lookup[(_toArray(target)[0] || {})._gsDragID];
    };
    Draggable2.timeSinceDrag = function timeSinceDrag() {
      return (_getTime() - _lastDragTime) / 1e3;
    };
    Draggable2.hitTest = function hitTest(obj1, obj2, threshold) {
      if (obj1 === obj2) {
        return false;
      }
      var r1 = _parseRect(obj1), r2 = _parseRect(obj2), top = r1.top, left = r1.left, right = r1.right, bottom = r1.bottom, width = r1.width, height = r1.height, isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top, overlap, area, isRatio;
      if (isOutside || !threshold) {
        return !isOutside;
      }
      isRatio = (threshold + "").indexOf("%") !== -1;
      threshold = parseFloat(threshold) || 0;
      overlap = {
        left: Math.max(left, r2.left),
        top: Math.max(top, r2.top)
      };
      overlap.width = Math.min(right, r2.right) - overlap.left;
      overlap.height = Math.min(bottom, r2.bottom) - overlap.top;
      if (overlap.width < 0 || overlap.height < 0) {
        return false;
      }
      if (isRatio) {
        threshold *= 0.01;
        area = overlap.width * overlap.height;
        return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
      }
      return overlap.width > threshold && overlap.height > threshold;
    };
    return Draggable2;
  }(EventDispatcher);
  _setDefaults3(Draggable.prototype, {
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    isDragging: false,
    isPressed: false
  });
  Draggable.zIndex = 1e3;
  Draggable.version = "3.12.5";
  _getGSAP() && gsap2.registerPlugin(Draggable);

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/Flip.js
  init_live_reload();
  var _id = 1;
  var _toArray2;
  var gsap3;
  var _batch;
  var _batchAction;
  var _body3;
  var _closestTenth;
  var _getStyleSaver4;
  var _forEachBatch = function _forEachBatch2(batch, name) {
    return batch.actions.forEach(function(a) {
      return a.vars[name] && a.vars[name](a);
    });
  };
  var _batchLookup = {};
  var _RAD2DEG3 = 180 / Math.PI;
  var _DEG2RAD2 = Math.PI / 180;
  var _emptyObj = {};
  var _dashedNameLookup = {};
  var _memoizedRemoveProps = {};
  var _listToArray = function _listToArray2(list) {
    return typeof list === "string" ? list.split(" ").join("").split(",") : list;
  };
  var _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt");
  var _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight");
  var _getEl = function _getEl2(target) {
    return _toArray2(target)[0] || console.warn("Element not found:", target);
  };
  var _round5 = function _round6(value) {
    return Math.round(value * 1e4) / 1e4 || 0;
  };
  var _toggleClass = function _toggleClass2(targets, className, action) {
    return targets.forEach(function(el) {
      return el.classList[action](className);
    });
  };
  var _reserved = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
  };
  var _fitReserved = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
  };
  var _camelToDashed = function _camelToDashed2(p) {
    return p.replace(/([A-Z])/g, "-$1").toLowerCase();
  };
  var _copy3 = function _copy4(obj, exclude) {
    var result = {}, p;
    for (p in obj) {
      exclude[p] || (result[p] = obj[p]);
    }
    return result;
  };
  var _memoizedProps = {};
  var _memoizeProps = function _memoizeProps2(props) {
    var p = _memoizedProps[props] = _listToArray(props);
    _memoizedRemoveProps[props] = p.concat(_removeProps);
    return p;
  };
  var _getInverseGlobalMatrix = function _getInverseGlobalMatrix2(el) {
    var cache = el._gsap || gsap3.core.getCache(el);
    if (cache.gmCache === gsap3.ticker.frame) {
      return cache.gMatrix;
    }
    cache.gmCache = gsap3.ticker.frame;
    return cache.gMatrix = getGlobalMatrix(el, true, false, true);
  };
  var _getDOMDepth = function _getDOMDepth2(el, invert, level) {
    if (level === void 0) {
      level = 0;
    }
    var parent = el.parentNode, inc = 1e3 * Math.pow(10, level) * (invert ? -1 : 1), l = invert ? -inc * 900 : 0;
    while (el) {
      l += inc;
      el = el.previousSibling;
    }
    return parent ? l + _getDOMDepth2(parent, invert, level + 1) : l;
  };
  var _orderByDOMDepth = function _orderByDOMDepth2(comps, invert, isElStates) {
    comps.forEach(function(comp) {
      return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
    });
    comps.sort(function(c1, c2) {
      return c1.d - c2.d;
    });
    return comps;
  };
  var _recordInlineStyles = function _recordInlineStyles2(elState, props) {
    var style = elState.element.style, a = elState.css = elState.css || [], i = props.length, p, v;
    while (i--) {
      p = props[i];
      v = style[p] || style.getPropertyValue(p);
      a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
    }
    return style;
  };
  var _applyInlineStyles = function _applyInlineStyles2(state) {
    var css = state.css, style = state.element.style, i = 0;
    state.cache.uncache = 1;
    for (; i < css.length; i += 2) {
      css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
    }
    if (!css[css.indexOf("transform") + 1] && style.translate) {
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  };
  var _setFinalStates = function _setFinalStates2(comps, onlyTransforms) {
    comps.forEach(function(c) {
      return c.a.cache.uncache = 1;
    });
    onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
  };
  var _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(",");
  var _makeAbsolute = function _makeAbsolute2(elState, fallbackNode, ignoreBatch) {
    var element = elState.element, width = elState.width, height = elState.height, uncache = elState.uncache, getProp = elState.getProp, style = element.style, i = 4, result, displayIsNone, cs;
    typeof fallbackNode !== "object" && (fallbackNode = elState);
    if (_batch && ignoreBatch !== 1) {
      _batch._abs.push({
        t: element,
        b: elState,
        a: elState,
        sd: 0
      });
      _batch._final.push(function() {
        return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
      });
      return element;
    }
    displayIsNone = getProp("display") === "none";
    if (!elState.isVisible || displayIsNone) {
      displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
      elState.matrix = fallbackNode.matrix;
      elState.width = width = elState.width || fallbackNode.width;
      elState.height = height = elState.height || fallbackNode.height;
    }
    _recordInlineStyles(elState, _absoluteProps);
    cs = window.getComputedStyle(element);
    while (i--) {
      style[_absoluteProps[i]] = cs[_absoluteProps[i]];
    }
    style.gridArea = "1 / 1 / 1 / 1";
    style.transition = "none";
    style.position = "absolute";
    style.width = width + "px";
    style.height = height + "px";
    style.top || (style.top = "0px");
    style.left || (style.left = "0px");
    if (uncache) {
      result = new ElementState(element);
    } else {
      result = _copy3(elState, _emptyObj);
      result.position = "absolute";
      if (elState.simple) {
        var bounds = element.getBoundingClientRect();
        result.matrix = new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop());
      } else {
        result.matrix = getGlobalMatrix(element, false, false, true);
      }
    }
    result = _fit(result, elState, true);
    elState.x = _closestTenth(result.x, 0.01);
    elState.y = _closestTenth(result.y, 0.01);
    return element;
  };
  var _filterComps = function _filterComps2(comps, targets) {
    if (targets !== true) {
      targets = _toArray2(targets);
      comps = comps.filter(function(c) {
        if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
          return true;
        } else {
          c.t._gsap.renderTransform(1);
          if (c.b.isVisible) {
            c.t.style.width = c.b.width + "px";
            c.t.style.height = c.b.height + "px";
          }
        }
      });
    }
    return comps;
  };
  var _makeCompsAbsolute = function _makeCompsAbsolute2(comps) {
    return _orderByDOMDepth(comps, true).forEach(function(c) {
      return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
    });
  };
  var _findElStateInState = function _findElStateInState2(state, other) {
    return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
  };
  var _parseElementState = function _parseElementState2(elOrNode, props, simple, other) {
    return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
  };
  var _recordProps = function _recordProps2(elState, props) {
    var getProp = gsap3.getProperty(elState.element, null, "native"), obj = elState.props = {}, i = props.length;
    while (i--) {
      obj[props[i]] = (getProp(props[i]) + "").trim();
    }
    obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
    return elState;
  };
  var _applyProps = function _applyProps2(element, props) {
    var style = element.style || element, p;
    for (p in props) {
      style[p] = props[p];
    }
  };
  var _getID = function _getID2(el) {
    var id = el.getAttribute("data-flip-id");
    id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
    return id;
  };
  var _elementsFromElementStates = function _elementsFromElementStates2(elStates) {
    return elStates.map(function(elState) {
      return elState.element;
    });
  };
  var _handleCallback = function _handleCallback2(callback, elStates, tl) {
    return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
  };
  var _fit = function _fit2(fromState, toState, scale, applyProps, fitChild, vars) {
    var element = fromState.element, cache = fromState.cache, parent = fromState.parent, x = fromState.x, y = fromState.y, width = toState.width, height = toState.height, scaleX = toState.scaleX, scaleY = toState.scaleY, rotation = toState.rotation, bounds = toState.bounds, styles = vars && _getStyleSaver4 && _getStyleSaver4(element, "transform"), dimensionState = fromState, _toState$matrix = toState.matrix, e = _toState$matrix.e, f = _toState$matrix.f, deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation, simple = !deep && fromState.simple && toState.simple && !fitChild, skewX, fromPoint, toPoint, getProp, parentMatrix, matrix, bbox;
    if (simple || !parent) {
      scaleX = scaleY = 1;
      rotation = skewX = 0;
    } else {
      parentMatrix = _getInverseGlobalMatrix(parent);
      matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix);
      rotation = _round5(Math.atan2(matrix.b, matrix.a) * _RAD2DEG3);
      skewX = _round5(Math.atan2(matrix.c, matrix.d) * _RAD2DEG3 + rotation) % 360;
      scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
      scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD2);
      if (fitChild) {
        fitChild = _toArray2(fitChild)[0];
        getProp = gsap3.getProperty(fitChild);
        bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
        dimensionState = {
          scaleX: getProp("scaleX"),
          scaleY: getProp("scaleY"),
          width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
          height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
        };
      }
      cache.rotation = rotation + "deg";
      cache.skewX = skewX + "deg";
    }
    if (scale) {
      scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width;
      scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
      cache.scaleX = scaleX;
      cache.scaleY = scaleY;
    } else {
      width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
      height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
      element.style.width = width + "px";
      element.style.height = height + "px";
    }
    applyProps && _applyProps(element, toState.props);
    if (simple || !parent) {
      x += e - fromState.matrix.e;
      y += f - fromState.matrix.f;
    } else if (deep || parent !== toState.parent) {
      cache.renderTransform(1, cache);
      matrix = getGlobalMatrix(fitChild || element, false, false, true);
      fromPoint = parentMatrix.apply({
        x: matrix.e,
        y: matrix.f
      });
      toPoint = parentMatrix.apply({
        x: e,
        y: f
      });
      x += toPoint.x - fromPoint.x;
      y += toPoint.y - fromPoint.y;
    } else {
      parentMatrix.e = parentMatrix.f = 0;
      toPoint = parentMatrix.apply({
        x: e - fromState.matrix.e,
        y: f - fromState.matrix.f
      });
      x += toPoint.x;
      y += toPoint.y;
    }
    x = _closestTenth(x, 0.02);
    y = _closestTenth(y, 0.02);
    if (vars && !(vars instanceof ElementState)) {
      styles && styles.revert();
    } else {
      cache.x = x + "px";
      cache.y = y + "px";
      cache.renderTransform(1, cache);
    }
    if (vars) {
      vars.x = x;
      vars.y = y;
      vars.rotation = rotation;
      vars.skewX = skewX;
      if (scale) {
        vars.scaleX = scaleX;
        vars.scaleY = scaleY;
      } else {
        vars.width = width;
        vars.height = height;
      }
    }
    return vars || cache;
  };
  var _parseState = function _parseState2(targetsOrState, vars) {
    return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
  };
  var _getChangingElState = function _getChangingElState2(toState, fromState, id) {
    var to1 = toState.idLookup[id], to2 = toState.alt[id];
    return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
  };
  var _bodyMetrics = [];
  var _bodyProps = "width,height,overflowX,overflowY".split(",");
  var _bodyLocked;
  var _lockBodyScroll = function _lockBodyScroll2(lock) {
    if (lock !== _bodyLocked) {
      var s = _body3.style, w = _body3.clientWidth === window.outerWidth, h = _body3.clientHeight === window.outerHeight, i = 4;
      if (lock && (w || h)) {
        while (i--) {
          _bodyMetrics[i] = s[_bodyProps[i]];
        }
        if (w) {
          s.width = _body3.clientWidth + "px";
          s.overflowY = "hidden";
        }
        if (h) {
          s.height = _body3.clientHeight + "px";
          s.overflowX = "hidden";
        }
        _bodyLocked = lock;
      } else if (_bodyLocked) {
        while (i--) {
          _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
        }
        _bodyLocked = lock;
      }
    }
  };
  var _fromTo = function _fromTo2(fromState, toState, vars, relative) {
    fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
    vars = vars || {};
    var _vars = vars, clearProps2 = _vars.clearProps, onEnter = _vars.onEnter, onLeave = _vars.onLeave, absolute = _vars.absolute, absoluteOnLeave = _vars.absoluteOnLeave, custom = _vars.custom, delay = _vars.delay, paused = _vars.paused, repeat = _vars.repeat, repeatDelay = _vars.repeatDelay, yoyo = _vars.yoyo, toggleClass = _vars.toggleClass, nested = _vars.nested, _zIndex = _vars.zIndex, scale = _vars.scale, fade = _vars.fade, stagger = _vars.stagger, spin = _vars.spin, prune = _vars.prune, props = ("props" in vars ? vars : fromState).props, tweenVars = _copy3(vars, _reserved), animation = gsap3.timeline({
      delay,
      paused,
      repeat,
      repeatDelay,
      yoyo,
      data: "isFlip"
    }), remainingProps = tweenVars, entering = [], leaving = [], comps = [], swapOutTargets = [], spinNum = spin === true ? 1 : spin || 0, spinFunc = typeof spin === "function" ? spin : function() {
      return spinNum;
    }, interrupted = fromState.interrupted || toState.interrupted, addFunc = animation[relative !== 1 ? "to" : "from"], v, p, endTime, i, el, comp, state, targets, finalStates, fromNode, toNode, run, a, b;
    for (p in toState.idLookup) {
      toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
      el = toNode.element;
      fromNode = fromState.idLookup[p];
      fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
      if (fromNode) {
        comp = {
          t: el,
          b: fromNode,
          a: toNode,
          sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
        };
        comps.push(comp);
        if (comp.sd) {
          if (comp.sd < 0) {
            comp.b = toNode;
            comp.a = fromNode;
          }
          interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
          fade && comps.push(comp.swap = {
            t: fromNode.element,
            b: comp.b,
            a: comp.a,
            sd: -comp.sd,
            swap: comp
          });
        }
        el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
      } else if (toNode.isVisible) {
        comps.push({
          t: el,
          b: _copy3(toNode, {
            isVisible: 1
          }),
          a: toNode,
          sd: 0,
          entering: 1
        });
        el._flip = _batch ? _batch.timeline : animation;
      }
    }
    props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function(p2) {
      return tweenVars[p2] = function(i2) {
        return comps[i2].a.props[p2];
      };
    });
    comps.finalStates = finalStates = [];
    run = function run2() {
      _orderByDOMDepth(comps);
      _lockBodyScroll(true);
      for (i = 0; i < comps.length; i++) {
        comp = comps[i];
        a = comp.a;
        b = comp.b;
        if (prune && !a.isDifferent(b) && !comp.entering) {
          comps.splice(i--, 1);
        } else {
          el = comp.t;
          nested && !(comp.sd < 0) && i && (a.matrix = getGlobalMatrix(el, false, false, true));
          if (b.isVisible && a.isVisible) {
            if (comp.sd < 0) {
              state = new ElementState(el, props, fromState.simple);
              _fit(state, a, scale, 0, 0, state);
              state.matrix = getGlobalMatrix(el, false, false, true);
              state.css = comp.b.css;
              comp.a = a = state;
              fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
              stagger && swapOutTargets.push(el);
            } else if (comp.sd > 0 && fade) {
              el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
            }
            _fit(a, b, scale, props);
          } else if (b.isVisible !== a.isVisible) {
            if (!b.isVisible) {
              a.isVisible && entering.push(a);
              comps.splice(i--, 1);
            } else if (!a.isVisible) {
              b.css = a.css;
              leaving.push(b);
              comps.splice(i--, 1);
              absolute && nested && _fit(a, b, scale, props);
            }
          }
          if (!scale) {
            el.style.maxWidth = Math.max(a.width, b.width) + "px";
            el.style.maxHeight = Math.max(a.height, b.height) + "px";
            el.style.minWidth = Math.min(a.width, b.width) + "px";
            el.style.minHeight = Math.min(a.height, b.height) + "px";
          }
          nested && toggleClass && el.classList.add(toggleClass);
        }
        finalStates.push(a);
      }
      var classTargets;
      if (toggleClass) {
        classTargets = finalStates.map(function(s) {
          return s.element;
        });
        nested && classTargets.forEach(function(e) {
          return e.classList.remove(toggleClass);
        });
      }
      _lockBodyScroll(false);
      if (scale) {
        tweenVars.scaleX = function(i2) {
          return comps[i2].a.scaleX;
        };
        tweenVars.scaleY = function(i2) {
          return comps[i2].a.scaleY;
        };
      } else {
        tweenVars.width = function(i2) {
          return comps[i2].a.width + "px";
        };
        tweenVars.height = function(i2) {
          return comps[i2].a.height + "px";
        };
        tweenVars.autoRound = vars.autoRound || false;
      }
      tweenVars.x = function(i2) {
        return comps[i2].a.x + "px";
      };
      tweenVars.y = function(i2) {
        return comps[i2].a.y + "px";
      };
      tweenVars.rotation = function(i2) {
        return comps[i2].a.rotation + (spin ? spinFunc(i2, targets[i2], targets) * 360 : 0);
      };
      tweenVars.skewX = function(i2) {
        return comps[i2].a.skewX;
      };
      targets = comps.map(function(c) {
        return c.t;
      });
      if (_zIndex || _zIndex === 0) {
        tweenVars.modifiers = {
          zIndex: function zIndex() {
            return _zIndex;
          }
        };
        tweenVars.zIndex = _zIndex;
        tweenVars.immediateRender = vars.immediateRender !== false;
      }
      fade && (tweenVars.opacity = function(i2) {
        return comps[i2].sd < 0 ? 0 : comps[i2].sd > 0 ? comps[i2].a.opacity : "+=0";
      });
      if (swapOutTargets.length) {
        stagger = gsap3.utils.distribute(stagger);
        var dummyArray = targets.slice(swapOutTargets.length);
        tweenVars.stagger = function(i2, el2) {
          return stagger(~swapOutTargets.indexOf(el2) ? targets.indexOf(comps[i2].swap.t) : i2, el2, dummyArray);
        };
      }
      _callbacks.forEach(function(name) {
        return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
      });
      if (custom && targets.length) {
        remainingProps = _copy3(tweenVars, _reserved);
        if ("scale" in custom) {
          custom.scaleX = custom.scaleY = custom.scale;
          delete custom.scale;
        }
        for (p in custom) {
          v = _copy3(custom[p], _fitReserved);
          v[p] = tweenVars[p];
          !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
          v.stagger = tweenVars.stagger;
          addFunc.call(animation, targets, v, 0);
          delete remainingProps[p];
        }
      }
      if (targets.length || leaving.length || entering.length) {
        toggleClass && animation.add(function() {
          return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
        }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
        targets.length && addFunc.call(animation, targets, remainingProps, 0);
      }
      _handleCallback(onEnter, entering, animation);
      _handleCallback(onLeave, leaving, animation);
      var batchTl = _batch && _batch.timeline;
      if (batchTl) {
        batchTl.add(animation, 0);
        _batch._final.push(function() {
          return _setFinalStates(comps, !clearProps2);
        });
      }
      endTime = animation.duration();
      animation.call(function() {
        var forward = animation.time() >= endTime;
        forward && !batchTl && _setFinalStates(comps, !clearProps2);
        toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
      });
    };
    absoluteOnLeave && (absolute = comps.filter(function(comp2) {
      return !comp2.sd && !comp2.a.isVisible && comp2.b.isVisible;
    }).map(function(comp2) {
      return comp2.a.element;
    }));
    if (_batch) {
      var _batch$_abs;
      absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
      _batch._run.push(run);
    } else {
      absolute && _makeCompsAbsolute(_filterComps(comps, absolute));
      run();
    }
    var anim = _batch ? _batch.timeline : animation;
    anim.revert = function() {
      return _killFlip(anim, 1, 1);
    };
    return anim;
  };
  var _interrupt3 = function _interrupt4(tl) {
    tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
    tl.getChildren(true, false, true).forEach(_interrupt4);
  };
  var _killFlip = function _killFlip2(tl, action, force) {
    if (tl && tl.progress() < 1 && (!tl.paused() || force)) {
      if (action) {
        _interrupt3(tl);
        action < 2 && tl.progress(1);
        tl.kill();
      }
      return true;
    }
  };
  var _createLookup = function _createLookup2(state) {
    var lookup = state.idLookup = {}, alt = state.alt = {}, elStates = state.elementStates, i = elStates.length, elState;
    while (i--) {
      elState = elStates[i];
      lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
    }
  };
  var FlipState = /* @__PURE__ */ function() {
    function FlipState2(targets, vars, targetsAreElementStates) {
      this.props = vars && vars.props;
      this.simple = !!(vars && vars.simple);
      if (targetsAreElementStates) {
        this.targets = _elementsFromElementStates(targets);
        this.elementStates = targets;
        _createLookup(this);
      } else {
        this.targets = _toArray2(targets);
        var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
        _batch && !soft && _batch._kill.push(this);
        this.update(soft || !!_batch);
      }
    }
    var _proto = FlipState2.prototype;
    _proto.update = function update(soft) {
      var _this = this;
      this.elementStates = this.targets.map(function(el) {
        return new ElementState(el, _this.props, _this.simple);
      });
      _createLookup(this);
      this.interrupt(soft);
      this.recordInlineStyles();
      return this;
    };
    _proto.clear = function clear() {
      this.targets.length = this.elementStates.length = 0;
      _createLookup(this);
      return this;
    };
    _proto.fit = function fit(state, scale, nested) {
      var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true), toElStates = (state || this).idLookup, i = 0, fromNode, toNode;
      for (; i < elStatesInOrder.length; i++) {
        fromNode = elStatesInOrder[i];
        nested && (fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true));
        toNode = toElStates[fromNode.id];
        toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
        fromNode.matrix = getGlobalMatrix(fromNode.element, false, false, true);
      }
      return this;
    };
    _proto.getProperty = function getProperty2(element, property) {
      var es = this.getElementState(element) || _emptyObj;
      return (property in es ? es : es.props || _emptyObj)[property];
    };
    _proto.add = function add(state) {
      var i = state.targets.length, lookup = this.idLookup, alt = this.alt, index, es, es2;
      while (i--) {
        es = state.elementStates[i];
        es2 = lookup[es.id];
        if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
          index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
          this.targets.splice(index, 1, state.targets[i]);
          this.elementStates.splice(index, 1, es);
        } else {
          this.targets.push(state.targets[i]);
          this.elementStates.push(es);
        }
      }
      state.interrupted && (this.interrupted = true);
      state.simple || (this.simple = false);
      _createLookup(this);
      return this;
    };
    _proto.compare = function compare(state) {
      var l1 = state.idLookup, l2 = this.idLookup, unchanged = [], changed = [], enter = [], leave = [], targets = [], a1 = state.alt, a2 = this.alt, place = function place2(s12, s22, el2) {
        return (s12.isVisible !== s22.isVisible ? s12.isVisible ? enter : leave : s12.isVisible ? changed : unchanged).push(el2) && targets.push(el2);
      }, placeIfDoesNotExist = function placeIfDoesNotExist2(s12, s22, el2) {
        return targets.indexOf(el2) < 0 && place(s12, s22, el2);
      }, s1, s2, p, el, s1Alt, s2Alt, c1, c2;
      for (p in l1) {
        s1Alt = a1[p];
        s2Alt = a2[p];
        s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
        el = s1.element;
        s2 = l2[p];
        if (s2Alt) {
          c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
          c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1;
          if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
            (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
            targets.push(c1.element, c2.element);
          } else {
            place(c1, c2, c1.element);
          }
          s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
          placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
          placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
          s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
        } else {
          !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
          s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
        }
      }
      for (p in l2) {
        if (!l1[p]) {
          leave.push(l2[p].element);
          a2[p] && leave.push(a2[p].element);
        }
      }
      return {
        changed,
        unchanged,
        enter,
        leave
      };
    };
    _proto.recordInlineStyles = function recordInlineStyles() {
      var props = _memoizedRemoveProps[this.props] || _removeProps, i = this.elementStates.length;
      while (i--) {
        _recordInlineStyles(this.elementStates[i], props);
      }
    };
    _proto.interrupt = function interrupt(soft) {
      var _this2 = this;
      var timelines = [];
      this.targets.forEach(function(t) {
        var tl = t._flip, foundInProgress = _killFlip(tl, soft ? 0 : 1);
        soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function() {
          return _this2.updateVisibility();
        });
        foundInProgress && timelines.push(tl);
      });
      !soft && timelines.length && this.updateVisibility();
      this.interrupted || (this.interrupted = !!timelines.length);
    };
    _proto.updateVisibility = function updateVisibility() {
      this.elementStates.forEach(function(es) {
        var b = es.element.getBoundingClientRect();
        es.isVisible = !!(b.width || b.height || b.top || b.left);
        es.uncache = 1;
      });
    };
    _proto.getElementState = function getElementState(element) {
      return this.elementStates[this.targets.indexOf(_getEl(element))];
    };
    _proto.makeAbsolute = function makeAbsolute() {
      return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
    };
    return FlipState2;
  }();
  var ElementState = /* @__PURE__ */ function() {
    function ElementState2(element, props, simple) {
      this.element = element;
      this.update(props, simple);
    }
    var _proto2 = ElementState2.prototype;
    _proto2.isDifferent = function isDifferent(state) {
      var b1 = this.bounds, b2 = state.bounds;
      return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
    };
    _proto2.update = function update(props, simple) {
      var self2 = this, element = self2.element, getProp = gsap3.getProperty(element), cache = gsap3.core.getCache(element), bounds = element.getBoundingClientRect(), bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(), m = simple ? new Matrix2D(1, 0, 0, 1, bounds.left + _getDocScrollLeft(), bounds.top + _getDocScrollTop()) : getGlobalMatrix(element, false, false, true);
      self2.getProp = getProp;
      self2.element = element;
      self2.id = _getID(element);
      self2.matrix = m;
      self2.cache = cache;
      self2.bounds = bounds;
      self2.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
      self2.display = getProp("display");
      self2.position = getProp("position");
      self2.parent = element.parentNode;
      self2.x = getProp("x");
      self2.y = getProp("y");
      self2.scaleX = cache.scaleX;
      self2.scaleY = cache.scaleY;
      self2.rotation = getProp("rotation");
      self2.skewX = getProp("skewX");
      self2.opacity = getProp("opacity");
      self2.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04);
      self2.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
      props && _recordProps(self2, _memoizedProps[props] || _memoizeProps(props));
      self2.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && _getCTM(element).inverse();
      self2.simple = simple || _round5(m.a) === 1 && !_round5(m.b) && !_round5(m.c) && _round5(m.d) === 1;
      self2.uncache = 0;
    };
    return ElementState2;
  }();
  var FlipAction = /* @__PURE__ */ function() {
    function FlipAction2(vars, batch) {
      this.vars = vars;
      this.batch = batch;
      this.states = [];
      this.timeline = batch.timeline;
    }
    var _proto3 = FlipAction2.prototype;
    _proto3.getStateById = function getStateById(id) {
      var i = this.states.length;
      while (i--) {
        if (this.states[i].idLookup[id]) {
          return this.states[i];
        }
      }
    };
    _proto3.kill = function kill2() {
      this.batch.remove(this);
    };
    return FlipAction2;
  }();
  var FlipBatch = /* @__PURE__ */ function() {
    function FlipBatch2(id) {
      this.id = id;
      this.actions = [];
      this._kill = [];
      this._final = [];
      this._abs = [];
      this._run = [];
      this.data = {};
      this.state = new FlipState();
      this.timeline = gsap3.timeline();
    }
    var _proto4 = FlipBatch2.prototype;
    _proto4.add = function add(config3) {
      var result = this.actions.filter(function(action) {
        return action.vars === config3;
      });
      if (result.length) {
        return result[0];
      }
      result = new FlipAction(typeof config3 === "function" ? {
        animate: config3
      } : config3, this);
      this.actions.push(result);
      return result;
    };
    _proto4.remove = function remove(action) {
      var i = this.actions.indexOf(action);
      i >= 0 && this.actions.splice(i, 1);
      return this;
    };
    _proto4.getState = function getState(merge) {
      var _this3 = this;
      var prevBatch = _batch, prevAction = _batchAction;
      _batch = this;
      this.state.clear();
      this._kill.length = 0;
      this.actions.forEach(function(action) {
        if (action.vars.getState) {
          action.states.length = 0;
          _batchAction = action;
          action.state = action.vars.getState(action);
        }
        merge && action.states.forEach(function(s) {
          return _this3.state.add(s);
        });
      });
      _batchAction = prevAction;
      _batch = prevBatch;
      this.killConflicts();
      return this;
    };
    _proto4.animate = function animate() {
      var _this4 = this;
      var prevBatch = _batch, tl = this.timeline, i = this.actions.length, finalStates, endTime;
      _batch = this;
      tl.clear();
      this._abs.length = this._final.length = this._run.length = 0;
      this.actions.forEach(function(a) {
        a.vars.animate && a.vars.animate(a);
        var onEnter = a.vars.onEnter, onLeave = a.vars.onLeave, targets = a.targets, s, result;
        if (targets && targets.length && (onEnter || onLeave)) {
          s = new FlipState();
          a.states.forEach(function(state) {
            return s.add(state);
          });
          result = s.compare(Flip.getState(targets));
          result.enter.length && onEnter && onEnter(result.enter);
          result.leave.length && onLeave && onLeave(result.leave);
        }
      });
      _makeCompsAbsolute(this._abs);
      this._run.forEach(function(f) {
        return f();
      });
      endTime = tl.duration();
      finalStates = this._final.slice(0);
      tl.add(function() {
        if (endTime <= tl.time()) {
          finalStates.forEach(function(f) {
            return f();
          });
          _forEachBatch(_this4, "onComplete");
        }
      });
      _batch = prevBatch;
      while (i--) {
        this.actions[i].vars.once && this.actions[i].kill();
      }
      _forEachBatch(this, "onStart");
      tl.restart();
      return this;
    };
    _proto4.loadState = function loadState(done) {
      done || (done = function done2() {
        return 0;
      });
      var queue = [];
      this.actions.forEach(function(c) {
        if (c.vars.loadState) {
          var i, f = function f2(targets) {
            targets && (c.targets = targets);
            i = queue.indexOf(f2);
            if (~i) {
              queue.splice(i, 1);
              queue.length || done();
            }
          };
          queue.push(f);
          c.vars.loadState(f);
        }
      });
      queue.length || done();
      return this;
    };
    _proto4.setState = function setState() {
      this.actions.forEach(function(c) {
        return c.targets = c.vars.setState && c.vars.setState(c);
      });
      return this;
    };
    _proto4.killConflicts = function killConflicts(soft) {
      this.state.interrupt(soft);
      this._kill.forEach(function(state) {
        return state.interrupt(soft);
      });
      return this;
    };
    _proto4.run = function run(skipGetState, merge) {
      var _this5 = this;
      if (this !== _batch) {
        skipGetState || this.getState(merge);
        this.loadState(function() {
          if (!_this5._killed) {
            _this5.setState();
            _this5.animate();
          }
        });
      }
      return this;
    };
    _proto4.clear = function clear(stateOnly) {
      this.state.clear();
      stateOnly || (this.actions.length = 0);
    };
    _proto4.getStateById = function getStateById(id) {
      var i = this.actions.length, s;
      while (i--) {
        s = this.actions[i].getStateById(id);
        if (s) {
          return s;
        }
      }
      return this.state.idLookup[id] && this.state;
    };
    _proto4.kill = function kill2() {
      this._killed = 1;
      this.clear();
      delete _batchLookup[this.id];
    };
    return FlipBatch2;
  }();
  var Flip = /* @__PURE__ */ function() {
    function Flip2() {
    }
    Flip2.getState = function getState(targets, vars) {
      var state = _parseState(targets, vars);
      _batchAction && _batchAction.states.push(state);
      vars && vars.batch && Flip2.batch(vars.batch).state.add(state);
      return state;
    };
    Flip2.from = function from(state, vars) {
      vars = vars || {};
      "clearProps" in vars || (vars.clearProps = true);
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, -1);
    };
    Flip2.to = function to(state, vars) {
      return _fromTo(state, _parseState(vars.targets || state.targets, {
        props: vars.props || state.props,
        simple: vars.simple,
        kill: !!vars.kill
      }), vars, 1);
    };
    Flip2.fromTo = function fromTo(fromState, toState, vars) {
      return _fromTo(fromState, toState, vars);
    };
    Flip2.fit = function fit(fromEl, toEl, vars) {
      var v = vars ? _copy3(vars, _fitReserved) : {}, _ref = vars || v, absolute = _ref.absolute, scale = _ref.scale, getVars = _ref.getVars, props = _ref.props, runBackwards = _ref.runBackwards, onComplete = _ref.onComplete, simple = _ref.simple, fitChild = vars && vars.fitChild && _getEl(vars.fitChild), before = _parseElementState(toEl, props, simple, fromEl), after = _parseElementState(fromEl, 0, simple, before), inlineProps = props ? _memoizedRemoveProps[props] : _removeProps, ctx = gsap3.context();
      props && _applyProps(v, before.props);
      _recordInlineStyles(after, inlineProps);
      if (runBackwards) {
        "immediateRender" in v || (v.immediateRender = true);
        v.onComplete = function() {
          _applyInlineStyles(after);
          onComplete && onComplete.apply(this, arguments);
        };
      }
      absolute && _makeAbsolute(after, before);
      v = _fit(after, before, scale || fitChild, props, fitChild, v.duration || getVars ? v : 0);
      ctx && !getVars && ctx.add(function() {
        return function() {
          return _applyInlineStyles(after);
        };
      });
      return getVars ? v : v.duration ? gsap3.to(after.element, v) : null;
    };
    Flip2.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
      return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
    };
    Flip2.batch = function batch(id) {
      id || (id = "default");
      return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
    };
    Flip2.killFlipsOf = function killFlipsOf(targets, complete) {
      (targets instanceof FlipState ? targets.targets : _toArray2(targets)).forEach(function(t) {
        return t && _killFlip(t._flip, complete !== false ? 1 : 2);
      });
    };
    Flip2.isFlipping = function isFlipping(target) {
      var f = Flip2.getByTarget(target);
      return !!f && f.isActive();
    };
    Flip2.getByTarget = function getByTarget(target) {
      return (_getEl(target) || _emptyObj)._flip;
    };
    Flip2.getElementState = function getElementState(target, props) {
      return new ElementState(_getEl(target), props);
    };
    Flip2.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
      var m = getGlobalMatrix(toElement, true, true).multiply(getGlobalMatrix(fromElement));
      return point ? m.apply(point) : m;
    };
    Flip2.register = function register2(core) {
      _body3 = typeof document !== "undefined" && document.body;
      if (_body3) {
        gsap3 = core;
        _setDoc(_body3);
        _toArray2 = gsap3.utils.toArray;
        _getStyleSaver4 = gsap3.core.getStyleSaver;
        var snap3 = gsap3.utils.snap(0.1);
        _closestTenth = function _closestTenth2(value, add) {
          return snap3(parseFloat(value) + add);
        };
      }
    };
    return Flip2;
  }();
  Flip.version = "3.12.5";
  typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);

  // node_modules/.pnpm/gsap@3.12.5/node_modules/gsap/ScrollToPlugin.js
  init_live_reload();
  var gsap4;
  var _coreInitted3;
  var _window;
  var _docEl;
  var _body4;
  var _toArray3;
  var _config2;
  var ScrollTrigger;
  var _windowExists7 = function _windowExists8() {
    return typeof window !== "undefined";
  };
  var _getGSAP3 = function _getGSAP4() {
    return gsap4 || _windowExists7() && (gsap4 = window.gsap) && gsap4.registerPlugin && gsap4;
  };
  var _isString3 = function _isString4(value) {
    return typeof value === "string";
  };
  var _isFunction5 = function _isFunction6(value) {
    return typeof value === "function";
  };
  var _max = function _max2(element, axis) {
    var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
    return element === _window || element === _docEl || element === _body4 ? Math.max(_docEl[scroll], _body4[scroll]) - (_window["inner" + dim] || _docEl[client] || _body4[client]) : element[scroll] - element["offset" + dim];
  };
  var _buildGetter = function _buildGetter2(e, axis) {
    var p = "scroll" + (axis === "x" ? "Left" : "Top");
    if (e === _window) {
      if (e.pageXOffset != null) {
        p = "page" + axis.toUpperCase() + "Offset";
      } else {
        e = _docEl[p] != null ? _docEl : _body4;
      }
    }
    return function() {
      return e[p];
    };
  };
  var _clean = function _clean2(value, index, target, targets) {
    _isFunction5(value) && (value = value(index, target, targets));
    if (typeof value !== "object") {
      return _isString3(value) && value !== "max" && value.charAt(1) !== "=" ? {
        x: value,
        y: value
      } : {
        y: value
      };
    } else if (value.nodeType) {
      return {
        y: value,
        x: value
      };
    } else {
      var result = {}, p;
      for (p in value) {
        result[p] = p !== "onAutoKill" && _isFunction5(value[p]) ? value[p](index, target, targets) : value[p];
      }
      return result;
    }
  };
  var _getOffset = function _getOffset2(element, container) {
    element = _toArray3(element)[0];
    if (!element || !element.getBoundingClientRect) {
      return console.warn("scrollTo target doesn't exist. Using 0") || {
        x: 0,
        y: 0
      };
    }
    var rect = element.getBoundingClientRect(), isRoot = !container || container === _window || container === _body4, cRect = isRoot ? {
      top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body4.scrollTop || 0),
      left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body4.scrollLeft || 0)
    } : container.getBoundingClientRect(), offsets = {
      x: rect.left - cRect.left,
      y: rect.top - cRect.top
    };
    if (!isRoot && container) {
      offsets.x += _buildGetter(container, "x")();
      offsets.y += _buildGetter(container, "y")();
    }
    return offsets;
  };
  var _parseVal = function _parseVal2(value, target, axis, currentVal, offset) {
    return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset : _isString3(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset : value === "max" ? _max(target, axis) - offset : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset);
  };
  var _initCore5 = function _initCore6() {
    gsap4 = _getGSAP3();
    if (_windowExists7() && gsap4 && typeof document !== "undefined" && document.body) {
      _window = window;
      _body4 = document.body;
      _docEl = document.documentElement;
      _toArray3 = gsap4.utils.toArray;
      gsap4.config({
        autoKillThreshold: 7
      });
      _config2 = gsap4.config();
      _coreInitted3 = 1;
    }
  };
  var ScrollToPlugin = {
    version: "3.12.5",
    name: "scrollTo",
    rawVars: 1,
    register: function register(core) {
      gsap4 = core;
      _initCore5();
    },
    init: function init4(target, value, tween, index, targets) {
      _coreInitted3 || _initCore5();
      var data = this, snapType = gsap4.getProperty(target, "scrollSnapType");
      data.isWin = target === _window;
      data.target = target;
      data.tween = tween;
      value = _clean(value, index, target, targets);
      data.vars = value;
      data.autoKill = !!value.autoKill;
      data.getX = _buildGetter(target, "x");
      data.getY = _buildGetter(target, "y");
      data.x = data.xPrev = data.getX();
      data.y = data.yPrev = data.getY();
      ScrollTrigger || (ScrollTrigger = gsap4.core.globals().ScrollTrigger);
      gsap4.getProperty(target, "scrollBehavior") === "smooth" && gsap4.set(target, {
        scrollBehavior: "auto"
      });
      if (snapType && snapType !== "none") {
        data.snap = 1;
        data.snapInline = target.style.scrollSnapType;
        target.style.scrollSnapType = "none";
      }
      if (value.x != null) {
        data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets);
        data._props.push("scrollTo_x");
      } else {
        data.skipX = 1;
      }
      if (value.y != null) {
        data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets);
        data._props.push("scrollTo_y");
      } else {
        data.skipY = 1;
      }
    },
    render: function render3(ratio, data) {
      var pt = data._pt, target = data.target, tween = data.tween, autoKill = data.autoKill, xPrev = data.xPrev, yPrev = data.yPrev, isWin = data.isWin, snap3 = data.snap, snapInline = data.snapInline, x, y, yDif, xDif, threshold;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      x = isWin || !data.skipX ? data.getX() : xPrev;
      y = isWin || !data.skipY ? data.getY() : yPrev;
      yDif = y - yPrev;
      xDif = x - xPrev;
      threshold = _config2.autoKillThreshold;
      if (data.x < 0) {
        data.x = 0;
      }
      if (data.y < 0) {
        data.y = 0;
      }
      if (autoKill) {
        if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
          data.skipX = 1;
        }
        if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
          data.skipY = 1;
        }
        if (data.skipX && data.skipY) {
          tween.kill();
          data.vars.onAutoKill && data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
        }
      }
      if (isWin) {
        _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
      } else {
        data.skipY || (target.scrollTop = data.y);
        data.skipX || (target.scrollLeft = data.x);
      }
      if (snap3 && (ratio === 1 || ratio === 0)) {
        y = target.scrollTop;
        x = target.scrollLeft;
        snapInline ? target.style.scrollSnapType = snapInline : target.style.removeProperty("scroll-snap-type");
        target.scrollTop = y + 1;
        target.scrollLeft = x + 1;
        target.scrollTop = y;
        target.scrollLeft = x;
      }
      data.xPrev = data.x;
      data.yPrev = data.y;
      ScrollTrigger && ScrollTrigger.update();
    },
    kill: function kill(property) {
      var both = property === "scrollTo", i = this._props.indexOf(property);
      if (both || property === "scrollTo_x") {
        this.skipX = 1;
      }
      if (both || property === "scrollTo_y") {
        this.skipY = 1;
      }
      i > -1 && this._props.splice(i, 1);
      return !this._props.length;
    }
  };
  ScrollToPlugin.max = _max;
  ScrollToPlugin.getOffset = _getOffset;
  ScrollToPlugin.buildGetter = _buildGetter;
  _getGSAP3() && gsap4.registerPlugin(ScrollToPlugin);

  // src/components/video/cacheManager.ts
  init_live_reload();
  var VideoCacheManager = class _VideoCacheManager {
    constructor() {
      this.videoCache = /* @__PURE__ */ new Map();
      this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      this.startPreloading();
    }
    static getInstance() {
      if (!_VideoCacheManager.instance) {
        _VideoCacheManager.instance = new _VideoCacheManager();
      }
      return _VideoCacheManager.instance;
    }
    async startPreloading() {
      const videoUrls = Array.from(document.querySelectorAll("video source")).map((source) => source.getAttribute("src")).filter((src) => src !== null);
      if (this.isSafari) {
        videoUrls.forEach((url) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "video";
          link.href = url;
          document.head.appendChild(link);
        });
      } else {
        const batchSize = 3;
        for (let i = 0; i < videoUrls.length; i += batchSize) {
          const batch = videoUrls.slice(i, i + batchSize);
          await Promise.all(batch.map((url) => this.getVideo(url)));
        }
      }
    }
    async getVideo(url) {
      if (this.isSafari)
        return url;
      if (this.videoCache.has(url))
        return this.videoCache.get(url);
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        this.videoCache.set(url, objectUrl);
        return objectUrl;
      } catch (error) {
        console.warn(`Video fetch failed: ${url}`, error);
        return void 0;
      }
    }
    cleanup() {
      if (!this.isSafari) {
        this.videoCache.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
        this.videoCache.clear();
      }
    }
  };
  var videoCacheManager = VideoCacheManager.getInstance();

  // src/components/video/videoLoader.ts
  init_live_reload();
  async function initializeVideo(container, isPreloader = false) {
    const videos = container.querySelectorAll("video");
    const promises = Array.from(videos).map(async (video) => {
      if (video.dataset.initialized === "true")
        return;
      video.muted = false;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      if (isPreloader) {
        video.dataset.initialized = "true";
        return;
      }
      const sources = video.querySelectorAll("source");
      const sourcePromises = Array.from(sources).map(async (source) => {
        const originalSrc = source.getAttribute("src");
        if (!originalSrc)
          return;
        const cachedSrc = await videoCacheManager.getVideo(originalSrc);
        if (cachedSrc) {
          const newSource = document.createElement("source");
          newSource.src = cachedSrc;
          newSource.type = "video/mp4";
          source.parentNode?.replaceChild(newSource, source);
        }
      });
      await Promise.all(sourcePromises);
      video.load();
      video.dataset.initialized = "true";
    });
    await Promise.all(promises);
  }

  // src/components/WebGLGrid/ArchiveView.ts
  init_live_reload();

  // src/components/WebGLGrid/s3ImageLoader.ts
  init_live_reload();
  var S3ImageLoader = class _S3ImageLoader {
    constructor(config3) {
      this.imageCache = /* @__PURE__ */ new Map();
      this.config = config3;
    }
    static getInstance(config3) {
      if (!_S3ImageLoader.instance) {
        _S3ImageLoader.instance = new _S3ImageLoader(config3);
      }
      return _S3ImageLoader.instance;
    }
    async preloadBatch(urls, batchSize = 10) {
      const batches = [];
      for (let i = 0; i < urls.length; i += batchSize) {
        batches.push(urls.slice(i, i + batchSize));
      }
      return batches.reduce(async (promise, batch) => {
        await promise;
        console.log(`Loading batch of ${batch.length} images...`);
        return Promise.all(batch.map((url) => this.loadImage(url)));
      }, Promise.resolve());
    }
    async loadImagesFromBucket() {
      try {
        const prefix = this.config.prefix ? this.config.prefix.endsWith("/") ? this.config.prefix : `${this.config.prefix}/` : "";
        console.log("Using prefix:", prefix);
        const baseUrl = this.config.bucketUrl.endsWith("/") ? this.config.bucketUrl.slice(0, -1) : this.config.bucketUrl;
        console.log("Using base URL:", baseUrl);
        const listUrl = `${baseUrl}?list-type=2&prefix=${prefix}&delimiter=/`;
        console.log("Fetching from:", listUrl);
        const response = await fetch(listUrl, {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "*/*"
          }
        });
        console.log("S3 Response:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const contents = xmlDoc.getElementsByTagName("Contents");
        console.log("Found Contents nodes:", contents.length);
        const keys = Array.from(contents).map((content) => content.getElementsByTagName("Key")[0]?.textContent).filter((key) => key && /\.(jpg|jpeg|png|webp)$/i.test(key)).filter(Boolean);
        console.log("Found S3 keys:", keys);
        const urls = keys.map((key) => `${baseUrl}/${key}`);
        console.log("Generated image URLs:", urls);
        this.preloadBatch(urls).catch(console.error);
        return urls;
      } catch (error) {
        console.error("Failed to load images from S3:", error);
        return [];
      }
    }
    async loadImage(url) {
      if (this.imageCache.has(url))
        return;
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          console.log(`Successfully loaded: ${url}`);
          this.imageCache.set(url, url);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          resolve();
        };
        img.src = url;
      });
    }
    cleanup() {
      this.imageCache.clear();
    }
  };
  var initS3ImageLoader = (config3) => S3ImageLoader.getInstance(config3);

  // src/components/WebGLGrid/WebGLGrid.ts
  init_live_reload();

  // src/components/WebGLGrid/types.ts
  init_live_reload();

  // src/components/WebGLGrid/WebGLGrid.ts
  var WebGLGrid = class {
    constructor(canvas) {
      this.images = [];
      this.textures = /* @__PURE__ */ new Map();
      this.gridItems = [];
      this.isInitialized = false;
      this.isActive = false;
      this.isDragging = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.lastTouchX = 0;
      this.lastTouchY = 0;
      this.isZooming = false;
      this.zoomAnimation = null;
      this.momentum = { x: 0, y: 0 };
      this.targetX = 0;
      this.targetY = 0;
      this.multiplier = 2.5;
      this.viewportCenter = { x: 0, y: 0 };
      this.maxScale = 18;
      this.minScale = 0.6;
      this.maxImageWidth = 0.6;
      this.lastFrameItems = /* @__PURE__ */ new Map();
      this.frameCount = 0;
      this.viewTransform = {
        scale: 1,
        x: 0,
        y: 0
      };
      this.vertexShader = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    uniform mat4 u_matrix;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = u_matrix * a_position;
      v_texCoord = a_texCoord;
    }
  `;
      this.fragmentShader = `
    precision mediump float;
    uniform sampler2D u_texture;
    uniform float u_opacity;
    varying vec2 v_texCoord;
    void main() {
      vec4 texColor = texture2D(u_texture, v_texCoord);
      gl_FragColor = vec4(texColor.rgb, texColor.a * u_opacity);
    }
  `;
      this.render = () => {
        if (!this.isActive || !this.isInitialized)
          return;
        this.updatePosition();
        this.draw();
        requestAnimationFrame(this.render);
      };
      this.updateCanvasSize(canvas);
      this.gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false
      });
      if (!this.gl) {
        throw new Error("WebGL not supported");
      }
      this.setupWebGL();
      this.bindEvents(canvas);
      this.initMultiplier();
      this.updateViewportCenter();
    }
    isTabletViewport() {
      const { width } = this.gl.canvas.getBoundingClientRect();
      return width > 768 && width <= 1024;
    }
    isMobileViewport() {
      const { width } = this.gl.canvas.getBoundingClientRect();
      return width <= 768 || "ontouchstart" in window;
    }
    getResponsiveZoomLevels() {
      const isMobile = this.isMobileViewport();
      const isTablet = this.isTabletViewport();
      if (isMobile)
        return [1, 2, 5, 9, 18];
      if (isTablet)
        return [0.9, 1.5, 3.75, 7.5, 15];
      return [0.6, 1, 3, 6, 12];
    }
    getResponsiveMaxScale() {
      const zoomLevels = this.getResponsiveZoomLevels();
      return zoomLevels[zoomLevels.length - 1];
    }
    getNextZoomLevel(factor) {
      const zoomLevels = this.getResponsiveZoomLevels();
      const currentScale = this.viewTransform.scale;
      if (factor > 1) {
        for (const level of zoomLevels) {
          if (level > currentScale + 0.1) {
            return level;
          }
        }
        return zoomLevels[zoomLevels.length - 1];
      }
      for (let i = zoomLevels.length - 1; i >= 0; i--) {
        if (zoomLevels[i] < currentScale - 0.1) {
          return zoomLevels[i];
        }
      }
      return zoomLevels[0];
    }
    initMultiplier() {
      const { width } = this.gl.canvas.getBoundingClientRect();
      this.multiplier = width <= 768 || "ontouchstart" in window ? 4.5 : 2.5;
    }
    updateCanvasSize(canvas) {
      const pixelRatio = window.devicePixelRatio;
      const rect = canvas.getBoundingClientRect();
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
    }
    updateViewportCenter() {
      const { width, height } = this.gl.canvas;
      this.viewportCenter = {
        x: width / 2,
        y: height / 2
      };
    }
    setupWebGL() {
      const { gl } = this;
      const vertShader = this.createShader(this.vertexShader, gl.VERTEX_SHADER);
      const fragShader = this.createShader(this.fragmentShader, gl.FRAGMENT_SHADER);
      this.program = this.createProgram(vertShader, fragShader);
      this.locations = {
        position: gl.getAttribLocation(this.program, "a_position"),
        texCoord: gl.getAttribLocation(this.program, "a_texCoord"),
        matrix: gl.getUniformLocation(this.program, "u_matrix"),
        texture: gl.getUniformLocation(this.program, "u_texture"),
        opacity: gl.getUniformLocation(this.program, "u_opacity")
      };
      this.buffers = {
        position: gl.createBuffer(),
        texCoord: gl.createBuffer()
      };
      const positions = new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1]);
      const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clearColor(0.059, 0.059, 0.059, 1);
    }
    createShader(source, type) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        throw new Error(`Shader compile error: ${this.gl.getShaderInfoLog(shader)}`);
      }
      return shader;
    }
    createProgram(vertShader, fragShader) {
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertShader);
      this.gl.attachShader(program, fragShader);
      this.gl.linkProgram(program);
      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        throw new Error(`Program link error: ${this.gl.getProgramInfoLog(program)}`);
      }
      return program;
    }
    bindEvents(canvas) {
      const boundMouseDown = this.handleMouseDown.bind(this);
      const boundMouseMove = this.handleMouseMove.bind(this);
      const boundMouseUp = this.handleMouseUp.bind(this);
      const boundTouchStart = this.handleTouchStart.bind(this);
      const boundTouchMove = this.handleTouchMove.bind(this);
      const boundTouchEnd = this.handleTouchEnd.bind(this);
      canvas.addEventListener("mousedown", boundMouseDown);
      window.addEventListener("mousemove", boundMouseMove);
      window.addEventListener("mouseup", boundMouseUp);
      canvas.addEventListener("touchstart", boundTouchStart, { passive: false });
      window.addEventListener("touchmove", boundTouchMove, { passive: false });
      window.addEventListener("touchend", boundTouchEnd);
      this.boundEvents = {
        mouseDown: boundMouseDown,
        mouseMove: boundMouseMove,
        mouseUp: boundMouseUp,
        touchStart: boundTouchStart,
        touchMove: boundTouchMove,
        touchEnd: boundTouchEnd
      };
      canvas.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
    }
    handleMouseDown(e) {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.momentum = { x: 0, y: 0 };
      this.targetX = this.viewTransform.x;
      this.targetY = this.viewTransform.y;
      const canvas = e.target;
      canvas.style.cursor = "grabbing";
    }
    handleMouseMove(e) {
      if (!this.isDragging)
        return;
      const deltaX = (e.clientX - this.lastMouseX) * this.multiplier;
      const deltaY = (e.clientY - this.lastMouseY) * this.multiplier;
      this.handleDrag(deltaX, deltaY);
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }
    handleMouseUp() {
      this.isDragging = false;
      const canvas = this.gl.canvas;
      canvas.style.cursor = "grab";
    }
    handleTouchStart(e) {
      e.preventDefault();
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
        this.momentum = { x: 0, y: 0 };
        this.targetX = this.viewTransform.x;
        this.targetY = this.viewTransform.y;
      }
    }
    handleTouchMove(e) {
      e.preventDefault();
      if (!this.isDragging || e.touches.length !== 1)
        return;
      const deltaX = (e.touches[0].clientX - this.lastMouseX) * this.multiplier;
      const deltaY = (e.touches[0].clientY - this.lastMouseY) * this.multiplier;
      this.handleDrag(deltaX, deltaY);
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
    }
    handleTouchEnd() {
      this.isDragging = false;
    }
    handleDrag(deltaX, deltaY) {
      this.targetX += deltaX;
      this.targetY += deltaY;
      this.momentum = {
        x: deltaX,
        y: deltaY
      };
    }
    updatePosition() {
      if (this.isZooming)
        return;
      const easing = 0.085;
      if (!this.isDragging) {
        const friction = 0.95;
        this.momentum.x *= friction;
        this.momentum.y *= friction;
        if (Math.abs(this.momentum.x) > 0.01 || Math.abs(this.momentum.y) > 0.01) {
          this.targetX += this.momentum.x;
          this.targetY += this.momentum.y;
        }
      }
      const dx = this.targetX - this.viewTransform.x;
      const dy = this.targetY - this.viewTransform.y;
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        this.viewTransform.x += dx * easing;
        this.viewTransform.y += dy * easing;
      } else {
        this.viewTransform.x = this.targetX;
        this.viewTransform.y = this.targetY;
      }
      this.viewTransform.x = Math.round(this.viewTransform.x * 100) / 100;
      this.viewTransform.y = Math.round(this.viewTransform.y * 100) / 100;
      this.updateGridPositions();
    }
    async loadImages(imageUrls) {
      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const texture = this.createTexture(img);
            this.textures.set(url, texture);
            resolve({
              url,
              element: img,
              width: img.naturalWidth,
              height: img.naturalHeight,
              color: "#000000"
            });
          };
          img.onerror = reject;
          img.src = url;
        });
      });
      this.images = await Promise.all(loadPromises);
    }
    createTexture(image) {
      const { gl } = this;
      const texture = gl.createTexture();
      const canvas = document.createElement("canvas");
      const size = Math.pow(2, Math.ceil(Math.log2(Math.max(image.width, image.height))));
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size, size);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return texture;
    }
    calculateImageDimensions(image, containerWidth, containerHeight) {
      const imageAspect = image.width / image.height;
      const containerAspect = containerWidth / containerHeight;
      const maxWidth = containerWidth * this.maxImageWidth;
      let width;
      let height;
      if (imageAspect > containerAspect) {
        width = Math.min(containerWidth, maxWidth);
        height = width / imageAspect;
      } else {
        height = containerHeight;
        width = Math.min(height * imageAspect, maxWidth);
      }
      const offsetY = 0;
      return { width, height, offsetY };
    }
    calculateGridDimensions(options) {
      const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
      const maxItemWidth = canvasWidth * this.maxImageWidth;
      const itemWidth = Math.min(maxItemWidth, canvasWidth / (options.columnCount + 1));
      const itemHeight = itemWidth * 0.75;
      const padding = itemWidth * 0.6;
      const zoomBuffer = 12;
      const minColumns = Math.ceil(canvasWidth / (itemWidth + padding)) + zoomBuffer;
      const minRows = Math.ceil(canvasHeight / (itemHeight + padding)) + zoomBuffer;
      this.dimensions = {
        itemWidth,
        itemHeight,
        padding,
        columnCount: Math.max(options.columnCount, minColumns),
        rowCount: Math.max(options.rowCount, minRows),
        totalWidth: Math.max(options.columnCount, minColumns) * (itemWidth + padding),
        totalHeight: Math.max(options.rowCount, minRows) * (itemHeight + padding)
      };
    }
    createBaseGrid(imageCount, columnsPerGrid) {
      const sequence = Array.from({ length: imageCount }, (_, i) => i);
      for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
      }
      return sequence;
    }
    updateGridPositions() {
      const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
      const viewScale = this.viewTransform.scale;
      let bufferFactor;
      if (viewScale >= 14)
        bufferFactor = 4;
      else if (viewScale >= 9)
        bufferFactor = 3;
      else if (viewScale >= 4)
        bufferFactor = 2;
      else if (viewScale <= 0.5)
        bufferFactor = 6;
      else
        bufferFactor = 1.5;
      const visibleWidth = canvasWidth / viewScale * bufferFactor;
      const visibleHeight = canvasHeight / viewScale * bufferFactor;
      const worldCenterX = -this.viewTransform.x / viewScale + canvasWidth / 2 / viewScale;
      const worldCenterY = -this.viewTransform.y / viewScale + canvasHeight / 2 / viewScale;
      const gridWidth = this.dimensions.totalWidth;
      const gridHeight = this.dimensions.totalHeight;
      this.gridItems.forEach((item) => {
        const relativeX = item.x - worldCenterX;
        const relativeY = item.y - worldCenterY;
        const wrapX = Math.floor((relativeX + visibleWidth / 2) / gridWidth);
        const wrapY = Math.floor((relativeY + visibleHeight / 2) / gridHeight);
        if (wrapX !== 0)
          item.x -= wrapX * gridWidth;
        if (wrapY !== 0)
          item.y -= wrapY * gridHeight;
      });
      if (viewScale > 4) {
        this.momentum.x *= 0.5;
        this.momentum.y *= 0.5;
      }
    }
    setupGrid(options) {
      this.calculateGridDimensions(options);
      this.gridItems = [];
      const baseColumns = this.dimensions.columnCount;
      const baseRows = Math.max(
        Math.ceil(this.images.length / baseColumns),
        this.dimensions.rowCount
      );
      const baseGridPattern = this.createBaseGrid(this.images.length, baseColumns);
      const startCol = Math.floor(-this.dimensions.columnCount / 2);
      const startRow = Math.floor(-this.dimensions.rowCount / 2);
      const cellWidth = this.dimensions.itemWidth + this.dimensions.padding;
      const cellHeight = this.dimensions.itemHeight + this.dimensions.padding;
      const occupiedPositions = /* @__PURE__ */ new Set();
      for (let row = startRow; row <= startRow + this.dimensions.rowCount; row++) {
        for (let col = startCol; col <= startCol + this.dimensions.columnCount; col++) {
          const wrappedRow = (row % baseRows + baseRows) % baseRows;
          const wrappedCol = (col % baseColumns + baseColumns) % baseColumns;
          const baseIndex = wrappedRow * baseColumns + wrappedCol;
          const imageIndex = baseGridPattern[baseIndex % this.images.length];
          const x = col * cellWidth;
          const y = row * cellHeight;
          const posKey = `${Math.round(x)},${Math.round(y)}`;
          if (!occupiedPositions.has(posKey)) {
            occupiedPositions.add(posKey);
            this.gridItems.push({
              x,
              y,
              width: this.dimensions.itemWidth,
              height: this.dimensions.itemHeight,
              imageIndex,
              opacity: 1,
              velocity: { x: 0, y: 0 }
            });
          }
        }
      }
      const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
      this.viewTransform = {
        scale: this.isMobileViewport() ? 2 : this.isTabletViewport() ? 1.5 : 1,
        x: canvasWidth / 2,
        y: canvasHeight / 2
      };
    }
    setZoom(factor, originX, originY) {
      const canvas = this.gl.canvas;
      const rect = canvas.getBoundingClientRect();
      const zoomLevels = this.getResponsiveZoomLevels();
      if (this.viewTransform.scale >= zoomLevels[zoomLevels.length - 1] && factor > 1)
        return;
      if (this.viewTransform.scale <= zoomLevels[0] && factor < 1)
        return;
      const pixelRatio = window.devicePixelRatio;
      const centerX = rect.width * pixelRatio / 2;
      const centerY = rect.height * pixelRatio / 2;
      const newScale = this.getNextZoomLevel(factor);
      if (Math.abs(newScale - this.viewTransform.scale) < 1e-3)
        return;
      const worldCenterX = (centerX - this.viewTransform.x) / this.viewTransform.scale;
      const worldCenterY = (centerY - this.viewTransform.y) / this.viewTransform.scale;
      const newX = centerX - worldCenterX * newScale;
      const newY = centerY - worldCenterY * newScale;
      if (this.zoomAnimation) {
        this.zoomAnimation.kill();
      }
      this.isZooming = true;
      this.targetX = newX;
      this.targetY = newY;
      this.zoomAnimation = gsapWithCSS.to(this.viewTransform, {
        scale: newScale,
        x: newX,
        y: newY,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          this.updateGridPositions();
        },
        onComplete: () => {
          this.isZooming = false;
          this.zoomAnimation = null;
          this.targetX = this.viewTransform.x;
          this.targetY = this.viewTransform.y;
          this.momentum = { x: 0, y: 0 };
        }
      });
    }
    createMatrix(item, width, height, xOffset, yOffset) {
      const matrix = new Float32Array(16);
      const { width: canvasWidth, height: canvasHeight } = this.gl.canvas;
      const finalWidth = width * this.viewTransform.scale;
      const finalHeight = height * this.viewTransform.scale;
      const finalX = (item.x + xOffset) * this.viewTransform.scale + this.viewTransform.x;
      const finalY = (item.y + yOffset) * this.viewTransform.scale + this.viewTransform.y;
      matrix[0] = finalWidth * 2 / canvasWidth;
      matrix[5] = finalHeight * 2 / canvasHeight;
      matrix[12] = finalX * 2 / canvasWidth - 1;
      matrix[13] = -finalY * 2 / canvasHeight + 1;
      matrix[15] = 1;
      return matrix;
    }
    draw() {
      const { gl } = this;
      if (!gl || !this.program)
        return;
      this.frameCount++;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.program);
      gl.enableVertexAttribArray(this.locations.position);
      gl.enableVertexAttribArray(this.locations.texCoord);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
      gl.vertexAttribPointer(this.locations.position, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texCoord);
      gl.vertexAttribPointer(this.locations.texCoord, 2, gl.FLOAT, false, 0, 0);
      const sortedItems = [...this.gridItems].filter((item) => item.opacity > 0).sort((a, b) => a.imageIndex - b.imageIndex);
      let currentTexture = null;
      const newFrameItems = /* @__PURE__ */ new Map();
      sortedItems.forEach((item) => {
        const image = this.images[item.imageIndex];
        if (!image)
          return;
        const texture = this.textures.get(image.url);
        if (!texture)
          return;
        const itemKey = `${Math.round(item.x)}-${Math.round(item.y)}-${item.imageIndex}`;
        newFrameItems.set(itemKey, item);
        const lastItem = this.lastFrameItems.get(itemKey);
        const targetOpacity = item.opacity;
        item.opacity = lastItem ? lastItem.opacity + (targetOpacity - lastItem.opacity) * 0.3 : targetOpacity;
        if (texture !== currentTexture) {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1i(this.locations.texture, 0);
          currentTexture = texture;
        }
        const dimensions = this.calculateImageDimensions(image, item.width, item.height);
        const xOffset = (item.width - dimensions.width) / 2;
        const yOffset = dimensions.offsetY || 0;
        gl.uniform1f(this.locations.opacity, item.opacity);
        const matrix = this.createMatrix(item, dimensions.width, dimensions.height, xOffset, yOffset);
        gl.uniformMatrix4fv(this.locations.matrix, false, matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      });
      this.lastFrameItems = newFrameItems;
    }
    async init(options) {
      await this.loadImages(options.images);
      this.setupGrid(options);
      this.isInitialized = true;
    }
    start() {
      if (!this.isInitialized)
        return;
      this.isActive = true;
      this.render();
    }
    resize(width, height) {
      const canvas = this.gl.canvas;
      const pixelRatio = window.devicePixelRatio;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      this.gl.viewport(0, 0, canvas.width, canvas.height);
      this.updateViewportCenter();
      if (this.isInitialized) {
        this.setupGrid({
          columnCount: this.dimensions.columnCount,
          rowCount: this.dimensions.rowCount,
          images: this.images.map((img) => img.url),
          pixelRatio
        });
      }
    }
    destroy() {
      this.isActive = false;
      const { gl } = this;
      const canvas = gl.canvas;
      this.textures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
      this.textures.clear();
      gl.deleteBuffer(this.buffers.position);
      gl.deleteBuffer(this.buffers.texCoord);
      gl.useProgram(null);
      gl.deleteProgram(this.program);
      if (this.boundEvents) {
        canvas.removeEventListener("mousedown", this.boundEvents.mouseDown);
        window.removeEventListener("mousemove", this.boundEvents.mouseMove);
        window.removeEventListener("mouseup", this.boundEvents.mouseUp);
        canvas.removeEventListener("touchstart", this.boundEvents.touchStart);
        window.removeEventListener("touchmove", this.boundEvents.touchMove);
        window.removeEventListener("touchend", this.boundEvents.touchEnd);
      }
    }
  };

  // src/components/WebGLGrid/ArchiveView.ts
  var ArchiveView = class {
    constructor(container) {
      this.canvas = null;
      this.grid = null;
      this.images = [];
      this.resizeObserver = null;
      this.zoomUI = null;
      this.isTransitioning = false;
      this.cleanup = null;
      this.handleResize = () => {
        if (!this.canvas || !this.grid)
          return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.grid.resize(rect.width, rect.height);
      };
      this.container = container;
      console.log("ArchiveView initialized with container:", container);
      const firstImage = container.querySelector(".cms-image");
      if (!firstImage) {
        console.error(
          "No .cms-image elements found in container. Container HTML:",
          container.innerHTML
        );
        return;
      }
      console.log("Found CMS Image element:", firstImage);
      console.log("Image data attributes:", {
        bucket: firstImage.dataset.s3Bucket,
        prefix: firstImage.dataset.s3Prefix,
        color: firstImage.dataset.color
      });
      this.s3Config = {
        bucketUrl: firstImage.dataset.s3Bucket || "",
        prefix: firstImage.dataset.s3Prefix || ""
      };
      this.setupStyles();
      this.setupViewportDetection();
      this.createZoomUI();
      gsapWithCSS.set(container, { autoAlpha: 0 });
      console.log("Stored S3 config:", this.s3Config);
    }
    setupViewportDetection() {
      const viewportUnitsSupported = CSS.supports("height", "100svh");
      document.documentElement.dataset.viewportUnits = viewportUnitsSupported ? "svh" : "vh";
      if (!viewportUnitsSupported) {
        const updateVh = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty("--vh", `${vh}px`);
        };
        updateVh();
        window.addEventListener("resize", updateVh);
        window.addEventListener("orientationchange", () => {
          setTimeout(updateVh, 100);
        });
        this.cleanup = () => {
          window.removeEventListener("resize", updateVh);
          window.removeEventListener("orientationchange", updateVh);
        };
      }
    }
    setupStyles() {
      const style = document.createElement("style");
      style.setAttribute("data-archive-styles", "");
      style.textContent = `
      .archive-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh; /* Fallback */
        height: 100svh; /* Small viewport height */
        overflow: hidden;
        background: #0f0f0f;
        z-index: 1;
      }

      @supports not (height: 100svh) {
        .archive-container {
          height: calc(var(--vh, 1vh) * 100);
        }
      }

      .archive-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        display: block;
        cursor: grab;
        touch-action: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
      }

      .archive-canvas:active {
        cursor: grabbing;
      }

      .archive-zoom {
  position: fixed;
  z-index: 9999;
  display: flex;
  pointer-events: auto;
  transition: transform 0.3s ease;
  bottom: max(2rem, 5svh);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  left: 50%;
  transform: translateX(-50%);
  will-change: transform;
}

      @supports not (bottom: 5svh) {
  .archive-zoom {
    bottom: max(2rem, calc(var(--vh, 1vh) * 5));
  }
}

.zoom-button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.75rem;
  background-color: #424242;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
}

.zoom-button svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Desktop hover */
@media (hover: hover) and (pointer: fine) {
  .zoom-button:hover {
    background-color: #2B2B2B;
  }
}

/* Touch/click state for all devices */
.zoom-button:active {
  background-color: #2B2B2B;
}

/* Responsive zoom button sizes */
@media (max-width: 1024px) {
  .zoom-button {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.85rem;
  }
}

@media (max-width: 768px) {
  .zoom-button {
    width: 3rem;
    height: 3rem;
    padding: 0.9rem;
  }
  .archive-zoom {
    bottom: max(2rem, 7svh);
  }
}

@media (max-width: 479px) {
  .zoom-button {
    width: 3.25rem;
    height: 3.25rem;
    padding: 1rem;
  }
    `;
      document.head.appendChild(style);
    }
    createZoomUI() {
      this.zoomUI = document.createElement("div");
      this.zoomUI.className = "archive-zoom";
      gsapWithCSS.set(this.zoomUI, {
        autoAlpha: 0,
        visibility: "visible"
      });
      const zoomOutBtn = this.createZoomButton(
        "out",
        `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
        <path d="M1 7H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `
      );
      const zoomInBtn = this.createZoomButton(
        "in",
        `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
        <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>
    `
      );
      this.zoomUI.appendChild(zoomOutBtn);
      this.zoomUI.appendChild(zoomInBtn);
      document.body.appendChild(this.zoomUI);
      zoomOutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleZoom(0.8);
      });
      zoomInBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleZoom(1.2);
      });
    }
    createZoomButton(type, svg) {
      const button = document.createElement("button");
      button.className = "zoom-button";
      button.setAttribute("data-zoom", type);
      button.setAttribute("aria-label", `Zoom ${type}`);
      button.innerHTML = svg;
      return button;
    }
    handleZoom(factor) {
      if (!this.grid || !this.canvas)
        return;
      const rect = this.canvas.getBoundingClientRect();
      const center = {
        x: rect.width / 2,
        y: rect.height / 2
      };
      this.grid.setZoom(factor, center.x, center.y);
    }
    // In ArchiveView.ts, keep only this version of init()
    async init() {
      try {
        console.log("ArchiveView init started");
        this.isTransitioning = true;
        if (!this.s3Config.bucketUrl) {
          throw new Error("No S3 bucket URL provided");
        }
        console.log("Loading images from S3...");
        const s3Loader = initS3ImageLoader(this.s3Config);
        this.images = await s3Loader.loadImagesFromBucket();
        console.log("Loaded URLs:", this.images);
        console.log("Initializing container");
        await this.initializeContainer();
        console.log("Initializing grid with image count:", this.images.length);
        await this.initializeGrid();
        console.log("Setting up resize observer");
        this.setupResizeObserver();
        this.isTransitioning = false;
        console.log("ArchiveView init completed");
      } catch (error) {
        console.error("Failed to initialize archive view:", error);
        throw error;
      }
    }
    async initializeContainer() {
      let archiveContainer = this.container.querySelector("#archive-container");
      if (!archiveContainer) {
        archiveContainer = document.createElement("div");
        archiveContainer.id = "archive-container";
        archiveContainer.className = "archive-container";
        this.container.appendChild(archiveContainer);
      }
      if (!this.canvas) {
        this.canvas = document.createElement("canvas");
        this.canvas.className = "archive-canvas";
        archiveContainer.appendChild(this.canvas);
      }
    }
    async initializeGrid() {
      if (!this.canvas)
        throw new Error("Canvas not initialized");
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      this.grid = new WebGLGrid(this.canvas);
      await this.grid.init({
        images: this.images,
        columnCount: isMobile ? 2 : 3,
        rowCount: isMobile ? 3 : 4,
        pixelRatio: window.devicePixelRatio
      });
    }
    setupResizeObserver() {
      if (!this.canvas)
        return;
      this.resizeObserver = new ResizeObserver(
        this.debounce(() => {
          this.handleResize();
        }, 150)
      );
      this.resizeObserver.observe(this.canvas);
    }
    debounce(func, wait) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
    show() {
      console.log("Show method called", {
        hasCanvas: !!this.canvas,
        hasGrid: !!this.grid,
        zoomUI: !!this.zoomUI
      });
      if (!this.canvas || !this.grid) {
        console.error("Show called but canvas or grid is missing");
        return;
      }
      gsapWithCSS.set([this.canvas, this.zoomUI], {
        autoAlpha: 0,
        visibility: "visible"
        // Set visibility here to prevent layout shifts
      });
      this.grid.start();
      const tl = gsapWithCSS.timeline({
        defaults: {
          duration: 1,
          ease: "power2.inOut"
        },
        onComplete: () => console.log("Show animation completed")
      });
      tl.to([this.canvas, this.zoomUI], {
        autoAlpha: 1,
        stagger: 0
      });
    }
    async fadeOut() {
      return new Promise((resolve) => {
        if (!this.canvas && !this.zoomUI)
          return resolve();
        const tl = gsapWithCSS.timeline({
          onComplete: resolve
        });
        tl.to([this.canvas, this.zoomUI], {
          autoAlpha: 0,
          duration: 1.5,
          // Match the page transition duration
          ease: "expo.inOut"
          // Match the page transition ease
        });
      });
    }
    destroy() {
      if (this.grid) {
        this.grid.destroy();
        this.grid = null;
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = null;
      }
      if (this.canvas) {
        this.canvas.remove();
        this.canvas = null;
      }
      if (this.zoomUI) {
        this.zoomUI.remove();
        this.zoomUI = null;
      }
      const style = document.querySelector("style[data-archive-styles]");
      if (style)
        style.remove();
    }
  };

  // src/index.ts
  gsapWithCSS.registerPlugin(Draggable);
  var activeLinkBackground = null;
  function createActiveLinkBackground() {
    activeLinkBackground = document.createElement("div");
    activeLinkBackground.classList.add("active-link-background");
    Object.assign(activeLinkBackground.style, {
      position: "absolute",
      top: "0",
      background: "#424242",
      zIndex: "1",
      pointerEvents: "none",
      willChange: "transform"
    });
    const menuContainer = document.querySelector(".menu_container");
    if (menuContainer) {
      menuContainer.style.position = "relative";
      menuContainer.appendChild(activeLinkBackground);
      setInitialPosition();
      setupActiveLinkBackgroundResize();
    }
  }
  function setInitialPosition() {
    const currentLink = document.querySelector(".menulink.w--current");
    if (currentLink) {
      const linkRect = currentLink.getBoundingClientRect();
      const containerRect = document.querySelector(".menu_container").getBoundingClientRect();
      activeLinkBackground.style.left = `${linkRect.left - containerRect.left}px`;
      activeLinkBackground.style.width = `${linkRect.width}px`;
      activeLinkBackground.style.height = `${linkRect.height}px`;
    }
  }
  function getSlideDirection(currentNS, nextNS) {
    const pages = ["index", "info", "archive"];
    const currentIndex = pages.indexOf(currentNS);
    const nextIndex = pages.indexOf(nextNS);
    return currentIndex < nextIndex ? "right" : "left";
  }
  function animateBackgroundToActiveLink(data) {
    if (!activeLinkBackground)
      return;
    const nextNamespace = data?.next?.namespace || "index";
    const nextLink = document.querySelector(`.menulink[data-nav-target="${nextNamespace}"]`);
    if (!nextLink)
      return;
    const linkRect = nextLink.getBoundingClientRect();
    const containerRect = document.querySelector(".menu_container").getBoundingClientRect();
    return gsapWithCSS.to(activeLinkBackground, {
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      height: linkRect.height,
      // Added height animation
      duration: 1.5,
      ease: "expo.inOut"
    });
  }
  function setupActiveLinkBackgroundResize() {
    if (!activeLinkBackground)
      return;
    const resizeObserver = new ResizeObserver(
      debounce(() => {
        const currentLink = document.querySelector(".menulink.w--current");
        if (currentLink && activeLinkBackground) {
          const linkRect = currentLink.getBoundingClientRect();
          const containerRect = document.querySelector(".menu_container").getBoundingClientRect();
          gsapWithCSS.to(activeLinkBackground, {
            left: linkRect.left - containerRect.left,
            width: linkRect.width,
            height: linkRect.height,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }, 100)
    );
    resizeObserver.observe(document.documentElement);
    const menuContainer = document.querySelector(".menu_container");
    if (menuContainer) {
      resizeObserver.observe(menuContainer);
    }
  }
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  function createClickBlocker() {
    const blocker = document.createElement("div");
    Object.assign(blocker.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "9998",
      backgroundColor: "transparent",
      // Transparent but will still block clicks
      pointerEvents: "all",
      // This is crucial - makes it intercept all clicks
      display: "none",
      cursor: "inherit"
    });
    blocker.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    blocker.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    blocker.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      { passive: false }
    );
    blocker.classList.add("transition-blocker");
    document.body.appendChild(blocker);
  }
  function blockClicks() {
    const blocker = document.querySelector(".transition-blocker");
    if (blocker) {
      blocker.style.display = "block";
      document.body.style.pointerEvents = "none";
      blocker.style.pointerEvents = "all";
    }
  }
  function unblockClicks() {
    const blocker = document.querySelector(".transition-blocker");
    if (blocker) {
      blocker.style.display = "none";
      document.body.style.pointerEvents = "";
    }
  }
  function blockActivePageClicks() {
    document.querySelectorAll('.menulink, [data-nav-target="index"]').forEach((link) => {
      link.style.cursor = "";
      link.style.pointerEvents = "";
    });
    setTimeout(() => {
      const currentNamespace = document.body.getAttribute("data-barba-namespace");
      const currentLink = document.querySelector(".menulink.w--current");
      if (currentLink) {
        currentLink.style.cursor = "default";
        currentLink.style.pointerEvents = "none";
      }
      if (currentNamespace === "index") {
        document.querySelectorAll('.menulink.w--current, [data-nav-target="index"]:not(.menulink)').forEach((link) => {
          link.style.cursor = "default";
          link.style.pointerEvents = "none";
        });
      }
    }, 50);
  }
  var VideoPreloader = class {
    constructor() {
      this.initialized = false;
    }
    init() {
      if (this.initialized)
        return;
      const style = document.createElement("style");
      style.textContent = `
      body.loading {
        overflow: hidden !important;
        height: 100vh !important;
      }

      .preloader-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 101vh !important;
        height: 101dvh !important;
        z-index: 9999 !important;
        background: black !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .preloader-video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
        visibility: hidden !important;
        opacity: 0 !important;
        transition: visibility 0.3s, opacity 0.3s !important;
      }

      .preloader-video.is-playing {
        visibility: visible !important;
        opacity: 1 !important;
      }

      .preloader-logo {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        mix-blend-mode: difference !important;
        z-index: 10000 !important;
        pointer-events: none !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .page-wrapper {
        transform: translateY(100vh);
        position: fixed;
        width: 100%;
      }
    `;
      document.head.appendChild(style);
      this.initialized = true;
    }
    async playPreloader() {
      this.init();
      const preloader2 = document.querySelector(".preloader-container");
      const video = preloader2.querySelector(".preloader-video");
      await initializeVideo(preloader2, true);
      const pageWrapper = document.querySelector(".page-wrapper");
      const computedStyle = window.getComputedStyle(pageWrapper);
      const originalWidth = computedStyle.width;
      document.body.classList.add("loading");
      gsapWithCSS.set(pageWrapper, {
        y: "100vh",
        position: "fixed",
        width: "100%",
        opacity: 1,
        visibility: "visible"
      });
      await new Promise((resolve) => {
        video.muted = true;
        video.playsInline = true;
        video.addEventListener("playing", () => {
          video.classList.add("is-playing");
        });
        const playPromise = video.play();
        if (playPromise !== void 0) {
          playPromise.catch(() => {
          });
        }
        const checkVideo = setInterval(() => {
          if (!isNaN(video.duration)) {
            clearInterval(checkVideo);
            setTimeout(
              () => {
                const tl = gsapWithCSS.timeline({
                  onComplete: () => {
                    pageWrapper.style.position = "static";
                    pageWrapper.style.width = originalWidth;
                    pageWrapper.style.transform = "none";
                    document.body.classList.remove("loading");
                    gsapWithCSS.set(preloader2, { display: "none" });
                    preloader2.remove();
                    resolve();
                  }
                });
                tl.to(preloader2, {
                  y: "-100vh",
                  duration: 1,
                  ease: "expo.inOut"
                }).to(
                  pageWrapper,
                  {
                    y: 0,
                    duration: 1,
                    ease: "expo.inOut"
                  },
                  "<"
                );
              },
              (video.duration - 1) * 1e3
            );
          }
        }, 100);
        setTimeout(() => {
          if (!video.duration) {
            clearInterval(checkVideo);
            const tl = gsapWithCSS.timeline({
              onComplete: () => {
                pageWrapper.style.position = "static";
                pageWrapper.style.width = originalWidth;
                pageWrapper.style.transform = "none";
                document.body.classList.remove("loading");
                gsapWithCSS.set(preloader2, { display: "none" });
                preloader2.remove();
                resolve();
              }
            });
            tl.to(preloader2, {
              y: "-100vh",
              duration: 1,
              ease: "expo.inOut"
            }).to(
              pageWrapper,
              {
                y: 0,
                duration: 1,
                ease: "expo.inOut"
              },
              "<"
            );
          }
        }, 3e3);
      });
    }
  };
  var preloader = new VideoPreloader();
  gsapWithCSS.registerPlugin(Flip, ScrollToPlugin);
  document.addEventListener("DOMContentLoaded", () => {
    preloader.playPreloader().catch(console.error);
  });
  function loadAutoVideo() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js";
    script.defer = true;
    document.body.appendChild(script);
  }
  function addLoadingStyles() {
    const style = document.createElement("style");
    style.textContent = `
    .accordion-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fafafa;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .accordion-loader.is-loading {
      opacity: 1;
      visibility: visible;
    }

    .text-size-main {
      opacity: 1;
    }

    @keyframes loadingDots {
      0% { content: '.'; }
      33% { content: '..'; }
      66% { content: '...'; }
    }

    .accordion-loader::after {
      content: '.';
      display: inline-block;
      animation: loadingDots 1.5s infinite;
      min-width: 24px;
    }
  `;
    document.head.appendChild(style);
  }
  function initializeAccordion() {
    addLoadingStyles();
    async function initializeAndPlayVideo(videoElement, loaderElement) {
      if (!videoElement || !(videoElement instanceof HTMLVideoElement)) {
        console.warn("Invalid video element provided:", videoElement);
        return;
      }
      if (loaderElement) {
        loaderElement.classList.add("is-loading");
      }
      try {
        videoElement.pause();
        videoElement.currentTime = 0;
        const source = videoElement.querySelector("source");
        if (source) {
          const currentSrc = source.src;
          source.src = "";
          videoElement.load();
          await new Promise((resolve) => setTimeout(resolve, 50));
          source.src = currentSrc;
          videoElement.load();
        }
        videoElement.setAttribute("data-autoplay", "true");
        videoElement.removeAttribute("muted");
        videoElement.playsInline = true;
        videoElement.loop = true;
        videoElement.volume = 1;
        await new Promise((resolve) => {
          const loadHandler = () => {
            videoElement.removeEventListener("loadeddata", loadHandler);
            videoElement.removeEventListener("error", errorHandler);
            resolve(void 0);
          };
          const errorHandler = (error) => {
            videoElement.removeEventListener("loadeddata", loadHandler);
            videoElement.removeEventListener("error", errorHandler);
            console.warn("Video load error:", error);
            resolve(void 0);
          };
          videoElement.addEventListener("loadeddata", loadHandler);
          videoElement.addEventListener("error", errorHandler);
          if (videoElement.readyState >= 3) {
            loadHandler();
          }
        });
        if (loaderElement) {
          loaderElement.classList.remove("is-loading");
        }
        videoElement.currentTime = 0;
        await videoElement.play();
      } catch (error) {
        console.warn("Video initialization failed:", error);
        if (loaderElement) {
          loaderElement.classList.remove("is-loading");
        }
      }
    }
    function resetVideo(videoElement) {
      if (videoElement && videoElement instanceof HTMLVideoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.load();
      }
    }
    function getViewportHeight() {
      return "101dvh";
    }
    function verifyPosition($element) {
      const currentTop = $element.offset().top;
      if (Math.abs(window.pageYOffset - currentTop) > 2) {
        gsapWithCSS.to(window, {
          duration: 0.5,
          scrollTo: currentTop,
          ease: "expo.out"
        });
      }
    }
    const accordion = /* @__PURE__ */ function() {
      const settings = {
        duration: 1,
        ease: "expo.inOut"
      };
      let isAnimating = false;
      return {
        init() {
          $(".js-accordion-item").each(function() {
            const $item = $(this);
            const loader = document.createElement("div");
            loader.className = "accordion-loader text-size-main";
            loader.textContent = "LOADING";
            $item.find(".js-accordion-body").append(loader);
          });
          $(".js-accordion-item").on("click", function() {
            if (isAnimating)
              return;
            accordion.toggle($(this));
          });
        },
        toggle($clicked) {
          const accordionBody = $clicked.find(".js-accordion-body")[0];
          const videoElement = $clicked.find(".event-video")[0];
          const loaderElement = $clicked.find(".accordion-loader")[0];
          const accordionHeader = $clicked.find(".js-accordion-header")[0];
          const isOpening = !$clicked.hasClass("active");
          let resizeObserver;
          isAnimating = true;
          if (isOpening) {
            const $openItem = $(".js-accordion-item.active");
            if ($openItem.length) {
              const openVideo = $openItem.find(".event-video")[0];
              const openBody = $openItem.find(".js-accordion-body")[0];
              const openHeader = $openItem.find(".js-accordion-header")[0];
              const closeTl = gsapWithCSS.timeline({
                onComplete: async () => {
                  const targetPosition = $clicked.offset().top;
                  const openTl = gsapWithCSS.timeline({
                    onComplete: async () => {
                      isAnimating = false;
                      if (videoElement) {
                        await initializeAndPlayVideo(videoElement, loaderElement);
                      }
                    }
                  });
                  $clicked.addClass("active");
                  gsapWithCSS.set(accordionBody, {
                    display: "block",
                    height: 0
                  });
                  const openState = Flip.getState(accordionBody);
                  gsapWithCSS.set(accordionBody, { height: getViewportHeight() });
                  openTl.to(
                    window,
                    {
                      scrollTo: {
                        y: targetPosition,
                        autoKill: false
                      },
                      duration: settings.duration,
                      ease: settings.ease
                    },
                    0
                  ).to(
                    accordionHeader,
                    {
                      paddingTop: "5rem",
                      duration: settings.duration,
                      ease: settings.ease
                    },
                    0
                  ).add(
                    Flip.from(openState, {
                      duration: settings.duration,
                      ease: settings.ease,
                      absoluteOnLeave: true,
                      onComplete: () => {
                        resizeObserver = new ResizeObserver(() => {
                          if ($clicked.hasClass("active")) {
                            gsapWithCSS.set(accordionBody, { height: getViewportHeight() });
                            verifyPosition($clicked);
                          }
                        });
                        resizeObserver.observe(document.documentElement);
                        verifyPosition($clicked);
                      }
                    }),
                    0
                  );
                }
              });
              closeTl.to(
                openHeader,
                {
                  duration: settings.duration,
                  paddingTop: "0.5rem",
                  ease: settings.ease
                },
                "start"
              ).add(() => {
                const closeState = Flip.getState(openBody);
                gsapWithCSS.set(openBody, { height: 0 });
                return Flip.from(closeState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onComplete: () => {
                    $openItem.removeClass("active");
                    gsapWithCSS.set(openBody, { clearProps: "all", display: "none" });
                    resetVideo(openVideo);
                  }
                });
              }, "start+=0.2");
            } else {
              const targetPosition = $clicked.offset().top;
              const openTl = gsapWithCSS.timeline({
                onComplete: async () => {
                  isAnimating = false;
                  if (videoElement) {
                    await initializeAndPlayVideo(videoElement, loaderElement);
                  }
                }
              });
              $clicked.addClass("active");
              gsapWithCSS.set(accordionBody, {
                display: "block",
                height: 0
              });
              const openState = Flip.getState(accordionBody);
              gsapWithCSS.set(accordionBody, { height: getViewportHeight() });
              openTl.to(
                window,
                {
                  scrollTo: {
                    y: targetPosition,
                    autoKill: false
                  },
                  duration: settings.duration,
                  ease: settings.ease
                },
                0
              ).to(
                accordionHeader,
                {
                  paddingTop: "5rem",
                  duration: settings.duration,
                  ease: settings.ease
                },
                0
              ).add(
                Flip.from(openState, {
                  duration: settings.duration,
                  ease: settings.ease,
                  absoluteOnLeave: true,
                  onComplete: () => {
                    resizeObserver = new ResizeObserver(() => {
                      if ($clicked.hasClass("active")) {
                        gsapWithCSS.set(accordionBody, { height: getViewportHeight() });
                        verifyPosition($clicked);
                      }
                    });
                    resizeObserver.observe(document.documentElement);
                    verifyPosition($clicked);
                  }
                }),
                0
              );
            }
          } else {
            const closeTl = gsapWithCSS.timeline({
              onComplete: () => {
                isAnimating = false;
              }
            });
            closeTl.to(
              accordionHeader,
              {
                duration: settings.duration,
                paddingTop: "0.5rem",
                ease: settings.ease
              },
              "start"
            ).to(
              accordionBody,
              {
                height: 0,
                duration: settings.duration,
                ease: settings.ease,
                onComplete: () => {
                  $clicked.removeClass("active");
                  gsapWithCSS.set(accordionBody, {
                    clearProps: "all",
                    display: "none"
                  });
                  resetVideo(videoElement);
                  if (resizeObserver) {
                    resizeObserver.disconnect();
                  }
                }
              },
              "start"
            );
          }
        }
      };
    }();
    const style = document.createElement("style");
    style.textContent = `
    .js-accordion-item {
      min-height: 3rem;
      background-color: transparent;
      transition: background-color 0.3s ease;
      font-size: 0;
      line-height: 0;
      position: relative;
      border-top: 0.5rem solid #fafafa;
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .js-accordion-item {
        min-height: 6rem;
      }
    }
    
    .js-accordion-item > * {
      font-size: 1rem;
      line-height: normal;
    }
    
    .js-accordion-item:not(.active):hover {
      background-color: #fafafa !important;
    }
    
    .js-accordion-item.active {
      min-height: 3rem;
      background-color: #0F0F0F !important;
      color: #fafafa !important;
      border-top: none !important;
    }
    
    @media (max-width: 768px) {
      .js-accordion-item.active {
        min-height: 6rem;
      }
    }
 
    .js-accordion-item.active + .js-accordion-item {
      border-top: none !important;
    }
    
    .js-accordion-body {
      height: calc(101vh + 1rem);
      height: calc(101dvh + 1rem);
      width: 100%;
      margin: 0;
      padding: 0;
      position: absolute;
      background-color: #0F0F0F;
      display: none;
      vertical-align: top;
      line-height: 0;
      top: 0;
      left: 0;
      will-change: height;
      transform-origin: top;
    }
    
    .js-accordion-body * {
      line-height: 0;
    }
    
    .js-accordion-body .event-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      object-fit: cover;
      display: block;
    }
  `;
    document.head.appendChild(style);
    gsapWithCSS.registerPlugin(Flip, ScrollToPlugin);
    accordion.init();
  }
  document.addEventListener("DOMContentLoaded", () => {
    preloader.playPreloader().catch(console.error);
  });
  window.addEventListener("unload", () => {
    videoCacheManager.cleanup();
  });
  import_core.default.init({
    transitions: [
      {
        name: "slide-transition",
        sync: true,
        before(data) {
          blockClicks();
          if (data?.next?.container) {
            gsapWithCSS.set(data.next.container, {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              visibility: "visible"
            });
          }
        },
        async leave(data) {
          const currentScroll = window.scrollY;
          const direction = getSlideDirection(data.current.namespace, data.next.namespace);
          const tl = gsapWithCSS.timeline();
          gsapWithCSS.set(data.current.container, {
            position: "fixed",
            top: -currentScroll,
            left: 0,
            width: "100%"
          });
          tl.add(animateBackgroundToActiveLink(data), 0);
          if (data.current.namespace === "archive" && window.archiveView) {
            const fadeOut = window.archiveView.fadeOut();
            tl.add(fadeOut, 0);
          }
          tl.to(
            data.current.container,
            {
              x: direction === "right" ? "-100%" : "100%",
              duration: 1.5,
              ease: "expo.inOut"
            },
            0
          );
          return tl;
        },
        enter(data) {
          const direction = getSlideDirection(data.current.namespace, data.next.namespace);
          gsapWithCSS.set(data.next.container, {
            x: direction === "right" ? "100%" : "-100%"
          });
          return gsapWithCSS.to(data.next.container, {
            x: 0,
            duration: 1.5,
            ease: "expo.inOut",
            onComplete: unblockClicks
          });
        },
        after(data) {
          if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
          }
          unblockClicks();
          gsapWithCSS.set([data.current.container, data.next.container], {
            clearProps: "position,top,left,width,transform"
          });
          window.scrollTo(0, 0);
        }
      }
    ],
    views: [
      {
        namespace: "index",
        afterEnter() {
          restartWebflow();
          loadAutoVideo();
          initializeAccordion();
        }
      },
      {
        namespace: "info",
        afterEnter() {
          restartWebflow();
        }
      },
      {
        namespace: "archive",
        beforeEnter() {
          document.body.classList.add("archive-page");
          const style = document.createElement("style");
          style.id = "archive-init-styles";
          style.textContent = `
          .archive-container, 
          .archive-canvas,
          .archive-zoom {
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `;
          document.head.appendChild(style);
        },
        async afterEnter(data) {
          try {
            console.log("Archive afterEnter started");
            gsapWithCSS.set(data.next.container, { autoAlpha: 0 });
            await new Promise((resolve) => setTimeout(resolve, 100));
            console.log("Creating ArchiveView");
            const archiveView = new ArchiveView(data.next.container);
            console.log("Initializing ArchiveView");
            await archiveView.init();
            window.archiveView = archiveView;
            const initStyles = document.getElementById("archive-init-styles");
            if (initStyles) {
              console.log("Removing init styles");
              initStyles.remove();
            }
            console.log("Setting container autoAlpha");
            gsapWithCSS.set(data.next.container, { autoAlpha: 1 });
            console.log("Calling show()");
            archiveView.show();
          } catch (error) {
            console.error("Error in afterEnter:", error);
          }
        },
        beforeLeave() {
          document.body.classList.remove("archive-page");
        }
      }
    ]
  });
  import_core.default.hooks.before(() => {
    if (window.archiveView) {
      window.archiveView.isTransitioning = true;
    }
  });
  import_core.default.hooks.enter(() => {
    window.scrollTo(0, 0);
    const preloader2 = document.querySelector(".loader_wrapper");
    if (preloader2) {
      preloader2.style.display = "none";
    }
  });
  import_core.default.hooks.after(async ({ current, next }) => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (current?.namespace === "archive" && window.archiveView) {
      window.archiveView.destroy();
      delete window.archiveView;
    }
    if (window.archiveView) {
      window.archiveView.isTransitioning = false;
    }
    document.querySelectorAll(".menulink, .logo-nav").forEach((link) => {
      link.style.cursor = "";
      link.style.pointerEvents = "";
    });
    setTimeout(blockActivePageClicks, 50);
    restartWebflow();
    await new Promise((resolve) => setTimeout(resolve, 100));
    loadAutoVideo();
    initializeVideo(document);
  });
  document.addEventListener("DOMContentLoaded", () => {
    createActiveLinkBackground();
    createClickBlocker();
    blockActivePageClicks();
    loadAutoVideo();
    initializeVideo(document);
    preloader.playPreloader().catch(console.error);
  });
})();
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/utils/matrix.js:
  (*!
   * matrix 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Draggable.js:
  (*!
   * Draggable 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   *)

gsap/Flip.js:
  (*!
   * Flip 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollToPlugin.js:
  (*!
   * ScrollToPlugin 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
//# sourceMappingURL=index.js.map
