import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";

type UserRole = "client" | "owner" | "delivery";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  role: UserRole;
}