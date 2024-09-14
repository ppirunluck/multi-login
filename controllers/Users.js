import User from "../models/UserModel.js";
import argon2 from 'argon2'

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body
    if (password !== confPassword) return res.status(400).json({ msg: "password dont match confPassword" })
    const hashPassword = await argon2.hash(password)
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({ msg: "Register successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateUser = async (req, res) => {

}

export const deleteUser = async (req, res) => {

}

