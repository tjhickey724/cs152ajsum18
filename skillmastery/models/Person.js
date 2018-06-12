class Person{
  constructor(name,githubid){
    this.name=name
    this.githubid=githubid
  }

  toString(){
    return `Person(${this.name},${this.githubid})`
  }
}

function printName(p){
  console.log("name="+p.name)
}

module.exports = Person
