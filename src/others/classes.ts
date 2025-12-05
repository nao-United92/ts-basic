// src/others/classes.ts

// クラスの基本的な定義
class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return 'Hello, ' + this.greeting
  }
}

const greeter = new Greeter('world')
console.log(greeter.greet())

// 継承
class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name) // 親クラスのコンストラクタを呼び出す
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}

const sam = new Snake('Sammy the Python')
const tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(34)

// public, private, protected修飾子

// public (デフォルト): どこからでもアクセス可能
// private: そのクラスの内部からのみアクセス可能
// protected: そのクラスとサブクラスの内部からのみアクセス可能

class Person {
  public name: string
  private age: number
  protected gender: string

  constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }

  public getProfile() {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`
  }
}

class Employee extends Person {
  private department: string

  constructor(name: string, age: number, gender: string, department: string) {
    super(name, age, gender)
    this.department = department
  }

  public getEmployeeInfo() {
    // this.ageはprivateなのでアクセスできない
    // return `Name: ${this.name}, Age: ${this.age}, Department: ${this.department}`; // Error
    // this.genderはprotectedなのでアクセスできる
    return `Name: ${this.name}, Gender: ${this.gender}, Department: ${this.department}`
  }
}

const person = new Person('John', 30, 'Male')
console.log(person.name) // publicなのでアクセス可能
// console.log(person.age); // privateなのでアクセス不可
// console.log(person.gender); // protectedなのでアクセス不可

const employee = new Employee('Jane', 28, 'Female', 'Sales')
console.log(employee.getEmployeeInfo())
