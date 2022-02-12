export class Anotacion {

    public idencuentro: string;
    public idcampeonato: string;
    public cantidad: number;
    public idjugador: string;
    public idequipo: string;

    constructor(
        idencuentro: string,
        idcampeonato: string,
        cantidad: number,
        idjugador: string,
        idequipo: string
    ) {
        this.idencuentro = idencuentro;
        this.idcampeonato = idcampeonato;
        this.cantidad = cantidad;
        this.idjugador = idjugador;
        this.idequipo = idequipo;
    }
}