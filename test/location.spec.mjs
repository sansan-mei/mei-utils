import { getLocation } from "../dist/index.js";

getLocation("43.202.59.206")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

getLocation()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
