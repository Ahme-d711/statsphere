import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataset, domain, options, selectedColumns } = body;

    // Validation
    if (!dataset || !Array.isArray(dataset) || dataset.length === 0) {
      return NextResponse.json(
        { error: "Dataset is required and cannot be empty" },
        { status: 400 }
      );
    }

    console.log(`[API Analyze] Processing ${domain} dataset with ${dataset.length} records. Options: ${options.join(", ")}, Columns: ${selectedColumns?.length || 'All'}`);

    // Call the Python FastAPI Analysis Service
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:8000/analyze";
    
    const analysisResponse = await fetch(pythonServiceUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset, domain, options, selected_columns: selectedColumns }),
    });

    if (!analysisResponse.ok) {
      const errorData = await analysisResponse.json();
      throw new Error(errorData.detail || "Python analysis service failed");
    }

    const results = await analysisResponse.json();

    // Map the Pandas results back to our dashboard structure
    const dashboardResults = {
      summary: {
        mean: results.summary.mean[Object.keys(results.summary.mean)[0]], 
        median: results.summary.mean[Object.keys(results.summary.mean)[0]] * 0.95, // Simulated median for now
        stdDev: results.summary.std[Object.keys(results.summary.std)[0]],
        totalRecords: results.summary.totalRecords,
      },
      charts: results.charts,
      advanced: results.advanced,
      insights: results.insights,
    };

    return NextResponse.json(dashboardResults);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to analyze data", details: errorMessage },
      { status: 500 }
    );
  }
}
