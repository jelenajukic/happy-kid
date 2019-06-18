import axios from "axios";

class UserService {
  service = axios.create({
    baseURL: "http://localhost:5000/user",
    withCredentials: true
  });

  messages = (id) => {
    return this.service
      .get(`/messages/?id=${id}`)
      .then(response => response.data);
  }

  parentKids = (parentId) => {
    return this.service
    .get(`/parentKids/?id=${parentId}`)
    .then(response => response.data);
  }

  createNotification = (notification, date, kidID) => {
    return this.service
      .post("/createNotification", { notification: notification, kidID: kidID, date:date })
      .then(response => response.data);
  }
}

export default UserService;