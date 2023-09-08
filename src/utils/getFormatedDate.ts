export const getFormatedDate = (date: Date) => {
  const formatedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatedDate;
};
