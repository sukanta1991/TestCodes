export class VendorAddress {
	constructor(
    public addresstype?: string,
    public administrativearealevel1?: string,
    public administrativearealevel2?: string,
    public country?: string,
    public fullAddress?: string,
    public lift?: string,
    public locality?: string,
    public pincode?: string,
    public primise?: string,
    public sublocalitylevel1?: string,
    public sublocalitylevel2?: string,
    public lat?:string,
    public lng?:string
  ) {}
}
