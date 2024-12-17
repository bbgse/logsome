import {
  isArgumentsObject,
  isDate,
  isGeneratorFunction,
  isGeneratorObject,
  isNativeError,
  isRegExp,
} from "node:util/types";

type KindOfType = string;

export function kindOf(value?: unknown): KindOfType {
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
    case "Symbol": return "symbol";
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

  // Non-plain objects
  const toStringResult = toString(value);

  // Handle iterators and other special cases
  switch (toStringResult) {
    case "[object Map Iterator]": return "mapiterator";
    case "[object Set Iterator]": return "setiterator";
    case "[object String Iterator]": return "stringiterator";
    case "[object Array Iterator]": return "arrayiterator";
  }

  return toStringResult.slice(8, -1).toLowerCase().replace(/\s/g, "") as KindOfType;
}

function toString(value: unknown) {
  return Object.prototype.toString.call(value);
}

function getCtorName(value: unknown) {
  return typeof value === "object" && value !== null ? value.constructor.name : undefined;
}

function isPlainObject(value: unknown) {
  return typeof value === "object" && value !== null && toString(value) === "[object Object]";
}
