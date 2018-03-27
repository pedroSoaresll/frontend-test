class ItemRanking {
  constructor (id, name, description, picture, positive, negative) {
    this._id = id
    this._name = name
    this._description = description
    this._picture = picture
    this._positive = positive
    this._negative = negative
  }

  get name () {
    return this._name
  }

  get picture () {
    return this._picture
  }

  get description () {
    return unescape(decodeURIComponent(this._description))
  }

  getPositivePercent  () {
    if (this._positive == undefined || this._negative == undefined) return 0

    let full = Number.parseFloat(this._positive) + Number.parseFloat(this._negative)
    return ((this._positive * 100) / full).toFixed(0)
  }

  getNegativePercent () {
    if (this._positive == undefined || this._negative == undefined) return 0

    let full = Number.parseFloat(this._positive) + Number.parseFloat(this._negative)
    return ((this._negative * 100) / full).toFixed(0)
  }
}