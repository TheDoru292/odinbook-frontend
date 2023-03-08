export async function getAllProfileUrl() {
  const data = await fetch(
    "https://odinbook-backend-zoih.onrender.com/api/user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const mappedData = data.users.map((user) => {
    return {
      params: {
        id: user.url_handle,
      },
    };
  });

  return mappedData;
}

export async function getUserData(urlHandle) {
  const data = await fetch(
    `https://odinbook-backend-zoih.onrender.com/api/user/${urlHandle}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data.user;
}

export async function getUserFriends(id) {
  const data = await fetch(
    `https://odinbook-backend-zoih.onrender.com/api/user/${id}/friend`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data.friends;
}
