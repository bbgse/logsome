/**
 * Based on the `kind-of` package by Jon Schlinkert.
 * @see https://github.com/jonschlinkert/kind-of
 */

import {
  isArgumentsObject,
  isDate,
  isGeneratorFunction,
  isGeneratorObject,
  isNativeError,
  isRegExp,
} from "node:util/types";

type KindOfType =
  | "null"
  | "undefined"
  | "boolean"
  | "string"
  | "number"
  | "symbol"
  | "bigint"
  | "date"
  | "error"
  | "regexp"
  | "promise"
  | "function"
  | "generatorfunction"
  | "array"
  | "buffer"
  | "arguments"
  | "object"
  | "generator"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "int8array"
  | "uint8array"
  | "uint8clampedarray"
  | "int16array"
  | "uint16array"
  | "int32array"
  | "uint32array"
  | "float32array"
  | "float64array"
  | "mapiterator"
  | "setiterator"
  | "stringiterator"
  | "arrayiterator";

export function kindOf(value?: unknown): KindOfType | (string & {}) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  const type = typeof value;
  if (type === "boolean") return "boolean";
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "symbol") return "symbol";
  if (type === "bigint") return "bigint";
  if (type === "function") return isGeneratorFunction(value) ? "generatorfunction" : "function";

  if (type === "object") {
    if (Array.isArray(value)) return "array";
    if (Buffer.isBuffer(value)) return "buffer";
    if (isArgumentsObject(value)) return "arguments";
    if (isDate(value)) return "date";
    if (isNativeError(value)) return "error";
    if (isRegExp(value)) return "regexp";
    if (isGeneratorObject(value)) return "generator";
    if (isPlainObject(value)) return "object";
  }

  const ctor = getCtorName(value);
  switch (ctor) {
    case "Promise": return "promise";

    case "WeakMap": return "weakmap";
    case "WeakSet": return "weakset";
    case "Map": return "map";
    case "Set": return "set";

    case "Int8Array": return "int8array";
    case "Uint8Array": return "uint8array";
    case "Uint8ClampedArray": return "uint8clampedarray";

    case "Int16Array": return "int16array";
    case "Uint16Array": return "uint16array";

    case "Int32Array": return "int32array";
    case "Uint32Array": return "uint32array";
    case "Float32Array": return "float32array";
    case "Float64Array": return "float64array";
  }

  const str = toString(value);
  switch (str) {
    case "[object Map Iterator]": return "mapiterator";
    case "[object Set Iterator]": return "setiterator";
    case "[object String Iterator]": return "stringiterator";
    case "[object Array Iterator]": return "arrayiterator";
  }

  return str.slice(8, -1).toLowerCase().replace(/\s/g, "") as KindOfType;
}

function toString(value: unknown): string {
  return Object.prototype.toString.call(value);
}

function getCtorName(value: unknown): string | undefined {
  return typeof value === "object" && value !== null ? value.constructor.name : undefined;
}

function isPlainObject(value: unknown): boolean {
  return typeof value === "object" && value !== null && toString(value) === "[object Object]";
}
