import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UploadResolver } from './upload.resolver';
import { FileUpload } from 'graphql-upload/Upload.mjs';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadResolver, UploadService],
  exports: [UploadService],
})
export class UploadModule {}
