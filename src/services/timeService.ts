import moment from "moment"

export default {
  convertirFechaEnIntervalo: (fecha: Date) => {
    return moment(fecha).fromNow()
  },
  convertirFechaEnIso: (fecha?: string) => {
    if (fecha)
      try{
        const fechaIso = new Date(fecha).toISOString().split("T")[0]
        if (fechaIso !== "Invalid Date") return fechaIso;
      }catch(e){/**/}

    return ""
  }
}