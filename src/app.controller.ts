import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request } from 'express';
import fetch, { RequestInit } from 'node-fetch';

@Controller()
export class AppController {
  constructor() {
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const targetBaseUrl = process.env.DOWNSTREAM_SERVER_LOCATION ?? 'http://swapi.py4e.com/api';
    const targetUrl = `${targetBaseUrl}${req.originalUrl}`;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {},
      body: req.body,
      params: new URLSearchParams(req.query as Record<string,string>),
    } as RequestInit);

    return response.ok 
      ? await response.json()
      : new Error(response.statusText, {cause: {status: response.status, message: response.statusText}})
  }
}
