import { NextResponse } from 'next/server';

const BREVO_CONTACT_TEMPLATE_ID = 8;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, service, message } = data;

    const emailData = {
      to: [
        {
          email: process.env.EMAIL_USER || "management@frontlineautomotive.com",
          name: "Front Line Automotive",
        },
      ],
      replyTo: {
        email: email,
        name: name,
      },
      templateId: BREVO_CONTACT_TEMPLATE_ID,
      params: {
        firstName: name, 
        lastName: "",
        phoneNo: phone,
        email: email,
        subject: `Service Inquiry: ${service}`,
        message: message || "No message provided",
        preferredContactMethod: "Any",
      },
    };

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY || "",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      
      let userMessage = "We're currently experiencing technical difficulties. Please try again later or contact us directly.";
      
      if (response.status === 401 || response.status === 403) {
        userMessage = "Our mailing service is temporarily unavailable. Please call us to book your appointment.";
      } else if (response.status === 400) {
        userMessage = "There was an issue with the provided information. Please check your details and try again.";
      }

      return NextResponse.json(
        { error: userMessage, details: process.env.NODE_ENV === 'development' ? errorData : undefined },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
