import apiUtils from "~root/apiUtils/apiUtils";
import Event from "~root/types/event";

const addEvent = async (event: Event) => {
  return await apiUtils("http://localhost:5001/event", event);
};
export default addEvent;
