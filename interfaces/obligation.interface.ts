export interface IObligation {
  id: string;
  user: string;
  employee: string;
  percent: number;
  insurance: number;
  current_amount: number;
  total_amount: number;
  finished: boolean;
  debt: boolean;
  next_payment: Date;
  created_at: Date;
  finished_at: Date;
}
