import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { log } from "console";
import { CreateUserDto } from "./users/dto/create-student.dto";

@Processor('email-queue')
export class EmailConsumer {

  constructor(private readonly emailService: MailerService) {}
  
  @Process('email')
  async handleEmail(job: Job<CreateUserDto>) {
    const data = job.data;
    await this.emailService.sendMail({
      to: data.email,
      from: process.env["EMAIL_USER"],
      subject: "Successfully registered",
      text: `Login: ${data.email}, Password: ${data.password}`,
      html: `<h1>Welcome</h1><br/>Login: ${data.email}<br/>Password: ${data.password}`
    })
    log("Email sent")
  }
  
}
