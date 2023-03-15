import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UploadResolver } from './upload.resolver';
import { FileUpload } from 'graphql-upload/Upload.mjs';

@Module({
  providers: [UploadResolver],
})
export class UploadModule {}
