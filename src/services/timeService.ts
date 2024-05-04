import moment from "moment"

export default {
  convertirFechaEnIntervalo: (fecha: Date) => {
    return moment(fecha).fromNow()
  }
}