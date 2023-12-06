// src/app.js
import { Auth, getUser } from "./auth";
import {
  getUserFragments,
  postUser,
  getUserFragmentById,
  getFragmentbyInfo,
} from "./api";
import { putUser } from "./api";
import { deleteUser } from "./api";

async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");
  const buttonFragment = document.querySelector("#fragButton");
  const fragmentContent = document.querySelector("#new-Fragments");
  const getFragmentfileBtn = document.querySelector("#fragButtonfile");
  const fragmentfile = document.querySelector("#new-Fragment-file");

  const getFragmentBtn = document.querySelector("#getFragmentBtn");
  const fragmentType = document.querySelector("#fragmentType");
  const delete_id = document.querySelector("#deleteID");
  const deletebtn = document.querySelector("#deletebtn");
  const update_id = document.querySelector("#updateID");
  const updatebtn = document.querySelector("#updatebtn");
  const updateContent = document.querySelector("#updateContent");
  const updateType = document.querySelector("#updateType");
  const getByIdBtn = document.querySelector("#getbyid");
  const get_id = document.querySelector("#get_id");
  const getByIdData = document.querySelector("#content-type");
  const getByIdInfo = document.querySelector("#getInfo");

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
  buttonFragment.onclick = () => {
    postUser(user, fragmentContent.value, fragmentType.value);
  };
  getFragmentfileBtn.onclick = () => {
    postUser(user, fragmentfile.value, fragmentType.value);
  };
  getByIdBtn.onclick = async () => {
    getByIdData.innerHTML = await getUserFragmentById(user, get_id.value);
  };
  getByIdInfo.onclick = async () => {
    var data = await getFragmentbyInfo(user, get_id.value);
    getByIdData.innerHTML = JSON.stringify(data);
  };
  getFragmentBtn.onclick = () => {
    let fragmentHtml = "";
    let fragmentList = document.querySelector(".fragmentList");
    fragmentList.innerHTML = "";
    let allFragments = getUserFragments(user).then((data) => {
      if (data.length) {
        // Create the titles for each column and add to the table
        let header = document.createElement("tr");
        let headerOptions = ["id", "created", "updated", "type"];
        for (let column of headerOptions) {
          let th = document.createElement("th");
          th.append(column);
          header.appendChild(th);
        }
        fragmentList.appendChild(header);

        for (let fragment of data) {
          console.log("fragment", fragment);
          let tr = document.createElement("tr");
          let id = document.createElement("td");
          let created = document.createElement("td");
          let updated = document.createElement("td");
          let type = document.createElement("td");

          id.append(fragment.id);
          created.append(fragment.created);
          updated.append(fragment.updated);
          type.append(fragment.type);
          tr.append(id, created, updated, type);

          fragmentList.appendChild(tr);
        }
      } else {
        let td = document.createElement("td");
        td.append("No fragments were found");

        fragmentList.append(td);
      }
    });
    fragmentList.html = fragmentHtml;
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  getUserFragments(user);
  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(".username").innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  deletebtn.onclick = () => {
    deleteUser(user, delete_id.value);
  };

  updatebtn.onclick = () => {
    putUser(user, update_id.value, updateContent.value, updateType.value);
    console.log(
      "update id: " +
        update_id.value +
        " update content: " +
        updateContent.value +
        " update type: " +
        updateType.value
    );
  };
}

// Wait for the DOM to be ready, then start the app
addEventListener("DOMContentLoaded", init);
