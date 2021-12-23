import { Controller, Get } from '@nestjs/common';
import { NodesService } from './nodes.service';

@Controller('nodes')
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Get()
  async getAll() {
    return await this.nodesService.getAll()
  }
}
