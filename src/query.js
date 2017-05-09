export default class Query {
  constructor (data) {
    this.data = data.map(item => {
      item.sortScore = 0
      return item
    })
  }

  get results () {
    return this.data
  }

  search (key, term = '', score = 0) {
    if (term.length >= 3) {
      this.data = this.data.filter(item => {
        let regFind = new RegExp(term, 'gi')
        let termMatches = (item[key].match(regFind) || []).length
        item.sortScore += termMatches
        return termMatches
      })
    }
    return this
  }

  sort (key = 'sortScore') {
    debugger
    this.data = this.data.sort((a, b) => {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    })
    return this
  }
}
