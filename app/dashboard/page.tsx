"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EntityInformation } from "@/components/dashboard/entity-information";
import { AutomatedReporting } from "@/components/dashboard/automated-reporting";
import { ManualReporting } from "@/components/dashboard/manual-reporting";

export default function DashboardPage() {
  const userEntity = {
    id: "FR2345678901234",
    name: "Jean-Luc Moreau",
    type: "natural" as const,
  };

  const companyEntity = {
    id: "FR98765432109",
    name: "BNP Paribas Securities Services",
    type: "legal" as const,
  };

  const reportingTypes = [
    {
      id: "etrc",
      name: "eTRC (Electronic Tax Residency Certificate)",
      description: "Submit tax residency certificates for dividend payments",
      status: "pending" as const,
      lastSubmitted: "2024-01-15",
      nextDue: "2024-02-15",
    },
    {
      id: "registered-owner",
      name: "Registered Owner Declaration",
      description: "Declare registered ownership of securities",
      status: "completed" as const,
      lastSubmitted: "2024-01-20",
      nextDue: "2024-02-20",
    },
    {
      id: "processed-dividend",
      name: "Processed Dividend Declaration",
      description: "Report processed dividend payments and distributions",
      status: "overdue" as const,
      lastSubmitted: "2024-01-10",
      nextDue: "2024-01-25",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={userEntity.name} userId={userEntity.id} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {userEntity.name}
          </h2>
          <p className="text-gray-600">
            Senior Custody Manager at {companyEntity.name}
          </p>
        </div>

        <EntityInformation
          companyName={companyEntity.name}
          registrationNumber="FR98765432109"
          registrationDate="15 March 2020"
          lastComplianceReview="12 January 2024"
        />

        <AutomatedReporting />

        <ManualReporting reportingTypes={reportingTypes} />
      </main>
    </div>
  );
}
