import { cleanEnv, str, port } from "envalid";

export default cleanEnv(process.env, {
    MONGO_DB_STRING: str(),
    PORT: port(),
})