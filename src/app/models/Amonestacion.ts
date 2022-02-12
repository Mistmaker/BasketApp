export class Amonestacion {

    public idencuentro: string;
    public idcampeonato: string;
    public tipo: string;
    public idjugador: string;
    public idequipo: string;

    constructor(
        idencuentro: string,
        idcampeonato: string,
        tipo: string,
        idjugador: string,
        idequipo: string
    ) {
        this.idencuentro = idencuentro;
        this.idcampeonato = idcampeonato;
        this.tipo = tipo;
        this.idjugador = idjugador;
        this.idequipo = idequipo;
    }
}