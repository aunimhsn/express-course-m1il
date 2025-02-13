const asyncHandler = require('express-async-handler')
const GoalModel = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find()
    res.status(200).json(goals)
})

const getGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    res.status(200).json(goal)
})

const addGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }

    const goal = await GoalModel.create({ text: req.body.text })
    res.status(200).json(goal)
})


const updateGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id,
                                                          req.body,
                                                          { new : true})
                                                     
    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
   
    const deletedGoal = await GoalModel.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoals,
    getGoal,
    addGoal,
    updateGoal,
    deleteGoal
}
