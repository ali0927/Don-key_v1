import { RequestHandler } from "express";
import { prisma } from "../database";
import { sendResponse } from "../helpers";
import { getImageUri } from "../helpers/getImageUri";

const Developers = prisma.developers;

const DeveloperVote = prisma.developervote;

export class DeveloperController {

  // static getCountCubes: RequestHandler = async (req, res) => {
  //   const result = await Developers.aggregate({ count: { _all: true } });
  //   sendResponse(res, { data: result.count["_all"] });
  // }


  static getCubes: RequestHandler = async (req, res) => {
    const { walletAddress } = req.user!;
    const results = await Developers.findMany({orderBy: {id: "desc"}});
    const uservottedcubes = await DeveloperVote.findMany({ where: { walletaddress: walletAddress }, select: { devcubeid: true } });
    sendResponse(res, {
      data: {
        cubes: results,
        uservottedcubes: uservottedcubes,
      }
    });
  }

  static createCube: RequestHandler = async (req, res) => {
    const { namecube, githublink } = req.body;
    const { walletAddress } = req.user!;
    const image = req.file;


    const results = await Developers.create({
      data: {
        protocol: namecube,
        githublink: githublink,
        developeraddress: walletAddress,
        iconname: getImageUri(image.filename),
      },
    });
    sendResponse(res, { data: results });
  };

  static addVote: RequestHandler = async (req, res) => {
    const { developercubeid } = req.body;
    const { walletAddress } = req.user!;

    const developersresult = await Developers.findFirst({ where: { id: developercubeid } });

    const isVoteAlreadyExists = await DeveloperVote.findFirst({
      where: {
        AND: [
          {
            devcubeid: { equals: parseInt(developercubeid) },
            walletaddress: { equals: walletAddress },
          }
        ]
      }
    });

    if (isVoteAlreadyExists) {
      return sendResponse(res, { data: { msg: "Already votted by user" }, code: 406 });
    }

    if (!developersresult) {
      return sendResponse(res, { data: { msg: "Cube Not Found" }, code: 404 })
    }




    await Developers.update({
      data: {
        votes: developersresult.votes + 1,
      },
      where: { id: developercubeid },
    });

    const result = await DeveloperVote.create({
      data: {
        devcubeid: developercubeid,
        walletaddress: walletAddress,
      }
    });

    sendResponse(res, { data: {
         useVottedCube: result.devcubeid
    } });

  }
}
