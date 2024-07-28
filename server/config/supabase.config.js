const {createClient}=require('@supabase/supabase-js')
require('dotenv').config()

const supabase=createClient(process.env.SUPABASE_PROJECT_URL,process.env.SUPABASE_API_KEY)


module.exports=supabase