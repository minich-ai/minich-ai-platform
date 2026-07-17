import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, authenticateConsumer } from "@/lib/api-auth";
import { readUsage, usageMonth } from "@/lib/metering";

function requestedMonth(request: NextRequest): string {
  const month = request.nextUrl.searchParams.get("month");
  return month && /^\d{4}-\d{2}$/.test(month) ? month : usageMonth();
}

async function usageResponse(consumerId: string, month: string) {
  try {
    const usage = await readUsage(consumerId, month);
    return NextResponse.json({ consumerId, month, usage });
  } catch (error) {
    console.error("Usage read error:", error);
    return NextResponse.json(
      { error: "Usage controls are temporarily unavailable." },
      { status: 503 }
    );
  }
}

export async function GET(request: NextRequest) {
  const month = requestedMonth(request);
  const requestedConsumer = request.nextUrl.searchParams.get("consumer");

  const admin = authenticateAdmin(request);
  if (admin.ok) {
    if (!requestedConsumer) {
      return NextResponse.json(
        { error: "Query parameter consumer is required for admin usage reads." },
        { status: 400 }
      );
    }
    return usageResponse(requestedConsumer, month);
  }

  const auth = authenticateConsumer(request);
  if (!auth.ok) {
    if (auth.status === 500) {
      console.error(auth.error);
    }
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (requestedConsumer && requestedConsumer !== auth.consumerId) {
    return NextResponse.json(
      { error: "Consumers may only read their own usage." },
      { status: 403 }
    );
  }

  return usageResponse(auth.consumerId, month);
}
