import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/lib/storage';
import QRCode from 'qrcode';
import { GraduationCap, User, Phone, Mail, Calendar, Hash } from 'lucide-react';
import '../../styles/print.css';

interface IDCardProps {
  student: Student;
  showQR?: boolean;
  className?: string;
}

export const IDCard: React.FC<IDCardProps> = ({ 
  student, 
  showQR = true,
  className = "" 
}) => {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showQR && qrCanvasRef.current) {
      // Create QR code data with student information
      const qrData = JSON.stringify({
        id: student.id,
        studentId: student.studentId,
        name: student.name,
        class: student.class,
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        issueDate: new Date().toLocaleDateString()
      });

      QRCode.toCanvas(qrCanvasRef.current, qrData, {
        width: window.innerWidth < 640 ? 80 : 120, // Responsive QR code size
        margin: 1,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error('QR Code generation error:', error);
      });
    }
  }, [student, showQR]);

  return (
    <Card className={`w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-lg print:shadow-none print:border-gray-300 id-card-print ${className}`}>
      <CardContent className="p-6 space-y-4 print:p-4 print:space-y-2">
        {/* Header */}
        <div className="text-center border-b border-blue-200 pb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-800">School ID Card</h2>
          </div>
          <p className="text-sm text-blue-600">Academic Year 2024-25</p>
        </div>

        {/* Student Photo Placeholder and QR Code */}
        <div className="flex items-start justify-between space-x-3 sm:space-x-4">
          {/* Student Photo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">Photo</p>
          </div>

          {/* QR Code */}
          {showQR && (
            <div className="flex-shrink-0 text-center">
              <canvas
                ref={qrCanvasRef}
                className="border border-gray-300 rounded w-20 h-20 sm:w-[120px] sm:h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">QR Code</p>
            </div>
          )}
        </div>

        {/* Student Information */}
        <div className="space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
              {student.name}
            </h3>
            <Badge variant="secondary" className="mt-1">
              Class: {student.class}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-medium text-gray-600">Student ID</p>
                <p className="text-gray-800 font-semibold">{student.studentId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-medium text-gray-600">Issue Date</p>
                <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="border-t border-blue-200 pt-3 space-y-2">
            <h4 className="text-sm font-semibold text-blue-700 mb-2">Emergency Contact</h4>
            
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center space-x-2">
                <User className="w-3 h-3 text-gray-500" />
                <span className="font-medium text-gray-600">Parent:</span>
                <span className="text-gray-800">{student.parentName}</span>
              </div>
              
              {student.parentPhone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 text-gray-500" />
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="text-gray-800">{student.parentPhone}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 text-gray-500" />
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800 break-all">{student.parentEmail}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 border-t border-blue-200 pt-3">
            <p>This card is property of the school.</p>
            <p>If found, please return to the administration office.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IDCard;