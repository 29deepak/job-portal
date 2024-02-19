const moment = require('moment/moment');
const Jobs = require('../modals/jobs')
const { Sequelize, Op } = require('sequelize');
exports.createJob = async (req, res) => {
    try {
        const { company, position } = req.body;
        req.body.createdBy = req.user.id;
        const job = await Jobs(req.body)
        return res.status(201).json({
            success: true,
            job
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getJob = async (req, res) => {
    try {
        // const jobs = await Jobs.findAll({
        //     where: {
        //         createdBy: req.user.id
        //     }
        // })
        const { status, workType, search, sort } = req.query
        //  conditions for searching filters
        let queryObject = {
            createdBy: req.user.id
        }
        //logic filters
        if (status && status !== "all") {
            queryObject.status = status
        }
        if (workType && workType !== "all") {
            queryObject.workType = workType
        }
        if (search) {
            queryObject.position = {
                [Op.iLike]: `%${search}%`
            }
        }
        let queryResult = Jobs.findAll({
            where: queryObject
        })

        // sorting

        if (sort === "latest") {
            queryResult = queryResult.sort("-createdAt")
        }
        if (sort === "oldest") {
            queryResult = queryResult.sort("createdAt")
        }
        if (sort === "a-z") {
            queryResult = queryResult.sort("position")
        }
        if (sort === "z-a") {
            queryResult = queryResult.sort("-position")
        }
        // pagination
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const offset = (page - 1) * limit;

        const totalJobs = await Jobs.count()
        const numberOfPage = Math.ceil(totalJobs / limit)




        const jobs = queryResult;


        return res.status(200).json({
            success: true,
            totalJobs,
            jobs

        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { company, position } = req.body;
        const job = await Jobs.findOne({ where: id })
        if (!req.user.id === job.createdBy) {
            return
        }
        const updatedJob = job.update(req.body)
        return res.status(200).json({
            success: true,
            message: "Updated successfully"
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { company, position } = req.body;
        const job = await Jobs.findOne({ where: id })
        if (!req.user.id === job.createdBy) {
            return
        }
        const deleteJob = await job.destroy({ where: id })
        return res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.jobStatsController = async (req, res) => {
    try {
        const stats = await Jobs.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
            ],
            where: {
                createdBy: req.user.id,

            },
            group: ['status'],
        });
        console.log("------stats--------", stats[0].dataValues)
        const defaultStats = {
            pending: stats.pending || 0,
            reject: stats.reject || 0,
            interview: stats.interview || 0
        }

        // monthly yearly stats
        let monthlyApplication = await Jobs.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.literal('createdAt')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.literal('createdAt')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
            ],
            where: {
                createdBy: req.user.id,

            },
            group: ['year', "month"],
        });
        console.log("monthly", monthlyApplication)
        monthlyApplication.map(item => {
            const { id: { year, month }, count } = item;
            const date = moment().month(month - 1).year(year).format("MMM y")
            return { date, count }
        }).reverse()
        return res.status(200).json({
            success: true,
            totalJob: stats.length,
            defaultStats
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}