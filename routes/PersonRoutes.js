const router = require('express').Router();

const Person = require('../models/Person');

router.post('/', async(req, res) => {

    const { name, salary, approved } = req.body

    if (!name) res.status(422).json({ error: "o nome e obrigatório" })
    if (!salary) res.status(422).json({ error: "o salario e obrigatório" })
    if (!approved) res.status(422).json({ error: "se esta aprovado e obrigatório" })


    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });

    } catch (error) {
        res.status(404).json({ error: error })

    }
})

router.get('/', async(req, res) => {
    try {
        const person = await Person.find()
        res.status(200).json({ person })

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
})
router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const person = await Person.findOne({ _id: id })

        res.status(200).json({ person })

        if (!person) {
            res.status(442).json({ message: 'Usuário nao encontrado' })
            return;
        }

    } catch (error) {

        res.status(500).json({
            error: error
        })
    }
})

router.patch('/:id', async(req, res) => {

    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(442).json({ message: 'Usuário nao encontrado' })
            return;
        }
        res.status(200).json(person)

    } catch (err) {
        res.status(500).send({ error: err })
    }
})
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        updatePerson = await Person.deleteOne({ _id: id })


        res.status(200).json({ message: "deletado com sucesso" })

    } catch (err) {
        res.status(500).send({ error: err })
    }
})

module.exports = router;