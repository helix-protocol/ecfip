import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, AlertCircle } from "lucide-react";

interface AutomatedSystem {
  id: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  metrics: {
    label: string;
    value: string;
    color?: string;
  }[];
  actions: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  bgColor: string;
}

const automatedSystems: AutomatedSystem[] = [
  {
    id: "transaction-monitoring",
    title: "Real-time Transaction Monitoring",
    description:
      "Continuous monitoring of all securities transactions and dividend payments",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    bgColor: "bg-green-50",
    metrics: [
      { label: "Last Report Generated", value: "Today, 14:30 CET" },
      {
        label: "Monitoring Status",
        value: "All Systems Operational",
        color: "text-green-600",
      },
      { label: "Next Scheduled Report", value: "Tomorrow, 09:00 CET" },
    ],
    actions: [
      { label: "View Latest Report", icon: FileText },
      { label: "System Status", icon: CheckCircle },
    ],
  },
  {
    id: "compliance-checks",
    title: "Automated Compliance Checks",
    description:
      "Automated validation of regulatory compliance and risk assessment",
    status: "Running",
    statusColor: "bg-blue-100 text-blue-800",
    bgColor: "bg-blue-50",
    metrics: [
      { label: "Last Compliance Check", value: "Today, 12:00 CET" },
      { label: "Compliance Score", value: "98.7%", color: "text-green-600" },
      { label: "Next Check", value: "Today, 18:00 CET" },
    ],
    actions: [
      { label: "Compliance Report", icon: FileText },
      { label: "Risk Alerts", icon: AlertCircle },
    ],
  },
  {
    id: "anomaly-detection",
    title: "AI-Powered Anomaly Detection",
    description:
      "Machine learning algorithms detecting unusual patterns in transactions",
    status: "Learning",
    statusColor: "bg-purple-100 text-purple-800",
    bgColor: "bg-purple-50",
    metrics: [
      { label: "Model Accuracy", value: "94.2%" },
      { label: "Alerts Today", value: "3 (Low Risk)" },
      { label: "Last Update", value: "2 hours ago" },
    ],
    actions: [
      { label: "Anomaly Report", icon: FileText },
      { label: "Model Performance", icon: CheckCircle },
    ],
  },
];

export function AutomatedReporting() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Automated Regulatory Reporting
        </CardTitle>
        <CardDescription>
          System-generated reports and automated compliance monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {automatedSystems.map((system) => (
            <div
              key={system.id}
              className={`border border-gray-200 rounded-lg p-6 ${system.bgColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {system.title}
                    </h3>
                    <Badge className={system.statusColor}>
                      {system.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{system.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {system.metrics.map((metric, index) => (
                      <div key={index}>
                        <p className="text-gray-500">{metric.label}</p>
                        <p className={`font-medium ${metric.color || ""}`}>
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {system.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
