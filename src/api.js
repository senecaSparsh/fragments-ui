// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
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

export async function postUserFragments(user, data) {
  console.log("Posting user fragments data...");
  try {
    const options = {
      body: data,
      method: "POST",
      headers: { Authorization: `Bearer ${user.idToken}` },
    };
    const res = await fetch(`${apiUrl}/v1/fragments`, options);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    console.log("Posted user fragments data", { data });
  } catch (err) {
    console.error("Unable to call POST /v1/fragment", { err });
  }
}

export async function getUserFragmentList(user) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragment list data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragment/?expand=1", { err });
  }
}

export async function getUserDataById(user, id) {
  console.log(`Requesting user fragments data by id...${id}`);
  console.log(`fetching ${apiUrl}/v1/fragments/${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragment data by id", { data });
  } catch (err) {
    console.error(`Unable to call GET /v1/fragment/ ${id}`, { err });
  }
}
