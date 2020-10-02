import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule,
    MongooseModule.forRoot('mongodb+srv://cristian:rouser135@tracker-app-sa6oj.gcp.mongodb.net/nest_crud_db?retryWrites=true&w=majority',
    {useNewUrlParser: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
