// 1.基本类型
interface a {
  // 只读属性
  readonly name: string;
  // 可选属性
  seg?: number;
  gender: number;
  isStudent: boolean;
  property: undefined;
  girlFriend: null;
  secret: symbol;
}

// 2.函数类型
interface b {
  (name: string, sex: number): string;
}
// 使用
function bb(a: b) {
  console.log(a.toString());
}

// bb((a: string, b: string) => '1'); error
bb((a: string, b: number) => '1');

// 3.可索引类型(数组)

interface c {
  // 索引为数字的数组取值必须为字符串
  [index: number]: string;
}
// 使用
let arry: c;
// arry = [1, '2']; error
arry = ['1', '2'];

// 4.接口继承
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

function aaaa(a: Square) {}
aaaa({ color: '1', sideLength: 1 });
