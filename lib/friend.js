export async function sendFriendReq(userId) {
  const token = localStorage.getItem("token");

  const friendRequest = await fetch(
    `https://odinbook-backend-iccv.onrender.com/api/user/${userId}/friend/request/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return friendRequest;
}

export async function removeOutgoingFriendReq(reqId) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const friendRequest = await fetch(
    `https://odinbook-backend-iccv.onrender.com/api/user/${id}/friend/request/outgoing/${reqId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return friendRequest;
}

export async function denyFriendReq(reqId) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const friendRequest = await fetch(
    `https://odinbook-backend-iccv.onrender.com/api/user/${id}/friend/request/${reqId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return friendRequest;
}

export async function acceptFriendReq(reqId) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const friendRequest = await fetch(
    `https://odinbook-backend-iccv.onrender.com/api/user/${id}/friend/request/${reqId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return friendRequest;
}

export async function removeFriend(userId) {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const friendRequest = await fetch(
    `https://odinbook-backend-iccv.onrender.com/api/user/${id}/friend/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  return friendRequest;
}
