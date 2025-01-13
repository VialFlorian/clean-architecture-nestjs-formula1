import { Driver } from 'src/core/driver/entity';
import { DriverRepository } from 'src/core/driver/repository';
import { PrismaService } from 'src/infra/datasources/prisma/prisma.service';

export class DriverRepositoryPrisma implements DriverRepository {
  constructor(private readonly prisma: PrismaService) {}
  async find(code: string) {
    const rows = await this.prisma.driver.findMany({ where: { abbreviation: code } });
    if (!rows[0]) return null;

    return {
      code: rows[0].abbreviation,
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      dateOfBirth: rows[0].date_of_birth.toString(),
      nationality: rows[0].nationality_country_id,
    };
  }

  async findByName(firstName: string, lastName: string): Promise<Driver | null> {
    const id = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const rows = await this.prisma.driver.findMany({ where: { id } });
    if (!rows[0]) return null;

    return {
      code: rows[0].abbreviation,
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      dateOfBirth: rows[0].date_of_birth.toString(),
      nationality: rows[0].nationality_country_id,
    };
  }

  async findAll() {
    const rows = await this.prisma.season_driver.findMany({
      include: { driver: true },
      where: { year: 2024 },
    });
    return rows.map(({ driver }) => ({
      code: driver.abbreviation,
      firstName: driver.first_name,
      lastName: driver.last_name,
      dateOfBirth: driver.date_of_birth.toString(),
      nationality: driver.nationality_country_id,
    }));
  }

  async persist(driver: Driver) {
    await this.prisma.driver.create({
      data: {
        id: `${driver.firstName.toLowerCase()}-${driver.lastName.toLowerCase()}`,
        name: `${driver.firstName} ${driver.lastName}`,
        first_name: driver.firstName,
        last_name: driver.lastName,
        full_name: `${driver.firstName} ${driver.lastName}`,
        abbreviation: driver.lastName.slice(0, 3).toUpperCase(),
        gender: 'MALE',
        date_of_birth: new Date(driver.dateOfBirth),
        place_of_birth: 'Somewhere',
        country_of_birth_country_id: driver.nationality,
        nationality_country_id: driver.nationality,
        total_championship_wins: 0,
        total_race_entries: 0,
        total_race_starts: 0,
        total_race_wins: 0,
        total_race_laps: 0,
        total_podiums: 0,
        total_points: 0,
        total_championship_points: 0,
        total_pole_positions: 0,
        total_fastest_laps: 0,
        total_driver_of_the_day: 0,
        total_grand_slams: 0,
      },
    });
  }
}
