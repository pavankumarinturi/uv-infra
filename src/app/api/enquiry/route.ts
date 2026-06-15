import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, project, message } = body;

    // Validate input
    if (!name || !email || !phone || !project || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Send email notification or save to database
    // For now, just log the enquiry
    console.log('New enquiry received:', {
      name,
      email,
      phone,
      project,
      message,
      timestamp: new Date().toISOString(),
    });

    // You can integrate with email service like SendGrid, Nodemailer, etc.
    // Or save to database

    return NextResponse.json(
      { message: 'Enquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
