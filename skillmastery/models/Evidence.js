class Evidence{
  constructor(person,skill,url){
    this.person = person
    this.skill = skill
    this.url = url
  }

  toString(){
    return `Evidence(${this.person},${this.skill},${this.url})`
  }
}

module.exports = Evidence
