import { product } from "./product";

export class newservice
{
  public id?:number;
  public servicename:string;
  public serviceimageurl?:string;
  public description?:string;
  public servicestartdate:Date;
  public serviceenddate:Date;
  public serviceactiveflag?:boolean;
  public products?:product[]

}