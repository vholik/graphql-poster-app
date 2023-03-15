import { Resolver } from '@nestjs/graphql';
// @ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver {
  // @Mutation(() => String)
  // async singleUpload(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   {  }: FileUpload,
  // ) {
  // }
}
