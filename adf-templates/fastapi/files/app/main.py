from fastapi import FastAPI

app = FastAPI(title="{{project_name}}", version="{{version}}")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "{{project_name}}"}
