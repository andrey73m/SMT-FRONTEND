import { Bounce, toast } from "react-toastify";

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

export const formatearHora = (fecha: Date) => {
  const formatoHora = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })

  return formatoHora.format(new Date(fecha))
}

export const notificarError = (mensaje: string, timer: number = 5000) => {
  toast.error(mensaje, {
    position: "bottom-right",
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
export const notificarExito = (mensaje: string, timer: number = 5000) => {
  toast.success(mensaje,{
    position: "bottom-right",
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  })
}
