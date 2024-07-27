# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server
❗추가 스펙 - 7월 20일, 질문과 대화를 통해서 추가된 스펙
- 상품 버튼을 눌렀을 때 투입된 금액이 상품 가격보다 적으면 버튼을 누르는 동안 금액 표시창에 상품의 가격이 표시됩니다. 버튼을 누르지 않을 때는 투입된 금액이 표시됩니다.
- 금액을 투입하고 난 다음에는 금액 입력창을 빈 칸으로 초기화합니다.
- 박스 크기보다 로그가 길어지면 스크롤됩니다. 또한 가장 마지막 로그까지 스크롤이 이동합니다.
- [선택사항] 반응형 화면을 구성합니다.
  - 화면이 작아지면 자판기 박스 아래에 금액 투입 및 로그 UI가 위치합니다.
  - 자판기 박스의 너비는 화면 너비를 넘을 수 없습니다.

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
