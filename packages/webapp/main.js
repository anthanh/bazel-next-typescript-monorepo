const doSomething = require("@monorepo/common/helpers");
const _ = require("lodash");

const data = {};

doSomething(_.get(data, "somewhere", "webapp"));
