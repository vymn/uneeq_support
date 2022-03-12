const express = require('express');
const router = express.Router();
// const model = require('../../rose')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'hello form Rose route!',
        // ownerName: name
        // yourPayload: uneeqRequestJSON
    });
});

router.post('/', (req, res, next) => {
    const requestType = stringify(req.body["fm-avatar"])
    console.log(requestType)
    if (requestType.toLowerCase().includes('welcome')) {
        let isWelcome = true
        query(isWelcome, {
            "inputs": {
                "past_user_inputs": [""],
                "generated_responses": [""],
                "text": "hey"
            }
        }).then((response) => {
            res.status(200).json(generateUneeqResponse(response))
                // console.log(response["data"])
                // console.info(response.generated_text)
                // console.log(JSON.stringify(response["generated_text"]))
                // const modelRes = response
                // answer = JSON.stringify(response["generated_text"])
                // console.info(answer)
                // console.log(answer)
                // console.log(JSON.stringify(response["generated_text"]))
        });
    } else {
        let isWelcome = false
        query(isWelcome, {
            "inputs": {
                "past_user_inputs": [""],
                "generated_responses": [""],
                "text": req.body["fm-question"]
            }
        }).then((response) => {
            res.status(200).json(generateUneeqResponse(response))
                // console.log(response["data"])
                // console.info(response.generated_text)
                // console.log(JSON.stringify(response["generated_text"]))
                // const modelRes = response
                // answer = JSON.stringify(response["generated_text"])
                // console.info(answer)
                // console.log(answer)
                // console.log(JSON.stringify(response["generated_text"]))
        });
    }
    
    // console.log(result["data"])
    // result.json()
    // console.log(JSON.stringify(result["generated_text"]))
    // const modelRes = query(req.body)
    // console.info("/////////////////////" + modelRes[generated_text])
    // print(answer)

});
/////////////////////////////////////////////////////////////////

const stringifyAnswer = (text) => {
    let answer = {
        answer: text,
        instructions: {}
    }
    return JSON.stringify(answer);
}

const generateUneeqResponse = (response) => {
    const uneeqResponse = {
        answer: stringifyAnswer(response),
        matchedContext: "",
        conversationPayload: "{}"
    }
    return uneeqResponse;
}

const axios = require('axios');
const { json } = require('body-parser');
const { response } = require('express');
const { stringify } = require('nodemon/lib/utils');


async function query(isWelcome, data) {
    
    let answer = '';
    if (isWelcome) {
        answer = 'hello, my name is Rose , i\'m not sure if you\'ve spoken with a digital human before,\n' +
            'but i\'m gonna show you, it is easy, just ask me about any general topic or question, and i will do my best to answer'
    } else {
        const url = "https://api-inference.huggingface.co/models/facebook/blenderbot-3B"
        // Authorization: "Bearer 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" },
        const response = await axios.post(url, JSON.stringify(data), {
            headers: {
                Authorization: "Bearer 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"
            }
        });
        answer = response["data"]["generated_text"]
        console.log(answer)
    }
    
    return answer;
        // const result = JSON.stringify(response["data"])
        // return result;
        // const result = await response.json();
        // return result;
}








/////////////////////////////////////////////////////////////////
// query({
//     "inputs": {
//         "past_user_inputs": ["Which movie is the best ?"],
//         "generated_responses": ["It's Die Hard for sure."],
//         "text": "Can you explain why ?"
//     }
// }).then((response) => {
//     console.log(JSON.stringify(response));
// });

module.exports = router;