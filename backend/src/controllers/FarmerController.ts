import { RequestHandler, Request } from "express";
import { prisma } from "../database";
import { sendResponse } from "../helpers";
import { getImageUri } from "../helpers/getImageUri";
const Farmers = prisma.farmers;

declare global {
  namespace Express {
    interface Request {
      user?: { walletAddress: string; GUID: string; uid: number };
    }
  }
}

export class FarmerController {
  static getFarmers: RequestHandler = async (req: Request, res) => {
    const { walletAddress } = req.user!;
    const results = await Farmers.findMany({
      where: { metamask_account: walletAddress },
    });
    sendResponse(res, { data: results[0], user: req.user });
  };
  static updateFarmer: RequestHandler = async (req, res) => {
    const { id, ...rest } = req.body;
    const { walletAddress } = req.user!;
    
    const results = await Farmers.updateMany({
      data: rest,
      where: { metamask_account: walletAddress },
    });
    sendResponse(res, { data: results.count, user: req.user });
  };

  static createFarmer: RequestHandler = async (req, res) => {
    const { walletAddress } = req.user!;
    const image = req.file;

    const results = await Farmers.create({
      data: {
        metamask_account: walletAddress,
        poolAddress: req.body.poolAddress,
        picture: getImageUri(image.filename),
        description: req.body.description,
        name: req.body.name,
      },
    });
    sendResponse(res, { data: results, user: req.user });
  };
}
