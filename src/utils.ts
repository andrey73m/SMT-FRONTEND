export const CapitalizeString = (string: string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
}
console.log("lenguaje", navigator.language)
export const formatoPrecio = new Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency:"COP",
  maximumFractionDigits: 0
})
