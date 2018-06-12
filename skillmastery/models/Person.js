class Person{
  constructor(name,githubid){
    this.name=name
    this.githubid=githubid
  }

  toString(){
    return `Person(${this.name},${this.githubid})`
  }
}

module.exports = Person
