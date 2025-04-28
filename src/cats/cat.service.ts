import { Cat } from './cat.entity';
import { Pool } from 'pg';

export class CatService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(cat: Cat): Promise<Cat> {
    const result = await this.pool.query(
      'INSERT INTO cat (name, age, breed) VALUES ($1, $2, $3) RETURNING *',
      [cat.name, cat.age, cat.breed],
    );
    const id =  result.rows[0];
    const newCat = await this.pool.query('SELECT * FROM cat WHERE id = $1', [
      id,
    ]);
    return newCat.rows[0];
  }

  async findAll(): Promise<Cat[]> {
    const result = await this.pool.query('SELECT * FROM cat');
    return result.rows;
  }

  async findOne(id: number): Promise<Cat> {
    const result = await this.pool.query('SELECT * FROM cat WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: number, cat: Cat): Promise<Cat> {
    const result = await this.pool.query(
      'UPDATE cat SET name = $1, age = $2, breed = $3 WHERE id = $4 RETURNING *',
      [cat.name, cat.age, cat.breed, id],
    );
    return result.rows[0];
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE FROM cat WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return false;
    }
    return true;
  }
}