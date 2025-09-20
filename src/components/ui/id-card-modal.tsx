import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/lib/storage';
import { IDCard } from './id-card';
import { Printer, Download, X } from 'lucide-react';

interface IDCardModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IDCardModal: React.FC<IDCardModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const handlePrint = () => {
    // Add print class to the ID card before printing
    const idCardElement = document.querySelector('.id-card-print');
    if (idCardElement) {
      idCardElement.classList.add('print-area');
    }
    
    // Use setTimeout to ensure styles are applied
    setTimeout(() => {
      window.print();
      
      // Remove print class after printing
      if (idCardElement) {
        idCardElement.classList.remove('print-area');
      }
    }, 100);
  };

  const handleDownload = () => {
    // Create a new window for the ID card
    const printWindow = window.open('', '_blank');
    if (!printWindow || !student) return;

    const idCardHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student ID Card - ${student.name}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
            }
            .id-card-container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .id-card-container { min-height: auto; }
            }
          </style>
        </head>
        <body>
          <div class="id-card-container">
            <!-- ID Card content would go here -->
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(idCardHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl font-semibold flex items-center justify-between">
            Student ID Card
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 no-print"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            ID card for {student.name} - {student.class}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* ID Card Display */}
          <div className="flex justify-center px-2 sm:px-0">
            <IDCard student={student} showQR={true} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t no-print">
            <Button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center space-x-2"
              variant="default"
            >
              <Printer className="w-4 h-4" />
              <span>Print ID Card</span>
            </Button>
            
            <Button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg no-print">
            <p className="font-medium">📋 Instructions:</p>
            <ul className="space-y-1 ml-2">
              <li>• Use "Print ID Card" to print directly from your browser</li>
              <li>• The QR code contains all student information for quick scanning</li>
              <li>• Best printed on cardstock or laminated for durability</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDCardModal;