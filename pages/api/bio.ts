/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { IBio } from "../../components/About/Bio";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const data = JSON.parse(req.body) as IBio;
      const { companyURL, job: combined, location: currentLocation } = data;
      const parts = combined.split(",");
      if (parts.length != 2) {
        throw new Error("Job is not in the correct format");
      }
      const job = parts[0];
      const company = parts[1].trimStart().trimEnd();

      await prisma.biography.update({
        where: {
          id: 1,
        },
        data: {
          company,
          companyURL,
          job,
          currentLocation,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
      return;
    }

    res.status(200).send({ status: "OK" });
    return;
  } 

  if (req.method == "GET") {
    const bio = await prisma.biography.findUnique({
      where: {
        id: 1
      }
    });
    res.status(200).send(bio);
  }
};
