import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
    {
        _id: { type: String },
        name: { type: String },
        number: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        section: { type: String },
        image: { type: String },
    },
    { collection: "courses" }
);
export default courseSchema;
