export class AnimaisModel {

  id: number;
  nome: string;
  sexo: string;
  descricao: string;
  especie: string;
  raca: string;
  cidade: string;
  idade: number;
  imagem: Uint8Array;


  public constructor(init ? : Partial < AnimaisModel > ) {

    Object.assign(this, init);

  }

}
