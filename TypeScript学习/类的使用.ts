//抽象类
abstract class Animal {
  public race: string;
  constructor(race?: string) {
    this.race = race;
  }
  public abstract hell(): void;
}

// 名字是可以告诉的，但是年龄就是个秘密
/* public
 *private
 *protected
 */
class People extends Animal {
  public name: string;
  private _sex: number;
  constructor(name: string, _sex: number) {
    super('人');
    this.name = name;
    this._sex = _sex;
  }
  get sex() {
    return this._sex;
  }
  set sex(value: number) {
    this._sex = value;
  }
  static describe(): void {
    console.log('我是People类');
  }
  public hell() {
    console.log('hello,我是' + this.race);
  }
}

{
  let a: People = new People('xt', 12);
  console.log(a.sex);
  console.log((a.sex = 18));
  console.log(People.describe());
  console.log(a.hell());
  console.log(a);
}

//使用接口规范类

interface FoodInterface {
  type: string;
  set: (name: string, sex: number) => void;
  arry1: string[];
}
//实现这个接口
class FoodClass implements FoodInterface {
  public type: string;
  public arry1: string[];
  set(name: string, sex: number) {}
}
