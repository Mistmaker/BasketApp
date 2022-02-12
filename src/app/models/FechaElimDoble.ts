export class FechaElimDoble {

    public _id: string;
    public idcampeonato: string;
    public fechaida: string;
    public fechavuelta: string;
    public estado: boolean;

    constructor(
        _id: string,
        idcampeonato: string,
        fechaida: string,
        fechavuelta: string,
        estado: boolean
    ) {
        this._id = _id;
        this.idcampeonato = idcampeonato;
        this.fechaida = fechaida;
        this.fechavuelta = fechavuelta;
        this.estado = estado;
    }
}