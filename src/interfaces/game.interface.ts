
export interface Games {
  _id: string;
  name: String,
  detail: String,
  image : String,
  url : String,
  bet_rate : String[],
  bet_price_min : Number,
  bet_price_max : Number,
  max_round : Number,
  round_per_min : Number,
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
