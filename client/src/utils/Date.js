function formatDate(time) {
  const date = new Date(time);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default formatDate;
