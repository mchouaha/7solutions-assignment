// pages/api/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {TODO_CULINARY_LIST} from "@/constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(TODO_CULINARY_LIST);
}