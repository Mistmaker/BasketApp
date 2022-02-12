export class Actividades {

    public idencuentro: string;
    public idcampeonato: string;
    public tipo: string;
    public cantidad: number;
    public idequipo: string;

    constructor(
        idencuentro: string,
        idcampeonato: string,
        tipo: string,
        cantidad: number,
        idequipo: string
    ) {
        this.idencuentro = idencuentro;
        this.idcampeonato = idcampeonato;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.idequipo = idequipo;
    }
}