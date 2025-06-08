## Azure Deployment Rules

- All Azure deployments must use Service Principal authentication.
- Do NOT use publish profiles or basic authentication in workflows.
- Remove any `publish-profile:` lines from workflow YAMLs.
- Never use the Azure Portal's publish profile workflow generator.

## Azure Deployment Authentication Rule

- Only Service Principal authentication with client secret is allowed for Azure login in GitHub Actions.
- Do NOT use OIDC, federated identity, or id-token permissions in workflows for this project.

## GitHub Actions OIDC/Federated Identity Rule

- All workflows using OIDC (federated identity) for Azure login must include:

```yaml
permissions:
  contents: read
```

- This is required for Azure login to work and to avoid id-token/federated token errors. 