import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log("headers log", req.headers);
    const token = req.headers.autorization.split(" ")[1];
    const isCustomeAuth = token.length < 500;
    let decodedData;

    if(token && isCustomeAuth){
      decodedData = jwt.verivy(token, "mearnAuth");
      if(decodedData.id){
        req.userId = decodedData.id;
      }
    }else{
      decodedData = jwt.verivy(token);
      if(decodedData.sub){
        req.userId = decodedData.sub;
      }
    }
    next();
  } catch (error) {

    console.log(error);
  }


}

export default auth;