import jsPDF from "jspdf";
import { RegistrationData } from "../types/forms";
import QRCode from "qrcode";

const generatePdf = async (registerData: RegistrationData) => {
  const doc = new jsPDF();
 
  let qrCodeSrc = "";
  try {
    const baseUrl = "https://abs-sigma.vercel.app"
    const qrData = `${baseUrl}/portal/${registerData.chasisNumber}/${registerData.engineNumber}`;
    qrCodeSrc = await QRCode.toDataURL(qrData);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }

  // Set document properties
  doc.setProperties({
    title: "Customer Registration",
    subject: "Vehicle Service Registration",
    author: "Service Center",
    creator: "Service Management System"
  });

  // Add header/title
  doc.setFontSize(24);
  doc.setTextColor(0, 51, 102);
  doc.text("CUSTOMER REGISTRATION", 105, 20, { align: "center" });
  
  // Add line under header
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Generated on: ${currentDate}`, 20, 35);
  
  // Customer Details Section
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 102);
  doc.text("CUSTOMER DETAILS", 20, 50);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 52, 190, 52);
  
  // Customer Information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let yPosition = 65;
  const lineHeight = 10;
  const valueX = 70;
  
  // First Name
  doc.setFont("helvetica", "bold");
  doc.text("First Name:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.firstName || "Not provided", valueX, yPosition);
  yPosition += lineHeight;
  
  // Last Name
  doc.setFont("helvetica", "bold");
  doc.text("Last Name:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.lastName || "Not provided", valueX, yPosition);
  yPosition += lineHeight;
  
  // Address
  doc.setFont("helvetica", "bold");
  doc.text("Address:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  
  // Handle long addresses with wrapping
  const address = registerData.address || "Not provided";
  const addressLines = doc.splitTextToSize(address, 115);
  doc.text(addressLines, valueX, yPosition);
  yPosition += (addressLines.length * lineHeight);
  
  // Phone Number
  doc.setFont("helvetica", "bold");
  doc.text("Phone Number:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.phoneNumber || "Not provided", valueX, yPosition);
  yPosition += lineHeight + 5;
  
  // Vehicle Details Section
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 102);
  doc.text("VEHICLE DETAILS", 20, yPosition);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  
  yPosition += 15;
  
  // Vehicle Information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Vehicle Model
  doc.setFont("helvetica", "bold");
  doc.text("Vehicle Model:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.vehicleModel || "Not provided", valueX, yPosition);
  yPosition += lineHeight;
  
  // Manufactured Year
  doc.setFont("helvetica", "bold");
  doc.text("Manufactured Year:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.manuYear || "Not provided", valueX, yPosition);
  yPosition += lineHeight;
  
  // Engine Number
  doc.setFont("helvetica", "bold");
  doc.text("Engine Number:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.engineNumber || "Not provided", valueX, yPosition);
  yPosition += lineHeight;
  
  // Chasis Number
  doc.setFont("helvetica", "bold");
  doc.text("Chasis Number:", 20, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(registerData.chasisNumber || "Not provided", valueX, yPosition);
  yPosition += lineHeight + 10;
  
  // Add QR Code if generated successfully
  if (qrCodeSrc) {
    // Position the QR code in the top right corner or wherever you prefer
    doc.addImage(qrCodeSrc, 'PNG', 150, 30, 40, 40);
    
    // Add a label for the QR code
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Scan for details", 170, 72, { align: "center" });
  }
  
  // Add footer with page number
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} - Service Center Management System`,
      105,
      287,
      { align: "center" }
    );
  }
  
  // Save the PDF
  const fileName = `${registerData.firstName}_${registerData.lastName}_registration.pdf`;
  doc.save(fileName);
};

export default generatePdf;