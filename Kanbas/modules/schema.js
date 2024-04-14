import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
    {
        _id: { type: String },
        name: { type: String },
        description: { type: String },
        course: { type: String },
        lessons: { type: Array },
    },
    { collection: "modules" }
);
export default moduleSchema;
