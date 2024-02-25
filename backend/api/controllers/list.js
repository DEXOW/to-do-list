import List from '../models/list.js';
import Task from '../models/task.js';

const getAll = async (req, res) => {
    const { id : userId } = req.user;
    try {
        const lists = await List.find({ user: userId });
        // get the number of tasks in each list
        const listsWithTasks = await Promise.all(lists.map(async list => {
            const tasks = await Task.find({ list: list.id });
            return { ...list._doc, tasks: tasks.length };
        }));
        res.status(200).json({ lists: listsWithTasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const get = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Please Enter List Id" });
    }

    try {
        const list = await List.findById(id);
        res.status(200).json({ list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create = async (req, res) => {
    const { name } = req.body;
    const { id : userId } = req.user;

    if (!name) {
        return res.status(400).json({ message: "Please Enter List Name" });
    }

    try {
        const list = await List.create({ name: name, user: userId });
        res.status(200).json({ list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "Please Enter List Id and Name" });
    }

    try {
        const list = await List.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({ list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Please Enter List Id" });
    }

    try {
        await List.deleteOne({ _id: id });
        await Task.deleteMany({ list: id });
        res.status(200).json({ message: "List Removed Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { getAll, get, create, update, remove };