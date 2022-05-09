import express from "express";

type Request = express.Request & {
  userId?: string;
};

export default Request;
