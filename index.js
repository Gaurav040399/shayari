const express = require("express");
require("dotenv").config();
const axios = require("axios")
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// const apiKey = process.env.OPEN_API_KEY;
// const url = "https://api.openai.com/v1/chat/completions";

app.get("/", (req,res)=>{
    res.send("Home Page")
})

app.post("/generate-shayari",async(req,res)=>{
    let {category} = req.body;
    console.log(category)
    if(!category){
        return res.status(400).send({msg:"Please write any keyword"})
    }

    try {

        const shayariData = await shayari(category);
        console.log(shayariData)
        res.status(200).json({ shayariData });
    } catch (error) {
        res.status(400).send({error:error})
    }
})


async function shayari(category){
    const apiKey = process.env.OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
    const response = await axios.post(
        url,
        {
          prompt: `Generate a Shayari about ${category}`
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
     console.log(response.data)
      return response.data.choices[0].text;
}

app.listen(process.env.PORT || 3000, async()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

