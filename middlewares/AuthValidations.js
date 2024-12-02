const Joi = require("joi");

exports.signupValidation = (req, res, next) =>{
  
    const schema = Joi.object({
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required()
    });
    const  { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad Request", error});
    }
    next();
   
};

exports.loginValidation = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required()
    });
    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({message:"Bad Request", error} );
    }
    next();
};