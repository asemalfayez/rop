import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// قائمة بأسماء عشوائية
const randomNames = ["جون دو", "جين سميث", "أليكس جونسون", "كريس براون", "إيما ويلسون"];
const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];

// دالة لاختيار إما اسم عشوائي أو "معلوماتي"
const getDropdownUsername = (language: string) =>
  Math.random() > 0.5 ? getRandomName() : (language === "ar" ? "معلوماتي" : "My Information");

interface UserActionsProps {
  mobileView?: boolean;
}

// Notification Button Component
function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const notifications = {
    government: language === "ar" ? "لديك مشكلة جديدة" : "You have a new issue",
    rejected: language === "ar" ? "تم رفض مشكلتك" : "Your issue has been rejected",
    inProgress: language === "ar" ? "تم العمل عليها" : "It is being worked on",
    pending: language === "ar" ? "لم يبت بها" : "Not yet decided",
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5 text-red-500" />
      </Button>
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <div className="py-2">
            {user?.role === "government" ? (
              <button
                className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 ease-in-out"
              >
                {notifications.government}
              </button>
            ) : (
              <>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.rejected}
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.inProgress}
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-yellow-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.pending}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserActions({ mobileView = false }: UserActionsProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const fakeData = {
    email: "example.user@email.com",
    username: getDropdownUsername(language),
    phoneNumber: "+1-555-987-6543",
  };

  const displayEmail = user?.email || fakeData.email;
  const displayDropdownUsername = user?.username || fakeData.username;
  const displayButtonUsername = language === "ar" ? "معلوماتي" : "My Information";
  const displayPhoneNumber = user?.phoneNumber || fakeData.phoneNumber;

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={() => navigate("/signin")}
      >
        <LogIn className="h-4 w-4 mr-1" /> {t("signIn")}
      </Button>
    );
  }

  if (mobileView) {
    return (
      <div className="pt-2 mt-2 border-t">
        <div className="px-3 py-2 text-base font-medium text-gray-700">
          {language === "ar" ? "تم تسجيل الدخول كـ: " : "Signed in as: "} {displayEmail}
          {user.role === "government" && (
            <div className="mt-1 text-sm text-gray-500">
              {user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")} Department
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className="flex items-center w-full justify-start px-3 py-2"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" /> {t("signOut")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <NotificationButton />
      <Button variant="ghost" size="icon" onClick={() => {}}>
        <HelpCircle className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hidden md:flex items-center mr-2">
            <span className="text-sm text-gray-600 mr-2">
              {user.role === "government"
                ? `${user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")} Department`
                : displayButtonUsername}
            </span>
            <User className="h-5 w-5 text-government-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {language === "ar" ? "حسابي" : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "البريد الإلكتروني: " : "Email: "} {displayEmail}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "اسم المستخدم: " : "Username: "} {displayDropdownUsername}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "رقم الهاتف: " : "Phone: "} {displayPhoneNumber}
            </span>
          </DropdownMenuItem>
          {user.role === "government" && (
            <DropdownMenuItem disabled>
              <span className="text-sm">
                {language === "ar" ? "القسم: " : "Department: "}
                {user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")}
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" /> {t("signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4 mr-1" /> {t("signOut")}
      </Button>
    </>
  );
}