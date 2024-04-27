const { Rate } = require('../models'); 

const rate = async(req, res) => {
    try {
        const data = await Rate.findAll();
       
        return res.status(200).json({data: data});
    } catch (error) {
        console.log(error);
    }
}

const setRate = async (req, res) => {
    try {
      const { forexRateZWL, forexRateZiG } = req.body;
  
      const rates = await Rate.findAll();
  
      if (rates.length <= 0) {
        await Rate.create({ forexRateZWL, forexRateZiG });
        return res.status(201).json({ msg: "Rates created." });
      }
  
      const rate = rates[0]; // Assuming there is only one rate object to update
  
      rate.forexRateZWL = forexRateZWL;
      rate.forexRateZiG = forexRateZiG;
      await rate.save();
  
      return res.status(200).json({ msg: "Rates updated." });
    } catch (error) {
      console.log("Error setting rate:", error);
      return res.status(500).json({ err: "Internal server error." });
    }
  };

module.exports = {
    rate,
    setRate
}