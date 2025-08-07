import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shield, LogOut } from "lucide-react";
import { getCountryDisplay } from "@/lib/country";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  userName: string;
  userId: string;
}

export function DashboardHeader({ userName, userId }: DashboardHeaderProps) {
  const router = useRouter();
  const countryDisplay = getCountryDisplay(userId);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                European Certified Financial Intermediary Portal
              </h1>
              <p className="text-sm text-gray-500">
                FASTER, secure and efficient
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {userName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">
                  {countryDisplay.flag} {countryDisplay.name}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
