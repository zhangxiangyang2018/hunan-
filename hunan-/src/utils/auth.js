//  存储用户角色
const userinformation = 'userId'
export function getUser() {
  return window.sessionStorage.getItem(userinformation)
}

export function setUser(user) {

  return window.sessionStorage.setItem(userinformation, user)
}

export function removeUser() {
  return window.sessionStorage.removeItem(userinformation)
}

 const type=  'userType'

export function getUserType() {
  return window.sessionStorage.getItem(type)
}

export function setUserType(usertype) {

  return window.sessionStorage.setItem(type, usertype)
}

export function removeUserType() {
  return window.sessionStorage.removeItem(type)
}

