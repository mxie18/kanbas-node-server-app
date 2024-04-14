import db from "../Database/index.js";
import * as dao from "./dao.js";

function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;

        try {
            const newModule = await dao.createModule({
                ...req.body,
                course: cid,
                _id: new Date().getTime().toString(),
            });
            res.send(newModule);
        } catch (err) {
            res.send(401);
        }
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        // const modules = db.modules.filter((m) => m.course === cid);

        const modules = await dao.findAllModules();
        res.send(modules.filter((m) => m.course === cid));
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        // db.modules = db.modules.filter((m) => m._id !== mid);

        const status = await dao.deleteModule(mid);
        res.send(status);
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        // const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        // db.modules[moduleIndex] = {
        //     ...db.modules[moduleIndex],
        //     ...req.body,
        // };
        const status = await dao.updateModule(mid, module);
        res.send(status);
    });
}
export default ModuleRoutes;
