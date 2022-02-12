export class ConfiCampeonato {

    public _id: string;
    public tipo: string;
    public idcampeonato: string;
    public subtipo: string;

    constructor(
        _id: string,
        tipo: string,
        idcampeonato: string,
        subtipo: string
    ) {
        this._id = _id;
        this.tipo = tipo;
        this.idcampeonato = idcampeonato;
        this.subtipo = subtipo;
    }
}