export function toggleDarkMode() {
  var darkMode
  if (localStorage.getItem('darkMode')) {
    darkMode = localStorage.getItem('darkMode')
    localStorage.removeItem('darkMode')
  } else {
    darkMode = false
  }

  var newState = (darkMode === 'true') ? false : true
  localStorage.setItem('darkMode', newState)
}

export function getDarkMode() {
  if (localStorage.getItem('darkMode'))
    return (localStorage.getItem('darkMode') == 'true')
  else
    return false
}
