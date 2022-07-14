

export class ProjectScope {
  constructor(
    public name: string,
    public details?: string,
    public qty?: number,
    public qtyUnit?: string,
    public unitPrice?: number,
    public calculatedPrice?: number,
    public url?: string,
    public photo?: string,
    public estGrandTotal?: number
  ) {}
}


// name, details, qty, qtyUnit, unit price, calculated price, URL, photo
