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

export const validate = (inputStr)  => (
  (typeof inputStr === 'string') && (inputStr.trim() !== '')
)

export const validateInputs = form => Object.keys(form).reduce((a, c) => {
  a[c] = validate(form[c])
  return a
}, {})
