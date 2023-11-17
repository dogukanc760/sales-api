import { Module } from '@nestjs/common';
import { CurrentAccountsService } from './current-accounts.service';
import { CurrentAccountsController } from './current-accounts.controller';

@Module({
  providers: [CurrentAccountsService],
  controllers: [CurrentAccountsController]
})
export class CurrentAccountsModule {}
