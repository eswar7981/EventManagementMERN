const supabase = require("../config/supabase.config");
const mongoose = require("mongoose");
const User = require("../database/Schemas/User");
const Session = require("../database/Schemas/Session");

exports.registerNewUser = async (req, res) => {
  const { name: name, email: email, password: password } = req.body;

  try {
    const { data: data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      res.status(error.status).json({ error: error.message });
    } else {
      const supabaseId = data.user.id;
      const newUser = new User({
        supabaseId: supabaseId,
        name: name,
        email: email,
      });
      newUser.save();

      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.signIn = async (req, res) => {
  const { email: email, password: password } = req.body;
  const ipAddress = req.ip;
  
  try {
    const { data: data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      res.status(error.status).json({ error: error.message });
    } else {
      const supabaseId = data.user.id;
      const user = await User.findOne({ supabaseId: supabaseId });
      const mongoId = user._id;
      const newSession = new Session({
        userId: mongoId,
        loginTime: new Date(),
        ipAddress: ipAddress,
      });
      newSession.save();
      const sessionToken = data.session.access_token;
      res.status(200).json({ sessionToken: sessionToken });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


