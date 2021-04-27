import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from "form-data";
import { CONFIG_OPTIONS } from '../common/common.constans';
import { EmailVar, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) { }

  private async sendEmail(subject: string, template: string, emailVars: EmailVar[], userEmail: string) {
    try {
      const form = new FormData();
      form.append("from", `Deleb from Zmeunnuri <mailgun@${this.options.domain}>`);
      form.append("to", userEmail);
      form.append("subject", subject);
      form.append("template", template);
      emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`,).toString("base64")}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail("Verify Your Email", "email_account_verification", [
      { key: "code", value: code },
      { key: "username", value: email }
    ], "penetra.okulo@gmail.com");
  }
}
