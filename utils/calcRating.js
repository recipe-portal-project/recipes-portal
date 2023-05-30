module.exports = (comments) => {
  return (
    Math.round(
      comments.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      ) / comments.length
    ) || 5
  );
};
