export class AnimaisModel {

  id: number;
  nome: string;
  sexo: string;
  descricao: string;
  especie: string;
  raca: string;
  cidade: string;
  idade: string;
  imagem: Uint8Array;
  castrado:string;
  vacinado: any;
  vermifugado: any;
  porte: any;
  uf: any;
  municipio: any;

  public constructor(init ? : Partial < AnimaisModel > ) {

    Object.assign(this, init);

  }

}
