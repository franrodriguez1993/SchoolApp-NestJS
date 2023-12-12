import { Request } from 'express';

export interface requestExtends extends Request {
  user: { id: string; role: string };
}
