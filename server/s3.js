const fs = require("fs");
const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.deleteObject = (params) => {
    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
};

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "priscilasbucket",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then((awsr) => {
            // it worked!!!
            console.log("aws completed", awsr);

            fs.unlink(path, () => {});
            next();
        })
        .catch((err) => {
            // uh oh
            console.log("err", err);
        });
};
