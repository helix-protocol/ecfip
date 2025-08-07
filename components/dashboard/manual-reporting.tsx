"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { EtrcSubmitDialog } from "./etrc-submit-dialog";
import { EtrcHistoryDialog } from "./etrc-history-dialog";

interface ReportingType {
  id: string;
  name: string;
  description: string;
  status: "completed" | "pending" | "overdue";
  lastSubmitted: string;
  nextDue: string;
}

interface ManualReportingProps {
  reportingTypes: ReportingType[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "overdue":
      return "Overdue";
    default:
      return "Unknown";
  }
};

export function ManualReporting({ reportingTypes }: ManualReportingProps) {
  const [etrcSubmitOpen, setEtrcSubmitOpen] = useState(false);
  const [etrcHistoryOpen, setEtrcHistoryOpen] = useState(false);

  const handleSubmitReport = (reportId: string) => {
    if (reportId === "etrc") {
      setEtrcSubmitOpen(true);
    } else {
      alert(`Submit functionality for ${reportId} is not yet implemented.`);
    }
  };

  const handleViewHistory = (reportId: string) => {
    if (reportId === "etrc") {
      setEtrcHistoryOpen(true);
    } else {
      alert(`History functionality for ${reportId} is not yet implemented.`);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Manual Regulatory Reporting
          </CardTitle>
          <CardDescription>
            Submit required regulatory reports and declarations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reportingTypes.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {report.name}
                      </h3>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Last Submitted</p>
                        <p className="font-medium">{report.lastSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Due</p>
                        <p className="font-medium">{report.nextDue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleSubmitReport(report.id)}
                    >
                      <Upload className="h-4 w-4" />
                      Submit Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleViewHistory(report.id)}
                    >
                      <FileText className="h-4 w-4" />
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* eTRC Dialogs */}
      <EtrcSubmitDialog
        isOpen={etrcSubmitOpen}
        onOpenChange={setEtrcSubmitOpen}
      />
      <EtrcHistoryDialog
        isOpen={etrcHistoryOpen}
        onOpenChange={setEtrcHistoryOpen}
      />
    </>
  );
}
