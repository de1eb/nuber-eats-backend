import { v4 as uuidv4 } from "uuid";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { IsString, Length } from "class-validator";
import { Restaurant } from "./restaurant.entity";

@InputType("CategoryInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImag: string;

  @Field(type => [Restaurant], { nullable: true })
  @OneToMany(type => Restaurant, restaurant => restaurant.category)
  restaurants: Restaurant[];
}