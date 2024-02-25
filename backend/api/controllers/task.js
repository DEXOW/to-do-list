import Task from "../models/task.js";
import List from "../models/list.js";

const getAll = async (req, res) => {
    const { listId } = req.body;

    if (!listId) {
        return res.status(400).json({ message: "Please Enter List Id" });
    }

    try {
        const tasks = await Task.find({ list: listId });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllByUser = async (req, res) => {
    const { id : userId } = req.user;

    if (!userId) {
        return res.status(400).json({ message: "Please Enter User Id" });
    }

    try {
        const lists = await List.find({ user: userId });
        const tasks = await Task.find({ list: { $in: lists.map(list => list.id) } });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const get = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Please Enter Task Id" });
    }

    try {
        const task = await Task.findById(id);
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    const { name, listId } = req.body;

    if (!name || !listId) {
        return res.status(400).json({ message: "Please Enter Task Name and List Id" });
    }

    try {
        const task = await Task.create({ name, list: listId });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    const { id, name, completed } = req.body;
    const updatedTask = {};

    if (name) updatedTask.name = name;
    if (completed) updatedTask.completed = completed == "true" ? true : false;

    if (!id) {
        return res.status(400).json({ message: "Please Enter Task Id" });
    }

    try {
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Please Enter Task Id" });
    }

    try {
        const task = await Task.findByIdAndRemove(id);
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { 
    getAll, 
    get, 
    create, 
    update, 
    remove,
    getAllByUser
};

