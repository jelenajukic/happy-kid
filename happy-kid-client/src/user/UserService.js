import axios from "axios";

class UserService {
  service = axios.create({
    // baseURL: "http://localhost:5000/user",
    baseURL:"https://happy-kid.herokuapp.com/user",
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
      .post("/createNotification", { notification: notification, kidID: kidID, date: date })
      .then(response => response.data);
  }

  createChatUser = (userId) => {
    return this.service
      .post("/users", { userId: userId })
      .then(response => response.data)
  }

  getUserRooms = (userId) => {
    return this.service
      .post("/getrooms", { userId: userId })
      .then(response => response.data)
  }

  getAllRooms = () => {
    return this.service
    .get("/getallrooms")
    .then(response => response.data)
  }

  fetchRoomMessages = (roomId) => {
    return this.service
    .get(`/fetchroommessages/?roomId=${roomId}`)
    .then(response => response.data)
  }
}

export default UserService;