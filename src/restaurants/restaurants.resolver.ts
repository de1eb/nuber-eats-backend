import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class RestaurantResolver {
  @Query(returns => Boolean)
  isPiazzaGood(): Boolean {
    return true;
  }
}