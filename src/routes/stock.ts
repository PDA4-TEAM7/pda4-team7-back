import express from "express";
// import { deleteComment, readComment, writeComment } from "../controllers/comment";

import { stockList } from "../controllers/stockListAPI";

export default (router: express.Router) => {
  //컨트롤러연결
  router.post("/stock", stockList);
};
