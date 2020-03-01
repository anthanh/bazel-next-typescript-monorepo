function doSomething(data) {
  console.log("common.helper", data);
  return `common.helper: ${data}`
}

module.exports = doSomething;
