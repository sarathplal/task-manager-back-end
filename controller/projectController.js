const projects = require('../model/projectSchema')

// Project creation Logic
exports.create = async (req, res) => {
    try {
        const { name } = req.body
        console.log(name);

        if (!name) {
            return res.status(403).send({ error: "Project Name is Mandatory" })
        }

        // Check if the project already exists in DB
        const existingProject = await projects.findOne({ name })

        if (existingProject) {
            return res.status(403).send({
                success: true,
                message: "Project Name Already Exists,Try with another name",
            })
        }

        // create new object for projects
        const newProject = new projects({
            name,
            tasks: []
        })

        //save newly created project to mongoDB
        await newProject.save()
        //console.log(newProject);
        res.status(200).send({
            success: true,
            message: "New Project Created Successfully",
            newProject
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Project Creation Failed",
            error
        })
    }
}
// Add tasks to created Projects
exports.taskCreation = async (req, res) => {
    const { projectName, name, status, due } = req.body
    // const task = {
    //     name,
    //     status,
    //     due
    // }
    // console.log(task);
    const project = await projects.updateOne({ name: projectName },
        { $push: { tasks: { task: name, status, due } } }
    )
    console.log(project)

    // if (project) {
    //     const projectId = project._id
    //     const projectTasks = project.tasks
    //     console.log(project, projectId, projectTasks);
    // }
    // project.tasks.push(task)
    // project.save()

    res.status(200).send({
        success: true,
        message: "Project Successfully find out",
        project
    })
}
// Edit_Task_Status
exports.editTaskStatus = async (req, res) => {
    const { id } = req.params
    console.log(id);
    const { name } = req.body
    const project = await projects.updateOne({ _id: id, 'tasks.task': name },
        { $set: { 'tasks.$.status': 'new_status' } }
    )
    console.log(project);
    res.status(200).send({
        success: true,
        message: "Task Successfully Deleted",
        project
    })
}
//Delete_task
exports.deleteTask = async (req, res) => {
    const { id } = req.params
    console.log(id);
    const { name } = req.body
    const project = await projects.updateOne({ _id: id },
        { $pull: { tasks: { task: name } } }
    )
    console.log(project);
    res.status(200).send({
        success: true,
        message: "Task Successfully Deleted",
        project
    })
}
