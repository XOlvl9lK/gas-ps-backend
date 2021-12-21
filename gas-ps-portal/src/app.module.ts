import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerModule } from './logger/logger.module';
import { LogsMiddleware } from './middleware/logs.middleware'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      database: process.env.PG_DATABASE || 'gas-ps',
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogsMiddleware).forRoutes('*')
  }
}
