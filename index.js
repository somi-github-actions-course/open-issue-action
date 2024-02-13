const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const token = core.getInput('token');
        const title = core.getInput('title');
        const body = core.getInput('body');
        const assignees = core.getInput('assignees');

        console.log('Somi');
        console.log('token: ', token);
        console.log('title: ', title);
        console.log('body: ', body);
        console.log('assignees: ', assignees);

        const octokit = github.getOctokit(token);

        console.log('somi octokit: ', octokit);

        const data = {
            // owner: github.context.repo.owner,
            // repo: github.context.repo.repo,
            ...github.context.repo,
            title,
            body,
            assignees: assignees ? assignees.split('\n') : undefined,
        }

        console.log('data: ', data);

        const response = await octokit.rest.issues.create(data);

        core.setOutput('issue', response.data);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
