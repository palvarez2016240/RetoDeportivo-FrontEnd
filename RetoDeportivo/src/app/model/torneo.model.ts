export class Torneo{
  constructor(
    public _id: String,
    public nombre: String,
    public equipos:[{
      idEquipo: String,
    }],
    public iniciado: String,
    public terminado: String,
    public imagen: String,
    public idCategoria: String
  ){}
}
