const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
};

export default normalizePort;
