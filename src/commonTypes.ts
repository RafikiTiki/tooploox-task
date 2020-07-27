import { Seq } from 'immutable';

export type Maybe<T> = T | null;

// // @ts-ignore
// export type ImmutableMap<T, V> = {
//   setIn(keys: T[], value: V);
//   delete(key: T, value: V);
//   deleteIn(keys: T[]);
//   updateIn(keys: T[], value: V);
//   getIn(keys: T[], notSetValue?: any);
//   mergeIn(keys: T[], value: V);
//   mergeDeep(value: V);
//   merge(value: V);
//   set(key: T, value: V);
//   update(key: T, value: V);
//   get(key: T, notSetValue?: any);
//   filter(predicate: (value: V, key: T) => boolean);
//   forEach(sideEffect: (value: V, key: T) => void);
//   keySeq(): Seq.Indexed<T>;
// };
