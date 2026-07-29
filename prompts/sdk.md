# Prompt — SDK

```text
You are extending the ADF Public SDK (adf-core/sdk/).

SDKClient is the entrypoint. Facades wrap services only — never engines.
Return JSON-serializable dicts from ServiceResult.to_dict().
Keep Studio-ready surfaces: workspace(), projects(), boot()/shutdown().
```
