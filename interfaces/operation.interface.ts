export interface IOperation {
  id: string;
  payer: string;
  recipient: string;
  type: number;
  finished: boolean;
  created: Date;
}
