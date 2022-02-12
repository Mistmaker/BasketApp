export class Grupos {

    public _id: string;
    public idcampeonato: string;
    public nombre: string;
    public modalidad: string;

    constructor(
        _id: string,
        idcampeonato: string,
        nombre: string,
        modalidad: string
    ) {
        this._id = _id;
        this.idcampeonato = idcampeonato;
        this.nombre = nombre;
        this.modalidad = modalidad;
    }
}