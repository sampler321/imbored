import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://bored-api.appbrewery.com/random');
    const data = await response.json();
    return NextResponse.json({ activity: data.activity });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}