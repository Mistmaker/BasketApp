import { Encuentros } from './Encuentros';
export class Fechas {

    public _id: string;
    public idcampeonato: string;
    public fecha: string;
    public estado: boolean;
    public encuentros: Encuentros[];
    idgrupo!: string;
    tipo!: string;
    numero!: string;

    constructor(
        _id: string,
        idcampeonato: string,
        fecha: string,
        estado: boolean
    ) {
        this._id = _id;
        this.idcampeonato = idcampeonato;
        this.fecha = fecha;
        this.estado = estado;
        this.encuentros = [];
    }
}