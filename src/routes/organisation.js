import { Router } from "express";
import {OrganisationSignUp,OrganisationSignIn} from "../controller/auth/organisation.js"

const route= Router()

route.post("/signup",OrganisationSignUp)
route.post("/signin",OrganisationSignIn)

export default route;