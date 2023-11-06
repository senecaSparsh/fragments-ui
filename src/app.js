// src/app.js

import { Auth, getUser } from "./auth";
import {
  getUserFragmentList,
  getUserFragments,
  postUserFragments,
  getFragmentDataById,
  getFragmentInfo,
} from "./api";
async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");
  const postSection = document.querySelector("#post");
  const postBTN = document.querySelector("#postBtn");
  const getBTN = document.querySelector("#getBtn");
  const getListBTN = document.querySelector("#getListBtn");
  const getByIdBTN = document.querySelector("#getByIdBtn");
  const getInfoBTN = document.querySelector("#getInfoBtn");

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }
  postBTN.onclick = () => {
    let type = document.querySelector("#types").value;
    console.log(type);
    postUserFragments(user, data, type);
  };

  getBTN.onclick = () => {
    getUserFragments(user);
  };

  getListBTN.onclick = () => {
    getUserFragmentList(user);
  };

  getByIdBTN.onclick = () => {
    let id = document.querySelector("#id").value;
    getFragmentDataById(user, id);
  };

  getInfoBTN.onclick = () => {
    let id = document.querySelector("#id").value;
    getFragmentInfo(user, id);
  };

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(".username").innerHTML = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  if ((loginBtn.disabled = true)) {
    postSection.hidden = false;
  }

  // Do an authenticated request to the fragments API server and log the result
  getUserFragments(user);
}

// Wait for the DOM to be ready, then start the app
addEventListener("DOMContentLoaded", init);
