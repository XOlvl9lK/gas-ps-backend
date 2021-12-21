import { Injectable, Logger } from '@nestjs/common'
import { join } from 'path';
import { appendFileSync, unlinkSync } from 'fs'
import { EOL } from 'os'

@Injectable()
export class LoggerService extends Logger{
  private static readonly logsFilePath = join(__dirname, '../../logs.txt')
  private static totalLines = 0;

  static error(message: string, stack?: string, context?: string) {
    this.totalLines > 1000 && this.clearLogs();

    context &&
    appendFileSync(
      this.logsFilePath,
      `${EOL}ERROR - ${new Date()} - [${context}]: ${message}`
    );

    super.error(message, stack, context);
    this.totalLines++;
  }

  static warn(message: any, context?: string) {
    this.totalLines > 1000 && this.clearLogs();

    context &&
    appendFileSync(
      this.logsFilePath,
      `${EOL}WARN  - ${new Date()} - [${context}]: ${message}`
    );
    super.warn(message, context);

    this.totalLines++;
  }

  static log(message: any, context?: string) {
    this.totalLines > 1000 && this.clearLogs();

    context &&
    appendFileSync(
      this.logsFilePath,
      `${EOL}LOG   - ${new Date()} - [${context}]: ${message}`
    );
    super.log(message, context);

    this.totalLines++;
  }

  private static clearLogs() {
    unlinkSync(this.logsFilePath);
  }
}
