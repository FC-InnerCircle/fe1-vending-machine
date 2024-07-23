export class TestSuite {
  private tests: { name: string; test: () => void }[] = [];

  addTest(name: string, test: () => void) {
    this.tests.push({ name, test });
  }

  run() {
    console.log("Running tests...");
    this.tests.forEach(({ name, test }) => {
      try {
        test();
        console.log(`✅ ${name} passed`);
      } catch (error) {
        console.error(`❌ ${name} failed: ${(error as Error).message}`);
      }
    });
  }
}

export const assertEquals = (actual: any, expected: any, message?: string) => {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`);
  }
};
