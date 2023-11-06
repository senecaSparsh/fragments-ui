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
    console.log(data);
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}

export async function postUserFragments(user, data, type) {
  console.log("Posting user fragments data...");
  try {
    if (type == "application/json") {
      data = JSON.parse(JSON.stringify(data));
      console.log(data);
    }
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "post",
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
        "Content-type": type,
      },
      body: data,
    });

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
    console.log(data);
  } catch (err) {
    console.error("Unable to call GET /v1/fragment/?expand=1", { err });
  }
}

export async function getFragmentDataById(user, id) {
  try {
    if (id != "") {
      console.log(`Requesting user fragments data by id...${id}`);
      console.log(`fetching ${apiUrl}/v1/fragments/${id}`);
      const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
        headers: {
          // Include the user's ID Token in the request so we're authorized
          Authorization: `Bearer ${user.idToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const type = res.headers.get("Content-Type");
      if (type.includes("text")) {
        const data = await res.text();
        console.log(`Got user fragment by id ${id}:` + data);
        document.getElementById("dataBack").innerHTML = data;
      }
      if (type.includes("json")) {
        const data = await res.json();
        console.log(data);
      }
    } else {
      document.getElementById("dataBack").textContent = "id can not be empty";
    }
  } catch (err) {
    console.error(`Unable to call GET /v1/fragment/ ${id}`, { err });
  }
}

export async function getFragmentInfo(user, id) {
  console.log(`Requesting user fragments info by id...${id}`);
  console.log(`fetching ${apiUrl}/v1/fragments/${id}/info`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(`Unable to call GET /v1/fragments/${id}/info`, { err });
  }
}
