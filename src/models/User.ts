import { Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn,  } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Transaction } from "./Transaction";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 255, { message: "First name must be between 3 and 255 characters" })
  @IsNotEmpty({ message: "First name is required" })
  firstName: string;
  

  
  @Column()
  @Length(3, 255, { message: "Last name must be between 3 and 255 characters" })
  @IsNotEmpty({ message: "Last name is required" })
  lastName: string;



  @Column()
  @IsNotEmpty({ message: "Email is required" })
  email: string;


  @Column()
  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 255, { message: "Password must be between 6 and 255 characters" })
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
  createdAt: Date;

  @OneToMany((type) => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  


//   constructor() {
//     this.id = 0; // Initialize id with a default value
//     this.firstName = '';
//     this.lastName = '';
//     this.email = '';
//     this.password = '';
//   }
}
