/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const bio = await prisma.biography.findUnique({
    where: {
      id: 1
    }
  });
  res.status(200).json(bio);

};
