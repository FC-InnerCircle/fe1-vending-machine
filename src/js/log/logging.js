function logging(txt) {
  const logger = document.querySelector('.container__controller__logger')
  const li = document.createElement('li')
  li.innerText = txt
  logger.append(li)

  logger.scrollTop = logger.scrollHeight;
}

export { logging }