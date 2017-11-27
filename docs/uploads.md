# Uploading files
It happens to the best of us. We are in a situation where we need to upload a file. It is considered bad practice to upload files to your skill. It's much better to use an external host+cdn such as [Amazon S3](https://aws.amazon.com/s3). The reason is scaling. When your skill is running in the cloud on many servers, that file needs to still be accessible.

Uploads are currently handled by [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server), so jump over there and get reading!