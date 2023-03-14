import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesResolver } from './rules.resolver';

@Module({
  providers: [RulesService, RulesResolver]
})
export class RulesModule {}
