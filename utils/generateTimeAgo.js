const formatDate = (date) => {
  return (
    String(date.getDate()).padStart(2, "0") +
    "." +
    String(date.getMonth() + 1).padStart(2, "0") +
    "." +
    date.getFullYear()
  );
};

const formatTime = (date) => {
  return (
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes() + 1).padStart(2, "0")
  );
};

module.exports = (publishedDate) => {
  const diff = new Date().getTime() - publishedDate.getTime();
  const day = 1000 * 60 * 60 * 24;
  const daysAgo = Math.floor(diff / day);

  if (!daysAgo) {
    return `Today ${formatTime(publishedDate)}`;
  }
  if (daysAgo === 1) {
    return "Yesterday";
  }
  if (daysAgo <= 14) {
    return `${daysAgo} days ago`;
  }

  return `${formatDate(publishedDate)} ${formatTime(publishedDate)}`;
};
