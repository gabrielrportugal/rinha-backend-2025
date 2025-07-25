import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({
  name: 'payment',
})
export class Payment {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    unique: true,
  })
  correlationId: string;

  @Column({ type: 'double' })
  amount: number;

  @Column('varchar')
  source: string;

  @Column('date')
  requestedAt: Date;

  constructor(correlationId: string, amount: number, requestedAt: Date) {
    this.correlationId = correlationId;
    this.amount = amount;
    this.requestedAt = requestedAt;
  }
}
