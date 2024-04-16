import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { User } from "./user.entity";
  
  @Entity("tasks")
  export class Task {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ length: 125 })
    title: string;
  
    @Column({ nullable: true })
    description: string;
  
    @Column({ default: "false" })
    completed: boolean;
  
    @ManyToOne(() => User)
    user: User;
  
  }