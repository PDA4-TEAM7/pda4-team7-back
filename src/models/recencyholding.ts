import { Model, Table, Column, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Portfolio } from "./portfolio";
import { Account } from "./account";
import { User } from "./user";

export interface RecencyHoldingsAttributes {
  // holding_id: number;
  portfolio_id: number;
  account_id?: number;
  uid?: number;
  name?: string;
  hldg_qty: string;
  pchs_amt: string;
  evlu_amt: string;
  evlu_pfls_amt: string;
  evlu_pfls_rt: string;
  std_idst_clsf_cd_name?: string;
  closing_price?: number;
}

@Table({
  tableName: "recencyholdings",
  timestamps: true,
})
export class RecencyHoldings
  extends Model<RecencyHoldingsAttributes, RecencyHoldingsAttributes>
  implements RecencyHoldingsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  holding_id!: number;

  @ForeignKey(() => Portfolio)
  @Column({ type: DataType.BIGINT })
  portfolio_id!: number;

  @ForeignKey(() => Account)
  @Column({ type: DataType.BIGINT })
  account_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  uid?: number;

  @Column({ type: DataType.STRING(255) })
  name!: string;

  @Column({ type: DataType.STRING(30) })
  hldg_qty!: string; // 보유 수량

  @Column({ type: DataType.STRING(30) })
  pchs_amt!: string; // 매입 금액

  @Column({ type: DataType.STRING(30) })
  evlu_amt!: string; // 평가 금액

  @Column({ type: DataType.STRING(30) })
  evlu_pfls_amt!: string; // 평가 손익

  @Column({ type: DataType.STRING(30) })
  evlu_pfls_rt!: string; // 평가 손익률

  @Column({ type: DataType.STRING })
  std_idst_clsf_cd_name!: string; // 표준 분류 코드명

  @Column({ type: DataType.BIGINT })
  closing_price!: number; // 종가

  @BelongsTo(() => Portfolio)
  portfolio!: Portfolio;

  @BelongsTo(() => Account)
  account!: Account;
}
