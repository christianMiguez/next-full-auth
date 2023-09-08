import { headers } from "next/headers";

const getTasks = async () => {
  let fetchConfig: any = {
    method: "GET",
  };
  if (process.env.NODE_ENV !== "production") {
    fetchConfig = {
      ...fetchConfig,
      headers: headers(),
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks`,
    fetchConfig
  );
  const data = res.json();
  return data;
};

export default getTasks;
