export class Equipo{
  constructor(
    public _id: String,
    public nombre: String,
    public dueño: String,
    public puntos: Number,
    public pj: Number,
    public torneosG:[{
      torneo: String,
    }],
    public integrantes: [{
      usuario: String,
    }],
    public torneo:String,
    public torneoJ: Boolean,
  ){}
}
