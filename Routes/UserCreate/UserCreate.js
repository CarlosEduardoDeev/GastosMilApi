const router = require('express').Router()

const bcrypt = require('bcrypt')

const Users = require('../../Models/user')

router.post('/user', async (req,res) => {
    const {name,email,password,confirmpassword} = req.body
    
    if(!name){
        return res.status(404).json({msg:"Nome nescessario!"})
    }
    if(!email){
        return res.status(404).json({msg:"Email nescessario!"})
    }
    if(!password){
        return res.status(404).json({msg:"Password nescessario!"})
    }
    if(password !== confirmpassword){
        return res.status(404).json({msg:"As senhas nao são iguais!"})
    }

    const userExist = await Users.findOne({email:email})

    if(userExist){
        res.status(422).json({msg:"Utilize outro Email "})
    }


    const salt =  await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, salt)

    const user = new Users({
        name,
        email,
        password:passHash,
    })
    try {
        await user.save()
        
        res.status(201).json({msg: 'Usuario Criado com sucesso! '})

    } catch (error) {

        res.status(500).json({
            msg:'Erro de servidor tente mais tarde'
        })  
        
    }

})


module.exports= app =>  app.use('/create',router)