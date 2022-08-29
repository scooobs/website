/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../prisma/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(500).json({ error: "Login" });
    return;
  }

  const note = await prisma.note.findUnique({
    where: {
      userId: session.user.id
    }
  });

  if (note) {
    res.status(500).json({ warning: "You have already left your mark" });
    return;
  }
  
  await prisma.note.create({
    data: {
      userId: session.user.id,
      
    }
  });

  res.status(200).json("ok");
  return;

};
