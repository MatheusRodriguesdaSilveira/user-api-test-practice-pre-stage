const API_BASE_URL = "http://localhost:3333";

interface ApiResponse {
  token?: string;
  message?: string;
  error?: string;
  // Defina a estrutura de dados que sua API retorna
  [key: string]: any;
}

export async function callApi(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: object
): Promise<ApiResponse> {
  const url = `${API_BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const jsonResponse = (await response.json()) as ApiResponse;

    if (!response.ok) {
      // Lança um erro com a mensagem da API para o Controller Web capturar
      throw new Error(
        jsonResponse.error ||
          jsonResponse.message ||
          "Erro de comunicação com a API."
      );
    }

    return jsonResponse;
  } catch (error) {
    throw error;
  }
}
