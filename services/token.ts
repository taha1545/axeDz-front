
export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
};

export const setAccessToken = (token: string): void => {
    localStorage.setItem("accessToken", token);
};

export const clearAuthTokens = (): void => {
    localStorage.removeItem("accessToken");
};