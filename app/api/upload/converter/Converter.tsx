import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const ConvertToPdf = async(pptBuffer:any)=>{
    try {
        
        const pdf = new jsPDF();
        const imgData = `data:image/jpeg;base64,${pptBuffer}`;
        
        const canvas = await html2canvas(document.createElement("div"));
        const imgWidth = 210; // A4 size
        const imgHeight = canvas.height * imgWidth / canvas.width;
    
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        const pdfBuffer = pdf.output('arraybuffer');
        console.log(pdfBuffer)
        return pdfBuffer;
    } catch (error) {
        console.log(error)
    }
}

export default ConvertToPdf