import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CONFIG_OPTIONS } from "../common/common.constans";
import { UploadsModuleOptions } from "./uploads.interfaces";

const BUCKET_NAME = 'nuber-eats-images';
const region = 'ap-northeast-2';
const CLOUDFRONT_ADDRESS = 'd1o25ch8l375u4.cloudfront.net';
@Controller('uploads')
export class UploadsController {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: UploadsModuleOptions
  ) { }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: this.options.accessKey,
        secretAccessKey: this.options.secretAccessKey,
      }
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      const input = {
        Bucket: BUCKET_NAME,
        Body: file.buffer,
        Key: objectName
      }
      const command = new PutObjectCommand(input);
      const response = await client.send(command)
      const url = `https://${CLOUDFRONT_ADDRESS}/images/restaurants/${objectName}`;
      return { url };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}