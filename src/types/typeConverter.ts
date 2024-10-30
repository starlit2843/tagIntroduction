export type ObjectInArray<T> = T extends Array<infer U>
  ? U extends object
    ? U extends Array<any>
      ? never
      : U
    : never
  : never;

export type ArrayInArray<T> = T extends Array<infer U>
  ? U extends object
    ? U extends Array<any>
      ? U
      : never
    : never
  : never;

export type PrimitiveInArray<T> = T extends Array<infer U>
  ? U extends object
    ? never
    : U
  : never;

/* Converts types in an array to @param Type
 * Look at description of ObjectValueToType to know more. The type of array in it
 * is transformed by this. */
export type ArrayToType<Arr, Type> = Arr extends Array<any>
  ? (
      | ObjectValueToType<ObjectInArray<Arr>, Type>
      | ArrayToType<ArrayInArray<Arr>, Type>
      | (PrimitiveInArray<Arr> extends never ? never : Type)
      | (Type extends undefined ? undefined : never)
    )[]
  : never;

/* Converts a object by change the type of its values to @param Type
 * However, it does go deep into objects and change them.
 * For example:
   const a = {
     1: true,
     2: {
       3: "something",
     },
     4: [0, "word"]
   }

   type A = ObjectValueToType<typeof a, Date>;
 *
 * A is equivalent to:
   {
     1: Date;
     2: ObjectValueToType<{
       3: string;
     }, Date>;
     4: Date[];
   }
 * Which means, it's equivalent to:
   {
     1: Date;
     2: {
       3: Date;
     }
     4: Date[];
   }
 *
 * For @param Type who includes undefined, type of the values includes undefined
 * For example:
   type B = ObjectValueToType<typeof a, Date | undefined>;
 *
 * B is equivalent to:
   {
     1: Date | undefined;
     2: ObjectValueToType<{
       3: string;
     }, Date | undefined> | undefined;
     4: (Date | undefined)[] | undefined;
   }
 * Which means, it's equivalent to:
   {
     1: Date | undefined;
     2: {
       3: Date | undefined;
     } | undefined
     4: (Date | undefined)[] | undefined;
   }
 * */
export type ObjectValueToType<SrcObject, Type> = {
  [T in keyof SrcObject]:
    | (SrcObject[T] extends object
        ? SrcObject[T] extends Array<any>
          ? ArrayToType<SrcObject[T], Type>
          : ObjectValueToType<SrcObject[T], Type>
        : Type)
    | (Type extends undefined ? undefined : never);
};

export type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends object ? never : K;
}[keyof T];

export type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T];

export const arrayKeys = <T extends {}>(obj: T) =>
  (Object.keys(obj) as Array<keyof T>).filter(
    (slotName): slotName is ArrayKeys<T> => Array.isArray(obj[slotName])
  );
