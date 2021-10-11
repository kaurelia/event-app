const addEvent = async (data: {
  name: string;
  surname: string;
  email: string;
  date: string | null;
}) => {
  await fetch("http://localhost:5001/event", {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
};
export default addEvent;
