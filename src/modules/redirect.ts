export class Redirect {
  private _from: string;
  private _to: string;

  constructor(from: string, to: string) {
    this._from = from;
    this._to = to;
  }
}
