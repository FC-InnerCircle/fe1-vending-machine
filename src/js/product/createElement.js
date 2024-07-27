// utils.js

/**
 * 주어진 태그 이름과 속성을 기반으로 새로운 DOM 요소를 생성합니다.
 * @param {string} tagName - 생성할 태그의 이름 (예: 'div', 'span', 'button' 등)
 * @param {Object} [attributes={}] - 요소에 설정할 속성 객체
 * @param {...(string|Node)} children - 요소에 추가할 자식 노드 (문자열 또는 다른 DOM 노드)
 * @returns {HTMLElement} - 생성된 DOM 요소
 */
function createElement(tagName, attributes = {}, ...children) {
  // 태그 이름으로 새로운 요소 생성
  const element = document.createElement(tagName);

  // 속성 설정
  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('data-')) {
      // data-* 속성인 경우
      element.setAttribute(key, value);
    } else if (key in element) {
      // 요소의 속성인 경우
      element[key] = value;
    } else {
      // 그 외의 경우
      element.setAttribute(key, value);
    }
  }

  // 자식 요소 추가
  for (const child of children) {
    if (typeof child === 'string') {
      // 문자열인 경우 텍스트 노드로 추가
      element.appendChild(document.createTextNode(child));
    } else {
      // DOM 노드인 경우 그대로 추가
      element.appendChild(child);
    }
  }

  return element;
}

// 이 함수를 모듈로 내보내기
export { createElement };