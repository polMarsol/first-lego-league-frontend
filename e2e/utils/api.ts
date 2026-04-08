import { APIRequestContext, expect } from "@playwright/test";
import { TestUser } from "./test-data";

const DEFAULT_API_BASE_URL = "https://api.firstlegoleague.win";

export function getApiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

function getBasicAuthHeader(user: TestUser) {
    const token = Buffer.from(`${user.username}:${user.password}`).toString("base64");
    return `Basic ${token}`;
}

export async function createUserViaApi(request: APIRequestContext, user: TestUser) {
    const response = await request.post(`${getApiBaseUrl()}/users`, {
        headers: {
            Accept: "application/hal+json",
            "Content-Type": "application/json",
        },
        data: {
            id: user.username,
            email: user.email,
            password: user.password,
        },
    });

    expect(response.status(), await response.text()).toBe(201);
}

export async function createRecordViaApi(
    request: APIRequestContext,
    user: TestUser,
    name: string
) {
    const response = await request.post(`${getApiBaseUrl()}/records`, {
        headers: {
            Accept: "application/hal+json",
            "Content-Type": "application/json",
            Authorization: getBasicAuthHeader(user),
        },
        data: {
            name,
            description: "Record created by the Playwright E2E suite.",
            owner: `${getApiBaseUrl()}/users/${encodeURIComponent(user.username)}`,
        },
    });

    expect(response.status(), await response.text()).toBe(201);
}

export async function hasRecordsApi(request: APIRequestContext) {
    const response = await request.get(`${getApiBaseUrl()}/`, {
        headers: {
            Accept: "application/hal+json",
        },
    });

    expect(response.status(), await response.text()).toBe(200);

    const body = await response.json();
    return Boolean(body?._links?.records?.href);
}
