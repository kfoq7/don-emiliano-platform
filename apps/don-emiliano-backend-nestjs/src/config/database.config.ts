import path from 'node:path'
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DynamicModule } from '@nestjs/common'

const PATH_ENTITIES = path.join(
  __dirname,
  '..',
  'modules',
  '**',
  'entities',
  '*.entity.{ts,js}',
)

export const typeOrmConfig: () => TypeOrmModuleOptions = () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [PATH_ENTITIES],
  synchronize: true,
})

export const typeOrmModule: () => DynamicModule = () => {
  return TypeOrmModule.forRootAsync({
    useFactory: typeOrmConfig,
  })
}

export default typeOrmConfig
