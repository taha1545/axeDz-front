import api from "./api";

export async function signInUser(email:string, password:string) {
  try {
    
    const response = await api.post(
      "/auth/login",
      {
        identifier: email,
        password: password,
      }
    );
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}