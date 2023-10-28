import { Controller, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from 'aws-sdk';
import { CONFIG_OPTIONS } from "../common/common.constans";
import { UploadsModuleOptions } from "./uploads.interfaces";

const BUCKET_NAME = 'norutest';
const region = 'ap-northeast-2'
@Controller('uploads')
export class UploadsController {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: UploadsModuleOptions
  ) { }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    AWS.config.update({
      region: region,
      credentials: {
        accessKeyId: this.options.accessKey,
        secretAccessKey: this.options.secretAccessKey,
      }
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      const asdf = await new AWS.S3().putObject({ Body: file.buffer, Bucket: BUCKET_NAME, Key: objectName }).promise();
      const url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      return null;
    }
  }
}
