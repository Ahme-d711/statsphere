import { NextRequest, NextResponse } from "next/server";

interface DatasetRow {
  [key: string]: any;
}

interface AnalysisRequestBody {
  dataset: DatasetRow[];
  domain: string;
  options: string[];
  selectedColumns?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalysisRequestBody = await req.json();
    const { dataset, domain, selectedColumns } = body;

    // 1. Validation
    if (!dataset || !Array.isArray(dataset) || dataset.length === 0) {
      return NextResponse.json(
        { error: "Dataset is required and cannot be empty" },
        { status: 400 }
      );
    }

    // 2. Filter and Pre-process Data
    const datasetKeys = Object.keys(dataset[0]);
    const validColumns = selectedColumns && selectedColumns.length > 0
      ? selectedColumns.filter(col => datasetKeys.includes(col))
      : datasetKeys;

    // Convert to numbers and handle missing values (clean data)
    const processedData = dataset.map((row) => {
      const cleanRow: Record<string, number> = {};
      validColumns.forEach((col) => {
        const val = parseFloat(row[col]);
        cleanRow[col] = isNaN(val) ? 0 : val;
      });
      return cleanRow;
    });

    // Identify truly numeric columns (at least one non-zero value or just existing)
    const numericCols = validColumns.filter(col => 
      processedData.length > 0 && typeof processedData[0][col] === 'number'
    );

    if (numericCols.length === 0) {
       return NextResponse.json(
        { error: "The selected columns contain no numeric data for analysis." },
        { status: 400 }
      );
    }

    // 3. Statistical Calculations
    const firstCol = numericCols[0];
    const values = processedData.map(row => row[firstCol]);
    const n = values.length;

    const mean = values.reduce((a, b) => a + b, 0) / n;
    
    // Median Calculation
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = n % 2 !== 0 
      ? sortedValues[Math.floor(n / 2)] 
      : (sortedValues[n / 2 - 1] + sortedValues[n / 2]) / 2;

    // Standard Deviation
    const stdDev = Math.sqrt(
      values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n
    );

    // 4. Generate Chart Data
    const barData = numericCols.map(col => {
      const colMean = processedData.reduce((acc, row) => acc + row[col], 0) / n;
      return { name: col, value: parseFloat(colMean.toFixed(2)) };
    });

    const lineData = processedData.slice(0, 7).map((row, i) => ({
      name: `P${i + 1}`,
      value: parseFloat(row[firstCol].toFixed(2))
    }));

    // 5. Final Response
    const results = {
      datasetName: domain === "medical" ? "Medical_Analysis_Report" : "Engineering_Performance_Data",
      stats: [
        { label: "Mean Value", value: mean.toFixed(2), trend: "neutral", percentage: "0.0%" },
        { label: "Median", value: median.toFixed(2), trend: "neutral", percentage: "0.0%" },
        { label: "Std Deviation", value: stdDev.toFixed(2), trend: "neutral", percentage: "0.0%" },
        { label: "Total Samples", value: n.toLocaleString(), trend: "up", percentage: "+100%" },
      ],
      charts: {
        bar: barData,
        line: lineData,
        pie: [], 
        breakdown: [],
      },
      advanced: {
        matrix: [], 
        labels: [],
        regression: {
          rSquared: "0.000",
          adjRSquared: "0.000",
          fStat: "0.0",
          pValue: "N/A",
          stdError: "0.000",
        },
      },
      insights: {
        executiveSummary: "Data successfully processed locally.",
        items: [],
      },
    };

    return NextResponse.json(results);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
