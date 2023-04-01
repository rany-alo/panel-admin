import "react-secure-storage"

export const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}