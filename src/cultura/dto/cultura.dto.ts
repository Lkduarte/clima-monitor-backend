export class CulturaDto {
    ponto_cultivo : Localização;
    nome_cultivo : string;
    temperatura_max : number;
    pluviometria_max : number;
    temperatura_min : number;
    pluviometria_min : number;
    temperaturas : Temperatura[];
    pluviometrias : Pluviometria[];

    alertasTemp : Alerta[];
    alertasPluvi : Alerta[];
}


type Temperatura = {
    data : Date,
    temperatura : number
}

type Pluviometria = {
    data : Date,
    pluviometria : number
}

type Localização = {
    latitude : string,
    longitude : string
}

type Alerta = {
    [date: string] : number;
}

