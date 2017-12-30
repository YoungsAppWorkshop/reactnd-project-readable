export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function formatDate (timestamp) {
  if (typeof timestamp !== 'number') {
    return ''
  }
  const d = new Date(timestamp).toDateString()
  return d.slice(4, 10) + ',' + d.slice(10)
}
