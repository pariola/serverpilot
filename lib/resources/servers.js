/*
ServerPilot API - Servers
*/

const route = "servers";

module.exports = {
  /*
  List Server
  */
  list: {
    method: "get",
    route: route
  },
  /*
  Get Server
  */
  get: {
    method: "get",
    route: `${route}/{id}`
  },
  /*
  Update Server
  */
  update: {
    method: "post",
    route: `${route}/{id}`
  },
  /*
  Delete Server
  */
  delete: {
    method: "delete",
    route: `${route}/{id}`
  }
};
