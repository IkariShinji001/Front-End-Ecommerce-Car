const jwt = require('jsonwebtoken');

export const isLogin = () =>{
    const token = localStorage.getItem("token");
    if (token) {
        try {
          const decodedToken = jwt.verify(token, "Maybachgls600");
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            return false;
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
}