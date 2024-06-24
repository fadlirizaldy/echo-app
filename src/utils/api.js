import { toast } from "react-toastify";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("token");
}

function putAccessToken(token) {
  return localStorage.setItem("token", token);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function postLogin({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, message: responseJson.message, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postRegister({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, message: responseJson.message };
  }

  return { error: false, message: responseJson.message };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// ================== THREAD ===================

async function postNewThread({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/threads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`, { method: "GET" });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: null,
      status: response.status,
    };
  }

  return {
    error: false,
    data: responseJson.data.threads,
    status: response.status,
  };
}

async function getDetailThread(id) {
  const response = await fetch(`${BASE_URL}/threads/${id}`, { method: "GET" });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.detailThread };
}

// ============ COMMENT Of Thread ================
async function postCreateComment(threadId, content) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postUpVoteThread(id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/up-vote`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postDownVoteThread(id) {
  const response = await fetchWithToken(`${BASE_URL}/threads/${id}/down-vote`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postNeutralVoteThread(id) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${id}/neutral-vote`,
    {
      method: "POST",
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postUpVoteComment(threadId, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: "POST",
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postDownVoteComment(threadId, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: "POST",
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function postNeutralVoteComment(threadId, commentId) {
  const response = await fetchWithToken(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: "POST",
    }
  );

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// ========== Leaderboard =================
async function getLeaderboard() {
  const response = await fetchWithToken(`${BASE_URL}/leaderboards`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return {
      error: true,
      data: null,
      status: response.status,
    };
  }

  return {
    error: false,
    data: responseJson.data.leaderboards,
    status: response.status,
  };
}

export {
  getAccessToken,
  putAccessToken,
  postLogin,
  postRegister,
  getUserLogged,
  getAllUsers,
  postNewThread,
  getAllThreads,
  getDetailThread,
  postCreateComment,
  postUpVoteThread,
  postDownVoteThread,
  postNeutralVoteThread,
  postUpVoteComment,
  postDownVoteComment,
  postNeutralVoteComment,
  getLeaderboard,
};
