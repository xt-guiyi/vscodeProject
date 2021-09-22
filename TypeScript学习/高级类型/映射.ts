interface Person {
  name: string;
  sex: number;
}
// 映射为可选
type PersonPartial = Partial<Person>;
// 映射为只读
type ReadonlyPerson = Readonly<Person>;
// 映射为选择的属性
type ReadonlyPerson1 = Pick<Person, 'name'>;
// 映射为数组
type ReadonlyPerson2 = Record<string, Person>;
