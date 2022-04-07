const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

exports.sendEmail = function (message, subject) {
    return ses
        .sendEmail({
            Source: "Priscila Flores <priscilauchoaa@gmail.com>",
            Destination: {
                ToAddresses: ["priscilauchoaa@gmail.com"],
                // ToAddresses: ["priscilauchoaa@gmail.com"],
                // OR    pass email as parameter
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                        // Data: "We can't wait to start working with you! Please arrive on Monday at 9:00 am. Dress code is casual so don't suit up.",
                    },
                },
                Subject: {
                    Data: subject,
                    // Data: "Your Application Has Been Accepted!",
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};
