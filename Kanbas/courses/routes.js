import Database from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        // const courses = Database.courses;
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.post("/api/courses", async (req, res) => {
        // const course = { ...req.body, _id: new Date().getTime().toString() };
        // Database.courses.push(course);
        // res.send(course);
        try {
            const course = await dao.createCourse(req.body);
            res.json(course);
        } catch (err) {
            console.log(err);
            res.send(401);
        }
    });
    app.delete("/api/courses/:id", async (req, res) => {
        // const { id } = req.params;
        // Database.courses = Database.courses.filter((c) => c._id !== id);
        // res.sendStatus(204);
        const status = await dao.deleteCourse(req.params.id);
        res.json(status);
    });
    app.put("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = req.body;
        // Database.courses = Database.courses.map((c) =>
        //     c._id === id ? { ...c, ...course } : c
        // );

        const status = await dao.updateCourse(id, course);
        res.json(status);
    });
    app.get("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        // const course = Database.courses.find((c) => c._id === id);

        const course = await dao.findCourseById(id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course);
    });
}
