export async function getAllProfileUrl() {
  const data = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

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
  const data = await fetch(`http://localhost:3000/api/user/${urlHandle}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data.user;
}

export async function getUserFriends(id) {
  const data = await fetch(`http://localhost:3000/api/user/${id}/friend`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data.friends;
}
