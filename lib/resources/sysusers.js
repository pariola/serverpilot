/*
ServerPilot API - Servers
*/

const route = "sysusers";

module.exports = {
  /*
  List System Users
  */
  list: {
    method: "get",
    route: route
  },
  /*
  Get System User
  */
  get: {
    method: "get",
    route: `${route}/{id}`
  },
  /*
  Create System User
  */
  create: {
    method: "post",
    route: route,
    params: ["serverid*", "name*"]
  },
  /*
  Update System User
  */
  update: {
    method: "post",
    route: `${route}/{id}`,
    params: ["password*"]
  },
  /*
  Delete System User
  */
  delete: {
    method: "delete",
    route: `${route}/{id}`
  }
};
