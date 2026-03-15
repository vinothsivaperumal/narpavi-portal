import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AgreementsService } from './agreements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { CreateAgreementDto, UpdateAgreementDto } from './dto/agreement.dto';

@Controller('agreements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() body: CreateAgreementDto) {
    return this.agreementsService.create(body);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.agreementsService.findAll();
  }

  @Get('my')
  findMine(@Request() req) {
    return this.agreementsService.findByStudent(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agreementsService.findOne(id);
  }

  @Patch(':id/sign')
  @Roles(UserRole.ADMIN)
  markSigned(
    @Param('id') id: string,
    @Body() body: { boldSignDocumentId?: string; documentUrl?: string },
  ) {
    return this.agreementsService.markSigned(
      id,
      body.boldSignDocumentId,
      body.documentUrl,
    );
  }

  @Patch(':id/decline')
  @Roles(UserRole.ADMIN)
  markDeclined(@Param('id') id: string) {
    return this.agreementsService.markDeclined(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateAgreementDto) {
    return this.agreementsService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.agreementsService.remove(id);
  }
}
