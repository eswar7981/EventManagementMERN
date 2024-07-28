const supabase=require('../config/supabase.config')


exports.registerNewUser=async(req,res)=>{
    const {name:name,email:email,password:password}=req.body
    try{
        const { data: user, error }= await supabase.auth.signUp()
    }
    catch(e){
        console.log(e.message)
    }

}

exports.signIn=async(req,res)=>{
    const {email:email,password:password}=req.body
    try{
        const { data: user, error }= await supabase.auth.signInWithPassword()
    }
    catch(e){
        console.log(e.message)
    }
}

exports.logOut=(req,res)=>{
    
}