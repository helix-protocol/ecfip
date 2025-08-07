import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

interface EntityInformationProps {
  companyName: string;
  registrationNumber: string;
  registrationDate: string;
  lastComplianceReview: string;
}

export function EntityInformation({
  companyName,
  registrationNumber,
  registrationDate,
  lastComplianceReview,
}: EntityInformationProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Entity Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Entity Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {companyName}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Registered CFI
            </Badge>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              <strong>CFI Registration Number:</strong> {registrationNumber}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Registration Date:</strong> {registrationDate}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last Compliance Review:</strong> {lastComplianceReview}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
