"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Euro, Building2 } from "lucide-react";

interface EtrcSubmitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EtrcSubmitDialog({
  isOpen,
  onOpenChange,
}: EtrcSubmitDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    certificateNumber: "",
    issuerName: "",
    securityType: "",
    dividendAmount: "",
    taxRate: "",
    certificateDate: "",
    comments: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("eTRC Form Data:", formData);
    console.log("Uploaded File:", uploadedFile);

    // Reset form and close dialog
    setFormData({
      certificateNumber: "",
      issuerName: "",
      securityType: "",
      dividendAmount: "",
      taxRate: "",
      certificateDate: "",
      comments: "",
    });
    setUploadedFile(null);
    setIsSubmitting(false);
    onOpenChange(false);

    // Show success message
    alert("eTRC certificate submitted successfully!");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Submit eTRC Certificate
          </DialogTitle>
          <DialogDescription>
            Electronic Tax Residency Certificate submission for dividend
            payments
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Certificate Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Certificate Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Certificate Number *
                </label>
                <Input
                  placeholder="e.g., ETRC-2024-001"
                  value={formData.certificateNumber}
                  onChange={(e) =>
                    handleInputChange("certificateNumber", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Issuer Name *</label>
                <Input
                  placeholder="e.g., LVMH Moët Hennessy Louis Vuitton SE"
                  value={formData.issuerName}
                  onChange={(e) =>
                    handleInputChange("issuerName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Security Type *</label>
              <Select
                value={formData.securityType}
                onValueChange={(value) =>
                  handleInputChange("securityType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select security type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common-stock">Common Stock</SelectItem>
                  <SelectItem value="preferred-stock">
                    Preferred Stock
                  </SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="etf">ETF</SelectItem>
                  <SelectItem value="mutual-fund">Mutual Fund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Financial Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Dividend Amount per Share *
                </label>
                <Input
                  placeholder="e.g., 2.50"
                  value={formData.dividendAmount}
                  onChange={(e) =>
                    handleInputChange("dividendAmount", e.target.value)
                  }
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Amount in EUR</p>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Applicable Tax Rate *
                </label>
                <Input
                  placeholder="e.g., 15.0"
                  value={formData.taxRate}
                  onChange={(e) => handleInputChange("taxRate", e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Percentage (%)</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Certificate Date *</label>
              <Input
                type="date"
                value={formData.certificateDate}
                onChange={(e) =>
                  handleInputChange("certificateDate", e.target.value)
                }
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Supporting Documentation
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload supporting documentation (PDF, DOC, XLS)
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              {uploadedFile && (
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {uploadedFile.name}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-sm font-medium">Additional Comments</label>
            <Textarea
              placeholder="Any additional information or special circumstances..."
              className="resize-none"
              rows={3}
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Certificate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
