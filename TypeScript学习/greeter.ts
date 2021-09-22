console.log('hell! TypeScript');
{
  //基本类型的类型注解
  let count: number;
  count = 1;
  let s: string = '2';
  console.log(count, s);
}
{
  //数组的类型注释
  let arr: string[] = ['1', '2'];
  arr.forEach((el, index) => {
    console.log(`index:${index}  el:${el}`);
  });
  // console.log(Reflect.set(arr, 1, '11'));
}
{
  //数组和函数的类型注解
  let maxNumber: number[] = [1, 3, 5, 2, 6, 22, 55, 12, 343];
  function a(arr: number[]): number {
    var max: number = arr[0];
    for (let i: number = 1; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i];
      }
    }
    return max;
  }
  console.log(a(maxNumber));
}
{
  //对象的类型注解
  let obj: {
    a: string;
  };
  obj = {
    a: '1',
  };
}
{
  // 接口的使用
  interface iUser {
    name: string;
    gender: string;
    age: number;
    getName: () => void;
  }
  let obj: iUser = {
    name: 'xt',
    gender: '男',
    age: 19,
    getName: function () {
      console.log(this.name);
    },
  };
  obj.getName();
}
for (let i: number = 1; i < 4; i++) {
  console.log(i);
}
