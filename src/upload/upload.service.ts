import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import { FileUpload } from 'graphql-upload';
import { acceptedFormats } from './accepted-formats.interface';

@Injectable()
export class UploadService {
  async handleUpload(image: FileUpload): Promise<string> {
    const { createReadStream, filename } = image;

    const format = this.checkAndReturnFormat(filename, acceptedFormats);

    if (!format) {
      throw new GraphQLError('Wrong image format', {
        extensions: {
          exception: {
            code: '404',
          },
        },
      });
    }

    const uniqueId = uuidv4();

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${uniqueId}${format}`))
        .on('finish', (res) => resolve('/uploads/' + uniqueId + format))
        .on('error', () => {
          throw new GraphQLError('Wrong image format', {
            extensions: {
              exception: {
                code: '404',
              },
            },
          });
        }),
    );
  }

  checkAndReturnFormat(filename: string, acceptedFormats: string[]) {
    let splittedName = filename.split('.');
    const format = splittedName[splittedName.length - 1];

    for (let i = 0; i < acceptedFormats.length; i++) {
      if (format === acceptedFormats[i]) {
        return `.${format}`;
      }
    }

    return false;
  }
}
