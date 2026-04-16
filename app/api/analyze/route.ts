import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dataset, domain, options } = body;

    // Validation
    if (!dataset || (Array.isArray(dataset) && dataset.length === 0)) {
      return NextResponse.json(
        { error: "Dataset is empty or invalid" },
        { status: 400 }
      );
    }

    console.log(`[API Analyze] Processing ${domain} dataset with ${dataset.length} records. Options: ${options.join(", ")}`);

    // Simulated Processing Time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Structured Mock Results (matching the user's specific request structure)
    // We enhance it slightly to provide the full fields needed by our dashboard components
    const mockResults = {
      summary: {
        mean: domain === "medical" ? 72.4 : 450.2,
        median: domain === "medical" ? 68.9 : 438.5,
        stdDev: domain === "medical" ? 12.3 : 24.8,
        totalRecords: dataset.length,
      },
      charts: {
        distribution: [
          { name: "Group A", value: 400 },
          { name: "Group B", value: 300 },
          { name: "Group C", value: 200 },
          { name: "Group D", value: 278 },
          { name: "Group E", value: 189 },
        ],
        trend: [
          { name: "Wk 1", value: 30 },
          { name: "Wk 2", value: 45 },
          { name: "Wk 3", value: 28 },
          { name: "Wk 4", value: 64 },
          { name: "Wk 5", value: 48 },
          { name: "Wk 6", value: 72 },
          { name: "Wk 7", value: 61 },
        ],
        pie: [
          { name: "Category 1", value: 400 },
          { name: "Category 2", value: 300 },
          { name: "Category 3", value: 300 },
          { name: "Category 4", value: 200 },
        ],
        breakdown: [
          { label: "Data Consistency", value: 94 },
          { label: "Model Confidence", value: 88 },
          { label: "Growth Potential", value: 72 },
        ],
      },
      advanced: {
        matrix: [
          [1.0, 0.82, 0.45, 0.12],
          [0.82, 1.0, 0.38, 0.05],
          [0.45, 0.38, 1.0, 0.76],
          [0.12, 0.05, 0.76, 1.0],
        ],
        labels: domain === "medical" 
          ? ["Age", "BP", "BMI", "Glucose"] 
          : ["RPM", "Torque", "Temp", "Load"],
        regression: {
          rSquared: "0.962",
          adjRSquared: "0.948",
          fStat: "1042.8",
          pValue: "Significant",
          stdError: "0.024",
        },
      },
      insights: {
        executiveSummary: `Analysis completed successfully for the ${domain} dataset. We've detected high reliability in the primary markers and a significant correlation between core variables.`,
        items: [
          {
            type: "positive",
            title: "Strong Correlation",
            text: "Detected a robust linear relationship (0.82) between key parameters.",
          },
          {
            type: "neutral",
            title: "Normal Distribution",
            text: "Data distribution follows a standard bell curve for the primary metric.",
          },
          {
            type: "warning",
            title: "Outlier Alert",
            text: "Minor noise detected in the tail ends of the distribution chart.",
          },
        ],
      },
    };

    return NextResponse.json(mockResults);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to analyze data", details: errorMessage },
      { status: 500 }
    );
  }
}
