const useTituloPagina = () => {
  return (titulo: string, add: boolean = false) => {
    if (add)
      document.title += ` ${titulo}`
    else
      document.title = titulo
  }

}

export default useTituloPagina;