import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@ApiTags('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

}
