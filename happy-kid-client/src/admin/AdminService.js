import axios from "axios";
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class AuthService {
  service = axios.create({
    baseURL: "http://localhost:5000/admin",
    // baseURL:"https://happy-kid.herokuapp.com/admin",
    withCredentials: true
  });

  users = () => {
    return this.service
      .get("/users")
      .then(response => response.data);
  }

  addMessage = (kidID, images, messageTitle,  messageBody) => {
    return this.service
      .post("/add-message", { kidID: kidID, images: images, messageTitle: messageTitle, messageBody: messageBody })
      .then(response => response.data);
  }

  addKid = (kidName, kidLastName, group) => {
    return this.service
      .post("/add-kid", { kidName: kidName, kidLastName: kidLastName, group: group })
      .then(response => response.data);
  }

  parents = () => {
    return this.service
      .get("/parents")
      .then(response => response.data);
  }

  kids = () => {
    return this.service
      .get("/kids")
      .then(response => response.data);
  }

  editParent = (parentID, kidIDs) => {
    return this.service
      .post("/editParent", { parentID: parentID, kidIDs: kidIDs })
      .then(response => response.data);
  }

  agenda = (date) => {
    return this.service
      .get(`/agenda/?date=${moment(date).format('DD-MM-YYYY')}`)
      .then(response => response.data);
  }
}

export default AuthService;