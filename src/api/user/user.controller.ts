import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentuserDto } from '../../auth/dto/current-user.dto';
import { Role } from '../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import { UserProfileResponseDto } from './dto/user-profile.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get current user profile (Self)' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMe(
    @CurrentUser() user: CurrentuserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.findById(user.id);
  }

  @ApiOperation({ summary: 'Get current user profile by id' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get(':id')
  async getUserById(
    @Param() params: UserParamsDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.findById(params.id);
  }

  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateSelfProfile(
    @CurrentUser() user: CurrentuserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.update(user.id, updateUserDto);
  }
}
