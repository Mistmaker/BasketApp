export class Resultado {

    public _id: string;
    public idencuentro: string;
    public idjugador: string;
    public idequipo: string;
    public goles: number;
    public amarillas: number;
    public rojas: number;
    public faltas: number;
    public idcampeonato: string;
    public estadoequipo1: boolean;
    public estadoequipo2: boolean;
    nombrejugador!: string;
    puntos_dobles!: number;
    puntos_triples!: number;
    sanciones!: number;
    observacion!: string;

    constructor(
        _id: string,
        idencuentro: string,
        idjugador: string,
        idequipo: string,
        goles: number,
        amarillas: number,
        rojas: number,
        faltas: number,
        idcampeonato: string,
        estadoequipo1: boolean,
        estadoequipo2: boolean
    ) {
        this._id = _id;
        this.idencuentro = idencuentro;
        this.idjugador = idjugador;
        this.idequipo = idequipo;
        this.goles = goles;
        this.amarillas = amarillas;
        this.rojas = rojas;
        this.faltas = faltas;
        this.idcampeonato = idcampeonato;
        this.estadoequipo1 = estadoequipo1;
        this.estadoequipo2 = estadoequipo2;
        this.puntos_dobles = 0;
        this.puntos_triples = 0;
        this.sanciones = 0;
        this.observacion = '';
    }
}