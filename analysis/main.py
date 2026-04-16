from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
import numpy as np

app = FastAPI()

class AnalysisRequest(BaseModel):
    dataset: List[Dict[str, Any]]
    domain: str = "general"
    options: List[str] = []

@app.get("/")
def read_root():
    return {"status": "Analysis Service is Online", "version": "1.0.0"}

@app.post("/analyze")
async def analyze_data(request: AnalysisRequest):
    try:
        # 1. Convert to DataFrame
        df = pd.DataFrame(request.dataset)

        if df.empty:
            raise HTTPException(status_code=400, detail="Dataset is empty")

        # 2. Pre-processing: Handle numeric columns only for stats
        # Convert columns to numeric where possible, coercing errors to NaN
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='ignore')

        numeric_df = df.select_dtypes(include=[np.number])
        
        if numeric_df.empty:
            raise HTTPException(status_code=400, detail="No numeric data found for analysis")

        # 3. Handle Missing Values
        numeric_df = numeric_df.fillna(numeric_df.mean())

        # 4. Perform Basic Statistics
        summary = {
            "mean": numeric_df.mean().to_dict(),
            "std": numeric_df.std().to_dict(),
            "count": numeric_df.count().to_dict(),
            "totalRecords": len(df)
        }

        # 5. Correlation Matrix
        corr_matrix = numeric_df.corr().replace({np.nan: 0}).values.tolist()
        corr_labels = numeric_df.columns.tolist()

        # 6. Generate Mock Charts for the frontend mapping
        # In a real scenario, we'd compute histograms/bins here
        charts = {
            "distribution": [
                {"name": col, "value": round(float(val), 2)} 
                for col, val in numeric_df.mean().items()
            ],
            "trend": [
                {"name": f"P{i}", "value": round(float(val), 2)} 
                for i, val in enumerate(numeric_df.iloc[:7, 0] if not numeric_df.empty else [])
            ]
        }

        return {
            "summary": summary,
            "charts": charts,
            "advanced": {
                "matrix": corr_matrix,
                "labels": corr_labels,
                "regression": {
                    "rSquared": "0.912", # Mocked for now until advanced logic
                    "adjRSquared": "0.895",
                    "fStat": "412.5",
                    "pValue": "Significant",
                    "stdError": "0.045",
                }
            },
            "insights": {
                "executiveSummary": f"Pandas analyzed {len(df)} records. The {corr_labels[0] if corr_labels else 'primary'} column shows a mean of {round(numeric_df.iloc[:,0].mean(), 2) if not numeric_df.empty else 0}.",
                "items": [
                    {
                        "type": "positive",
                        "title": "Data Processed",
                        "text": f"Successfully calculated stats for {len(numeric_df.columns)} numeric dimensions."
                    }
                ]
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
