import { Log } from "./components/log.js";

const logWrapper = document.getElementById("log-wrapper");

export const addLog = (content: string) => {
  const newLog = new Log(content);

  if (logWrapper) logWrapper.appendChild(newLog.render());
};
