import { fromUnixTime } from 'date-fns';
import jwt from 'jsonwebtoken';
import * as requestIp from 'request-ip';
import UAParser from 'ua-parser-js';

import LoginSession from '../../../database/models/LoginSession';

import type { TokenPayload } from '../../../middlewares/authMiddleware';
import type { Request } from 'express';

const createLoginSession = async (request: Request, token: string): Promise<void> => {
  const userAgentParser = new UAParser(request.headers['user-agent']);
  const {
    browser: { name: browserName, version: browserVersion },
    device: { model: deviceModel, type: deviceType },
    os: { name: osName, version: osVersion },
    ua,
  } = userAgentParser.getResult();

  const { exp, iat, tokenUuid, userId } = jwt.decode(token) as TokenPayload;

  const loginSession = new LoginSession();
  loginSession.browser = browserName;
  loginSession.browserVersion = browserVersion;
  loginSession.deviceModel = deviceModel;
  loginSession.deviceType = deviceType;
  loginSession.ipAddress = requestIp.getClientIp(request) || undefined;
  loginSession.loggedInAt = fromUnixTime(Number(iat));
  loginSession.loggedOutAt = undefined;
  loginSession.os = osName;
  loginSession.osVersion = osVersion;
  loginSession.tokenExpirationDate = exp ? fromUnixTime(exp) : undefined;
  loginSession.tokenUuid = tokenUuid;
  loginSession.userAgent = ua;
  loginSession.userId = userId;

  await loginSession.save();
};

export default createLoginSession;
