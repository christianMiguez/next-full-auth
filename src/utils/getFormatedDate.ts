export const getFormatedDate = (date: Date) => {
  const formatedDate = date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

  return formatedDate.toUpperCase();
};
