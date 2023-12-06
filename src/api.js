// src/api.js

// fragments microservice API, defaults to localhost:8080
//const apiUrl = 'http://ec2-3-235-50-101.compute-1.amazonaws.com:8080';
const apiUrl = process.env.API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data.fragments;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function getUserFragmentById(user, fragmentId) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const headers = res.headers.get("content-type");
    const data = await res.text();

    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function postUser(user, fragmentContent, contentType) {
  console.log("posting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": contentType,
      },
      body: `${fragmentContent}`,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}
export async function putUser(user, fragmentId, fragmentContent, contentType) {
  console.log("putting user fragments data...");
  try {
    console.log("fragmentId", fragmentId);
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      method: "PUT",
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
        "Content-Type": `${contentType}`,
      },
      body: `${fragmentContent}`,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}
export async function deleteUser(user, fragmentId) {
  console.log("deleting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      method: "DELETE",
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function getFragmentbyInfo(user, id) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}
