// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fluenceGetRelayTime, fluenceSayHello, fluenceTellFortune } from '@/index';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    fluenceData: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let fluenceData = '';
    if (!req.query || req.query['hello']) {
        fluenceData = await fluenceSayHello();
    }
    if (req.query['fortune']) {
        fluenceData = await fluenceTellFortune();
    }
    if (req.query['relay']) {
        fluenceData = await fluenceGetRelayTime();
    }
    res.status(200).json({ fluenceData });
}
