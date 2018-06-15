const axios = require("axios");

const baseURL = "https://api.serverpilot.io/v1";

const resources = {
  servers: require("./resources/servers"),
  sysusers: require("./resources/sysusers")
};

function ServerPilot(auth) {
  if (!auth) {
    throw new Error("You must provide auth object");
  }

  if (!auth.clientId || !auth.key) {
    throw new Error("You must provide a CLIENT ID and an API KEY");
  }

  this.auth = auth;
  this.import();
}

ServerPilot.prototype.extend = function(func) {
  const me = this;
  return function() {
    const data = arguments[0] || {};

    const req = {};

    var endpoint = `${baseURL}/${func.route}`;

    if (func.params) {
      func.params.filter(param => {
        if (!param.includes("*")) return;

        param = param.replace("*", "");
        if (!(param in data)) {
          throw new Error(`Parameter '${param}' is required`);
        }

        return;
      });
    }

    var argsInEndpoint = endpoint.match(/{[^}]+}/g);
    if (argsInEndpoint) {
      argsInEndpoint.map(arg => {
        arg = arg.replace(/\W/g, "");
        if (!(arg in data)) {
          throw new Error(`Argument '${arg}' is required`);
        } else {
          endpoint = endpoint.replace(`{${arg}}`, data[`${arg}`]);
        }
      });
    }

    req.endpoint = endpoint;
    req.method = func.method;
    if (func.method == "post") req.body = data;

    const method = req.method.toUpperCase();
    return axios({
      method: method,
      url: req.endpoint,
      auth: {
        username: me.auth.clientId,
        password: me.auth.key
      },
      data: method == "POST" ? req.body : null
    })
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.response ? err.response.data : err));
  };
};

ServerPilot.prototype.import = function() {
  for (var i in resources) {
    const anon = function() {};
    for (var j in resources[i]) {
      anon.prototype[j] = this.extend(resources[i][j]);
    }
    ServerPilot.prototype[i] = new anon();
  }
};

module.exports = ServerPilot;
