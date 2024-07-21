document.addEventListener('DOMContentLoaded', function () {
    // 상태 변경을 구독하여 렌더링 업데이트
    state.subscribe(render.update);

    // 초기 렌더링
    render.update(state.getState());

    // 이벤트 핸들러 설정
    document.getElementById('myButton').addEventListener('click', function () {
        state.setState({ count: state.getState().count + 1 });
    });
});