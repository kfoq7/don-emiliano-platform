import { Module } from '@nestjs/common'
import { typeOrmModule } from '@config/database.config'
import { envConfig } from '@config/env.config'

import { UserModule } from '@modules/user'
import { ProductModule } from '@modules/products'
import { AuthModule } from '@modules/auth/auth.module'
import { OrderModule } from '@modules/order'

@Module({
  imports: [
    envConfig(),
    typeOrmModule(),
    UserModule,
    AuthModule,
    OrderModule,
    ProductModule,
  ],
})
export class AppModule {}
