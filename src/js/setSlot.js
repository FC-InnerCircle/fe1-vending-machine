import { setInsertEvent } from "./slot/setInsertEvent"
import { setReturnEvent } from "./slot/setReturnEvent";

function setSlot() {
  setInsertEvent();
  setReturnEvent();
}

export { setSlot }