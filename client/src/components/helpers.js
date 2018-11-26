const helpers = {};

helpers.stringPxToNum = (string) => {
  const num = string.split('px');
  return Number(num[0]);
};

helpers.getHouseIdFromUrl = (pathname) => {
  const splitString = pathname.split('/');
  if (pathname.includes('homes')) {
    return splitString[2];
  }

  return Math.floor(Math.random() * 10e6) + 1;
};

export default helpers;
