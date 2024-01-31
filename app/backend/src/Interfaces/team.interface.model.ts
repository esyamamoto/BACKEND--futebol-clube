import Teams from './Teams.interface';

export interface TeamModelInterface {
  findAll(): Promise<Teams[]>;
  // findById(id: number): Promise<Teams | null>;
}
