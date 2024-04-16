import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { getRounds, hashSync } from "bcryptjs";
import { Task } from "./task.entity";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("increment")
    id: string;
  
    @Column({ length: 150 })
    name: string;
  
    @Column({ length: 100, unique: true })
    email: string;
  
    @Column({ length: 150 })
    password: string;
  
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
  
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const hasRounds: number = getRounds(this.password);
      if (!hasRounds) {
        this.password = hashSync(this.password, 10);
      }
    }
  }