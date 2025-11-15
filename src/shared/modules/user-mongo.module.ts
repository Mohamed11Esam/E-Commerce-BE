import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminRepository, adminSchema, Customer, CustomerRepository, customerSchema, Seller, SellerRepository, sellerSchema, User, UserRepository, UserSchema } from "src/models";

@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[
      {name:Admin.name,schema:adminSchema},
      {name:Seller.name,schema:sellerSchema},
      {name:Customer.name,schema:customerSchema}
    ]}]),
  ],
  providers: [
    AdminRepository,
    SellerRepository,
    CustomerRepository,
    UserRepository
  ],
  exports:[
    AdminRepository,
    SellerRepository,
    CustomerRepository,
    UserRepository
  ]
})
export class UserMongoModule {}