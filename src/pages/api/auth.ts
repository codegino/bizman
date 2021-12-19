import {NextApiRequest, NextApiResponse} from 'next';
import {supabase} from '../../utils/supabase-client';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
  return res.status(200);
}
