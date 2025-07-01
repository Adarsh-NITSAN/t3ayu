const fetchData = async (url) => {
  let res = await fetch(`${url}`);
  let data = await res.json();
  if (res.status === 500) {
    throw new Error("Something went wrong!");
  }

  if (!res.ok) {
    return {
      data: data ? data : null,
      error: true,
    };
  }

  if (data) {
    return {
      data: data,
      error: false,
    };
  }
};

const getAPIData = async (url) => {
  const data = await fetchData(process.env.NEXT_PUBLIC_API_URL + url);
  return data;
};
export default getAPIData;
