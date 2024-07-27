describe("VendingMachine", () => {
  it("잔액의 초기값은 0이다.", () => {
    cy.visit("http://localhost:5173");

    cy.get(".bg-slate-200 > .h-10").contains("0");
  });

  it("원하는 금액을 입력하고, 투입버튼을 누르면 잔액이 증가하고 기록된다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("1000");

    cy.get("button").contains("투입").click();

    cy.get(".bg-slate-200 > .h-10").contains("1,000");
    cy.get("p").contains("1,000원을 투입했습니다.");
  });

  it("0원 이하의 금액은 투입할 수 없다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("0");

    cy.get("button").contains("투입").click();

    cy.get(".bg-slate-200 > .h-10").contains("0");

    cy.get("input[placeholder='금액을 입력하세요']").type("-1000");

    cy.get("button").contains("투입").click();

    cy.get(".bg-slate-200 > .h-10").contains("0");
  });

  it("잔액을 확인하고, 반환버튼을 누르면 잔액이 0원이 된다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("1000");

    cy.get("button").contains("투입").click();

    cy.get("button").contains("반환").click();

    cy.get(".bg-slate-200 > .h-10").contains("0");
    cy.get("p").contains("1,000원을 반환합니다.");
  });

  it("상품 버튼은 FE300 ~ FE1100까지 9개가 출력된다.", () => {
    cy.visit("http://localhost:5173");

    for (let i = 300; i <= 1100; i += 100) {
      cy.get("button").contains(`FE${i}`).should("exist");
    }
  });

  it("잔액은 세자리마다 콤마가 찍히고, 가운데 정렬된다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("1000000");

    cy.get("button").contains("투입").click();

    cy.get(".bg-slate-200 > .h-10").contains("1,000,000");
    cy.get(".bg-slate-200 > .h-10").should("have.class", "justify-center");
  });

  it("상품을 구매하면 잔액이 차감되고, history에 기록된다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("1000");

    cy.get("button").contains("투입").click();

    cy.get("button").contains("FE300").click();

    cy.get(".bg-slate-200 > .h-10").contains("700");
    cy.get("p").contains("FE300을 구입했습니다.");
  });

  it("상품 구입 후에 잔액이 상품 최소가보다 작으면 잔액을 반환한다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("400");

    cy.get("button").contains("투입").click();

    cy.get("button").contains("FE300").click({ force: true });

    cy.get(".bg-slate-200 > .h-10").contains("0");
    cy.get("p").contains("100원을 반환합니다.");
  });

  it("투입 금액보다 비싼 상품을 클릭하고 있으면, 상품 가격을 잔액에 표시한다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("100");

    cy.get("button").contains("투입").click();

    cy.get("button").contains("FE400").trigger("mousedown");

    cy.get(".bg-slate-200 > .h-10").contains("400");
  });

  it("금액을 투입하면 금액 입력창이 초기화된다.", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="금액을 입력하세요"]').type("1000");

    cy.get("button").contains("투입").click();

    cy.get('input[placeholder="금액을 입력하세요"]').should("have.value", "");
  });
});
