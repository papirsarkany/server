import { QueryConfig } from 'pg';
import { db } from '../../db';
import { updateQueryBuilder } from '../../utilities/updateQueryBuilder';

import { Kite } from './kite.model';

// Create kite
// TODO refactor to insertQueryBuilder
export async function createKite(data: Kite & Omit<Kite, 'id'>): Promise<Kite> {
  const query: QueryConfig = {
    text: 'INSERT INTO kites(id, name, image_url, dimensions, materials, wind, is_beginner, details, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    values: Object.values(data),
  };

  const { rows } = await db.query(query);
  return rows[0];
}

// Get kite
export async function getKite(id: string): Promise<Kite> {
  const query: QueryConfig = {
    text: 'SELECT * FROM kites WHERE id = $1',
    values: [id],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

// Get all kites
export async function getAllKites(): Promise<Kite[]> {
  const { rows } = await db.query<Kite>('SELECT * from "kites"');
  return rows;
}

// Update kite
export async function updateKite(id: string, data: Omit<Kite, 'id'>): Promise<Kite> {
  const query: QueryConfig = {
    text: updateQueryBuilder('kites', data),
    values: [...Object.values(data), id],
  };

  const { rows } = await db.query<Kite>(query);
  return rows[0];
}

// Delete kite
export async function deleteKite(id: string): Promise<Kite> {
  const query: QueryConfig = {
    text: 'DELETE FROM kites WHERE id = $1 RETURNING *',
    values: [id],
  };
  const { rows } = await db.query<Kite>(query);
  console.log('deleted', rows);
  return rows[0];
}
