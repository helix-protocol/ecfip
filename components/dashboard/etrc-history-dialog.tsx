"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Euro,
  Building2,
} from "lucide-react";

interface EtrcHistoryItem {
  id: string;
  certificateNumber: string;
  issuerName: string;
  securityType: string;
  dividendAmount: string;
  taxRate: string;
  submissionDate: string;
  status: "approved" | "pending" | "rejected" | "under_review";
  processedDate?: string;
  comments?: string;
}

interface EtrcHistoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockHistoryData: EtrcHistoryItem[] = [
  {
    id: "1",
    certificateNumber: "ETRC-2024-001",
    issuerName: "LVMH Moët Hennessy Louis Vuitton SE",
    securityType: "Common Stock",
    dividendAmount: "€2.50",
    taxRate: "15.0%",
    submissionDate: "2024-01-15",
    status: "approved",
    processedDate: "2024-01-18",
    comments: "Standard dividend payment for Q4 2023",
  },
  {
    id: "2",
    certificateNumber: "ETRC-2024-002",
    issuerName: "BNP Paribas SA",
    securityType: "Preferred Stock",
    dividendAmount: "€1.75",
    taxRate: "12.5%",
    submissionDate: "2024-01-20",
    status: "pending",
    comments: "Special dividend declaration",
  },
  {
    id: "3",
    certificateNumber: "ETRC-2024-003",
    issuerName: "TotalEnergies SE",
    securityType: "Common Stock",
    dividendAmount: "€3.20",
    taxRate: "15.0%",
    submissionDate: "2024-01-10",
    status: "under_review",
    processedDate: "2024-01-12",
    comments: "Additional documentation requested",
  },
  {
    id: "4",
    certificateNumber: "ETRC-2023-045",
    issuerName: "Sanofi SA",
    securityType: "Common Stock",
    dividendAmount: "€1.85",
    taxRate: "15.0%",
    submissionDate: "2023-12-15",
    status: "approved",
    processedDate: "2023-12-18",
    comments: "Regular quarterly dividend",
  },
  {
    id: "5",
    certificateNumber: "ETRC-2023-044",
    issuerName: "Orange SA",
    securityType: "Common Stock",
    dividendAmount: "€0.70",
    taxRate: "15.0%",
    submissionDate: "2023-12-10",
    status: "rejected",
    processedDate: "2023-12-12",
    comments: "Incorrect tax rate calculation",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "under_review":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Approved";
    case "pending":
      return "Pending";
    case "under_review":
      return "Under Review";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
};

export function EtrcHistoryDialog({
  isOpen,
  onOpenChange,
}: EtrcHistoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            eTRC Submission History
          </DialogTitle>
          <DialogDescription>
            View all submitted Electronic Tax Relief Certificates and their
            processing status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {
                  mockHistoryData.filter((item) => item.status === "approved")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  mockHistoryData.filter((item) => item.status === "pending")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {
                  mockHistoryData.filter(
                    (item) => item.status === "under_review"
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {
                  mockHistoryData.filter((item) => item.status === "rejected")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-3">
            {mockHistoryData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.certificateNumber}
                      </h3>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          Issuer
                        </p>
                        <p className="font-medium">{item.issuerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Euro className="h-3 w-3" />
                          Dividend
                        </p>
                        <p className="font-medium">
                          {item.dividendAmount} ({item.taxRate})
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Submitted
                        </p>
                        <p className="font-medium">{item.submissionDate}</p>
                      </div>
                      {item.processedDate && (
                        <div>
                          <p className="text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Processed
                          </p>
                          <p className="font-medium">{item.processedDate}</p>
                        </div>
                      )}
                    </div>

                    {item.comments && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Comments:</p>
                        <p className="text-sm text-gray-700">{item.comments}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-3 w-3" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
