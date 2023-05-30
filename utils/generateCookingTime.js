module.exports = (cookingTime) => {
  const days = Math.floor(cookingTime / (60 * 24));
  const hours = Math.floor((cookingTime - days * 60 * 24) / 60);
  const minutes = cookingTime - days * 60 * 24 - hours * 60;
  return `${days ? `${days}D` : ""} ${hours ? `${hours}H` : ""} ${
    minutes ? `${minutes} MIN` : ""
  }`;
};
