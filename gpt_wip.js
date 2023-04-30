// initializing everything
const dotenv = require("dotenv")
dotenv.config()

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

/////////////////////////////////////////////

const energySources = [
  "wind-turbines",
  "biomass-power-plant",
  "hydro-electric-dam",
  "geo-thermal-power-plant",
  "solar-energy",
  "nuclear-power-plant"
];

async function generateText(prompt) {
  const response = await openai.createChatCompletion({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user", 
        "content": prompt
      }
    ]
  })
  return response
  //response.data.choices[0].message.content to access string
}

const energySourceTemplate = {
  name: "",
  description: "",
  pros: "",
  cons: "",
  cost: "",
  efficiency: "",
  future: "",
  location: ""
};

export async function getEnergySourceData(name) {
  const descriptionPrompt = `Can you describe in two sentences, the sustainable energy resource ${name} and how it generates energy?`;
  const description = await generateText(descriptionPrompt);
  const energySource = { ...energySourceTemplate, name, description };
  const adjustment = "Please explain it in a way so a middle schooler can understand it in 2-3 sentences.";
  energySource.pros = await generateText(`What are the pros of ${name}? ` + adjustment);
  energySource.cons = await generateText(`What are the cons of ${name}? ` + adjustment);
  energySource.cost = await generateText(`How much does it cost to build ${name}?`);
  energySource.efficiency = await generateText(`How efficient is ${name}? ` + adjustment);
  energySource.future = await generateText(`What is the future of ${name}?` + adjustment);
  energySource.location = await generateText(`Where should ${name} be built?` + adjustment);
  return energySource;
}

/* 
generateText("wind turbine").then((response) => {
  console.log(response.data.choices[0].message.content)
});
*/ 

