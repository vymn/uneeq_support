const axios = require('axios')


async function query(data) {
    const url = "https://api-inference.huggingface.co/models/facebook/blenderbot-3B"
        // Authorization: "Bearer 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" },

    const response = await axios.post(url, data, {
        headers: {
            Authorization: "Bearer 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"
        },
    });
    // const result = await response.json();
    // return result;
}
query({
    "inputs": {
        "past_user_inputs": ["Which movie is the best ?"],
        "generated_responses": ["It's Die Hard for sure."],
        "text": "Can you explain why ?"
    }
}).then((response) => {
    console.log(JSON.stringify(response));
});