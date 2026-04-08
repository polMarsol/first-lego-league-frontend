export type TestUser = {
    username: string;
    email: string;
    password: string;
};

function randomSuffix() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createTestUser(prefix = "e2e-user"): TestUser {
    const username = `${prefix}-${randomSuffix()}`;

    return {
        username,
        email: `${username}@example.com`,
        password: "password123",
    };
}

export function createRecordName() {
    return `E2E Record ${randomSuffix()}`;
}
