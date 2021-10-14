const post = async <T extends Object>(url: string, body: T) => {
  return await fetch(url, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  });
};

export default post;
