const request = async (url, options = {}) => {
  const token = localStorage.getItem("autocare_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "Unexpected server response" };
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("autocare_token");
      localStorage.removeItem("autocare_user");
    }
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const api = {
  register: (body) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  login: (body) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  customers: {
    all: () => request("/api/customers"),
    one: (id) => request(`/api/customers/${id}`),
    create: (body) =>
      request("/api/customers", {
        method: "POST",
        body: JSON.stringify(body)
      }),
    update: (id, body) =>
      request(`/api/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(body)
      }),
    remove: (id) =>
      request(`/api/customers/${id}`, {
        method: "DELETE"
      })
  },

  vehicles: {
    all: () => request("/api/vehicles"),
    one: (id) => request(`/api/vehicles/${id}`),
    create: (body) =>
      request("/api/vehicles", {
        method: "POST",
        body: JSON.stringify(body)
      }),
    update: (id, body) =>
      request(`/api/vehicles/${id}`, {
        method: "PUT",
        body: JSON.stringify(body)
      }),
    remove: (id) =>
      request(`/api/vehicles/${id}`, {
        method: "DELETE"
      })
  },

  serviceRequests: {
    all: () => request("/api/service-requests"),
    one: (id) => request(`/api/service-requests/${id}`),
    create: (body) =>
      request("/api/service-requests", {
        method: "POST",
        body: JSON.stringify(body)
      }),
    update: (id, body) =>
      request(`/api/service-requests/${id}`, {
        method: "PUT",
        body: JSON.stringify(body)
      }),
    remove: (id) =>
      request(`/api/service-requests/${id}`, {
        method: "DELETE"
      })
  },

  admin: {
    users: () => request("/api/admin/users")
  }
};
