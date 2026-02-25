import { ConfigModule } from '@nestjs/config'

import databaseConfig from './database.config'

export const envConfig = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    expandVariables: true,
    load: [databaseConfig],
  })
