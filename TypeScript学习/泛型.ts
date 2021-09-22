// 1.基本使用

function a<T, U>(name: T, sex: U) {
  return name;
}
// 以下两种等价
a<string, number>('2', 2);
// 类型推断
a('1', 1);

// 2.泛型函数和泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 3.泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 4.泛型约束
interface Lengthwise {
  length: number;
}
//约束必须有length属性
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // 这样就不会报错
  return arg;
}
