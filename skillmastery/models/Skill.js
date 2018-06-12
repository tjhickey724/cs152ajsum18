class Skill{
  constructor(name,description){
    this.name=name
    this.description=description
  }

  toString(){
    return `Skill(${this.name},${this.description})`
  }
}

module.exports = Skill
