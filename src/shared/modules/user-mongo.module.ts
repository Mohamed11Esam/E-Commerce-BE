import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminRepository, adminSchema, Customer, CustomerRepository, customerSchema, Seller, SellerRepository, sellerSchema, User, UserSchema } from "src/models";

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
    CustomerRepository
  ],
  exports:[
    AdminRepository,
    SellerRepository,
    CustomerRepository
  ]
})
export class UserMongoModule {}