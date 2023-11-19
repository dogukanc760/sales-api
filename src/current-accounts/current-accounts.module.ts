import { Module } from '@nestjs/common';
import { CurrentAccountsService } from './current-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentAccounts } from './entities/current-accounts.entity';
import { CurrentAccountsController } from './current-accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentAccounts])],
  providers: [CurrentAccountsService],
  controllers: [CurrentAccountsController],
  exports: [CurrentAccountsService],
})
export class CurrentAccountsModule {}
