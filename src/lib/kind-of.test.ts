/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-regex-literals */
/* eslint-disable unicorn/error-message */
/* eslint-disable symbol-description */
/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable no-new-wrappers */
import { describe, expect, it } from "vitest";
import { kindOf } from "./kind-of";

describe("kindOf", () => {
  describe("undefined values", () => {
    it("should handle undefined values", () => {
      expect(kindOf()).toBe("undefined");
      expect(kindOf(undefined)).toBe("undefined");
      expect(kindOf(void 0)).toBe("undefined");
    });
  });

  describe("null", () => {
    it("should handle null", () => {
      expect(kindOf(null)).toBe("null");
    });
  });

  describe("boolean values", () => {
    it("should handle boolean values and objects", () => {
      expect(kindOf(Boolean())).toBe("boolean");
      expect(kindOf(new Boolean())).toBe("boolean");
      expect(kindOf(true)).toBe("boolean");
      expect(kindOf(Boolean)).toBe("function");
    });
  });

  describe("number values", () => {
    it("should handle number values and objects", () => {
      expect(kindOf(Number())).toBe("number");
      expect(kindOf(new Number())).toBe("number");
      expect(kindOf(0)).toBe("number");
      expect(kindOf(Number.NaN)).toBe("number");
      expect(kindOf(Infinity)).toBe("number");
      expect(kindOf(Number)).toBe("function");
    });
  });

  describe("string values", () => {
    it("should handle string values and objects", () => {
      expect(kindOf(String())).toBe("string");
      expect(kindOf(new String())).toBe("string");
      expect(kindOf("")).toBe("string");
      expect(kindOf((0).toString())).toBe("string");
      expect(kindOf(String)).toBe("function");
    });
  });

  describe("symbol values", () => {
    it("should handle symbols", () => {
      expect(kindOf(Symbol())).toBe("symbol");
    });
  });

  describe("iterators", () => {
    it("should handle various iterator types", () => {
      expect(kindOf((new Map())[Symbol.iterator]())).toBe("mapiterator");
      expect(kindOf((new Set())[Symbol.iterator]())).toBe("setiterator");
      expect(kindOf((""[Symbol.iterator]()))).toBe("stringiterator");
      expect(kindOf(([])[Symbol.iterator]())).toBe("arrayiterator");
    });
  });

  describe("functions", () => {
    it("should handle various function types", () => {
      expect(kindOf(() => { })).toBe("function");
      expect(kindOf(() => { })).toBe("function");
      expect(kindOf((): IterableIterator<any> => {
        return null as any as IterableIterator<any>;
      })).toBe("function");
      expect(kindOf(class { })).toBe("function");
      expect(kindOf(function* (): IterableIterator<any> { })).toBe("generatorfunction");
    });
  });

  describe("arrays", () => {
    it("should handle arrays", () => {
      expect(kindOf([])).toBe("array");
      expect(kindOf([])).toBe("array");
    });
  });

  describe("dates", () => {
    it("should handle Date objects and date-like objects", () => {
      expect(kindOf(new Date())).toBe("date");
    });
  });

  describe("buffers", () => {
    it("should handle Buffer if available", () => {
      if (typeof Buffer !== "undefined") {
        expect(kindOf(Buffer.from("ABC"))).toBe("buffer");
      }
    });
  });

  describe("errors", () => {
    it("should handle Error objects and error-like objects", () => {
      expect(kindOf(new Error(""))).toBe("error");
      class CustomError extends Error {
        constructor() {
          super();
          this.name = "CustomError";
        }
      }
      expect(kindOf(new CustomError())).toBe("error");
    });
  });

  describe("regular expressions", () => {
    it("should handle RegExp objects and regexp-like objects", () => {
      expect(kindOf(new RegExp("a-z"))).toBe("regexp");
      expect(kindOf(/a-z/)).toBe("regexp");
    });
  });

  describe("promises", () => {
    it("should handle promises", () => {
      expect(kindOf(Promise.resolve())).toBe("promise");
    });
  });

  describe("collections", () => {
    it("should handle various collection types", () => {
      expect(kindOf(new WeakMap())).toBe("weakmap");
      expect(kindOf(new WeakSet())).toBe("weakset");
      expect(kindOf(new Map())).toBe("map");
      expect(kindOf(new Set())).toBe("set");
    });
  });

  describe("typed arrays", () => {
    it("should handle various TypedArray objects", () => {
      expect(kindOf(new Int8Array(8))).toBe("int8array");
      expect(kindOf(new Uint8Array(8))).toBe("uint8array");
      expect(kindOf(new Uint8ClampedArray(8))).toBe("uint8clampedarray");
      expect(kindOf(new Int16Array(8))).toBe("int16array");
      expect(kindOf(new Uint16Array(8))).toBe("uint16array");
      expect(kindOf(new Int32Array(8))).toBe("int32array");
      expect(kindOf(new Uint32Array(8))).toBe("uint32array");
      expect(kindOf(new Float32Array(8))).toBe("float32array");
      expect(kindOf(new Float64Array(8))).toBe("float64array");
    });
  });

  describe("arguments object", () => {
    it("should handle arguments object", () => {
      (function () {
        expect(kindOf(arguments)).toBe("arguments");
      })();
    });
  });

  describe("generators", () => {
    function* foo() { }
    const generator = foo();
    it("should handle generator functions", () => {
      expect(kindOf(foo)).toBe("generatorfunction");
    });
    it("should handle generator objects", () => {
      expect(kindOf(generator)).toBe("generator");
    });
  });

  describe("global objects", () => {
    it("should handle global objects if available", () => {
      if (typeof globalThis !== "undefined") {
        expect(kindOf(globalThis)).toBe("global");
      }
      if (typeof global !== "undefined") {
        expect(kindOf(global)).toBe("global");
      }
    });
  });

  describe("plain objects", () => {
    it("should handle plain objects", () => {
      expect(kindOf({})).toBe("object");
      expect(kindOf(new (class { })())).toBe("object");
    });
  });

  describe("bigint values", () => {
    it("should handle bigint values", () => {
      expect(kindOf(BigInt(9007199254740991))).toBe("bigint");
      expect(kindOf(9007199254740991n)).toBe("bigint");
    });
  });
});
