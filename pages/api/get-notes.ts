/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const notes = await prisma.note.findMany({
    where: {
      visible: true,
    },
    include: {
      user: true
    }
  });
  res.status(200).json(notes);

};
