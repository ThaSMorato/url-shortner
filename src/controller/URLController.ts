import { config } from "config/Constants";
import { URLModel } from "database/model/URL";
import { Request, Response } from "express";
import shortid from "shortid";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    const url = await URLModel.findOne({ originURL });

    if (url) {
      res.json(url);
      return;
    }

    const hash = shortid.generate();

    const shortURL = `${config.API_URL}/${hash}`;

    const newUrl = await URLModel.create({ originURL, shortURL, hash });

    res.json(newUrl);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await URLModel.findOne({ hash });

    if (!url) {
      res.status(400).json({ error: "URL not found" });
      return;
    }

    res.redirect(url.originURL);
  }
}
