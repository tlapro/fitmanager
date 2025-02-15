import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdatePersonalInfoDto } from 'src/dtos/update-personal-info.dto';
import { UpdateAdminFieldsDto } from 'src/dtos/update-admin-fields.dto';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly cloudinary: CloudinaryConfig,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id_user: id },
    });

    if (!user) {
      throw new NotFoundException(`El usuario con el ID: ${id}, no existe.`);
    }

    return user;
  }

  async findProfileById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id_user: id },
    });

    if (!user) {
      throw new NotFoundException(`El usuario con el ID: ${id} no existe.`);
    }

    return {
      id: user.id_user,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      entry_date: user.entry_date,
      isActive: user.isActive,
    };
  }

  async updatePersonalInfo(
    id: string,
    updatePersonalInfoDto: UpdatePersonalInfoDto,
    modifier: { userId: string; email: string },
  ) {
    const user = await this.userRepository.findOne({ where: { id_user: id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    const updatedFields = Object.keys(updatePersonalInfoDto).filter(
      (key) =>
        updatePersonalInfoDto[key] !== undefined && key !== 'confirmPassword',
    );
    if (updatedFields.length === 0) {
      return {
        id,
        message: `No se realizaron cambios en la información personal.`,
      };
    }

    if (
      (updatePersonalInfoDto.password &&
        !updatePersonalInfoDto.confirmPassword) ||
      (!updatePersonalInfoDto.password && updatePersonalInfoDto.confirmPassword)
    ) {
      throw new BadRequestException(
        'Debes ingresar ambos campos: contraseña y confirmación.',
      );
    }

    if (
      updatePersonalInfoDto.password &&
      updatePersonalInfoDto.confirmPassword
    ) {
      if (
        updatePersonalInfoDto.password !== updatePersonalInfoDto.confirmPassword
      ) {
        throw new BadRequestException('Las contraseñas no coinciden.');
      }

      const salt = await bcrypt.genSalt(10);
      updatePersonalInfoDto.password = await bcrypt.hash(
        updatePersonalInfoDto.password,
        salt,
      );
    }

    const updatedUser = this.userRepository.create({
      ...user,
      ...updatePersonalInfoDto,
    });
    const savedUser = await this.userRepository.save(updatedUser);

    const formattedFields = updatedFields
      .map((field) => `'${field}'`)
      .join(', ');

    return {
      id,
      message: `Información personal del usuario actualizada con éxito. Campos modificados: ${formattedFields}`,
      user: savedUser,
    };
  }

  async updateAdminFields(
    id: string,
    updateAdminFieldsDto: UpdateAdminFieldsDto,
    modifier: { adminId: string; email: string },
  ) {
    const user = await this.userRepository.findOne({ where: { id_user: id } });
    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    // Filtrar campos que no sean undefined
    const updatedFields = Object.keys(updateAdminFieldsDto).filter(
      (key) => updateAdminFieldsDto[key] !== undefined,
    );

    if (updatedFields.length === 0) {
      return {
        id,
        message: `No se realizaron cambios administrativos.`,
      };
    }

    // Actualizar campos
    const updatedUser = this.userRepository.create({
      ...user,
      ...updateAdminFieldsDto,
    });
    await this.userRepository.save(updatedUser);

    const formattedFields = updatedFields
      .map((field) => `'${field}'`)
      .join(', ');

    return {
      id,
      message: `Datos administrativos del usuario actualizados con éxito. Campos modificados: ${formattedFields}`,
    };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id_user: id },
    });

    if (!user) {
      throw new NotFoundException(`El usuario con ID: ${id} no existe.`);
    }

    await this.userRepository.remove(user);

    return {
      message: `El usuario con ID: ${id}, fue eliminado con éxito.`,
    };
  }

  async uploadProfilePicture(userId: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ninguna imagen.');

    try {
      // Subir la imagen a Cloudinary
      const imageUrl = await this.cloudinary.uploadImage(file);

      // Guardar la URL en la base de datos
      await this.userRepository.update(userId, { imgUrl: imageUrl });

      return { message: 'Imagen de perfil actualizada con éxito', imageUrl };
    } catch (error) {
      throw new BadRequestException('Error al subir la imagen.');
    }
  }

  async updateUserStatusToActive(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_user: userId },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${userId} no encontrado`);
    }

    user.isActive = true;
    return this.userRepository.save(user);
  }

  async activateUserById(
    userId: string,
    duration = 30 * 24 * 60 * 60 * 1000, // Duración predeterminada: 30 días en ms
  ): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id_user: userId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!user) {
        throw new NotFoundException(
          `No se encontró un usuario con el ID: ${userId}`,
        );
      }

      const originalStatus = user.isActive;
      user.isActive = true;
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      const maxTimeoutMs = 2147483647; // Límite máximo permitido (~24.85 días)

      if (duration > maxTimeoutMs) {
        // Si la duración supera el límite máximo, usar intervalos
        const remainingDuration = duration - maxTimeoutMs;

        setTimeout(async () => {
          // Llamar a la función nuevamente con el tiempo restante
          await this.activateUserById(userId, remainingDuration);
        }, maxTimeoutMs);
      } else {
        // Si la duración está dentro del límite, ejecutar directamente
        setTimeout(async () => {
          const queryRunner = this.dataSource.createQueryRunner();
          await queryRunner.connect();
          await queryRunner.startTransaction();

          try {
            const user = await queryRunner.manager.findOne(User, {
              where: { id_user: userId },
              lock: { mode: 'pessimistic_write' },
            });

            if (user) {
              user.isActive = originalStatus;
              await queryRunner.manager.save(user);
            }

            await queryRunner.commitTransaction();
          } catch (error) {
            await queryRunner.rollbackTransaction();
          } finally {
            await queryRunner.release();
          }
        }, duration);
      }

      return {
        message: `Usuario ${userId} ha sido activado temporalmente por ${duration / 1000} segundos.`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getEmail(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id_user: userId },
    });
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${userId} no existe.`);
    }
    return { email: user.email };
  }
}
