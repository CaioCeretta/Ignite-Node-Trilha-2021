import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'


@Entity('users')
export class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  drivers_license: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

}