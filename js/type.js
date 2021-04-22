const type = (item) => {
  if (item !== item) {
    return NaN
  }
  let objString = Object.prototype.toString.call(item)
  return objString.slice(8,-1).toLowerCase()
}
