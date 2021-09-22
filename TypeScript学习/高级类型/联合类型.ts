// 联合类型，只能有两个里面都有的东西
// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(pet): Fish | Bird {
  return pet;
  // ...
}

let pet = getSmallPet(1);
pet.layEggs(); // okay
pet.swim(); // errors

//自定义类型保护
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
}
