## Azure Deployment Rules

- All Azure deployments must use Service Principal authentication.
- Do NOT use publish profiles or basic authentication in workflows.
- Remove any `publish-profile:` lines from workflow YAMLs.
- Never use the Azure Portal's publish profile workflow generator. 