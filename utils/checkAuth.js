module.exports = (login, password, baseUrl) => {
  return new Promise(async (resolve, reject) => {
    resolve({ auth: true });
  });
};
