export class EncuentrosDoble {

    public _id: string;
    public equipo1: string;
    public equipo2: string;
    public estado: boolean;
    public idfecha: string;
    public idcampeonato: string;
    public fechaida: string;
    public fechavuelta: string;
    public horaida: string;
    public horavuelta: string;
    public canchaida: string;
    public canchavuelta: string;

    constructor(
        _id: string,
        equipo1: string,
        equipo2: string,
        estado: boolean,
        idfecha: string,
        idcampeonato: string,
        fechaida: string,
        fechavuelta: string,
        horaida: string,
        horavuelta: string,
        canchaida: string,
        canchavuelta: string
    ){
        this._id = _id;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.estado = estado;
        this.idfecha = idfecha;
        this.idcampeonato = idcampeonato;
        this.fechaida = fechaida;
        this.fechavuelta = fechavuelta;
        this.horaida = horaida;
        this.horavuelta = horavuelta;
        this.canchaida = canchaida;
        this.canchavuelta = canchavuelta;
    }
}