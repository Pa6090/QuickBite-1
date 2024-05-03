import express from 'express';
import user from '../models/user.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

const router = express.Router()
const jwtSecret = process.env.JWT

router.post('/createUser',
    body('username', 'Incorrect username/email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 8 }),
    body('name', 'name should be minimum three characters').isLength({ min: 3 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hashSync(req.body.password, salt)

            await user.create({
                username: req.body.username,
                name: req.body.name,
                location: req.body.location,
                password: pass
            })
            res.json({ message : "Inserted into db", success: true })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })

router.post('/loginUser',
    body('username', 'Incorrect username/email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 8 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const resp = (await user.findOne({ username: req.body.username }))._doc

            if (!resp) {
                return res.status(400).json({ errors: "Username/Email does not exists" })
            }

            const isPassCorrect = await bcrypt.compare(req.body.password, resp.password)
            if (!isPassCorrect) {
                return res.status(400).json({ errors: "Password Incorrect" })
            }
            const {password, ...otherDet} = resp

            const data = {
                user : {
                    id:resp._id
                }
            }

            const token = jwt.sign(data,jwtSecret)
            res.cookie("access_token", token, {httpOnly : true}).status(200).json({ result: otherDet, success: true})
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })

export default router