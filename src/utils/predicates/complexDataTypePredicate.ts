import type {
  ObjectChecker,
  ObjectEntries,
  UnknownObject,
} from "../../types/tsHelpers";
import isObject from "./isObject";

const complexDataTypePredicate =
  <T extends UnknownObject>(checker: ObjectChecker<T>) =>
  (value: unknown): value is T =>
    isObject(value) &&
    (Object.entries(checker) as ObjectEntries<ObjectChecker<T>>).every(
      ([key, predicate]) =>
        key in value && predicate(value[key as keyof typeof value])
    );

export default complexDataTypePredicate;
