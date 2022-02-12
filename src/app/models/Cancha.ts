export class Cancha {

    public _id: string;
    public nombre: string;
    public provincia: string;
    public ciudad: string;
    public direccion: string;
    public idcampeonato: string;
    public estado: boolean;

    constructor(
        _id: string,
        nombre: string,
        provincia: string,
        ciudad: string,
        direccion: string,
        idcampeonato: string,
        estado: boolean
    ){
        this._id = _id;
        this.nombre = nombre;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.idcampeonato = idcampeonato;
        this.estado = estado;
    }
}